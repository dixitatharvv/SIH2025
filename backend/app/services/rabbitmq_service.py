import aio_pika
import json
from app.core.config import settings
from typing import Callable, Coroutine, Any

class RabbitMQService:
    def __init__(self):
        self.connection: aio_pika.abc.AbstractRobustConnection | None = None
        self.channel: aio_pika.abc.AbstractChannel | None = None

    async def connect(self):
        try:
            self.connection = await aio_pika.connect_robust(settings.RABBITMQ_URL)
            self.channel = await self.connection.channel()
            await self.channel.set_qos(prefetch_count=1)
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
        
        await self.channel.declare_queue(queue_name, durable=True)

        message = aio_pika.Message(
            body=json.dumps(message_body).encode(),
            delivery_mode=aio_pika.DeliveryMode.PERSISTENT
        )
        await self.channel.default_exchange.publish(message, routing_key=queue_name)

    async def consume_messages(
        self,
        queue_name: str,
        callback: Callable[[aio_pika.abc.AbstractIncomingMessage], Coroutine[Any, Any, None]]
    ):
        if not self.channel:
            raise ConnectionError("RabbitMQ channel is not available.")

        queue = await self.channel.declare_queue(queue_name, durable=True)

        await queue.consume(callback)
        print(f"[*] Started consuming from queue: {queue_name}")

rabbitmq_service = RabbitMQService()