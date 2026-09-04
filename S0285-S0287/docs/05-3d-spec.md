# 3D Technical Specification — S0285-S0287
## Đánh giá và lập bản đồ hấp thụ carbon trong sinh khối rừng
### Three.js Interactive Architecture & Visualization Narrative | Phase 05 Artifact

> **Mục tiêu cốt lõi của tầng 3D:**  
> Tầng 3D là một công cụ trực quan hóa khoa học dữ liệu viễn thám và địa không gian (scientific data visualization), **tuyệt đối không phải đồ họa trang trí thuần túy**.  
> Cảnh 3D phải trực quan hóa sống động và chính xác chuỗi giá trị kỹ thuật cốt lõi:  
> **Địa hình tự nhiên (DTM) → Quét chùm xung UAV LiDAR (Point Cloud) → Mô hình chiều cao tán (CHM & Cây đơn lẻ) → Hiệu chuẩn ô tiêu chuẩn & Ước tính sinh khối (AGB) → Lập bản đồ phân bố trữ lượng carbon theo lô rừng (tCO2e/ha).**

---

## 1. Coherent 3D Narrative — 5 Trạng thái Diễn giải (5-State Sequence)

Hệ thống 3D được thiết kế thành một thực thể dữ liệu thống nhất (Single Unified Scene Controller) chuyển biến mượt mà qua 5 trạng thái (States A → E), tương ứng với tiến trình hiểu biết của khách hàng và thao tác điều khiển (scroll-linked hoặc state switcher buttons):

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│     STATE A     │ ──> │     STATE B     │ ──> │     STATE C     │ ──> │     STATE D     │ ──> │     STATE E     │
│ Terrain & Forest│     │  UAV & LiDAR    │     │ Canopy & Trees  │     │ Biomass Density │     │ Carbon GIS Map  │
│  (Rừng tự nhiên)│     │(Đo quét viễn thám)│   │  (CHM bóc tách) │     │ (Lượng hóa AGB) │     │(Phân vùng theo lô)│
└─────────────────┘     └─────────────────┘     └─────────────────┘     └─────────────────┘     └─────────────────┘
```

---

### State A — Terrain & Natural Forest (Rừng & Địa hình cơ sở)
- **Ý nghĩa kỹ thuật:** Giới thiệu hiện trạng lâm phần rừng tự nhiên trước khi đo đạc. Thể hiện sự phức tạp về địa hình dốc đồi núi và tán cây che phủ dày đặc mà điều tra mặt đất truyền thống gặp khó khăn.
- **Thành phần hiển thị:**
  - Lưới địa hình mô hình số độ cao đất DTM (`PlaneGeometry` biến dạng theo hàm độ cao đồi núi thực tế).
  - Tán rừng dạng cụm khối sinh thái (Canopy Clusters) sử dụng `InstancedMesh` tán cây tự nhiên với màu xanh diệp lục trầm tự nhiên (muted forest greens: `#1b382b`, `#234735`).
  - Ánh sáng môi trường tự nhiên, dịu nhẹ.
- **Dữ liệu truyền tải:** Nhận thức rõ hiện trạng rừng tự nhiên và ranh giới khu vực khảo sát.

---

### State B — Measurement & UAV LiDAR Scanning (Đo quét viễn thám UAV LiDAR)
- **Ý nghĩa kỹ thuật:** Trực quan hóa nguyên lý quét chủ động của cảm biến LiDAR (tham chiếu Zenmuse L2) gắn trên UAV công nghiệp. Chùm tia laser phát nhiều xung hồi xuyên thấu qua các khe tán rừng chạm tới mặt đất.
- **Thành phần hiển thị:**
  - Mô hình biểu trưng UAV bay theo tuyến định sẵn (flight strip) ở độ cao ổn định trên tán rừng.
  - Chùm xung quét LiDAR (LiDAR scan cone / swath beam) phát tia quét động dạng nón quạt màu cyan (`#00c4e8`, độ trong suốt `opacity: 0.25`).
  - Điểm mây LiDAR (`THREE.Points`) xuất hiện dần dọc theo vệt quét: các điểm tán trên (canopy returns) và các điểm xuyên chạm mặt đất (ground returns).
