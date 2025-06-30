import os
import aiohttp
from dotenv import load_dotenv
from fastapi import HTTPException

load_dotenv()

BASE_OPENWEATHER_URL = os.getenv("BASE_OPENWEATHER_URL")
OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")
FORECAST_OPENWEATHER_URL = os.getenv("FORECAST_OPENWEATHER_URL")
GEO_OPENWEATHER_URL = os.getenv("GEO_OPENWEATHER_URL")
ENV = os.getenv("ENV", "production")
ssl_disabled = ENV.lower() == "local"


async def get_weather(city: str, country: str = "UA", units: str = "metric"):
    params = {
        "q": f"{city},{country}",
        "appid": OPENWEATHER_API_KEY,
        "units": units,
        "lang": "ua"
    }

    print(f"params: {params}")

    async with aiohttp.ClientSession(
            connector=aiohttp.TCPConnector(ssl=not ssl_disabled)
    ) as session:
        async with session.get(BASE_OPENWEATHER_URL, params=params) as response:
            if response.status == 200:
                data = await response.json()
                return data
            else:
                return {"error": f"API Error: {response.status}, {await response.text()}"}


async def get_coordinates(city: str, country: str = "UA"):
    params = {
        "q": f"{city},{country}",
        "limit": 1,
        "appid": OPENWEATHER_API_KEY,
    }

    async with aiohttp.ClientSession(
            connector=aiohttp.TCPConnector(ssl=not ssl_disabled)
    ) as session:
        async with session.get(GEO_OPENWEATHER_URL, params=params) as response:
            if response.status != 200:
                return {"error": f"Geo API Error: {response.status}, {await response.text()}"}

            data = await response.json()
            if not data:
                return {"error": "Location not found"}

            return {
                "city": city,
                "country": country,
                "lat": data[0]["lat"],
                "lon": data[0]["lon"],
                "name": data[0].get("name"),
                "state": data[0].get("state"),
            }


async def get_forecast(city: str, country: str = "UA", units: str = "metric", days: int = 3):
    params = {
        "q": f"{city},{country}",
        "appid": OPENWEATHER_API_KEY,
        "units": units,
        "cnt": days * 8,  # 8 записей в день (3 часа * 8 = 24ч)
        "lang": "ua"
    }

    async with aiohttp.ClientSession(
            connector=aiohttp.TCPConnector(ssl=not ssl_disabled)
    ) as session:
        async with session.get(FORECAST_OPENWEATHER_URL, params=params) as response:
            if response.status != 200:
                raise HTTPException(
                    status_code=502,
                    detail=f"Forecast API Error: Received status {response.status}. Details: Forecast API Error: {response.status}, {await response.text()}"
                )

            return await response.json()