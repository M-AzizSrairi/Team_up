# app/venues.py
from fastapi import APIRouter, Depends, HTTPException, Query, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from sqlalchemy.sql import select, insert
from .authentication import oauth2_scheme, create_access_token
from datetime import date, datetime, timedelta
from typing import List
from pydantic import BaseModel
from sqlalchemy.ext.declarative import declarative_base
from pydantic import BaseModel
from .models import VenueCreate, venue_table, images_table, VenueResponse, VenueCreate
from .authentication import get_logged_in_user
from .database import database


router = APIRouter()

import logging

@router.post("/createVenue", response_model=dict)
async def create_venue(
    venue_data: VenueCreate,
    current_user: dict = Depends(get_logged_in_user),
):
    try:
        # Logging statement to print information about the received request
        logging.info(f"Received request from {current_user['username']}")
        logging.info(f"Request data: {venue_data.dict()}")
        
        # Ensure that the owner username is obtained dynamically
        venue_data_dict = venue_data.dict()

        # Insert venue data into the venue table
        query_insert_venue = insert(venue_table).values(
            ownerusername=venue_data_dict["ownerusername"],
            ownername=venue_data_dict["ownername"],
            phonenumber=venue_data_dict["phonenumber"],
            city=venue_data_dict["city"],
            country=venue_data_dict["country"],
            location=venue_data_dict["location"],
            workingdays=venue_data_dict["workingdays"],
            price=venue_data_dict["price"],
            capacity=venue_data_dict["capacity"],
            area=venue_data_dict["area"],
            ground=venue_data_dict["ground"],
            description=venue_data_dict["description"],
        )
        venue_id = await database.execute(query_insert_venue)

        # Insert image URLs into the images table
        for i, image_url in enumerate(venue_data.images):
            query_insert_image = insert(images_table).values(
                ownerusername=venue_data_dict["ownerusername"],
                location=venue_data_dict["location"],
                image_name=f"Image {i + 1}",
                image_url=image_url,
            )
            await database.execute(query_insert_image)

        return {"message": "Venue created successfully"}
    except Exception as e:
        # Log the error or return a more informative response
        print(f"Error creating venue: {e}")
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"detail": "Internal Server Error"},
        )
import base64
from fastapi import HTTPException

@router.options("/createVenue")
async def options_create_venue():
    return {"msg": "OK"}

# Endpoint to get venues for the current user
@router.get("/getVenuesForCurrentOwner", response_model=List[VenueCreate])
async def get_venues_for_user(current_user: dict = Depends(get_logged_in_user)):
    try:
        # Fetch venues based on the current user's ownerusername
        query_venues = select([venue_table]).where(venue_table.c.ownerusername == current_user['username'])
        venues = await database.fetch_all(query_venues)
        
        # Convert venues to a list of dictionaries
        venues_list = [dict(venue) for venue in venues]
        
        # Fetch images for each venue
        for venue in venues_list:
            query_images = select([images_table.c.image_url]).where(
                (images_table.c.location == venue['location']) &
                (images_table.c.ownerusername == venue['ownerusername'])
            )
            images = await database.fetch_all(query_images)
            venue['images'] = [image['image_url'] for image in images]
            
        print('Venues sent to client:', venues_list)
        return venues_list
    except Exception as e:
        print(f"Error fetching venues: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error")
    

# Update /getVenues endpoint to use the modified VenueResponse model
@router.get("/getVenues", response_model=List[VenueResponse])
async def get_all_venues():
    try:
        # Fetch all venues
        query_venues = select([venue_table])
        venues = await database.fetch_all(query_venues)

        # Fetch images for each venue
        venues_list = []
        for venue in venues:
            venue_dict = dict(venue)
            query_images = select([images_table.c.image_url]).where(
                (images_table.c.location == venue_dict['location']) &
                (images_table.c.ownerusername == venue_dict['ownerusername'])
            )
            images = await database.fetch_all(query_images)
            venue_dict['images'] = [image['image_url'] for image in images]
            venues_list.append(venue_dict)

        # Ensure that the 'images' attribute is always a list
        for venue in venues_list:
            venue['images'] = venue.get('images', [])

        # Convert the list of dictionaries to VenueResponse objects
        venues_response = [VenueResponse(**{key: venue[key] for key in VenueResponse.__annotations__}) for venue in venues_list]

        print('Venues sent to client:', venues_response)
        return venues_response
    except Exception as e:
        print(f"Error fetching venues: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error")


from fastapi import Query


# Create a new endpoint for filtered venues
@router.get("/getFilteredVenues", response_model=List[VenueResponse])
async def get_filtered_venues(
    city: str = Query(None, description="Filter by city"),
    country: str = Query(None, description="Filter by country"),
    pitch_type: str = Query(None, description="Filter by pitch type"),
    price_range: int = Query(None, description="Filter by price range"),
    capacity_range: int = Query(None, description="Filter by capacity range"),
):
    try:
        # Start building the base query
        query_venues = select([venue_table])

        # Apply filters based on query parameters
        if city:
            query_venues = query_venues.where(venue_table.c.city == city)

        if country:
            query_venues = query_venues.where(venue_table.c.country == country)

        if pitch_type:
            query_venues = query_venues.where(venue_table.c.ground == pitch_type)

        # Apply filters for price range if provided
        if price_range is not None:
            query_venues = query_venues.where(venue_table.c.price <= price_range)

        # Apply filters for capacity range if provided
        if capacity_range is not None:
            query_venues = query_venues.where(venue_table.c.capacity <= capacity_range)

        # Fetch filtered venues
        venues = await database.fetch_all(query_venues)

        # Fetch images for each venue
        venues_list = []
        for venue in venues:
            venue_dict = dict(venue)
            query_images = select([images_table.c.image_url]).where(
                (images_table.c.location == venue_dict['location']) &
                (images_table.c.ownerusername == venue_dict['ownerusername'])
            )
            images = await database.fetch_all(query_images)
            venue_dict['images'] = [image['image_url'] for image in images]
            venues_list.append(venue_dict)

        # Ensure that the 'images' attribute is always a list
        for venue in venues_list:
            venue['images'] = venue.get('images', [])

        # Convert the list of dictionaries to VenueResponse objects
        venues_response = [VenueResponse(**{key: venue[key] for key in VenueResponse.__annotations__}) for venue in venues_list]

        print('Filtered venues sent to the client:', venues_response)
        return venues_response
    except Exception as e:
        print(f"Error fetching filtered venues: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error")

# Helper function to get the currently logged-in user
async def get_logged_in_user(username: str = Depends(oauth2_scheme)):
    return {"username": username}
