# TÀI LIỆU ĐẶC TẢ TÁI THIẾT KẾ THỊ GIÁC KHUNG CẢNH 3D HERO
# (HERO 3D VISUAL REDESIGN SPECIFICATION)
# DỰ ÁN S0285-S0287 · CARBON SINH KHỐI RỪNG UAV LiDAR
> **Tài liệu:** `docs/12-hero-3d-redesign-spec.md`  
> **Phiên bản:** 2.0 (First-Principles Redesign)  
> **Trạng thái:** SPECIFICATION ONLY — CHỈ ĐẶC TẢ THIẾT KẾ, TUYỆT ĐỐI CHƯA TRIỂN KHAI CODE  
> **Ngày lập:** 2026-09-04  

---

## 1. PHÂN TÍCH NGUYÊN NHÂN THẤT BẠI THỊ GIÁC HIỆN TẠI (CURRENT VISUAL FAILURE)

Dù khung cảnh 3D tại Hero (`#hero-3d-canvas`) đã chạy mượt mà về mặt kỹ thuật WebGL, **ngôn ngữ thị giác và thông điệp truyền thông cốt lõi đang THẤT BẠI HOÀN TOÀN**:

1. **Rừng nhân tạo dạng khối đa giác thấp thô sơ (Dense Low-Poly Polygon Forest):**
   - Các cây rừng hiện tại được tạo bằng các hình nón (cone) hoặc hình chóp thô sơ gán trên thân thẳng đuột.
   - Nhìn từ xa hoặc nhìn lướt trong 2–3 giây đầu, mắt người dùng cảm nhận đây là "rừng mô hình đồ chơi" hoặc "rừng game đa giác thấp", hoàn toàn không mang bóng dáng của một hệ sinh thái rừng nhiệt đới tự nhiên.
2. **Tiếng ồn hạt ngẫu nhiên (Random Cyan/Yellow Particle Noise):**
   - Đám mây điểm LiDAR bị biến thành một lớp bụi hạt bay lơ lửng trong không trung.
   - Các hạt màu cyan và vàng phân bổ không có quy luật hình học chặt chẽ, tạo cảm giác "hiệu ứng hạt sci-fi / ma trận" hơn là dữ liệu viễn thám phản hồi xung laser trắc địa.
3. **Không gian viễn tưởng trừu tượng (Abstract Sci-Fi / Cyberpunk Environment):**
   - Sự kết hợp giữa các hạt sáng rực, tia quét rộng và nền tối khiến cảnh 3D giống một tựa game viễn tưởng thập niên 80 hơn là một công cụ khoa học địa không gian đáng tin cậy.
4. **Không nhận diện được quy trình đo đạc LiDAR (Unrecognizable LiDAR Survey):**
   - Người xem không thấy được nguồn phát laser, không thấy được sự xuyên thấu từ tầng trên xuống tầng dưới của chùm tia, và không hiểu tại sao lại có những hạt bay trong không gian.
5. **Không nhận diện được bản đồ trữ lượng carbon (Unrecognizable Carbon Mapping):**
   - Việc dùng hạt vàng hoặc các vành khuyên để thể hiện carbon khiến người xem hoàn toàn không liên hệ được với khái niệm "Lập bản đồ phân lô trữ lượng carbon ($tCO_2e/ha$)".

**Kết luận đánh giá:**  
Mục tiêu không phải là "làm cho cảnh hiện tại đẹp hơn một chút", mà là **tái thiết kế toàn diện ngôn ngữ thị giác và phân tầng biểu diễn từ nguyên lý cơ bản (first principles)** trên nền tảng Three.js.

---

## 2. KHÁI NIỆM THỊ GIÁC MỚI TỪ NGUYÊN LÝ CƠ BẢN (NEW VISUAL CONCEPT)

### A. Mục tiêu truyền thông tối thượng (Primary Communication Goal)
Một khách hàng hoặc chuyên gia truy cập landing page, khi nhìn vào khu vực Hero 3D trong vòng **2–3 giây đầu tiên**, phải hiểu ngay lập tức:
> **"Đây là một khu rừng tự nhiên đang được đo đạc, bóc tách cấu trúc bằng công nghệ UAV LiDAR để lượng hóa sinh khối và lập bản đồ trữ lượng carbon."**

Chuỗi giá trị thị giác bắt buộc phải truyền tải mạch lạc:
$$\text{RỪNG TỰ NHIÊN} \longrightarrow \text{ĐO ĐẠC LiDAR} \longrightarrow \text{CẤU TRÚC SINH KHỐI} \longrightarrow \text{MẬT ĐỘ CARBON} \longrightarrow \text{BẢN ĐỒ LÔ RỪNG}$$

### B. Định vị thẩm mỹ (Aesthetic Positioning)
- **Đúng:** Khoa học (Scientific), Kỹ thuật trắc địa chính xác (Geospatial Engineering), Cao cấp (Premium), Môi trường sinh thái tự nhiên (Environmental), Viễn thám thực địa (Remote Sensing).
- **Tuyệt đối tránh:** Cyberpunk, Trò chơi điện tử sci-fi, Hạt phát sáng lập lòe, Cầu vồng neon, Đồ họa đa giác hoạt hình thô kệch.

