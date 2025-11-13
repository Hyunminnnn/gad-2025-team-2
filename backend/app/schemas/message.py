from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class MessageBase(BaseModel):
    text: str

class MessageCreate(MessageBase):
    conversation_id: str
    sender_id: str

class MessageResponse(MessageBase):
    id: str
    conversation_id: str
    sender_id: str
    detected_lang: Optional[str] = None
    created_at: datetime
    read_at: Optional[datetime] = None
    status: Optional[str] = "sent"

    class Config:
        from_attributes = True


class ConversationParticipant(BaseModel):
    id: str
    name: str
    role: str
    profile_image_url: Optional[str] = None
    nationality: Optional[str] = None


class ConversationResponse(BaseModel):
    id: str
    participants: List[ConversationParticipant]
    last_message: Optional[dict] = None
    unread_count: int = 0
    updated_at: datetime
    job_title: Optional[str] = None
    job_id: Optional[str] = None

    class Config:
        from_attributes = True


class MessageListResponse(BaseModel):
    items: List[MessageResponse]
    next_cursor: Optional[str] = None
    has_more: bool = False


class TranslateRequest(BaseModel):
    message_id: str
    text: str
    source_lang: Optional[str] = None
    target_lang: str = "ko"


class TranslateResponse(BaseModel):
    message_id: str
    translated_text: str
    source_lang: str
    target_lang: str
    provider: str


class ReadMessagesRequest(BaseModel):
    conversation_id: str
    user_id: str
    last_read_message_id: Optional[str] = None

