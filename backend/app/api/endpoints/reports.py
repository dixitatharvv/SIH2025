from fastapi import APIRouter, Form, HTTPException, Depends
from typing import Optional
from uuid import uuid4

from app.models.pydantic_models import ReportCreate, ReportSubmitResponse
from app.services.rabbitmq_service import rabbitmq_service
from app.db.models import User
from app.api.dependencies import get_current_user

router = APIRouter()

@router.post(
    "/submit",
    response_model=ReportSubmitResponse,
    status_code=202
)
async def submit_hazard_report(
    user_hazard_type: str = Form(..., alias="user_hazard_type"),
    user_description: Optional[str] = Form(None, alias="user_description"),
    latitude: float = Form(...),
    longitude: float = Form(...),
    current_user: User = Depends(get_current_user)
):
    report_id = uuid4()

    report_data = ReportCreate(
        user_hazard_type=user_hazard_type,
        user_description=user_description,
        latitude=latitude,
        longitude=longitude
    )

    message_body = {
        "report_id": str(report_id),
        "user_id": str(current_user.id),
        "report_data": report_data.model_dump(),
    }

    try:
        await rabbitmq_service.publish_message(
            queue_name="report_processing_queue",
            message_body=message_body
        )
        print(f"Successfully published message for report {report_id} by user {current_user.email}")
    except Exception as e:
        print(f"Error publishing to RabbitMQ: {e}")
        raise HTTPException(
            status_code=500,
            detail="Could not queue report for processing."
        )

    return {
        "message": "Hazard report has been accepted for processing.",
        "report_id": report_id
    }

