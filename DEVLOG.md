# DreamIT Edu Hub - 개발일지

## 2026-03-15 — 페이지 첫 번째 카드 사라짐 버그 수정

### 변경 개요
메뉴별 페이지(Courses, About, Franchise 등) 이동 시 첫 번째 카드/섹션이 보이지 않는 버그를 수정하였습니다.

### 원인 분석
1. **ScrollToTop 미적용** — SPA 페이지 이동 시 스크롤 위치가 유지되어, 이전 페이지에서 스크롤이 내려간 상태로 새 페이지가 열리면 첫 번째 섹션이 뷰포트 위에 위치하여 AOS 옵저버가 감지하지 못함
2. **AOS 옵저버 타이밍 이슈** — 페이지 로드 시 이미 뷰포트에 있는 요소를 IntersectionObserver가 즉시 감지하지 못하는 경우 발생

### 수정 내역

| 파일 | 변경 내용 |
|------|-----------|
| `src/hooks/useAOS.js` | `pathname` 의존성 추가, 라우트 변경 시 `scrollTo(0,0)` + AOS 리셋 + `requestAnimationFrame` 폴백으로 이미 뷰포트에 있는 요소 즉시 애니메이션 |
| `src/layouts/PublicLayout.jsx` | `ScrollToTop` 컴포넌트 추가 — 모든 라우트 변경 시 자동 스크롤 최상단 이동 |

> 상세: [docs/dev-log-emoji-to-fontawesome.md](docs/dev-log-emoji-to-fontawesome.md)

---

## 2026-03-15 — 학습사이트 URL 변경 (DB, Web, React)

### 변경 개요
3개 학습사이트의 서브도메인 URL을 신규 도메인으로 변경하였습니다.

### 변경 내역

| 사이트 | 변경 전 | 변경 후 |
|--------|---------|---------|
| DB 학습 | `db.dreamitbiz.com` | `db-study.dreamitbiz.com` |
| Web 학습 | `web.dreamitbiz.com` | `webstudy.dreamitbiz.com` |
| React 학습 | `react.dreamitbiz.com` | `reactstudy.dreamitbiz.com` |

### 수정 파일 (2개, 각 사이트당 3곳)
- `src/config/site.js` — `familySites[].url` + `learningSites[].url`
- `README.md` — 학습사이트 목록 테이블

---

## 2026-03-15 — 이모지 → Font Awesome 아이콘 교체

### 변경 개요
사이트 전체 38개 컬러 이모지를 Font Awesome 6 Free 아이콘으로 교체하였습니다.
아이콘 컨테이너(원형/라운드 배경)를 추가하여 전문적인 디자인으로 개선하였습니다.

### 주요 변경

| 항목 | 내용 |
|------|------|
| Font Awesome 6.5 CDN | `index.html`에 CDN link 추가 |
| 카테고리 아이콘 4개 | 📚💼💻🏆 → `fa-book-open`, `fa-briefcase`, `fa-laptop-code`, `fa-award` |
| 학습사이트 아이콘 20개 | 각 사이트별 의미에 맞는 FA 아이콘으로 교체 |
| About 페이지 9개 | 미션/비전/가치/팀 아이콘 교체 |
| Franchise 페이지 5개 | 혜택/성공 아이콘 교체 |
| 아이콘 컨테이너 CSS | 원형/라운드 배경 + hover scale(1.08) 애니메이션 |
| 다크모드 오버라이드 | 배경 opacity 0.08→0.12, success icon 다크 컬러 |
| README.md | 20개 학습사이트 + 기술 스택 + 프로젝트 구조 포함 전면 재작성 |

### 수정 파일 (8개)
- `index.html` — FA6 CDN link 추가
- `src/config/site.js` — 24개 이모지 → FA 클래스 문자열
- `src/pages/About.jsx` — 9개 하드코딩 이모지 → `<i>` 요소
- `src/pages/Franchise.jsx` — 5개 이모지 → `<i>` 요소
- `src/pages/Courses.jsx` — 렌더링 패턴 `{icon}` → `<i className={icon}>`
- `src/pages/Home.jsx` — 렌더링 패턴 변경
- `src/styles/site.css` — 아이콘 컨테이너 CSS 전면 교체 + 다크모드 오버라이드
- `README.md` — 전면 재작성

> 상세: [docs/dev-log-emoji-to-fontawesome.md](docs/dev-log-emoji-to-fontawesome.md)

---

## 2026-03-15 — 메뉴 페이지 디자인 개선

### 변경 개요
Courses, Franchise, About 페이지 + Home CTA 섹션의 미완성 디자인을 개선하였습니다.
기능 변경 없이 CSS 추가 + AOS 애니메이션 적용으로 구현하였습니다.

### 주요 변경

