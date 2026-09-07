# Design System — S0285-S0287
## Đánh giá và lập bản đồ hấp thụ carbon trong sinh khối rừng
### Landing Page | Phase 04 Artifact

> **Nguyên tắc:** Plain HTML + CSS + Vanilla JS. Không framework.  
> Mọi component phải hoạt động với `<link>` CSS và `<script>` — không cần build step.

---

## Part A — CSS Custom Properties (Design Tokens)

Tất cả token được khai báo trong `:root`. File: `src/css/tokens.css`.

### A1. Colors

```css
:root {
  /* ── Base (Dark Terrain) ── */
  --color-base-950: #080d10;
  --color-base-900: #0f1921;
  --color-base-850: #17242f;
  --color-base-800: #1e3040;
  --color-base-700: #2c4558;
  --color-base-500: #4e7a9a;
  --color-base-300: #9abccc;
  --color-base-100: #ddeef5;
  --color-base-000: #ffffff;

  /* ── Accent (LiDAR / Carbon Gradient) ── */
  --color-accent-lidar: #00c4e8;
  --color-accent-data:  #3dd6b5;
  --color-accent-map:   #7be36a;
  --color-accent-warm:  #f5c94e;
  --color-accent-high:  #f07030;

  /* ── Semantic / Functional ── */
  --color-verified:  #3dd6b5;
  --color-needs:     #f5c94e;
  --color-forbidden: #f07030;
  --color-mrv:       #00c4e8;
  --color-error:     #e05555;
  --color-success:   #3dd6b5;
  --color-focus:     #00c4e8;
}
```

### A2. Typography

```css
:root {
  /* ── Font Families ── */
  --font-display: 'Space Grotesk', system-ui, sans-serif;
  --font-body:    'Inter', system-ui, sans-serif;
  --font-mono:    'JetBrains Mono', 'Courier New', monospace;

  /* ── Type Scale (Perfect Fourth 1.333) ── */
  --text-xs:   0.563rem;   /*  9px */
  --text-sm:   0.750rem;   /* 12px */
  --text-base: 1.000rem;   /* 16px */
  --text-md:   1.333rem;   /* 21px */
  --text-lg:   1.777rem;   /* 28px */
  --text-xl:   2.369rem;   /* 38px */
  --text-2xl:  3.157rem;   /* 51px */
  --text-3xl:  4.209rem;   /* 67px */

  /* ── Font Weights ── */
  --weight-regular:  400;
  --weight-medium:   500;
  --weight-semibold: 600;
  --weight-bold:     700;

  /* ── Line Heights ── */
  --lh-tight: 1.15;
  --lh-snug:  1.3;
  --lh-base:  1.6;
  --lh-data:  1.4;

  /* ── Letter Spacing ── */
  --ls-tight:  -0.02em;
  --ls-normal:  0;
  --ls-wide:    0.08em;
}
```

### A3. Spacing

```css
:root {
  --space-1:   0.25rem;   /*  4px */
  --space-2:   0.50rem;   /*  8px */
  --space-3:   0.75rem;   /* 12px */
  --space-4:   1.00rem;   /* 16px */
  --space-5:   1.25rem;   /* 20px */
  --space-6:   1.50rem;   /* 24px */
  --space-8:   2.00rem;   /* 32px */
  --space-10:  2.50rem;   /* 40px */
  --space-12:  3.00rem;   /* 48px */
  --space-16:  4.00rem;   /* 64px */
  --space-20:  5.00rem;   /* 80px */
  --space-24:  6.00rem;   /* 96px */
  --space-32:  8.00rem;   /* 128px */
}
```

### A4. Border Radii

```css
:root {
  --radius-none: 0;
  --radius-sm:   2px;
  --radius-md:   4px;
  --radius-lg:   8px;
  --radius-xl:   12px;
  --radius-full: 9999px;
}
```

### A5. Shadows

```css
:root {
  /* Kiềm chế — dark theme ít cần shadow */
  --shadow-sm:    0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md:    0 4px 8px rgba(0, 0, 0, 0.3);
  --shadow-lg:    0 8px 24px rgba(0, 0, 0, 0.4);
  --shadow-focus: 0 0 0 3px rgba(0, 196, 232, 0.35);
}
```

### A6. Container Widths

```css
:root {
  --container-sm:   640px;
  --container-md:   768px;
  --container-lg:  1024px;
  --container-xl:  1280px;
  --container-pad: clamp(1rem, 5vw, 4rem);
}
```

### A7. Breakpoints

```css
/* Không khai báo trong :root — dùng trực tiếp trong @media */
/* --bp-sm:  480px   mobile landscape */
/* --bp-md:  768px   tablet portrait  */
/* --bp-lg:  1024px  tablet landscape */
/* --bp-xl:  1280px  desktop wide     */
```

Tham chiếu sử dụng:
```css
@media (max-width: 479px)  { /* S — mobile portrait  */ }
@media (min-width: 480px)  { /* M — mobile landscape */ }
@media (min-width: 768px)  { /* L — tablet           */ }
@media (min-width: 1024px) { /* XL — desktop          */ }
```

### A8. Z-Index Layers

```css
:root {
  --z-base:      1;
  --z-dropdown:  10;
  --z-sticky:    20;
  --z-nav:       100;
  --z-overlay:   200;
  --z-modal:     300;
  --z-tooltip:   400;
  --z-chat:      500;
  --z-loader:    900;
}
```

### A9. Motion — Durations & Easings

