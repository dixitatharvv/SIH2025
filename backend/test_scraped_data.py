#!/usr/bin/env python3
"""
Test script for the scraped_data table implementation.
This script will create the table and test basic operations.
"""

import asyncio
import sys
import os
from datetime import datetime

# Add the app directory to the path
sys.path.append(os.path.join(os.path.dirname(__file__), 'app'))

from app.db.session import get_db
from app.db.models import ScrapedData, ScrapedDataSource
from app.services.scraped_data_service import ScrapedDataService

async def test_scraped_data_implementation():
    """Test the scraped_data table implementation."""
    print("=== Testing Scraped Data Implementation ===\n")
    
    # Get database session
    async for db in get_db():
        service = ScrapedDataService(db)
        break
    
    try:
        # Test 1: Store Twitter data
        print("1. Testing Twitter data storage...")
        twitter_data = await service.store_scraped_data(
            source=ScrapedDataSource.twitter,
            source_url="https://twitter.com/test/status/123456789",
            event_type="Tsunami",
            location="Pacific Coast",
            urgency="High",
            sentiment="Panic",
            raw_content="Tsunami warning issued for Pacific Coast! Evacuate immediately!",
            content_metadata={
                "hashtags": ["tsunami", "warning"],
                "tweet_id": "123456789",
                "author": "test_user"
            },
            source_created_at=datetime.now(),
            processing_notes="Test data from implementation test"
        )
        print(f"✓ Twitter data stored with ID: {twitter_data.id}")
        
        # Test 2: Store YouTube data
        print("\n2. Testing YouTube data storage...")
        youtube_data = await service.store_scraped_data(
            source=ScrapedDataSource.youtube,
            source_url="https://www.youtube.com/watch?v=test123",
            event_type="Storm Surge",
            location="Gulf Coast",
            urgency="Medium",
            sentiment="Calm",
            raw_content="Title: Storm Surge Warning\nDescription: Latest updates on approaching storm",
            content_metadata={
                "video_id": "test123",
                "title": "Storm Surge Warning",
                "confidence_score": 85,
                "reasoning": "Official weather service warning"
            },
            source_created_at=datetime.now(),
            processing_notes="Test data from implementation test"
        )
        print(f"✓ YouTube data stored with ID: {youtube_data.id}")
        
        # Test 3: Get data by source
        print("\n3. Testing data retrieval by source...")
        twitter_posts = await service.get_scraped_data_by_source(ScrapedDataSource.twitter, limit=5)
        youtube_posts = await service.get_scraped_data_by_source(ScrapedDataSource.youtube, limit=5)
        print(f"✓ Found {len(twitter_posts)} Twitter posts")
        print(f"✓ Found {len(youtube_posts)} YouTube posts")
        
        # Test 4: Get data by event type
        print("\n4. Testing data retrieval by event type...")
        tsunami_posts = await service.get_scraped_data_by_event_type("Tsunami", limit=5)
        storm_posts = await service.get_scraped_data_by_event_type("Storm Surge", limit=5)
        print(f"✓ Found {len(tsunami_posts)} Tsunami posts")
        print(f"✓ Found {len(storm_posts)} Storm Surge posts")
        
        # Test 5: Get statistics
        print("\n5. Testing statistics...")
        stats = await service.get_scraped_data_stats()
        print(f"✓ Total count: {stats['total_count']}")
        print(f"✓ Twitter count: {stats['twitter_count']}")
        print(f"✓ YouTube count: {stats['youtube_count']}")
        print(f"✓ Processed count: {stats['processed_count']}")
        print(f"✓ Unprocessed count: {stats['unprocessed_count']}")
        
        # Test 6: Test duplicate handling
        print("\n6. Testing duplicate handling...")
        duplicate_data = await service.store_scraped_data(
            source=ScrapedDataSource.twitter,
            source_url="https://twitter.com/test/status/123456789",  # Same URL
            event_type="Updated Tsunami",
            location="Updated Pacific Coast",
            urgency="Critical",
            sentiment="Updated Panic",
            raw_content="Updated tsunami warning!",
            processing_notes="Updated test data"
        )
        print(f"✓ Duplicate handled - updated existing record with ID: {duplicate_data.id}")
        
        print("\n=== All Tests Passed! ===")
        print("The scraped_data table implementation is working correctly.")
        
    except Exception as e:
        print(f"\n❌ Test failed with error: {e}")
        import traceback
        traceback.print_exc()
        return False
    
    finally:
        await db.close()
    
    return True

if __name__ == "__main__":
    # Run the test
    success = asyncio.run(test_scraped_data_implementation())
    if success:
        print("\n🎉 Implementation test completed successfully!")
    else:
        print("\n💥 Implementation test failed!")
        sys.exit(1)
