from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select
from typing import Optional
import uuid
from datetime import datetime

from app.db import get_session
from app.models import Message
from app.schemas import MessageCreate, MessageRead

router = APIRouter(tags=["messages"])


@router.get("/conversations/{conversation_id}/messages", response_model=dict)
async def list_messages(
    conversation_id: str,
    cursor: Optional[str] = None,
    limit: int = Query(default=50, le=100),
    session: Session = Depends(get_session),
):
    """List messages in a conversation with pagination"""
    statement = select(Message).where(
        Message.conversationId == conversation_id
    ).order_by(Message.timestamp.desc()).limit(limit)
    
    messages = session.exec(statement).all()
    
    return {
        "messages": [msg.dict() for msg in reversed(messages)],
        "nextCursor": None if len(messages) < limit else messages[-1].id
    }


@router.post("/messages", response_model=dict, status_code=201)
async def send_message(
    request: MessageCreate,
    session: Session = Depends(get_session),
):
    """Send a new message"""
    message = Message(
        id=f"msg-{uuid.uuid4().hex[:12]}",
        conversationId=request.conversationId,
        senderId=request.senderId,
        text=request.text,
    )
    
    session.add(message)
    session.commit()
    session.refresh(message)
    
    return message.dict()


@router.post("/messages/read")
async def mark_message_read(
    request: MessageRead,
    session: Session = Depends(get_session),
):
    """Mark message as read"""
    statement = select(Message).where(Message.id == request.messageId)
    message = session.exec(statement).first()
    
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    
    message.read = True
    session.add(message)
    session.commit()
    
    return {"success": True}

