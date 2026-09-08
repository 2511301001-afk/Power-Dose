from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from backend.database import get_database
from backend.schemas import ProductResponse, ProductCreate

router = APIRouter(prefix="/api/products", tags=["Products"])

@router.get("", response_model=List[ProductResponse])
async def get_products(
    category: Optional[str] = None,
    search: Optional[str] = None,
    sort_by: Optional[str] = None
):
    db = get_database()
    query = {}
    
    if category and category != "All":
        query["category"] = category
        
    if search:
        query["$or"] = [
            {"name": {"$regex": search, "$options": "i"}},
            {"subtitle": {"$regex": search, "$options": "i"}},
            {"description": {"$regex": search, "$options": "i"}},
            {"category": {"$regex": search, "$options": "i"}}
        ]

    cursor = db.products.find(query, {"_id": 0})
    
    if sort_by == "price-low":
        cursor = cursor.sort("price", 1)
    elif sort_by == "price-high":
        cursor = cursor.sort("price", -1)
    elif sort_by == "rating":
        cursor = cursor.sort("rating", -1)
    elif sort_by == "intensity":
        cursor = cursor.sort("doseIntensity", -1)

    products = await cursor.to_list(length=100)
    return products

@router.get("/{product_id}", response_model=ProductResponse)
async def get_product(product_id: str):
    db = get_database()
    product = await db.products.find_one({"id": product_id}, {"_id": 0})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.post("", response_model=ProductResponse, status_code=201)
async def create_product(product: ProductCreate):
    db = get_database()
    existing = await db.products.find_one({"id": product.id})
    if existing:
        raise HTTPException(status_code=400, detail="Product ID already exists")
    
    product_dict = product.model_dump()
    await db.products.insert_one(product_dict)
    return product_dict

@router.put("/{product_id}", response_model=ProductResponse)
async def update_product(product_id: str, product_data: ProductCreate):
    db = get_database()
    existing = await db.products.find_one({"id": product_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Product not found")
    
    update_dict = product_data.model_dump()
    await db.products.update_one({"id": product_id}, {"$set": update_dict})
    return update_dict

@router.delete("/{product_id}")
async def delete_product(product_id: str):
    db = get_database()
    result = await db.products.delete_one({"id": product_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"message": "Product deleted successfully", "id": product_id}
