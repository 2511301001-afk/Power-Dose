from fastapi import APIRouter
from backend.database import get_database
from backend.schemas import UserProfileResponse, AdminStatsResponse

router = APIRouter(prefix="/api", tags=["User & Admin"])

@router.get("/user/profile", response_model=UserProfileResponse)
async def get_user_profile():
    db = get_database()
    profile = await db.user_profile.find_one({}, {"_id": 0})
    if not profile:
        return {
            "name": "Jack Hammer",
            "rank": "ELITE ATHLETE",
            "memberSince": "JAN 2024",
            "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
            "monthlyIntensity": 92,
            "activeMission": {
                "orderId": "#PD-8842-X",
                "status": "IN TRANSIT - DISPATCHED VIA SPEED EXPRESS",
                "estDelivery": "TOMORROW, 2:00 PM",
                "itemsCount": 3,
                "totalAmount": 124.98
            },
            "stats": {
                "totalOrders": 18,
                "stackPoints": 4850,
                "workoutsCompleted": 142,
                "intensityScore": "9.8 / 10"
            },
            "subscriptions": [
                { "name": "Titanium Whey Isolate (Double Chocolate)", "frequency": "Every 30 Days", "price": 67.49, "status": "Active" },
                { "name": "Nuclear Pre-Workout (Atomic Sour Apple)", "frequency": "Every 45 Days", "price": 44.99, "status": "Active" }
            ]
        }
    return profile

@router.get("/admin/stats", response_model=AdminStatsResponse)
async def get_admin_stats():
    db = get_database()
    stats = await db.admin_stats.find_one({}, {"_id": 0})
    if not stats:
        return {
            "totalRevenue": "$128,450.00",
            "revenueGrowth": "+24.5%",
            "activeOrders": 142,
            "newCustomers": 892,
            "lowStockAlerts": 3,
            "topMovers": [
                { "name": "TITANIUM WHEY ISOLATE 5LBS", "category": "Whey", "sold": 1420, "revenue": "$106,486.00", "stock": 42, "status": "IN STOCK" },
                { "name": "NUCLEAR PRE-WORKOUT IGNITER", "category": "Pre-Workout", "sold": 980, "revenue": "$48,990.00", "stock": 18, "status": "LOW STOCK" }
            ],
            "recentOrders": []
        }
    return stats
