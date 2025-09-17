import asyncio
import httpx
import json
from aio_pika.abc import AbstractIncomingMessage
from app.core.config import settings
from app.services.rabbitmq_service import rabbitmq_service

PRAVAAH_API_URL = "http://127.0.0.1:8000"

def analyze_weather_match(user_hazard_type: str, weather_data: dict) -> tuple[str, str]:
    """
    Compares weather data against a user's report to determine if they match.
    Returns a status ('confirmed', 'unconfirmed', 'inconclusive') and a reason.
    """
    RULES = {
        "Storm Surge": {"min_wind_kph": 50},
        "High Waves / Swell": {"min_wind_kph": 30},
        "Coastal Flooding": {"min_precip_mm": 5.0},
    }

    rule = RULES.get(user_hazard_type)

    if rule is None:
        return "inconclusive", f"No specific weather rule defined for hazard type: '{user_hazard_type}'."

    if "min_wind_kph" in rule and weather_data.get("wind_kph", 0) >= rule["min_wind_kph"]:
        return "confirmed", f"Wind speed of {weather_data['wind_kph']} kph supports the report."
    
    if "min_precip_mm" in rule and weather_data.get("precip_mm", 0) >= rule["min_precip_mm"]:
        return "confirmed", f"Precipitation of {weather_data['precip_mm']} mm supports the report."

    return "unconfirmed", "Current weather conditions do not strongly support the reported hazard."

async def get_weather_data(lat: float, lon: float) -> dict | None:
    """Fetches weather data from the WeatherAPI.com API."""
    api_key = settings.WEATHERAPI_KEY
    location_query = f"{lat},{lon}"
    url = f"http://api.weatherapi.com/v1/current.json?key={api_key}&q={location_query}"
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(url)
            response.raise_for_status() 
            data = response.json()["current"]
            
            weather_conditions = {
                "condition": data["condition"]["text"],
                "temp_celsius": data["temp_c"],
                "wind_kph": data["wind_kph"],
                "humidity_percent": data["humidity"],
                "cloud_percent": data["cloud"],
                "precip_mm": data["precip_mm"],
            }
            return weather_conditions
        except httpx.HTTPStatusError as e:
            print(f"Error fetching weather data: HTTP {e.response.status_code} - {e.response.text}")
            return None
        except Exception as e:
            print(f"An unexpected error occurred while fetching weather: {e}")
            return None

async def submit_verification_result(report_id: str, verification_result: dict):
    """Submits the analyzed weather data back to the main FastAPI backend."""
    endpoint_url = f"{PRAVAAH_API_URL}/api/verifications/weather"
    payload = {
        "report_id": report_id,
        "result_data": verification_result
    }
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(endpoint_url, json=payload)
            response.raise_for_status()
            print(f"  - Successfully submitted weather verification for report {report_id}")
        except httpx.HTTPStatusError as e:
            print(f"Error submitting verification: HTTP {e.response.status_code} - {e.response.text}")

async def process_weather_message(message: AbstractIncomingMessage):
    """Callback function to process a message from the weather_queue."""
    async with message.process():
        try:
            body = json.loads(message.body.decode())
            
            report_id = body["report_id"]
            lat = body["latitude"]
            lon = body["longitude"]
            user_hazard_type = body["user_hazard_type"]

            print(f"[+] Received weather check for '{user_hazard_type}' report {report_id}")
            
            weather_data = await get_weather_data(lat, lon)
            
            if weather_data:
                match_status, reason = analyze_weather_match(user_hazard_type, weather_data)
                
                verification_result = {
                    "match_status": match_status,
                    "reason": reason,
                    "weather_api_data": weather_data
                }
                await submit_verification_result(report_id, verification_result)
            
            print(f"[✔] Finished processing weather check for report {report_id}")

        except Exception as e:
            print(f"[!] Error processing weather message: {e}")

async def main():
    """Main function to connect to RabbitMQ and start the worker."""
    print("Starting WeatherAPI.com Worker...")
    await rabbitmq_service.connect()
    await rabbitmq_service.consume_messages("weather_queue", process_weather_message)
    
    print("[*] Weather worker is running and waiting for jobs...")
    try:
        await asyncio.Future()
    finally:
        await rabbitmq_service.close()

if __name__ == "__main__":
    asyncio.run(main())

