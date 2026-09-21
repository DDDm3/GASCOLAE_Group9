# S0070 Service Assistant — integration contract

Trạng thái hiện tại: `preview`. Không có endpoint, chat input, request mạng hoặc phản hồi AI giả. Bốn câu hỏi gợi ý dẫn người xem tới nội dung đã xuất bản trên cùng trang.

## Cấu hình công khai

`src/agent-config.mjs` là nguồn cấu hình build-time cho UI và hợp đồng tích hợp:

- Agent ID: `AGENT_S0070`
- Service ID cố định: `S0070`
- Display name: `S0070 Service Assistant`
- Ngôn ngữ chính: tiếng Việt, giữ thuật ngữ kỹ thuật tiếng Anh
- Handoff: `Liên hệ chuyên gia / Trao đổi nhu cầu`
- Trạng thái phản hồi: `answer`, `needs_verification`, `handoff`, `refused`

Không copy guardrail, source document hoặc commercial data vào JavaScript phía trình duyệt. File cấu hình này chỉ được build server-side; output HTML chỉ chứa nội dung UI công khai và các mã intent không nhạy cảm.

## Luồng tích hợp dự kiến

1. Client kiểm tra message bằng danh sách cảnh báo dữ liệu nhạy cảm và giới hạn độ dài.
2. Backend cấp `sessionId`; không dùng dữ liệu do client tự nhận là quyền truy cập.
3. Gateway khóa `serviceId` thành S0070 và xác thực origin/rate limit.
4. Retrieval lọc nguồn theo phân loại trước khi truy vấn. Public session chỉ được dùng phần public đã phê duyệt của Assets 01–06, 08 và 09.
5. Policy layer giữ nguyên nhãn `CẦN XÁC MINH`, chặn Internal/Restricted và quyết định answer/handoff/refused.
6. UI render plain text, nguồn public được phép và CTA handoff; không render raw HTML từ model.

## Request contract

```json
{
  "serviceId": "S0070",
  "sessionId": "server-issued opaque identifier",
  "message": "plain text after sensitive-data screening",
  "locale": "vi"
}
```

`serviceId` phía server phải luôn là S0070. Không chấp nhận tọa độ, site plan, file nhiệm vụ, chi tiết an ninh hoặc nội dung Restricted qua public chat. Không ghi log message mặc định; retention chỉ được bật khi owner phê duyệt chính sách.

## Response contract

```json
{
  "status": "answer | needs_verification | handoff | refused",
  "answer": "plain text public answer",
  "sources": [{ "asset": "Asset 01", "section": "public locator" }],
  "reasonCode": "optional controlled value",
  "handoff": { "label": "Liên hệ chuyên gia / Trao đổi nhu cầu", "href": "#lien-he" }
}
```

`answer` chỉ có khi policy layer cho phép. `sources` không được chứa URL nội bộ, đường dẫn file, raw excerpts hoặc locator tới vùng Internal/Restricted.

## Guardrails bắt buộc

- Chỉ trả lời từ nguồn được phép của S0070; không trộn service khác.
- Giữ nguyên `CẦN XÁC MINH`, `CHƯA ĐỦ THÔNG TIN`, Internal và Restricted.
- Không tự tạo hoặc tiết lộ giá, discount, KPI, SLA, ROI, tư vấn pháp lý, model thiết bị hoặc thông số nhiệm vụ.
- Không mô tả AI như hệ thống quyết định an ninh, nhắm mục tiêu hoặc tác chiến tự động.
- Không yêu cầu hoặc khuyến khích người dùng gửi tọa độ, sơ đồ khu vực hay chi tiết an ninh.
- Chuyển chuyên gia đối với nội dung thương mại, pháp lý, an ninh, dự án cụ thể, thiếu nguồn hoặc cần quyết định con người.

Trong ngữ cảnh public, câu hỏi về giá phải `handoff`; không dùng bảng giá draft Asset 07 dù Asset 10 có test dành cho ngữ cảnh có quyền.

## Kiểm thử trước khi bật live

Chạy đủ Asset 10 T001–T008 trên đúng pipeline production, bao gồm happy path, gap, restricted data, cross-service và commitment. Bổ sung kiểm thử prompt injection, retrieval authorization, logging redaction, rate limit, session isolation, timeout, retry và HTML injection.

Chỉ đổi `mode` khỏi `preview` và thêm endpoint sau khi backend, chính sách nguồn, authentication/authorization, privacy, retention, escalation routing và UAT được owner phê duyệt. Việc có UI shell không chứng minh agent runtime đã đạt guardrail.
