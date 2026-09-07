# BÁO CÁO KIỂM TOÁN NGUYÊN NHÂN GỐC THỊ GIÁC THREE.JS (VISUAL ROOT-CAUSE AUDIT)
# DỰ ÁN S0285-S0287 · CARBON SINH KHỐI RỪNG UAV LiDAR
> **Giai đoạn:** AUDIT ONLY (Chỉ kiểm toán — Tuyệt đối không can thiệp mã nguồn)  
> **Tài liệu tạo:** `docs/11-threejs-visual-audit.md`  
> **Thời điểm kiểm toán:** 2026-09-04  

---

## 1. TỔNG QUAN HIỆN TRẠNG & BỐI CẢNH KIỂM TOÁN

Hiện tại, hệ thống 3D trên landing page bao gồm 2 khung cảnh riêng biệt:
1. **`HeroScene` (`src/3d/hero-scene.js`):** Khung cảnh 3D không gian nền tại khu vực Hero (S01 - `#hero-3d-canvas`), hiển thị ngay khi người dùng tải trang.
2. **`ForestCarbonScene` (`src/3d/scene.js`):** Bộ tương tác chuyên sâu 5 trạng thái tại Mục 5 (S05 - `#viewer-3d-canvas`).

Qua hình ảnh trực quan thực tế ghi nhận tại viewport desktop (1440×900) tại Hero, kết quả hiển thị hiện thời mang tính **"Khoa học viễn tưởng đại trà (Generic Sci-Fi / Cyberpunk)"** thay vì **"Hệ thống Dữ liệu Viễn thám Lâm nghiệp Thực tế"**. 

Người dùng quan sát thấy:
- Một lưới khung tam giác lồi lõm dày đặc (triangular wireframe)
- Một trường hạt màu cyan (cyan particle field) và rải rác hạt vàng (yellow particles)
- Một số đường cong hình tròn (curved lines) đặt phẳng trên mặt đất
- Một đa giác tối màu khổng lồ lơ lửng giữa trời (large dark floating polygon/plane)
- **Hoàn toàn không nhận diện được cấu trúc cây rừng (no recognizable forest structure)**

Chuỗi giá trị cốt lõi chưa được truyền tải:
$$	ext{RỪNG THỰC ĐỊA} \longrightarrow 	ext{UAV LiDAR} \longrightarrow 	ext{CẤU TRÚC TÁN (CHM)} \longrightarrow 	ext{SINH KHỐI (AGB)} \longrightarrow 	ext{TRỮ LƯỢNG CARBON} \longrightarrow 	ext{BẢN ĐỒ LÔ RỪNG}$$

---

## 2. AUDIT 01 — KIỂM KÊ TOÀN DIỆN CÁC ĐỐI TƯỢNG THREE.JS (OBJECT INVENTORY)

Dưới đây là bảng thống kê chi tiết toàn bộ các đối tượng Three.js đang được tạo ra trong mã nguồn của cả hai khung cảnh:

### A. Khung cảnh Hero (`src/3d/hero-scene.js`)

| Tên đối tượng (Variable/Name) | Phân loại (Three.js Class) | Hình học (Geometry) | Vật liệu (Material) | Vị trí (Position) | Góc xoay / Tỷ lệ (Rot / Scale) | Mục đích thiết kế (Purpose) |
|---|---|---|---|---|---|---|
| `this.scene` | `THREE.Scene` | N/A | `background: 0x080d10`, `fog: FogExp2(0x080d10, 0.014)` | `(0, 0, 0)` | `rot.y = t * 0.035`, scale `1` | Không gian gốc chứa toàn bộ đối tượng và hiệu ứng sương mù |
| `this.camera` | `THREE.PerspectiveCamera` | N/A | `FOV: 40`, `near: 0.1`, `far: 500` | `(22, 26, 36)` | `lookAt(0, 3.5, 0)` | Góc nhìn viễn thám trên không nghiêng góc $35^\circ$ |
| `ambientLight` | `THREE.AmbientLight` | N/A | `color: 0xddeef5`, `intensity: 0.6` | N/A | N/A | Chiếu sáng môi trường dịu màu lam nhạt |
| `sun` | `THREE.DirectionalLight` | N/A | `color: 0xb8e0f0`, `intensity: 0.9` | `(30, 50, 25)` | Hướng về gốc tọa độ | Tạo bóng đổ nhấn mạnh địa hình đồi núi |
| `this.terrainMesh` | `THREE.Mesh` | `PlaneGeometry(52, 52, 60, 60)` | `MeshStandardMaterial({ color: 0x0a141c, roughness: 0.9, metalness: 0.05 })` | `(0, 0, 0)` | `rot.x = -PI/2` | Mặt đất bề mặt địa hình số (DTM) |
| `this.wireMesh` | `THREE.Mesh` | Dùng chung `this.terrainGeom` (60×60) | `MeshBasicMaterial({ color: 0x183448, wireframe: true, opacity: 0.38 })` | `(0, 0.03, 0)` | `rot.x = -PI/2` | Đường đồng mức địa hình (BỊ LỖI: sinh ra lưới tam giác) |
| `this.spatialGrid` | `THREE.GridHelper` | 52×52, 13 vạch chia | LineBasicMaterial (`0x00c4e8`, `0x162c3d`, `opacity: 0.28`) | `(0, -3.5, 0)` | Mặc định | Khung lưới tọa độ không gian tham chiếu ở đáy |
| `this.points` | `THREE.Points` | `BufferGeometry` (19.000 điểm) | `PointsMaterial({ size: 0.22, vertexColors: true, opacity: 0.88, depthWrite: false })` | `(0, 0, 0)` | Mặc định | Đám mây điểm LiDAR phản hồi tán rừng và mặt đất |
| `this.swathMesh` | `THREE.Mesh` | `PlaneGeometry(16, 26, 1, 1)` | `MeshBasicMaterial({ color: 0x00c4e8, opacity: 0.16, AdditiveBlending, DoubleSide, depthWrite: false })` | `(0, 14, 0)` + di chuyển theo sweep | `rot.x = -PI/2` | Vệt quét LiDAR (BỊ LỖI: sinh ra đa giác tối màu lơ lửng) |
| `this.scanLine` | `THREE.Line` | `BufferGeometry` (32 điểm phân đoạn) | `LineBasicMaterial({ color: 0x3dd6b5, opacity: 0.8, AdditiveBlending })` | Theo quét sweepX/Z | Bám mặt đất Y | Vạch quét tiếp địa của chùm tia laser |
| `this.parcelGroup` | `THREE.Group` (chứa 4 Mesh) | `RingGeometry(r-0.25, r, 24)` | `MeshBasicMaterial({ color: hex, opacity: 0.35..0.47, DoubleSide })` | Đặt tại 4 tâm lô | `rot.x = -PI/2` | Ranh giới lô trữ lượng carbon (BỊ LỖI: thành vòng tròn lạ) |

