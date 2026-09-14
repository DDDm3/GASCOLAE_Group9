// Public copy derived from Asset 09. Source references are editorial metadata,
// not independent verification of the underlying research or service capability.
export const contentSource = {
  file: '07_S0271_09_Service_Landing_Page_Content.docx',
  version: '1.0',
};

const source = (section, ...assets) => ({ specification: contentSource.file, section, assets });

export const service = {
  id: 'S0271',
  brand: 'GASCOLAE',
  name: 'Đo hiệu quả giảm phát thải CO₂',
  englishName: 'Measuring CO₂ Emission Reduction Efficiency',
  language: 'vi',
  targetAudience: [
    'Chủ/đơn vị vận hành bãi chôn lấp',
    'Công ty môi trường và xử lý chất thải',
    'Dự án thu hồi khí/phát điện',
    'Đội môi trường, vận hành, HSE, GIS',
    'Ban quản lý/chủ dự án và bên thẩm định',
  ],
  primaryCta: { label: 'Đăng ký khảo sát thử và tư vấn phạm vi', href: '#contact' },
  source: source('A', '01–08'),
};

export const boundaries = {
  quantification: 'Flux, lượng CH₄ giảm, hiệu suất thu gom và tCO₂e chỉ được tính khi thiết kế bay, dữ liệu gió, dữ liệu vận hành và phương pháp đáp ứng điều kiện; kết quả kèm dải bất định.',
  concentration: 'Không suy tCO₂e trực tiếp từ ppm.',
  serviceScope: 'Hỗ trợ kiểm kê/thẩm định nhưng không thay Method 21, không cấp chứng thư và không phát hành tín chỉ carbon.',
  source: source('3, 10, 11', '01', '02', '04', '06'),
};

export const hero = {
  id: 'hero',
  headline: 'Đo hiệu quả giảm phát thải CO₂ bằng UAV tại bãi chôn lấp',
  description: 'Lập bản đồ phát tán methane, định vị điểm phát thải cao và đo lặp trước–sau biện pháp khắc phục. Khi đủ điều kiện định lượng, kết quả CH₄ giảm được quy đổi sang CO₂e kèm dải bất định.',
  primaryCta: { label: 'Đăng ký khảo sát thử', href: '#contact' },
  secondaryCta: { label: 'Tư vấn chọn gói dịch vụ', href: '#contact' },
  mediaCaption: 'Minh họa khảo sát methane bằng UAV',
  playLabel: 'Xem video minh họa',
  closeVideoLabel: 'Trở về ảnh minh họa',
  videoError: 'Video chưa phát được. Bạn có thể thử lại hoặc xem ảnh minh họa.',
  directVideoLabel: 'Mở trực tiếp video MP4',
  editorialSource: 'prompts/codex-prompts/05_hero_editorial.md',
  source: source('1', '01', '02'),
};

export const problems = [
  { id: 'distributed-emissions', title: 'Nguồn methane phân tán trên diện rộng', description: 'Khó bố trí điểm đo cố định và khó bao phủ toàn bộ bề mặt bãi bằng khảo sát theo điểm.', source: source('2', '01', '02'), references: ['SRC-07', 'SRC-12'] },
  { id: 'inspection-priorities', title: 'Thiếu vị trí ưu tiên để khắc phục', description: 'Không có tọa độ điểm phát thải cao khiến đội vận hành khó xếp thứ tự kiểm tra và sửa chữa.', source: source('2', '01', '02'), references: ['SRC-05', 'SRC-07'] },
  { id: 'traceable-comparison', title: 'Thiếu bằng chứng trước–sau có truy vết', description: 'Khó chứng minh hiệu quả biện pháp khắc phục và cung cấp dữ liệu cho kiểm kê hoặc thẩm định bên thứ ba.', source: source('2', '01', '02'), references: ['SRC-02', 'SRC-07', 'SRC-12', 'SRC-13'] },
];