---

## 3. TRẬT TỰ PHÂN CẤP THỊ GIÁC TUYỆT ĐỐI (SCENE HIERARCHY)

Tỷ lệ chiếm lĩnh thị giác (Visual Prominence Budget) phải tuân thủ nghiêm ngặt quy tắc sau:

```
┌───────────────────────────────────────────────────────────────────────┐
│ 1. RỪNG TỰ NHIÊN (FOREST)                      ───> 60% – 70%        │
│ 2. BỀ MẶT ĐỊA HÌNH DTM (TERRAIN)               ───> 15%              │
│ 3. ĐO ĐẠC LiDAR & CHÙM TIA (LiDAR & RAYS)      ───> 10%              │
│ 4. THIẾT BỊ BAY UAV (DRONE SILHOUETTE)         ───> 5%               │
│ 5. LỚP BẢN ĐỒ CARBON & SINH KHỐI (DATA LAYERS) ───> Nhúng trực tiếp   │
└───────────────────────────────────────────────────────────────────────┘
```

> **Nguyên tắc bất di bất dịch:**  
> **Không có bất kỳ yếu tố kỹ thuật nào (hạt, tia laser, polygon, lưới) được phép lấn át vẻ đẹp tự nhiên và cấu trúc nhận diện của cây rừng.**

---

## 4. MÔ HÌNH HÓA CÂY RỪNG CHÂN THỰC (TREE REPRESENTATION)

### A. Tại sao cây một hình nón (Single Cone) bị loại bỏ hoàn toàn?
Trong tự nhiên, một cây rừng nhiệt đới không bao giờ là một khối nón nhọn đơn độc. Hình nón tam giác phẳng là nguồn gốc chính tạo ra cảm giác "low-poly giả tạo".

### B. Cấu trúc hình học cây chân thực (Multi-Volume Tree Architecture)
Mỗi cây rừng riêng lẻ trong Hero phải bao gồm tối thiểu:
1. **Thân cây (Trunk):**
   - Hình trụ vươn cao, có độ thon nhẹ từ gốc lên ngọn.
   - Nghiêng nhẹ tự nhiên ($1^\circ - 3^\circ$).
   - Vỏ cây màu nâu xám thực vật sẫm màu (`#16120e` đến `#241a12`), độ nhám cao (`roughness: 0.95`).
2. **Tầng tán dưới (Lower Canopy):**
   - Khối tán xòe rộng nhất, phân nhánh từ khoảng 40% chiều cao cây.
   - Hình phỏng cầu dẹt đa diện hữu cơ hoặc khối chóp tán xòe tự nhiên.
3. **Tầng tán giữa (Middle Canopy):**
   - Khối tán sinh thái rậm rạp, lệch tâm nhẹ so với thân để tạo tính ngẫu nhiên bất đối xứng của tự nhiên.
4. **Tầng tán trên & Chỏm ngọn (Upper Canopy & Tree Apex):**
   - Chỏm vòm hữu cơ thuôn mềm, đón ánh sáng mặt trời tự nhiên.

```
            /\           <── Tầng chỏm ngọn (Tree Apex / Upper Crown)
          /    \
       (   Tán 2  )      <── Tầng tán giữa (Middle Canopy Volume)
      (            )
    (     Tán 1      )   <── Tầng tán dưới (Lower Canopy Volume - xòe rộng)
         |      |
         | Thân |        <── Thân cây gỗ tự nhiên (Slender Organic Trunk)
         |  Cây |
        /        \       <── Gốc bạnh bám địa hình DTM
```

### C. Bốn nhóm kiểu hình cây rừng (Tree Archetypes)
Không nhân bản một loại cây duy nhất. Khung cảnh phải tích hợp 4 archetype cây:

| Archetype | Chiều cao ($H$) | Đường kính tán ($D$) | Hình thái tán (Crown Silhouette) | Vai trò sinh thái & dữ liệu |
|---|:---:|:---:|---|---|
| **1. Cây tái sinh / Tầng dưới (Young Understory)** | 4.5m – 7.0m | 1.8m – 2.8m | Tán hẹp, thân mảnh, tán bắt đầu từ thấp | Sinh khối thấp ($<40\text{ t/ha}$), mật độ che phủ dưới tán |
| **2. Cây trung bình (Co-dominant Forest Tree)** | 8.0m – 12.5m | 3.2m – 4.5m | Tán 2 tầng hình trứng hữu cơ, tán rậm | Sinh khối trung bình ($60 - 120\text{ t/ha}$), chiếm số lượng lớn |
| **3. Cây thành thục / Tán chính (Mature Canopy Tree)** | 13.0m – 17.5m | 4.8m – 7.0m | Tán 3 tầng xòe ô rộng, nhiều múi tán đan xen | Sinh khối cao ($150 - 220\text{ t/ha}$), tích lũy carbon trọng yếu |
| **4. Cây cổ thụ vượt tán (Emergent Giant)** | 18.0m – 23.0m | 7.5m – 10.5m | Thân gốc bạnh to, vòm tán rộng vượt hẳn lên trên | Kho carbon khổng lồ ($>280\text{ t/ha}$), điểm nhấn thị giác |

