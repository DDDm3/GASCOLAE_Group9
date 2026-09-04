# Responsive UI Audit — Header & Hero (S0285-S0287)
## Đánh giá và lập bản đồ hấp thụ carbon trong sinh khối rừng
### Technical Audit & Responsive Recomposition Plan | Phase 09 Artifact

> **Mục tiêu của tài liệu kiểm toán:**  
> Rà soát toàn diện các khiếm khuyết bố cục và phản hồi giao diện (Responsive & Layout Issues) trên Header và Hero ở cả hai chế độ Desktop và Mobile; xác định nguyên nhân gốc rễ (Root Causes); lập danh mục tệp tin ảnh hưởng và xây dựng phương án tái cấu trúc giao diện (Layout Recomposition) theo 4 trạng thái màn hình chuẩn mà không làm thay đổi nội dung kỹ thuật, ranh giới MRV hay phát sinh giá cả.

---

## 1. Bảng Tổng hợp 12 Vấn đề Cốt lõi & Phân tích Chi tiết (Audit Findings)

| # | Vấn đề được xác định | Biểu hiện thực tế trên giao diện | Mức độ nghiêm trọng |
|---|---|---|---|
| **1** | **Desktop Header quá tải (Overcrowded Header)** | Thanh điều hướng nhồi nhét tới 10 liên kết (`<ul>`) cùng logo, mã dịch vụ và nút CTA trên một hàng ngang. | **CRITICAL** |
| **2** | **Nhãn điều hướng bị rớt dòng (Navigation Wrapping)** | Ở các độ phân giải laptop tiêu chuẩn (1024px – 1366px), các mục như "Ranh giới MRV", "Bản đồ 3D", "Gói dịch vụ" bị bẻ thành 2 dòng, làm vỡ chiều cao header. | **CRITICAL** |
| **3** | **Nút CTA Header bị cắt/tràn (Header CTA Clipped)** | Nút "Đăng ký tư vấn" nằm cuối danh sách thẻ `<li>` trong flex container. Khi menu bị ép chiều ngang, nút này bị đẩy sát lề phải hoặc bị xén mất chữ. | **CRITICAL** |
| **4** | **Phân cấp Logo & Service ID mờ nhạt (Poor Brand Hierarchy)** | Thẻ `S0285-S0287` đặt ngang hàng với logo chỉ ngăn cách bởi một đường kẻ mỏng 1px và font chữ nhỏ xám (`#4e7a9a`), thiếu sự tương phản phân cấp thương hiệu. | **MEDIUM** |
| **5** | **Mobile Menu thiếu mẫu điều hướng chuẩn (Mobile Nav Pattern)** | Menu di động chỉ là dropdown phủ dạng `position: absolute; top: 100%`, thiếu hiệu ứng backdrop mờ, không có ngăn kéo (slide drawer) toàn màn hình và thiếu nút CTA toàn chiều rộng (full-width CTA). | **HIGH** |
| **6** | **Hero Desktop lãng phí không gian bên phải (Unused Right Hero)** | Khối `.hero__content` bị giới hạn `max-width: 780px` nằm đơn độc bên trái container 1280px; toàn bộ ~500px khoảng trống bên phải bị bỏ hoang màu đen. | **HIGH** |
| **7** | **Hero Mobile bị nén ép thay vì tái bố cục (Hero Compressed on Mobile)** | Trên màn hình di động, Hero giữ nguyên chiều cao `min-height: 90vh` cùng lề đệm cố định khổng lồ (`padding-top/bottom: 64px`), ép người dùng phải cuộn sâu mà không thấy được nội dung trọng tâm. | **HIGH** |
| **8** | **Tiêu đề H1 ngắt dòng vụn vỡ (H1 Poor Wrapping on Mobile)** | Tiêu đề 19 chữ tiếng Việt không có cấu trúc phân tầng (Eyebrow / Main / Accent), bị ngắt dòng tự do thành 5-6 dòng lộn xộn trên màn hình 375px – 430px. | **HIGH** |
| **9** | **Nút CTA Hero bị méo/tràn viền trên Mobile (Hero CTA Clipping)** | Cặp nút bấm Hero dùng `padding: 16px 32px` với `min-width: 44px` và `flex-wrap: wrap`. Trên màn hình hẹp 375px, nút không đủ không gian co giãn, gây lệch trục hoặc tràn viền ngang. | **HIGH** |
| **10** | **Tồn tại các quy tắc kích thước cố định (Fixed-Width/Fixed-Position Rules)** | Sử dụng các giá trị cố định như `height: 640px` cho viewport 3D, `gap: var(--space-6)` (24px) giữa các nav item, và `grid-template-columns: 5fr 7fr` không tự co giãn. | **MEDIUM** |
| **11** | **Chưa tận dụng 3D cho bên phải Hero (Unused 3D in Desktop Hero)** | Cảnh Three.js hiện tại chỉ nằm tập trung ở phân đoạn S05 (`#interactive-3d`), trong khi Hero desktop hoàn toàn thiếu vắng trực quan 3D để tạo ấn tượng công nghệ viễn thám ngay từ màn hình đầu tiên. | **HIGH** |
| **12** | **Mobile Hero cần bố cục 1 cột độc lập (One-Column Mobile Recomposition)** | Mobile Hero hiện tại là bản thu nhỏ (scale-down) của Desktop thay vì một bố cục 1 cột tối ưu: Chữ $	o$ 3D Visual $	o$ Full-width CTA. | **HIGH** |

