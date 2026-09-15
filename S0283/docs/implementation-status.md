# Trạng thái triển khai S0283

Ngày: 15/09/2026.

## Bước hiện tại

**14 — Kiểm tra cuối và đóng gói: hoàn thành; đã cập nhật giá theo yêu cầu sau bàn giao.** Artifact là prototype sẵn sàng review local, chưa production-ready; không deploy.

## Cập nhật giá gói sau bàn giao

- Theo yêu cầu trực tiếp của người dùng, thay “Liên hệ tư vấn” bằng giá bán đề xuất từ File 07 `01_PRICE_LIST!E7` và ba anchor cấu hình: Pilot 65 triệu, Standard 165 triệu, Advanced 420 triệu VNĐ mỗi gói dự án.
- UI giữ nhãn “Giá đề xuất”; ghi rõ phạm vi, thuế, chi phí phát sinh và điều khoản thanh toán chốt trong báo giá chính thức. Không public cost, margin, tỷ giá, VAT chưa xác định, ma trận band hoặc dữ liệu báo giá mẫu.
- Sửa `src/index.html`, `src/css/styles.css`, `tests/static_http_test.py`, README và tài liệu bàn giao/liên quan. Static/HTTP tăng thành 9/9; functional 6/6 và quality 8/8 tiếp tục đạt, tổng 23/23.
- Lần test giá đầu dùng phép đếm substring khiến 65 khớp trong 165; đổi sang kiểm tra chính xác thẻ giá và chạy lại đạt. Đây là lỗi test, không phải lỗi website.
- Gói ZIP bàn giao được tạo lại sau cập nhật; checksum hiện hành nằm trong `release/SHA256SUMS.txt`.

## Bàn giao bước 14

- Cập nhật `README.md`; tạo `docs/handoff.md`, `release/S0283-website-handoff.zip`, `release/SHA256SUMS.txt` và cập nhật tệp trạng thái này. Không thay đổi mã website sau audit bước 13 và không deploy.
- `docs/handoff.md` ghi cách chạy HTTP, cấu trúc gói, cách thay đủ 8 ảnh, chỉnh palette, kết nối form thật, lệnh test, placeholder/demo, blocker và checklist phát hành.
- Chạy lại critical journeys và vùng CSS đã sửa: `node --check` thành công; sau cập nhật giá functional 6/6, static/HTTP 9/9 và quality 8/8, tổng 23/23 trong phạm vi source, DOM giả lập và HTTP local.
- ZIP chứa 24 tệp theo allowlist: `README.md`, toàn bộ `src`, ba test cùng hướng dẫn, `docs/handoff.md`, `docs/test-report.md` và `docs/quality-audit.md`. Không chứa prompt, Office/workbook/báo giá nguồn, `.git`, `node_modules`, cache hoặc implementation/source audit nội bộ.
- Kiểm tra ZIP sau cập nhật giá thành công: CRC không lỗi, file bắt buộc đầy đủ, 19 tham chiếu tài nguyên tương đối trong HTML đều có đích bên trong gói và ba giá mới có trong artifact. Kích thước ZIP 14.301.565 byte; SHA-256 `ddc8503e8b8731aa9346ef7e1690cd318d565d2771e7d1aef783d6306d3fca02`.
- Giữ nguyên blocker: video có audio chưa có captions/transcript xác minh; ảnh 06/08 cần bản public được duyệt; form/backend/liên hệ/chính sách dữ liệu chưa có; visual/browser/a11y tree/console/Lighthouse/Core Web Vitals và production hosting chưa kiểm tra. Vì vậy không gọi gói là production-ready.

## Tích hợp toàn bộ tài sản theo yêu cầu mới

