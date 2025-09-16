import psycopg2
from config import POSTGRES

def get_connection():
	return psycopg2.connect(
		host=POSTGRES["host"],
		port=POSTGRES["port"],
		database=POSTGRES["database"],
		user=POSTGRES["user"],
		password=POSTGRES["password"]
	)

def create_table():
	conn = get_connection()
	cur = conn.cursor()
	# Base table
	cur.execute("""
	CREATE TABLE IF NOT EXISTS hazard_tweets (
		id SERIAL PRIMARY KEY,
		event_type TEXT,
		location TEXT,
		urgency TEXT,
		sentiment TEXT
	);
	""")
	# Idempotent migrations for new columns
	cur.execute("""
	ALTER TABLE hazard_tweets
		ADD COLUMN IF NOT EXISTS tweet_url TEXT,
		ADD COLUMN IF NOT EXISTS tweet_created_at TIMESTAMP WITH TIME ZONE,
		ADD COLUMN IF NOT EXISTS tweet_date DATE,
		ADD COLUMN IF NOT EXISTS tweet_time TIME;
	""")

    
	conn.commit()
	cur.close()
	conn.close()

def store_hazard_tweet(payload):
	conn = get_connection()
	cur = conn.cursor()
	cur.execute("""
	INSERT INTO hazard_tweets (
		event_type, location, urgency, sentiment, tweet_url, tweet_created_at, tweet_date, tweet_time
	) VALUES (
		%s, %s, %s, %s, %s, %s, (
			CASE WHEN %s IS NULL THEN NULL ELSE (%s::timestamptz)::date END
		), (
			CASE WHEN %s IS NULL THEN NULL ELSE (%s::timestamptz)::time END
		)
	);
	""", (
		payload.get("event_type"),
		payload.get("location"),
		payload.get("urgency"),
		payload.get("sentiment"),
		payload.get("tweet_url"),
		payload.get("tweet_created_at"),
		payload.get("tweet_created_at"),
		payload.get("tweet_created_at"),
		payload.get("tweet_created_at"),
		payload.get("tweet_created_at")
	))
	conn.commit()
	cur.close()
	conn.close()
