from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
import uuid

from ..database import get_db
from ..models.message import Conversation, Message, ConversationParticipant, TranslationCache
from ..schemas.message import (
    MessageCreate, MessageResponse, MessageListResponse,
    ConversationResponse, TranslateRequest, TranslateResponse,
    ReadMessagesRequest
)
from ..services.translation import get_translation_service

router = APIRouter(prefix="/api", tags=["messages"])


@router.get("/conversations/{user_id}", response_model=List[ConversationResponse])
async def get_user_conversations(
    user_id: str,
    db: Session = Depends(get_db)
):
    """사용자의 대화 목록을 가져옵니다"""
    # TODO: 실제 데이터베이스 쿼리
    # 현재는 Mock 데이터 반환
    mock_conversations = [
        {
            "id": "conv-1",
            "participants": [
                {
                    "id": "user-1",
                    "name": "김수정",
                    "role": "jobseeker",
                    "nationality": "우즈베키스탄"
                },
                {
                    "id": "user-2",
                    "name": "스타벅스 강남점",
                    "role": "employer"
                }
            ],
            "last_message": {
                "text": "네, 내일 면접 가능합니다!",
                "created_at": datetime.utcnow().isoformat()
            },
            "unread_count": 2,
            "updated_at": datetime.utcnow(),
            "job_title": "카페 바리스타",
            "job_id": "job-1"
        }
    ]
    return mock_conversations


@router.get("/conversations/{conversation_id}/messages", response_model=MessageListResponse)
async def get_conversation_messages(
    conversation_id: str,
    cursor: Optional[str] = None,
    limit: int = 50,
    db: Session = Depends(get_db)
):
    """대화의 메시지 목록을 가져옵니다 (페이징)"""
    # TODO: 실제 데이터베이스 쿼리 with pagination
    mock_messages = [
        {
            "id": "msg-1",
            "conversation_id": conversation_id,
            "sender_id": "user-2",
            "text": "안녕하세요! 지원해주셔서 감사합니다.",
            "detected_lang": "ko",
            "created_at": datetime.utcnow(),
            "read_at": datetime.utcnow()
        },
        {
            "id": "msg-2",
            "conversation_id": conversation_id,
            "sender_id": "user-1",
            "text": "Salom! Men bu ishga juda qiziqaman.",
            "detected_lang": "uz",
            "created_at": datetime.utcnow(),
            "read_at": datetime.utcnow()
        }
    ]
    
    return {
        "items": mock_messages,
        "next_cursor": None,
        "has_more": False
    }


@router.post("/messages", response_model=MessageResponse)
async def send_message(
    message: MessageCreate,
    db: Session = Depends(get_db)
):
    """메시지를 전송합니다"""
    # 언어 감지
    try:
        from langdetect import detect
        detected_lang = detect(message.text)
    except:
        detected_lang = None
    
    # TODO: 데이터베이스에 저장
    new_message = {
        "id": f"msg-{uuid.uuid4()}",
        "conversation_id": message.conversation_id,
        "sender_id": message.sender_id,
        "text": message.text,
        "detected_lang": detected_lang,
        "created_at": datetime.utcnow(),
        "status": "sent"
    }
    
    # TODO: WebSocket으로 브로드캐스트
    
    return new_message


@router.post("/messages/read")
async def mark_messages_as_read(
    request: ReadMessagesRequest,
    db: Session = Depends(get_db)
):
    """메시지를 읽음으로 표시합니다"""
    # TODO: 데이터베이스 업데이트
    return {"status": "success"}


@router.post("/translate", response_model=TranslateResponse)
async def translate_message(
    request: TranslateRequest,
    db: Session = Depends(get_db)
):
    """메시지를 번역합니다"""
    # 캐시 확인
    # cached = db.query(TranslationCache).filter(
    #     TranslationCache.message_id == request.message_id,
    #     TranslationCache.target_lang == request.target_lang
    # ).first()
    
    # if cached:
    #     return TranslateResponse(
    #         message_id=request.message_id,
    #         translated_text=cached.translated_text,
    #         source_lang=request.source_lang or "auto",
    #         target_lang=request.target_lang,
    #         provider=cached.provider
    #     )
    
    # 번역 서비스 호출
    translation_service = get_translation_service()
    try:
        translated_text, detected_lang = await translation_service.translate(
            text=request.text,
            source_lang=request.source_lang,
            target_lang=request.target_lang
        )
        
        # 캐시에 저장
        # new_cache = TranslationCache(
        #     id=str(uuid.uuid4()),
        #     message_id=request.message_id,
        #     target_lang=request.target_lang,
        #     translated_text=translated_text,
        #     provider="gemini"
        # )
        # db.add(new_cache)
        # db.commit()
        
        return TranslateResponse(
            message_id=request.message_id,
            translated_text=translated_text,
            source_lang=detected_lang,
            target_lang=request.target_lang,
            provider="translation_service"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Translation failed: {str(e)}")

