# Kiểm thử chức năng S0283

Bộ test chỉ dùng Node.js và Python standard library, không cần cài package.

Chạy từ project root:

```powershell
node --test tests/functional.test.js
python tests/static_http_test.py
python tests/quality_audit_test.py
```

- `functional.test.js` chạy `src/js/main.js` trong DOM giả lập để kiểm tra menu, range và form demo.
- `static_http_test.py` khởi động HTTP server tạm trên cổng trống, kiểm tra tài nguyên, anchor, fallback no-JS, FAQ, metadata, cấu trúc accessibility và public bundle; server tự dừng sau test.
- `quality_audit_test.py` kiểm tra các cặp màu đã dùng cho chữ, outline heading, nhãn form, kích thước ảnh thật, chiến lược tải, ngân sách tài nguyên local quan trọng, cấu trúc video và API phía trình duyệt.

Bộ test này không render CSS, mô phỏng hành vi native đầy đủ của trình duyệt hoặc thay thế kiểm thử Playwright trên trình duyệt thật.
