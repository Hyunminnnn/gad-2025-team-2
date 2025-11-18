from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
import uuid
import json
from datetime import datetime

from app.db import get_session
from app.models import JobSeekerProfile
from app.schemas import JobSeekerProfileCreate, JobSeekerProfileResponse

router = APIRouter(prefix="/job-seeker", tags=["job-seeker"])


@router.post("/profile", response_model=JobSeekerProfileResponse, status_code=201)
async def create_job_seeker_profile(
    request: JobSeekerProfileCreate, session: Session = Depends(get_session)
):
    """Create or update job seeker profile"""
    # Check if profile already exists
    statement = select(JobSeekerProfile).where(
        JobSeekerProfile.user_id == request.user_id
    )
    existing = session.exec(statement).first()

    if existing:
        # Update existing profile
        existing.basic_info_file_name = request.basic_info_file_name
        existing.preferred_regions = json.dumps(request.preferred_regions)
        existing.preferred_jobs = json.dumps(request.preferred_jobs)
        existing.updated_at = datetime.utcnow()
        session.add(existing)
        session.commit()
        session.refresh(existing)

        return JobSeekerProfileResponse(
            id=existing.id,
            user_id=existing.user_id,
            basic_info_file_name=existing.basic_info_file_name,
            preferred_regions=json.loads(existing.preferred_regions),
            preferred_jobs=json.loads(existing.preferred_jobs),
            created_at=existing.created_at.isoformat(),
            updated_at=existing.updated_at.isoformat(),
        )
    else:
        # Create new profile
        profile_id = f"profile-{uuid.uuid4().hex[:8]}"
        profile = JobSeekerProfile(
            id=profile_id,
            user_id=request.user_id,
            basic_info_file_name=request.basic_info_file_name,
            preferred_regions=json.dumps(request.preferred_regions),
            preferred_jobs=json.dumps(request.preferred_jobs),
        )
        session.add(profile)
        session.commit()
        session.refresh(profile)

        return JobSeekerProfileResponse(
            id=profile.id,
            user_id=profile.user_id,
            basic_info_file_name=profile.basic_info_file_name,
            preferred_regions=json.loads(profile.preferred_regions),
            preferred_jobs=json.loads(profile.preferred_jobs),
            created_at=profile.created_at.isoformat(),
            updated_at=profile.updated_at.isoformat(),
        )


@router.get("/profile/{user_id}", response_model=JobSeekerProfileResponse)
async def get_job_seeker_profile(
    user_id: str, session: Session = Depends(get_session)
):
    """Get job seeker profile by user_id"""
    statement = select(JobSeekerProfile).where(JobSeekerProfile.user_id == user_id)
    profile = session.exec(statement).first()

    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")

    return JobSeekerProfileResponse(
        id=profile.id,
        user_id=profile.user_id,
        basic_info_file_name=profile.basic_info_file_name,
        preferred_regions=json.loads(profile.preferred_regions),
        preferred_jobs=json.loads(profile.preferred_jobs),
        created_at=profile.created_at.isoformat(),
        updated_at=profile.updated_at.isoformat(),
    )

