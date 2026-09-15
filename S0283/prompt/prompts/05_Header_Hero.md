# Dựng Header và Hero

## Hướng dẫn thực thi chung
Đọc `00_PROJECT_BRIEF.md`, `references/SOURCE_MANIFEST.md` và `docs/implementation-status.md` nếu có. Đường dẫn 00/references tính từ thư mục gói prompt; docs/css/js/tests tính từ project root đã xác định ở bước 01. Tuân thủ AGENTS.md và hướng dẫn môi trường. Kiểm tra mã hiện có trước khi sửa; không ghi đè công việc không liên quan. Chỉ làm phạm vi prompt hiện tại, không tự chạy bước tiếp theo hoặc deploy.

Giữ HTML/CSS/JavaScript thuần và bảng màu đã thống nhất. Không bịa dữ liệu, ảnh thực tế, tình trạng gửi form hoặc kết quả test. Khi thiếu thông tin không chặn các việc độc lập: dùng placeholder có nhãn và ghi điểm còn thiếu. Không yêu cầu người dùng xác nhận lại quyết định đã có.

## Đầu vào
Khung bước 04; content và ảnh 01.

## Công việc
Dựng header desktop và nút menu mobile có aria-expanded/aria-controls. Menu mở/đóng, Escape, focus hợp lý; không giả dùng role=menu nếu chỉ điều hướng thông thường. Header sticky nếu hữu ích và scroll-margin-top cho anchors. Hero tiêu đề/mô tả/2 CTA ở trên ảnh ngang lớn. Logo thiếu dùng chữ GASCOLAE, không tự tạo logo chính thức. Ảnh hero đúng tỷ lệ có kích thước khai báo; ưu tiên tải, không lazy-load ảnh LCP. Placeholder có nhãn nếu thiếu.

## Tiêu chí hoàn thành
CTA tới đúng section; đọc rõ ở 360px; không che anchor, không báo ảnh mock là thực tế.

## Bàn giao sau bước này
Cập nhật `docs/implementation-status.md`: bước, file đã sửa, kết quả kiểm tra thực tế, phần chưa kiểm tra, blocker và bước tiếp theo. Trả lời ngắn: đã làm gì, kiểm tra gì, còn thiếu gì. Không đánh dấu PASS nếu chưa chạy kiểm tra tương ứng.
