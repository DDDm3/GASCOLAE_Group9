# Sửa lỗi bố cục và mobile

## Hướng dẫn thực thi chung
Đọc `00_PROJECT_BRIEF.md`, `references/SOURCE_MANIFEST.md` và `docs/implementation-status.md` nếu có. Đường dẫn 00/references tính từ thư mục gói prompt; docs/css/js/tests tính từ project root đã xác định ở bước 01. Tuân thủ AGENTS.md và hướng dẫn môi trường. Kiểm tra mã hiện có trước khi sửa; không ghi đè công việc không liên quan. Chỉ làm phạm vi prompt hiện tại, không tự chạy bước tiếp theo hoặc deploy.

Giữ HTML/CSS/JavaScript thuần và bảng màu đã thống nhất. Không bịa dữ liệu, ảnh thực tế, tình trạng gửi form hoặc kết quả test. Khi thiếu thông tin không chặn các việc độc lập: dùng placeholder có nhãn và ghi điểm còn thiếu. Không yêu cầu người dùng xác nhận lại quyết định đã có.

## Đầu vào
Ảnh chụp lỗi, viewport và bước tái hiện nếu có; nếu chưa có tự kiểm tra các viewport mục tiêu.

## Công việc
Tái hiện lỗi, xác định phần tử gây tràn/chồng/cắt chữ qua DOM và screenshot. Sửa nguyên nhân: width/min-width, grid, wrapping, image ratio, sticky offset. Không che bằng overflow hidden toàn trang, không giảm toàn bộ font để ép vừa. Chỉ sửa section liên quan, giữ bảng màu và cấu trúc.

## Tiêu chí hoàn thành
Tái kiểm tra viewport lỗi và một viewport lân cận, 200% zoom; lưu trước/sau khi có tool.

## Bàn giao sau bước này
Cập nhật `docs/implementation-status.md`: bước, file đã sửa, kết quả kiểm tra thực tế, phần chưa kiểm tra, blocker và bước tiếp theo. Trả lời ngắn: đã làm gì, kiểm tra gì, còn thiếu gì. Không đánh dấu PASS nếu chưa chạy kiểm tra tương ứng.
