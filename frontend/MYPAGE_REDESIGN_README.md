# 마이페이지 리디자인 - Workfair 스타일 프로필

## 개요

WorkFair 마이페이지가 Workfair 스타일의 프로필 페이지로 업그레이드되었습니다. 3D 플립 카드 애니메이션, 본인 인증 시스템, 상세 이력서 섹션이 추가되었으며, 기존 기능들은 모두 유지됩니다.

## 주요 기능

### 1. 3D 플립 카드 (TrustFlipCard)

프로필 상단의 큰 카드는 3D 플립 애니메이션을 제공합니다:

- **앞면 (Stats)**:

  - 프로필 사진 + 인증 배지
  - 이름 및 역할 (구직자/고용주)
  - 핵심 지표: 완료된 매칭 수, 후기 수, 가입 기간

- **뒷면 (Verification)**:
  - 그라디언트 배경 (핑크→보라)
  - 인증 완료 날짜
  - 본인 인증 안내 문구
  - 자세히 보기 링크

**인터랙션**:

- 카드 클릭/탭으로 앞뒤 전환
- 키보드 접근성 지원 (Enter/Space)
- 부드러운 3D 회전 애니메이션 (Framer Motion)

### 2. 본인 인증 시스템 (VerificationList)

사용자 신뢰도를 높이기 위한 다단계 인증 시스템:

- **본인 인증**: 정부 발급 신분증 확인
- **비자 인증**: 체류 자격 및 비자 유형 확인
- **연락처 인증**: 이메일 및 전화번호 확인
- **학력/경력 증빙**: 학력 및 경력 서류 확인
- **범죄경력 회보서**: 범죄 이력 확인 (선택 사항)

**상태 표시**:

- ✅ 완료 (초록색 배지)
- ⏳ 대기 (노란색 배지)
- ❌ 실패 (빨간색 배지)
- 📋 선택 (회색 배지)

### 3. 상세 이력서 (ResumeSection)

토글로 펼칠 수 있는 상세 프로필 정보:

#### 기본 정보

- 출생 연도
- 거주지 (국가, 도시)
- 국적
- 비자 유형 및 만료일

#### 언어 능력

- 언어 코드 + 숙련도 (A1-C2, Native)
- 숙련도별 배지 표시

#### 근무 희망사항

- 희망 직종 (태그)
- 보유 기술 (태그)
- 근무 가능 시간/요일

#### 자기소개

- 한 줄 소개
- 상세 소개

#### 개인 정보

- 취미·관심사
- 반려동물

#### 연락처

- 이메일
- 전화번호
- 카카오톡
- 왓츠앱

### 4. 기존 기능 유지

모든 기존 기능이 새로운 디자인에 통합되었습니다:

- ✅ 모드 선택 (구직자/고용주)
- ✅ 일정 관리
- ✅ 지원 내역
- ✅ 메시지
- ✅ 알림 설정
- ✅ 언어 설정
- ✅ 도움말

## 기술 스택

### 프론트엔드

- **React 18** + TypeScript
- **Framer Motion**: 3D 플립 애니메이션
- **TailwindCSS**: 스타일링
- **React Router**: 라우팅

### 새로운 컴포넌트

```
src/
├── types/
│   └── profile.ts              # 타입 정의
├── components/
│   ├── TrustFlipCard.tsx       # 3D 플립 카드
│   ├── VerificationList.tsx    # 인증 목록
│   └── ResumeSection.tsx       # 이력서 섹션
└── pages/
    └── mypage/
        └── MyPage.tsx          # 마이페이지 (업데이트)
```

## 설치

Framer Motion 패키지가 추가로 필요합니다:

```bash
npm install framer-motion
```

## 사용법

### 마이페이지 접속

하단 네비게이션의 "마이" 탭을 클릭하거나 `/mypage` 경로로 이동합니다.

### 3D 플립 카드

1. 상단의 프로필 카드를 클릭/탭합니다
2. 카드가 3D로 뒤집히며 인증 정보를 보여줍니다
3. 다시 클릭하면 통계 정보로 돌아갑니다
4. "자세히 보기"를 클릭하면 인증 목록이 펼쳐집니다

### 본인 인증

1. 플립 카드 뒷면의 "자세히 보기" 클릭
2. 인증 목록이 표시됩니다
3. 각 인증 항목의 상태를 확인할 수 있습니다
4. "다시 인증하기" 버튼으로 재인증 가능 (실패한 경우)

### 프로필 상세 보기

