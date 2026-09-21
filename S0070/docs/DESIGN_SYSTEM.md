# S0070 design system

Design system này áp dụng cho một landing page tiếng Việt về công nghệ địa không gian. Hướng thị giác là khoa học, tiết chế và đáng tin cậy: bề mặt phẳng, đường phân cách mảnh, lưới bản đồ và lớp dữ liệu. Không dùng neon, giao diện tác chiến, badge quảng cáo hoặc tường card SaaS.

## Màu nền tảng

| Token | Giá trị | Vai trò |
| --- | --- | --- |
| `--spectral-night` | `#071A24` | Nền narrative tối, chữ trên CTA |
| `--survey-depth` | `#0D2F3A` | Bề mặt dữ liệu tối, control trên nền tối |
| `--signal-teal` | `#23C7A5` | Hành động chính, dữ liệu primary |
| `--review-amber` | `#E6B35A` | Review, cảnh báo và validation trên nền tối |
| `--mapping-mist` | `#EDF4F2` | Nền data section sáng |
| `--grid-glass` | `#C9E3DE` | Chữ phụ sáng, lưới và hover CTA |
| `--technical-ink` | `#102A32` | Chữ chính trên nền sáng |
| `--clear-white` | `#F7FBFA` | Canvas và chữ chính trên nền tối |

Các tone dẫn xuất chỉ là hỗn hợp của palette trên: `ink-muted`, `ink-on-dark`, `border-light`, `border-dark`, `control-border`, `focus-deep`, `surface-deep` và `shadow-deep`. Chúng cung cấp mức tương phản trung gian mà không thêm một palette độc lập.

## Token ngữ nghĩa

| Nhóm | Token | Ánh xạ mặc định |
| --- | --- | --- |
| Background | `--color-bg`, `--color-bg-subtle` | clear-white, mapping-mist |
| Surface | `--color-surface`, `--color-surface-strong` | clear-white, survey-depth |
| Text | `--color-text`, `--color-text-muted`, `--color-text-inverse` | technical-ink, ink-muted, clear-white |
| Border | `--color-border` | border-light; dark section đổi sang border-dark |
| Action | `--color-action`, `--color-action-hover`, `--color-action-text` | signal-teal, grid-glass, spectral-night |
| Focus | `--color-focus` | focus-deep; dark section đổi sang review-amber |
| Warning/error | `--color-warning`, `--color-error` | review-amber |
| Data | `--data-primary`, `--data-review`, `--data-grid`, `--data-background` | signal-teal, review-amber, grid-glass, survey-depth |

Màu review-amber luôn đi cùng chữ, biểu tượng hoặc border; màu không phải tín hiệu duy nhất. Validation dùng `aria-invalid`, border dày và thông báo chữ liên kết với field.

## Typography

| Cấp | Token / giá trị | Dùng cho |
| --- | --- | --- |
| Display | `--text-h1`: 40–64px | Một H1 duy nhất |
| Section | `--text-h2`: 32–48px | Tiêu đề section |
| Subheading | `--text-h3`: 19–22px | Tiêu đề capability, level, FAQ |
| Lead | `--text-lead`: 21px | Đoạn mở đầu |
| Body | `--text-base`: 16px | Nội dung chính |
| Small | `--text-sm`: 13px | Control, phụ chú |
| Metadata | `--text-xs`: 11px | Eyebrow, nhãn kỹ thuật |

Heading dùng Manrope, body dùng Inter và metadata dùng IBM Plex Mono khi font có sẵn. Fallback là Segoe UI, Arial và Consolas; trang không gọi font bên thứ ba. Line height: 1.17 cho heading, 1.65 cho body và 1.8 cho đoạn giải thích dài.

## Spacing, grid và shape

- Khoảng cách dùng nhịp 8px: `space-1` đến `space-12`, tương ứng 8–96px.
- Container rộng tối đa `80rem`; độ dài copy tối đa `45rem`.
- Grid dùng 12 cột theo container; component hiện tại triển khai các nhịp 1, 2, 3 và 5 cột. Khoảng cột co giãn bằng `--grid-gap`.
- Control có bán kính 4px; hình tròn dùng `--radius-round`.
- Shadow chỉ dành cho lớp preview dữ liệu và dùng offset phẳng. Không tạo card nổi lặp lại.
- Light sections dùng mapping-mist/clear-white; dark sections dùng spectral-night/survey-depth.

## Action styles và trạng thái

| Thành phần | Mặc định | Hover | Active | Disabled |
| --- | --- | --- | --- | --- |
| Primary button | nền teal, chữ night | nền grid-glass, nâng 2px | teal, scale 0.985 | giảm opacity/saturation, không nhận pointer |
| Secondary button | nền trong, border current color | nền survey-depth, chữ clear-white | scale 0.985 | như primary |
| Text link | gạch dưới 1px | đổi sang focus, gạch 2px | giảm opacity | dùng `aria-disabled=true` khi cần |
| Input/select | nền survey-depth, border control | border grid-glass | focus border + ring teal | giảm opacity, nền night |
| Invalid field | border/ring amber + thông báo chữ | — | — | — |

Mọi thành phần tương tác dùng `:focus-visible` với outline 3px và offset 4px. Tap target chính tối thiểu 44px.

## Motion và contrast preferences

Motion dùng 120ms hoặc 180ms với easing `cubic-bezier(.2,.8,.2,1)`. `prefers-reduced-motion: reduce` tắt smooth scroll, transition và transform. `prefers-contrast: more` tăng độ đậm border/chữ phụ; `forced-colors` giữ border và dấu dữ liệu bằng system colors.

## Tương phản đã kiểm tra

Các tỷ lệ dưới đây được tính theo WCAG relative luminance; tất cả cặp chữ chính đạt AA cho chữ thường.

| Foreground / background | Tỷ lệ |
| --- | ---: |
| technical-ink / clear-white | 14.39:1 |
| ink-muted / clear-white | 6.42:1 |
| technical-ink / mapping-mist | 13.45:1 |
| ink-muted / mapping-mist | 6.00:1 |
| clear-white / spectral-night | 17.03:1 |
| ink-on-dark / spectral-night | 10.04:1 |
| spectral-night / signal-teal | 8.28:1 |
| review-amber / spectral-night | 9.27:1 |
| focus-deep / mapping-mist | 5.62:1 |
| clear-white / survey-depth | 13.56:1 |
| ink-on-dark / survey-depth | 7.99:1 |

Kiểm tra tự động nằm trong `tests/site.test.mjs`. QA bằng browser vẫn cần xác nhận focus ring, hover, invalid state và forced-colors trên trình duyệt thật.
