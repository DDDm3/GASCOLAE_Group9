// Pre-render just the Hero so source copy stays centralized and works without JS.
// Run from any directory: node S0271/scripts/build-hero.mjs
import { readFile, writeFile } from 'node:fs/promises';
import { hero, service } from '../src/js/data/content.js';
import { sectionMedia } from '../src/js/data/media.js';

const escape = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const asset = (url) => {
  const path = new URL(url).pathname;
  const offset = path.lastIndexOf('/asset/');
  if (offset < 0) throw new Error(`Not a service asset: ${url}`);
  return escape(`..${path.slice(offset)}`);
};
const { image, video } = sectionMedia.hero;
const markup = `
      <section class="hero" id="${escape(hero.id)}" aria-labelledby="hero-title" data-hero>
        <div class="hero-content container" data-hero-content>
        <div class="hero-heading">
          <p class="hero-eyebrow"><span class="hero-marker" aria-hidden="true"></span>${escape(service.brand)} <span aria-hidden="true">/</span> ${escape(service.id)}</p>
          <h1 id="hero-title">${escape(hero.headline)}</h1>
        </div>
        <div class="hero-copy">
          <p class="hero-description">${escape(hero.description)}</p>
          <div class="hero-actions">
            <a class="hero-primary" href="${escape(hero.primaryCta.href)}">${escape(hero.primaryCta.label)} <span aria-hidden="true">↗</span></a>
            <a class="hero-secondary" href="${escape(hero.secondaryCta.href)}">${escape(hero.secondaryCta.label)} <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        </div>
        <figure class="hero-media">
          <div class="hero-media-frame">
            <picture data-hero-picture>
              <source srcset="${asset(image.desktop.avif)}" type="image/avif">
              <source srcset="${asset(image.tablet.webp)} 1280w, ${asset(image.desktop.webp)} 1920w" sizes="100vw" type="image/webp">
              <img src="${asset(image.desktop.fallback)}" alt="${escape(image.alt)}" width="1920" height="1080" loading="eager" fetchpriority="high" decoding="async">
            </picture>
            <video id="hero-video" data-hero-video tabindex="0" muted playsinline controls preload="none" data-poster="${asset(video.poster.webp)}" aria-label="${escape(video.description)}" hidden>
              <source data-src="${asset(video.mobile.mp4)}" media="(max-width: 48rem)" type="video/mp4">
              <source data-src="${asset(video.optimized.mp4)}" type="video/mp4">
            </video>
          </div>
          <figcaption class="hero-media-footer container">
          <span class="hero-caption"><span>${escape(hero.mediaCaption)}</span><span aria-hidden="true">CH₄ / UAV</span></span>
            <a class="hero-play" href="${asset(video.optimized.mp4)}" aria-controls="hero-video" data-hero-play><span aria-hidden="true">&#9655;</span> ${escape(hero.playLabel)}</a>
          <button class="hero-close-video" type="button" data-hero-close hidden>${escape(hero.closeVideoLabel)}</button>
          <p class="hero-video-status" role="status" data-hero-status></p>
          <a class="hero-video-direct" href="${asset(video.optimized.mp4)}" data-hero-direct hidden>${escape(hero.directVideoLabel)}</a>
          </figcaption>
        </figure>
      </section>
      `;

const target = new URL('../src/index.html', import.meta.url);
const html = await readFile(target, 'utf8');
const marker = /(?<=<!-- hero:start -->)[\s\S]*?(?=<!-- hero:end -->)/;
if (!marker.test(html)) throw new Error('Hero markers are missing.');
const next = html.replace(marker, markup);
if (process.argv.includes('--check')) {
  if (next !== html) throw new Error('Hero markup is stale; run build-hero.mjs.');
  console.log('Hero markup matches content and media data.');
} else {
  await writeFile(target, next, 'utf8');
  console.log('Hero pre-rendered into src/index.html.');
}