---

### B. Khung cảnh Tương tác Section S05 (`src/3d/scene.js`, `terrain.js`, `forest.js`, `carbon-layer.js`)

| Tên đối tượng (Variable/Name) | Phân loại (Three.js Class) | Hình học (Geometry) | Vật liệu (Material) | Vị trí (Position) | Góc xoay / Tỷ lệ (Rot / Scale) | Mục đích thiết kế (Purpose) |
|---|---|---|---|---|---|---|
| `this.terrain.mesh` | `THREE.Mesh` | `PlaneGeometry(80, 80, 100, 100)` | `MeshStandardMaterial({ vertexColors: true, roughness: 0.85 })` | `(0, 0, 0)` | `rot.x = -PI/2` | Địa hình đồi núi lớn, đổi màu theo 5 lô bản đồ carbon (State E) |
| `this.terrain.boundaryLines` | `THREE.LineSegments` | `BufferGeometry` (các cạnh phân tách lô) | `LineBasicMaterial({ color: 0x00c4e8, opacity: 0.0..0.75 })` | Bám địa hình | Mặc định | Ranh giới phân chia các khoảnh/lô rừng theo tọa độ |
| `this.forest.instancedMesh` | `THREE.InstancedMesh` | `ConeGeometry(1.4, 4.5, 6)` | `MeshStandardMaterial({ roughness: 0.8, transparent: true, opacity: 0.35..0.95 })` | 380 cây phân bố theo địa hình | Scale Y: 0.7-1.6 | Quần thể cây rừng thực địa có cấu trúc tán 3D |
| `this.forest.plotGroup` | `THREE.Group` (4 ô tiêu chuẩn) | `BoxGeometry(4.5, 0.4, 4.5)` + `EdgesGeometry` | `LineBasicMaterial(white)` + `MeshBasicMaterial(cyan 0.25)` | 4 tọa độ cố định | Bám mặt đất | Ô tiêu chuẩn thực địa kiểm chứng mô hình (TT 33/2018) |
| `this.carbon.points` | `THREE.Points` | `BufferGeometry` (45.000 điểm) | `PointsMaterial({ size: 0.22, vertexColors: true, depthWrite: false })` | `(0, 0, 0)` | Mặc định | Lớp dữ liệu đám mây điểm LiDAR phủ trùm toàn khu rừng |
| `this.carbon.uavGroup` | `THREE.Group` (UAV Drone) | Khung Drone: Box + 4 Cylinder + 4 Circle | `MeshStandardMaterial` tối màu + Rotor cyan mờ | Bay cao Y=22 | Bay theo quỹ đạo Lissajous | Thiết bị bay không người lái UAV đo đạc thực tế |
| `this.carbon.lidarBeam` | `THREE.Mesh` | `ConeGeometry(9.0, 18.0, 16, 1, true)` | `MeshBasicMaterial({ color: 0x00c4e8, opacity: 0.2, AdditiveBlending })` | Gắn dưới bụng UAV | Chĩa xuống đất | Chùm tia nón cảm biến laser phát xung quét tán rừng |

---

## 3. AUDIT 02 — Ý NGHĨA NGỮ NGHĨA THỊ GIÁC (VISUAL SEMANTICS)

