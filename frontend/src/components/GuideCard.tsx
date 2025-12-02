interface GuideCardProps {
  title: string;
  description?: string;
  image?: 'scam' | 'korean' | 'hiring' | 'insurance';
}

export const GuideCard = ({ title, image }: GuideCardProps) => {
  const content = {
    scam: {
      title: '구직자님!',
      subtitle: '최근 유행인 사기 수법 알아가세요',
      bgColor: 'bg-red-100',
      icon: (
        <svg className="w-12 h-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    },
    korean: {
      title: '꼭! 알아야 할',
      subtitle: '오늘의 생활 한국어 표현',
      bgColor: 'bg-blue-100',
      icon: (
        <svg className="w-12 h-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    hiring: {
      title: '채용 프로세스',
      subtitle: 'A to Z 알아보기',
      bgColor: 'bg-indigo-100',
      icon: (
        <svg className="w-12 h-12 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      )
    },
    insurance: {
      title: '4대 보험',
      subtitle: '필수 가입 정보 확인',
      bgColor: 'bg-green-100',
      icon: (
        <svg className="w-12 h-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
  };

  const cardContent = image ? content[image] : { title, subtitle: '', bgColor: 'bg-gray-100', icon: null };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md 
                  transition-all cursor-pointer w-full flex flex-col h-48">
      {/* Image Area */}
      <div className={`w-full h-2/3 flex items-center justify-center ${cardContent.bgColor}`}>
        {cardContent.icon}
      </div>

      {/* Text Area */}
      <div className="flex-1 flex flex-col justify-center items-center p-2 text-center">
        <h3 className="text-sm font-bold text-text-900 leading-tight">
          {cardContent.title}
        </h3>
        <p className="text-xs text-text-700 leading-snug">
          {cardContent.subtitle}
        </p>
      </div>
    </div>
  );
};
