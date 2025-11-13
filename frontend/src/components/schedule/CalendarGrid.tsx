import type { DayStat } from '@/types/schedule';

interface CalendarGridProps {
  year: number;
  month: number;
  days: DayStat[];
  onDateClick?: (date: string) => void;
}

export const CalendarGrid = ({ year, month, days, onDateClick }: CalendarGridProps) => {
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  
  // 해당 월의 첫날과 마지막날
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  const daysInMonth = lastDay.getDate();
  const startDayOfWeek = firstDay.getDay();

  // 빈 셀과 날짜 셀 생성
  const cells: (number | null)[] = [
    ...Array(startDayOfWeek).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1)
  ];

  // 오늘 날짜
  const today = new Date();
  const isToday = (day: number) => {
    return (
      today.getFullYear() === year &&
      today.getMonth() + 1 === month &&
      today.getDate() === day
    );
  };

  // 해당 날짜의 통계 가져오기
  const getDayStat = (day: number): DayStat | undefined => {
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return days.find(d => d.dateISO === dateStr);
  };

  // 시간을 "4시간 30분" 형식으로 변환
  const formatMinutes = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins}분`;
    if (mins === 0) return `${hours}시간`;
    return `${hours}시간${mins}분`;
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      {/* Days of week header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map((day, index) => (
          <div
            key={day}
            className={`text-center text-[12px] font-semibold py-2 ${
              index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : 'text-gray-600'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} className="aspect-square" />;
          }

          const stat = getDayStat(day);
          const today = isToday(day);

          return (
            <button
              key={day}
              onClick={() => {
                const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                onDateClick?.(dateStr);
              }}
              className={`aspect-square rounded-xl p-1 flex flex-col items-center justify-start
                       hover:bg-gray-50 transition-colors relative ${
                today ? 'ring-2 ring-mint-600' : ''
              }`}
            >
              {/* Day number */}
              <span className={`text-[14px] font-medium mb-1 ${
                today 
                  ? 'text-mint-600 font-bold' 
                  : index % 7 === 0 
                    ? 'text-red-500' 
                    : index % 7 === 6 
                      ? 'text-blue-500' 
                      : 'text-gray-900'
              }`}>
                {day}
              </span>

              {/* Status chips */}
              {stat && (
                <div className="flex flex-col gap-0.5 w-full">
                  {/* Summary minutes */}
                  {stat.summaryMinutes && stat.summaryMinutes > 0 && (
                    <div className={`text-[9px] px-1 py-0.5 rounded text-center font-medium ${
                      stat.status === 'completed' 
                        ? 'bg-emerald-100 text-emerald-700'
                        : stat.status === 'planned'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                    }`}>
                      {formatMinutes(stat.summaryMinutes)}
                    </div>
                  )}

                  {/* Delta (late/early) */}
                  {stat.deltaMinutes && stat.deltaMinutes !== 0 && (
                    <div className={`text-[9px] px-1 py-0.5 rounded text-center font-medium ${
                      stat.deltaMinutes > 0
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-gray-200 text-gray-700'
                    }`}>
                      {stat.deltaMinutes > 0 ? '+' : ''}{stat.deltaMinutes}분
                    </div>
                  )}

                  {/* Absent */}
                  {stat.status === 'absent' && (
                    <div className="text-[9px] px-1 py-0.5 rounded bg-rose-100 text-rose-700 text-center font-medium">
                      결근
                    </div>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

