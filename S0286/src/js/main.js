/**
 * GASCOLAE S0286 - Fintech MRV Carbon Credit Interactions & Chatbot
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navbar Scroll Effect
  const navbar = document.querySelector('.navbar');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // 3. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question-btn');
    questionBtn?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });

      if (isActive) {
        item.classList.remove('active');
      } else {
        item.classList.add('active');
      }
    });
  });

  // 4. FLOATING CHATBOT WIDGET CONTROLS
  const chatTrigger = document.getElementById('chat-widget-trigger');
  const chatPopup = document.getElementById('chat-widget-popup');
  const chatCloseBtn = document.getElementById('chat-close-btn');
  const navOpenChat = document.getElementById('nav-open-chat');
  const heroOpenChat = document.getElementById('hero-open-chat');
  const chatInput = document.getElementById('chat-input');
  const chatSendBtn = document.getElementById('chat-send-btn');
  const chatMessages = document.getElementById('chat-messages');
  const promptButtons = document.querySelectorAll('.prompt-btn');
  const chatEscalateBtn = document.getElementById('chat-escalate-btn');

  function openChatbot() {
    chatPopup?.classList.add('active');
    setTimeout(() => {
      chatInput?.focus();
    }, 200);
  }

  function closeChatbot() {
    chatPopup?.classList.remove('active');
  }

  function toggleChatbot() {
    if (chatPopup?.classList.contains('active')) {
      closeChatbot();
    } else {
      openChatbot();
    }
  }

  chatTrigger?.addEventListener('click', toggleChatbot);
  chatCloseBtn?.addEventListener('click', closeChatbot);
  navOpenChat?.addEventListener('click', openChatbot);
  heroOpenChat?.addEventListener('click', openChatbot);

  // Close when clicking outside chat popup (optional click outside handler)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && chatPopup?.classList.contains('active')) {
      closeChatbot();
    }
  });

  // Escalate to Consultation Form
  chatEscalateBtn?.addEventListener('click', () => {
    closeChatbot();
    const consultSection = document.getElementById('consultation');
    consultSection?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  // 5. Chat Knowledge Base & Message Flow
  const knowledgeBase = {
    'Dịch vụ này làm những gì?': 
      'GASCOLAE nhận trọn chuỗi MRV cho dự án tín chỉ carbon: chốt phạm vi và phương pháp luận theo yêu cầu chương trình tín chỉ, tự thu thập dữ liệu bằng UAV kết hợp đo mặt đất, tính phát thải kỳ đường cơ sở và kỳ dự án, đánh giá độ không chắc chắn, rồi lập báo cáo MRV theo đúng mẫu. Sau khi bàn giao, tiếp tục hỗ trợ giải trình với đơn vị thẩm định độc lập cho tới khi hồ sơ được đóng.',
    'Ba Level khác nhau ra sao?': 
      '• Level 1 (Readiness): Khảo sát 1 kỳ, tính phát thải đường cơ sở baseline, đưa dự án sẵn sàng đăng ký.\n• Level 2 (Verification Support - Khuyến nghị): Khảo sát kỳ giám sát, tính giảm phát thải, lập báo cáo MRV và đồng hành giải trình tới khi thẩm định độc lập đóng hồ sơ.\n• Level 3 (Digital MRV): Duy trì MRV qua nhiều kỳ, bổ sung nền tảng dữ liệu có dashboard và nhật ký truy vết phục vụ đăng ký và ban hành tín chỉ.',
    'Tôi nhận được đầu ra gì?': 
      'Bộ hồ sơ bàn giao gồm:\n1. Báo cáo MRV theo đúng mẫu chương trình tín chỉ.\n2. Kế hoạch giám sát các kỳ tiếp theo.\n3. Bảng tính định lượng kèm công thức và tham số.\n4. Gói dữ liệu truy vết từ số đo gốc.\n5. Văn bản hỗ trợ giải trình các phát hiện của bên thẩm định.\n(Ở Level 3 có thêm Nền tảng dữ liệu MRV nhiều kỳ).',
    'Dịch vụ này khác gì dịch vụ đo trữ lượng các-bon rừng?': 
      'Khác nhau cơ bản ở đầu ra: Dịch vụ đo trữ lượng rừng bằng UAV LiDAR bán dữ liệu và bản đồ. Dịch vụ S0286 này bán trọn gói bộ hồ sơ nộp thẩm định; khâu bay quét và khảo sát ô mẫu là công đoạn kỹ thuật nội bộ để tạo lập báo cáo, không tách rời.'
  };

  function appendChatMessage(text, sender = 'user') {
    if (!chatMessages) return;
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}`;
    bubble.style.whiteSpace = 'pre-line';
    bubble.textContent = text;
    chatMessages.appendChild(bubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function handleAgentQuery(queryText) {
    appendChatMessage(queryText, 'user');

    // Simulate typing delay
    setTimeout(() => {
      let response = knowledgeBase[queryText];
      if (!response) {
        response = 'Cảm ơn bạn đã quan tâm. Để được tư vấn chi tiết về phương pháp luận, quy mô diện tích và kế hoạch triển khai cụ thể cho dự án của bạn, vui lòng bấm "Trao đổi trực tiếp với chuyên gia GASCOLAE" bên dưới để gửi yêu cầu.';
      }
      appendChatMessage(response, 'bot');
    }, 400);
  }

  promptButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const query = btn.getAttribute('data-query') || btn.textContent.trim();
      handleAgentQuery(query);
    });
  });

  if (chatSendBtn && chatInput) {
    const submitQuery = () => {
      const text = chatInput.value.trim();
      if (!text) return;
      handleAgentQuery(text);
      chatInput.value = '';
    };

    chatSendBtn.addEventListener('click', submitQuery);
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        submitQuery();
      }
    });
  }

  // 6. Lead Form Submission
  const leadForm = document.getElementById('consultation-form');
  const formSuccess = document.getElementById('form-success');

  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = leadForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Đang tiếp nhận...';
      }

      setTimeout(() => {
        leadForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Yêu cầu tư vấn';
        }
        if (formSuccess) {
          formSuccess.style.display = 'block';
          formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 600);
    });
  }

  // 7. Level Badges Interaction
  document.querySelectorAll('[data-target-level]').forEach(badge => {
    badge.addEventListener('click', () => {
      const levelId = badge.getAttribute('data-target-level');
      const targetCard = document.getElementById(levelId);
      if (targetCard) {
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetCard.style.outline = '2px solid #2ECC71';
        targetCard.style.boxShadow = '0 0 30px rgba(46, 204, 113, 0.4)';
        setTimeout(() => {
          targetCard.style.outline = '';
          targetCard.style.boxShadow = '';
        }, 1600);
      }
    });
  });
});
