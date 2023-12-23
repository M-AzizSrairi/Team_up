# main.py
import uvicorn
from fastapi import FastAPI, HTTPException, Depends, File, UploadFile, Form, status
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from databases import Database
from sqlalchemy import Column, String, DateTime, MetaData, Table, func, ForeignKey, Integer, LargeBinary, Text
from sqlalchemy.types import Float
from sqlalchemy.sql import select, insert
from sqlalchemy.ext.declarative import declarative_base
from pydantic import BaseModel
from datetime import date
from typing import Optional, List
from jose import JWTError, jwt
from datetime import datetime, timedelta


app = FastAPI()

# CORS middleware configuration
origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database setup
DATABASE_URL = "postgresql://postgres:Ziza97699778.@localhost/TeamUp"
database = Database(DATABASE_URL)
metadata = MetaData()

# SQLAlchemy model for the Player table
player_table = Table(
    "player",
    metadata,
    Column("email", String, unique=True, index=True),
    Column("username", String, index=True),
    Column("password", String),
    Column("dob", DateTime(timezone=True), server_default=func.now()),
    Column("city", String),
    Column("user_type", String),
)

# SQLAlchemy model for the Owner table
owner_table = Table(
    "owner",
    metadata,
    Column("email", String, unique=True, index=True),
    Column("username", String, index=True),
    Column("password", String),
    Column("dob", DateTime(timezone=True), server_default=func.now()),
    Column("city", String),
    Column("user_type", String),
)

# Pydantic model for user registration
class UserRegistration(BaseModel):
    email: str
    username: str
    password: str
    confirm_password: str
    dob: date
    city: str
    user_type: str

class RegistrationResponse(BaseModel):
    message: str

# Event handler to connect to the database when the app starts
@app.on_event("startup")
async def startup():
    await database.connect()

# Event handler to disconnect from the database when the app shuts down
@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

# Endpoint for user registration
@app.post("/register", response_model=RegistrationResponse)
async def register(user_data: UserRegistration):
    try:
        # Basic validation, you might want to add more advanced validation logic
        if user_data.password != user_data.confirm_password:
            raise HTTPException(status_code=400, detail="Passwords do not match")

        # Determine the table based on user_type
        table = player_table if user_data.user_type == "player" else owner_table

        # Check if email or username already exists
        query_existing_user = select([table]).where(
            (table.c.email == user_data.email) | (table.c.username == user_data.username)
        )
        existing_user = await database.fetch_one(query_existing_user)

        if existing_user:
            raise HTTPException(status_code=400, detail="Email or username already registered")

        # Insert user data into the respective table
        query_insert_user = table.insert().values(
            email=user_data.email,
            username=user_data.username,
            password=user_data.password,
            dob=user_data.dob,
            city=user_data.city,
            user_type=user_data.user_type,
        )

        # Execute the query to insert the new user
        await database.execute(query_insert_user)

        return {"message": "User registered successfully"}
    except Exception as e:
        raise

import secrets

SECRET_KEY = secrets.token_urlsafe(32)
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


# Pydantic model for the token response
class Token(BaseModel):
    access_token: str
    token_type: str

# Function to create a new JWT token
def create_access_token(data: dict):
    expires_delta = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    expires_date = datetime.utcnow() + expires_delta
    to_encode = data.copy()
    to_encode.update({"exp": expires_date})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# OAuth2PasswordBearer for handling token authentication (you may have this already)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


# Pydantic model for user login
class UserLogin(BaseModel):
    username: str
    password: str

# Login endpoint with JWT token issuance
@app.post("/login", response_model=Token)
async def login(user_data: UserLogin):
    try:
        # Check if the user exists in the player table
        player_query = player_table.select().where(player_table.c.username == user_data.username)
        player_result = await database.fetch_one(player_query)

        if player_result and player_result["password"] == user_data.password:
            token_data = {"sub": user_data.username, "userType": "player"}
            access_token = create_access_token(token_data)
            return {"access_token": access_token, "token_type": "bearer"}

        # Check if the user exists in the owner table
        owner_query = owner_table.select().where(owner_table.c.username == user_data.username)
        owner_result = await database.fetch_one(owner_query)

        if owner_result and owner_result["password"] == user_data.password:
            token_data = {"sub": user_data.username, "userType": "owner"}
            access_token = create_access_token(token_data)
            return {"access_token": access_token, "token_type": "bearer"}

        # If user not found, raise HTTPException
        raise HTTPException(status_code=401, detail="Invalid credentials")

    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")

    
# Added endpoint to get user details
@app.get("/getLoggedInUser", response_model=dict)
async def get_logged_in_user(username: str = Depends(oauth2_scheme)):
    return {"username": username}




from pydantic import ValidationError
import json
import base64

from fastapi import File, UploadFile, Form
from fastapi.responses import JSONResponse






# SQLAlchemy model for the Venue table
venue_table = Table(
    "venue",
    metadata,
    Column("ownerusername", String, ForeignKey("owner.username", ondelete="CASCADE")),
    Column("ownername", String),
    Column("phonenumber", String),
    Column("city", String),
    Column("country", String),
    Column("location", String, primary_key=True),
    Column("workingdays", String),
    Column("price", String),
    Column("capacity", Integer),
    Column("area", String),
    Column("facilities", String),
    Column("description", String), 
    Column("reviews", Float),
    Column("numberoftimeschecked", Integer),
    Column("numberoftimesbooked", Integer),
    Column("availability", String, default='yes'),
)

# SQLAlchemy model for the Venue table
images_table = Table(
    "images",
    metadata,
    Column("image_id", Integer, primary_key=True),
    Column("ownerusername", String, ForeignKey("venues.ownerusername")),
    Column("location", String, ForeignKey("venues.location")),
    Column("image_name", String),
    Column("image_url", String),
)

# Pydantic model for venue creation
class VenueCreate(BaseModel):
    ownerusername: str
    ownername: str
    phonenumber: str
    city: str
    country: str
    location: str
    workingdays: str
    price: str
    capacity: int
    area: str
    facilities: str
    description: str
    images: List[str]

import logging

@app.post("/createVenue", response_model=dict)
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
            facilities=venue_data_dict["facilities"],
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

@app.options("/createVenue")
async def options_create_venue():
    return {"msg": "OK"}

# Endpoint to get venues for the current user
@app.get("/getVenuesForCurrentOwner", response_model=List[VenueCreate])
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
    

# Update VenueResponse model to exclude unwanted fields
class VenueResponse(BaseModel):
    ownerusername: str
    ownername: str
    phonenumber: str
    city: str
    country: str
    location: str
    workingdays: str
    price: str
    capacity: int
    area: str
    facilities: str
    description: str
    images: List[str]

# Update /getVenues endpoint to use the modified VenueResponse model
@app.get("/getVenues", response_model=List[VenueResponse])
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










if __name__ == "__main__":
    uvicorn.run("app.api:app", host="127.0.0.1", port=8000, reload=True)
