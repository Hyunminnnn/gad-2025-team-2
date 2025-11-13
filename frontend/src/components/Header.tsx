import { useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  action?: ReactNode;
  transparent?: boolean;
}

export const Header = ({ title, showBack = false, action, transparent = false }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header
      className={`
        sticky top-0 z-50 flex items-center justify-between h-14 px-4
        ${transparent ? 'bg-transparent' : 'bg-white border-b border-border'}
      `}
    >
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="p-1 -ml-1 hover:opacity-70 transition-opacity"
            aria-label="Go back"
          >
            <svg
              className="w-6 h-6 text-text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        {title && <h1 className="text-[18px] font-bold text-text-primary">{title}</h1>}
      </div>
      {action}
    </header>
  );
};

