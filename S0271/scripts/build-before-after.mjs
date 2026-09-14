import { readFile, writeFile } from 'node:fs/promises';
import { beforeAfter } from '../src/js/data/content.js';
import { sectionMedia } from '../src/js/data/media.js';
const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const asset = url => {
  const path = new URL(url).pathname;
  const offset = path.lastIndexOf('/asset/');
  if (offset < 0) throw new Error('Invalid asset');
  return escape(`..${path.slice(offset)}`);
};
const video = sectionMedia.beforeAfter.video;
const markup = `
      <section class="before-after container" id="${beforeAfter.id}" aria-labelledby="before-after-title">
        <header class="before-after-heading">
          <div>
            <p class="before-after-eyebrow">S0271 / ĐỐI CHIẾU TRƯỚC–SAU</p>
            <h2 id="before-after-title">${escape(beforeAfter.title)}</h2>
          </div>
          <p class="before-after-condition">${escape(beforeAfter.description)}</p>
        </header>
        <figure class="before-after-evidence">
          <div class="before-after-labels" aria-hidden="true">
            <span>${escape(beforeAfter.beforeLabel)}</span>
            <span>${escape(beforeAfter.afterLabel)}</span>
          </div>
          <video class="before-after-video" controls muted playsinline preload="none" data-poster="${asset(video.poster.webp)}" aria-label="${escape(beforeAfter.title)}" aria-describedby="before-after-caption before-after-hint" data-lazy-video>
            <source data-src="${asset(video.optimized.mp4)}" type="video/mp4">
            <source data-src="${asset(video.optimized.webm)}" type="video/webm">
            <a href="${asset(video.optimized.mp4)}">${escape(beforeAfter.fallbackLabel)}</a>
          </video>
          <figcaption id="before-after-caption">${escape(beforeAfter.caption)}</figcaption>
        </figure>
        <div class="before-after-help">
          <p id="before-after-hint">${escape(beforeAfter.controlHint)}</p>
          <a href="${asset(video.optimized.mp4)}">${escape(beforeAfter.fallbackLabel)}</a>
        </div>
      </section>
      `;
const target = new URL('../src/index.html', import.meta.url);
const html = await readFile(target, 'utf8');
const marker = /(?<=<!-- before-after:start -->)[\s\S]*?(?=<!-- before-after:end -->)/;
if (!marker.test(html)) throw new Error('Before-after markers missing');
const next = html.replace(marker, markup);
if (process.argv.includes('--check')) {
  if (html !== next) throw new Error('Before-after markup is stale');
  console.log('Before-after markup matches data.');
} else { await writeFile(target, next, 'utf8'); console.log('Before-after generated.'); }
