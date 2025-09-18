import os
import sys
import psycopg2
from psycopg2.extras import RealDictCursor
from datetime import datetime
from typing import Optional, Dict, Any
import json

# Add the backend directory to the path to import models
sys.path.append(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'backend'))

# Database connection configuration
# You'll need to set these environment variables or update the config
DB_CONFIG = {
    'host': os.getenv('DB_HOST', 'localhost'),
    'port': os.getenv('DB_PORT', '5432'),
    'database': os.getenv('DB_NAME', 'your_database_name'),
    'user': os.getenv('DB_USER', 'your_username'),
    'password': os.getenv('DB_PASSWORD', 'your_password')
}

def get_connection():
    """Get database connection to the main backend database."""
    return psycopg2.connect(**DB_CONFIG)

def store_scraped_tweet_data(
    tweet_url: str,
    event_type: Optional[str] = None,
    location: Optional[str] = None,
    urgency: Optional[str] = None,
    sentiment: Optional[str] = None,
    raw_content: Optional[str] = None,
    content_metadata: Optional[Dict[str, Any]] = None,
    source_created_at: Optional[datetime] = None,
    processing_notes: Optional[str] = None
) -> bool:
    """
    Store Twitter scraped data in the scraped_data table.
    Returns True if successful, False otherwise.
    """
    conn = None
    try:
        conn = get_connection()
        cur = conn.cursor()
        
        # Check if data already exists
        cur.execute(
            "SELECT id FROM scraped_data WHERE source_url = %s",
            (tweet_url,)
        )
        existing = cur.fetchone()
        
        if existing:
            # Update existing record
            cur.execute("""
                UPDATE scraped_data 
                SET event_type = %s, location = %s, urgency = %s, sentiment = %s,
                    raw_content = %s, content_metadata = %s, source_created_at = %s,
                    processing_notes = %s, is_processed = true
                WHERE source_url = %s
            """, (
                event_type, location, urgency, sentiment, raw_content,
                json.dumps(content_metadata) if content_metadata else None,
                source_created_at, processing_notes, tweet_url
            ))
        else:
            # Insert new record
            cur.execute("""
                INSERT INTO scraped_data (
                    source, source_url, event_type, location, urgency, sentiment,
                    raw_content, content_metadata, source_created_at, processing_notes, is_processed
                ) VALUES (
                    'twitter', %s, %s, %s, %s, %s, %s, %s, %s, %s, true
                )
            """, (
                tweet_url, event_type, location, urgency, sentiment, raw_content,
                json.dumps(content_metadata) if content_metadata else None,
                source_created_at, processing_notes
            ))
        
        conn.commit()
        return True
        
    except Exception as e:
        print(f"Error storing scraped tweet data: {e}")
        if conn:
            conn.rollback()
        return False
    finally:
        if conn:
            conn.close()

def get_scraped_tweet_stats() -> Dict[str, int]:
    """Get statistics about scraped Twitter data."""
    conn = None
    try:
        conn = get_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        cur.execute("""
            SELECT 
                COUNT(*) as total_count,
                COUNT(CASE WHEN is_processed = true THEN 1 END) as processed_count,
                COUNT(CASE WHEN event_type IS NOT NULL THEN 1 END) as with_event_type,
                COUNT(CASE WHEN location IS NOT NULL THEN 1 END) as with_location
            FROM scraped_data 
            WHERE source = 'twitter'
        """)
        
        result = cur.fetchone()
        return dict(result) if result else {}
        
    except Exception as e:
        print(f"Error getting scraped tweet stats: {e}")
        return {}
    finally:
        if conn:
            conn.close()

def get_recent_tweets(limit: int = 10) -> list:
    """Get recent scraped tweets."""
    conn = None
    try:
        conn = get_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        cur.execute("""
            SELECT * FROM scraped_data 
            WHERE source = 'twitter' 
            ORDER BY scraped_at DESC 
            LIMIT %s
        """, (limit,))
        
        return cur.fetchall()
        
    except Exception as e:
        print(f"Error getting recent tweets: {e}")
        return []
    finally:
        if conn:
            conn.close()

