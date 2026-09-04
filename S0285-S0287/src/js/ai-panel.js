export function initAiPanel() {
  const form = document.querySelector('.ai-widget__input-area');
  const input = document.querySelector('.ai-widget__input');
  const messages = document.querySelector('.ai-widget__messages');
  const chips = document.querySelectorAll('.ai-chip');

  const VERIFIED_ANSWERS = {
    tech: "Dịch vụ S0285-S0287 sử dụng thiết bị UAV chuyên dụng mang cảm biến LiDAR kết hợp camera RGB/đa phổ phủ kín 100% diện tích rừng, kết hợp đo ô tiêu chuẩn mặt đất (D1.3, Hvn) để lượng hóa chính xác sinh khối trên mặt đất (AGB) và lập bản đồ trữ lượng carbon theo lô (tấn C/ha và tCO2e/ha) kèm bảng sai số kỹ thuật.",
    levels: "Khác biệt cốt lõi: Level 1 dùng LiDAR + RGB cho bản đồ carbon nền và DTM/DSM/CHM (1 kỳ bay). Level 2 bổ sung cảm biến đa phổ, trích xuất lớp cây đơn lẻ và phân tầng loài. Level 3 là gói giám sát hấp thụ đa kỳ (chu kỳ khuyến nghị 2-3 năm, giữ nguyên tham số bay) để xuất bản đồ biến động và GIS dashboard.",
    groundtruth: "Cảm biến LiDAR đo đạc cấu trúc tán đứng rất chuẩn xác nhưng không thể đo trực tiếp đường kính thân cây (D1.3) bên dưới tán rậm nhiệt đới. Do đó, việc đo đếm ô tiêu chuẩn thực địa là bắt buộc để hiệu chuẩn phương trình sinh khối allometric khoa học.",
    mrv: "Không. Nghị định 180/2026/NĐ-CP yêu cầu chuỗi đăng ký dự án, đo đạc - báo cáo và thẩm định độc lập. Dịch vụ cung cấp gói dữ liệu kỹ thuật đầu vào có tọa độ chuẩn và bảng sai số minh bạch cho chuỗi thủ tục đó, chứ không thay thế báo cáo thẩm định MRV độc lập."
  };

  function appendMessage(text, isUser = false) {
    const div = document.createElement('div');
    div.className = 'ai-msg ' + (isUser ? 'ai-msg--user' : 'ai-msg--bot');
    div.innerText = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function handleQuestion(qText) {
    appendMessage(qText, true);

    setTimeout(() => {
      let ans = "Cảm ơn quý khách. Câu hỏi này cần thêm thông tin thực tế từ hiện trường khu rừng của bạn. Vui lòng bấm 'Gặp Chuyên Gia Tư Vấn' bên dưới để kỹ sư lâm nghiệp hỗ trợ chi tiết.";
      const q = qText.toLowerCase();

      if (q.includes('công nghệ') || q.includes('giải quyết')) {
        ans = VERIFIED_ANSWERS.tech;
      } else if (q.includes('level') || q.includes('khác biệt')) {
        ans = VERIFIED_ANSWERS.levels;
      } else if (q.includes('tiêu chuẩn') || q.includes('mặt đất')) {
        ans = VERIFIED_ANSWERS.groundtruth;
      } else if (q.includes('mrv') || q.includes('thay thế')) {
        ans = VERIFIED_ANSWERS.mrv;
      }

      appendMessage(ans, false);
    }, 400);
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const q = chip.innerText.trim();
      handleQuestion(q);
    });
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = input.value.trim();
      if (!val) return;
      input.value = '';
      handleQuestion(val);
    });
  }
}
