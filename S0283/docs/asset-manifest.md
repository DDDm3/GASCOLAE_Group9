# Kế hoạch 8 ảnh S0283

Ngày 15/09/2026. Thư mục `assets/images` đã tồn tại và có đủ tám file; đã mở xem từng ảnh. Không tải, tạo, chỉnh sửa, đổi tên hoặc chuyển đổi ảnh ở bước 03.

## Trạng thái chung

- Nguồn cung cấp: các file có sẵn trong workspace. Chưa có tác giả, giấy phép, nguồn dữ liệu gốc hoặc quyền công khai kèm theo. Không xác nhận thật hay AI chỉ dựa vào hình thức ảnh.
- Cả 8 file có **0 mục EXIF** khi đọc bằng Pillow; PNG cũng không có metadata trong `info`. Thiếu EXIF không chứng minh ảnh giả, nhưng không dùng chữ đóng trong ảnh để xác minh ngày bay hoặc vị trí.
- Ngày 15/09/2026, người dùng yêu cầu dùng toàn bộ tài sản. Tất cả 8 ảnh, 4 biến thể logo và 1 video đã được sao chép nguyên trạng vào `src/assets` và tham chiếu trên trang. Đây là chỉ dẫn mới thay cho quyết định dùng placeholder trước đó.
- Alt và caption đã được áp dụng trong HTML. Ảnh dữ liệu được ghi là minh họa; nguồn gốc, dữ liệu nền và tính thực địa vẫn chưa được kiểm chứng độc lập.

## Bảng 8 slot

Tất cả đường dẫn nguồn nằm dưới `assets/images/`. Tên WebP là dự kiến, **chưa được tạo**; chỉ áp dụng sau khi duyệt hoặc thay bằng tài sản mới phù hợp.

| ID / file nguồn → tên public dự kiến | Vị trí | Kích thước gốc / tỷ lệ hiển thị | Nguồn, quyền, thật/minh họa/thiếu | Alt dự kiến | Caption dự kiến / placeholder hiện tại |
|---|---|---|---|---|---|
| 01 `S0283_1.jpg` → `src/assets/images/S0283_1.jpg` | Hero; dùng lại thẻ rừng trồng/tái sinh; poster video | 1024×572; hero giữ 256:143 gần 16:9; thẻ 4:3 | Đã tích hợp theo yêu cầu; nguồn dữ liệu chưa xác minh độc lập, dùng như minh họa | Toàn cảnh các lô cây trồng trên đồi và đường đi giữa rừng. | “Hình minh họa toàn cảnh khu vực rừng trồng nhìn từ trên cao.” |
| 02 `S0283_2.jpg` → `src/assets/images/S0283_2.jpg` | Vấn đề/giải pháp | 1024×765; giữ tỷ lệ gần 4:3 | Đã tích hợp theo yêu cầu; có người xuất hiện, chưa xác minh danh tính hoặc thiết bị thuộc GASCOLAE | Hai người chuẩn bị thiết bị định vị và UAV bên đường trong khu vực trồng rừng. | “Hình minh họa khảo sát hiện trường với thiết bị định vị và UAV.” |
| 03 `S0283_3.jpg` → `src/assets/images/S0283_3.jpg` | Bên kỳ gốc của so sánh | 1024×572; giữ nguyên 256:143, cùng khung với 04 | Đã tích hợp theo yêu cầu; dữ liệu gốc chưa xác minh, dùng như minh họa | Ảnh khu vực trồng cây nhìn từ trên cao, có đường ranh và nhãn lô. | “Minh họa kỳ gốc — nhãn 03/2026 trong ảnh.” |
| 04 `S0283_4.jpg` → `src/assets/images/S0283_4.jpg` | Bên kỳ theo dõi | 1024×572; giữ nguyên 256:143, không crop khác 03 | Đã tích hợp theo yêu cầu; dữ liệu gốc chưa xác minh, dùng như minh họa | Ảnh khu vực có ranh lô tương tự ảnh đối chiếu, với một số khoảng tán thưa. | “Minh họa kỳ theo dõi — nhãn 09/2026 trong ảnh.” |
| 05 `S0283_5.jpg` → `src/assets/images/S0283_5.jpg` | Bản đồ lớn phần kết quả | 1024×765; giữ nguyên, `object-fit: contain` | Đã tích hợp theo yêu cầu; chưa có raster/vector gốc để kiểm tra, dùng như minh họa | Bản đồ có các vùng màu, ranh lô và chú giải tăng, ổn định, suy giảm, không đủ dữ liệu. | “Minh họa bản đồ biến động theo bốn lớp dữ liệu.” |
| 06 `S0283_6.png` → `src/assets/images/S0283_6.png` | Minh họa báo cáo/thống kê phần kết quả | 1600×1205; giữ nguyên 4:3 | Đã tích hợp nguyên trạng theo yêu cầu; ảnh có nhãn **INTERNAL / CONFIDENTIAL**, số liệu và tên người | Mẫu báo cáo định kỳ gồm bảng thống kê, biểu đồ, thông tin kiểm soát chất lượng và phê duyệt kỹ thuật. | “Tài sản minh họa mẫu báo cáo định kỳ và thống kê theo lô.” |
| 07 `S0283_7.jpg` → `src/assets/images/S0283_7.jpg` | Thẻ suy giảm tán | 1024×765; giữ nguyên 4:3 | Đã tích hợp theo yêu cầu; vùng điểm nóng chưa được kiểm chứng, dùng như minh họa | Vùng tán cây thưa được khoanh đường nét đứt và ghi chú cần kiểm tra thực địa. | “Vùng ưu tiên kiểm tra thực địa.” |
| 08 `S0283_8.jpg` → `src/assets/images/S0283_8.jpg` | Thẻ phục hồi/hoàn nguyên | 1024×765; giữ nguyên 4:3 | Đã tích hợp nguyên trạng theo yêu cầu; ảnh có claim giấy phép và thông tin vị trí chưa được audit xác minh | Cảnh khu đất có các hàng cây trồng mới cạnh sườn đồi. | “Khu vực phục hồi và hoàn nguyên.” |