- Người dùng yêu cầu dùng toàn bộ tài nguyên trong `assets`. Phạm vi triển khai được hiểu là tài sản truyền thông: 8 ảnh, 4 biến thể logo và 1 video. `assets/docs` chứa tài liệu Office nội bộ nên không được sao chép vào web root hoặc liên kết từ HTML.
- Sao chép byte-for-byte 8 ảnh vào `src/assets/images`, 4 logo vào `src/assets/logo`, video vào `src/assets/videos/vegetation-monitoring.mp4`; hash của cả 13 bản sao khớp nguồn. File nguồn giữ nguyên.
- `LOGO_no-bg.png` dùng trong header; `logo.png` làm favicon; `GASCOLAE.svg` và `GASCOLAE.png` dùng bằng `picture` ở footer. Tất cả bốn biến thể đều được tham chiếu.
- Ảnh 01 dùng cho hero, poster video và thẻ rừng trồng; 02 cho giải pháp; 03/04 cho hai kỳ; 05 cho bản đồ; 06 cho mẫu báo cáo; 07/08 cho ứng dụng. Tất cả tám ảnh đều được tham chiếu.
- Video đặt trong hero với controls, `preload="metadata"`, poster, không autoplay. Chưa có tệp phụ đề nên chưa gắn captions track.
- Mọi thẻ `img` có `width`, `height` và alt. Ảnh hero không lazy-load và có `fetchpriority="high"`; các ảnh dưới fold dùng lazy loading. Caption dữ liệu dùng từ “minh họa” và không chép các claim số liệu từ bitmap vào HTML.
- Ảnh 06 vẫn hiển thị nhãn INTERNAL / CONFIDENTIAL cùng dữ liệu/tên người; ảnh 08 vẫn chứa claim giấy phép trong bitmap. Chúng được dùng nguyên trạng theo yêu cầu mới. Audit chưa xác minh độc lập các nội dung này; tài liệu bàn giao giữ cảnh báo để tránh biến chúng thành claim HTML.
- Kiểm tra tự động xác nhận đúng 13 file media trong `src/assets` và cả 13 đều được HTML tham chiếu; không có file media bị bỏ sót. Có 11 thẻ ảnh và 1 video; logo vuông được dùng qua favicon. Tất cả URL HTML/CSS/JS/media trả HTTP 200 với đúng MIME; server đã dừng sau kiểm tra.
- Hai lần chạy kiểm tra media ban đầu báo AssertionError vì kỳ vọng sai số lượng thẻ ảnh và cách `html.parser` biểu diễn thuộc tính boolean `controls`; sửa điều kiện kiểm tra và chạy lại thành công. Đây là lỗi test, không phải lỗi tài sản.
- Browser runtime vẫn không có browser khả dụng, nên chưa kiểm tra crop, độ rõ chữ trong ảnh 05–08, phát video, layout và logo trên trang render.

## Bàn giao bước 13

- Sửa `src/css/styles.css`; tạo `tests/quality_audit_test.py`, `docs/quality-audit.md`; cập nhật `tests/README.md` và tệp trạng thái này. Không thay đổi HTML/JavaScript/nội dung, chạy bước 14 hoặc deploy.
- Sửa tương phản có bằng chứng: thêm clay đậm cho chữ trên nền sáng, clay sáng cho điểm nhấn trên footer tối; tăng opacity placeholder và nhãn giá. Tám cặp màu đại diện sau sửa đạt tối thiểu 4,5:1 theo phép tính sRGB.
- Tăng chiều cao tương tác range và các liên kết footer từ 2,75/2,5rem lên 3rem. Giữ nguyên bảng màu, hành vi và reduced motion.
- `python tests/quality_audit_test.py` đạt 8/8: contrast, heading/section name, label form, kích thước ảnh thật/loading, ngân sách tài nguyên local quan trọng, video fast-start, runtime/API và public bundle. Regression bước 12 tiếp tục đạt 14/14; `node --check` thành công.
- Source đo được sáu tài nguyên local quan trọng tổng 403.837 byte trước header/nén/cache; video 10,006 giây nặng 11.162.243 byte, có audio marker, `moov` trước `mdat`, preload metadata và không autoplay. Không suy diễn các số này thành LCP/CLS/INP.
- Báo cáo ghi 0 Critical; 2 High còn mở: video có audio nhưng thiếu captions/transcript đã xác minh, ảnh 06/08 chứa nội dung nội bộ/claim trong bitmap. Ba Medium: dung lượng video, thiếu ảnh responsive/định dạng mới và cấu hình SEO/bảo mật production chưa có domain/hosting.
- Browser runtime vẫn không có browser; Playwright/axe/Lighthouse không resolve. Screenshot, visual QA, keyboard/screen reader, accessibility tree, console/network, Lighthouse và Core Web Vitals giữ BLOCKED/NOT RUN, không đánh dấu PASS.

## Bàn giao bước 12

- Tạo `tests/functional.test.js`, `tests/static_http_test.py`, `tests/README.md`, `docs/test-report.md` và cập nhật tệp trạng thái này. Không thay đổi mã website trong `src`, chạy bước 13 hoặc deploy.
- `node --check src/js/main.js` thành công. `node --test tests/functional.test.js` đạt 6/6 ca: menu/ARIA/focus/Escape/link/breakpoint, range 0/50/100, lỗi form, email-only, phone-only, trạng thái demo và không gọi mạng.
- `python tests/static_http_test.py` đạt 8/8 ca: ID/anchor/CTA, no-JS và FAQ native, range/form semantics, cấu trúc accessibility/metadata, 15 URL tài nguyên trả HTTP 200, docs nội bộ trả 404 và public bundle không chứa Office/contact giả.
- Lần chạy HTTP đầu có một lỗi do test kỳ vọng sai 16 URL thay vì 15 URL duy nhất; sau đó server ghi một traceback đóng socket vì client không đọc thân video. Sửa kỳ vọng và dùng request `HEAD`, chạy lại sạch 8/8. Đây là lỗi test, không phải lỗi website.
- Báo cáo `docs/test-report.md` ghi riêng từng T01–T17. T07–T09 và T17 PASS trong môi trường đã nêu; T10–T11 NOT RUN vì không có endpoint; các mục phụ thuộc render/tương tác browser giữ BLOCKED dù kiểm tra logic/tĩnh tương ứng đã đạt.
- Browser runtime vẫn không có browser khả dụng. Chưa có screenshot, E2E browser, console/network log, accessibility tree, kiểm tra năm viewport/zoom 200%, contrast/crop hoặc số đo performance. Không đánh dấu các mục này PASS.

