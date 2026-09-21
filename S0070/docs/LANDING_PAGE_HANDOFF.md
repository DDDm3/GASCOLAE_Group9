# S0070 — Implementation & handoff

Ngày thực hiện: 2026-09-21. Phạm vi: landing page giới thiệu dịch vụ; không triển khai pipeline phân tích UAV hoặc công cụ quyết định nghiệp vụ.

## Hiện trạng và quyết định

Trước khi thực hiện, S0070 chỉ có 11 tài liệu nguồn Office, bộ prompt, logo, 9 ảnh và một bản lưu trang Gemini trong thư mục videos. Không có framework, route, build hoặc landing page hiện hữu. Không tìm thấy AGENTS.md trong workspace qua tìm kiếm gồm file ẩn.

Chọn HTML/CSS/JavaScript tĩnh với trình build Node không dependency: phù hợp một trang giới thiệu, FAQ native, menu và form nhẹ. Nội dung vẫn đọc được khi JavaScript bị tắt. Các thay đổi chỉ nằm trong S0070; không thay tài liệu gốc hoặc dự án dịch vụ khác. S0070 đã là thư mục untracked trước khi bắt đầu; không commit hoặc stage tài liệu nguồn.

Trình tự đã thực hiện: đọc master và bộ prompt; kiểm kê repo; trích xuất nội dung OOXML của Assets 00–10 ở thư mục temp ngoài web; đối chiếu nội dung; kiểm tra ảnh; tạo content model và design system; dựng trang; kiểm tra build, HTTP và logic; ghi nhận phần QA chưa thực hiện được. Không sửa workbook, Word hay PowerPoint nguồn.

## Đối chiếu nguồn

Asset 09 là nguồn quyết định nội dung công khai. Các nguồn còn lại kiểm chứng ý nghĩa và giới hạn. `source` trong `src/content.mjs` là metadata lúc build, không serialize vào client bundle.

| Nội dung / section | Nguồn chính | Đối chiếu |
| --- | --- | --- |
| Định danh, hero, overview | 09 §1, §3 | 01 §1, §5; 02 §1, §4; 00 research Q1, Q8 |
| Problems | 09 §2 | 01 §1.3; 02 §2; 03 D002 |
| Benefits | 09 §4 | 01 §11; 05 §3; 06 slide 4 |
| Capabilities | 09 §5 | 03 M007, S002, S004, S005; 01 §5 |
| Use cases | 09 §6 | 01 §4; 02 §6; 03 D003 |
| Service levels | 09 §8 | 02 §7; 05 §6; 07 sheet 02_PACKAGE_TERMS A6:E8, chỉ cấu trúc gói |
| Workflow 5 bước | 09 §7 | 04 §5–§8, cô đọng mức giới thiệu |
| Deliverables | 09 §9 | 04 §10; 05 §8 |
| Trust / limitations | 09 §3, §10–§11 | 01 §6, §9–§12; 02 §11; 03 S008; 06 slide 9 |
| FAQ | 09 §11, §8, §12 | 01 §13; 03 S004, S008; 04 §6; 05 §9, §12 |
| Assistant | 09 §13 | 08 P001/P004/P005/P009; 10 config/guardrails R001–R008 |
| Lead form | 09 §12 | 03 S010, R008; 10 R004, R008 |
| SEO | 09 §14 | Title và description giữ nguyên |
| Footer, CTA | 09 §1, §12 | Master context CTA; nội dung định danh, không thêm claim công ty |

## Kết quả kiểm tra nguồn và các điểm chưa xác minh

