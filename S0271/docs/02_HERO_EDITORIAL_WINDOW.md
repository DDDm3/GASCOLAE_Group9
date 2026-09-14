# S0271 — SPECIFICATION & AUDIT: STEP 02 HERO EDITORIAL WINDOW
## Key Visual: Cửa Sổ Khảo Sát Phát Thải Methane Bãi Chôn Lấp
**Trạng Thái:** ĐÃ DUYỆT (100% ĐẠT TIÊU CHUẨN VISUAL BIBLE)  
**Tập Tin Gốc:** [hero_editorial_window_master.jpg](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/images/hero_editorial_window_master.jpg)  
**Tập Tin WebP:** [hero_editorial_window_1920.webp](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/images/hero_editorial_window_1920.webp)

---

## 1. THÔNG SỐ KỸ THUẬT & DANH MỤC BIẾN THỂ (EXPORT ASSETS)

| Tên Tệp | Độ Phân Giải (px) | Tỷ Lệ | Định Dạng | Dung Lượng | Mục Đích Sử Dụng |
| :--- | :---: | :---: | :---: | :---: | :--- |
| `hero_editorial_window_master.jpg` | $1376 \times 768$ | 16:9 | JPEG | ~983 KB | Tệp gốc chất lượng tối đa |
| `hero_editorial_window_1920.webp` | $1920 \times 1072$ | 16:9 | WebP | ~325 KB | Màn hình Retina / Desktop $4\text{K}$ |
| `hero_editorial_window_1600.webp` | $1600 \times 893$ | 16:9 | WebP | ~327 KB | Desktop tiêu chuẩn ($1440\text{p} - 1600\text{p}$) |
| `hero_editorial_window_1280.webp` | $1280 \times 714$ | 16:9 | WebP | ~250 KB | Laptop phổ thông ($1024\text{p} - 1280\text{p}$) |
| `hero_editorial_window_desktop_crop.webp` | $1170 \times 768$ | ~16:10 | WebP | ~283 KB | Khung cửa sổ nổi Floating Media Window |
| `hero_editorial_window_mobile_crop.webp` | $432 \times 768$ | 9:16 | WebP | ~104 KB | Giao diện điện thoại di động thông minh |

---

## 2. CROP-SAFE DESKTOP GUIDE (BỐ CỤC KHUNG CỬA SỔ FLOATING MEDIA WINDOW)

- **Nguyên lý thiết kế:** Spatial Editorial không chia đôi màn hình đối xứng đơn điệu (anti-split hero). Thay vào đó, ảnh hoạt động như một "cửa sổ không gian" (*floating media viewport*) đắm chìm:
  - **42% lề trái (X: 0% → 42%):** Khu vực không gian âm an toàn (*Negative Safe Space*), gồm thảm rừng Deep Forest xanh mướt và bầu trời khuếch tán dịu nhẹ. Đây là vùng đặt Headline tiếng Việt, Sub-headline, Badge trạng thái dịch vụ và nhóm nút CTA chính mà không bị rối mắt.
  - **58% lề phải (X: 42% → 100%):** Vùng trình diễn công nghệ và hiện trường. UAV chiếm lĩnh góc trên-phải (X: 68%–88%, Y: 12%–35%), ô chôn lấp chất thải kỹ thuật trải dài từ trung tâm sang góc dưới-phải (X: 35%–95%, Y: 32%–88%).

---

## 3. CROP-SAFE MOBILE GUIDE (BỐ CỤC THIẾT BỊ DI ĐỘNG DỌC 9:16)

- **Vùng cắt an toàn:** Tọa độ X từ $40\%$ đến $71\%$ của ảnh gốc (chiều rộng $432\text{px}$, chiều cao $768\text{px}$):
  - **Nửa trên ($0\% - 45\%$ chiều cao):** Giữ trọn vẹn hình bóng UAV công nghiệp đang bay lơ lửng ổn định, đảm bảo nhận diện ngay lập tức bản chất dịch vụ đo bằng thiết bị bay không người lái.
  - **Nửa dưới ($45\% - 100\%$ chiều cao):** Bao quát trọn vẹn ô chôn lấp trọng điểm có màng phủ HDPE, đất đầm nén, các đường contour $\text{CH}_4$ bám sườn đê và 2 điểm hotspot màu hổ phách (`#D7A93E`).
  - **Hiệu ứng phủ nền di động:** Khi hiển thị trên mobile, có thể bổ sung lớp phủ gradient mờ nhẹ từ đỉnh xuống (Deep Forest / Dark Mint overlay) để văn bản tiêu đề trên mobile đọc rõ ràng theo chuẩn WCAG AAA.

