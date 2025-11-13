# WorkFair Architecture Documentation

## System Overview

WorkFair is a mobile-first job marketplace platform built with a modern tech stack. The application follows a client-server architecture with React frontend and FastAPI backend.

```
┌─────────────────────────────────────────────────┐
│                   Frontend                       │
│  React 18 + TypeScript + Vite + TailwindCSS    │
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│  │  Pages   │  │Components│  │  Stores  │     │
│  └──────────┘  └──────────┘  └──────────┘     │
│                                                  │
│  ┌──────────────────────────────────┐          │
│  │      API Client (Axios)          │          │
│  └──────────────────────────────────┘          │
└───────────────────┬──────────────────────────────┘
                    │ HTTP / WebSocket
                    │
┌───────────────────▼──────────────────────────────┐
│                   Backend                         │
│           FastAPI + SQLModel + SQLite            │
│                                                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │ Routers  │  │  Models  │  │   WS     │      │
│  └──────────┘  └──────────┘  └──────────┘      │
│                                                   │
│  ┌──────────────────────────────────┐           │
│  │        Database (SQLite)         │           │
│  └──────────────────────────────────┘           │
└──────────────────────────────────────────────────┘
```

## Frontend Architecture

### Component Hierarchy (Atomic Design)

```
Atoms (Basic building blocks)
├── Tag (chips/badges with variants)
├── Badge (status indicators)
├── SearchBar (input with icon)
├── Empty (empty state display)
└── Skeleton (loading placeholders)

Molecules (Simple combinations)
├── FilterChips (horizontal scrollable tags)
├── Section (title + content wrapper)
├── Header (navigation header)
├── BottomNav (mobile tab bar)
├── BottomCTA (fixed action bar)
└── ChatBubble (message bubble with translation)

Organisms (Complex components)
├── JobCard (job listing card)
├── StatCard (application statistics)
├── ProgressCard (learning progress)
├── QuickMenuGrid (2x2 menu grid)
└── GuideCard (guide/tip card)

Pages (Full screens)
├── JobSeekerHome (main dashboard)
├── JobDetail (job details)
├── TalentFilter (multi-filter UI)
├── ApplyDone (success confirmation)
├── MessageList (conversations)
└── Chat (real-time messaging)
```

### State Management

**Zustand Stores:**

1. **useAuthStore** - Authentication state
   - User profile
   - JWT token
   - Login/logout actions

2. **useWorkflowStore** - Application workflows
   - Selected job
   - Application in progress
   - Hiring flow state
   - Learning flow state

**State Persistence:**
- Auth state persists to localStorage
- Workflow state is session-only

### Routing Structure

```
/                           → Redirect to /jobseeker/home
/auth/signin               → Sign in page
/jobseeker/home            → Main dashboard
/job/:id                   → Job detail page
/jobseeker/apply-done      → Application success
/filters/talent            → Filter settings
/messages                  → Message list
/messages/:id              → Chat view
/jobs                      → Job search
/learning                  → Learning hub
/network                   → Networking
/mypage                    → User profile
```

### Data Flow

```
Component
    ↓ (user action)
API Client (endpoints.ts)
    ↓ (HTTP request)
Backend API
    ↓ (response)
Store (if needed)
    ↓ (state update)
Component re-renders
```

### Internationalization (i18n)

- **Library:** i18next + react-i18next
- **Languages:** Korean (ko), English (en)
- **Default:** Korean
- **Keys:** All UI text uses translation keys (e.g., `t('home.title')`)
- **Location:** `src/utils/i18n.ts`

## Backend Architecture

### API Layer Structure

```
FastAPI App (main.py)
    │
    ├── Routers (modular endpoints)
    │   ├── /auth          → Authentication
    │   ├── /jobs          → Job listings
    │   ├── /applications  → Applications
    │   ├── /users         → User profiles
    │   ├── /conversations → Chat conversations
    │   ├── /messages      → Messages
    │   ├── /translate     → Translation
    │   └── /learning      → Learning progress
    │
    ├── Middleware
    │   └── CORS (allow frontend origin)
    │
    ├── WebSocket (/ws/conversations/{id})
    │
    └── Database (SQLModel + SQLite)
```

