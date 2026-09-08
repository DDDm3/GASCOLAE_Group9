# Prompt Kỹ thuật: Tạo Landing Page Dịch vụ S0269 (Albedo & Khí hậu)

**Vai trò của bạn:** Bạn là một Frontend Engineer xuất sắc, am hiểu thiết kế UI/UX hiện đại.

**Nhiệm vụ:**
Phát triển một trang Landing Page (HTML/CSS/JS) cho dịch vụ "Đánh giá độ phản xạ mặt đất & Albedo cho nghiên cứu khí hậu" (S0269) của công ty GASCOLAE.

## 1. Yêu cầu Cấu trúc Nền tảng (Architecture)
- Không dùng Framework. Viết code thuần (Vanilla) bằng HTML5, CSS3, Javascript (ES6).
- **Cấu trúc Module**: Bắt buộc tổ chức mã nguồn rõ ràng thay vì gộp chung.
  - `src/index.html` (chứa toàn bộ cấu trúc ngữ nghĩa semantic)
  - `src/css/tokens.css` (chứa CSS variables cho màu sắc, góc bo, đổ bóng)
  - `src/css/base.css` (reset css, typography, container, lưới grid)
  - `src/css/main.css` (kết nối các component)
  - `src/css/components/*.css` (tách riêng CSS cho navbar, hero, cards, faq, form)
  - `src/js/main.js` (xử lý sự kiện scroll, accordion)
  - Thư mục `assets/` để chứa logo, video nền và các ảnh minh họa.

## 2. Ngôn ngữ Thiết kế & UI/UX (Bắt buộc tuân thủ)
Lấy cảm hứng trực tiếp từ thiết kế website **Wing.com**:
- **Không gian (Whitespace):** Cực kỳ rộng rãi, tạo cảm giác thanh thoát, đậm chất công nghệ tương lai.
- **Hình khối (Shapes):** 
  - Các nút bấm (CTA) và thanh Menu (Navbar) phải dùng thiết kế **Pill-shaped** (`border-radius: 999px`) nổi bồng bềnh.
  - Các thẻ nội dung (Cards) dùng bo góc siêu lớn (`border-radius: 24px` đến `32px`).
- **Màu sắc (Colors):**
  - Màu nền chính: Trắng ngà (Off-white / `#f8f9fa`)
  - Màu thẻ: Trắng tinh hoặc các dải màu Pastel cực nhẹ (Mint, Soft Yellow, Soft Blue, Soft Amber) để phân vùng thông tin.
  - Màu nhấn (Accent): Vàng tươi (như `#FFD500`) hoặc Xanh dương đặc trưng của GASCOLAE.
- **Bố cục Lưới (Bento Grid):** Không dùng các thẻ chữ nhật bằng nhau chằn chặn. Áp dụng lưới bất đối xứng (Bento) cho phần "Thực trạng" và "Lợi ích", ví dụ thẻ to chiếm 2 cột, thẻ nhỏ chiếm 1 cột đan xen nhau.
- **Kiểu chữ (Typography):** Bắt buộc sử dụng font **Plus Jakarta Sans** cho toàn bộ trang (Heading và Body) để đảm bảo hiển thị hoàn hảo dấu tiếng Việt, mang lại cảm giác geometric hiện đại. Không dùng Outfit hay Inter vì lỗi render.

## 3. Nội dung Cấu phần (Sections)
Dựa vào file nội dung gốc, xây dựng các khối sau:

1. **Floating Navbar**: Nổi ở lề trên, nền kính mờ (glassmorphism), tự co lại và đổ bóng khi cuộn. Logo SVG cần được phóng to và kéo sát lề trái bằng `margin-left` âm rất lớn (ví dụ `-90px`) hoặc `transform: scale() transform-origin: left` để triệt tiêu toàn bộ khoảng trắng thừa của file ảnh gốc.
2. **Video Hero Section**:
   - Sử dụng thẻ `<video autoplay loop muted playsinline>` làm background phủ kín màn hình (100vh). Nguồn video lấy từ thư mục `assets/`.
   - Có lớp phủ (overlay) tối mờ mượt mà.
3. **Thực trạng & Lợi ích (Bento Grid)**: Trình bày các vấn đề thiếu hụt dữ liệu vệ tinh vs lợi ích độ phân giải centimet từ UAV. Dùng background pastel xen kẽ trắng.
4. **Giải pháp Tổng quan**: Khối nổi bật với nền màu tối đậm (Deep Blue), chữ căn giữa.
5. **Tính năng (Capabilities)** & **Sản phẩm Bàn giao (Deliverables)**:
   - Các thẻ card phải được chia làm 2 nửa: Nửa trên (chiếm khoảng 140px-160px chiều cao) là **Hình ảnh minh họa** (Image Placeholder hoặc Gradient block) chiếm trọn chiều rộng (`object-fit: cover`).
   - Nửa dưới là padding chứa nội dung văn bản. Thiết kế này tạo trọng lượng thị giác lớn, xịn xò như các trang SaaS cao cấp, tránh cảm giác thẻ chỉ có toàn chữ trống trải.
6. **Tình huống sử dụng (Use Cases)** & **Lợi thế Cạnh tranh (Why Us)**: 
   - Ứng dụng thủ pháp **Typographic Numbering**: Số thứ tự (1, 2, 3...) không được dùng kiểu dấu chấm tròn nhỏ bé truyền thống. Phải dùng số khổng lồ (font-size 80px) in chìm dưới nền gradient nửa trên của thẻ, hoặc số in đậm (font-weight: 800) kích thước 24px lồng trong các ô vuông màu Pastel có màu chữ tone-sur-tone đậm, tạo điểm nhấn nghệ thuật.
7. **Quy trình (How it works)**: Timeline dọc, phông chữ cực lớn đánh số 01-06.
8. **Các Gói Dịch Vụ (Packages)**: Thẻ giá phân tầng Level 1, 2, 3. Đánh dấu thẻ Level 2 là "PHỔ BIẾN" bằng badge nổi bật viền màu vàng.
9. **FAQ**: Tạo khối Accordion bằng Vanilla Javascript.
10. **Form Liên hệ**: Có bo góc lớn, bóng đổ mịn. Không sử dụng chatbot hay popup rườm rà.

## 4. Yêu cầu Responsive
- Trên thiết bị Mobile (<900px): Toàn bộ cấu trúc lưới 3-4 cột phải xếp chồng (stack dọc) thành 1 cột.
- Hero Section phải canh chỉnh khối chữ về chính giữa (center) thay vì bám phải như Desktop.
- Ẩn hoàn toàn chữ trên Navbar, chỉ để lại Logo và nút CTA.
- Giảm kích thước Padding trong các thẻ Card xuống 24px để tối ưu không gian hiển thị dọc.

**Tiến hành:** Vui lòng bắt đầu bằng việc khởi tạo cấu trúc thư mục, CSS Tokens và lập trình HTML/CSS cho từng khối.
