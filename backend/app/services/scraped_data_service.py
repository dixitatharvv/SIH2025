from typing import Optional, List, Dict, Any
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_
from app.db.models import ScrapedData, ScrapedDataSource
import uuid
from datetime import datetime


class ScrapedDataService:
    def __init__(self, db: AsyncSession):
        self.db = db
    
    async def store_scraped_data(
        self,
        source: ScrapedDataSource,
        source_url: str,
        event_type: Optional[str] = None,
        location: Optional[str] = None,
        urgency: Optional[str] = None,
        sentiment: Optional[str] = None,
        raw_content: Optional[str] = None,
        content_metadata: Optional[Dict[str, Any]] = None,
        source_created_at: Optional[datetime] = None,
        processing_notes: Optional[str] = None
    ) -> ScrapedData:
        """Store scraped data in the database."""
        
        # Check if data already exists
        result = await self.db.execute(
            select(ScrapedData).where(ScrapedData.source_url == source_url)
        )
        existing = result.scalar_one_or_none()
        
        if existing:
            # Update existing record
            existing.event_type = event_type
            existing.location = location
            existing.urgency = urgency
            existing.sentiment = sentiment
            existing.raw_content = raw_content
            existing.content_metadata = content_metadata
            existing.source_created_at = source_created_at
            existing.processing_notes = processing_notes
            existing.is_processed = True
            await self.db.commit()
            await self.db.refresh(existing)
            return existing
        
        # Create new record
        scraped_data = ScrapedData(
            source=source,
            source_url=source_url,
            event_type=event_type,
            location=location,
            urgency=urgency,
            sentiment=sentiment,
            raw_content=raw_content,
            content_metadata=content_metadata,
            source_created_at=source_created_at,
            processing_notes=processing_notes,
            is_processed=True
        )
        
        self.db.add(scraped_data)
        await self.db.commit()
        await self.db.refresh(scraped_data)
        return scraped_data
    
    async def get_scraped_data_by_source(
        self, 
        source: ScrapedDataSource, 
        limit: int = 100, 
        offset: int = 0
    ) -> List[ScrapedData]:
        """Get scraped data by source type."""
        result = await self.db.execute(
            select(ScrapedData)
            .where(ScrapedData.source == source)
            .order_by(ScrapedData.scraped_at.desc())
            .limit(limit)
            .offset(offset)
        )
        return result.scalars().all()
    
    async def get_scraped_data_by_event_type(
        self, 
        event_type: str, 
        limit: int = 100, 
        offset: int = 0
    ) -> List[ScrapedData]:
        """Get scraped data by event type."""
        result = await self.db.execute(
            select(ScrapedData)
            .where(ScrapedData.event_type == event_type)
            .order_by(ScrapedData.scraped_at.desc())
            .limit(limit)
            .offset(offset)
        )
        return result.scalars().all()
    
    async def get_scraped_data_by_location(
        self, 
        location: str, 
        limit: int = 100, 
        offset: int = 0
    ) -> List[ScrapedData]:
        """Get scraped data by location."""
        result = await self.db.execute(
            select(ScrapedData)
            .where(ScrapedData.location.ilike(f"%{location}%"))
            .order_by(ScrapedData.scraped_at.desc())
            .limit(limit)
            .offset(offset)
        )
        return result.scalars().all()
    
    async def get_unprocessed_data(self, limit: int = 100) -> List[ScrapedData]:
        """Get unprocessed scraped data."""
        result = await self.db.execute(
            select(ScrapedData)
            .where(ScrapedData.is_processed == False)
            .order_by(ScrapedData.scraped_at.asc())
            .limit(limit)
        )
        return result.scalars().all()
    
    async def mark_as_processed(self, scraped_data_id: uuid.UUID, processing_notes: Optional[str] = None) -> bool:
        """Mark scraped data as processed."""
        result = await self.db.execute(
            select(ScrapedData).where(ScrapedData.id == scraped_data_id)
        )
        scraped_data = result.scalar_one_or_none()
        
        if scraped_data:
            scraped_data.is_processed = True
            if processing_notes:
                scraped_data.processing_notes = processing_notes
            await self.db.commit()
            return True
        return False
    
    async def get_scraped_data_stats(self) -> Dict[str, Any]:
        """Get statistics about scraped data."""
        total_result = await self.db.execute(select(ScrapedData))
        total_count = len(total_result.scalars().all())
        
        twitter_result = await self.db.execute(
            select(ScrapedData).where(ScrapedData.source == ScrapedDataSource.twitter)
        )
        twitter_count = len(twitter_result.scalars().all())
        
        youtube_result = await self.db.execute(
            select(ScrapedData).where(ScrapedData.source == ScrapedDataSource.youtube)
        )
        youtube_count = len(youtube_result.scalars().all())
        
        processed_result = await self.db.execute(
            select(ScrapedData).where(ScrapedData.is_processed == True)
        )
        processed_count = len(processed_result.scalars().all())
        
        unprocessed_count = total_count - processed_count
        
        return {
            "total_count": total_count,
            "twitter_count": twitter_count,
            "youtube_count": youtube_count,
            "processed_count": processed_count,
            "unprocessed_count": unprocessed_count
        }