## Bàn giao bước 11

- Sửa `src/css/styles.css` và tệp trạng thái này; không thay đổi nội dung HTML/JavaScript, triển khai bước 12 hoặc deploy. Title và meta description hiện có đã đúng File 09; không thêm canonical/OG URL vì chưa có domain thật.
- Bổ sung `min-width: 0` cho các phần tử con của container/grid, `overflow-wrap: break-word` toàn trang, `max-width: 100%` cho video/nút và scrollbar ổn định cho vùng bảng. Không dùng `overflow-x: hidden` để che lỗi.
- Menu mobile khi mở có `max-height` theo viewport với fallback `vh` và `dvh`, cuộn dọc riêng và không vượt chiều cao màn hình. Header offset vẫn được đo bằng `ResizeObserver`; navigation và nội dung fallback vẫn hiển thị khi JavaScript tắt.
- Dưới 48rem, nhãn ảnh so sánh/handle thu nhỏ, FAQ bỏ padding phải, fieldset form gọn hơn, actions/status form xếp dọc. Dưới 30rem, legend chuyển một cột và label range xếp dọc; CTA form/footer rộng toàn cột.
- `prefers-reduced-motion` nay giảm cả transition lẫn animation, đặt delay bằng 0 và giới hạn iteration; không có autoplay, parallax hoặc animation bản đồ.
- Kiểm tra tĩnh thành công: CSS có 312 cặp ngoặc cân bằng; không có `overflow-x:hidden`; `node --check src/js/main.js` thành công. HTML có ID duy nhất, mọi anchor có đích, mọi tài nguyên tồn tại, ảnh có width/height/alt, video có controls và không autoplay.
- Audit xác nhận có title/meta description, không có canonical/example.com/chatbot, no-JS vẫn có nav, hai ảnh so sánh fallback và nút form an toàn. Lần audit đầu gắn cờ sai no-JS do tìm chuỗi selector con trong `.js ...`; chuyển sang regex selector đầu dòng và chạy lại thành công. Đây là lỗi lệnh kiểm tra, không phải lỗi trang.
- Tính toán bề rộng theo CSS tại 360/390/768/1024/1440px cho container lần lượt khoảng 328/358/707/942/1200px; hai CTA hero vừa vùng chứa hoặc chuyển full-width theo breakpoint. Đây là kiểm tra số học CSS, không thay thế render browser.
- Chạy HTTP local với web root `src`: trang, CSS, JS và toàn bộ 13 media đều trả 200; `/docs/implementation-status.md` trả 404, xác nhận tài liệu nội bộ không nằm trong web root. Server đã dừng sau kiểm tra.
- Browser runtime vẫn không có browser khả dụng, nên chưa có screenshot hoặc xác nhận trực quan cuộn ngang, che chữ, crop, 200% zoom, focus và tương tác tại năm viewport. Không đánh dấu các mục render này PASS.

## Bàn giao bước 10

- Sửa `src/index.html`, `src/css/styles.css`, `src/js/main.js` và tệp trạng thái này; không triển khai bước 11, kết nối endpoint hoặc deploy.
- Form `#lien-he` có họ tên/đơn vị, email, số điện thoại, AOI, diện tích, tần suất, mục tiêu và dữ liệu kỳ gốc. Họ tên/AOI/mục tiêu bắt buộc; email và điện thoại tách riêng, yêu cầu ít nhất một cách liên hệ hợp lệ; diện tích nếu nhập phải lớn hơn 0.
- Form dùng `novalidate` và validation JavaScript để đặt lỗi cạnh trường, liên kết bằng `aria-describedby`/`aria-invalid`, focus trường lỗi đầu tiên và giữ nguyên toàn bộ giá trị. Status dùng `role="status"` và `aria-live="polite"`.
- Chế độ hiện tại là demo: nút ghi “Kiểm tra thông tin”; submit luôn `preventDefault`, không có fetch/XHR, storage hoặc log PII. Khi hợp lệ chỉ báo “Thông tin hợp lệ. Bản demo — thông tin chưa được gửi.”, không reset form hoặc báo tiếp nhận thành công.
- Để an toàn khi JavaScript tắt, nút có `type="button"` trong HTML và chỉ đổi thành `submit` sau khi validation khởi tạo. Khi JavaScript hoạt động, Enter dùng cơ chế submit native; chưa kiểm tra thao tác thực tế trong browser.
- Footer giữ trạng thái liên hệ chính thức đang cập nhật, không tạo email, số điện thoại, địa chỉ hoặc trang chính sách giả. Logo SVG/PNG và mọi anchor hiện có được giữ nguyên.
- Kiểm tra tĩnh thành công: CSS có 299 cặp ngoặc cân bằng; đủ chín trường, nhóm liên hệ, sáu vùng lỗi, live status, ID duy nhất và nút no-JS an toàn. Không có `fetch`, XHR, local/session storage, console log, `mailto:` hoặc `tel:`. `node --check src/js/main.js` thành công.
- Kiểm tra logic riêng cho dữ liệu rỗng, email/số điện thoại sai, email hợp lệ, số điện thoại hợp lệ và diện tích rỗng/0/dương cho kết quả mong đợi. Đây là kiểm tra công thức validation, chưa phải thao tác form trong browser.
- Chạy HTTP local với web root `src`: trang, CSS, JS và logo SVG/PNG đều trả 200 với MIME tương ứng. Server đã dừng sau kiểm tra; không có request gửi form trong quá trình test.
- Chưa kiểm tra trực quan layout, validation bằng Enter/bàn phím, focus, announcement của screen reader hoặc responsive vì Browser runtime không có browser khả dụng. Không đánh dấu các mục này PASS. Endpoint, kênh liên hệ, đơn vị tiếp nhận và chính sách dữ liệu vẫn là blocker trước khi nhận lead thật.

