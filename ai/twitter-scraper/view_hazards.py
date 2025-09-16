from db.models import get_connection


def list_hazards(limit=50):
	conn = get_connection()
	cur = conn.cursor()
	cur.execute(
		"""
		SELECT event_type, location, urgency, sentiment, tweet_url, tweet_created_at
		FROM hazard_tweets
		ORDER BY COALESCE(tweet_created_at, 'epoch') DESC
		LIMIT %s
		""",
		(limit,)
	)
	rows = cur.fetchall()
	cur.close()
	conn.close()
	return rows


def main():
	rows = list_hazards()
	if not rows:
		print("No hazards stored.")
		return
	for i, (event_type, location, urgency, sentiment, url, created_at) in enumerate(rows, 1):
		created = created_at.isoformat() if created_at else ""
		print(f"{i}. [{event_type}] {location} | {urgency} | {sentiment} | {created}\n   {url}")


if __name__ == "__main__":
	main()


