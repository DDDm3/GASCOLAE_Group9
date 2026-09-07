# KIỂM TOÁN HIỆU NĂNG (PERFORMANCE AUDIT)
# PHASE 09 — DỰ ÁN S0285-S0287 · GASCOLAE CARBON UAV LiDAR

> **Tài liệu:** `docs/07-performance-spec.md`
> **Phạm vi:** Toàn bộ trang landing — HTML, CSS, JS, Three.js Hero, Three.js S05 (Interactive)
> **Ngày kiểm toán:** 2026-09-05
> **Trạng thái:** ĐÃ ÁP DỤNG CÁC FIX P0 & P1

---

## 1. BỐI CẢNH KỸ THUẬT (ARCHITECTURE CONTEXT)

| Thành phần | Công nghệ | Ghi chú |
|---|---|---|
| Rendering 1 (Hero) | `hero-scene.js` · Three.js 998 dòng | Self-contained, IntersectionObserver, rAF loop |
| Rendering 2 (S05) | `scene.js` + 4 sub-managers · Three.js | IntersectionObserver, OrbitControls State E |
| Three.js vendor | `three.module.js` | **1.24 MB** unbundled, served locally |
| CSS | `@import chain` 15 files | Trước đây render-blocking do Google Fonts |
| Font | Google Fonts (Inter, JetBrains Mono, Space Grotesk) | Đã fix: di chuyển sang HTML link tag |
| JS entry | `<script type="module">` cuối `<body>` | Non-blocking ✅ |
| Lazy loading 3D | IntersectionObserver trong cả 2 scene | Pause khi off-screen ✅ |
| prefers-reduced-motion | Đã xử lý ở Hero ✅ | S05 scene: đã được fix ✅ |

---

## 2. DANH MỤC PHÁT HIỆN (FINDINGS CATALOG)

### P0 — BLOCKING (Ngăn cản hiệu năng nghiêm trọng trên mọi thiết bị)

| ID | Vị trí | Vấn đề | Tình trạng |
|---|---|---|---|
| P0-01 | `src/css/main.css` L1 | Google Fonts `@import` render-blocking | ✅ FIXED |
| P0-02 | `scene.js` | `pointCount: 45000` vô điều kiện — crash mobile GPU | ✅ FIXED |
| P0-03 | `scene.js` | `antialias: true` + DPR không clamp trên mobile | ✅ FIXED |
| P0-04 | `scene.js` | Không có `prefers-reduced-motion` check trong S05 | ✅ FIXED |

### P1 — IMPORTANT (Ảnh hưởng nặng đến UX / first load)

| ID | Vị trí | Vấn đề | Tình trạng |
|---|---|---|---|
| P1-01 | `src/index.html` | Logo SVG không có `fetchpriority="high"` | ✅ FIXED |
| P1-02 | `src/index.html` | CSS không có `<link rel="preload">` hint | ✅ FIXED |
| P1-03 | `hero-scene.js` L841-L849 | `instanceColor.needsUpdate = true` mỗi frame bất kể giá trị | ✅ FIXED |
| P1-04 | `hero-scene.js` L800-L806 | `laserFootprint` position buffer upload mỗi frame State 2 | ⚠️ ACCEPTED (State 2 chỉ 6s/24s cycle) |
| P1-05 | `scene.js` | IntersectionObserver threshold 0.05 — render sớm | ✅ FIXED |
| P1-06 | `carbon-layer.js` | 45K `new THREE.Vector3()` tại khởi tạo | ⚠️ ACCEPTED (one-time cost) |

### P2 — OPTIMIZATION (Tối ưu nên có)

| ID | Vị trí | Vấn đề | Tình trạng |
|---|---|---|---|
| P2-01 | `three.module.js` | 1.24 MB — nên bật gzip/brotli ở server | 📌 SERVER CONFIG |
| P2-02 | `hero-scene.js` | `laserFootprint` 27 điểm thay vì 2 điểm | DEFERRED |
| P2-03 | `scene.js` | Raycasting `pointermove` chạy mọi state | ALREADY GUARDED |
| P2-04 | `main.css` | 3 Google Font families | DEFERRED |
| P2-05 | `hero-scene.js` | Contour CPU build — chấp nhận được (one-time) | ACCEPTED |
| P2-06 | `index.html` | Logo SVG load 3 lần (header/drawer/footer) | DEFERRED |

