from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import MongoClient
import logging
from backend.config import MONGODB_URL, DB_NAME

logger = logging.getLogger(__name__)

class DatabaseManager:
    client: AsyncIOMotorClient = None
    db = None

db_manager = DatabaseManager()

def get_database():
    return db_manager.db

async def connect_to_mongo():
    logger.info("Connecting to MongoDB Atlas...")
    db_manager.client = AsyncIOMotorClient(MONGODB_URL)
    db_manager.db = db_manager.client[DB_NAME]
    # Ping database to confirm connection
    await db_manager.client.admin.command('ping')
    logger.info(f"Successfully connected to MongoDB Atlas database: {DB_NAME}")

async def close_mongo_connection():
    if db_manager.client:
        db_manager.client.close()
        logger.info("MongoDB connection closed.")

def get_sync_db():
    sync_client = MongoClient(MONGODB_URL)
    return sync_client[DB_NAME]
