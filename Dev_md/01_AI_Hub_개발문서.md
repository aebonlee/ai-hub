# DreamIT AI Hub 개발 문서

## 프로젝트 개요

| 항목 | 내용 |
|------|------|
| 프로젝트명 | DreamIT AI Hub (드림아이티 AI 허브) |
| URL | https://ai-hub.dreamitbiz.com |
| 기반 프로젝트 | edu-hub (DreamIT Edu Hub) |
| 기술 스택 | React 19 + Vite 7 + TypeScript 6 + Supabase + PortOne |
| 배포 방식 | GitHub Pages (`npx gh-pages -d dist`) |
| 개발일 | 2026-04-06 |

## 사이트 목적

AI 관련 학습사이트 11개를 모아서 제공하는 AI 전문 학습사이트 허브.
edu-hub의 아키텍처를 그대로 활용하되, AI 전문 사이트와 카드 결제, 사이트 분양(개별/전체) 기능에 최적화.

---

## 대상 AI 사이트 (11개)

| # | 사이트 | URL | 카테고리 |
|:-:|--------|-----|----------|
| 1 | ChatGPT 활용 | chatgpt.dreamitbiz.com | AI 챗봇 |
| 2 | Claude AI 활용 | claude.dreamitbiz.com | AI 챗봇 |
| 3 | Gemini AI 활용 | gemini.dreamitbiz.com | AI 챗봇 |
| 4 | GenSpark AI | genspark.dreamitbiz.com | AI 챗봇 |
| 5 | AI 업무 자동화 | autowork.dreamitbiz.com | 실무 자동화 |
| 6 | AI 에이전트 | ai-agents.dreamitbiz.com | 실무 자동화 |
| 7 | AI 데이터 분석 | ai-data.dreamitbiz.com | 데이터&미디어 |
| 8 | AI 미디어 생성 | ai-media.dreamitbiz.com | 데이터&미디어 |
| 9 | 프롬프트 엔지니어링 | ai-prompt.dreamitbiz.com | 개발 심화 |
| 10 | AI 파인튜닝 | fine-tuning.dreamitbiz.com | 개발 심화 |
| 11 | 오픈소스 AI | openclaw.dreamitbiz.com | 오픈소스 |

## 5개 카테고리

| ID | 한국어 | 영어 | 포함 사이트 |
|----|--------|------|-------------|
| `chatbot` | AI 챗봇 마스터 | AI Chatbot Master | ChatGPT, Claude, Gemini, GenSpark |
| `automation` | AI 실무 자동화 | AI Work Automation | autowork, ai-agents |
| `data-media` | AI 데이터 & 미디어 | AI Data & Media | ai-data, ai-media |
| `advanced` | AI 개발 심화 | AI Advanced Dev | ai-prompt, fine-tuning |
| `opensource` | 오픈소스 AI | Open Source AI | openclaw |

## 분양(라이선싱) 시스템

| 유형 | ID | 설명 | 가격 |
|------|----|------|------|
| 개별 분양 | `single-site` | AI 사이트 1개 라이선스 | 50만원/사이트 |
| 전체 패키지 | `bundle` | 11개 사이트 번들 | 300만원 (45% 할인) |
| 맞춤 제작 | `custom` | 새 AI 사이트 기획~제작 | 가격 문의 |

---

## 브랜딩

| 항목 | 값 |
|------|-----|
| 이름 | DreamIT AI Hub / 드림아이티 AI 허브 |
| 기본 테마색 | #1E3A8A (다크 블루) |
| 그라디언트 | #1E3A8A → #7C3AED (블루 → 퍼플) |
| 로고 텍스트 | `AI` + ` Hub` |

### 5가지 컬러 테마

| 테마 | Primary | Dark | Light |
|------|---------|------|-------|
| Blue (기본) | #1E3A8A | #172554 | #3B82F6 |
| Red | #C8102E | #8A001A | #E74A5A |
| Green | #00855A | #005C3E | #4AE79A |
| Purple | #8B1AC8 | #5E008A | #B04AE7 |
| Orange | #C87200 | #8A4E00 | #E7A04A |

---

## 프로젝트 구조

