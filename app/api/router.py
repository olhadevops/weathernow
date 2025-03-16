from fastapi import APIRouter
from app.api.user import user_router
from app.api.weather import weather_router  # Database weather data
from app.api.weather_api import weather_api_router  # OpenWeather API


router = APIRouter()
router.include_router(user_router)
router.include_router(weather_router)  # Weather from DB
router.include_router(weather_api_router)  # Weather from OpenWeather API
