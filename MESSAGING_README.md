# WorkFair 메시징 기능 가이드

## 🎯 개요

Airbnb 스타일의 메시징 시스템이 구현되었습니다. 주요 기능:

- ✅ 대화 목록 및 채팅 스레드
- ✅ 실시간 메시지 송수신
- ✅ 메시지별 번역 기능 (번역 보기/원문 보기 토글)
- ✅ 언어 자동 감지
- ✅ 번역 캐시
- ✅ 읽음 표시
- ✅ 낙관적 업데이트

## 📁 구조

### 프론트엔드 (React + TypeScript)

```
src/
├── types/
│   └── message.ts                 # 메시지 관련 타입 정의
├── components/
│   ├── MessageBubble.tsx          # 메시지 말풍선 (번역 토글 포함)
│   └── MessageInput.tsx           # 메시지 입력 컴포넌트
└── pages/
    └── messages/
        ├── MessageList.tsx        # 대화 목록
        └── Chat.tsx               # 채팅 스레드
```

### 백엔드 (FastAPI + SQLAlchemy)

```
backend/app/
├── models/
│   └── message.py                 # DB 모델 (Conversation, Message, Translation)
├── schemas/
│   └── message.py                 # Pydantic 스키마
├── services/
│   └── translation.py             # 번역 서비스 어댑터
└── routes/
    └── messages.py                # API 엔드포인트
```

## 🚀 실행 방법

### 1. 백엔드 설정

```bash
cd backend

# 가상환경 생성 및 활성화
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 의존성 설치
pip install fastapi uvicorn sqlalchemy langdetect httpx

# 번역 제공자 설정 (환경 변수)
export TRANSLATE_PROVIDER=mock  # 또는 gemini, gct, deepl
export GEMINI_API_KEY=your_api_key_here  # Gemini 사용 시

# 서버 실행
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 2. 프론트엔드 실행

```bash
cd frontend

# 의존성 설치 (이미 되어있으면 생략)
npm install

# 개발 서버 실행
npm run dev
```

## 📱 사용 방법

### 1. 채팅 시작

고용주 페이지에서:
1. 지원자 상세 정보 페이지로 이동
2. 하단 좌측의 "💬 채팅" 버튼 클릭
3. 채팅 화면이 열림

### 2. 메시지 번역

1. 상대방 메시지 우측 상단의 🌐 아이콘 클릭
2. "번역 중..." 표시 후 번역된 텍스트 표시
3. 다시 클릭하면 원문으로 되돌아감
4. 번역은 캐시되어 재요청 시 즉시 표시됨

### 3. 메시지 목록

- 하단 탭바에서 "메시지" 탭 선택 (또는 직접 `/messages` 이동)
- 검색 기능으로 대화 또는 이름 필터링
- 탭으로 카테고리 분류 (전체/채용/지원)

## 🔧 API 엔드포인트

### 대화 목록

```
GET /api/conversations/{user_id}
```

### 메시지 목록 (페이징)

```
GET /api/conversations/{conversation_id}/messages?cursor=&limit=50
```

### 메시지 전송

```
POST /api/messages
{
  "conversation_id": "conv-1",
  "sender_id": "user-1",
  "text": "안녕하세요"
}
```

### 메시지 번역

```
POST /api/translate
{
  "message_id": "msg-1",
  "text": "Hello, how are you?",
  "source_lang": "en",  // optional
  "target_lang": "ko"
}
```

### 읽음 처리

```
POST /api/messages/read
{
  "conversation_id": "conv-1",
  "user_id": "user-1",
  "last_read_message_id": "msg-5"
}
```

### WebSocket (실시간)

```
ws://localhost:8000/ws/conversations/{conversation_id}
```

## 🌐 번역 제공자 설정

### Mock (기본값)

개발 및 테스트용. API 키 불필요.

```bash
export TRANSLATE_PROVIDER=mock
```

### Google Gemini

무료 티어 제공, 속도 빠름.

```bash
export TRANSLATE_PROVIDER=gemini
export GEMINI_API_KEY=your_api_key_here
```

Gemini API 키 받기: https://makersuite.google.com/app/apikey

### Google Cloud Translation

정확도 높음, 비용 발생.

```bash
export TRANSLATE_PROVIDER=gct
export GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json
```

### DeepL

정확도 최고, 비용 발생.

```bash
export TRANSLATE_PROVIDER=deepl
export DEEPL_API_KEY=your_api_key_here
```

## 🎨 UI 특징

### Airbnb 스타일 디자인

- 둥근 말풍선 (내 메시지: 검은색, 상대: 회색)
- 날짜 구분선
- 프로필 이미지
- 읽음 상태 표시
- 타임스탬프

### 반응형

- 모바일 우선 (480px 최대 너비)
- 터치 최적화
- 키보드 대응 (Enter 전송, Shift+Enter 줄바꿈)

## 🔍 주요 기능 상세

### 1. 번역 토글

```typescript
// MessageBubble 컴포넌트
<button onClick={handleTranslateToggle}>
  {isTranslated ? '원문 보기' : '번역 보기'}
</button>
```

### 2. 언어 감지

```python
# 백엔드 (langdetect 사용)
detected_lang = detect(message.text)
```

### 3. 번역 캐시

```python
# TranslationCache 모델
class TranslationCache(Base):
    message_id: str
    target_lang: str
    translated_text: str
    provider: str
```

### 4. 낙관적 업데이트

```typescript
// 메시지 전송 시 즉시 UI에 표시
setMessages(prev => [...prev, newMessage]);
// 백엔드 응답 대기
await sendToBackend(newMessage);
```

## 🐛 트러블슈팅

### 번역이 작동하지 않음

1. 환경 변수 확인:
   ```bash
   echo $TRANSLATE_PROVIDER
   echo $GEMINI_API_KEY
   ```

2. 백엔드 로그 확인:
   ```
   Translation service initialized with [Provider]
   ```

### WebSocket 연결 실패

1. 포트 확인 (기본: 8000)
2. CORS 설정 확인
3. 백엔드 실행 확인

### 메시지가 전송되지 않음

1. 네트워크 탭에서 API 호출 확인
2. 백엔드 로그에서 에러 확인
3. CORS 에러 확인

## 📝 TODO

- [ ] WebSocket 실시간 메시지 수신 구현
- [ ] 이미지/파일 첨부 기능
- [ ] 음성 메시지
- [ ] 메시지 검색
- [ ] 대화 삭제/나가기
- [ ] 푸시 알림
- [ ] 메시지 반응 (이모지)
- [ ] 답장 기능

## 🤝 기여

버그 리포트나 기능 제안은 이슈로 등록해주세요.

## 📄 라이선스

MIT License