### D. Triển khai kỹ thuật hiệu năng (InstancedMesh Architecture)
- Tạo 4 `InstancedMesh` tương ứng với 4 archetype tán cây, và 1-2 `InstancedMesh` cho thân cây.
- Tổng số lượng cây hiển thị: **110 – 160 cây** (Desktop) được bố trí theo cụm tự nhiên (Poisson-disk sampling) có khoảng trống sinh thái, **tuyệt đối không tạo thành bức tường đa giác nghẹt thở**.

---

## 5. MÔ HÌNH HÓA ĐỊA HÌNH TỰ NHIÊN DTM (TERRAIN REPRESENTATION)

### A. Loại bỏ dứt điểm lưới tam giác
- Cấm tuyệt đối: `PlaneGeometry + wireframe: true`.
- Cấm tuyệt đối các đường chéo $45^\circ$ chia cắt ô vuông thành tam giác sắc nhọn.

### B. Bề mặt địa hình số DTM (Digital Terrain Model)
- Sử dụng bề mặt lưới mịn `PlaneGeometry(64, 64, 80, 80)` biến dạng bằng hàm cao độ đồi núi thực tế (kết hợp các hàm sóng sin/cos đa tần số tạo sườn đồi, sống núi và thung lũng tụ thủy nhẹ).
- Vật liệu: `MeshStandardMaterial` màu xám đen hữu cơ trầm ấm (`#0c141c`), độ nhám cao `roughness: 0.92`, phản xạ kim loại bằng `0.0`.
- Tiếp nhận bóng đổ êm dịu từ ánh sáng mặt trời, tôn lên các nếp gấp địa hình tự nhiên.

### C. Đường bình độ địa hình chuẩn GIS (Topographic Contour Isolines)
- Thay thế hoàn toàn wireframe bằng các **đường đồng mức độ cao GIS (Isolines)** thực sự.
- Các đường đồng mức được tính toán chính xác theo các mặt phẳng cao độ cố định (ví dụ: mỗi 1.5m cao độ có một đường isoline cong mềm mại).
- Thể hiện bằng `THREE.LineSegments` mảnh khảnh, màu lục xám trắc địa (`#163848`), độ mờ bán trong suốt (`opacity: 0.20 – 0.30`).
- **Quy tắc thị giác:** Đường bình độ đóng vai trò thông tin nền thứ cấp, bổ trợ cho cảm giác bản đồ địa hình viễn thám, không được cạnh tranh thị giác với thân cây.

---

## 6. MÔ HÌNH HÓA MÂY ĐIỂM LiDAR CÓ CẤU TRÚC (STRUCTURED LiDAR REPRESENTATION)

### A. Giảm thiểu nhiễu hạt (Noise Elimination)
- Cắt giảm triệt để số lượng hạt từ 19.000 điểm trôi nổi xuống **khoảng 1.800 – 3.500 điểm** trên Desktop.
- Cấm phân bố hạt ngẫu nhiên trong không gian rỗng (empty sky).

### B. Quy luật gắn neo không gian 3 chiều (Spatially Meaningful Anchoring)
Toàn bộ điểm phản hồi LiDAR phải gắn chặt vào 3 bề mặt vật lý thực tế:
1. **Điểm phản hồi mặt đất (Ground Returns - DTM):** Chiếm ~35% tổng số điểm, nằm áp sát bề mặt đồi núi, minh chứng khả năng xuyên qua kẽ lá chạm tới mặt đất.
2. **Điểm phản hồi thân cây & cành dưới tán (Understory/Trunk Returns):** Chiếm ~25%, phân bổ dọc theo trục thân cây và các tầng phân cành.
3. **Điểm phản hồi mặt tán lá (Canopy Surface Returns - CHM):** Chiếm ~40%, bao bọc quanh các khối tán lá của 4 archetype cây, thể hiện độ dày và biên dạng tán.

### C. Kích thước và vật liệu hạt
- `PointsMaterial` sử dụng kích thước hạt tinh tế: `size: 0.14 - 0.18`.
- Màu sắc hạt phản ánh đúng độ cao tương đối chuẩn hóa (Normalized Height CHM) hoặc cường độ phản xạ (Intensity), không dùng hạt phát sáng quá mức.

---

## 7. QUY TRÌNH ĐO QUÉT LiDAR & THIẾT BỊ BAY UAV (LiDAR SCAN & UAV SILHOUETTE)

### A. Thiết bị bay không người lái UAV (Survey Drone Silhouette)
- **Tỷ lệ thị giác:** Chiếm khoảng **5%** diện tích khung cảnh, đóng vai trò "chủ thể công nghệ kích hoạt", đặt ở góc trên bên phải ($x \approx 12, y \approx 18, z \approx -6$).
- **Hình thái:** Mô hình thu nhỏ tối giản, hiện đại mô phỏng dòng UAV khảo sát công nghiệp (tham chiếu DJI Matrice 350 RTK mang cảm biến Zenmuse L2).
- **Chi tiết:** Thân drone màu xám đen kỹ thuật (`#121820`), 4 cánh tay đòn gọn gàng, cụm cảm biến LiDAR xoay hướng xuống thung lũng rừng, 1 đèn LED trắc địa nhỏ xíu màu cyan nhấp nháy 1Hz.

