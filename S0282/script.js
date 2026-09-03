document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navbar Sticky Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Đóng tất cả các item khác
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle item hiện tại
            item.classList.toggle('active');
        });
    });

    // 3. Lead Form Submit (Mock)
    const leadForm = document.getElementById('leadForm');
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = leadForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            
            // Đổi text button để giả lập loading
            btn.innerText = 'Đang gửi yêu cầu...';
            btn.style.opacity = '0.8';
            btn.disabled = true;

            setTimeout(() => {
                alert('Gửi yêu cầu thành công! Chuyên viên GASCOLAE sẽ sớm liên hệ với bạn.');
                leadForm.reset();
                btn.innerText = originalText;
                btn.style.opacity = '1';
                btn.disabled = false;
            }, 1500);
        });
    }

    // 4. Floating AI Chat Widget Toggle & Mock
    const chatLauncher = document.getElementById('chatLauncher');
    const chatPanel = document.getElementById('chatPanel');
    const chatClose = document.getElementById('chatClose');
    const chatSuggestBox = document.getElementById('chatSuggestBox');
    const chatMessages = document.getElementById('chatMessages');
    const suggestionBtns = chatSuggestBox ? chatSuggestBox.querySelectorAll('.suggestion-btn') : [];

    // Toggle logic
    if (chatLauncher && chatPanel && chatClose) {
        chatLauncher.addEventListener('click', () => {
            chatLauncher.style.display = 'none';
            chatPanel.style.display = 'flex';
        });

        chatClose.addEventListener('click', () => {
            chatPanel.style.display = 'none';
            chatLauncher.style.display = 'flex';
        });
        
        // Close on Esc key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && chatPanel.style.display === 'flex') {
                chatPanel.style.display = 'none';
                chatLauncher.style.display = 'flex';
            }
        });
    }

    const agentAnswers = {
        'Quy trình khảo sát UAV gồm mấy bước?': 'Quy trình chuẩn của chúng tôi gồm 5 bước: 1. Khảo sát yêu cầu. 2. Thiết kế Mission bay. 3. Thu dữ liệu hiện trường. 4. Xử lý dữ liệu. 5. Bàn giao bản đồ và báo cáo.',
        'Gói Level 2 và Level 3 khác nhau ra sao?': 'Gói Level 2 tập trung vào lập bản đồ phân vùng khô hạn. Gói Level 3 nâng cao hơn, tích hợp mô hình Machine Learning để dự đoán rủi ro và cung cấp Dashboard theo dõi theo thời gian thực.',
        'Sau khi bay tôi sẽ nhận được bản đồ gì?': 'Bạn sẽ nhận được: Bản đồ Orthomosaic, Bản đồ nhiệt bề mặt, Bản đồ phân bố độ ẩm/vùng khô hạn, và Lớp dữ liệu GIS để tích hợp vào hệ thống của cơ quan.'
    };

    function appendMessage(text, isUser = false) {
        const wrap = document.createElement('div');
        wrap.classList.add('chat-msg');
        
        const bubble = document.createElement('div');
        bubble.classList.add('chat-msg__bubble');
        if (isUser) {
            bubble.style.backgroundColor = 'var(--blue-50)';
            bubble.style.color = 'var(--blue-800)';
            bubble.style.marginLeft = 'auto';
            bubble.style.borderBottomRightRadius = '4px';
        }
        bubble.innerText = text;
        wrap.appendChild(bubble);
        chatMessages.appendChild(wrap);
        
        // Cuộn xuống cuối (sử dụng setTimeout để đảm bảo DOM đã update và cuộn mượt mà)
        setTimeout(() => {
            const body = document.querySelector('.chat-panel__body');
            if(body) {
                body.scrollTo({
                    top: body.scrollHeight,
                    behavior: 'smooth'
                });
            }
        }, 50);
    }

    suggestionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const question = btn.innerText;
            
            // Ẩn nút gợi ý
            btn.style.opacity = '0.5';
            btn.disabled = true;

            // Thêm câu hỏi của user
            appendMessage(question, true);

            // Giả lập AI đang type
            setTimeout(() => {
                const answer = agentAnswers[question] || 'Xin lỗi, tôi chưa có thông tin về vấn đề này. Bạn có thể nhấn nút "Chuyển chuyên viên tư vấn" bên dưới để được hỗ trợ chi tiết.';
                appendMessage(answer, false);
            }, 800);
        });
    });

    // 5. Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

});
