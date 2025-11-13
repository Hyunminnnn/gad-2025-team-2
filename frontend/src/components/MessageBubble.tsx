import { useState } from 'react';
import type { Message } from '@/types/message';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  showAvatar?: boolean;
  avatarUrl?: string;
  onTranslate: (messageId: string) => Promise<string>;
  userLang: string;
}

export const MessageBubble = ({ 
  message, 
  isOwn, 
  showAvatar, 
  avatarUrl,
  onTranslate,
  userLang
}: MessageBubbleProps) => {
  const [isTranslated, setIsTranslated] = useState(false);
  const [translatedText, setTranslatedText] = useState<string>('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [translateError, setTranslateError] = useState(false);

  // 메시지 언어가 사용자 언어와 다른 경우에만 번역 버튼 표시
  const showTranslateButton = message.detectedLang && message.detectedLang !== userLang;

  const handleTranslateToggle = async () => {
    if (isTranslated) {
      // 원문 보기
      setIsTranslated(false);
      setTranslateError(false);
    } else {
      // 번역 보기
      if (translatedText) {
        // 이미 번역된 적 있으면 캐시 사용
        setIsTranslated(true);
      } else {
        // 새로 번역 요청
        setIsTranslating(true);
        setTranslateError(false);
        try {
          const translated = await onTranslate(message.id);
          setTranslatedText(translated);
          setIsTranslated(true);
        } catch (error) {
          setTranslateError(true);
        } finally {
          setIsTranslating(false);
        }
      }
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const period = hours >= 12 ? '오후' : '오전';
    const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    return `${period} ${displayHours}:${minutes}`;
  };

  return (
    <div className={`flex gap-2 mb-3 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      {!isOwn && showAvatar && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-mint-100 to-mint-200 flex items-center justify-center overflow-hidden">
          {avatarUrl ? (
            <img src={avatarUrl} alt="" className="w-full h-full object-cover" />
          ) : (
            <span className="text-sm">👤</span>
          )}
        </div>
      )}
      
      {/* Empty space for alignment */}
      {!isOwn && !showAvatar && <div className="w-8" />}

      {/* Message Content */}
      <div className={`flex flex-col max-w-[70%] ${isOwn ? 'items-end' : 'items-start'}`}>
        {/* Bubble */}
        <div className={`relative rounded-[18px] px-4 py-2.5 ${
          isOwn 
            ? 'bg-gray-900 text-white' 
            : 'bg-gray-100 text-text-900'
        }`}>
          {/* Translate Button */}
          {showTranslateButton && !isOwn && (
            <button
              onClick={handleTranslateToggle}
              disabled={isTranslating}
              className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center
                       text-[10px] font-medium transition-all ${
                isTranslated
                  ? 'bg-mint-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300'
              } ${isTranslating ? 'opacity-50' : 'hover:scale-110'}`}
            >
              {isTranslating ? (
                <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : translateError ? (
                '!'
              ) : isTranslated ? (
                '🌐'
              ) : (
                '🌐'
              )}
            </button>
          )}

          {/* Message Text */}
          <p className="text-[15px] leading-relaxed break-words whitespace-pre-wrap">
            {isTranslated && translatedText ? translatedText : message.text}
          </p>

          {/* Translation Badge */}
          {isTranslated && (
            <div className={`mt-1 text-[10px] ${isOwn ? 'text-white/70' : 'text-gray-500'}`}>
              번역됨 · {message.detectedLang}→{userLang}
            </div>
          )}

          {/* Error Badge */}
          {translateError && (
            <div className="mt-1 text-[10px] text-red-500">
              번역 실패
            </div>
          )}
        </div>

        {/* Time & Status */}
        <div className={`flex items-center gap-1 mt-1 px-1 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
          <span className="text-[11px] text-gray-500">
            {formatTime(message.createdAt)}
          </span>
          
          {isOwn && message.status === 'sending' && (
            <svg className="w-3 h-3 text-gray-400 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          )}
          
          {isOwn && message.status === 'failed' && (
            <svg className="w-3 h-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}

          {isOwn && message.readAt && (
            <span className="text-[11px] text-mint-600 font-medium">읽음</span>
          )}
        </div>
      </div>
    </div>
  );
};

