import { readFile, writeFile } from 'node:fs/promises';
import { problems } from '../src/js/data/content.js';
import { sectionMedia } from '../src/js/data/media.js';

const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const asset = url => {
  const path = new URL(url).pathname;
  const offset = path.lastIndexOf('/asset/');
  if (offset < 0) throw new Error(`Not a service asset: ${url}`);
  return escape(`..${path.slice(offset)}`);
};
const image = sectionMedia.problems.image;
const picture = `
            <figure class="problem-image">
              <picture>
                <source media="(max-width: 48rem)" srcset="${asset(image.mobile.avif)}" type="image/avif">
                <source media="(max-width: 48rem)" srcset="${asset(image.mobile.webp)}" type="image/webp">
                <source srcset="${asset(image.desktop.avif)}" type="image/avif">
                <source srcset="${asset(image.tablet.webp)} 1280w, ${asset(image.desktop.webp)} 1920w" sizes="(max-width: 48rem) 100vw, 50vw" type="image/webp">
                <img src="${asset(image.desktop.fallback)}" alt="${escape(image.alt)}" width="1920" height="1080" loading="lazy" decoding="async">
              </picture>
              <figcaption>Hình ảnh minh họa</figcaption>
            </figure>`;
const markup = `
      <section class="problems container" id="problems" aria-labelledby="problems-title">
        <header class="problems-heading">
          <p class="problems-eyebrow">S0271 / BỐI CẢNH KHẢO SÁT</p>
          <h2 id="problems-title">Vấn đề tại hiện trường</h2>
        </header>
        <ol class="problems-grid" role="list">
${problems.map((problem, index) => `          <li class="problem problem--${index + 1}" id="${escape(problem.id)}">
            <div class="problem-text">
              <span class="problem-number" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>
              <h3>${escape(problem.title)}</h3>
              <p>${escape(problem.description)}</p>
            </div>${index === 0 ? picture : ''}
          </li>`).join('\n')}
        </ol>
      </section>
      `;
const target = new URL('../src/index.html', import.meta.url);
const html = await readFile(target, 'utf8');
const marker = /(?<=<!-- problems:start -->)[\s\S]*?(?=<!-- problems:end -->)/;
if (!marker.test(html)) throw new Error('Problems markers are missing.');
const next = html.replace(marker, markup);
if (process.argv.includes('--check')) {
  if (next !== html) throw new Error('Problems markup is stale; run build-problems.mjs.');
  console.log('Problems markup matches content and media data.');
} else {
  await writeFile(target, next, 'utf8');
  console.log('Problems pre-rendered into src/index.html.');
}
