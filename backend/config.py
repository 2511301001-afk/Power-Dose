import os
from dotenv import load_dotenv

# Load .env file from project root
dotenv_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env')
load_dotenv(dotenv_path=dotenv_path)

MONGODB_URL = os.getenv("MONGODB_URL", "mongodb+srv://2511301001_db_user:007yJjxAxlojlCX7@cluster0.frhkr8w.mongodb.net/?appName=Cluster0")
DB_NAME = os.getenv("DB_NAME", "powerdose_db")
PORT = int(os.getenv("PORT", 8000))
HOST = os.getenv("HOST", "0.0.0.0")
