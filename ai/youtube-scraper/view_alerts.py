import os
import psycopg2
from psycopg2 import sql
from dotenv import load_dotenv


DEFAULT_LIMIT = 20


def main() -> None:
    load_dotenv()

    db_name = os.getenv('DB_NAME')
    db_user = os.getenv('DB_USER')
    db_password = os.getenv('DB_PASSWORD')
    db_host = os.getenv('DB_HOST')
    db_port = os.getenv('DB_PORT')

    if not all([db_name, db_user, db_password, db_host, db_port]):
        print("Missing one or more DB_* environment variables in .env.")
        print("Required: DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT")
        return

    limit_env = os.getenv('VIEW_ALERTS_LIMIT')
    try:
        limit = int(limit_env) if limit_env else DEFAULT_LIMIT
    except ValueError:
        limit = DEFAULT_LIMIT

    conn = None
    try:
        conn = psycopg2.connect(
            dbname=db_name,
            user=db_user,
            password=db_password,
            host=db_host,
            port=db_port,
        )
        with conn.cursor() as cur:
            # Count total rows
            cur.execute("SELECT COUNT(*) FROM alerts")
            (count_all,) = cur.fetchone()
            print(f"alerts: {count_all} row(s) total")

            # Fetch sample rows using new schema
            cur.execute(
                sql.SQL(
                    """
                    SELECT event_type, location, urgency, sentiment, video_url, video_created_at, video_date, video_time
                    FROM alerts
                    ORDER BY COALESCE(video_created_at, '1970-01-01'::timestamptz) DESC, video_url DESC
                    LIMIT %s
                    """
                ),
                (limit,)
            )
            rows = cur.fetchall()

            if not rows:
                print("No rows to display.")
                return

            print(f"\nShowing up to {limit} row(s):\n")
            for idx, (event_type, location, urgency, sentiment, video_url, video_created_at, video_date, video_time) in enumerate(rows, start=1):
                print(f"[{idx}] Event: {event_type}")
                print(f"     Location: {location}")
                print(f"     Urgency: {urgency}")
                print(f"     Sentiment: {sentiment}")
                print(f"     Video URL: {video_url}")
                print(f"     Video Created At: {video_created_at}")
                print(f"     Video Date: {video_date}")
                print(f"     Video Time: {video_time}\n")

    except Exception as e:
        print(f"Failed to read alerts: {e}")
    finally:
        if conn:
            conn.close()


if __name__ == "__main__":
    main()
