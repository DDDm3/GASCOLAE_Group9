import { readFile, writeFile } from 'node:fs/promises';
import { faqs } from '../src/js/data/content.js';

const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const markup = `
      <section class="faq container" id="faq" aria-labelledby="faq-title">
        <header class="faq-heading">
          <p class="faq-eyebrow">S0271 / CÂU HỎI THƯỜNG GẶP</p>
          <h2 id="faq-title">Làm rõ trước khi khảo sát</h2>
        </header>
        <div class="faq-wall">
${faqs.map((faq, index) => `          <details class="faq-question faq-question--${index + 1}" id="faq-${faq.id}">
            <summary id="faq-question-${faq.id}" aria-controls="faq-answer-${faq.id}">
              <span class="faq-number" aria-hidden="true">0${index + 1}</span>
              <span class="faq-question-text">${escape(faq.question)}</span>
              <span class="faq-toggle" aria-hidden="true"></span>
            </summary>
            <div class="faq-answer" id="faq-answer-${faq.id}" role="region" aria-labelledby="faq-question-${faq.id}">
              <p>${escape(faq.answer)}</p>
            </div>
          </details>`).join('\n')}
        </div>
      </section>
      `;
const target = new URL('../src/index.html', import.meta.url);
const html = await readFile(target, 'utf8');
const marker = /(?<=<!-- faq:start -->)[\s\S]*?(?=<!-- faq:end -->)/;
if (!marker.test(html)) throw new Error('FAQ markers missing');
const next = html.replace(marker, markup);
if (process.argv.includes('--check')) {
  if (html !== next) throw new Error('FAQ markup is stale');
  console.log('FAQ markup matches data.');
} else { await writeFile(target, next, 'utf8'); console.log('FAQ generated.'); }
