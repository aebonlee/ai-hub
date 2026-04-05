# DreamIT Edu Hub

**IT 교육 학습사이트 허브** - 교양, 경영, 컴퓨터, 자격증 분야 20개 학습 플랫폼을 소개하고, 강사 분양 신청을 받는 교육 포털 사이트입니다.

- **도메인**: https://edu-hub.dreamitbiz.com
- **운영**: DreamIT Biz (https://www.dreamitbiz.com)

## 학습사이트 (20개)

### 교양분야 (Liberal Arts)
| 사이트 | 설명 | 난이도 |
|--------|------|--------|
| 통계학 기초 | 데이터 분석의 기초가 되는 통계학 개념과 실습 | 입문 |
| 실용 영어 | 비즈니스 및 일상 활용 영어 회화와 작문 | 입문 |
| 글쓰기와 소통 | 논리적 글쓰기와 효과적인 커뮤니케이션 | 입문 |
| 프레젠테이션 | 효과적인 발표 기법과 시각 자료 제작 | 입문 |

### 경영전공분야 (Business)
| 사이트 | URL | 난이도 |
|--------|-----|--------|
| 회계학 원리 | - | 중급 |
| 경영전략론 | - | 고급 |
| 재무관리 | - | 고급 |
| 마케팅개론 | https://marketing.dreamitbiz.com | 입문 |
| 셀프 브랜딩 마케팅 | https://self-branding.dreamitbiz.com | 입문 |
| 고객경험디자인 | https://uxdesign.dreamitbiz.com | 중급 |
| 디지털비즈니스전략세미나 | https://digitalbiz.dreamitbiz.com | 고급 |

### 컴퓨터전공분야 (Computer Science)
| 사이트 | URL | 난이도 |
|--------|-----|--------|
| DB 학습 | https://db-study.dreamitbiz.com | 중급 |
| React 학습 | https://reactstudy.dreamitbiz.com | 중급 |
| HTML 학습 | https://html.dreamitbiz.com | 입문 |
| Web 학습 | https://webstudy.dreamitbiz.com | 고급 |
| 컴퓨팅 사고 | https://koreatech.dreamitbiz.com | 입문 |

### 자격증학습분야 (Certification)
| 사이트 | 설명 | 난이도 |
|--------|------|--------|
| 정보처리기사 | 정보처리기사 이론 및 실기 | 중급 |
| 컴퓨터활용능력 | 컴퓨터활용능력 1·2급 필기/실기 | 입문 |
| SQLD | SQL 개발자 자격증 이론 및 실전 | 중급 |
| 리눅스마스터 | 리눅스마스터 1·2급 이론 및 실습 | 중급 |

## 기술 스택

| 분류 | 기술 |
|------|------|
| Frontend | React 19, Vite 7, React Router 7 |
| Backend | Supabase (Auth + Database) |
| Icons | Font Awesome 6 Free |
| Fonts | Noto Sans KR (Google Fonts) |
| 배포 | GitHub Pages + GitHub Actions |
| 기능 | 다국어(ko/en), 다크모드, 5개 컬러 테마 |

## 프로젝트 구조

```
src/
├── components/       # 공통 컴포넌트 (Navbar, Footer, SEOHead 등)
├── config/
│   └── site.js       # 사이트 설정 (카테고리, 학습사이트, 메뉴)
├── contexts/         # React Context (Auth, Language, Theme)
├── hooks/            # 커스텀 훅 (useAOS, useCountUp)
├── i18n/             # 다국어 번역 파일 (ko, en)
├── pages/            # 페이지 컴포넌트
│   ├── Home.jsx      # 메인 페이지
│   ├── Courses.jsx   # 학습사이트 목록/상세
│   ├── Franchise.jsx # 강사분양 신청
│   └── About.jsx     # 소개 페이지
├── styles/           # CSS 스타일
│   ├── base.css      # 변수, 버튼, 유틸리티
│   ├── site.css      # 페이지별 컴포넌트 스타일
│   ├── hero.css      # 히어로 섹션
│   ├── navbar.css    # 네비게이션
│   └── dark-mode.css # 다크모드 오버라이드
└── utils/            # 유틸리티 (Supabase 클라이언트)
```

## 빠른 시작

```bash
# 의존성 설치
npm install

# 환경변수 설정
cp .env.example .env
# .env 파일에 Supabase 키를 입력하세요

# 개발 서버 시작
npm run dev
```

## 빌드 & 배포

```bash
npm run build    # 프로덕션 빌드
npm run preview  # 빌드 미리보기
```

GitHub `main` 브랜치 push 시 GitHub Actions로 자동 배포됩니다.