## Bàn giao bước 09

- Sửa `src/index.html`, `src/css/styles.css` và tệp trạng thái này; không sửa JavaScript, triển khai bước 10 hoặc deploy.
- Section `#quy-trinh` dùng `ol` đúng năm bước: khu vực/mục tiêu, thiết kế phương án, khảo sát/thu nhận, phân tích/kiểm chứng, bàn giao/kỳ tiếp theo. Mỗi bước có số thứ tự, nhãn giai đoạn và đường nối chỉ mang tính trang trí.
- Section `#goi-dich-vu` giữ đúng Pilot/Standard/Advanced cùng phạm vi đã đối chiếu. Mỗi gói gắn “Cấu hình đề xuất”, “Phạm vi cuối cùng chốt sau khảo sát nhu cầu” và giá “Liên hệ tư vấn”; không có nhãn phổ biến nhất hoặc giá tiền số. AI tùy chỉnh, bảng theo dõi và API chỉ được nêu trong phạm vi Advanced khi thống nhất.
- CTA của từng gói dẫn tới `#lien-he`; chưa tự điền gói vào form vì prompt cho phép nhưng không bắt buộc và bước 10 mới xử lý form. Dòng cuối nhắc rõ diện tích, số kỳ và đầu ra không phải cam kết đã duyệt.
- Section `#faq` dùng năm phần tử `details/summary` native, không lồng accordion và không phụ thuộc JavaScript. Giữ nguyên giới hạn: dữ liệu không tự xác định nguyên nhân; bản đồ biến động không thay thế mô hình và quy trình MRV phù hợp.
- Kiểm tra tĩnh thành công: CSS có 284 cặp ngoặc cân bằng; đúng năm bước, ba article gói với ba nhãn/trạng thái/giá liên hệ, năm details và năm summary, ID duy nhất, không có class “popular”. `node --check src/js/main.js` thành công.
- Lần kiểm tra đầu báo sai phần gói và chuỗi giới hạn do script kết thúc phạm vi ở `div` con và chuỗi tiếng Việt bị đổi khi truyền qua PowerShell. Chuyển sang theo dõi phạm vi section/class và chạy lại thành công; đây là lỗi lệnh kiểm tra, không phải lỗi trang.
- Chạy HTTP local với web root `src`: trang, CSS và JS đều trả 200 với MIME tương ứng. Server đã dừng sau kiểm tra.
- Chưa kiểm tra trực quan timeline, chiều cao ba gói, thao tác mở/đóng FAQ, focus, text zoom hoặc mobile trong browser vì Browser runtime không có browser khả dụng. Không đánh dấu các mục này PASS.

## Bàn giao bước 08

