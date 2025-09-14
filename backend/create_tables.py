import asyncio
from app.db.session import engine
from app.db.models import Base

async def create_all_tables():
    """Connects to the database and creates all tables."""
    async with engine.begin() as conn:
        print("Dropping all existing tables...")
        await conn.run_sync(Base.metadata.drop_all)
        print("Creating new tables...")
        await conn.run_sync(Base.metadata.create_all)
        print("Tables created successfully.")

if __name__ == "__main__":
    asyncio.run(create_all_tables())
