# Information Architecture — S0285-S0287
## Đánh giá và lập bản đồ hấp thụ carbon trong sinh khối rừng
### Landing Page | Phase 02 Artifact

> **Nguyên tắc trần thuật:**  
> evidence → measurement → map → action  
> Không mở đầu bằng thông điệp môi trường chung chung.  
> Mỗi section trả lời đúng một câu hỏi người dùng.

---

## Câu hỏi người dùng — Khung điều hướng

| # | Câu hỏi | Section tương ứng |
|---|---|---|
| 1 | Dịch vụ này là gì? | Hero |
| 2 | Tại sao đo đạc truyền thống không đủ? | Problem |
| 3 | Rừng được đo đạc cụ thể những gì? | Forest as Data |
| 4 | Dữ liệu đo lường trở thành thông tin sinh khối/carbon như thế nào? | Method / Measurement Chain |
| 5 | Bản đồ không gian carbon trông như thế nào? | 3D Scene + Carbon Map |
| 6 | Quy trình dịch vụ diễn ra ra sao? | Workflow |
| 7 | Gói dịch vụ nào phù hợp với dự án của tôi? | Service Levels |
| 8 | Tôi nhận được gì? | Deliverables |
| 9 | Dịch vụ hỗ trợ điều gì — và không thay thế điều gì? | Positioning / MRV Boundary |
| 10 | Tôi nói chuyện với chuyên gia như thế nào? | AI Assistant + Lead CTA |

---

## Kiến trúc Section — Chi tiết

---

### S01 — HERO

| Trường | Nội dung |
|---|---|
| **Purpose** | Định vị dịch vụ trong 5–10 giây. Câu hỏi khách hàng: "Đây là gì và có liên quan đến mình không?" |
| **User question** | Dịch vụ này là gì? |
| **Headline** | Đánh giá và Lập bản đồ Hấp thụ Carbon Sinh khối Rừng bằng Công nghệ UAV LiDAR |
| **Supporting copy** | Giải pháp đo đạc viễn thám phủ kín diện tích kết hợp ô tiêu chuẩn thực địa, lượng hóa chính xác sinh khối trên mặt đất và trữ lượng carbon theo lô phục vụ chuẩn bị dự án và định giá rừng. |
| **Visual** | Full-width: đám mây điểm 3D tán rừng nhiệt đới overlay bản đồ carbon theo lô. UAV LiDAR được nhìn thấy đang bay — không phải ảnh stock. |
| **3D / Animation** | Three.js scene: point cloud tán rừng xuất hiện từ dưới lên, màu theo chiều cao (CHM gradient: xanh đậm → vàng → trắng). Reduced-motion: static frame. |
| **Interaction** | Scroll-trigger khởi động scene. Không auto-loop. WebGL fallback: ảnh tĩnh GeoTIFF minh họa. |
| **CTA** | Primary: "Đăng ký tư vấn kỹ thuật" → anchor #lead. Secondary: "Tải tài liệu giới thiệu giải pháp" → file download hoặc modal. |
| **Source** | Asset 09, Mục 1; AGENTS.md visual language |
| **Mobile behavior** | Heading font scale down (clamp). 3D scene: reduced point count hoặc fallback static image. CTAs full-width stacked. |

---

### S02 — PROBLEM

| Trường | Nội dung |
|---|---|
| **Purpose** | Xác nhận pain point đã được xác minh. Câu hỏi khách hàng: "Vấn đề này có phải vấn đề của mình không?" |
| **User question** | Tại sao đo đạc truyền thống không đủ? |
| **Headline** | Ba rào cản khiến trữ lượng carbon rừng vẫn là "con số ước tính" |
| **Problems (3 items — VERIFIED)** | 1. Chưa lượng hóa được trữ lượng carbon: Chủ rừng sở hữu diện tích lớn nhưng thiếu số liệu đo đạc để tham gia thị trường carbon hoặc báo cáo ESG. // 2. Điều tra thủ công tỷ lệ rút mẫu thấp: TT 33/2018/TT-BNNPTNT chỉ rút mẫu 0,01–0,1% diện tích rừng tự nhiên — không đủ để lập bản đồ theo lô. // 3. Áp lực pháp lý mới: Nghị định 180/2026/NĐ-CP bắt buộc đo đạc–báo cáo minh bạch và thẩm định độc lập trước khi đăng ký dự án. |
| **Visual** | 3 card layout. Icon: technical (không dùng leaf/cây). Icon gợi ý: điểm mẫu rải rác (vs. phủ kín), document với dấu hỏi, văn bản pháp lý. |
| **Interaction** | Stagger fade-in on scroll. Không có animation phức tạp. |
| **CTA** | None — transition tự nhiên xuống S03. |
| **Source** | Asset 09, Mục 2; Asset 02, Mục 2 — SRC-06, SRC-24, SRC-01, SRC-04 |
| **Mobile behavior** | 3 cards stack vertically. |

