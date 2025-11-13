import type { Verifications, VerifyState } from '@/types/profile';

interface VerificationListProps {
  verifications: Verifications;
  onVerifyClick: (type: string) => void;
}

interface VerificationItem {
  id: string;
  label: string;
  description: string;
  state: VerifyState;
  icon: JSX.Element;
}

const getStateBadge = (state: VerifyState) => {
  switch (state) {
    case 'verified':
      return {
        bg: 'bg-emerald-100',
        text: 'text-emerald-700',
        label: '완료'
      };
    case 'pending':
      return {
        bg: 'bg-amber-100',
        text: 'text-amber-700',
        label: '대기'
      };
    case 'failed':
      return {
        bg: 'bg-rose-100',
        text: 'text-rose-700',
        label: '실패'
      };
    case 'not_required':
      return {
        bg: 'bg-gray-100',
        text: 'text-gray-500',
        label: '선택'
      };
  }
};

export const VerificationList = ({ verifications, onVerifyClick }: VerificationListProps) => {
  const items: VerificationItem[] = [
    {
      id: 'id',
      label: '본인 인증',
      description: '정부 발급 신분증으로 본인 확인',
      state: verifications.idVerified,
      icon: (
        <svg className="w-5 h-5 text-mint-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
        </svg>
      )
    },
    {
      id: 'visa',
      label: '비자 인증',
      description: '체류 자격 및 비자 유형 확인',
      state: verifications.visaVerified,
      icon: (
        <svg className="w-5 h-5 text-mint-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      )
    },
    {
      id: 'contact',
      label: '연락처 인증',
      description: '이메일 및 전화번호 확인',
      state: verifications.contactVerified,
      icon: (
        <svg className="w-5 h-5 text-mint-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'education',
      label: '학력/경력 증빙',
      description: '학력 및 경력 서류 확인',
      state: verifications.educationVerified,
      icon: (
        <svg className="w-5 h-5 text-mint-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      id: 'criminal',
      label: '범죄경력 회보서',
      description: '범죄 이력 확인 (선택 사항)',
      state: verifications.criminalRecordVerified,
      icon: (
        <svg className="w-5 h-5 text-mint-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    }
  ];

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const badge = getStateBadge(item.state);
        return (
          <div
            key={item.id}
            className="bg-white rounded-[16px] p-4 border border-line-200 
                     hover:border-mint-600/30 transition-all"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-mint-100 rounded-full flex items-center justify-center flex-shrink-0">
                {item.icon}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-[15px] font-semibold text-text-900">
                    {item.label}
                  </h3>
                  <span className={`px-2 py-0.5 rounded-[6px] text-[11px] font-medium ${badge.bg} ${badge.text}`}>
                    {badge.label}
                  </span>
                </div>
                <p className="text-[13px] text-text-500 mb-2">
                  {item.description}
                </p>
                
                {item.state !== 'verified' && item.state !== 'not_required' && (
                  <button
                    onClick={() => onVerifyClick(item.id)}
                    className="text-[13px] font-medium text-mint-600 hover:text-mint-700 transition-colors"
                  >
                    {item.state === 'pending' ? '진행 중' : '다시 인증하기'}
                  </button>
                )}
              </div>

              {item.state === 'verified' && (
                <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Info Box */}
      <div className="bg-amber-50 border border-amber-200 rounded-[12px] p-3">
        <p className="text-[12px] text-amber-900 leading-relaxed">
          ℹ️ Workfair의 본인 인증 절차는 상대방의 신원을 완전히 보장하지는 않습니다. 
          자세한 내용은 도움말 센터를 참조하세요.
        </p>
      </div>
    </div>
  );
};

