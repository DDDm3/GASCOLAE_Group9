# Sửa lỗi form và kết nối gửi

## Hướng dẫn thực thi chung
Đọc `00_PROJECT_BRIEF.md`, `references/SOURCE_MANIFEST.md` và `docs/implementation-status.md` nếu có. Đường dẫn 00/references tính từ thư mục gói prompt; docs/css/js/tests tính từ project root đã xác định ở bước 01. Tuân thủ AGENTS.md và hướng dẫn môi trường. Kiểm tra mã hiện có trước khi sửa; không ghi đè công việc không liên quan. Chỉ làm phạm vi prompt hiện tại, không tự chạy bước tiếp theo hoặc deploy.

Giữ HTML/CSS/JavaScript thuần và bảng màu đã thống nhất. Không bịa dữ liệu, ảnh thực tế, tình trạng gửi form hoặc kết quả test. Khi thiếu thông tin không chặn các việc độc lập: dùng placeholder có nhãn và ghi điểm còn thiếu. Không yêu cầu người dùng xác nhận lại quyết định đã có.

## Đầu vào
Endpoint nếu có, lỗi network đã loại PII, chế độ demo/live.

## Công việc
Tái hiện bằng dữ liệu giả và mock, không gửi lead thật. Phân biệt validation client, lỗi network/CORS, lỗi server, response nghiệp vụ. Không tắt bảo vệ hay nhúng khóa bí mật để giải quyết. Chỉ thành công khi được server xác nhận. Bảo toàn dữ liệu khi lỗi; cho retry; tránh submit kép. Nếu endpoint thiếu giữ demo rõ ràng.

## Tiêu chí hoàn thành
Test empty/invalid/valid, double submit, timeout, server failure, business failure; ghi trường hợp chưa kiểm tra.

## Bàn giao sau bước này
Cập nhật `docs/implementation-status.md`: bước, file đã sửa, kết quả kiểm tra thực tế, phần chưa kiểm tra, blocker và bước tiếp theo. Trả lời ngắn: đã làm gì, kiểm tra gì, còn thiếu gì. Không đánh dấu PASS nếu chưa chạy kiểm tra tương ứng.
