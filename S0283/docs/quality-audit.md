# Audit chất lượng website S0283

Ngày audit: 15/09/2026  
Đối tượng: landing page một trang, web root `src`, chạy local HTTP.  
Phạm vi: accessibility, hiệu năng, SEO, best practices và khả năng đọc/tương tác bằng tác nhân.

## Điều kiện và công cụ

| Tín hiệu | Điều kiện | Kết quả | Nguồn bằng chứng |
|---|---|---|---|
| Kiểm tra chất lượng mã nguồn | Node.js 22.19.0; Python 3.14.2; Pillow 12.0.0 | PASS 8/8 | `python tests/quality_audit_test.py` |
| Regression chức năng | DOM giả lập Node và HTTP server Python tại `127.0.0.1`, cổng trống | PASS 15/15 | `node --test tests/functional.test.js`; `python tests/static_http_test.py` |
| URL tài nguyên | Web root `src`; request `HEAD` | 15/15 URL duy nhất trả 200; docs nội bộ trả 404 | `tests/static_http_test.py` |
| Lighthouse/axe | Không resolve tại project | NOT RUN | Kiểm tra `require.resolve` |
| Browser desktop/mobile | Browser runtime không có phiên khả dụng | BLOCKED | Không có screenshot, accessibility tree hoặc console log |
| LCP/CLS/INP | Không có browser/trace/field data | NOT RUN | Không tạo số đo suy diễn |

Hướng dẫn áp dụng: `web-quality-audit` phiên bản 2.0 từ nguồn GitHub đã ghi trong `docs/tooling.md`. Audit này giữ kiểm tra mã nguồn tách biệt với bằng chứng render.

## Thay đổi đã thực hiện

- Thêm `--color-clay-strong: #93452f` cho chữ trên nền sáng và `--color-clay-light: #e1a086` cho điểm nhấn trên footer tối. Các cặp tương ứng đạt khoảng 5,99:1 và 5,43:1 theo phép tính sRGB.
- Tăng độ đậm placeholder từ ink 58% lên 70% và nhãn “Giá” từ 60% lên 72%. Các cặp kiểm tra đạt ít nhất 4,5:1 trên nền dự kiến.
- Đổi chiều cao tương tác tối thiểu của range và liên kết footer thành `3rem` (48px khi root font là 16px).
- Thêm `tests/quality_audit_test.py` để tái kiểm tra cặp màu, heading, label, kích thước ảnh thật, tải tài nguyên, video, public bundle và API phía trình duyệt.

Không có nội dung, ảnh, dữ liệu hay hành vi form nào được thay đổi.

Sau audit, người dùng yêu cầu hiển thị giá. Website đã bổ sung ba giá bán đề xuất từ File 07 và giữ nhãn đề xuất/điều kiện báo giá chính thức; không đưa cost, margin, VAT chưa xác định hoặc ma trận giá nội bộ lên UI. Regression sau thay đổi đạt 15/15.

## Kết quả theo mức nghiêm trọng

### Critical — 0

Không phát hiện lỗi Critical bằng các kiểm tra đã chạy. Kết luận này không bao gồm hạ tầng production hoặc runtime trình duyệt.

### High — 2 chưa xử lý

#### H01 — Video có âm thanh nhưng không có phụ đề hoặc transcript

- **Ảnh hưởng:** Người dùng điếc, khiếm thính hoặc không thể bật âm thanh không nhận được nội dung âm thanh tương đương.
- **Tái hiện:** Mở `src/index.html`, tìm video tại dòng 69; không có phần tử `<track>`. Kiểm tra container MP4 thấy một track `soun` và codec marker `mp4a`.
- **Evidence:** Source inspection và binary structure; chưa nghe/xác minh lời thoại vì môi trường không có browser, ffprobe hoặc công cụ phiên âm.
- **Đề xuất sửa:** Lấy lời thoại đã được chủ nội dung duyệt, tạo WebVTT tiếng Việt, gắn `<track kind="captions" srclang="vi" ... default>` và cung cấp transcript gần video. Kiểm tra đồng bộ thời gian bằng browser trước phát hành.
- **Trạng thái:** OPEN. Không tự viết phụ đề từ nội dung phỏng đoán.

