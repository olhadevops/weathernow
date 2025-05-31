from fastapi import APIRouter, Query
from app.services.weather_api import get_weather
from app.services.weather_api import get_coordinates
from app.services.weather_api import get_forecast


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


@weather_api_router.get("/geo")
async def get_location_coordinates(
        city: str = Query(..., description="City name"),
        country: str = Query("UA", description="Country code (e.g., 'US', 'UA', 'DE')")
):
    """
    Fetches latitude and longitude for a given city and country code using OpenWeather Geo API.
    """
    return await get_coordinates(city, country)


@weather_api_router.get("/forecast")
async def get_weather_forecast(
        city: str = Query("Kyiv", description="City name"),
        country: str = Query("UA", description="Country code (e.g., 'US', 'UA', 'DE')"),
        units: str = Query("metric", description="Units: metric (°C), imperial (°F), standard (K)"),
        days: int = Query(7, ge=1, le=16, description="Number of days to fetch (1–16)")
):
    """
    Fetches 7–16 day weather forecast using OpenWeather One Call API.
    """
    return await get_forecast(city, country, units, days)