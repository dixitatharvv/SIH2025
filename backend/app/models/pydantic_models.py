from pydantic import BaseModel, EmailStr
from uuid import UUID
from datetime import datetime

from app.db.models import UserRole

class UserBase(BaseModel):
    email: EmailStr
    full_name: str

class UserCreate(UserBase):
    password: str
    role: UserRole

class UserRead(UserBase):
    id: UUID
    role: UserRole
    is_active: bool

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class ReportBase(BaseModel):
    user_hazard_type: str
    user_description: str | None = None
    latitude: float
    longitude: float

class ReportCreate(ReportBase):
    pass

class ReportSubmitResponse(BaseModel):
    message: str
    report_id: UUID

