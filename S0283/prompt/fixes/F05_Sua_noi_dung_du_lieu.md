# Sửa nội dung sai nguồn

## Hướng dẫn thực thi chung
Đọc `00_PROJECT_BRIEF.md`, `references/SOURCE_MANIFEST.md` và `docs/implementation-status.md` nếu có. Đường dẫn 00/references tính từ thư mục gói prompt; docs/css/js/tests tính từ project root đã xác định ở bước 01. Tuân thủ AGENTS.md và hướng dẫn môi trường. Kiểm tra mã hiện có trước khi sửa; không ghi đè công việc không liên quan. Chỉ làm phạm vi prompt hiện tại, không tự chạy bước tiếp theo hoặc deploy.

Giữ HTML/CSS/JavaScript thuần và bảng màu đã thống nhất. Không bịa dữ liệu, ảnh thực tế, tình trạng gửi form hoặc kết quả test. Khi thiếu thông tin không chặn các việc độc lập: dùng placeholder có nhãn và ghi điểm còn thiếu. Không yêu cầu người dùng xác nhận lại quyết định đã có.

## Đầu vào
Claim nghi vấn và tài liệu nguồn phiên bản cụ thể.

## Công việc
Truy về sheet/ô/mục/slide, xác định lỗi stale source, đề xuất bị biến thành fact, giá nội bộ hoặc nội dung sai service. Sửa copy và source-audit đồng thời, không sửa tài liệu đầu vào. Nếu thiếu bằng chứng thay bằng diễn đạt giới hạn hoặc bỏ claim. Rà các bản lặp của claim trong meta, alt, FAQ và JS.

## Tiêu chí hoàn thành
Mọi vị trí liên quan đồng bộ; không đưa nguồn/internal ra UI; ghi nguồn thay đổi và điều chưa xác minh.

## Bàn giao sau bước này
Cập nhật `docs/implementation-status.md`: bước, file đã sửa, kết quả kiểm tra thực tế, phần chưa kiểm tra, blocker và bước tiếp theo. Trả lời ngắn: đã làm gì, kiểm tra gì, còn thiếu gì. Không đánh dấu PASS nếu chưa chạy kiểm tra tương ứng.
