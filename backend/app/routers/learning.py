from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select

from app.db import get_session
from app.models import LearningProgress
from app.schemas import LevelTestSubmit

router = APIRouter(tags=["learning"])


@router.get("/learning/summary", response_model=dict)
async def get_learning_summary(
    seekerId: str = Query(...),
    session: Session = Depends(get_session),
):
    """Get learning progress summary for a jobseeker"""
    statement = select(LearningProgress).where(LearningProgress.seekerId == seekerId)
    progress = session.exec(statement).first()
    
    if not progress:
        # Return default
        return {
            "seekerId": seekerId,
            "currentLevel": "한국어 입문",
            "completedLessons": 3,
            "totalLessons": 6,
            "progressPercent": 65
        }
    
    return progress.dict()


@router.post("/leveltest")
async def submit_level_test(
    request: LevelTestSubmit,
    session: Session = Depends(get_session),
):
    """Submit level test answers"""
    # Process test and determine level
    # This is a placeholder implementation
    
    statement = select(LearningProgress).where(LearningProgress.seekerId == request.seekerId)
    progress = session.exec(statement).first()
    
    if progress:
        progress.currentLevel = "TOPIK 2급"
        session.add(progress)
        session.commit()
    
    return {"success": True, "level": "TOPIK 2급"}