- Asset 00, 01, 02 và 03 nhận diện dịch vụ ở trạng thái draft/review; mô tả kỹ thuật không chứng minh năng lực triển khai hoặc benchmark đã nghiệm thu của GASCOLAE.
- Model thiết bị sở hữu, precision/recall, GSD, SLA, lịch khảo sát cụ thể và các cam kết thương mại vẫn cần xác nhận. Không đưa số giả hoặc model tham chiếu thành thiết bị GASCOLAE.
- Asset 02 §10 lặp lại bảng lợi ích thay cho điều kiện; lấy điều kiện từ Asset 09 §11, Metadata S008 và SOP để tránh sao chép lỗi.
- Asset 07 chứa giá ước tính và dữ liệu thương mại nội bộ. Một số ô số có biểu diễn không nhất quán; ví dụ tier được quote calculator tham chiếu khác bảng giá. Không tính toán hoặc sử dụng số này trên web. Sales/Finance cần rà soát riêng trước mọi sử dụng thương mại.
- Asset 08 test sheet có hàng dữ liệu lệch cột; các dấu Pass trong tài liệu không phải kết quả test runtime của trang hoặc agent mới.
- Asset 10 test giá dành cho ngữ cảnh có quyền không áp dụng cho landing page công khai; master context cấm công bố giá draft được ưu tiên. Asset 10 runtime tests chưa được chạy, vì không có agent endpoint.
- Không có endpoint, email, số điện thoại liên hệ hoặc canonical được xác nhận; không tự tạo địa chỉ liên hệ.
- Không có file video phát được trong thư mục videos; bản lưu website không được đưa vào web output.

## Thiết kế và tài nguyên

Tám màu master được khai báo nguyên tên trong CSS. Ngữ nghĩa: nền sáng clear-white/mapping-mist; nền tối spectral-night/survey-depth; chữ technical-ink; action signal-teal; cảnh báo review-amber; đường viền grid-glass hoặc màu dẫn xuất. CSS có khoảng cách theo bội số 8px, container 1280px, bo góc 4px, chuyển trạng thái 180ms. Giao diện không sử dụng animation tự chạy.

Font stack ưu tiên Manrope/Inter/IBM Plex Mono nếu có trên máy và fallback Segoe UI/Arial/Consolas. Không tải font từ bên thứ ba. Font đúng tên thương hiệu chưa được đóng gói vì chưa có file font/licence trong S0070.

| Tài nguyên xuất | Nguồn | Cách dùng |
| --- | --- | --- |
| spectral-cube.webp, spectral-cube-640.webp | assets/images/3f1dcf5f-e9ab-469a-b3f4-8369d7af0132.jpg | Hero; hình khối phổ và địa hình minh họa; có srcset |
| service-workflow.webp | assets/images/1e9176bd-7b53-4031-b6ef-ba7e35d5422c.jpg | Sơ đồ chuỗi dịch vụ minh họa; lazy loading |
| brand-mark.png | assets/logo/LOGO_no-bg.png | Biểu tượng UAV–lá cây; cắt vùng trong suốt, ghép với wordmark chữ |
| uav-sensor.webp, uav-sensor-640.webp | assets/images/51cdc630-780e-459f-995b-4b047885f2b2.jpg | Năng lực cảm biến; responsive và lazy loading |
| spectral-site-overview.webp, spectral-site-overview-640.webp | assets/images/9c4423a6-3b16-497a-be19-b42eba3afb70.jpg | Tình huống sử dụng; responsive và lazy loading |
| uav-monitoring.webp, uav-monitoring-640.webp | assets/images/b959b0a0-e7d4-4a96-adfe-b08809ff5f0f.jpg | Quy trình giám sát; responsive và lazy loading |
| favicon.svg | src/favicon.svg | Ký tự G đơn giản, dùng màu master |
| Deliverable preview | SVG/CSS trong template | Đường đồng mức và vùng giả lập, không tọa độ, không dữ liệu nhiệm vụ |

Đã nhìn contact sheet cả 9 ảnh và xem đầy đủ ảnh khối phổ, logo. Hai ảnh sử dụng là minh họa khái niệm, có nhãn; không sử dụng ảnh cơ sở/địa điểm hoặc dashboard có chữ sinh tự động. Nguồn pháp lý/quyền sử dụng các ảnh cung cấp cần được chủ sở hữu nội dung xác nhận trước phát hành công khai.

## Hợp đồng tích hợp cần triển khai khi có backend

### Lead form

Hiện tại không có request, không localStorage/sessionStorage, không telemetry, không lưu nội dung form. Nút kiểm tra chỉ báo lỗi hoặc báo đúng định dạng và **chưa gửi**. Chọn CTA của một level sẽ chọn level tương ứng trong form. Người xem có thể xóa dữ liệu bằng Reset.

Schema dự kiến để đội Dev ánh xạ vào endpoint được duyệt:

