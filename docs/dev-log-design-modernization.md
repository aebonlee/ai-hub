# DreamIT Edu Hub — 디자인 모던화 (2024-2026 트렌드)

## 개발일지

**작성일:** 2026-03-15
**작업 유형:** UI/UX 디자인 개선
**상태:** 완료

---

## 1. 변경 개요

사이트 전체 CSS 디자인을 2010년대 기업 사이트 스타일에서 2024-2026 트렌드에 맞는 모던한 스타일로 전면 개선하였습니다.
기능 변경 없이 CSS만 수정하였으며, 이모지(카테고리 아이콘)는 그대로 유지합니다.

### 핵심 변경 사항

| 항목 | Before | After |
|------|--------|-------|
| 메인 블루 | `#0046C8` (과채도) | `#2563EB` (소프트 블루) |
| 그라디언트 | 블루→블루 단조 | 블루→퍼플 듀오톤 |
| 카드 테두리 | `rgba(0,70,200,0.15)` 파란 테두리 | `var(--border-light)` 중립 테두리 |
| 그림자 | 단일 레이어 (0.06 opacity) | Tailwind 기반 레이어드 그림자 |
| 폰트 무게 | 700~900 (무거움) | 500~700 (경량화) |
| 카드 hover | 모두 동일 translateY(-4px) | 카드별 차별화 |
| 섹션 간격 | 80px, 72px (과도) | 72px, 56px (적정) |

---

## 2. 수정 파일 (5개, CSS만)

### 2.1 `src/styles/base.css` — 핵심 변수 + 버튼 + 섹션

#### 색상 변수 변경
| 변수 | Before | After |
|------|--------|-------|
| `--primary-blue` | `#0046C8` | `#2563EB` |
| `--primary-blue-dark` | `#002E8A` | `#1D4ED8` |
| `--primary-blue-light` | `#4A8FE7` | `#60A5FA` |
| `--bg-light-gray` | `#F5F7FA` | `#F8FAFC` |
| `--bg-medium-gray` | `#E8EDF2` | `#F1F5F9` |
| `--text-secondary` | `#4B5563` | `#64748B` |
| `--text-light` | `#5B6370` | `#94A3B8` |

#### 그림자 변수 (Tailwind 기반 레이어드)
| 변수 | After |
|------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.1)` |
| `--shadow-md` | `0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)` |
| `--shadow-lg` | `0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)` |
| `--shadow-xl` | `0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)` |

#### 그라디언트 (블루→퍼플 듀오톤)
| 변수 | After |
|------|-------|
| `--primary-gradient` | `135deg, #2563EB → #7C3AED` |
| `--accent-gradient` | `135deg, #1D4ED8 → #2563EB → #7C3AED` |
| `--hero-bg` | `135deg, #1E3A8A → #1E1B4B → #0F172A` |
| `--highlight-gradient` | `135deg, #A5B4FC → #C4B5FD → #FFFFFF` |

#### 글래스모피즘 / 레이디어스 / 간격
- `--glass-bg`: 0.85 → 0.7 (더 투명)
- `--glass-blur`: 12px → 16px (더 블러)
- `--radius-md/lg/xl`: 12/16/20 → 10/14/18 (약간 타이트)
- `--section-padding`: 80px → 72px

#### 컬러 테마 그라디언트 보조색 추가
| 테마 | gradient 보조색 |
|------|----------------|
| Red | `#C8102E → #F97316` (오렌지) |
| Green | `#00855A → #06B6D4` (시안) |
| Purple | `#8B1AC8 → #EC4899` (핑크) |
| Orange | `#C87200 → #EAB308` (옐로우) |

#### 버튼 변경
- `.btn`: padding 14px 32px → 12px 28px, weight 600→500, border 2px→1.5px
- `.btn-primary:hover`: shadow rgba → `rgba(37,99,235,0.35)`
- `.btn-secondary`: border-color → `rgba(37,99,235,0.3)`
- `.btn-primary-large`: padding 16px→14px, font-size 18px→16px

#### 섹션 헤더
- `.section-header` margin-bottom: 72px → 56px
- `.section-title`: 42px → 38px, weight 700 → 600

---

### 2.2 `src/styles/site.css` — 카드 전면 개편

#### 9종 카드 border 통일
모든 카드의 `border: 1px solid rgba(0,70,200,0.15)` → `var(--border-light)` 변경:
- `.edu-stats-card`, `.edu-site-card`, `.edu-category-card`
- `.edu-detail-card`, `.edu-benefit-card`, `.edu-form-wrapper`
- `.edu-mission-card`, `.edu-value-card`, `.edu-team-card`