### B. Chùm tia quét laser viễn thám (Subtle Laser Scanning Rays)
- **Không dùng:** Tấm phẳng đa giác đen đục (`swathMesh`) hay hình nón đặc chắn tầm nhìn.
- **Sử dụng:**
  - **8 – 14 tia laser thanh mảnh (`THREE.LineSegments`):** Xuất phát từ cụm cảm biến dưới bụng UAV, tỏa xuống tán rừng theo góc quét nón/quạt thực tế ($70^\circ$ FOV).
  - Màu sắc: Xanh cyan tinh khiết (`#00e5ff`), độ mờ mảnh khảnh (`opacity: 0.28 – 0.42`), pha trộn cộng tính nhẹ (`AdditiveBlending`).
  - **Vệt quét tiếp địa động (`this.laserLine`):** Một đường quét laser mảnh uốn lượn chính xác theo bề mặt gồ ghề của sườn đồi và tán cây tại vị trí chùm tia quét qua.
  - Khi chùm tia quét di chuyển chậm rãi qua thung lũng rừng, các điểm mây LiDAR dọc theo vệt quét sáng bừng lên rồi chuyển dần sang trạng thái dữ liệu lưu trữ.

---

## 8. LƯỢNG HÓA SINH KHỐI TỪ CẤU TRÚC TÁN (BIOMASS REPRESENTATION)

### A. Nguyên tắc biểu diễn sinh khối
Sinh khối rừng trên mặt đất (Above-Ground Biomass - AGB) trong khoa học lâm nghiệp được xác định từ:
$$AGB = f(H_{vn}, D_{tán}, \rho_{gỗ})$$
Do đó, **thị giác sinh khối phải gắn liền hữu cơ với kích thước cây và cấu trúc tán**, tuyệt đối không dùng các hạt vàng bay lơ lửng vô nghĩa.

### B. Mã hóa thị giác trên hình khối tán cây
Màu sắc và độ rậm rạp của tán cây phản ánh trực tiếp cấp sinh khối:
- **Cây sinh khối thấp (Cây tái sinh, cây nhỏ):** Màu xanh rêu trầm tối (`#143526`), tán thon gọn.
- **Cây sinh khối trung bình (Cây rừng đang phát triển):** Màu xanh lục lâm nghiệp tự nhiên (`#1e5438`), viền tán tiếp nhận ánh sáng tươi.
- **Cây sinh khối cao & Cổ thụ (Cây gỗ lớn, cây ưu thế):** Tán xòe nhiều tầng, màu xanh diệp lục đậm đà (`#286b46`) kết hợp ánh vàng hổ phách nhẹ ở chỏm ngọn (`#7a6e2e`), thể hiện sự tích tụ vật chất hữu cơ qua nhiều thập kỷ.

Khi nhìn vào toàn cảnh, người xem ngay lập tức hiểu rằng: **Cây càng cao to, tán càng rộng thì sinh khối và carbon tích lũy càng lớn**.

---

## 9. BẢN ĐỒ PHÂN VÙNG LÔ RỪNG CARBON (CARBON MAPPING REPRESENTATION)

### A. Ranh giới lô trắc địa tự nhiên (Natural Cadastral Compartment Boundaries)
- Xóa bỏ hoàn toàn các vành tròn đồng tâm (RingGeometry).
- Xây dựng **4 – 6 đa giác ranh giới lô rừng (Forest Compartments / Stands)** uốn lượn tự nhiên theo địa hình đồi núi (theo sống núi, chân dốc và đường tụ thủy chuẩn GIS).
- Ranh giới hiển thị bằng các đường viền mảnh khảnh thanh lịch (`THREE.LineLoop`), màu cyan xám trắc địa (`#266278`, `opacity: 0.65`).

### B. Mặt phủ mật độ Carbon (Choropleth Carbon Density Drapes)
- Mỗi lô rừng được phủ một lớp đa giác bán trong suốt (`opacity: 0.25 – 0.35`) áp sát địa hình DTM, cho phép nhìn xuyên qua để thấy rõ mặt đất và gốc cây bên dưới.
- Thang màu phân cấp mật độ carbon trắc địa ($tCO_2e/ha$):
  - **Lô Carbon Thấp ($< 60\text{ tCO}_2\text{e/ha}$):** Màu lam mòng két sẫm (`#0e3840`, Deep Teal).
  - **Lô Carbon Trung Bình ($60 - 150\text{ tCO}_2\text{e/ha}$):** Màu lục ngọc bích trắc địa (`#1a5242`, Forest Teal).
  - **Lô Carbon Cao ($> 200\text{ tCO}_2\text{e/ha}$):** Màu vàng hổ phách trầm ấm (`#6e5620`, Muted Amber).
- Người xem lập tức hiểu: **"Mỗi khoảnh rừng trên địa hình đồi núi này mang một trữ lượng tín chỉ carbon cụ thể có thể đo lường và giao dịch."**

