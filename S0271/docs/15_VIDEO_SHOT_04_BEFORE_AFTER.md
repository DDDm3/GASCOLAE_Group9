# S0271 — SPECIFICATION & AUDIT: STEP 15 VIDEO SHOT 04 (BASELINE → CONFIRMATION)
## Phim Hero Shot 04: Đo Lặp Hai Kỳ Khảo Sát & Lượng Hóa Thay Đổi Sau Khắc Phục
**Trạng Thái:** ĐÃ RENDER HOÀN TẤT (100% ĐẠT TIÊU CHUẨN KHÓA CỨNG CAMERA ZERO-JITTER)  
**Tập Tin MP4:** [shot_04_before_after.mp4](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/video/shot_04_before_after.mp4)  
**Tập Tin WebM:** [shot_04_before_after.webm](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/video/shot_04_before_after.webm)  
**Khung Đầu (First Frame - Baseline):** [shot_04_before_after_first_frame.webp](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/images/shot_04_before_after_first_frame.webp)  
**Khung Cuối (Last Frame - Confirmation):** [shot_04_before_after_last_frame.webp](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/images/shot_04_before_after_last_frame.webp)

---

## 1. THÔNG SỐ KỸ THUẬT RENDER (CLIP SPECIFICATIONS)

| Tiêu Chí | Thông Số Kỹ Thuật | Ghi Chú Đảm Bảo Chất Lượng |
| :--- | :--- | :--- |
| **Thời lượng** | 3.5 Giây (84 frames) | Khớp chuẩn kịch bản phân cảnh Step 11 |
| **Tốc độ khung hình** | 24 fps | Chuẩn mượt mà điện ảnh tài liệu khoa học |
| **Độ phân giải** | $1920 \times 1080$ (16:9) | Full HD tối ưu hóa hiển thị responsive |
| **Định dạng video** | MP4 (H.264, CRF 18) & WebM (VP9, 2Mbps) | Tối ưu hóa kép dung lượng siêu gọn |
| **Dung lượng file** | MP4: ~1.21 MB \| WebM: ~708 KB | Tải trang tức thì, không giật hình |

---

## 2. DIỄN BIẾN HÀNH ĐỘNG & CHUYỂN ĐỘNG CAMERA (LOCKED CAMERA WITH TIME SWEEP)

- **Camera:** **LOCKED HOÀN TOÀN ($100\%$ không di chuyển, không rung lắc)**, bảo đảm độ tĩnh tại để mắt người xem tập trung duy nhất vào sự biến chuyển của dữ liệu phát thải.
- **Tiến trình thời gian:**
  - **$0.0\text{s} - 1.0\text{s}$ (Frames 0–24):** Giữ nguyên trạng thái Kỳ nền (*Baseline — Step 06*) với 4 điểm hotspot màu hổ phách (`#D7A93E`) và quầng phát tán rộng.
  - **$1.0\text{s} - 2.5\text{s}$ (Frames 24–60):** Vạch quét thời gian Data Teal lướt nhẹ nhàng từ trái qua phải với biên mềm (*feathered transition line*): 3 hotspot B, C, D triệt tiêu hoàn toàn, hotspot A co nhỏ lại thành vòng Soft Mint mờ nhạt.
  - **$2.5\text{s} - 3.5\text{s}$ (Frames 60–84):** Giữ nguyên trạng thái Kỳ xác nhận (*Confirmation — Step 07*), minh chứng kết quả khắc phục đã được kiểm định.
- **Tính khoa học minh bạch:** Không chèn số % giảm tùy tiện, không gắn số $\text{tCO}_2\text{e}$ chưa qua thẩm định.

---

## 3. TIẾP NỐI QUANG HỌC SANG SHOT 05 (TRACEABILITY)

- Khung hình cuối của Shot 04 khớp $100\%$ với ảnh Confirmation Step 07, tạo điểm tựa ổn định để camera bắt đầu kéo lùi tầm nhìn (*pull-back*) mở rộng ra toàn cảnh hồ sơ bằng chứng trong Shot 05.
