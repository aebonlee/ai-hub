# DreamIT Edu Hub 구현 계획

## 프로젝트 개요

- **프로젝트명**: DreamIT Edu Hub
- **도메인**: edu-hub.dreamitbiz.com
- **저장소**: https://github.com/aebonlee/edu-hub
- **설명**: 대학·교육기관 느낌의 학습사이트 허브. 4개 학습사이트(DB, React, HTML, Web)를 소개하고, 교수자 분양 신청(Supabase DB 연동)을 받는 사이트
- **기반 템플릿**: `D:\templete-ref` (React + Vite)

---

## Phase 1: 초기 설정

### 1.1 템플릿 복사
- `D:\templete-ref` → `D:\edu-hub` (node_modules, .git 제외)

### 1.2 Git 초기화
```bash
git init
git remote add origin https://github.com/aebonlee/edu-hub.git
npm install
```

### 1.3 인프라 파일 수정

| 파일 | 변경 내용 |
|------|-----------|
| `CNAME` | `edu-hub.dreamitbiz.com` |
| `package.json` | name: `dreamit-edu-hub` |
| `vite.config.js` | port: `5175` |
| `index.html` | title, meta description 변경 |
| `.env.example` | VITE_SITE_URL 업데이트 |

---

## Phase 2: 사이트 설정 (`src/config/site.js`)

### 2.1 브랜드 설정
- 브랜드명: `DreamIT Edu`
- Brand Parts: `Dream` / `IT` / `Edu`

### 2.2 메뉴 구조
```
홈 (/)
학습사이트 (드롭다운)
  ├── DB 학습 (/courses/db)
  ├── React 학습 (/courses/react)
  ├── HTML 학습 (/courses/html)
  └── Web 학습 (/courses/web)
강사분양 (/franchise)
소개 (/about)
```

### 2.3 Family Sites
- 본사이트 (DreamIT Edu Hub)
- 4개 학습사이트 (DB, React, HTML, Web)
- AHP
- 핵심역량

### 2.4 learningSites 배열 추가
각 학습사이트에 포함할 정보:
- `id`: 고유 식별자 (db, react, html, web)
- `url`: 외부 학습사이트 URL
- `icon`: 사이트별 아이콘
- `color`: 테마 색상
- `techStack`: 기술 스택 배열
- `difficulty`: 난이도 (beginner, intermediate, advanced)

### 2.5 카트 아이콘 숨김
- 교육 허브이므로 쇼핑 기능 불필요
- CSS로 카트 아이콘 숨김 처리

---

## Phase 3: 번역 (`src/utils/translations.js`)

### 3.1 site 블록 전체 교체
- 한국어(ko) / 영어(en) 지원

### 3.2 번역 키 구조
```
nav.*        - 네비게이션 메뉴
home.*       - 홈 페이지
courses.*    - 학습사이트 페이지
franchise.*  - 강사분양 페이지
about.*      - 소개 페이지
footer.*     - 푸터 (tagline 교육 관련으로 변경)
```

---

## Phase 4: 신규 페이지 (4개)

### 4.1 Home.jsx (전면 재작성)

#### Hero 섹션
- 그라디언트 배경 + 파티클 효과
- 교육 관련 메시지
- CTA 버튼 2개 (학습 시작, 강사 신청)

#### Stats 섹션
| 항목 | 값 |
|------|-----|
| 학습사이트 | 4개 |
| 수강생 | 500+ |
| 강사 | 12명 |
| 수료율 | 95% |
- `useCountUp` 훅 활용한 카운터 애니메이션

#### 학습사이트 카드 섹션
- 2열 그리드 레이아웃
- 카드 구성: 아이콘, 제목, 설명, 기술스택 태그, 난이도 배지, 방문 링크

#### CTA 섹션
- 학습 시작 유도 배너

### 4.2 Courses.jsx (신규 생성)

#### 필터 기능
- 전체 / 입문 / 중급 / 고급 난이도 필터

#### 상세 카드
각 학습사이트별:
- 커리큘럼 목록
- 특징 설명
- 대상 수강자
- 외부 사이트 링크 버튼

### 4.3 Franchise.jsx (신규 생성)

#### 혜택 섹션
4개 카드:
1. 커리큘럼 제공
2. 수익 공유
3. 기술 지원
4. 커뮤니티 참여

#### 지원서 폼
- **Supabase** `franchise_applications` 테이블 INSERT
- 미인증 사용자도 제출 가능
- 로그인 시 user_id 자동 연결

