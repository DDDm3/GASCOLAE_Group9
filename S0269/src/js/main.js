// main.js

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-list .card-soft');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const answer = item.querySelector('p');
            const isVisible = answer.style.display === 'block';
            
            // Close all others
            faqItems.forEach(otherItem => {
                otherItem.querySelector('p').style.display = 'none';
            });
            
            // Toggle current
            answer.style.display = isVisible ? 'none' : 'block';
        });
    });

    // 3. AI Agent Toggle
    const agentButton = document.querySelector('.agent-button');
    const agentPanel = document.querySelector('.agent-panel');
    
    if (agentButton && agentPanel) {
        agentButton.addEventListener('click', () => {
            const isVisible = agentPanel.style.display === 'block';
            agentPanel.style.display = isVisible ? 'none' : 'block';
        });
    }
});