---

## 2. Phân tích Nguyên nhân Gốc rễ (Root Causes Analysis)

### 2.1 Tại Header:
1. **Thiếu kiến trúc 3 vùng độc lập (Lack of 3-Zone Architecture):**
   - Hiện tại, `.navbar__inner` chỉ dùng `display: flex; justify-content: space-between;`.
   - Nút CTA (`.navbar__link--cta`) bị nhét vào bên trong thẻ `<ul>` của menu điều hướng thay vì tách biệt thành một vùng Action riêng (`.navbar__actions`).
   - Danh sách menu chứa quá nhiều mục phụ (10 mục): gom cả những mục mang tính chất tham chiếu chuyên sâu như "Sản phẩm", "Ranh giới MRV" vào thanh điều hướng chính.
2. **Khoảng cách và khoảng đệm cứng (Rigid Spacing & Gap):**
   - `navbar.css` thiết lập `gap: var(--space-6)` (tức 24px) cố định giữa các thẻ `<li>`. Với 10 mục, riêng khoảng cách đã chiếm $9 	imes 24	ext{px} = 216	ext{px}$, cộng với chiều dài chữ khoảng $850	ext{px}$, logo $180	ext{px}$, tổng chiều rộng vượt quá $1246	ext{px}$, khiến vỡ dòng ngay khi màn hình co dưới $1300	ext{px}$.
3. **Điểm ngắt (Breakpoint) không đồng bộ:**
   - Điểm ngắt menu di động đang đặt ở `@media (max-width: 960px)`. Trong khoảng từ $961	ext{px}$ đến $1200	ext{px}$ (laptop nhỏ/tablet xoay ngang), menu vẫn bị ép hiển thị chế độ desktop 10 mục, gây ra lỗi hiển thị nghiêm trọng.

### 2.2 Tại Hero:
1. **Bố cục đơn khối không có lưới chia cột (Single Block vs CSS Grid):**
   - Phân đoạn `#hero` chỉ chứa một khối duy nhất `.hero__content` với `max-width: 780px`. Không có cấu trúc lưới 2 cột (`grid-template-columns: 1fr 1fr` hoặc `7fr 5fr`).
   - Khối canvas 3D `.hero__canvas-container` được khai báo trong CSS dạng `position: absolute; width: 100%; height: 100%` nhưng thực tế không được render trong DOM của `#hero`.
2. **Tiêu đề H1 thiếu phân cấp ngữ nghĩa (Monolithic H1):**
   - Tiêu đề H1 là một chuỗi văn bản thuần túy duy nhất: `"Đánh giá và Lập bản đồ Hấp thụ Carbon Sinh khối Rừng bằng Công nghệ UAV LiDAR"`. Khi co màn hình, thuật ngữ dài như `"Carbon"`, `"LiDAR"`, `"Đánh giá và Lập bản đồ"` bị ngắt dòng ngẫu nhiên.
