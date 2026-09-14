import { readFile, writeFile } from 'node:fs/promises';
import { serviceLandscapes } from '../src/js/data/content.js';
import { sectionMedia } from '../src/js/data/media.js';
const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const asset = url => {
  const path = new URL(url).pathname;
  const offset = path.lastIndexOf('/asset/');
  if (offset < 0) throw new Error('Invalid asset');
  return escape(`..${path.slice(offset)}`);
};
const markup = `
      <section class="service-levels" id="service-levels" aria-labelledby="service-levels-title">
        <header class="service-levels-heading container">
          <p class="service-levels-eyebrow">S0271 / PHẠM VI DỊCH VỤ</p>
          <h2 id="service-levels-title">Ba cấp độ khảo sát</h2>
        </header>
${serviceLandscapes.map((level, index) => {
  const image = sectionMedia.serviceLevels[level.id];
  return `        <article class="level-landscape level-landscape--${index + 1}" id="${level.id}" aria-labelledby="${level.id}-title">
          <picture class="level-landscape-image">
            <source media="(max-width: 48rem)" srcset="${asset(image.mobile.avif)}" type="image/avif">
            <source media="(max-width: 48rem)" srcset="${asset(image.mobile.webp)}" type="image/webp">
            <source srcset="${asset(image.desktop.avif)}" type="image/avif">
            <source srcset="${asset(image.tablet.webp)} 1280w, ${asset(image.desktop.webp)} 1920w" sizes="100vw" type="image/webp">
            <img src="${asset(image.desktop.fallback)}" alt="${escape(image.alt)}" width="1920" height="1080" loading="lazy" decoding="async">
          </picture>
          <div class="level-landscape-inner container">
            <div class="level-landscape-copy">
              <p class="level-landscape-label">${escape(level.label)} <span aria-hidden="true">/</span> ${escape(level.landscapeLabel)}</p>
              <h3 id="${level.id}-title">${escape(level.name)}</h3>
              <p class="level-positioning">${escape(level.positioning)}</p>
              <p class="level-description">${escape(level.description)}</p>
${level.condition ? `              <p class="level-condition">${escape(level.condition)}</p>` : ''}
${level.limitation ? `              <p class="level-limitation">${escape(level.limitation)}</p>` : ''}
              <a class="level-contact" href="${escape(level.cta.href)}" aria-label="${escape(level.cta.label)} — ${escape(level.label)}">${escape(level.cta.label)} <span aria-hidden="true">↗</span></a>
            </div>
            <p class="level-image-caption">Hình ảnh minh họa</p>
          </div>
        </article>`;
}).join('\n')}
      </section>
      `;
const target = new URL('../src/index.html', import.meta.url);
const html = await readFile(target, 'utf8');
const marker = /(?<=<!-- service-levels:start -->)[\s\S]*?(?=<!-- service-levels:end -->)/;
if (!marker.test(html)) throw new Error('Service-levels markers missing');
const next = html.replace(marker, markup);
if (process.argv.includes('--check')) {
  if (html !== next) throw new Error('Service-levels markup is stale');
  console.log('Service-levels markup matches data.');
} else { await writeFile(target, next, 'utf8'); console.log('Service-levels generated.'); }
