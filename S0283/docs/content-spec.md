# Đặc tả nội dung public — S0283

Ngày: 15/09/2026. Bước 02 — bản nội dung dùng cho triển khai; chưa phải xác nhận website đã xuất bản.

## Quy ước bàn giao

- Chỉ đưa các mục **Nội dung hiển thị** lên trang. Nguồn, trạng thái, điều kiện triển khai và danh sách còn thiếu là ghi chú nội bộ, không xuất ra website hoặc metadata.
- CTA chính: **Trao đổi nhu cầu** → `#tu-van`. CTA phụ: **Xem kết quả bàn giao** → `#ket-qua`. Đây là đích dự kiến, chưa có HTML để kiểm tra liên kết.
- AOI được giải thích ở lần xuất hiện đầu tiên là **khu vực cần theo dõi**. Ưu tiên cụm tiếng Việt trong nội dung còn lại.
- “Có nguồn” nghĩa là đã đối chiếu tài liệu cung cấp; không chứng minh năng lực thực địa, quyền ảnh hay phê duyệt thương mại. Gói luôn giữ nhãn **Đề xuất**. Sau bàn giao, người dùng yêu cầu công khai ba giá bán đề xuất từ File 07; giá chính thức vẫn cần Sales/Finance phê duyệt.
- Các locator `pN` đếm đoạn XML DOCX, bao gồm bảng, theo quy ước trong `source-audit.md`. Tên nguồn đầy đủ ở cuối tài liệu.

## 1. Header

**Heading/nhận diện:** GASCOLAE

### Nội dung hiển thị

- Tên thương hiệu dạng chữ: **GASCOLAE**.
- Nhãn dịch vụ: **Theo dõi thay đổi thảm thực vật**.
- Menu: **Giải pháp** → `#giai-phap`; **Kết quả bàn giao** → `#ket-qua`; **Ứng dụng** → `#ung-dung`; **Quy trình** → `#quy-trinh`; **Gói dịch vụ** → `#goi-dich-vu`.
- CTA: **Trao đổi nhu cầu** → `#tu-van`.

**Nguồn:** Brief, mục tiêu và layout phần 1; File 09 p25,49; File 01 p27.

**Trạng thái:** Chốt tên và menu cho bản triển khai. **[CẦN BỔ SUNG: logo chính thức và quyền sử dụng]**. Tạm dùng tên thương hiệu dạng chữ, không coi đó là logo đã duyệt. Header không cần tạo thêm H1; H1 nằm ở Hero.

## 2. Hero — `#gioi-thieu`

### Nội dung hiển thị

**H1:** Theo dõi thay đổi thảm thực vật qua từng kỳ khảo sát

**Copy:** Khảo sát lặp bằng thiết bị bay không người lái (UAV), kết hợp ảnh màu RGB và ảnh đa phổ để lập bản đồ vùng tăng, ổn định, suy giảm hoặc không đủ dữ liệu. Kết quả giúp xác định nơi cần ưu tiên kiểm tra thực địa.

**Dòng hỗ trợ:** Bắt đầu từ AOI — khu vực cần theo dõi — và mục tiêu giám sát của bạn.

**CTA chính:** Trao đổi nhu cầu → `#tu-van`.

**CTA phụ:** Xem kết quả bàn giao → `#ket-qua`.

**Nguồn:** File 09 p25–27,49,55–62; File 01 p27,46; prompt 02 quy định CTA và giải thích AOI.

**Trạng thái:** Copy có nguồn; không hứa phát hiện tức thời hoặc độ chính xác định lượng. Ảnh UAV ngang theo brief chưa được xác minh quyền và nội dung. Nếu chưa có ảnh hợp lệ, hiển thị **“Hình minh họa khảo sát UAV — chưa phải ảnh dự án thực tế.”** trên vùng placeholder; không gắn nhãn này để hợp thức hóa ảnh chưa có quyền dùng.

## 3. Vấn đề và giải pháp — `#giai-phap`

### Nội dung hiển thị

**H2:** Từ ảnh rời rạc đến bản đồ thay đổi có thể đối chiếu

**Copy:** Ảnh chụp ở những thời điểm và điều kiện khác nhau có thể khiến việc nhận biết thay đổi trở nên khó khăn. Chênh lệch mùa, ánh sáng hoặc vị trí ảnh cũng có thể tạo ra tín hiệu thay đổi giả.

**Copy giải pháp:** GASCOLAE xây dựng kế hoạch khảo sát lặp, chuẩn hóa dữ liệu và căn chỉnh ảnh giữa các kỳ. Bản đồ biến động và thống kê theo lô giúp bạn khoanh vùng thay đổi, theo dõi diễn biến và ưu tiên kiểm tra hiện trường.

