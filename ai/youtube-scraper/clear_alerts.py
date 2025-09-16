import os
import argparse
import psycopg2
from dotenv import load_dotenv


def get_conn():
    load_dotenv()
    return psycopg2.connect(
        dbname=os.getenv('DB_NAME'),
        user=os.getenv('DB_USER'),
        password=os.getenv('DB_PASSWORD'),
        host=os.getenv('DB_HOST'),
        port=os.getenv('DB_PORT'),
    )


def clear_rows() -> None:
    conn = None
    try:
        conn = get_conn()
        with conn.cursor() as cur:
            cur.execute("DELETE FROM alerts;")
        conn.commit()
        print("alerts table cleared (all rows deleted).")
    finally:
        if conn:
            conn.close()


def drop_table() -> None:
    conn = None
    try:
        conn = get_conn()
        with conn.cursor() as cur:
            cur.execute("DROP TABLE IF EXISTS alerts;")
        conn.commit()
        print("alerts table dropped.")
    finally:
        if conn:
            conn.close()


def main():
    parser = argparse.ArgumentParser(description="Clear or drop alerts table")
    parser.add_argument("--drop", action="store_true", help="Drop the alerts table instead of deleting rows")
    args = parser.parse_args()

    if args.drop:
        drop_table()
    else:
        clear_rows()


if __name__ == "__main__":
    main()