#### H02 — Hai ảnh public chứa nội dung nhạy cảm hoặc claim đóng trong bitmap

- **Ảnh hưởng:** `S0283_6.png` đã được kiểm kê có nhãn INTERNAL/CONFIDENTIAL cùng tên/dữ liệu; `S0283_8.jpg` chứa claim phê duyệt giấy phép. Đưa nguyên trạng lên public có thể làm lộ thông tin hoặc biến nội dung chưa xác minh thành tuyên bố công khai.
- **Tái hiện:** Kiểm tra các tài sản được nhúng tại `src/index.html:198` và `src/index.html:227`; đối chiếu `docs/asset-manifest.md` và ghi nhận audit nguồn.
- **Evidence:** Kiểm kê/quan sát tài sản ở các bước trước; HTML hiện chỉ gọi chúng là minh họa và không chép số liệu thành claim.
- **Đề xuất sửa:** Chủ nội dung cung cấp hoặc phê duyệt bản public đã che tên, trạng thái nội bộ, số liệu và claim giấy phép; giữ bản gốc ngoài web root. Sau đó kiểm tra lại alt/caption và ảnh render.
- **Trạng thái:** OPEN do yêu cầu hiện tại dùng toàn bộ media và chưa có bản public được duyệt.

### Medium — 3

#### M01 — Video 10 giây có dung lượng 11,16 MB

- **Ảnh hưởng:** Khi người dùng chọn phát, tải dữ liệu cao trên mạng di động. Đây không phải toàn bộ chi phí tải ban đầu vì video dùng `preload="metadata"`.
- **Tái hiện:** Kiểm tra `src/assets/videos/vegetation-monitoring.mp4`: 11.162.243 byte; `mvhd` cho thời lượng khoảng 10,006 giây. Atom `moov` ở byte 7.414, trước `mdat` ở byte 15.640, nên file đã bố trí metadata đầu tệp.
- **Evidence:** Đọc kích thước và cấu trúc MP4 bằng Python. Chưa đo byte tải thực tế hoặc thời gian phát trong browser.
- **Đề xuất sửa:** Mã hóa lại H.264/AAC với bitrate phù hợp và cân nhắc WebM fallback; so sánh hình/âm thanh trước và sau. Giữ poster, controls và `preload="metadata"`.
- **Trạng thái:** OPEN; môi trường không có encoder và chưa có ngưỡng chất lượng được duyệt.

#### M02 — Chưa có biến thể ảnh responsive/định dạng mới

- **Ảnh hưởng:** Thiết bị nhỏ vẫn nhận ảnh JPEG/PNG kích thước gốc; trình duyệt không thể chọn nguồn theo viewport/DPR.
- **Tái hiện:** Kiểm tra 11 thẻ `<img>`: có width/height và ảnh dưới fold lazy-load, nhưng không có `srcset`/`sizes` hoặc WebP/AVIF.
- **Evidence:** Source inspection. Ảnh hero 229.625 byte; các ảnh còn lại khoảng 292–404 KB mỗi file.
- **Đề xuất sửa:** Sinh WebP/AVIF và các bề rộng phù hợp từ bản nguồn đã duyệt; dùng `<picture>`/`srcset` với ảnh gốc làm fallback. Kiểm tra crop và độ rõ tại năm viewport.
- **Trạng thái:** OPEN; không chặn bản demo.

#### M03 — Cấu hình SEO và bảo mật production chưa xác định

