import os
import aiohttp
from dotenv import load_dotenv

load_dotenv()

BASE_OPENWEATHER_URL = os.getenv("BASE_OPENWEATHER_URL")
OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")
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
                return {
                    "city": data["name"],
                    "temperature": data["main"]["temp"],
                    "humidity": data["main"]["humidity"],
                    "weather": data["weather"][0]["description"],
                }
            else:
                return {"error": f"API Error: {response.status}, {await response.text()}"}
