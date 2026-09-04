# Project Brief — S0285-S0287
## Đánh giá và lập bản đồ hấp thụ carbon trong sinh khối rừng
### Forest Biomass Carbon Assessment and Mapping
#### Landing Page Build — GASCOLAE Platform

---

## 1. Service Identity

| Trường | Nội dung |
|---|---|
| **Service ID** | S0285-S0287 |
| **Tên dịch vụ** | Đánh giá và lập bản đồ hấp thụ carbon trong sinh khối rừng |
| **English name** | Forest Biomass Carbon Assessment and Mapping |
| **Ngành / Phân ngành** | Môi trường, sinh thái và kinh tế xanh / Tín chỉ carbon & giám sát sinh thái |
| **Trạng thái** | Draft |
| **Primary CTA** | Đăng ký tư vấn kỹ thuật & Khảo sát hiện trường |

---

## 2. Mission of this Landing Page

Xây dựng landing page kỹ thuật, có độ tin cậy khoa học, truyền đạt chuỗi đo lường:

> **rừng → quét UAV LiDAR → đám mây điểm → CHM/DTM/DSM → mô hình allometric → AGB → bản đồ carbon → gói dữ liệu MRV-ready**

Trang phải thể hiện sự nghiêm túc khoa học và pháp lý mà không hứa hẹn quá mức.  
Ranh giới MRV phải rõ ràng: dịch vụ cung cấp dữ liệu đo đạc — **không thay thế** thẩm định độc lập MRV.

---

## 3. Target Audience

| Nhóm khách hàng | Nhu cầu chính |
|---|---|
| Ban quản lý rừng phòng hộ / đặc dụng | Số liệu trữ lượng carbon trên diện tích quản lý |
| Công ty lâm nghiệp / chủ rừng tổ chức quy mô lớn | Định giá rừng và cơ sở dữ liệu lập dự án |
| Đơn vị phát triển dự án carbon | Dữ liệu baseline theo Nghị định 180/2026/NĐ-CP |
| Quỹ Bảo vệ và Phát triển rừng cấp tỉnh | Số liệu chi trả dịch vụ hấp thụ carbon |
| Doanh nghiệp cam kết ESG / net-zero | Dữ liệu bể hấp thụ phục vụ báo cáo |

---

## 4. Regulatory Context

- **Nghị định 180/2026/NĐ-CP** — bắt buộc đăng ký dự án, đo đạc–báo cáo và thẩm định độc lập cho dự án carbon rừng. Dịch vụ nằm ở bước đo đạc–lượng hóa.
- **Thông tư 33/2018/TT-BNNPTNT** — phương pháp điều tra ô tiêu chuẩn truyền thống; tỷ lệ rút mẫu 0,01–0,1% rừng tự nhiên (pain point mà dịch vụ giải quyết).
- **Nghị định 288/2025/NĐ-CP** — quản lý giấy phép bay UAV, đăng ký phương tiện, chứng chỉ người lái.

---

## 5. Technical Stack

HTML + CSS + Vanilla JavaScript + Three.js.  
Không dùng React / Next.js.

---

## 6. Page Sections Planned

1. Hero
2. Customer Problems (3 vấn đề)
3. Solution / Service Overview
4. Key Benefits (3 lợi ích)
5. Key Capabilities / Technology (3 năng lực)
6. Use Cases (3 trường hợp)
7. How It Works (5 bước)
8. Service Levels (Level 1 / 2 / 3 + Add-ons)
9. Deliverables (3 sản phẩm chính)
10. Why GASCOLAE / Positioning (3 điểm nhấn)
11. FAQ (4 câu hỏi)
12. CTA / Lead Form
13. AI Agent Integration Block (UX/content only — cấu hình kỹ thuật thuộc Asset 10)
14. SEO Metadata

---

## 7. 3D / Visual Direction (sơ bộ)

- Ngôn ngữ hình ảnh khoa học: đám mây điểm LiDAR, cấu trúc tán, bản đồ nhiệt mật độ carbon, đường đồng mức địa hình.
- Thiết bị tham chiếu: UAV công nghiệp mang cảm biến LiDAR (dòng Zenmuse L2 theo Asset 09).
- Three.js: trực quan hóa địa hình + CHM, khái niệm đám mây điểm.
- Bảng màu khoa học kiềm chế — không dùng clichés xanh lá chung chung.

---

## 8. Key Constraints

- **Không hiển thị giá** — chỉ dùng "Liên hệ tư vấn / Theo chính sách".
- **Không tự tạo số liệu** — không có % chính xác, % tiết kiệm, số dự án, số khách hàng.
- **Ranh giới MRV** — không được ngụ ý dịch vụ thay thế thẩm định độc lập MRV.
- **Bể carbon** — dịch vụ đo AGB (sinh khối trên mặt đất) duy nhất; bể dưới mặt đất, gỗ chết, thảm mục, đất KHÔNG được đo bằng phương pháp này.
- **Ô tiêu chuẩn bắt buộc** — LiDAR không đo trực tiếp D1.3 dưới tán.
- **Giá trị pháp lý của đầu ra** theo NĐ 180/2026/NĐ-CP: NEEDS VERIFICATION (Legal).

---

## 9. Source Assets Used

| Asset | File | Vai trò |
|---|---|---|
| Asset 09 | S0285-S0287_09_Service_Landing_Page_Content.docx | **Nguồn nội dung chính** |
| Asset 02 | S0285-S0287_02_Service_Profile.docx | Định vị, năng lực, gói dịch vụ, sản phẩm bàn giao |
| Asset 05 | S0285-S0287_05_Service_Proposal.docx | Bối cảnh đề xuất (đọc thêm ở Phase 07) |
| Asset 07 | S0285-S0287_07_Service_Pricing.xlsx | Cấu trúc giá (hạn chế — không hiển thị) |
| Asset 10 | S0285-S0287_10_Service_AI_Agent_Config_Test_Cases.xlsx | Cấu hình AI Agent kỹ thuật (không phải nội dung landing page) |

---

## 10. Encoding Declaration

Tất cả file dự án được tạo ra phải tuân thủ UTF-8 (không BOM).  
Ký tự tiếng Việt — Đ ă â ê ô ơ ư đ á à ả ã ạ — phải được bảo toàn chính xác.  
Ký hiệu → – ≥ ✅ ° × phải được bảo toàn.