---

## 10. BỐ CỤC KHUNG HÌNH & GÓC NHÌN CAMERA (CAMERA COMPOSITION)

### A. Góc nhìn trên không xiên điện ảnh (Oblique Aerial Perspective)
- **Vấn đề góc cũ:** Góc cũ quá dốc ($35^\circ - 40^\circ$) và quá gần làm đè bẹp các tầng không gian.
- **Thiết lập góc mới:**
  - Vị trí camera: `(18.0, 14.5, 24.0)`
  - Điểm nhìn mục tiêu: `lookAt(0.0, 2.5, -2.0)`
  - Trường nhìn (FOV): `36.0` độ
  - Góc nghiêng so với mặt phẳng ngang: $\approx 24^\circ - 26^\circ$.

### B. Bố cục 3 tầng không gian có chiều sâu mạnh mẽ (Three-Tier Depth Separation)
1. **Tiền cảnh (Foreground - Góc dưới bên phải):**
   - 3–5 cây rừng trưởng thành chi tiết sắc nét, thấy rõ gốc bám đất, thân cây vững chắc và các tầng tán vươn lên.
   - Tạo điểm tựa thị giác (visual anchor) chứng minh đây là khu rừng thực thụ.
2. **Trung cảnh (Middle Ground - Tâm điểm thung lũng):**
   - Quần xã 30–50 cây đan xen, đồi núi uốn lượn, các lô phân vùng carbon hiển thị rõ nét.
   - Vệt quét laser và chùm xung UAV LiDAR hoạt động chủ yếu tại khu vực này.
3. **Hậu cảnh (Background - Góc trên bên trái):**
   - Sườn đồi dốc thoải với bóng dáng các cây rừng thưa dần, mờ nhẹ vào lớp sương mù viễn thám (`FogExp2`), tạo chiều sâu không gian vô tận.
4. **Khoảng thở an toàn (Negative Space):**
   - Phía bên trái và dưới cùng để thoáng để nhường không gian cho nội dung chữ Hero (H1, Eyebrow, CTAs) trên desktop, không gây xung đột thị giác.

---

## 11. HỆ THỐNG CHIẾU SÁNG & KHÍ QUYỂN (LIGHTING & ATMOSPHERE)

Hệ thống chiếu sáng được thiết lập theo phong cách ảnh viễn thám chụp lúc sáng sớm hoặc hoàng hôn thanh bình:
- **Ánh sáng môi trường (`THREE.AmbientLight`):**
  - Màu lam khí quyển nhạt: `0x10222c`, cường độ `0.50`. Đảm bảo các góc khuất dưới tán cây không bị đen kịt mà giữ được chi tiết thân cây.
- **Ánh sáng mặt trời chính (`THREE.DirectionalLight`):**
  - Vị trí: `(35, 45, 20)`, màu vàng nhạt ấm áp tự nhiên `0xf0f6fa`, cường độ `0.95`.
  - Góc chiếu xiên tạo bóng đổ mềm trên sườn đồi, làm nổi bật khối tán 3D của từng cây riêng lẻ.
- **Ánh sáng phụ trợ trắc địa (`THREE.DirectionalLight` - Subtle Tech Rim):**
  - Vị trí: `(-25, 20, -15)`, màu lục lam trắc địa `0x00c4e8`, cường độ `0.20`.
  - Tạo viền sáng mảnh (rim light) phía sau thân cây và sườn núi, mang lại chiều sâu công nghệ tinh tế.
- **Sương mù khí quyển (`THREE.FogExp2`):**
  - Màu nền: `0x080d11`, mật độ: `0.015`. Hòa quyện hoàn hảo mép canvas vào nền web.

---

## 12. HỆ THỐNG MÃ HÓA MÀU SẮC DỮ LIỆU (COLOR ENCODING SYSTEM)

Mọi màu sắc trong khung cảnh đều mang **ý nghĩa dữ liệu trắc địa**, không có màu sắc trang trí tùy tiện:

| Đối tượng (Element) | Mã màu Hex | Ý nghĩa ngữ nghĩa khoa học |
|---|:---:|---|
| **Nền Canvas / Sương mù** | `#080d11` | Không gian viễn thám tối, đồng nhất với `--color-base-950` |
| **Bề mặt địa hình DTM** | `#0c151c` | Bề mặt đất thực địa tự nhiên sẫm màu |
| **Đường bình độ Isolines** | `#183a48` | Đường cao trình trắc địa bán trong suốt |
| **Thân cây gỗ** | `#18120c` $\to$ `#221a14` | Vỏ cây tự nhiên sẫm màu, độ nhám cao |
| **Tán cây tự nhiên** | `#143526` $\to$ `#245e3c` | Diệp lục rừng nhiệt đới tự nhiên |
| **Chùm tia laser UAV** | `#00e5ff` | Bước sóng tia quét laser LiDAR (Cyan tinh xảo, mờ nhẹ) |
| **Mây điểm LiDAR (CHM)** | `#00c4e8` $\to$ `#3dd6b5` | Điểm phản hồi tán rừng theo chiều cao tán |
| **Sinh khối / Cổ thụ (AGB)**| `#2a7248` + chỏm `#7c6f32` | Tích lũy sinh khối cao của cây thành thục |
| **Lô Carbon Thấp** | `#0e3840` | Phân vùng $<60\text{ tCO}_2\text{e/ha}$ |
| **Lô Carbon Trung Bình** | `#1a5242` | Phân vùng $60 - 150\text{ tCO}_2\text{e/ha}$ |
| **Lô Carbon Cao** | `#6e5620` | Phân vùng $>200\text{ tCO}_2\text{e/ha}$ (Hổ phách trầm) |

