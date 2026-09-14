# S0271 — SPECIFICATION & AUDIT: STEP 09 DELIVERABLE SHEET — QA/QC
## Key Visual: Hồ Sơ Đầu Ra Bàn Giao — Báo Cáo Kiểm Soát Chất Lượng & Truy Vết
**Trạng Thái:** ĐÃ DUYỆT (100% ĐẠT TIÊU CHUẨN KỸ THUẬT BÀN GIAO QA/QC)  
**Tập Tin Gốc:** [deliverable_qaqc_audit_sheet_master.jpg](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/images/deliverable_qaqc_audit_sheet_master.jpg)  
**Tập Tin WebP:** [deliverable_qaqc_audit_sheet_1920.webp](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/images/deliverable_qaqc_audit_sheet_1920.webp)

---

## 1. THÔNG SỐ KỸ THUẬT & DANH MỤC BIẾN THỂ (EXPORT ASSETS)

| Tên Tệp | Độ Phân Giải (px) | Tỷ Lệ | Định Dạng | Dung Lượng | Mục Đích Sử Dụng |
| :--- | :---: | :---: | :---: | :---: | :--- |
| `deliverable_qaqc_audit_sheet_master.jpg` | $1376 \times 768$ | 16:9 | JPEG | ~648 KB | Bản gốc lưu trữ chất lượng cao |
| `deliverable_qaqc_audit_sheet_1920.webp` | $1920 \times 1072$ | 16:9 | WebP | ~113 KB | Màn hình lớn Retina / Desktop 4K |
| `deliverable_qaqc_audit_sheet_1600.webp` | $1600 \times 893$ | 16:9 | WebP | ~126 KB | Desktop tiêu chuẩn ($1440\text{p} - 1600\text{p}$) |
| `deliverable_qaqc_audit_sheet_1280.webp` | $1280 \times 714$ | 16:9 | WebP | ~95 KB | Laptop phổ thông ($1024\text{p} - 1280\text{p}$) |
| `deliverable_qaqc_audit_sheet_mobile.webp` | $432 \times 768$ | 9:16 | WebP | ~39 KB | Giao diện điện thoại di động thông minh |

---

## 2. CẤU TRÚC KỸ THUẬT CỦA BÁO CÁO QA/QC (4 GRAPHIC MODULES)

Báo cáo kiểm soát chất lượng dữ liệu được tổ chức thành 4 phân hệ đồ họa khoa học:
1. **Module 1 — Độ phủ vệt bay (Flight Path Coverage Completeness):**
   - Sơ đồ kiểm tra độ phủ dải quét (*clean swath overlap*) đảm bảo cảm biến quang học không bỏ sót bất kỳ góc chết nào trên toàn bộ diện tích bãi chôn lấp.
2. **Module 2 — Kiểm chuẩn cảm biến trước–sau ca bay (Optical Sensor Calibration Drift Check):**
   - Biểu đồ thời gian kiểm tra độ trôi tín hiệu (*zero/span drift timeline*) trước khi cất cánh và sau khi hạ cánh, chứng minh cảm biến quang học hoạt động ổn định trong dải đo cho phép.
3. **Module 3 — Tính đầy đủ của dữ liệu gió (Wind Vector Completeness Polar Plot):**
   - Biểu đồ hoa gió khí tượng cực tọa độ ghi nhận tốc độ và hướng gió liên tục từ trạm đo khí tượng, bảo đảm điều kiện khí quyển đạt chuẩn cho mô hình phát tán.
4. **Module 4 — Chuỗi truy vết dữ liệu khép kín (Structured Data Traceability Workflow):**
   - Sơ đồ truy vết 4 bước: Nhãn thời gian GNSS Timestamp $\rightarrow$ Tín hiệu quang học thô Raw Optical Signal $\rightarrow$ Tọa độ chuẩn xác RTK Positioning $\rightarrow$ Trạng thái phê duyệt QA/QC Validation Status.
5. **Ranh giới nội dung tuyệt đối:** Không viết đoạn văn mô tả hư cấu, không tự tạo con dấu chứng nhận xanh giả tạo, giữ vững tính nghiêm túc của hồ sơ thẩm định bên thứ ba.
