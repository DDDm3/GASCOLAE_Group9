# Bộ prompt Codex tạo landing page S0283

Gói gồm 14 prompt thực hiện tuần tự, 5 prompt sửa lỗi và 5 tài liệu hướng dẫn/tham chiếu. Tất cả là Markdown UTF-8. Đây là bộ chỉ dẫn để Codex thực thi, chưa phải mã website, chưa chứa 8 ảnh thật và chưa có kết quả test website.

## Cách dùng
1. Giải nén và đặt thư mục này trong workspace Codex, ví dụ `S0283_Codex_Prompts/`. Cung cấp 12 tệp nguồn theo `references/SOURCE_MANIFEST.md` ở thư mục riêng không public.
2. Bắt đầu bằng prompt 01. Cho Codex đọc trực tiếp file; không cần dán cả gói vào một lượt.
3. Mỗi lần chạy một prompt. Xem báo cáo bước đó rồi gọi bước tiếp theo. Dùng fixes khi có lỗi; quay lại bước kiểm tra liên quan sau khi sửa.
4. Nếu mở phiên Codex mới, luôn yêu cầu đọc brief và `docs/implementation-status.md` trong project website để tiếp tục đúng chỗ, không dựng lại từ đầu.

Lệnh nhắn mẫu cho Codex:

> Đọc `S0283_Codex_Prompts/00_PROJECT_BRIEF.md`, sau đó thực hiện `S0283_Codex_Prompts/prompts/01_Kiem_tra_nguon_va_moi_truong.md`. Xác định project root phù hợp trong workspace. Chỉ làm bước này và ghi trạng thái để tiếp tục.

Lần sau:

> Tiếp tục project S0283 hiện có. Đọc brief, trạng thái triển khai và thực hiện file prompt số 02. Không viết lại các phần đã hoàn thành.

Ví dụ sửa lỗi:

> Thực hiện `S0283_Codex_Prompts/fixes/F01_Sua_loi_layout_mobile.md`. Lỗi quan sát: [mô tả]. Viewport: [kích thước nếu biết]. Ảnh chụp: [đính kèm nếu có]. Tái hiện, sửa và kiểm tra lại; không đổi bảng màu.

## Thứ tự thực hiện
| Bước | Prompt |
|---|---|
| 01 | [Kiểm tra nguồn và môi trường](prompts/01_Kiem_tra_nguon_va_moi_truong.md) |
| 02 | [Chốt nội dung public](prompts/02_Chot_noi_dung.md) |
| 03 | [Thiết kế và kế hoạch 8 ảnh](prompts/03_Thiet_ke_va_tai_san.md) |
| 04 | [Dựng nền tảng HTML và CSS](prompts/04_Khung_HTML_CSS.md) |
| 05 | [Dựng Header và Hero](prompts/05_Header_Hero.md) |
| 06 | [Dựng Vấn đề và Giải pháp](prompts/06_Van_de_Giai_phap.md) |
| 07 | [Dựng tương tác so sánh hai kỳ](prompts/07_So_sanh_hai_ky.md) |
| 08 | [Dựng kết quả bàn giao và ứng dụng](prompts/08_Ket_qua_Ung_dung.md) |
| 09 | [Dựng quy trình gói dịch vụ và FAQ](prompts/09_Quy_trinh_Goi_FAQ.md) |
| 10 | [Dựng form tư vấn và footer](prompts/10_Form_Footer.md) |
| 11 | [Tích hợp và hoàn thiện responsive](prompts/11_Tich_hop_Responsive.md) |
| 12 | [Kiểm thử chức năng](prompts/12_Test_chuc_nang.md) |
| 13 | [Audit giao diện accessibility hiệu năng SEO](prompts/13_Audit_chat_luong.md) |
| 14 | [Kiểm tra cuối và đóng gói website](prompts/14_Ban_giao.md) |

## Prompt sửa lỗi theo tình huống
| Mã | Prompt |
|---|---|
| F01 | [Sửa lỗi bố cục và mobile](fixes/F01_Sua_loi_layout_mobile.md) |
| F02 | [Sửa lỗi JavaScript và thanh so sánh](fixes/F02_Sua_loi_tuong_tac.md) |
| F03 | [Sửa lỗi form và kết nối gửi](fixes/F03_Sua_loi_form.md) |
| F04 | [Sửa lỗi hiệu năng và khả năng tiếp cận](fixes/F04_Sua_hieu_nang_a11y.md) |
| F05 | [Sửa nội dung sai nguồn](fixes/F05_Sua_noi_dung_du_lieu.md) |

## Tài liệu luôn giữ cùng gói
- [Bối cảnh dự án](00_PROJECT_BRIEF.md)
- [Danh mục nguồn](references/SOURCE_MANIFEST.md)
- [Skill và công cụ](references/SKILLS_AND_TOOLS.md)
- [Ma trận kiểm thử](references/TEST_MATRIX.md)

## Phạm vi
Website HTML/CSS/JS thuần, 9 phần, 8 ảnh độc lập, không cần video ở V1. Không framework frontend; không tự deploy; không chatbot giả; form demo nếu chưa có backend. Bảng màu kem–olive theo quyết định hiện tại. Mẫu Wix mới xác nhận nội dung, chưa xác nhận toàn bộ render; prompt bước 01 yêu cầu kiểm tra lại thay vì giả định.

Bộ prompt không cài skill tự động. Skill gợi ý phải được đọc và đối chiếu khả năng môi trường trước khi dùng. Không cần người dùng tự cài tất cả để bắt đầu đọc nguồn và thiết kế. Kết quả test thật chỉ có sau khi website được dựng và công cụ chạy thành công.
