import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Message } from '@/types';
import { formatTimeAgo } from '@/utils/date';

interface ChatBubbleProps {
  message: Message;
  isOwn: boolean;
  onTranslate?: (messageId: string) => void;
}

export const ChatBubble = ({ message, isOwn, onTranslate }: ChatBubbleProps) => {
  const { t } = useTranslation();
  const [showTranslation, setShowTranslation] = useState(false);

  const handleToggleTranslation = () => {
    if (!message.translatedText && onTranslate) {
      onTranslate(message.id);
    }
    setShowTranslation(!showTranslation);
  };

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-3`}>
      <div className={`max-w-[75%] ${isOwn ? 'items-end' : 'items-start'} flex flex-col`}>
        <div
          className={`
            px-4 py-2.5 rounded-2xl
            ${isOwn 
              ? 'bg-primary-mint text-white rounded-br-sm' 
              : 'bg-gray-100 text-text-primary rounded-bl-sm'
            }
          `}
        >
          <p className="text-[14px] leading-relaxed whitespace-pre-wrap">
            {showTranslation && message.translatedText ? message.translatedText : message.text}
          </p>
        </div>

        <div className="flex items-center gap-2 mt-1 px-1">
          <span className="text-[11px] text-text-tertiary">
            {formatTimeAgo(message.timestamp)}
          </span>
          {!isOwn && (
            <button
              onClick={handleToggleTranslation}
              className="text-[11px] text-primary-mint hover:underline"
            >
              {showTranslation ? t('message.original') : t('message.translate')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

