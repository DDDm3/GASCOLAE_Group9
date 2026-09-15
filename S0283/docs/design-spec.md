# Thiết kế S0283 — bước 03

Ngày 15/09/2026. Đặc tả để triển khai HTML/CSS/JavaScript thuần; chưa tạo UI. Nội dung lấy từ `content-spec.md`, điều kiện ảnh lấy từ `asset-manifest.md`.

## Hướng thiết kế

Giữ kem ấm, olive và màu đất của brief. Trang mang cảm giác một hồ sơ theo dõi hiện trường: tiêu đề rõ, ảnh khu vực rộng, so sánh nhiều kỳ là điểm nhấn, chú thích và giới hạn dữ liệu nằm ngay cạnh hình. Không dùng hình lá cây, biểu tượng drone hay đường đồng mức trang trí lặp lại để thay thế nội dung dịch vụ.

Áp dụng [frontend-design](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md) đã đọc ở bước 01: bố cục xuất phát từ chủ đề, typography có chủ đích, tiết chế trang trí và kiểm tra lại với brief. Giữ palette người dùng chọn dù skill nêu palette tương tự là một mẫu thường gặp. Phiên bản đọc: nhánh main, chưa pin commit. Không cài skill.

### Soát phương án trước khi code

- Điểm nhận diện S0283: ranh giới khu vực, các kỳ khảo sát, bốn lớp biến động, chuỗi thu nhận → chuẩn hóa → kiểm tra → bàn giao. Không thêm dữ liệu hoặc đường ranh giới giả để trang trông có vẻ kỹ thuật.
- Chọn một họ sans-serif dễ đọc tiếng Việt, không thêm serif hoặc chữ monospace cho nhãn trang trí.
- Nhịp bố cục: hero ảnh ngang → hai cột ảnh/copy → so sánh rộng → bản đồ và danh mục đầu ra → ba ứng dụng → quy trình dạng danh sách có thứ tự → bảng so sánh gói và FAQ → form.
- Chỉ nhóm ứng dụng và gói có ba cột ở desktop. Không biến cả chín phần thành các thẻ cùng kiểu; không bóng đổ hàng loạt, gradient, số thống kê lớn hoặc huy hiệu “phổ biến nhất” không có nguồn.
- Mẫu Wix chỉ được đọc text ở bước 01. Không có screenshot xác nhận kích thước, font hay chuyển động; đây là thiết kế theo brief, không là bản sao pixel-perfect.

## 1. Tokens màu

| Token CSS dự kiến | Giá trị | Vai trò |
|---|---|---|
| `--color-paper` | `#F5F2E9` | Nền chính |
| `--color-sand` | `#E7E1D3` | Nền phần giải pháp/gói, đường chia trang trí |
| `--color-ink` | `#292D24` | Chữ, nền footer, trạng thái hover nút chính |
| `--color-olive` | `#59633D` | CTA chính, link, viền điều khiển, focus trên nền sáng |
| `--color-sage` | `#DCE2D2` | Nền bổ sung quy trình, vùng thông báo nhẹ |
| `--color-clay` | `#B86646` | Dấu nhấn nhỏ không mang thông tin duy nhất |

Không dùng opacity cho chữ chính hoặc placeholder vì làm thay đổi tương phản. Chữ phụ vẫn dùng ink, phân cấp bằng cỡ chữ và khoảng cách. Link trong đoạn văn có gạch chân. Trạng thái lỗi dùng chữ ink, viền olive và thông báo rõ; không dùng đất nung làm chữ lỗi nhỏ.

### Tương phản đã tính

Dùng luminance sRGB và tỷ số `(L_sáng + 0.05)/(L_tối + 0.05)`, không tính alpha. Đây là tính toán cặp màu, chưa phải audit accessibility của trang render.