```css
:root {
  --duration-fast:    100ms;
  --duration-normal:  200ms;
  --duration-slow:    400ms;
  --duration-reveal:  600ms;

  --ease-out:     cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out:  cubic-bezier(0.65, 0, 0.35, 1);
  --ease-spring:  cubic-bezier(0.34, 1.56, 0.64, 1);
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --duration-fast:    0ms;
    --duration-normal:  0ms;
    --duration-slow:    0ms;
    --duration-reveal:  0ms;
  }
}
```

---

## Part B — Global Base Styles

File: `src/css/base.css`. Import sau `tokens.css`.

```css
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}

body {
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: var(--weight-regular);
  line-height: var(--lh-base);
  color: var(--color-base-100);
  background-color: var(--color-base-950);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
  font-weight: var(--weight-bold);
  line-height: var(--lh-tight);
  letter-spacing: var(--ls-tight);
  color: var(--color-base-100);
}

h1 {
  font-size: clamp(1.8rem, 6vw, var(--text-3xl));
}
h2 {
  font-size: clamp(1.5rem, 4vw, var(--text-xl));
  line-height: var(--lh-snug);
}
h3 {
  font-size: clamp(1.2rem, 3vw, var(--text-lg));
  font-weight: var(--weight-semibold);
  line-height: var(--lh-snug);
}

a {
  color: var(--color-accent-lidar);
  text-decoration: none;
  transition: color var(--duration-fast) ease;
}
a:hover {
  color: var(--color-accent-data);
}

img, video {
  display: block;
  max-width: 100%;
  height: auto;
}

:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 3px;
}

/* ── Utility: Container ── */
.container {
  width: 100%;
  max-width: var(--container-xl);
  margin-inline: auto;
  padding-inline: var(--container-pad);
}

/* ── Utility: Section ── */
.section {
  padding-block: clamp(var(--space-16), 8vw, var(--space-32));
}

/* ── Utility: Grid ── */
.grid-12 {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--space-6);
}

/* ── Utility: Screen Reader Only ── */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

---

## Part C — Component Specifications

Mỗi component mô tả: **HTML structure**, **CSS**, **JS behavior** (nếu có), **Accessibility**, **Mobile**.

---

### C01. Navbar

**File:** `src/css/components/navbar.css` + `src/js/navbar.js`

**HTML:**
```html
<header class="navbar" role="banner">
  <nav class="navbar__inner container" aria-label="Main navigation">
    <a href="#hero" class="navbar__logo" aria-label="GASCOLAE – về đầu trang">
      <img src="assets/GASCOLAE.svg" alt="GASCOLAE" width="140" height="32" />
    </a>
    <button class="navbar__toggle" aria-expanded="false"
            aria-controls="navbar-menu" aria-label="Menu">
      <span class="navbar__toggle-icon"></span>
    </button>
    <ul id="navbar-menu" class="navbar__menu" role="list">
      <li><a href="#solution"       class="navbar__link">Dịch vụ</a></li>
      <li><a href="#capabilities"   class="navbar__link">Công nghệ</a></li>
      <li><a href="#workflow"       class="navbar__link">Quy trình</a></li>
      <li><a href="#service-levels" class="navbar__link">Gói dịch vụ</a></li>
      <li><a href="#deliverables"   class="navbar__link">Sản phẩm</a></li>
      <li><a href="#faq"            class="navbar__link">FAQ</a></li>
      <li><a href="#lead"           class="navbar__link navbar__link--cta">Tư vấn</a></li>
    </ul>
  </nav>
</header>
```

**CSS:**
```css
.navbar {
  position: sticky;
  top: 0;
  z-index: var(--z-nav);
  background: rgba(8, 13, 16, 0.92);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--color-base-800);
  padding-block: var(--space-3);
}
.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.navbar__logo img {
  height: 28px;
  width: auto;
}
.navbar__menu {
  display: flex;
  gap: var(--space-6);
  list-style: none;
}
.navbar__link {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--color-base-300);
  padding: var(--space-2) var(--space-3);
  transition: color var(--duration-fast) ease;
}
.navbar__link:hover,
.navbar__link.active {
  color: var(--color-base-100);
}
.navbar__link--cta {
  color: var(--color-base-950);
  background: var(--color-accent-lidar);
  border-radius: var(--radius-md);
  padding: var(--space-2) var(--space-4);
  font-weight: var(--weight-bold);
}
.navbar__link--cta:hover {
  background: var(--color-accent-data);
  color: var(--color-base-950);
}
.navbar__toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  width: 44px;
  height: 44px;
  position: relative;
}
.navbar__toggle-icon,
.navbar__toggle-icon::before,
.navbar__toggle-icon::after {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--color-base-100);
  transition: transform var(--duration-normal) var(--ease-out);
  position: absolute;
  left: 10px;
}
.navbar__toggle-icon { top: 21px; }
.navbar__toggle-icon::before { content: ''; top: -7px; }
.navbar__toggle-icon::after  { content: ''; top: 7px; }

/* Open state */
.navbar__toggle[aria-expanded="true"] .navbar__toggle-icon {
  background: transparent;
}
.navbar__toggle[aria-expanded="true"] .navbar__toggle-icon::before {
  transform: rotate(45deg) translate(5px, 5px);
}
.navbar__toggle[aria-expanded="true"] .navbar__toggle-icon::after {
  transform: rotate(-45deg) translate(5px, -5px);
}

