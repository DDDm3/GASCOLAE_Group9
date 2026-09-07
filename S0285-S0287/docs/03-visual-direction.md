# Visual Direction — S0285-S0287
## Đánh giá và lập bản đồ hấp thụ carbon trong sinh khối rừng
### Landing Page | Phase 03 Artifact

> **Khái niệm nghệ thuật chủ đạo:**  
> *Scientific field station meets geospatial control room.*  
> Trang nhìn như một giao diện dữ liệu môi trường chuyên nghiệp — không phải website ESG marketing.  
> Mọi quyết định hình ảnh phải liên kết sinh thái rừng với viễn thám, khoa học địa không gian và đo lường carbon.

---

## 1. Visual Concept

**Core metaphor:** Bản đồ GIS mở ra từ đám mây điểm LiDAR.  
- Trang bắt đầu bằng dữ liệu thô (point cloud), dần trở nên có cấu trúc (CHM surface), rồi được diễn giải (carbon map).  
- Người dùng "nhìn qua kính của nhà khoa học viễn thám" — mọi hình ảnh và màu sắc đều có ý nghĩa kỹ thuật.  
- Cảm giác: kiềm chế, tập trung, chính xác. Không ồn ào. Không clichés lá cây xanh.

**Tham chiếu visual:**  
- USGS Earth Explorer / NASA Worldview (bố cục dữ liệu)  
- NOAA scientific dashboards (palette trung tính + accent khoa học)  
- LiDAR visualization từ các paper Sensors/Frontiers (SRC-17, SRC-18)  
- Không tham chiếu: generic sustainability startup, ESG report template, stock-photo forest.

---

## 2. Typography

### Font Stack

| Vai trò | Font | Fallback | Lý do |
|---|---|---|---|
| **Display / Heading** | `Space Grotesk` | `system-ui`, sans-serif | Geometric, technical, có cá tính khoa học nhưng dễ đọc. Không phải Helvetica nhàm chán. |
| **Body / UI** | `Inter` | `system-ui`, sans-serif | Cực kỳ dễ đọc ở mọi size, variable font — tối ưu cho table, card, form. |
| **Mono / Data / Code** | `JetBrains Mono` | `Courier New`, monospace | Dùng cho metric, tọa độ, file path, R²/RMSE values — tăng tính kỹ thuật. |

Cả 3 font có trên Google Fonts, load qua `<link rel=preconnect>` + `display=swap`.

### Type Scale (1.333 — Perfect Fourth)

```
--text-xs:   0.563rem   ~  9px   Labels, captions, badges
--text-sm:   0.750rem   ~ 12px   Secondary body, table cells
--text-base: 1.000rem   ~ 16px   Primary body, form labels
--text-md:   1.333rem   ~ 21px   Card headlines, section intros
--text-lg:   1.777rem   ~ 28px   Section headings (h3)
--text-xl:   2.369rem   ~ 38px   Page section headings (h2)
--text-2xl:  3.157rem   ~ 51px   Hero heading (h1, desktop)
--text-3xl:  4.209rem   ~ 67px   Display — only for hero emphasis word
```

**Clamp formula (hero h1):**  
`font-size: clamp(2rem, 5vw + 1rem, 4.209rem);`

### Weight Usage

```
400 Regular  → body text, table cells
500 Medium   → card labels, nav items
600 SemiBold → section headings h3, capability titles
700 Bold     → h1, h2, CTA buttons, metric values
```

### Line Height

```
--lh-tight:  1.15   → headings h1, h2
--lh-snug:   1.3    → h3, card headlines
--lh-base:   1.6    → body paragraphs
--lh-data:   1.4    → table rows, metric blocks
```

### Letter Spacing

```
--ls-tight:  -0.02em  → large display headings
--ls-normal:  0       → body
--ls-wide:    0.08em  → labels, badges, ALL-CAPS tags
```

---

## 3. Colour Palette

