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
    },
    korean: {
      title: '꼭! 알아야 할',
      subtitle: '오늘의 생활 한국어 표현',
      bgColor: 'bg-blue-100',
    },
    hiring: {
      title: '채용 프로세스',
      subtitle: 'A to Z 알아보기',
      bgColor: 'bg-indigo-100',
    },
    insurance: {
      title: '4대 보험',
      subtitle: '필수 가입 정보 확인',
      bgColor: 'bg-green-100',
    },
  };

  const cardContent = image ? content[image] : { title, subtitle: '', bgColor: 'bg-gray-100' };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md 
                  transition-all cursor-pointer w-full flex flex-col h-48">
      {/* Image Area */}
      <div className={`w-full h-2/3 ${cardContent.bgColor}`}>
        {/* Placeholder for an actual image */}
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
