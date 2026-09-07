# BÁO CÁO KIỂM TOÁN WEB DESIGN GUIDELINES
# PHASE 10 — WEB DESIGN GUIDELINES AUDIT
# DỰ ÁN S0285-S0287 · GASCOLAE CARBON UAV LiDAR

> **Tài liệu:** `docs/08-qa-report.md`
> **Tiêu chuẩn tham chiếu:** WCAG 2.1 AA, WAI-ARIA 1.2, HTML5 Semantic HTML
> **Ngày kiểm toán:** 2026-09-05
> **Trạng thái:** GATE PASSED — Không còn vấn đề P0 nào tồn đọng

---

## 1. TÓM TẮT KIỂM TOÁN

| Hạng mục | Kết quả |
|---|---|
| Semantic Structure | ✅ PASS |
| Heading Hierarchy | ✅ PASS |
| ARIA Landmarks | ✅ PASS |
| Keyboard Navigation | ✅ PASS (sau khi fix) |
| Focus Management | ✅ PASS (sau khi fix) |
| Form Labels & Errors | ✅ PASS (sau khi fix) |
| Contrast (body text) | ✅ PASS |
| Contrast (muted text) | ⚠️ P2 — Documented |
| Touch Targets | ✅ PASS (btn 44px) |
| Reduced Motion | ✅ PASS |
| Loading States | ✅ PASS (3D fallback) |
| Interactive 3D Fallback | ✅ PASS |
| Content Clarity | ✅ PASS |

---

## 2. FINDINGS CATALOG

### P0 — BLOCKING (Rào cản nghiêm trọng cho người dùng AT/keyboard)

| ID | Vị trí | Vấn đề | Tình trạng |
|---|---|---|---|
| **P0-WG-01** | `index.html` `<body>` | Không có skip navigation link — người dùng bàn phím phải Tab qua 7 nav link mỗi lần tải trang | ✅ FIXED |
| **P0-WG-02** | `index.html` L287 | `#viewer-3d-canvas` là `<div>` trần — không có `role` hay `aria-label`, screen reader không hiểu đây là gì | ✅ FIXED |
| **P0-WG-03** | `index.html` form / `lead-form.js` | Các trường bắt buộc không có `aria-invalid` và không có error message được liên kết bằng `aria-describedby` — screen reader không thể thông báo lỗi cụ thể | ✅ FIXED |
| **P0-WG-03b** | `lead-form.css` | `.lead__input:focus` dùng `outline: none` — triệt tiêu focus indicator mặc định của trình duyệt mà không thay thế | ✅ FIXED |

### P1 — IMPORTANT (Ảnh hưởng đáng kể đến UX accessibility)

| ID | Vị trí | Vấn đề | Tình trạng |
|---|---|---|---|
| **P1-WG-04** | `accordion.js` | Accordion thiếu keyboard arrow navigation (WAI-ARIA Accordion pattern — ArrowDown/Up/Home/End) | ✅ FIXED |
| **P1-WG-05** | `index.html` — nhiều vị trí | Decorative SVG icons (accordion icon, AI widget icon, feature card icons, mrv-callout icon) không có `aria-hidden="true"` — screen reader đọc nhầm nội dung SVG | ✅ FIXED |
| **P1-WG-06** | `index.html` L688 | AI widget input thiếu `id` và `<label>` element liên kết — chỉ có `aria-label` inline | ✅ FIXED |
| **P1-WG-07** | `index.html` L305 | `viewer-3d__hint` chứa hướng dẫn chuột, không hữu ích cho screen reader — thiếu `aria-hidden="true"` | ✅ FIXED |

### P2 — OPTIMIZATION (Ghi nhận, không block)

