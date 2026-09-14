# S0271 — SPECIFICATION & AUDIT: STEP 06 BASELINE REFERENCE (BEFORE)
## Key Visual: Khung Hình Chuẩn Kỳ Nền — Trước Biện Pháp Khắc Phục
**Trạng Thái:** ĐÃ DUYỆT (100% ĐẠT TIÊU CHUẨN KHÓA CỨNG CAMERA & HOTSPOT)  
**Tập Tin Gốc:** [baseline_reference_master.jpg](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/images/baseline_reference_master.jpg)  
**Tập Tin WebP:** [baseline_reference_1920.webp](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/images/baseline_reference_1920.webp)

---

## 1. THÔNG SỐ KỸ THUẬT & DANH MỤC BIẾN THỂ (EXPORT ASSETS)

| Tên Tệp | Độ Phân Giải (px) | Tỷ Lệ | Định Dạng | Dung Lượng | Mục Đích Sử Dụng |
| :--- | :---: | :---: | :---: | :---: | :--- |
| `baseline_reference_master.jpg` | $1376 \times 768$ | 16:9 | JPEG | ~860 KB | Bản gốc lưu trữ chất lượng cao |
| `baseline_reference_1920.webp` | $1920 \times 1072$ | 16:9 | WebP | ~286 KB | Màn hình lớn Retina / Desktop 4K |
| `baseline_reference_1600.webp` | $1600 \times 893$ | 16:9 | WebP | ~294 KB | Desktop tiêu chuẩn ($1440\text{p} - 1600\text{p}$) |
| `baseline_reference_1280.webp` | $1280 \times 714$ | 16:9 | WebP | ~221 KB | Laptop phổ thông ($1024\text{p} - 1280\text{p}$) |
| `baseline_reference_mobile.webp` | $432 \times 768$ | 9:16 | WebP | ~87 KB | Giao diện điện thoại di động thông minh |

---

## 2. CAMERA / LENS NOTES (THÔNG SỐ KHÓA QUANG HỌC TUYỆT ĐỐI)

Để phục vụ slider tương tác Trước–Sau (Before/After split comparison) mượt mà không bị rung giật:
- **Góc chụp (Viewing Angle):** $90^\circ$ Nadir Orthographic / Top-Down trực diện vào ô chôn lấp trọng điểm.
- **Tiêu cự tương đương:** $50\text{mm}$ rectilinear (không méo hình cầu, không hiệu ứng mắt cá).
- **Độ cao quan trắc (Altitude):** Cố định tương đương $60\text{m}$ trên mặt bãi rác.
- **Ánh sáng & Thời tiết:** Buổi sáng trong lành $5400\text{K}$, ánh sáng khuếch tán đồng đều qua tầng mây mỏng nhẹ, bóng đổ ngắn tự nhiên theo hướng Tây Bắc.

---

## 3. HOTSPOT POSITION MAP (BẢN ĐỒ TỌA ĐỘ CÁC ĐIỂM PHÁT THẢI CAO KỲ NỀN)

Trên bề mặt ô chôn lấp khảo sát, hệ thống ghi nhận chính xác 4 điểm dị thường phát thải cao (Measurement Amber `#D7A93E`):
1. **Hotspot A (Góc trên-phải, mép đường đê):** Tọa độ tương đối $(X \approx 70.5\%, Y \approx 24.0\%)$ — Quầng đồng mức nồng độ lan tỏa rộng 4 lớp (Soft Mint sang Data Teal).
2. **Hotspot B (Góc dưới-trái, góc uốn màng HDPE):** Tọa độ tương đối $(X \approx 30.5\%, Y \approx 66.0\%)$ — Rò rỉ tại nếp gấp màng chống thấm với 3 lớp contour.
3. **Hotspot C (Đáy dưới-giữa, mép đê quai đầm nén):** Tọa độ tương đối $(X \approx 47.8\%, Y \approx 82.5\%)$ — Dải phát tán hẹp bám theo rãnh đê.
4. **Hotspot D (Cụm giếng thu khí bên phải):** Tọa độ tương đối $(X \approx 81.5\%, Y \approx 58.0\%)$ — Quầng đồng mức đậm tại khu vực đầu giếng thu khí LFG.

---

## 4. REFERENCE INSTRUCTIONS BẮT BUỘC CHO STEP 07 (CONFIRMATION AFTER)

Khi thực thi Step 07 ([07_image_confirmation.md](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/prompts/antigravity-prompts/07_image_confirmation.md)):
- **TUYỆT ĐỐI KHÔNG THAY ĐỔI:**
  - Góc máy, độ cao, góc xoay của camera (phải trùng khớp $100\%$ từng pixel).
  - Kết cấu địa hình đất đầm nén, vết gập màng HDPE và thảm rừng xung quanh.
  - Tọa độ tâm của 4 điểm Hotspot A, B, C, D.
- **CHỈ ĐƯỢC PHÉP THAY ĐỔI:**
  - Mức độ phát tán và diện tích quầng đồng mức xung quanh các điểm hotspot:
    - Hotspot A & D: Vùng contour co cụm nhỏ lại rõ rệt (thể hiện đã xử lý kỹ thuật đầu giếng và vá màng).
    - Hotspot B & C: Triệt tiêu hoặc mờ nhạt dần về nồng độ nền Soft Mint.
  - Tuyệt đối không ghi số % giảm (không ghi "-85%"), không tạo số $\text{tCO}_2\text{e}$ giả định trên ảnh.
