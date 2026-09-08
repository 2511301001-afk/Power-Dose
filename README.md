# PowerDose - High-Performance Supplement Platform

Full-Stack Supplement Application built with **React**, **FastAPI**, and **MongoDB Atlas**.

---

## 🚀 Backend Setup & Execution (Python FastAPI + MongoDB Atlas)

### 1. Prerequisites
- Python 3.10+
- MongoDB Atlas cluster (Connection URL configured in `.env`)

### 2. Environment Configuration
The `.env` file in the root directory contains:
```env
MONGODB_URL=mongodb+srv://2511301001_db_user:007yJjxAxlojlCX7@cluster0.frhkr8w.mongodb.net/?appName=Cluster0
DB_NAME=powerdose_db
PORT=8000
HOST=0.0.0.0
```

### 3. Install Backend Dependencies
```bash
py -m pip install -r backend/requirements.txt
```

### 4. Seed MongoDB Database
Populate MongoDB Atlas collections (`products`, `categories`, `articles`, `offers`, `orders`, `user_profile`, `admin_stats`) with default data:
```bash
py -m backend.seed
```

### 5. Run FastAPI Backend Server
```bash
py -m uvicorn backend.main:app --port 8000 --reload
```
- **API Base URL**: `http://localhost:8000/api`
- **Interactive Swagger Docs**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

---

## 🎨 Frontend Setup (React + Vite)

### 1. Install Node Dependencies
```bash
npm install
```

### 2. Start Frontend Dev Server
```bash
npm run dev
```
App will run at `http://localhost:5173`.

---

## 📡 API Endpoints Overview

| Endpoint | Method | Description |
|---|---|---|
| `/` | `GET` | API Health & Status check |
| `/api/products` | `GET`, `POST` | List products (with filter/sort) or create new product |
| `/api/products/{id}` | `GET`, `PUT`, `DELETE` | Retrieve, update, or delete single product |
| `/api/categories` | `GET` | Get product categories |
| `/api/articles` | `GET` | Get explore / blog articles |
| `/api/offers` | `GET` | Get flash sales and deals |
| `/api/orders` | `GET`, `POST` | Retrieve all orders or submit a new order |
| `/api/user/profile` | `GET` | Get user profile and mission status |
| `/api/admin/stats` | `GET` | Get admin dashboard stats and recent orders |
