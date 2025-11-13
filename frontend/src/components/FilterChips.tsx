interface FilterChipsProps {
  filters: string[];
  title?: string;
  icon?: string;
  onFilterClick?: () => void;
}

export const FilterChips = ({ filters, title, icon, onFilterClick }: FilterChipsProps) => {
  return (
    <div className="py-3">
      {/* Title Row */}
      {title && (
        <div className="flex items-center gap-2 mb-2 px-8">
          {icon && <span className="text-[12px]">{icon}</span>}
          <span className="text-[12px] text-text-700">{title}</span>
        </div>
      )}

      {/* Filter Row */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide px-8">
        {/* Settings Icon Button */}
        <button
          onClick={onFilterClick}
          className="w-10 h-10 flex items-center justify-center bg-white border border-line-200 
                   rounded-[12px] hover:border-mint-600 transition-colors flex-shrink-0"
          aria-label="필터 설정"
        >
          <svg 
            className="w-5 h-5 text-text-700" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </button>
        
        {/* Selected Filter Chips */}
        {filters.length > 0 ? (
          filters.map((filter, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-[10px] py-[6px] bg-mint-100 border border-mint-600/30 
                       rounded-chip text-[13px] text-mint-600 font-medium whitespace-nowrap"
            >
              {filter}
            </div>
          ))
        ) : (
          <span className="text-[13px] text-text-500 ml-2">필터를 설정해주세요</span>
        )}
      </div>
    </div>
  );
};

