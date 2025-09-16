import enum
from sqlalchemy import (
    Column, Integer, String, Boolean, text, ForeignKey, Float,
    TIMESTAMP
)
from sqlalchemy.dialects.postgresql import UUID, ENUM, JSONB
from geoalchemy2 import Geography
from sqlalchemy.orm import declarative_base, relationship
import uuid

# Use a single Base for all models
Base = declarative_base()

# --- Enums for controlled vocabularies ---
class HazardType(str, enum.Enum):
    tsunami = "Tsunami"
    high_waves = "High Waves / Swell"
    coastal_flooding = "Coastal Flooding"
    storm_surge = "Storm Surge"
    rip_current = "Rip Current"
    coastal_erosion = "Coastal Erosion"
    water_discoloration = "Water Discoloration / Algal Bloom"
    marine_debris = "Marine Debris / Pollution"
    other = "Other"

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

class MediaType(str, enum.Enum):
    image = "image"
    video = "video"
    audio = "audio"

class VerificationSource(str, enum.Enum):
    nlp_pipeline = "nlp_pipeline"
    weather_api = "weather_api"
    peer_report = "peer_report"

# --- Main Tables ---

class User(Base):
    __tablename__ = "users"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    email = Column(String(255), unique=True, index=True, nullable=False)
    full_name = Column(String(255), nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(ENUM(UserRole, name="user_role"), nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), server_default=text("TIMEZONE('utc', now())"), nullable=False)

    reports = relationship("Report", back_populates="user")

class Report(Base):
    __tablename__ = "reports"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    
    user_hazard_type = Column(ENUM(HazardType, name="hazard_type"), nullable=False)
    user_location = Column(Geography(geometry_type='POINT', srid=4326), nullable=False)
    user_description = Column(String)
    user_city = Column(String(255), nullable=True)
    
    status = Column(ENUM(ReportStatus, name="report_status"), nullable=False, default=ReportStatus.under_verification)
    final_confidence_score = Column(Float, default=0.0)
    created_at = Column(TIMESTAMP(timezone=True), server_default=text("TIMEZONE('utc', now())"), nullable=False)
    
    user = relationship("User", back_populates="reports")
    media_files = relationship("Media", back_populates="report", cascade="all, delete-orphan")
    verifications = relationship("Verification", back_populates="report", cascade="all, delete-orphan")

class Media(Base):
    __tablename__ = "media"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    report_id = Column(UUID(as_uuid=True), ForeignKey("reports.id"), nullable=False)
    
    file_url = Column(String, nullable=False)
    media_type = Column(ENUM(MediaType, name="media_type"), nullable=False)
    
    file_metadata = Column(JSONB, nullable=True)
    
    created_at = Column(TIMESTAMP(timezone=True), server_default=text("TIMEZONE('utc', now())"), nullable=False)
    
    report = relationship("Report", back_populates="media_files")

class Verification(Base):
    __tablename__ = "verifications"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    report_id = Column(UUID(as_uuid=True), ForeignKey("reports.id"), nullable=False)
    
    source = Column(ENUM(VerificationSource, name="verification_source"), nullable=False)
    result_data = Column(JSONB, nullable=False)
    
    created_at = Column(TIMESTAMP(timezone=True), server_default=text("TIMEZONE('utc', now())"), nullable=False)
    
    report = relationship("Report", back_populates="verifications")

