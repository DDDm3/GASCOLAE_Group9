# S0271 — SPECIFICATION & AUDIT: STEP 05 TECHNOLOGY CORE
## Key Visual: Trục Công Nghệ Cốt Lõi Tỏa Tròn (Radial Technology Section)
**Trạng Thái:** ĐÃ DUYỆT (100% ĐẠT TIÊU CHUẨN VISUAL BIBLE)  
**Tập Tin Gốc:** [technology_core_uav_master.jpg](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/images/technology_core_uav_master.jpg)  
**Tập Tin WebP:** [technology_core_uav_1920.webp](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/images/technology_core_uav_1920.webp)

---

## 1. THÔNG SỐ KỸ THUẬT & DANH MỤC BIẾN THỂ (EXPORT ASSETS)

| Tên Tệp | Độ Phân Giải (px) | Tỷ Lệ | Định Dạng | Dung Lượng | Mục Đích Sử Dụng |
| :--- | :---: | :---: | :---: | :---: | :--- |
| `technology_core_uav_master.jpg` | $1376 \times 768$ | 16:9 | JPEG | ~551 KB | Bản gốc lưu trữ độ nét cao |
| `technology_core_uav_1920.webp` | $1920 \times 1072$ | 16:9 | WebP | ~83 KB | Màn hình lớn Retina / Desktop 4K |
| `technology_core_uav_1600.webp` | $1600 \times 893$ | 16:9 | WebP | ~87 KB | Desktop tiêu chuẩn ($1440\text{p} - 1600\text{p}$) |
| `technology_core_uav_1280.webp` | $1280 \times 714$ | 16:9 | WebP | ~65 KB | Laptop phổ thông ($1024\text{p} - 1280\text{p}$) |
| `technology_core_uav_mobile.webp` | $432 \times 768$ | 9:16 | WebP | ~37 KB | Giao diện điện thoại di động thông minh |

---

## 2. GIẢI PHẪU KỸ THUẬT & GÓC MÁY 3/4 (HARDWARE ANATOMY)

- **Cấu hình:** Hexacopter công nghiệp khung carbon màu Ink (`#182523`), cánh tay đòn cứng cáp kèm vòng bảo vệ cánh an toàn, càng đáp vững chãi.
- **Cụm cảm biến Methane ($\text{CH}_4$):** Module quang học chuyên dụng gắn trên gimbal chống rung dưới bụng máy bay, hướng góc $90^\circ$ xuống mặt đất.
- **Hệ thống định vị & khí tượng:** Ăng-ten GNSS RTK kép gắn đối xứng trên lưng thân máy bay; thanh cảm biến gió siêu âm vươn phía trước.
- **Nền môi trường tối giản:** Bãi rác và vành đai rừng được làm mờ nhẹ (*soft bokeh*), bảo toàn sự nổi bật của thiết bị.

---

## 3. BỐ CỤC KHÔNG GIAN TỎA TRÒN & TỌA ĐỘ ĐẶT 6 NODE CÔNG NGHỆ (RADIAL UI NODES)

Ảnh tuyệt đối **không render chữ hoặc icon bên trong**. Thiết bị được đặt ở trung tâm, chừa vùng đệm không gian âm xung quanh để frontend tích hợp 6 node tương tác:
1. **Node 1 — $\text{CH}_4$ Sensor (Góc trên-trái, $\approx 10\text{h}$):** Cảm biến quang học đo nồng độ methane chuyên dụng.
2. **Node 2 — GNSS / RTK (Đỉnh trên, $\approx 12\text{h}$):** Định vị chuẩn xác centimet, đồng bộ không gian và thời gian.
3. **Node 3 — Wind Met Data (Góc trên-phải, $\approx 2\text{h}$):** Cảm biến gió siêu âm đo tốc độ và hướng gió tức thời.
4. **Node 4 — GIS Mapping (Góc dưới-phải, $\approx 4\text{h}$):** Lập bản đồ không gian và khoanh vùng điểm phát thải cao.
5. **Node 5 — QA / QC Pipeline (Đáy dưới, $\approx 6\text{h}$):** Kiểm soát chất lượng, độ trôi, độ trễ và vệt bay.
6. **Node 6 — Flux & $\text{CO}_2\text{e}$ (Góc dưới-trái, $\approx 8\text{h}$):** Ước tính thông lượng và quy đổi có điều kiện.
