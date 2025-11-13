import { useNavigate } from 'react-router-dom';
import { CTAButton } from '@/components/BottomCTA';

export const HireDone = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="text-center">
        <div className="w-24 h-24 bg-mint-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-16 h-16 text-primary-mint" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h2 className="text-[24px] font-bold text-text-primary mb-2">
          해당 지원자의 채용이 확정되었습니다! 🎉
        </h2>
        <p className="text-[15px] text-text-secondary mb-2">
          확정 출근일: 2025. 11. 10
        </p>
        
        <div className="flex flex-col gap-2 w-full max-w-sm mt-8">
          <CTAButton variant="primary" fullWidth onClick={() => navigate('/employer/home')}>
            홈으로 가기
          </CTAButton>
          <CTAButton variant="outline" fullWidth onClick={() => navigate('/messages')}>
            메시지 보내기
          </CTAButton>
        </div>
      </div>
    </div>
  );
};



