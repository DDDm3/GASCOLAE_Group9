/**
 * Toàn bộ nội dung landing page dịch vụ S0288.
 * Nguồn: S0288_09_Service_Landing_Page_Content, đối chiếu bổ sung với
 * S0288_01_Service_Knowledge_Base, S0288_02_Service_Profile, S0288_05_Service_Proposal.
 */

export const service = {
  id: 'S0288',
  name: 'Kiểm tra công trình cũ bằng UAV LiDAR đánh giá kết cấu xuống cấp để phát hiện nguy cơ cháy do lão hóa vật liệu',
  nameEn:
    'Structural inspection using LiDAR UAVs scans aging buildings to identify fire hazards caused by material deterioration',
  industry: 'Môi trường, sinh thái và kinh tế xanh • Giám sát hạ tầng & an toàn công trình'
};

export const company = {
  tagline: 'The General Aviation Service Company',
  established: 'Established in 2012',
  email: 'info@gasco.vn',
  phone: '(+84) 921 729 789',
  address: 'Léman Building, 20 Truong Dinh St., District 3 (former), HCMC'
};

export const legalRefs = [
  'Nghị định 288/2025/NĐ-CP',
  'Thông tư 33/2026/TT-BXD',
  'QCVN 06:2022/BXD',
  'Luật PCCC 55/2024/QH15'
];

export const nav = [
  { id: 'problems', label: 'Vấn đề' },
  { id: 'solution', label: 'Giải pháp' },
  { id: 'capabilities', label: 'Công nghệ' },
  { id: 'use-cases', label: 'Ứng dụng' },
  { id: 'process', label: 'Quy trình' },
  { id: 'packages', label: 'Gói dịch vụ' },
  { id: 'deliverables', label: 'Bàn giao' },
  { id: 'faq', label: 'FAQ' }
];

export const hero = {
  headline: 'Kiểm Tra Kết Cấu & Tầm Soát Nguy Cơ Cháy Công Trình Cũ Bằng UAV LiDAR',
  sub:
    'Giải pháp viễn thám kết hợp cảm biến laser LiDAR, ảnh trực giao RGB và camera nhiệt Radiometric Thermal giúp số hóa hiện trạng 3D, đánh giá kết cấu bên ngoài để phát hiện nguy cơ cháy do lão hóa vật liệu.',
  primaryCta: 'Đăng ký Tư vấn & Khảo sát Hiện trường',
  secondaryCta: 'Khám phá 3 Gói Dịch vụ (Level 1–3)',
  stats: [
    { value: '1–2 ngày', label: 'Bay quét tại hiện trường' },
    { value: '3–5 ngày', label: 'Xử lý dữ liệu & bàn giao báo cáo' },
    { value: '≤ 5 cm', label: 'Sai số hình học vĩ mô (khi có GCP)' },
    { value: '3 Level', label: 'Gói dịch vụ theo chiều sâu phân tích' }
  ]
};

export const problems = [
  {
    title: 'Lão hóa kết cấu & vật liệu tiềm ẩn rủi ro cháy',
    icon: 'fire'
  },
  {
    title: 'Kiểm tra thủ công tốn chi phí và rủi ro an toàn',
    icon: 'scaffold'
  },
  {
    title: 'Tồn tại nhiều “điểm mù” khó tiếp cận',
    icon: 'blindspot'
  },
  {
    title: 'Thiếu dữ liệu số hóa để theo dõi thực trạng',
    icon: 'data'
  }
];

