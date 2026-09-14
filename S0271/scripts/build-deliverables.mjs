import { readFile, writeFile } from 'node:fs/promises';
import { deliverableSheets } from '../src/js/data/content.js';
import { sectionMedia } from '../src/js/data/media.js';
const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const asset = url => {
  const path = new URL(url).pathname;
  const offset = path.lastIndexOf('/asset/');
  if (offset < 0) throw new Error('Invalid asset');
  return escape(`..${path.slice(offset)}`);
};
const markup = `
      <section class="deliverables container" id="deliverables" aria-labelledby="deliverables-title">
        <header class="deliverables-heading">
          <p class="deliverables-eyebrow">S0271 / HỒ SƠ BÀN GIAO</p>
          <h2 id="deliverables-title">Từ dữ liệu đến hồ sơ có truy vết</h2>
        </header>
        <ol class="deliverables-stack" role="list">
${deliverableSheets.map((sheet, index) => {
  const mapped = sectionMedia.deliverables[sheet.mediaKey];
  const image = mapped.image ?? mapped.after;
  return `          <li class="deliverable-sheet" id="${sheet.id}" data-deliverable-sheet>
            <div class="sheet-meta"><span aria-hidden="true">0${index + 1} / S0271</span><span>${escape(sheet.levelLabel)}</span></div>
            <div class="sheet-layout">
              <div class="sheet-copy">
                <h3>${escape(sheet.title)}</h3>
                <p>${escape(sheet.description)}</p>
${sheet.condition ? `                <p class="sheet-condition">${escape(sheet.condition)}</p>` : ''}
              </div>
              <figure class="sheet-media">
                <picture>
                  <source media="(max-width: 48rem)" srcset="${asset(image.mobile.avif)}" type="image/avif">
                  <source media="(max-width: 48rem)" srcset="${asset(image.mobile.webp)}" type="image/webp">
                  <source srcset="${asset(image.desktop.avif)}" type="image/avif">
                  <source srcset="${asset(image.tablet.webp)} 1280w, ${asset(image.desktop.webp)} 1920w" sizes="(max-width: 48rem) 90vw, 45vw" type="image/webp">
                  <img src="${asset(image.desktop.fallback)}" alt="${escape(image.alt)}" width="1920" height="1080" loading="lazy" decoding="async">
                </picture>
                <figcaption>Hình ảnh minh họa · Không phải hồ sơ bàn giao thực tế</figcaption>
              </figure>
            </div>
          </li>`;
}).join('\n')}
        </ol>
      </section>
      `;
const target = new URL('../src/index.html', import.meta.url);
const html = await readFile(target, 'utf8');
const marker = /(?<=<!-- deliverables:start -->)[\s\S]*?(?=<!-- deliverables:end -->)/;
if (!marker.test(html)) throw new Error('Deliverables markers missing');
const next = html.replace(marker, markup);
if (process.argv.includes('--check')) {
  if (html !== next) throw new Error('Deliverables markup is stale');
  console.log('Deliverables markup matches data.');
} else { await writeFile(target, next, 'utf8'); console.log('Deliverables generated.'); }
