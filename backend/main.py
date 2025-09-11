from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import re
import os
from dotenv import load_dotenv


load_dotenv()

app = FastAPI(title="SIH project ocean API")


#
allow_origin_regex = r"http://localhost(:\d+)?"


app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=allow_origin_regex,
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],
)


DATABASE_URL = os.getenv("DATABASE_URL")
print(f"Database URL loaded from .env: {DATABASE_URL}")


#will change later
class HazardReport(BaseModel):
    hazard_type: str
    description: str
    latitude: float
    longitude: float
    user_id: Optional[str] = None 

@app.get("/")
def read_root():
    """
    Root endpoint to check if the API is active.
    """
    return {"message": "Welcome!"}

@app.post("/reports/submit")
async def submit_hazard_report(
    hazard_type: str = Form(...),
    description: str = Form(...),
    latitude: float = Form(...),
    longitude: float = Form(...),
    media_file: Optional[UploadFile] = File(None)
):
    """
    this will receive report from frontend and trigger rabbitMQ msg
    """
    report_data = {
        "hazard_type": hazard_type,
        "description": description,
        "latitude": latitude,
        "longitude": longitude,
    }

    if media_file:
        report_data["media_filename"] = media_file.filename
        #will save on amazon s3 later on
        print(f"Received media file: {media_file.filename}")

    # TODO:
    # 1. Save the report_data to your PostgreSQL database.
    # 2. Save the media_file to Amazon S3.
    # 3. Publish a message with the new report's ID to RabbitMQ.

    print("Received new hazard report:", report_data)

    return {"status": "success", "message": "Hazard report received successfully.", "report": report_data}
