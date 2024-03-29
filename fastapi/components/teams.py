from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import insert, select, update, delete
from datetime import datetime
from .models import TeamCreate, TeamResponse, team, invitation, player_table, InvitationCreate, InvitationResponse, teammembership
from components.database import database

router = APIRouter()

@router.post("/createTeam", response_model=dict,status_code=status.HTTP_201_CREATED)
async def create_team(
    team_create: TeamCreate,
):
    # Check if the user is already a captain of a team
    query_team = select(team).where(team.c.captainid == team_create.captainid)
    
    existing_team = await database.execute(query_team)
    
    if existing_team:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You are already the captain of a team.",
        )

    # Create a new team
    query_create_new_team = insert(team).values(
        teamname=team_create.teamname,
        captainid=team_create.captainid,
    )

    # Add the new team to the database
    await database.execute(query_create_new_team)
    
    return {"message" : "Team created successfully"}


@router.post("/sendInvitation", response_model=dict, status_code=status.HTTP_201_CREATED)
async def send_invitation(
    invitation_create: InvitationCreate,
):
    # Check if the invited player exist
    query_invited_player = select([player_table.c.username]).where(player_table.c.username == invitation_create.invitedplayerid)

    existing_invited_player = await database.execute(query_invited_player)
    
    if not existing_invited_player:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"The invited player '{invitation_create.invitedplayerid}' does not exist. Please provide a valid username.",
        )

    # Check if the inviting player is the captain of a team
    query_inviting_captain_team = select(team).where(team.c.captainid == invitation_create.invitedby)
    existing_inviting_captain_team = await database.execute(query_inviting_captain_team)
    
    if not existing_inviting_captain_team:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"The inviting player '{invitation_create.invitedby}' is not a team captain. Only team captains can send invitations.",
        )

    query_teamid = select(team).where(
        team.c.captainid == invitation_create.invitedby
    )
    
    team_id = await database.execute(query_teamid)
    
    # Create a new invitation
    query_create_invitation = insert(invitation).values(
        teamid=team_id,
        invitedplayerid=invitation_create.invitedplayerid,
        invitedby=invitation_create.invitedby,
        status = "pending",
    )

    # Add the new invitation to the database
    invitation_id = await database.execute(query_create_invitation)

    return {"message" : "Invitation sent successfully"}


@router.get("/getPlayerInvitations/{player_id}", response_model=list[InvitationResponse])
async def get_player_invitations(player_id: str):
    # Check if the player exists
    query_player_existence = select([player_table.c.username]).where(player_table.c.username == player_id)
    existing_player = await database.execute(query_player_existence)
    
    if not existing_player:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"The player with username '{player_id}' does not exist.",
        )

    # Retrieve pending invitations for the player
    query_pending_invitations = select(invitation).where(
        (invitation.c.invitedplayerid == player_id) &
        (invitation.c.status == "pending")
    )

    pending_invitations = await database.fetch_all(query_pending_invitations)

    return pending_invitations



@router.put("/respondToInvitation", response_model=dict)
async def respond_to_invitation(
    invitation_response: InvitationResponse,
):
    # Get the invitation details
    query_invitation = select([invitation]).where(invitation.c.invitationid == invitation_response.invitationid)
    invitation_details = await database.fetch_one(query_invitation)

    if not invitation_details:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid invitation ID: {invitation_response.invitationid}",
        )

    st = invitation_details["status"]
    
    # Check if the invitation status is pending
    if st != 'pending':
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"This invitation has already been {st}.",
        )

    # Update the invitation status
    query_update_invitation = update(invitation).where(invitation.c.invitationid == invitation_response.invitationid).values(status=invitation_response.status, responded_at=datetime.utcnow())
    await database.execute(query_update_invitation)
    
    if invitation_response.status == "accepted":
        query = insert(teammembership).values(
            teamid=invitation_response.teamid,
            playerid=invitation_response.invitedplayerid,
            joined_at=datetime.utcnow(),
        )
        await database.execute(query)

    return {"message": f"Invitation is {invitation_response.status}"}


async def is_player_team_member(team_id: int, player_id: str) -> bool:
    query_membership = select([teammembership]).where(
        (teammembership.c.teamid == team_id) & (teammembership.c.playerid == player_id)
    )
    team_membership = await database.fetch_one(query_membership)
    return team_membership is not None



@router.delete("/removeTeamMember/{team_id}/{remover}/{player_id}", response_model=dict)
async def remove_team_member(team_id: int, remover: str, player_id: str):
    # Check if the team exists
    query_team = select([team]).where(team.c.teamid == team_id)
    existing_team = await database.fetch_one(query_team)

    if not existing_team:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Team with ID {team_id} does not exist.",
        )

    # Check if the requester is the captain or the member to be removed
    is_captain = existing_team["captainid"] == remover
    is_team_member = await is_player_team_member(team_id, remover)

    if not (is_captain or is_team_member):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to remove this team member.",
        )

    # Delete the team member from teammembership
    query_remove_member = delete(teammembership).where(
        (teammembership.c.teamid == team_id) & (teammembership.c.playerid == player_id)
    )
    await database.execute(query_remove_member)

    return {"message": f"Team member {player_id} has been removed from Team {team_id}"}
