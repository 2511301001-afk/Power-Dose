from pydantic import BaseModel, Field
from typing import List, Optional, Any

class ProductBase(BaseModel):
    id: str
    name: str
    subtitle: Optional[str] = ""
    category: str
    brand: str
    price: float
    originalPrice: Optional[float] = None
    rating: float = 5.0
    reviewsCount: int = 0
    badge: Optional[str] = None
    flavor: Optional[str] = ""
    size: Optional[str] = ""
    servings: Optional[int] = 1
    proteinPerServing: Optional[str] = "0G"
    doseIntensity: int = 5
    image: str
    description: str
    inStock: bool = True
    stockCount: int = 0

class ProductCreate(ProductBase):
    pass

class ProductResponse(ProductBase):
    pass

class CategoryItem(BaseModel):
    name: str
    count: int
    image: str

class ArticleItem(BaseModel):
    id: str
    title: str
    category: str
    author: str
    readTime: str
    date: str
    image: str
    summary: str
    tags: List[str]
    featured: Optional[bool] = False

class OfferItem(BaseModel):
    id: str
    title: str
    discount: str
    code: str
    expiresIn: str
    productsIncluded: List[str]
    originalPrice: float
    salePrice: float
    image: str
    badge: str

class OrderCreate(BaseModel):
    customer: str
    items: str
    amount: float
    status: str = "Processing"
    date: Optional[str] = None

class OrderResponse(OrderCreate):
    id: str

class UserProfileResponse(BaseModel):
    name: str
    rank: str
    memberSince: str
    avatar: str
    monthlyIntensity: int
    activeMission: Optional[dict] = None
    stats: dict
    subscriptions: List[dict]

class AdminStatsResponse(BaseModel):
    totalRevenue: str
    revenueGrowth: str
    activeOrders: int
    newCustomers: int
    lowStockAlerts: int
    topMovers: List[dict]
    recentOrders: List[dict]
