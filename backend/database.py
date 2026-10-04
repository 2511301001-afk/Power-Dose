import ssl
import logging
import certifi
from fastapi import HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import MongoClient
from pymongo.errors import PyMongoError, ConfigurationError
from backend.config import MONGODB_URL, DB_NAME

logger = logging.getLogger(__name__)

class DatabaseManager:
    client: AsyncIOMotorClient = None
    db = None

db_manager = DatabaseManager()

def get_database():
    if db_manager.db is None:
        raise HTTPException(
            status_code=503,
            detail="Database service unavailable. Please check your MONGODB_URL environment variable in Render."
        )
    return db_manager.db

def get_mongo_kwargs():
    """Returns robust Mongo connection parameters for SSL/TLS compatibility."""
    return {
        "tls": True,
        "tlsAllowInvalidCertificates": True,
        "tlsCAFile": certifi.where(),
        "serverSelectionTimeoutMS": 10000,
        "connectTimeoutMS": 10000,
        "socketTimeoutMS": 20000
    }

async def connect_to_mongo():
    logger.info("Connecting to MongoDB Atlas...")
    try:
        kwargs = get_mongo_kwargs()
        db_manager.client = AsyncIOMotorClient(MONGODB_URL, **kwargs)
        db_manager.db = db_manager.client[DB_NAME]
        # Ping database to confirm connection
        await db_manager.client.admin.command('ping')
        logger.info(f"Successfully connected to MongoDB Atlas database: {DB_NAME}")
    except (ConfigurationError, PyMongoError, Exception) as e:
        logger.error(f"MongoDB connection error ({type(e).__name__}): {e}")
        logger.warning("FastAPI server will continue running, but MongoDB operations will return 503 until MONGODB_URL is fixed.")

async def close_mongo_connection():
    if db_manager.client:
        db_manager.client.close()
        logger.info("MongoDB connection closed.")

def get_sync_db():
    kwargs = get_mongo_kwargs()
    sync_client = MongoClient(MONGODB_URL, **kwargs)
    return sync_client[DB_NAME]