export const overview = {
  id: 'overview',
  description: 'Dịch vụ sử dụng UAV công nghiệp mang cảm biến CH₄, cảm biến gió và GNSS/RTK để thu dữ liệu methane đồng bộ theo vị trí, độ cao và thời gian. Dữ liệu được hiệu chỉnh, QA/QC và thể hiện trên bản đồ nhằm khoanh vùng điểm phát thải cao, hỗ trợ đội vận hành kiểm tra và khắc phục. Với Level 2 hoặc Level 3, kỳ nền được so sánh với kỳ xác nhận.',
  condition: boundaries.quantification,
  limitation: 'Không thay thế khảo sát tuân thủ hoặc chứng thư xác minh.',
  source: source('3', '01', '02'),
};

// Six editorial nodes requested by Step 08; descriptions preserve Asset 09 conditions.
export const technologyNodes = [
  { id: 'ch4', label: 'CH₄', title: 'Khảo sát CH₄ bằng UAV', description: 'Thu chuỗi nồng độ methane trên bề mặt bãi bằng UAV mang cảm biến chuyên dụng.', qualification: 'Đã xác minh về phương pháp; model cảm biến cần GASCOLAE xác nhận.', source: source('5', '01', '03') },
  { id: 'wind', label: 'WIND', title: 'Dữ liệu gió', description: 'Ghép dữ liệu gió với chuỗi đo CH₄, vị trí, độ cao và thời gian.', source: source('3, 5', '01', '03') },
  { id: 'gnss-rtk', label: 'GNSS/RTK', title: 'Đồng bộ không gian và thời gian', description: 'Ghép CH₄ với GNSS/RTK, độ cao và thời gian để định vị dữ liệu đo.', source: source('5', '01', '03') },
  { id: 'gis', label: 'GIS', title: 'Lập bản đồ', description: 'Thể hiện dữ liệu trên bản đồ để khoanh vùng điểm phát thải cao và ưu tiên vị trí cần kiểm tra.', source: source('3, 5, 9', '01', '03') },
  { id: 'qaqc', label: 'QA/QC', title: 'Kiểm soát chất lượng dữ liệu', description: 'Kiểm tra hiệu chuẩn, độ trôi, độ trễ và độ phủ; lưu hồ sơ truy vết cho dữ liệu đo.', qualification: 'Ngưỡng cần xác minh.', source: source('5, 9', '01', '03', '04') },
  { id: 'flux', label: 'FLUX', title: 'Định lượng có điều kiện', description: boundaries.quantification, qualification: 'Đã xác minh về nguyên tắc; ngưỡng và bộ hệ số cần xác minh. Áp dụng từ Level 2; không suy tCO₂e trực tiếp từ ppm.', source: source('3, 5, 8, 11', '01', '03', '04') },
];

// Storytelling stages (Step 09), not a replacement for the operational SOP.
export const measurementJourney = [
  { id: 'detect', label: 'DETECT', title: 'Phát hiện', description: 'Khảo sát CH₄ bằng UAV để phát hiện vùng methane cao trên bề mặt bãi.', source: source('4, 5', '01', '02') },
  { id: 'locate', label: 'LOCATE', title: 'Định vị', description: 'Gắn tọa độ GNSS và lập bản đồ để ưu tiên vị trí cần kiểm tra, khắc phục.', source: source('4, 9', '01', '02', '04') },
  { id: 'quantify', label: 'QUANTIFY', title: 'Định lượng có điều kiện', description: boundaries.quantification, qualification: 'Từ Level 2. Nếu thiếu điều kiện, chỉ bàn giao kết quả sàng lọc.', source: source('3, 8, 11', '01', '04', '07') },
  { id: 'verify', label: 'VERIFY', title: 'Đo xác nhận', description: 'So sánh kỳ nền và kỳ xác nhận sau khắc phục khi hai kỳ đủ điều kiện so sánh.', qualification: 'Cung cấp dữ liệu hỗ trợ thẩm định, không phải chứng thư xác minh.', source: source('4, 7, 11', '01', '04', '05') },
  { id: 'report', label: 'REPORT', title: 'Báo cáo và bàn giao', description: 'Bàn giao bản đồ CH₄, danh sách điểm phát thải cao và hồ sơ QA/QC; báo cáo trước–sau, flux và CO₂e kèm bất định khi đủ điều kiện từ Level 2.', source: source('7, 9', '04', '05') },
];

