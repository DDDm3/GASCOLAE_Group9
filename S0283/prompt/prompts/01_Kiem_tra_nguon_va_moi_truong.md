# Kiểm tra nguồn và môi trường

## Hướng dẫn thực thi chung
Đọc `00_PROJECT_BRIEF.md`, `references/SOURCE_MANIFEST.md` và `docs/implementation-status.md` nếu có. Đường dẫn 00/references tính từ thư mục gói prompt; docs/css/js/tests tính từ project root đã xác định ở bước 01. Tuân thủ AGENTS.md và hướng dẫn môi trường. Kiểm tra mã hiện có trước khi sửa; không ghi đè công việc không liên quan. Chỉ làm phạm vi prompt hiện tại, không tự chạy bước tiếp theo hoặc deploy.

Giữ HTML/CSS/JavaScript thuần và bảng màu đã thống nhất. Không bịa dữ liệu, ảnh thực tế, tình trạng gửi form hoặc kết quả test. Khi thiếu thông tin không chặn các việc độc lập: dùng placeholder có nhãn và ghi điểm còn thiếu. Không yêu cầu người dùng xác nhận lại quyết định đã có.

## Đầu vào
Bộ nguồn, project root người dùng chỉ định hoặc workspace hiện tại; references/SKILLS_AND_TOOLS.md.

## Công việc
1. Xác định project root và cấu trúc có sẵn; không khởi tạo repo đè lên repo hiện hữu.
2. Kiểm tra đủ 12 tệp; đọc nội dung liên quan bằng công cụ phù hợp, không chạy macro. Lập docs/source-audit.md với claim, nguồn cụ thể, trạng thái và quyền công khai.
3. Đọc hướng dẫn skill phù hợp; kiểm tra runtime/code/browser/test thực sự có. Ghi docs/tooling.md, phân biệt skill đã đọc với đã áp dụng. Không bắt buộc cài cả bốn skill.
4. Kiểm tra template khi truy cập được; lưu mô tả bằng chứng. Không khẳng định pixel-perfect nếu thiếu screenshot.
5. Tạo docs/implementation-status.md. Chưa code UI.

## Tiêu chí hoàn thành
Có bảng nguồn/mâu thuẫn, đặc biệt các câu cũ thiếu 07/10; không đưa nguồn mật vào public. Runtime chưa có được ghi rõ.

## Bàn giao sau bước này
Cập nhật `docs/implementation-status.md`: bước, file đã sửa, kết quả kiểm tra thực tế, phần chưa kiểm tra, blocker và bước tiếp theo. Trả lời ngắn: đã làm gì, kiểm tra gì, còn thiếu gì. Không đánh dấu PASS nếu chưa chạy kiểm tra tương ứng.
