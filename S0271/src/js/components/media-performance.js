export function loadVideoSources(video) {
  if (video.dataset.sourcesLoaded === 'true') return false;
  const sources = [...video.querySelectorAll('source[data-src]')];
  if (!sources.length) return false;
  if (video.dataset.poster && !video.poster) video.poster = video.dataset.poster;
  sources.forEach(source => {
    source.src = source.dataset.src;
    source.removeAttribute('data-src');
  });
  video.dataset.sourcesLoaded = 'true';
  video.load();
  return true;
}

export function initMediaPerformance() {
  const videos = [...document.querySelectorAll('[data-lazy-video]')];
  if (!videos.length) return;
  if (!('IntersectionObserver' in window)) {
    videos.forEach(loadVideoSources);
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      loadVideoSources(entry.target);
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '300px 0px' });
  videos.forEach(video => {
    observer.observe(video);
    video.addEventListener('pointerdown', () => loadVideoSources(video), { once: true });
    video.addEventListener('focus', () => loadVideoSources(video), { once: true });
  });
}
