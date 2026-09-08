from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import logging

from backend.config import PORT, HOST
from backend.database import connect_to_mongo, close_mongo_connection
from backend.routes import products, categories, articles, offers, orders, user

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("powerdose_backend")

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Initializing PowerDose FastAPI Server...")
    await connect_to_mongo()
    yield
    await close_mongo_connection()
    logger.info("PowerDose FastAPI Server shut down.")

app = FastAPI(
    title="PowerDose Supplement API",
    description="High-Performance REST API with MongoDB Atlas Integration",
    version="1.0.0",
    lifespan=lifespan
)

# CORS Middleware Configuration
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(products.router)
app.include_router(categories.router)
app.include_router(articles.router)
app.include_router(offers.router)
app.include_router(orders.router)
app.include_router(user.router)

@app.get("/", tags=["Health Check"])
async def root():
    return {
        "status": "online",
        "service": "PowerDose Supplement API",
        "docs_url": "/docs",
        "health": "OK"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host=HOST, port=PORT, reload=True)
