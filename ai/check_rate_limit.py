import tweepy
from config import TWITTER_BEARER_TOKEN

def check_rate_limits():
    client = tweepy.Client(bearer_token=TWITTER_BEARER_TOKEN)
    
    try:
        # Try a minimal request to check rate limits
        response = client.search_recent_tweets(
            query="test", 
            max_results=10,
            tweet_fields=['created_at']
        )
        
        # Get rate limit info from the response headers
        if hasattr(response, 'meta') and response.meta:
            print("Rate limit info:", response.meta)
        
        print("✅ Twitter API is accessible")
        print(f"Found {len(response.data) if response.data else 0} tweets")
        
    except tweepy.TooManyRequests as e:
        print("❌ Rate limit exceeded")
        print(f"Error: {e}")
        if hasattr(e, 'response') and e.response:
            print(f"Response headers: {dict(e.response.headers)}")
    except Exception as e:
        print(f"❌ Other error: {e}")

if __name__ == "__main__":
    check_rate_limits()
