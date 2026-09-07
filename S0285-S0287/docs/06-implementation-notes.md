# Implementation Notes — S0285-S0287
## Đánh giá và lập bản đồ hấp thụ carbon trong sinh khối rừng
### Landing Page Build Documentation | Phase 07 Artifact

> **Mục tiêu triển khai:**  
> Xây dựng hoàn chỉnh giao diện landing page kỹ thuật, đáp ứng 100% nội dung hợp đồng (Content Contract), tiêu chuẩn trực quan khoa học (Visual Direction), hệ thống thiết kế (Design System) và tích hợp mô hình 3D tương tác (Three.js Prototype).

---

## 1. Cấu trúc Mô-đun Mã nguồn (Source Code Architecture)

Trang web được triển khai theo cấu trúc tách biệt, không sử dụng framework hay công cụ build phụ thuộc (Pure Semantic HTML5 + Modular CSS3 + Vanilla ES6 JavaScript + Three.js):

```
S0285-S0287/
├── index.html                    (Điểm vào chính tại thư mục gốc)
├── src/
│   ├── index.html                (Bản dựng kỹ thuật chi tiết)
│   ├── css/
│   │   ├── tokens.css            (Biến CSS tùy biến: màu sắc, typography, khoảng cách, z-index, motion)
│   │   ├── base.css              (Reset chuẩn, quy cách chữ, container, lưới 12 cột, trợ năng)
│   │   ├── main.css              (Tập hợp và liên kết các mô-đun kiểu dáng)
│   │   └── components/
│   │       ├── navbar.css        (Thanh điều hướng sticky & menu di động)
│   │       ├── buttons.css       (Quy chuẩn nút bấm primary, ghost, sm)
│   │       ├── section-heading.css (Tiêu đề phân đoạn chuẩn hóa)
│   │       ├── metric.css        (Thước đo kỹ thuật & dải số liệu định lượng)
│   │       ├── feature-card.css  (Thẻ tính năng, rào cản vấn đề, trường hợp sử dụng)
│   │       ├── process-step.css  (Quy trình 5 bước tương tác)
│   │       ├── service-level-card.css (Thẻ so sánh 3 cấp độ dịch vụ)
│   │       ├── map-legend.css    (Chú giải thanh màu gradient carbon)
│   │       ├── tooltip.css       (HUD Tooltip tra cứu lô rừng tương tác)
│   │       ├── accordion.css     (Khung accordion FAQ chuẩn trợ năng ARIA)
│   │       ├── ai-panel.css      (Widget Trợ lý AI chuyên môn)
│   │       ├── lead-form.css     (Biểu mẫu thu thập yêu cầu khảo sát)
│   │       └── loading.css       (Hiệu ứng cuộn hiển thị Reveal)
│   ├── js/
│   │   ├── navbar.js             (Xử lý menu di động, cuộn mượt đến anchor)
│   │   ├── accordion.js          (Đóng/mở câu hỏi FAQ độc lập)
│   │   ├── process-steps.js      (Tương tác chọn bước trong quy trình 5 bước)
│   │   ├── ai-panel.js           (Xử lý hội thoại tự phục vụ dựa trên Prompt Library)
│   │   ├── lead-form.js          (Kiểm tra tính hợp lệ và xử lý gửi form không reload trang)
│   │   ├── reveal.js             (Hiệu ứng hiển thị theo vị trí cuộn IntersectionObserver)
│   │   └── main.js               (Bộ điều phối trang và gắn kết cảnh 3D)
│   └── 3d/
│       ├── camera.js             (Quản lý CameraRig, góc nhìn 5 trạng thái, OrbitControls khóa góc)
│       ├── terrain.js            (Mô hình độ cao số DTM, phân vùng 5 lô, bản đồ chuyên đề Choropleth)
│       ├── forest.js             (Tán rừng 360 cây InstancedMesh, ô tiêu chuẩn thực địa)
│       ├── carbon-layer.js       (45,000 điểm mây LiDAR, mô hình UAV và chùm quét laser)
│       ├── scene.js              (Bộ điều khiển cảnh Three.js trung tâm)
│       └── vendor/
│           ├── three.module.js   (Thư viện Three.js bản chuẩn ES Module)
│           └── OrbitControls.js  (Thư viện điều khiển góc nhìn)
└── tests/
    └── 3d-demo.html              (Trang kiểm thử tương tác và bộ tự động Smoke Test)
```

