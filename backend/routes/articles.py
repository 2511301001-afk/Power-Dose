from fastapi import APIRouter
from typing import List
from backend.database import get_database
from backend.schemas import ArticleItem

router = APIRouter(prefix="/api/articles", tags=["Explore & Articles"])

@router.get("", response_model=List[ArticleItem])
async def get_articles():
    db = get_database()
    articles = await db.articles.find({}, {"_id": 0}).to_list(length=50)
    return articles
