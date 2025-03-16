from fastapi import APIRouter, Query
from app.services.weather_api import get_weather


weather_api_router = APIRouter(prefix="/weather-api", tags=["Weather API"])


@weather_api_router.get("")
async def get_current_weather(
        city: str = Query("Kyiv", description="City name"),
        country: str = Query("US", description="Country code (e.g., 'US', 'UA', 'DE')"),
        units: str = Query("metric", description="Units: metric (°C), imperial (°F), standard (K)")
):
    """
    Fetches current weather from OpenWeather by city name.
    """
    return await get_weather(city, country, units)
