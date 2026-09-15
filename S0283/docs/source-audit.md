# Kiểm tra nguồn S0283

Ngày kiểm tra: 15/09/2026. Tài liệu làm việc nội bộ, không đưa vào bản public.

## Phạm vi và cách đọc

- Project root: `D:/Work/CT-group/GASCOLAE_Group9/S0283`; repo hiện hữu ở thư mục cha. Gói prompt: `S0283/prompt`.
- Đã kiểm tra 12/12 tệp theo manifest. Tên thực tế không có hậu tố phiên bản `(8)/(5)/(2)/(1)/(4)`; manifest cho phép khác tên phiên bản. Không suy ra đây là cùng bản nhị phân với các tên trong manifest.
- Đọc ZIP/XML Office bằng Python standard library: đoạn văn/bảng DOCX, text của 13 slide PPTX, toàn bộ sheet và ô có dữ liệu XLSX/XLSM. Không mở Office, không chạy macro, không sửa nguồn.
- Mốc `pN` bên dưới là thứ tự phần tử `w:p` trong `word/document.xml`, đếm từ 1, bao gồm đoạn trong bảng; không phải số trang. Nguồn bảng tính ghi sheet/ô, trình chiếu ghi số slide.
- Đây là audit nội dung, chưa render Office; chưa xác minh hình nhúng, bố cục, ghi chú slide hoặc các nguồn nghiên cứu bên ngoài từng tài liệu. “Có nguồn” không đồng nghĩa đã được kiểm chứng thực địa hoặc được phê duyệt công bố.

## Bảng claim và quyền công khai

Tên File 00–10 dưới đây ánh xạ tới tên đầy đủ trong bảng kiểm kê cuối tài liệu.

| Claim/nội dung | Nguồn cụ thể | Trạng thái đối chiếu | Quyền công khai / xử lý |
|---|---|---|---|
| Khảo sát lặp UAV RGB/đa phổ, chuẩn hóa, phân vùng tăng/ổn định/suy giảm/không đủ dữ liệu | File 00 `01_RESEARCH_FINDINGS!C2`; File 01 p27; File 09 p27, p49 | Thống nhất mô tả dịch vụ; định nghĩa thương mại còn đề xuất | Có thể dùng bản diễn đạt cho website theo brief; không công khai nguyên tài liệu |
| Chủ rừng, khu bảo tồn, nông–lâm nghiệp, phục hồi/hoàn nguyên | File 02 mục 3–6; File 06 slide 2, 6; File 09 p15 | Có nguồn; chưa chứng minh đây là khách hàng đã triển khai | Dùng làm nhóm khách hàng/ứng dụng, không thành case study |
| Orthomosaic, chỉ số, bản đồ biến động, thống kê theo lô, điểm nóng, GIS, QA/QC | File 00 `01_RESEARCH_FINDINGS!C11`; File 02 mục 8; File 06 slide 8 | Có nguồn; đầu ra cụ thể theo scope | Dùng mô tả đầu ra, không tạo số liệu kết quả giả |
| Pilot ≤50 ha/2 kỳ; Standard ≤200 ha/4 kỳ/12 tháng; Advanced ≤500 ha/6 kỳ/12 tháng | File 02 p119 và mục 7; File 05 p109,113,117; File 06 slide 7; File 07 `02_PACKAGE_TERMS!B6:B8`; File 09 p255 | Khớp cấu hình; File 00 `01_RESEARCH_FINDINGS!C16` ghi chưa xác nhận | Chỉ dùng với nhãn “đề xuất”, chốt theo AOI và nhu cầu |
| AI/dashboard/API ở cấu hình nâng cao khi phê duyệt | File 07 `02_PACKAGE_TERMS!B8:C8`, `B14:E15`; File 06 slide 7; File 04 p23 | Tùy chọn; không mặc định | Nêu điều kiện nếu cần; bản đầu không có chatbot |
| Không tự kết luận nguyên nhân, đo carbon hoặc chứng nhận MRV | File 01 p27,147,340; File 02 p200; File 09 p49,159; File 06 slide 11 | Giới hạn nhất quán | Giữ trong nội dung/FAQ |
| Quy trình có lập kế hoạch, thu nhận, xử lý/đồng đăng ký, phân tích, QA/QC, bàn giao | File 04 mục 5,7,8,10; File 06 slide 8 | SOP Draft tại p15; có thể rút gọn thành 5 bước nhưng giữ thứ tự | Chỉ mô tả quy trình khách hàng; không xuất checklist vận hành nội bộ |
| KPI, SLA, năng lực thiết bị và triển khai | File 01 mục 10,16; File 00 `01_RESEARCH_FINDINGS!C21`; báo giá `02_LEVEL!B10:D11` | Chưa xác nhận, cần pilot/ground truth | Không công bố thành cam kết hoặc kết quả đã đạt |
| Giá, cost, margin, VAT, điều kiện thanh toán | File 03 `03_SERVICE_DATA!D11`, `04_AI_SEARCH_RULES!D9:E9`; File 07 `03_QUOTE_CHECK!C21:D21`; báo giá `01_BAO_GIA!A22:A29` | Giá cuối chưa duyệt; có dữ liệu Restricted/Internal | Không niêm yết giá, không public nguồn/công thức/chi phí |
| Agent có cấu hình và test case | File 10 `01_AGENT_CONFIG!E10`, các sheet `05_TEST_CASES`, `06_HANDOFF_DEV`; File 08 `03_TEST_CASES` | Tài liệu thiết kế/test kỳ vọng, không có bằng chứng chạy runtime | Không nói agent đã chạy, không coi checklist trong nguồn là kết quả test |

