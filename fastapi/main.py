# main.py
import uvicorn
from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from databases import Database
from sqlalchemy import Column, String, DateTime, MetaData, Table, func
from sqlalchemy.sql import select
from sqlalchemy.ext.declarative import declarative_base
from pydantic import BaseModel
from datetime import date
from typing import Optional
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
        print(f"Error during registration: {e}")
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
        print(f"Error during login: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

    
# Added endpoint to get user details
@app.get("/getLoggedInUser", response_model=dict)
async def get_logged_in_user(username: str = Depends(oauth2_scheme)):
    return {"username": username}




if __name__ == "__main__":
    uvicorn.run("app.api:app", host="127.0.0.1", port=8000, reload=True)