### Nguyên tắc
Palette nền từ **đêm địa hình** (dark terrain), accent từ **bảng màu LiDAR viễn thám** (elevation → carbon gradient).  
Không dùng green #00ff00 hoặc eco-green #4caf50 như primary. Green chỉ xuất hiện như một điểm của gradient dữ liệu.

### Base (Nền)

```css
--color-base-950: #080d10   /* Page background — near black, với hơi hướng xanh lam */
--color-base-900: #0f1921   /* Surface — card nền chính */
--color-base-850: #17242f   /* Surface elevated — hover state, sidebar */
--color-base-800: #1e3040   /* Border dark */
--color-base-700: #2c4558   /* Divider, subtle border */
--color-base-500: #4e7a9a   /* Muted text, placeholder */
--color-base-300: #9abccc   /* Secondary text */
--color-base-100: #ddeef5   /* Primary text on dark */
--color-base-000: #ffffff   /* White — chỉ dùng cho CTA button text */
```

### Accent — LiDAR / Carbon Gradient

Gradient này phản ánh bảng màu CHM/carbon density chuẩn trong GIS:

```css
--color-accent-lidar:  #00c4e8   /* LiDAR pulse highlight — electric cyan */
--color-accent-data:   #3dd6b5   /* Measurement active — teal */
--color-accent-map:    #7be36a   /* Mid-range carbon — muted lime */
--color-accent-warm:   #f5c94e   /* High carbon / canopy peak — amber */
--color-accent-high:   #f07030   /* Maximum density — muted orange */
```

Gradient CSS (dùng cho CHM color bar, heatmap legend):
```css
background: linear-gradient(to right,
  var(--color-accent-lidar),
  var(--color-accent-data),
  var(--color-accent-map),
  var(--color-accent-warm),
  var(--color-accent-high)
);
```

### Functional / Semantic

```css
--color-verified:  #3dd6b5   /* VERIFIED badge — teal */
--color-needs:     #f5c94e   /* NEEDS VERIFICATION badge — amber */
--color-forbidden: #f07030   /* FORBIDDEN badge — orange (không dùng đỏ) */
--color-mrv:       #00c4e8   /* MRV Boundary callout border */
--color-error:     #e05555   /* Form validation error */
--color-success:   #3dd6b5   /* Form submit success */
```

### Tỷ lệ sử dụng (Dark Mode Default)

```
--color-base-950  80%   Page background
--color-base-900  12%   Card surfaces
--color-base-700   5%   Borders, dividers
--color-accent-lidar + --color-accent-data  3%  Primary interactive elements
```

> Trang dùng dark mode mặc định. Không cần light mode toggle — phù hợp với visual concept "geospatial control room".

---

## 4. Background Treatment

### Global

```css
body {
  background-color: var(--color-base-950);
  color: var(--color-base-100);
}
```

Không dùng texture ảnh nền toàn trang. Không dùng gradient mesh lớn.

### Hero (S01)

- Nền: `--color-base-950`
- Three.js canvas phủ full-viewport, z-index phía sau text
- Overlay gradient từ dưới lên để text luôn readable:
```css
.hero-overlay {
  background: linear-gradient(to top,
    var(--color-base-950) 0%,
    transparent 60%
  );
}
```

### Section nền

```
S01 Hero           → base-950 + Three.js canvas
S02 Problem        → base-950 (liền mạch từ Hero)
S03 Forest as Data → base-900 (subtle lift)
S04 Method         → base-950
S05 3D Carbon Map  → base-950 + Three.js canvas
S06 Use Cases      → base-900
S07 Workflow       → base-950 với horizontal gradient strip: base-800 → base-950 (subtlety)
S08 Service Levels → base-900
S09 Deliverables   → base-950
S10 Positioning    → base-900
S11 FAQ            → base-950
S12 AI Agent       → base-900
S13 Lead CTA       → base-800 (darkest section — tạo độ tương phản cao cho form)
```