```json
{
  "serviceId": "S0070",
  "name": "string, 1–80 characters",
  "organization": "string, 1–120 characters",
  "email": "validated email, max 160 characters",
  "goal": "overview | screening | material | monitoring",
  "level": "unsure | 1 | 2 | 3"
}
```

Trước khi bật gửi: thống nhất endpoint/routing BD-Sales; validation server và allowlist schema; CSRF/origin policy, rate limit/abuse control; privacy notice và cơ sở xử lý liên hệ được duyệt; phân quyền cho người nhận, retention theo chính sách của owner; không log payload mặc định. Chỉ hiển thị thành công khi backend xác nhận tiếp nhận, xử lý rõ timeout/lỗi/429 và không retry gây trùng. Không thêm trường tọa độ, bản đồ, tệp hoặc chi tiết an ninh. Chính sách CSP hiện chặn cả network lẫn form-action; chỉ mở origin cụ thể sau tích hợp.

### Service Assistant

Tên, lời chào và bốn câu hỏi theo Asset 09. UI hiện ghi rõ chưa kết nối AI và dẫn tới section có nội dung tương ứng; không có ô nhập chat hoặc phản hồi giả.

Giao diện dự kiến: request chứa serviceId S0070, sessionId do backend tạo và message đã qua kiểm soát dữ liệu công khai. Response phân biệt answer / needs_verification / handoff / refused với văn bản, nguồn public được phép và mã lý do chuyển chuyên gia. Render mọi văn bản bằng textContent hoặc sanitizer đã thẩm định; không đưa raw HTML/model output trực tiếp vào DOM.

Backend phải lọc nguồn theo quyền **trước retrieval**, khóa S0070, giữ CẦN XÁC MINH, loại bỏ Internal/Restricted; không nạp toàn bộ Office nguyên gốc vào index công khai. Câu hỏi về giá, SLA, pháp lý, quyết định nhiệm vụ và nội dung vượt nguồn chuyển chuyên gia. Không yêu cầu dữ liệu nhạy cảm qua chat công khai. Cần chạy Asset 10 T001–T008 với kỳ vọng public pricing là handoff, không tái hiện bảng giá nội bộ. UI shell chưa chứng minh agent đạt các test này.

## QA thực hiện

- `npm.cmd run build`: đạt; build tĩnh, không dependency mạng.
- `npm.cmd run check`: đạt; Node syntax checks cho client/build/server.
- `npm.cmd test`: 17/17 đạt. Liên kết/ID/ảnh; cấu trúc HTML; giới hạn public output và claim; HTTP, path traversal, cache, nén và security headers; SEO; validation/reset; menu, FAQ và preselect level; responsive safeguards; tương phản.
- Form/menu được kiểm tra bằng event harness JavaScript. Harness không thay thế browser DOM, native email validation, focus rendering hoặc tương tác bàn phím thực tế.
- Các cặp màu chữ/nền chính đạt tỷ lệ ít nhất 4.5:1. Không tuyên bố toàn trang đạt chuẩn WCAG chỉ từ các kiểm tra này.
- Ảnh hero lớn khoảng 48 KB, bản 640px khoảng 22 KB; ảnh quy trình khoảng 37 KB; logo tối ưu khoảng 25 KB. Các file nguồn Office, bản lưu Gemini và ảnh chưa dùng không được copy vào dist.
- Browser runtime trả `No browser is available`, danh sách browser rỗng sau bước chẩn đoán. Chưa chụp/kiểm tra ảnh màn hình desktop/mobile, chưa đo Lighthouse hoặc kiểm tra screen reader thực tế.

### QA giao diện còn phải thực hiện

Chạy preview, kiểm tra ở 360, 390, 768, 1024, 1440 và 1920px: không overflow; tiêu đề/ảnh không cắt; menu mở/đóng và Escape; điều hướng Tab; CTA chọn level; FAQ Enter/Space; trường trống, email sai, giá trị hợp lệ và Reset; reduced motion; JavaScript tắt. Xem hero, phần cấp độ, preview bàn giao và form ở zoom 100% và 200%. Browser QA và việc xác nhận nội dung/hình ảnh là các điều kiện còn lại trước phát hành.

Chưa publish, chưa thay quyền truy cập, chưa kết nối tài khoản hay gửi dữ liệu cho bên ngoài.