> **Cấm hoàn toàn:** Tím (Purple), Hồng/Đỏ Magenta, Xanh dương điện tử chói gắt, Gradient cầu vồng neon.

---

## 13. TIẾN TRÌNH KỂ CHUYỆN DỮ LIỆU KHÔNG GIAN (SPATIAL DATA TRANSFORMATION)

Chuyển động trong 3D là **công cụ diễn giải quy trình đo lường**, không phải chuyển động quay vòng tròn vô tận:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ STATE 1: RỪNG NGUYÊN BẢN (0s – 5s)                                                    │
│ Hiện trạng rừng tự nhiên thanh bình, nắng rọi qua tán cây, cành lá lay động khẽ.      │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ STATE 2: QUÉT LiDAR TỪ UAV (5s – 11s)                                                  │
│ UAV lướt êm ái, phát chùm tia laser cyan mảnh quét qua tán cây; điểm mây LiDAR sáng lên.│
├────────────────────────────────────────────────────────────────────────────────────────┤
│ STATE 3: BÓC TÁCH CẤU TRÚC SINH KHỐI (11s – 16s)                                       │
│ Cấu trúc tầng thứ cây rừng bộc lộ rõ rệt, màu sắc tán phân hóa theo thể tích sinh khối.│
├────────────────────────────────────────────────────────────────────────────────────────┤
│ STATE 4: LẬP BẢN ĐỒ LÔ TRỮ LƯỢNG CARBON (16s – 21s)                                    │
│ Các lô ranh giới tự nhiên phát sáng nhẹ, hiển thị bản đồ nhiệt mật độ carbon tCO2e/ha. │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ RESET: CHUYỂN TIẾP MƯỢT MÀ VỀ STATE 1 (21s – 24s)                                      │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

- **Quy tắc chuyển động camera:** Không quay tròn cả thế giới (`rot.y = t * 0.035` bị cấm). Chỉ có dao động thị sai tinh tế (parallax drift $\pm 1.2^\circ$) theo chuyển động chuột và dòng thời gian.
- **Tuân thủ Motion Reduction:** Tự động dừng chu kỳ chuyển động nếu người dùng bật `prefers-reduced-motion: reduce`.

---

## 14. BỐ CỤC TRÊN DESKTOP VS. BỐ CỤC TRÊN MOBILE (DESKTOP VS. MOBILE COMPOSITION)

### A. Sơ đồ bố cục Desktop (>= 1024px)
Trên màn hình lớn, bố cục 2 cột cân bằng. Khung cảnh 3D nằm trọn ở cột phải ($480\text{px} \times 480\text{px}$ đến $580\text{px} \times 540\text{px}$), tạo thành một "cửa sổ viễn thám" sống động:

```
┌───────────────────────────────────────────────────────────────────────────────────────┐
│ HEADER (Logo, Service ID, 7 Navigation Links, CTA)                                    │
├───────────────────────────────────────────┬───────────────────────────────────────────┤
│ CỘT TRÁI (NỘI DUNG HERO):                 │ CỘT PHẢI (HERO 3D SCENE):                 │
│                                           │                                           │
│ [Eyebrow Tag]                             │                 [UAV Drone]               │
│                                           │                     \ \ \                  │
│ H1: LƯỢNG HÓA CARBON SINH KHỐI           │                      \ \ \ [Tia laser]     │
│ RỪNG BẰNG UAV LiDAR CHÍNH XÁC CAO         │             /\       \ \ \                 │
│                                           │            /  \        \ \ \                │
│ Description:                              │          ( Tán )        \ \ \               │
│ Đo đạc cấu trúc 3D tán rừng...            │          /  |  \     /\   \ \ \              │
│                                           │     /\  | Thân|   /  \   [Mây điểm]           │
│ [CTA Nhanh]  [Xem Báo Cáo Mẫu]            │    /  \ |  Cây|  ( Tán )                      │
│                                           │   ( Tán)          / | \                       │
│ [Dải chỉ số kỹ thuật: 95% / Level 2...]   │  ═══[Đường bình độ]══════════════════════════ │
│                                           │  [Lô Carbon A - Teal]   [Lô Carbon B - Amber] │
└───────────────────────────────────────────┴───────────────────────────────────────────┘
```

