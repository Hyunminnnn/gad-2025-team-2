import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Header } from '@/components/Header';
import { Tag } from '@/components/Tag';
import { Badge } from '@/components/Badge';
import { BottomCTA, CTAButton } from '@/components/BottomCTA';
import type { JobSeeker } from '@/types';

export const ApplicantDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [applicant, setApplicant] = useState<JobSeeker | null>(null);
  const [hiring, setHiring] = useState(false);

  useEffect(() => {
    // Mock data
    const mockApplicant: JobSeeker = {
      id: id || 'seeker-1',
      name: '소피아',
      nationality: '우즈베키스탄',
      phone: '010-1234-5678',
      languageLevel: 'L1-2',
      visaType: 'C - 4',
      availability: '주말',
      experience: JSON.stringify([{ role: '레스토랑', years: 2, tags: [] }]),
      preferences: JSON.stringify({}),
    };
    setApplicant(mockApplicant);
  }, [id]);

  const handleHire = async () => {
    if (!id) return;
    
    try {
      setHiring(true);
      // In real app: await applicationsAPI.update(applicationId, 'hired')
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success('채용이 확정되었습니다!');
      navigate('/employer/hire-done');
    } catch (error) {
      toast.error('채용 처리 중 오류가 발생했습니다');
    } finally {
      setHiring(false);
    }
  };

  const handleStartChat = () => {
    // 실제로는 conversation을 생성하거나 기존 conversation을 찾아서 이동
    // 임시로 conv-1로 이동 (Mock)
    const conversationId = `conv-${id}`;
    navigate(`/messages/${conversationId}`);
  };

  if (!applicant) return null;

  return (
    <div className="min-h-screen bg-white pb-24">
      <Header showBack title="지원자 상세 정보" />

      <div className="p-4">
        {/* Profile Card */}
        <div className="bg-white border-2 border-primary-mint rounded-card p-4 mb-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl">
              👤
            </div>
            <div>
              <h1 className="text-[20px] font-bold text-text-primary">{applicant.name}, 28세</h1>
              <div className="flex items-center gap-1 text-[14px] text-text-secondary">
                <span>🇺🇿</span>
                <span>{applicant.nationality}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 mb-3">
            <p className="text-[14px] text-text-primary">
              언어 능력: {applicant.languageLevel} (일상 소통 가능)
            </p>
            <p className="text-[14px] text-text-primary">
              비자: {applicant.visaType}
            </p>
            <p className="text-[14px] text-primary-mint font-medium">
              경력: 레스토랑 2년 근무
            </p>
          </div>

          <div className="flex gap-2 flex-wrap">
            <Tag variant="mint" size="sm">영어 가능</Tag>
            <Tag variant="outline-mint" size="sm">스페인어 가능</Tag>
            <Tag variant="outline-mint" size="sm">용산구 거주</Tag>
            <Tag variant="outline-mint" size="sm">주말 근무 가능</Tag>
          </div>

          <button className="absolute top-4 right-4 w-10 h-10 bg-primary-mint rounded-full flex items-center justify-center text-white">
            🔖
          </button>
        </div>

        {/* Self Introduction */}
        <div className="mb-5">
          <h2 className="text-[17px] font-bold text-text-primary mb-3">자기소개</h2>
          <div className="bg-mint-50 rounded-xl p-4">
            <p className="text-[14px] text-text-primary leading-relaxed mb-3">
              안녕하세요, 저는 소피아입니다. 한국 문화와 K-pop을 좋아해서 우즈베키스탄에서 
              부터 한국어를 열심히 공부했습니다.
            </p>
            <p className="text-[14px] text-text-primary leading-relaxed mb-3">
              이전 레스토랑에서 서빙 아르바이트를 하며 손님들을 응대했고 주문을 받는 경험을 쌓았습니다.
            </p>
            <p className="text-[14px] text-text-primary leading-relaxed mb-3">
              밝고 긍정적인 성격이라 처음 보는 사람들과도 잘 어울리고 말문 열은 적극감을 갖고 
              꾸준하게 지키려는 편입니다.
            </p>
            <p className="text-[14px] text-text-primary leading-relaxed">
              빨리 일을 배워서 매장에 도움이 되는 성실한 직원이 되겠습니다. 잘 부탁드립니다!
            </p>
          </div>
        </div>

        {/* Language Skills */}
        <div className="mb-5">
          <h2 className="text-[17px] font-bold text-text-primary mb-3">언어능력</h2>
          <div className="space-y-2">
            <LanguageRow language="한국어" level="L1-2" />
            <LanguageRow language="영어" level="IELTS 9.0" />
            <LanguageRow language="스페인어" level="DELE A1" />
          </div>
        </div>

        {/* Work Availability */}
        <div className="mb-5">
          <h2 className="text-[17px] font-bold text-text-primary mb-3">근무 가능 시간</h2>
          <p className="text-[14px] text-text-primary">
            주말 가능, 평일 오후 시간대 모두 가능
          </p>
        </div>
      </div>

      {/* Bottom CTA */}
      <BottomCTA>
        <div className="flex gap-2">
          <CTAButton variant="outline" onClick={handleStartChat}>
            <span className="text-xl">💬</span>
            채팅
          </CTAButton>
          <CTAButton variant="outline" onClick={() => {}}>
            <span className="text-xl">📞</span>
            전화
          </CTAButton>
          <CTAButton
            variant="primary"
            fullWidth
            onClick={handleHire}
            disabled={hiring}
          >
            면접 제안하기
          </CTAButton>
        </div>
      </BottomCTA>
    </div>
  );
};

const LanguageRow = ({ language, level }: { language: string; level: string }) => {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
      <span className="text-[14px] text-text-primary">{language}</span>
      <Badge variant="mint">{level}</Badge>
    </div>
  );
};



