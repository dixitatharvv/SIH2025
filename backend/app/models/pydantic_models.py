from pydantic import BaseModel, EmailStr
from uuid import UUID
from datetime import datetime

from app.db.models import UserRole

class UserCreate(BaseModel):
    email: EmailStr
    full_name: str
    password: str
    role: UserRole

class UserRead(BaseModel):
    id: UUID
    email: EmailStr
    full_name: str
    role: UserRole
    is_active: bool
    is_verified: bool

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class ReportCreate(BaseModel):
    hazard_type: str
    description: str | None = None
    latitude: float
    longitude: float

class ReportSubmitResponse(BaseModel):
    message: str
    report_id: UUID

