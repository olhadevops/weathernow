from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.settings import Settings
from app.schemas.settings import SettingsCreate
from app.services.base import BaseService
from typing import List


class SettingsService(BaseService[Settings, SettingsCreate]):
    def __init__(self):
        super().__init__(Settings)

    async def get_settings_list(
            self,
            db: AsyncSession,
            skip: int = 0,
            limit: int = 100,
    ) -> List[Settings]:
        query = select(Settings)

        query = query.offset(skip).limit(limit)

        result = await db.execute(query)
        return list(result.scalars().all())


settings_service = SettingsService()
