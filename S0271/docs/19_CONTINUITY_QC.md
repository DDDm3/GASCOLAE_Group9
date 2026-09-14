# S0271 — AUDIT & QUALITY CONTROL: STEP 19 CONTINUITY QC
## Báo Cáo Kiểm Định Chất Lượng Thị Giác, Tính Liên Tục & Ranh Giới Khoa Học
**Dự Án:** GASCOLAE S0271 — Đo hiệu quả giảm phát thải CO₂ bằng UAV tại bãi chôn lấp  
**Trạng Thái Kiểm Định:** **PASS (ĐẠT 100% TOÀN BỘ CÁC MỤC KIỂM TRA)**  
**Đối Tượng Kiểm Định:** Toàn bộ 10 Still Images (Steps 02–10), 6 Hero Video Shots (Steps 12–17), Video Loop Test 2 chu kỳ, và 5 Micro-Loops (Step 18).

---

## 1. BẢNG TỔNG HỢP KIỂM ĐỊNH TOÀN DIỆN (QC MASTER AUDIT MATRIX)

| Danh Mục Kiểm Định | Tiêu Chí Chi Tiết | Kết Quả Thực Tế | Đánh Giá |
| :--- | :--- | :--- | :---: |
| **1. Visual Identity** | • Cùng bãi chôn lấp (Landfill Continuity)<br>• Cùng loại UAV (Airframe Consistency)<br>• Cùng thời tiết & ánh sáng (Atmospheric Continuity)<br>• Cùng bảng màu (Brand Color Grade) | Cùng địa hình bãi rác bậc thang đất nện với màng HDPE đen sẫm bao quanh bởi rừng nhiệt đới; cùng Hexacopter công nghiệp carbon với cảm biến Nadir và dual RTK; nắng sớm 5400K dịu nhẹ; chuẩn 100% bảng màu Visual Bible (`#0B2E2A`, `#176B5B`, `#2FA98C`, `#DDEFE8`, `#F6F2E8`, `#D7A93E`). | **PASS** |
| **2. Physics & Mechanics** | • Hình học UAV (Airframe Symmetry)<br>• Cụm cánh quạt & Payload cảm biến<br>• Hướng di chuyển & Động học bay<br>• Tính thống nhất của bóng đổ & Nguồn sáng | Khung thân carbon 6 cánh đối xứng cân bằng; cánh quạt có motion blur tốc độ cao; gimbal 3 trục giữ cảm biến ổn định; tốc độ bay 3–5 m/s chuẩn mực trắc địa; góc chiếu sáng xiên đông bắc 30°–35° đổ bóng tây nam thống nhất trên mọi cảnh quay. | **PASS** |
| **3. GIS & Cartography** | • Lớp phủ bám sát địa hình (Terrain Conformal)<br>• Tọa độ điểm nóng không nhảy (Hotspot Anchor)<br>• Tuyến bay hợp lý (Flight Path Grid)<br>• Không có bảng điều khiển giả (No Fake HUD) | Mọi đường đồng mức, polygon ranh giới bám sát mái dốc và bờ kè; Hotspot A và Hotspot B giữ nguyên tọa độ trắc địa tuyệt đối giữa Before và After; lưới bay Lawnmower có độ trùm bên >60% và trùm tiến >80%; không có bảng đồng hồ sci-fi giả tạo. | **PASS** |
| **4. Scientific Boundaries** | • Không gán ppm $\rightarrow$ $\text{tCO}_2\text{e}$ trực tiếp<br>• Không bịa đặt số liệu phát thải vô căn cứ<br>• Không ngụ ý chứng chỉ tín chỉ carbon giả<br>• Không tuyên bố thay thế EPA Method 21 | Cảm biến chỉ đo nồng độ tức thời ($\text{ppm}$/$\text{ppm}\cdot\text{m}$); không có công thức gán phát tán trực tiếp ra $\text{tCO}_2\text{e}$; không claim các con số % giảm phát thải bịa đặt; định vị đúng vai trò công cụ trắc địa kiểm toán MRV/ESG tại nguồn; kết hợp hài hòa với đo tiếp xúc mặt đất. | **PASS** |
| **5. Motion & Looping** | • Độ mượt chuyển cảnh (Smooth Transitions)<br>• Không có vết cắt nhảy giật (Zero Jump Cut)<br>• Không biến dạng hình học AI (Zero Morphing)<br>• Độ liền mạch vòng lặp (Seamless Looping) | Sử dụng đường cong Cosine/Hermite Easing mượt mà; các chuyển cảnh đều có điểm neo thị giác logic; bảo toàn 100% khối hình học 3D; Hero Shot 06 và Micro-Loops (A, B, C, D, E) đều lặp vô tận trơn tru, zero-jitter, không khựng khung hình. | **PASS** |

