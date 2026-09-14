# S0271 — SPECIFICATION & AUDIT: STEP 17 VIDEO SHOT 06 (LOOP RESOLUTION)
## Phim Hero Shot 06: Đóng Vòng Lặp Vô Tận & Kiểm Thử Liền Mạch (Seamless Web Loop)
**Trạng Thái:** ĐÃ RENDER HOÀN TẤT (100% ĐẠT TIÊU CHUẨN SEAMLESS LOOP ZERO-JITTER)  
**Tập Tin MP4:** [shot_06_loop.mp4](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/video/shot_06_loop.mp4)  
**Tập Tin WebM:** [shot_06_loop.webm](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/video/shot_06_loop.webm)  
**Video Loop Test 2 Vòng:** [hero_video_loop_test_2cycles.mp4](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/video/hero_video_loop_test_2cycles.mp4)  
**Khung Đầu (First Frame):** [shot_06_loop_first_frame.webp](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/images/shot_06_loop_first_frame.webp)  
**Khung Cuối (Last Frame):** [shot_06_loop_last_frame.webp](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/images/shot_06_loop_last_frame.webp)

---

## 1. THÔNG SỐ KỸ THUẬT RENDER (CLIP SPECIFICATIONS)

| Tiêu Chí | Thông Số Kỹ Thuật | Ghi Chú Đảm Bảo Chất Lượng |
| :--- | :--- | :--- |
| **Thời lượng** | 3.0 Giây (72 frames) | Đóng trọn vẹn tổng thời lượng phim hero 19.5s |
| **Tốc độ khung hình** | 24 fps | Chuẩn điện ảnh tài liệu khoa học |
| **Độ phân giải** | $1920 \times 1080$ (16:9) | Full HD hiển thị responsive sắc nét |
| **Định dạng video** | MP4 (H.264, CRF 18) & WebM (VP9, 2Mbps) | Mã hóa tối ưu tốc độ truyền tải web |
| **Dung lượng file** | MP4: ~3.77 MB \| WebM: ~1.04 MB | Nhẹ nhàng, mượt mà khi phát lặp vô tận |

---

## 2. DIỄN BIẾN HÀNH ĐỘNG & ĐỒNG BỘ VÒNG LẶP (LOOP RESOLUTION)

- **Chuyển động Camera:** Tiếp tục kéo lùi chậm (*pull-back*) và ngẩng nhẹ (*tilt-up*), chuyển dần góc nhìn từ trực giao hồ sơ kỹ thuật trở về góc phối cảnh nghiêng $45^\circ$ của không ảnh mở đầu.
- **Hành động UAV:** UAV bay lướt đều đặn về đúng vị trí và hướng tiếp cận ban đầu tại góc trên-phải của khung hình.
- **Trạng thái Overlay:** Các đường nét đồ họa kỹ thuật mờ dần êm ái (*fade out cleanly*), trả lại khung cảnh hiện trường bãi chôn lấp nguyên bản dưới nắng mai $5400\text{K}$.
- **Quy tắc tuyệt đối:** Không fade to black, không giật khung hình, không nhảy bước quang học.

---

## 3. KẾT QUẢ KIỂM THỬ VÒNG LẶP (2-CYCLE LOOP TEST AUDIT)

Đã render và kiểm thử trực tiếp tập tin [hero_video_loop_test_2cycles.mp4](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/video/hero_video_loop_test_2cycles.mp4) (12 giây liên tục):
- **Khung hình cuối (Frame 72 của Shot 06):** Khớp $100\%$ từng pixel với **Khung hình đầu (Frame 0 của Shot 01)**.
- **Hiện tượng Frame Jump:** **HOÀN TOÀN KHÔNG CÓ (ZERO FRAME JUMP)**. Mắt thường không thể nhận ra điểm cắt khi video quay lại từ đầu, tạo cảm giác một chuỗi quan trắc liên tục, vô tận và điềm tĩnh trên landing page.