- **Theo dõi cùng khu vực:** Duy trì phạm vi khảo sát để đối chiếu qua các kỳ.
- **Đọc thay đổi theo lô:** Xem vị trí và diện tích các lớp biến động trong phạm vi đã thống nhất.
- **Hiểu giới hạn kết quả:** Các vùng thiếu dữ liệu được phân biệt rõ để tránh diễn giải quá mức.

**CTA:** Xem kết quả bàn giao → `#ket-qua`.

**Nguồn:** File 09 p39–49,55–62,71–76,144; File 02 p60; File 04 p103–123.

**Trạng thái:** Có nguồn; không đưa tỷ lệ tiết kiệm, cam kết năng suất hoặc kết luận nguyên nhân. Ảnh hiện trường bên trái chờ bước tài sản xác minh; placeholder dùng nhãn **“Minh họa khảo sát thực địa.”**

## 4. So sánh hai kỳ — `#so-sanh`

### Nội dung hiển thị

**H2:** Quan sát thay đổi giữa hai kỳ khảo sát

**Copy:** So sánh ảnh của cùng khu vực sau khi được chuẩn hóa và căn chỉnh. Việc diễn giải cần xem xét mùa, giai đoạn sinh trưởng, ánh sáng và cảm biến sử dụng trong mỗi kỳ.

**Nhãn khi có cặp dữ liệu đã xác minh:** **Kỳ gốc — [ngày khảo sát đã xác minh]**; **Kỳ theo dõi — [ngày khảo sát đã xác minh]**.

**Hướng dẫn khi có thanh so sánh hoạt động:** Kéo thanh phân cách để xem từng ảnh. Bạn cũng có thể dùng các phím mũi tên khi chọn thanh so sánh.

**Chú giải khi hiển thị bản đồ phân lớp:** **Tăng · Ổn định · Suy giảm · Không đủ dữ liệu**.

**Chú thích:** Tín hiệu thay đổi giúp khoanh vùng cần kiểm tra. Nguyên nhân cần được xác minh bằng thông tin hiện trường và chuyên gia.

**CTA:** Xem kết quả bàn giao → `#ket-qua`.

**Nguồn:** File 09 p49,72,75,153,156; File 01 p27,46; File 04 p109–123; brief phần hình ảnh và tương tác.

**Trạng thái/điều kiện:** Chốt copy, chưa xác minh ảnh 3/4, ngày chụp hoặc khả năng căn chỉnh. Hiện dùng placeholder **“Chưa có cặp ảnh khảo sát được xác minh để so sánh.”** Không hiển thị ngày giả, điều khiển giả hoặc chú giải phân lớp lên ảnh RGB thông thường. Nếu tài sản thực tế là RGB và bản đồ biến động, đổi heading thành **“Đối chiếu ảnh khảo sát và bản đồ biến động”**, hai nhãn thành **“Ảnh khảo sát RGB”** / **“Bản đồ biến động”**; không gọi là hai kỳ hay trước/sau. Hình mô phỏng phải ghi **“Minh họa cách đọc dữ liệu — không phải kết quả khảo sát thực tế.”**

## 5. Kết quả bàn giao — `#ket-qua`

### Nội dung hiển thị

**H2:** Bản đồ, thống kê và dữ liệu để theo dõi từng khu vực

**Copy:** Kết quả được tổ chức theo kỳ khảo sát và phạm vi đã thống nhất, kèm phương pháp xử lý, điều kiện thu nhận và giới hạn diễn giải.

- **Ảnh bản đồ theo từng kỳ:** Ảnh trực giao RGB/đa phổ gắn tọa độ để đối chiếu cùng khu vực.
- **Bản đồ chỉ số và biến động:** Thể hiện chỉ số thực vật phù hợp và các vùng tăng, ổn định, suy giảm hoặc không đủ dữ liệu.
- **Thống kê và điểm cần kiểm tra:** Diện tích, tỷ lệ theo lô và danh sách điểm nóng khi thuộc phạm vi dịch vụ.
- **Dữ liệu bản đồ và báo cáo:** Dữ liệu GIS (hệ thống thông tin địa lý), thông tin đi kèm và báo cáo kiểm soát chất lượng. Định dạng bàn giao được thống nhất theo hệ thống sử dụng của bạn.

**Nhãn mẫu:** Mẫu cấu trúc thống kê — chưa có số liệu khảo sát.

| Khu vực/lô | Lớp biến động | Diện tích (ha) | Tỷ lệ (%) |
|---|---|---|---|
| Chưa có dữ liệu | Chưa có dữ liệu | Chưa có dữ liệu | Chưa có dữ liệu |

