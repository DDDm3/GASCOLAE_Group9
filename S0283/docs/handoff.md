# Bàn giao website S0283

Ngày bàn giao: 15/09/2026  
Trạng thái: **prototype sẵn sàng review local; chưa sẵn sàng phát hành production**.

## 1. Phạm vi bàn giao

Landing page tiếng Việt cho dịch vụ S0283 được xây dựng bằng HTML5, CSS3 và JavaScript thuần. Mã website và tài nguyên public nằm hoàn toàn trong `src`; không cần build hoặc framework.

Tính năng hiện có:

- Header sticky, điều hướng anchor, menu responsive, Escape và quản lý focus.
- Hero đối xứng, ảnh ưu tiên tải và video có controls, poster, không autoplay.
- Nội dung vấn đề/giải pháp, so sánh hai kỳ, kết quả, ứng dụng, quy trình, gói dịch vụ và FAQ native.
- Bộ so sánh range 0–100% với fallback hai ảnh khi JavaScript tắt.
- Form validation accessible ở chế độ demo; không gửi dữ liệu.
- Footer CTA và điều hướng cuối trang.

## 2. Chạy website

Yêu cầu: Python 3 hoặc một static HTTP server tương đương.

Từ thư mục chứa `src`:

```powershell
python -m http.server 8000 --bind 127.0.0.1 --directory src
```

Mở `http://127.0.0.1:8000/`. Không mở trực tiếp bằng `file://` vì hành vi và MIME có thể khác HTTP.

Web root khi triển khai phải là thư mục `src`, không phải thư mục project cha. Cách này tránh public `docs`, `tests`, prompt hoặc tài liệu nguồn.

## 3. Cấu trúc gói

```text
README.md
src/
  index.html
  css/styles.css
  js/main.js
  assets/images/
  assets/logo/
  assets/videos/
tests/
  functional.test.js
  static_http_test.py
  quality_audit_test.py
  README.md
docs/
  handoff.md
  test-report.md
  quality-audit.md
```

Gói không chứa workbook, báo giá, tài liệu Office nguồn, prompt, `.git`, `node_modules`, cache hoặc secret.

## 4. Thay tám ảnh

Các đường dẫn public đang dùng:

| File | Vị trí sử dụng | Kích thước hiện tại |
|---|---|---:|
| `src/assets/images/S0283_1.jpg` | Hero, poster video, ứng dụng 01 | 1024×572 |
| `src/assets/images/S0283_2.jpg` | Vấn đề và giải pháp | 1024×765 |
| `src/assets/images/S0283_3.jpg` | Kỳ gốc | 1024×572 |
| `src/assets/images/S0283_4.jpg` | Kỳ theo dõi | 1024×572 |
| `src/assets/images/S0283_5.jpg` | Bản đồ kết quả | 1024×765 |
| `src/assets/images/S0283_6.png` | Mẫu báo cáo | 1600×1205 |
| `src/assets/images/S0283_7.jpg` | Ứng dụng suy giảm tán | 1024×765 |
| `src/assets/images/S0283_8.jpg` | Ứng dụng phục hồi | 1024×765 |

Quy trình thay:

1. Dùng tài sản đã được duyệt quyền công khai và giữ đúng vai trò nội dung.
2. Thay file cùng tên hoặc cập nhật đường dẫn trong `src/index.html`.
3. Cập nhật `width`, `height`, `alt` và `figcaption` theo ảnh mới; không dùng số liệu trong bitmap làm claim nếu chưa xác minh.
4. Với cặp 03/04, bảo đảm cùng khu vực, khung ảnh và quy trình chuẩn hóa trước khi gọi là hai kỳ đối chiếu.
5. Chạy lại ba bộ test và kiểm tra crop tại mobile/desktop trong browser.

Trước phát hành, bắt buộc thay hoặc duyệt bản public của ảnh 06 và 08. Ảnh hiện tại đã được kiểm kê có nội dung INTERNAL/CONFIDENTIAL, tên/dữ liệu hoặc claim giấy phép đóng trong bitmap.

## 5. Chỉnh màu và giao diện

Màu được khai báo ở đầu `src/css/styles.css`:

- `--color-paper`, `--color-sand`: nền.
- `--color-ink`, `--color-forest`: chữ và nền tối.
- `--color-olive`, `--color-sage`: màu thương hiệu chính.
- `--color-clay`: trang trí.
- `--color-clay-strong`: chữ cam trên nền sáng.
- `--color-clay-light`: điểm nhấn cam trên nền tối.

Khi đổi màu, chạy `python tests/quality_audit_test.py` và cập nhật các cặp màu trong test theo palette mới. Sau đó đo contrast trên trang render; phép tính source không tự chứng nhận WCAG.

