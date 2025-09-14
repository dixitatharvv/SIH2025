import tweepy
from config import TWITTER_BEARER_TOKEN

def fetch_tweets(query, count=100, since_id=None):
    client = tweepy.Client(bearer_token=TWITTER_BEARER_TOKEN, wait_on_rate_limit=True)
    # Twitter API v2 allows max_results up to 100
    params = {
        'query': query,
        'max_results': min(count, 100),
        'tweet_fields': ['created_at', 'lang', 'geo', 'text', 'author_id']
    }
    if since_id:
        params['since_id'] = since_id
    response = client.search_recent_tweets(**params)
    return response.data if response and response.data else []

