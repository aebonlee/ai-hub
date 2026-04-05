# DreamIT Edu Hub — GitHub Actions 환경변수 주입

## 개발일지

**작성일:** 2026-03-18
**작업 유형:** 배포 수정 (GitHub Actions)
**상태:** 완료

---

## 문제

배포된 사이트에서 "Supabase not configured" 오류 발생.
`.env` 파일이 `.gitignore`에 포함되어 있어 GitHub Actions 빌드 시 환경변수가 누락됨.

## 해결

`.github/workflows/deploy.yml`의 빌드 단계에 GitHub Secrets를 환경변수로 주입.

### 변경 파일

| 파일 | 변경 내용 |
|------|-----------|
| `.github/workflows/deploy.yml` | `npm run build` 단계에 `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_SITE_URL` 환경변수 추가 |

### 변경 내용 (deploy.yml)

```yaml
- run: npm run build
  env:
    VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
    VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
    VITE_SITE_URL: ${{ secrets.VITE_SITE_URL }}
```

### 사용자 수동 작업

GitHub 리포지토리 Settings → Secrets and variables → Actions에서 3개 시크릿 등록 완료.
