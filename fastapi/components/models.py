# fastapi/models.py
from pydantic import BaseModel
from datetime import date
from typing import Optional, List
from sqlalchemy import Column, String, DateTime, MetaData, Table, func, ForeignKey, Integer, LargeBinary, Text
from sqlalchemy.types import Float
from sqlalchemy.ext.declarative import declarative_base
from pydantic import BaseModel


metadata = MetaData()

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

class Token(BaseModel):
    access_token: str
    token_type: str

class UserLogin(BaseModel):
    username: str
    password: str

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
    ground: str
    description: str
    images: List[str]
    
    
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
    ground: str
    description: str
    images: List[str]
    
    
    
    
    


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
    Column("ground", String),
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
