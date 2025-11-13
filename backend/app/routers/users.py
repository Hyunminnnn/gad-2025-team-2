from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
import json

from app.db import get_session
from app.models import JobSeeker, Employer

router = APIRouter(tags=["users"])


@router.get("/jobseekers/{seeker_id}", response_model=dict)
async def get_jobseeker(seeker_id: str, session: Session = Depends(get_session)):
    """Get jobseeker profile"""
    statement = select(JobSeeker).where(JobSeeker.id == seeker_id)
    seeker = session.exec(statement).first()
    
    if not seeker:
        raise HTTPException(status_code=404, detail="JobSeeker not found")
    
    seeker_dict = seeker.dict()
    seeker_dict["experience"] = json.loads(seeker.experience)
    seeker_dict["preferences"] = json.loads(seeker.preferences)
    
    return seeker_dict


@router.get("/employers/{employer_id}", response_model=dict)
async def get_employer(employer_id: str, session: Session = Depends(get_session)):
    """Get employer profile"""
    statement = select(Employer).where(Employer.id == employer_id)
    employer = session.exec(statement).first()
    
    if not employer:
        raise HTTPException(status_code=404, detail="Employer not found")
    
    employer_dict = employer.dict()
    employer_dict["media"] = json.loads(employer.media)
    employer_dict["needVisa"] = json.loads(employer.needVisa)
    
    return employer_dict

