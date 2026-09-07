/**
 * src/js/process-steps.js
 * Interactive 5-Step Workflow with Keyboard Accessibility
 */
export function initProcessSteps() {
  const steps = Array.from(document.querySelectorAll('.process-step'));
  if (steps.length === 0) return;

  function activateStep(idx) {
    steps.forEach((s, i) => {
      if (i === idx) {
        s.classList.add('active');
        s.setAttribute('aria-current', 'step');
      } else {
        s.classList.remove('active');
        s.removeAttribute('aria-current');
      }
    });
  }

  steps.forEach((step, idx) => {
    step.setAttribute('tabindex', '0');
    step.setAttribute('role', 'button');
    step.setAttribute('aria-label', `Bước ${idx + 1}: ${step.querySelector('.process-step__title')?.innerText || ''}`);

    step.addEventListener('click', () => activateStep(idx));

    // Keyboard navigation (Enter / Space / Left / Right)
    step.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activateStep(idx);
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIdx = (idx + 1) % steps.length;
        steps[nextIdx].focus();
        activateStep(nextIdx);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIdx = (idx - 1 + steps.length) % steps.length;
        steps[prevIdx].focus();
        activateStep(prevIdx);
      }
    });
  });
}