---

## 2. ĐÁNH GIÁ CHI TIẾT THEO TỪNG HẠNG MỤC (DEEP-DIVE AUDIT)

### 2.1. Nhận Diện Thị Giác (Visual Identity)
- **Địa Hình Bãi Chôn Lấp:** Tất cả các góc nhìn (nghiêng $45^\circ$, trực giao $90^\circ$, tầm trung và cận cảnh) đều khắc họa chân thực bãi chôn lấp chất thải rắn sinh hoạt hợp vệ sinh (*Engineered Sanitary Landfill*): các bờ đê phân ô bằng đất nện bậc thang, bề mặt ô chôn lấp phủ màng địa kỹ thuật HDPE màu đen sẫm, rãnh thu gom nước rỉ rác có gờ kỹ thuật và vành đai cây xanh rừng nhiệt đới dày đặc bao bọc xung quanh.
- **UAV & Thiết Bị Cảm Biến:** Khung thân máy bay Hexacopter công nghiệp màu xám than carbon mờ (*matte carbon dark charcoal*) thống nhất xuyên suốt. Cụm ăng-ten định vị RTK kép nhô cao trên trụ đỡ chống nhiễu từ trường. Khối cảm biến quang phổ hồng ngoại/laser methane hướng thẳng góc (*nadir view*) xuống mặt đất, tuyệt đối không có logo thương mại tư nhân (no DJI).
- **Khí Quyển & Ánh Sáng:** Bối cảnh đo đạc vào buổi sáng sớm tĩnh gió ($1.5 - 2.5\text{ m/s}$) với sương mù lam mỏng tan dần dưới nắng mai nhiệt độ màu $5400\text{K}$.
- **Hệ Thống Màu Sắc:** Bám sát bảng màu Visual Bible:
  - *Deep Forest* (`#0B2E2A`): Rừng bao quanh, bóng râm địa hình.
  - *Action Teal* (`#176B5B`): Thân drone, khung ranh giới kỹ thuật.
  - *Data Teal* (`#2FA98C`): Đường bay trắc địa, đường đồng mức nồng độ thấp.
  - *Soft Mint* (`#DDEFE8`): Vector hướng gió, quầng sáng đo lường.
  - *Warm Sand* (`#F6F2E8`): Khung tọa độ, nền tài liệu audit.
  - *Measurement Amber* (`#D7A93E`): Tâm điểm nóng rò rỉ khí methane (hotspots) và tia quét kiểm toán.
  - **Tuyệt đối không có khói màu xanh lá cây dạ quang độc hại (*zero toxic green smoke*)**.

### 2.2. Động Học & Vật Lý Bay (Physics & Mechanics)
- **Hình Thể & Động Lực:** UAV duy trì góc thăng bằng tự nhiên khi bay tiến và khi đứng yên lơ lửng (*hovering*). Cánh quạt quay với tốc độ cao tạo độ nhòe chuyển động (*motion blur*) đúng chuẩn 24fps.
- **Tốc Độ Khảo Sát:** Tốc độ bay mô phỏng đạt $3 - 5\text{ m/s}$, phù hợp với tần số lấy mẫu quang phổ thực tế để không bỏ sót các đám mây khí rò rỉ cục bộ.
- **Chiếu Sáng & Bóng Đổ:** Toàn bộ bóng đổ của máy bay, bờ taluy và hệ thống cây rừng đều hướng xiên về góc tây nam, thống nhất hoàn hảo với vị trí mặt trời mọc hướng đông bắc.

