import { readFile, writeFile } from 'node:fs/promises';
import { technologyNodes } from '../src/js/data/content.js';
import { sectionMedia } from '../src/js/data/media.js';

const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const asset = url => {
  const path = new URL(url).pathname;
  const offset = path.lastIndexOf('/asset/');
  if (offset < 0) throw new Error(`Not a service asset: ${url}`);
  return escape(`..${path.slice(offset)}`);
};
const image = sectionMedia.technology.image;
const markup = `
      <section class="technology" id="overview" aria-labelledby="technology-title" data-technology>
        <div class="container">
          <header class="technology-heading">
            <p class="technology-eyebrow">S0271 / CÔNG NGHỆ</p>
            <h2 id="technology-title">Từ dữ liệu đo đến bản đồ</h2>
          </header>
          <div class="technology-layout">
            <div class="technology-radial">
              <figure class="technology-visual">
                <picture>
                  <source media="(max-width: 64rem)" srcset="${asset(image.mobile.webp)}" type="image/webp">
                  <source srcset="${asset(image.tablet.webp)} 1280w, ${asset(image.desktop.webp)} 1920w" sizes="(max-width: 64rem) 90vw, 35vw" type="image/webp">
                  <img src="${asset(image.desktop.fallback)}" alt="${escape(image.alt)}" width="1920" height="1080" loading="lazy" decoding="async">
                </picture>
                <figcaption>UAV / Hình ảnh minh họa</figcaption>
              </figure>
              <div class="technology-nodes" role="group" aria-label="Chọn công nghệ">
${technologyNodes.map(node => `                <a class="technology-node" href="#technology-${escape(node.id)}" data-node="${escape(node.id)}">${escape(node.label)}</a>`).join('\n')}
              </div>
            </div>
            <div class="technology-details" aria-live="polite" aria-atomic="true">
${technologyNodes.map(node => `              <article class="technology-detail" id="technology-${escape(node.id)}" aria-labelledby="technology-heading-${escape(node.id)}" data-panel="${escape(node.id)}">
                <p class="technology-label">${escape(node.label)}</p>
                <h3 id="technology-heading-${escape(node.id)}">${escape(node.title)}</h3>
                <p class="technology-description">${escape(node.description)}</p>
${node.qualification ? `                <p class="technology-qualification">${escape(node.qualification)}</p>` : ''}
              </article>`).join('\n')}
            </div>
          </div>
        </div>
      </section>
      `;
const target = new URL('../src/index.html', import.meta.url);
const html = await readFile(target, 'utf8');
const marker = /(?<=<!-- technology:start -->)[\s\S]*?(?=<!-- technology:end -->)/;
if (!marker.test(html)) throw new Error('Technology markers are missing.');
const next = html.replace(marker, markup);
if (process.argv.includes('--check')) {
  if (next !== html) throw new Error('Technology markup is stale; run build-technology.mjs.');
  console.log('Technology markup matches content and media data.');
} else {
  await writeFile(target, next, 'utf8');
  console.log('Technology pre-rendered into src/index.html.');
}
