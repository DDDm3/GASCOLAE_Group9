# Dựng form tư vấn và footer

## Hướng dẫn thực thi chung
Đọc `00_PROJECT_BRIEF.md`, `references/SOURCE_MANIFEST.md` và `docs/implementation-status.md` nếu có. Đường dẫn 00/references tính từ thư mục gói prompt; docs/css/js/tests tính từ project root đã xác định ở bước 01. Tuân thủ AGENTS.md và hướng dẫn môi trường. Kiểm tra mã hiện có trước khi sửa; không ghi đè công việc không liên quan. Chỉ làm phạm vi prompt hiện tại, không tự chạy bước tiếp theo hoặc deploy.

Giữ HTML/CSS/JavaScript thuần và bảng màu đã thống nhất. Không bịa dữ liệu, ảnh thực tế, tình trạng gửi form hoặc kết quả test. Khi thiếu thông tin không chặn các việc độc lập: dùng placeholder có nhãn và ghi điểm còn thiếu. Không yêu cầu người dùng xác nhận lại quyết định đã có.

## Đầu vào
Trạng thái endpoint và thông tin liên hệ có thật.

## Công việc
Tạo form với tên/đơn vị, email hoặc số liên hệ, địa điểm/khu vực, diện tích ước tính, mục tiêu; tần suất và baseline tùy chọn. Quy tắc email hoặc số liên hệ: ít nhất một trường hợp lệ, không bắt buộc cả hai. Diện tích nếu nhập phải lớn hơn 0. Label thật, lỗi cạnh trường liên kết aria-describedby, giữ dữ liệu khi lỗi.
Nếu chưa có endpoint: hiển thị “Bản demo — thông tin chưa được gửi”, nút kiểm tra thông tin không báo gửi thật. Không dùng mailto giả làm gửi thành công. Nếu có endpoint được cấu hình: trạng thái đang gửi, ngăn trùng, thành công chỉ khi phản hồi nghiệp vụ xác nhận; xử lý timeout/4xx/5xx và cho thử lại. Không nhúng secret, không lưu PII vào log/localStorage mặc định. Footer chỉ dùng contact thật; link chính sách thiếu không dựng trang pháp lý giả.

## Tiêu chí hoàn thành
Dữ liệu rỗng/sai/hợp lệ được xử lý rõ; Enter và bàn phím dùng được; không gửi lead thật khi test.

## Bàn giao sau bước này
Cập nhật `docs/implementation-status.md`: bước, file đã sửa, kết quả kiểm tra thực tế, phần chưa kiểm tra, blocker và bước tiếp theo. Trả lời ngắn: đã làm gì, kiểm tra gì, còn thiếu gì. Không đánh dấu PASS nếu chưa chạy kiểm tra tương ứng.
