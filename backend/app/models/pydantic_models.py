from pydantic import BaseModel, EmailStr
from uuid import UUID
from datetime import datetime

# Import the ENUMs from your database models to ensure consistency across the application
from app.db.models import UserRole, ReportUrgency, ReportSentiment

# --- User Management Models ---

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
        from_attributes = True # Replaces orm_mode for Pydantic v2

class Token(BaseModel):
    access_token: str
    token_type: str


# --- Report Submission Models ---

class ReportCreate(BaseModel):
    """
    This model defines the structure of the report data that is passed
    into the RabbitMQ message. It includes data from the user's form
    and the auto-detected location data from the request headers.
    """
    user_hazard_type: str
    user_description: str | None = None
    latitude: float
    longitude: float


class ReportSubmitResponse(BaseModel):
    message: str
    report_id: UUID


# --- Verification Models (for the "fan-in" part later) ---

class NlpResultCreate(BaseModel):
    """
    Defines the shape of the data the NLP service will send back
    to our main backend to be stored in the 'verifications' table.
    """
    report_id: UUID
    nlp_hazard_type: str
    nlp_urgency: ReportUrgency
    nlp_sentiment: ReportSentiment
    # nlp_location could be added later if the pipeline extracts it

