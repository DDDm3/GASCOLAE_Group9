# Bối cảnh và quy tắc dự án S0283

## Mục tiêu
Tạo landing page tiếng Việt cho GASCOLAE, dịch vụ S0283 Theo dõi sự thay đổi thảm thực vật. Khách hàng: chủ rừng, khu bảo tồn, doanh nghiệp nông–lâm nghiệp, dự án phục hồi/hoàn nguyên. Chuyển đổi chính: gửi khu vực và nhu cầu giám sát để được tư vấn.

## Công nghệ
HTML5, CSS3, JavaScript thuần; không tự chuyển sang React, Next.js, Vue, TypeScript hoặc Tailwind. Có thể dùng công cụ phát triển/test riêng khi cần; chúng không trở thành framework của website. Ưu tiên semantic HTML, CSS variables, Grid/Flexbox, progressive enhancement. Chạy bằng HTTP local server; không phụ thuộc file://. Không tự triển khai công khai, mua dịch vụ, gửi form thật hoặc cài skill toàn cục.

## Mẫu tham khảo và điều đã biết
- Mẫu: https://vi.wix.com/website-template/view/html/wh-1154
- Bản tiếng Anh đọc được: https://www.wix.com/website-template/view/html/wh-1154
- Demo: https://www.wix.com/demone2/wh-hiabove
- Tên: Start Up Landing Page (Clean), demo HIABOVE.
- Đã đọc nội dung: Explore the Sky; giới thiệu; ba dòng drone; ba điểm nổi bật; testimonials; form demo.
- CHƯA xác nhận bản render đầy đủ, bố cục pixel và chuyển động gốc. Không nói đã xem nếu chỉ đọc HTML/text. Kiểm tra preview/screenshot qua công cụ được môi trường cho phép. Nếu không truy cập được, tiếp tục theo layout đề xuất dưới đây và ghi giới hạn; không đoán chi tiết gốc.
- Chỉ lấy cảm hứng cấu trúc, không sao chép thương hiệu, testimonials, hình ảnh hoặc mã độc quyền của Wix.

## Hướng thiết kế đã thống nhất
Kem ấm – olive – màu đất. Không quay lại xanh rừng #12735A hoặc xanh dương chủ đạo vì người dùng đã bác bỏ.
| Vai trò | HEX |
|---|---|
| Nền chính | #F5F2E9 |
| Nền phụ | #E7E1D3 |
| Chữ chính/footer | #292D24 |
| Nút chính | #59633D |
| Nền bổ sung | #DCE2D2 |
| Điểm nhấn nhỏ | #B86646 |
Màu bản đồ có ý nghĩa dữ liệu riêng, không ép theo màu thương hiệu. Kiểm tra tương phản cho từng cặp chữ/nền; không mặc định màu đất nung phù hợp chữ nhỏ. Font có đủ dấu tiếng Việt, tối đa hai họ; ưu tiên tự lưu font khi có quyền. Không mặc định dùng serif hay hiệu ứng trang trí hàng loạt.

## Layout đề xuất 9 phần
1. Header: logo, menu, CTA.
2. Hero: tiêu đề/mô tả/CTA phía trên, ảnh UAV ngang lớn phía dưới.
3. Vấn đề và giải pháp: ảnh trái 45%, nội dung phải 55%.
4. So sánh hai kỳ: khối tương tác lớn, nhãn kỳ và chú giải.
5. Kết quả bàn giao: bản đồ lớn, danh sách đầu ra, mẫu thống kê.
6. Ứng dụng: ba thẻ rừng trồng/tái sinh, suy giảm tán, phục hồi/hoàn nguyên.
7. Quy trình: năm bước có thứ tự thực tế.
8. Gói dịch vụ và FAQ: ba gói, tiếp theo FAQ.
9. Form tư vấn và footer.
Trên mobile xếp một cột, không cuộn ngang toàn trang; header không che anchor; thanh so sánh có bàn phím và cảm ứng.

## Ranh giới nội dung
Dịch vụ khảo sát lặp UAV RGB/đa phổ, chuẩn hóa và căn chỉnh dữ liệu, lập bản đồ tăng/ổn định/suy giảm/không đủ dữ liệu, thống kê theo lô và điểm nóng. Không tự kết luận nguyên nhân, lượng carbon hoặc chứng nhận MRV. Không gọi là real-time. AI/dashboard/API chỉ ở cấu hình nâng cao khi chốt, không mặc định.
Các cấu hình trong tài liệu vẫn là đề xuất: Pilot ≤50 ha/2 kỳ; Standard ≤200 ha/4 kỳ trong 12 tháng; Advanced ≤500 ha/6 kỳ trong 12 tháng. Dùng sau đối chiếu nguồn, giữ trạng thái. Không niêm yết giá chưa duyệt, không công khai cost/margin, KPI, SLA hoặc thông tin nội bộ. Không dựng lời chứng thực hoặc số dự án giả.
File 09 có câu cũ chưa có 07/10; File 10 có câu cũ thiếu 07. Hiện bộ nguồn có cả hai. Có file không đồng nghĩa đã phê duyệt công bố hoặc agent đã được triển khai. Không sửa file nguồn trong nhiệm vụ tạo website.

## Hình ảnh và video
8 ảnh riêng biệt: 01 toàn cảnh UAV; 02 khảo sát thực địa; 03 kỳ gốc; 04 kỳ theo dõi; 05 bản đồ biến động; 06 báo cáo/thống kê; 07 suy giảm tán; 08 phục hồi/hoàn nguyên. Ảnh 01 dùng lại ở ứng dụng. Hai kỳ phải cùng khung, thời điểm và cách chuẩn hóa phù hợp. Nếu RGB so với change map thì đặt nhãn theo loại dữ liệu, không gọi trước/sau. Không dùng ảnh AI làm bằng chứng khảo sát. Thiếu tài sản dùng placeholder rõ ràng hoặc minh họa có nhãn; không tự bịa số liệu.
Phiên bản đầu không cần video. Tùy chọn sau: 20–30 giây, có controls, phụ đề, poster, không tự phát tiếng. Chưa có video thì không dựng nút Play giả.

## Kết quả dự kiến của dự án khi thực thi các prompt
index.html; css/styles.css; js/main.js; assets/images; docs; tests nếu có công cụ phù hợp. Tài liệu nguồn để ngoài public root, không đóng gói cùng bản public. Form chỉ báo thành công khi endpoint xác nhận; khi chưa có backend, hiển thị trạng thái demo rõ ràng. Chatbot không triển khai ở bản đầu.
