# Content Accuracy Audit

Đối chiếu ngày 14/09/2026 với `asset/docs/landing_page_content_extracted.txt` (Asset 09, version 1.0).

| Issue | Location | Fix |
| --- | --- | --- |
| Sub-headline Hero đã được rút gọn và không còn câu nguồn về CH₄ giảm, quy đổi CO₂e và dải bất định. | `src/js/data/content.js` → `hero.description`; Hero trong `src/index.html` | Khôi phục nguyên văn sub-headline đã duyệt trong Asset 09. |
| Secondary CTA của Hero đã đổi thành liên kết giải thích hành trình đo. | `src/js/data/content.js` → `hero.secondaryCta`; Hero trong `src/index.html` | Khôi phục “Tư vấn chọn gói dịch vụ” và trỏ đến `#contact`. |
| Nhãn CTA form đã đổi từ copy đã duyệt. | `src/js/data/content.js` → `cta.buttonLabel`; Contact trong `src/index.html` | Khôi phục “Đăng ký tư vấn khảo sát”. |
| Không phát hiện ppm được diễn giải như tCO₂e. | Boundary, Technology, Journey, FAQ và Agent demo | Giữ câu “Không suy tCO₂e trực tiếp từ ppm” và yêu cầu đủ dữ liệu/phương pháp. |
| Không phát hiện flux được mô tả là luôn có hoặc Level 1 có flux/tCO₂e. | Overview, Journey, Deliverables, Service Levels và Agent demo | Giữ định lượng có điều kiện từ Level 2; Level 1 tiếp tục ghi rõ loại trừ. |
| Không phát hiện claim thay Method 21, tự cấp tín chỉ carbon hoặc chứng thư xác minh. | Why GASCOLAE, FAQ, Level 3 và Agent demo | Giữ các câu phủ định và phạm vi “hỗ trợ thẩm định”. |
| Không phát hiện giá số, phần trăm hiệu quả, timeline, chứng nhận, testimonial hoặc logo khách hàng tự tạo. | Toàn bộ public copy và HTML | Không cần sửa; thêm test chống hồi quy cho giá số, phần trăm và social proof giả. |

Audit không xác minh độc lập năng lực kỹ thuật của dịch vụ; nó kiểm tra việc trang bám đúng content specification và giữ nguyên các điều kiện đã được duyệt.