export const operationalSteps = [
  'Tiếp nhận brief, chốt ranh giới bãi, mục tiêu đo, Level và dữ liệu đầu vào.',
  'Rà soát dữ liệu, giấy phép bay, HSE, khí tượng và quyết định GO/NO-GO.',
  'Thiết kế mission, chuẩn bị thiết bị và hiệu chuẩn cảm biến trước–sau ca bay.',
  'Bay đo kỳ nền; khách hàng khắc phục; thực hiện kỳ xác nhận theo phương pháp có thể so sánh.',
  'Xử lý, QA/QC, lập bản đồ, định lượng có điều kiện, báo cáo và bàn giao.',
].map((description, index) => ({ id: `step-${index + 1}`, description, source: source('7', '04') }));

export const deliverables = [
  { id: 'ch4-map', title: 'Bản đồ CH₄ và danh sách điểm phát thải cao', description: 'Phân bố nồng độ bề mặt, tọa độ GNSS và mức ưu tiên kiểm tra.', levels: ['level-1', 'level-2', 'level-3'], source: source('9', '04', '05') },
  { id: 'traceability-qaqc', title: 'Hồ sơ truy vết và báo cáo QA/QC', description: 'Vết bay, hướng gió, hiệu chuẩn, độ phủ và tính đầy đủ dữ liệu.', levels: ['level-1', 'level-2', 'level-3'], source: source('9', '04', '05') },
  { id: 'before-after-report', title: 'Báo cáo trước–sau, flux và CO₂e', description: 'Chênh lệch kỳ nền–xác nhận, flux, CH₄ giảm và tCO₂e kèm bất định khi đủ điều kiện.', condition: boundaries.quantification, levels: ['level-2', 'level-3'], source: source('9', '04', '05') },
];

// Step 11 separates traceability and QA/QC for presentation; service scope is unchanged.
export const deliverableSheets = [
  { ...deliverables[0], id: 'sheet-map', title: 'Bản đồ CH₄ và điểm phát thải cao', mediaKey: 'ch4-map', levelLabel: 'Level 1–3' },
  { ...deliverables[1], id: 'sheet-traceability', title: 'Vết bay, hướng gió và hồ sơ truy vết', description: 'Vết bay và hướng gió trong hồ sơ truy vết dữ liệu khảo sát.', mediaKey: 'traceability-qaqc', levelLabel: 'Level 1–3' },
  { ...deliverables[1], id: 'sheet-qaqc', title: 'Báo cáo QA/QC', description: 'Hồ sơ hiệu chuẩn, độ phủ và tính đầy đủ dữ liệu.', mediaKey: 'traceability-qaqc', levelLabel: 'Level 1–3' },
  { ...deliverables[2], id: 'sheet-before-after', mediaKey: 'before-after-report', levelLabel: 'Từ Level 2 · Có điều kiện' },
];

