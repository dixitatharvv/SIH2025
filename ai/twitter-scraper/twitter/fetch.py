import tweepy
from config import TWITTER_BEARER_TOKEN


def fetch_tweets(query, count=100, since_id=None):
    client = tweepy.Client(bearer_token=TWITTER_BEARER_TOKEN, wait_on_rate_limit=True)
    # Twitter API v2 allows max_results up to 100
    params = {
        'query': query,
        'max_results': min(count, 100),
        'tweet_fields': ['created_at', 'lang', 'geo', 'text', 'author_id', 'entities'],
        'expansions': ['geo.place_id'],
        'place_fields': ['full_name', 'name', 'country', 'country_code']
    }
    if since_id:
        params['since_id'] = since_id
    response = client.search_recent_tweets(**params)
    tweets = response.data if response and response.data else []
    places = {}
    if response and getattr(response, 'includes', None):
        for pl in response.includes.get('places', []) or []:
            place_id = getattr(pl, 'id', None)
            if place_id:
                display = getattr(pl, 'full_name', None) or getattr(pl, 'name', None)
                places[place_id] = display
    return tweets, places

