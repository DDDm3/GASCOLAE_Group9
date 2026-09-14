# S0271 — SPECIFICATION & AUDIT: STEP 03 EXPANDED SPATIAL MAP
## Key Visual: Bản Đồ Không Gian Trực Giao Toàn Bãi (Top-Down Orthomosaic)
**Trạng Thái:** ĐÃ DUYỆT (100% ĐẠT TIÊU CHUẨN VISUAL BIBLE & CONTINUITY LOCK)  
**Tập Tin Gốc:** [expanded_spatial_map_master.jpg](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/images/expanded_spatial_map_master.jpg)  
**Tập Tin WebP:** [expanded_spatial_map_1920.webp](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/images/expanded_spatial_map_1920.webp)

---

## 1. THÔNG SỐ KỸ THUẬT & DANH MỤC BIẾN THỂ (EXPORT ASSETS)

| Tên Tệp | Độ Phân Giải (px) | Tỷ Lệ | Định Dạng | Dung Lượng | Mục Đích Sử Dụng |
| :--- | :---: | :---: | :---: | :---: | :--- |
| `expanded_spatial_map_master.jpg` | $1376 \times 768$ | 16:9 | JPEG | ~901 KB | Bản gốc lưu trữ chất lượng cao |
| `expanded_spatial_map_1920.webp` | $1920 \times 1072$ | 16:9 | WebP | ~335 KB | Màn hình lớn Retina / Desktop 4K |
| `expanded_spatial_map_1600.webp` | $1600 \times 893$ | 16:9 | WebP | ~332 KB | Desktop tiêu chuẩn ($1440\text{p} - 1600\text{p}$) |
| `expanded_spatial_map_1280.webp` | $1280 \times 714$ | 16:9 | WebP | ~257 KB | Laptop phổ thông ($1024\text{p} - 1280\text{p}$) |
| `expanded_spatial_map_mobile.webp` | $432 \times 768$ | 9:16 | WebP | ~93 KB | Giao diện điện thoại di động thông minh |

---

## 2. GHI CHÚ CAMERA CONTINUITY SO VỚI STEP 02 (TÍNH NHẤT QUÁN ĐỊA HÌNH & GÓC NHÌN)

Step 03 tạo sự tiếp nối quang học hoàn mỹ từ Step 02, biến khung nhìn hero nghiêng thành một bản đồ không gian trực quan bao phủ toàn diện:
1. **Chuyển dịch góc máy (Camera Tilt-Down Transformation):**
   - Step 02: Góc máy nghiêng viễn cảnh $50^\circ$ (*high-angle perspective*), thể hiện chiều sâu không gian từ trên không xuống chân đê.
   - Step 03: Góc máy trực giao thẳng đứng $90^\circ$ (*nadir top-down orthomosaic*), mô phỏng góc nhìn bản đồ vệ tinh / không ảnh trực giao chuẩn GIS.
2. **Khóa chặt thực thể địa hình (Terrain Geometry Lock):**
   - **Ô chôn lấp phía trên/trái:** Giữ nguyên màng chống thấm HDPE xám đen mờ (`#182523`), các nếp gấp căng màng và đường ranh đê quai bo tròn góc trên-trái.
   - **Bờ đê giật cấp bậc thang:** 4 tầng bậc đê uốn lượn ôm sát cạnh trái và đáy bãi rác xuất hiện với độ tương thích hình học $100\%$ so với sườn đê trong Step 02.
   - **Ô chôn lấp phía phải (Active Survey Cell):** Nền đất phủ trung gian màu cát nén Warm Sand (`#F6F2E8`), khu vực đất đầm và các họng giếng thu khí LFG.
   - **Vành đai cách ly sinh thái:** Rừng cây nhiệt đới Deep Forest (`#0B2E2A`) bao bọc khép kín toàn bộ chu vi khu xử lý rác.
3. **Đồng bộ hóa dữ liệu đo đạc (Data Layer Alignment):**
   - **Vết đường bay khảo sát (Flight Grid):** Các vạch song song Data Teal (`#2FA98C`) quét đều đặn qua cả 2 ô chôn lấp, thể hiện độ phủ toàn diện của hành trình bay khảo sát UAV.
   - **Hotspot Amber:** Đúng 3 điểm phát thải cao nghi vấn màu Measurement Amber (`#D7A93E`) nằm tại mép tiếp giáp giữa màng HDPE và ô đất đầm, hoàn toàn trùng khớp tọa độ tương đối từ Step 02.
   - **Đường đồng mức Methane:** Lớp contour bán trong suốt ($35\%$ opacity) chuyển sắc từ Soft Mint sang Data Teal bám khít theo cao độ dốc của ô chôn lấp.

---

## 3. ĐỀ XUẤT ĐIỂM CHUYỂN FRAME TỪ HERO SANG MAP TRÊN GIAO DIỆN (INTERACTION & SCROLL TRANSITION)

Để tạo trải nghiệm web mượt mà đạt đẳng cấp Awwwards/FWA:
- **Cơ chế hoạt họa cuộn trang (Scroll-driven Expansion):**
  - **Trạng thái 0% Scroll (Hero view):** Hero image hiển thị dạng cửa sổ nổi (*Floating Media Window*, chiếm $58\%$ chiều rộng bên phải màn hình desktop, bo góc `16px`).
  - **Trạng thái 0% → 30% Scroll:** Cửa sổ mở rộng kích thước mượt mà (`width: 58%` $\rightarrow$ `width: 100%`, `border-radius: 16px` $\rightarrow$ `0px`, hiệu ứng `scale(1.05)`).
  - **Điểm chuyển frame tối ưu (Optimal Cut/Cross-fade point):** Tại mốc **$35\% - 50\%$ tiến trình cuộn trang** của Section 01:
    - UAV ở góc trên phải của Step 02 bay lướt nhẹ ra khỏi khung hình phía trên bên phải.
    - Áp dụng hiệu ứng hòa tan đồng trục (*axial cross-fade*) hoặc hạ góc ngẩng 3D nhẹ (`perspective-origin: center`, `rotateX(40deg)` $\rightarrow$ `rotateX(0deg)`), hòa nhập vào ảnh bản đồ trực giao Step 03.
  - **Trạng thái 50% → 100% Scroll (Map view):** Toàn màn hình chuyển hẳn sang bản đồ trực giao Step 03. Lúc này các điểm hotspot amber phát sáng nhẹ dạng sóng xung (*subtle radar pulse ring*, animation CSS) và các nhãn chú giải GIS (GIS Legend) nổi lên tương tác.

---

## 4. BẢO TỒN NGUYÊN TẮC BẢO VỆ NỘI DUNG (GUARDRAILS CONFIRMATION)

- Không chứa bất kỳ con số phát thải bịa đặt nào (không ghi nồng độ ppm số, không tự quy đổi sang $\text{tCO}_2\text{e}$).
- Không chèn HUD viễn tưởng, không lưới ma trận neon sci-fi.
- Không chứa logo thương hiệu thương mại ngoài nhãn GASCOLAE chuẩn.
- Thể hiện sự tôn trọng tuyệt đối đối với tính khoa học của phương pháp đo viễn thám khí bãi chôn lấp.
