# S0271 — MASTER VIDEO STORYBOARD SPECIFICATION
## Phim Hero: FROM METHANE SIGNAL TO TRACEABLE EVIDENCE
**Trạng Thái:** ĐÃ PHÊ DUYỆT (CHƯA RENDER VIDEO — KHÓA KỊCH BẢN KỸ THUẬT)  
**Thời Lượng Tổng:** 19.5 Giây (Chuẩn Web Loop 24fps = 468 Frames)  
**Ý Tưởng Cốt Lõi:** Chuỗi chuyển đổi liên tục từ phát hiện tín hiệu khí methane, bay quét định vị, lập bản đồ không gian, đo lặp trước–sau đến hồ sơ bằng chứng có truy vết.

---

## I. TỔNG QUAN CẤU TRÚC 6 CẢNH (SHOT OVERVIEW TIMELINE)

```
0.0s          3.0s          6.0s          9.5s          13.0s         16.5s       19.5s
├─────────────┼─────────────┼─────────────┼─────────────┼─────────────┼───────────┤
│   SHOT 01   │   SHOT 02   │   SHOT 03   │   SHOT 04   │   SHOT 05   │  SHOT 06  │
│  Approach   │ Measurement │   Spatial   │ Baseline →  │Traceability │   Loop    │
│             │             │   Mapping   │Confirmation │             │Resolution │
└─────────────┴─────────────┴─────────────┴─────────────┴─────────────┴───────────┘
```

---

## II. ĐẶC TẢ CHI TIẾT TỪNG SHOT (6-SHOT DETAILED BREAKDOWN)

### SHOT 01: APPROACH (TIẾP CẬN KHÔNG GIAN BÃI CHÔN LẤP)
- **Duration:** 3.0 giây ($0.0\text{s} \rightarrow 3.0\text{s}$, Frame 0 → 72).
- **Camera:** High-angle elevated aerial (góc nghiêng $45^\circ$), chuyển động chậm tịnh tiến tới (*slow forward tracking*) kết hợp trượt nhẹ sang phải (*subtle lateral drift*), tiêu cự $40\text{mm}$.
- **UAV Action:** Hexacopter công nghiệp từ ngoài khung trên-phải bay đĩnh đạc vào vị trí $1/3$ bên phải khung hình, giữ thăng bằng khí động học ổn định, cánh quạt quay mờ tự nhiên (*natural motion blur*). Cụm cảm biến $\text{CH}_4$ hướng vuông góc xuống mặt đất.
- **Foreground / Background Action:** Tiền cảnh thoáng đãng; trung cảnh là bề mặt bãi chôn lấp với màng HDPE đen xám (`#182523`) và các sườn đê đất Warm Sand (`#F6F2E8`); hậu cảnh là vành đai rừng Deep Forest (`#0B2E2A`) dưới ánh ban mai khuếch tán $5400\text{K}$.
- **Overlay State:** Chưa có lớp dữ liệu GIS. Khung cảnh hiện trường thuần túy để tạo tính chân thực tư liệu.
- **Transition-in:** Tiếp nối mượt mà từ frame cuối của Shot 06 (hoặc mở đầu tĩnh tại từ poster `hero_editorial_window`).
- **Transition-out:** *Motion continuation*: Camera bắt đầu khép góc bám sát quỹ đạo UAV.
- **First-frame Anchor:** Khung cảnh rộng bãi chôn lấp, góc nhìn tương đương ảnh Hero Step 02.
- **Last-frame Anchor:** UAV ổn định ở tọa độ $X: 75\%, Y: 25\%$, mũi drone hướng về ô chôn lấp trung tâm.
- **Continuity Risk:** Hiện tượng giật cánh quạt hoặc trôi dạt địa hình $\rightarrow$ *Khắc phục: Khóa cứng asset 3D hexacopter và địa hình Step 02.*

---

### SHOT 02: MEASUREMENT (QUAN TRẮC ĐỒNG BỘ KHÍ TƯỢNG & NỒNG ĐỘ)
- **Duration:** 3.0 giây ($3.0\text{s} \rightarrow 6.0\text{s}$, Frame 72 → 144).
- **Camera:** Chuyển động lượn nhẹ bán kính rộng (*gentle orbit drift*) quanh sườn UAV nhưng vẫn duy trì hướng tịnh tiến theo hành trình bay. Cuối shot, camera bắt đầu hạ góc ngẩng (*tilt-down*).
- **UAV Action:** UAV bay dọc theo đường tim của ô chôn lấp ở độ cao ổn định ($20\text{m}$). Cảm biến gió siêu âm đón luồng khí phía trước, cảm biến quang học quét nồng độ khí tầng mặt.
- **Foreground / Background Action:** Bề mặt ô chôn lấp với các họng giếng thu khí LFG trượt dần dưới tầm quét của drone.
- **Overlay State:** Bắt đầu xuất hiện:
  - Vết đường bay khảo sát Data Teal (`#2FA98C`) siêu mảnh xuất hiện dần sau đuôi UAV.
  - Các mũi tên vector gió màu Warm Sand mờ chỉ hướng gió nhẹ theo chiều dạt địa hình.
  - *Chưa hiển thị toàn bộ bản đồ $\text{CH}_4$ để tránh lộ thông tin quá sớm.*