| Chữ / nền | Tỷ số | Quyết định |
|---|---:|---|
| Ink / paper | 12.55:1 | Dùng cho mọi cỡ chữ |
| Ink / sand | 10.77:1 | Dùng cho mọi cỡ chữ |
| Ink / sage | 10.60:1 | Dùng cho mọi cỡ chữ |
| Paper / olive | 5.72:1 | Chữ CTA chính |
| Olive / paper | 5.72:1 | Link và viền điều khiển |
| Olive / sand | 4.92:1 | Link và viền điều khiển |
| Olive / sage | 4.84:1 | Link và viền điều khiển |
| Clay / paper | 3.73:1 | Không dùng cho chữ nhỏ |
| Clay / sand | 3.20:1 | Không dùng cho chữ nhỏ |
| Paper / ink | 12.55:1 | Chữ footer và CTA hover |

Màu bản đồ giữ đúng ý nghĩa của dữ liệu đã duyệt, không tự ánh xạ lại theo màu thương hiệu. Không lấy các lớp màu trong ảnh 5 làm dữ liệu đã xác minh. Khi có bản đồ hợp lệ, mỗi lớp cần nhãn chữ; bảng/chú giải HTML lặp lại ý nghĩa để không phụ thuộc màu. Ngưỡng phân lớp phải theo nguồn dự án.

## 2. Typography

Font v1: `"Segoe UI", Arial, sans-serif`. Dùng font có sẵn trên thiết bị, không nhúng hay sao chép font Windows vào website. Khi thiết bị không có Segoe UI, dùng fallback; cần kiểm tra lại xuống dòng khi có browser. Không tải font từ dịch vụ ngoài ở bước này.

Đã tìm thấy `C:/Windows/Fonts/segoeui.ttf` và `segoeuib.ttf`. Đọc cmap của bản regular: 193 mã gồm ASCII, U+1EA0–U+1EF9 và các chữ Ă/ă, Đ/đ, Ơ/ơ, Ư/ư đều có glyph. Chưa kiểm tra shaping/dấu tổ hợp và render trên các hệ điều hành khác. Không dựa vào font semibold riêng chưa tìm thấy; dùng trọng lượng 400 và 700.

| Vai trò | Kích thước CSS dự kiến | Weight / line-height | Giới hạn |
|---|---|---|---|
| H1 | `clamp(2.25rem, 1.4rem + 3.2vw, 4.5rem)` | 700 / 1.16 | 21ch; không ngắt dòng cứng, không cắt dấu |
| H2 | `clamp(1.75rem, 1.25rem + 1.6vw, 3rem)` | 700 / 1.22 | 28ch |
| H3 | `clamp(1.25rem, 1.1rem + .5vw, 1.5rem)` | 700 / 1.35 | Theo cột, không ellipsis |
| Lead | `clamp(1.125rem, 1.02rem + .4vw, 1.375rem)` | 400 / 1.6 | 62ch |
| Body/form | `1rem` | 400 / 1.65 | Copy dài tối đa 65ch |
| Caption/nhãn | `.875rem` | 400 / 1.5 | Không chứa giới hạn quan trọng chỉ trong tooltip |
| Button/menu | `1rem` | 700 / 1.4 | Cho wrap nếu cần |

Root giữ 100% theo trình duyệt, không khóa font-size bằng px. Không tăng letter-spacing cho tiếng Việt, không uppercase nhãn ngoài tên thương hiệu đã chốt. Chừa line-height cho dấu tiếng Việt; không đặt fixed height trên tiêu đề.

## 3. Kích thước và nhịp trang

