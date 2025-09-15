#!/usr/bin/env python3
"""
Database Test Script
Tests the database functionality by adding test data and retrieving it
"""

import json
from db.models import create_table, store_hazard_tweet, get_connection

def test_database():
    print("🗄️  TESTING DATABASE FUNCTIONALITY")
    print("=" * 50)
    
    try:
        # Step 1: Create table
        print("1. Creating table...")
        create_table()
        print("✅ Table created successfully")
        
        # Step 2: Add test data
        print("\n2. Adding test data...")
        test_data = [
            {
                "event_type": "tsunami",
                "location": "Pacific Coast",
                "urgency": "immediate",
                "sentiment": "panic"
            },
            {
                "event_type": "flood",
                "location": "Miami Beach",
                "urgency": "moderate",
                "sentiment": "calm"
            },
            {
                "event_type": "storm surge",
                "location": "Gulf Coast",
                "urgency": "high",
                "sentiment": "concerned"
            }
        ]
        
        for i, data in enumerate(test_data, 1):
            print(f"   Adding test record {i}: {data['event_type']} in {data['location']}")
            store_hazard_tweet(data)
        
        print("✅ Test data added successfully")
        
        # Step 3: Retrieve and display data
        print("\n3. Retrieving data from database...")
        conn = get_connection()
        cur = conn.cursor()
        
        cur.execute("SELECT * FROM hazard_tweets ORDER BY id DESC LIMIT 10;")
        records = cur.fetchall()
        
        print(f"✅ Retrieved {len(records)} records")
        print("\n📊 DATABASE RECORDS:")
        print("-" * 80)
        print(f"{'ID':<5} | {'Event Type':<15} | {'Location':<20} | {'Urgency':<10} | {'Sentiment':<10}")
        print("-" * 80)
        
        for record in records:
            id_val, event_type, location, urgency, sentiment = record
            print(f"{id_val:<5} | {event_type:<15} | {location:<20} | {urgency:<10} | {sentiment:<10}")
        
        cur.close()
        conn.close()
        
        # Step 4: Test with real LLM data format
        print("\n4. Testing with real LLM data format...")
        real_llm_data = {
            "ocean_hazard": True,
            "event_type": "cyclone",
            "location": "Bay of Bengal",
            "urgency": "immediate",
            "sentiment": "urgent"
        }
        
        print(f"   Adding real LLM data: {real_llm_data}")
        store_hazard_tweet(real_llm_data)
        print("✅ Real LLM data added successfully")
        
        # Step 5: Show final count
        conn = get_connection()
        cur = conn.cursor()
        cur.execute("SELECT COUNT(*) FROM hazard_tweets;")
        count = cur.fetchone()[0]
        cur.close()
        conn.close()
        
        print(f"\n📈 Total records in database: {count}")
        print("\n🎉 DATABASE TEST COMPLETED SUCCESSFULLY!")
        
    except Exception as e:
        print(f"❌ Database test failed: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test_database()