**CTA:** Trao đổi nhu cầu → `#tu-van`.

**Nguồn:** File 09 p126–134; File 02 mục 8; File 05 p150–171; File 04 mục 10.

**Trạng thái:** Danh mục có nguồn, đầu ra theo gói/phạm vi. Bảng là cấu trúc minh họa, không là kết quả khách hàng. Bản đồ lớn và ảnh báo cáo chờ xác minh tài sản; không dựng nút tải xuống khi chưa có mẫu public được duyệt.

## 6. Ứng dụng — `#ung-dung`

### Nội dung hiển thị

**H2:** Theo dõi thảm thực vật theo mục tiêu quản lý

**Copy:** Dành cho chủ rừng, khu bảo tồn, doanh nghiệp nông–lâm nghiệp và các dự án phục hồi, hoàn nguyên cần theo dõi thay đổi theo không gian và thời gian.

**Thẻ 1 — Rừng trồng và tái sinh**

Theo dõi biến động lớp phủ theo lô để nhận biết khu vực phục hồi hoặc có dấu hiệu suy giảm giữa các kỳ.

**Thẻ 2 — Suy giảm tán**

Khoanh vùng nơi có dấu hiệu mất hoặc suy giảm lớp phủ, hỗ trợ đội hiện trường lựa chọn vị trí cần kiểm tra.

**Thẻ 3 — Phục hồi và hoàn nguyên**

Đối chiếu kỳ gốc với các kỳ tiếp theo để theo dõi diễn biến phục hồi lớp phủ trong khu vực dự án.

**CTA:** Trao đổi nhu cầu → `#tu-van`.

**Nguồn:** File 09 p15,81–89; File 02 mục 3,6; File 01 p29,108.

**Trạng thái:** Ứng dụng có nguồn, không phải danh sách dự án đã làm hoặc lời chứng thực. Ảnh theo brief (1,7,8) chờ xác minh quyền; nếu chưa đủ điều kiện thì dùng placeholder có nhãn minh họa.

## 7. Quy trình — `#quy-trinh`

### Nội dung hiển thị

**H2:** Năm bước từ nhu cầu đến kết quả theo dõi

**Copy:** Phạm vi, lịch khảo sát và đầu ra được thống nhất theo khu vực và mục tiêu giám sát.

1. **Xác định nhu cầu và khu vực.** Làm rõ ranh giới, mục tiêu, dữ liệu kỳ gốc, số kỳ và kết quả cần bàn giao.
2. **Đánh giá khả thi và lập kế hoạch.** Thống nhất phương án khảo sát lặp; rà soát điều kiện tiếp cận, an toàn, yêu cầu pháp lý và thời tiết trước khi triển khai.
3. **Thu nhận dữ liệu.** Khảo sát UAV RGB/đa phổ và thu thông tin kiểm chứng hiện trường theo kế hoạch đã thống nhất.
4. **Chuẩn hóa và phân tích.** Xử lý, căn chỉnh ảnh giữa các kỳ; tính chỉ số, phân lớp biến động và thống kê theo khu vực.
5. **Kiểm tra và bàn giao.** Kiểm soát chất lượng, xác minh điểm nóng theo phạm vi, bàn giao bản đồ và báo cáo; thống nhất kỳ theo dõi tiếp theo.

**CTA:** Trao đổi nhu cầu → `#tu-van`.

**Nguồn:** File 09 p95–103; File 04 mục 5, p79–128; File 05 p126–141.

**Trạng thái:** Đã đối chiếu đúng thứ tự; rút gọn SOP thành năm bước cho khách hàng. Không nêu thời hạn xử lý hoặc thủ tục pháp lý cụ thể chưa xác minh.

## 8. Gói dịch vụ và FAQ — `#goi-dich-vu`

### Nội dung hiển thị

**H2:** Chọn phạm vi theo dõi phù hợp

**Copy:** Các gói dưới đây là cấu hình đề xuất. Phạm vi, lịch khảo sát và đầu ra được xác nhận theo khu vực và nhu cầu thực tế.

