import { useState } from 'react';

interface MonthPickerProps {
  value: { year: number; month: number };
  onChange: (year: number, month: number) => void;
}

export const MonthPicker = ({ value, onChange }: MonthPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handlePrevMonth = () => {
    const newMonth = value.month === 1 ? 12 : value.month - 1;
    const newYear = value.month === 1 ? value.year - 1 : value.year;
    onChange(newYear, newMonth);
  };

  const handleNextMonth = () => {
    const newMonth = value.month === 12 ? 1 : value.month + 1;
    const newYear = value.month === 12 ? value.year + 1 : value.year;
    onChange(newYear, newMonth);
  };

  const months = [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월'
  ];

  const years = Array.from({ length: 5 }, (_, i) => value.year - 2 + i);

  return (
    <div className="relative">
      <div className="flex items-center justify-between px-4 py-3">
        <button
          onClick={handlePrevMonth}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          aria-label="이전 달"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-xl transition-colors"
        >
          <span className="text-[18px] font-bold text-gray-900">
            {value.year}년 {value.month}월
          </span>
          <svg 
            className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <button
          onClick={handleNextMonth}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          aria-label="다음 달"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-2xl shadow-lg border border-gray-200 p-4 z-50 w-[280px]">
            {/* Year selector */}
            <div className="mb-4">
              <p className="text-[13px] font-medium text-gray-600 mb-2">년도</p>
              <div className="flex gap-2">
                {years.map(year => (
                  <button
                    key={year}
                    onClick={() => {
                      onChange(year, value.month);
                    }}
                    className={`flex-1 py-2 rounded-lg text-[14px] font-medium transition-colors ${
                      year === value.year
                        ? 'bg-mint-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>

            {/* Month selector */}
            <div>
              <p className="text-[13px] font-medium text-gray-600 mb-2">월</p>
              <div className="grid grid-cols-4 gap-2">
                {months.map((month, index) => (
                  <button
                    key={month}
                    onClick={() => {
                      onChange(value.year, index + 1);
                      setIsOpen(false);
                    }}
                    className={`py-2 rounded-lg text-[14px] font-medium transition-colors ${
                      index + 1 === value.month
                        ? 'bg-mint-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {month}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

