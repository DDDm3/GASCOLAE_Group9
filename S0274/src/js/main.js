/**
 * main.js - GASCOLAE S0274 Landing Page Interactive Scripts
 * Handles: Navbar scroll, FAQ Accordion, AI Agent Q&A, Form Submission, Smooth Scroll
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Floating Navbar Scroll Effect
  const navbar = document.getElementById('navbar');
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    if (scrollY > 500) {
      backToTopBtn?.classList.add('show');
    } else {
      backToTopBtn?.classList.remove('show');
    }
  });

  // Back to top click
  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // 2. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const header = item.querySelector('.faq-header');
    const body = item.querySelector('.faq-body');

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items
      faqItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove('active');
          const otherBody = other.querySelector('.faq-body');
          if (otherBody) otherBody.style.maxHeight = null;
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
        body.style.maxHeight = null;
      } else {
        item.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  // 3. AI Agent Suggested Questions & Interactive Answers
  const aiAnswers = {
    q1: {
      question: "Dịch vụ này đo được những loại khí nhà kính nào?",
      answer: "Dịch vụ S0274 tập trung đo đạc và định lượng nồng độ hai khí nhà kính mục tiêu trọng yếu tại đô thị là Carbon Dioxide (CO₂) và Methane (CH₄). Thiết bị đo quang phổ tích hợp trên UAV cho phép ghi nhận biến thiên nồng độ theo không gian và profile độ cao với độ chính xác cao được kiểm soát theo thang đo WMO."
    },
    q2: {
      question: "Gói Level 2 và Level 3 khác nhau như thế nào?",
      answer: "Gói Level 2 tập trung vào việc đo đạc, nội suy không gian kriging và khoanh vùng các điểm nóng (hotspot) nồng độ cao dạng lớp bản đồ GIS. Trong khi đó, Gói Level 3 nâng cao hơn, kết hợp khung đối chiếu kiểm kê khí quyển (top-down) với báo cáo kiểm kê phát thải đô thị (bottom-up theo chuẩn GPC 1.1), đánh giá tính đại diện của mạng trạm đo và bàn giao Dashboard GIS đa thời gian."
    },
    q3: {
      question: "Dữ liệu đo UAV có thay thế được kiểm kê phát thải không?",
      answer: "Không mặc định thay thế. Dữ liệu quan trắc khí quyển bằng UAV (top-down) đóng vai trò bổ trợ, kiểm chứng độc lập và phát hiện khoảng trống phát thải thực địa cho phương pháp kiểm kê truyền thống (bottom-up). Nồng độ đo đạc không tự động quy đổi thành tốc độ phát thải (emission rate) nếu thiếu mô hình khuếch tán hỗ trợ."
    },
    q4: {
      question: "Khảo sát cho khu vực 80 ha thì tính toán chi phí dự kiến ra sao?",
      answer: "Chi phí khảo sát khu vực 80 ha phụ thuộc vào mức độ phức tạp địa hình đô thị, số lượng mặt cắt bay (profile độ cao), gói dịch vụ lựa chọn (Level 1, 2 hay 3) và tần suất đợt bay. Xin vui lòng gửi thông tin qua form liên hệ bên dưới để Đội ngũ Tư vấn Kỹ thuật Carbon & Khí hậu GASCOLAE gửi phương án bay và dự toán chi tiết nhất."
    }
  };

  const qButtons = document.querySelectorAll('.agent-q-btn');
  const answerBox = document.getElementById('agentAnswerBox');
  const answerQ = document.getElementById('agentAnswerQ');
  const answerText = document.getElementById('agentAnswerText');

  qButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const qKey = btn.getAttribute('data-q');
      const data = aiAnswers[qKey];

      if (data && answerBox && answerQ && answerText) {
        answerQ.textContent = data.question;
        answerText.textContent = data.answer;
        answerBox.classList.add('active');

        // Smooth scroll to answer box if needed
        answerBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });

  // 4. Lead Form Submission Handling
  const leadForm = document.getElementById('leadForm');
  const formToast = document.getElementById('formToast');

  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Collect data
      const formData = new FormData(leadForm);
      const name = formData.get('fullName');

      // Show toast
      if (formToast) {
        formToast.innerHTML = `<strong>Cảm ơn ${name || 'Quý khách'}!</strong> Yêu cầu khảo sát & tư vấn kỹ thuật của bạn đã được chuyển tới Đội ngũ Chuyên gia Khí hậu GASCOLAE. Chúng tôi sẽ liên hệ lại trong vòng 24 giờ làm việc.`;
        formToast.classList.add('show');
      }

      // Reset form
      leadForm.reset();

      // Auto hide toast after 8s
      setTimeout(() => {
        formToast?.classList.remove('show');
      }, 8000);
    });
  }

  // 5. Smooth Scroll for all internal navigation anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '') return;

      const targetElement = document.querySelector(href);
      if (targetElement) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight + 30 : 80;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