| 항목 | 내용 |
|------|------|
| `.page-header` CSS | 그라디언트 배경(`var(--hero-bg)`), 흰색 타이포, 반응형 패딩 |
| `.cta-section` CSS | 그라디언트 배경, 흰색 타이포, 가운데 정렬 |
| AOS 애니메이션 | Courses, Franchise, About, Home 4개 페이지에 fade-up + 시차 적용 |

### 수정 파일 (5개)
- `src/styles/site.css` — `.page-header`, `.cta-section`, `.cta-content` 정의 추가 + 768px 반응형
- `src/pages/Courses.jsx` — useAOS + 카테고리/카드 `data-aos="fade-up"`
- `src/pages/Franchise.jsx` — useAOS + 혜택카드/폼 `data-aos="fade-up"`
- `src/pages/About.jsx` — useAOS + 미션/가치/팀 카드 `data-aos="fade-up"`
- `src/pages/Home.jsx` — useAOS + 카테고리카드/CTA `data-aos="fade-up"`

> 상세: [docs/dev-log-page-design-improvement.md](docs/dev-log-page-design-improvement.md)

---

## 2026-03-15 (v1.0.0) - 초기 구현 완료

### 프로젝트 개요
- **프로젝트명**: DreamIT Edu Hub (드림아이티 에듀 허브)
- **도메인**: edu-hub.dreamitbiz.com
- **저장소**: https://github.com/aebonlee/edu-hub
- **기반**: `D:\templete-ref` React + Vite 템플릿

### 구현 내역

#### Phase 1: 초기 설정
- 템플릿 복사 (node_modules, .git 제외)
- Git 초기화 및 remote 연결 (`https://github.com/aebonlee/edu-hub.git`)
- `CNAME` → `edu-hub.dreamitbiz.com`
- `package.json` → name: `dreamit-edu-hub`
- `vite.config.js` → port: `5175`
- `index.html` → title: `DreamIT Edu Hub | 드림아이티 에듀 허브`, meta description 변경
- `.env.example` → `VITE_SITE_URL=https://edu-hub.dreamitbiz.com`
- `npm install` (83 packages, 0 vulnerabilities)

#### Phase 2: 사이트 설정 (`src/config/site.js`) — 전면 재작성
- 브랜드: `Dream` / `IT` / `Edu`
- 메뉴: 홈, 학습사이트(드롭다운: DB/React/HTML/Web), 강사분양, 소개
- Family Sites: 본사이트 + 4개 학습사이트 + AHP + 핵심역량
- `learningSites` 배열 추가
  - 4개 사이트: DB, React, HTML, Web
  - 각 사이트별: id, url, icon, color, techStack, difficulty, curriculum(ko/en), features(ko/en), target(ko/en)
- 카트 아이콘 CSS 숨김 처리

#### Phase 3: 번역 (`src/utils/translations.js`) — site 블록 전체 교체
- 한국어/영어 완전 지원
- 신규 번역 키:
  - `site.nav.*` — 학습사이트, DB학습, React학습, HTML학습, Web학습, 강사분양
  - `site.home.*` — Hero, Stats, Sites, CTA 섹션 전체
  - `site.courses.*` — 필터, 커리큘럼, 특징, 대상
  - `site.franchise.*` — 혜택 4개, 지원서 폼 필드 전체
  - `site.about.*` — 미션, 비전, 핵심가치 4개, 운영팀
  - `site.difficulty.*` — 입문/중급/고급
- `footer.tagline` → 교육 관련 문구로 변경

#### Phase 4: 신규 페이지 (4개)

**Home.jsx (전면 재작성)**
- Hero 섹션: 그라디언트 배경 + 파티클 애니메이션 (20개), CTA 버튼 2개
- Stats 섹션: `useCountUp` 훅으로 카운터 애니메이션 (4개/500+/12명/95%)
- 학습사이트 카드: 2열 그리드, 아이콘/제목/설명/기술스택 태그/난이도 배지/방문 링크
- CTA 섹션: 학습 시작 유도

**Courses.jsx (신규)**
- 난이도별 필터 버튼 (전체/입문/중급/고급)
- 4개 학습사이트 상세 카드: 커리큘럼 리스트, 특징, 대상 수강자, 외부 사이트 링크
- URL 파라미터로 특정 사이트 하이라이트 (`/courses/:id`)

**Franchise.jsx (신규)**
- 혜택 섹션: 4개 카드 (커리큘럼 제공, 수익 공유, 기술 지원, 커뮤니티)
- 지원서 폼: Supabase `franchise_applications` 테이블 INSERT
  - 필드: 이름, 이메일, 연락처, 희망 사이트(select), 강의 경력, 지원 동기, 포트폴리오 URL
  - 미인증 사용자도 제출 가능, 로그인 시 user_id 자동 연결
  - Supabase 미설정 시 데모 모드 (1초 대기 후 성공)
  - 성공/에러 상태 처리

