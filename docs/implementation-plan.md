# DreamIT Edu Hub — 종합 구현 계획

## Context
사용자가 요청한 4가지 기능을 구현합니다:
1. **Shop 페이지** — 상품 목록 + 장바구니 연동 (Cart.jsx가 /shop 링크를 참조하지만 페이지가 없음)
2. **관리자 대시보드** — 주문/회원/상품 관리 + 통계
3. **진로컨설팅 카테고리** — 자격증학습 옆에 추가 (맞춤 커리어 사이트 제작 50,000원~, 1:1 코칭, 이력서 코칭)
4. **로그인 필수 링크** — 회원가입 후에만 학습사이트 외부 링크 접속 가능
5. **README.md 재작성** — 기존 백업 후 현행화된 README 작성

기존 인프라(CartContext, productStorage.js, shop.css, Cart/Checkout/Order 페이지 등)를 최대한 활용합니다.

---

## Phase 1: 기반 작업 (Foundation)

### 1-1. AdminGuard 컴포넌트 생성
- **새 파일**: `src/components/AdminGuard.jsx`
- AuthGuard.jsx 패턴 참고 — `isAdmin` 체크 추가, 비관리자는 `/`로 리다이렉트

### 1-2. Admin API 유틸리티 생성
- **새 파일**: `src/utils/adminApi.js`
- `getAllOrders(page, limit, statusFilter)` — 전체 주문 조회 (order_items 조인)
- `getAllMembers(page, limit, searchQuery)` — 전체 회원 조회
- `updateMemberStatus(userId, status, reason)` — 회원 상태 변경
- `getDashboardStats()` — 통계 (주문수, 매출, 회원수, 상품수)

### 1-3. Admin CSS 생성
- **새 파일**: `src/styles/admin.css`
- **수정**: `src/index.css` — `@import './styles/admin.css'` 추가
- 사이드바 레이아웃, 통계 카드, 테이블, 폼, 모달 스타일
- 기존 CSS 변수(`--primary-blue`, `--bg-white` 등) 사용
- 다크모드 `[data-theme="dark"]` 오버라이드 포함

### 1-4. Navbar 관리자 링크 수정
- **수정**: `src/components/layout/Navbar.jsx`
- 외부 `<a href={site.parentSite.url + '/admin'}>` → 내부 `<Link to="/admin">`

---

## Phase 2: Shop 페이지 (/shop)

### 2-1. Shop.jsx 페이지 생성
- **새 파일**: `src/pages/Shop.jsx`
- `productStorage.getProducts()`로 상품 로드
- 카테고리 필터 탭 + 검색 기능
- 상품 카드 그리드 (기존 `.shop-grid`, `.product-card` CSS 활용)
- "장바구니 담기" 버튼 → `CartContext.addItem()`
- 관리자: 수정/삭제/품절전환 버튼 표시
- Pagination 컴포넌트 사용

### 2-2. /shop 라우트 등록
- **수정**: `src/layouts/PublicLayout.jsx`
- `const Shop = lazy(() => import('../pages/Shop'))` 추가
- `<Route path="/shop" element={<Shop />} />` 추가

### 2-3. Shop 번역 키 추가
- **수정**: `src/utils/translations.js`
- `shop.search`, `shop.searchPlaceholder`, `shop.edit`, `shop.delete` 등 (ko/en)

---

## Phase 3: 관리자 대시보드 (/admin/*)

### 3-1. AdminLayout 생성
- **새 파일**: `src/layouts/AdminLayout.jsx`
- AdminGuard로 감싸는 별도 레이아웃 (PublicLayout의 Navbar/Footer 미사용)
- 사이드바: Dashboard, Orders, Members, Products 메뉴
- "사이트로 돌아가기" 링크

### 3-2. App.jsx 라우팅 분리
- **수정**: `src/App.jsx`
- `/admin/*` → AdminLayout (lazy load)
- `*` → PublicLayout (기존)
- Suspense 래퍼 추가

