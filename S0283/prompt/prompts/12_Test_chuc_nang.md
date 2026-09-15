# Kiểm thử chức năng

## Hướng dẫn thực thi chung
Đọc `00_PROJECT_BRIEF.md`, `references/SOURCE_MANIFEST.md` và `docs/implementation-status.md` nếu có. Đường dẫn 00/references tính từ thư mục gói prompt; docs/css/js/tests tính từ project root đã xác định ở bước 01. Tuân thủ AGENTS.md và hướng dẫn môi trường. Kiểm tra mã hiện có trước khi sửa; không ghi đè công việc không liên quan. Chỉ làm phạm vi prompt hiện tại, không tự chạy bước tiếp theo hoặc deploy.

Giữ HTML/CSS/JavaScript thuần và bảng màu đã thống nhất. Không bịa dữ liệu, ảnh thực tế, tình trạng gửi form hoặc kết quả test. Khi thiếu thông tin không chặn các việc độc lập: dùng placeholder có nhãn và ghi điểm còn thiếu. Không yêu cầu người dùng xác nhận lại quyết định đã có.

## Đầu vào
Website chạy HTTP; docs/tooling.md; references/TEST_MATRIX.md.

## Công việc
Đọc webapp-testing nếu khả dụng và dùng browser/test runtime được môi trường cho phép. Chọn test JavaScript Playwright nếu được hỗ trợ; không đổi ngôn ngữ website vì ví dụ Python của skill. Viết các test có giá trị cho menu/CTA, range, FAQ, form và lỗi gửi; dùng locator semantic từ DOM đã kiểm tra.
Test desktop/mobile; mock endpoint khi test form để không gửi lead thật. Kiểm tra console error và tài nguyên lỗi. Nếu chưa có endpoint, test đúng nhánh demo và ghi live integration chưa test. Lưu test tái chạy được cùng hướng dẫn; chạy rồi ghi docs/test-report.md, không chỉ viết test. Thiếu runtime ghi NOT RUN/BLOCKED và tiếp tục kiểm tra tĩnh có thể làm.

## Tiêu chí hoàn thành
Có kết quả từng case và evidence; không đồng nhất static inspection với browser PASS; không test chi tiết CSS vụn vặt.

## Bàn giao sau bước này
Cập nhật `docs/implementation-status.md`: bước, file đã sửa, kết quả kiểm tra thực tế, phần chưa kiểm tra, blocker và bước tiếp theo. Trả lời ngắn: đã làm gì, kiểm tra gì, còn thiếu gì. Không đánh dấu PASS nếu chưa chạy kiểm tra tương ứng.
