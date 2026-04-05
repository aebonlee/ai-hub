# DreamIT Edu Hub — 나를 찾는 여행 - 나의 진로 사이트 추가

## 개발일지

**작성일:** 2026-03-18
**작업 유형:** 기능 추가 (학습사이트)
**상태:** 완료

---

## 변경 내용

진로컨설팅 카테고리에 "나를 찾는 여행 - 나의 진로" 학습사이트 박스 추가.

### 사이트 정보

| 항목 | 내용 |
|------|------|
| ID | `career-journey` |
| 이름 | 나를 찾는 여행 - 나의 진로 |
| URL | https://career.dreamitbiz.com/ |
| 카테고리 | 진로컨설팅 (career) |
| 난이도 | 입문 |

### 주요 내용

- 자기 탐색을 통한 진로 발견
- 적성, 흥미, 가치관 분석
- **이력서 작성법과 실전 작성**
- **자기소개서 작성 전략**
- 취업 준비 종합 점검

### 변경 파일

| 파일 | 변경 내용 |
|------|-----------|
| `src/config/site.js` | `learningSites`에 career-journey 사이트 데이터 추가 (진로컨설팅 첫 번째 항목) |
| `src/config/site.js` | 진로컨설팅 네비게이션 드롭다운에 careerJourney 항목 추가 |
| `src/utils/translations.js` | `site.nav.careerJourney` ko/en 번역 키 추가 |
