# S0070 — GASCOLAE landing page

Landing page tiếng Việt theo `prompts/Codex_Landing_Page_Prompts/00_MASTER_CONTEXT.md`, lấy Asset 09 làm đặc tả nội dung công khai và đối chiếu Assets 00–10.

## Chạy tại máy

Yêu cầu Node.js 20 trở lên. Không cần cài thư viện.

```powershell
cd D:\Work\CT-group\GASCOLAE_Group9\S0070
npm.cmd run dev
```

Mở **http://127.0.0.1:4170**. Dừng bằng Ctrl+C. Sau khi sửa nguồn, chạy lại build; server đọc trực tiếp các file đã build.

```powershell
npm.cmd run build
npm.cmd run check
npm.cmd test
npm.cmd run preview
```

Trên các shell không chặn `npm.ps1`, có thể dùng `npm` thay cho `npm.cmd`.

## Cấu trúc

- `src/content.mjs`: nội dung, tham chiếu nguồn và cấu hình ảnh.
- `src/components.mjs`: các component render HTML dùng lại.
- `src/agent-config.mjs`: cấu hình public shell và hợp đồng tích hợp agent ở build time.
- `scripts/build.mjs`: các section HTML ngữ nghĩa, render tĩnh và escape nội dung.
- `src/styles.css`: design tokens, responsive, reduced motion, focus và high contrast.
- `src/app.js`: menu, chọn cấp độ, kiểm tra biểu mẫu cục bộ.
- `assets/web/`: ảnh web đã tối ưu từ ảnh có sẵn.
- `dist/`: đầu ra web công khai, được tạo bằng build và bỏ qua trong Git.
- `scripts/serve.mjs`: server xem trước chỉ phục vụ `dist/`, bind localhost.
- `tests/site.test.mjs`: kiểm tra nội dung, HTTP, cấu trúc truy cập, logic UI và tương phản.
- `docs/DESIGN_SYSTEM.md`: token, typography, grid, trạng thái tương tác và bảng tương phản.
- `docs/AGENT_INTEGRATION.md`: request/response contract, nguồn được phép, guardrail và điều kiện bật live.
- `docs/RESPONSIVE_ACCESSIBILITY.md`: phạm vi responsive, cải thiện accessibility và giới hạn kiểm tra trực quan.
- `docs/PERFORMANCE_SEO_SECURITY.md`: tối ưu tải trang, cấu hình SEO và ranh giới bảo mật cho backend tương lai.
- `docs/FINAL_QA.md`: kết quả QA cuối, hướng dẫn preview và các phê duyệt còn cần trước khi phát hành.
- `docs/LANDING_PAGE_HANDOFF.md`: đối chiếu nguồn, quyết định triển khai, giao diện tích hợp và trạng thái QA.

## Trạng thái tích hợp

Biểu mẫu chỉ kiểm tra định dạng trên máy người xem; không gửi hoặc lưu dữ liệu. S0070 Service Assistant là khối xem trước được ghi nhãn rõ; các câu hỏi gợi ý dẫn đến nội dung trang, không tạo câu trả lời AI.

Chưa có endpoint tiếp nhận, endpoint AI, kênh liên hệ được xác nhận hoặc URL production. Trang mặc định `noindex, nofollow`. Khi GASCOLAE chốt URL và cho phép triển khai, `SITE_URL` có thể được đặt thành URL HTTPS đầy đủ của trang trước khi build để thêm canonical. Việc đặt biến này không tự triển khai website.

Chỉ thư mục `dist/` là đầu ra để phục vụ web. Không dùng server mở toàn bộ `S0070/`, vì `docs/` chứa tài liệu nguồn nội bộ.
