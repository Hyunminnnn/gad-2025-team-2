from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from jose import jwt
from datetime import datetime, timedelta
import os
import uuid
import hashlib

from app.db import get_session
from app.models import User, JobSeeker, Employer
from app.schemas import SignInRequest, SignUpRequest, AuthResponse

router = APIRouter(prefix="/auth", tags=["auth"])

SECRET_KEY = os.getenv("JWT_SECRET", "devsecret")

# Simple password hashing for development
def hash_password(password: str) -> str:
    """Simple SHA256 hash for development"""
    return hashlib.sha256(password.encode()).hexdigest()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify password against hash"""
    return hash_password(plain_password) == hashed_password


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(days=7)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm="HS256")


@router.post("/signin", response_model=AuthResponse)
async def signin(request: SignInRequest, session: Session = Depends(get_session)):
    statement = select(User).where(User.email == request.email)
    user = session.exec(statement).first()
    
    if not user or not verify_password(request.password, user.hashedPassword):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Get profile
    if user.role == "jobseeker":
        profile_stmt = select(JobSeeker).where(JobSeeker.id == user.profileId)
        profile = session.exec(profile_stmt).first()
    else:
        profile_stmt = select(Employer).where(Employer.id == user.profileId)
        profile = session.exec(profile_stmt).first()
    
    token = create_access_token({"sub": user.id, "role": user.role})
    
    return AuthResponse(
        user={
            "id": user.id,
            "email": user.email,
            "role": user.role,
            "profile": profile.dict() if profile else {}
        },
        token=token
    )


@router.post("/signup", response_model=AuthResponse)
async def signup(request: SignUpRequest, session: Session = Depends(get_session)):
    # Check if user exists
    statement = select(User).where(User.email == request.email)
    existing = session.exec(statement).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create profile
    profile_id = f"{request.role}-{uuid.uuid4().hex[:8]}"
    
    if request.role == "jobseeker":
        profile = JobSeeker(
            id=profile_id,
            name="New User",
            nationality="KR",
            phone="",
            languageLevel="TOPIK 1급",
            visaType="D-2",
            availability="주말",
        )
        session.add(profile)
    else:
        profile = Employer(
            id=profile_id,
            businessNo="",
            shopName="New Shop",
            industry="기타",
            address="",
            openHours="",
            contact="",
            minLanguageLevel="TOPIK 1급",
            baseWage=10000,
            schedule="",
        )
        session.add(profile)
    
    # Create user
    user = User(
        id=f"user-{uuid.uuid4().hex[:8]}",
        email=request.email,
        hashedPassword=hash_password(request.password),
        role=request.role,
        profileId=profile_id,
    )
    session.add(user)
    session.commit()
    session.refresh(user)
    session.refresh(profile)
    
    token = create_access_token({"sub": user.id, "role": user.role})
    
    return AuthResponse(
        user={
            "id": user.id,
            "email": user.email,
            "role": user.role,
            "profile": profile.dict()
        },
        token=token
    )