### 3-3. Dashboard 페이지
- **새 파일**: `src/pages/admin/Dashboard.jsx`
- 4개 통계 카드 (총 주문, 매출, 회원수, 상품수)
- `getDashboardStats()` 사용

### 3-4. 주문 관리 페이지
- **새 파일**: `src/pages/admin/Orders.jsx`
- 주문 목록 테이블 + 상태 필터 (paid/pending/cancelled 등)
- 상태 변경 기능 (`updateOrderStatus()` 기존 함수 활용)
- 주문 상세 펼치기 (order_items)
- Pagination 사용

### 3-5. 회원 관리 페이지
- **새 파일**: `src/pages/admin/Members.jsx`
- 회원 목록 + 검색
- 상태 변경 (활성/정지/차단) + 사유 입력 모달

### 3-6. 상품 관리 페이지
- **새 파일**: `src/pages/admin/Products.jsx`
- 상품 목록 테이블 (비활성 포함)
- 수정/삭제/품절전환 기능 (기존 productStorage 함수 활용)

### 3-7. 상품 등록/수정 폼
- **새 파일**: `src/pages/admin/ProductForm.jsx`
- 등록(/admin/products/new) + 수정(/admin/products/edit/:id) 공용
- 필드: slug, category, title, titleEn, description, descriptionEn, price, image(ImageUpload), sortOrder, isSoldOut
- `createProduct()` / `updateProduct()` 사용

---

## Phase 4: 진로컨설팅 카테고리

### 4-1. site.js 설정 추가
- **수정**: `src/config/site.js`
- `categories` 배열에 `{ id: 'career', name: '진로컨설팅', ... }` 추가 (certification 다음)
- `menuItems` 배열에 진로컨설팅 메뉴 + 드롭다운 3개 추가 (자격증학습 다음, 학습사이트분양 앞)
- `footerLinks`에 진로컨설팅 추가
- `learningSites`에 3개 서비스 카드 추가:
  - **맞춤 커리어 사이트 제작** — `isService: true, price: 50000`
  - **1:1 커리어 코칭** — `isService: true, price: 0` (가격 문의)
  - **이력서 & 자기소개서 코칭** — `isService: true, price: 0` (가격 문의)

### 4-2. 번역 키 추가
- **수정**: `src/utils/translations.js`
- `site.nav.career`, `site.nav.careerSite`, `site.nav.careerCoaching`, `site.nav.resumeCoaching`
- `site.home.categoryCareerDesc`
- `site.courses.addToCart`, `site.courses.contactForPrice`, `site.courses.priceFrom`
- `site.courses.categoryTitle['career']`
- 영어 키 동일 추가

### 4-3. Courses.jsx 서비스 카드 지원
- **수정**: `src/pages/Courses.jsx`
- `isService` 플래그 감지 → "장바구니 담기" 또는 "가격 문의" 버튼 표시
- `price > 0`이면 가격 표시 + 장바구니 담기
- `price === 0`이면 가격 문의 (분양 페이지로 이동)
- CartContext의 `addItem()` 연동

### 4-4. Home.jsx 카테고리 설명 추가
- **수정**: `src/pages/Home.jsx`
- `CATEGORY_DESC_KEYS`에 `'career': 'site.home.categoryCareerDesc'` 추가

### 4-5. 서비스 카드 CSS 추가
- **수정**: `src/styles/site.css`
- `.edu-service-purchase` (가격 + 버튼 행)
- `.edu-service-price` (가격 강조)

---

## Phase 5: 로그인 필수 링크 (Login Gate)

### 5-1. Courses.jsx 외부 링크 게이팅
- **수정**: `src/pages/Courses.jsx` (Phase 4-3과 동시 수정)
- 기존 `<a href={ls.url}>` → `<button onClick={handleVisitSite}>`
- `handleVisitSite`: `isLoggedIn` 체크 → 미로그인 시 `/login`으로 리다이렉트 (returnUrl 전달)
- 로그인 상태면 `window.open(url)` 실행

