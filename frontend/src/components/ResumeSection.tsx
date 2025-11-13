import type { Resume } from '@/types/profile';

interface ResumeSectionProps {
  resume: Resume;
  onEdit: () => void;
}

export const ResumeSection = ({ resume, onEdit }: ResumeSectionProps) => {
  const getLanguageLevelLabel = (level: string) => {
    const labels: Record<string, string> = {
      'A1': '초급 A1',
      'A2': '초급 A2',
      'B1': '중급 B1',
      'B2': '중급 B2',
      'C1': '고급 C1',
      'C2': '고급 C2',
      'Native': '원어민'
    };
    return labels[level] || level;
  };

  return (
    <div className="space-y-4">
      {/* Basic Info */}
      <div className="bg-white rounded-[16px] border border-line-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[17px] font-bold text-text-900">기본 정보</h3>
          <button
            onClick={onEdit}
            className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-[8px] 
                     text-[13px] font-medium text-text-900 transition-colors"
          >
            수정
          </button>
        </div>

        <div className="space-y-3">
          {resume.birthYear && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-mint-100 rounded-full flex items-center justify-center flex-shrink-0">
                🎂
              </div>
              <div className="flex-1">
                <p className="text-[13px] text-text-500">출생 연도</p>
                <p className="text-[15px] font-medium text-text-900">{resume.birthYear}년생</p>
              </div>
            </div>
          )}

          {(resume.country || resume.city) && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-mint-100 rounded-full flex items-center justify-center flex-shrink-0">
                📍
              </div>
              <div className="flex-1">
                <p className="text-[13px] text-text-500">거주지</p>
                <p className="text-[15px] font-medium text-text-900">
                  {resume.city && resume.country ? `${resume.city}, ${resume.country}` : resume.city || resume.country}
                </p>
              </div>
            </div>
          )}

          {resume.nationality && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-mint-100 rounded-full flex items-center justify-center flex-shrink-0">
                🌍
              </div>
              <div className="flex-1">
                <p className="text-[13px] text-text-500">국적</p>
                <p className="text-[15px] font-medium text-text-900">{resume.nationality}</p>
              </div>
            </div>
          )}

          {resume.visaType && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-mint-100 rounded-full flex items-center justify-center flex-shrink-0">
                📋
              </div>
              <div className="flex-1">
                <p className="text-[13px] text-text-500">비자 유형</p>
                <p className="text-[15px] font-medium text-text-900">
                  {resume.visaType}
                  {resume.visaExpiryISO && (
                    <span className="text-[13px] text-text-500 ml-1">
                      (만료: {new Date(resume.visaExpiryISO).toLocaleDateString('ko-KR')})
                    </span>
                  )}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Languages */}
      {resume.languages.length > 0 && (
        <div className="bg-white rounded-[16px] border border-line-200 p-5">
          <h3 className="text-[17px] font-bold text-text-900 mb-4">언어 능력</h3>
          <div className="space-y-3">
            {resume.languages.map((lang, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-[15px] text-text-900">{lang.code.toUpperCase()}</span>
                <span className="px-3 py-1 bg-mint-100 text-mint-700 rounded-[8px] text-[13px] font-medium">
                  {getLanguageLevelLabel(lang.level)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Work Preferences */}
      {(resume.desiredRoles.length > 0 || resume.skills.length > 0 || resume.availability) && (
        <div className="bg-white rounded-[16px] border border-line-200 p-5">
          <h3 className="text-[17px] font-bold text-text-900 mb-4">근무 희망사항</h3>
          
          {resume.desiredRoles.length > 0 && (
            <div className="mb-4">
              <p className="text-[13px] text-text-500 mb-2">희망 직종</p>
              <div className="flex flex-wrap gap-2">
                {resume.desiredRoles.map((role, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-text-900 rounded-[8px] text-[13px]"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          )}

          {resume.skills.length > 0 && (
            <div className="mb-4">
              <p className="text-[13px] text-text-500 mb-2">보유 기술</p>
              <div className="flex flex-wrap gap-2">
                {resume.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-mint-100 text-mint-700 rounded-[8px] text-[13px] font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {resume.availability && (
            <div>
              <p className="text-[13px] text-text-500 mb-2">근무 가능 시간</p>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-gray-100 text-text-900 rounded-[8px] text-[13px]">
                  {resume.availability.days.join(', ')}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-text-900 rounded-[8px] text-[13px]">
                  {resume.availability.timeRange}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Self Introduction */}
      {(resume.introShort || resume.introLong) && (
        <div className="bg-white rounded-[16px] border border-line-200 p-5">
          <h3 className="text-[17px] font-bold text-text-900 mb-3">자기소개</h3>
          {resume.introShort && (
            <p className="text-[15px] font-medium text-text-900 mb-3">
              {resume.introShort}
            </p>
          )}
          {resume.introLong && (
            <p className="text-[14px] text-text-700 leading-relaxed">
              {resume.introLong}
            </p>
          )}
        </div>
      )}

      {/* Personal Info */}
      {(resume.hobbies || resume.pets) && (
        <div className="bg-white rounded-[16px] border border-line-200 p-5">
          <h3 className="text-[17px] font-bold text-text-900 mb-4">개인 정보</h3>
          
          {resume.hobbies && resume.hobbies.length > 0 && (
            <div className="mb-4">
              <p className="text-[13px] text-text-500 mb-2">취미 · 관심사</p>
              <div className="flex flex-wrap gap-2">
                {resume.hobbies.map((hobby, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-text-900 rounded-[8px] text-[13px]"
                  >
                    {hobby}
                  </span>
                ))}
              </div>
            </div>
          )}

          {resume.pets && (
            <div>
              <p className="text-[13px] text-text-500 mb-2">반려동물</p>
              <p className="text-[15px] text-text-900">{resume.pets}</p>
            </div>
          )}
        </div>
      )}

      {/* Contact Info */}
      <div className="bg-white rounded-[16px] border border-line-200 p-5">
        <h3 className="text-[17px] font-bold text-text-900 mb-4">연락처</h3>
        <div className="space-y-3">
          {resume.contacts.email && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-mint-100 rounded-full flex items-center justify-center flex-shrink-0">
                📧
              </div>
              <div className="flex-1">
                <p className="text-[13px] text-text-500">이메일</p>
                <p className="text-[15px] text-text-900">{resume.contacts.email}</p>
              </div>
            </div>
          )}

          {resume.contacts.phone && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-mint-100 rounded-full flex items-center justify-center flex-shrink-0">
                📱
              </div>
              <div className="flex-1">
                <p className="text-[13px] text-text-500">전화번호</p>
                <p className="text-[15px] text-text-900">{resume.contacts.phone}</p>
              </div>
            </div>
          )}

          {resume.contacts.kakao && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-mint-100 rounded-full flex items-center justify-center flex-shrink-0">
                💬
              </div>
              <div className="flex-1">
                <p className="text-[13px] text-text-500">카카오톡</p>
                <p className="text-[15px] text-text-900">{resume.contacts.kakao}</p>
              </div>
            </div>
          )}

          {resume.contacts.whatsapp && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-mint-100 rounded-full flex items-center justify-center flex-shrink-0">
                📲
              </div>
              <div className="flex-1">
                <p className="text-[13px] text-text-500">왓츠앱</p>
                <p className="text-[15px] text-text-900">{resume.contacts.whatsapp}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

