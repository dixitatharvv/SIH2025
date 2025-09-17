# ai/config.py
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    RABBITMQ_URL: str
    GEMINI_API_KEY: str

    class Config:
        env_file = ".env"
        env_file_encoding = 'utf-8'

settings = Settings()