from sqlalchemy import Column, Integer, String, TIMESTAMP, Boolean, func
from sqlalchemy.ext.asyncio import AsyncAttrs
from sqlalchemy.orm import relationship
from app.core.database import Base


class User(Base, AsyncAttrs):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(100), nullable=False, unique=True)
    email = Column(String(255), nullable=False, unique=True)
    country = Column(String(100), nullable=False, default="Ukraine")
    city = Column(String(100), nullable=False, default="Kyiv")
    update_interval = Column(Integer, nullable=False, default=4)
    created_at = Column(TIMESTAMP, nullable=False, server_default=func.now())
    is_active = Column(Boolean, default=True)

    weather_data = relationship("WeatherData", back_populates="user")