- **Dữ liệu truyền tải:** Minh chứng nguyên lý quét phủ kín 100% diện tích và khả năng xuyên tán lấy tọa độ 3D thực tế, khắc phục nhược điểm chỉ lấy mẫu 0,01–0,1% của phương pháp truyền thống.

---

### State C — Canopy Structure & Individual Tree Segmentation (Cấu trúc tán CHM & Tách cây đơn lẻ)
- **Ý nghĩa kỹ thuật:** Bóc tách đám mây điểm thành hai lớp: Mô hình số bề mặt tán (DSM/CHM) và Mô hình độ cao mặt đất (DTM). Trực quan hóa việc tách từng cây đơn lẻ (từ gói Level 2) và đo đạc chiều cao vút ngọn ($H_{vn}$), đường kính tán.
- **Thành phần hiển thị:**
  - Lớp DTM mặt đất chuyển sang dạng lưới dây wireframe kỹ thuật (`#1e3040`).
  - Đám mây điểm tán rừng được tô màu theo trục thẳng đứng tương đối (Normalized Height - CHM):
    - Tầng dưới (0–5m): `#1a3a4a` (xanh xám thẫm)
    - Tầng trung (5–18m): `#00c4e8` (cyan)
    - Tầng tán chính (18–28m): `#3dd6b5` (teal-green)
    - Tầng vượt tán (>28m): `#f5c94e` (amber đỉnh tán)
  - Vòng bao đỉnh cây đơn lẻ (Canopy crowns bounding ellipses / vertices) hiển thị vị trí định danh từng cây.
  - Vị trí các ô tiêu chuẩn mặt đất (Ground Truth Plots) hiển thị dưới dạng khung hình học hiệu chuẩn (calibration boundary boxes) nổi bật (`#ffffff`).
- **Dữ liệu truyền tải:** Cấu trúc tầng thứ tán rừng và cơ sở dữ liệu số hóa hình học cây gỗ.

---

### State D — Biomass Density Modeling (Mô hình hóa mật độ sinh khối AGB)
- **Ý nghĩa kỹ thuật:** Kết hợp dữ liệu trích xuất từ LiDAR (chiều cao $H_{vn}$, thể tích tán, độ che phủ) với dữ liệu đường kính $D_{1.3}$ từ ô tiêu chuẩn thực địa, chạy mô hình học máy (Machine Learning) và phương trình tương quan sinh trưởng (Allometric equations) để ước tính sinh khối tươi/khô trên mặt đất (AGB).
- **Thành phần hiển thị:**
  - Đám mây điểm và tán cây chuyển đổi màu sắc từ thang đo chiều cao sang thang đo mật độ sinh khối (AGB Gradient - tấn/ha):
    - Sinh khối thấp: `#00c4e8` (cyan)
    - Sinh khối trung bình: `#7be36a` (lime green)
    - Sinh khối cao: `#f5c94e` (amber)
    - Sinh khối rất cao: `#f07030` (warm orange)
  - Các đường liên kết ảo (vector connection lines) nối từ ô tiêu chuẩn mặt đất đến các cây xung quanh biểu thị quá trình huấn luyện và hiệu chuẩn mô hình (Model Calibration).
- **Dữ liệu truyền tải:** Minh bạch quy trình tính toán sinh khối khoa học có kiểm chứng thực địa, không suy diễn võ đoán.

---

### State E — Carbon Spatial Map & Parcel GIS (Lập bản đồ carbon theo lô rừng & Chuẩn bị MRV)
- **Ý nghĩa kỹ thuật:** Quy đổi sinh khối AGB sang trữ lượng carbon ($tC/ha$) theo hệ số IPCC và tương đương $tCO_2e/ha$. Phân vùng không gian thành các lô rừng lâm nghiệp có mã định danh, ranh giới vector chuẩn GIS và sai số thống kê minh bạch ($R^2$, RMSE).
- **Thành phần hiển thị:**
  - Bề mặt địa hình biến thành bản đồ số chuyên đề (Thematic Carbon Choropleth Mesh).
  - Ranh giới các lô rừng (Forest Compartment Polygons) kẻ viền vector sắc nét (`#ddeef5` với độ mờ nhẹ, highlight viền `#00c4e8`).
  - Nhãn mã hiệu lô (Plot Labels: Lô 1, Lô 2, Lô 3...).
  - Tương tác Hover/Click: Người dùng rê chuột vào từng lô để mở bảng dữ liệu thuộc tính HUD (Trữ lượng $tCO_2e/ha$, diện tích, khoảng sai số ước tính).
  - Chú giải thanh màu (Color Ramp Legend) hiển thị chuẩn mực ở góc màn hình.
