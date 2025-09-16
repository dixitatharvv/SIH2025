from db.models import get_connection


def main():
	conn = get_connection()
	cur = conn.cursor()
	cur.execute("TRUNCATE TABLE hazard_tweets;")
	conn.commit()
	cur.close()
	conn.close()
	print("Cleared hazard_tweets table.")


if __name__ == "__main__":
	main()