- **Transition-in:** *Match-position*: Nối trực tiếp từ vị trí UAV ở cuối Shot 01.
- **Transition-out:** *Tilt-down transition*: Camera chúc đầu từ $45^\circ$ xuống $75^\circ$, hướng mắt nhìn xuống trung tâm ô rác.
- **First-frame Anchor:** Khớp hoàn hảo vị trí và vận tốc UAV từ Shot 01.
- **Last-frame Anchor:** Góc nhìn bán trực giao ($75^\circ$), UAV chuẩn bị lướt ra ngoài mép trên để nhường khung nhìn cho mặt đất.
- **Continuity Risk:** Thay đổi tỷ lệ kích thước UAV $\rightarrow$ *Khắc phục: Giữ nguyên trục quang học và vận tốc di chuyển đều $2.0\,\text{m/s}$.*

---

### SHOT 03: SPATIAL MAPPING (LẬP BẢN ĐỒ PHÁT TÁN KHÔNG GIAN)
- **Duration:** 3.5 giây ($6.0\text{s} \rightarrow 9.5\text{s}$, Frame 144 → 228).
- **Camera:** Góc nhìn trực giao thẳng đứng gần $90^\circ$ (*near top-down nadir*), bao quát toàn bộ ô chôn lấp như ảnh Step 03.
- **UAV Action:** UAV bay lướt ra khỏi góc trên-phải; địa hình bãi rác chiếm trọn khung hình.
- **Foreground / Background Action:** Bề mặt ô rác tĩnh tại, các nếp gấp màng HDPE và bờ đê hiện rõ nét.
- **Overlay State:**
  - Lưới đường bay zíc-zắc Data Teal phủ kín phân khu.
  - Lớp đường đồng mức $\text{CH}_4$ bán trong suốt ($35\%$ opacity) quét mở dần (*cartographic reveal wipe*) từ Soft Mint đến Data Teal bám theo sườn đê.
  - Xuất hiện 3–4 điểm hotspot màu Measurement Amber (`#D7A93E`) nhấp nháy gợn sóng nhẹ.
- **Transition-in:** *Tilt & Pan*: Tiếp nối chuyển động chúc xuống từ Shot 02.
- **Transition-out:** *Camera push-in*: Camera nhẹ nhàng zoom/tiến vào cụm hotspot trung tâm, giữ hotspot ở vị trí cố định màn hình cho Shot 04.
- **First-frame Anchor:** Khung hình trực giao toàn bãi tương tự Step 03.
- **Last-frame Anchor:** Khung hình khóa cứng vào ô chôn lấp chứa 4 hotspot, khớp tuyệt đối với Step 06 (Baseline).
- **Continuity Risk:** Đường contour bị biến dạng thành khói xanh hoạt họa $\rightarrow$ *Khắc phục: Khóa chặt vector contour bán trong suốt bám địa hình.*

---

### SHOT 04: BASELINE → CONFIRMATION (ĐO LẶP TRƯỚC – SAU BIỆN PHÁP KHẮC PHỤC)
- **Duration:** 3.5 giây ($9.5\text{s} \rightarrow 13.0\text{s}$, Frame 228 → 312).
- **Camera:** **LOCKED (Khóa cứng hoàn toàn, không di chuyển, không rung lắc)**, góc nhìn $90^\circ$ Nadir.
- **UAV Action:** Không có UAV trong khung hình.
- **Foreground / Background Action:** Mặt đất, đê kè, nếp gấp màng HDPE đứng yên tuyệt đối $100\%$.
- **Overlay State:**
  - **Giây 9.5 → 10.5:** Trạng thái Kỳ nền (Baseline — Step 06) với 4 hotspot amber và quầng phát tán rộng.
  - **Giây 10.5 → 12.0:** Một vạch quét thời gian tinh tế (*time-split sweep line*) lướt êm từ trái sang phải: các hotspot B, C, D triệt tiêu hoàn toàn (đã vá màng và sửa giếng), hotspot A co nhỏ lại thành vòng Soft Mint mờ nhạt.
  - **Giây 12.0 → 13.0:** Trạng thái Kỳ xác nhận (Confirmation — Step 07) ổn định hoàn toàn.
- **Transition-in:** *Match-frame*: Khóa cứng tọa độ địa hình từ cuối Shot 03.
- **Transition-out:** *Terrain alignment*: Giữ nguyên tâm địa hình để chuyển sang giai đoạn mở rộng truy vết.
- **First-frame Anchor:** Khớp $100\%$ ảnh Step 06 (Baseline).
- **Last-frame Anchor:** Khớp $100\%$ ảnh Step 07 (Confirmation).
- **Continuity Risk:** Địa hình bị xê dịch khi chuyển đổi trước–sau $\rightarrow$ *Khắc phục: Pixel-perfect terrain lock giữa Step 06 và Step 07.*

