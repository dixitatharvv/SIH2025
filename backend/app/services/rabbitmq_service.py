import aio_pika
import json
from app.core.config import settings

class RabbitMQService:
    def __init__(self):
        self.connection = None
        self.channel = None

    async def connect(self):
        try:
            self.connection = await aio_pika.connect_robust(settings.RABBITMQ_URL)
            self.channel = await self.connection.channel()
            print("Successfully connected to RabbitMQ.")
        except Exception as e:
            print(f"Failed to connect to RabbitMQ: {e}")
            raise

    async def close(self):
        if self.channel:
            await self.channel.close()
        if self.connection:
            await self.connection.close()
        print("RabbitMQ connection closed.")

    async def publish_message(self, queue_name: str, message_body: dict):
        if not self.channel:
            raise ConnectionError("RabbitMQ channel is not available.")
            
        queue = await self.channel.declare_queue(queue_name, durable=True)
        
        message = aio_pika.Message(
            body=json.dumps(message_body).encode(),
            delivery_mode=aio_pika.DeliveryMode.PERSISTENT
        )
        
        await self.channel.default_exchange.publish(
            message,
            routing_key=queue_name,
        )
        print(f"Successfully published message to queue '{queue_name}'")

rabbitmq_service = RabbitMQService()

