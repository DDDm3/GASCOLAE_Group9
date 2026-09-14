export function initDeliverables() {
  const sheets = [...document.querySelectorAll('[data-deliverable-sheet]')];
  if (!sheets.length || !('IntersectionObserver' in window) || !sheets[0].animate) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const seen = new Set();
  const animations = new Set();
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      seen.add(entry.target);
      if (reduced.matches) return;
      // Content is visible by default, including when JS or animation fails.
      const animation = entry.target.animate([
        { opacity: 0.85, transform: 'translateY(12px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ], { duration: 380, easing: 'cubic-bezier(0.2, 0, 0, 1)' });
      animations.add(animation);
      animation.finished.then(() => animations.delete(animation), () => animations.delete(animation));
    });
  }, { threshold: 0.08 });
  function sync() {
    observer.disconnect();
    if (reduced.matches) {
      animations.forEach(animation => animation.cancel());
      animations.clear();
      return;
    }
    sheets.filter(sheet => !seen.has(sheet)).forEach(sheet => observer.observe(sheet));
  }
  reduced.addEventListener('change', sync);
  sync();
}