---

### S03 — FOREST AS MEASURABLE DATA

| Trường | Nội dung |
|---|---|
| **Purpose** | Thiết lập mô hình tư duy: rừng = dữ liệu có thể đo. Câu hỏi khách hàng: "Rừng được đo đạc cụ thể những gì?" |
| **User question** | Rừng được đo đạc cụ thể những gì? |
| **Headline** | Rừng là tập hợp dữ liệu có thể đo lường và số hóa |
| **Supporting copy** | UAV LiDAR thu thập hàng triệu điểm đo độ cao tán để dựng cấu trúc 3D từng cây. Kết hợp với đo ô tiêu chuẩn mặt đất (D1.3, Hvn), dữ liệu này trở thành nền tảng để ước tính sinh khối trên mặt đất (AGB) và quy đổi sang trữ lượng carbon. |
| **Visual** | Sơ đồ lớp dữ liệu annotated: LiDAR pulses → point cloud → CHM → cây đơn lẻ → AGB → tCO2e/ha. Không phải infographic marketing chung chung — kiểu editorial diagram. |
| **Interaction** | Scroll-linked annotation reveal: từng lớp hiện ra khi scroll. |
| **CTA** | None — narrative bridge. |
| **Source** | Asset 09, Mục 3 & 5; Asset 02, Mục 4 & 5 — SRC-17, SRC-18 |
| **Mobile behavior** | Diagram scroll horizontal hoặc stacked vertically với tóm tắt text per step. |

---

### S04 — METHOD / MEASUREMENT CHAIN

| Trường | Nội dung |
|---|---|
| **Purpose** | Giải thích chuỗi kỹ thuật từ đám mây điểm → bản đồ carbon. Câu hỏi khách hàng: "Dữ liệu trở thành thông tin sinh khối/carbon như thế nào?" |
| **User question** | Dữ liệu đo lường trở thành thông tin sinh khối/carbon như thế nào? |
| **Headline** | Từ đám mây điểm đến bản đồ carbon: chuỗi kỹ thuật end-to-end |
| **Supporting copy** | 3 năng lực kỹ thuật cốt lõi (từ Asset 09, Mục 5): (1) Khảo sát viễn thám phủ kín bằng UAV LiDAR — thu thập cấu trúc 3D tán rừng phủ kín diện tích. (2) Tách cây đơn lẻ & phân tầng bằng đa phổ — bóc tách vị trí, chiều cao, tán từng cây (từ Level 2). (3) Mô hình hóa sinh khối AGB bằng Machine Learning + allometric + hệ số IPCC — quy đổi sang tCO2e/ha. |
| **Visual** | 3-column capability cards với icon kỹ thuật. Hoặc horizontal stepper: LiDAR scan → Point Cloud → CHM → Single Tree → AGB → Carbon Map. |
| **Interaction** | Hover card expand cho thêm detail. |
| **CTA** | None — bridge sang S05 (3D scene). |
| **Source** | Asset 09, Mục 5; Asset 02, Mục 5 — SRC-13, SRC-14, SRC-17, SRC-18, SRC-19 |
| **Mobile behavior** | Cards stack. Stepper becomes vertical timeline. |

---

### S05 — INTERACTIVE 3D FOREST + CARBON MAP

