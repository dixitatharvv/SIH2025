from pydantic import BaseModel
from typing import Optional
from uuid import UUID

class ReportCreate(BaseModel):
    """
    Pydantic model for the data received when a user creates a report.
    This is used for internal validation after receiving form data.
    """
    hazard_type: str
    description: str
    latitude: float
    longitude: float
    user_id: Optional[str] = None

class ReportSubmitResponse(BaseModel):
    """
    The response sent back to the client after a report is accepted.
    """
    message: str
    report_id: UUID
