#!/usr/bin/env python3
import sys
from db.models import get_connection, create_table


def clear_db() -> None:
    conn = get_connection()
    try:
        with conn:
            with conn.cursor() as cur:
                # Ensure table exists before truncating
                create_table()
                cur.execute("TRUNCATE TABLE hazard_tweets RESTART IDENTITY;")
        print("✅ Database cleared (hazard_tweets truncated and IDs reset).")
    finally:
        conn.close()

    # Verify
    conn = get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT COUNT(*) FROM hazard_tweets;")
            count = cur.fetchone()[0]
            print(f"Remaining rows: {count}")
    finally:
        conn.close()


if __name__ == "__main__":
    try:
        clear_db()
        sys.exit(0)
    except Exception as e:
        print(f"❌ Failed to clear DB: {e}")
        sys.exit(1)
