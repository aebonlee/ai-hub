# DreamIT Edu Hub — 5개 학습사이트 추가

## 개발일지

**작성일:** 2026-03-23
**작업 유형:** 학습사이트 추가
**상태:** 완료

---

## 변경 사유

교양분야에 실용 일본어·실용 중국어, 코딩학습에 자바 마스터·파이썬 마스터, 인공지능활용에 Open Claw 총 5개 학습사이트를 추가하여 커리큘럼을 확대한다.

## 변경 내용

### 추가된 학습사이트

| 카테고리 | 사이트명 | ID | URL |
|---------|---------|-----|-----|
| 교양분야 (liberal-arts) | 실용 일본어 | `japanese` | `#` (준비중) |
| 교양분야 (liberal-arts) | 실용 중국어 | `chinese` | `#` (준비중) |
| 인공지능활용 (ai) | Open Claw | `open-claw` | `#` (준비중) |
| 프로그래밍 코딩학습 (coding) | 자바 마스터 | `java-master` | `https://java-study.dreamitbiz.com/` |
| 프로그래밍 코딩학습 (coding) | 파이썬 마스터 | `python-master` | `https://python-study.dreamitbiz.com/` |

### 수정 파일

| 파일 | 변경 내용 |
|------|----------|
| `src/config/site.js` | menuItems 드롭다운에 5개 메뉴 추가, learningSites 배열에 5개 사이트 객체 추가 |
| `src/utils/translations.js` | 한국어·영어 nav 키 5개씩 추가 (`japanese`, `chinese`, `openClaw`, `javaMaster`, `pythonMaster`) |

### Navbar 드롭다운 변경

- **교양분야**: 실용 영어 다음에 `실용 일본어`, `실용 중국어` 추가
- **인공지능활용**: AI 이미지 생성 다음에 `Open Claw` 추가
- **프로그래밍 코딩학습**: 프로그래밍 코딩학습 다음에 `자바 마스터`, `파이썬 마스터` 추가

## 검증

- `npm run dev` 로컬 실행 후 navbar 드롭다운에 새 메뉴 5개 표시 확인
- `/courses/liberal-arts` 페이지에서 일본어·중국어 카드 렌더링 확인
- `/courses/ai` 페이지에서 Open Claw 카드 렌더링 확인
- `/courses/coding` 페이지에서 자바 마스터·파이썬 마스터 카드 렌더링 확인