**폼 필드:**

| 필드 | 타입 | 필수 |
|------|------|------|
| 이름 | TEXT | ✅ |
| 이메일 | TEXT | ✅ |
| 연락처 | TEXT | ✅ |
| 희망 사이트 | SELECT | ✅ |
| 강의 경력 | TEXT | ✅ |
| 지원 동기 | TEXTAREA | ✅ |
| 포트폴리오 URL | TEXT | ❌ |

### 4.4 About.jsx (신규 생성)

- **미션/비전**: 2열 카드 레이아웃
- **핵심 가치**: 4열 그리드 (4개 가치)
- **운영팀 소개**: 팀 멤버 카드

---

## Phase 5: 라우팅 (`src/layouts/PublicLayout.jsx`)

```
/              → Home
/courses       → Courses
/courses/:id   → Courses (특정 사이트 하이라이트)
/franchise     → Franchise
/about         → About
```

- 기존 Auth/Shop 라우트 유지 (향후 활용 가능)

---

## Phase 6: CSS (`src/styles/site.css`)

### 6.1 신규 클래스

| 클래스 | 용도 |
|--------|------|
| `.edu-stats-*` | 통계 카운터 카드 |
| `.edu-sites-grid` | 학습사이트 그리드 |
| `.edu-site-card` | 학습사이트 카드 |
| `.edu-difficulty-badge` | 난이도 배지 (beginner/intermediate/advanced) |
| `.edu-tech-tag` | 기술스택 태그 |
| `.edu-filter-*` | 필터 버튼 |
| `.edu-detail-card` | 상세 카드 (Courses) |
| `.edu-benefits-grid` | 혜택 그리드 |
| `.edu-benefit-card` | 혜택 카드 |
| `.edu-form-*` | 지원서 폼 |
| `.edu-mission-*` | About 미션/비전 |
| `.edu-values-*` | About 핵심 가치 |

### 6.2 카트 아이콘 숨김
```css
.cart-icon-link { display: none; }
```

### 6.3 다크모드
- 모든 edu-* 클래스에 대한 Dark mode 오버라이드

### 6.4 반응형 브레이크포인트
- `1024px` (태블릿 가로)
- `768px` (태블릿 세로)
- `480px` (모바일)

---

## Phase 7: Supabase 스키마

### franchise_applications 테이블

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

> ⚠️ 실제 DB 생성은 Supabase 대시보드에서 수행

---

## 수정 파일 목록

| 파일 | 작업 유형 |
|------|-----------|
| `CNAME` | 수정 |
| `package.json` | 수정 |
| `vite.config.js` | 수정 |
| `index.html` | 수정 |
| `.env.example` | 수정 |
| `src/config/site.js` | **전면 재작성** |
| `src/utils/translations.js` | site 블록 교체 |
| `src/pages/Home.jsx` | **전면 재작성** |
| `src/pages/Courses.jsx` | **신규 생성** |
| `src/pages/Franchise.jsx` | **신규 생성** |
| `src/pages/About.jsx` | **신규 생성** |
| `src/layouts/PublicLayout.jsx` | 라우트 추가 |
| `src/styles/site.css` | **전면 재작성** |

### 변경 없는 파일
- `App.jsx`, `main.jsx`, `index.css`
- `Navbar.jsx`, `Footer.jsx`
- `contexts/*`, `hooks/*`
- `utils/supabase.js`
- `base.css`, `navbar.css`, `hero.css`

---

## 검증 체크리스트

- [ ] `npm run dev` → http://localhost:5175 정상 접속
- [ ] 모든 페이지 네비게이션 테스트 (홈/학습사이트/강사분양/소개)
- [ ] 다크모드 + 5개 컬러테마 전환 확인
- [ ] 한국어/영어 전환 확인
- [ ] 반응형 레이아웃 확인 (모바일/태블릿)
- [ ] 분양 신청 폼 제출 테스트 (Supabase 연동 시)
- [ ] Git push → GitHub Actions → GitHub Pages 배포 확인

---

## 기술 스택

| 카테고리 | 기술 |
|----------|------|
| 프레임워크 | React 18 + Vite |
| 스타일링 | Vanilla CSS (BEM-like) |
| 백엔드 | Supabase (Auth + DB) |
| 배포 | GitHub Pages + GitHub Actions |
| 다국어 | 커스텀 i18n (ko/en) |
| 테마 | 다크모드 + 5개 컬러테마 |
