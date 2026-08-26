# S0288 – Landing Page Dịch vụ Kiểm tra công trình cũ bằng UAV LiDAR

Kết quả bàn giao của Nhóm 09 cho dịch vụ **S0288 – Kiểm tra công trình cũ bằng UAV LiDAR đánh giá
kết cấu xuống cấp để phát hiện nguy cơ cháy do lão hóa vật liệu** (GASCOLAE Platform).

## Nội dung gói

| Thư mục | Nội dung |
| --- | --- |
| `dist/` | Bản build tĩnh đã tối ưu. Mở trực tiếp `dist/index.html` bằng trình duyệt là xem được, không cần cài đặt gì. |
| `landing-page/` | Toàn bộ mã nguồn React + Vite để chỉnh sửa và build lại (không kèm `node_modules`). |
| `assets/` | File logo GASCOLAE gốc (`.svg`, `.png`) dùng cho header và footer. |

## Xem nhanh bản đã build

Mở file `dist/index.html`.

## Chạy và chỉnh sửa mã nguồn

Yêu cầu Node.js 18 trở lên. Mở terminal tại thư mục `landing-page/`:

```bash
npm install
```

```bash
npm run dev
```

Trang chạy tại <http://localhost:5288>. Build lại bản tĩnh:

```bash
npm run build
```

> Trên Windows PowerShell, nếu báo lỗi *"npm.ps1 cannot be loaded because running scripts is
> disabled"*, dùng `npm.cmd install` / `npm.cmd run dev` thay cho `npm`.

## Nơi chỉnh sửa nhanh

| Muốn sửa | Mở file |
| --- | --- |
| Toàn bộ chữ trên trang (headline, gói dịch vụ, FAQ, form…) | `landing-page/src/data/content.js` |
| Bảng màu, font, bo góc, đổ bóng | `landing-page/src/styles/base.css` (khối `:root`) |
| Header, Hero, hoạt cảnh UAV | `landing-page/src/styles/hero.css` |
| Các section nội dung, form, chatbot, footer | `landing-page/src/styles/sections.css` |
| Logo (header + footer) | `landing-page/src/components/BrandLogo.jsx` |
| Nội dung hoạt cảnh UAV (điểm phát hiện, tốc độ bay) | `landing-page/src/components/UavScanScene.jsx` |
| SEO title, meta description, canonical | `landing-page/index.html` |

Chi tiết kiến trúc và các hạng mục Team Dev cần hoàn thiện: xem `landing-page/README.md`.

## Lưu ý bàn giao

- Trang **không hiển thị đơn giá**; các CTA gói dịch vụ dẫn về form đăng ký tư vấn.
- Năng lực Indoor SLAM ghi rõ trạng thái *Coming Soon*; claim "giảm 70% thời gian" vẫn để nhãn cần
  GASCOLAE xác minh.
- Footer nêu rõ báo cáo khảo sát **không thay thế** chứng thư kiểm định hoặc PCCC của cơ quan Nhà nước.
- Khung chat AI Agent (AGENT_S0288) mới dừng ở phần giao diện: nút mở, lời chào, câu hỏi gợi ý và
  nút chuyển chuyên gia. Phần hội thoại thật sẽ nối API sau.