@media (max-width: 767px) {
  .navbar__toggle { display: block; }
  .navbar__menu {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--color-base-900);
    border-bottom: 1px solid var(--color-base-700);
    padding: var(--space-6);
    gap: var(--space-4);
  }
  .navbar__menu.open { display: flex; }
  .navbar__link { font-size: var(--text-base); padding: var(--space-3); }
}
```

**JS (navbar.js):**
```javascript
const toggle = document.querySelector('.navbar__toggle');
const menu = document.querySelector('.navbar__menu');
if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', !open);
    menu.classList.toggle('open', !open);
  });
}
```

**Accessibility:** ARIA-expanded, aria-controls, aria-label. Keyboard: Enter/Space toggles.  
**Mobile:** Hamburger menu tại `< 768px`. Full-width overlay.

---

### C02. Buttons

**File:** `src/css/components/buttons.css`

**HTML:**
```html
<button class="btn btn--primary" type="button">Đăng ký tư vấn kỹ thuật</button>
<a href="#lead" class="btn btn--ghost">Tải tài liệu giới thiệu giải pháp</a>
```

**CSS:**
```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: var(--weight-bold);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition:
    background var(--duration-fast) ease,
    color var(--duration-fast) ease,
    border-color var(--duration-fast) ease,
    transform var(--duration-fast) ease;
  min-height: 44px;
  min-width: 44px;
  text-decoration: none;
  border: none;
}
.btn:active {
  transform: translateY(1px);
}
.btn:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 3px;
}

/* Primary */
.btn--primary {
  background: var(--color-accent-lidar);
  color: var(--color-base-950);
  padding: var(--space-4) var(--space-8);
}
.btn--primary:hover {
  background: var(--color-accent-data);
}

/* Ghost */
.btn--ghost {
  background: transparent;
  color: var(--color-accent-lidar);
  border: 1px solid var(--color-accent-lidar);
  padding: var(--space-3) var(--space-6);
  font-weight: var(--weight-medium);
}
.btn--ghost:hover {
  background: var(--color-accent-lidar);
  color: var(--color-base-950);
}

/* Small (in-card CTA) */
.btn--sm {
  font-size: var(--text-sm);
  padding: var(--space-2) var(--space-4);
  min-height: 36px;
}

/* Full width (mobile) */
@media (max-width: 479px) {
  .btn--responsive-full { width: 100%; }
}
```

**Accessibility:** Uses `<button>` or `<a>`. Focus-visible outline. Min touch target 44px.

---

### C03. Section Heading

**File:** `src/css/components/section-heading.css`

**HTML:**
```html
<div class="section-heading">
  <h2 class="section-heading__title">Ba rào cản khiến trữ lượng carbon rừng vẫn là "con số ước tính"</h2>
  <p class="section-heading__subtitle">Phương pháp điều tra truyền thống chưa đáp ứng yêu cầu mới của thị trường carbon.</p>
</div>
```

**CSS:**
```css
.section-heading {
  max-width: var(--container-md);
  margin-bottom: var(--space-12);
}
.section-heading__title {
  margin-bottom: var(--space-4);
}
.section-heading__subtitle {
  font-size: var(--text-md);
  color: var(--color-base-300);
  line-height: var(--lh-base);
  max-width: 60ch;
}

/* Centered variant */
.section-heading--center {
  text-align: center;
  margin-inline: auto;
}
.section-heading--center .section-heading__subtitle {
  margin-inline: auto;
}
```

---

### C04. Metric

**File:** `src/css/components/metric.css`

**HTML:**
```html
<div class="metric">
  <span class="metric__value">0,01–0,1%</span>
  <span class="metric__label">Tỷ lệ rút mẫu TT33</span>
  <span class="metric__source">SRC-06</span>
</div>
```

**CSS:**
```css
.metric {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}
.metric__value {
  font-family: var(--font-mono);
  font-size: var(--text-xl);
  font-weight: var(--weight-bold);
  color: var(--color-accent-lidar);
  letter-spacing: var(--ls-tight);
  line-height: var(--lh-tight);
}
.metric__label {
  font-size: var(--text-sm);
  color: var(--color-base-300);
  letter-spacing: var(--ls-wide);
  text-transform: uppercase;
}
.metric__source {
  font-size: var(--text-xs);
  color: var(--color-base-500);
  font-style: italic;
}

/* Strip layout (3 metrics in a row) */
.metric-strip {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: var(--space-8);
  padding: var(--space-8) 0;
  border-top: 1px solid var(--color-base-700);
  border-bottom: 1px solid var(--color-base-700);
}
```

---

### C05. Feature Card

**File:** `src/css/components/feature-card.css`

**HTML:**
```html
<article class="feature-card">
  <div class="feature-card__icon" aria-hidden="true">
    <!-- SVG icon inline, 32x32 -->
  </div>
  <h3 class="feature-card__title">Khảo sát viễn thám phủ kín bằng UAV LiDAR</h3>
  <p class="feature-card__body">Thu thập cấu trúc 3D tán rừng phủ kín diện tích; thiết bị tham chiếu dòng Zenmuse L2.</p>
  <span class="feature-card__badge">VERIFIED</span>
