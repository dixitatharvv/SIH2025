import json
import time
from twitter.fetch import fetch_tweets
from llm.analyze import analyze_post_with_gemini
from db.models import store_hazard_tweet

QUERY = 'tsunami OR flood OR cyclone OR "high waves" OR "storm surge" -is:retweet'

def main():
    # Load last since_id to avoid duplicates
    try:
        with open("since_id.txt", "r") as f:
            since_id = f.read().strip()
            since_id = int(since_id) if since_id else None
    except FileNotFoundError:
        since_id = None

    tweets = fetch_tweets(QUERY, count=100, since_id=since_id)
    print(f"Fetched {len(tweets)} tweets.")

    max_id = None
    for tweet in tweets:
        text = tweet.full_text
        print(f"Processing tweet: {text}")
        try:
            llm_result = analyze_post_with_gemini(text)
            llm_json = json.loads(llm_result)
            if llm_json.get("hazard_related", "").lower() == "yes":
                store_hazard_tweet(llm_json)
                print("Stored in DB.")
            else:
                print("Not a hazard, not stored.")
        except Exception as e:
            print("LLM or DB Error:", e)
        time.sleep(1)  # To avoid LLM rate limits
        if max_id is None or tweet.id > max_id:
            max_id = tweet.id

    # Save the newest tweet id for next run
    if max_id:
        with open("since_id.txt", "w") as f:
            f.write(str(max_id))

if __name__ == "__main__":
    main()
