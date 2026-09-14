import { readFile, writeFile } from 'node:fs/promises';
import { cta } from '../src/js/data/content.js';
import { sectionMedia } from '../src/js/data/media.js';

const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const asset = url => {
  const path = new URL(url).pathname;
  const offset = path.lastIndexOf('/asset/');
  if (offset < 0) throw new Error(`Invalid asset: ${url}`);
  return escape(`..${path.slice(offset)}`);
};
const field = item => {
  const common = `id="contact-${escape(item.id)}" name="${escape(item.name)}"`;
  if (item.type === 'textarea') return `<textarea ${common} rows="4"></textarea>`;
  if (item.type === 'select') return `<select ${common}><option value="">Chưa xác định</option>${item.options.map(option => `<option value="${escape(option.value)}">${escape(option.label)}</option>`).join('')}</select>`;
  return `<input ${common} type="${escape(item.type)}"${item.autocomplete ? ` autocomplete="${escape(item.autocomplete)}"` : ''}>`;
};
const renderFields = items => items.map(item => `              <div class="contact-field contact-field--${escape(item.type)}">
                <label for="contact-${escape(item.id)}">${escape(item.label)}</label>
                ${field(item)}
              </div>`).join('\n');
const initialFields = cta.fields.slice(0, 5);
const extraFields = cta.fields.slice(5);
const video = sectionMedia.contact.video;
const markup = `
      <section class="contact-portal" id="${escape(cta.id)}" aria-labelledby="contact-title" data-contact>
        <div class="contact-media" aria-hidden="true">
          <video muted playsinline loop preload="none" data-poster="${asset(video.poster.webp)}" data-contact-video>
            <source data-src="${asset(video.optimized.webm)}" type="video/webm">
            <source data-src="${asset(video.optimized.mp4)}" type="video/mp4">
          </video>
          <div class="contact-media-overlay"></div>
        </div>
        <div class="contact-shell container">
          <header class="contact-heading">
            <p class="contact-eyebrow">S0271 / TƯ VẤN PHẠM VI</p>
            <h2 id="contact-title">${escape(cta.headline)}</h2>
            <p>${escape(cta.notice)}</p>
          </header>
          <form class="contact-form" aria-describedby="contact-demo-notice contact-routing" data-contact-form novalidate>
            <p class="contact-demo-notice" id="contact-demo-notice">${escape(cta.demoNotice)}</p>
            <div class="contact-fields">
${renderFields(initialFields)}
            </div>
            <button class="contact-more" type="button" aria-expanded="false" aria-controls="contact-extra-fields" data-contact-more>${escape(cta.moreFieldsLabel)} <span aria-hidden="true">+</span></button>
            <div class="contact-extra-fields contact-fields" id="contact-extra-fields" hidden>
${renderFields(extraFields)}
            </div>
            <div class="contact-submit-row">
              <button class="contact-submit" type="button" data-contact-submit>${escape(cta.buttonLabel)} <span aria-hidden="true">↗</span></button>
              <p class="contact-status" role="status" data-contact-status></p>
            </div>
            <p class="contact-routing" id="contact-routing">${escape(cta.routing)}</p>
          </form>
        </div>
      </section>
      `;
const target = new URL('../src/index.html', import.meta.url);
const html = await readFile(target, 'utf8');
const marker = /(?<=<!-- contact:start -->)[\s\S]*?(?=<!-- contact:end -->)/;
if (!marker.test(html)) throw new Error('Contact markers missing');
const next = html.replace(marker, markup);
if (process.argv.includes('--check')) {
  if (next !== html) throw new Error('Contact markup is stale');
  console.log('Contact markup matches data.');
} else {
  await writeFile(target, next, 'utf8');
  console.log('Contact generated.');
}
