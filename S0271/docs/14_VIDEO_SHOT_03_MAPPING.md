# S0271 — SPECIFICATION & AUDIT: STEP 14 VIDEO SHOT 03 (SPATIAL MAPPING)
## Phim Hero Shot 03: Chuyển Dịch Trực Giao & Mở Lớp Bản Đồ Phát Tán Methane
**Trạng Thái:** ĐÃ RENDER HOÀN TẤT (100% TIẾP NỐI KHÔNG GIAN TỪ SHOT 02 SANG SHOT 04)  
**Tập Tin MP4:** [shot_03_mapping.mp4](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/video/shot_03_mapping.mp4)  
**Tập Tin WebM:** [shot_03_mapping.webm](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/video/shot_03_mapping.webm)  
**Khung Đầu (First Frame):** [shot_03_mapping_first_frame.webp](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/images/shot_03_mapping_first_frame.webp)  
**Khung Cuối (Last Frame):** [shot_03_mapping_last_frame.webp](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/images/shot_03_mapping_last_frame.webp)

---

## 1. THÔNG SỐ KỸ THUẬT RENDER (CLIP SPECIFICATIONS)

| Tiêu Chí | Thông Số Kỹ Thuật | Ghi Chú Đảm Bảo Chất Lượng |
| :--- | :--- | :--- |
| **Thời lượng** | 3.5 Giây (84 frames) | Cân đối nhịp mở lớp bản đồ viễn thám |
| **Tốc độ khung hình** | 24 fps | Chuẩn điện ảnh tài liệu khoa học |
| **Độ phân giải** | $1920 \times 1080$ (16:9) | Full HD tối ưu hóa hiển thị responsive |
| **Định dạng video** | MP4 (H.264, CRF 18) & WebM (VP9, 2Mbps) | Tối ưu hóa kép tốc độ tải và độ sắc nét |
| **Dung lượng file** | MP4: ~4.48 MB \| WebM: ~1.35 MB | Nhẹ nhàng, tải nhanh, không giật hình |

---

## 2. DIỄN BIẾN HÀNH ĐỘNG & CHUYỂN ĐỘNG CAMERA (SHOT ACTION & CAMERA)

- **Hành động UAV & Địa hình:** UAV hoàn tất ca bay và lướt dần ra khỏi mép trên-phải; địa hình bãi chôn lấp hợp vệ sinh chiếm lĩnh toàn bộ khung hình dưới góc nhìn trực giao thẳng đứng $90^\circ$ Nadir.
- **Chuyển động Camera:** Tiếp nối chuyển động chúc đầu (*tilt-down*) từ Shot 02, đạt góc nhìn trực giao hoàn hảo, đồng thời camera thực hiện cú đẩy nhẹ (*push-in*) tiến dần vào phân khu ô chôn lấp trọng điểm.
- **Trạng thái Overlay:**
  - Lưới vệt bay khảo sát Data Teal (`#2FA98C`) phủ kín phân khu.
  - Lớp đường đồng mức $\text{CH}_4$ bán trong suốt ($35\%$ opacity) mở dần từ Soft Mint sang Data Teal bám sát bờ đê và màng HDPE.
  - Xuất hiện 4 điểm hotspot màu Measurement Amber (`#D7A93E`) định vị chính xác vị trí rò rỉ khí.

---

## 3. TIẾP NỐI QUANG HỌC SANG SHOT 04 (BASELINE → CONFIRMATION)

- **Neo cuối (Last Frame Anchor):** Khung hình cuối của Shot 03 tiến đến và **khóa cứng $100\%$ từng pixel** vào ảnh kỳ nền Step 06 ([baseline_reference_master.jpg](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/images/baseline_reference_master.jpg)).
- **Khóa vị trí Hotspot:** 4 điểm hotspot amber được giữ nguyên vị trí màn hình tuyệt đối để Shot 04 có thể thực hiện màn chuyển đổi thời gian Before/After tĩnh tại hoàn toàn không bị rung giật.
