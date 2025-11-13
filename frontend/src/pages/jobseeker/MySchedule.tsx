import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { MonthPicker } from '@/components/schedule/MonthPicker';
import { CalendarGrid } from '@/components/schedule/CalendarGrid';
import { ShiftCard } from '@/components/schedule/ShiftCard';
import type { ScheduleMonth, Shift } from '@/types/schedule';

export const MySchedule = () => {
  const [selectedMonth, setSelectedMonth] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1
  });
  const [scheduleData, setScheduleData] = useState<ScheduleMonth | null>(null);
  const [upcomingShifts, setUpcomingShifts] = useState<Shift[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSchedule();
    fetchUpcomingShifts();
  }, [selectedMonth]);

  const fetchSchedule = async () => {
    try {
      setLoading(true);
      
      // Mock data - 실제로는 API 호출
      // const response = await fetch(`/api/schedule/my?year=${selectedMonth.year}&month=${selectedMonth.month}`);
      // const data = await response.json();
      
      const mockSchedule: ScheduleMonth = {
        year: selectedMonth.year,
        month: selectedMonth.month,
        days: [
          {
            dateISO: `${selectedMonth.year}-${String(selectedMonth.month).padStart(2, '0')}-03`,
            summaryMinutes: 300,
            status: 'completed'
          },
          {
            dateISO: `${selectedMonth.year}-${String(selectedMonth.month).padStart(2, '0')}-05`,
            summaryMinutes: 270,
            status: 'completed'
          },
          {
            dateISO: `${selectedMonth.year}-${String(selectedMonth.month).padStart(2, '0')}-07`,
            summaryMinutes: 300,
            deltaMinutes: 15,
            status: 'completed'
          },
          {
            dateISO: `${selectedMonth.year}-${String(selectedMonth.month).padStart(2, '0')}-10`,
            summaryMinutes: 240,
            deltaMinutes: -30,
            status: 'completed'
          },
          {
            dateISO: `${selectedMonth.year}-${String(selectedMonth.month).padStart(2, '0')}-12`,
            summaryMinutes: 300,
            status: 'completed'
          },
          {
            dateISO: `${selectedMonth.year}-${String(selectedMonth.month).padStart(2, '0')}-14`,
            status: 'absent'
          },
          {
            dateISO: `${selectedMonth.year}-${String(selectedMonth.month).padStart(2, '0')}-17`,
            summaryMinutes: 270,
            status: 'completed'
          },
          {
            dateISO: `${selectedMonth.year}-${String(selectedMonth.month).padStart(2, '0')}-19`,
            summaryMinutes: 300,
            status: 'completed'
          },
          {
            dateISO: `${selectedMonth.year}-${String(selectedMonth.month).padStart(2, '0')}-21`,
            summaryMinutes: 300,
            status: 'planned'
          },
          {
            dateISO: `${selectedMonth.year}-${String(selectedMonth.month).padStart(2, '0')}-24`,
            summaryMinutes: 270,
            status: 'planned'
          },
          {
            dateISO: `${selectedMonth.year}-${String(selectedMonth.month).padStart(2, '0')}-26`,
            summaryMinutes: 300,
            status: 'planned'
          },
          {
            dateISO: `${selectedMonth.year}-${String(selectedMonth.month).padStart(2, '0')}-28`,
            summaryMinutes: 270,
            status: 'planned'
          }
        ],
        summary: {
          totalMinutes: 3120,
          totalShifts: 12,
          completedShifts: 7,
          lateCount: 1,
          absentCount: 1,
          averageMinutesPerShift: 277
        }
      };

      setScheduleData(mockSchedule);
    } catch (error) {
      console.error('Failed to fetch schedule:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUpcomingShifts = async () => {
    try {
      // Mock data
      const mockShifts: Shift[] = [
        {
          id: 'shift-1',
          workplaceId: 'workplace-1',
          workplaceName: '스타벅스 강남점',
          startISO: new Date(Date.now() + 86400000 * 1).toISOString(),
          endISO: new Date(Date.now() + 86400000 * 1 + 18000000).toISOString(),
          status: 'planned',
          notes: '오픈 근무'
        },
        {
          id: 'shift-2',
          workplaceId: 'workplace-1',
          workplaceName: '스타벅스 강남점',
          startISO: new Date(Date.now() + 86400000 * 3).toISOString(),
          endISO: new Date(Date.now() + 86400000 * 3 + 16200000).toISOString(),
          status: 'planned'
        },
        {
          id: 'shift-3',
          workplaceId: 'workplace-2',
          workplaceName: 'CU 신촌점',
          startISO: new Date(Date.now() + 86400000 * 5).toISOString(),
          endISO: new Date(Date.now() + 86400000 * 5 + 21600000).toISOString(),
          status: 'planned',
          notes: '야간 근무'
        }
      ];

      setUpcomingShifts(mockShifts);
    } catch (error) {
      console.error('Failed to fetch upcoming shifts:', error);
    }
  };

  const handleMonthChange = (year: number, month: number) => {
    setSelectedMonth({ year, month });
  };

  const formatTotalHours = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    return `${hours}시간`;
  };

  if (loading || !scheduleData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-mint-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          <p className="text-[14px] text-gray-500">불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="내 일정" showBack />

      {/* Summary Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="mb-4">
          <h2 className="text-[20px] font-bold text-gray-900 mb-1">
            알바 일정 관리
          </h2>
          <p className="text-[14px] text-gray-600">
            한눈에 확인하는 근무현황
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-4 gap-2">
          <div className="bg-gray-50 rounded-xl p-2.5 text-center">
            <p className="text-[16px] font-bold text-gray-900">
              {scheduleData.summary.totalShifts}
            </p>
            <p className="text-[10px] text-gray-600">총 근무</p>
          </div>
          <div className="bg-emerald-50 rounded-xl p-2.5 text-center">
            <p className="text-[16px] font-bold text-emerald-700">
              {scheduleData.summary.completedShifts}
            </p>
            <p className="text-[10px] text-emerald-700">완료</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-2.5 text-center">
            <p className="text-[16px] font-bold text-amber-700">
              {scheduleData.summary.lateCount}
            </p>
            <p className="text-[10px] text-amber-700">지각</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-2.5 text-center">
            <p className="text-[16px] font-bold text-blue-700">
              {formatTotalHours(scheduleData.summary.totalMinutes)}
            </p>
            <p className="text-[10px] text-blue-700">총 시간</p>
          </div>
        </div>
      </div>

      {/* Month Picker */}
      <MonthPicker value={selectedMonth} onChange={handleMonthChange} />

      {/* Calendar */}
      <div className="px-4 mb-6">
        <CalendarGrid
          year={selectedMonth.year}
          month={selectedMonth.month}
          days={scheduleData.days}
        />
      </div>

      {/* Upcoming Shifts */}
      <div className="px-4">
        <h3 className="text-[17px] font-bold text-gray-900 mb-3">다가오는 근무</h3>

        {upcomingShifts.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-[14px] text-gray-500">예정된 근무가 없습니다</p>
          </div>
        ) : (
          <div className="space-y-3">
            {upcomingShifts.map((shift) => (
              <ShiftCard key={shift.id} shift={shift} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