### Topographic subtle texture (optional)

Chỉ áp dụng tại S07 (Workflow) như background pattern tinh tế:  
SVG topographic lines, `opacity: 0.04`, không ảnh hưởng readability.  
Tắt nếu performance budget vượt ngưỡng.

---

## 5. Grid & Layout

### Container

```css
.container {
  width: 100%;
  max-width: 1280px;
  margin-inline: auto;
  padding-inline: clamp(1rem, 5vw, 4rem);
}
```

### Column Grid

```css
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--space-6);   /* 24px */
}
```

### Section width variants

```
Full bleed:         grid-column: 1 / -1    (Three.js scenes, hero bg)
Content:            grid-column: 2 / 12    (standard text sections)
Narrow (FAQ, CTA):  grid-column: 3 / 11    (max ~800px)
Wide (cards):       grid-column: 1 / -1    (3-col card grids)
```

### Asymmetric layouts (S03, S10)

S03 Forest as Data: diagram 7 cols left / text 4 cols right  
S10 Positioning: text 5 cols left / MRV callout 6 cols right

---

## 6. Spacing Rhythm

Base unit: `8px` (0.5rem). Tất cả spacing là bội số của 8.

```css
--space-1:   0.25rem   4px
--space-2:   0.50rem   8px
--space-3:   0.75rem   12px
--space-4:   1.00rem   16px
--space-6:   1.50rem   24px
--space-8:   2.00rem   32px
--space-12:  3.00rem   48px
--space-16:  4.00rem   64px
--space-24:  6.00rem   96px
--space-32:  8.00rem  128px
```

### Section padding

```css
.section {
  padding-block: clamp(var(--space-16), 8vw, var(--space-32));
}
```

### Between elements

```
Heading → subtext:    space-4
Subtext → grid/cards: space-12
Between cards:        space-6
Within card:          space-6 padding
Card headline → body: space-3
Step number → title:  space-2
```

---

## 7. Cards

### Base Card

```css
.card {
  background: var(--color-base-900);
  border: 1px solid var(--color-base-700);
  border-radius: 8px;
  padding: var(--space-8);
  transition: border-color 200ms ease, background 200ms ease;
}

.card:hover {
  border-color: var(--color-accent-lidar);
  background: var(--color-base-850);
}
```

Không dùng `box-shadow` lớn. Border highlight là signal hover — không cần glow.

### Card variants

**Capability card (S04):**
- Icon top: 32×32px SVG, stroke `var(--color-accent-lidar)`, fill none
- Title: `--text-md`, weight 600
- Body: `--text-base`, `--color-base-300`
- Bottom: source badge (subtle `--text-xs`, `--color-base-500`)

**Service Level card (S08):**
- Badge top-right: "Level 1" / "Level 2" / "Level 3" — monospace, `--text-xs`, `--ls-wide`
- Level 1 badge: `--color-accent-data` bg
- Level 2 badge: `--color-accent-warm` bg
- Level 3 badge: `--color-accent-high` bg
- Pricing row: italic, `--color-base-300`, "Liên hệ tư vấn / Theo chính sách"
- CTA inside card: ghost button (see §8)

**Use Case card (S06):**
- "Output chính" highlighted row: left border `3px solid var(--color-accent-data)`, bg `--color-base-850`

**Deliverable item (S09):**
- Grid 2×3 desktop
- File type icon: 24×24px, monochrome
- Level badge: inline right-aligned

**Problem card (S02):**
- Left border accent: `3px solid var(--color-base-700)` default; hover → `var(--color-accent-lidar)`
- Number prefix: `--text-2xl`, `--color-base-700`, monospace — creates visual rhythm

---

## 8. Buttons

### Primary CTA

