import { readFile, writeFile } from 'node:fs/promises';
import { measurementJourney } from '../src/js/data/content.js';
import { sectionMedia } from '../src/js/data/media.js';
const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const asset = url => {
  const path = new URL(url).pathname;
  const offset = path.lastIndexOf('/asset/');
  if (offset < 0) throw new Error('Invalid asset');
  return escape(`..${path.slice(offset)}`);
};
const markup = `
      <section class="journey" id="journey" aria-labelledby="journey-title" data-journey>
        <div class="journey-sticky">
          <header class="journey-heading container">
            <p class="journey-eyebrow">S0271 / HÀNH TRÌNH ĐO LƯỜNG</p>
            <h2 id="journey-title">Từ phát hiện đến báo cáo</h2>
            <nav class="journey-navigation" aria-label="Các giai đoạn đo lường">
${measurementJourney.map(stage => `              <a href="#journey-${stage.id}" data-journey-link="${stage.id}">${escape(stage.label)}</a>`).join('\n')}
            </nav>
          </header>
          <div class="journey-window">
            <ol class="journey-track" role="list">
${measurementJourney.map((stage, index) => {
  const image = sectionMedia.journey.stages[stage.id];
  return `              <li class="journey-stage journey-stage--${stage.id}" id="journey-${stage.id}">
                <div class="journey-stage-inner container">
                  <div class="journey-copy">
                    <p class="journey-label"><span aria-hidden="true">0${index + 1} / </span>${escape(stage.label)}</p>
                    <h3>${escape(stage.title)}</h3>
                    <p class="journey-description">${escape(stage.description)}</p>
${stage.qualification ? `                    <p class="journey-qualification">${escape(stage.qualification)}</p>` : ''}
                  </div>
                  <figure class="journey-media">
                    <picture>
${image.mobile.avif ? `                      <source media="(max-width: 64rem)" srcset="${asset(image.mobile.avif)}" type="image/avif">` : ''}
                      <source media="(max-width: 64rem)" srcset="${asset(image.mobile.webp)}" type="image/webp">
${image.desktop.avif ? `                      <source srcset="${asset(image.desktop.avif)}" type="image/avif">` : ''}
                      <source srcset="${asset(image.tablet.webp)} 1280w, ${asset(image.desktop.webp)} 1920w" sizes="(max-width: 64rem) 100vw, 48vw" type="image/webp">
                      <img src="${asset(image.desktop.fallback)}" alt="${escape(image.alt)}" width="1920" height="1080" loading="lazy" decoding="async">
                    </picture>
                    <figcaption>Hình ảnh minh họa</figcaption>
                  </figure>
                </div>
              </li>`;
}).join('\n')}
            </ol>
          </div>
        </div>
      </section>
      `;
const target = new URL('../src/index.html', import.meta.url);
const html = await readFile(target, 'utf8');
const marker = /(?<=<!-- journey:start -->)[\s\S]*?(?=<!-- journey:end -->)/;
if (!marker.test(html)) throw new Error('Journey markers missing');
const next = html.replace(marker, markup);
if (process.argv.includes('--check')) {
  if (html !== next) throw new Error('Journey markup is stale');
  console.log('Journey markup matches data.');
} else { await writeFile(target, next, 'utf8'); console.log('Journey generated.'); }
