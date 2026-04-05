# DreamIT Edu Hub — 전체 페이지 로그인 필수 적용

## 개발일지

**작성일:** 2026-03-18
**작업 유형:** 기능 변경 (접근 제어)
**상태:** 완료

---

## 변경 내용

모든 페이지의 웹 접근을 로그인 후에만 가능하도록 변경.

### 변경 전

- `/`, `/courses`, `/about`, `/notice`, `/qna` 등 일부 페이지는 로그인 없이 접근 가능
- 외부 학습사이트 링크만 로그인 게이트 적용

### 변경 후

- **로그인 없이 접근 가능:** `/login`, `/register`, `/forgot-password` (3개)
- **로그인 필수:** 그 외 모든 페이지 (`/`, `/courses/*`, `/about`, `/notice/*`, `/qna/*`, `/shop`, `/cart`, `/checkout` 등)

### 변경 파일

| 파일 | 변경 내용 |
|------|-----------|
| `src/layouts/PublicLayout.jsx` | 모든 라우트에 `<AuthGuard>` 래핑 (인증 3개 페이지 제외) |

### 핵심 코드

```jsx
<Routes>
  {/* Auth — 로그인 없이 접근 가능 */}
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/forgot-password" element={<ForgotPassword />} />

  {/* 로그인 필수 — 모든 페이지 */}
  <Route path="/" element={<AuthGuard><Home /></AuthGuard>} />
  <Route path="/courses" element={<AuthGuard><Courses /></AuthGuard>} />
  {/* ... 나머지 모든 라우트 AuthGuard 적용 ... */}
</Routes>
```
