from sqlalchemy import Column, Integer, String, Float, TIMESTAMP, ForeignKey, func
from sqlalchemy.ext.asyncio import AsyncAttrs
from sqlalchemy.orm import relationship
from app.core.database import Base


class WeatherData(Base, AsyncAttrs):
    __tablename__ = "weather_data"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    country = Column(String(100), nullable=False)
    city = Column(String(100), nullable=False)
    temperature = Column(Float, nullable=False)
    humidity = Column(Integer, nullable=False)
    wind_speed = Column(Float, nullable=False)
    weather_description = Column(String(255), nullable=True)
    timestamp = Column(TIMESTAMP, nullable=False, server_default=func.now())
    user = relationship("User", back_populates="weather_data")
