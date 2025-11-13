import type { Shift } from '@/types/schedule';

interface ShiftCardProps {
  shift: Shift;
  onClick?: () => void;
}

export const ShiftCard = ({ shift, onClick }: ShiftCardProps) => {
  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const dayName = dayNames[date.getDay()];
    return `${month}월 ${day}일 (${dayName})`;
  };

  const getStatusBadge = (status: Shift['status']) => {
    const config = {
      planned: { label: '예정', bg: 'bg-blue-100', text: 'text-blue-700' },
      working: { label: '근무중', bg: 'bg-mint-100', text: 'text-mint-700' },
      completed: { label: '완료', bg: 'bg-emerald-100', text: 'text-emerald-700' },
      late: { label: '지각', bg: 'bg-amber-100', text: 'text-amber-700' },
      absent: { label: '결근', bg: 'bg-rose-100', text: 'text-rose-700' }
    };

    const { label, bg, text } = config[status];

    return (
      <span className={`px-2.5 py-1 rounded-lg text-[12px] font-medium ${bg} ${text}`}>
        {label}
      </span>
    );
  };

  const calculateDuration = () => {
    const start = new Date(shift.startISO);
    const end = new Date(shift.endISO);
    const diffMinutes = Math.floor((end.getTime() - start.getTime()) / 60000);
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    return minutes > 0 ? `${hours}시간 ${minutes}분` : `${hours}시간`;
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md 
               transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-[16px] font-bold text-gray-900 mb-1">
            {shift.workplaceName}
          </h3>
          <p className="text-[13px] text-gray-600">
            {formatDate(shift.startISO)}
          </p>
        </div>
        {getStatusBadge(shift.status)}
      </div>

      <div className="flex items-center gap-4 mb-3">
        <div className="flex items-center gap-1.5 text-gray-700">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-[14px] font-medium">
            {formatTime(shift.startISO)} - {formatTime(shift.endISO)}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-gray-600">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="text-[13px]">
            {calculateDuration()}
          </span>
        </div>
      </div>

      {/* Worked minutes (if completed) */}
      {shift.workedMinutes && shift.status === 'completed' && (
        <div className="pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between text-[13px]">
            <span className="text-gray-600">실제 근무시간</span>
            <span className="font-semibold text-mint-600">
              {Math.floor(shift.workedMinutes / 60)}시간 {shift.workedMinutes % 60}분
            </span>
          </div>
        </div>
      )}

      {/* Notes */}
      {shift.notes && (
        <div className="mt-2 pt-3 border-t border-gray-100">
          <p className="text-[13px] text-gray-600 line-clamp-2">
            {shift.notes}
          </p>
        </div>
      )}
    </div>
  );
};