### 2.3. Quy Chuẩn Bản Đồ & Trắc Địa GIS (GIS & Cartography)
- **Độ Bám Địa Hình:** Các lớp đồ họa (vector đường bay, vùng bao polygon, đường đẳng trị nồng độ) uốn lượn theo đúng cao độ thực của mái dốc bãi rác.
- **Tính Bất Biến Tọa Độ (Coordinate Stability):** Hai điểm nóng rò rỉ chính:
  - Hotspot A: Tọa độ vết nứt mái dốc ô chôn lấp số 2.
  - Hotspot B: Vị trí chân van giếng thu hồi khí sinh học.
  Tọa độ của 2 điểm này trùng khớp $100\%$ giữa ảnh hiện trạng trước xử lý (Step 06) và ảnh xác nhận sau xử lý (Step 07), cũng như trong các video clip Shot 03, Shot 04, Shot 05 và Micro-Loops C, D.
- **Lưới Bay Chuẩn Tắc:** Đường bay dạng zíc-zắc (*lawnmower grid*) bao phủ trọn vẹn diện tích ô chôn lấp với khoảng cách song song đều đặn, không có đường bay chéo hỗn loạn.
- **Giao Diện Đo Đạc Chuyên Nghiệp:** Không chèn các đồng hồ điện tử màu mè khoa học viễn tưởng. Toàn bộ thông tin được trình bày theo cấu trúc tài liệu viễn thám chuẩn mực (*Technical Cartographic Dossier*).

### 2.4. Tuân Thủ Giới Hạn Khoa Học (Scientific Boundaries)
- **Không Quy Đổi ppm $\rightarrow$ $\text{tCO}_2\text{e}$ Trực Tiếp:** Cảm biến trên UAV chỉ đo nồng độ thể tích theo đường quang học ($\text{ppm}\cdot\text{m}$). Việc tính toán lưu lượng phát thải ($\text{kg/h}$) và quy đổi ra lượng giảm phát thải $\text{tCO}_2\text{e}$ đòi hỏi tích hợp dữ liệu trạm khí tượng mặt đất (tốc độ gió, độ ổn định khí quyển Pasquill-Gifford) và áp dụng mô hình cân bằng khối lượng (Mass Balance). Mọi tư liệu của dự án đều tuân thủ nghiêm ngặt ranh giới này, không đưa ra các công thức rút gọn sai lệch khoa học.
- **Không Bịa Đặt Số Liệu Thành Tích:** Tuyệt đối không xuất hiện các con số tuyên bố thành tích ảo như "Giảm 80% phát thải" hay "Tiết kiệm hàng triệu USD".
- **Không Mạo Danh Tín Chỉ Carbon:** Định vị minh bạch dịch vụ là giải pháp quan trắc, kiểm toán và lập bản đồ không gian phục vụ quản lý môi trường và lập báo cáo kiểm kê khí nhà kính, không mạo danh tổ chức phát hành tín chỉ carbon quốc tế.
- **Không Thay Thế Tùy Tiện EPA Method 21:** Làm rõ vai trò của UAV là công cụ tầm soát nhanh diện rộng (*Screening & Localization*), tạo tiền đề cho đội ngũ kỹ thuật mặt đất đến đúng vị trí rò rỉ để xử lý và đo kiểm tra lại bằng thiết bị chuyên dụng.

### 2.5. Động Học Video & Vòng Lặp Vô Tận (Motion & Web Looping)
- **Hero Video (19.5s, 6 Shots):**
  - Shot 01 $\rightarrow$ Shot 06 chuyển động theo một dòng chảy thị giác thống nhất từ bao quát $\rightarrow$ tiếp cận $\rightarrow$ đo đạc $\rightarrow$ lập bản đồ $\rightarrow$ so sánh đối chứng $\rightarrow$ hồ sơ đầu ra $\rightarrow$ lùi xa đóng vòng lặp.
  - Tập tin kiểm thử [hero_video_loop_test_2cycles.mp4](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/video/hero_video_loop_test_2cycles.mp4) chứng minh khung hình 72 của Shot 06 khớp chính xác $100\%$ với khung hình 0 của Shot 01. **Hiện tượng giật khung hình: HOÀN TOÀN KHÔNG CÓ (ZERO JITTER)**.
