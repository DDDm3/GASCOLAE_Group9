# Audit giao diện accessibility hiệu năng SEO

## Hướng dẫn thực thi chung
Đọc `00_PROJECT_BRIEF.md`, `references/SOURCE_MANIFEST.md` và `docs/implementation-status.md` nếu có. Đường dẫn 00/references tính từ thư mục gói prompt; docs/css/js/tests tính từ project root đã xác định ở bước 01. Tuân thủ AGENTS.md và hướng dẫn môi trường. Kiểm tra mã hiện có trước khi sửa; không ghi đè công việc không liên quan. Chỉ làm phạm vi prompt hiện tại, không tự chạy bước tiếp theo hoặc deploy.

Giữ HTML/CSS/JavaScript thuần và bảng màu đã thống nhất. Không bịa dữ liệu, ảnh thực tế, tình trạng gửi form hoặc kết quả test. Khi thiếu thông tin không chặn các việc độc lập: dùng placeholder có nhãn và ghi điểm còn thiếu. Không yêu cầu người dùng xác nhận lại quyết định đã có.

## Đầu vào
Website tích hợp, báo cáo bước 12.

## Công việc
Đọc web-quality-audit và reference cần thiết. Chạy công cụ đo có thật nếu môi trường hỗ trợ, nêu URL/build/tool/version/viewport/điều kiện. Rà thủ công bàn phím, focus, contrast, alt, range, lỗi form, giảm chuyển động. Kiểm tra screenshot toàn trang desktop/mobile; công cụ tự động không thay thế visual QA.
Đo tải ảnh hero, font, JS, layout shifts; tối ưu dựa evidence. Không hứa điểm Lighthouse cố định hay gọi số lab là dữ liệu người dùng thật. Kiểm tra heading/title/meta/ảnh lỗi và tài liệu nội bộ không bị public. Lập docs/quality-audit.md với mức nghiêm trọng, bước tái hiện, evidence, sửa đề xuất; ghi NOT RUN cho phép đo thiếu tool.

## Tiêu chí hoàn thành
Báo cáo tách đo thực tế với suy luận; liệt kê lỗi cần sửa theo ảnh hưởng; không tự chứng nhận WCAG chỉ bằng điểm tự động.

## Bàn giao sau bước này
Cập nhật `docs/implementation-status.md`: bước, file đã sửa, kết quả kiểm tra thực tế, phần chưa kiểm tra, blocker và bước tiếp theo. Trả lời ngắn: đã làm gì, kiểm tra gì, còn thiếu gì. Không đánh dấu PASS nếu chưa chạy kiểm tra tương ứng.
