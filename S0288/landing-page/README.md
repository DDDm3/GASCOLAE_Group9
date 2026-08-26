# S0288 – Landing Page Dịch vụ Kiểm tra công trình cũ bằng UAV LiDAR

Landing page cho dịch vụ **S0288 – Kiểm tra công trình cũ bằng UAV LiDAR đánh giá kết cấu xuống cấp
để phát hiện nguy cơ cháy do lão hóa vật liệu** (GASCOLAE Platform).

## Công nghệ

- **React 18 + Vite** (HTML/CSS/JS thuần, không dùng UI framework ngoài)
- CSS viết tay theo design token, **font Arial** cho toàn bộ nội dung tiếng Việt
- Bảng màu: **xanh dương** (chủ đạo) • **xanh lá** (nhấn) • **trắng** (nền)
- Không phụ thuộc thư viện icon/animation bên ngoài — toàn bộ icon và hoạt cảnh là SVG nội tuyến

## Chạy dự án

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

Dev server mặc định: <http://localhost:5288>

## Cấu trúc

```
src/
  data/content.js          Toàn bộ nội dung landing page (tách khỏi giao diện)
  components/
    Header.jsx             Thanh điều hướng cố định, đổi nền khi cuộn
    Hero.jsx               Hero section + CTA + dải số liệu
    UavScanScene.jsx       Hoạt cảnh UAV bay quét quanh công trình
    Problems.jsx           2. Customer Problems
    Solution.jsx           3. Solution / Scope (in & out)
    Benefits.jsx           4. Key Benefits
    Capabilities.jsx       5. Key Capabilities / Technology
    UseCases.jsx           6. Use Cases
    Process.jsx            7. How It Works + Điều kiện phối hợp
    Packages.jsx           8. Service Levels (Level 1–3)
    Deliverables.jsx       9. Deliverables
    WhyGascolae.jsx        10. Why GASCOLAE + Target Audience
    Faq.jsx                11. FAQ (accordion)
    LeadSection.jsx        12. CTA + Lead form (7 nhóm trường + validation)
    ChatWidget.jsx         13. Nút chat AI Agent S0288
    Footer.jsx             Footer + tham chiếu pháp lý
    Reveal.jsx             Hiệu ứng hiện dần khi cuộn (IntersectionObserver)
    Icons.jsx              Bộ icon SVG nội tuyến
  styles/
    base.css               Design token, layout, button, chip
    hero.css               Header + Hero + hoạt cảnh UAV
    sections.css           Các section nội dung, form, chatbot, footer
```

## Hoạt cảnh UAV ở Hero

`UavScanScene.jsx` mô phỏng đúng câu chuyện dịch vụ:

1. UAV bay theo quỹ đạo khép kín (superellipse) **vòng quanh khối công trình cũ**;
2. Tia quét LiDAR/Thermal luôn hướng vào công trình, quét tới đâu **dựng đám mây điểm 3D** tới đó;
3. Khi tia quét đi qua, UAV **phát hiện 5 điểm đáng chú ý** kèm nhãn: điểm quá nhiệt máng cáp
   (78.4°C), vết nứt mặt dựng, dị thường nhiệt mái phụ (61.2°C), bong tróc lớp bảo vệ bê tông,
   rỉ sét kết cấu thép mái;
4. HUD hiển thị cụm cảm biến, tiến độ quét (%) và số điểm đã phát hiện;
5. Hết một vòng, đám mây điểm được xoá và quét lại — mô phỏng chu kỳ khảo sát.

Chi tiết kỹ thuật: vòng lặp `requestAnimationFrame` ghi thẳng `transform`/`classList` vào DOM nên
không gây re-render React mỗi khung hình; nửa quỹ đạo phía sau công trình được vẽ trước, nửa phía
trước vẽ sau và UAV được phóng to dần khi ở gần người xem để tạo chiều sâu. Trình duyệt bật
`prefers-reduced-motion` sẽ hiển thị trạng thái quét hoàn tất ở dạng tĩnh.

## Chatbot (AI Agent S0288)

Theo yêu cầu, phần hội thoại **chưa hoàn chỉnh**: trang chỉ có nút nổi "Trợ lý AI S0288", nhấn vào
sẽ mở khung chat hiển thị Welcome Message, 4 câu hỏi gợi ý (đang vô hiệu hoá), ghi chú "sắp ra mắt",
nút Escalation về form đăng ký và phần guardrails. Khi API Agent sẵn sàng, chỉ cần bổ sung phần gửi
/nhận tin nhắn trong `ChatWidget.jsx`.

## Việc cần Team Dev hoàn thiện

| Hạng mục | Vị trí |
| --- | --- |
| Kết nối API đẩy lead về CRM | `LeadSection.jsx` – hàm `onSubmit` (đang có `TODO`) |
| Hotline / email dự án | `LeadSection.jsx` – khối `cta-contact` |
| Kết nối hội thoại AI Agent (AGENT_S0288) | `ChatWidget.jsx` |
| Canonical URL / slug chính thức | `index.html` – thẻ `link[rel=canonical]` |
| Bảng giá (nếu được duyệt hiển thị) | `src/data/content.js` – mảng `packages`; hiện trang **không hiển thị đơn giá**, CTA dẫn thẳng về form tư vấn |

## Lưu ý nội dung

Các nội dung chưa được xác minh trong bộ tài liệu nguồn đều được giữ đúng trạng thái cảnh báo trên
giao diện: tính năng Indoor SLAM (gắn `[CẦN XÁC MINH]` ngay trong tên năng lực), claim "giảm 70% thời
gian" và thời gian cấp phép bay nội đô. Trang không hiển thị đơn giá nên không còn nhãn
`[CẦN XÁC MINH GIÁ CUỐI]`. Trang cũng nêu rõ báo cáo **không thay thế** chứng thư kiểm định/PCCC
của cơ quan Nhà nước.
