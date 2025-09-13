from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    """
    Manages application settings and environment variables.
    """
    DATABASE_URL: str
    SECRET_KEY: str
    
    # Add the connection URL for our local RabbitMQ server
    # The default guest:guest user is fine for local development.
    RABBITMQ_URL: str = "amqp://guest:guest@localhost/"
    
    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()