---

## 2. Danh mục các Phân đoạn đã hiện thực (Implemented Sections)

| # | Phân đoạn | Mã định danh (ID) | Nội dung kỹ thuật chính | Nguồn tài liệu |
|---|---|---|---|---|
| **01** | Header / Navbar | `navbar` | Logo thương hiệu GASCOLAE, mã dịch vụ `S0285-S0287`, 10 liên kết anchor, menu responsive cho di động. | Asset 09 |
| **02** | Hero Section | `#hero` | Tiêu đề chính xác thực, định vị công nghệ UAV LiDAR, nút đăng ký tư vấn và xem mô hình 3D. | Asset 09 Mục 1 |
| **03** | Customer Problems | `#problem` | 3 rào cản lớn: Chưa lượng hóa trữ lượng; Tỷ lệ rút mẫu thủ công thấp (0,01–0,1%); Thiếu bản đồ lô & áp lực NĐ 180/2026. | Asset 09 Mục 2 |
| **04** | Measurement Chain | `#measurement` | Dải số liệu (Metric Strip: 0,01–0,1% vs 100% vs 2–3 năm), sơ đồ 5 nút dữ liệu, 3 năng lực cốt lõi (LiDAR, đa phổ, ML AGB). | Asset 09 Mục 3, 4, 5 |
| **05** | Interactive 3D | `#interactive-3d` | Khung hiển thị Three.js tích hợp thanh chuyển 5 trạng thái (A $	o$ E), HUD Tooltip tra cứu chỉ số lô rừng, thang đo gradient carbon. | Asset 09 Mục 3 & docs/05 |
| **06** | Workflow | `#workflow` | Quy trình 5 bước: Chuẩn bị pháp lý (NĐ 288/2025) $	o$ Thiết kế kỹ thuật $	o$ Thu thập đồng thời $	o$ Xử lý & Mô hình hóa $	o$ QA/QC & Bàn giao. | Asset 09 Mục 7 |
| **07** | Use Cases | `#use-cases` | 3 trường hợp ứng dụng: Lập baseline NĐ 180; Sàng lọc tiềm năng carbon; Giám sát biến động sinh khối định kỳ. | Asset 09 Mục 6 |
| **08** | Service Levels | `#service-levels` | 3 gói dịch vụ chuẩn hóa: Level 1 (Bản đồ nền), Level 2 (Chi tiết cây đơn lẻ), Level 3 (Giám sát đa kỳ) kèm các gói Add-on. Giá hiển thị: "Liên hệ tư vấn / Theo chính sách". | Asset 09 Mục 8 |
| **09** | Deliverables | `#deliverables` | 6 sản phẩm bàn giao số hóa GIS: DTM/DSM/CHM, Bản đồ AGB/Carbon (GeoTIFF+Shapefile), Báo cáo phương pháp & sai số, Mây điểm LAS, Lớp cây đơn lẻ, Dashboard WebGIS. | Asset 09 Mục 9 |
| **10** | Positioning & MRV | `#positioning` | Vị thế kỹ thuật đầu chuỗi, phương pháp kết hợp viễn thám & thực địa, minh bạch sai số. **Kèm khung cảnh báo bắt buộc về Ranh giới MRV**. | Asset 09 Mục 10, 11 |
| **11** | FAQ | `#faq` | 4 câu hỏi thường gặp đã xác minh (Bể carbon đo được; Kết quả có thay thế thẩm định MRV không; Tại sao cần ô tiêu chuẩn; Chu kỳ bay lặp 2–3 năm). | Asset 09 Mục 11 |
| **12** | AI Assistant | `#ai-agent` | Trợ lý AI Tư vấn Carbon Rừng GASCOLAE với 4 câu hỏi gợi ý, câu trả lời từ Prompt Library, nút chuyển chuyên gia và ghi chú giới hạn thẩm quyền. | Asset 09 Mục 13 |
| **13** | Lead CTA | `#lead` | Biểu mẫu tiếp nhận thông tin khảo sát (7 trường dữ liệu chuẩn), chính sách bảo mật dự án, thông báo gửi thành công tại chỗ. | Asset 09 Mục 12 |
| **14** | Footer | `footer` | Thông tin bản quyền GASCOLAE, mã dịch vụ, liên kết điều khoản bảo mật theo quy định pháp lý. | Asset 09 |

