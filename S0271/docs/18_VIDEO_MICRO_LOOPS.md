# S0271 — SPECIFICATION & AUDIT: STEP 18 VIDEO MICRO LOOPS
## Bộ 5 Video Vòng Lặp Vi Mô (Micro-Loops) Phục Vụ Giao Diện Web GASCOLAE
**Trạng Thái:** ĐÃ HOÀN TẤT & KIỂM ĐỊNH TỪNG CLIP (100% ĐẠT CHUẨN SEAMLESS LOOP & CHROMATIC CONTINUITY)  
**Tiêu Chuẩn Mã Hóa:** Dual MP4 (H.264 High Profile, CRF 18) + WebM (VP9, CRF 24, 2Mbps), Full HD 1080p @ 24fps.

---

## 1. TỔNG QUAN HỆ THỐNG MICRO-LOOPS (OVERVIEW)

Các video vòng lặp vi mô (micro-loops) là các đoạn phim ngắn độc lập, không lời thoại, không nhúng văn bản giả định, lặp lại vô tận một cách liền mạch tuyệt đối (*seamless zero-jitter looping*). Chúng được thiết kế để nhúng trực tiếp vào các module chức năng trên trang đích (Landing Page) dịch vụ S0271:
- **Hero / Header:** Tôn vinh UAV đo đạc và thiết bị cảm biến quang phổ.
- **Customer Journey / How It Works:** Diễn họa trực quan hành trình 5 nấc kiểm toán khí thải.
- **Comparative Slider / Proof:** So sánh trực diện hiện trạng trước và sau khi xử lý rò rỉ bãi rác.
- **Deliverables / Output:** Mô phỏng sinh động từng lớp dữ liệu hình thành nên bản đồ GIS.
- **Call-To-Action (CTA):** Cửa sổ mời gọi nhà quản lý bãi rác trải nghiệm dịch vụ.

---

## 2. BẢNG THÔNG SỐ KỸ THUẬT 5 MICRO-LOOPS (ASSET MATRIX)

| Clip | Tên Đoạn Phim | Thời Lượng | Số Khung | File MP4 | File WebM | Vị Trí Nhúng Đề Xuất |
| :--- | :--- | :---: | :---: | :--- | :--- | :--- |
| **A** | **Technology Core** | 6.0 Giây | 144 | [micro_loop_a_technology_core.mp4](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/video/micro_loop_a_technology_core.mp4) (2.42 MB) | [micro_loop_a_technology_core.webm](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/video/micro_loop_a_technology_core.webm) (731 KB) | Section Technology / Hardware Core Specs |
| **B** | **Horizontal Journey** | 12.5 Giây | 300 | [micro_loop_b_horizontal_journey.mp4](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/video/micro_loop_b_horizontal_journey.mp4) (12.57 MB) | [micro_loop_b_horizontal_journey.webm](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/video/micro_loop_b_horizontal_journey.webm) (3.90 MB) | Section Quy trình 5 bước / Customer Flow |
| **C** | **Fixed Before/After** | 8.0 Giây | 192 | [micro_loop_c_before_after.mp4](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/video/micro_loop_c_before_after.mp4) (1.90 MB) | [micro_loop_c_before_after.webm](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/video/micro_loop_c_before_after.webm) (2.14 MB) | Section Hiệu quả thực tế / Verification Proof |
| **D** | **Deliverable Map** | 5.0 Giây | 120 | [micro_loop_d_deliverable_map.mp4](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/video/micro_loop_d_deliverable_map.mp4) (754 KB) | [micro_loop_d_deliverable_map.webm](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/video/micro_loop_d_deliverable_map.webm) (757 KB) | Section Hồ sơ bàn giao GIS / Deliverables |
| **E** | **CTA Portal** | 6.0 Giây | 144 | [micro_loop_e_cta_portal.mp4](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/video/micro_loop_e_cta_portal.mp4) (4.81 MB) | [micro_loop_e_cta_portal.webm](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/video/micro_loop_e_cta_portal.webm) (1.76 MB) | Section Kêu gọi hành động (Bottom CTA Form) |

---

## 3. CHI TIẾT KỸ THUẬT TỪNG CLIP (IN-DEPTH BREAKDOWN)

### 3.1. Clip A — Technology Core (6.0s, 144 Frames)
- **Hình ảnh trọng tâm:** Drone công nghiệp 6 cánh đối xứng cân bằng hoàn hảo, cảm biến quang phổ hướng Nadir nhìn xuống mặt đất, ăng-ten GNSS RTK kép nhô cao ổn định.
- **Chuyển động:** Camera bay lơ lửng ổn định (*stable hovering*), góc máy chính diện (*center-friendly*), không chao đảo, không giật lắc cơ học.
- **Nguyên tắc:** 100% không chèn văn bản hoặc số liệu ảo. Video kết thúc bằng việc hoàn trả chính xác tọa độ gốc của khung hình 0, đảm bảo vòng lặp vĩnh cửu mượt mà.

