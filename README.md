# ChainGuard AI

Enterprise-grade SaaS platform for real-time predictive supply chain disruption analytics.

## Tech Stack
- **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS, Zustand, TanStack Query, Recharts, Framer Motion.
- **Backend**: FastAPI (Python), SQLAlchemy, PostgreSQL, Redis, Celery.
- **AI/ML**: Scikit-learn (Risk Scoring), Grok API (NLP on news data).

## Project Structure
```
ChainGuard AI/
├── frontend/           # Next.js Application
├── backend/            # FastAPI Application
├── scripts/            # Database initialization and seeding
└── .env                # Environment variables
```

## Setup Instructions

### Frontend
1. Navigate to `frontend/`
2. Install dependencies: `npm install`
3. Run dev server: `npm run dev`

### Backend
1. Navigate to `backend/`
2. Install dependencies: `pip install -r requirements.txt`
3. Run migrations/init DB: `python ../scripts/init_db.py`
4. Seed data: `python ../scripts/seed_data.py`
5. Run FastAPI: `uvicorn app.main:app --reload`

### Background Tasks (Celery)
1. Ensure Redis is running.
2. Run Celery worker: `celery -A app.tasks.worker worker --loglevel=info`

## Features
- **Supplier Risk Scoring**: Real-time aggregation of news and shipping data.
- **Predictive Alerts**: ML-driven 48-hour forecasts for supply chain shocks.
- **ROI Dashboard**: Clear visualization of avoided losses vs subscription cost.
- **Alternative Sourcing**: Database of vetted alternatives for high-risk components.
```
