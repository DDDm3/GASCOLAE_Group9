// Public copy only. Asset 09 is authoritative; source labels are build-time notes.
// Never import the original Office files or their extracted contents into the website.
export const content = {
  meta: {
    source: '09 §14',
    title: 'S0070 | UAV cảm biến đa phổ & AI phát hiện bất thường, phân tích vật liệu',
    description: 'Dịch vụ khảo sát khu vực quốc phòng-an ninh bằng UAV RGB + MSI/HSI, GIS và AI anomaly detection để khoanh vùng điểm bất thường, hỗ trợ phân tích vật liệu và expert review.'
  },
  hero: {
    source: '09 §1, §3; 01 §1, §5; 02 §1, §4',
    title: 'Phát hiện bất thường bằng UAV quang phổ & AI',
    text: 'Sàng lọc khu vực quốc phòng-an ninh bằng RGB + MSI/HSI, GIS và AI để khoanh vùng điểm nghi vấn, hỗ trợ phân tích vật liệu và chuyên gia xác minh.',
    review: 'AI hỗ trợ sàng lọc. Chuyên gia rà soát và lực lượng có thẩm quyền xác minh trước khi sử dụng kết quả.'
  },
  navigation: [
    { text: 'Giải pháp', href: '#tong-quan' },
    { text: 'Năng lực', href: '#cong-nghe' },
    { text: 'Cấp độ dịch vụ', href: '#cap-do' },
    { text: 'Quy trình', href: '#quy-trinh' },
    { text: 'FAQ', href: '#faq' }
  ],
  overview: {
    source: '09 §3; 01 §5; 02 §4; 05 §4',
    lead: 'Từ dữ liệu UAV đến đầu ra GIS có thể rà soát và truy vết.',
    paragraphs: [
      'S0070 kết hợp RGB, MSI/HSI, GNSS/IMU, hiệu chỉnh dữ liệu và photogrammetry/GIS với AI anomaly detection để khoanh vùng các điểm hoặc vùng khác nền.',
      'Phân tích vật liệu ứng viên chỉ áp dụng khi có HSI và dữ liệu tham chiếu phù hợp. Mọi cảnh báo AI cần chuyên gia rà soát trước khi hỗ trợ xác minh hiện trường. Dịch vụ không thay thế quyết định an ninh hoặc xử lý vật thể khả nghi tại hiện trường.'
    ]
  },
  problems: [
    { title: 'Diện rộng. Nhiều dữ liệu.', text: 'Khu vực rộng hoặc khó tiếp cận làm tăng khối lượng quan sát thủ công và số điểm cần kiểm tra trực tiếp.', source: '09 §2; 01 §1.3; 02 §2' },
    { title: 'Ảnh màu chưa đủ.', text: 'Một số khác biệt về phổ có thể khó nhận biết chỉ từ màu sắc và hình dạng trên ảnh RGB.', source: '09 §2; 01 §1.3; 02 §2' },
    { title: 'Cần biết nơi ưu tiên.', text: 'Cần khoanh vùng, xếp hạng bất thường và dữ liệu tham chiếu phù hợp để hỗ trợ phân tích vật liệu sâu hơn.', source: '09 §2; 01 §1.3; 03 D002' }
  ],
  benefits: [
    { title: 'Sàng lọc có ưu tiên', text: 'Anomaly layer và detection list giúp chuyên gia tập trung rà soát các điểm được xếp hạng.', source: '09 §4; 05 §3; 06 slide 4' },
    { title: 'Thêm một chiều thông tin', text: 'MSI/HSI bổ sung đặc trưng phản xạ theo bước sóng ngoài những gì ảnh RGB thể hiện.', source: '09 §4; 01 §11; 02 §9' },
    { title: 'Kết quả để đối chiếu', text: 'Đầu ra GIS, ghi chú phổ và báo cáo QA hỗ trợ chuyên gia rà soát, xác minh hiện trường.', source: '09 §4; 02 §8; 04 §8' }
  ],
  capabilities: [
    { tag: '01 / ACQUISITION', title: 'Thu nhận dữ liệu phổ', text: 'RGB kết hợp MSI hoặc HSI, cùng GNSS/IMU, trong phạm vi và thời gian được phê duyệt.', source: '09 §5; 03 M007, S002, S008' },
    { tag: '02 / ANALYSIS', title: 'Khoanh vùng khác biệt', text: 'AI anomaly detection xếp hạng vùng khác nền. Spectral matching/classification chỉ áp dụng khi dữ liệu phổ và tham chiếu phù hợp.', source: '09 §5; 01 §5; 03 S004' },
    { tag: '03 / REVIEW', title: 'GIS & human-in-the-loop', text: 'Hiệu chỉnh, georeference và orthomosaic tạo nền đối chiếu. Kết quả được chuyên gia rà soát trước khi sử dụng.', source: '09 §5; 04 §8; 03 S005' }
  ],
  useCases: [
    { title: 'Khảo sát định kỳ', text: 'Sàng lọc điểm, vùng khác nền với orthomosaic, anomaly layer và danh sách ưu tiên rà soát.', source: '09 §6; 01 §4; 03 D003' },
    { title: 'Tái kiểm tra & theo dõi thay đổi', text: 'Đối chiếu dữ liệu giữa các đợt khảo sát để ghi nhận thay đổi và vùng cần xác minh.', source: '09 §6; 02 §6; 03 D003' },
    { title: 'Đánh giá vật liệu ứng viên', text: 'Hỗ trợ phân tích phổ khi có HSI và dữ liệu tham chiếu phù hợp; luôn kèm giới hạn và chuyên gia rà soát.', source: '09 §6; 01 §4; 03 D003' }
  ],
  levels: [
    { id: '1', name: 'Screening', title: 'Sàng lọc diện rộng', sensor: 'RGB + MSI', text: 'Khoanh vùng bất thường và tạo đầu ra để chuyên gia rà soát.', items: ['Orthomosaic / ảnh nền georeference', 'Anomaly layer & detection list', 'Expert review & báo cáo QA'], note: 'Phù hợp nhu cầu sàng lọc ban đầu.', source: '09 §8; 02 §7; 05 §6; 07 package structure only' },
    { id: '2', name: 'Material Analysis', title: 'Phân tích vật liệu', sensor: 'RGB + HSI', text: 'Bổ sung phân tích chữ ký phổ và đánh giá vật liệu ứng viên.', items: ['Các đầu ra của Level 1', 'Spectral matching / classification', 'Lớp vật liệu ứng viên khi đủ dữ liệu'], note: 'Cần HSI và dữ liệu tham chiếu phù hợp.', source: '09 §8; 02 §7; 05 §6; 07 package structure only' },
    { id: '3', name: 'Continuous Monitoring', title: 'Giám sát lặp lại', sensor: 'MSI / HSI THEO MỤC TIÊU', text: 'So sánh nhiều thời điểm để theo dõi thay đổi trong khu vực.', items: ['Chuỗi dữ liệu theo thời gian', 'Change detection & lịch sử cảnh báo', 'Báo cáo định kỳ'], note: 'Tần suất và điều kiện được xác nhận theo nhu cầu.', source: '09 §8; 02 §7; 05 §6; 07 package structure only' }
  ],
  workflow: [
    { title: 'Xác định phạm vi', text: 'Làm rõ nhu cầu, cấp độ dịch vụ và quyền triển khai.', source: '09 §7 step 01; 04 §5 steps 01–02' },
    { title: 'Chuẩn bị khảo sát', text: 'Chọn MSI/HSI và phương án thu nhận, hiệu chỉnh phù hợp.', source: '09 §7 step 02; 04 §5 step 03' },
    { title: 'Thu nhận & QA', text: 'Thu dữ liệu trong phạm vi đã duyệt, kiểm tra chất lượng đầu vào.', source: '09 §7 step 03; 04 §5 steps 04–05' },
    { title: 'Xử lý & phân tích', text: 'Tạo dữ liệu GIS và phân tích theo cấp độ dịch vụ.', source: '09 §7 step 04; 04 §5 steps 05–06' },
    { title: 'Chuyên gia & bàn giao', text: 'Rà soát kết quả, ghi rõ giới hạn và bàn giao qua kênh được duyệt.', source: '09 §7 step 05; 04 §5 steps 07–08' }
  ],
  deliverables: [
    { title: 'Orthomosaic / ảnh nền georeference', text: 'Ảnh tổng hợp không gian phục vụ đối chiếu và GIS; GeoTIFF hoặc định dạng tương đương khi phù hợp.', source: '09 §9; 04 §10; 05 §8' },
    { title: 'Anomaly layer & detection list', text: 'Lớp điểm/vùng bất thường và danh sách kèm tọa độ, ảnh cắt, confidence hoặc đặc trưng phổ khi có.', source: '09 §9; 04 §10; 05 §8' },
    { title: 'Báo cáo QA & phân tích', text: 'Phương pháp, chất lượng và giới hạn dữ liệu. Level 2 có thể kèm lớp vật liệu ứng viên khi đủ HSI và tham chiếu.', source: '09 §9; 04 §10; 05 §8' }
  ],
  trust: [
    { title: 'Phạm vi được phê duyệt', text: 'Chỉ khảo sát trong khu vực và thời gian đã được phê duyệt, với quyền triển khai, quyền truy cập và điều kiện an toàn phù hợp.', source: '09 §10–§11; 03 S008; 04 §6' },
    { title: 'Kết quả phụ thuộc dữ liệu', text: 'Ánh sáng, che khuất, mixed pixel, chất lượng hiệu chỉnh và dữ liệu tham chiếu đều có thể ảnh hưởng đến kết quả.', source: '09 §10–§11; 01 §9–§12' },
    { title: 'Phân tích vật liệu có điều kiện', text: 'MSI phù hợp cho screening. Khi cần phân tích sâu hơn, phải có HSI và dữ liệu tham chiếu phù hợp.', source: '09 §3, §10–§11; 01 §5' },
    { title: 'Giới hạn được nêu rõ', text: 'Không cam kết 100% phát hiện. AI không thay thế quyết định an ninh hoặc xác minh hiện trường. S0070 không bao gồm xử lý vật thể khả nghi tại hiện trường.', source: '09 §10–§11; 01 §6, §12; 06 slide 9' }
  ],
  faq: [
    { title: 'Có phát hiện chính xác mọi thiết bị khả nghi không?', text: 'Không cam kết 100% phát hiện. S0070 hỗ trợ phát hiện, xếp hạng bất thường và phân tích vật liệu khi dữ liệu phù hợp. Kết quả cần expert review và xác minh hiện trường.', source: '09 §11; 01 §13; 06 slide 11' },
    { title: 'Vì sao cần MSI/HSI thay vì chỉ RGB?', text: 'Dữ liệu phổ bổ sung thông tin phản xạ theo bước sóng. MSI phù hợp sàng lọc; HSI có nhiều băng hơn và phù hợp hơn khi cần phân tích chữ ký phổ, vật liệu sâu.', source: '09 §11; 01 §13; 02 §5' },
    { title: 'Có cần thư viện phổ hoặc dữ liệu tham chiếu không?', text: 'Anomaly detection có thể hỗ trợ sàng lọc khi chưa biết trước mọi loại mục tiêu. Spectral matching/classification vật liệu cần dữ liệu tham chiếu phù hợp và đủ chất lượng.', source: '09 §11; 01 §13; 03 S004; 08 P005' },
    { title: 'Điều kiện nào cần có trước khi triển khai?', text: 'Chỉ triển khai trong khu vực và thời gian được phê duyệt, khi đáp ứng yêu cầu về quyền triển khai, an toàn, quyền truy cập và yêu cầu của cơ quan chủ quản. Điều kiện cụ thể cần được người phụ trách xác minh theo nhiệm vụ.', source: '09 §11; 03 S008; 04 §6' },
    { title: 'Giá dịch vụ và thời gian bàn giao được xác định thế nào?', text: 'Vui lòng trao đổi nhu cầu để xác định phạm vi, cấu hình cảm biến và cấp độ dịch vụ. Giá, thời gian bàn giao và SLA cần được GASCOLAE xác nhận theo từng dự án.', source: '09 §8, §12; 05 §9, §12; master context contact-based pricing' }
  ],
  contact: {
    source: '09 §12; 03 S010, R008; 10 R004, R008',
    heading: 'Bắt đầu từ nhu cầu của bạn.',
    lead: 'Xác định cấu hình khảo sát phù hợp.',
    text: 'Chia sẻ thông tin liên hệ công việc và mục tiêu tổng quát. Phạm vi kỹ thuật, khu vực cụ thể và thông tin nhạy cảm chỉ được trao đổi qua kênh được phê duyệt.',
    privacy: 'Không nhập tọa độ, sơ đồ khu vực, chi tiết an ninh hoặc dữ liệu hạn chế. Các trường có * là bắt buộc để kiểm tra bản xem trước.'
  },
  footer: {
    source: '09 §14; master context',
    descriptor: 'S0070 · UAV quang phổ & AI\nKhảo sát. Đối chiếu. Kiểm chứng.',
    notice: 'Thông tin kỹ thuật, phạm vi, thời gian và điều kiện thương mại được xác nhận theo từng dự án.'
  }
};

