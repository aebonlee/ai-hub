# AI Hub 회원 관리

> 작성일: 2026-04-07

## 개요
관리자 페이지(/admin/members)에서 전체 회원을 조회하고 이용기간을 관리한다.

## 기능
- 회원 목록: 이름, 이메일, 가입일, 최근 로그인, 상태 표시
- 검색: 이름 또는 이메일로 검색
- 페이지네이션: 20명 단위
- 기간종료: 버튼 클릭 → confirm → 즉시 `expired` 상태로 변경

## 상태 라벨
| DB 값 | 표시 라벨 |
|--------|----------|
| active | 비활성 |
| suspended | 정지 |
| banned | 차단 |
| deleted | 탈퇴 |
| expired | 기간종료 |

## 변경 이력
- 2026-04-07: "상태 변경" 버튼 → "기간종료" 버튼으로 변경
- 2026-04-07: "활성" 라벨 → "비활성" 변경
- 2026-04-07: 모달 팝업 제거 → confirm 대화상자로 즉시 처리

## 관련 파일
- `src/pages/admin/Members.tsx` — 회원 관리 페이지
- `src/utils/adminApi.ts` — `getAllMembers()`, `updateMemberStatus()` API
