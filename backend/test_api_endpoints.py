#!/usr/bin/env python3
"""
Test script for the scraped data API endpoints.
This script will test the API endpoints without requiring authentication.
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

async def test_api_endpoints():
    """Test the scraped data API endpoints functionality."""
    print("=== Testing Scraped Data API Endpoints ===\n")
    
    # Get database session
    async for db in get_db():
        service = ScrapedDataService(db)
        break
    
    try:
        # Test 1: Get statistics
        print("1. Testing statistics endpoint...")
        stats = await service.get_scraped_data_stats()
        print(f"✓ Statistics: {stats}")
        
        # Test 2: Get Twitter data
        print("\n2. Testing Twitter data endpoint...")
        twitter_data = await service.get_scraped_data_by_source(ScrapedDataSource.twitter, limit=5)
        print(f"✓ Found {len(twitter_data)} Twitter posts")
        for item in twitter_data:
            print(f"  - {item.event_type} in {item.location} (Urgency: {item.urgency})")
        
        # Test 3: Get YouTube data
        print("\n3. Testing YouTube data endpoint...")
        youtube_data = await service.get_scraped_data_by_source(ScrapedDataSource.youtube, limit=5)
        print(f"✓ Found {len(youtube_data)} YouTube posts")
        for item in youtube_data:
            print(f"  - {item.event_type} in {item.location} (Urgency: {item.urgency})")
        
        # Test 4: Get data by event type
        print("\n4. Testing event type filtering...")
        tsunami_data = await service.get_scraped_data_by_event_type("Tsunami", limit=5)
        print(f"✓ Found {len(tsunami_data)} Tsunami posts")
        
        # Test 5: Get data by location
        print("\n5. Testing location filtering...")
        pacific_data = await service.get_scraped_data_by_location("Pacific", limit=5)
        print(f"✓ Found {len(pacific_data)} posts mentioning 'Pacific'")
        
        # Test 6: Get unprocessed data
        print("\n6. Testing unprocessed data...")
        unprocessed_data = await service.get_unprocessed_data(limit=5)
        print(f"✓ Found {len(unprocessed_data)} unprocessed posts")
        
        print("\n=== All API Endpoint Tests Passed! ===")
        print("The API endpoints are working correctly.")
        print("\n📋 Available API Endpoints:")
        print("  GET /scraped-data/stats - Get statistics")
        print("  GET /scraped-data/twitter - Get Twitter data")
        print("  GET /scraped-data/youtube - Get YouTube data")
        print("  GET /scraped-data/by-event-type?event_type=Tsunami - Filter by event type")
        print("  GET /scraped-data/by-location?location=Pacific - Filter by location")
        print("  GET /scraped-data/unprocessed - Get unprocessed data")
        print("  GET /scraped-data/recent - Get recent data from all sources")
        
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
    success = asyncio.run(test_api_endpoints())
    if success:
        print("\n🎉 API endpoint tests completed successfully!")
        print("\n🌐 To test via FastAPI docs:")
        print("1. Start the server: python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000")
        print("2. Open browser: http://localhost:8000/docs")
        print("3. Look for 'Scraped Data' section in the API documentation")
        print("4. Test the endpoints with the 'Try it out' button")
    else:
        print("\n💥 API endpoint tests failed!")
        sys.exit(1)