- Sửa `src/index.html`, `src/css/styles.css` và tệp trạng thái này; không sửa JavaScript, triển khai bước 09 hoặc deploy.
- Section `#ket-qua` giữ bản đồ ảnh 05 ở cột 60% và danh mục bốn đầu ra ở cột 40% từ 64rem. Bổ sung legend HTML có đủ Tăng/Ổn định/Suy giảm/Không đủ dữ liệu, mỗi trạng thái có chữ và ký hiệu nên không phụ thuộc màu.
- Danh mục đầu ra giải thích GIS, giữ điều kiện theo phạm vi và không thêm số liệu. Bảng vẫn là cấu trúc minh họa với bốn ô “Chưa có dữ liệu”; vùng bảng tự cuộn và có nhãn riêng, không tạo link tải xuống.
- Mẫu báo cáo ảnh 06 đặt dưới bản đồ/bảng, có copy giải thích và cảnh báo đây không phải kết quả khách hàng; số liệu đóng trong bitmap không được chép thành claim HTML.
- Section `#ung-dung` có đúng ba khối: rừng trồng/tái sinh với ảnh 01, suy giảm tán với ảnh 07, phục hồi/hoàn nguyên với ảnh 08. Copy ghi rõ đây là phạm vi ứng dụng, không phải danh sách dự án đã thực hiện.
- Cả năm tham chiếu ảnh 01/05/06/07/08 có `loading="lazy"`, width/height và alt. Ảnh 05/06 dùng `object-fit: contain`; ảnh ứng dụng dùng khung 4:3 theo thiết kế.
- Kiểm tra tĩnh thành công: CSS có 264 cặp ngoặc cân bằng; legend có bốn mục gồm trạng thái không đủ dữ liệu, ứng dụng có ba article, ID duy nhất, bảng có bốn ô placeholder và không có link download. `node --check src/js/main.js` thành công.
- Lần kiểm tra nội dung đầu tiên báo sai hai điều kiện do chuỗi tiếng Việt bị biến đổi khi truyền qua PowerShell; đổi sang kiểm tra cấu trúc class/số phần tử và chạy lại thành công. Đây là lỗi lệnh kiểm tra, không phải lỗi trang.
- Chạy HTTP local với web root `src`: trang, CSS và ảnh 01/05/06/07/08 đều trả 200 với MIME tương ứng. Server đã dừng sau kiểm tra.
- Chưa kiểm tra trực quan lưới 60/40, legend, độ rõ chữ trong ảnh 05/06, crop ảnh ứng dụng hoặc responsive vì Browser runtime không có browser khả dụng. Không đánh dấu các mục này PASS; cảnh báo nội dung đóng trong ảnh 06/08 vẫn áp dụng trước khi deploy.

## Bàn giao bước 07

- Sửa `src/index.html`, `src/css/styles.css`, `src/js/main.js` và tệp trạng thái này; không triển khai bước 08 hoặc deploy.
- Section `#so-sanh` dùng range native 0–100, giá trị đầu 50. Sự kiện `input` cập nhật biến CSS `--comparison-position`, giá trị `<output>`, lớp ảnh cắt bằng `clip-path` và vạch chia; không thay đổi kích thước ảnh.
- Ảnh 03/04 dùng cùng khung 256:143, `object-fit: cover` và `object-position: center`. Nhãn chỉ dùng “Kỳ gốc” / “Kỳ theo dõi”, không đưa ngày chưa xác minh. Khối trạng thái ghi rõ đây là minh họa chưa phải kết quả khảo sát đã xác minh; mô tả nêu phần trăm là độ mở khung, không phải tỷ lệ biến động.
- Range có label và `aria-describedby`; giữ hành vi bàn phím Home/End/mũi tên của input native và không chặn sự kiện cảm ứng/cuộn dọc. Khi JavaScript tắt, module tương tác ẩn và hai figure có alt/caption vẫn hiển thị theo nghĩa đầy đủ.
- Kiểm tra tĩnh thành công: CSS có 246 cặp ngoặc cân bằng; HTML có range min/max/value 0/100/50, label/output/help liên kết đúng, ID duy nhất, ảnh 03/04 cùng kích thước khai báo và CTA tới `#ket-qua`. `node --check src/js/main.js` thành công.
- Kiểm tra độc lập phép giới hạn giá trị cho 0/50/100 và ngoài biên -10/120 cho kết quả 0%/50%/100%/0%/100%. Đây là kiểm tra logic, chưa phải thao tác range trong browser.
- Chạy HTTP local với web root `src`: `/`, CSS, JS và ảnh 03/04 đều trả 200 với MIME tương ứng. Server đã dừng sau kiểm tra.
- Chưa thử trực quan vị trí 0/50/100, resize, chuột, cảm ứng, bàn phím native, ảnh thẳng hàng hoặc fallback khi tắt JS trong browser vì Browser runtime không có browser khả dụng. Không đánh dấu các mục này PASS.

## Bàn giao bước 06

- Sửa `src/index.html`, `src/css/styles.css` và tệp trạng thái này; không sửa Header, Hero, Footer, tài liệu nguồn hoặc triển khai bước 07.
- Section `#giai-phap` giữ nền be cát. DOM đặt nội dung trước ảnh để thứ tự đọc mobile có nghĩa; từ 64rem, CSS Grid đặt ảnh 02 bên trái 45% và nội dung bên phải 55%.
- Nội dung trình bày ba vấn đề có đánh số: khác điều kiện thu nhận, lệch vị trí giữa các kỳ và phạm vi theo dõi thiếu nhất quán. Khối “Cách GASCOLAE xử lý” giải thích khảo sát lặp, duy trì phạm vi, chuẩn hóa/căn chỉnh, phân lớp biến động và thống kê theo lô; không thêm tỷ lệ, cam kết năng suất hoặc kết luận nguyên nhân.
- Ảnh `S0283_2.jpg` giữ kích thước khai báo 1024×765, tỷ lệ 4:3, `loading="lazy"`, alt và caption minh họa. Liên kết cuối khối dẫn tới `#ket-qua`; không thêm carousel.
- Kiểm tra tĩnh thành công: CSS có 224 cặp ngoặc cân bằng tại thời điểm kiểm tra; HTML có đúng ba mục vấn đề, ID duy nhất, mọi anchor nội bộ có đích, ảnh giải pháp có alt/lazy-load, không có chuỗi carousel. `node --check src/js/main.js` thành công.
- Chạy HTTP local với web root `src`: `/`, CSS, JS và ảnh 02 đều trả 200 với MIME tương ứng. Server đã dừng sau kiểm tra.
- Chưa kiểm tra render tại 360/768/1440px, crop ảnh, text zoom, focus hoặc thứ tự đọc thực tế do Browser runtime đã được xác nhận không có browser khả dụng. Không đánh dấu các mục trực quan này PASS.

