import { TermsState } from '../types';

interface TermsStepProps {
  name: string;
  terms: TermsState;
  onToggle(key: keyof TermsState): void;
  onPrev(): void;
  onNext(): void;
  canProceed: boolean;
}

const TERMS_LIST: Array<{ key: keyof TermsState; label: string }> = [
  { key: 'all', label: '모든 약관에 동의합니다.' },
  { key: 'tosRequired', label: '(필수) 이용약관' },
  { key: 'privacyRequired', label: '(필수) 개인정보 수집·이용' },
  { key: 'smsOptional', label: '(선택) 혜택 안내 문자 서비스' },
  { key: 'marketingOptional', label: '(선택) 마케팅 정보 수신 동의' },
];

export function TermsStep({ name, terms, onToggle, onPrev, onNext, canProceed }: TermsStepProps) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-sm flex-col bg-white px-6 pb-10 pt-8">
      <header className="mb-6 flex items-center gap-2">
        <button type="button" onClick={onPrev} className="text-[26px] text-text-600 hover:text-text-900">
          ←
        </button>
        <span className="flex-1 text-center text-[19px] font-semibold text-text-900">
          구직자 가입
        </span>
      </header>

      <div className="space-y-6">
        <div>
          <p className="text-[22px] font-bold text-text-900">{name}님</p>
          <p className="text-[15px] text-text-600 mt-1">서비스 이용을 위한 약관에 동의해 주세요.</p>
        </div>

        <div className="divide-y divide-line-200 rounded-2xl border border-border">
          {TERMS_LIST.map(({ key, label }, index) => (
            <label
              key={key}
              className={`flex items-center gap-3 px-4 py-4 text-[15px] font-medium cursor-pointer ${
                index === 0 ? 'rounded-t-2xl' : ''
              } ${index === TERMS_LIST.length - 1 ? 'rounded-b-2xl' : ''}`}
            >
              <input
                type="checkbox"
                checked={terms[key]}
                onChange={() => onToggle(key)}
                className="h-5 w-5 rounded border-border text-primary-mint focus:ring-primary-mint/20"
              />
              <span className="text-text-900">{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-8">
        <button
          type="button"
          onClick={onNext}
          disabled={!canProceed}
          className={`h-12 w-full rounded-input text-[17px] font-semibold text-white transition ${
            canProceed ? 'bg-primary-mint hover:bg-mint-600' : 'bg-text-300 cursor-not-allowed'
          }`}
        >
          {canProceed ? '가입하기' : '필수 약관에 동의해주세요'}
        </button>
      </div>
    </div>
  );
}

