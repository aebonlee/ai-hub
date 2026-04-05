# DreamIT Edu Hub — 프로그래밍 코딩학습 메뉴 개편 + AI·SW개론 추가

## 개발일지

**작성일:** 2026-03-18
**작업 유형:** 기능 변경 + 추가
**상태:** 완료

---

## 변경 내용 (3건)

### 1. 코딩학습 메뉴 외부 링크 버그 수정

네비게이션 드롭다운에서 "코딩 학습" 항목이 외부 사이트(`https://coding.dreamitbiz.com/`)로 직접 연결되던 버그 수정.

| 항목 | 변경 전 | 변경 후 |
|------|---------|---------|
| 경로 | `https://coding.dreamitbiz.com/` (external: true) | `/courses/coding-learn` (내부 라우트) |

### 2. 코딩학습 → 프로그래밍 코딩학습 메뉴명 변경

| 항목 | 변경 전 | 변경 후 |
|------|---------|---------|
| 카테고리명 (ko) | 코딩학습 | 프로그래밍 코딩학습 |
| 카테고리명 (en) | Coding | Programming & Coding |
| 카테고리 설명 (ko) | HTML, Web, React 등 실무 코딩 역량 | C·JAVA·Python 문법과 HTML, Web, React 등 실무 프로그래밍 역량 |

### 3. 교양분야에 AI·SW개론 박스 추가

| 항목 | 내용 |
|------|------|
| ID | `ai-sw-intro` |
| 이름 | AI·SW개론 |
| URL | # (준비중) |
| 카테고리 | 교양분야 (liberal-arts) |
| 난이도 | 입문 |
| 아이콘 | fa-solid fa-microchip |

**커리큘럼:** AI 이해/역사, 머신러닝·딥러닝 기초, SW 개발 프로세스, AI 윤리, SW 기초 실습

### 변경 파일

| 파일 | 변경 내용 |
|------|-----------|
| `src/config/site.js` | 카테고리명 변경, 코딩 메뉴 내부 라우트 전환, AI·SW개론 사이트 데이터 + 드롭다운 추가 |
| `src/utils/translations.js` | coding 카테고리명/설명 ko/en 변경, aiSwIntro 번역 키 추가 |
