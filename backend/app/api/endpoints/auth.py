from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
import uuid

from app.db.session import get_db
from app.db.models import User
from app.models.pydantic_models import UserCreate, UserRead
from app.core.security import hash_password

router = APIRouter()

@router.post("/register", response_model=UserRead, status_code=status.HTTP_201_CREATED)
async def register_user(
    user_in: UserCreate, 
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(User).where(User.email == user_in.email))
    existing_user = result.scalars().first()
    
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An account with this email already exists.",
        )
        
    hashed_pass = hash_password(user_in.password)
    
    new_user = User(
        id=uuid.uuid4(),
        email=user_in.email,
        full_name=user_in.full_name,
        hashed_password=hashed_pass,
        role=user_in.role,
        reputation_score=100 if user_in.role == "citizen" else None
    )
    
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    
    return new_user

