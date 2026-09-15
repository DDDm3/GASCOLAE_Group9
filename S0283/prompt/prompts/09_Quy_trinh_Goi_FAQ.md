# Dựng quy trình gói dịch vụ và FAQ

## Hướng dẫn thực thi chung
Đọc `00_PROJECT_BRIEF.md`, `references/SOURCE_MANIFEST.md` và `docs/implementation-status.md` nếu có. Đường dẫn 00/references tính từ thư mục gói prompt; docs/css/js/tests tính từ project root đã xác định ở bước 01. Tuân thủ AGENTS.md và hướng dẫn môi trường. Kiểm tra mã hiện có trước khi sửa; không ghi đè công việc không liên quan. Chỉ làm phạm vi prompt hiện tại, không tự chạy bước tiếp theo hoặc deploy.

Giữ HTML/CSS/JavaScript thuần và bảng màu đã thống nhất. Không bịa dữ liệu, ảnh thực tế, tình trạng gửi form hoặc kết quả test. Khi thiếu thông tin không chặn các việc độc lập: dùng placeholder có nhãn và ghi điểm còn thiếu. Không yêu cầu người dùng xác nhận lại quyết định đã có.

## Đầu vào
Content spec và nguồn đối chiếu.

## Công việc
Quy trình 5 bước: khu vực/mục tiêu; thiết kế; khảo sát; phân tích/kiểm chứng; bàn giao. Dùng danh sách có thứ tự.
Gói: Pilot, Standard, Advanced; hiển thị phạm vi/tần suất chỉ khi source audit cho phép, ghi đề xuất/chốt theo khảo sát. Giá liên hệ tư vấn. Không đánh dấu “phổ biến nhất” nếu thiếu bằng chứng. Dashboard/AI ghi thuộc scope nâng cao khi chốt.
FAQ dùng details/summary hoặc button ARIA chuẩn; các câu về nguyên nhân và MRV giữ giới hạn. Tránh accordion lồng nhau. Nút chọn gói dẫn form, có thể điền lựa chọn nhưng không thay đổi nội dung khác.

## Tiêu chí hoàn thành
FAQ hoạt động khi không có JS nếu dùng details; gói không bị biến thành cam kết đã duyệt; mobile đọc được.

## Bàn giao sau bước này
Cập nhật `docs/implementation-status.md`: bước, file đã sửa, kết quả kiểm tra thực tế, phần chưa kiểm tra, blocker và bước tiếp theo. Trả lời ngắn: đã làm gì, kiểm tra gì, còn thiếu gì. Không đánh dấu PASS nếu chưa chạy kiểm tra tương ứng.