## Mâu thuẫn, câu cũ và cách xử lý

| Mức | Bằng chứng | Kết luận và xử lý cho bước nội dung |
|---|---|---|
| Cao | File 09 p19,255 ghi thiếu/không dùng File 07; p193,271 ghi Asset 10 chưa có | Hiện đã có 07 và 10. Loại lý do thiếu tệp khỏi nội dung phát sinh; vẫn giữ giá chưa công khai và không triển khai agent. Không sửa nguồn gốc |
| Cao | File 10 `02_KNOWLEDGE_SOURCES!D8`, `03_BEHAVIOR_GUARDRAILS!C4`, `04_INTENTS_QA!D7`, `05_TEST_CASES!D4,E4,H4`, `06_HANDOFF_DEV!B2,D2`, `07_VALIDATION!D3,D5` | Các câu thiếu 07 phản ánh bộ đầu vào cũ. Có tệp không chứng minh đã kết nối vào knowledge base hoặc được quyền trả giá. Cần owner cập nhật khi triển khai agent riêng |
| Cao | File 09 p33 gọi orthomosaic và change map là so sánh hai kỳ | Đây là hai loại dữ liệu, không tự chứng minh hai kỳ khảo sát. Chỉ dùng nhãn “kỳ gốc/kỳ theo dõi” khi có cặp dữ liệu cùng khung và metadata phù hợp; nếu không dùng nhãn loại dữ liệu/minh họa |
| Vừa | File 06 slide 7 còn `[Tên option]`; slide 12 đặt khởi động Pilot trước bước chốt phạm vi/hợp đồng | Không copy placeholder; dùng tên gói đã đối chiếu. Quy trình website phải chốt điều kiện trước triển khai thực địa theo SOP |
| Vừa | Báo giá `02_LEVEL!D7,D9` rút gọn AI/dashboard/API như phần thêm; File 07 `02_PACKAGE_TERMS!B8:C8` yêu cầu scope duyệt | Luôn giữ điều kiện tùy chọn/phê duyệt, không hứa tích hợp mặc định |
| Vừa | File 07 `01_PRICE_LIST!A12:F15` có ma trận band diện tích/Level, còn `02_PACKAGE_TERMS!B6:B8` giới hạn gói chuẩn | Không diễn giải ô giá ngoài gói chuẩn thành năng lực hoặc phạm vi mặc định; ngoài cấu hình phải chốt scope |
| Vừa | Báo giá `01_BAO_GIA!G19` trống; `G20` là `G17-G18`; `E7` ghi cần xác minh VAT | Không suy ra VAT bằng 0 hoặc tổng đã gồm thuế. Đây là báo giá mẫu, không phải báo giá đã phát hành |
| Vừa | File 07 `03_QUOTE_CHECK!B8,B10,B13` chỉ chứa giá trị, không có công thức | Tên “calculator” không chứng minh tự tính. Không coi bảng này là công cụ báo giá hoạt động |
| Vừa | File 00 `02_NGUON_THAM_KHAO!I9` và `01_RESEARCH_FINDINGS!C21` lưu ý mốc pháp lý cũ | Chưa xác minh luật/thủ tục hiện hành; không sử dụng thành hướng dẫn pháp lý. Rà soát theo AOI/ngày bay nếu bước sau thực sự cần |

## Công thức, dữ liệu và tài sản

- Năm workbook 00,03,07,08,10 không có phần tử công thức trong các sheet đã đọc. Không giả định các giá trị số là kết quả tính động.
- `SOURCE/S0283_BAO_GIA.xlsx` có 23 ô công thức, cả 23 có cache. Đã đọc riêng biểu thức và cache; chưa tính lại workbook hoặc xác nhận cache còn mới.
- 8 ảnh có sẵn trong `assets/images`: `S0283_1.jpg` đến `S0283_8.jpg`, riêng ảnh 6 là PNG. Chưa kiểm tra trực quan, nguồn gốc, giấy phép, ngày chụp hoặc khả năng căn chỉnh ảnh 3/4. Không coi ảnh là bằng chứng khảo sát thực tế khi chưa xác minh.
- Chưa có bằng chứng về endpoint form, thông tin liên hệ chính thức, case study, logo được duyệt hay quyền công khai ảnh. Đây là đầu vào cần bổ sung ở bước phù hợp, không chặn audit này.
- `assets/docs`, `prompt`, `docs` là dữ liệu làm việc nội bộ. Chưa có public root/build. Bước sau cần tạo bản public chỉ gồm HTML/CSS/JS và tài sản đã duyệt; không chạy server công khai tại project root chứa tài liệu mật. Chưa kiểm thử quy tắc chặn URL hoặc gói xuất bản vì chưa có UI/server.

