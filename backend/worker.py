import asyncio
import aio_pika
import json
from datetime import datetime, timezone
import uuid

# Import database components we created
from app.db.session import AsyncSessionLocal
from app.db.models import Report, User  # We'll need the User model too

RABBITMQ_URL = "amqp://guest:guest@localhost/"
QUEUE_NAME = "report_verification_queue"

async def create_dummy_user_if_not_exists(session):
    """
    For now, we need a user in the DB to associate reports with.
    This function creates one if it doesn't exist.
    In the future, the user_id will come from the authenticated user.
    """
    # A fixed UUID for our dummy user
    dummy_user_uuid = uuid.UUID('00000000-0000-0000-0000-000000000000')
    
    # Use session.get() for a direct primary key lookup
    user = await session.get(User, dummy_user_uuid)
    
    if not user:
        print("Creating a dummy user for associating reports.")
        user = User(
            id=dummy_user_uuid,
            email="dummyuser@pravaah.com",
            full_name="Dummy User",
            hashed_password="notarealpassword" # This should be properly hashed in a real app
        )
        session.add(user)
        await session.commit()
        
    return user.id

async def main():
    print("Worker starting...")
    connection = await aio_pika.connect_robust(RABBITMQ_URL)
    
    async with connection:
        channel = await connection.channel()
        queue = await channel.declare_queue(QUEUE_NAME, durable=True)
        print("Worker is waiting for messages. To exit press CTRL+C")

        async with queue.iterator() as queue_iter:
            async for message in queue_iter:
                async with message.process():
                    message_body = message.body.decode()
                    data = json.loads(message_body)
                    
                    print("\n[+] Received new message. Saving to database...")
                    
                    # --- DATABASE LOGIC ---
                    # Get a new database session for this message
                    async with AsyncSessionLocal() as session:
                        try:
                            # Ensure a dummy user exists to link the report to
                            dummy_user_id = await create_dummy_user_if_not_exists(session)

                            report_data = data['report_data']
                            
                            # Create a new Report object using our SQLAlchemy model
                            new_report = Report(
                                id=uuid.UUID(data['report_id']), # Convert string ID back to UUID object
                                user_id=dummy_user_id,
                                hazard_type=report_data['hazard_type'],
                                description=report_data['description'],
                                # Format for WKT (Well-Known Text) for PostGIS
                                location=f"POINT({report_data['longitude']} {report_data['latitude']})",
                                source='WebApp', # Hardcoded for now, could come from message
                                # Use a real timestamp, ideally from the client
                                reported_at=datetime.now(timezone.utc)
                            )
                            
                            # Add the new report to the session and commit to the DB
                            session.add(new_report)
                            await session.commit()
                            
                            print(f"  - Successfully saved report {data['report_id']} to the database.")
                        
                        except Exception as e:
                            print(f"\n[!] DATABASE ERROR: {e}")
                            # If something goes wrong, rollback the transaction
                            await session.rollback()
                    # ----------------------

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\nWorker has been shut down.")

