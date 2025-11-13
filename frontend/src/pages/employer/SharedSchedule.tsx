import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { MonthPicker } from '@/components/schedule/MonthPicker';
import { CalendarGrid } from '@/components/schedule/CalendarGrid';
import { ShiftCard } from '@/components/schedule/ShiftCard';
import type { ScheduleMonth, Shift, Employee } from '@/types/schedule';

export const SharedSchedule = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [selectedMonth, setSelectedMonth] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1
  });
  const [scheduleData, setScheduleData] = useState<ScheduleMonth | null>(null);
  const [upcomingShifts, setUpcomingShifts] = useState<Shift[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      fetchEmployee();
      fetchSchedule();
      fetchUpcomingShifts();
    }
  }, [userId, selectedMonth]);

  const fetchEmployee = async () => {
    try {
      // Mock data
      const mockEmployee: Employee = {
        id: userId!,
        name: '김수정',
        nationality: '우즈베키스탄',
        position: '서빙',
        totalShifts: 24,
        completedShifts: 20,
        upcomingShifts: 4
      };
      setEmployee(mockEmployee);
    } catch (error) {
      console.error('Failed to fetch employee:', error);
    }
  };

  const fetchSchedule = async () => {
    try {
      setLoading(true);
      
      // Mock data
      const mockSchedule: ScheduleMonth = {
        year: selectedMonth.year,
        month: selectedMonth.month,
        days: [
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
            dateISO: `${selectedMonth.year}-${String(selectedMonth.month).padStart(2, '0')}-12`,
            summaryMinutes: 240,
            deltaMinutes: -30,
            status: 'completed'
          },
          {
            dateISO: `${selectedMonth.year}-${String(selectedMonth.month).padStart(2, '0')}-15`,
            status: 'absent'
          },
          {
            dateISO: `${selectedMonth.year}-${String(selectedMonth.month).padStart(2, '0')}-20`,
            summaryMinutes: 300,
            status: 'planned'
          },
          {
            dateISO: `${selectedMonth.year}-${String(selectedMonth.month).padStart(2, '0')}-25`,
            summaryMinutes: 270,
            status: 'planned'
          }
        ],
        summary: {
          totalMinutes: 1380,
          totalShifts: 6,
          completedShifts: 3,
          lateCount: 1,
          absentCount: 1,
          averageMinutesPerShift: 276
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
      const mockShifts: Shift[] = [
        {
          id: 'shift-1',
          workplaceId: 'workplace-1',
          workplaceName: '스타벅스 강남점',
          startISO: new Date(Date.now() + 86400000 * 2).toISOString(),
          endISO: new Date(Date.now() + 86400000 * 2 + 18000000).toISOString(),
          status: 'planned'
        },
        {
          id: 'shift-2',
          workplaceId: 'workplace-1',
          workplaceName: '스타벅스 강남점',
          startISO: new Date(Date.now() + 86400000 * 5).toISOString(),
          endISO: new Date(Date.now() + 86400000 * 5 + 16200000).toISOString(),
          status: 'planned'
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

  const handleAddShift = () => {
    // TODO: 일정 추가 모달 또는 페이지
    navigate(`/employer/schedule/${userId}/add`);
  };

  if (loading || !employee || !scheduleData) {
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
      <Header title={`${employee.name}님의 일정`} showBack />

      {/* Employee Info */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-mint-100 to-mint-200 
                       flex items-center justify-center">
            <span className="text-xl">👤</span>
          </div>
          <div className="flex-1">
            <h2 className="text-[18px] font-bold text-gray-900">
              {employee.name}
            </h2>
            <p className="text-[13px] text-gray-600">
              {employee.position} · {employee.nationality}
            </p>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-4 gap-2">
          <div className="bg-gray-50 rounded-xl p-2 text-center">
            <p className="text-[16px] font-bold text-gray-900">{scheduleData.summary.totalShifts}</p>
            <p className="text-[10px] text-gray-600">총 근무</p>
          </div>
          <div className="bg-emerald-50 rounded-xl p-2 text-center">
            <p className="text-[16px] font-bold text-emerald-700">{scheduleData.summary.completedShifts}</p>
            <p className="text-[10px] text-emerald-700">완료</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-2 text-center">
            <p className="text-[16px] font-bold text-amber-700">{scheduleData.summary.lateCount}</p>
            <p className="text-[10px] text-amber-700">지각</p>
          </div>
          <div className="bg-rose-50 rounded-xl p-2 text-center">
            <p className="text-[16px] font-bold text-rose-700">{scheduleData.summary.absentCount}</p>
            <p className="text-[10px] text-rose-700">결근</p>
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
          onDateClick={(date) => setSelectedDate(date)}
        />
      </div>

      {/* Upcoming Shifts */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[17px] font-bold text-gray-900">다가오는 근무</h3>
          <button
            onClick={handleAddShift}
            className="text-[14px] font-medium text-mint-600 hover:text-mint-700"
          >
            + 일정 추가
          </button>
        </div>

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

      {/* Floating Add Button */}
      <button
        onClick={handleAddShift}
        className="fixed bottom-24 right-4 w-14 h-14 bg-mint-600 hover:bg-mint-700 
                 rounded-full shadow-lg flex items-center justify-center transition-colors z-10"
      >
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
};