| Trường | Nội dung |
|---|---|
| **Purpose** | Trực quan hóa kết quả: bản đồ carbon không gian là gì. Câu hỏi khách hàng: "Bản đồ không gian carbon trông như thế nào?" |
| **User question** | Bản đồ không gian carbon trông như thế nào? |
| **Headline** | Bản đồ trữ lượng carbon số hóa theo từng lô rừng |
| **Supporting copy** | Kết quả là lớp raster GeoTIFF phân bố mật độ carbon (tấn C/ha và tCO2e/ha) theo từng lô, kèm shapefile ranh giới và bảng sai số kỹ thuật (R², RMSE). |
| **Visual** | Three.js scene: terrain mesh (DTM) với canopy CHM overlay, tô màu heatmap carbon density (xanh lam nhạt → vàng → đỏ = thấp → cao). Plot boundary lines. |
| **Interaction** | Orbit controls (chuột/touch). Toggle: xem CHM height / xem carbon density. Tooltip on hover: "Lô X: Y tCO2e/ha". WebGL fallback: static screenshot annotated. Reduced-motion: static + label only. |
| **CTA** | "Xem các gói dịch vụ" → anchor #service-levels |
| **Source** | Asset 09, Mục 3, 8, 9; Asset 02, Mục 7 & 8 — SRC-01, SRC-13, SRC-21 |
| **Mobile behavior** | Simplified scene: terrain + heat overlay, no orbit (tap-to-rotate gesture only). Fallback image nếu GPU yếu. |

---

### S06 — USE CASES

| Trường | Nội dung |
|---|---|
| **Purpose** | Giúp khách hàng nhận ra tình huống của mình. Câu hỏi: "Tôi có phải khách hàng phù hợp không?" |
| **User question** | Dịch vụ dành cho ai và tình huống nào? |
| **Headline** | Ba trường hợp ứng dụng điển hình |
| **Use Cases (3 — VERIFIED)** | 1. Lập bản đồ trữ lượng carbon nền (Baseline) — Chủ rừng chuẩn bị đăng ký dự án carbon theo NĐ 180/2026/NĐ-CP nhưng chưa có số liệu baseline. Output: bản đồ theo lô (tấn C/ha, tCO2e/ha) kèm bảng sai số. // 2. Sàng lọc tiềm năng carbon vùng rừng — Nhà đầu tư hoặc chủ rừng cần đánh giá nhanh tiềm năng hấp thụ trước khi quyết định đầu tư. Output: báo cáo ước tính và phân bố không gian đại diện. // 3. Giám sát biến động sinh khối định kỳ — Dự án carbon đang vận hành, cần theo dõi tích lũy carbon. Output: bản đồ biến động, tốc độ hấp thụ tCO2e/ha/năm, dashboard GIS đa kỳ (Level 3). |
| **Visual** | 3 card với icon và "Output chính" highlight. |
| **Interaction** | Card hover highlight. |
| **CTA** | None. |
| **Source** | Asset 09, Mục 6; Asset 02, Mục 6 — SRC-01, SRC-21, SRC-24, SRC-13, SRC-20 |
| **Mobile behavior** | Cards stack vertically. |

---

### S07 — WORKFLOW (How It Works)

| Trường | Nội dung |
|---|---|
| **Purpose** | Giải thích quy trình dịch vụ ở mức tổng quan. Câu hỏi: "Quy trình dịch vụ diễn ra ra sao?" |
| **User question** | Quy trình dịch vụ diễn ra ra sao? |
| **Headline** | Quy trình 5 bước từ Chuẩn bị đến Bàn giao |
| **Steps (5 — VERIFIED)** | 01 Chuẩn bị & Pháp lý — Tiếp nhận ranh giới lô dạng số, khảo sát hiện trường, hoàn tất thủ tục cấp phép bay theo NĐ 288/2025/NĐ-CP. // 02 Thiết kế Kỹ thuật — Thiết kế tuyến bay UAV bảo đảm độ phủ và mật độ điểm; lập lưới ô tiêu chuẩn đo đếm mặt đất (D1.3, Hvn). // 03 Thu thập Dữ liệu Đồng thời — Bay quét UAV LiDAR/RGB phủ kín khu vực song song với đội ngoại nghiệp đo đạc ô tiêu chuẩn thực địa. // 04 Xử lý & Mô hình hóa — Phân loại đám mây điểm, tạo DTM/DSM/CHM, tách cây đơn lẻ và chạy mô hình học máy kết hợp phương trình allometric. // 05 QA/QC & Bàn giao — Đánh giá sai số độc lập (RMSE), xuất bản đồ GIS (raster/shapefile) và báo cáo kỹ thuật hoàn chỉnh. |
| **Visual** | Horizontal stepper (desktop): numbered step → icon → label → short text. |
| **Interaction** | Click/tap step to expand detail. Active step highlighted. |
| **CTA** | None. |
| **Source** | Asset 09, Mục 7 |
| **Mobile behavior** | Vertical timeline. Each step tappable to expand. |