export const serviceLevels = [
  { id: 'level-1', label: 'Level 1', name: 'Emission Screening & Mapping', positioning: 'Sàng lọc và lập bản đồ nguồn trong một khu vực, một kỳ đo.', description: 'Bản đồ CH₄, điểm cần kiểm tra, vết bay và QA/QC; không tính flux hoặc tCO₂e.', quantification: 'excluded', priceLabel: 'Liên hệ tư vấn', cta: { label: 'Tư vấn chọn gói dịch vụ', href: '#contact' }, source: source('8', '02', '07') },
  { id: 'level-2', label: 'Level 2', name: 'Quantification & Before–After', positioning: 'Định lượng toàn bãi và đo lặp kỳ nền–xác nhận.', description: 'Toàn bộ Level 1 cho hai kỳ; flux, hiệu suất thu gom khi có dữ liệu, CH₄ giảm, tCO₂e và lớp GIS khi đủ điều kiện.', condition: boundaries.quantification, quantification: 'conditional', priceLabel: 'Liên hệ tư vấn', cta: { label: 'Tư vấn chọn gói dịch vụ', href: '#contact' }, source: source('3, 8', '02', '07') },
  { id: 'level-3', label: 'Level 3', name: 'Multi-site Monitoring & Verification Support', positioning: 'Giám sát định kỳ nhiều bãi và hỗ trợ thẩm định.', description: 'Toàn bộ Level 2 theo kỳ; chuỗi thời gian, phân tích bất định, hồ sơ bằng chứng và Web GIS Dashboard.', condition: boundaries.quantification, limitation: boundaries.serviceScope, quantification: 'conditional', priceLabel: 'Liên hệ tư vấn', cta: { label: 'Tư vấn chọn gói dịch vụ', href: '#contact' }, source: source('3, 8, 10', '02', '07') },
];

export const serviceLandscapes = serviceLevels.map((level, index) => ({
  ...level,
  landscapeLabel: ['ONE SITE / ONE SURVEY', 'ONE SITE / TWO MOMENTS', 'MULTIPLE SITES / TIME SERIES'][index],
  cta: { ...level.cta, label: 'Liên hệ tư vấn' },
  editorialSource: 'prompts/codex-prompts/12_service_levels_landscapes.md',
}));

export const whyGascolae = [
  { id: 'measurement-chain', title: 'Chuỗi đo lường khép kín', description: 'Kết nối phát hiện → định vị → khắc phục → bay xác nhận → lượng hóa thay đổi.', condition: boundaries.quantification, source: source('10', '02', '06') },
  { id: 'integrated-data', title: 'Dữ liệu tích hợp và có truy vết', description: 'Kết hợp bản đồ không gian, gió, dữ liệu vận hành và nhật ký cho từng chuyến bay.', source: source('10', '02', '06') },
  { id: 'transparent-scope', title: 'Ranh giới dịch vụ minh bạch', description: 'Tách rõ sàng lọc với định lượng; hỗ trợ kiểm kê/thẩm định nhưng không thay Method 21, không cấp chứng thư xác minh và không phát hành tín chỉ carbon.', source: source('10', '02', '06') },
];

export const faqs = [
  { id: 'ppm-co2e', question: 'Đo được ppm có quy đổi ngay ra tấn CO₂e không?', answer: 'Không. ppm là nồng độ tại thời điểm đo. Cần ước tính flux từ thiết kế lấy mẫu và dữ liệu gió, sau đó áp dụng hệ số được duyệt; nếu thiếu điều kiện thì chỉ bàn giao kết quả sàng lọc.', source: source('11', '01', '04', '08'), references: ['SRC-02', 'SRC-04', 'SRC-17'] },
  { id: 'method-21', question: 'Dịch vụ có thay thế khảo sát Method 21 không?', answer: 'Không. Dịch vụ bổ trợ bằng cách bao phủ diện rộng và ưu tiên vị trí kiểm tra; không thay phép đo mặt đất phục vụ tuân thủ.', source: source('11', '01', '02', '06'), references: ['SRC-16'] },
  { id: 'carbon-credits', question: 'Kết quả có tự động dùng để xin tín chỉ carbon không?', answer: 'Không. Dịch vụ cung cấp dữ liệu và hồ sơ hỗ trợ thẩm định, không phải chứng thư xác minh và không tự phát hành tín chỉ carbon.', source: source('11', '02', '05', '06'), references: ['SRC-02', 'SRC-13'] },
  { id: 'pricing', question: 'Chi phí dịch vụ được xác định thế nào?', answer: 'Theo site/đợt hoặc chu kỳ, phụ thuộc diện tích, Level, số kỳ, cấu hình cảm biến, hiện trường, mô hình và QA/QC. Giá hiện có là đề xuất tham khảo; cần Sales/Finance phê duyệt trước khi báo giá chính thức.', source: source('11', '02', '07', '08') },
];

