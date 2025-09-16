import asyncio
import httpx
import json
from aio_pika.abc import AbstractIncomingMessage
import os
import sys

# Add the parent directory to the path so we can import from the 'backend'
# This is a common pattern for running sibling services in development.
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.app.services.rabbitmq_service import rabbitmq_service
# Import your friend's powerful analysis function
from analyze import analyze_post_with_gemini

# The URL for our main backend's verification endpoint
PRAVAAH_API_URL = "http://127.0.0.1:8000"

async def submit_verification_result(payload: dict):
    """
    Submits the NLP analysis results back to the main FastAPI backend.
    """
    endpoint_url = f"{PRAVAAH_API_URL}/verifications/nlp"
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(endpoint_url, json=payload, timeout=60.0)
            response.raise_for_status()
            report_id = payload.get("report_id", "unknown")
            print(f"  - Successfully submitted NLP verification for report {report_id}")
        except httpx.HTTPStatusError as e:
            print(f"Error submitting NLP verification: HTTP {e.response.status_code} - {e.response.text}")
        except Exception as e:
            print(f"An unexpected error occurred while submitting NLP verification: {e}")

def convert_event_type(nlp_event: str) -> str:
    """Converts the LLM's free-text event_type to our strict ENUM."""
    # This mapping is crucial for data consistency
    mapping = {
        "tsunami": "Tsunami",
        "high waves": "High Waves / Swell",
        "flooding": "Coastal Flooding",
        "storm surge": "Storm Surge",
        "rip current": "Rip Current",
        "coastal erosion": "Coastal Erosion",
        "algal bloom": "Water Discoloration / Algal Bloom",
        "pollution": "Marine Debris / Pollution",
    }
    return mapping.get(nlp_event.lower().strip(), "Other")

async def process_nlp_message(message: AbstractIncomingMessage):
    """Callback function to process a message from the nlp_queue."""
    async with message.process():
        try:
            body = json.loads(message.body.decode())
            report_id = body["report_id"]
            description = body["user_description"]

            print(f"[+] Received NLP analysis request for report {report_id}")
            
            # Use your friend's existing, powerful analysis function
            analysis_json_str = await asyncio.to_thread(analyze_post_with_gemini, description)
            analysis_data = json.loads(analysis_json_str)

            if not analysis_data.get("ocean_hazard"):
                print(f"  - NLP determined not an ocean hazard. Skipping submission.")
                return

            # --- Prepare the payload to send back to the main API ---
            # This must match the NlpVerificationResult Pydantic model
            final_payload = {
                "report_id": report_id,
                "verified_hazard_type": convert_event_type(analysis_data.get("event_type", "Other")),
                "verified_location": { # The LLM provides a single location string, we need to adapt
                    "latitude": 0.0, # Placeholder - In a real scenario, you'd geocode the location string
                    "longitude": 0.0
                },
                "urgency": analysis_data.get("urgency", "low"),
                "sentiment": analysis_data.get("sentiment", "neutral"),
                "nlp_confidence_score": 0.9, # Placeholder - This would come from the model
                "keywords_found": [], # Placeholder - This would come from the model
                "source_urls": [] # Placeholder - This would come from the model
            }

            await submit_verification_result(final_payload)
            print(f"[✔] Finished processing NLP analysis for report {report_id}")

        except Exception as e:
            print(f"[!] Error processing NLP message: {e}")

async def main():
    """Main function to connect to RabbitMQ and start the NLP worker."""
    print("Starting NLP Worker Service...")
    # NOTE: This reuses the RabbitMQ service from the main backend for simplicity.
    # In production, this worker would have its own connection logic.
    await rabbitmq_service.connect()
    await rabbitmq_service.consume_messages("nlp_queue", process_nlp_message)
    
    print("[*] NLP worker is running and waiting for jobs...")
    try:
        await asyncio.Future()
    finally:
        await rabbitmq_service.close()

if __name__ == "__main__":
    asyncio.run(main())