---

### S08 — SERVICE LEVELS

| Trường | Nội dung |
|---|---|
| **Purpose** | Giúp khách hàng chọn gói phù hợp. Câu hỏi: "Gói dịch vụ nào phù hợp với dự án của tôi?" |
| **User question** | Gói dịch vụ nào phù hợp với dự án của tôi? |
| **Headline** | Ba cấp độ dịch vụ — từ Bản đồ nền đến Giám sát đa kỳ |
| **Levels (3 + add-ons — VERIFIED)** | Level 1 (Bản đồ nền): UAV LiDAR + RGB; DTM/DSM/CHM; bản đồ carbon theo lô (tấn C/ha, tCO2e/ha) kèm bảng sai số; 01 kỳ bay. // Level 2 (Bản đồ chi tiết): Toàn bộ Level 1 + cảm biến đa phổ; lớp cây đơn lẻ; phân tầng loài/trạng thái. // Level 3 (Giám sát đa kỳ): Toàn bộ Level 2 + bay lặp chu kỳ 2–3 năm; bản đồ biến động; tốc độ hấp thụ tCO2e/ha/năm; dashboard GIS. // Add-ons: gói dữ liệu chuẩn hóa cho đơn vị lập MRV; mở rộng vùng phủ Sentinel-1/Sentinel-2; ground-truth bổ sung; hosting GIS/dashboard. |
| **Pricing display** | "Liên hệ tư vấn / Theo chính sách" — không hiển thị giá cụ thể. |
| **Visual** | 3-column comparison card. Level được highlight mặc định: Level 1. Toggle để xem Level 2 / 3. |
| **Interaction** | Tab/toggle giữa các level. CTA riêng từng level đều link về #lead. |
| **CTA** | Mỗi card: "Tư vấn Level X" → #lead |
| **Source** | Asset 09, Mục 8; Asset 02, Mục 7 — SRC-01, SRC-13, SRC-17, SRC-18, SRC-20 |
| **Mobile behavior** | Cards stack. Accordion expand per level. |

---

### S09 — DELIVERABLES

| Trường | Nội dung |
|---|---|
| **Purpose** | Xác nhận cụ thể những gì khách hàng nhận được. Câu hỏi: "Tôi nhận được gì?" |
| **User question** | Tôi nhận được gì? |
| **Headline** | Sản phẩm bàn giao — dữ liệu số hóa chuẩn GIS |
| **Deliverables (6 — VERIFIED)** | 1. Đám mây điểm đã phân loại (LAS/LAZ). // 2. DTM / DSM / CHM (GeoTIFF chuẩn). // 3. Lớp cây đơn lẻ — vị trí, chiều cao, diện tích tán (từ Level 2). // 4. Bản đồ AGB và Trữ lượng Carbon theo lô (GeoTIFF + shapefile; tấn C/ha, tCO2e/ha). // 5. Báo cáo phương pháp luận kèm bảng sai số kỹ thuật (R², RMSE). // 6. Bản đồ biến động và dashboard GIS đa kỳ (Level 3 only). |
| **Visual** | Grid 2×3 (desktop) / list (mobile). Mỗi item: icon file type + tên + mô tả ngắn + badge Level. |
| **Interaction** | Hover expand description. Badge "Level 1/2/3" màu tương ứng với S08. |
| **CTA** | None. |
| **Source** | Asset 09, Mục 9; Asset 02, Mục 8 — SRC-01, SRC-13, SRC-17, SRC-18, SRC-20, SRC-21 |
| **Mobile behavior** | List stacked. Badge inline. |

