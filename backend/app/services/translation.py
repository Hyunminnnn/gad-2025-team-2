from abc import ABC, abstractmethod
from typing import Optional, Tuple
import os
import httpx
from langdetect import detect

class TranslationProvider(ABC):
    """번역 제공자 인터페이스"""
    
    @abstractmethod
    async def translate(
        self, 
        text: str, 
        source_lang: Optional[str] = None, 
        target_lang: str = "ko"
    ) -> Tuple[str, str]:
        """
        텍스트를 번역합니다.
        
        Returns:
            Tuple[translated_text, detected_lang]
        """
        pass


class GeminiTranslationProvider(TranslationProvider):
    """Google Gemini를 사용한 번역 제공자"""
    
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = "https://generativelanguage.googleapis.com/v1beta"
        self.model = "gemini-1.5-flash"
    
    async def translate(
        self, 
        text: str, 
        source_lang: Optional[str] = None, 
        target_lang: str = "ko"
    ) -> Tuple[str, str]:
        # 언어 감지
        if not source_lang:
            try:
                source_lang = detect(text)
            except:
                source_lang = "unknown"
        
        # 같은 언어면 번역 불필요
        if source_lang == target_lang:
            return text, source_lang
        
        # Gemini API 호출
        prompt = f"""Translate the following text from {source_lang} to {target_lang}. 
Only provide the translation, no explanations.

Text: {text}

Translation:"""

        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.base_url}/models/{self.model}:generateContent?key={self.api_key}",
                json={
                    "contents": [{
                        "parts": [{
                            "text": prompt
                        }]
                    }]
                },
                timeout=30.0
            )
            
            if response.status_code != 200:
                raise Exception(f"Gemini API error: {response.status_code}")
            
            result = response.json()
            translated_text = result['candidates'][0]['content']['parts'][0]['text'].strip()
            
            return translated_text, source_lang


class MockTranslationProvider(TranslationProvider):
    """개발/테스트용 Mock 번역 제공자"""
    
    async def translate(
        self, 
        text: str, 
        source_lang: Optional[str] = None, 
        target_lang: str = "ko"
    ) -> Tuple[str, str]:
        # 언어 감지
        if not source_lang:
            try:
                source_lang = detect(text)
            except:
                source_lang = "unknown"
        
        # Mock 번역 (실제로는 그대로 반환하되 [번역됨] 표시)
        translated = f"[번역됨: {source_lang}→{target_lang}] {text}"
        
        return translated, source_lang


class TranslationService:
    """번역 서비스 (싱글톤)"""
    
    _instance = None
    _provider: Optional[TranslationProvider] = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(TranslationService, cls).__new__(cls)
        return cls._instance
    
    def initialize(self, provider: TranslationProvider):
        """번역 제공자를 초기화합니다"""
        self._provider = provider
    
    async def translate(
        self, 
        text: str, 
        source_lang: Optional[str] = None, 
        target_lang: str = "ko"
    ) -> Tuple[str, str]:
        """텍스트를 번역합니다"""
        if not self._provider:
            raise Exception("Translation provider not initialized")
        
        return await self._provider.translate(text, source_lang, target_lang)


def get_translation_service() -> TranslationService:
    """번역 서비스 인스턴스를 반환합니다"""
    return TranslationService()


def initialize_translation_service():
    """환경 변수에 따라 번역 서비스를 초기화합니다"""
    service = TranslationService()
    
    provider_type = os.getenv("TRANSLATE_PROVIDER", "mock").lower()
    
    if provider_type == "gemini":
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            print("Warning: GEMINI_API_KEY not set, using mock provider")
            provider = MockTranslationProvider()
        else:
            provider = GeminiTranslationProvider(api_key)
    else:
        provider = MockTranslationProvider()
    
    service.initialize(provider)
    print(f"Translation service initialized with {provider.__class__.__name__}")