**About.jsx (신규)**
- 미션/비전: 2열 카드 레이아웃
- 핵심 가치: 4열 그리드 (실무 중심, 접근성, 최신 기술, 함께 성장)
- 운영팀 소개: 3열 그리드 (대표, 교육팀, 기술팀)

#### Phase 5: 라우팅 (`src/layouts/PublicLayout.jsx`)
- `/courses` → Courses
- `/courses/:id` → Courses (특정 사이트 하이라이트)
- `/franchise` → Franchise
- `/about` → About
- 기존 Auth/Shop 라우트 유지

#### Phase 6: CSS (`src/styles/site.css`) — 전면 재작성
- `.cart-icon-link { display: none }` — 카트 아이콘 숨김
- `.edu-stats-*` — 통계 카운터 카드 (4열 그리드)
- `.edu-sites-grid`, `.edu-site-card` — 학습사이트 카드 (2열 그리드)
- `.edu-difficulty-badge` — 난이도 배지 (beginner: 초록, intermediate: 파랑, advanced: 주황)
- `.edu-tech-tag` — 기술스택 태그
- `.edu-filter-*` — 필터 버튼 (pill 스타일)
- `.edu-detail-card`, `.edu-detail-block` — 상세 카드 (Courses 페이지)
- `.edu-benefits-grid`, `.edu-benefit-card` — 혜택 카드 (4열 그리드)
- `.edu-form-*` — 지원서 폼 (2열 row, 검증, 성공/에러 상태)
- `.edu-mission-*` — 미션/비전 (2열 그리드)
- `.edu-values-*` — 핵심 가치 (4열 그리드)
- `.edu-team-*` — 운영팀 (3열 그리드)
- Dark mode 오버라이드 전체 (`[data-theme="dark"]`)
- 반응형: 1024px / 768px / 480px

#### Phase 7: Supabase 스키마 (참고)
```sql
CREATE TABLE franchise_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  preferred_site TEXT NOT NULL,
  experience TEXT NOT NULL,
  motivation TEXT NOT NULL,
  portfolio_url TEXT,
  status TEXT DEFAULT 'pending',
  user_id UUID REFERENCES auth.users(id)
);
```
> 실제 테이블 생성은 Supabase 대시보드에서 수행

### 수정/생성 파일 목록

| 파일 | 작업 |
|------|------|
| `CNAME` | 수정 |
| `public/CNAME` | 수정 |
| `package.json` | 수정 (name) |
| `vite.config.js` | 수정 (port) |
| `index.html` | 수정 (title, description) |
| `.env.example` | 수정 (SITE_URL) |
| `src/config/site.js` | **전면 재작성** |
| `src/utils/translations.js` | **전면 재작성** |
| `src/pages/Home.jsx` | **전면 재작성** |
| `src/pages/Courses.jsx` | **신규 생성** |
| `src/pages/Franchise.jsx` | **신규 생성** |
| `src/pages/About.jsx` | **신규 생성** |
| `src/layouts/PublicLayout.jsx` | 라우트 추가 |
| `src/styles/site.css` | **전면 재작성** |
| `IMPLEMENTATION_PLAN.md` | **신규 생성** |
| `DEVLOG.md` | **신규 생성** |

### 변경 없는 파일
- `App.jsx`, `main.jsx`, `index.css`
- `Navbar.jsx`, `Footer.jsx`
- `contexts/*` (ThemeContext, LanguageContext, CartContext, AuthContext, ToastContext)
- `hooks/*` (useCountUp, useAOS)
- `utils/supabase.js`, `utils/auth.js`
- `styles/base.css`, `styles/navbar.css`, `styles/hero.css`, `styles/dark-mode.css`, `styles/responsive.css` 등

### 빌드 결과
- `npm run build` 성공 (2.57s, 0 errors)
- 총 19개 청크 생성
- CSS: `index-*.css` (101.71 kB), `auth-*.css` (7.46 kB)
- JS: `index-*.js` (276.75 kB / gzip: 89.36 kB)

### 배포
- GitHub Pages (GitHub Actions 자동 배포)
- 도메인: edu-hub.dreamitbiz.com

---

## 기술 스택

| 카테고리 | 기술 |
|----------|------|
| 프레임워크 | React 19 + Vite 7 |
| 스타일링 | Vanilla CSS (BEM-like, CSS Variables) |
| 백엔드 | Supabase (Auth + Database) |
| 배포 | GitHub Pages + GitHub Actions |
| 다국어 | 커스텀 i18n (ko/en) |
| 테마 | 다크모드 + 5개 컬러테마 (blue/red/green/purple/orange) |
