from fastapi import APIRouter, Form, UploadFile, File, HTTPException
from typing import Optional
from uuid import uuid4
from app.models.pydantic_models import ReportCreate, ReportSubmitResponse
from app.services.rabbitmq_service import rabbitmq_service

router = APIRouter()

@router.post(
    "/submit", 
    response_model=ReportSubmitResponse, 
    status_code=202
)
async def submit_hazard_report(
    hazard_type: str = Form(...),
    description: str = Form(...),
    latitude: float = Form(...),
    longitude: float = Form(...),
    media_file: Optional[UploadFile] = File(None)
):
    report_id = uuid4()
    
    report_data = ReportCreate(
        hazard_type=hazard_type,
        description=description,
        latitude=latitude,
        longitude=longitude
    )

    media_filename = media_file.filename if media_file else None
    
    message_body = {
        "report_id": str(report_id),
        "report_data": report_data.model_dump(),
        "media_filename": media_filename,
    }

    # --- ADDED ERROR HANDLING ---
    try:
        await rabbitmq_service.publish_message(
            queue_name="report_verification_queue", 
            message_body=message_body
        )
    except Exception as e:
        # If anything goes wrong with RabbitMQ, we now see a clear error
        print(f"CRITICAL: Failed to publish message to RabbitMQ. Error: {e}")
        # And we raise a proper server error instead of a fake success
        raise HTTPException(
            status_code=500, 
            detail="Could not publish report to processing queue."
        )
    # ---------------------------
    
    return {
        "message": "Hazard report has been accepted for processing.",
        "report_id": report_id
    }