---

### S10 — POSITIONING / WHY GASCOLAE + MRV BOUNDARY

| Trường | Nội dung |
|---|---|
| **Purpose** | Định vị kỹ thuật và tuyên bố rõ ranh giới MRV. Câu hỏi: "Dịch vụ hỗ trợ điều gì — và không thay thế điều gì?" |
| **User question** | Dịch vụ hỗ trợ điều gì — và không thay thế điều gì? |
| **Headline** | Gói dữ liệu đo đạc đầu chuỗi — nền tảng cho MRV, không phải thay thế MRV |
| **Positioning points (3 — VERIFIED)** | 1. Vị thế kỹ thuật đầu chuỗi: Dịch vụ định vị ở khâu đo đạc–lượng hóa theo NĐ 180/2026/NĐ-CP, cung cấp dữ liệu có tọa độ và bảng sai số cho các bên tư vấn và thẩm định độc lập. // 2. Kết hợp viễn thám & thực địa: Không chỉ dựa vào ảnh viễn thám thuần túy — luôn tích hợp ô tiêu chuẩn mặt đất để hiệu chuẩn mô hình, bảo đảm tính xác thực. // 3. Minh bạch sai số và lặp lại được: Công bố bảng sai số mỗi kỳ; chuẩn hóa tham số bay cho phép so sánh nhất quán giữa các chu kỳ đa năm. |
| **MRV Boundary notice** | Dạng callout/alert: "Kết quả đo đạc là dữ liệu kỹ thuật đầu vào. Theo Nghị định 180/2026/NĐ-CP, dự án carbon rừng yêu cầu thẩm định độc lập riêng biệt — dịch vụ không thay thế bước đó." |
| **Visual** | 3 positioning cards. MRV boundary: styled blockquote/callout khác màu (neutral/info, không phải warning đỏ). |
| **Interaction** | Static. |
| **CTA** | None. |
| **Source** | Asset 09, Mục 10 & 11; Asset 02, Mục 10 & 11 — SRC-01, SRC-18 |
| **Mobile behavior** | Cards stack. Callout full-width. |

---

### S11 — FAQ

| Trường | Nội dung |
|---|---|
| **Purpose** | Giải đáp 4 câu hỏi kỹ thuật quan trọng nhất. |
| **User question** | Tôi còn câu hỏi kỹ thuật. |
| **Headline** | Câu hỏi thường gặp |
| **FAQ (4 — VERIFIED)** | Q1: Dịch vụ đo được những bể carbon nào trong rừng? A1: Dịch vụ đo lường sinh khối trên mặt đất (AGB). Các bể dưới mặt đất (rễ), gỗ chết, thảm mục và đất không đo được trực tiếp bằng phương pháp UAV LiDAR này. // Q2: Kết quả đo đạc có thay thế được báo cáo thẩm định MRV không? A2: Không. NĐ 180/2026/NĐ-CP yêu cầu chuỗi đăng ký dự án, đo đạc–báo cáo và thẩm định độc lập; dịch vụ cung cấp gói dữ liệu đầu vào chuẩn hóa cho chuỗi đó. // Q3: Tại sao đã ứng dụng UAV LiDAR hiện đại mà vẫn cần đo ô tiêu chuẩn mặt đất? A3: LiDAR đo cấu trúc tán đứng nhưng không đo trực tiếp đường kính thân cây D1.3 dưới tán. Ô tiêu chuẩn thực địa là bắt buộc để hiệu chuẩn phương trình sinh khối allometric. // Q4: Chu kỳ bay lặp để giám sát biến động khuyến nghị là bao lâu? A4: 2–3 năm trở lên, nhằm đảm bảo lượng tăng trưởng sinh khối thực tế lớn hơn khoảng sai số kỹ thuật của phép đo mô hình. |
| **Visual** | Accordion expand. |
| **Interaction** | Click/tap Q để expand A. Chỉ một item mở tại một thời điểm. |
| **CTA** | "Câu hỏi khác? Hỏi Trợ lý AI" → anchor #ai-agent |
| **Source** | Asset 09, Mục 11; Asset 02, Mục 10 — SRC-01, SRC-06, SRC-13, SRC-14, SRC-17, SRC-18, SRC-20 |
| **Mobile behavior** | Full-width accordion. |