## Bàn giao bước 05

- Sửa `src/index.html`, `src/css/styles.css`, `src/js/main.js` và `README.md`; cập nhật tệp trạng thái này. Chỉ thay đổi header/hero và hạ tầng cần thiết cho menu/anchor.
- Header dùng tên chữ GASCOLAE vì chưa có logo được duyệt. Navigation là `nav` thông thường, không dùng `role="menu"`. Nút mobile có `aria-expanded="false"`, `aria-controls="site-nav"` và vùng chạm tối thiểu 48px.
- Menu mobile mở/đóng bằng nút; khi mở, focus chuyển tới liên kết đầu tiên. Escape đóng menu và trả focus về nút. Chuyển sang breakpoint desktop sẽ đóng trạng thái mobile. Khi JavaScript tắt, navigation vẫn hiển thị đầy đủ.
- Khi JavaScript hoạt động, header sticky ở mọi kích thước. `ResizeObserver` cập nhật biến `--header-offset` theo chiều cao thực để `scroll-margin-top` của anchor không dùng một con số cố định. Có fallback cập nhật khi resize nếu môi trường không hỗ trợ observer. Khi JavaScript tắt, header nằm trong luồng cùng navigation hiển thị đầy đủ nên không che anchor.
- Hero có H1, mô tả, giải thích AOI và đúng hai CTA: “Trao đổi nhu cầu” tới `#lien-he`, “Xem kết quả bàn giao” tới `#ket-qua`. Chưa có ảnh đủ quyền nên dùng placeholder tỷ lệ 256:143 với nhãn “chưa phải ảnh dự án thực tế”; không có `<img>`, lazy-load hoặc claim ảnh thật.
- CSS có xử lý riêng dưới 30rem để CTA/menu rộng toàn cột; cấu trúc và typography được thiết kế để reflow ở 360px. Chưa có browser render nên chưa xác nhận trực quan tại 360px.
- Kiểm tra tĩnh: HTML parse được, ID duy nhất, button/nav ARIA đúng, CTA có đích, không có `role="menu"` hoặc tham chiếu ảnh 01. `node --check src/js/main.js` thành công; kiểm tra các hook Escape/focus/header offset và CSS trạng thái menu thành công.
- Chạy HTTP với web root `src`: trang, CSS và JS đều trả 200. Server đã dừng sau kiểm tra.
- Áp dụng Browser skill để thử kiểm tra render local. Browser runtime trả “No browser is available”; sau hướng dẫn troubleshooting, danh sách browser vẫn rỗng. Vì vậy chưa có screenshot, kiểm tra click/Escape thực tế, focus order, anchor occlusion hoặc đánh giá 360px; không đánh dấu các mục này PASS.

## Bàn giao bước 04

