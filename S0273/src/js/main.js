// Navbar Scroll Effect
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(question => {
  question.addEventListener('click', () => {
    question.classList.toggle('active');
    const answer = question.nextElementSibling;
    if (question.classList.contains('active')) {
      answer.style.maxHeight = answer.scrollHeight + 'px';
    } else {
      answer.style.maxHeight = 0;
    }
  });
});

// Hero Slideshow
const slides = document.querySelectorAll('.hero-slide');
const progressBar = document.querySelector('.hero-progress-bar');
let currentSlide = 0;
const cycleDuration = 15000; // 15 seconds for a full cycle (3 slides, 5s each)
let progress = 0;
let progressInterval;

function startProgress() {
  if (slides.length === 0 || !progressBar) return;
  progress = 0;
  currentSlide = 0;
  showSlide(0);
  clearInterval(progressInterval);
  
  // Update progress bar every 50ms
  const updateInterval = 50;
  const step = (updateInterval / cycleDuration) * 100;
  
  progressInterval = setInterval(() => {
    progress += step;
    progressBar.style.width = `${progress}%`;
    
    let expectedSlide = 0;
    if (progress >= 33.33 && progress < 66.66) {
      expectedSlide = 1;
    } else if (progress >= 66.66 && progress < 100) {
      expectedSlide = 2;
    } else if (progress >= 100) {
      // Reset cycle
      progress = 0;
      expectedSlide = 0;
    }
    
    if (currentSlide !== expectedSlide) {
      showSlide(expectedSlide);
    }
  }, updateInterval);
}

function showSlide(index) {
  slides[currentSlide].classList.remove('active');
  currentSlide = index;
  slides[currentSlide].classList.add('active');
}

// Initialize slideshow
document.addEventListener('DOMContentLoaded', () => {
  startProgress();
});

// Process Section Animation
const processSteps = document.querySelectorAll('.process-step');
const processProgress = document.getElementById('processProgress');
if (processSteps.length > 0 && processProgress) {
  let processTime = 0;
  const processDuration = 10000; // 10s
  
  setInterval(() => {
    processTime += 50;
    if (processTime > processDuration) {
      processTime = 0;
    }
    
    const percentage = (processTime / processDuration) * 100;
    processProgress.style.width = `${percentage}%`;
    
    // Each step is active during its specific time window, offset by half a step
    // so it activates exactly when the progress bar reaches its center.
    const stepDuration = processDuration / processSteps.length;
    const timeOffset = stepDuration / 2;
    
    let currentActiveIndex = -1;
    if (processTime >= timeOffset) {
      currentActiveIndex = Math.floor((processTime - timeOffset) / stepDuration);
    }
    
    processSteps.forEach((step, index) => {
      if (index === currentActiveIndex) {
        step.classList.add('active');
      } else {
        step.classList.remove('active');
      }
    });
  }, 50);
}

// Auto-play video on scroll
const processVideo = document.getElementById('processVideo');
if (processVideo) {
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        processVideo.play();
      } else {
        processVideo.pause();
      }
    });
  }, { threshold: 0.5 }); // Phát video khi thấy được 50% diện tích
  
  videoObserver.observe(processVideo);
}
