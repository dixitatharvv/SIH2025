import uuid
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.db.models import Verification, VerificationSource, Report
from app.models.pydantic_models import VerificationCreate
from sqlalchemy.future import select

router = APIRouter()

@router.post(
    "/weather",
    status_code=201,
    summary="Submit Weather API Verification",
    description="An endpoint for the standalone weather worker to submit its findings."
)
async def submit_weather_verification(
    verification_in: VerificationCreate,
    db: AsyncSession = Depends(get_db)
):
    """
    Creates a new verification record with the source set to 'weather_api'.
    It first checks if the original report exists.
    """
    # Check if the report exists before adding a verification for it
    report_exists = await db.get(Report, verification_in.report_id)
    if not report_exists:
        raise HTTPException(
            status_code=404,
            detail=f"Report with ID {verification_in.report_id} not found."
        )

    new_verification_record = Verification(
        report_id=verification_in.report_id,
        source=VerificationSource.weather_api, # Set the source
        result_data=verification_in.result_data # Store the flexible JSON data
    )
    db.add(new_verification_record)
    await db.commit()
    
    return {"message": "Weather verification successfully recorded."}

