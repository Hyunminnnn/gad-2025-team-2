from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select
from typing import Optional, List
import json

from app.db import get_session
from app.models import Job, Employer

router = APIRouter(prefix="/jobs", tags=["jobs"])


@router.get("", response_model=List[dict])
async def list_jobs(
    query: Optional[str] = None,
    location: Optional[str] = None,
    industry: Optional[str] = None,
    languageLevel: Optional[str] = None,
    visaType: Optional[str] = None,
    limit: int = Query(default=20, le=100),
    offset: int = 0,
    session: Session = Depends(get_session),
):
    """List jobs with filters"""
    statement = select(Job).offset(offset).limit(limit)
    jobs = session.exec(statement).all()
    
    # Get employer info for each job
    result = []
    for job in jobs:
        employer_stmt = select(Employer).where(Employer.id == job.employerId)
        employer = session.exec(employer_stmt).first()
        
        job_dict = job.dict()
        job_dict["employer"] = employer.dict() if employer else {}
        job_dict["requiredVisa"] = json.loads(job.requiredVisa)
        result.append(job_dict)
    
    return result


@router.get("/{job_id}", response_model=dict)
async def get_job(job_id: str, session: Session = Depends(get_session)):
    """Get single job detail"""
    statement = select(Job).where(Job.id == job_id)
    job = session.exec(statement).first()
    
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    # Get employer
    employer_stmt = select(Employer).where(Employer.id == job.employerId)
    employer = session.exec(employer_stmt).first()
    
    job_dict = job.dict()
    job_dict["employer"] = employer.dict() if employer else {}
    job_dict["requiredVisa"] = json.loads(job.requiredVisa)
    
    return job_dict