```css
.btn-primary {
  background: var(--color-accent-lidar);
  color: var(--color-base-950);
  font-weight: 700;
  font-size: var(--text-base);
  padding: var(--space-4) var(--space-8);
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: background 150ms ease, transform 100ms ease;
}
.btn-primary:hover {
  background: var(--color-accent-data);
}
.btn-primary:active {
  transform: translateY(1px);
}
.btn-primary:focus-visible {
  outline: 2px solid var(--color-accent-lidar);
  outline-offset: 3px;
}
```

Tên nút: "Đăng ký tư vấn kỹ thuật" / "Gửi Yêu Cầu Khảo Sát & Tư Vấn"

### Ghost / Secondary

```css
.btn-ghost {
  background: transparent;
  color: var(--color-accent-lidar);
  border: 1px solid var(--color-accent-lidar);
  padding: var(--space-3) var(--space-6);
  border-radius: 4px;
  font-weight: 500;
  transition: background 150ms ease, color 150ms ease;
}
.btn-ghost:hover {
  background: var(--color-accent-lidar);
  color: var(--color-base-950);
}
```

Dùng cho: "Tải tài liệu giới thiệu giải pháp", "Tư vấn Level X", in-card CTAs.

### Minimum touch target

```css
min-height: 44px;
min-width: 44px;
```

Không dùng clickable div. Luôn dùng `<button>` hoặc `<a>`.

---

## 9. Metric Presentation

Dùng cho: tCO2e/ha, tấn C/ha, R², RMSE, tỷ lệ rút mẫu, chu kỳ 2–3 năm.

```css
.metric-value {
  font-family: 'JetBrains Mono', monospace;
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--color-accent-lidar);
  letter-spacing: var(--ls-tight);
}
.metric-label {
  font-size: var(--text-sm);
  color: var(--color-base-300);
  letter-spacing: var(--ls-wide);
  text-transform: uppercase;
}
.metric-source {
  font-size: var(--text-xs);
  color: var(--color-base-500);
  font-style: italic;
}
```

**Layout:** 3-column metric strip trong S03 / S04 nếu cần highlight:
```
[ 0,01–0,1% ]   [ 100% phủ kín ]   [ 2–3 năm ]
 Mẫu TT33        UAV LiDAR          Chu kỳ khuyến nghị
```

Không bao giờ tự tạo metric. Chỉ dùng số từ VERIFIED sources.

---

## 10. GIS / Map Styling

Dùng trong S05 (3D Carbon Map) và bất kỳ diagram GIS nào trong S03.

### Color ramp (CHM / Carbon density)

```
Thấp  → Cao
#00c4e8 → #3dd6b5 → #7be36a → #f5c94e → #f07030
(cyan)    (teal)    (lime)    (amber)   (orange)
```