- **Dữ liệu truyền tải:** Sản phẩm đầu ra chuẩn hóa (GeoTIFF/Shapefile) đóng vai trò gói dữ liệu kỹ thuật đầu vào phục vụ báo cáo MRV độc lập theo Nghị định 180/2026/NĐ-CP.

---

## 2. Technical Architecture & Three.js Specifications

### 2.1 Camera & Viewport Rig
- **Loại Camera:** `THREE.PerspectiveCamera`
  - Field of View (FOV): `45°` (giữ góc nhìn khoa học, giảm méo phối cảnh viễn thám).
  - Near plane: `0.1` đơn vị thế giới.
  - Far plane: `1000` đơn vị thế giới.
- **Vị trí và Góc nhìn theo trạng thái (Camera Choreography):**
  - *State A:* `pos: [0, 45, 75]`, `target: [0, 0, 0]` (Góc nhìn toàn cảnh phối cảnh xéo từ trên cao).
  - *State B:* `pos: [15, 30, 50]`, `target: [0, 5, 0]` (Hạ thấp góc nhìn bám theo vệt quét UAV).
  - *State C:* `pos: [-20, 20, 35]`, `target: [-5, 8, 0]` (Góc cận cảnh mặt cắt đứng phân tầng tán).
  - *State D:* `pos: [0, 35, 60]`, `target: [0, 2, 0]` (Góc bao quát mô hình mật độ sinh khối).
  - *State E:* `pos: [0, 60, 45]`, `target: [0, 0, 0]` (Góc dốc cao gần như trực giao Orthographic ~60° để đọc bản đồ lô GIS).
- **Camera Controls:**
  - Sử dụng `OrbitControls` tùy biến, kích hoạt tại S05 (State E hoặc chế độ tự do tương tác).
  - Giới hạn góc cực (Polar Angle): `minPolarAngle = 0.1 rad (~5°)`, `maxPolarAngle = Math.PI / 2.3 (~78°)` — tuyệt đối ngăn người dùng xoay camera xuống dưới mặt đất (underground clipping).
  - Giới hạn cự ly (Damping & Distance): `minDistance = 15`, `maxDistance = 120`. Kích hoạt `enableDamping = true`, `dampingFactor = 0.05`.

---

### 2.2 Terrain Geometry (DTM Base)
- **Geometry:** `THREE.PlaneGeometry(80, 80, 128, 128)`. Xoay ngang trục X (`rotation.x = -Math.PI / 2`).
- **Tạo lập độ cao (Elevation Generation):**
  - Khởi tạo độ cao thực nghiệm sử dụng thuật toán nhiễu Perlin/Simplex đa tầng (Fractal Brownian Motion - FBM) hoặc dữ liệu mảng độ cao chuẩn hóa:
    $$Z(x, y) = A_1 \cdot 	ext{noise}(x \cdot f_1, y \cdot f_1) + A_2 \cdot 	ext{noise}(x \cdot f_2, y \cdot f_2)$$
    với biên độ sườn đồi thực tế, tạo thung lũng và dốc đồi đặc trưng vùng lâm nghiệp nhiệt đới Việt Nam.
- **Tọa độ thuộc tính (Attributes):**
  - Gán thêm custom attribute `aParcelId` (chỉ số lô từ 1 đến 5) vào từng đỉnh để phục vụ việc highlight và tra cứu lô ở State E.

---

### 2.3 Point Cloud System (Đám mây điểm LiDAR)
- **Cấu trúc:** `THREE.Points` kết hợp `THREE.BufferGeometry`.
- **Dung lượng điểm (Point Budget):**
  - Desktop cao cấp / tiêu chuẩn: `60,000 – 120,000` điểm (đảm bảo 60 FPS mượt mà trên trình duyệt).
  - Mobile / Thiết bị yếu: `15,000 – 30,000` điểm.
