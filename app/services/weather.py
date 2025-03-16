from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.weather import WeatherData
from app.schemas.weather import WeatherCreate
from app.services.base import BaseService
from typing import Optional, List


class WeatherService(BaseService[WeatherData, WeatherCreate]):
    def __init__(self):
        super().__init__(WeatherData)

    async def get_latest_weather(
            self, db: AsyncSession, city: str, country: str
    ) -> Optional[WeatherData]:
        result = await db.execute(
            select(WeatherData)
            .where(WeatherData.city == city, WeatherData.country == country)
            .order_by(WeatherData.timestamp.desc())
            .limit(1)
        )
        return result.scalars().first()

    async def get_weather_list(
            self,
            db: AsyncSession,
            city: Optional[str] = None,
            country: Optional[str] = None,
            start_date: Optional[str] = None,
            end_date: Optional[str] = None,
            skip: int = 0,
            limit: int = 100,
    ) -> List[WeatherData]:
        query = select(WeatherData)

        if city:
            query = query.where(WeatherData.city == city)
        if country:
            query = query.where(WeatherData.country == country)
        if start_date:
            query = query.where(WeatherData.timestamp >= start_date)
        if end_date:
            query = query.where(WeatherData.timestamp <= end_date)

        query = query.offset(skip).limit(limit)

        result = await db.execute(query)
        return list(result.scalars().all())


weather_service = WeatherService()