### B. Sơ đồ bố cục Mobile (< 768px / 375px – 430px)
Trên điện thoại, **tuyệt đối không thu nhỏ (scale down) cảnh desktop**. Bố cục được thiết kế lại riêng biệt:
- Thứ tự hiển thị: `Eyebrow` $\to$ `H1` $\to$ `Description` $\to$ `CTAs` $\to$ **`Hero 3D Canvas`**.
- Chiều cao cố định: $260\text{px} - 280\text{px}$, chiếm trọn chiều rộng với hiệu ứng mờ viền (radial mask).
- Bố cục 3D tinh giản tập trung (Focal Composition):
  - **1 Cây cổ thụ tiền cảnh nổi bật** ở góc phải (rõ thân, tán, cấu trúc).
  - **4–8 cây trung cảnh** trên sườn đồi thoai thoải.
  - **1 chùm quét laser tập trung** từ góc trên chiếu vào tán cây.
  - **1 lô ranh giới carbon** rõ ràng dưới mặt đất.
  - Số lượng mây điểm: $\le 1.000$ điểm.

```
┌───────────────────────────────────────────┐
│ HEADER MOBILE (Logo + Hamburger Menu)     │
├───────────────────────────────────────────┤
│ [Eyebrow Tag]                             │
│ H1: LƯỢNG HÓA CARBON SINH KHỐI...         │
│ Description tóm tắt                       │
│ [CTA Chính]  [CTA Phụ]                    │
├───────────────────────────────────────────┤
│ KHUNG CẢNH 3D MOBILE TINH GIẢN (280px):   │
│                                           │
│                 [UAV Mini]                │
│                     \ \                   │
│             /\       \ \                  │
│            /  \       \ \ [Laser Ray]     │
│          ( Tán )       \ \                │
│            |  |         \                 │
│          |Thân|      [LiDAR Points]       │
│          |Cây |                           │
│  ═══════[Sườn đồi DTM]══════════════════  │
│        [Lô Carbon trắc địa]               │
└───────────────────────────────────────────┘
```

---

## 15. DANH MỤC ĐỐI TƯỢNG LOẠI BỎ (OBJECT INVENTORY TO REMOVE)

| Đối tượng (Object Variable) | Lý do loại bỏ triệt để |
|---|---|
| `this.wireMesh` | Lưới tam giác dày đặc `wireframe: true` tạo thẩm mỹ sci-fi game cũ kỹ. |
| `this.swathMesh` | Mặt phẳng $16 \times 26\text{m}$ lơ lửng chắn ngang trời như tấm kính đen. |
| `this.spatialGrid` | `GridHelper` ở đáy $y=-3.5$ rời rạc khỏi địa hình, không có ý nghĩa lâm nghiệp. |
| `this.parcelGroup` (4 vòng tròn) | `RingGeometry` tròn đồng tâm phi thực tế, sai lệch bản chất lô rừng tự nhiên. |
| `this.points` (19.000 hạt ngẫu nhiên) | Bụi hạt bay tự do gây rối loạn thị giác, che khuất cây rừng. |
| Cây hình nón đơn lẻ (Single Cone) | Không thể hiện được cấu trúc tán, thân và sinh khối thực vật. |

---

## 16. DANH MỤC ĐỐI TƯỢNG KIẾN TẠO MỚI (OBJECT INVENTORY TO CREATE)

| Tên đối tượng mới | Lớp Three.js | Hình học (Geometry) | Vật liệu (Material) | Số lượng / Ngân sách |
|---|---|---|---|---|
| `this.terrainMesh` | `THREE.Mesh` | `PlaneGeometry(64, 64, 80, 80)` uốn lượn tự nhiên | `MeshStandardMaterial` tối `#0c151c`, `roughness: 0.92` | 1 Mesh |
| `this.contourLines` | `THREE.LineSegments` | `BufferGeometry` tính theo các lát cắt cao độ | `LineBasicMaterial({ color: 0x183a48, opacity: 0.25 })` | 1 Draw call |
| `this.trunks` | `THREE.InstancedMesh` | `CylinderGeometry(0.16, 0.32, 3.2, 7)` | `MeshStandardMaterial` vỏ cây `#1c1510`, `roughness: 0.95` | 1 InstancedMesh (110–160 cây) |
| `this.canopyVolumes` | `THREE.InstancedMesh` (4 nhóm) | Đa diện tán lá hữu cơ (2–3 khối elip/vòm đa diện ghép lại) | `MeshStandardMaterial` tán rừng `#183e28`, đổi màu theo Biomass | 4 InstancedMesh (2 Draw calls tối ưu) |
| `this.lidarPoints` | `THREE.Points` | `BufferGeometry` (neo tại Ground, Trunk, Canopy) | `PointsMaterial({ size: 0.16, vertexColors: true })` | 1.800–3.500 điểm (1 Draw call) |
| `this.uavDrone` | `THREE.Group` | Khung UAV tối giản (Box thân, 4 đòn, cảm biến laser) | `MeshStandardMaterial` `#121820` + LED trắc địa | 1 Group nhỏ (~60 polygons) |
| `this.laserRays` | `THREE.LineSegments` | `BufferGeometry` (8–14 tia laser từ UAV xuống tán) | `LineBasicMaterial({ color: 0x00e5ff, opacity: 0.35, AdditiveBlending })` | 1 Draw call |
| `this.laserFootprint` | `THREE.Line` | `BufferGeometry` bám sát địa hình DTM tại vệt quét | `LineBasicMaterial({ color: 0x3dd6b5, opacity: 0.75 })` | 1 Draw call |
| `this.carbonParcels` | `THREE.Group` (chứa 4–6 Mesh + Line) | `ShapeGeometry` đa giác uốn lượn bám địa hình | `MeshBasicMaterial({ transparent: true, opacity: 0.32 })` + `LineLoop` ranh giới | 4–6 lô GIS (1-2 Draw calls) |

