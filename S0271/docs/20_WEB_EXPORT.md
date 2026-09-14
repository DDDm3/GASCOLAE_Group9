# S0271 — SPECIFICATION & DEPLOYMENT MANIFEST: STEP 20 WEB EXPORT
## Bảng Kê Xuất Bản Web Đa Nền Tảng (Multi-Platform Web Export Manifest)
**Dự Án:** GASCOLAE S0271 — Đo hiệu quả giảm phát thải CO₂ bằng UAV tại bãi chôn lấp  
**Trạng Thái:** ĐÃ XUẤT BẢN HOÀN TẤT (113 FILES, TỔNG DUNG LƯỢNG ~69.9 MB)  
**Thư Mục Triển Khai:** [d:\Work\CT-group\GASCOLAE_Group9\S0271\asset\web_export](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/web_export)  
**Tập Tin Cấu Hình JSON:** [s0271_web_manifest.json](file:///d:/Work/CT-group/GASCOLAE_Group9/S0271/asset/web_export/s0271_web_manifest.json)

---

## 1. TỔNG QUAN HỆ THỐNG XUẤT BẢN (DEPLOYMENT ARCHITECTURE)

Hệ thống tài nguyên số phục vụ phát triển giao diện Web của dịch vụ **GASCOLAE S0271** được đóng gói đồng bộ theo chuẩn hiện đại (*Next-Gen Web Standards*):
1. **Hình ảnh tĩnh (Static Imagery):**
   - Định dạng thế hệ mới **AVIF** (`libaom-av1`) và **WebP** (`Pillow`) cho tỷ lệ nén vượt trội, tải cực nhanh.
   - Bản gốc chất lượng cao **JPEG Master** đóng vai trò fallback cho các trình duyệt cũ.
   - Bộ responsive hoàn chỉnh: **1920p** (Desktop Retina / 4K), **1280p** (Laptop / Tablet), và **Mobile Crop 9:16** (Smartphone).
2. **Video vòng lặp (Looping Video Variants):**
   - **Dual-Codec Pipeline:** Song song **MP4 (H.264 High Profile)** và **WebM (VP9)**.
   - Đa phân giải: **1080p Master** (chất lượng studio), **720p Optimized** (tiết kiệm băng thông), và **Mobile Crop 9:16 (720x1280)** cho màn hình dọc.
   - Thuộc tính bắt buộc: `muted`, không có audio track thừa, hỗ trợ `autoplay loop playsinline`.
   - **Poster Frame:** Mỗi video đều có ảnh bìa khởi động định dạng WebP + JPG trích xuất từ khung hình đầu tiên.

---

## 2. BẢNG MANIFEST CHI TIẾT TỪNG ASSET (WEB ASSET MANIFEST)

### 2.1. Nhóm Hình Ảnh Tĩnh (Static Imagery Matrix)

| Key Tên Tệp | Vị Trí Giao Diện (Section) | Tỷ Lệ (Desktop / Mobile) | Định Dạng AVIF | Định Dạng WebP | Fallback Master | Mobile Variant (9:16) |
| :--- | :--- | :---: | :--- | :--- | :--- | :--- |
| `s0271-hero` | Hero Section / Main Window | 16:9 / 9:16 | `s0271-hero-1920.avif` | `s0271-hero-1920.webp`<br>`s0271-hero-1280.webp` | `s0271-hero-master.jpg` | `s0271-hero-mobile.webp`<br>`s0271-hero-mobile.avif` |
| `s0271-expanded-map` | Spatial Overview / Territory Context | 16:9 / 9:16 | `s0271-expanded-map-1920.avif` | `s0271-expanded-map-1920.webp`<br>`s0271-expanded-map-1280.webp` | `s0271-expanded-map-master.jpg` | `s0271-expanded-map-mobile.webp`<br>`s0271-expanded-map-mobile.avif` |
| `s0271-problem` | Problem Editorial / Invisible Plume | 16:9 / 9:16 | `s0271-problem-1920.avif` | `s0271-problem-1920.webp`<br>`s0271-problem-1280.webp` | `s0271-problem-master.jpg` | `s0271-problem-mobile.webp`<br>`s0271-problem-mobile.avif` |
| `s0271-baseline` | Baseline Survey / Pre-Remediation | 16:9 / 9:16 | `s0271-baseline-1920.avif` | `s0271-baseline-1920.webp`<br>`s0271-baseline-1280.webp` | `s0271-baseline-master.jpg` | `s0271-baseline-mobile.webp`<br>`s0271-baseline-mobile.avif` |
| `s0271-confirmation` | Confirmation Audit / Post-Remediation | 16:9 / 9:16 | `s0271-confirmation-1920.avif` | `s0271-confirmation-1920.webp`<br>`s0271-confirmation-1280.webp` | `s0271-confirmation-master.jpg` | `s0271-confirmation-mobile.webp`<br>`s0271-confirmation-mobile.avif` |
| `s0271-deliverable-map` | Deliverables / CH4 Spatial GIS Map | 16:9 / 9:16 | `s0271-deliverable-map-1920.avif` | `s0271-deliverable-map-1920.webp`<br>`s0271-deliverable-map-1280.webp` | `s0271-deliverable-map-master.jpg` | `s0271-deliverable-map-mobile.webp`<br>`s0271-deliverable-map-mobile.avif` |
| `s0271-deliverable-qaqc` | Deliverables / QA-QC Audit Dossier | 16:9 / 9:16 | `s0271-deliverable-qaqc-1920.avif` | `s0271-deliverable-qaqc-1920.webp`<br>`s0271-deliverable-qaqc-1280.webp` | `s0271-deliverable-qaqc-master.jpg` | `s0271-deliverable-qaqc-mobile.webp`<br>`s0271-deliverable-qaqc-mobile.avif` |
| `s0271-level-1` | Service Level 1 / Rapid Screening | 16:9 / 9:16 | `s0271-level-1-1920.avif` | `s0271-level-1-1920.webp`<br>`s0271-level-1-1280.webp` | `s0271-level-1-master.jpg` | `s0271-level-1-mobile.webp`<br>`s0271-level-1-mobile.avif` |
| `s0271-level-2` | Service Level 2 / Full Quantification | 16:9 / 9:16 | `s0271-level-2-1920.avif` | `s0271-level-2-1920.webp`<br>`s0271-level-2-1280.webp` | `s0271-level-2-master.jpg` | `s0271-level-2-mobile.webp`<br>`s0271-level-2-mobile.avif` |
| `s0271-level-3` | Service Level 3 / Multi-Site Regional | 16:9 / 9:16 | `s0271-level-3-1920.avif` | `s0271-level-3-1920.webp`<br>`s0271-level-3-1280.webp` | `s0271-level-3-master.jpg` | `s0271-level-3-mobile.webp`<br>`s0271-level-3-mobile.avif` |

---

### 2.2. Nhóm Video Vòng Lặp Vi Mô & Phim Hero (Video Media Matrix)

| Key Tên Tệp | Vị Trí Nhúng Giao Diện | Thời Lượng | Bản Master 1080p | Bản Tối Ưu 720p | Bản Di Động 9:16 | Poster Khởi Động |
| :--- | :--- | :---: | :--- | :--- | :--- | :--- |
| `s0271-video-hero` | Hero Header / Background Cinematic | 3.0s | `s0271-video-hero-1080p.mp4`<br>`s0271-video-hero-1080p.webm` | `s0271-video-hero-720p.mp4`<br>`s0271-video-hero-720p.webm` | `s0271-video-hero-mobile.mp4`<br>`s0271-video-hero-mobile.webm` | `s0271-video-hero-poster.webp`<br>`s0271-video-hero-poster.jpg` |
| `s0271-video-technology` | Section Drone Hardware / Core Specs | 6.0s | `s0271-video-technology-1080p.mp4`<br>`s0271-video-technology-1080p.webm` | `s0271-video-technology-720p.mp4`<br>`s0271-video-technology-720p.webm` | `s0271-video-technology-mobile.mp4`<br>`s0271-video-technology-mobile.webm` | `s0271-video-technology-poster.webp`<br>`s0271-video-technology-poster.jpg` |
| `s0271-video-journey` | Section Quy Trình 5 Bước Khảo Sát | 12.5s | `s0271-video-journey-1080p.mp4`<br>`s0271-video-journey-1080p.webm` | `s0271-video-journey-720p.mp4`<br>`s0271-video-journey-720p.webm` | *Responsive Scale Center* | `s0271-video-journey-poster.webp`<br>`s0271-video-journey-poster.jpg` |
| `s0271-video-before-after` | Section Minh Chứng Hiệu Quả Xử Lý | 8.0s | `s0271-video-before-after-1080p.mp4`<br>`s0271-video-before-after-1080p.webm` | `s0271-video-before-after-720p.mp4`<br>`s0271-video-before-after-720p.webm` | *Responsive Scale Center* | `s0271-video-before-after-poster.webp`<br>`s0271-video-before-after-poster.jpg` |
| `s0271-video-deliverable-map` | Section Lập Bản Đồ GIS Không Gian | 5.0s | `s0271-video-deliverable-map-1080p.mp4`<br>`s0271-video-deliverable-map-1080p.webm` | `s0271-video-deliverable-map-720p.mp4`<br>`s0271-video-deliverable-map-720p.webm` | *Responsive Scale Center* | `s0271-video-deliverable-map-poster.webp`<br>`s0271-video-deliverable-map-poster.jpg` |
| `s0271-video-cta` | Section Đặt Lịch Khảo Sát (CTA Portal) | 6.0s | `s0271-video-cta-1080p.mp4`<br>`s0271-video-cta-1080p.webm` | `s0271-video-cta-720p.mp4`<br>`s0271-video-cta-720p.webm` | `s0271-video-cta-mobile.mp4`<br>`s0271-video-cta-mobile.webm` | `s0271-video-cta-poster.webp`<br>`s0271-video-cta-poster.jpg` |

---

## 3. HƯỚNG DẪN TÍCH HỢP CODE WEB CHUẨN MỰC (CODE SNIPPETS)

### 3.1. Nhúng Hình Ảnh Tĩnh Tối Ưu Hóa Tự Động (Responsive `<picture>`)
Đoạn mã mẫu triển khai hình ảnh Hero với tầng ưu tiên: **AVIF $\rightarrow$ WebP $\rightarrow$ Fallback JPG** và hỗ trợ giao diện di động:

```html
<picture class="hero-window-frame">
  <!-- 1. Mobile Display (dưới 768px): AVIF -> WebP -> JPG -->
  <source media="(max-width: 767px)" srcset="/asset/web_export/s0271-hero-mobile.avif" type="image/avif">
  <source media="(max-width: 767px)" srcset="/asset/web_export/s0271-hero-mobile.webp" type="image/webp">
  
  <!-- 2. Desktop Display (từ 768px trở lên): AVIF -> WebP -->
  <source media="(min-width: 768px)" srcset="/asset/web_export/s0271-hero-1920.avif" type="image/avif">
  <source media="(min-width: 768px)" srcset="/asset/web_export/s0271-hero-1920.webp" type="image/webp">
  
  <!-- 3. Fallback hình ảnh gốc cho trình duyệt cũ -->
  <img src="/asset/web_export/s0271-hero-master.jpg" 
       alt="UAV công nghiệp quan trắc phát thải khí methane tại bãi chôn lấp hợp vệ sinh GASCOLAE S0271" 
       loading="eager" 
       decoding="async" 
       width="1920" 
       height="1080" 
       class="img-editorial-cover">
</picture>
```

---

### 3.2. Nhúng Video Vòng Lặp Liền Mạch (Responsive HTML5 `<video>`)
Đoạn mã mẫu triển khai Video nền Hero hoặc CTA Portal:

```html
<div class="video-portal-wrapper">
  <video autoplay 
         loop 
         muted 
         playsinline 
         preload="metadata"
         poster="/asset/web_export/s0271-video-hero-poster.webp" 
         class="bg-video-stream">
         
    <!-- Nguồn WebM chuẩn VP9 hiệu năng cao -->
    <source src="/asset/web_export/s0271-video-hero-1080p.webm" type="video/webm">
    
    <!-- Nguồn MP4 H.264 tương thích 100% mọi trình duyệt -->
    <source src="/asset/web_export/s0271-video-hero-1080p.mp4" type="video/mp4">
    
    <!-- Fallback hình ảnh nếu người dùng tắt autoplay hoặc thiết bị tiết kiệm dữ liệu -->
    <img src="/asset/web_export/s0271-video-hero-poster.jpg" alt="GASCOLAE S0271 Video Preview">
  </video>
</div>
```

---

## 4. CHÍNH SÁCH MÁY CHỦ & TỐI ƯU HÓA CDN (SERVER & CDN GUIDELINES)

1. **Cấu hình MIME Types chính xác trên Web Server (Nginx / Apache / Cloudflare):**
   - `.avif` $\rightarrow$ `image/avif`
   - `.webp` $\rightarrow$ `image/webp`
   - `.webm` $\rightarrow$ `video/webm`
   - `.mp4` $\rightarrow$ `video/mp4`
2. **Bộ Nhớ Đệm Trình Duyệt (Cache-Control Headers):**
   - Đối với tài nguyên phiên bản cố định trong `web_export/`: `Cache-Control: public, max-age=31536000, immutable`.
3. **Chỉ Số Core Web Vitals:**
   - Việc chuyển đổi sang AVIF/WebP giúp kích thước hình ảnh trung bình giảm từ ~1 MB xuống còn $110 - 250\text{ KB}$, đảm bảo điểm số **LCP (Largest Contentful Paint) < 1.2s** và **CLS (Cumulative Layout Shift) = 0**.

---

## 5. KẾT THÚC CHU TRÌNH 20 BƯỚC (PROJECT PIPELINE COMPLETION)
Dự án **GASCOLAE S0271** đã hoàn thành xuất sắc toàn bộ 20 bước sản xuất tư liệu truyền thông thị giác từ `01_visual_bible.md` đến `20_web_export.md`. Toàn bộ kho lưu trữ tài liệu kỹ thuật, mã nguồn render, thư viện hình ảnh và video đã được lưu trữ an toàn, phục vụ trực tiếp cho quá trình xây dựng trang Web và tài liệu đàm phán thương mại.