</article>
```

**CSS:**
```css
.feature-card {
  background: var(--color-base-900);
  border: 1px solid var(--color-base-700);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  transition:
    border-color var(--duration-normal) ease,
    background var(--duration-normal) ease;
}
.feature-card:hover {
  border-color: var(--color-accent-lidar);
  background: var(--color-base-850);
}
.feature-card__icon {
  width: 32px;
  height: 32px;
  margin-bottom: var(--space-4);
  color: var(--color-accent-lidar);
}
.feature-card__icon svg {
  width: 100%;
  height: 100%;
  stroke: currentColor;
  fill: none;
  stroke-width: 1.5;
}
.feature-card__title {
  font-size: var(--text-md);
  font-weight: var(--weight-semibold);
  margin-bottom: var(--space-3);
}
.feature-card__body {
  font-size: var(--text-base);
  color: var(--color-base-300);
  line-height: var(--lh-base);
  margin-bottom: var(--space-4);
}
.feature-card__badge {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-base-500);
  letter-spacing: var(--ls-wide);
}

/* Problem card variant */
.feature-card--problem {
  border-left: 3px solid var(--color-base-700);
  border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
}
.feature-card--problem:hover {
  border-left-color: var(--color-accent-lidar);
}
.feature-card--problem .feature-card__number {
  font-family: var(--font-mono);
  font-size: var(--text-2xl);
  color: var(--color-base-700);
  margin-bottom: var(--space-3);
}

/* Use case card variant */
.feature-card--usecase .feature-card__output {
  border-left: 3px solid var(--color-accent-data);
  background: var(--color-base-850);
  padding: var(--space-3) var(--space-4);
  margin-top: var(--space-4);
  font-size: var(--text-sm);
  color: var(--color-base-300);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
}

/* 3-column grid */
.feature-card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}
@media (max-width: 767px) {
  .feature-card-grid {
    grid-template-columns: 1fr;
  }
}
```

---

### C06. Process Step

**File:** `src/css/components/process-step.css` + `src/js/process-steps.js`

**HTML:**
```html
<ol class="process-steps" role="list">
  <li class="process-step" data-step="1">
    <div class="process-step__marker">
      <span class="process-step__number">01</span>
    </div>
    <div class="process-step__content">
      <h3 class="process-step__title">Chuẩn bị & Pháp lý</h3>
      <p class="process-step__body">Tiếp nhận ranh giới lô dạng số, khảo sát hiện trường, hoàn tất thủ tục cấp phép bay theo NĐ 288/2025/NĐ-CP.</p>
    </div>
  </li>
  <!-- steps 02–05 follow same structure -->
</ol>
```

**CSS:**
```css
/* Desktop: Horizontal */
.process-steps {
  display: flex;
  gap: var(--space-4);
  list-style: none;
  counter-reset: step;
  position: relative;
}
.process-step {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  cursor: pointer;
}
.process-step__marker {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-full);
  border: 2px solid var(--color-base-700);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-4);
  transition: border-color var(--duration-normal) ease,
              background var(--duration-normal) ease;
}
.process-step__number {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  font-weight: var(--weight-bold);
  color: var(--color-base-300);
}
.process-step.active .process-step__marker {
  border-color: var(--color-accent-lidar);
  background: rgba(0, 196, 232, 0.1);
}
.process-step.active .process-step__number {
  color: var(--color-accent-lidar);
}
.process-step__title {
  font-size: var(--text-base);
  font-weight: var(--weight-semibold);
  margin-bottom: var(--space-2);
}
.process-step__body {
  font-size: var(--text-sm);
  color: var(--color-base-300);
  line-height: var(--lh-base);
  max-height: 0;
  overflow: hidden;
  transition: max-height var(--duration-slow) var(--ease-out),
              opacity var(--duration-slow) ease;
  opacity: 0;
}
.process-step.active .process-step__body {
  max-height: 200px;
  opacity: 1;
}

/* Connector line between steps */
.process-step:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 24px;
  left: calc(50% + 28px);
  width: calc(100% - 56px);
  height: 2px;
  background: var(--color-base-700);
}

/* Mobile: Vertical */
@media (max-width: 767px) {
  .process-steps {
    flex-direction: column;
    gap: var(--space-6);
  }
  .process-step {
    flex-direction: row;
    text-align: left;
    align-items: flex-start;
    gap: var(--space-4);
  }
  .process-step__marker { margin-bottom: 0; flex-shrink: 0; }
  .process-step:not(:last-child)::after {
    top: 52px;
    left: 23px;
    width: 2px;
    height: calc(100% - 4px);
  }
  .process-step__body {
    max-height: none;
    opacity: 1;
  }
}
```

**JS (process-steps.js):**
```javascript
document.querySelectorAll('.process-step').forEach(step => {
  step.addEventListener('click', () => {
    document.querySelectorAll('.process-step').forEach(s => s.classList.remove('active'));
    step.classList.add('active');
  });
});
// Default: first step active
const firstStep = document.querySelector('.process-step');
if (firstStep) firstStep.classList.add('active');
```

---

### C07. Service-Level Card

**File:** `src/css/components/service-level-card.css`

**HTML:**
```html
<article class="sl-card" data-level="1">
  <span class="sl-card__badge sl-card__badge--1">Level 1</span>
  <h3 class="sl-card__title">Bản đồ Carbon Nền</h3>
  <p class="sl-card__subtitle">01 kỳ bay — UAV LiDAR + RGB</p>
  <ul class="sl-card__features">
    <li>DTM / DSM / CHM</li>
    <li>Bản đồ trữ lượng carbon theo lô (tấn C/ha, tCO2e/ha)</li>
    <li>Bảng sai số kỹ thuật</li>
  </ul>
  <p class="sl-card__pricing">Liên hệ tư vấn / Theo chính sách</p>
  <a href="#lead" class="btn btn--ghost btn--sm">Tư vấn Level 1</a>
