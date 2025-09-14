import enum
from sqlalchemy import (
    Column, Integer, String, Boolean, text, ForeignKey,
    create_engine, TIMESTAMP
)
from sqlalchemy.dialects.postgresql import UUID, ENUM
from sqlalchemy.orm import declarative_base, relationship
import uuid

Base = declarative_base()

class UserRole(str, enum.Enum):
    citizen = "citizen"
    official = "official"
    analyst = "analyst"

class VerificationStatus(str, enum.Enum):
    pending = "pending"
    approved = "approved"
    rejected = "rejected"

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
    
    created_at = Column(
        TIMESTAMP(timezone=True),
        server_default=text("TIMEZONE('utc', now())"),
        nullable=False,
    )
    updated_at = Column(TIMESTAMP(timezone=True), onupdate=text("TIMEZONE('utc', now())"))

    verification_requests = relationship("VerificationRequest", back_populates="user")
    reports = relationship("Report", back_populates="user")

class VerificationRequest(Base):
    __tablename__ = "verification_requests"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    status = Column(
        ENUM(VerificationStatus, name="verification_status"), 
        nullable=False, 
        default=VerificationStatus.pending
    )
    document_s3_url = Column(String, nullable=False)
    reviewer_notes = Column(String)
    
    submitted_at = Column(
        TIMESTAMP(timezone=True),
        server_default=text("TIMEZONE('utc', now())"),
        nullable=False,
    )
    reviewed_at = Column(TIMESTAMP(timezone=True))
    
    user = relationship("User", back_populates="verification_requests")

class Report(Base):
    __tablename__ = "reports"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    hazard_type = Column(String(100), nullable=False)
    description = Column(String)
    reported_at = Column(TIMESTAMP(timezone=True), nullable=False)
    created_at = Column(
        TIMESTAMP(timezone=True),
        server_default=text("TIMEZONE('utc', now())"),
        nullable=False,
    )

    user = relationship("User", back_populates="reports")