---

### SHOT 05: TRACEABILITY (HỒ SƠ BẰNG CHỨNG CÓ TRUY VẾT)
- **Duration:** 3.5 giây ($13.0\text{s} \rightarrow 16.5\text{s}$, Frame 312 → 396).
- **Camera:** Chuyển động lùi dần lên cao (*slow pull-up / pull-back*), mở rộng tầm nhìn từ ô chôn lấp cục bộ ra toàn cảnh bãi rác và vành đai rừng.
- **UAV Action:** UAV xuất hiện lại ở tầm xa trên cao, đang hoàn tất ca bay kiểm tra.
- **Foreground / Background Action:** Toàn cảnh bãi rác thu gọn lại trong khung viền trắc địa tinh tế.
- **Overlay State:** Các lớp dữ liệu tổ chức thành bố cục hồ sơ kỹ thuật (*technical dossier* tương tự Step 08 & Step 09): ranh giới khảo sát, vệt bay, hoa gió, nhãn kiểm chuẩn và trạng thái QA/QC Pass xuất hiện thanh lịch.
- **Transition-in:** *Continuous pull-back*: Rút êm từ khung hình cận cảnh của Shot 04.
- **Transition-out:** *Match-velocity*: Camera tiếp tục lùi và hơi ngẩng đầu (*tilt-up*) về góc $45^\circ$.
- **First-frame Anchor:** Cận cảnh ô chôn lấp kỳ xác nhận.
- **Last-frame Anchor:** Góc nhìn bao quát bãi rác từ trên cao, tương đồng với không gian mở đầu.
- **Continuity Risk:** Lẫn lộn bảng biểu HUD giả viễn tưởng $\rightarrow$ *Khắc phục: Chỉ dùng các đường nét đồ họa kỹ thuật chuẩn GIS.*

---

### SHOT 06: LOOP RESOLUTION (ĐỒNG BỘ VÒNG LẶP LIỀN MẠCH)
- **Duration:** 3.0 giây ($16.5\text{s} \rightarrow 19.5\text{s}$, Frame 396 → 468).
- **Camera:** Tiếp tục chuyển động lùi chậm và ngẩng nhẹ (*pull-back & tilt-up*), đưa góc nhìn trở về phối cảnh nghiêng $45^\circ$ của Hero Aerial.
- **UAV Action:** UAV lướt đều đặn qua khung hình, tiến về vị trí xuất phát góc trên-phải với hướng bay và vận tốc đồng nhất với Frame 0 của Shot 01.
- **Foreground / Background Action:** Ánh sáng sáng sớm $5400\text{K}$ trong trẻo, cây rừng Deep Forest và màng HDPE bãi rác khớp lại góc nhìn ban đầu.
- **Overlay State:** Các lớp dữ liệu kỹ thuật mờ dần êm ái (*fade out cleanly*), trả lại khung cảnh hiện trường tinh khôi sẵn sàng cho vòng lặp mới.
- **Transition-in:** *Motion continuation*: Tiếp nối chuyển động lùi từ Shot 05.
- **Transition-out:** **Seamless Loop to Frame 0 Shot 01** (Không fade to black, không giật khung hình).
- **First-frame Anchor:** Khung cảnh bao quát bãi rác đang lùi dần.
- **Last-frame Anchor (Frame 468):** Trùng khớp hoàn hảo về tọa độ camera, vị trí UAV và góc chiếu sáng với **Frame 0 của Shot 01**.
- **Continuity Risk:** Khựng hình khi quay lại đầu video $\rightarrow$ *Khắc phục: Thuật toán nội suy hòa sắc 4 frames cuối trùng 4 frames đầu.*

---

## III. BỘ QUY TẮC CHUYỂN CẢNH (TRANSITION GUARDRAILS)

- **CÁC DẠNG CHUYỂN CẢNH ĐƯỢC PHÉP:**
  - `Motion Continuation`: Duy trì quán tính chuyển động tịnh tiến của camera.
  - `Camera Tilt (45° ↔ 90°)`: Hạ góc hoặc ngẩng góc êm ái mô phỏng trục gimbal cơ khí.
  - `Match-Position`: Nối tiếp vị trí UAV hoặc điểm hotspot giữa hai shot liền kề.
  - `Terrain Alignment`: Khóa cứng địa hình bãi rác làm neo thị giác.
  - `Continuous Pull-back`: Kéo lùi tầm nhìn từ chi tiết ra toàn cảnh.
- **TUYỆT ĐỐI CẤM:**
  - Cấm Glitch, Flash, Chớp giật.
  - Cấm Whip-pan (lia máy giật cục), Spin (xoay tròn chóng mặt).
  - Cấm Fade to black / Fade to white giữa chừng.
  - Cấm Dissolve ngẫu nhiên làm biến dạng hình học vật thể (*subject morphing*).
