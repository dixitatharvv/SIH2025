from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.api import api_router
from app.core.config import settings
from app.services.rabbitmq_service import rabbitmq_service

app = FastAPI(
    title="Pravaah API",
    description="API for crowdsourced ocean hazard reporting and social media analytics.",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    await rabbitmq_service.connect()
    print("Pravaah API startup complete.")

@app.on_event("shutdown")
async def shutdown_event():
    await rabbitmq_service.close()
    print("Pravaah API shutdown complete.")

app.include_router(api_router)

@app.get("/", tags=["Root"])
def read_root():
    return {"status": "active", "message": "Welcome to the Pravaah API!"}