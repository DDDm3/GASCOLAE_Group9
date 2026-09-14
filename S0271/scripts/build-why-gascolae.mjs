import { readFile, writeFile } from 'node:fs/promises';
import { whyGascolae } from '../src/js/data/content.js';
const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const markup = `
      <section class="why-gascolae container" id="why-gascolae" aria-labelledby="why-gascolae-title">
        <header class="why-heading">
          <p class="why-eyebrow">S0271 / GASCOLAE</p>
          <h2 id="why-gascolae-title">Vì sao GASCOLAE?</h2>
        </header>
        <div class="why-architecture">
          <div class="why-words" aria-hidden="true">
            <span>DETECT</span>
            <span>LOCATE</span>
            <span>VERIFY</span>
            <span>TRACE</span>
          </div>
          <div class="why-principles">
${whyGascolae.map(item => `            <article class="why-principle" id="why-${item.id}">
              <h3>${escape(item.title)}</h3>
              <p>${escape(item.description)}</p>
${item.condition ? `              <p class="why-condition">${escape(item.condition)}</p>` : ''}
            </article>`).join('\n')}
          </div>
        </div>
      </section>
      `;
const target = new URL('../src/index.html', import.meta.url);
const html = await readFile(target, 'utf8');
const marker = /(?<=<!-- why-gascolae:start -->)[\s\S]*?(?=<!-- why-gascolae:end -->)/;
if (!marker.test(html)) throw new Error('Why GASCOLAE markers missing');
const next = html.replace(marker, markup);
if (process.argv.includes('--check')) {
  if (html !== next) throw new Error('Why GASCOLAE markup is stale');
  console.log('Why GASCOLAE markup matches data.');
} else { await writeFile(target, next, 'utf8'); console.log('Why GASCOLAE generated.'); }
