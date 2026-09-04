/**
 * src/js/reveal.js
 * High-performance IntersectionObserver for Section & Data Reveals
 */
export function initReveal() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const elements = document.querySelectorAll('.reveal');

  if (prefersReduced) {
    elements.forEach(el => el.classList.add('visible'));
    document.querySelectorAll('.metric').forEach(m => m.classList.add('visible'));
    return;
  }

  // 1. Observe standard section and card reveals
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => revealObserver.observe(el));

  // 2. Observe metric strip for metric value animation
  const metrics = document.querySelectorAll('.metric');
  if (metrics.length > 0) {
    const metricObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          metricObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    metrics.forEach(m => metricObserver.observe(m));
  }
}
