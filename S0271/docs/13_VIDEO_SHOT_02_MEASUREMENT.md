# S0271 — SPECIFICATION & AUDIT: STEP 13 VIDEO SHOT 02 (MEASUREMENT)
## Phim Hero Shot 02: Quá Trình Bay Đo & Đồng Bộ Dữ Liệu Khí Tượng
**Trạng Thái:** ĐÃ RENDER HOÀN TẤT (100% ĐẠT TIÊU CHUẨN KỸ THUẬT & QUY CHUẨN CHUYỂN TIẾP)  
**Tập Tin MP4:** [shot_02_measurement.mp4](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/video/shot_02_measurement.mp4)  
**Tập Tin WebM:** [shot_02_measurement.webm](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/video/shot_02_measurement.webm)  
**Khung Đầu (First Frame):** [shot_02_measurement_first_frame.webp](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/images/shot_02_measurement_first_frame.webp)  
**Khung Cuối (Last Frame):** [shot_02_measurement_last_frame.webp](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/images/shot_02_measurement_last_frame.webp)

---

## 1. THÔNG SỐ KỸ THUẬT RENDER (CLIP SPECIFICATIONS)

| Tiêu Chí | Thông Số Kỹ Thuật | Ghi Chú Đảm Bảo Chất Lượng |
| :--- | :--- | :--- |
| **Thời lượng** | 3.0 Giây (72 frames) | Khớp hoàn hảo kịch bản phân cảnh Step 11 |
| **Tốc độ khung hình** | 24 fps | Chuẩn mượt mà điện ảnh tài liệu khoa học |
| **Độ phân giải** | $1920 \times 1080$ (16:9) | Full HD tối ưu hóa hiển thị responsive |
| **Định dạng video** | MP4 (H.264, CRF 18) & WebM (VP9, 2Mbps) | Tương thích đa nền tảng, nén không vỡ hạt |
| **Dung lượng file** | MP4: ~4.59 MB \| WebM: ~1.25 MB | Tải trang êm ái, hỗ trợ xem trước mượt |

---

## 2. DIỄN BIẾN HÀNH ĐỘNG & CHUYỂN ĐỘNG CAMERA (SHOT ACTION & CAMERA)

- **Hành động UAV:** Cùng thiết bị hexacopter công nghiệp, bay tịnh tiến đều dọc theo hành trình đo đạc bề mặt ô chôn lấp với vận tốc $2.0\,\text{m/s}$, giữ độ cao ổn định $20\text{m}$.
- **Chuyển động Camera:** Thực hiện cú lượn nhẹ bán kính rộng quanh sườn UAV (*gentle orbit drift*) đồng thời camera bắt đầu hạ dần góc ngẩng (*tilt-down* từ $45^\circ$ xuống $70^\circ$).
- **Trạng thái Overlay:**
  - Vết đường bay khảo sát màu Data Teal (`#2FA98C`) siêu mảnh xuất hiện dần bám theo sau đuôi drone.
  - Các mũi tên vector gió màu Warm Sand/trắng mờ chỉ hướng luồng khí tự nhiên.
  - *Chưa hiển thị toàn bộ bản đồ nồng độ methane* (đúng quy chuẩn kịch bản: không show full methane map quá sớm).

---

## 3. TIẾP NỐI QUANG HỌC VÀ CHUYỂN TIẾP SANG SHOT 03 (SPATIAL MAPPING)

- **Neo đầu (First Frame Anchor):** Trùng khớp $100\%$ vị trí UAV và góc nhìn từ cuối Shot 01.
- **Neo cuối (Last Frame Anchor):** Camera đã hạ góc ngẩng xuống $70^\circ$, bao quát trực tiếp bề mặt ô chôn lấp với vết bay Data Teal rõ nét, tạo tiền đề hoàn hảo để chúc đầu thẳng góc xuống $90^\circ$ (Nadir Top-Down) mở toàn bộ bản đồ $\text{CH}_4$ trong Shot 03.