#### hover 차별화
| 카드 유형 | hover 효과 |
|-----------|-----------|
| stats / site / detail / benefit / value | `translateY(-2px)` + 레이어드 그림자 |
| category | `scale(1.02)` + 레이어드 그림자 |
| mission / team | 그림자만 (리프트 없음) |

#### 카드 상단 포인트
- `.edu-site-card`, `.edu-detail-card`: border-top 3px → 2px

#### 폰트 경량화
| 요소 | Before | After |
|------|--------|-------|
| `.edu-stats-number` | 900 | 700 |
| `.edu-stats-suffix` | 700 | 600 |
| 카드 h3 (site, category, detail, mission) | 700 | 600 |
| 카드 h4 (benefit, value, team, detail-block, form) | 700 | 600 |
| `.edu-category-title h3` | 800 | 700 |

#### 테크 태그 스타일링
```css
/* Before: 회색 배경 */
background: var(--bg-light-gray); color: var(--text-secondary);

/* After: 블루 틴트 배경 + 테두리 */
background: #EFF6FF; color: #3B82F6; border: 1px solid rgba(37,99,235,0.15);
```

#### 난이도 배지 테두리 추가
- beginner: `border: 1px solid rgba(5,150,105,0.2)`
- intermediate: `border: 1px solid rgba(37,99,235,0.2)`
- advanced: `border: 1px solid rgba(215,119,6,0.2)`

#### 폼 포커스 rgba 업데이트
- `rgba(0,70,200,0.1)` → `rgba(37,99,235,0.1)`

#### 다크모드 카드 (L724~862)
모든 `rgba(74,144,217,...)` 하드코드 → CSS 변수 기반:
- `border-color: var(--border-light)` / `var(--border-medium)`
- hover shadow: 중립 레이어드 + `rgba(96,165,250,0.1)` 힌트

---

### 2.3 `src/styles/hero.css` — 히어로 세련화

| 요소 | Before | After |
|------|--------|-------|
| `.hero-title` font-size | 60px | 56px |
| `.hero-title` letter-spacing | -0.03em | -0.04em |
| `.hero-description` font-size | 20px | 19px |
| `.hero-description` color opacity | 0.9 | 0.8 |
| `.hero-description` font-weight | (없음) | 300 |

---

### 2.4 `src/styles/dark-mode.css` — 다크모드 변수

| 변수 | Before | After |
|------|--------|-------|
| `--primary-blue` | `#4A8FE7` | `#60A5FA` |
| `--primary-blue-dark` | `#2B6CC4` | `#3B82F6` |
| `--primary-gradient` | `#1A5AC8 → #4A8FE7` | `#3B82F6 → #8B5CF6` (블루→퍼플) |

---

### 2.5 `src/styles/navbar.css` — rgba 하드코드 수정

5곳의 `rgba(0,70,200,...)` → `rgba(37,99,235,...)` 변경:
- `.dropdown-menu li a:hover` background
- `.lang-switcher:hover` box-shadow
- `.dropdown-user-header` background
- `.dropdown-menu-item:hover` background
- `.nav-login-btn:hover` box-shadow

---

## 3. JSX 변경

없음. CSS만 변경.

---

## 4. 디자인 철학

### 모던 트렌드 적용
1. **소프트 컬러**: 과채도 블루 대신 Tailwind Blue-600 계열
2. **듀오톤 그라디언트**: 블루→퍼플로 깊이감 추가
3. **레이어드 그림자**: 단일 그림자 대신 2중 레이어로 자연스러운 깊이
4. **경량 타이포**: 무거운 800-900 대신 500-700으로 가독성 향상
5. **차별화된 인터랙션**: 카드 유형별 다른 hover로 시각적 리듬
6. **적정 여백**: 과도한 간격 축소로 콘텐츠 밀도 적정화
7. **글래스모피즘**: 더 투명하고 블러 강화

### 호환성
- 라이트/다크 모드 완전 지원
- 5가지 컬러 테마 (blue/red/green/purple/orange) 유지
- 반응형 레이아웃 영향 없음
- 기존 기능 100% 유지

---

## 5. 빌드 검증

```
npm run build → vite v7.3.1 building...
✓ 114 modules transformed
✓ built in 2.18s
```

에러 없이 빌드 성공.
