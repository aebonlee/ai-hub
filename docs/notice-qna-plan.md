# Plan: 공지사항 & Q&A 게시판 — Supabase 연동

## Context
현재 `/notice`, `/qna` 페이지는 "곧 오픈" placeholder 상태.
Supabase 테이블 생성 후 실제 CRUD 게시판으로 구현한다.
기존 `community.css`의 `board-detail`, `board-write`, `board-btn`, `pagination`, `comment-section` 스타일을 **재사용**.

---

## Supabase SQL

`docs/notice-qna.sql` 파일 참조.

---

## 파일 목록 (신규 8개 + 수정 4개 = 12개)

### 신규 파일

| # | 파일 | 설명 |
|---|------|------|
| 1 | `src/utils/noticeStorage.js` | notices CRUD — `commentStorage.js` 패턴 (toCamel, getSupabase) |
| 2 | `src/utils/qnaStorage.js` | qna_posts CRUD + answer_count 동기화 |
| 3 | `src/pages/Notice.jsx` | 게시판 목록 (페이지네이션, 고정글 상단, 관리자 글쓰기 버튼) |
| 4 | `src/pages/NoticeDetail.jsx` | 공지 상세 — `board-detail` CSS 재사용 |
| 5 | `src/pages/NoticeWrite.jsx` | 공지 작성/수정 — `board-write` CSS 재사용, 관리자 전용 |
| 6 | `src/pages/QnA.jsx` | 질문 목록 (필터탭, 페이지네이션) |
| 7 | `src/pages/QnADetail.jsx` | 질문 상세 + `CommentSection(postType='qna')` 답변 |
| 8 | `src/pages/QnAWrite.jsx` | 질문 작성/수정, 로그인 필수 |

### 수정 파일

| # | 파일 | 변경 |
|---|------|------|
| 9 | `src/layouts/PublicLayout.jsx` | 6개 lazy import + Route 추가 |
| 10 | `src/utils/translations.js` | `site.notice.*` ~25키 + `site.qna.*` ~30키 (ko/en) |
| 11 | `src/components/CommentSection.jsx` | `onCommentAdded`, `onCommentDeleted`, `titleOverride` optional props 추가 |
| 12 | `src/styles/site.css` | `.edu-board-*` 테이블/필터/빈상태/핀 스타일 + 다크모드 + 반응형 |

---

## 라우트 순서 (PublicLayout.jsx)

```
/notice/write → NoticeWrite (lazy)
/notice/:id   → NoticeDetail (lazy)
/notice       → Notice (lazy)
/qna/write    → QnAWrite (lazy)
/qna/:id      → QnADetail (lazy)
/qna          → QnA (lazy)
```

---

## 검증
1. 공지사항: 관리자 작성 → 목록 → 상세 → 수정/삭제
2. Q&A: 로그인 → 질문 → 목록 → 상세 → 답변(댓글) → 답변수 반영
3. 고정글 상단 표시
4. 필터(전체/답변완료/미답변) 동작
5. 페이지네이션 동작
6. 다크모드/모바일(768px) 정상
7. 비로그인 → 글쓰기 리다이렉트
8. `npm run build` 성공