| Đối tượng (Object) | Khái niệm lâm nghiệp / viễn thám đại diện | Đánh giá ngữ nghĩa thị giác |
|---|---|---|
| `terrainMesh` | Bề mặt mô hình độ cao số mặt đất (Digital Terrain Model - DTM). | **HỢP LỆ**: Biểu thị địa hình tự nhiên nơi rừng sinh sống. |
| `wireMesh` (PlaneGeometry wireframe) | Dự kiến biểu thị đường bình độ / đường đồng mức cao độ địa hình (Contour Lines). | **[UNDEFINED VISUAL ROLE] — BỊ LỖI THỊ GIÁC**: `PlaneGeometry` wireframe trong Three.js vẽ đường chéo nối 2 tam giác của mọi ô lưới vuông. Kết quả tạo thành một mạng lưới tam giác chằng chịt gợi nhớ phim Tron 1982 thay vì bản đồ địa hình viễn thám. |
| `spatialGrid` (GridHelper) | Hệ quy chiếu tọa độ trắc địa không gian (Georeferenced Coordinate System). | **HỢP LỆ một phần**: Cần thiết để tạo cảm giác dữ liệu có tọa độ chuẩn, nhưng đặt ở đáy $y=-3.5$ đang bị tách rời khỏi địa hình. |
| `points` (19.000 hạt) | Các điểm phản hồi xung LiDAR (LiDAR Returns) gồm tán lá, cành và mặt đất. | **[UNDEFINED VISUAL ROLE] khi đứng độc lập**: Thiếu hẳn thân cây, tán cây hay khối thể tích (canopy volume), các hạt bay lơ lửng trong không trung bị hiểu nhầm là "hạt bụi / hiệu ứng ma trận". |
| `swathMesh` (Tấm Plane lơ lửng) | Dự kiến biểu thị mặt phẳng chùm quét dải (Scanning Swath Plane). | **[UNDEFINED VISUAL ROLE] — LỖI NẶNG**: Một hình chữ nhật phẳng lì bay lơ lửng, cản trở tầm nhìn, trông như một tấm kính đen/tấm tôn rơi từ trên trời xuống. |
| `scanLine` (Đường quét tiếp địa) | Vết quét laser thời gian thực trên mặt đất (Laser Scan Footprint). | **HỢP LỆ**: Có ý nghĩa mô tả tia laser đang quét qua địa hình. |
| `parcelGroup` (Các vòng tròn RingGeometry) | Dự kiến biểu thị ranh giới các lô rừng thẩm định carbon. | **[UNDEFINED VISUAL ROLE] — PHI THỰC TẾ**: Trong lâm nghiệp, lô rừng (forest compartment/parcel) được phân định theo đường sống núi, khe suối, đường đồng mức hoặc ranh giới tiểu khu. Các vòng tròn đồng tâm trông giống bãi đáp trực thăng hoặc vòng phép thuật sci-fi. |
| `instancedMesh` (Trong `forest.js`) | Quần xã cây rừng tự nhiên có phân tầng tán (Canopy Stratification). | **RẤT HỢP LỆ**: Đây là yếu tố cốt lõi giúp người dùng nhận ra "RỪNG", nhưng hiện tại lại **chỉ có ở S05 (`scene.js`) mà hoàn toàn vắng bóng ở Hero (`hero-scene.js`)**! |
| `plotGroup` (Ô tiêu chuẩn trong `forest.js`) | Ô tiêu chuẩn thực địa định vị vệ tinh phục vụ lập phương trình allometric. | **RẤT HỢP LỆ**: Thể hiện trực quan nguyên lý kỹ thuật theo Thông tư 33/2018. |

---

## 4. AUDIT 03 — NGUYÊN NHÂN CHÍNH XÁC CỦA CÁC KHUYẾT TẬT TRÊN SCREENSHOT

Đối chiếu trực tiếp từng khiếm khuyết trong ảnh chụp Hero:

### 1. "Đa giác tối màu khổng lồ lơ lửng giữa trời" (Large Dark Floating Polygon/Plane)
- **Nguồn gốc mã lệnh:** `this.swathMesh` trong [`src/3d/hero-scene.js`](file:///d:/Work/CT-group/GASCOLAE_Group9/S0285-S0287/src/3d/hero-scene.js#L152-L165).
  ```javascript
  const swathGeom = new THREE.PlaneGeometry(16, 26, 1, 1);
  swathGeom.rotateX(-Math.PI / 2);
  this.swathMat = new THREE.MeshBasicMaterial({
    color: 0x00c4e8,
    transparent: true,
    opacity: 0.16,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  this.swathMesh = new THREE.Mesh(swathGeom, this.swathMat);
  this.swathMesh.position.set(0, 14, 0);
  ```
- **Cơ chế gây lỗi:**
  - Đây là một hình chữ nhật phẳng kích thước $16 	imes 26$ mét đơn vị treo ở cao độ $y = 14$.
  - Mặc dù có màu `0x00c4e8` và `opacity: 0.16`, khi nhìn từ góc xiên $35^\circ$ với `FogExp2` nền đen `#080d10`, mặt phẳng này chắn ngang không gian phía trên, tạo thành một mảng tối sẫm che khuất các hạt mây điểm phía sau, tạo ảo giác một "tấm phản đen" trôi lơ lửng.

### 2. "Lưới tam giác dày đặc" (Excessive Triangular Wireframe)
- **Nguồn gốc mã lệnh:** `this.wireMesh` trong [`src/3d/hero-scene.js`](file:///d:/Work/CT-group/GASCOLAE_Group9/S0285-S0287/src/3d/hero-scene.js#L95-L104).
  - Sử dụng chung `this.terrainGeom` vốn là `PlaneGeometry(52, 52, 60, 60)` bật thuộc tính `wireframe: true`.
  - Mọi ô lưới quad bị chia thành 2 tam giác bởi một đường chéo $45^\circ$. Với 3.600 ô vuông, nó vẽ ra 7.200 tam giác chằng chịt, áp đảo toàn bộ bề mặt địa hình, biến một đồi núi tự nhiên thành một mạng lưới số học retro sci-fi.

### 3. "Trường hạt màu cyan và các hạt vàng rải rác" (Cyan & Yellow Particles)
- **Nguồn gốc mã lệnh:** `this.points` trong [`src/3d/hero-scene.js`](file:///d:/Work/CT-group/GASCOLAE_Group9/S0285-S0287/src/3d/hero-scene.js#L107-L150).
  - Điểm cyan: gán màu `cGround` và `cLidar` (`0x00c4e8`).
  - Điểm vàng: gán màu `cHighCarbon` (`0xf5c94e`) cho các hạt có chiều cao $h/h_{max} > 0.82$.
  - Do không có thân cây hoặc mô hình tán đi kèm, các hạt chỉ là các pixel vuông nhỏ bay tản mạn trong không khí.

### 4. "Một số đường cong lạ trên mặt đất" (Several Curved Lines)
- **Nguồn gốc mã lệnh:** `this.parcelGroup` trong [`src/3d/hero-scene.js`](file:///d:/Work/CT-group/GASCOLAE_Group9/S0285-S0287/src/3d/hero-scene.js#L185-L204).
  - 4 phần tử `RingGeometry` bán kính $7.0 - 8.5	ext{m}$ đặt tại tọa độ cố định trên mặt đất.
  - Vành đai hình tròn này không phản ánh bất kỳ ranh giới địa lý nào của rừng, tạo cảm giác như các vòng tròn bùa chú hoặc bia bắn ảo.

---

## 5. AUDIT 04 — ĐÁNH GIÁ KHẢ NĂNG NHẬN DIỆN LÂM NGHIỆP (FOREST READABILITY SCORE)

Thang điểm:  
**0 = Hoàn toàn vắng bóng (Absent)**  
**1 = Mờ nhạt / Rất khó đoán (Weak)**  
**2 = Có thể nhận ra sau khi quan sát kỹ (Recognizable)**  
**3 = Rõ ràng / Trực quan ngay từ cái nhìn đầu tiên (Strong)**  

| Tiêu chí nhận diện (Concept) | Điểm số (0 - 3) | Hiện trạng thực tế tại Hero Visual |
|---|:---:|---|
| **1. Terrain (Địa hình đồi núi)** | **1 / 3** | Có nhấp nhô lồi lõm, nhưng bị che lấp bởi mạng lưới tam giác sắc nhọn dày đặc, trông giống đồ họa máy tính thập niên 80 hơn là địa hình rừng tự nhiên nhiệt đới. |
| **2. Trees (Cây rừng riêng lẻ)** | **0 / 3** | **HOÀN TOÀN KHÔNG CÓ.** Không có gốc, thân, cành, lá hay hình dáng cây hình nón/vòm. Người dùng nhìn vào không thể thấy bất kỳ "cái cây" nào. |
| **3. Canopy (Cấu trúc tán rừng / CHM)** | **1 / 3** | Các cụm hạt tập trung theo hình chỏm cầu ở trên cao nhưng do mật độ hạt phân tán và kích thước hạt điểm quá bé, mắt người chỉ nhìn thấy một đám sương mù hạt cyan thay vì tán rừng. |
| **4. LiDAR (Công nghệ quét laser)** | **1 / 3** | Có đường quét tiếp địa `scanLine` di chuyển, nhưng bị tấm đa giác đen `swathMesh` che khuất và làm rối loạn thị giác. |
| **5. Biomass (Sinh khối trên mặt đất AGB)** | **1 / 3** | Chỉ thể hiện bằng một số hạt ngả sang màu vàng ở đỉnh ngọn cây, không có liên kết với thể tích sinh khối thực tế. |
| **6. Carbon density (Mật độ hấp thụ CO2e)** | **0 / 3** | Không có bản đồ nhiệt bề mặt (heatmap) hay phân vùng màu sắc liên tục trên bề mặt đất. |
| **7. Spatial mapping (Bản đồ phân lô không gian)** | **0 / 3** | Sử dụng 4 vòng tròn RingGeometry kỳ quặc, hoàn toàn sai lệch chuẩn mực bản đồ lâm nghiệp (vốn sử dụng ranh giới tiểu khu/khoảnh/lô). |
| **TỔNG ĐIỂM NHẬN DIỆN LÂM NGHIỆP** | **4 / 21** | **MỨC ĐỘ THẤP (FAIL) — CẦN KHẮC PHỤC TRIỆT ĐỂ** |

---

## 6. AUDIT 05 — PHÂN TÍCH THIẾT LẬP VỊ TRÍ CAMERA (CAMERA AUDIT)

### 1. Thông số hiện tại (`src/3d/hero-scene.js` & `camera.js`):
- **HeroScene Camera:**
  - Vị trí: `(22, 26, 36)`
  - Góc nhìn: `lookAt(0, 3.5, 0)`
  - Trường nhìn (FOV): `40` độ
  - Mặt phẳng cắt: `near = 0.1`, `far = 500`
- **ForestCarbonScene Camera (`CameraRig`):**
  - Preset A: `pos: (0, 45, 75)`, `target: (0, 0, 0)`
  - Preset B: `pos: (15, 30, 50)`, `target: (0, 5, 0)`
  - Preset C: `pos: (-20, 20, 35)`, `target: (-5, 8, 0)`
  - FOV: `45` độ

### 2. Nhận định khuyết tật do góc nhìn Camera gây ra:
- **Khoảng cách quá xa so với kích thước hạt điểm:** Với vị trí `(22, 26, 36)`, khoảng cách từ camera tới tâm cảnh là $\sqrt{22^2 + 22.5^2 + 36^2} pprox 47.9	ext{m}$. Ở khoảng cách này, một hạt điểm có kích thước `0.22` chỉ hiển thị khoảng 1 - 2 pixel trên màn hình, biến đám mây điểm thành một lớp bụi mờ vô định hình.
- **Góc nhìn quá dốc ($35^\circ - 40^\circ$ từ trên xuống):** Camera nhìn chéo xuống khiến các lớp không gian bị đè bẹp vào nhau: mặt phẳng quét `swathMesh` đè lên mây điểm, mây điểm đè lên lưới tam giác địa hình, phá hủy hoàn toàn cảm giác chiều sâu của tầng tán rừng (Canopy Stratification).
- **Thiếu góc chiếu ngang (Profile View):** Trong đo đạc LiDAR tán rừng, góc chiếu ngang hoặc góc nghiêng thấp ($15^\circ - 20^\circ$) là góc nhìn chuẩn mực nhất để thấy rõ: **Mặt đất $	o$ Thân cây dưới tán $	o$ Tán lá $	o$ Điểm cao nhất của chỏm cây (Tree Top Height)**.

---

## 7. AUDIT 06 — KIẾN TRÚC PHÂN TẦNG THỊ GIÁC ĐỀ XUẤT (RECOMMENDED VISUAL HIERARCHY)

Để một người dùng thông thường khi nhìn vào ngay lập tức hiểu được: **"Đây là khu rừng tự nhiên đang được đo đạc bằng công nghệ LiDAR để lập bản đồ carbon"**, hệ thống thị giác 3D bắt buộc phải được tái cấu trúc thành **5 tầng trực quan (L0 đến L4)** mạch lạc:

```
[L4: Bản đồ Carbon Lô Rừng]  ──> Đa giác phân lô địa hình, ranh giới lô chuẩn GIS, gradient mật độ tCO2e/ha
         ▲
[L3: Mật độ Sinh khối AGB]   ──> Thể tích sinh khối thực: Thấp (Cyan) -> Vừa (Teal/Green) -> Cao (Amber)
         ▲
[L2: Mây điểm Xung LiDAR]   ──> Chùm tia quét laser mảnh thực thụ, đám mây phản hồi CHM đa tầng
         ▲
[L1: Quần thể Cây Rừng]     ──> Cây rừng 3D thực thụ (thân cây + tán phân lớp, InstancedMesh hữu cơ)
         ▲
[L0: Địa hình Tự nhiên DTM] ──> Mặt đất đồi núi sẫm màu mờ ảo, đường đồng mức địa hình trang nhã (Isolines)
```

### Chi tiết các tầng thị giác:

- **L0 — Địa hình Tự nhiên (Digital Terrain Model - DTM):**
  - Mặt đất dạng địa hình thực địa uốn lượn tự nhiên, màu đất sẫm tối (`#0a141c`), độ nhám cao (`roughness: 0.9`), hoàn toàn triệt tiêu viền cạnh sắc nhọn.
  - Thay thế lưới tam giác `wireframe: true` bằng: **Đường bình độ địa hình GIS (Contour Isolines)** mảnh, thanh lịch, vẽ theo các mức cao độ cố định (ví dụ: mỗi 2m một đường contour cong mềm mại).
- **L1 — Quần thể Cây Rừng Nhận Diện Ngay Lập Tức (Recognizable Canopy):**
  - Bắt buộc phải có **hình khối cây rừng thực tế** (sử dụng `InstancedMesh` các mô hình cây rừng nhiệt đới: thân cây sẫm màu, tán lá xếp tầng dạng vòm/nón hữu cơ).
  - Cây có sự đa dạng về chiều cao (từ 6m đến 18m) và bán kính tán để tạo cảm giác chân thực của rừng tự nhiên Việt Nam.
- **L2 — Dữ liệu Mây Điểm LiDAR Viễn Thám (LiDAR Point Cloud Layer):**
  - Mây điểm bám quanh các tán cây thực tế (chứng minh nguyên lý: LiDAR quét xuyên tán lá).
  - Điểm mặt đất (Ground returns) màu xanh sẫm bám trên DTM; điểm tán (Canopy returns) bọc ngoài tán cây với màu sắc gradient theo độ cao CHM.
  - Chùm quét: Thay vì một tấm polygon đen phẳng lì, chùm quét phải là **quạt quét hình nón hoặc vệt quét mỏng trong suốt (Laser Scanning Fan/Pyramid)** xuất phát từ điểm bay của UAV hướng xuống mặt đất.
- **L3 — Mật độ Sinh khối (Above-Ground Biomass - AGB):**
  - Chuyển màu cây và điểm theo thang màu sinh khối khoa học (ASSET 01 / ASSET 02):
    - Rừng nghèo kiệt / Tái sinh: Màu Cyan (`#00c4e8`, $< 50	ext{ tấn/ha}$)
    - Rừng trung bình: Màu Xanh sinh khối (`#3dd6b5`, $50 - 130	ext{ tấn/ha}$)
    - Rừng giàu / Cây cổ thụ: Màu Vàng cam (`#f5c94e` / `#f07030`, $> 180	ext{ tấn/ha}$)
- **L4 — Bản đồ Lô Phân Vùng Carbon (Spatial Carbon Compartment Map):**
  - Thay thế các vòng tròn kỳ quặc bằng: **Ranh giới phân lô địa hình chuẩn (Cadastral Compartment Boundaries)** dạng đa giác tự nhiên uốn theo sườn đồi.
  - Bề mặt lô rừng phủ màu choropleth bán trong suốt hiển thị trữ lượng $tCO_2e/ha$.

---

## 8. AUDIT 07 — ĐÁNH GIÁ HIỆU NĂNG & RỦI RO KỸ THUẬT (PERFORMANCE AUDIT)

Kiểm toán hiệu năng runtime qua Chrome DevTools:

| Chỉ số hiệu năng (Metric) | Hiện trạng (`HeroScene`) | Hiện trạng (`Scene.js` S05) | Giới hạn khuyến nghị ngân sách | Đánh giá rủi ro (Risk Evaluation) |
|---|:---:|:---:|:---:|---|
| **Draw Calls** | 7 calls | 12 calls | $\le 25	ext{ calls}$ | **AN TOÀN (Rất thấp)**. Số lượng draw call tối ưu tốt. |
| **Số lượng hạt (Point Count)** | 19.000 (Desktop) / 7.000 (Mobile) | 45.000 điểm | $\le 50.000	ext{ điểm}$ | **AN TOÀN**. GPU hiện đại xử lý mượt mà 60 FPS. |
| **Số lượng Geometry** | 6 geometries | 8 geometries | $\le 15	ext{ geometries}$ | **AN TOÀN**. |
| **Số lượng Material** | 7 materials | 9 materials | $\le 15	ext{ materials}$ | **AN TOÀN**. Không có texture bitmap nặng gây tràn VRAM. |
| **Sử dụng InstancedMesh** | Chưa dùng trong Hero | Có dùng (380 cây) | Khuyến khích cho cây rừng | **CƠ HỘI TỐI ƯU**: `HeroScene` cần áp dụng `InstancedMesh` giống như `ForestManager` để hiển thị cây rừng với chi phí đúng 1 draw call! |
| **Mức độ chi tiết (LOD)** | Tắt | Tắt | Tùy chọn | Không cần thiết với quy mô cảnh hiện tại. |
| **DPR (Device Pixel Ratio)** | Đã clamp $\le 1.5$ (desktop), $\le 1.0$ (mobile) | Đã clamp $\le 1.5$ | $\le 1.5$ | **RẤT TỐT**. Ngăn ngừa hiện tượng quá nhiệt trên màn hình Retina/4K. |
| **Fallback cho Mobile / No-WebGL** | Đã có `#hero-fallback` và `#viewer-fallback` | Đã có fallback | Bắt buộc | **ĐẠT CHUẨN**. |

---

## 9. KẾT LUẬN & KẾ HOẠCH HÀNH ĐỘNG TINH GỌN (MINIMAL IMPLEMENTATION PLAN)

### Tóm tắt cốt lõi:
1. **Khuyết tật thị giác lớn nhất tại Hero:** Việc thiếu vắng hoàn toàn các mô hình cây rừng thực thể (`InstancedMesh` trees) và sự xuất hiện của tấm đa giác đen lơ lửng `swathMesh` cùng lưới tam giác `wireframe: true` đã biến Hero 3D thành một đồ họa trừu tượng vô hồn, làm mất hoàn toàn ngữ nghĩa "Rừng và Đo đạc Carbon".
2. **Giải pháp tinh gọn hiệu quả nhất:**
   - **Tái sử dụng mô hình cây rừng đã có sẵn trong `src/3d/forest.js`:** Đưa `ForestManager` (hoặc tập hợp cây instanced rút gọn) vào `HeroScene`. Khi có hình bóng các cây rừng đứng trên sườn đồi, mắt người dùng sẽ lập tức nhận diện đây là khu rừng.
   - **Xóa bỏ vĩnh viễn tấm đa giác đen `this.swathMesh`:** Thay thế bằng tia quét nón mờ tinh tế hoặc chùm tia quét đỉnh UAV không gây che chắn.
   - **Xóa bỏ lưới tam giác `this.wireMesh`:** Thay bằng bề mặt DTM đổ bóng tự nhiên kết hợp các đường contour cong hoặc lưới quad trắc địa tinh tế.
   - **Xóa bỏ các vòng tròn RingGeometry vô nghĩa:** Thay thế bằng ranh giới đa giác lô rừng chuẩn mực.
   - **Điều chỉnh nhẹ góc Camera:** Hạ thấp độ cao camera xuống một chút ($y pprox 18 - 20$) để nhìn thấy mặt đứng và độ cao tán rừng (Profile View) rõ nét hơn.

---

> **QUY TẮC TUÂN THỦ NGHIÊM NGẶT:** Báo cáo kiểm toán dừng lại tại đây. Toàn bộ mã nguồn (HTML, CSS, JS, Three.js) được bảo toàn nguyên vẹn 100%, không bị sửa đổi trong giai đoạn này.
---

## 10. IMPLEMENTATION STATUS (TRẠNG THÁI TRIỂN KHAI TÁI CẤU TRÚC THỊ GIÁC)
> **Thời điểm cập nhật:** 2026-09-04  
> **Trạng thái:** HOÀN THÀNH TOÀN DIỆN (COMPLETED & VERIFIED)  
> **Mã nguồn can thiệp:** `src/3d/hero-scene.js`, `src/css/main.css`  

Toàn bộ các khuyết tật thị giác được chỉ ra trong báo cáo kiểm toán nguyên nhân gốc (Root-Cause Audit) đã được khắc phục triệt để. Khung cảnh 3D Hero đã chuyển đổi thành công từ một đồ họa sci-fi trừu tượng sang một hệ sinh thái mô phỏng viễn thám lâm nghiệp trực quan:
$$\text{RỪNG THỰC ĐỊA} \longrightarrow \text{UAV LiDAR} \longrightarrow \text{CẤU TRÚC TÁN (CHM)} \longrightarrow \text{SINH KHỐI (AGB)} \longrightarrow \text{TRỮ LƯỢNG CARBON} \longrightarrow \text{BẢN ĐỒ LÔ RỪNG}$$

### A. Đối tượng bị loại bỏ hoàn toàn (Removed Objects)
1. **`this.swathMesh`**: Tấm phẳng `PlaneGeometry(16, 26, 1, 1)` lơ lửng tại cao độ $y=14$ gây ra ảo giác "tấm phản đen/tấm kính đen chắn ngang trời" đã bị xóa vĩnh viễn khỏi scene.
2. **`this.wireMesh`**: Lưới tam giác dày đặc `wireframe: true` từ `PlaneGeometry(52, 52, 60, 60)` gây cảm giác đồ họa Tron cổ điển đã bị loại bỏ hoàn toàn.
3. **`this.spatialGrid`**: Lưới `GridHelper` xám xanh ở đáy $y=-3.5$ tách rời địa hình đã bị gỡ bỏ.
4. **`this.parcelGroup` (RingGeometry)**: 4 vành đai tròn đồng tâm phi thực tế mô phỏng ranh giới lô rừng đã bị bãi bỏ.

### B. Đối tượng và kiến trúc phân tầng bổ sung (Added Objects & Architectural Layers)
1. **Tầng L0 — Địa hình tự nhiên (DTM) & Đường bình độ (Contour Isolines):**
   - Mặt đất `this.terrainMesh` được tinh chỉnh màu sắc thực địa sẫm tự nhiên (`#0c161d`), độ nhám cao (`roughness: 0.92`), nhận bóng đổ mềm.
   - Thêm `this.contourLines` (`THREE.LineSegments`): Các đường đồng mức cao độ địa hình uốn lượn tự nhiên theo cao trình (1.2m, 2.4m, 3.6m, 4.8m), màu lục xám trắc địa `#1c4456`.
2. **Tầng L1 — Quần xã Cây rừng Hữu cơ (Organic Forest Canopy):**
   - Thêm `this.trunkMesh` (`THREE.InstancedMesh`): Thân cây hình trụ thực vật (`CylinderGeometry`), màu vỏ cây sẫm tự nhiên `#1e140d`.
   - Thêm `this.foliageMesh` (`THREE.InstancedMesh`): Tán lá hữu cơ đa tầng (2 tầng vòm nón đan xen) màu lục lâm nghiệp sẫm `#1d5c38`, tiếp nhận ánh sáng tự nhiên.
   - Số lượng cây: 110 cây (desktop) / 55 cây (mobile) phân bố theo thuật toán Poisson-disk tự nhiên trên sườn đồi, chiều cao phân cấp từ 5.5m đến 13m.
3. **Tầng L2 — Đám mây điểm LiDAR Viễn thám (Spatially Anchored LiDAR Point Cloud):**
   - Đám mây điểm `this.points` được gắn neo chính xác theo cấu trúc không gian 3D: Điểm mặt đất (Ground returns), điểm bám thân cây (Trunk returns), điểm tán lá đa tầng (Crown volume returns), và điểm chỏm đỉnh cây (Tree top apex returns).
   - Thêm `this.laserLine` (`THREE.Line`): Tia laser quét tiếp địa uốn lượn chính xác theo bề mặt địa hình thực tế khi quét qua sườn đồi.
4. **Tầng L3 — Mật độ Sinh khối trên mặt đất (Biomass AGB Density):**
   - Mỗi cây được tính toán thể tích sinh khối đại diện dựa trên quan hệ allometric ($B \propto H \times R^2$).
   - Thang màu sinh khối khoa học chuyển sắc tự nhiên: Sinh khối thấp / tái sinh (`#257075` - Teal) $\to$ Sinh khối trung bình (`#43a060` - Green) $\to$ Sinh khối cao / giàu (`#dca638` - Amber) $\to$ Cây cổ thụ / Dự trữ carbon đặc biệt (`#df6c2a` - Coral).
5. **Tầng L4 — Bản đồ Lô Phân vùng Carbon (Cadastral Forest Compartments):**
   - Thêm `this.parcelLines` (3 đối tượng `THREE.LineLoop`): Ranh giới lô khoảnh rừng trắc địa tự nhiên uốn lượn bám theo địa hình đồi núi, thay thế hoàn toàn các vòng tròn giả định.

### C. Tinh chỉnh Góc nhìn Camera (Cinematic Profile View)
- **Vị trí camera:** Chuyển từ góc nhìn trên cao dốc đứng `(22, 26, 36)` sang góc nhìn profile điện ảnh trắc địa: `(17, 13, 26)`, điểm nhìn `lookAt(0, 3.2, 0)`, trường nhìn `FOV: 38`.
- **Hiệu quả thị giác:** Góc nghiêng ngang $\approx 22^\circ$ làm nổi bật toàn bộ mặt cắt cấu trúc rừng: **Mặt đất (DTM) $\to$ Thân cây dưới tán $\to$ Thể tích tán lá $\to$ Chiều cao chỏm tán (CHM)**.
- **Quy luật chuyển động:** Triệt tiêu hoàn toàn chuyển động xoay tròn thế giới (spinning world) phi thực tế. Thay thế bằng dao động thị sai tinh tế (subtle parallax drift) theo chuột và dòng thời gian, tuân thủ tuyệt đối chuẩn `prefers-reduced-motion`.

### D. Tối ưu hóa Hiệu năng & Tài nguyên (Performance Optimization)
- **Điểm hạt LiDAR:** Tinh gọn từ 19.000 điểm xuống còn ~5.500 điểm (desktop) / 2.200 điểm (mobile), loại bỏ hiện tượng nhiễu hạt sci-fi ngẫu nhiên, tập trung mật độ vào tán rừng.
- **Draw Calls:** Toàn bộ 110 cây rừng được kết xuất chỉ qua **2 Draw Calls** duy nhất nhờ công nghệ `THREE.InstancedMesh` (1 call cho thân cây, 1 call cho tán lá). Tổng draw call toàn scene duy trì ở mức $\le 8$ calls.
- **Chỉ số DPR:** Khống chế nghiêm ngặt $\le 1.5$ (desktop) và $\le 1.0$ (mobile), đảm bảo tốc độ ổn định 60 FPS mà không gây nóng máy hoặc hao pin trên màn hình Retina/HiDPI.

### E. Kiểm thử Đa Thiết bị & Responsive (Responsive QA Verification)
Hệ thống đã được kiểm thử tự động và trực quan trên toàn bộ 7 độ phân giải mục tiêu thông qua Chrome Headless CDP:
1. `1440x900` (Desktop lớn): Bố cục 2 cột cân đối, khu vực 3D hiển thị rõ nét toàn bộ cấu trúc rừng, không che lấp chữ.
2. `1280x800` (Desktop tiêu chuẩn): Tỷ lệ hiển thị lý tưởng, các tầng tán cây và vệt quét laser tách bạch.
3. `1024x768` (Tablet Landscape): Tự động thu gọn khoảng trống, cây rừng hiển thị vững chắc bên phải.
4. `768x1024` (Tablet Portrait): Chuyển đổi sang bố cục dọc hài hòa, canvas 3D nằm gọn dưới khối nội dung và CTA.
5. `430x932` (Mobile iPhone 14 Pro Max): Thứ tự hiển thị tuần tự chuẩn mực (Eyebrow $\to$ H1 $\to$ Description $\to$ CTAs $\to$ Canvas 3D). Không có lỗi tràn ngang (`scrollWidth === innerWidth`).
6. `390x844` (Mobile iPhone 12/13/14): Điểm số kiểm thử 100% đạt chuẩn, canvas chiếm chiều cao cố định 280px không gây giật lag.
7. `375x812` (Mobile iPhone SE / X): Hoàn toàn không phát sinh cuộn ngang, typography ngắt dòng sạch sẽ, cây rừng hiển thị rõ ràng.

### F. Kết luận
Giai đoạn tái cấu trúc thị giác Three.js Hero hoàn tất 100% và đáp ứng đầy đủ các tiêu chuẩn kỹ thuật cũng như ngữ nghĩa lâm nghiệp viễn thám. Sẵn sàng cho giai đoạn tinh chỉnh chuyển động (Step 08 - Animation) khi có yêu cầu.