export const agent = {
  id: 'agent',
  name: 'Trợ lý tư vấn S0271',
  welcome: 'Xin chào. Tôi có thể giải thích dịch vụ đo hiệu quả giảm phát thải CO₂ bằng UAV, so sánh ba Level và giúp bạn chuẩn bị thông tin cho buổi tư vấn.',
  suggestedQuestions: [
    { id: 'suitability', text: 'Dịch vụ S0271 phù hợp với bãi chôn lấp của tôi như thế nào?' },
    { id: 'compare-levels', text: 'Level 1, Level 2 và Level 3 khác nhau ở đâu?' },
    { id: 'outputs', text: 'Sau khảo sát tôi sẽ nhận được những đầu ra nào?' },
    { id: 'quantification-conditions', text: 'Cần những điều kiện gì để quy đổi kết quả sang tCO₂e?' },
  ],
  escalationCta: { label: 'Liên hệ chuyên gia GASCOLAE', href: '#contact' },
  restriction: 'Chỉ dùng Assets 01–08 của S0271; không tự tạo claim, giá, timeline, ngưỡng kỹ thuật hoặc kết luận pháp lý. Không suy tCO₂e trực tiếp từ ppm; không tiết lộ dữ liệu Internal/Restricted. Chuyển chuyên gia khi thiếu dữ liệu hoặc cần xác nhận kỹ thuật, HSE, pháp lý, giá hay thẩm định.',
  endpoint: null,
  source: source('13', '08', '10'),
};

export const agentDemo = {
  intro: 'Tôi có thể giải thích dịch vụ, so sánh ba Level và giúp bạn chuẩn bị thông tin cho buổi tư vấn.',
  status: 'DEMO · Giao diện tư vấn',
  notice: 'Chưa kết nối AI. Các câu trả lời dưới đây là nội dung tham khảo được chuẩn bị sẵn từ tài liệu S0271.',
  responseLabel: 'Nội dung tham khảo',
  escalationNote: 'Phạm vi cụ thể và các câu hỏi về kỹ thuật, HSE, pháp lý, giá hoặc thẩm định cần chuyên gia xác nhận.',
  responses: {
    suitability: {
      paragraphs: [overview.description, overview.condition, overview.limitation],
      items: [],
    },
    'compare-levels': {
      paragraphs: [boundaries.quantification, boundaries.serviceScope],
      items: serviceLevels.map(level => `${level.label} — ${level.name}: ${level.positioning} ${level.description}`),
    },
    outputs: {
      paragraphs: [boundaries.quantification],
      items: deliverables.map(item => `${item.title}: ${item.description} ${item.levels.includes('level-1') ? 'Level 1–3.' : 'Từ Level 2.'}`),
    },
    'quantification-conditions': {
      paragraphs: [faqs.find(item => item.id === 'ppm-co2e').answer, boundaries.quantification, 'Level 1 không tính flux hoặc tCO₂e. Định lượng có điều kiện áp dụng từ Level 2.', boundaries.serviceScope],
      items: [],
    },
  },
};

