import asyncio
import json
import uuid
from datetime import datetime

from aio_pika.abc import AbstractIncomingMessage

from app.db.models import Report
from app.db.session import get_db
from app.services.rabbitmq_service import rabbitmq_service


async def process_report_message(message: AbstractIncomingMessage):
    """
    This is the main consumer for the initial report submission.
    Its job is to:
    1. Create the initial report record in the database ("the claim").
    2. Dispatch new messages to specialized queues for parallel verification.
    """
    async with message.process():
        try:
            body = message.body.decode()
            data = json.loads(body)
            report_id = uuid.UUID(data["report_id"])
            user_id = uuid.UUID(data["user_id"])
            report_data = data["report_data"]

            print(f"[+] Received initial report {report_id}. Saving and dispatching.")

            # --- Step 1: Save the initial report to the database ---
            async for db in get_db():
                # Note the use of the new 'user_' prefixed column names
                new_report = Report(
                    id=report_id,
                    user_id=user_id,
                    user_hazard_type=report_data['user_hazard_type'],
                    user_description=report_data['user_description'],
                    user_location=f"SRID=4326;POINT({report_data['longitude']} {report_data['latitude']})",
                )
                db.add(new_report)
                await db.commit()
                print(f"  - Successfully saved base report {report_id} to the database.")

            # --- Step 2: Fan-out messages to verification queues ---
            
            # Message for the NLP Pipeline
            nlp_message = {
                "report_id": str(report_id),
                "description": report_data['user_description']
            }
            await rabbitmq_service.publish_message("nlp_queue", nlp_message)
            print(f"  - Dispatched task to nlp_queue for report {report_id}")

            # Message for the Weather API check
            weather_message = {
                "report_id": str(report_id),
                "latitude": report_data['latitude'],
                "longitude": report_data['longitude']
            }
            await rabbitmq_service.publish_message("weather_queue", weather_message)
            print(f"  - Dispatched task to weather_queue for report {report_id}")
            
            # Message for the Peer Notification system
            peer_message = {
                "report_id": str(report_id),
                "latitude": report_data['latitude'],
                "longitude": report_data['longitude'],
                "hazard_type": report_data['user_hazard_type']
            }
            await rabbitmq_service.publish_message("peer_notification_queue", peer_message)
            print(f"  - Dispatched task to peer_notification_queue for report {report_id}")

            print(f"[✔] Finished processing and dispatching for report {report_id}.")

        except Exception as e:
            print(f"[!] Error processing message: {e}")


async def main():
    """Connects to RabbitMQ and starts consuming from the main processing queue."""
    await rabbitmq_service.connect()
    # This worker only listens to the initial submission queue
    await rabbitmq_service.consume_messages("report_processing_queue", process_report_message)
    print("\n[*] Coordinator worker is running and waiting for reports...")
    try:
        # Keep the worker running indefinitely
        await asyncio.Future()
    finally:
        await rabbitmq_service.close()


if __name__ == "__main__":
    asyncio.run(main())

