from fastapi import APIRouter, Depends, HTTPException, Query
from typing import Optional, List, Dict, Any
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime

from app.db.session import get_db
from app.db.models import ScrapedDataSource
from app.services.scraped_data_service import ScrapedDataService
from app.api.dependencies import get_current_user
from app.db.models import User

router = APIRouter()

@router.get("/stats", summary="Get scraped data statistics")
async def get_scraped_data_stats(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get comprehensive statistics about scraped data."""
    service = ScrapedDataService(db)
    stats = await service.get_scraped_data_stats()
    return stats

@router.get("/twitter", summary="Get Twitter scraped data")
async def get_twitter_data(
    limit: int = Query(50, ge=1, le=100, description="Number of records to return"),
    offset: int = Query(0, ge=0, description="Number of records to skip"),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get scraped Twitter data with pagination."""
    service = ScrapedDataService(db)
    data = await service.get_scraped_data_by_source(
        ScrapedDataSource.twitter, 
        limit=limit, 
        offset=offset
    )
    
    # Convert to dict format for JSON response
    result = []
    for item in data:
        result.append({
            "id": str(item.id),
            "source": item.source.value,
            "source_url": item.source_url,
            "event_type": item.event_type,
            "location": item.location,
            "urgency": item.urgency,
            "sentiment": item.sentiment,
            "raw_content": item.raw_content,
            "content_metadata": item.content_metadata,
            "source_created_at": item.source_created_at.isoformat() if item.source_created_at else None,
            "scraped_at": item.scraped_at.isoformat(),
            "is_processed": item.is_processed,
            "processing_notes": item.processing_notes
        })
    
    return {"items": result, "count": len(result)}

@router.get("/youtube", summary="Get YouTube scraped data")
async def get_youtube_data(
    limit: int = Query(50, ge=1, le=100, description="Number of records to return"),
    offset: int = Query(0, ge=0, description="Number of records to skip"),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get scraped YouTube data with pagination."""
    service = ScrapedDataService(db)
    data = await service.get_scraped_data_by_source(
        ScrapedDataSource.youtube, 
        limit=limit, 
        offset=offset
    )
    
    # Convert to dict format for JSON response
    result = []
    for item in data:
        result.append({
            "id": str(item.id),
            "source": item.source.value,
            "source_url": item.source_url,
            "event_type": item.event_type,
            "location": item.location,
            "urgency": item.urgency,
            "sentiment": item.sentiment,
            "raw_content": item.raw_content,
            "content_metadata": item.content_metadata,
            "source_created_at": item.source_created_at.isoformat() if item.source_created_at else None,
            "scraped_at": item.scraped_at.isoformat(),
            "is_processed": item.is_processed,
            "processing_notes": item.processing_notes
        })
    
    return {"items": result, "count": len(result)}

@router.get("/by-event-type", summary="Get scraped data by event type")
async def get_data_by_event_type(
    event_type: str = Query(..., description="Event type to filter by"),
    limit: int = Query(50, ge=1, le=100, description="Number of records to return"),
    offset: int = Query(0, ge=0, description="Number of records to skip"),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get scraped data filtered by event type."""
    service = ScrapedDataService(db)
    data = await service.get_scraped_data_by_event_type(
        event_type, 
        limit=limit, 
        offset=offset
    )
    
    # Convert to dict format for JSON response
    result = []
    for item in data:
        result.append({
            "id": str(item.id),
            "source": item.source.value,
            "source_url": item.source_url,
            "event_type": item.event_type,
            "location": item.location,
            "urgency": item.urgency,
            "sentiment": item.sentiment,
            "raw_content": item.raw_content,
            "content_metadata": item.content_metadata,
            "source_created_at": item.source_created_at.isoformat() if item.source_created_at else None,
            "scraped_at": item.scraped_at.isoformat(),
            "is_processed": item.is_processed,
            "processing_notes": item.processing_notes
        })
    
    return {"items": result, "count": len(result)}

@router.get("/by-location", summary="Get scraped data by location")
async def get_data_by_location(
    location: str = Query(..., description="Location to search for"),
    limit: int = Query(50, ge=1, le=100, description="Number of records to return"),
    offset: int = Query(0, ge=0, description="Number of records to skip"),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get scraped data filtered by location (partial match)."""
    service = ScrapedDataService(db)
    data = await service.get_scraped_data_by_location(
        location, 
        limit=limit, 
        offset=offset
    )
    
    # Convert to dict format for JSON response
    result = []
    for item in data:
        result.append({
            "id": str(item.id),
            "source": item.source.value,
            "source_url": item.source_url,
            "event_type": item.event_type,
            "location": item.location,
            "urgency": item.urgency,
            "sentiment": item.sentiment,
            "raw_content": item.raw_content,
            "content_metadata": item.content_metadata,
            "source_created_at": item.source_created_at.isoformat() if item.source_created_at else None,
            "scraped_at": item.scraped_at.isoformat(),
            "is_processed": item.is_processed,
            "processing_notes": item.processing_notes
        })
    
    return {"items": result, "count": len(result)}

@router.get("/unprocessed", summary="Get unprocessed scraped data")
async def get_unprocessed_data(
    limit: int = Query(50, ge=1, le=100, description="Number of records to return"),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get scraped data that hasn't been processed yet."""
    service = ScrapedDataService(db)
    data = await service.get_unprocessed_data(limit=limit)
    
    # Convert to dict format for JSON response
    result = []
    for item in data:
        result.append({
            "id": str(item.id),
            "source": item.source.value,
            "source_url": item.source_url,
            "event_type": item.event_type,
            "location": item.location,
            "urgency": item.urgency,
            "sentiment": item.sentiment,
            "raw_content": item.raw_content,
            "content_metadata": item.content_metadata,
            "source_created_at": item.source_created_at.isoformat() if item.source_created_at else None,
            "scraped_at": item.scraped_at.isoformat(),
            "is_processed": item.is_processed,
            "processing_notes": item.processing_notes
        })
    
    return {"items": result, "count": len(result)}

@router.get("/recent", summary="Get recent scraped data from all sources")
async def get_recent_data(
    limit: int = Query(20, ge=1, le=100, description="Number of recent records to return"),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get recent scraped data from both Twitter and YouTube sources."""
    service = ScrapedDataService(db)
    
    # Get recent data from both sources
    twitter_data = await service.get_scraped_data_by_source(ScrapedDataSource.twitter, limit=limit//2)
    youtube_data = await service.get_scraped_data_by_source(ScrapedDataSource.youtube, limit=limit//2)
    
    # Combine and sort by scraped_at
    all_data = list(twitter_data) + list(youtube_data)
    all_data.sort(key=lambda x: x.scraped_at, reverse=True)
    
    # Take only the requested limit
    all_data = all_data[:limit]
    
    # Convert to dict format for JSON response
    result = []
    for item in all_data:
        result.append({
            "id": str(item.id),
            "source": item.source.value,
            "source_url": item.source_url,
            "event_type": item.event_type,
            "location": item.location,
            "urgency": item.urgency,
            "sentiment": item.sentiment,
            "raw_content": item.raw_content,
            "content_metadata": item.content_metadata,
            "source_created_at": item.source_created_at.isoformat() if item.source_created_at else None,
            "scraped_at": item.scraped_at.isoformat(),
            "is_processed": item.is_processed,
            "processing_notes": item.processing_notes
        })
    
    return {"items": result, "count": len(result)}