### Database Schema

**Core Tables:**

```sql
users
├── id (PK)
├── email (unique)
├── hashedPassword
├── role (jobseeker | employer)
└── profileId (FK)

jobseekers
├── id (PK)
├── name
├── nationality
├── phone
├── languageLevel
├── visaType
├── availability
├── location (JSON)
├── experience (JSON array)
└── preferences (JSON)

employers
├── id (PK)
├── businessNo
├── shopName
├── industry
├── address
├── location (JSON)
├── openHours
├── contact
├── media (JSON array)
├── minLanguageLevel
├── needVisa (JSON array)
├── baseWage
└── rating

jobs
├── id (PK)
├── employerId (FK)
├── title
├── description
├── category
├── wage
├── workDays
├── workHours
├── deadline
├── positions
├── requiredLanguage
├── requiredVisa (JSON array)
├── benefits
├── employerMessage
└── createdAt

applications
├── applicationId (PK)
├── seekerId (FK)
├── jobId (FK)
├── status (applied|hired|rejected)
├── appliedAt
├── updatedAt
└── hiredAt
└── UNIQUE(seekerId, jobId)

conversations
├── id (PK)
├── participants (JSON array)
└── updatedAt

messages
├── id (PK)
├── conversationId (FK)
├── senderId
├── text
├── translatedText
├── timestamp
└── read

learning_progress
├── id (PK)
├── seekerId (FK)
├── currentLevel
├── completedLessons
├── totalLessons
└── progressPercent
```

### API Endpoints

**Authentication:**
- `POST /auth/signin` - Login
- `POST /auth/signup` - Register

**Jobs:**
- `GET /jobs` - List with filters (query, location, industry, etc.)
- `GET /jobs/{id}` - Get single job with employer details

**Applications:**
- `POST /applications` - Apply (409 if duplicate)
- `GET /applications` - List (filter by seekerId/jobId)
- `PATCH /applications/{id}` - Update status

**Users:**
- `GET /jobseekers/{id}` - Get jobseeker profile
- `GET /employers/{id}` - Get employer profile

**Messaging:**
- `GET /conversations/{userId}` - List user's conversations
- `GET /conversations/{id}/messages` - Get messages (paginated)
- `POST /messages` - Send message
- `POST /messages/read` - Mark as read
- `WS /ws/conversations/{id}` - WebSocket for real-time

**Translation:**
- `POST /translate` - Translate text (mock or Gemini)

**Learning:**
- `GET /learning/summary?seekerId=` - Get progress
- `POST /leveltest` - Submit test

### Authentication Flow

```
1. User submits credentials
   POST /auth/signin { email, password }
   
2. Backend validates
   - Check user exists
   - Verify password (bcrypt)
   
3. Generate JWT token
   - Payload: { sub: userId, role }
   - Expires: 7 days
   
4. Return token + user data
   { user: {...}, token: "eyJ..." }
   
5. Frontend stores token
   - localStorage (persisted)
   - Axios interceptor adds to headers
   
6. Subsequent requests
   Authorization: Bearer {token}
```

### WebSocket Implementation

**Connection Manager Pattern:**

```python
class ConnectionManager:
    active_connections: Dict[str, List[WebSocket]]
    
    async def connect(ws, conversation_id)
    async def disconnect(ws, conversation_id)
    async def broadcast(message, conversation_id)
```

**Client Connection:**
```javascript
const ws = new WebSocket('ws://localhost:8000/ws/conversations/conv-123');

ws.onopen = () => {
  // Send messages
  ws.send(JSON.stringify({ text: 'Hello' }));
};

ws.onmessage = (event) => {
  // Receive real-time updates
  const msg = JSON.parse(event.data);
};
```

## Design System

### Color Tokens

