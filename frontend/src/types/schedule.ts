export interface DayStat {
  dateISO: string;
  summaryMinutes?: number; // 270 = 4시간 30분
  deltaMinutes?: number; // +15 (지각) / -30 (조퇴)
  status?: 'completed' | 'absent' | 'planned' | 'rest';
  shifts?: Shift[];
}

export interface Shift {
  id: string;
  workplaceId: string;
  workplaceName: string;
  startISO: string;
  endISO: string;
  status: 'planned' | 'completed' | 'absent' | 'late' | 'working';
  actualStartISO?: string;
  actualEndISO?: string;
  workedMinutes?: number;
  notes?: string;
}

export interface Employee {
  id: string;
  name: string;
  profileImageUrl?: string;
  nationality?: string;
  position?: string;
  totalShifts: number;
  completedShifts: number;
  upcomingShifts: number;
}

export interface MonthSummary {
  totalMinutes: number;
  totalShifts: number;
  completedShifts: number;
  lateCount: number;
  absentCount: number;
  averageMinutesPerShift: number;
}

export interface ScheduleMonth {
  year: number;
  month: number;
  days: DayStat[];
  summary: MonthSummary;
}

