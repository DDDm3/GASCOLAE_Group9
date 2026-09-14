import { hero } from '../data/content.js';
import { sectionMedia } from '../data/media.js';

export function initHero() {
  const section = document.querySelector('[data-hero]');
  if (!section) return;
  const content = section.querySelector('[data-hero-content]');
  const picture = section.querySelector('[data-hero-picture]');
  const video = section.querySelector('[data-hero-video]');
  const play = section.querySelector('[data-hero-play]');
  const close = section.querySelector('[data-hero-close]');
  const status = section.querySelector('[data-hero-status]');
  const direct = section.querySelector('[data-hero-direct]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const overlayLayout = window.matchMedia('(min-width: 64.0625rem)');
  let requestId = 0;

  function syncContentState() {
    const suppress = section.classList.contains('is-video') && overlayLayout.matches;
    content.inert = suppress;
    if (suppress) content.setAttribute('aria-hidden', 'true');
    else content.removeAttribute('aria-hidden');
  }

  function showImage(restoreFocus = false) {
    requestId += 1;
    video.pause();
    video.hidden = true;
    picture.hidden = false;
    section.classList.remove('is-video');
    syncContentState();
    close.hidden = true;
    play.hidden = false;
    if (restoreFocus) play.focus();
  }

  play.hidden = false;
  play.addEventListener('click', async (event) => {
    // Preserve normal link behavior for opening the MP4 in another tab.
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const currentRequest = ++requestId;
    status.textContent = '';
    direct.hidden = true;
    const sources = sectionMedia.hero.video;
    const selected = window.matchMedia('(max-width: 48rem)').matches
      ? sources.mobile.mp4 : sources.optimized.mp4;
    direct.href = selected;
    if (video.dataset.poster && !video.poster) video.poster = video.dataset.poster;
    if (video.src !== selected) {
      video.src = selected;
      video.load();
    }
    video.muted = true;
    video.hidden = false;
    picture.hidden = true;
    play.hidden = true;
    close.hidden = false;
    section.classList.add('is-video');
    syncContentState();
    video.focus();
    try {
      await video.play();
    } catch {
      if (currentRequest !== requestId) return;
      showImage(true);
      status.textContent = hero.videoError;
      direct.hidden = false;
    }
  });
  close.addEventListener('click', () => showImage(true));
  section.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !video.hidden) {
      event.preventDefault();
      showImage(true);
    }
  });
  video.addEventListener('error', () => {
    if (video.hidden) return;
    showImage(true);
    status.textContent = hero.videoError;
    direct.hidden = false;
  });
  reducedMotion.addEventListener('change', event => {
    if (event.matches) {
      showImage(document.activeElement === video || document.activeElement === close);
    }
  });
  overlayLayout.addEventListener('change', syncContentState);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) video.pause();
  });
}