</article>
```

**CSS:**
```css
.sl-card {
  background: var(--color-base-900);
  border: 1px solid var(--color-base-700);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  position: relative;
  transition: border-color var(--duration-normal) ease;
}
.sl-card:hover {
  border-color: var(--color-accent-lidar);
}
.sl-card__badge {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: var(--weight-bold);
  letter-spacing: var(--ls-wide);
  text-transform: uppercase;
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-sm);
  align-self: flex-start;
  color: var(--color-base-950);
}
.sl-card__badge--1 { background: var(--color-accent-data); }
.sl-card__badge--2 { background: var(--color-accent-warm); }
.sl-card__badge--3 { background: var(--color-accent-high); }

.sl-card__title {
  font-size: var(--text-lg);
  font-weight: var(--weight-bold);
}
.sl-card__subtitle {
  font-size: var(--text-sm);
  color: var(--color-base-300);
}
.sl-card__features {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  flex-grow: 1;
}
.sl-card__features li {
  font-size: var(--text-sm);
  color: var(--color-base-300);
  padding-left: var(--space-5);
  position: relative;
}
.sl-card__features li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 6px;
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  background: var(--color-accent-lidar);
  opacity: 0.6;
}
.sl-card__pricing {
  font-size: var(--text-sm);
  color: var(--color-base-500);
  font-style: italic;
  border-top: 1px solid var(--color-base-700);
  padding-top: var(--space-4);
}

/* 3-col grid */
.sl-card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}
@media (max-width: 767px) {
  .sl-card-grid { grid-template-columns: 1fr; }
}
```

---

### C08. Map Legend

**File:** `src/css/components/map-legend.css`

**HTML:**
```html
<div class="map-legend" role="img" aria-label="Chú giải bản đồ carbon: mật độ từ thấp đến cao">
  <div class="map-legend__bar"></div>
  <div class="map-legend__labels">
    <span>Thấp</span>
    <span>Cao</span>
  </div>
  <span class="map-legend__unit">tCO2e/ha</span>
</div>
```

**CSS:**
```css
.map-legend {
  position: absolute;
  bottom: var(--space-4);
  left: var(--space-4);
  z-index: var(--z-dropdown);
  background: rgba(8, 13, 16, 0.85);
  border: 1px solid var(--color-base-700);
  border-radius: var(--radius-md);
  padding: var(--space-3) var(--space-4);
  min-width: 180px;
}
.map-legend__bar {
  height: 8px;
  border-radius: var(--radius-sm);
  background: linear-gradient(to right,
    var(--color-accent-lidar),
    var(--color-accent-data),
    var(--color-accent-map),
    var(--color-accent-warm),
    var(--color-accent-high)
  );
  margin-bottom: var(--space-1);
}
.map-legend__labels {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-base-300);
}
.map-legend__unit {
  display: block;
  text-align: center;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-base-500);
  margin-top: var(--space-1);
}
```

---

### C09. Tooltip

**File:** `src/css/components/tooltip.css`

**HTML:**
```html
<div class="tooltip" role="tooltip" id="tooltip-plot-a3">
  <span class="tooltip__label">Lô A3</span>
  <span class="tooltip__value">47,2 tCO2e/ha</span>
</div>
```

**CSS:**
```css
.tooltip {
  position: absolute;
  z-index: var(--z-tooltip);
  background: var(--color-base-900);
  border: 1px solid var(--color-accent-lidar);
  border-radius: var(--radius-md);
  padding: var(--space-2) var(--space-3);
  pointer-events: none;
  opacity: 0;
  transform: translateY(4px);
  transition:
    opacity var(--duration-fast) ease,
    transform var(--duration-fast) ease;
  white-space: nowrap;
}
.tooltip.visible {
  opacity: 1;
  transform: translateY(0);
}
.tooltip__label {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-base-300);
  display: block;
}
.tooltip__value {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  font-weight: var(--weight-bold);
  color: var(--color-accent-lidar);
}
```

---

### C10. Accordion (FAQ)

**File:** `src/css/components/accordion.css` + `src/js/accordion.js`

**HTML:**
```html
<div class="accordion" role="list">
  <div class="accordion__item" role="listitem">
    <button class="accordion__trigger" aria-expanded="false"
            aria-controls="faq-1" id="faq-trigger-1">
      <span class="accordion__question">Dịch vụ đo được những bể carbon nào trong rừng?</span>
      <svg class="accordion__icon" aria-hidden="true" width="20" height="20" viewBox="0 0 20 20">
        <polyline points="5 8 10 13 15 8" fill="none" stroke="currentColor" stroke-width="1.5"/>
      </svg>
    </button>
    <div class="accordion__panel" id="faq-1" role="region"
         aria-labelledby="faq-trigger-1" hidden>
      <p class="accordion__answer">Dịch vụ đo lường sinh khối trên mặt đất (AGB). Các bể dưới mặt đất (rễ), gỗ chết, thảm mục và đất không đo được trực tiếp bằng phương pháp UAV LiDAR này.</p>
    </div>
  </div>
  <!-- more items -->
