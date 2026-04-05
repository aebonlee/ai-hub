# DreamIT Edu Hub — 공지사항 & Q&A 게시판 구현

## 개발일지

**작성일:** 2026-03-17
**작업 유형:** 기능 구현 (Supabase CRUD 게시판)
**상태:** 완료

---

## 1. 변경 개요

기존 `/notice`, `/qna` 페이지는 "곧 오픈" placeholder 상태였으며,
이번 작업에서 Supabase 테이블 연동 실제 CRUD 게시판으로 전면 개편하였습니다.

### 1.1 공지사항 (Notice)
- **목록 페이지**: 페이지네이션 (10건/페이지), 고정글(📌) 상단 표시
- **상세 페이지**: board-detail CSS 재사용, 조회수 자동 증가
- **작성/수정 페이지**: 관리자 전용, 한국어+영문 제목/내용, 상단고정 옵션
- 관리자만 글쓰기/수정/삭제 가능

### 1.2 Q&A
- **목록 페이지**: 필터 탭 (전체/답변완료/미답변), 상태 뱃지, 카테고리 태그
- **상세 페이지**: board-detail CSS 재사용, CommentSection 연동 (postType='qna')
- **작성/수정 페이지**: 로그인 필수, 카테고리 선택 (일반/기술/강좌/계정)
- 답변 추가/삭제 시 answer_count 자동 동기화, is_answered 자동 갱신
- 작성자 또는 관리자가 수정/삭제 가능

---

## 2. Supabase 테이블

### notices
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | bigint (auto) | PK |
| title | text | 제목 |
| title_en | text | 영문 제목 |
| content | text | 내용 |
| content_en | text | 영문 내용 |
| is_pinned | boolean | 상단 고정 |
| author_id | uuid | 작성자 ID |
| author_name | text | 작성자명 |
| view_count | integer | 조회수 |
| created_at | timestamptz | 생성일 |
| updated_at | timestamptz | 수정일 |

### qna_posts
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | bigint (auto) | PK |
| title | text | 제목 |
| content | text | 내용 |
| category | text | 카테고리 (general/tech/course/account) |
| author_id | uuid | 작성자 ID |
| author_name | text | 작성자명 |
| is_answered | boolean | 답변 여부 |
| answer_count | integer | 답변 수 |
| view_count | integer | 조회수 |
| created_at | timestamptz | 생성일 |
| updated_at | timestamptz | 수정일 |

Q&A 답변은 기존 `comments` 테이블 재사용 (`post_type = 'qna'`).

RLS 정책: SELECT는 전체 공개, INSERT/UPDATE/DELETE는 인증 + 작성자 본인만.

---

## 3. 파일 변경 내역

### 신규 파일 (8개)

| 파일 | 설명 |
|------|------|
| `src/utils/noticeStorage.js` | notices CRUD (getNotices, getNotice, createNotice, updateNotice, deleteNotice) |
| `src/utils/qnaStorage.js` | qna_posts CRUD + syncAnswerCount |
| `src/pages/Notice.jsx` | 공지 목록 (테이블, 페이지네이션, 고정글, 관리자 버튼) |
| `src/pages/NoticeDetail.jsx` | 공지 상세 (조회수 증가, 수정/삭제) |
| `src/pages/NoticeWrite.jsx` | 공지 작성/수정 (관리자 전용, i18n 필드) |
| `src/pages/QnA.jsx` | Q&A 목록 (필터탭, 상태 뱃지, 카테고리 태그) |
| `src/pages/QnADetail.jsx` | Q&A 상세 + CommentSection 답변 연동 |
| `src/pages/QnAWrite.jsx` | Q&A 작성/수정 (로그인 필수, 카테고리 선택) |

### 문서 파일 (2개)

| 파일 | 설명 |
|------|------|
| `docs/notice-qna-plan.md` | 구현 계획서 |
| `docs/notice-qna.sql` | Supabase SQL 스크립트 |

### 수정 파일 (4개)

| 파일 | 변경 내용 |
|------|-----------|
| `src/layouts/PublicLayout.jsx` | 6개 lazy import 추가 + 6개 Route 추가 (/notice/write, /notice/:id, /qna/write, /qna/:id 등) |
| `src/utils/translations.js` | site.notice.* ~25키 + site.qna.* ~30키 (ko/en) 추가 |
| `src/components/CommentSection.jsx` | `titleOverride`, `onCommentAdded`, `onCommentDeleted` optional props 추가 |
| `src/styles/site.css` | `.edu-board-*` 테이블/필터/뱃지/빈상태/고정글/다크모드/반응형 CSS 추가 (~230줄) |

---

## 4. CSS 구조 (`.edu-board-*` prefix)

| 클래스 | 용도 |
|--------|------|
| `.edu-board-section` | 섹션 패딩 |
| `.edu-board-toolbar` | 필터+버튼 flex row |
| `.edu-board-filter-btn` / `.active` | 필터 탭 (gallery-filter-btn 패턴) |
| `.edu-board-table` / `th` / `td` | 게시판 테이블 |
| `.col-number/status/title/author/date/views/answers` | 컬럼 너비 |
| `.edu-board-title-link` | 제목 링크 |
| `.edu-board-pinned` / `.edu-board-pinned-icon` | 고정글 |
| `.edu-board-status.answered/unanswered` | 상태 뱃지 |
| `.edu-board-category-tag` | 카테고리 인라인 태그 |
| `.edu-board-empty` / `.edu-board-empty-icon` | 빈 상태 |

다크모드: `[data-theme="dark"] .edu-board-*` 전체 대응
반응형: 768px에서 작성자/조회 숨김, 480px에서 답변수 숨김

---

## 5. 라우트 구조

```
/notice/write → NoticeWrite (lazy) — 관리자 전용
/notice/:id   → NoticeDetail (lazy)
/notice       → Notice (lazy)
/qna/write    → QnAWrite (lazy) — 로그인 필수
/qna/:id      → QnADetail (lazy)
/qna          → QnA (lazy)
```

`/write` 라우트가 `/:id`보다 먼저 매칭되도록 순서 배치.

---

## 6. 빌드 결과

`npm run build` 성공 — 에러/경고 없음.
