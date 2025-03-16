from pydantic import BaseModel
from datetime import datetime


class WeatherCreate(BaseModel):
    user_id: int
    country: str
    city: str
    temperature: float
    humidity: int
    wind_speed: float
    weather_description: str
    timestamp: datetime


class WeatherResponse(BaseModel):
    id: int
    user_id: int
    country: str
    city: str
    temperature: float
    humidity: int
    wind_speed: float
    weather_description: str
    timestamp: datetime

    class Config:
        from_attributes = True