export const solution = {
  title: 'Giải pháp khảo sát viễn thám đa cảm biến cho công trình lâu năm',
  paragraphs: [
    'GASCOLAE mang đến giải pháp Kiểm tra công trình cũ bằng UAV LiDAR (S0288) – phương pháp khảo sát viễn thám bề mặt ngoài công trình. Hệ thống thiết bị bay không người lái chuyên dụng mang cảm biến LiDAR phát hàng trăm nghìn xung laser/giây kết hợp cụm camera RGB độ nét cao và camera nhiệt bức xạ (Radiometric Thermal) để số hóa toàn diện hình học và trường nhiệt bề mặt.',
    'Dữ liệu thu thập được xử lý khử nhiễu, chuẩn hóa tọa độ quốc gia VN-2000 và phân tích bằng thuật toán AI phân đoạn kết cấu để phát hiện nhanh các dấu hiệu nứt vỡ, biến dạng, lún lệch và các điểm quá nhiệt (Hotspots) trên mái, máng cáp do lão hóa vật liệu. Kết quả cung cấp bộ hồ sơ kỹ thuật số trực quan (3D Point Cloud, Thermal Map, Defect Map), đóng vai trò là cơ sở dữ liệu đầu vào chuẩn xác phục vụ bảo trì định kỳ, nâng cao an toàn PCCC và tối ưu chi phí vận hành mà không làm gián đoạn dây chuyền sản xuất bên dưới.'
  ],
  scope: {
    inScope: [
      'Khảo sát bề mặt ngoài công trình: mái nhà xưởng, mặt đứng/mặt dựng, kết cấu bao che trên cao',
      'Quét LiDAR hình học 3D, ảnh trực giao RGB và đo bức xạ nhiệt bề mặt bằng UAV',
      'Lọc ghép đám mây điểm, nắn tọa độ VN-2000, AI phân tích nứt/biến dạng và dị thường nhiệt',
      'Báo cáo khuyết tật và Báo cáo hiện trạng & cảnh báo nguy cơ cháy do lão hóa vật liệu'
    ],
    outScope: [
      'Không bao gồm thi công sửa chữa, thay thế vật liệu hoặc lắp đặt thiết bị PCCC',
      'Không kết luận phân cấp an toàn chịu lực (Cấp A/B/C/D) hay chứng thư kiểm định pháp lý Nhà nước',
      'Bay quét trong nhà kín (GPS-denied) không thuộc gói tiêu chuẩn – cần cấu hình thiết bị riêng'
    ]
  }
};

export const benefits = [
  {
    title: 'Tiếp cận điểm mù an toàn',
    desc:
      'Khảo sát từ xa các vị trí mái nhà lớn, mặt dựng cao tầng, khu vực nguy hiểm mà không cần leo trèo hay dựng giàn giáo cồng kềnh.'
  },
  {
    title: 'Tầm soát & Cảnh báo sớm nguy cơ cháy',
    desc:
      'Nhận diện kịp thời các điểm dị thường nhiệt và vật liệu bảo vệ/dây cáp hư mòn trước khi phát sinh sự cố hỏa hoạn nghiêm trọng.'
  },
  {
    title: 'Không làm gián đoạn hoạt động sản xuất',
    desc:
      'UAV bay khảo sát trên cao độc lập, không chạm vào kết cấu, giúp nhà xưởng và tòa nhà vẫn hoạt động bình thường trong quá trình kiểm tra.'
  },
  {
    title: 'Tạo lập hồ sơ số hóa đồng bộ (Digital Twin)',
    desc:
      'Dữ liệu đám mây điểm 3D và bản đồ nhiệt tọa độ hóa giúp lưu trữ hiện trạng chuẩn, dễ dàng đối chiếu chuyển vị qua nhiều kỳ khảo sát theo thời gian.'
  },
  {
    title: 'Tối ưu hóa thời gian và nguồn lực',
    desc:
      'Rút ngắn thời gian khảo sát thực địa xuống chỉ còn 1–2 ngày so với nhiều tuần kiểm tra thủ công.',
    note: 'Claim “giảm 70% thời gian” cần GASCOLAE xác minh bổ sung.'
  }
];

export const capabilities = [
  {
    title: 'Cảm biến LiDAR phát xung laser'
  },
  {
    title: 'Cảm biến nhiệt Radiometric Thermal'
  },
  {
    title: 'Camera quang học RGB phân giải cao'
  },
  {
    title: 'AI Computer Vision & Xử lý đám mây điểm'
  },
  {
    title: 'Công nghệ Scan-to-BIM'
  },
  {
    title: 'Khảo sát không gian kín trong nhà (Indoor SLAM) - Coming Soon'
  }
];

