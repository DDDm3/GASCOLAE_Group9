import { cta } from '../data/content.js';
import { loadVideoSources } from './media-performance.js';

export function initContact() {
  const section = document.querySelector('[data-contact]');
  if (!section) return;
  const more = section.querySelector('[data-contact-more]');
  const extra = section.querySelector('#contact-extra-fields');
  const status = section.querySelector('[data-contact-status]');
  const submit = section.querySelector('[data-contact-submit]');
  const video = section.querySelector('[data-contact-video]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  more.addEventListener('click', () => {
    const expanded = more.getAttribute('aria-expanded') === 'true';
    more.setAttribute('aria-expanded', String(!expanded));
    more.firstChild.textContent = `${expanded ? cta.moreFieldsLabel : cta.lessFieldsLabel} `;
    extra.hidden = expanded;
    if (expanded) more.focus();
  });

  submit.addEventListener('click', () => {
    status.textContent = cta.unavailableMessage;
  });

  if (!video || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting || reducedMotion.matches) {
      video.pause();
      return;
    }
    loadVideoSources(video);
    video.play().catch(() => {});
  }, { threshold: 0.35 });
  observer.observe(video);
  reducedMotion.addEventListener('change', event => {
    if (event.matches) video.pause();
    else if (video.getBoundingClientRect().top < window.innerHeight) {
      loadVideoSources(video);
      video.play().catch(() => {});
    }
  });
}
