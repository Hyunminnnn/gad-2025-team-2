import { useState, useRef, KeyboardEvent } from 'react';

interface MessageInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const MessageInput = ({ 
  onSend, 
  disabled = false,
  placeholder = "메시지를 작성하세요..."
}: MessageInputProps) => {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    
    onSend(trimmed);
    setText('');
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  return (
    <div className="border-t border-line-200 bg-white px-4 py-3">
      <div className="flex items-end gap-2">
        {/* Attach Button (Optional) */}
        <button
          type="button"
          disabled={disabled}
          className="flex-shrink-0 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 
                   flex items-center justify-center transition-colors disabled:opacity-50"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>

        {/* Text Input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="w-full px-4 py-2.5 bg-gray-100 rounded-[20px] border-none resize-none
                     text-[15px] text-text-900 placeholder:text-gray-500
                     focus:outline-none focus:ring-2 focus:ring-mint-600
                     disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ maxHeight: '120px' }}
          />
        </div>

        {/* Send Button */}
        <button
          type="button"
          onClick={handleSend}
          disabled={disabled || !text.trim()}
          className="flex-shrink-0 w-9 h-9 rounded-full bg-mint-600 hover:bg-mint-700 
                   flex items-center justify-center transition-colors
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>

      {/* Helper Text */}
      <div className="mt-2 px-1">
        <p className="text-[11px] text-gray-500">
          Enter로 전송 · Shift+Enter로 줄바꿈
        </p>
      </div>
    </div>
  );
};

