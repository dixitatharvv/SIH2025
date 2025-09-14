import requests
from config import GEMINI_API_KEY

GEMINI_API_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={GEMINI_API_KEY}"

def analyze_post_with_gemini(post):
    prompt = f"""
You are an expert in disaster monitoring. Analyze the following social media post and extract:
- Is it about an ocean hazard? (yes/no)
- Event type (tsunami, high waves, flooding, storm surge, etc.)
- Location 
- Urgency (immediate, moderate, low, rumor)
- Sentiment (panic, calm, confusion, etc.)

Post: \"{post}\"

Respond in JSON:
"""
    headers = {"Content-Type": "application/json"}
    data = {
        "contents": [{"parts": [{"text": prompt}]}]
    }
    response = requests.post(GEMINI_API_URL, headers=headers, json=data)
    response.raise_for_status()
    # Gemini returns the text in a nested structure
    result = response.json()
    try:
        return result["candidates"][0]["content"]["parts"][0]["text"]
    except Exception:
        return "{}"  # fallback empty JSON