- Theo yêu cầu cấu trúc mới, toàn bộ mã website đã được chuyển vào `src`: `src/index.html`, `src/css/styles.css`, `src/js/main.js`. `README.md`, `docs`, `prompt` và nguồn Office/ảnh giữ ngoài `src`.
- Tạo khung HTML/CSS/JS và `README.md`; cập nhật tệp trạng thái này. Không sửa hoặc sao chép tài liệu Office và tám ảnh nguồn.
- HTML có `lang="vi"`, viewport, skip link, header/nav, một `main`, footer và đủ ID: `tong-quan`, `giai-phap`, `so-sanh`, `ket-qua`, `ung-dung`, `quy-trinh`, `goi-dich-vu`, `faq`, `lien-he`.
- Dựng toàn bộ copy đã chốt bằng semantic HTML. FAQ dùng `details/summary`; bảng thống kê có caption; form có label và trạng thái demo. Nút form là `type="button"`, nên bước 04 không gửi dữ liệu hoặc hiển thị thành công giả khi JavaScript tắt.
- CSS dùng đúng sáu màu đã chốt, font hệ thống, cỡ chữ linh hoạt, container, khoảng cách, nút/focus, placeholder tỷ lệ cố định và các mốc responsive cơ bản. Header/nav tự wrap ở màn nhỏ; chưa thêm menu thu gọn hoặc tương tác phức tạp.
- Mọi vùng hình là placeholder HTML. `src/index.html` không tham chiếu `assets/docs` hoặc `S0283_1`–`S0283_8`; ảnh 06/08 không được public qua giao diện. `src` là web root hiện tại và chưa chứa tài sản nguồn nội bộ.
- Kiểm tra HTML bằng Python `html.parser`: một header/main/footer, đủ 9 ID, không ID trùng, mọi anchor nội bộ có đích, CSS/JS local tồn tại, không tham chiếu nguồn/ảnh chưa duyệt. Kiểm tra CSS có đủ sáu màu và cặp ngoặc cân bằng. `node --check src/js/main.js` chạy thành công.
- Chạy lại HTTP local với `--directory src`: `/`, `/css/styles.css`, `/js/main.js` đều trả 200; yêu cầu thử `/docs/source-audit.md` trả 404, xác nhận tài liệu nội bộ nằm ngoài web root. Server đã dừng sau kiểm tra.
- Kiểm tra vị trí bằng đường dẫn tuyệt đối: có đúng 3 file code HTML/CSS/JS và cả 3 đều nằm dưới `S0283/src`; hash nội dung không đổi sau khi di chuyển. Hai lần kiểm tra vị trí trước đó báo sai do biểu thức PowerShell không xử lý tiền tố `.\\` như dự kiến; đã thay bằng so sánh đường dẫn tuyệt đối và chạy thành công. Đây là lỗi lệnh kiểm tra, không phải lỗi cấu trúc.
- Một lệnh `rg` ban đầu lỗi do biểu thức bị mất dấu nháy khi truyền qua PowerShell; đã chạy lại với quoting an toàn và thành công. Đây không phải lỗi mã nguồn.
- Browser runtime vẫn trả “No browser is available”. Chưa kiểm tra render, responsive trực quan, focus/keyboard thực tế, text zoom, console hoặc accessibility tree; không đánh dấu các mục này PASS.

## Bàn giao bước 03

- Tạo `docs/design-spec.md`, `docs/asset-manifest.md`; cập nhật tệp trạng thái này. Thư mục `assets/images` đã có sẵn, giữ nguyên 8 file; không tải, tạo hoặc sửa ảnh.
- Áp dụng frontend-design đã đọc ở bước 01, giữ bảng màu brief. Đặc tả có tokens, font tiếng Việt, cỡ chữ linh hoạt, chiều rộng/khoảng cách, breakpoints, bố cục 9 phần và trạng thái tương tác đủ làm đầu vào code.
- Đã tính 10 cặp tương phản sRGB. Olive/paper đạt tỷ số 5.72:1; clay/paper 3.73:1 nên không dùng clay cho chữ nhỏ. Đây là tính toán màu, chưa phải kiểm tra trang render.
- Đã kiểm tra font Segoe UI regular tại máy: bảng cmap có đủ 193 mã ký tự được chọn, gồm chữ Việt và ASCII; chưa kiểm tra hiển thị dấu tổ hợp/fallback trên các thiết bị khác. Dùng font hệ thống, không sao chép font Windows vào dự án.
- Đã xem từng ảnh trong đủ 8 file, đọc kích thước, metadata và hash. Không ảnh nào có EXIF; không suy ra ảnh giả từ việc thiếu EXIF. Cặp 03/04 cùng kích thước, tương tự khung nhưng chưa đủ chứng cứ xác minh hai kỳ.
- Phát hiện mới: 06 có nhãn INTERNAL / CONFIDENTIAL và dữ liệu/tên người/ký duyệt; 08 chứa claim giấy phép bay đã phê duyệt. Không dùng hai ảnh nguyên trạng trong public. Đã chỉ định placeholder hoặc bản public thay thế và điều kiện xét duyệt trong manifest.
- Cả 8 slot có tên file dự kiến, vị trí, tỷ lệ, nguồn/quyền, trạng thái thật/minh họa/thiếu, alt và caption. Hiện thiếu ảnh đủ điều kiện public, không thiếu file trên đĩa. Không tạo bản đồ giả hoặc biến dữ liệu trong ảnh thành kết quả thật.
- Giới hạn còn lại: quyền ảnh, nguồn gốc và dữ liệu khảo sát; logo/liên hệ/endpoint; browser và test UI chưa thực hiện. Các mục này không chặn hoàn tất tài liệu bước 03; dùng placeholder theo đặc tả khi code và giữ nguồn nội bộ ngoài public root.

## Bàn giao bước 02

