from sqlalchemy import Column, String, DateTime, ForeignKey, Text, Integer
from sqlalchemy.orm import relationship
from datetime import datetime
from .base import Base

class Conversation(Base):
    __tablename__ = "conversations"

    id = Column(String, primary_key=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    messages = relationship("Message", back_populates="conversation", cascade="all, delete-orphan")
    participants = relationship("ConversationParticipant", back_populates="conversation", cascade="all, delete-orphan")


class ConversationParticipant(Base):
    __tablename__ = "conversation_participants"

    id = Column(String, primary_key=True)
    conversation_id = Column(String, ForeignKey("conversations.id"), nullable=False)
    user_id = Column(String, nullable=False)
    last_read_at = Column(DateTime, nullable=True)
    joined_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    conversation = relationship("Conversation", back_populates="participants")


class Message(Base):
    __tablename__ = "messages"

    id = Column(String, primary_key=True)
    conversation_id = Column(String, ForeignKey("conversations.id"), nullable=False)
    sender_id = Column(String, nullable=False)
    text = Column(Text, nullable=False)
    detected_lang = Column(String(10), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    read_at = Column(DateTime, nullable=True)
    
    # Relationships
    conversation = relationship("Conversation", back_populates="messages")
    translations = relationship("TranslationCache", back_populates="message", cascade="all, delete-orphan")


class TranslationCache(Base):
    __tablename__ = "translation_cache"

    id = Column(String, primary_key=True)
    message_id = Column(String, ForeignKey("messages.id"), nullable=False)
    target_lang = Column(String(10), nullable=False)
    translated_text = Column(Text, nullable=False)
    provider = Column(String(50), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    message = relationship("Message", back_populates="translations")

