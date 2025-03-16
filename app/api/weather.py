from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.schemas.weather import WeatherCreate, WeatherResponse
from app.services.weather import weather_service
from typing import List, Optional
from datetime import datetime

weather_router = APIRouter(prefix="/weather", tags=["Weather"])


@weather_router.post("/", response_model=WeatherResponse)
async def add_weather(weather: WeatherCreate, db: AsyncSession = Depends(get_db)):
    return await weather_service.create(db, weather)


@weather_router.get("/latest", response_model=WeatherResponse)
async def get_latest_weather(city: str, country: str, db: AsyncSession = Depends(get_db)):
    weather = await weather_service.get_latest_weather(db, city, country)
    if not weather:
        raise HTTPException(status_code=404, detail="No weather data found")
    return weather


@weather_router.get("/{weather_id}", response_model=WeatherResponse)
async def get_weather(weather_id: int, db: AsyncSession = Depends(get_db)):
    weather = await weather_service.get(db, weather_id)
    if not weather:
        raise HTTPException(status_code=404, detail="Weather data not found")
    return weather


@weather_router.get("/", response_model=List[WeatherResponse])
async def get_weather_list(
        db: AsyncSession = Depends(get_db),
        city: Optional[str] = Query(None),
        country: Optional[str] = Query(None),
        start_date: Optional[datetime] = Query(None),
        end_date: Optional[datetime] = Query(None),
        skip: int = 0,
        limit: int = 100
):
    return await weather_service.get_weather_list(
        db, city, country, start_date, end_date, skip, limit
    )
