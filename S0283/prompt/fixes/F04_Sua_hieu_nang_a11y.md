# Sửa lỗi hiệu năng và khả năng tiếp cận

## Hướng dẫn thực thi chung
Đọc `00_PROJECT_BRIEF.md`, `references/SOURCE_MANIFEST.md` và `docs/implementation-status.md` nếu có. Đường dẫn 00/references tính từ thư mục gói prompt; docs/css/js/tests tính từ project root đã xác định ở bước 01. Tuân thủ AGENTS.md và hướng dẫn môi trường. Kiểm tra mã hiện có trước khi sửa; không ghi đè công việc không liên quan. Chỉ làm phạm vi prompt hiện tại, không tự chạy bước tiếp theo hoặc deploy.

Giữ HTML/CSS/JavaScript thuần và bảng màu đã thống nhất. Không bịa dữ liệu, ảnh thực tế, tình trạng gửi form hoặc kết quả test. Khi thiếu thông tin không chặn các việc độc lập: dùng placeholder có nhãn và ghi điểm còn thiếu. Không yêu cầu người dùng xác nhận lại quyết định đã có.

## Đầu vào
Issue cụ thể từ quality-audit và số đo baseline.

## Công việc
Chọn lỗi ảnh hưởng cao; sửa riêng từng nguyên nhân: hero oversized, font blocking, layout shift, contrast, focus, label/alt. Giữ nội dung, không bỏ hình/bản đồ cốt lõi để lấy điểm. Đo lại cùng điều kiện, báo delta và giới hạn. Không dùng màu làm tín hiệu duy nhất trên bản đồ.

## Tiêu chí hoàn thành
Evidence trước/sau; kiểm tra keyboard và screenshot sau sửa; không tái audit vô hạn khi đã đủ.

## Bàn giao sau bước này
Cập nhật `docs/implementation-status.md`: bước, file đã sửa, kết quả kiểm tra thực tế, phần chưa kiểm tra, blocker và bước tiếp theo. Trả lời ngắn: đã làm gì, kiểm tra gì, còn thiếu gì. Không đánh dấu PASS nếu chưa chạy kiểm tra tương ứng.
