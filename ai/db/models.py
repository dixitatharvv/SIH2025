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
    cur.execute("""
    CREATE TABLE IF NOT EXISTS hazard_tweets (
        id SERIAL PRIMARY KEY,
        event_type TEXT,
        location TEXT,
        urgency TEXT,
        sentiment TEXT
    );
    """)
    conn.commit()
    cur.close()
    conn.close()

def store_hazard_tweet(llm_json):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("""
    INSERT INTO hazard_tweets (event_type, location, urgency, sentiment)
    VALUES (%s, %s, %s, %s);
    """, (
        llm_json.get("event_type"),
        llm_json.get("location"),
        llm_json.get("urgency"),
        llm_json.get("sentiment")
    ))
    conn.commit()
    cur.close()
    conn.close()
