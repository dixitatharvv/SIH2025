from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.api import api_router
from app.core.config import settings

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
    print(f"Database URL loaded from .env: {settings.DATABASE_URL}")
    print("Pravaah API startup complete.")

app.include_router(api_router)

@app.get("/", tags=["Root"])
def read_root():
    """
    Root endpoint to check if the API is active.
    """
    return {"status": "active", "message": "Welcome to the Pravaah API!"}
