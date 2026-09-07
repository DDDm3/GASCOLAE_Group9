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
  - `src/js/main.js` (xử lý sự kiện scroll, accordion, toggle AI agent)

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
- **Kiểu chữ (Typography):** Dùng font `Outfit` cho Heading (to, rõ ràng, bold) và font `Inter` cho body text.

## 3. Nội dung Cấu phần (Sections)
Dựa vào file nội dung gốc của S0269, xây dựng các khối sau:

1. **Floating Navbar**: Nổi ở lề trên, nền kính mờ (glassmorphism/backdrop-filter), tự co lại và có viền đổ bóng khi cuộn trang.
2. **Video Hero Section**:
   - Sử dụng thẻ `<video autoplay loop muted playsinline>` làm background phủ kín màn hình (100vh).
   - Có một lớp phủ (overlay) tối mờ để dễ đọc chữ.
   - Text đặt ở giữa, Headline chữ cực lớn có chứa từ khóa **UAV** tô màu gradient.
3. **Thực trạng & Lợi ích (Bento Grid)**: Trình bày các vấn đề thiếu hụt dữ liệu vệ tinh vs lợi ích độ phân giải centimet từ UAV. Dùng background pastel.
4. **Giải pháp Tổng quan**: Text căn giữa, nhấn mạnh khả năng "Cầu nối Hiệu chuẩn".
5. **Tính năng (Capabilities)**: Dạng Grid thẻ tĩnh với tiêu đề nổi bật.
6. **Tình huống sử dụng (Use Cases)**: Các thẻ mềm mại đánh số thứ tự nổi bật (1, 2, 3...).
7. **Quy trình (How it works)**: Timeline 6 bước dọc, phông chữ lớn đánh số 01-06.
8. **Các Gói Dịch Vụ (Packages)**: Thẻ giá phân tầng Level 1, 2, 3. Đánh dấu thẻ Level 2 là "Phổ biến" (màu Accent viền sáng).
9. **Sản phẩm Bàn giao (Deliverables)**: Hiển thị 4 loại bản đồ & báo cáo.
10. **Lợi thế Cạnh tranh (Why Us)**: Dùng lưới 2 cột.
11. **FAQ**: Tạo khối Accordion. Nội dung giải thích sự khác biệt giữa Albedo và Surface Reflectance, điều kiện bay...
12. **Form Liên hệ**: Có bo góc lớn, bóng đổ mịn, thu thập thông tin và có phần lưu ý không thu thập tài liệu mật.
13. **AI Agent Floating Block**: Một nút bấm hình tròn góc phải dưới màn hình. Khi bấm mở ra giao diện giả lập cửa sổ chat của "Trợ lý AI S0269", chứa 4 câu hỏi mồi sẵn.

## 4. Yêu cầu Responsive
- Trên thiết bị Mobile (<768px): Toàn bộ cấu trúc lưới 3-4 cột phải xếp chồng (stack dọc) thành 1 cột.
- Ẩn hoàn toàn chữ trên Navbar, chỉ để lại Logo và nút bấm thu nhỏ.
- Giảm kích thước Padding trong các thẻ Card từ 40px xuống 24px để tránh ngợp.
- Hero Section phải canh chỉnh để chữ không bị sát lề 2 bên màn hình điện thoại.

**Tiến hành:** Vui lòng bắt đầu bằng việc khởi tạo cấu trúc thư mục, CSS Tokens và Hero Section trước!
