# Kiểm tra cuối và đóng gói website

## Hướng dẫn thực thi chung
Đọc `00_PROJECT_BRIEF.md`, `references/SOURCE_MANIFEST.md` và `docs/implementation-status.md` nếu có. Đường dẫn 00/references tính từ thư mục gói prompt; docs/css/js/tests tính từ project root đã xác định ở bước 01. Tuân thủ AGENTS.md và hướng dẫn môi trường. Kiểm tra mã hiện có trước khi sửa; không ghi đè công việc không liên quan. Chỉ làm phạm vi prompt hiện tại, không tự chạy bước tiếp theo hoặc deploy.

Giữ HTML/CSS/JavaScript thuần và bảng màu đã thống nhất. Không bịa dữ liệu, ảnh thực tế, tình trạng gửi form hoặc kết quả test. Khi thiếu thông tin không chặn các việc độc lập: dùng placeholder có nhãn và ghi điểm còn thiếu. Không yêu cầu người dùng xác nhận lại quyết định đã có.

## Đầu vào
Báo cáo test/audit và mã đã sửa lỗi.

## Công việc
Đối chiếu nội dung với source audit, rà public bundle không chứa workbook, báo giá nội bộ, secrets/PII. Tổng hợp docs/handoff.md: cách chạy, thay 8 ảnh, chỉnh màu, kết nối form, test commands, giới hạn còn lại. Xác nhận placeholder/demo còn ở đâu và mức sẵn sàng; không gọi production-ready khi còn blocker.
Chỉ test lại vùng ảnh hưởng và critical user journeys sau sửa. Tạo gói mã nguồn website riêng cùng README, docs cần thiết, tests; loại cache/node_modules và nguồn nội bộ. Không deploy công khai khi chưa có yêu cầu. Nếu chưa có backend/ảnh thật, bàn giao đúng trạng thái prototype.

## Tiêu chí hoàn thành
Artifact mở được, đường dẫn tương đối đúng, các giới hạn được ghi rõ; không báo mọi thứ PASS khi có NOT RUN.

## Bàn giao sau bước này
Cập nhật `docs/implementation-status.md`: bước, file đã sửa, kết quả kiểm tra thực tế, phần chưa kiểm tra, blocker và bước tiếp theo. Trả lời ngắn: đã làm gì, kiểm tra gì, còn thiếu gì. Không đánh dấu PASS nếu chưa chạy kiểm tra tương ứng.