### 3.2. Clip B — Horizontal Journey (12.5s, 300 Frames)
- **Ý tưởng chủ đạo:** Trực quan hóa hành trình dịch vụ qua 5 cao nguyên (*5 plateaus*):
  1. `DETECT`: Phát hiện vùng phát tán $\text{CH}_4$ bất thường qua không ảnh quang phổ.
  2. `LOCATE`: Định vị tọa độ ô rác rò rỉ chính xác bằng lưới trắc địa RTK.
  3. `QUANTIFY (conditionally)`: Khảo sát đo nồng độ và lập hồ sơ nền phát thải (*baseline*).
  4. `VERIFY`: Khảo sát tái kiểm tra sau khi đơn vị vận hành bãi rác xử lý phủ đất / hàn màng HDPE.
  5. `REPORT`: Xuất bản đồ GIS đầu ra và bộ tài liệu kiểm toán hoàn chỉnh.
- **Cấu trúc nhịp điệu:** Mỗi nấc dừng lại 1.5 giây để mắt người nắm bắt dữ liệu hiện trường, sau đó trượt ngang nhẹ nhàng 1.0 giây với đường cong Cosine Easing để chuyển giao sang nấc tiếp theo.

### 3.3. Clip C — Fixed Before/After (8.0s, 192 Frames)
- **Góc máy:** Khóa cố định góc máy viễn thám $100\%$ (*locked camera*), sử dụng 2 hình ảnh đối chứng Step 06 (`baseline_reference_master.jpg`) và Step 07 (`confirmation_reference_master.jpg`) có độ lệch địa hình $0\%$.
- **Cơ chế quét:**
  - `0.0s – 1.5s`: Giữ nguyên trạng thái Trước (*Before - Baseline* rò rỉ khí).
  - `1.5s – 3.5s`: Tia quét trắc địa màu Vàng Hổ Phách Đo Đạc (`#D7A93E`) có quầng sáng quét từ trái qua phải, vén màn trạng thái Sau (*After - Confirmation* đã xử lý kín).
  - `3.5s – 5.0s`: Giữ ổn định trạng thái Sau để khách hàng cảm nhận sự an toàn của bãi rác.
  - `5.0s – 7.0s`: Tia quét quay ngược từ phải sang trái, mượt mà chuyển về trạng thái ban đầu.
  - `7.0s – 8.0s`: Trả về trạng thái khung 0, đóng kín vòng lặp hai chiều (*bidirectional ping-pong loop*).

### 3.4. Clip D — Deliverable Map (5.0s, 120 Frames)
- **Cơ chế hoạt họa theo lớp (Layered GIS Synthesis):**
  - `0.0s – 1.3s (Flight Path):` Vẽ vết bay khảo sát zíc-zắc dạng Lawnmower màu Data Teal (`#2FA98C`) với điểm sáng dẫn đầu.
  - `1.3s – 2.4s (Wind Vectors):` Hiển thị các mũi tên vector gió màu Soft Mint (`#DDEFE8`) phản ánh hướng gió hiện trường tại thời điểm bay.
  - `2.4s – 3.7s (Isoline Contours):` Lan tỏa 3 tầng đường đồng mức nồng độ methane bám sát gờ đê và bề mặt ô chôn lấp.
  - `3.7s – 4.8s (Hotspots):` Kích hoạt vòng tròn xung nhịp mục tiêu màu Measurement Amber (`#D7A93E`) định vị chính xác vị trí rò rỉ.
  - `4.8s – 5.0s (Reset Loop):` Làm mờ nhẹ nhàng các lớp overlay để lặp lại chu trình vẽ bản đồ mà không tạo cảm giác đứt đoạn.

### 3.5. Clip E — CTA Portal (6.0s, 144 Frames)
- **Cơ chế máy quay:** Chuyển động đẩy vào chậm (*slow cinematic push-in*) 10% hướng trực diện vào tâm ô chôn lấp rác đang được khảo sát.
- **Yếu tố tương tác:** 4 ngàm trắc địa (*corner survey brackets*) màu Soft Mint cùng tâm ngắm dấu cộng mảnh màu Measurement Amber thở nhẹ (*breathing reticle*), tạo cảm giác người xem đang nhìn qua một kính ngắm viễn thám kỹ thuật số cao cấp.
- **Đóng vòng lặp:** Sử dụng hàm điều hòa Harmonic Cosine để tốc độ tiến và lùi triệt tiêu bằng 0 tại 2 đầu chu kỳ, cho phép lặp liên tục trơn tru làm nền cho khối nút bấm CTA.

---

## 4. TỔNG KẾT BẢO ĐẢM KỸ THUẬT (ASSURANCE OF COMPLIANCE)
- [x] Mỗi clip đều được render riêng biệt và kiểm định chất lượng độc lập.
- [x] Đầy đủ 2 định dạng MP4 và WebM cho từng clip, sẵn sàng triển khai trên thẻ `<video>` HTML5 với thuộc tính `autoplay loop muted playsinline`.
- [x] Tuyệt đối không có số liệu bịa đặt, không chữ nhảm khoa học viễn tưởng, không khói màu độc hại.
- [x] Màu sắc và nhận diện bám sát $100\%$ Visual Bible: Deep Forest, Action Teal, Data Teal, Soft Mint, Warm Sand, Measurement Amber.
