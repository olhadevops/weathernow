from sqlalchemy import Column, Integer, String, TIMESTAMP, ForeignKey, func
from sqlalchemy.ext.asyncio import AsyncAttrs
from sqlalchemy.orm import relationship
from app.core.database import Base


class Settings(Base, AsyncAttrs):
    __tablename__ = "settings"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    country = Column(String(100), nullable=False)
    city = Column(String(100), nullable=False)
    timestamp = Column(TIMESTAMP, nullable=False, server_default=func.now())
    user = relationship("User", back_populates="settings")
