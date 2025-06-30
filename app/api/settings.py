from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status

from app.core.database import get_db
from app.schemas.settings import SettingsResponse, SettingsCreate
from app.services.settings import settings_service
from typing import List


settings_router = APIRouter(prefix="/settings", tags=["Settings"])


@settings_router.post("/", response_model=SettingsResponse)
async def create_settings(settings: SettingsCreate, db: AsyncSession = Depends(get_db)):
    return await settings_service.create(db, settings)


@settings_router.get("/", response_model=List[SettingsResponse])
async def get_settings_list(
        db: AsyncSession = Depends(get_db),
        skip: int = 0,
        limit: int = 100
):
    return await settings_service.get_settings_list(
        db, skip, limit
    )

@settings_router.delete("/{item_id}", summary="Delete a specific setting by its ID")
async def delete_settings(item_id: int, db: AsyncSession = Depends(get_db)):
    return await settings_service.delete(db, item_id)

