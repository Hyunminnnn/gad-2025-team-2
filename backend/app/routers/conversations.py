from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from typing import List
import json

from app.db import get_session
from app.models import Conversation, Message

router = APIRouter(prefix="/conversations", tags=["conversations"])


@router.get("/{user_id}", response_model=List[dict])
async def list_conversations(user_id: str, session: Session = Depends(get_session)):
    """List all conversations for a user"""
    statement = select(Conversation)
    conversations = session.exec(statement).all()
    
    result = []
    for conv in conversations:
        participants = json.loads(conv.participants)
        if user_id in participants:
            # Get last message
            msg_stmt = select(Message).where(
                Message.conversationId == conv.id
            ).order_by(Message.timestamp.desc()).limit(1)
            last_msg = session.exec(msg_stmt).first()
            
            conv_dict = conv.dict()
            conv_dict["participants"] = participants
            conv_dict["lastMessage"] = last_msg.dict() if last_msg else None
            result.append(conv_dict)
    
    return result