| Gói | Nhãn bắt buộc | Phạm vi đề xuất | Nội dung ngắn | Giá hiển thị | CTA |
|---|---|---|---|---|---|
| Pilot | Đề xuất | Tối đa 50 ha · 2 kỳ khảo sát | Đánh giá tính khả thi và thiết lập dữ liệu kỳ gốc; ảnh bản đồ, chỉ số, bản đồ biến động cơ bản và báo cáo. | 65 triệu VNĐ / gói dự án | Trao đổi nhu cầu |
| Standard | Đề xuất | Tối đa 200 ha · 4 kỳ trong 12 tháng | Theo dõi định kỳ, phân tích biến động, thống kê theo lô, dữ liệu GIS và điểm nóng cần kiểm tra. | 165 triệu VNĐ / gói dự án | Trao đổi nhu cầu |
| Advanced | Đề xuất | Tối đa 500 ha · 6 kỳ trong 12 tháng | Phân tích nâng cao và báo cáo định kỳ. AI tùy chỉnh, bảng theo dõi trực tuyến hoặc kết nối dữ liệu qua API chỉ có khi được thống nhất trong phạm vi tích hợp. | 420 triệu VNĐ / gói dự án | Trao đổi nhu cầu |

Tất cả CTA gói → `#tu-van`. Nếu nhu cầu vượt cấu hình đề xuất, hãy trao đổi để xác định phạm vi phù hợp.

**H2 FAQ:** Những điều cần biết trước khi khảo sát

**Vì sao cần ảnh đa phổ?**

Ảnh đa phổ ghi nhận thêm các dải ánh sáng, trong đó có cận hồng ngoại, để tính chỉ số thực vật. Ảnh RGB giúp quan sát hình thái, còn chỉ số sử dụng được lựa chọn theo cảm biến và mục tiêu theo dõi.

**Có thể so sánh hai chuyến bay bất kỳ không?**

Không nên so sánh trực tiếp khi điều kiện thu nhận khác nhau. Cần căn chỉnh vị trí, chuẩn hóa dữ liệu và xem xét mùa, giai đoạn sinh trưởng, ánh sáng, độ phân giải và cảm biến để hạn chế tín hiệu thay đổi giả.

**Kết quả có cho biết nguyên nhân cây suy giảm không?**

Dữ liệu giúp khoanh vùng tín hiệu thay đổi. Để xác định nguyên nhân, cần đối chiếu lịch tác động, kiểm tra thực địa và đánh giá của chuyên gia.

**Có thể dùng kết quả để tính carbon hoặc chứng nhận MRV không?**

S0283 cung cấp bằng chứng về lớp phủ và biến động. Việc tính hoặc xác minh carbon cần mô hình được hiệu chuẩn và quy trình đo đạc, báo cáo, thẩm định (MRV) phù hợp; bản đồ biến động không thay thế các bước đó.

**Cần chuẩn bị gì để trao đổi nhu cầu?**

Bạn có thể cung cấp địa điểm, ranh giới hoặc mô tả khu vực, diện tích ước tính, mục tiêu và số kỳ mong muốn. Nếu đã có ảnh hoặc dữ liệu kỳ gốc, hãy cho biết để cùng đánh giá khả năng sử dụng.

**CTA cuối FAQ:** Trao đổi nhu cầu → `#tu-van`.

**Nguồn gói:** File 09 p110–121; File 02 mục 7; File 05 p109,113,117; File 07 `02_PACKAGE_TERMS!B6:C8` và `01_PRICE_LIST!F15`. Trạng thái đề xuất theo brief và source-audit.

**Nguồn FAQ:** File 09 p149–159,169; File 01 mục 13, p316,328,340; File 02 p108,200; File 04 mục 5,7. Cách diễn giải MRV là giải thích thuật ngữ, không khẳng định cung cấp dịch vụ chứng nhận.

**Trạng thái:** Gói đã đối chiếu, vẫn là đề xuất; FAQ giữ giới hạn nguồn. Theo yêu cầu mới của người dùng, UI hiển thị ba giá bán đề xuất 65/165/420 triệu VNĐ từ File 07. Không đưa cost, margin, bảng giá chi tiết, chỉ tiêu kỹ thuật chưa duyệt hoặc thông tin nội bộ vào UI.

## 9. Form tư vấn và footer — `#tu-van`

### Nội dung hiển thị

**H2:** Trao đổi về khu vực bạn cần theo dõi

**Copy:** Cho biết khu vực và mục tiêu giám sát để cùng xác định phạm vi khảo sát phù hợp.

| Nhãn trường | Bắt buộc | Gợi ý hiển thị |
|---|---|---|
| Họ tên | Có | Nhập họ tên của bạn |
| Đơn vị | Không | Tên đơn vị, nếu có |
| Email hoặc số điện thoại | Có | Nhập một cách liên hệ |
| Khu vực cần theo dõi (AOI) | Có | Địa điểm hoặc mô tả ranh giới khu vực |
| Diện tích ước tính (ha) | Không | Có thể để trống nếu chưa xác định |
| Mục tiêu giám sát | Có | Bạn muốn theo dõi thay đổi nào? |
| Số kỳ hoặc tần suất mong muốn | Không | Có thể để trống nếu cần tư vấn |
| Dữ liệu kỳ gốc hiện có | Không | Mô tả ảnh hoặc dữ liệu đã có, nếu có |

