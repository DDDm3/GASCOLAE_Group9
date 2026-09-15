# Website S0283

Landing page HTML/CSS/JavaScript thuần cho dịch vụ theo dõi thay đổi thảm thực vật của GASCOLAE. Toàn bộ mã và tài nguyên public nằm trong `src`.

## Chạy bằng HTTP local

Từ thư mục project hoặc thư mục giải nén gói bàn giao:

```powershell
python -m http.server 8000 --bind 127.0.0.1 --directory src
```

Mở `http://127.0.0.1:8000/`. Lệnh này chỉ dành cho phát triển local và chỉ phục vụ nội dung trong `src`.

## Cấu trúc

- `src/index.html`: nội dung và cấu trúc semantic.
- `src/css/styles.css`: giao diện, responsive, focus và reduced motion.
- `src/js/main.js`: menu mobile, bộ so sánh hai kỳ và validation form demo.
- `src/assets/`: 8 ảnh, 4 biến thể logo và 1 video đã được trang tham chiếu.
- `tests/`: kiểm thử chức năng, HTTP và audit source.
- `docs/handoff.md`: hướng dẫn vận hành, thay tài sản và các giới hạn trước phát hành.

## Kiểm thử

```powershell
node --check src/js/main.js
node --test tests/functional.test.js
python tests/static_http_test.py
python tests/quality_audit_test.py
```

`quality_audit_test.py` cần Pillow. Các test còn lại chỉ dùng standard library của Node/Python.

## Trạng thái bàn giao

- Header có menu responsive; hero, footer và toàn bộ section đã hoàn thiện theo thiết kế hiện tại.
- Bộ so sánh ảnh hoạt động ở 0–100% và có fallback khi JavaScript tắt.
- Form là bản demo: chỉ kiểm tra dữ liệu trong trình duyệt và không gửi request.
- Ba gói hiển thị giá đề xuất 65/165/420 triệu VNĐ; báo giá chính thức vẫn chốt theo phạm vi và điều khoản thực tế.
- Bộ test tự động hiện đạt 23/23. Kiểm thử render/browser, Lighthouse và Core Web Vitals chưa chạy vì môi trường bàn giao không có browser.
- Đây là prototype sẵn sàng để review local. Xem các blocker trước phát hành trong `docs/handoff.md`.
