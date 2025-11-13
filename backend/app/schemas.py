from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class SignInRequest(BaseModel):
    email: str
    password: str


class SignUpRequest(BaseModel):
    email: str
    password: str
    role: str


class AuthResponse(BaseModel):
    user: dict
    token: str


class ApplicationCreate(BaseModel):
    seekerId: str
    jobId: str


class ApplicationUpdate(BaseModel):
    status: str


class MessageCreate(BaseModel):
    conversationId: str
    senderId: str
    text: str


class MessageRead(BaseModel):
    messageId: str


class TranslateRequest(BaseModel):
    messageId: str
    text: str
    targetLang: str


class TranslateResponse(BaseModel):
    translatedText: str


class LevelTestSubmit(BaseModel):
    seekerId: str
    answers: dict

