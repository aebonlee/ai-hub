# DreamIT Edu Hub — 메뉴 페이지 디자인 개선

## 개발일지

**작성일:** 2026-03-15
**작업 유형:** UI/UX 디자인 개선 + AOS 애니메이션 적용
**상태:** 완료

---

## 1. 변경 개요

Courses, Franchise, About 3개 메뉴 페이지와 Home CTA 섹션의 디자인이 미완성 상태였습니다.
- `.page-header` 기본 CSS 정의가 누락되어 배경/패딩/타이포가 적용되지 않음
- `.cta-section` / `.cta-content` 기본 CSS 정의 누락
- 메뉴 페이지에 AOS(Animate On Scroll) 애니메이션 미적용 (Cart/Checkout에만 있었음)

**기능 변경 없이** CSS 추가 + `data-aos` 속성 추가만으로 개선하였습니다.

---

## 2. 수정 파일 (5개)

### 2.1 `src/styles/site.css` — page-header + cta-section 정의 추가

#### `.page-header` (신규 정의)
```css
.page-header {
  background: var(--hero-bg);
  padding: calc(var(--nav-height) + 56px) 0 48px;
  text-align: center;
  position: relative;
  overflow: hidden;
}
```
- 그라디언트 배경 (`var(--hero-bg)`) 적용으로 히어로와 통일감
- nav 높이를 고려한 상단 패딩 계산
- h1/h2: 36px, 600 weight, 흰색, letter-spacing -0.02em
- p: 17px, rgba(255,255,255,0.75), max-width 560px, 300 weight

#### `.cta-section` + `.cta-content` (신규 정의)
```css
.cta-section {
  background: var(--hero-bg);
  padding: 72px 0;
  position: relative;
  overflow: hidden;
}
```
- 히어로와 동일한 그라디언트 배경
- h2: 34px, 600 weight, 흰색
- p: 17px, rgba(255,255,255,0.75), max-width 600px, 자동 가운데 정렬

#### 반응형 (768px 이하)
- `.page-header`: padding 축소, h2 28px, p 15px
- `.cta-section`: padding 56px, h2 26px

---

### 2.2 `src/pages/Courses.jsx` — AOS 추가

- `import useAOS` + `useAOS()` 호출
- 카테고리 섹션(`.edu-category-section`)에 `data-aos="fade-up"`
- 개별 코스 카드에 `data-aos="fade-up"` + `data-aos-delay={idx * 100}` 시차 적용

---

### 2.3 `src/pages/Franchise.jsx` — AOS 추가

- `import useAOS` + `useAOS()` 호출
- Benefits 카드 4개에 `data-aos="fade-up"` + `data-aos-delay={i * 100}` 시차
- 폼 섹션(`.edu-form-section`)에 `data-aos="fade-up"`

---

### 2.4 `src/pages/About.jsx` — AOS 추가

- `import useAOS` + `useAOS()` 호출
- Mission 카드 2개: `data-aos="fade-up"` + delay 0/100
- Value 카드 4개: `data-aos="fade-up"` + `data-aos-delay={i * 100}`
- Team 카드 3개: `data-aos="fade-up"` + delay 0/100/200

---

### 2.5 `src/pages/Home.jsx` — CTA + 카테고리에 AOS 추가

- `import useAOS` + `useAOS()` 호출
- 카테고리 카드 4개에 `data-aos="fade-up"` + `data-aos-delay={idx * 100}`
- CTA 섹션에 `data-aos="fade-up"`

---

## 3. 변경 요약표

| 파일 | 변경 내용 |
|------|-----------|
| `src/styles/site.css` | `.page-header`, `.cta-section`, `.cta-content` CSS 정의 + 반응형 |
| `src/pages/Courses.jsx` | useAOS import/호출, 카테고리/카드 `data-aos` 추가 |
| `src/pages/Franchise.jsx` | useAOS import/호출, 혜택카드/폼 `data-aos` 추가 |
| `src/pages/About.jsx` | useAOS import/호출, 미션/가치/팀 카드 `data-aos` 추가 |
| `src/pages/Home.jsx` | useAOS import/호출, 카테고리카드/CTA `data-aos` 추가 |

---

## 4. AOS 애니메이션 패턴

모든 페이지에 동일한 패턴 적용:
- **효과**: `fade-up` (아래에서 위로 페이드인)
- **시차(stagger)**: 카드 인덱스 × 100ms (`data-aos-delay`)
- **적용 범위**: 카드 그리드 요소 + 주요 섹션

이는 기존 Cart/Checkout 페이지에서 사용하던 `useAOS` 훅과 동일한 패턴입니다.

---

## 5. 빌드 검증

```
npm run build → vite v7.3.1 building...
✓ 114 modules transformed
✓ built in 2.39s
```

에러 없이 빌드 성공.
