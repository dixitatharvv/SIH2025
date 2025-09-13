import asyncio
import aio_pika
import json

# The connection URL should be the same as in your FastAPI app.
# For local development, this is the default.
RABBITMQ_URL = "amqp://guest:guest@localhost/"
QUEUE_NAME = "report_verification_queue"

async def main():
    """
    Connects to RabbitMQ and starts consuming messages from the queue.
    """
    print("Worker starting...")
    print(f"Connecting to RabbitMQ at {RABBITMQ_URL}")
    
    try:
        connection = await aio_pika.connect_robust(RABBITMQ_URL)
    except Exception as e:
        print(f"Failed to connect to RabbitMQ: {e}")
        return

    async with connection:
        # Creating a channel
        channel = await connection.channel()

        # Declaring the queue. It's important to declare it here as well
        # to ensure it exists before we try to consume from it.
        # `durable=True` makes sure the queue survives a RabbitMQ restart.
        queue = await channel.declare_queue(QUEUE_NAME, durable=True)

        print("Worker is waiting for messages. To exit press CTRL+C")

        # Start consuming messages from the queue
        async with queue.iterator() as queue_iter:
            async for message in queue_iter:
                async with message.process():
                    # The message body is in bytes, so we decode it.
                    message_body = message.body.decode()
                    
                    # We expect the body to be a JSON string.
                    try:
                        data = json.loads(message_body)
                        print("\n[+] Received new message:")
                        print(f"  - Report ID: {data.get('report_id')}")
                        print(f"  - Hazard Type: {data['report_data'].get('hazard_type')}")
                        print(f"  - Description: {data['report_data'].get('description')}")
                        print(f"  - Location: ({data['report_data'].get('latitude')}, {data['report_data'].get('longitude')})")
                        print(f"  - Media File: {data.get('media_filename') or 'N/A'}")
                        
                        # Here is where you will eventually add the logic to:
                        # 1. Save the report to the PostgreSQL database.
                        # 2. If there's a media file, process it (e.g., confirm S3 upload).
                        # 3. Trigger the next steps (NLP, Weather API, etc.).

                    except json.JSONDecodeError:
                        print(f"\n[!] Received a message with invalid JSON: {message_body}")
                    
                    if queue.name in message.routing_key:
                        print("Message processed successfully.")


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("Worker has been shut down.")