## 6. Kết nối form thật

Form hiện có `novalidate`, validation JavaScript và luôn `preventDefault`. Nút chỉ chuyển thành submit khi JavaScript khởi tạo. Không có `fetch`, endpoint hoặc lưu trữ dữ liệu.

Trước khi kết nối:

1. Chốt endpoint HTTPS, đơn vị nhận dữ liệu, trường dữ liệu, thời hạn lưu và chính sách quyền riêng tư.
2. Validation lại toàn bộ dữ liệu ở server; thêm rate limit, chống spam và biện pháp CSRF phù hợp kiến trúc.
3. Không đặt API key hoặc secret trong `src/js/main.js`.
4. Trong handler submit, khóa nút khi request đang chạy; xử lý timeout, network error, 4xx/5xx và business error; cho phép retry an toàn.
5. Chỉ hiển thị trạng thái đã tiếp nhận sau response thành công đúng schema. Không reset dữ liệu khi lỗi.
6. Đổi nhãn “Kiểm tra thông tin” và thông báo demo sau khi tích hợp thật đã được test.
7. Bổ sung test cho success, lỗi, timeout và submit kép; test bằng endpoint mock trước khi thử live.

Không gửi lead thật trong quá trình test nếu chưa có ủy quyền rõ ràng.

## 7. Chạy kiểm thử

Yêu cầu: Node.js 22+, Python 3. Pillow chỉ cần cho quality audit.

```powershell
node --check src/js/main.js
node --test tests/functional.test.js
python tests/static_http_test.py
python tests/quality_audit_test.py
```

Kết quả bàn giao hiện tại:

- Functional Node: 6/6 PASS.
- Static/HTTP Python: 9/9 PASS.
- Quality source audit: 8/8 PASS.
- Tổng: 23/23 PASS trong phạm vi source, DOM giả lập và HTTP local.

Các kết quả này không thay thế test trình duyệt thật. Xem `docs/test-report.md` và `docs/quality-audit.md`.

## 8. Placeholder và trạng thái demo còn lại

- Form và kênh liên hệ chính thức: demo; không gửi dữ liệu.
- Bảng kết quả: cấu trúc minh họa, các ô ghi “Chưa có dữ liệu”.
- Ảnh/video và các tình huống ứng dụng: được ghi là minh họa, không phải kết quả khách hàng.
- Gói Pilot/Standard/Advanced: cấu hình và giá đề xuất lần lượt 65/165/420 triệu VNĐ mỗi gói dự án. Phạm vi, thuế, chi phí phát sinh và điều khoản thanh toán chốt trong báo giá chính thức.
- Endpoint, email, số điện thoại, địa chỉ và chính sách dữ liệu: chưa có.
- Canonical, robots, sitemap và headers production: chờ domain/hosting thật.

## 9. Blocker trước production

1. Cung cấp phụ đề WebVTT và transcript tiếng Việt đã xác minh cho video có âm thanh.
2. Thay hoặc phê duyệt bản public của ảnh 06/08.
3. Chạy visual QA tại 360/390/768/1024/1440px và zoom 200%.
4. Chạy bàn phím, screen reader, accessibility tree, axe/Lighthouse và console/network trên browser thật.
5. Đo LCP/CLS/INP; tối ưu video 11,16 MB và ảnh responsive dựa trên kết quả.
6. Chốt form backend, liên hệ, chính sách dữ liệu, domain, HTTPS và production headers.
7. Sales/Finance phê duyệt chính thức ba mức giá đề xuất đang hiển thị trước khi phát hành.

Không gọi artifact hiện tại là production-ready khi các mục trên chưa hoàn tất.

## 10. Checklist phát hành

- [ ] Hai ảnh có nội dung nhạy cảm đã được thay/duyệt.
- [ ] Video có captions và transcript đã kiểm tra đồng bộ.
- [ ] Form thật đạt các ca success/error/timeout/submit kép và chính sách dữ liệu đã công bố.
- [ ] Giá 65/165/420 triệu VNĐ và điều kiện thương mại đã được Sales/Finance phê duyệt.
- [ ] Visual, keyboard, screen reader và reduced motion đã kiểm tra trên browser.
- [ ] Không có console error hoặc request tài nguyên lỗi.
- [ ] Lighthouse/performance trace có URL, version, viewport và điều kiện đo rõ ràng.
- [ ] Canonical/robots/sitemap/HTTPS/cache/CSP/HSTS đúng domain production.
- [ ] Web root chỉ chứa nội dung `src`; không public docs/tests/source.
- [ ] Chạy lại toàn bộ test và lưu kết quả theo phiên bản phát hành.