## Phát hiện từ kiểm tra trực quan

### 01 và 02

Ảnh 01 là góc nhìn trên cao, không thấy UAV trong khung; không viết alt “drone đang bay”. Ảnh 02 có người và thiết bị, không suy ra danh tính, chủ sở hữu thiết bị hay năng lực doanh nghiệp. Khi được duyệt, giữ trọn người, thiết bị định vị và UAV; không ép ảnh 02 vào khung chân dung 4:5 làm mất ngữ cảnh.

### Cặp 03/04

- Cùng kích thước và các tuyến đường/ranh lô nhìn tương tự; 03 đóng nhãn “KỲ GỐC: 03/2026”, 04 “KỲ THEO DÕI: 09/2026”. Đây là chữ trong bitmap, không là ngày khảo sát đã xác minh.
- Cả hai là ảnh nền RGB có nhãn lô, không phải trường hợp một ảnh RGB và một change map. Tuy vậy, hình giống khung không chứng minh đồng đăng ký hay khả năng so sánh khoa học.
- Có mã lô lặp lại ở nhiều vị trí trong ảnh; cần đối chiếu ranh giới và mã lô gốc, không dùng chúng làm khóa liên kết bảng dữ liệu website.
- Cần bổ sung: quyền công khai, nguồn ảnh gốc, ngày/giờ thu nhận, cùng AOI, hệ tọa độ/độ phân giải, thông số cảm biến, điều kiện mùa/ánh sáng, cách chuẩn hóa và kết quả kiểm tra căn chỉnh.
- Quyết định hiện tại: hiển thị hai ảnh cạnh nhau với nhãn minh họa. Không đưa tháng đóng trong ảnh thành chứng cứ khảo sát; slider tương tác vẫn để bước 07. Không chỉnh bitmap.

### 05 và 07

Ảnh 05 có lớp màu, chú giải bốn loại, mũi bắc và thước tỷ lệ; chưa có dữ liệu nền để xác minh lớp/mốc thời gian/tỷ lệ. Ảnh 07 có nhãn điểm nóng và nhiều thước/mũi bắc, cần kiểm tra lại độ nhất quán trước khi dùng làm ví dụ dữ liệu. Không trích diện tích, tọa độ, kết luận tăng/giảm hoặc nguyên nhân từ các ảnh này. Không tô màu lại để hợp bảng màu thương hiệu.

### 06 — đã dùng nguyên trạng theo yêu cầu mới

Đã quan sát nhãn **INTERNAL / CONFIDENTIAL**, thông tin dự án/khách hàng, dữ liệu diện tích/tỷ lệ, thông số đo, tên người và câu xác nhận ký/duyệt. Người dùng đã yêu cầu dùng toàn bộ tài sản nên ảnh được hiển thị nguyên trạng. Các câu và số trong bitmap không được chép thành claim HTML hoặc dùng để chứng minh KPI. Không đổi palette website sang xanh/navy theo ảnh báo cáo.

### 08 — đã dùng nguyên trạng theo yêu cầu mới

Đã thấy khẳng định “GIẤY PHÉP BAY: ĐÃ PHÊ DUYỆT”, kèm thông tin giấy phép, vị trí và thước đo. Không có tài liệu xác nhận tương ứng trong audit. Người dùng đã yêu cầu dùng toàn bộ tài sản nên ảnh được hiển thị nguyên trạng, nhưng caption HTML chỉ mô tả khu vực phục hồi/hoàn nguyên và không lặp lại claim giấy phép.

## Quy tắc triển khai tài sản

1. Giữ nguyên tám nguồn tại chỗ; bản sao byte-for-byte nằm trong `src/assets/images` theo yêu cầu mới.
2. Danh sách media public hiện gồm toàn bộ 8 ảnh, 4 logo và 1 video theo yêu cầu mới. Tài liệu Office trong `assets/docs` không được sao chép vào web root.
3. Dẫn xuất chỉ làm sau khi đủ điều kiện; lưu tên mới, không ghi đè nguồn. Không tải ảnh không rõ quyền. Kích thước/gợi ý crop phải được kiểm tra lại khi có bản thay thế.
4. Ảnh dữ liệu dùng contain, chú giải ngoài ảnh khi có nguồn hợp lệ; không crop ngày, scale hay nhãn để làm người xem hiểu sai. Alt/caption cập nhật theo ảnh cuối cùng, không giữ mô tả không còn đúng.
5. Khi thiếu ảnh, giữ đúng tỷ lệ khung bằng CSS và nhãn HTML. Không tạo bản đồ, số liệu hoặc hình AI để thay bằng chứng khảo sát. Nếu dùng ảnh AI trong tương lai, chỉ là minh họa có nhãn và cần kiểm tra nội dung.
6. Yêu cầu mới bổ sung video vào hero với controls, poster từ ảnh 01, preload metadata và không autoplay. Chưa có tệp phụ đề để gắn track captions.

## Kết quả kiểm tra

Đã mở cả 8 file bằng công cụ xem ảnh; đọc kích thước, định dạng, EXIF và SHA-256 bằng Pillow/Python. Tổng cộng 7 JPEG + 1 PNG. Chưa kiểm chứng nguồn gốc, bản quyền, tính thực địa hoặc georeferencing; chưa xuất ảnh tối ưu hay đo chất lượng trên browser.
