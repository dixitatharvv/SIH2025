from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    """
    Manages application settings by loading them from an .env file.
    """
    # These are now all required fields that MUST be in the .env file.
    DATABASE_URL: str
    SECRET_KEY: str
    RABBITMQ_URL: str # The default value has been removed.
    
    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()