- **Attributes của BufferGeometry:**
  - `position` (`Float32Array`, 3 components): Tọa độ $(x, y, z)$ của từng điểm.
  - `color` (`Float32Array`, 3 components): Màu sắc nội suy theo trạng thái (RGB).
  - `heightNorm` (`Float32Array`, 1 component): Chiều cao chuẩn hóa trên mặt đất ($0.0 	o 1.0$) dùng cho shader tính toán CHM.
  - `biomassVal` (`Float32Array`, 1 component): Giá trị sinh khối tương đối gán cho điểm.
  - `parcelIndex` (`Float32Array`, 1 component): Mã lô rừng chứa điểm.
- **Vật liệu (Point Material):**
  - `THREE.PointsMaterial` với kích thước `size: 0.18`, `sizeAttenuation: true`, `transparent: true`, `opacity: 0.85`, `vertexColors: true`, `depthWrite: false`.

---

### 2.4 Tree Representation (Mô hình tán cây thực thể)
- **Cấu trúc:** `THREE.InstancedMesh` để tối ưu triệt để Draw Calls.
  - Geometry cơ sở: Hình nón cụt cách điệu đa diện thấp (`ConeGeometry(1.2, 3.5, 5)` hoặc tán cầu phân tầng `IcosahedronGeometry(1.4, 1)`).
  - Số lượng instances: `300 – 600` cây trên toàn lâm phần giả lập.
  - Ma trận biến đổi (`instanceMatrix`): Vị trí gốc cây bám khớp chính xác vào cao độ $Z$ của địa hình DTM; tỉ lệ chiều cao và độ xòe tán được biến thiên ngẫu nhiên theo phân bố sinh thái tự nhiên.
  - Thuộc tính màu theo instance (`instanceColor`): Điều chỉnh linh hoạt theo từng State (State A: xanh tự nhiên; State C: phân lớp tán; State D/E: ẩn dần để nhường chỗ cho bản đồ heatmap).

---

### 2.5 Materials & Shaders
Toàn bộ vật liệu tuân thủ ngôn ngữ trực quan khoa học viễn thám:
1. **Terrain Material:**
   - *State A-D:* `THREE.MeshStandardMaterial` màu đá đất trầm (`#0c151c`), `roughness: 0.85`, `wireframe: false`.
   - *State E (Bản đồ carbon):* Custom Vertex/Fragment Shader hoặc CanvasTexture tạo lớp màu phủ chuyên đề (Choropleth Heatmap) phản ánh mật độ $tCO_2e/ha$ theo từng lô.
2. **LiDAR Beam Material:**
   - `THREE.CylinderGeometry` dạng hình nón hở đáy, vật liệu `THREE.MeshBasicMaterial` màu cyan `#00c4e8`, `transparent: true`, `opacity: 0.18`, `blending: THREE.AdditiveBlending`, `side: THREE.DoubleSide`.
3. **Parcel Boundary Material:**
   - `THREE.LineSegments` hoặc dải ribbon mỏng nổi nhẹ trên mặt địa hình (`polygonOffset: true`), màu `#00c4e8` (nét đứt hoặc nét liền), độ dày viền nổi bật khi được chọn.

---

### 2.6 Lighting, Fog & Background
- **Background:** Màu nền đồng nhất tuyệt đối với màu trang web: `#080d10` (Dark Terrain Base 950).
- **Fog (Sương mù không gian):**
  - `THREE.FogExp2('#080d10', 0.008)` — giúp các cạnh xa của mô hình hòa tan tự nhiên vào nền trang web, không tạo đường cắt cạnh hộp (box clipping).
- **Hệ thống ánh sáng (Restrained Scientific Lighting):**
  - Không sử dụng hiệu ứng bóng đổ phức tạp (cast shadow = false) để bảo tồn tài nguyên phần cứng.
  - `THREE.AmbientLight('#ffffff', 0.5)`: Cung cấp độ sáng đều cho các góc khuất.
  - `THREE.DirectionalLight('#b0d4e8', 0.85)`: Đặt tại tọa độ `[40, 80, 30]`, tạo độ tương phản khối nổi nhẹ trên sườn địa hình.

---

## 3. Thang màu khoa học & Chú giải (Color Mapping & Legend Specification)