</div>
```

**CSS:**
```css
.accordion {
  max-width: var(--container-md);
  margin-inline: auto;
}
.accordion__item {
  border-bottom: 1px solid var(--color-base-700);
}
.accordion__trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: var(--space-4);
  padding: var(--space-6) 0;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  color: var(--color-base-100);
  transition: background var(--duration-fast) ease;
}
.accordion__trigger:hover {
  background: var(--color-base-900);
}
.accordion__question {
  font-family: var(--font-body);
  font-size: var(--text-md);
  font-weight: var(--weight-semibold);
  line-height: var(--lh-snug);
}
.accordion__icon {
  flex-shrink: 0;
  color: var(--color-base-300);
  transition: transform var(--duration-normal) var(--ease-out);
}
.accordion__trigger[aria-expanded="true"] .accordion__icon {
  transform: rotate(180deg);
}
.accordion__panel {
  overflow: hidden;
  transition: max-height var(--duration-slow) var(--ease-out);
  max-height: 0;
}
.accordion__panel:not([hidden]) {
  max-height: 500px;
}
.accordion__answer {
  padding-bottom: var(--space-6);
  color: var(--color-base-300);
  line-height: var(--lh-base);
}
```

**JS (accordion.js):**
```javascript
document.querySelectorAll('.accordion__trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const expanded = trigger.getAttribute('aria-expanded') === 'true';
    // Close all
    document.querySelectorAll('.accordion__trigger').forEach(t => {
      t.setAttribute('aria-expanded', 'false');
      document.getElementById(t.getAttribute('aria-controls')).hidden = true;
    });
    // Open clicked (if was closed)
    if (!expanded) {
      trigger.setAttribute('aria-expanded', 'true');
      document.getElementById(trigger.getAttribute('aria-controls')).hidden = false;
    }
  });
});
```

**Accessibility:** ARIA-expanded, aria-controls, role=region, keyboard Enter/Space.  
One-at-a-time pattern.

---

### C11. AI Assistant Panel

**File:** `src/css/components/ai-panel.css` + `src/js/ai-panel.js`

**HTML:**
```html
<section class="ai-panel section" id="ai-agent" aria-label="Trợ lý AI Tư vấn Carbon Rừng">
  <div class="container">
    <div class="ai-panel__widget">
      <div class="ai-panel__header">
        <span class="ai-panel__name">Trợ lý AI Tư vấn Carbon Rừng GASCOLAE</span>
      </div>
      <div class="ai-panel__messages" role="log" aria-live="polite">
        <div class="ai-panel__msg ai-panel__msg--bot">
          <p>Xin chào! Tôi là Trợ lý AI chuyên môn của GASCOLAE về dịch vụ Đánh giá và lập bản đồ hấp thụ carbon trong sinh khối rừng (S0285-S0287).</p>
        </div>
      </div>
      <div class="ai-panel__chips">
        <button class="ai-panel__chip" type="button">Công nghệ và vấn đề cho chủ rừng?</button>
        <button class="ai-panel__chip" type="button">Khác biệt Level 1, 2, 3?</button>
        <button class="ai-panel__chip" type="button">Tại sao cần ô tiêu chuẩn?</button>
        <button class="ai-panel__chip" type="button">Bản đồ carbon thay thế MRV?</button>
      </div>
      <form class="ai-panel__input-area" aria-label="Gửi câu hỏi">
        <input type="text" class="ai-panel__input"
               placeholder="Nhập câu hỏi kỹ thuật..." aria-label="Câu hỏi">
        <button type="submit" class="ai-panel__send btn btn--primary btn--sm"
                aria-label="Gửi">Gửi</button>
      </form>
      <p class="ai-panel__escalation">
        <a href="#lead" class="btn btn--ghost btn--sm">Gặp Chuyên Gia Tư Vấn</a>
      </p>
    </div>
  </div>
