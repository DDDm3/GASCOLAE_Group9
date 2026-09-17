/* main.js - Interactive Scripts for S0284 Landing Page */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Navbar Scroll Effect
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (scrollY > 500) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });

  // Back to top click
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 2. Smooth Scrolling for Navigation Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '') return;
      
      const targetEl = document.querySelector(href);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 3. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close other open items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
      } else {
        item.classList.add('active');
      }
    });
  });

  // 4. Lead Form Submission Toast
  const leadForm = document.getElementById('leadForm');
  const formToast = document.getElementById('formToast');

  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = document.getElementById('submitLeadBtn');
      const originalText = submitBtn.textContent;
      
      submitBtn.disabled = true;
      submitBtn.textContent = 'Đang xử lý thông tin...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        leadForm.reset();

        formToast.innerHTML = '✅ <strong>Đăng ký thành công!</strong> Đội ngũ Chuyên gia Lâm nghiệp & Môi trường của GASCOLAE sẽ liên hệ với bạn trong vòng 24h làm việc.';
        formToast.classList.add('show');

        setTimeout(() => {
          formToast.classList.remove('show');
        }, 7000);
      }, 1000);
    });
  }

  // 5. Dynamic Micro-Telemetry Fluctuation Simulation (Real-time telemetry feel)
  const fmcValEl = document.getElementById('telemetryFmcVal');
  const tempValEl = document.getElementById('telemetryTempVal');

  if (fmcValEl && tempValEl) {
    setInterval(() => {
      const fmcBase = 138.4;
      const fmcOffset = (Math.random() * 0.8 - 0.4).toFixed(1);
      const newFmc = (fmcBase + parseFloat(fmcOffset)).toFixed(1);
      fmcValEl.textContent = newFmc + '%';

      const tempBase = 24.8;
      const tempOffset = (Math.random() * 0.4 - 0.2).toFixed(1);
      const newTemp = (tempBase + parseFloat(tempOffset)).toFixed(1);
      tempValEl.textContent = newTemp + '°C';
    }, 4000);
  }
});
