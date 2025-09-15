import time
import random
import json
from config import GEMINI_API_KEY
import os
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import ChatPromptTemplate

# Set up the Gemini API key for LangChain
os.environ["GOOGLE_API_KEY"] = GEMINI_API_KEY

gemini_llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash")

# Define the prompt template using LangChain's ChatPromptTemplate
prompt_template = ChatPromptTemplate.from_template(
    """
You are an expert in disaster monitoring and risk analysis. Analyze the following social media post and extract the following information as a JSON object with these exact keys:
- "ocean_hazard": (yes/no)
- "event_type": (e.g., tsunami, high waves, flooding, storm surge, cyclone, hurricane, typhoon, etc.)
- "location": (city, region, or description if available, otherwise "unknown")
- "urgency": (immediate, moderate, low, rumor)
- "sentiment": (panic, calm, confusion, neutral, etc.)
If any information is missing or unclear, use "unknown" or "uncertain" as the value.
Respond ONLY with a valid JSON object, no extra text, explanation, or markdown.
Post: {post}
"""
)

def analyze_post_with_gemini(post, max_retries=3):
    default_result = {
        "ocean_hazard": "unknown",
        "event_type": "unknown",
        "location": "unknown",
        "urgency": "unknown",
        "sentiment": "unknown"
    }
    for attempt in range(max_retries):
        try:
            prompt = prompt_template.format_messages(post=post)
            response = gemini_llm.invoke(prompt)
            text_response = response.content.strip()
            # Try to parse the response as JSON directly
            return json.loads(text_response)
        except Exception as e:
            if attempt < max_retries - 1:
                wait_time = (2 ** attempt) + random.uniform(0, 1)
                print(f"Request failed: {e}. Retrying in {wait_time:.1f} seconds...")
                time.sleep(wait_time)
            else:
                print(f"Max retries reached. Error: {e}")
                return default_result
    return default_result
