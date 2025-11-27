import { useNavigate } from 'react-router-dom';
import { UserRole } from '../types';

interface RoleSelectStepProps {
  selectedRole: UserRole | null;
  onSelect(role: UserRole): void;
}

const ROLE_CARDS: Array<{ role: UserRole; title: string; description: string }> = [
  {
    role: 'job_seeker',
    title: '나는 구직자',
    description: '새로운 기회를 찾는 외국인 근로자를 위한 워크페어',
  },
  {
    role: 'employer',
    title: '나는 고용주',
    description: '전 세계 인재를 찾는 고용주를 위한 워크페어',
  },
];

export function RoleSelectStep({ selectedRole, onSelect }: RoleSelectStepProps) {
  const navigate = useNavigate();

  const handleRoleSelect = (role: UserRole) => {
    if (role === 'employer') {
      // 고용주 선택 시 별도 라우트로 이동
      navigate('/signup/employer');
    } else {
      // 구직자 선택 시 기존 로직 유지
      onSelect(role);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 py-8">
      <div className="w-full max-w-sm">
        <div className="mb-10 flex flex-col items-center text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-mint-100">
            <span className="text-3xl">⚡️</span>
          </div>
          <h1 className="text-[31px] font-bold text-primary-mint mb-2">WorkFair</h1>
          <p className="text-[17px] text-text-600">
            워크페어와 함께 일 찾기 여정을 시작해 보세요.
          </p>
        </div>
        <div className="space-y-3">
          {ROLE_CARDS.map(({ role, title, description }) => {
            const active = selectedRole === role;
            return (
              <button
                key={role}
                type="button"
                onClick={() => handleRoleSelect(role)}
                className={`w-full rounded-2xl border p-5 text-left transition ${
                  active 
                    ? 'border-primary-mint bg-mint-50 shadow-sm' 
                    : 'border-border bg-white hover:border-primary-mint/30'
                }`}
              >
                <p className="text-[18px] font-semibold text-text-900">{title}</p>
                <p className="mt-1 text-[15px] text-text-600">{description}</p>
              </button>
            );
          })}
        </div>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-[15px] text-text-600">
            이미 계정이 있으신가요?{' '}
            <button
              onClick={() => navigate('/auth/signin')}
              className="text-mint-600 font-semibold hover:text-mint-700 underline"
            >
              로그인
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

