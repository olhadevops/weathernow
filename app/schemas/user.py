from pydantic import BaseModel, EmailStr
from datetime import datetime


class UserCreate(BaseModel):
    username: str
    email: EmailStr
    country: str = "Ukraine"
    city: str = "Kyiv"
    update_interval: int = 4  # hours


class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr
    country: str
    city: str
    update_interval: int
    created_at: datetime

    class Config:
        from_attributes = True
