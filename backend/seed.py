import sys
import os
import logging

# Ensure root workspace is on python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.database import get_sync_db

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("seed")

PRODUCTS = [
  {
    "id": "pd-1",
    "name": "TITANIUM WHEY ISOLATE",
    "subtitle": "100% Ultra-Filtered Whey Protein Isolate",
    "category": "Whey Protein",
    "brand": "PowerDose Labs",
    "price": 74.99,
    "originalPrice": 89.99,
    "rating": 4.9,
    "reviewsCount": 342,
    "badge": "BEST SELLER",
    "flavor": "Double Chocolate Melt",
    "size": "5 LBS (2.27 KG)",
    "servings": 75,
    "proteinPerServing": "30G",
    "doseIntensity": 9,
    "image": "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=600&q=80",
    "description": "Rapid absorption, zero filler, 30g pure whey isolate per scoop with digestive enzymes and zero added sugar.",
    "inStock": True,
    "stockCount": 42
  },
  {
    "id": "pd-2",
    "name": "NUCLEAR PRE-WORKOUT IGNITER",
    "subtitle": "High-Stimulant Neuro-Focus Matrix",
    "category": "Pre-Workout",
    "brand": "PowerDose Labs",
    "price": 49.99,
    "originalPrice": 59.99,
    "rating": 4.95,
    "reviewsCount": 518,
    "badge": "HIGH STIM",
    "flavor": "Atomic Sour Apple",
    "size": "400G (30 SERVINGS)",
    "servings": 30,
    "proteinPerServing": "0G",
    "doseIntensity": 10,
    "image": "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=600&q=80",
    "description": "Explosive energy, skin-splitting muscle pump matrix, and laser neuro-focus. Powered by 400mg Caffeine Anhydrous & L-Citrulline.",
    "inStock": True,
    "stockCount": 18
  },
  {
    "id": "pd-3",
    "name": "ANABOLIC MASS GAINER XTREME",
    "subtitle": "High-Calorie Nutrient Dense Mass Builder",
    "category": "Mass Gainer",
    "brand": "Titan Series",
    "price": 64.99,
    "originalPrice": 79.99,
    "rating": 4.8,
    "reviewsCount": 198,
    "badge": "HEAVYWEIGHT",
    "flavor": "Vanilla Beast",
    "size": "10 LBS (4.5 KG)",
    "servings": 28,
    "proteinPerServing": "50G",
    "doseIntensity": 8,
    "image": "https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=600&q=80",
    "description": "1,250 clean calories, 50g multi-stage protein, 250g complex carbohydrates, enhanced with BCAAs and Creatine.",
    "inStock": True,
    "stockCount": 25
  },
  {
    "id": "pd-4",
    "name": "PURE CREATINE MONOHYDRATE",
    "subtitle": "100% Micronized Muscle Power",
    "category": "Pre-Workout",
    "brand": "PowerDose Labs",
    "price": 29.99,
    "originalPrice": 34.99,
    "rating": 4.98,
    "reviewsCount": 620,
    "badge": "PURE POWER",
    "flavor": "Unflavored",
    "size": "500G (100 SERVINGS)",
    "servings": 100,
    "proteinPerServing": "0G",
    "doseIntensity": 7,
    "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
    "description": "Ultra-pure 200 mesh micronized creatine monohydrate for maximum strength, ATP regeneration, and muscle cell hydration.",
    "inStock": True,
    "stockCount": 85
  },
  {
    "id": "pd-5",
    "name": "ALPHA MULTI-VITAMIN MATRIX",
    "subtitle": "High Potency Athletic Micronutrient Shield",
    "category": "Vitamins",
    "brand": "Vital Shield",
    "price": 34.99,
    "originalPrice": 39.99,
    "rating": 4.75,
    "reviewsCount": 145,
    "badge": "ESSENTIAL",
    "flavor": "Capsules",
    "size": "120 CAPSULES",
    "servings": 60,
    "proteinPerServing": "0G",
    "doseIntensity": 6,
    "image": "https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=600&q=80",
    "description": "Comprehensive micronutrient complex tailored for intense athletic training recovery, immune support, and joint resilience.",
    "inStock": True,
    "stockCount": 60
  },
  {
    "id": "pd-6",
    "name": "POWERDOSE SHAKER BOTTLE 1000ML",
    "subtitle": "Heavy Duty BPA-Free Steel Shaker",
    "category": "Accessories",
    "brand": "PowerDose Gear",
    "price": 19.99,
    "originalPrice": 24.99,
    "rating": 4.9,
    "reviewsCount": 210,
    "badge": "GEAR",
    "flavor": "Matte Obsidian Black",
    "size": "1000 ML (33 OZ)",
    "servings": 1,
    "proteinPerServing": "N/A",
    "doseIntensity": 10,
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
    "description": "Leak-proof double wall insulated stainless steel shaker bottle with surgical precision mixing ball.",
    "inStock": True,
    "stockCount": 110
  }
]

CATEGORIES = [
  { "name": "Whey Protein", "count": 18, "image": "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=400&q=80" },
  { "name": "Pre-Workout", "count": 14, "image": "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=400&q=80" },
  { "name": "Mass Gainer", "count": 9, "image": "https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=400&q=80" },
  { "name": "Vitamins", "count": 12, "image": "https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=400&q=80" },
  { "name": "Accessories", "count": 15, "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80" }
]