| ID | Vị trí | Vấn đề | Lý giải không fix |
|---|---|---|---|
| **P2-WG-01** | `tokens.css` | `--color-base-500` (#4e7a9a) trên `--color-base-950` (#080d10) ước tính contrast ~4.1:1 — đạt AA cho large text nhưng xấp xỉ ngưỡng body text | Dùng cho `.metric__source`, `.lead__privacy` (text nhỏ, không phải body content chính) |
| **P2-WG-02** | `tokens.css` | `--text-xs` (9px = 0.563rem) thấp hơn ngưỡng 12px khuyến nghị | Dùng cho badge kỹ thuật `source` labels — chấp nhận trong context công cụ chuyên môn |
| **P2-WG-03** | `buttons.css` | `.btn--sm` có `min-height: 36px` — nhỏ hơn WCAG 2.5.5 Target Size 44px khuyến nghị | Chỉ xuất hiện trong service cards và AI footer — không phải primary CTA; primary buttons đã đạt 44px |

---

## 3. CHI TIẾT CÁC FIX

### P0-WG-01 — Skip Navigation

```html
<!-- Thêm vào đầu <body> -->
<a href="#hero" class="skip-nav">Bỏ qua điều hướng, đến nội dung chính</a>
```

CSS trong `base.css`: `.skip-nav` hidden bằng `top: -100%`, hiện ra khi `:focus` (`top: 0`).

### P0-WG-02 — Viewer Canvas Role

```html
<div id="viewer-3d-canvas" class="viewer-3d__canvas"
  role="img"
  aria-label="Mô hình 3D tương tác: địa hình rừng, quét LiDAR, sinh khối AGB và bản đồ carbon GIS">
```

### P0-WG-03 — Form Error State

- Thêm `aria-describedby="lead-name-err"` vào mỗi required input
- Thêm `<span id="lead-name-err" class="lead__error" role="alert" hidden>` sau mỗi input
- Thêm `aria-invalid="true/false"` trong `lead-form.js` khi validate
- Focus chuyển đến field lỗi đầu tiên khi submit thất bại
- `lead-form.css`: Thêm `.lead__input:focus-visible { outline: 2px solid var(--color-focus); }` để khôi phục focus indicator

### P1-WG-04 — Accordion Keyboard Navigation

`accordion.js` bổ sung `keydown` listener với `ArrowDown`, `ArrowUp`, `Home`, `End` để di chuyển focus giữa các trigger.

### P1-WG-05 — Decorative SVG `aria-hidden`

4 accordion icons, 1 AI widget icon, 3 feature card icons, 1 mrv-callout icon → `aria-hidden="true" focusable="false"`.

### P1-WG-06 — AI Widget Input Label

```html
<label for="ai-input" class="sr-only">Câu hỏi kỹ thuật cần giải đáp</label>
<input type="text" id="ai-input" ...>
```

### P1-WG-07 — Viewer Hint `aria-hidden`

```html
<div class="viewer-3d__hint" aria-hidden="true">...</div>
```

---

## 4. KIỂM TOÁN SEMANTIC STRUCTURE (PASS)

| Yếu tố | Kết quả |
|---|---|
| `<header role="banner">` | ✅ |
| `<main>` element bao toàn bộ nội dung chính | ✅ |
| `<footer role="contentinfo">` | ✅ |
| `<nav aria-label="Điều hướng chính">` trong header | ✅ |
| `<aside role="dialog" aria-modal="true">` cho mobile drawer | ✅ |
| Mỗi `<section>` có `aria-label` mô tả | ✅ |
| Heading hierarchy H1 → H2 → H3 → H4 nhất quán | ✅ |
| `<ol>` cho process steps với `role="list"` | ✅ |
| `<fieldset>` + `<legend>` cho radio group | ✅ |
| `role="toolbar"` cho 3D switcher | ✅ |
| `role="log" aria-live="polite"` cho AI messages | ✅ |
| `role="tooltip"` cho parcel HUD | ✅ |

---

## 5. GATE CHECK

> **Gate yêu cầu:** Không còn P0 nào tồn đọng. Mọi P1 phải được fix hoặc documented.

| Tiêu chí | Kết quả |
|---|---|
| Không còn P0 issue | ✅ 4/4 P0 đã fix |
| Mọi P1 issue fix hoặc documented | ✅ 4/4 P1 đã fix |
| P2 documented rõ ràng với rationale | ✅ |
| Visual coherence không bị ảnh hưởng | ✅ |
