import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';

export const ApplyDone = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="지원 완료" />
      
      <div className="flex flex-col items-center justify-center px-6 pt-24">
        {/* Success Icon */}
        <div className="w-32 h-32 mb-8 flex items-center justify-center">
          <svg className="w-full h-full text-mint-600" viewBox="0 0 120 120" fill="none">
            <circle 
              cx="60" 
              cy="60" 
              r="54" 
              stroke="currentColor" 
              strokeWidth="4" 
              fill="none"
              strokeDasharray="339.292"
              strokeDashoffset="0"
              className="animate-draw-circle"
            />
            <path 
              d="M35 60 L52 77 L85 44" 
              stroke="currentColor" 
              strokeWidth="8" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              fill="none"
              strokeDasharray="100"
              strokeDashoffset="0"
              className="animate-draw-check"
            />
          </svg>
        </div>

        {/* Message */}
        <h2 className="text-[24px] font-bold text-text-900 mb-3">지원 완료!</h2>
        <p className="text-[16px] text-text-700 text-center leading-relaxed mb-12">
          좋은 결과가 있기를 바라겠습니다.
        </p>

        {/* Action Buttons */}
        <div className="flex gap-3 w-full max-w-sm">
          <button
            onClick={() => navigate('/jobseeker/home')}
            className="flex-1 h-[52px] bg-mint-600 text-white rounded-[14px] text-[15px] 
                     font-semibold hover:bg-mint-700 transition-colors"
          >
            지원 현황 확인하기
          </button>
          <button
            onClick={() => navigate('/jobs')}
            className="flex-1 h-[52px] bg-mint-600 text-white rounded-[14px] text-[15px] 
                     font-semibold hover:bg-mint-700 transition-colors"
          >
            다른 공고 더 보기
          </button>
        </div>
      </div>

      <style>{`
        @keyframes draw-circle {
          from {
            stroke-dashoffset: 339.292;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        
        @keyframes draw-check {
          from {
            stroke-dashoffset: 100;
          }
          to {
            stroke-dashoffset: 0;
          }
        }

        .animate-draw-circle {
          animation: draw-circle 0.6s ease-out forwards;
        }

        .animate-draw-check {
          animation: draw-check 0.4s ease-out 0.4s forwards;
        }
      `}</style>
    </div>
  );
};