1. "프로필 상세 보기" 버튼을 클릭합니다
2. 이력서 섹션이 펼쳐집니다
3. 각 섹션의 "수정" 버튼으로 정보 수정 가능

## 데이터 구조

### Profile

```typescript
interface Profile {
  name: string;
  role: "jobseeker" | "employer";
  avatarUrl?: string;
  joinedAtISO: string;
  metrics: {
    matches: number; // 완료된 매칭 수
    reviews: number; // 후기 수
  };
}
```

### Verifications

```typescript
interface Verifications {
  idVerified: VerifyState;
  visaVerified: VerifyState;
  contactVerified: VerifyState;
  educationVerified: VerifyState;
  criminalRecordVerified: VerifyState;
  lastUpdatedISO: string;
}

type VerifyState = "verified" | "pending" | "failed" | "not_required";
```

### Resume

```typescript
interface Resume {
  birthYear?: number;
  country?: string;
  city?: string;
  nationality?: string;
  visaType?: string;
  visaExpiryISO?: string;
  languages: {
    code: string;
    level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "Native";
  }[];
  desiredRoles: string[];
  skills: string[];
  availability?: {
    days: string[];
    timeRange: string;
  };
  hobbies?: string[];
  pets?: string;
  introShort?: string;
  introLong?: string;
  contacts: {
    email?: string;
    phone?: string;
    whatsapp?: string;
    kakao?: string;
  };
}
```

## API 연동 (향후 구현)

현재는 Mock 데이터를 사용하고 있으며, 향후 다음 API와 연동 예정:

```typescript
// 프로필 정보
GET / api / me;
Response: Profile;

// 인증 상태
GET / api / me / verifications;
Response: Verifications;

// 이력서 정보
GET / api / me / resume;
Response: Resume;

// 이력서 수정
PUT / api / me / resume;
Body: Partial<Resume>;
```

## 디자인 토큰

### 색상

- **Primary**: `mint-600` (#10B981)
- **Gradient**: `from-fuchsia-500 to-rose-500`
- **Success**: `emerald-100/700`
- **Warning**: `amber-100/700`
- **Error**: `rose-100/700`

### 타이포그래피

- **Headline**: `text-[24px] font-bold`
- **Subheadline**: `text-[18px] font-bold`
- **Body**: `text-[15px] font-medium`
- **Caption**: `text-[13px]`

### 모서리

- **Large Card**: `rounded-[24px]`
- **Medium Card**: `rounded-[16px]`
- **Small Card**: `rounded-[12px]`
- **Chip**: `rounded-[8px]`

### 그림자

```css
shadow-[0_4px_24px_rgba(0,0,0,0.06)]
```

## 접근성

### 키보드 네비게이션

- ✅ 플립 카드: Enter/Space로 전환
- ✅ 모든 버튼: Tab으로 포커스 이동
- ✅ 포커스 링: 명확한 시각적 피드백

### 터치 타겟

- ✅ 최소 44x44px
- ✅ 충분한 간격

### 의미 전달

- ✅ 색상 + 아이콘 + 텍스트 조합
- ✅ 상태 배지에 명확한 라벨

## 성능 최적화

### 애니메이션

- Framer Motion의 하드웨어 가속 활용
- `transform` 속성만 사용 (reflow 방지)
- `will-change` 자동 적용

### 렌더링

- 조건부 렌더링으로 불필요한 DOM 최소화
- 토글 상태로 섹션 펼침/접기

## 향후 계획

- [ ] API 연동 (실제 데이터 로딩)
- [ ] 프로필 수정 모달/페이지
- [ ] 인증 플로우 구현
- [ ] 후기 목록 페이지
- [ ] 과거 매칭 이력 페이지
- [ ] 이미지 업로드 기능
- [ ] 반응형 최적화 (태블릿/데스크톱)

## 문제 해결

### 플립 애니메이션이 작동하지 않는 경우

1. Framer Motion이 설치되어 있는지 확인:

   ```bash
   npm install framer-motion
   ```

2. 브라우저 개발자 도구에서 에러 확인

3. `perspective` CSS 속성이 적용되어 있는지 확인

### 데이터가 표시되지 않는 경우

현재는 Mock 데이터를 사용하고 있습니다. `MyPage.tsx`의 `useState` 초기값을 확인하세요.

## 참고 자료

- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Airbnb Design](https://airbnb.design/)
- [TailwindCSS](https://tailwindcss.com/)

## 라이선스

MIT License
