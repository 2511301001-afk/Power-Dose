from fastapi import APIRouter
from typing import List
from backend.database import get_database
from backend.schemas import OfferItem

router = APIRouter(prefix="/api/offers", tags=["Offers & Deals"])

@router.get("", response_model=List[OfferItem])
async def get_offers():
    db = get_database()
    offers = await db.offers.find({}, {"_id": 0}).to_list(length=50)
    return offers