Thang màu tuân thủ nghiêm ngặt nguyên tắc của tài liệu *Visual Direction (Phase 03)* — dải màu chuyển đổi liên tục phản ánh nồng độ dữ liệu:

```
Thấp ─────────────────────────────────────────────────────────> Cao
#00c4e8        #3dd6b5        #7be36a        #f5c94e        #f07030
(LiDAR Cyan)   (Data Teal)    (Map Lime)     (Canopy Amber) (Peak Orange)
```

### 3.1 Bảng ánh xạ giá trị theo trạng thái

| Trạng thái | Thuộc tính thể hiện | Thang giá trị mẫu [NEEDS VERIFICATION]* | Màu hiển thị tương ứng |
|---|---|---|---|
| **State C** (CHM) | Chiều cao tán cây ($H_{vn}$) | `0 – 5m`<br>`5 – 15m`<br>`15 – 25m`<br>`> 25m` | `#1a3a4a` (tầng sát đất)<br>`#00c4e8` (tầng dưới)<br>`#3dd6b5` (tán chính)<br>`#f5c94e` (cây vượt tán) |
| **State D** (AGB) | Sinh khối trên mặt đất | `< 50 tấn/ha`<br>`50 – 150 tấn/ha`<br>`150 – 250 tấn/ha`<br>`> 250 tấn/ha` | `#00c4e8`<br>`#7be36a`<br>`#f5c94e`<br>`#f07030` |
| **State E** (Carbon) | Trữ lượng carbon quy đổi | `< 50 tCO2e/ha`<br>`50 – 120 tCO2e/ha`<br>`120 – 200 tCO2e/ha`<br>`> 200 tCO2e/ha` | `#00c4e8` (Lô phục hồi)<br>`#7be36a` (Lô trung bình)<br>`#f5c94e` (Lô giàu)<br>`#f07030` (Lô bảo tồn cao) |

*\*Lưu ý khoa học: Các con số ngưỡng định lượng trên đây chỉ mang tính minh họa trực quan cho giao diện. Bảng giá trị thực tế của từng dự án cụ thể sẽ phụ thuộc vào trạng thái rừng, loài cây ưu thế và dữ liệu ô tiêu chuẩn được nghiệm thu.*

---

## 4. Tương tác người dùng & Hành vi chuyển trạng thái (Interactions & Transitions)

### 4.1 Cơ chế điều khiển kép (Dual Control Modes)

Cảnh 3D hỗ trợ hai chế độ điều khiển đồng bộ:
1. **Scroll-Driven Progression (Mặc định khi cuộn trang):**
   - Sử dụng `IntersectionObserver` và tỉ lệ cuộn của khung chứa S05 để tính toán `scrollProgress` ($0.0 	o 1.0$).
   - Khi cuộn qua các phân đoạn, hệ số nội suy (lerp) dịch chuyển vị trí camera và hòa trộn thuộc tính màu sắc (alpha blending) giữa các trạng thái:
     - $0.00 – 0.20$: State A (Terrain/Forest)
     - $0.21 – 0.40$: State B (UAV LiDAR Scan)
     - $0.41 – 0.60$: State C (CHM Structure)
     - $0.61 – 0.80$: State D (Biomass AGB)
     - $0.81 – 1.00$: State E (Carbon Map & GIS)
2. **Direct State Switcher (Bảng nút bấm chọn nhanh):**
   - Thanh công cụ điều khiển nhanh (UI Segmented Control) gắn nổi trên canvas:
     `[ 01 Địa hình ] [ 02 Quét LiDAR ] [ 03 Cấu trúc tán ] [ 04 Sinh khối AGB ] [ 05 Bản đồ Carbon ]`
   - Nhấp chọn trạng thái sẽ kích hoạt chuyển động máy ảnh mượt mà (smooth camera tween) trong $800	ext{ms}$ thông qua hàm nội suy trơn cubic-bezier.

---