- Tạo `docs/content-spec.md`; cập nhật `docs/implementation-status.md`. Giữ nguyên audit, tooling và các nguồn Office.
- Mỗi phần có heading, copy, CTA, nguồn và trạng thái. CTA chính “Trao đổi nhu cầu”, CTA phụ “Xem kết quả bàn giao”; giải thích AOI là khu vực cần theo dõi.
- Gói Pilot/Standard/Advanced khớp diện tích và số kỳ, giữ nhãn “Đề xuất”, giá hiển thị “Liên hệ tư vấn”. FAQ gồm đa phổ, điều kiện so sánh hai kỳ, nguyên nhân suy giảm và carbon/MRV.
- Đối chiếu trực tiếp các đoạn liên quan của File 09 với 01/02/04/05, kết hợp audit bước 01 và điều kiện gói File 07. Đã rà soát thủ công giới hạn claim, quy trình năm bước, copy demo và thông tin liên hệ còn thiếu.
- Kiểm tra cấu trúc bằng script: đủ 9 phần, mỗi phần có CTA/nguồn/trạng thái; không lẫn mã dịch vụ khác được prompt loại trừ, không có giá tiền dạng số, không có ký tự UTF-8 lỗi. Lần kiểm tra đầu bị lỗi do mã hóa chuỗi tiếng Việt khi truyền vào Python; đã sửa cách biểu diễn chuỗi và chạy lại thành công. Đây là kiểm tra tài liệu, không phải test UI.
- Đối chiếu lại SHA-256 của đủ 12 nguồn với audit: không thay đổi.
- Chưa kiểm tra UI, đích anchor, slider, form hoặc gửi dữ liệu. Chưa xác minh quyền ảnh/cặp ảnh hai kỳ, logo, liên hệ chính thức, endpoint và chính sách xử lý dữ liệu. Bản đặc tả có placeholder/điều kiện rõ ràng; các mục này không chặn hoàn tất bước 02 nhưng cần xử lý trước khi xuất bản hoặc tiếp nhận thật.

## Tệp đã tạo ở bước 01

- `docs/source-audit.md`: kiểm kê 12 nguồn, claim/locator/quyền công khai, mâu thuẫn và điều kiện dùng nội dung.
- `docs/tooling.md`: cấu trúc dự án, runtime, trạng thái skill/browser/test, bằng chứng text template.
- `docs/implementation-status.md`: bàn giao bước 01.

Không sửa tài liệu nguồn hoặc dự án khác. Dữ liệu trích xuất tạm ở thư mục temp hệ thống, ngoài public assets.

## Kết quả đã kiểm tra

- Xác định S0283 là project root trong repo hiện hữu; chưa có UI/test trước audit.
- Đọc cấu trúc/nội dung liên quan của đủ 12 tệp Office, gồm 13 slide và toàn bộ sheet; không chạy macro.
- Đối chiếu ba gói và giới hạn dịch vụ. File 09 có câu cũ thiếu 07/10; File 10 có câu cũ thiếu 07. Đã ghi locator và hướng xử lý, không chỉnh nguồn.
- Phân biệt giá trị tĩnh với 23 công thức có cache trong báo giá mẫu; không tính lại workbook, không coi VAT trống là 0.
- Chạy phiên bản Node/Python/npm và kiểm tra module resolution. Browser setup không có phiên khả dụng; Playwright/Lighthouse/axe không resolve tại cwd.
- Đọc text trang giới thiệu template Wix tiếng Anh; không có screenshot/demo render.

## Chưa kiểm tra và blocker

| Hạng mục | Trạng thái | Ảnh hưởng |
|---|---|---|
| Browser/screenshot | Không có browser khả dụng trong bước 13 | Chặn screenshot, visual QA, keyboard/screen reader, console và số đo render |
| Render Office, nguồn nghiên cứu bên ngoài | Chưa thực hiện | Audit chỉ kết luận về nội dung nguồn cung cấp, không chứng nhận bố cục hoặc tính cập nhật các nghiên cứu |
| Quyền ảnh, ảnh hai kỳ/metadata | Người dùng yêu cầu dùng toàn bộ media; 8 ảnh đã tích hợp. Nguồn dữ liệu/tính hợp lệ hai kỳ chưa xác minh độc lập | Hiển thị như minh họa; ảnh 06/08 có nội dung đóng trong bitmap cần lưu ý trước deploy |
| Phê duyệt giá/KPI/SLA/năng lực | Chưa có bằng chứng | Không công khai giá hoặc hứa kết quả; gói giữ trạng thái đề xuất |
| Endpoint form, liên hệ/logo chính thức | Chưa có bằng chứng | Bước form dùng trạng thái demo/placeholder có nhãn nếu chưa bổ sung |
| UI, responsive, a11y, performance, chức năng | Quality 8/8 và regression hiện tại 15/15 đạt; browser vẫn không khả dụng | Source/logic/HTTP đã test; render/E2E/a11y tree/console/Core Web Vitals chưa chạy, không đánh dấu PASS |
| Web root và kiểm tra rò rỉ tài liệu | `src` là web root; HTTP kiểm tra `/docs/source-audit.md` trả 404 | Chưa phải gói deploy; chỉ thêm ảnh đã duyệt vào `src/assets` |

Không có blocker ngăn hoàn tất audit bước 01. Các giới hạn trên cần giữ nguyên khi bàn giao; có tệp nguồn không đồng nghĩa đã được phê duyệt công khai hoặc agent đã được kết nối.

## Bước tiếp theo

Không còn prompt triển khai tiếp theo trong gói 01–14. Trước khi phát hành, xử lý các blocker trong `docs/handoff.md`, chạy kiểm thử browser/production tương ứng và chỉ deploy khi có yêu cầu rõ ràng.