export const useCases = [
  {
    no: '01',
    title: 'Tầm soát Hotspot & lão hóa vật liệu',
    customer:
      'Nhà máy, kho bãi, xưởng sản xuất cũ có hệ thống điện trên mái, máng cáp hoặc vật liệu bảo vệ xuống cấp có nguy cơ gây cháy.',
    output:
      'Bản đồ nhiệt Radiometric Thermal Map, định vị các điểm quá nhiệt (Hotspots) và cảnh báo hư mòn.'
  },
  {
    no: '02',
    title: 'Kiểm tra nứt & hư hỏng Facade',
    customer:
      'Chung cư cũ, tháp silo, nhà cao tầng xuất hiện vết nứt, bong tróc bê tông hoặc rỉ sét khó tiếp cận trực tiếp.',
    output:
      'Báo cáo Defect Map phân loại mức độ nứt, gắn tọa độ X,Y,Z kèm hình ảnh chụp RGB phóng to.'
  },
  {
    no: '03',
    title: 'Giám sát biến dạng theo chu kỳ',
    customer:
      'Công trình cũ cần theo dõi chuyển vị, lún lệch hoặc giãn nở khe nứt định kỳ (6 tháng hoặc 1 năm/lần).',
    output:
      'Biểu đồ biến thiên chuyển vị mm/cm, báo cáo so sánh sai lệch đám mây điểm giữa các chu kỳ.'
  },
  {
    no: '04',
    title: 'Khảo sát hiện trạng & an toàn',
    customer:
      'Chủ đầu tư cần dữ liệu hiện trạng chuẩn xác khi mất bản vẽ gốc để lập hồ sơ bảo trì, cải tạo hoặc làm việc với PCCC/Bảo hiểm.',
    output:
      'Mô hình 3D Point Cloud (.LAS/.E57), Bản đồ trực ảnh Orthomosaic và Báo cáo hiện trạng tổng hợp.'
  }
];

export const process = [
  {
    step: '01',
    title: 'Tiếp nhận & Lập kế hoạch'
  },
  {
    step: '02',
    title: 'Đo mốc & Kiểm tra an toàn'
  },
  {
    step: '03',
    title: 'Bay quét thu thập dữ liệu'
  },
  {
    step: '04',
    title: 'Xử lý dữ liệu & AI phân tích'
  },
  {
    step: '05',
    title: 'QA/QC & Bàn giao sản phẩm'
  }
];

export const packages = [
  {
    level: 'Level 1',
    name: 'Scan & 3D Point Cloud',
    tagline: 'Khảo sát hình học cơ bản',
    desc: 'Quét hình học 3D bề mặt ngoài công trình bằng UAV LiDAR và camera quang học RGB.',
    tech: ['UAV LiDAR', 'Camera RGB'],
    outputs: [
      'Đám mây điểm 3D (.LAS/.E57) chuẩn VN-2000',
      'Trực ảnh Orthomosaic mặt đứng & mái',
      'Báo cáo hình học hiện trạng'
    ],
    featured: false
  },
  {
    level: 'Level 2',
    name: 'Scan & Thermal Defect Assessment',
    tagline: 'Đánh giá kết hợp nhiệt',
    desc:
      'Tích hợp đồng thời LiDAR, RGB và camera nhiệt Radiometric Thermal; ứng dụng AI phát hiện nứt và dị thường nhiệt.',
    tech: ['UAV LiDAR', 'Camera RGB', 'Radiometric Thermal', 'AI Defect Detection'],
    outputs: [
      '3D Point Cloud gán màu nhiệt',
      'Bản đồ Hotspots rủi ro cháy',
      'Báo cáo khuyết tật (Defect Map) chi tiết'
    ],
    featured: true
  },
  {
    level: 'Level 3',
    name: 'Advanced Digital Twin & Fire Risk Audit',
    tagline: 'Chẩn đoán chuyên sâu',
    desc:
      'Khảo sát đa cảm biến độ nét cao, dựng mô hình Scan-to-BIM (LOD 200/300) và đánh giá chuyên sâu nguy cơ cháy do hư mòn vật liệu.',
    tech: ['Đa cảm biến độ nét cao', 'Scan-to-BIM LOD 200/300', 'Fire Risk Audit'],
    outputs: [
      'Mô hình BIM hoàn chỉnh (.RVT/.IFC)',
      'Báo cáo kiểm toán rủi ro cháy',
      'Kế hoạch bảo trì dự đoán'
    ],
    featured: false
  }
];

