# Ma trận kiểm thử S0283

Mỗi dòng ghi PASS / FAIL / NOT RUN / BLOCKED, môi trường, bằng chứng và lỗi liên quan. Chỉ PASS sau thực thi đúng loại kiểm tra.

| ID | Thao tác/điều kiện | Kỳ vọng |
|---|---|---|
| T01 | Mở trang desktop/mobile | Nội dung hiện, ảnh/JS/CSS không lỗi |
| T02 | Bật/tắt menu; Escape; chọn anchor | Trạng thái ARIA đúng, focus hợp lý, tới đúng section |
| T03 | Nhấn CTA hero/gói | Tới form/đầu ra đúng, không bị header che |
| T04 | Range 0,50,100 bằng chuột/phím/cảm ứng | Hai ảnh căn cùng khung; điều khiển và nhãn rõ |
| T05 | Tắt JS | Nội dung đọc được, FAQ/native fallback và cặp ảnh có nghĩa |
| T06 | Mở/đóng FAQ bằng bàn phím | Trạng thái đúng, không bẫy focus |
| T07 | Form trống/email sai/diện tích âm | Lỗi đúng trường, không mất dữ liệu |
| T08 | Chỉ email hợp lệ hoặc chỉ phone hợp lệ | Chấp nhận theo quy tắc ít nhất một liên hệ |
| T09 | Demo form hợp lệ | Nêu chưa gửi; không gọi thành công thật |
| T10 | Mock server OK và business success | Chỉ xác nhận sau response đúng |
| T11 | Timeout,4xx,5xx,business error,submit kép | Lỗi rõ, retry được, không gửi kép |
| T12 | 360/390/768/1024/1440px, zoom 200% | Không tràn ngang, chồng/cắt chữ |
| T13 | Keyboard toàn trang, reduced motion | Focus thấy được, không bẫy, giảm motion |
| T14 | Kiểm tra ảnh/legend/contrast | Alt đúng; 4 lớp; không phụ thuộc chỉ màu |
| T15 | Console/network | Không lỗi không xử lý, tài nguyên mất được ghi nhận |
| T16 | Đo performance và SEO | Có số đo thật nếu chạy; metadata đúng scope |
| T17 | Kiểm tra claim và public bundle | Không giá/PII/tài liệu nội bộ, không claim vô nguồn |

T10–T11 chỉ đánh giá tích hợp triển khai khi có code endpoint; mock PASS không chứng minh backend thật hoạt động. Không gửi thật nếu chưa được cho phép. Báo cáo cần tách test frontend mock và live integration.