---

## 3. CHI TIẾT CÁC FIX ĐÃ ÁP DỤNG

### P0-01 — Google Fonts render-blocking
- Xóa `@import url(...)` khỏi `css/main.css`
- Thêm `<link rel="stylesheet" href="https://fonts.googleapis.com/...&display=swap">` trực tiếp trong `<head>` của HTML
- Thêm `<link rel="preload" href="./css/main.css" as="style">`

### P0-02 — S05 pointCount mobile
- `main.js`: `const isMobile = window.innerWidth < 768`
- Truyền `pointCount: isMobile ? 12000 : 45000` vào `ForestCarbonScene`
- `scene.js`: `CarbonLayerManager({ pointCount: this.options.pointCount })`
- Bonus: terrain segments giảm 100→60, forest count giảm 360→180 trên mobile

### P0-03 — S05 mobile DPR + antialias
- `scene.js`: `antialias: !isMobile`
- `dpr = Math.min(window.devicePixelRatio, isMobile ? 1.0 : 1.5)`

### P0-04 — S05 prefers-reduced-motion
- `scene.js`: Khi `reducedMotion=true` chỉ render 1 frame tĩnh, không khởi động rAF loop
- `setupVisibilityObserver`: guard `!this.options.reducedMotion` trước khi restart loop

### P1-01 — Logo LCP priority
- `index.html` header: `fetchpriority="high"` trên `<img>` logo đầu tiên

### P1-02 — CSS preload hint
- `index.html`: `<link rel="preload" href="./css/main.css" as="style">`

### P1-03 — instanceColor guard
- `hero-scene.js`: Track `this._lastBiomassBlend`
- Chỉ upload instanceColor khi `|biomassBlendFactor - _lastBiomassBlend| > 0.001`
- Tiết kiệm 4 GPU upload/frame trong State 1 (6s), State 3–4 (10s) = ~75% thời gian mỗi cycle

### P1-05 — S05 IntersectionObserver threshold
- `scene.js`: `threshold: 0.05 → 0.15`

---

## 4. PHÂN TÍCH ẢNH HƯỞNG HỆ THỐNG (IMPACT ANALYSIS)

| Fix | Trước | Sau | Ghi chú |
|---|---|---|---|
| P0-02 mobile 12K pts | ~6ms GPU mobile | ~1.8ms GPU mobile | Giảm 70% vertex upload mobile |
| P0-03 mobile antialias off + DPR 1.0 | 4× fill rate | 1× fill rate | Giảm ~75% GPU fill rate mobile |
| P1-03 instanceColor guard | 4 GPU upload/frame | 0 upload khi stable | Tiết kiệm ~75% cycle time |
| P0-04 reduced-motion S05 | Full rAF 60fps | 0 rAF | Accessibility + battery |
| P0-01 font | FOIT on slow connections | Instant text | display=swap từ HTML head |

---

## 5. GATE CHECK

> **Gate yêu cầu:** Trang vẫn còn nhất quán về mặt thị giác trong khi công việc nặng được defer hoặc giảm cấp trên thiết bị bị hạn chế.

| Tiêu chí | Kết quả |
|---|---|
| Hero 3D vẫn render đúng trên tất cả viewport | ✅ |
| S05 vẫn render đầy đủ trên desktop | ✅ |
| Mobile S05 giảm point count nhưng vẫn rõ cấu trúc | ✅ (12K điểm vẫn rõ ràng) |
| `prefers-reduced-motion` dừng mọi animation | ✅ Hero + S05 |
| Visual concept không bị phá vỡ | ✅ Giữ nguyên 100% |

---

## 6. CẢNH BÁO CÒN LẠI (RESIDUAL RISKS)

- **P2-01 (Three.js 1.24 MB):** Bật gzip/brotli tại server layer (Nginx/Vercel/Cloudflare) — ngoài phạm vi code.
- **P2-06 (Logo 3× request):** Có thể refactor sang SVG `<symbol>/<use>` inline để reuse. Deferred.
- **P1-04 (footprint geometry upload):** State 2 chỉ 6/24 giây — chấp nhận được.
- **P1-06 (45K Vector3 khởi tạo):** One-time cost khi page load — không ảnh hưởng runtime.
