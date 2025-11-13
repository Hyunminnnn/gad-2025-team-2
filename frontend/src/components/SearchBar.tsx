import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ onSearch, placeholder }: SearchBarProps) => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <svg
          className="absolute left-[14px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-text-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder || "직종, 지역으로 검색..."}
          className="w-full h-[44px] pl-[42px] pr-[14px] bg-white rounded-[14px] border-none
                   text-[14px] text-text-primary placeholder:text-text-500
                   focus:outline-none focus:ring-2 focus:ring-mint-600"
        />
      </div>
    </form>
  );
};

