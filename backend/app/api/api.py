from fastapi import APIRouter
from app.api.endpoints import reports

api_router = APIRouter()

# Include the reports router, adding a prefix to all its routes
# All routes in reports.router will now start with /reports
api_router.include_router(reports.router, prefix="/reports", tags=["Reports"])

# When you create auth.py, you'll add its router here:
# from app.api.endpoints import auth
# api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