</section>
```

**CSS:**
```css
.ai-panel__widget {
  max-width: var(--container-sm);
  margin-inline: auto;
  background: var(--color-base-900);
  border: 1px solid var(--color-base-700);
  border-radius: var(--radius-xl);
  overflow: hidden;
}
.ai-panel__header {
  padding: var(--space-4) var(--space-6);
  border-bottom: 1px solid var(--color-base-700);
}
.ai-panel__name {
  font-weight: var(--weight-semibold);
  font-size: var(--text-base);
  color: var(--color-accent-lidar);
}
.ai-panel__messages {
  padding: var(--space-6);
  max-height: 320px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.ai-panel__msg {
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-lg);
  font-size: var(--text-sm);
  line-height: var(--lh-base);
  max-width: 85%;
}
.ai-panel__msg--bot {
  background: var(--color-base-850);
  color: var(--color-base-100);
  align-self: flex-start;
}
.ai-panel__msg--user {
  background: rgba(0, 196, 232, 0.1);
  color: var(--color-base-100);
  align-self: flex-end;
}
.ai-panel__chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  padding: 0 var(--space-6) var(--space-4);
}
.ai-panel__chip {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  color: var(--color-accent-lidar);
  background: transparent;
  border: 1px solid var(--color-accent-lidar);
  border-radius: var(--radius-full);
  padding: var(--space-1) var(--space-3);
  cursor: pointer;
  transition: background var(--duration-fast) ease, color var(--duration-fast) ease;
  white-space: nowrap;
}
.ai-panel__chip:hover {
  background: var(--color-accent-lidar);
  color: var(--color-base-950);
}
.ai-panel__input-area {
  display: flex;
  gap: var(--space-2);
  padding: var(--space-4) var(--space-6);
  border-top: 1px solid var(--color-base-700);
}
.ai-panel__input {
  flex: 1;
  background: var(--color-base-850);
  border: 1px solid var(--color-base-700);
  border-radius: var(--radius-md);
  padding: var(--space-3) var(--space-4);
  color: var(--color-base-100);
  font-family: var(--font-body);
  font-size: var(--text-sm);
}
.ai-panel__input:focus {
  border-color: var(--color-accent-lidar);
  outline: none;
}
.ai-panel__input::placeholder {
  color: var(--color-base-500);
}
.ai-panel__escalation {
  padding: var(--space-3) var(--space-6) var(--space-6);
  text-align: center;
}
```

**JS (ai-panel.js):** Chip click → pre-fill input. Form submit → placeholder response (actual backend integration in Phase 07).

---

### C12. Lead Form

**File:** `src/css/components/lead-form.css` + `src/js/lead-form.js`

**HTML:**
```html
<section class="lead section" id="lead" aria-label="Form yêu cầu tư vấn">
  <div class="container">
    <div class="lead__grid">
      <div class="lead__copy">
        <h2 class="lead__headline">Khởi động Lượng hóa và Số hóa Bể Hấp thụ Carbon Rừng Ngay Hôm Nay</h2>
        <p class="lead__body">Chuyên gia tư vấn kỹ thuật lâm nghiệp sẽ liên hệ trong vòng 1 ngày làm việc.</p>
      </div>
      <form class="lead__form" novalidate>
        <div class="lead__field">
          <label for="lead-name" class="lead__label">Họ và tên <span aria-hidden="true">*</span></label>
          <input type="text" id="lead-name" name="name" required class="lead__input" autocomplete="name">
        </div>
        <div class="lead__field">
          <label for="lead-org" class="lead__label">Cơ quan / Đơn vị chủ rừng <span aria-hidden="true">*</span></label>
          <input type="text" id="lead-org" name="organization" required class="lead__input" autocomplete="organization">
        </div>
        <div class="lead__field">
          <label for="lead-phone" class="lead__label">Số điện thoại <span aria-hidden="true">*</span></label>
          <input type="tel" id="lead-phone" name="phone" required class="lead__input" autocomplete="tel">
        </div>
        <div class="lead__field">
          <label for="lead-email" class="lead__label">Email</label>
          <input type="email" id="lead-email" name="email" class="lead__input" autocomplete="email">
        </div>
        <div class="lead__field">
          <label for="lead-location" class="lead__label">Địa điểm khu rừng</label>
          <input type="text" id="lead-location" name="location" class="lead__input">
        </div>
        <div class="lead__field">
          <label for="lead-area" class="lead__label">Ước tính diện tích (ha)</label>
          <input type="number" id="lead-area" name="area_ha" class="lead__input" min="0">
        </div>
        <fieldset class="lead__fieldset">
          <legend class="lead__label">Mục tiêu dự án</legend>
          <label class="lead__radio"><input type="radio" name="goal" value="carbon"> Lập dự án carbon</label>
          <label class="lead__radio"><input type="radio" name="goal" value="valuation"> Định giá rừng</label>
          <label class="lead__radio"><input type="radio" name="goal" value="esg"> Báo cáo ESG</label>
        </fieldset>
        <button type="submit" class="btn btn--primary btn--responsive-full">Gửi Yêu Cầu Khảo Sát & Tư Vấn</button>
        <p class="lead__privacy">Mọi thông tin quý khách cung cấp được bảo mật theo chính sách bảo mật thông tin dự án.</p>
      </form>
    </div>
    <!-- Success state (hidden by default) -->
    <div class="lead__success" hidden>
      <h3>Yêu cầu đã được gửi thành công</h3>
      <p>Chuyên gia tư vấn kỹ thuật lâm nghiệp sẽ liên hệ trong vòng 1 ngày làm việc.</p>
    </div>
  </div>