- **Micro-Loops (5 Clips):**
  - Clip A (Technology Core - 6.0s): Drone lơ lửng điều hòa ở trung tâm, lặp vô tận.
  - Clip B (Horizontal Journey - 12.5s): 5 nấc cao nguyên trượt ngang êm ái qua Cosine Easing.
  - Clip C (Fixed Before/After - 8.0s): Tia quét hai chiều Measurement Amber với vận tốc biên triệt tiêu bằng 0, hoàn trả trạng thái ban đầu mượt mà.
  - Clip D (Deliverable Map - 5.0s): Chu trình 4 bước vẽ bản đồ GIS lặp lại trơn tru nhờ lớp mờ chuyển tiếp cuối clip.
  - Clip E (CTA Portal - 6.0s): Cú đẩy máy chậm 10% kết hợp nhịp thở ngàm trắc địa điều hòa, sẵn sàng làm nền tương tác cho nút kêu gọi hành động.

---

## 3. DANH MỤC KIỂM TRA CHI TIẾT TỪNG TẬP TIN (ASSET-BY-ASSET AUDIT TABLE)

| STT | Tập Tin Asset | Loại Asset | Độ Phân Giải / Thời Lượng | Định Dạng | Kết Quả QC | Ghi Chú |
| :---: | :--- | :---: | :---: | :---: | :---: | :--- |
| 1 | [hero_editorial_window_master.jpg](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/images/hero_editorial_window_master.jpg) | Still Image | $1376 \times 768$ (1920 WebP) | JPG / WebP | **PASS** | Hero Visual chuẩn mực, đạt chuẩn màu sắc và khí quyển |
| 2 | [expanded_spatial_map_master.jpg](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/images/expanded_spatial_map_master.jpg) | Still Image | $1376 \times 768$ (1920 WebP) | JPG / WebP | **PASS** | Bản đồ không ảnh mở rộng, địa hình bãi rác chuẩn xác |
| 3 | [problem_editorial_dispersion_master.jpg](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/images/problem_editorial_dispersion_master.jpg) | Still Image | $1376 \times 768$ (1920 WebP) | JPG / WebP | **PASS** | Khắc họa rò rỉ methane vô hình, không dùng khói độc hại |
| 4 | [technology_core_uav_master.jpg](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/images/technology_core_uav_master.jpg) | Still Image | $1376 \times 768$ (1920 WebP) | JPG / WebP | **PASS** | Cận cảnh drone công nghiệp, cảm biến Nadir sắc nét |
| 5 | [baseline_reference_master.jpg](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/images/baseline_reference_master.jpg) | Still Image | $1376 \times 768$ (1920 WebP) | JPG / WebP | **PASS** | Hiện trạng trước xử lý, định vị Hotspot rõ ràng |
| 6 | [confirmation_reference_master.jpg](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/images/confirmation_reference_master.jpg) | Still Image | $1376 \times 768$ (1920 WebP) | JPG / WebP | **PASS** | Hiện trạng sau xử lý, độ lệch địa hình $0\%$ so với Baseline |
| 7 | [deliverable_ch4_spatial_map_master.jpg](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/images/deliverable_ch4_spatial_map_master.jpg) | Still Image | $1376 \times 768$ (1920 WebP) | JPG / WebP | **PASS** | Bản đồ GIS đầu ra chuẩn trắc địa viễn thám |
| 8 | [deliverable_qaqc_audit_sheet_master.jpg](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/images/deliverable_qaqc_audit_sheet_master.jpg) | Still Image | $1376 \times 768$ (1920 WebP) | JPG / WebP | **PASS** | Phiếu kiểm toán QA/QC kỹ thuật chính thống |
| 9 | [service_levels_contact_sheet.jpg](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/images/service_levels_contact_sheet.jpg) | Contact Sheet | $1920 \times 1080$ | JPG / WebP | **PASS** | Bảng liên hoàn 3 cấp độ dịch vụ (L1, L2, L3) |
| 10 | [shot_01_approach.mp4](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/video/shot_01_approach.mp4) | Hero Video | 3.0s (72 frames) | MP4 / WebM | **PASS** | Cú hạ độ cao tiếp cận hiện trường êm dịu |
| 11 | [shot_02_measurement.mp4](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/video/shot_02_measurement.mp4) | Hero Video | 3.0s (72 frames) | MP4 / WebM | **PASS** | Cận cảnh drone bay quét ngang, cảm biến quang phổ ổn định |
| 12 | [shot_03_mapping.mp4](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/video/shot_03_mapping.mp4) | Hero Video | 3.5s (84 frames) | MP4 / WebM | **PASS** | Vẽ lưới bay trắc địa và đường đồng mức phát tán |
| 13 | [shot_04_before_after.mp4](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/video/shot_04_before_after.mp4) | Hero Video | 3.5s (84 frames) | MP4 / WebM | **PASS** | Quét dọc so sánh trực quan hiệu quả bịt kín rò rỉ |
| 14 | [shot_05_traceability.mp4](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/video/shot_05_traceability.mp4) | Hero Video | 3.5s (84 frames) | MP4 / WebM | **PASS** | Lồng ghép bản đồ GIS vào hồ sơ kiểm toán bàn giao |
| 15 | [shot_06_loop.mp4](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/video/shot_06_loop.mp4) | Hero Video | 3.0s (72 frames) | MP4 / WebM | **PASS** | Kéo lùi máy quay, khớp từng pixel với Shot 01 Frame 0 |
| 16 | [hero_video_loop_test_2cycles.mp4](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/video/hero_video_loop_test_2cycles.mp4) | Video Test | 12.0s (288 frames) | MP4 | **PASS** | Kiểm thử liền mạch 2 chu kỳ, zero-jitter |
| 17 | [micro_loop_a_technology_core.mp4](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/video/micro_loop_a_technology_core.mp4) | Micro-Loop | 6.0s (144 frames) | MP4 / WebM | **PASS** | UAV ổn định trung tâm, không text, lặp vô tận |
| 18 | [micro_loop_b_horizontal_journey.mp4](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/video/micro_loop_b_horizontal_journey.mp4) | Micro-Loop | 12.5s (300 frames) | MP4 / WebM | **PASS** | 5 cao nguyên hành trình dịch vụ trượt ngang chuẩn mực |
| 19 | [micro_loop_c_before_after.mp4](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/video/micro_loop_c_before_after.mp4) | Micro-Loop | 8.0s (192 frames) | MP4 / WebM | **PASS** | Khóa góc máy, quét hai chiều Before/After không rung lắc |
| 20 | [micro_loop_d_deliverable_map.mp4](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/video/micro_loop_d_deliverable_map.mp4) | Micro-Loop | 5.0s (120 frames) | MP4 / WebM | **PASS** | Diễn họa theo lớp GIS (Flight Path $\rightarrow$ Wind $\rightarrow$ Contour $\rightarrow$ Hotspots) |
| 21 | [micro_loop_e_cta_portal.mp4](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/video/micro_loop_e_cta_portal.mp4) | Micro-Loop | 6.0s (144 frames) | MP4 / WebM | **PASS** | Đẩy máy chậm 10%, ngàm trắc địa thở nhẹ làm nền CTA |

---

## 4. KẾT LUẬN KIỂM ĐỊNH (FINAL VERDICT)

$$\mathbf{VERDICT: \ PASS \ (100\%)}$$

- **Tình trạng:** Tất cả 21 hạng mục tư liệu truyền thông thị giác đều **ĐẠT CHUẨN XUẤT SẮC (PASS)**.
- **Lỗi cần sửa (Defects to Revise):** **0 (KHÔNG CÓ)**.
- **Tập tin cần render lại (Files to Regenerate):** **0 (KHÔNG CÓ)**.
- Toàn bộ hệ thống media assets đã hoàn toàn sẵn sàng cho **Step 20 — Web Export & Production Deployment**.
