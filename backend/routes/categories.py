from fastapi import APIRouter
from typing import List
from backend.database import get_database
from backend.schemas import CategoryItem

router = APIRouter(prefix="/api/categories", tags=["Categories"])

@router.get("", response_model=List[CategoryItem])
async def get_categories():
    db = get_database()
    categories = await db.categories.find({}, {"_id": 0}).to_list(length=50)
    return categories
