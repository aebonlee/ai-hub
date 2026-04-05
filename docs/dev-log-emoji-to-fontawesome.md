# DreamIT Edu Hub — 이모지 → Font Awesome 아이콘 교체

## 개발일지

**작성일:** 2026-03-15
**작업 유형:** UI/UX 디자인 품질 개선 (아이콘 시스템 교체)
**상태:** 완료

---

## 1. 변경 개요

사이트 전체에 컬러 이모지(📚💼💻 등 38개)가 아이콘으로 사용되어 "AI가 만든 성의 없는 사이트" 느낌을 주고 있었습니다.
모든 이모지를 **Font Awesome 6 Free** 아이콘 폰트로 교체하고, 아이콘 컨테이너(배경 원형/라운드 박스)를 추가하여 전문적인 디자인으로 개선하였습니다.

### 개선 효과
- 컬러 이모지 → 단색 벡터 아이콘으로 시각적 통일감 확보
- 원형/라운드 컨테이너 배경으로 디자인 완성도 향상
- hover 시 scale 애니메이션으로 인터랙션 추가
- 다크모드/5가지 컬러 테마에서 아이콘 색상 자동 대응

---

## 2. 수정 파일 (8개)

### 2.1 `index.html` — Font Awesome CDN 추가
- Google Fonts `<link>` 뒤에 Font Awesome 6.5.1 CDN 1줄 추가
- SRI(integrity) 해시 포함으로 보안 보장

### 2.2 `src/config/site.js` — 이모지 → FA 클래스 문자열 (24개)

**카테고리 (4개):**

| 이전 | 이후 | 과목 |
|------|------|------|
| 📚 | `fa-solid fa-book-open` | 교양분야 |
| 💼 | `fa-solid fa-briefcase` | 경영전공 |
| 💻 | `fa-solid fa-laptop-code` | 컴퓨터전공 |
| 🏆 | `fa-solid fa-award` | 자격증학습 |

**학습사이트 (20개):**

| 이전 | 이후 | 사이트 |
|------|------|--------|
| 📊 | `fa-solid fa-chart-bar` | 통계학 기초 |
| 🌍 | `fa-solid fa-globe` | 실용 영어 |
| ✍️ | `fa-solid fa-pen-fancy` | 글쓰기와 소통 |
| 🎤 | `fa-solid fa-microphone` | 프레젠테이션 |
| 🧮 | `fa-solid fa-calculator` | 회계학 원리 |
| 🏢 | `fa-solid fa-building` | 경영전략론 |
| 💰 | `fa-solid fa-coins` | 재무관리 |
| 📈 | `fa-solid fa-chart-line` | 마케팅개론 |
| 🌟 | `fa-solid fa-star` | 셀프 브랜딩 |
| 🎨 | `fa-solid fa-palette` | 고객경험디자인 |
| 🚀 | `fa-solid fa-rocket` | 디지털비즈니스 |
| 🗄️ | `fa-solid fa-database` | DB 학습 |
| ⚛️ | `fa-brands fa-react` | React 학습 |
| 📄 | `fa-brands fa-html5` | HTML 학습 |
| 🌐 | `fa-solid fa-code` | Web 학습 |
| 🧠 | `fa-solid fa-brain` | 컴퓨팅 사고 |
| 📋 | `fa-solid fa-clipboard-list` | 정보처리기사 |
| 🖥️ | `fa-solid fa-desktop` | 컴퓨터활용능력 |
| 🔍 | `fa-solid fa-magnifying-glass-chart` | SQLD |
| 🐧 | `fa-brands fa-linux` | 리눅스마스터 |

### 2.3 `src/pages/About.jsx` — 하드코딩 이모지 교체 (9개)

| 위치 | 이전 | 이후 |
|------|------|------|
| Mission | 🎓 | `fa-solid fa-graduation-cap` |
| Vision | 🔭 | `fa-solid fa-binoculars` |
| Value 1 | 🎯 | `fa-solid fa-bullseye` |
| Value 2 | 🌍 | `fa-solid fa-earth-americas` |
| Value 3 | 🚀 | `fa-solid fa-rocket` |
| Value 4 | 🤝 | `fa-solid fa-handshake` |
| Team CEO | 👩‍💼 | `fa-solid fa-user-tie` |
| Team 교육 | 👨‍💻 | `fa-solid fa-chalkboard-user` |
| Team 기술 | 👩‍🔧 | `fa-solid fa-screwdriver-wrench` |

렌더링: `<div className="edu-mission-icon">🎓</div>` → `<div className="edu-mission-icon"><i className="fa-solid fa-graduation-cap"></i></div>`

### 2.4 `src/pages/Franchise.jsx` — 하드코딩 이모지 교체 (5개)

| 위치 | 이전 | 이후 |
|------|------|------|
| Benefit 1 | 📚 | `fa-solid fa-book-open` |
| Benefit 2 | 💰 | `fa-solid fa-coins` |
| Benefit 3 | 🛠️ | `fa-solid fa-wrench` |
| Benefit 4 | 🤝 | `fa-solid fa-handshake` |
| Success | ✅ | `fa-solid fa-circle-check` |

### 2.5 `src/pages/Courses.jsx` — 렌더링 패턴 변경
- `{cat.icon}` → `<i className={cat.icon}></i>`
- `{ls.icon}` → `<i className={ls.icon}></i>` + `style={{ color: ls.color }}`

### 2.6 `src/pages/Home.jsx` — 렌더링 패턴 변경
- `{cat.icon}` → `<i className={cat.icon}></i>`

### 2.7 `src/styles/site.css` — 아이콘 컨테이너 CSS 전면 교체

기존 `font-size` 만 지정된 이모지 스타일을 배경 원형/라운드 컨테이너 스타일로 교체:

| 셀렉터 | 크기 | 모양 | 아이콘 크기 | hover |
|--------|------|------|------------|-------|
| `.edu-category-card-icon` | 72×72 | 원형 | 28px | scale(1.08) |
| `.edu-site-icon` | 52×52 | 라운드(12px) | 22px | - |
| `.edu-site-icon-lg` | 56×56 | 라운드(14px) | 24px | - |
| `.edu-category-title-icon` | 36×36 | 라운드(8px) | 16px | - |
| `.edu-benefit-icon` | 56×56 | 원형 | 22px | scale(1.08) |
| `.edu-mission-icon` | 68×68 | 원형 | 26px | scale(1.08) |
| `.edu-value-icon` | 52×52 | 원형 | 20px | scale(1.08) |
| `.edu-team-avatar` | 80×80 | 원형 | 32px | 그라디언트 배경 |
| `.edu-form-success-icon` | 64×64 | 원형 | 28px | 초록 배경 |

공통 패턴: `display: inline-flex; align-items: center; justify-content: center;`

다크모드 추가:
- 아이콘 배경 opacity `0.08` → `0.12`
- team avatar shadow 조정
- success icon 다크 컬러(`#34D399`)

### 2.8 `README.md` — 전면 재작성
- 20개 학습사이트 전체 목록 (4개 카테고리별 테이블)
- 기술 스택 테이블
- 프로젝트 구조 트리

---

## 3. 검증 결과

- `npm run build` — 성공 (2.22s, 8 files changed, +243 -90 lines)
- 브랜드 아이콘(React, HTML5, Linux) — `fa-brands` 클래스 정상 사용
- 다크모드 — 배경 opacity 상향 오버라이드 적용
- 반응형 — 768px 이하에서 아이콘 컨테이너 크기 축소

---

## 4. 커밋 정보

```
style: 이모지 → Font Awesome 6 아이콘 교체 + 아이콘 컨테이너 디자인
```