3. **Kích thước nút bấm và lề đệm di động không tương thích:**
   - `.btn--primary` sử dụng padding lề ngang lên tới $32	ext{px}$ (`var(--space-8)`). Khi kết hợp 2 nút cạnh nhau trong `display: flex`, tổng độ rộng cần thiết vượt quá $340	ext{px}$, trong khi màn hình iPhone SE (375px) trừ đi $32	ext{px}$ lề đệm hai bên chỉ còn $343	ext{px}$ không gian khả dụng, gây chèn ép hoặc tràn mép.

---

## 3. Danh mục Tệp tin Liên quan (Files Involved)

1. **Cấu trúc HTML:**
   - [`src/index.html`](file:///d:/Work/CT-group/GASCOLAE_Group9/S0285-S0287/src/index.html) & [`index.html`](file:///d:/Work/CT-group/GASCOLAE_Group9/S0285-S0287/index.html):
     - Rút gọn danh sách `<ul id="navbar-menu">` từ 10 xuống đúng 7 mục chính.
     - Tách nút CTA Header ra khỏi thẻ `<ul>`, đưa vào khối `.navbar__actions` độc lập.
     - Tái cấu trúc phân cấp thẻ thương hiệu: Logo GASCOLAE nổi bật, Service ID `S0285-S0287` ở cấp thứ cấp rõ ràng.
     - Tái cấu trúc `#hero` thành lưới 2 cột: Cột trái (Nội dung chữ phân tầng) và Cột phải (Khung 3D Viewport).
     - Phân tầng H1 thành 3 thành phần ngữ nghĩa: Eyebrow Tag, Main Title và Accent Method.
2. **Định kiểu CSS:**
   - [`src/css/tokens.css`](file:///d:/Work/CT-group/GASCOLAE_Group9/S0285-S0287/src/css/tokens.css): Bổ sung các token chiều rộng phản hồi, độ cao thanh điều hướng, tỷ lệ chữ fluid clamp.
   - [`src/css/base.css`](file:///d:/Work/CT-group/GASCOLAE_Group9/S0285-S0287/src/css/base.css): Cập nhật quy tắc clamp cho H1, H2 và vùng chứa container linh hoạt.
   - [`src/css/components/navbar.css`](file:///d:/Work/CT-group/GASCOLAE_Group9/S0285-S0287/src/css/components/navbar.css): Thiết lập lại bố cục 3 vùng (Logo / Nav / Action), kiểu dáng ngăn kéo di động toàn màn hình (Mobile Drawer), hiệu ứng hamburger.
   - [`src/css/components/buttons.css`](file:///d:/Work/CT-group/GASCOLAE_Group9/S0285-S0287/src/css/components/buttons.css): Quy định các nút bấm co giãn `btn--full-mobile`, min-height 48px cho cảm ứng.
   - [`src/css/main.css`](file:///d:/Work/CT-group/GASCOLAE_Group9/S0285-S0287/src/css/main.css): Xây dựng lưới 2 cột cho Hero desktop, chuyển đổi sang 1 cột tuần tự cho Mobile.
3. **Mã nguồn JavaScript & 3D:**
   - [`src/js/navbar.js`](file:///d:/Work/CT-group/GASCOLAE_Group9/S0285-S0287/src/js/navbar.js): Cải tiến logic đóng/mở drawer di động, khóa cuộn trang (`body.no-scroll`) khi mở menu, đóng khi bấm link hoặc backdrop.
   - [`src/js/main.js`](file:///d:/Work/CT-group/GASCOLAE_Group9/S0285-S0287/src/js/main.js): Khởi tạo và liên kết thực thể 3D ở Hero bên cạnh phân đoạn S05.
   - [`src/3d/scene.js`](file:///d:/Work/CT-group/GASCOLAE_Group9/S0285-S0287/src/3d/scene.js): Tối ưu hóa kích thước render, kiểm soát tỷ lệ phân giải và tải hạt điểm theo breakpoint.

---

## 4. Chiến lược Điểm ngắt Chuẩn hóa (Breakpoint Strategy)

Hệ thống sẽ hợp nhất toàn bộ dự án về **4 trạng thái phản hồi chuẩn mực**:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. LARGE DESKTOP (>= 1280px)                                                │
│    - Header 3 vùng hoàn chỉnh (Logo - 7 Nav Links - CTA Button)             │
│    - Hero 2 cột cân đối (55% Trái: Văn bản phân tầng | 45% Phải: 3D Viewport)│
│    - Khoảng cách padding thoải mái, Three.js 100% chi tiết                  │
├─────────────────────────────────────────────────────────────────────────────┤
│ 2. SMALL DESKTOP (1024px – 1279px)                                          │
│    - Header: Thu gọn gap còn 12px, font-size 13px, giữ 7 Nav Links          │
│    - Hero 2 cột gọn gàng (50% - 50%), text clamp tự động điều chỉnh         │
│    - Nút CTA Header đảm bảo không bao giờ bị tràn                           │
├─────────────────────────────────────────────────────────────────────────────┤
│ 3. TABLET (768px – 1023px)                                                  │
│    - Chuyển tiếp Header: Kích hoạt Hamburger Icon, ẩn Menu chính vào Drawer  │
│    - Nút CTA Header chuyển sang dạng gọn hoặc tích hợp trong Drawer         │
│    - Hero chuyển sang cấu trúc 2 cột tỷ lệ dọc hoặc 1 cột thoáng đãng       │
│    - Three.js giảm mật độ điểm (LOD trung bình)                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ 4. MOBILE (< 768px: kiểm thử tại 375px, 390px, 430px)                      │
│    - Header: Thanh bar cố định 56px (Logo + Tag nhỏ + Hamburger Icon)       │
│    - Drawer mở ra toàn màn hình với 7 liên kết lớn + Nút CTA Full-Width     │
│    - Hero 1 cột tuần tự: Eyebrow -> H1 -> Subheadline -> 3D Canvas -> CTAs  │
│    - Các nút bấm tự động co giãn full-width (`width: 100%`)                 │
│    - Triệt tiêu 100% nguy cơ tràn mép ngang (Zero Horizontal Overflow)      │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Giải pháp Kỹ thuật Đề xuất cho Bước 2 & Bước 3 (Proposed Solutions)

### 5.1 Tái thiết kế Header (Step 2 Solution):
- **Cắt giảm menu còn đúng 7 mục thiết yếu:**
  1. `Vấn đề` (`#problem`)
  2. `Phương pháp` (`#measurement`)
  3. `Bản đồ 3D` (`#interactive-3d`)
  4. `Quy trình` (`#workflow`)
  5. `Gói dịch vụ` (`#service-levels`)
  6. `FAQ` (`#faq`)
  7. `Trợ lý AI` (`#ai-agent`)
  *(Các mục "Sản phẩm", "Ranh giới MRV" được chuyển vào nội dung liên kết trong bài và footer).*
- **Bố cục 3 vùng bằng Flexbox:**
  ```html
  <header class="navbar">
    <div class="container navbar__inner">
      <div class="navbar__brand">...</div>
      <nav class="navbar__nav">...</nav>
      <div class="navbar__actions">
        <a href="#lead" class="btn btn--primary btn--sm">Tư vấn kỹ thuật</a>
      </div>
      <button class="navbar__toggle">...</button>
    </div>
  </header>
  ```
- **Phân cấp Logo & Tag:**
  - Logo SVG GASCOLAE: Chiều cao chuẩn 26px.
  - Service ID Tag: Đặt trong badge nhỏ bo góc gọn gàng (`border: 1px solid rgba(0, 196, 232, 0.3); background: rgba(0, 196, 232, 0.08); font-size: 11px; color: #00c4e8;`).
- **Ngăn kéo di động (Mobile Drawer):**
  - Chuyển từ dropdown lơ lửng sang Drawer trượt từ cạnh phải hoặc phủ toàn màn hình (`position: fixed; inset: 0; background: rgba(8, 13, 16, 0.98); backdrop-filter: blur(16px);`).
  - Nút đóng "×" rõ ràng, các liên kết có `font-size: 1.1rem; padding: 12px 0; border-bottom: 1px solid #1e3040;`.
  - Nút CTA full-width ở chân menu.

### 5.2 Tái thiết kế Hero (Step 3 Solution):
- **Lưới 2 cột cho Desktop:**
  ```css
  .hero__layout {
    display: grid;
    grid-template-columns: 1.15fr 0.85fr;
    gap: var(--space-8);
    align-items: center;
    min-height: calc(85vh - 70px);
  }
  ```
- **Phân cấp ngữ nghĩa cho H1 (Fluid Typography):**
  ```html
  <div class="hero__eyebrow">FOREST CARBON ASSESSMENT · UAV LiDAR</div>
  <h1 class="hero__headline">
    <span class="hero__headline-main">Đánh giá và lập bản đồ carbon sinh khối rừng</span>
    <span class="hero__headline-accent text-gradient">bằng công nghệ UAV LiDAR</span>
  </h1>
  ```
  - `hero__headline-main`: Font Space Grotesk, size clamp từ `1.85rem` đến `2.75rem`, line-height `1.2`.
  - `hero__headline-accent`: Font size clamp từ `1.5rem` đến `2.25rem`, màu gradient cyan/teal đặc trưng.
  - Tuyệt đối không dùng thẻ `<br>` cứng.
- **Tích hợp 3D vào bên phải Hero:**
  - Cột phải chứa một khung Three.js Canvas nhẹ nhàng (Hero Ambient Viewport) hiển thị hiện trạng rừng đồi núi và chùm quét UAV LiDAR bay tuần tra liên tục (State A/B).
  - Tương tác nhẹ nhàng, không cản trở việc đọc chữ.
- **Tái cấu trúc Hero Mobile 1 cột:**
  - Thứ tự tuần tự: Eyebrow $	o$ H1 $	o$ Đoạn mô tả $	o$ Khung 3D tương tác (chiều cao cố định $240	ext{px} - 280	ext{px}$) $	o$ Cụm nút CTA Full-Width xếp chồng theo chiều dọc (`flex-direction: column; width: 100%`).

---

## 6. Tiêu chí Kiểm định Cổng Bước 1 (Step 1 Gate Checklist)

| # | Tiêu chí kiểm tra | Đánh giá | Ghi chú |
|---|---|---|---|
| **1** | Xác định đầy đủ 12 vấn đề thực tế | **PASS** | Phân tích chi tiết biểu hiện và tác động trên cả Desktop và Mobile. |
| **2** | Chỉ rõ nguyên nhân gốc rễ và tệp tin liên quan | **PASS** | Định vị chính xác mã CSS/HTML gây ra hiện tượng tràn lề và ngắt dòng. |
| **3** | Xây dựng chiến lược 4 điểm ngắt chuẩn hóa | **PASS** | $\ge 1280	ext{px}$, $1024-1279	ext{px}$, $768-1023	ext{px}$, $<768	ext{px}$ (375px/390px/430px). |
| **4** | Không can thiệp sửa đổi tệp tin mã nguồn trước khi duyệt | **PASS** | Chưa sửa đổi bất kỳ tệp tin logic/mã nguồn nào trong Bước 1. |
| **5** | Bảo tồn nguyên vẹn nội dung kỹ thuật & ranh giới MRV | **PASS** | Giữ vững 100% tuyên bố khoa học và căn cứ pháp lý. |
| **6** | Tiêu chuẩn mã hóa UTF-8 tiếng Việt hoàn hảo | **PASS** | File đạt chuẩn UTF-8, `BOM=False`, không lỗi hiển thị tiếng Việt. |

---

**DỪNG LẠI (STOP):** Báo cáo kiểm toán Giai đoạn 09 (Bước 1) đã hoàn thành. Kính mời bạn xem xét và phê duyệt trước khi tiến hành Bước 2 (Header Redesign) và Bước 3 (Hero Redesign).
