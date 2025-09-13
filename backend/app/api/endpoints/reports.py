from fastapi import APIRouter, Form, UploadFile, File
from typing import Optional
from uuid import uuid4

from app.models.pydantic_models import ReportCreate, ReportSubmitResponse

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
    """
    Receives hazard report form data and optional media file.
    
    This endpoint will trigger the background processing via RabbitMQ.
    """
    report_data = ReportCreate(
        hazard_type=hazard_type,
        description=description,
        latitude=latitude,
        longitude=longitude
    )

    if media_file:
        # TODO: Upload media_file.file to Amazon S3 and get the URL
        print(f"Received media file: {media_file.filename} of type {media_file.content_type}")

    # TODO:
    # 1. Get user_id from the authentication token.
    # 2. Package report_data and the S3 media URL into a message.
    # 3. Publish the message to a RabbitMQ queue.
    
    print("Processing new hazard report:", report_data.model_dump_json(indent=2))

    # For now, we generate a dummy report ID. This will come from the DB later.
    new_report_id = uuid4() 

    return {
        "message": "Hazard report has been accepted for processing.",
        "report_id": new_report_id
    }