- Container nội dung: `max-width: 75rem`; width `calc(100% - 2 * var(--gutter))`; margin inline auto.
- `--gutter: clamp(1rem, 4vw, 3rem)`; copy riêng tối đa 65ch; FAQ tối đa 52rem.
- Thang khoảng cách: `.25rem`, `.5rem`, `.75rem`, `1rem`, `1.5rem`, `2rem`, `3rem`, `4rem`, `6rem`.
- Padding dọc section: `clamp(3rem, 6vw, 6rem)`; khoảng heading → copy 1rem; copy → CTA 1.5rem; heading group → visual 2rem–3rem.
- Grid gap: `clamp(1.5rem, 3vw, 3rem)`; mọi cột `minmax(0, ...)`, `min-width: 0` cho child.
- Radius: ảnh `.5rem`, field/nút `.375rem`. Không shadow mặc định. Chỉ dùng border sand trang trí; field và nút phải có border olive rõ.
- Touch target tối thiểu 48 × 48 CSS px, nút dùng min-height thay vì fixed height, padding `.75rem 1.25rem`.
- Mobile-first: dưới 48rem một cột; từ 48rem cho phép form hai cột; từ 64rem dùng bố cục desktop. Navigation ngang chỉ từ 75rem để nhãn tiếng Việt không chật.

## 4. Bố cục chín phần

| Phần | Desktop | Mobile/tablet | Nền và đặc trưng |
|---|---|---|---|
| 1. Header | Từ 75rem: thương hiệu trái, menu giữa, CTA phải; min-height 80px | Dưới 75rem: thương hiệu, nút “Menu”; menu mở trong luồng, CTA trong menu; min-height 64px | Paper; đường chia dưới. Sticky chỉ khi menu đóng và đủ chiều cao viewport |
| 2. Hero | Heading/copy trái tối đa 52rem, CTA cùng hàng, ảnh toàn bề rộng và video có controls phía dưới | CTA xếp dọc khi dưới 30rem; ảnh/video dưới, giữ tỷ lệ gần 16:9 | Paper; không đè copy lên ảnh; video không autoplay |
| 3. Giải pháp | Grid `minmax(0,45fr) minmax(0,55fr)`; ảnh trái, copy phải | Một cột, heading/copy trước rồi ảnh; DOM theo thứ tự đọc này, chỉ đổi vị trí grid desktop | Sand; danh sách văn bản, không ba thẻ |
| 4. So sánh | Khối rộng tối đa 64rem, heading/copy trên; hai ảnh cạnh nhau và nhãn ngoài ảnh | Hai ảnh xếp dọc dưới 48rem | Paper; cặp ảnh hiện là minh họa tĩnh, tương tác thực hiện ở bước 07 |
| 5. Kết quả | Bản đồ 60%, danh sách 40%; bảng và minh họa báo cáo phía dưới | Một cột: bản đồ → danh mục → bảng → báo cáo | Paper; giữ bản đồ đầy đủ, không ép vào thẻ crop |
| 6. Ứng dụng | Ba cột đều, ảnh trên và copy dưới, không khung/shadow bao toàn bộ | Một cột cả dưới 64rem; ảnh và copy nối liền | Paper; ba ảnh biên tập, dùng lại ảnh 1 như brief |
| 7. Quy trình | Heading 1/3, danh sách năm bước 2/3 theo chiều dọc | Heading rồi danh sách | Sage; số 1–5 có nghĩa thứ tự, đường nối đơn giản chỉ trang trí |
| 8. Gói và FAQ | Ba cột gói có divider, không thẻ nổi bật; FAQ phía dưới rộng 52rem | Gói xếp dọc đầy đủ điều kiện; FAQ một cột | Sand cho gói; paper cho FAQ; “Đề xuất” luôn gần tên gói |
| 9. Form/footer | Intro 1/3, form 2/3; footer toàn chiều rộng | Intro → form → footer. Form một cột dưới 48rem | Form paper; footer ink/chữ paper; nhận diện dạng chữ |

Không đặt chiều cao bằng nhau cho các section; chỉ căn CTA gói ở cuối cột khi đủ chiều rộng, để card tự cao khi text zoom. Không dùng `overflow-x: hidden` trên body để che lỗi layout.

## 5. Trạng thái và tương tác dự kiến

