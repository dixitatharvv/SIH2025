from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

# create_async_engine is the SQLAlchemy entry point to the database
# for asynchronous applications.
engine = create_async_engine(settings.DATABASE_URL, echo=True, future=True)

# The sessionmaker factory generates new Session objects when called.
# We configure it with our engine and specify AsyncSession.
AsyncSessionLocal = sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)

async def get_db_session() -> AsyncSession:
    """Dependency to get a new async database session."""
    async with AsyncSessionLocal() as session:
        yield session