---

## 17. NGÂN SÁCH HIỆU NĂNG RUNTIME (PERFORMANCE BUDGET)

Khung cảnh 3D Hero được thiết kế với tiêu chuẩn hiệu năng cao cấp, đảm bảo chạy mượt mà 60 FPS trên mọi thiết bị:

| Chỉ số kỹ thuật (Metric) | Ngân sách tối đa (Budget Ceiling) | Thiết kế mới đạt được | Đánh giá an toàn |
|---|:---:|:---:|:---:|
| **Draw Calls** | $\le 15\text{ calls}$ | **8 – 11 calls** | RẤT AN TOÀN (Tối ưu tuyệt đối) |
| **Tổng số đa giác (Triangles)** | $\le 50.000\text{ tris}$ | **~28.000 tris** | RẤT AN TOÀN |
| **Số lượng điểm LiDAR (Points)** | $\le 4.000\text{ điểm}$ | **1.800 – 3.200 điểm** | Không gây lag GPU |
| **Số lượng cây (Hero Trees)** | 100 – 180 cây | **120 – 150 cây** | Đủ dày để nhận diện, đủ thưa để thấy đất |
| **Device Pixel Ratio (DPR)** | Clamped $\le 1.5$ (desktop) / $\le 1.0$ (mobile) | Clamped nghiêm ngặt | Chống quá nhiệt màn hình 4K/Retina |
| **Cấp phát bộ nhớ trong `animate()`** | 0 Bytes (Zero garbage collection) | 0 Bytes | Không gây giật khung hình (Zero Frame Drop) |

---

## 18. BỘ TIÊU CHÍ NGHIỆM THU ĐỘC LẬP (INDEPENDENT ACCEPTANCE CRITERIA)

Trước khi coi thiết kế mới là đạt yêu cầu, khung cảnh 3D bắt buộc phải vượt qua **5 bài kiểm tra độc lập (5 Isolation Tests)**:

- [ ] **TEST 1 (Thử nghiệm Ẩn chữ - Hide Text Test):**  
  Ẩn toàn bộ chữ H1, mô tả, nút bấm. Người xem nhìn vào khung cảnh trong 2 giây có nhận ra ngay lập tức: **"ĐÂY LÀ MỘT KHU RỪNG TỰ NHIÊN ĐÍCH THỰC"** hay không? (Nếu vẫn thấy các khối nón tam giác hoặc ma trận hạt $\implies$ **FAIL**).
- [ ] **TEST 2 (Thử nghiệm Ẩn lớp Carbon - Hide Carbon Layer Test):**  
  Tắt lớp ranh giới carbon. Người xem có thấy rõ: **"Một thiết bị UAV đang phát chùm tia quét laser LiDAR đo đạc tán cây rừng"** hay không? (Nếu thấy laser sci-fi phát sáng như vũ khí $\implies$ **FAIL**).
- [ ] **TEST 3 (Thử nghiệm Ẩn LiDAR - Hide LiDAR Test):**  
  Tắt toàn bộ mây điểm và tia laser. Khung cảnh còn lại có thể hiện rõ: **"Địa hình đồi núi DTM tự nhiên với các đường bình độ trắc địa và các tầng tán cây hữu cơ"** hay không? (Nếu thấy lưới tam giác wireframe $\implies$ **FAIL**).
- [ ] **TEST 4 (Thử nghiệm Ẩn Cây - Hide Trees Test):**  
  Tắt các mô hình cây rừng. Bề mặt địa hình và các đa giác ranh giới có thể hiện rõ: **"Bản đồ phân lô GIS quản lý trữ lượng carbon theo màu sắc mật độ"** hay không? (Nếu thấy các vòng tròn kỳ quặc $\implies$ **FAIL**).
- [ ] **TEST 5 (Thử nghiệm 3 Giây - 3-Second Narrative Test):**  
  Cho một người dùng bình thường xem khung cảnh 3D trong đúng 3 giây. Người đó có thể tóm tắt lại: *"Khung cảnh mô tả công nghệ bay quét laser một khu rừng để tính toán sinh khối và lập bản đồ carbon"* hay không?

---

> **QUY TẮC TUÂN THỦ NGHIÊM NGẶT (STRICT COMPLIANCE GATE):**  
> Tài liệu này là bản đặc tả kỹ thuật và thiết kế thị giác tối hậu.  
> **TUYỆT ĐỐI KHÔNG CHỈNH SỬA MÃ NGUỒN (HTML, CSS, JS, Three.js) TRONG BƯỚC NÀY.**  
> Quá trình triển khai chỉ được phép bắt đầu khi bản đặc tả này được xem xét và phê duyệt.
