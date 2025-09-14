import uuid
from sqlalchemy import (
    Column, String, Integer, DateTime, Float, ForeignKey, Enum
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy.sql import func
from geoalchemy2 import Geography

# The declarative_base() function returns a new base class
# from which all mapped classes should inherit.
Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String(255), unique=True, nullable=False, index=True)
    full_name = Column(String(255), nullable=False)
    hashed_password = Column(String, nullable=False)
    phone_number = Column(String(20), unique=True)
    reputation_score = Column(Integer, default=100, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    reports = relationship("Report", back_populates="user")

class Report(Base):
    __tablename__ = 'reports'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    # dummy user
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=False)
    location = Column(Geography(geometry_type='POINT', srid=4326), nullable=False)
    hazard_type = Column(String(100), nullable=False)
    description = Column(String)
    final_confidence_score = Column(Float, default=0.0)
    source = Column(Enum('MobileApp', 'WebApp', 'SMS', name='report_source'), nullable=False)
    status = Column(Enum('Pending', 'UnderVerification', 'Verified', 'Rejected', name='report_status'), default='Pending', nullable=False)
    reported_at = Column(DateTime(timezone=True), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    user = relationship("User", back_populates="reports")
