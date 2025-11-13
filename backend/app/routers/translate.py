from fastapi import APIRouter, Depends
from sqlmodel import Session, select

from app.db import get_session
from app.models import Message
from app.schemas import TranslateRequest, TranslateResponse
from app.services.translate_adapter import translate_adapter

router = APIRouter(tags=["translate"])


@router.post("/translate", response_model=TranslateResponse)
async def translate_message(
    request: TranslateRequest,
    session: Session = Depends(get_session),
):
    """Translate a message"""
    translated = await translate_adapter.translate(
        text=request.text,
        target_lang=request.targetLang
    )
    
    # Optionally save translation to database
    if request.messageId:
        statement = select(Message).where(Message.id == request.messageId)
        message = session.exec(statement).first()
        if message:
            message.translatedText = translated
            session.add(message)
            session.commit()
    
    return TranslateResponse(translatedText=translated)