```typescript
colors: {
  primaryMint: '#34D3B4',   // Main brand color
  mintSoft:    '#E9FBF6',   // Light backgrounds
  textPrimary: '#1E1E1E',   // Main text
  textSecondary: '#667085', // Secondary text
  borderSoft:  '#E6F3EE',   // Card borders
  danger:      '#FF6B6B',   // Error/warning
  badgeGray:   '#F2F4F7',   // Badge backgrounds
}
```

### Spacing Scale

```typescript
spacing: {
  xxs: 4px,   // Tight spacing
  xs:  8px,   // Small gaps
  sm:  12px,  // Standard gap
  md:  16px,  // Card padding
  lg:  20px,  // Section spacing
  xl:  24px,  // Large sections
}
```

### Border Radius

```typescript
radius: {
  card:   16px,  // Cards
  chip:   20px,  // Pills/tags
  tab:    12px,  // Tabs
  button: 12px,  // Buttons
  input:  12px,  // Form inputs
}
```

### Typography

- **Weights:** 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **Sizes:** 12px-24px scale
- **Font:** System font stack (-apple-system, BlinkMacSystemFont, etc.)

## Responsive Design Strategy

### Breakpoints

- **Mobile:** 375px (base, pixel-perfect match)
- **Tablet:** 480-1024px (scaled, single column)
- **Desktop:** 1024px+ (centered 360-420px content)

### Mobile-First CSS

```css
/* Base styles for 375px */
.component { ... }

/* Tablet adjustments */
@media (min-width: 480px) { ... }

/* Desktop layout */
@media (min-width: 1024px) { ... }
```

### Bottom Navigation

- **Mobile (≤480px):** Fixed bottom tab bar (5 tabs)
- **Desktop (>480px):** Hidden (can be converted to sidebar)

## Security Considerations

### Frontend
- JWT stored in localStorage (XSS risk mitigated by CSP)
- HTTPS only in production
- Input sanitization
- CORS-enabled requests

### Backend
- Password hashing (bcrypt)
- JWT with expiration
- CORS restricted to frontend origin
- SQL injection protection (SQLModel ORM)
- Rate limiting (TODO for production)

## Performance Optimizations

### Frontend
- Code splitting by route
- Lazy loading images
- Virtual scrolling for long lists (TODO)
- Debounced search
- Optimistic UI updates (messages)

### Backend
- Connection pooling (SQLite)
- Query optimization (eager loading)
- WebSocket connection reuse
- Pagination for large datasets

## Testing Strategy

### Frontend (Recommended)
- Unit tests: Jest + React Testing Library
- E2E tests: Playwright or Cypress
- Visual regression: Chromatic

### Backend (Recommended)
- Unit tests: pytest
- API tests: pytest + TestClient
- Load tests: Locust

## Deployment Architecture (Production)

```
                   ┌─────────────┐
                   │   Cloudflare │
                   │     CDN      │
                   └──────┬───────┘
                          │
              ┌───────────▼────────────┐
              │   Vercel / Netlify     │
              │   (Frontend - React)   │
              └───────────┬────────────┘
                          │
                          │ HTTPS
                          │
              ┌───────────▼────────────┐
              │  Railway / Render      │
              │  (Backend - FastAPI)   │
              └───────────┬────────────┘
                          │
                          │
              ┌───────────▼────────────┐
              │   PostgreSQL DB        │
              │   (Production)         │
              └────────────────────────┘
```

**Recommended Services:**
- Frontend: Vercel, Netlify, or AWS S3 + CloudFront
- Backend: Railway, Render, or AWS ECS
- Database: Railway Postgres, Supabase, or AWS RDS
- WebSocket: Same as backend (stateful)

## Future Enhancements

1. **PWA Support** - Service worker, offline mode
2. **Capacitor Integration** - Native iOS/Android apps
3. **Real Translation API** - Google Gemini or GPT
4. **Push Notifications** - Firebase Cloud Messaging
5. **Maps Integration** - Google Maps for location search
6. **Advanced Filters** - Multi-faceted search
7. **Admin Dashboard** - Employer portal
8. **Analytics** - User behavior tracking
9. **Payment Integration** - Application fees
10. **Video Calls** - WebRTC for interviews

---

**Document Version:** 1.0
**Last Updated:** 2025-11-06

