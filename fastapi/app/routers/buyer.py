from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql import select
from db import get_db
from pydantic import BaseModel
from log_conf import logger
from db import Base
from sqlalchemy import Column, Integer, String

# db models
class SearchHistory(Base):
    __tablename__ = "search_history"

    id = Column(Integer, primary_key=True, index=True)
    query = Column(String(255), unique=True, index=True)
    count = Column(Integer)

# api schema
class SearchHistoryCreate(BaseModel):
    query: str
    count: int

# routers
router = APIRouter()

## seacrh history
@router.get("/search-history")
async def read_search_history(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(SearchHistory))
    db_search_history = result.scalars().all()
    return db_search_history

from fastapi import HTTPException
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession

@router.post("/search-history")
async def create_search_history(search_history: SearchHistoryCreate, db: AsyncSession = Depends(get_db)):
    # queryが既に存在するか確認
    result = await db.execute(select(SearchHistory).where(SearchHistory.query == search_history.query))
    existing_record = result.scalars().first()

    if existing_record:
        # 存在する場合、countをインクリメント。サーバーの責任。
        existing_record.count += 1
        db.add(existing_record)
    else:
        # 存在しない場合、新しいレコードを作成
        db_product = SearchHistory(
            query=search_history.query,
            count=1
        )
        db.add(db_product)

    await db.commit()
    if existing_record:
        await db.refresh(existing_record)
        return existing_record
    else:
        await db.refresh(db_product)
        return db_product