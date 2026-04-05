# DreamIT AI Hub

**AI 전문 학습사이트 허브** - ChatGPT, Claude, Gemini 등 11개 AI 학습 플랫폼을 소개하고, AI 사이트 분양(라이선싱) 및 맞춤 제작 서비스를 제공하는 AI 교육 포털 사이트입니다.

- **도메인**: https://ai-hub.dreamitbiz.com
- **운영**: DreamIT Biz (https://www.dreamitbiz.com)

---

## AI 학습 사이트 (11개)

### 1. AI 챗봇 마스터 (AI Chatbot Master) — 4개
| 사이트 | 설명 | URL |
|--------|------|-----|
| ChatGPT 활용 | OpenAI ChatGPT 활용 실전 가이드 | https://chatgpt.dreamitbiz.com |
| Claude AI 활용 | Anthropic Claude AI 마스터 | https://claude.dreamitbiz.com |
| Gemini AI 활용 | Google Gemini AI 완벽 활용 | https://gemini.dreamitbiz.com |
| GenSpark AI | GenSpark AI 에이전트 플랫폼 활용 | https://genspark.dreamitbiz.com |

### 2. AI 실무 자동화 (AI Work Automation) — 2개
| 사이트 | 설명 | URL |
|--------|------|-----|
| AI 업무 자동화 | AI 기반 업무 프로세스 자동화 | https://autowork.dreamitbiz.com |
| AI 에이전트 | AI 에이전트 개발과 활용 | https://ai-agents.dreamitbiz.com |

### 3. AI 데이터 & 미디어 (AI Data & Media) — 2개
| 사이트 | 설명 | URL |
|--------|------|-----|
| AI 데이터 분석 | AI 기반 데이터 분석과 인사이트 도출 | https://ai-data.dreamitbiz.com |
| AI 미디어 생성 | AI 이미지·영상·음악 생성 마스터 | https://ai-media.dreamitbiz.com |

### 4. AI 개발 심화 (AI Advanced Dev) — 2개
| 사이트 | 설명 | URL |
|--------|------|-----|
| 프롬프트 엔지니어링 | 고급 프롬프트 설계와 최적화 기법 | https://ai-prompt.dreamitbiz.com |
| AI 파인튜닝 | LLM 파인튜닝과 맞춤 AI 모델 개발 | https://fine-tuning.dreamitbiz.com |

### 5. 오픈소스 AI (Open Source AI) — 1개
| 사이트 | 설명 | URL |
|--------|------|-----|
| 오픈소스 AI | 오픈소스 AI 모델 활용과 로컬 배포 | https://openclaw.dreamitbiz.com |

---

## 분양(라이선싱) 시스템

| 유형 | 설명 | 가격 |
|------|------|------|
| 개별 분양 (single-site) | AI 사이트 1개 라이선스 | 50만원/사이트 |
| 전체 패키지 (bundle) | 11개 사이트 번들 | 300만원 (45% 할인) |
| 맞춤 제작 (custom) | 새 AI 사이트 기획~제작 | 가격 문의 |

---

## 주요 기능

| 기능 | 설명 |
|------|------|
| 다국어 지원 | 한국어 / English 전환 |
| 다크모드 | Light / Dark / Auto 모드 |
| 컬러 테마 | Blue(기본), Red, Green, Purple, Orange 5가지 |
| 장바구니 & 결제 | 분양 상품 장바구니 담기, PortOne 카드 결제 |
| 분양 스토어 (/shop) | 개별/번들/맞춤 분양 상품 목록 |
| 분양 문의 (/franchise) | 분양 신청 및 문의 폼 |
| 관리자 대시보드 | 주문/회원/상품 관리 + 통계 |
| 회원 시스템 | Google/Kakao OAuth 로그인 |
| 커뮤니티 | 공지사항, Q&A, 블로그, 게시판, 갤러리 |

---

## 브랜딩

| 항목 | 값 |
|------|-----|
| 이름 | DreamIT AI Hub / 드림아이티 AI 허브 |
| 기본 테마색 | #1E3A8A (다크 블루) |
| 그라디언트 | #1E3A8A → #7C3AED (블루 → 퍼플) |
| 로고 | `AI` + ` Hub` |

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| Frontend | React 19, Vite 7, TypeScript 6, React Router 7 |
| Backend | Supabase (Auth + Database + Storage) |
| 결제 | PortOne (아임포트) 카드 결제 |
| Icons | Font Awesome 6 Free |
| Fonts | Noto Sans KR (Google Fonts) |
| 배포 | GitHub Pages (`npx gh-pages -d dist`) |

---

## Supabase 테이블 (접두사: `ah_`)

| 테이블 | 용도 |
|--------|------|
| `ah_products` | 분양 상품 |
| `ah_orders` | 주문 |
| `ah_order_items` | 주문 상세 |
| `ah_notices` | 공지사항 |
| `ah_qna_posts` | Q&A 질문 |
| `ah_comments` | 댓글 |
| `ah_blog_posts` | 블로그 |
| `ah_board_posts` | 게시판 |
| `ah_gallery_items` | 갤러리 |
| `ah_franchise_applications` | 분양 신청 |
| `user_profiles` | 회원 프로필 (공유) |

---

## 프로젝트 구조

```
ai-hub/
├── public/
│   ├── CNAME              # ai-hub.dreamitbiz.com
│   ├── og-image.png       # OG 공유 이미지 (1200x630)
│   ├── sitemap.xml        # SEO 사이트맵
│   └── robots.txt         # 크롤러 설정
├── scripts/
│   ├── create-tables.sql  # Supabase 테이블 생성 스크립트
│   └── generate-og-image.js # OG 이미지 생성 스크립트
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
│   │   └── admin/         # 관리자 페이지
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
├── Dev_md/                # 개발 문서
├── .env                   # Supabase 키, 사이트 URL
├── package.json           # dreamit-ai-hub
├── vite.config.js         # port: 5176
└── index.html             # AI Hub 메타태그 + OG 태그
```

---

## 빠른 시작

```bash
# 의존성 설치
npm install

# 환경변수 설정
cp .env.example .env
# .env 파일에 Supabase URL과 Anon Key를 입력하세요

# 개발 서버 시작 (http://localhost:5176)
npm run dev
```

## 빌드 & 배포

```bash
# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview

# GitHub Pages 배포
npx gh-pages -d dist
```

---

## License / 라이선스

**저작권 (c) 2025-2026 드림아이티비즈(DreamIT Biz). 모든 권리 보유.**

본 소프트웨어는 저작권법 및 지적재산권법에 의해 보호되는 독점 소프트웨어입니다. 본 프로젝트는 소프트웨어 저작권 등록이 완료되어 법적 보호를 받습니다.

- 본 소프트웨어의 무단 복제, 수정, 배포 또는 사용은 엄격히 금지됩니다.
- 저작권자의 사전 서면 허가 없이 본 소프트웨어의 어떠한 부분도 복제하거나 전송할 수 없습니다.
- 본 소프트웨어는 DreamIT Biz(https://www.dreamitbiz.com) 교육 플랫폼의 일부로 제공됩니다.

라이선스 문의: aebon@dreamitbiz.com

---

**Copyright (c) 2025-2026 DreamIT Biz (Ph.D Aebon Lee). All Rights Reserved.**

This software is proprietary and protected under applicable copyright and intellectual property laws. This project has been registered for software copyright protection.

- Unauthorized copying, modification, distribution, or use of this software is strictly prohibited.
- No part of this software may be reproduced or transmitted in any form without prior written permission from the copyright holder.
- This software is provided as part of the DreamIT Biz (https://www.dreamitbiz.com) educational platform.

For licensing inquiries, contact: aebon@dreamitbiz.com

---

**Designed & Developed by Ph.D Aebon Lee**

DreamIT Biz | https://www.dreamitbiz.com