---

## 4. FOCAL POINT DESCRIPTION (MÔ TẢ CHI TIẾT ĐIỂM HỘI TỤ THỊ GIÁC)

1. **Tiêu điểm chính 1 — Thiết bị bay công nghiệp (Primary Anchor):**
   - Vị trí: Góc phần ba trên bên phải ($X \approx 76\%, Y \approx 20\%$).
   - Cấu trúc: Multirotor Hexacopter khung sợi carbon màu Ink (`#182523`), cánh tay đòn cứng cáp có vòng bảo vệ cánh an toàn công nghiệp, cụm cảm biến quang học đo $\text{CH}_4$ hướng vuông góc $90^\circ$ xuống mặt đất, ăng-ten RTK gắn lưng.
2. **Tiêu điểm chính 2 — Lớp GIS Methane & Hotspot (Data Layer Anchor):**
   - Vị trí: Bề mặt ô chôn lấp đang khảo sát ($X \approx 55\% - 85\%, Y \approx 45\% - 75\%$).
   - Lớp hiển thị: Các đường đồng mức nồng độ $\text{CH}_4$ bán trong suốt ($35\%$ opacity) màu chuyển từ Soft Mint (`#DDEFE8`) sang Data Teal (`#2FA98C`) uốn lượn chính xác theo sống đê và bờ dốc.
   - Hotspot: Đúng 3 điểm khoanh vùng màu Vàng Hổ Phách Đo Đạc (`#D7A93E`) tại mép màng phủ HDPE và họng giếng thu khí LFG.
3. **Tiêu điểm phụ — Môi trường bãi chôn lấp kỹ thuật (Context Terrain):**
   - Các ô chôn lấp hình thang giật cấp lót màng HDPE xám sẫm mờ, bờ đê quai đất đầm nén Warm Sand (`#F6F2E8`), bao bọc bởi thảm rừng xanh Deep Forest (`#0B2E2A`) dưới ánh sáng ban mai khuếch tán $5400\text{K}$.

---

## 5. SEED & REFERENCE NOTES CHO CÁC BƯỚC TIẾP THEO

Các thông số bắt buộc phải tái sử dụng để khóa tính liên tục (Continuity Lock):
- **Terrain Seed Reference:**
  - Cụm bãi chôn lấp gồm 2 ô chính: Ô trên phủ màng đen HDPE phẳng kín; ô dưới là ô đang đóng phủ hỗn hợp (màng HDPE mép trái + đất đầm nén Warm Sand ở giữa và sườn đê).
  - Vành đai rừng rậm nhiệt đới bao bọc toàn bộ 3 phía (trái, trên, dưới).
- **Camera Continuity cho Step 03 (Expanded Spatial Map):**
  - Giữ nguyên tâm địa lý của ô chôn lấp dưới ($X \approx 65\%, Y \approx 60\%$).
  - Camera tilt-down từ góc nghiêng $50^\circ$ hiện tại chúc thẳng xuống $90^\circ$ (Nadir orthomosaic), giữ nguyên hệ tọa độ của 3 điểm hotspot amber.
- **Before / After Continuity cho Step 06 & Step 07:**
  - Cắt cúp hoặc khóa khung hình vào góc ô chôn lấp bên phải chứa 2 điểm hotspot chính.
  - Step 06 (Baseline): Giữ nguyên hiện trạng 2 hotspot amber với diện tích phát tán vừa phải.
  - Step 07 (Confirmation): Giữ nguyên $100\%$ địa hình, chỉ thu nhỏ hoặc triệt tiêu vùng hotspot amber sau biện pháp khắc phục kỹ thuật.
