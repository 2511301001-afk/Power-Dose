from fastapi import APIRouter, HTTPException, status
from backend.database import get_database
from backend.schemas import SignupRequest, LoginRequest, AuthResponse
import uuid
import datetime

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

@router.post("/signup", response_model=AuthResponse)
async def signup(req: SignupRequest):
    db = get_database()
    email_clean = req.email.strip().lower()
    
    # Check existing user
    if db is not None:
        try:
            existing = await db.users.find_one({"email": email_clean})
            if existing:
                raise HTTPException(status_code=400, detail="An account with this email already exists.")
        except Exception:
            pass

    user_id = f"PD-{uuid.uuid4().hex[:6].upper()}"
    user_data = {
        "id": user_id,
        "name": req.name.strip(),
        "email": email_clean,
        "rank": req.rank or "PRO ATHLETE",
        "memberSince": datetime.datetime.now().strftime("%b %Y").upper(),
        "avatar": f"https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        "monthlyIntensity": 85,
        "stats": {
            "totalOrders": 1,
            "stackPoints": 500,
            "workoutsCompleted": 12,
            "intensityScore": "8.5 / 10"
        },
        "activeMission": {
            "orderId": f"#{user_id}-1",
            "status": "WELCOME BONUS STACK PREPARED",
            "estDelivery": "3 DAYS VIA SPEED EXPRESS",
            "itemsCount": 1,
            "totalAmount": 0.00
        },
        "subscriptions": []
    }

    if db is not None:
        try:
            doc_to_save = dict(user_data)
            doc_to_save["password"] = req.password
            await db.users.insert_one(doc_to_save)
        except Exception as e:
            print(f"MongoDB insert user error: {e}")

    token = f"jwt_powerdose_{uuid.uuid4().hex}"
    return {
        "message": "Athlete registered successfully!",
        "token": token,
        "user": user_data
    }

@router.post("/login", response_model=AuthResponse)
async def login(req: LoginRequest):
    db = get_database()
    email_clean = req.email.strip().lower()
    
    if db is not None:
        try:
            user = await db.users.find_one({"email": email_clean}, {"_id": 0, "password": 0})
            if user:
                token = f"jwt_powerdose_{uuid.uuid4().hex}"
                return {
                    "message": "Login successful!",
                    "token": token,
                    "user": user
                }
        except Exception as e:
            print(f"MongoDB login query error: {e}")

    # Fallback default login for demo credentials or any email
    token = f"jwt_powerdose_{uuid.uuid4().hex}"
    default_user = {
        "id": "PD-7719-ELITE",
        "name": req.email.split('@')[0].replace('.', ' ').title() if '@' in req.email else "Elite Athlete",
        "email": email_clean,
        "rank": "ELITE ATHLETE",
        "memberSince": "JAN 2024",
        "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        "monthlyIntensity": 92,
        "stats": {
            "totalOrders": 18,
            "stackPoints": 4850,
            "workoutsCompleted": 142,
            "intensityScore": "9.8 / 10"
        },
        "activeMission": {
            "orderId": "#PD-8842-X",
            "status": "IN TRANSIT - DISPATCHED VIA SPEED EXPRESS",
            "estDelivery": "TOMORROW, 2:00 PM",
            "itemsCount": 3,
            "totalAmount": 124.98
        },
        "subscriptions": [
            { "name": "Titanium Whey Isolate (Double Chocolate)", "frequency": "Every 30 Days", "price": 67.49, "status": "Active" },
            { "name": "Nuclear Pre-Workout (Atomic Sour Apple)", "frequency": "Every 45 Days", "price": 44.99, "status": "Active" }
        ]
    }
    return {
        "message": "Login successful!",
        "token": token,
        "user": default_user
    }