### 5-2. Login.jsx returnUrl 처리
- **수정**: `src/pages/Login.jsx`
- `location.state.returnUrl` 수신
- 이메일 로그인 성공 시 returnUrl이 있으면 `window.open(returnUrl)` 후 페이지 이동
- OAuth 로그인의 경우 state 유실 → sessionStorage에 returnUrl 임시 저장

---

## Phase 6: README.md 재작성

### 6-1. 기존 README 백업
- `README.md` → `README_backup.md`로 복사

### 6-2. README.md 새로 작성
- 프로젝트 소개 (현행 메뉴 구조 반영)
- 현재 카테고리 7개: 교양분야, 인공지능활용, 경영전공, 컴퓨터전공, 코딩학습, 자격증학습, 진로컨설팅
- 학습사이트 목록 현행화 (30개+)
- 기술 스택 업데이트
- 프로젝트 구조 (admin, shop 포함)
- 주요 기능 (다국어, 다크모드, 장바구니, 결제, 관리자)
- 빠른 시작 가이드
- 배포 방법 (GitHub Pages)

---

## 파일 변경 요약

### 새 파일 (11개)
| 파일 | 용도 |
|------|------|
| `src/components/AdminGuard.jsx` | 관리자 라우트 보호 |
| `src/utils/adminApi.js` | 관리자 API 유틸리티 |
| `src/styles/admin.css` | 관리자 스타일 |
| `src/pages/Shop.jsx` | 상품 목록 페이지 |
| `src/layouts/AdminLayout.jsx` | 관리자 레이아웃 |
| `src/pages/admin/Dashboard.jsx` | 대시보드 |
| `src/pages/admin/Orders.jsx` | 주문 관리 |
| `src/pages/admin/Members.jsx` | 회원 관리 |
| `src/pages/admin/Products.jsx` | 상품 관리 |
| `src/pages/admin/ProductForm.jsx` | 상품 등록/수정 폼 |
| `README_backup.md` | 기존 README 백업 |

### 수정 파일 (11개)
| 파일 | 변경 내용 |
|------|----------|
| `src/App.jsx` | `/admin/*` 라우트 분리 |
| `src/layouts/PublicLayout.jsx` | `/shop` 라우트 추가 |
| `src/config/site.js` | career 카테고리, 메뉴, 푸터, 3개 서비스 카드 |
| `src/utils/translations.js` | career, shop, admin 번역 키 (ko/en) |
| `src/pages/Courses.jsx` | 서비스 카드 + 로그인 게이트 |
| `src/pages/Home.jsx` | career 카테고리 설명 키 |
| `src/pages/Login.jsx` | returnUrl 처리 |
| `src/components/layout/Navbar.jsx` | 관리자 Link 내부화 |
| `src/index.css` | admin.css import |
| `src/styles/site.css` | 서비스 구매 CSS |
| `README.md` | 전면 재작성 |

---

## 구현 순서

1. **Phase 1** (기반) → Phase 2 (Shop) — 장바구니/상품 기능 완성
2. **Phase 4** (진로컨설팅) + **Phase 5** (로그인 게이트) — Courses.jsx 한 번에 수정
3. **Phase 3** (관리자) — 가장 큰 범위, 순차 구현
4. **Phase 6** (README) — 모든 기능 완성 후 작성

---

## 검증 방법

1. `npm run dev` — 개발 서버에서 전체 기능 테스트
2. `/shop` 접속 → 상품 목록 표시, 장바구니 담기, `/cart`로 이동 확인
3. `/courses/career` 접속 → 3개 서비스 카드 표시, 가격/장바구니 버튼 확인
4. 비로그인 상태에서 학습사이트 "사이트 방문하기" 클릭 → `/login`으로 이동 확인
5. 로그인 후 다시 클릭 → 외부 사이트 새 탭 열림 확인
6. `/admin` 접속 (관리자 계정) → 대시보드/주문/회원/상품 관리 테스트
7. 비관리자 `/admin` 접속 → `/`로 리다이렉트 확인
8. `npm run build` → 빌드 성공 확인
