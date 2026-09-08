from fastapi import APIRouter
from typing import List
from datetime import datetime
import uuid
from backend.database import get_database
from backend.schemas import OrderResponse, OrderCreate

router = APIRouter(prefix="/api/orders", tags=["Orders"])

@router.get("", response_model=List[OrderResponse])
async def get_orders():
    db = get_database()
    orders = await db.orders.find({}, {"_id": 0}).to_list(length=100)
    return orders

@router.post("", response_model=OrderResponse, status_code=201)
async def create_order(order: OrderCreate):
    db = get_database()
    order_dict = order.model_dump()
    order_dict["id"] = f"PD-{uuid.uuid4().hex[:4].upper()}"
    if not order_dict.get("date"):
        order_dict["date"] = datetime.now().strftime("%Y-%m-%d %H:%M")
    
    await db.orders.insert_one(order_dict)
    # Remove MongoDB internal _id before returning
    order_dict.pop("_id", None)
    return order_dict