Không dùng red (#ff0000) hoặc green (#00ff00) thuần túy — quá harsh.

### GIS layer display rules

- Plot boundary lines: `stroke: var(--color-base-300)`, `stroke-width: 1px`, `opacity: 0.6`
- Selected plot: `stroke: var(--color-accent-lidar)`, `stroke-width: 2px`
- Tooltip: dark bg `--color-base-900`, border `--color-accent-lidar`, font monospace
- Legend: horizontal color bar + labels ở bottom-left of scene; font `--text-xs`, monospace
- No decorative north arrows or compass roses unless technically required

### Coordinate / data display

Dùng monospace font: `font-family: 'JetBrains Mono', monospace`.  
Format: `Lô A3: 47.2 tCO2e/ha` — không có khoảng trắng thừa.

---

## 11. Point Cloud Styling

Dùng trong S01 (Hero) và S05 (3D Map).

### Color encoding

```
By height (CHM visualization — S01 hero):
  Low canopy  (0–5m):   #1a3a4a   (dark blue-teal)
  Mid canopy  (5–20m):  #00c4e8   (cyan)
  Upper canopy (20–35m):#3dd6b5   (teal-green)
  Emergent    (>35m):   #f5c94e   (amber)

By carbon density (S05 map):
  Low  (<20 tC/ha):     #00c4e8
  Mid  (20–60 tC/ha):   #7be36a
  High (>60 tC/ha):     #f07030
```

### Rendering parameters

```javascript
// Three.js Points material
const material = new THREE.PointsMaterial({
  size: 0.15,              // world units
  vertexColors: true,      // use per-point color array
  sizeAttenuation: true,   // perspective
  transparent: true,
  opacity: 0.85,
  depthWrite: false,       // avoid z-fighting
});
```

### Point count budget

| Device | Max points | Fallback |
|---|---|---|
| Desktop high-end | 500,000 | — |
| Desktop mid | 200,000 | — |
| Mobile | 50,000 | Static PNG |
| WebGL unsupported | — | Static annotated PNG |

Point count detection: check `renderer.capabilities.maxVertexUniforms` và GPU tier heuristic.

---

## 12. 3D Visual Language

Quy tắc từ AGENTS.md 3D rules — áp dụng cụ thể:

### Geometry

- **Terrain (DTM):** `PlaneGeometry` 256×256 segments, displacement map từ heightmap PNG. Material: `MeshStandardMaterial`, roughness 0.9, metalness 0, color `#0a1820`.
- **Canopy surface (CHM):** second `PlaneGeometry` offset +terrain height, vertex color từ CHM gradient, `wireframe: false`, slight transparency `opacity: 0.85`.
- **Point cloud:** `THREE.Points` với `BufferGeometry` — không dùng Mesh per point.
- **Plot boundaries:** `THREE.LineSegments` từ polygon coordinates.

### Camera

- Hero S01: fixed elevated angle, subtle parallax on scroll (`camera.position.y` responds to scrollY).
- S05 Carbon Map: `OrbitControls`, giới hạn polar angle `[0.2, Math.PI / 2.5]`, không cho orbit dưới terrain.
- Min/max distance: 5 – 200 world units.

### Lighting

```javascript
// Minimal, scientific look — không dramatic
const ambient = new THREE.AmbientLight(0xffffff, 0.4);
const directional = new THREE.DirectionalLight(0xb0d4e8, 0.8);
directional.position.set(50, 100, 50);
// No point lights, no spotlights, no shadows (performance)
```

### Performance

```javascript
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
renderer.setSize(canvas.clientWidth, canvas.clientHeight);
// Frustum culling: automatic via Three.js
// Dispose on section leave (IntersectionObserver)
```

### Reduced motion

```javascript
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;
if (prefersReducedMotion) {
  // Render single static frame; no animate loop
  renderer.render(scene, camera);
  return;
}
```

### Fallback hierarchy

1. WebGL 2 supported → full scene  
2. WebGL 1 only → simplified scene (fewer geometries, no post-processing)  
3. No WebGL → `<img>` static screenshot, `role="img"`, descriptive `alt`

---

## 13. Image Treatment

**Không dùng stock photos** của rừng, con người ôm cây, bầu trời xanh.

**Chấp nhận:**
- Screenshot thực từ GIS tools (QGIS, ArcGIS) với annotation kỹ thuật
- Ảnh UAV equipment (thiết bị thực, không phải render 3D sẵn có từ stock)
- Screenshot point cloud từ CloudCompare hoặc tương đương
- Diagram kỹ thuật tự vẽ (SVG)

**Xử lý ảnh nếu dùng:**
```css
.technical-image {
  filter: saturate(0.85) contrast(1.05);  /* slight desaturation — khoa học hơn */
  border: 1px solid var(--color-base-700);
  border-radius: 4px;
}
```

Không dùng `border-radius` lớn (>8px) cho ảnh kỹ thuật — tạo cảm giác nghiêm túc.

---

## 14. Section Transitions

### Scroll-triggered reveal

```css
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 400ms ease, transform 400ms ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

Trigger: `IntersectionObserver`, threshold 0.15.  
Stagger cho card groups: `transition-delay: calc(var(--card-index) * 80ms)`.  
Max stagger delay: 320ms (4 cards × 80ms).

### Between sections

Không dùng hard horizontal lines as primary divider — dùng `padding-block` gap đủ lớn.  
Chỉ dùng `<hr>` khi có section nội dung cùng màu nền liền kề cần tách biệt rõ.

### S03 → S04 → S05 narrative flow

Scroll-linked annotation layer (S03) dissolves into capability cards (S04) dissolves into 3D scene (S05). Không transition JS phức tạp — CSS opacity + pointer-events là đủ.

---

## 15. Hover Behaviour

| Element | Default | Hover | Duration |
|---|---|---|---|
| Nav links | `--color-base-300` | `--color-base-100` | 150ms |
| Card | `border: base-700` | `border: accent-lidar` | 200ms |
| Problem card | `border-left: base-700` | `border-left: accent-lidar` | 200ms |
| FAQ accordion | `bg: base-950` | `bg: base-900` | 150ms |
| Button primary | `bg: accent-lidar` | `bg: accent-data` | 150ms |
| Button ghost | transparent | `bg: accent-lidar`, text `base-950` | 150ms |
| Metric value | static | unchanged — không hover effect trên data |
| 3D scene plot | normal | `stroke: accent-lidar`, tooltip show | 100ms |
| Deliverable item | `border: base-700` | `border: accent-data` | 200ms |

Không dùng scale transform lớn (>1.02). Không dùng glow/drop-shadow.

---

## 16. Scroll Behaviour

### Global

```css
html {
  scroll-behavior: smooth;
}
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}
```

### Sticky nav

```css
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(8, 13, 16, 0.92);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--color-base-800);
}
```

### Parallax (hero only)

Giới hạn parallax chỉ tại S01:
```javascript
// camera.position.y += scrollY * 0.005
// Clamp: [-2, 2] world units
```
Không áp dụng parallax CSS `transform` cho background images — gây layout jank.

### Scroll-linked S03 diagram

Annotation từng lớp hiện theo scroll position:
```javascript
const progress = (scrollY - sectionTop) / sectionHeight;
// Layer 0 visible at progress > 0
// Layer 1 visible at progress > 0.2
// Layer 2 visible at progress > 0.4
// Layer 3 visible at progress > 0.6
// Layer 4 visible at progress > 0.8
```

---

## 17. Mobile Composition

### Breakpoints

```css
/* S — mobile portrait */
@media (max-width: 479px) { }
/* M — mobile landscape / small tablet */
@media (min-width: 480px) and (max-width: 767px) { }
/* L — tablet */
@media (min-width: 768px) and (max-width: 1023px) { }
/* XL — desktop */
@media (min-width: 1024px) { }
```

### Per-section mobile rules

| Section | Desktop | Mobile |
|---|---|---|
| S01 Hero | Full-viewport canvas + centered text | 3D scene ≤ 40vh, text below |
| S02 Problem | 3-col cards | Stacked cards, full-width |
| S03 Forest as Data | 7+4 asymmetric | Diagram above, text below |
| S04 Method | 3-col capability cards | Stacked |
| S05 3D Map | Full canvas + right panel | Canvas 50vh + toggle below |
| S06 Use Cases | 3-col | Stacked |
| S07 Workflow | Horizontal stepper | Vertical timeline |
| S08 Service Levels | 3-col comparison | Tab switcher (one visible at a time) |
| S09 Deliverables | 2×3 grid | List stacked |
| S10 Positioning | 5+6 col | Stacked; callout full-width |
| S11 FAQ | Narrow 6-col centered | Full-width accordion |
| S12 AI Agent | Widget embedded | Bottom sheet |
| S13 Lead CTA | 2-col split | Single column, form below copy |

### Touch targets

Minimum `44×44px` cho tất cả interactive elements.  
Tap spacing: `gap: var(--space-4)` minimum giữa các tappable items.

### Font scaling on mobile

```css
h1 { font-size: clamp(1.8rem, 6vw, 4.209rem); }
h2 { font-size: clamp(1.5rem, 4vw, 2.369rem); }
h3 { font-size: clamp(1.2rem, 3vw, 1.777rem); }
```

---

## 18. Loading & Error States

### Page initial load

```html
<!-- Skeleton screen cho card groups -->
<div class="card skeleton" aria-hidden="true"></div>
```

```css
.skeleton {
  background: linear-gradient(90deg,
    var(--color-base-900) 25%,
    var(--color-base-850) 50%,
    var(--color-base-900) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
@media (prefers-reduced-motion: reduce) {
  .skeleton { animation: none; }
}
```

### Three.js scene loading

```
State 1: Spinner (SVG, not GIF) + "Đang tải bản đồ 3D..."
State 2: Scene renders
State 3 (error): Static fallback image + "Trình duyệt không hỗ trợ WebGL. Xem ảnh minh họa."
```

Spinner: simple CSS SVG stroke animation. Màu `--color-accent-lidar`. Không dùng third-party spinner library.

### Form states (S13)

```
Default:  Field outline var(--color-base-700)
Focus:    Field outline var(--color-accent-lidar), 2px
Error:    Field outline var(--color-error), inline message below
Success:  Replace form with: "Yêu cầu của bạn đã được gửi. Chuyên gia tư vấn sẽ liên hệ trong vòng 1 ngày làm việc."
          (Duration: không tự hide, user phải scroll)
```

### AI Agent chat (S12)

```
Loading message: "..." typing indicator — 3 dots CSS animation
Error: "Trợ lý AI tạm thời không phản hồi. Vui lòng để lại thông tin để được hỗ trợ." + link #lead
Empty state: welcome message + 4 suggested question chips
```

---

## Phase 03 Gate Checklist

| # | Tiêu chí | Kết quả |
|---|---|---|
| G1 | Developer có thể implement mà không cần ra quyết định visual lớn | PASS — font, màu, spacing, component, animation đều được đặc tả cụ thể |
| G2 | Không có generic green/eco clichés | PASS — palette dark terrain + LiDAR accent; không có #4caf50 hay leaf icons |
| G3 | Hình ảnh liên kết sinh thái rừng với viễn thám/GIS/đo lường carbon | PASS — point cloud, CHM gradient, GIS map styling, topographic texture |
| G4 | Typography được đặc tả đủ scale, weight, line-height, letter-spacing | PASS |
| G5 | Responsive rules đầy đủ cho mỗi section | PASS |
| G6 | 3D rules của AGENTS.md được tôn trọng: fallback, reduced-motion, non-blocker | PASS |
| G7 | Loading/error states được mô tả cho cả 3 thành phần quan trọng | PASS — Three.js, Form, AI Agent |
| G8 | File UTF-8, không BOM, ký tự tiếng Việt bảo toàn | PASS (verified by write script) |

---

STATUS: PASS

COMPLETED:
- Đọc AGENTS.md, docs/00-project-brief.md, docs/01-content-contract.md, docs/02-information-architecture.md
- Định nghĩa đầy đủ visual direction: concept, typography, palette, background, grid, spacing, cards, buttons, metric, GIS, point cloud, 3D language, image, transitions, hover, scroll, mobile, loading/error states

ARTIFACTS:
- docs/03-visual-direction.md

RISKS:
- Font loading (Space Grotesk + Inter + JetBrains Mono): 3 Google Fonts families — cần preconnect + font-display: swap để tránh FOUT. Phase 07 sẽ implement.
- Dark mode only: nếu client sau này yêu cầu light mode, sẽ cần design token restructure.
- Topographic texture (S07): optional — disable nếu vượt performance budget.

NEEDS USER DECISION: Không có.

NEXT PHASE: prompts/04-design-system.md