export const deliverables = [
  {
    no: '1',
    title: 'Mô hình 3D Point Cloud',
    desc:
      'File đám mây điểm 3D mật độ cao đã lọc nhiễu, gắn tọa độ VN-2000 (định dạng .LAS, .E57, .PLY hoặc xem trực tiếp trên nền tảng Web 3D Viewer).',
    formats: ['.LAS', '.E57', '.PLY', 'Web 3D Viewer'],
    level: 'Level 1–3'
  },
  {
    no: '2',
    title: 'Bản đồ Trực ảnh & Bản đồ Nhiệt',
    desc:
      'Ảnh trực giao Orthomosaic RGB sắc nét toàn diện mái/mặt đứng và lớp bản đồ bức xạ nhiệt Radiometric GeoTIFF kèm thang đo nhiệt độ.',
    formats: ['GeoTIFF', 'Orthomosaic RGB'],
    level: 'Level 1–3'
  },
  {
    no: '3',
    title: 'Báo cáo Khuyết tật (Defect Report)',
    desc:
      'Danh mục tổng hợp chi tiết các vị trí nứt, bong tróc vữa, rỉ sét kết cấu kèm tọa độ X,Y,Z và ảnh phóng to.',
    formats: ['PDF', 'Excel kỹ thuật'],
    level: 'Level 2–3'
  },
  {
    no: '4',
    title: 'Báo cáo Đánh giá Hiện trạng & Cảnh báo Cháy',
    desc:
      'Phân tích biến dạng hình học và cảnh báo các điểm có nguy cơ quá nhiệt gây cháy do lão hóa vật liệu; làm căn cứ đầu vào cho công tác bảo trì/kiểm định.',
    formats: ['PDF'],
    level: 'Level 2–3'
  },
  {
    no: '5',
    title: 'Mô hình Scan-to-BIM',
    desc:
      'Mô hình thông tin công trình số hóa từ dữ liệu quét thực tế (File Autodesk Revit .RVT hoặc file mở .IFC).',
    formats: ['.RVT', '.IFC'],
    level: 'Level 3'
  }
];

export const whyGascolae = [
  {
    title: 'Công nghệ tích hợp đa cảm biến',
    desc:
      'Kết hợp đồng bộ giữa xung laser LiDAR, camera quang học RGB phân giải cao và camera nhiệt Radiometric Thermal trên cùng nền tảng UAV giúp thu thập đầy đủ dữ liệu hình học lẫn bức xạ nhiệt.'
  },
  {
    title: 'Phân tích AI hỗ trợ phát hiện sớm',
    desc:
      'Ứng dụng mô hình thị giác máy tính (Computer Vision) để tự động nhận diện vết nứt, bóc tách cấu kiện và phát hiện các điểm dị thường nhiệt (Hotspots) ở các góc khuất trên cao.'
  },
  {
    title: 'Tuân thủ quy chuẩn an toàn & pháp lý bay',
    desc:
      'Quy trình vận hành bay tuân thủ nghiêm ngặt Nghị định 288/2025/NĐ-CP; tiêu chuẩn khảo sát và đánh giá tham chiếu Thông tư 33/2026/TT-BXD và Quy chuẩn an toàn cháy QCVN 06:2022/BXD.'
  },
  {
    title: 'Tối ưu chi phí & Bảo tồn hiện trạng',
    desc:
      'Phương pháp đo đạc không phá hủy (NDT), tiếp cận an toàn các khu vực nguy hiểm, giảm thiểu rủi ro tai nạn ngã cao và không làm gián đoạn vận hành công trình.'
  }
];

export const audiences = [
  'Chủ đầu tư / Chủ sở hữu công trình',
  'Ban Quản lý Tòa nhà / Facility Manager',
  'Quản lý Tài sản (Asset Manager)',
  'Giám đốc Nhà máy (Plant Manager)',
  'Đội ngũ Kỹ sư Bảo trì / HSE'
];

export const faqs = [
  {
    q: 'Dịch vụ S0288 phát hiện nguy cơ cháy bằng cách nào?',
    a:
      'Dịch vụ sử dụng camera nhiệt Radiometric đo nhiệt độ bức xạ bề mặt để tìm các điểm quá nhiệt (Hotspots) do chập điện, ma sát hoặc lớp bảo vệ xuống cấp, kết hợp LiDAR/RGB kiểm tra độ lão hóa của vật liệu dễ bắt cháy.'
  },
  {
    q: 'Công trình đang hoạt động/sản xuất có triển khai bay quét được không?',
    a:
      'Hoàn toàn được. UAV bay khảo sát từ xa trên cao, không chạm vào kết cấu và không làm ảnh hưởng đến dây chuyền sản xuất hay hoạt động bên dưới.'
  },
  {
    q: 'Báo cáo của GASCOLAE có thay thế chứng thư kiểm định Nhà nước không?',
    a:
      'Báo cáo cung cấp dữ liệu số hóa hiện trạng và cảnh báo sớm nguy cơ rủi ro, đóng vai trò là tài liệu đầu vào chuẩn xác phục vụ bảo trì hoặc hồ sơ thẩm định của các đơn vị kiểm định có thẩm quyền. (Không thay thế kết luận kiểm định tư pháp/chứng thư PCCC pháp lý của Nhà nước.)'
  },
  {
    q: 'Nếu công trình cũ đã mất bản vẽ thiết kế gốc thì có quét được không?',
    a:
      'Được. Dữ liệu quét LiDAR và ảnh chụp UAV sẽ tái lập hoàn toàn mô hình 3D thực tế của công trình mà không phụ thuộc vào hồ sơ lưu trữ cũ.'
  },
  {
    q: 'Thời gian triển khai và bàn giao một dự án mất bao lâu?',
    a:
      'Thời gian bay quét tại hiện trường thông thường từ 1–2 ngày làm việc. Thời gian xử lý dữ liệu hậu kỳ và xuất báo cáo từ 3–5 ngày làm việc tùy thuộc quy mô công trình.'
  },
  {
    q: 'Thủ tục cấp phép bay UAV được thực hiện như thế nào?',
    a:
      'Mọi hoạt động bay đều được đăng ký cấp phép bay hợp lệ theo Nghị định 288/2025/NĐ-CP. Đối với khu vực nội đô đông dân cư, GASCOLAE sẽ phối hợp lập hồ sơ cấp phép chi tiết.',
    note: '[CẦN XÁC MINH THỜI GIAN CẤP PHÉP]'
  }
];

