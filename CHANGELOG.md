# Changelog

## [2026-03-26] 약점 보완: Storage 통합 + 테스트 인프라 + 타입 체크

### 3-A. Storage 유틸 통합

#### 문제
4개 파일(`commentStorage.js`, `noticeStorage.js`, `qnaStorage.js`, `searchStorage.js`)에 동일한 `toCamelKey()`/`toCamel()` 함수가 중복 정의되어 있었음.

#### 해결
- **신규 파일**: `src/utils/dbHelpers.js` — 공통 헬퍼 추출
  - `toCamelKey(key)` — snake_case → camelCase 변환
  - `toCamel(row)` — DB row 객체 전체 키 변환
  - `getClient()` — Supabase 클라이언트 (미설정 시 throw)
  - `safeClient()` — Supabase 클라이언트 (미설정 시 null)
- **수정 파일 (4개)**: 로컬 `toCamelKey`/`toCamel` 제거, `dbHelpers`에서 import
  - `commentStorage.js`
  - `noticeStorage.js`
  - `qnaStorage.js`
  - `searchStorage.js`
- `productStorage.js`와 `storage.js`는 다른 변환 패턴 사용 — 그대로 유지

### 3-B. 테스트 인프라 구축

#### 이전 상태
- 테스트 파일 0개
- vitest/jest 미설치
- package.json에 test 스크립트 없음

#### 수정 내용
1. **테스트 도구 설치**: `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`
2. **vitest 설정**: `vite.config.js`에 `test` 블록 추가 (globals, jsdom, setup file)
3. **테스트 setup**: `src/test/setup.js` (`@testing-library/jest-dom` import)
4. **package.json**: `"test": "vitest run"`, `"test:watch": "vitest"` 스크립트 추가
5. **테스트 5개 파일 (26개 테스트)**:
   - `src/utils/__tests__/dbHelpers.test.js` — toCamelKey/toCamel 변환 (8 tests)
   - `src/contexts/__tests__/CartContext.test.jsx` — 장바구니 추가/삭제/수량변경/품절 (7 tests)
   - `src/contexts/__tests__/ThemeContext.test.jsx` — 테마 모드 토글, DOM 속성 설정 (4 tests)
   - `src/contexts/__tests__/LanguageContext.test.jsx` — 언어 전환, t() 함수, fallback (4 tests)
   - `src/components/__tests__/AuthGuard.test.jsx` — 로딩, 인증, 리다이렉트 (3 tests)

### 3-C. jsconfig.json (경량 타입 체크)

- `jsconfig.json` 생성: `checkJs: true`, `jsx: react-jsx`, `baseUrl: src`
- JSDoc `@param`/`@returns` 타입 주석을 `dbHelpers.js`에 추가
- 전체 TS 전환 대신 JSDoc 기반 경량 접근 채택

### 검증
- `npm run test` — 5개 파일, 26개 테스트 모두 통과
- `npm run build` — 빌드 성공, import 깨짐 없음