export const cta = {
  id: 'contact',
  headline: 'Bắt đầu bằng một phạm vi khảo sát phù hợp với bãi của bạn',
  buttonLabel: 'Đăng ký tư vấn khảo sát',
  demoNotice: 'Biểu mẫu chưa kết nối hệ thống tiếp nhận. Thông tin nhập tại đây chưa được gửi đi.',
  moreFieldsLabel: 'Bổ sung thông tin khảo sát',
  lessFieldsLabel: 'Thu gọn thông tin bổ sung',
  unavailableMessage: 'Chưa thể gửi biểu mẫu trực tuyến. Vui lòng liên hệ chuyên gia GASCOLAE khi kênh tiếp nhận được công bố.',
  notice: 'Không yêu cầu tải lên dữ liệu Restricted tại form công khai. Báo giá, lịch bay và khả năng định lượng chỉ xác nhận sau bước rà soát kỹ thuật, HSE, pháp lý và dữ liệu.',
  routing: 'Chuyển cho đầu mối Sales/Service Owner để rà soát phạm vi; câu hỏi kỹ thuật, pháp lý hoặc giá chưa phê duyệt phải chuyển chuyên gia phụ trách.',
  // Required-field policy and submission endpoint are not specified by Asset 09.
  endpoint: null,
  fields: [
    { id: 'full-name', name: 'fullName', label: 'Họ tên', type: 'text', autocomplete: 'name', required: null },
    { id: 'organization', name: 'organization', label: 'Tổ chức', type: 'text', autocomplete: 'organization', required: null },
    { id: 'contact-detail', name: 'contactDetail', label: 'Email/Số điện thoại', type: 'text', required: null },
    { id: 'site-location-area', name: 'siteLocationArea', label: 'Vị trí và diện tích bãi', type: 'text', required: null },
    { id: 'measurement-goal', name: 'measurementGoal', label: 'Mục tiêu đo', type: 'textarea', required: null },
    { id: 'interested-level', name: 'interestedLevel', label: 'Level quan tâm', type: 'select', required: null, options: serviceLevels.map(({ id, label, name }) => ({ value: id, label: `${label} – ${name}` })) },
    { id: 'expected-timing', name: 'expectedTiming', label: 'Thời điểm dự kiến', type: 'text', required: null },
    { id: 'available-data', name: 'availableData', label: 'Ghi chú dữ liệu sẵn có', type: 'textarea', required: null },
  ],
  source: source('12'),
};

export const seo = {
  title: 'Đo hiệu quả giảm phát thải CO₂ bằng UAV tại bãi chôn lấp | S0271',
  description: 'Dịch vụ UAV lập bản đồ methane, định vị điểm phát thải cao và đo trước–sau biện pháp khắc phục tại bãi chôn lấp; hỗ trợ định lượng CO₂e khi đủ điều kiện.',
  primaryKeyword: 'đo giảm phát thải CO₂ bằng UAV',
  relatedKeywords: ['đo methane bãi chôn lấp', 'bản đồ CH₄ bằng UAV', 'đo phát thải trước sau', 'giám sát khí bãi rác', 'định lượng tCO₂e'],
  serviceId: service.id,
  suggestedSlug: '/dich-vu/s0271-do-hieu-qua-giam-phat-thai-co2',
  canonicalUrl: null,
  source: source('14'),
};

export const beforeAfter = {
  id: 'before-after',
  title: 'Đối chiếu kỳ nền và kỳ xác nhận',
  beforeLabel: 'KỲ NỀN',
  afterLabel: 'KỲ XÁC NHẬN',
  description: 'So sánh trước–sau chỉ có ý nghĩa khi hai kỳ đủ điều kiện tương đương. Việc lượng hóa thay đổi cần đáp ứng điều kiện dữ liệu và phương pháp, kèm dải bất định.',
  caption: 'Video minh họa so sánh cùng góc nhìn; không phải số liệu hiệu quả thực tế.',
  controlHint: 'Phát video và kéo thanh thời gian để xem từng thời điểm.',
  fallbackLabel: 'Mở video so sánh trực tiếp',
  source: source('3, 4, 7, 9', '01', '04', '05'),
  editorialSource: 'prompts/codex-prompts/10_before_after.md',
};

export const content = { service, boundaries, hero, problems, overview, technologyNodes, measurementJourney, operationalSteps, beforeAfter, deliverables, deliverableSheets, serviceLevels, serviceLandscapes, whyGascolae, faqs, agent, agentDemo, cta, seo };