---

### S12 — AI AGENT INTEGRATION BLOCK

| Trường | Nội dung |
|---|---|
| **Purpose** | Kênh self-service cho câu hỏi kỹ thuật trước khi gặp chuyên gia. |
| **User question** | Tôi muốn hỏi thêm về kỹ thuật trước khi để lại thông tin. |
| **Headline** | Hỏi Trợ lý AI Tư vấn Carbon Rừng GASCOLAE |
| **Agent display name** | Trợ lý AI Tư vấn Carbon Rừng GASCOLAE |
| **Welcome message** | Xin chào! Tôi là Trợ lý AI chuyên môn của GASCOLAE về dịch vụ Đánh giá và lập bản đồ hấp thụ carbon trong sinh khối rừng (S0285-S0287). Tôi có thể hỗ trợ giải đáp về nguyên lý kỹ thuật, các cấp độ dịch vụ và quy trình triển khai. |
| **Suggested questions (4)** | 1. Dịch vụ S0285-S0287 ứng dụng công nghệ gì và giải quyết vấn đề gì cho chủ rừng? // 2. Sự khác biệt giữa Level 1, Level 2 và Level 3 là gì? // 3. Vì sao đã bay LiDAR hiện đại rồi mà vẫn cần đo ô tiêu chuẩn mặt đất? // 4. Kết quả bản đồ carbon có thay thế được báo cáo thẩm định MRV không? |
| **Escalation CTA** | "Để nhận tư vấn chuyên sâu và báo giá theo diện tích cụ thể, vui lòng bấm 'Gặp Chuyên Gia Tư Vấn'." → anchor #lead |
| **Restriction (UX note)** | AI không báo giá chi tiết, không cam kết độ chính xác tuyệt đối ngoài nguồn tham chiếu, không đưa kết luận pháp lý. |
| **Technical config** | KHÔNG thuộc landing page — thuộc Asset 10. |
| **Visual** | Chat widget embedded, collapsible. Suggested question chips trên welcome. |
| **Interaction** | Click chip → pre-fill input. Enter/Send. Scroll chat history. Mobile: bottom sheet. |
| **CTA** | Escalation button trong chat: "Gặp Chuyên Gia Tư Vấn" |
| **Source** | Asset 09, Mục 13 |
| **Mobile behavior** | Chat widget bottom sheet, full-height on expand. |

---

### S13 — LEAD CTA

| Trường | Nội dung |
|---|---|
| **Purpose** | Chuyển đổi khách hàng quan tâm thành lead có thông tin. Câu hỏi: "Tôi muốn nói chuyện với chuyên gia." |
| **User question** | Tôi nói chuyện với chuyên gia như thế nào? |
| **CTA Headline** | Khởi động Lượng hóa và Số hóa Bể Hấp thụ Carbon Rừng Ngay Hôm Nay |
| **CTA Button** | Gửi Yêu Cầu Khảo Sát & Tư Vấn |
| **Lead fields** | Họ và tên; Cơ quan / Đơn vị chủ rừng; Số điện thoại; Email; Địa điểm khu rừng; Ước tính diện tích (ha); Mục tiêu dự án (radio: Lập dự án carbon / Định giá rừng / Báo cáo ESG) |
| **Privacy note** | Mọi thông tin quý khách cung cấp được bảo mật theo chính sách bảo mật thông tin dự án. |
| **Routing** | Tự động chuyển tiếp đến Bộ phận Tư vấn Kỹ thuật Lâm nghiệp & Kinh doanh GASCOLAE. |
| **Visual** | 2-column: left = copy + benefit summary; right = form. Dark or high-contrast background section. |
| **Interaction** | Form validation inline. Submit → success state (không reload page). |
| **CTA** | Submit button: "Gửi Yêu Cầu Khảo Sát & Tư Vấn" |
| **Source** | Asset 09, Mục 12 |
| **Mobile behavior** | Single column. Form full-width. Radio → segmented control hoặc select. |

---

## Navigation & Page Structure

### Sticky Navigation

