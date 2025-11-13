"""
Translation adapter - can be switched between mock and real providers
"""
import os
from typing import Optional


class TranslateAdapter:
    def __init__(self, provider: str = "mock"):
        self.provider = provider
        
    async def translate(self, text: str, target_lang: str, source_lang: str = "auto") -> str:
        """Translate text to target language"""
        if self.provider == "mock":
            return f"[번역: {text}]"
        elif self.provider == "gemini":
            # Implement Gemini translation here
            return f"[Gemini 번역: {text}]"
        else:
            return text


# Global instance
translate_adapter = TranslateAdapter(
    provider=os.getenv("TRANSLATE_PROVIDER", "mock")
)