- **Ảnh hưởng:** Canonical, sitemap, robots, HTTPS, cache headers, CSP và HSTS phụ thuộc domain/hosting. Thiếu chúng khi phát hành có thể ảnh hưởng crawl, cache và bảo mật.
- **Tái hiện:** Web root không có robots.txt/sitemap; HTML không có canonical. HTTP server test chỉ là server local và không đại diện production headers.
- **Evidence:** Source/public tree inspection; chưa có domain hoặc deployment target.
- **Đề xuất sửa:** Khi có domain thật, thêm canonical tuyệt đối, robots/sitemap phù hợp và cấu hình HTTPS/cache/CSP/HSTS ở hosting; kiểm tra bằng URL production.
- **Trạng thái:** OPEN trước deploy; không thêm URL giả.

### Low — 0

Không ghi nhận lỗi Low đủ bằng chứng cần sửa trong phạm vi hiện tại.

## Các kiểm tra đạt bằng mã nguồn

### Accessibility

- Một `h1`; cấp heading không nhảy; mọi section có accessible name qua `aria-labelledby` hợp lệ.
- Mọi input/textarea/range có label liên kết; status form dùng `role="status"` và `aria-live="polite"`.
- Mọi ảnh có alt và kích thước HTML khớp kích thước pixel thật; legend có chữ và ký hiệu, không chỉ dùng màu.
- Có skip link, focus visible và reduced motion. Button/range/liên kết footer quan trọng có chiều cao tối thiểu 3rem trong CSS.
- Tám cặp màu chữ đại diện được tính và đạt tối thiểu 4,5:1 sau sửa. Đây là phép tính màu nguồn, chưa phải kiểm tra pixel render hay chứng nhận WCAG.

### Performance

- Tổng sáu tài nguyên local quan trọng theo source là 403.837 byte: HTML, CSS, JS, logo header, favicon và ảnh hero. Con số chưa gồm header HTTP, nén truyền tải hoặc cache.
- JS 6.238 byte, dùng `defer`, không có thư viện ngoài. Font dùng hệ thống, không tạo request font.
- Hero có `fetchpriority="high"`, không lazy-load; ảnh sau hero dùng lazy loading. Không có ảnh nào thiếu width/height; video có CSS aspect ratio nên source đã giảm rủi ro layout shift.
- Video không autoplay, chỉ preload metadata và có fast-start MP4. LCP, CLS và INP vẫn NOT RUN.

### SEO và best practices

- Có doctype, `lang="vi"`, charset, viewport, title và meta description theo nội dung trang.
- Anchor nội bộ có đích, link text mô tả, không có tài nguyên runtime từ origin thứ ba.
- Không dùng `document.write`, `innerHTML`, `eval`, XHR hoặc fetch; form demo không gửi dữ liệu.
- Public tree không chứa Office nội bộ; yêu cầu HTTP tới `/docs/implementation-status.md` trả 404.
- Không có dependency frontend, source map, contact giả, testimonial giả hoặc từ ngữ real-time trong HTML.

### Agentic browsing

- Semantic header/nav/main/section/footer, label, button, native details/summary và trạng thái ARIA tạo bề mặt tương tác có tên rõ trong source.
- Không có Lighthouse Agentic Browsing hoặc accessibility tree, nên không chấm điểm và không kết luận khả năng tương tác trên DOM render.

## Kiểm tra chưa chạy

- Screenshot toàn trang desktop/mobile; crop, chồng chữ, cuộn ngang và zoom 200%.
- Duyệt bàn phím thật, screen reader, accessibility tree và kiểm tra captions sau khi có file.
- axe/Lighthouse, console/network browser, LCP/CLS/INP, trace performance, CrUX hoặc dữ liệu field.
- HTTPS, cache, compression, CSP/HSTS, canonical/robots/sitemap trên production.

## Thứ tự ưu tiên trước phát hành

1. Cung cấp phụ đề/transcript đã xác minh cho video.
2. Thay ảnh 06/08 bằng biến thể public đã duyệt.
3. Khi có browser, chạy visual QA, bàn phím, axe/Lighthouse và performance trace tại mobile/desktop.
4. Tối ưu video và ảnh dựa trên kết quả tải thực tế.
5. Hoàn thiện canonical, robots/sitemap và headers khi có domain/hosting.