### 4.2 Tương tác trỏ chuột & Tra cứu lô rừng (Hover / Click Raycasting tại State E)
- **Cơ chế:** Sử dụng `THREE.Raycaster` bắt giao điểm giữa con trỏ chuột và các đa giác lô rừng trên bề mặt DTM.
- **Hành vi Hover:**
  - Viền lô được trỏ chuột phát sáng viền cyan (`#00c4e8`).
  - Hiển thị Tooltip HUD (C09 Tooltip Component) di chuyển theo vị trí chuột:
    ```
    ┌────────────────────────────────────────┐
    │ LÔ RỪNG: KHOẢNH 02 - TIỂU KHU 48       │
    │ Diện tích: 14.8 ha                     │
    │ Trữ lượng carbon: 164.2 tCO2e/ha       │
    │ Ước tính tổng: 2,430 tCO2e             │
    │ Độ tin cậy (R²): 0.86 | RMSE: 12.4%    │
    │ [Dữ liệu kỹ thuật đầu vào phục vụ MRV] │
    └────────────────────────────────────────┘
    ```
- **Hành vi Click:**
  - Cố định camera vào tâm của lô được chọn, hiển thị bảng thông số chi tiết của lô ở thanh bên (Sidebar Drawer).
- **Hành vi Unhover:**
  - Tooltip mờ dần trong $150	ext{ms}$, khôi phục viền mặc định.

---

## 5. Hiệu năng, Kiểm soát tài nguyên & Chiến lược dự phòng (Performance & Fallback Strategy)

### 5.1 Giới hạn phần cứng & Ngân sách tài nguyên (Budget Constraints)
- **Device Pixel Ratio (DPR):** Cố định nghiêm ngặt:
  ```javascript
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  ```
  *Tuyệt đối không để DPR tự nhiên = 2.0 hoặc 3.0 trên màn hình Retina/4K vì sẽ làm tăng gấp 4 đến 9 lần số lượng pixel cần tính toán của fragment shader mà không gia tăng giá trị nhận thức.*
- **Draw Call Budget:** Tối đa không vượt quá **15 Draw Calls** trên toàn cảnh nhờ áp dụng:
  - 1 draw call cho Point Cloud (`THREE.Points`).
  - 1 draw call cho DTM Terrain (`THREE.Mesh`).
  - 1 draw call cho Instanced Trees (`THREE.InstancedMesh`).
  - 1 draw call cho ranh giới lô (`THREE.LineSegments`).
  - 1-2 draw calls cho tia quét UAV và điểm đánh dấu.
- **Frustum Culling:** Kích hoạt toàn bộ trên các geometry.
- **Tạm dừng vòng lặp Render khi ngoài màn hình (Intersection Observer Loop):**
  ```javascript
  let isSceneVisible = false;
  const sceneObserver = new IntersectionObserver(([entry]) => {
    isSceneVisible = entry.isIntersecting;
    if (isSceneVisible) requestAnimationFrame(renderLoop);
  }, { threshold: 0.05 });
  sceneObserver.observe(canvasContainer);
  ```

---

### 5.2 Quản lý bộ nhớ & Giải phóng tài nguyên (Memory Disposal Protocol)
Khi người dùng chuyển trang hoặc component bị hủy, toàn bộ thực thể WebGL phải được thu hồi triệt để nhằm tránh rò rỉ bộ nhớ (Memory Leak):
```javascript
function dispose3DScene() {
  cancelAnimationFrame(animationFrameId);
  scene.traverse((object) => {
    if (object.geometry) object.geometry.dispose();
    if (object.material) {
      if (Array.isArray(object.material)) {
        object.material.forEach(m => disposeMaterial(m));
      } else {
        disposeMaterial(object.material);
      }
    }
  });
  renderer.dispose();
  renderer.forceContextLoss();
}

function disposeMaterial(mat) {
  mat.dispose();
  for (const key of Object.keys(mat)) {
    if (mat[key] && typeof mat[key].dispose === 'function') {
      mat[key].dispose();
    }
  }
}
```

---

### 5.3 Chế độ giảm tải chuyển động (Reduced-Motion Mode)
Tuân thủ tiêu chuẩn trợ năng WCAG 2.1 và chỉ thị hệ thống:
```javascript
const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
if (motionQuery.matches) {
  // Tắt hoàn toàn camera lerp animation
  // Tắt chuyển động xoay tự do và hiệu ứng xung tia quét LiDAR
  // Hiển thị khung tĩnh cố định chất lượng cao của State E
  // Người dùng chuyển đổi trạng thái bằng cách nhấp nút (Instant Jump thay vì tween)
}
```

---

### 5.4 Phân cấp dự phòng (Graceful Degradation & Fallbacks)