## Kiểm kê nguồn thực tế

Các SHA-256 dưới đây xác định bản đã đọc; không phải bằng chứng phê duyệt.

| File | Sheets / paragraphs / slides | SHA-256 |
|---|---|---|
| `assets/docs/10_S0283_00_RESEARCH_WORKBOOK.xlsx` | 01_RESEARCH_FINDINGS: 126; 02_NGUON_THAM_KHAO: 117 | `4180107fe6b8c92550ad7f94796c939ad1ce0a57fe0c4b6ae7f212c1a75c7584` |
| `assets/docs/10_S0283_01_Service_Knowledge_Base.docx` | paragraphs: 528 | `e7f585387b4ce7eddd21ff392ca0912a0ca9c6adb04aa005911c066efd398c3d` |
| `assets/docs/10_S0283_02_Service_Profile.docx` | paragraphs: 293 | `efaf1ee8b0c9022bc77e0bb3af9cd938e3bf34f2774a760e137dcf4989b08e72` |
| `assets/docs/10_S0283_03_Service_Metadata_Catalog.xlsx` | 01_SERVICE_MASTER: 80; 02_DISCOVERY_TAGS: 54; 03_SERVICE_DATA: 77; 04_AI_SEARCH_RULES: 45; 05_METADATA_VALIDATION: 50 | `4ee9a4c2eb1e01b2ad51c04f259bc34c1dd595eed9c6f378ca0cb562eeb12088` |
| `assets/docs/10_S0283_04_Service_SOP_Checklist.docx` | paragraphs: 417 | `59f8d0d6d57fe4ef5225bebb6f54f61d8b4e9ab135c1c4665c3cb6d22a5056f7` |
| `assets/docs/10_S0283_05_Service_Proposal.docx` | paragraphs: 359 | `45ec8ac75c4d54897073fd9f56cbb3157fa013056c7a0c0dc4730a55989df055` |
| `assets/docs/10_S0283_06_Service_Sales_Kit.pptx` | ppt/slides/slide1.xml: 14; ppt/slides/slide2.xml: 25; ppt/slides/slide3.xml: 21; ppt/slides/slide4.xml: 18; ppt/slides/slide5.xml: 29; ppt/slides/slide6.xml: 17; ppt/slides/slide7.xml: 33; ppt/slides/slide8.xml: 38; ppt/slides/slide9.xml: 17; ppt/slides/slide10.xml: 33; ppt/slides/slide11.xml: 21; ppt/slides/slide12.xml: 25; ppt/slides/slide13.xml: 37 | `dd50aa43d2024b4fe46f6b0e46b3af48ce1aa9cda2c61c95fa2119017f6f7ebb` |
| `assets/docs/10_S0283_07_Service_Pricing.xlsx` | 01_PRICE_LIST: 90; 02_PACKAGE_TERMS: 54; 03_QUOTE_CHECK: 65 | `ebee0ecfc83a4d68ace65b284d67b2ed96e6dfa79bc257376c1556c51d44785e` |
| `assets/docs/10_S0283_08_Service_AI_Prompt_Library.xlsm` | 01_PROMPT_LIBRARY: 108; 02_PROMPT_CATEGORIES: 35; 03_TEST_CASES: 40; 04_VALIDATION: 40 | `101c85a729df195452aebbae38c65753067ec2b1cc39f7f51c633df091e92fb5` |
| `assets/docs/10_S0283_09_Service_Landing_Page_Content.docx` | paragraphs: 284 | `2d57bff939d2cb07e925a73c44cdc1f653b4ac8d7c676877f7396ff67a882f0c` |
| `assets/docs/10_S0283_10_Service_AI_Agent_Config_Test_Cases.xlsm` | 01_AGENT_CONFIG: 50; 02_KNOWLEDGE_SOURCES: 66; 03_BEHAVIOR_GUARDRAILS: 45; 04_INTENTS_QA: 54; 05_TEST_CASES: 81; 06_HANDOFF_DEV: 32; 07_VALIDATION: 44 | `a51df45fc2246c80a073e86fb76ab755f7c84ea51b65f278719e7a508b5b1fee` |
| `assets/docs/SOURCE/S0283_BAO_GIA.xlsx` | 01_BAO_GIA: 88; 02_LEVEL: 49; 03_CO_SO_GIA: 188; 04_NGUON: 117 | `034d5cc83044926215cb0e5cab55170773cbe53c4fa8aa6a36672e5fbe3a7048` |