---

## 3. Tuân thủ Ranh giới MRV & Bản quyền Nội dung (Content & MRV Integrity)

- **Tuyệt đối không có số liệu tự tạo:** Toàn bộ dữ liệu định lượng (tỷ lệ rút mẫu 0,01–0,1%, chu kỳ 2–3 năm, thiết bị tham chiếu Zenmuse L2, Nghị định 180/2026/NĐ-CP, Thông tư 33/2018/TT-BNNPTNT, Nghị định 288/2025/NĐ-CP) đều dẫn xuất 100% từ Asset 09 và Asset 02.
- **Ranh giới MRV minh bạch:** Đã tích hợp khối Callout nổi bật tại phân đoạn `#positioning` và giải đáp chi tiết tại câu hỏi FAQ số 2, khẳng định dịch vụ cung cấp gói dữ liệu kỹ thuật đầu vào, không thay thế bước thẩm định độc lập của đơn vị thẩm định theo Nghị định 180/2026/NĐ-CP.
- **Không có văn bản giả định (No Lorem Ipsum):** 100% câu chữ trên toàn bộ trang là nội dung tiếng Việt chuyên ngành hoàn chỉnh.

---

## 4. Kết quả Kiểm định Cổng Giai đoạn 07 (Phase 07 Gate Verification)

| # | Tiêu chí kiểm tra | Kết quả | Ghi chú minh chứng |
|---|---|---|---|
| **G1** | Desktop render correctly | **PASS** | Kiểm thử tự động trên Chrome Headless (1280x900) hiển thị đầy đủ 13 phân đoạn, không lỗi JS console. |
| **G2** | Mobile render correctly | **PASS** | Kiểm thử tự động trên Chrome Headless (390x844 - iPhone) chuyển đổi layout 1 cột, menu hamburger và canvas thích ứng. |
| **G3** | No fabricated claims | **PASS** | Toàn bộ claim bám sát hợp đồng nội dung `docs/01-content-contract.md`. |
| **G4** | No placeholder lorem ipsum | **PASS** | Quét tự động 0 trường hợp chứa "lorem", "ipsum", "TODO", "FIXME". |
| **G5** | No broken CTA | **PASS** | 100% liên kết anchor nội bộ (11 anchors) khớp chính xác với ID của các phần tử DOM hiện hữu. |
| **G6** | Encoding Gate (UTF-8) | **PASS** | Toàn bộ các file HTML, CSS, JS đạt tiêu chuẩn UTF-8, `BOM=False`, không lỗi hiển thị tiếng Việt. |

---

**KẾT LUẬN GIAI ĐOẠN 07:** **STATUS: PASS**
- **Trang chính:** [`src/index.html`](file:///d:/Work/CT-group/GASCOLAE_Group9/S0285-S0287/src/index.html) & [`index.html`](file:///d:/Work/CT-group/GASCOLAE_Group9/S0285-S0287/index.html)
- **Tài liệu bàn giao:** `docs/06-implementation-notes.md`
- **Bước tiếp theo:** Sẵn sàng tiếp nhận lệnh bước vào `prompts/08-animation.md` để tinh chỉnh và kiểm tra chuyển động (Animation & Interaction).
