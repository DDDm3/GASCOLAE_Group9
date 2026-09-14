import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { boundaries, cta, faqs, hero, serviceLevels } from '../src/js/data/content.js';

const html = await readFile(new URL('../src/index.html', import.meta.url), 'utf8');
const publicCopy = [
  hero.description,
  boundaries.quantification,
  boundaries.concentration,
  boundaries.serviceScope,
  ...serviceLevels.flatMap(level => [level.positioning, level.description, level.condition, level.limitation].filter(Boolean)),
  ...faqs.flatMap(item => [item.question, item.answer]),
].join(' ');

test('approved Hero and CTA wording remains exact', () => {
  assert.equal(hero.description, 'Lập bản đồ phát tán methane, định vị điểm phát thải cao và đo lặp trước–sau biện pháp khắc phục. Khi đủ điều kiện định lượng, kết quả CH₄ giảm được quy đổi sang CO₂e kèm dải bất định.');
  assert.deepEqual(hero.secondaryCta, { label: 'Tư vấn chọn gói dịch vụ', href: '#contact' });
  assert.equal(cta.buttonLabel, 'Đăng ký tư vấn khảo sát');
});

test('quantification boundaries remain explicit', () => {
  assert.match(boundaries.concentration, /^Không suy tCO₂e trực tiếp từ ppm\.$/);
  assert.match(boundaries.quantification, /chỉ được tính khi/);
  assert.match(boundaries.quantification, /dải bất định/);
  assert.equal(serviceLevels[0].quantification, 'excluded');
  assert.match(serviceLevels[0].description, /không tính flux hoặc tCO₂e/);
  assert.equal(serviceLevels[1].quantification, 'conditional');
  assert.equal(serviceLevels[2].quantification, 'conditional');
});

test('compliance and carbon-credit limitations remain explicit', () => {
  const method = faqs.find(item => item.id === 'method-21');
  const credits = faqs.find(item => item.id === 'carbon-credits');
  assert.match(method.answer, /^Không\./);
  assert.match(method.answer, /không thay/);
  assert.match(credits.answer, /^Không\./);
  assert.match(credits.answer, /không phải chứng thư xác minh/);
  assert.match(credits.answer, /không tự phát hành tín chỉ carbon/);
});

test('public copy has no unapproved numeric price, performance percentage or fabricated social proof', () => {
  assert.doesNotMatch(publicCopy, /(?:₫|VND|USD|\$)\s*\d|\d[\d.,]*\s*(?:₫|VND|USD)/i);
  assert.doesNotMatch(publicCopy, /\b\d+(?:[.,]\d+)?\s*%/);
  assert.doesNotMatch(html, /class="[^"]*(?:testimonial|client-logo|partner-logo)[^"]*"/i);
});