ARTICLES = [
  {
    "id": "art-1",
    "title": "THE NEUROLOGICAL ADVANTAGE: PRE-WORKOUTS EXPLAINED",
    "category": "Training Science",
    "author": "Dr. Marcus Vance, PhD",
    "readTime": "6 MIN READ",
    "date": "AUG 14, 2026",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
    "summary": "Discover how central nervous system arousal, alpha-GPC synergy, and nitric oxide precursors push physical output past physiological barriers.",
    "tags": ["NEUROLOGY", "PRE-WORKOUT", "HYPERTROPHY"],
    "featured": True
  },
  {
    "id": "art-2",
    "title": "MACRO CYCLING FOR MASS ACCUMULATION WITHOUT FAT GAIN",
    "category": "Dietary Tactics",
    "author": "Coach Elena Rostova",
    "readTime": "8 MIN READ",
    "date": "AUG 10, 2026",
    "image": "https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?auto=format&fit=crop&w=800&q=80",
    "summary": "Master precise insulin control and caloric modulation during high-volume hyper-gravity training mesocycles.",
    "tags": ["NUTRITION", "BULKING", "INSULIN SENSITIVITY"]
  },
  {
    "id": "art-3",
    "title": "THE SYNERGY EFFECT: CREATINE & BETA-ALANINE MATRIX",
    "category": "Supplement Stacks",
    "author": "PowerDose Research Lab",
    "readTime": "5 MIN READ",
    "date": "AUG 05, 2026",
    "image": "https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=800&q=80",
    "summary": "Combining phosphocreatine replenishment with intracellular carnosine buffering to increase max rep volume by 22%.",
    "tags": ["CREATINE", "STRENGTH", "ATP REGEN"]
  },
  {
    "id": "art-4",
    "title": "SLEEP ARCHITECTURE FOR ELITE ATHLETIC RECOVERY",
    "category": "Recovery Protocols",
    "author": "Dr. Sarah Jenkins",
    "readTime": "7 MIN READ",
    "date": "JUL 28, 2026",
    "image": "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80",
    "summary": "Optimizing Slow-Wave Delta sleep phases for peak Human Growth Hormone pulse secretion and CNS repair.",
    "tags": ["RECOVERY", "SLEEP", "HORMONE OPTIMIZATION"]
  }
]

OFFERS = [
  {
    "id": "off-1",
    "title": "NITRIC SURGE HYPER-STACK",
    "discount": "35% OFF",
    "code": "POWER20",
    "expiresIn": "08:42:19",
    "productsIncluded": ["Titanium Whey Isolate 5Lbs", "Nuclear Pre-Workout Igniter", "Pure Creatine 500g"],
    "originalPrice": 154.97,
    "salePrice": 99.99,
    "image": "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=600&q=80",
    "badge": "FLASH SALE"
  },
  {
    "id": "off-2",
    "title": "ANABOLIC BULK MATRIX BUNDLE",
    "discount": "30% OFF",
    "code": "ANABOLIC15",
    "expiresIn": "14:12:00",
    "productsIncluded": ["Anabolic Mass Gainer 10Lbs", "Alpha Multi-Vitamin", "Steel Shaker Bottle"],
    "originalPrice": 119.97,
    "salePrice": 83.99,
    "image": "https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=600&q=80",
    "badge": "HEAVY SAVINGS"
  }
]

USER_PROFILE = {
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

ADMIN_STATS = {
  "totalRevenue": "$128,450.00",
  "revenueGrowth": "+24.5%",
  "activeOrders": 142,
  "newCustomers": 892,
  "lowStockAlerts": 3,
  "topMovers": [
    { "name": "TITANIUM WHEY ISOLATE 5LBS", "category": "Whey", "sold": 1420, "revenue": "$106,486.00", "stock": 42, "status": "IN STOCK" },
    { "name": "NUCLEAR PRE-WORKOUT IGNITER", "category": "Pre-Workout", "sold": 980, "revenue": "$48,990.00", "stock": 18, "status": "LOW STOCK" },
    { "name": "PURE CREATINE MONOHYDRATE", "category": "Pre-Workout", "sold": 850, "revenue": "$25,491.50", "stock": 85, "status": "IN STOCK" },
    { "name": "ANABOLIC MASS GAINER XTREME", "category": "Mass Gainer", "sold": 410, "revenue": "$26,645.90", "stock": 25, "status": "IN STOCK" }
  ],
  "recentOrders": [
    { "id": "PD-9921", "customer": "Alex Vance", "items": "2x Whey Isolate, 1x Creatine", "amount": "$179.97", "status": "Processing", "date": "10 Mins Ago" },
    { "id": "PD-9920", "customer": "Sarah Jenkins", "items": "1x Pre-Workout Igniter", "amount": "$49.99", "status": "Shipped", "date": "35 Mins Ago" }
  ]
}

def seed_database():
    logger.info("Connecting to MongoDB Atlas for Seeding...")
    db = get_sync_db()

    # Clear existing collections
    logger.info("Clearing existing collections...")
    db.products.delete_many({})
    db.categories.delete_many({})
    db.articles.delete_many({})
    db.offers.delete_many({})
    db.user_profile.delete_many({})
    db.admin_stats.delete_many({})

    # Insert initial collections
    logger.info("Inserting products...")
    db.products.insert_many(PRODUCTS)

    logger.info("Inserting categories...")
    db.categories.insert_many(CATEGORIES)

    logger.info("Inserting articles...")
    db.articles.insert_many(ARTICLES)

    logger.info("Inserting offers...")
    db.offers.insert_many(OFFERS)

    logger.info("Inserting user profile...")
    db.user_profile.insert_one(USER_PROFILE)

    logger.info("Inserting admin stats...")
    db.admin_stats.insert_one(ADMIN_STATS)

    logger.info("🎉 Database seeding completed successfully!")

if __name__ == "__main__":
    seed_database()
