from pydantic import BaseModel
from datetime import datetime


class SettingsCreate(BaseModel):
    user_id: int
    country: str
    city: str


class SettingsResponse(BaseModel):
    id: int
    user_id: int
    country: str
    city: str
    timestamp: datetime

    class Config:
        from_attributes = True