| Item | Anchor | Note |
|---|---|---|
| Dịch vụ | #solution | S03 + S04 |
| Công nghệ | #capabilities | S04 |
| Quy trình | #workflow | S07 |
| Gói dịch vụ | #service-levels | S08 |
| Sản phẩm | #deliverables | S09 |
| FAQ | #faq | S11 |
| Tư vấn | #lead | S13 |

Logo links to top (#hero). Navigation collapses to hamburger on mobile.

### Anchor Map

```
#hero           → S01 Hero
#problem        → S02 Problem
#forest-data    → S03 Forest as Measurable Data
#method         → S04 Method / Measurement Chain
#3d-map         → S05 3D Scene + Carbon Map
#use-cases      → S06 Use Cases
#workflow       → S07 Workflow
#service-levels → S08 Service Levels
#deliverables   → S09 Deliverables
#positioning    → S10 Positioning / MRV Boundary
#faq            → S11 FAQ
#ai-agent       → S12 AI Agent Block
#lead           → S13 Lead CTA
```

### Footer (minimal)

Logo | Service ID S0285-S0287 | Link chính sách bảo mật | Copyright GASCOLAE

---

## Responsive Breakpoints

| Breakpoint | Behavior |
|---|---|
| < 480px (mobile S) | Single column; 3D scene = static fallback; nav = hamburger |
| 480–768px (mobile L / tablet P) | Single column; 3D scene = reduced quality; cards stack |
| 768–1024px (tablet L) | 2-column layouts; 3D scene = medium quality |
| > 1024px (desktop) | Full layout; 3D scene = full quality |

---

## Performance Constraints

| Concern | Mitigation |
|---|---|
| Three.js scene (S01, S05) | Lazy load; constrained devicePixelRatio; LOD; frustum culling; InstancedMesh |
| 3D fallback | WebGL feature detect → static GeoTIFF screenshot |
| Reduced motion | `prefers-reduced-motion: reduce` → static frame, no animation |
| Mobile GPU | Point count cap; fallback image threshold |
| LCP | Hero image / 3D scene non-blocking — text renders first |

---

## Phase 02 Gate Checklist

| # | Tiêu chí | Kết quả |
|---|---|---|
| G1 | Narrative di chuyển theo hướng evidence → measurement → map → action | PASS |
| G2 | Không có thông điệp môi trường chung chung mở đầu | PASS — S01 mở bằng kỹ thuật đo đạc, không bằng "hành tinh xanh" |
| G3 | Mỗi section trả lời đúng một câu hỏi người dùng đã xác định | PASS |
| G4 | Mỗi claim trong IA có nguồn hoặc được đánh dấu | PASS — trỏ về Asset 09/02 và SRC codes |
| G5 | Ranh giới MRV được nhúng vào cả S10 lẫn S11 (FAQ Q2) | PASS |
| G6 | AI Agent block tách UX/content khỏi cấu hình kỹ thuật | PASS |
| G7 | 3D rules của AGENTS.md được tôn trọng: fallback, reduced-motion, non-blocker | PASS |
| G8 | File UTF-8, không BOM, ký tự tiếng Việt bảo toàn | PASS (verified by write script) |

---

STATUS: PASS

COMPLETED:
- Đọc AGENTS.md (bao gồm Encoding Rules)
- Đọc docs/00-project-brief.md
- Đọc docs/01-content-contract.md
- Thiết kế IA 13 sections theo khung câu hỏi người dùng
- Tất cả claim trỏ về nguồn đã VERIFIED trong content contract
- Narrative: evidence → measurement → map → action

ARTIFACTS:
- docs/02-information-architecture.md

RISKS:
- S05 (3D Carbon Map): tương tác orbit + toggle yêu cầu Three.js cẩn thận — sẽ đặc tả chi tiết hơn ở Phase 05 (3D Spec).
- S12 (AI Agent): cần tích hợp endpoint thực tế — Phase 07 sẽ xử lý; landing page có thể dùng placeholder widget trước.
- Lead form routing (S13): cần endpoint backend hoặc form service — Phase 07.

NEEDS USER DECISION: Không có.

NEXT PHASE: prompts/03-visual-direction.md
