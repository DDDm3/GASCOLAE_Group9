# Sửa lỗi JavaScript và thanh so sánh

## Hướng dẫn thực thi chung
Đọc `00_PROJECT_BRIEF.md`, `references/SOURCE_MANIFEST.md` và `docs/implementation-status.md` nếu có. Đường dẫn 00/references tính từ thư mục gói prompt; docs/css/js/tests tính từ project root đã xác định ở bước 01. Tuân thủ AGENTS.md và hướng dẫn môi trường. Kiểm tra mã hiện có trước khi sửa; không ghi đè công việc không liên quan. Chỉ làm phạm vi prompt hiện tại, không tự chạy bước tiếp theo hoặc deploy.

Giữ HTML/CSS/JavaScript thuần và bảng màu đã thống nhất. Không bịa dữ liệu, ảnh thực tế, tình trạng gửi form hoặc kết quả test. Khi thiếu thông tin không chặn các việc độc lập: dùng placeholder có nhãn và ghi điểm còn thiếu. Không yêu cầu người dùng xác nhận lại quyết định đã có.

## Đầu vào
Case lỗi menu/range/FAQ/CTA và console log.

## Công việc
Tái hiện trước, kiểm tra selector, event listeners trùng, thời điểm DOM, null guards và resize. Sửa tối thiểu; không thêm framework. Với range kiểm tra căn ảnh và CSS clipping, phím/cảm ứng. Với menu kiểm tra aria/focus/Escape. Thêm regression test cho hành vi lỗi nếu có runtime.

## Tiêu chí hoàn thành
Case lỗi hết, luồng bàn phím và mobile không bị ảnh hưởng, không có listener nhân đôi.

## Bàn giao sau bước này
Cập nhật `docs/implementation-status.md`: bước, file đã sửa, kết quả kiểm tra thực tế, phần chưa kiểm tra, blocker và bước tiếp theo. Trả lời ngắn: đã làm gì, kiểm tra gì, còn thiếu gì. Không đánh dấu PASS nếu chưa chạy kiểm tra tương ứng.
