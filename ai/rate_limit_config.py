# Rate limiting configuration
# Adjust these values based on your API tier and usage patterns

# Twitter API v2 Rate Limits
TWITTER_RATE_LIMITS = {
    "recent_search": {
        "requests_per_15min": 300,  # Per app
        "tweets_per_request": 100,
        "recommended_delay_between_requests": 3  # seconds
    }
}

# Gemini API Rate Limits (adjust based on your tier)
GEMINI_RATE_LIMITS = {
    "free_tier": {
        "requests_per_minute": 15,
        "requests_per_day": 1500,
        "recommended_delay_between_requests": 4  # seconds
    },
    "paid_tier": {
        "requests_per_minute": 60,
        "requests_per_day": 15000,
        "recommended_delay_between_requests": 1  # seconds
    }
}

# Application settings
APP_SETTINGS = {
    "tweets_per_run": 10,  # Twitter API minimum requirement
    "base_delay_seconds": 2,  # Base delay between API calls
    "jitter_range": (0.5, 1.5),  # Random jitter to avoid thundering herd
    "max_retries": 3,  # Max retries for failed requests
    "run_frequency_minutes": 15,  # How often to run the script (in minutes)
}

# Rate limit monitoring
def calculate_safe_run_frequency():
    """Calculate how often you can safely run the script"""
    tweets_per_run = APP_SETTINGS["tweets_per_run"]
    delay_per_tweet = APP_SETTINGS["base_delay_seconds"] + max(APP_SETTINGS["jitter_range"])
    
    # Time to process one batch
    processing_time = tweets_per_run * delay_per_tweet
    
    # Twitter limit: 300 requests per 15 minutes
    twitter_safe_interval = (15 * 60) / 300  # seconds between requests
    
    # Gemini limit: 15 requests per minute (free tier)
    gemini_safe_interval = 60 / 15  # seconds between requests
    
    # Use the more restrictive limit
    safe_interval = max(twitter_safe_interval, gemini_safe_interval, processing_time)
    
    return safe_interval / 60  # Convert to minutes

if __name__ == "__main__":
    safe_frequency = calculate_safe_run_frequency()
    print(f"Safe run frequency: {safe_frequency:.1f} minutes")
    print(f"This means you can run the script every {safe_frequency:.1f} minutes safely")
