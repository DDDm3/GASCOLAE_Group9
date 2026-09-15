# Dựng nền tảng HTML và CSS

## Hướng dẫn thực thi chung
Đọc `00_PROJECT_BRIEF.md`, `references/SOURCE_MANIFEST.md` và `docs/implementation-status.md` nếu có. Đường dẫn 00/references tính từ thư mục gói prompt; docs/css/js/tests tính từ project root đã xác định ở bước 01. Tuân thủ AGENTS.md và hướng dẫn môi trường. Kiểm tra mã hiện có trước khi sửa; không ghi đè công việc không liên quan. Chỉ làm phạm vi prompt hiện tại, không tự chạy bước tiếp theo hoặc deploy.

Giữ HTML/CSS/JavaScript thuần và bảng màu đã thống nhất. Không bịa dữ liệu, ảnh thực tế, tình trạng gửi form hoặc kết quả test. Khi thiếu thông tin không chặn các việc độc lập: dùng placeholder có nhãn và ghi điểm còn thiếu. Không yêu cầu người dùng xác nhận lại quyết định đã có.

## Đầu vào
Content/design spec.

## Công việc
Tạo index.html, css/styles.css, js/main.js. Đặt lang=vi, viewport, semantic landmarks và skip link. Tạo section IDs: tong-quan, giai-phap, so-sanh, ket-qua, ung-dung, quy-trinh, goi-dich-vu, faq, lien-he; header/footer ngoài nội dung chính. CSS variables đúng bảng màu; typography, container, buttons, focus, spacing, responsive cơ bản. Nội dung chính phải hiện khi JS tắt. Không thêm framework/CDN vô cớ. Chưa dựng các tương tác phức tạp. Ghi cách chạy HTTP local vào README của website.

## Tiêu chí hoàn thành
Link CSS/JS đúng; HTML không ID trùng; không đưa tài liệu nguồn vào public; không thay đổi định hướng.

## Bàn giao sau bước này
Cập nhật `docs/implementation-status.md`: bước, file đã sửa, kết quả kiểm tra thực tế, phần chưa kiểm tra, blocker và bước tiếp theo. Trả lời ngắn: đã làm gì, kiểm tra gì, còn thiếu gì. Không đánh dấu PASS nếu chưa chạy kiểm tra tương ứng.
