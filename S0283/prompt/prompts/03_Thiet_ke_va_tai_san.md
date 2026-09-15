# Thiết kế và kế hoạch 8 ảnh

## Hướng dẫn thực thi chung
Đọc `00_PROJECT_BRIEF.md`, `references/SOURCE_MANIFEST.md` và `docs/implementation-status.md` nếu có. Đường dẫn 00/references tính từ thư mục gói prompt; docs/css/js/tests tính từ project root đã xác định ở bước 01. Tuân thủ AGENTS.md và hướng dẫn môi trường. Kiểm tra mã hiện có trước khi sửa; không ghi đè công việc không liên quan. Chỉ làm phạm vi prompt hiện tại, không tự chạy bước tiếp theo hoặc deploy.

Giữ HTML/CSS/JavaScript thuần và bảng màu đã thống nhất. Không bịa dữ liệu, ảnh thực tế, tình trạng gửi form hoặc kết quả test. Khi thiếu thông tin không chặn các việc độc lập: dùng placeholder có nhãn và ghi điểm còn thiếu. Không yêu cầu người dùng xác nhận lại quyết định đã có.

## Đầu vào
Content spec; bảng màu và layout brief.

## Công việc
Áp dụng frontend-design nếu đọc được. Lập docs/design-spec.md: tokens màu, font có tiếng Việt, kích thước chữ linh hoạt, khoảng cách, giới hạn chiều rộng và các bố cục mobile/desktop. Giữ kem–olive đã chọn. Soát tính đặc trưng S0283 và tránh 9 section toàn thẻ giống nhau.
Lập docs/asset-manifest.md đủ 8 ảnh: tên file dự kiến, vị trí, tỷ lệ, nguồn/quyền, thật/minh họa/thiếu, alt text, caption. Tạo thư mục assets/images nhưng chưa tải ảnh không rõ quyền. Cặp hai kỳ phải hợp lệ; dữ liệu thiếu dùng placeholder rõ ràng. V1 không video; optional sau.

## Tiêu chí hoàn thành
Có bản thiết kế cụ thể đủ để code; không giả định đã có ảnh; không dùng bản đồ giả làm bằng chứng.

## Bàn giao sau bước này
Cập nhật `docs/implementation-status.md`: bước, file đã sửa, kết quả kiểm tra thực tế, phần chưa kiểm tra, blocker và bước tiếp theo. Trả lời ngắn: đã làm gì, kiểm tra gì, còn thiếu gì. Không đánh dấu PASS nếu chưa chạy kiểm tra tương ứng.