export const prerequisites = [
  {
    title: 'Hiện trường',
    desc:
      'Bố trí khu vực bãi cất/hạ cánh an toàn, thông thoáng; hỗ trợ phân luồng hạn chế người không phận sự trong bán kính bay.'
  },
  {
    title: 'HSE & Pháp lý',
    desc:
      'Cung cấp văn bản chấp thuận của chủ sở hữu công trình cho phép UAV hoạt động; phối hợp bảo đảm an toàn PCCC mặt đất.'
  },
  {
    title: 'Dữ liệu đầu vào',
    desc:
      'Cung cấp ranh giới khu vực khảo sát, hồ sơ hoàn công, bản vẽ kết cấu/lịch sử bảo trì PCCC cũ (nếu có).'
  }
];

export const cta = {
  headline: 'Số Hóa Hiện Trạng & Bảo Vệ An Toàn Cho Công Trình Của Bạn Ngay Hôm Nay',
  sub:
    'Nhận tư vấn chuyên sâu về giải pháp quét LiDAR và báo giá khảo sát hiện trường trong vòng 24 giờ.',
  button: 'Gửi Yêu Cầu Tư Vấn & Khảo Sát',
  disclaimer:
    'Dữ liệu cá nhân và thông tin dự án được bảo mật theo chính sách quyền riêng tư của GASCOLAE. Báo giá chi tiết sẽ do chuyên gia kỹ thuật và Sales xác nhận sau khi khảo sát ranh giới.'
};

export const buildingTypes = [
  'Nhà xưởng KCN',
  'Chung cư cũ',
  'Tòa nhà thương mại',
  'Hạ tầng khác'
];

export const packageOptions = ['Level 1', 'Level 2', 'Level 3', 'Chưa xác định'];

export const agent = {
  name: 'Aging Building LiDAR & Fire Risk AI Assistant',
  code: 'AGENT_S0288',
  welcome:
    'Xin chào! Tôi là Trợ lý AI hỗ trợ tìm hiểu dịch vụ Kiểm tra công trình cũ bằng UAV LiDAR của GASCOLAE (S0288). Tôi có thể hỗ trợ bạn tìm hiểu về phạm vi khảo sát, các use case phát hiện nứt/quá nhiệt, đầu ra deliverables và các gói dịch vụ (Level 1–3). Bạn đang quan tâm đến công trình nào?',
  suggested: [
    'Dịch vụ S0288 phù hợp với những loại công trình và khách hàng nào?',
    'Gói Level 1, Level 2 và Level 3 khác nhau như thế nào về công nghệ và đầu ra?',
    'Sau khi quét UAV tôi sẽ nhận được những tài sản số và báo cáo kỹ thuật gì?',
    'Cần chuẩn bị hồ sơ và điều kiện mặt bằng gì trước khi đội bay tiến hành khảo sát?'
  ],
  escalation: 'Kết nối với Chuyên gia Kỹ thuật / Nhận Báo Giá Chính Thức',
  guardrail:
    'Trợ lý AI không cam kết biểu giá chính thức, không đưa kết luận phân cấp nguy hiểm kết cấu (Cấp A/B/C/D) hay chứng thư kiểm định PCCC có giá trị pháp lý Nhà nước.'
};