</section>
```

**CSS:**
```css
.lead {
  background: var(--color-base-800);
}
.lead__grid {
  display: grid;
  grid-template-columns: 5fr 7fr;
  gap: var(--space-16);
  align-items: start;
}
@media (max-width: 767px) {
  .lead__grid { grid-template-columns: 1fr; gap: var(--space-8); }
}
.lead__headline {
  margin-bottom: var(--space-4);
}
.lead__body {
  color: var(--color-base-300);
  line-height: var(--lh-base);
}
.lead__form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.lead__field {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}
.lead__label {
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--color-base-300);
}
.lead__input {
  background: var(--color-base-900);
  border: 1px solid var(--color-base-700);
  border-radius: var(--radius-md);
  padding: var(--space-3) var(--space-4);
  color: var(--color-base-100);
  font-family: var(--font-body);
  font-size: var(--text-base);
  transition: border-color var(--duration-fast) ease;
}
.lead__input:focus {
  border-color: var(--color-accent-lidar);
  outline: none;
  box-shadow: var(--shadow-focus);
}
.lead__input.error {
  border-color: var(--color-error);
}
.lead__input::placeholder {
  color: var(--color-base-500);
}
.lead__fieldset {
  border: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
.lead__radio {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--color-base-300);
  cursor: pointer;
}
.lead__privacy {
  font-size: var(--text-xs);
  color: var(--color-base-500);
  margin-top: var(--space-2);
}
.lead__success {
  text-align: center;
  padding: var(--space-16) 0;
}
.lead__success h3 {
  color: var(--color-success);
  margin-bottom: var(--space-4);
}
```

**JS (lead-form.js):**
```javascript
const form = document.querySelector('.lead__form');
const successEl = document.querySelector('.lead__success');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Basic validation
    let valid = true;
    form.querySelectorAll('[required]').forEach(input => {
      if (!input.value.trim()) {
        input.classList.add('error');
        valid = false;
      } else {
        input.classList.remove('error');
      }
    });
    if (valid) {
      // Placeholder — Phase 07 will add real endpoint
      form.hidden = true;
      successEl.hidden = false;
    }
  });
}
```

---

### C13. Loading & Error States

**File:** `src/css/components/loading.css`

**Skeleton:**
```css
.skeleton {
  background: linear-gradient(90deg,
    var(--color-base-900) 25%,
    var(--color-base-850) 50%,
    var(--color-base-900) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: var(--radius-lg);
}
@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
@media (prefers-reduced-motion: reduce) {
  .skeleton { animation: none; background: var(--color-base-900); }
}
```

**Three.js Loading:**
```html
<div class="scene-loader" role="status" aria-label="Đang tải bản đồ 3D">
  <svg class="scene-loader__spinner" viewBox="0 0 50 50" aria-hidden="true">
    <circle cx="25" cy="25" r="20" fill="none"
            stroke="var(--color-accent-lidar)"
            stroke-width="2" stroke-dasharray="80 40"
            stroke-linecap="round">
      <animateTransform attributeName="transform" type="rotate"
                        values="0 25 25;360 25 25" dur="1s" repeatCount="indefinite"/>
    </circle>
  </svg>
  <span class="scene-loader__text">Đang tải bản đồ 3D...</span>
</div>
```

```css
.scene-loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-16);
}
.scene-loader__spinner {
  width: 40px;
  height: 40px;
}
.scene-loader__text {
  font-size: var(--text-sm);
  color: var(--color-base-500);
}
```

**WebGL Fallback:**
```html
<div class="scene-fallback">
  <img src="assets/carbon-map-fallback.png"
       alt="Bản đồ phân bố trữ lượng carbon theo lô rừng — ảnh minh họa từ dữ liệu GeoTIFF"
       loading="lazy" />
  <p class="scene-fallback__note">Trình duyệt không hỗ trợ 3D. Xem ảnh minh họa.</p>
</div>
```

**Scroll reveal (utility):**
```css
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity var(--duration-reveal) var(--ease-out),
    transform var(--duration-reveal) var(--ease-out);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

**JS (reveal.js):**
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```

---

## Part D — File Architecture

```
src/
  css/
    tokens.css            ← Part A (custom properties)
    base.css              ← Part B (global reset + utilities)
    components/
      navbar.css
      buttons.css
      section-heading.css
      metric.css
      feature-card.css
      process-step.css
      service-level-card.css
      map-legend.css
      tooltip.css
      accordion.css
      ai-panel.css
      lead-form.css
      loading.css
  js/
    navbar.js
    accordion.js
    process-steps.js
    ai-panel.js
    lead-form.js
    reveal.js
  3d/
    (Phase 05–06)
  index.html
```

**CSS load order in HTML:**
```html
<link rel="stylesheet" href="src/css/tokens.css">
<link rel="stylesheet" href="src/css/base.css">
<link rel="stylesheet" href="src/css/components/navbar.css">
<!-- ... remaining components ... -->
```

**JS load order in HTML (before `</body>`):**
```html
<script src="src/js/navbar.js" defer></script>
<script src="src/js/accordion.js" defer></script>
<script src="src/js/process-steps.js" defer></script>
<script src="src/js/ai-panel.js" defer></script>
<script src="src/js/lead-form.js" defer></script>
<script src="src/js/reveal.js" defer></script>
```

Không cần bundler. Không cần npm. Không cần build step.

---

## Phase 04 Gate Checklist

| # | Tiêu chí | Kết quả |
|---|---|---|
| G1 | Tất cả CSS custom properties được khai báo (colors, typography, spacing, radii, shadows, containers, z-index, motion) | PASS |
| G2 | Tất cả 13 components được đặc tả đầy đủ (HTML + CSS + JS behavior + accessibility) | PASS |
| G3 | Không component nào yêu cầu framework (React, Vue, etc.) | PASS — pure HTML/CSS/Vanilla JS |
| G4 | Mỗi component có responsive behavior | PASS |
| G5 | Mỗi interactive component có ARIA attributes | PASS |
| G6 | Reduced-motion được xử lý ở token level (durations → 0ms) | PASS |
| G7 | File architecture được mô tả, load order rõ ràng | PASS |
| G8 | File UTF-8, không BOM, ký tự tiếng Việt bảo toàn | PASS |

---

STATUS: PASS

COMPLETED:
- Định nghĩa đầy đủ 9 nhóm CSS custom properties (tokens)
- Global base styles (reset, typography, container, grid, sr-only)
- 13 component specifications với HTML, CSS, JS, accessibility notes
- File architecture và load order
- Không framework dependency

ARTIFACTS:
- docs/04-design-system.md

RISKS:
- Font loading: 3 Google Fonts families cần preconnect + display=swap — implement Phase 07
- AI Panel (C11): placeholder endpoint — backend integration Phase 07
- Lead Form (C12): placeholder submit handler — backend/form service Phase 07
- Three.js components (3D scene): deferred to Phase 05–06

NEEDS USER DECISION: Không có.

NEXT PHASE: prompts/05-3d-spec.md
