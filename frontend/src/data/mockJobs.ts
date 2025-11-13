import type { Job } from '@/types';

// 공유 Mock 공고 데이터
export const mockJobs: Job[] = [
  {
    id: 'job-1',
    title: '카페 파트타이머 구인',
    employer: {
      id: 'employer-1',
      shopName: '왕십리 스타벅스',
      industry: '카페',
      address: '서울 성동구 왕십리로 123',
      phone: '02-1234-5678',
      rating: 4.8,
    },
    wage: 12000,
    workDays: ['월', '화', '수', '목', '금'],
    workHours: '09:00-17:00',
    location: '서울 성동구',
    requiredLanguage: 'Lv.3 중급',
    requiredVisa: ['C-4'],
    positions: 2,
    deadline: '2025-12-31',
    description: '친절하고 성실한 분을 찾습니다',
    employerMessage: '저희 매장은 깨끗하고 쾌적한 환경입니다.',
    postedAt: '2025-01-05',
    status: 'active',
    views: 145,
    applications: 8,
  },
  {
    id: 'job-2',
    title: '주방 보조 아르바이트',
    employer: {
      id: 'employer-2',
      shopName: '강남역 ○○식당',
      industry: '음식점',
      address: '서울 강남구 테헤란로 234',
      phone: '02-2345-6789',
      rating: 4.5,
    },
    wage: 13000,
    workDays: ['토', '일'],
    workHours: '11:00-20:00',
    location: '서울 강남구',
    requiredLanguage: 'Lv.2 초급',
    requiredVisa: ['C-4'],
    positions: 1,
    deadline: '2025-11-20',
    description: '주방 보조 업무를 담당하실 분',
    employerMessage: '주말만 근무 가능하신 분 환영합니다.',
    postedAt: '2025-01-03',
    status: 'active',
    views: 230,
    applications: 12,
  },
  {
    id: 'job-3',
    title: '편의점 야간 알바',
    employer: {
      id: 'employer-3',
      shopName: '홍대 GS25',
      industry: '편의점',
      address: '서울 마포구 홍대입구역 5번 출구',
      phone: '02-3456-7890',
      rating: 4.3,
    },
    wage: 11500,
    workDays: ['월', '수', '금'],
    workHours: '22:00-06:00',
    location: '서울 마포구',
    requiredLanguage: 'Lv.1 기초',
    requiredVisa: ['C-4', 'F-4'],
    positions: 1,
    deadline: '2025-11-15',
    description: '야간 근무 가능하신 분',
    employerMessage: '야간 수당 별도 지급합니다.',
    postedAt: '2024-12-28',
    status: 'active',
    views: 98,
    applications: 5,
  },
  {
    id: 'job-4',
    title: '이태원 농담 - 서빙 스태프',
    employer: {
      id: 'employer-4',
      shopName: '이태원 농담',
      industry: '파스타 전문 가게',
      address: '서울 용산구 녹사평대로32길 3 2층',
      phone: '02-4567-8901',
      rating: 4.6,
    },
    wage: 11000,
    workDays: ['주 2일', '6시간'],
    workHours: '시간, 요일 협의',
    location: '서울 용산구',
    requiredLanguage: 'Lv.3 중급',
    requiredVisa: ['C-4'],
    positions: 2,
    deadline: '2025-11-12',
    description: '홀 서빙 파트타이머',
    employerMessage: '저희 가게는 깨끗하고 친절한 분위기로 손님들께 사랑받고 있습니다! 성실하고 책임감 있는 분을 찾고 있습니다.',
    postedAt: '2024-12-20',
    status: 'active',
    views: 320,
    applications: 15,
  },
  {
    id: 'job-5',
    title: '베이커리 판매 직원',
    employer: {
      id: 'employer-5',
      shopName: '신촌 파리바게뜨',
      industry: '베이커리',
      address: '서울 서대문구 신촌역로 45',
      phone: '02-5678-9012',
      rating: 4.7,
    },
    wage: 12500,
    workDays: ['평일'],
    workHours: '08:00-13:00',
    location: '서울 서대문구',
    requiredLanguage: 'Lv.2 초급',
    requiredVisa: ['C-4'],
    positions: 1,
    deadline: '2025-11-25',
    description: '베이커리 판매 및 포장 업무',
    employerMessage: '빵 좋아하시는 분 환영합니다!',
    postedAt: '2025-01-08',
    status: 'active',
    views: 180,
    applications: 10,
  },
];

// 상태별 필터링 함수
export const getJobsByStatus = (status: 'active' | 'paused' | 'closed') => {
  return mockJobs.filter(job => job.status === status);
};

// ID로 공고 찾기
export const getJobById = (id: string) => {
  return mockJobs.find(job => job.id === id);
};

// 최신순 정렬
export const getRecentJobs = (limit?: number) => {
  const sorted = [...mockJobs].sort((a, b) => 
    new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
  );
  return limit ? sorted.slice(0, limit) : sorted;
};

