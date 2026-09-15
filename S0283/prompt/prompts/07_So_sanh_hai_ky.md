# Dựng tương tác so sánh hai kỳ

## Hướng dẫn thực thi chung
Đọc `00_PROJECT_BRIEF.md`, `references/SOURCE_MANIFEST.md` và `docs/implementation-status.md` nếu có. Đường dẫn 00/references tính từ thư mục gói prompt; docs/css/js/tests tính từ project root đã xác định ở bước 01. Tuân thủ AGENTS.md và hướng dẫn môi trường. Kiểm tra mã hiện có trước khi sửa; không ghi đè công việc không liên quan. Chỉ làm phạm vi prompt hiện tại, không tự chạy bước tiếp theo hoặc deploy.

Giữ HTML/CSS/JavaScript thuần và bảng màu đã thống nhất. Không bịa dữ liệu, ảnh thực tế, tình trạng gửi form hoặc kết quả test. Khi thiếu thông tin không chặn các việc độc lập: dùng placeholder có nhãn và ghi điểm còn thiếu. Không yêu cầu người dùng xác nhận lại quyết định đã có.

## Đầu vào
Ảnh 03–04 và metadata đã xác nhận.

## Công việc
Tạo section so-sanh bằng range input có label để điều khiển lớp ảnh clip; CSS/JS thuần. Cùng khung/aspect-ratio/object-position cho hai ảnh; giá trị 0–100 rõ. Hỗ trợ chuột, cảm ứng, phím mũi tên/Home/End theo range native. Có nhãn Kỳ gốc/Kỳ theo dõi và ngày chỉ khi có nguồn. Caption và bản mô tả văn bản không phụ thuộc màu. JS tắt thì hiện hai ảnh/caption có nghĩa. Không chặn cuộn dọc trên mobile. Nếu thiếu cặp dữ liệu hợp lệ thì khối mô phỏng được gắn nhãn rõ, không tạo số liệu hoặc ngày giả.

## Tiêu chí hoàn thành
Thử 0/50/100%, resize và bàn phím. Cả hai ảnh thẳng hàng; không có lỗi JS; không mô tả RGB/change map là hai thời điểm.

## Bàn giao sau bước này
Cập nhật `docs/implementation-status.md`: bước, file đã sửa, kết quả kiểm tra thực tế, phần chưa kiểm tra, blocker và bước tiếp theo. Trả lời ngắn: đã làm gì, kiểm tra gì, còn thiếu gì. Không đánh dấu PASS nếu chưa chạy kiểm tra tương ứng.
