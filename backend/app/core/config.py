from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    """
    Manages application settings and environment variables.
    """
    DATABASE_URL: setattr
    SECRET_KEY: str
    
    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()

