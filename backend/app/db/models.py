import enum
from sqlalchemy import (
    Column, Integer, String, Boolean, text, ForeignKey, Float,
    TIMESTAMP
)
from sqlalchemy.dialects.postgresql import UUID, ENUM, JSONB
from geoalchemy2 import Geography
from sqlalchemy.orm import declarative_base, relationship
import uuid

Base = declarative_base()

class UserRole(str, enum.Enum):
    citizen = "citizen"
    official = "official"
    analyst = "analyst"

class ReportStatus(str, enum.Enum):
    under_verification = "under_verification"
    verified = "verified"
    rejected = "rejected"

class ReportUrgency(str, enum.Enum):
    immediate = "immediate"
    moderate = "moderate"
    low = "low"
    rumor = "rumor"

class ReportSentiment(str, enum.Enum):
    panic = "panic"
    calm = "calm"
    confusion = "confusion"

class VerificationSource(str, enum.Enum):
    nlp_pipeline = "nlp_pipeline"
    weather_api = "weather_api"
    peer_report = "peer_report"

class User(Base):
    __tablename__ = "users"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String(255), unique=True, index=True, nullable=False)
    full_name = Column(String(255), nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(ENUM(UserRole, name="user_role"), nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    
    is_verified = Column(Boolean, default=False)
    department = Column(String(255))
    specialization = Column(String(255))
    reputation_score = Column(Integer)
    
    created_at = Column(TIMESTAMP(timezone=True), server_default=text("TIMEZONE('utc', now())"), nullable=False)
    updated_at = Column(TIMESTAMP(timezone=True), onupdate=text("TIMEZONE('utc', now())"))

    reports = relationship("Report", back_populates="user")

class Report(Base):
    __tablename__ = "reports"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    
    user_hazard_type = Column(String(100), nullable=False)
    user_location = Column(Geography(geometry_type='POINT', srid=4326), nullable=False)
    user_description = Column(String)
    
    status = Column(ENUM(ReportStatus, name="report_status"), nullable=False, default=ReportStatus.under_verification)
    final_confidence_score = Column(Float, default=0.0)
    
    created_at = Column(TIMESTAMP(timezone=True), server_default=text("TIMEZONE('utc', now())"), nullable=False)
    
    user = relationship("User", back_populates="reports")
    verifications = relationship("Verification", back_populates="report", cascade="all, delete-orphan")

class Verification(Base):
    __tablename__ = "verifications"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    report_id = Column(UUID(as_uuid=True), ForeignKey("reports.id"), nullable=False)
    
    source = Column(ENUM(VerificationSource, name="verification_source"), nullable=False)
    result_data = Column(JSONB, nullable=False)
    
    created_at = Column(TIMESTAMP(timezone=True), server_default=text("TIMEZONE('utc', now())"), nullable=False)
    
    report = relationship("Report", back_populates="verifications")