Hệ thống thiết lập 3 tầng bảo trợ hiển thị:

```
┌───────────────────────────────────────────────────────────────────┐
│ TẦNG 1: Trình duyệt hỗ trợ WebGL2 + Thiết bị cấu hình tiêu chuẩn  │
│  ==> Kích hoạt toàn bộ cảnh 3D tương tác, đổ màu mây điểm 100k    │
└───────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼ (Nếu GPU yếu hoặc Mobile màn hình hẹp)
┌───────────────────────────────────────────────────────────────────┐
│ TẦNG 2: Thiết bị di động hoặc GPU cấu hình tiết kiệm              │
│  ==> Giảm điểm xuống 20k; khóa OrbitControls; chỉ hiển thị State E │
│      với góc nhìn trực giao 2.5D tĩnh có nút chuyển lát cắt       │
└───────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼ (Nếu trình duyệt không có WebGL / Render lỗi)
┌───────────────────────────────────────────────────────────────────┐
│ TẦNG 3: WebGL Unsupport / Context Creation Error                  │
│  ==> Kích hoạt ngay Component C13 Fallback:                       │
│      Hiển thị bộ ảnh minh họa kỹ thuật GeoTIFF trực quan          │
│      kèm ghi chú chú giải khoa học rõ ràng; trang web tiếp tục    │
│      hoạt động 100% chức năng văn bản và tư vấn mà không bị chặn. │
└───────────────────────────────────────────────────────────────────┘
```

---

## 6. Tiêu chí kiểm định Cổng Giai đoạn 05 (Phase 05 Gate Checklist)

| # | Tiêu chí kiểm tra | Đánh giá | Ghi chú minh chứng |
|---|---|---|---|
| **G1** | 3D diễn giải trực tiếp bản chất kỹ thuật đo đạc/lập bản đồ của dịch vụ | **PASS** | Chuỗi 5 trạng thái A→E tái hiện đúng: Địa hình → Quét LiDAR → CHM → Sinh khối AGB → Bản đồ carbon theo lô. |
| **G2** | Không biến 3D thành hoạt họa trang trí vô nghĩa | **PASS** | Mỗi trạng thái gắn liền với một bước chuyển hóa dữ liệu viễn thám thực tế. |
| **G3** | Ranh giới MRV được tôn trọng trong tầng dữ liệu 3D | **PASS** | State E và Tooltip ghi nhận rõ: "Gói dữ liệu kỹ thuật đầu vào phục vụ MRV", không cam kết thay thế kiểm định độc lập. |
| **G4** | Không tự tạo ngưỡng số liệu khoa học sai lệch | **PASS** | Bảng giá trị được đánh dấu `[NEEDS VERIFICATION]` với lưu ý khoa học rõ ràng. |
| **G5** | Quy chuẩn hiệu năng WebGL được đặc tả chi tiết | **PASS** | Giới hạn DPR ≤ 1.5, ngân sách 15 draw calls, Frustum culling, tạm dừng render khi khuất màn hình. |
| **G6** | Phương án giải phóng bộ nhớ (Disposal Protocol) đầy đủ | **PASS** | Mã thu hồi geometry, texture, context loss được định nghĩa chi tiết. |
| **G7** | Chế độ Reduced-Motion & Fallbacks đầy đủ | **PASS** | Hỗ trợ 3 tầng fallback và ngắt hoạt họa khi hệ thống kích hoạt giảm chuyển động. |
| **G8** | Tiêu chuẩn mã hóa UTF-8 tiếng Việt hoàn hảo | **PASS** | Toàn bộ văn bản tiếng Việt bảo tồn nguyên vẹn dấu và ký tự chuyên ngành. |

---

**KẾT LUẬN GIAI ĐOẠN 05:** **STATUS: PASS**

- **Tài liệu tạo lập:** `docs/05-3d-spec.md`
- **Rủi ro kiểm soát:** Độ phức tạp shader được cô lập trong các module độc lập; cơ chế fallback đảm bảo 100% trải nghiệm người dùng ngay cả trên thiết bị cũ.
- **Bước tiếp theo:** Sẵn sàng bước vào `prompts/06-threejs-prototype.md` để xây dựng nguyên mẫu mã nguồn Three.js thực tế trong `src/3d/`.
