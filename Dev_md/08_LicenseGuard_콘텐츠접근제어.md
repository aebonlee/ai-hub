# LicenseGuard 콘텐츠 접근 제어 시스템

## 개요

AI Hub에서 판매하는 11개 AI 학습 사이트에 대해 콘텐츠 접근 제어를 구현.
개인 학습자 대상 평생 1회 결제 후 콘텐츠 이용 가능.

### 접근 제어 규칙
- **첫 방문** (사이트별): 모든 콘텐츠 무료 공개 (전체 체험)
- **재방문 이후**: 1~2개 무료 페이지만 접근 가능, 나머지 잠금 + 구매 유도
- **유료 회원**: 평생 무제한 접근 (1회 결제)

### 가격 체계

| 유형 | 가격 | 설명 |
|------|------|------|
| 개별 사이트 | 30,000원 | 사이트 1개 평생 이용 |
| 전체 번들 | 150,000원 | 11개 사이트 평생 이용 (~55% 할인) |

### 기술 기반
- 11개 사이트 모두 동일 Supabase 인스턴스 공유
- `user_profiles` 테이블 공유, Google/Kakao OAuth 공유
- 첫 방문 추적: localStorage (사이트별)
- 라이선스 확인: Supabase RPC 함수

---

## Phase 1: Supabase 테이블 & 함수

### `user_licenses` 테이블
- user_id, license_type(single/bundle), site_slug, order_id, created_at
- RLS: 자신의 라이선스만 조회 가능

### `grant_license` RPC (SECURITY DEFINER)
- 결제 완료 후 호출, 주문 소유자/결제 상태 검증 후 라이선스 생성

### `check_user_license` RPC
- (user_id, site_slug) → boolean 반환
- single 또는 bundle 라이선스 중 하나라도 있으면 true

### `ah_products`에 `license_site_slug` 컬럼 추가

### 12개 상품 데이터
- 11개 개별 사이트 상품 (각 30,000원)
- 1개 번들 상품 (150,000원)

---

## Phase 2: AI Hub 수정

### 수정 파일
- `src/utils/supabase.js` — grantLicense(), getUserLicenses() 추가
- `src/utils/productStorage.js` — license_site_slug 필드 매핑
- `src/pages/Checkout.tsx` — 결제 성공 후 grantLicense() 호출
- `src/pages/MyPage.tsx` — 이용권 현황 섹션 추가

---

## Phase 3: 공유 컴포넌트 3개

### `LicenseGuard.tsx`
- LicenseProvider (Context Provider)
- useLicense() hook
- 첫 방문 체크: localStorage
- 라이선스 체크: Supabase RPC (10분 캐시)
- 잠금 판단: currentRouteIsLocked

### `LockOverlay.tsx`
- 자물쇠 아이콘 + 유료 콘텐츠 안내
- 로그인/구매 버튼
- 가격 안내: "개별 30,000원 | 전체 150,000원"

### `license-lock.css`
- 반투명 배경 + blur 효과
- 중앙 카드 UI, 다크모드 지원

---

## Phase 4: 11개 학습 사이트 적용

### 사이트별 수정
- 신규: LicenseGuard.tsx, LockOverlay.tsx, license-lock.css, license.ts
- 수정: PublicLayout.tsx (LicenseProvider 래핑 + LockOverlay 추가)

### 사이트 패턴

| 패턴 | 사이트 | PublicLayout 위치 |
|------|--------|-------------------|
| A (Static) | chatgpt, gemini, genspark, claude, openclaw, aI-agents, ai-media | src/layouts/ |
| B (Lesson) | autowork, fine-tuning | src/layouts/ |
| C (Outlet) | ai-data, ai-prompt | src/components/ |

### 사이트별 무료 페이지
- chatgpt: /chatgpt-basics
- gemini: /gemini-learn, /gemini-models
- autowork: /lessons, /lessons/:cat (목록만 무료)
- ai-data: /intro/what-is-data-analysis, /intro/python-basics
- 공통 무료: /, /login, /register, /forgot-password, /community/*

---

## Phase 5: 빌드 & 배포
각 사이트별 tsc → build → commit & push → gh-pages deploy
