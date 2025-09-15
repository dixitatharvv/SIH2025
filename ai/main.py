import json
import time
import random
import re
from twitter.fetch import fetch_tweets
from llm.analyze import analyze_post_with_gemini
from db.models import store_hazard_tweet

QUERY = 'lang:en (tsunami OR flood OR flooding OR cyclone OR hurricane OR typhoon OR "high waves" OR "storm surge" OR "storm surge" OR swell) (warning OR alert OR advisory OR watch OR evacuate OR evacuation OR hazard OR inundation) -is:retweet -giveaway -meme -politics -election -vote'


def main():
    # Load last since_id to avoid duplicates
    try:
        with open("since_id.txt", "r") as f:
            since_id = f.read().strip()
            since_id = int(since_id) if since_id else None
    except FileNotFoundError:
        since_id = None

    tweets = fetch_tweets(QUERY, count=10, since_id=since_id)  # Twitter API requires min 10 tweets
    print(f"Fetched {len(tweets)} tweets.")

    max_id = None
    seen_text_signatures = set()

    def is_relevant_fast(text: str) -> bool:
        text_lower = text.lower()
        if text_lower.startswith("rt @"):
            return False
        blacklist = [
            "giveaway", "follow back", "followback", "politics", "election", "vote",
            "crypto", "nft", "airdrop", "promo", "advertisement", "ad:", "sponsored",
            "movie", "trailer", "music", "song", "game", "simulation"
        ]
        if any(bad in text_lower for bad in blacklist):
            return False
        hazard_terms = [
            "tsunami", "flood", "flooding", "cyclone", "hurricane", "typhoon",
            "storm surge", "high waves", "swell", "inundation", "earthquake"
        ]
        signal_terms = [
            "warning", "watch", "advisory", "alert", "evacuate", "evacuation",
            "red alert", "amber alert"
        ]
        has_hazard = any(term in text_lower for term in hazard_terms)
        has_signal = any(term in text_lower for term in signal_terms)
        # Accept any hazard mention unless clearly entertainment/ads; prefer signal when present
        return has_hazard and not any(bad in text_lower for bad in ["movie", "trailer", "game", "music", "song"]) or has_signal

    alert_pattern = re.compile(r"\b(tsunami|coastal\s+flood|flood(?:ing)?|storm\s+surge|high\s+waves)\b.*\b(advisory|watch|warning)\b", re.IGNORECASE)

    def extract_rule_based_alert(text: str):
        match = alert_pattern.search(text)
        if not match:
            return None
        event = match.group(1).lower()
        if "coastal" in event:
            event_type = "coastal flood"
        elif "storm" in event:
            event_type = "storm surge"
        elif "high" in event:
            event_type = "high waves"
        else:
            event_type = event.replace("ing", "")
        level = match.group(2).lower()
        urgency_map = {
            "warning": "immediate",
            "watch": "moderate",
            "advisory": "low"
        }
        urgency = urgency_map.get(level, "moderate")
        return {
            "ocean_hazard": True,
            "event_type": event_type,
            "location": "unspecified",
            "urgency": urgency,
            "sentiment": "neutral"
        }

    for i, tweet in enumerate(tweets):
        text = tweet.text
        print(f"Processing tweet {i+1}/{len(tweets)}: {text[:80]}...")

        # In-run deduplication by lightweight signature
        sig = (text[:120].lower()).strip()
        if sig in seen_text_signatures:
            print("Duplicate content in this batch. Skipping.")
            continue
        seen_text_signatures.add(sig)

        # Rule-based positive detection for official-like alerts
        alert = extract_rule_based_alert(text)
        if alert:
            store_hazard_tweet(alert)
            print("Rule-based alert detected. Stored in DB.")
            # proceed to next tweet
            if max_id is None or tweet.id > max_id:
                max_id = tweet.id
            continue

        # Fast prefilter to avoid LLM calls on irrelevant tweets
        if not is_relevant_fast(text):
            print("Prefilter: irrelevant. Skipping LLM.")
            continue

        try:
            llm_result = analyze_post_with_gemini(text)
            llm_json = json.loads(llm_result)

            def is_hazard_from_llm(payload):
                if not isinstance(payload, dict):
                    return False
                # Support both schemas: hazard_related "yes" or ocean_hazard boolean/string
                hazard_related = str(payload.get("hazard_related", "")).lower().strip()
                if hazard_related == "yes":
                    return True
                ocean_hazard = payload.get("ocean_hazard")
                if isinstance(ocean_hazard, bool) and ocean_hazard:
                    return True
                if isinstance(ocean_hazard, str) and ocean_hazard.lower() in ("yes", "true", "1"):
                    return True
                return False

            if is_hazard_from_llm(llm_json):
                store_hazard_tweet(llm_json)
                print("Stored in DB.")
            else:
                print("Not a hazard, not stored.")
        except Exception as e:
            print("LLM or DB Error:", e)
        
        # Exponential backoff with jitter to avoid rate limits
        if i < len(tweets) - 1:  # Don't sleep after the last tweet
            base_delay = 2  # Base delay of 2 seconds
            jitter = random.uniform(0.5, 1.5)  # Add randomness
            delay = base_delay + jitter
            print(f"Waiting {delay:.1f} seconds before next request...")
            time.sleep(delay)
        
        if max_id is None or tweet.id > max_id:
            max_id = tweet.id

    # Save the newest tweet id for next run
    if max_id:
        with open("since_id.txt", "w") as f:
            f.write(str(max_id))

if __name__ == "__main__":
    main()
