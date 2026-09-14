export function journeyScrollGeometry(viewportHeight, stickyHeight, topOffset, stageCount) {
  const distance = Math.max(1, (stageCount - 1) * viewportHeight * 0.7);
  // At the document bottom, the viewport still needs room below the sticky
  // content. Reserve that room plus a short fully-visible final-stage hold.
  const endHold = viewportHeight * 0.15;
  const sectionHeight = distance + Math.max(stickyHeight, viewportHeight - topOffset) + endHold;
  return { distance, sectionHeight };
}

export function initJourney() {
  const section = document.querySelector('[data-journey]');
  if (!section) return;
  const sticky = section.querySelector('.journey-sticky');
  const viewport = section.querySelector('.journey-window');
  const track = section.querySelector('.journey-track');
  const stages = [...section.querySelectorAll('.journey-stage')];
  const links = [...section.querySelectorAll('[data-journey-link]')];
  const query = window.matchMedia('(min-width: 64.0625rem) and (min-height: 50rem) and (prefers-reduced-motion: no-preference)');
  let enabled = false, frame = 0, start = 0, distance = 1, travel = 0, last = -1;
  function paint() {
    frame = 0;
    if (!enabled) return;
    const progress = Math.max(0, Math.min(1, (window.scrollY - start) / distance));
    if (progress === last) return;
    last = progress;
    track.style.setProperty('--journey-x', `${-progress * travel}px`);
    const active = Math.round(progress * (stages.length - 1));
    links.forEach((link, index) => {
      if (index === active) link.setAttribute('aria-current', 'step');
      else link.removeAttribute('aria-current');
    });
  }
  function schedule() { if (enabled && !frame) frame = requestAnimationFrame(paint); }
  function reset() {
    enabled = false;
    window.removeEventListener('scroll', schedule);
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    section.removeAttribute('data-horizontal');
    section.style.removeProperty('--journey-height');
    track.style.removeProperty('--journey-x');
    links.forEach(link => link.removeAttribute('aria-current'));
  }
  function measure() {
    reset();
    if (!query.matches) return;
    section.setAttribute('data-horizontal', '');
    const offset = parseFloat(getComputedStyle(sticky).top) || 0;
    const height = sticky.getBoundingClientRect().height;
    // Tall text/zoom falls back to the complete vertical sequence.
    if (height > window.innerHeight - offset) { reset(); return; }
    travel = Math.max(0, track.scrollWidth - viewport.clientWidth);
    const geometry = journeyScrollGeometry(window.innerHeight, height, offset, stages.length);
    distance = geometry.distance;
    section.style.setProperty('--journey-height', `${geometry.sectionHeight}px`);
    start = section.getBoundingClientRect().top + window.scrollY - offset;
    enabled = true;
    last = -1;
    window.addEventListener('scroll', schedule, { passive: true });
    schedule();
  }
  links.forEach((link, index) => link.addEventListener('click', event => {
    if (!enabled || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    window.scrollTo({
      top: start + distance * index / (stages.length - 1),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  }));
  query.addEventListener('change', measure);
  window.addEventListener('resize', measure, { passive: true });
  document.fonts?.ready.then(measure);
  measure();
}
