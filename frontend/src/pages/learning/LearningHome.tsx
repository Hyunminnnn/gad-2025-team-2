import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Lesson {
  id: string;
  title: string;
  level: string;
  completed: boolean;
  progress: number;
}

export const LearningHome = () => {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState('all');

  const currentLevel = 'Lv.4 상급';
  const currentProgress = 65;

  const lessons: Lesson[] = [
    { id: '1', title: '한국어 문법 1', level: 'Lv.1 기초', completed: true, progress: 100 },
    { id: '2', title: '한국어 어휘 확장', level: 'Lv.2 초급', completed: true, progress: 100 },
    { id: '3', title: '일상 대화 연습', level: 'Lv.3 중급', completed: false, progress: 80 },
    { id: '4', title: '비즈니스 한국어', level: 'Lv.4 상급', completed: false, progress: 65 },
    { id: '5', title: '고급 문법', level: 'Lv.4 상급', completed: false, progress: 0 },
  ];

  const levels = ['all', 'Lv.1 기초', 'Lv.2 초급', 'Lv.3 중급', 'Lv.4 상급'];

  const filteredLessons = selectedLevel === 'all' 
    ? lessons 
    : lessons.filter(lesson => lesson.level === selectedLevel);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-white border-b border-line-200 px-4 py-4 sticky top-0 z-10">
        <h1 className="text-[20px] font-bold text-text-900">학습</h1>
      </header>

      <div className="p-4">
        {/* Current Learning Status */}
        <div className="bg-gradient-to-br from-mint-600 to-mint-500 rounded-[20px] p-5 mb-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[13px] opacity-90 mb-1">현재 학습 레벨</p>
              <h2 className="text-[24px] font-bold">{currentLevel}</h2>
            </div>
            <div className="text-right">
              <p className="text-[32px] font-bold">{currentProgress}%</p>
              <p className="text-[12px] opacity-90">완료</p>
            </div>
          </div>
          
          <div className="relative w-full h-3 bg-white/30 rounded-full overflow-hidden mb-4">
            <div 
              className="absolute left-0 top-0 h-full bg-white rounded-full transition-all"
              style={{ width: `${currentProgress}%` }}
            />
          </div>

          <button
            onClick={() => navigate('/learning/level-test')}
            className="w-full h-[44px] bg-white text-mint-600 rounded-[12px] font-semibold
                     hover:bg-white/90 transition-colors"
          >
            📝 레벨 테스트 시작하기
          </button>
        </div>

        {/* Level Filter */}
        <div className="mb-4">
          <p className="text-[14px] font-semibold text-text-900 mb-3">레벨별 강의</p>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
            {levels.map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-[13px] font-medium transition-colors ${
                  selectedLevel === level
                    ? 'bg-mint-600 text-white'
                    : 'bg-white text-text-700 border border-line-200 hover:border-mint-600'
                }`}
              >
                {level === 'all' ? '전체' : level}
              </button>
            ))}
          </div>
        </div>

        {/* Lesson List */}
        <div className="space-y-3">
          {filteredLessons.map((lesson) => (
            <div
              key={lesson.id}
              onClick={() => navigate(`/learning/lesson/${lesson.id}`)}
              className="bg-white rounded-[16px] p-4 shadow-card hover:shadow-soft 
                       transition-all cursor-pointer border border-line-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-[10px] py-[4px] bg-mint-100 text-mint-600 
                                 rounded-[8px] text-[12px] font-medium">
                      {lesson.level}
                    </span>
                    {lesson.completed && (
                      <span className="text-[20px]">✅</span>
                    )}
                  </div>
                  <h3 className="text-[16px] font-semibold text-text-900 mb-1">
                    {lesson.title}
                  </h3>
                </div>
                <svg className="w-6 h-6 text-text-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>

              {/* Progress Bar */}
              <div className="mb-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[12px] text-text-700">진도율</span>
                  <span className="text-[12px] font-semibold text-mint-600">{lesson.progress}%</span>
                </div>
                <div className="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="absolute left-0 top-0 h-full bg-mint-600 rounded-full transition-all"
                    style={{ width: `${lesson.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredLessons.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-500 text-[15px]">해당 레벨의 강의가 없습니다</p>
          </div>
        )}
      </div>
    </div>
  );
};