- Header: skip link “Đến nội dung chính”; nút menu native có `aria-expanded`/`aria-controls`; Escape đóng và trả focus về nút. Không tạo focus trap vì menu nằm trong luồng. Khi không có JS, các link vẫn hiện. Đo chiều cao header thực tế và đặt scroll offset tương ứng; trên màn thấp/menu mở dùng header trong luồng để tránh che nội dung.
- CTA dùng anchor khi đi tới section; nút chỉ cho hành động. Primary olive/paper, hover ink/paper; secondary chữ ink có underline hoặc border olive. Focus sáng: outline 3px olive, offset 3px; nền footer: outline paper. Không remove outline.
- Hai ảnh 03/04 hiện hiển thị bằng hai figure có nhãn minh họa. Khi thực hiện bước 07, dùng input range native 0–100, ban đầu 50; hỗ trợ phím mũi tên/Home/End, nhãn “Vị trí thanh so sánh”; giá trị mô tả tỷ lệ khung được mở, không phải tỷ lệ biến động. Lớp overlay cắt bằng clip-path, không thay width ảnh làm lệch tỷ lệ. Touch action cho phép cuộn dọc; không ngăn mọi touchmove. Nếu JS lỗi, hai figure có nhãn vẫn đọc được.
- FAQ dùng `details/summary`, mở độc lập, dấu mở/đóng không là nhãn duy nhất; focus và tap target rõ. Không cần animation chiều cao.
- Bảng thống kê là HTML thật, caption nêu chưa có dữ liệu; ô có wrap. Nếu ở 320px vẫn cần cuộn, chỉ cuộn vùng bảng có nhãn và bàn phím, không cuộn toàn trang. Không chuyển ảnh báo cáo thành bảng số giả.
- Form theo content-spec: label luôn hiện, mô tả bắt buộc bằng chữ, lỗi sát field và liên kết bằng `aria-describedby`; thông báo bằng vùng live phù hợp. Chế độ hiện tại là demo, không gửi mạng; không hiển thị thành công nếu chưa có xác nhận tiếp nhận.
- Hình và placeholder có width/height hoặc aspect-ratio để giữ chỗ. Alt tả nội dung thấy được, caption nêu minh họa/giới hạn. Placeholder chỉ có text HTML, không dùng `<img>` bị hỏng.
- Không có chuyển động vào màn hình mặc định. Hover màu tối đa 150ms; `prefers-reduced-motion: reduce` bỏ transition và smooth scroll. Không parallax, autoplay hoặc carousel.

## 6. Kế hoạch ảnh và hiệu năng

Thực hiện theo asset-manifest, chưa chuyển đổi file trong bước này. Chỉ khi có tài sản được phép dùng mới tạo WebP/AVIF dẫn xuất, giữ nguồn nguyên trạng. Có `srcset` 480/768/1024 nếu nguồn cho phép, không upscale nguồn 1024px lên 1600px. Hero eager, có thể fetchpriority high; hình dưới fold lazy. Không lazy hero. Ảnh dữ liệu chứa chữ ưu tiên tính rõ ràng, không nén đến mức mất chú giải.

Theo yêu cầu mới của người dùng, 8 ảnh, 4 biến thể logo và 1 video đã được sao chép nguyên trạng vào `src/assets` và tham chiếu trên trang. Thư mục nguồn vẫn giữ nguyên. Các cảnh báo về nội dung đóng trong ảnh 06/08 và việc chưa xác minh dữ liệu gốc vẫn áp dụng; không dùng các ảnh này làm bằng chứng cho claim ngoài nội dung nhìn thấy.

## 7. Xác minh và phần còn lại

Đã xem trực quan 8 ảnh, đọc kích thước/metadata, tính 10 cặp tương phản và kiểm tra glyph font regular. Chưa có render UI để đánh giá line-wrap, touch, focus, zoom, tương phản trên ảnh hoặc tốc độ tải. Tính toán ở trên không thay thế test browser.

Khi có UI, kiểm tra tối thiểu 320/375/768/1024/1440px, zoom chữ 200%, reflow tương đương 400%, bàn phím, reduced motion và chế độ không JS. Bước 03 dừng ở thiết kế/tài sản; chưa chạy bước 04.