// Reviewed illustration: conceptual terrain cube, no real coordinates or sensitive facilities.
export const media = {
  brand: { file: 'brand-mark.png', width: 189, height: 160,
    original: 'LOGO_no-bg.png', alt: 'Biểu tượng GASCOLAE: UAV kết hợp hình lá cây.' },
  hero: { file: 'spectral-cube.webp', small: 'spectral-cube-640.webp', width: 1024, height: 765,
    video: null,
    original: '3f1dcf5f-e9ab-469a-b3f4-8369d7af0132.jpg',
    alt: 'Minh họa khối dữ liệu phổ: các lớp phổ bên dưới một bề mặt địa hình giả lập.' },
  workflow: { file: 'service-workflow.webp', width: 1024, height: 572,
    original: '1e9176bd-7b53-4031-b6ef-ba7e35d5422c.jpg',
    alt: 'Minh họa chuỗi UAV, dữ liệu phổ, bản đồ GIS và chuyên gia rà soát.' },
  sensor: { file: 'uav-sensor.webp', small: 'uav-sensor-640.webp', width: 1024, height: 687,
    original: '51cdc630-780e-459f-995b-4b047885f2b2.jpg',
    alt: 'Minh họa UAV mang cảm biến và dải ánh sáng nhiều bước sóng.', caption: 'Hình minh họa UAV và cảm biến quang phổ.' },
  applications: { file: 'spectral-site-overview.webp', small: 'spectral-site-overview-640.webp', width: 1024, height: 687,
    original: '9c4423a6-3b16-497a-be19-b42eba3afb70.jpg',
    alt: 'Minh họa cảnh quan nhìn từ trên cao với lưới phân tích và các vùng được đánh dấu.', caption: 'Hình minh họa lớp phân tích trên cảnh quan giả lập.' },
  monitoring: { file: 'uav-monitoring.webp', small: 'uav-monitoring-640.webp', width: 1024, height: 572,
    original: 'b959b0a0-e7d4-4a96-adfe-b08809ff5f0f.jpg',
    alt: 'Minh họa UAV khảo sát phía trên cảnh quan với các vùng dữ liệu quang phổ.', caption: 'Hình minh họa hoạt động khảo sát và giám sát bằng UAV.' }
};