**CTA:** Trao đổi nhu cầu.

**Dòng hỗ trợ:** Chỉ cung cấp thông tin cần thiết cho việc trao đổi phạm vi khảo sát.

**Thông báo demo bắt buộc khi chưa kết nối tiếp nhận:** Biểu mẫu minh họa — thông tin chưa được gửi. Kênh liên hệ chính thức đang được cập nhật.

**Thông báo sau thao tác trong chế độ demo:** Bạn đang dùng biểu mẫu minh họa. Thông tin chưa được gửi.

**Thông báo lỗi nhập liệu:** Vui lòng điền trường này. / Vui lòng nhập email hoặc số điện thoại hợp lệ. / Vui lòng nhập diện tích lớn hơn 0 hoặc để trống.

**Thông báo lỗi gửi, chỉ khi đã có gửi thật:** Chưa gửi được thông tin. Vui lòng thử lại sau.

**Thông báo thành công, chỉ sau xác nhận tiếp nhận thực tế:** Thông tin của bạn đã được tiếp nhận.

**Footer heading:** GASCOLAE

**Footer copy:** S0283 — Theo dõi sự thay đổi thảm thực vật.

**Thông tin liên hệ tạm:** Thông tin liên hệ chính thức đang được cập nhật.

**CTA phụ:** Xem kết quả bàn giao → `#ket-qua`.

**Nguồn:** File 09 p165–173; File 05 mục 10; brief mục form và dữ liệu; prompt 02 về CTA và liên hệ. Nhãn trường, mức bắt buộc và thông báo là quyết định biên tập/UX cho bản triển khai, không phải claim về hệ thống đã hoạt động.

**Trạng thái:** Chốt copy form và các trạng thái; chưa có endpoint để kiểm tra gửi thật. **[CẦN BỔ SUNG: email, điện thoại, địa chỉ được duyệt, logo, đơn vị tiếp nhận và chính sách xử lý dữ liệu]**. Không tạo mailto/tel, địa chỉ hoặc đường dẫn chính sách giả. Chưa thu thập/gửi dữ liệu thật khi chưa chốt cơ chế tiếp nhận và thông tin quyền riêng tư. Không hứa thời gian phản hồi. Nếu chưa có kênh thật thì giữ chế độ demo rõ ràng.

## Các quyết định từ audit bước 01

- Bỏ các câu “chưa có File 07/10” khỏi copy. Việc đã có tài liệu không thay đổi trạng thái giá chưa công khai và chatbot chưa triển khai.
- Không dùng RGB và bản đồ biến động như bằng chứng trước/sau. Điều kiện và copy thay thế đã ghi ở phần 4.
- Không đưa hướng dẫn sinh viên, placeholder tên gói trong Sales Kit, checklist tự đánh dấu hoặc đường dẫn nguồn nội bộ lên website.
- Không có lời chứng thực, số khách hàng/dự án, chứng nhận, kết quả định lượng, video hoặc nút tải giả.
- Logo/liên hệ và tài sản chưa xác minh được giữ thành mục thiếu hoặc placeholder rõ ràng, không dùng thông tin của mẫu tham khảo.

## Nguồn đối chiếu

Tất cả tệp nguồn chỉ dùng nội bộ, không đóng gói cùng public website.

| Tên ngắn | Đường dẫn từ project root |
|---|---|
| File 01 | `assets/docs/10_S0283_01_Service_Knowledge_Base.docx` |
| File 02 | `assets/docs/10_S0283_02_Service_Profile.docx` |
| File 04 | `assets/docs/10_S0283_04_Service_SOP_Checklist.docx` |
| File 05 | `assets/docs/10_S0283_05_Service_Proposal.docx` |
| File 07 | `assets/docs/10_S0283_07_Service_Pricing.xlsx` |
| File 09 | `assets/docs/10_S0283_09_Service_Landing_Page_Content.docx` |
| Brief | `prompt/00_PROJECT_BRIEF.md` |
| Prompt 02 | `prompt/prompts/02_Chot_noi_dung.md` |
| Audit | `docs/source-audit.md` |

## Kiểm tra và giới hạn

Đã đối chiếu copy với File 09 và nguồn nền nêu trên; điều kiện gói khớp audit bước 01. Chưa render/test UI, chưa xác minh ảnh hoặc cơ chế gửi form. Nội dung này không thay thế phê duyệt tài sản và thông tin thương mại trước khi xuất bản.
