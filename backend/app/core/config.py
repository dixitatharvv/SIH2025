from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    """
    Manages all application settings and environment variables.
    """
    # --- Core Services ---
    DATABASE_URL: str
    SYNC_DATABASE_URL: str
    RABBITMQ_URL: str
    
    # --- JWT Security ---
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # --- AWS S3 Settings ---
    AWS_ACCESS_KEY_ID: str
    AWS_SECRET_ACCESS_KEY: str
    AWS_S3_BUCKET_NAME: str
    AWS_S3_REGION: str

    WEATHERAPI_KEY: str

    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()

