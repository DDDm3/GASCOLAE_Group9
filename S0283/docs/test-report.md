# Báo cáo kiểm thử chức năng S0283

Ngày chạy: 15/09/2026  
Phạm vi: prompt 12 — kiểm thử chức năng, không audit chất lượng hoặc deploy.

## Môi trường và lệnh chạy

- Windows/PowerShell; Node.js `v22.19.0`; Python `3.14.2`.
- Playwright, axe-core và Lighthouse không resolve tại project; browser runtime của môi trường không có browser khả dụng.
- Website được phục vụ từ `src` bằng HTTP server tạm trên `127.0.0.1` với cổng trống; server tự dừng sau test.

```powershell
node --check src/js/main.js
node --test tests/functional.test.js
python tests/static_http_test.py
```

## Kết quả bộ test tự động

| Bộ test | Kết quả | Bằng chứng |
|---|---:|---|
| Logic JavaScript trong DOM giả lập | PASS — 6/6 | Menu cập nhật ARIA/focus và đóng bằng Escape/link/breakpoint; range 0/50/100; form trống/sai/hợp lệ; demo không gọi mạng; progressive enhancement của nút submit. |
| Cấu trúc và HTTP | PASS — 9/9 | ID/anchor, CTA, ba giá gói đề xuất, no-JS/FAQ, range/form semantics, a11y/metadata, 15 URL tài nguyên HTTP 200, docs trả 404, public bundle không chứa Office/contact giả. |
| Cú pháp JavaScript | PASS | `node --check src/js/main.js` trả mã 0. |

Lần chạy đầu của test HTTP có 1 lỗi vì test kỳ vọng 16 URL, trong khi trang có 15 URL tài nguyên duy nhất do ảnh được dùng lại. Kỳ vọng được sửa thành 15 và toàn bộ test chạy lại thành công. Một lần chạy tiếp theo ghi lỗi đóng socket do test chỉ đọc header của video; chuyển request tài nguyên sang `HEAD`, chạy lại 8/8 sạch. Hai vấn đề này thuộc mã test, không phải website.

Sau yêu cầu công khai giá đề xuất, bổ sung ca kiểm tra chính xác ba mức 65/165/420 triệu VNĐ và nhãn “Giá đề xuất”. Bộ static/HTTP hiện đạt 9/9. Lần chạy đầu của ca mới dùng phép đếm chuỗi nên “65 triệu” khớp cả trong “165 triệu”; đổi sang kiểm tra nội dung thẻ `<strong>` chính xác và chạy lại thành công. Đây là lỗi test, không phải lỗi giao diện.

## Đối chiếu ma trận T01–T17

`PASS` chỉ dùng khi loại kiểm tra tương ứng đã thực thi. `BLOCKED` nghĩa là cần browser thật để hoàn tất thao tác/render. `NOT RUN` dùng cho nhánh tích hợp chưa tồn tại trong bản demo.

| ID | Trạng thái | Kết quả và evidence |
|---|---|---|
| T01 | BLOCKED | HTTP xác nhận HTML/CSS/JS và media trả 200. Chưa render desktop/mobile hoặc thu console trong browser. |
| T02 | BLOCKED | Logic thành phần PASS trong Node: bật/tắt, `aria-expanded`, `data-open`, focus link đầu, Escape trả focus, chọn anchor và breakpoint desktop đều đúng. Chưa click/phím trên browser thật. |
| T03 | BLOCKED | Kiểm tra tĩnh PASS: CTA dùng `#lien-he`/`#ket-qua`, đích tồn tại và CSS có `scroll-margin-top`. Chưa xác minh vị trí cuộn thực với sticky header. |
| T04 | BLOCKED | Logic thành phần PASS tại 0/50/100 và output/CSS variable cập nhật đúng. Input native có min/max/value 0/100/50. Chưa thao tác chuột, phím hoặc cảm ứng trong browser. |
| T05 | BLOCKED | Kiểm tra tĩnh PASS: nav còn trong DOM, 5 FAQ native, cặp ảnh fallback hiển thị khi không có lớp `.js`, nút form mặc định `type=button`. Chưa render trang khi tắt JavaScript. |
| T06 | BLOCKED | Có đúng 5 cặp `details/summary` native. Chưa kiểm tra mở/đóng và focus bằng bàn phím trong browser. |
| T07 | PASS | DOM giả lập xác nhận form trống đặt lỗi cạnh trường, `aria-invalid`, focus trường đầu; email sai và diện tích âm bị từ chối; trạng thái nêu chưa gửi; không gọi mạng. |
| T08 | PASS | Hai ca email-only và phone-only hợp lệ đều được chấp nhận theo quy tắc ít nhất một liên hệ. |
| T09 | PASS | Form hợp lệ chỉ báo “Thông tin hợp lệ” và “chưa được gửi”; `preventDefault` luôn chạy và số network call bằng 0. |
| T10 | NOT RUN | Không có endpoint hoặc code tích hợp. Form hiện chỉ có nhánh demo; không mock một backend không tồn tại. |
| T11 | NOT RUN | Không có request submit nên timeout/4xx/5xx/business error/submit kép chưa áp dụng. Live integration chưa test. |
| T12 | BLOCKED | CSS có breakpoint và kiểm tra số học trước đó; chưa render 360/390/768/1024/1440px hoặc zoom 200%. |
| T13 | BLOCKED | Kiểm tra tĩnh thấy `:focus-visible` và `prefers-reduced-motion`; chưa duyệt bàn phím toàn trang, focus hoặc motion trong browser. |
| T14 | BLOCKED | Cấu trúc PASS: mọi ảnh có alt/kích thước; legend có 4 lớp cùng chữ và ký hiệu; video có controls và không autoplay. Chưa đo contrast/render ảnh. |
| T15 | BLOCKED | 15/15 URL tài nguyên duy nhất trả HTTP 200 và có nội dung. Chưa thu console/network log từ browser. |
| T16 | BLOCKED | Title/meta description PASS bằng parser. Performance, Core Web Vitals và SEO runtime chưa đo vì thiếu browser/Lighthouse. |
| T17 | PASS | Public bundle không chứa `.docx/.xlsx/.xlsm/.pptx`, email/phone giả hoặc `example.com`; docs nội bộ trả HTTP 404; giới hạn claim vẫn hiện trong nội dung. |

## Phần chưa kiểm tra và blocker

- Không có browser khả dụng nên chưa có screenshot, thao tác end-to-end, accessibility tree, console/network log, kiểm tra layout/zoom/crop/contrast hoặc số đo hiệu năng.
- Không có endpoint, kênh liên hệ chính thức hoặc chính sách dữ liệu nên T10–T11 và live submission chưa áp dụng. Form phải tiếp tục ở trạng thái demo.
- DOM giả lập chạy trực tiếp handler của `main.js`; nó kiểm chứng logic ứng dụng nhưng không thay thế hành vi native, rendering hoặc accessibility của browser.

## Tệp test tái chạy

- `tests/functional.test.js`
- `tests/static_http_test.py`
- `tests/README.md`
