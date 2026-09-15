# Tích hợp và hoàn thiện responsive

## Hướng dẫn thực thi chung
Đọc `00_PROJECT_BRIEF.md`, `references/SOURCE_MANIFEST.md` và `docs/implementation-status.md` nếu có. Đường dẫn 00/references tính từ thư mục gói prompt; docs/css/js/tests tính từ project root đã xác định ở bước 01. Tuân thủ AGENTS.md và hướng dẫn môi trường. Kiểm tra mã hiện có trước khi sửa; không ghi đè công việc không liên quan. Chỉ làm phạm vi prompt hiện tại, không tự chạy bước tiếp theo hoặc deploy.

Giữ HTML/CSS/JavaScript thuần và bảng màu đã thống nhất. Không bịa dữ liệu, ảnh thực tế, tình trạng gửi form hoặc kết quả test. Khi thiếu thông tin không chặn các việc độc lập: dùng placeholder có nhãn và ghi điểm còn thiếu. Không yêu cầu người dùng xác nhận lại quyết định đã có.

## Đầu vào
Toàn bộ section bước 05–10.

## Công việc
Rà toàn trang để thống nhất CSS, spacing, headings, CTA và hình ảnh. Kiểm tra ở 360, 390, 768, 1024, 1440px; zoom 200%; chữ tiếng Việt dài. Không dùng overflow-x:hidden để che lỗi cấu trúc. Giảm chuyển động theo prefers-reduced-motion, không animate cả bản đồ hoặc autoplay. Thêm title/meta description dựa File 09; canonical/OG URL chỉ khi có domain thật, không để example.com công khai. Đường dẫn ảnh/link sạch. Không thêm chatbot giả.

## Tiêu chí hoàn thành
Không tràn ngang/che chữ, không link chết, không lỗi JS; nội dung chính hoạt động khi JS tắt; screenshot nếu runtime cho phép.

## Bàn giao sau bước này
Cập nhật `docs/implementation-status.md`: bước, file đã sửa, kết quả kiểm tra thực tế, phần chưa kiểm tra, blocker và bước tiếp theo. Trả lời ngắn: đã làm gì, kiểm tra gì, còn thiếu gì. Không đánh dấu PASS nếu chưa chạy kiểm tra tương ứng.
