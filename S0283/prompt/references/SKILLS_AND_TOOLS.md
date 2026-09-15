# Skill và công cụ

Đây là gói prompt dự án, không phải skill cài đặt. Không tạo SKILL.md và không coi gói này là plugin.

| Skill | Nguồn gốc | Vai trò |
|---|---|---|
| frontend-design | https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md | Thiết kế bám chủ đề, typography, bố cục, CSS và tự đánh giá |
| webapp-testing | https://github.com/anthropics/skills/blob/main/skills/webapp-testing/SKILL.md | Hướng dẫn test bằng Playwright, HTML tĩnh, screenshot và browser logs |
| web-quality-audit | https://github.com/addyosmani/web-quality-skills | Audit hiệu năng, accessibility, SEO, best practices |
| ui-ux-pro-max (tùy chọn) | https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/main/.claude/skills/ui-ux-pro-max/SKILL.md | Tra cứu UX bổ sung, không cần dùng đồng thời nếu trùng phạm vi |

SkillsMP là thư mục tìm kiếm: https://skillsmp.com/search . Kiểm tra nguồn gốc và đọc hướng dẫn hiện tại trước khi áp dụng. Không chạy lệnh cài từ web một cách mù quáng. Hướng dẫn môi trường và yêu cầu HTML/CSS/JS thuần của người dùng ưu tiên hơn ví dụ React/Tailwind hay Python trong skill. Nếu công cụ browser của môi trường bắt buộc một cơ chế, dùng cơ chế đó; không vòng qua hạn chế bằng Playwright riêng.

Ghi rõ mỗi skill: đã tìm thấy / đã đọc / đã áp dụng / chưa dùng, phiên bản hoặc commit nếu xác định được. Không tuyên bố đã cài khi chỉ đọc trên web. Skill không thay thế runtime: kiểm tra khả năng chạy browser, Playwright, Lighthouse, công cụ a11y. Thiếu runtime thì báo chưa test, không gọi việc đọc code là test trình duyệt.
