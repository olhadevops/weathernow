from typing import Type, TypeVar, Generic, List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import DeclarativeBase, InstrumentedAttribute
from pydantic import BaseModel
from sqlalchemy import delete


ModelType = TypeVar("ModelType", bound=DeclarativeBase)
SchemaType = TypeVar("SchemaType", bound=BaseModel)


class BaseService(Generic[ModelType, SchemaType]):
    def __init__(self, model: Type[ModelType]):
        self.model = model

    async def create(self, db: AsyncSession, obj_in: SchemaType) -> ModelType:
        obj = self.model(**obj_in.model_dump())
        db.add(obj)
        await db.commit()
        await db.refresh(obj)
        return obj

    async def get(self, db: AsyncSession, item_id: int) -> Optional[ModelType]:
        result = await db.execute(select(self.model).filter_by(id=item_id))
        return result.scalars().first()

    async def delete(self, db: AsyncSession, item_id: int) -> bool:
        primary_key: InstrumentedAttribute = getattr(self.model, "id")
        stmt = delete(self.model).where(primary_key == item_id)
        result = await db.execute(stmt)
        await db.commit()
        return bool(result.rowcount)

    async def update(
            self, db: AsyncSession, item_id: int, obj_in: SchemaType
    ) -> Optional[ModelType]:
        obj = await self.get(db, item_id)
        if obj:
            for key, value in obj_in.model_dump(exclude_unset=True).items():
                setattr(obj, key, value)
            await db.commit()
            await db.refresh(obj)
            return obj
        return None

    async def get_list(self, db: AsyncSession, skip: int = 0, limit: int = 100) -> List[ModelType]:
        result = await db.execute(select(self.model).offset(skip).limit(limit))
        return list(result.scalars().all())
