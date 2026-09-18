# S0288 – Landing Page Dịch vụ Kiểm tra công trình cũ bằng UAV LiDAR

Kết quả bàn giao của Nhóm 09 cho dịch vụ **S0288 – Kiểm tra công trình cũ bằng UAV LiDAR đánh giá
kết cấu xuống cấp để phát hiện nguy cơ cháy do lão hóa vật liệu** (GASCOLAE Platform).

## Nội dung gói

| Thư mục | Nội dung |
| --- | --- |
| `landing-page/` | Toàn bộ mã nguồn dự án web (HTML/CSS/JS thuần + Vite). |

*(Lưu ý: Các file ảnh thiết kế và tài liệu kiến trúc mẫu `GASCOLAE_Landing_Page_Template.md` đã được đính kèm trực tiếp bên trong thư mục `landing-page`).*

## Hướng dẫn chạy & chỉnh sửa mã nguồn

Yêu cầu Node.js 18 trở lên. Mở terminal tại thư mục `landing-page/`:

```bash
npm install
```

```bash
npm run dev
```

Trang sẽ chạy tại địa chỉ <http://localhost:5288>.

## Đóng gói dự án (Build)

Để xuất mã nguồn ra phiên bản nhẹ nhất sẵn sàng mang đi upload lên Server / Hosting:

```bash
npm run build
```

Sau khi chạy xong, toàn bộ file web hoàn chỉnh sẽ nằm trong thư mục `landing-page/dist/`.