```
ai-hub/
├── public/
│   ├── CNAME              # ai-hub.dreamitbiz.com
│   ├── sitemap.xml        # SEO 사이트맵
│   └── robots.txt         # 크롤러 설정
├── src/
│   ├── config/
│   │   ├── site.js        # ★ 핵심: 11개 AI 사이트, 5개 카테고리, 메뉴
│   │   └── admin.js       # 관리자 이메일 설정
│   ├── contexts/
│   │   ├── CartContext.tsx     # 장바구니 (키: dreamitbiz_aihub_cart)
│   │   ├── ThemeContext.tsx    # 테마 (기본: blue = 다크블루)
│   │   ├── AuthContext.tsx     # 인증 (Google/Kakao OAuth)
│   │   ├── LanguageContext.tsx # 다국어 (ko/en)
│   │   └── ToastContext.tsx    # 토스트 알림
│   ├── pages/
│   │   ├── Home.tsx       # 5개 AI 카테고리, 통계(11사이트/5분야)
│   │   ├── Shop.tsx       # 분양 스토어 (single-site/bundle/custom)
│   │   ├── Franchise.tsx  # 분양 문의 폼
│   │   ├── Checkout.tsx   # 결제 (주문번호: AIH-YYMMDD-XXXXX)
│   │   ├── About.tsx      # AI Hub 소개
│   │   └── admin/         # 관리자 페이지 (Dashboard, Orders, Members, Products)
│   ├── layouts/
│   │   └── AdminLayout.tsx # DreamIT AI Hub 사이드바
│   ├── utils/
│   │   ├── supabase.js        # ah_orders, ah_order_items
│   │   ├── productStorage.js  # ah_products
│   │   ├── noticeStorage.js   # ah_notices
│   │   ├── qnaStorage.js      # ah_qna_posts
│   │   ├── commentStorage.js  # ah_comments
│   │   ├── searchStorage.js   # ah_blog_posts, ah_board_posts, ah_gallery_items
│   │   ├── adminApi.js        # ah_orders, ah_order_items, ah_products
│   │   ├── translations.js   # ★ 핵심: AI Hub 전용 ko/en 번역
│   │   └── portone.js        # PortOne 결제 연동
│   └── styles/
│       ├── base.css       # 다크블루 테마 + 5가지 컬러 테마
│       └── shop.css       # 분양 상품 스타일
├── .env                   # Supabase 키, 사이트 URL
├── package.json           # dreamit-ai-hub
├── vite.config.js         # port: 5176
└── index.html             # AI Hub 메타태그
```

---

## Supabase 설정

### 접속 정보
- Project: `hcmgdztsgjvzcyxyayaj.supabase.co`
- Anon Key: `.env` 파일 참조
- 테이블 접두사: `ah_` (AI Hub)

### 테이블 목록

| 테이블 | 용도 |
|--------|------|
| `ah_orders` | 주문 |
| `ah_order_items` | 주문 상세 |
| `ah_products` | 상품 (분양 상품) |
| `ah_notices` | 공지사항 |
| `ah_qna_posts` | Q&A 질문 |
| `ah_comments` | 댓글 |
| `ah_blog_posts` | 블로그 |
| `ah_board_posts` | 게시판 |
| `ah_gallery_items` | 갤러리 |
| `ah_franchise_applications` | 분양 신청 |
| `user_profiles` | 회원 프로필 (공유) |

### 인증 방식
- Google 이메일 로그인
- Kakao 인증 로그인

---

## edu-hub 대비 변경 사항 요약

### 완전 재작성 (2개)
- `src/config/site.js` — 11개 AI 사이트, 5개 카테고리, AI 전용 메뉴
- `src/utils/translations.js` — AI Hub 전용 ko/en 번역 키

### 주요 수정 (8개)
| 파일 | 변경 내용 |
|------|-----------|
| `package.json` | name: dreamit-ai-hub, port: 5176 |
| `index.html` | AI Hub 메타태그, OG 태그 |
| `src/styles/base.css` | 다크블루 기본 테마 (#1E3A8A) |
| `src/pages/Home.tsx` | 5개 AI 카테고리, 통계(11/5) |
| `src/pages/Shop.tsx` | CATEGORIES: single-site/bundle/custom |
| `src/pages/Checkout.tsx` | 주문번호: AIH-, 주문명: DreamIT AI Hub |
| `src/pages/Franchise.tsx` | ah_franchise_applications |
| `src/layouts/AdminLayout.tsx` | DreamIT AI Hub |

### eh_ → ah_ 접두사 변환 (7개 utils)
- `supabase.js` — ah_orders, ah_order_items
- `productStorage.js` — ah_products
- `noticeStorage.js` — ah_notices
- `qnaStorage.js` — ah_qna_posts, ah_comments
- `commentStorage.js` — ah_comments
- `searchStorage.js` — ah_blog_posts, ah_board_posts, ah_gallery_items
- `adminApi.js` — ah_orders, ah_order_items, ah_products

### Context 변경 (2개)
- `CartContext.tsx` — 키: `dreamitbiz_aihub_cart`
- `ThemeContext.tsx` — 기본 컬러: blue (다크블루)

### 기타
- `public/CNAME` — ai-hub.dreamitbiz.com
- `public/sitemap.xml` — 모든 URL ai-hub으로 변경
- `public/robots.txt` — 사이트맵 URL 업데이트
- `.env` — VITE_SITE_URL 업데이트

---

## 네비게이션 메뉴 구조

```
AI 챗봇 마스터
  ├── ChatGPT 활용
  ├── Claude AI 활용
  ├── Gemini AI 활용
  └── GenSpark AI

AI 실무 자동화
  ├── AI 업무 자동화
  └── AI 에이전트

AI 데이터 & 미디어
  ├── AI 데이터 분석
  └── AI 미디어 생성

AI 개발 심화
  ├── 프롬프트 엔지니어링
  └── AI 파인튜닝

오픈소스 AI
  └── 오픈소스 AI

AI 사이트 분양
  ├── 분양 문의
  └── 분양 스토어

커뮤니티
  ├── AI Hub 소개
  ├── 공지사항
  └── Q&A
```

---

## 배포 정보

| 항목 | 값 |
|------|-----|
| 빌드 명령 | `npx vite build` |
| 배포 명령 | `npx gh-pages -d dist` |
| 도메인 | ai-hub.dreamitbiz.com |
| GitHub Pages | 자동 설정 (CNAME) |
| TypeScript 검증 | `npx tsc --noEmit` → 0 errors |
