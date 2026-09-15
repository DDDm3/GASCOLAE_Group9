# Công cụ và môi trường S0283

Kiểm tra thực tế ngày 15/09/2026. Phạm vi: prompt 01, chưa xây UI.

## Cấu trúc

- Repo: `D:/Work/CT-group/GASCOLAE_Group9/.git`; project: `S0283`; prompt package: `S0283/prompt`.
- Có `assets/docs` (12 tệp Office), `assets/images` (8 ảnh), gói prompt. Trước audit chưa có `index.html`, CSS/JS, package.json, tests hoặc docs trạng thái trong S0283.
- `rg --files --hidden -g '!.git' -g AGENTS.md` không tìm thấy AGENTS.md trong workspace. Tuân thủ brief và hướng dẫn môi trường hiện tại.
- `git status --short` ban đầu: `?? S0283/`. Không khởi tạo repo, không commit hoặc sửa dự án khác.

## Runtime và kiểm tra thực sự đã chạy

| Công cụ | Bằng chứng | Kết quả / giới hạn |
|---|---|---|
| PowerShell, Git, rg | Liệt kê tệp, đọc UTF-8, git status, tìm AGENTS | Chạy được |
| Node | `node --version` | v22.19.0 |
| npm | `npm.cmd --version` | 10.9.3 |
| Python | `python --version`; ZIP/XML extraction | 3.14.2; đọc được 12 Office archives bằng standard library |
| Playwright / @playwright/test | `require.resolve` từ cwd workspace | NOT_RESOLVED; không kết luận đã cài ở nơi khác |
| Lighthouse / axe-core | `require.resolve` từ cwd workspace | NOT_RESOLVED; chưa chạy audit |
| Browser được môi trường cho phép | setup runtime; `getForUrl` tới demo Wix; đọc troubleshooting; `browsers.list()` | “No browser is available”; danh sách `[]`. Chưa có DOM, screenshot, console logs hoặc test tương tác |
| Web đọc trang | Mở URL template tiếng Anh, tiếng Việt, demo và các hướng dẫn skill | Trang template tiếng Anh đọc được text; tiếng Việt/demo trả Internal Error |
| HTTP local server | Chưa khởi động | Chưa có UI/public root; không phục vụ thư mục nguồn nội bộ |
| Office rendering / artifact runtime | Không có tool `load_workspace_dependencies` trong danh mục callable được tìm | Không chạy builder/render Office; nhiệm vụ chỉ trích nội dung, không tạo/sửa Office |

Đọc XML không phải kiểm thử giao diện, chạy macro, tính lại công thức hay kiểm định bố cục. Không cài package hoặc skill toàn cục; không dùng Playwright riêng để vòng qua cơ chế browser của môi trường.

## Skill: đọc khác với áp dụng

| Skill và nguồn | Phiên bản | Đã đọc | Áp dụng ở bước 01 |
|---|---|---|---|
| Documents (skill cài sẵn) | 26.826.12353 | Hướng dẫn đọc/giới hạn workflow; phần output dài bị cắt, không tuyên bố đọc trọn toàn bộ | Nguyên tắc chỉ đọc, giữ nguồn; chưa author/render |
| Spreadsheets (skill cài sẵn) | 26.826.12353 | Quy tắc đọc nguồn, công thức/cache, không sửa workbook | Truy nguồn sheet/ô và tách công thức/cache |
| Presentations (skill cài sẵn) | 26.826.12353 | Hướng dẫn skill | Đối chiếu text theo slide; chưa author/render |
| Browser: control-in-app-browser | 26.901.20858 | Toàn bộ SKILL.md và bootstrap-troubleshooting | Đã thử kết nối; không có browser |
| [frontend-design](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md) | Nhánh main, chưa pin commit | Đã đọc hướng dẫn thiết kế qua web | Chưa thiết kế/code UI; bảng màu brief ưu tiên |
| [webapp-testing](https://raw.githubusercontent.com/anthropics/skills/main/skills/webapp-testing/SKILL.md) | Nhánh main, chưa pin commit | Đã đọc | Chưa áp dụng test; ví dụ Playwright riêng/file:// không thay thế quy tắc môi trường/HTTP của dự án |
| [web-quality-audit](https://raw.githubusercontent.com/addyosmani/web-quality-skills/main/skills/web-quality-audit/SKILL.md) | metadata 2.0, chưa pin commit | Đã đọc | Chưa audit website; không có baseline đo |
| ui-ux-pro-max | Không xác định | Chưa đọc/cài | Tùy chọn, chưa dùng |

Các skill web chỉ được đọc để đánh giá khả năng cho dự án, chưa cài. Không coi gói prompt là skill/plugin. Đường dẫn skill cài sẵn nằm trong catalog của phiên làm việc; không sửa các thư mục đó.

## Bằng chứng mẫu Wix

- [Template tiếng Anh](https://www.wix.com/website-template/view/html/wh-1154): công cụ web đọc được tên “Start Up Landing Page (Clean)”, các tùy chọn desktop/mobile và mô tả dành cho startup/công ty công nghệ. Đây là text của trang giới thiệu template, chưa phải render demo.
- [Template tiếng Việt](https://vi.wix.com/website-template/view/html/wh-1154) và [demo HIABOVE](https://www.wix.com/demone2/wh-hiabove): lần truy cập này trả Internal Error. Không suy ra website ngừng hoạt động từ lỗi công cụ.
- Kết nối browser không có phiên khả dụng, nên không lưu được screenshot. Nội dung “Explore the Sky”, ba dòng drone, testimonials và form trong brief là ghi nhận từ trước, chưa được xác minh lại ở lần audit này.
- Không xác nhận pixel-perfect, chuyển động, kích thước, font hay vị trí các thành phần mẫu. Dùng layout 9 phần của brief cho các bước sau; chỉ lấy cảm hứng cấu trúc, không sao chép tài sản hoặc thương hiệu Wix.

## Kiểm thử để lại cho bước sau

Responsive, keyboard/touch slider, anchor/header, form demo/thật, console/network, Lighthouse, axe, SEO, tương phản màu, hiệu năng và kiểm tra đóng gói dữ liệu nội bộ đều **chưa chạy**. Khi có UI và browser khả dụng, thực hiện theo `prompt/references/TEST_MATRIX.md` và ghi kết quả thực đo.
