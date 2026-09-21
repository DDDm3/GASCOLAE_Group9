import test, { after, before } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access, readdir, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import vm from 'node:vm';
import { server } from '../scripts/serve.mjs';
import { content } from '../src/content.mjs';
import { agentConfig } from '../src/agent-config.mjs';
import { serviceSchema } from '../src/seo.mjs';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const html = await readFile(path.join(dist, 'index.html'), 'utf8');
const js = await readFile(path.join(dist, 'app.js'), 'utf8');
const css = await readFile(path.join(dist, 'styles.css'), 'utf8');
let origin;
before(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  origin = `http://127.0.0.1:${server.address().port}`;
});
after(() => new Promise(resolve => server.close(resolve)));

test('every anchor resolves and every local media resource exists', async () => {
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  assert.equal(ids.length, new Set(ids).size, 'duplicate IDs');
  for (const [, href] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(href), href);
  for (const [, file] of html.matchAll(/(?:src|href)="\.\/([^"]+)"/g)) await access(path.join(dist, file));
  for (const [, file] of html.matchAll(/\.\/(media\/[^ ,"]+) \d+w/g)) await access(path.join(dist, file));
});

test('semantic baseline: Vietnamese, one H1, labeled inputs, images, native FAQ', () => {
  assert.match(html, /<html lang="vi">/);
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1);
  assert.equal([...html.matchAll(/<details>/g)].length, content.faq.length);
  for (const [, tag] of html.matchAll(/<(input\b[^>]*|select\b[^>]*)>/g)) {
    const id = tag.match(/id="([^"]+)"/)[1];
    assert.ok(html.includes(`for="${id}"`), id);
  }
  for (const [, tag] of html.matchAll(/<(img\b[^>]*)>/g)) {
    assert.match(tag, /alt="[^"]*"/);
    assert.match(tag, /width="\d+"/);
    assert.match(tag, /height="\d+"/);
  }
  assert.match(html, /aria-live="polite"/);
  assert.match(html, /class="skip"/);
});

test('public distribution excludes source assets, pricing, claims and third-party traffic', async () => {
  const files = await readdir(dist, { recursive: true });
  assert.ok(!files.some(f => /\.(docx|pptx|xlsx|xlsm|txt)$/i.test(f)));
  assert.doesNotMatch(html, /(?:\d[.,]){2}\d{3}|VNĐ|USD|DJI|Specim|S0069|margin|retention/i);
  assert.doesNotMatch(html.replace('https://schema.org', ''), /https?:\/\//);
  assert.doesNotMatch(js, /fetch\(|XMLHttpRequest|sendBeacon|localStorage|sessionStorage|console\.log/);
  assert.doesNotMatch(html, /<textarea|type="file"/);
  assert.match(html, /CHƯA KẾT NỐI AI/);
  assert.match(html, /HSI và dữ liệu tham chiếu phù hợp/);
  assert.match(html, /Không cam kết 100% phát hiện/);
  assert.match(html, /noindex, nofollow/);
});

test('final public-copy guardrails preserve conditional claims and contact-based pricing', () => {
  assert.doesNotMatch(html, /DJI|Mavic|Matrice|Specim|Headwall|testimonial|customer logo|chứng nhận|certification/i);
  assert.doesNotMatch(html, /\b(?:precision|recall|accuracy)\s*[:=]?\s*\d|\b(?:VNĐ|VND|USD)\b/i);
  assert.match(html, /Phân tích vật liệu ứng viên chỉ áp dụng khi có HSI và dữ liệu tham chiếu phù hợp/);
  assert.match(html, /AI hỗ trợ sàng lọc\. Chuyên gia rà soát/);
  assert.match(html, /Giá, thời gian bàn giao và SLA cần được GASCOLAE xác nhận theo từng dự án/);
  assert.doesNotMatch(html, /Most Popular|Phổ biến nhất/i);
});

test('HTTP serves the page and rejects source paths, traversal and form POST', async () => {
  const response = await fetch(origin);
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-security-policy'), /form-action 'none'/);
  assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
  for (const route of ['/docs/14_S0070_07_Service_Pricing.xlsx', '/src/content.mjs', '/package.json', '/../src/content.mjs', '/%2e%2e%5cdocs/a.xlsx', '/media/brand.png:secret', '/assets/videos/']) {
    assert.equal((await fetch(origin + route)).status, 404, route);
  }
  assert.equal((await fetch(origin, { method: 'POST', body: 'test' })).status, 405);
  const head = await fetch(origin + '/styles.css', { method: 'HEAD' });
  assert.equal(head.status, 200);
  assert.equal(await head.text(), '');
});

test('all served resources succeed with appropriate content types', async () => {
  for (const [, file] of html.matchAll(/(?:src|href)="\.\/([^"]+)"/g)) {
    const response = await fetch(`${origin}/${file}`);
    assert.equal(response.status, 200, file);
    assert.ok(response.headers.get('content-type'), file);
  }
});

test('SEO metadata and structured service data contain only supported public properties', () => {
  assert.ok(html.includes(`<title>${content.meta.title.replaceAll('&', '&amp;')}</title>`));
  assert.ok(html.includes(`name="description" content="${content.meta.description}"`));
  assert.equal(serviceSchema['@type'], 'Service');
  assert.deepEqual(Object.keys(serviceSchema), ['@context', '@type', 'name', 'serviceType', 'description']);
  for (const unsupported of ['aggregateRating', 'review', 'offers', 'priceRange', 'address']) {
    assert.equal(Object.hasOwn(serviceSchema, unsupported), false, unsupported);
  }
  assert.match(html, /<script type="application\/ld\+json">/);
});

test('preview server provides revalidation, Brotli and restrictive security headers', async () => {
  const first = await fetch(origin, { headers: { 'Accept-Encoding': 'br' } });
  assert.equal(first.headers.get('cache-control'), 'no-cache');
  assert.ok(first.headers.get('etag'));
  assert.equal(first.headers.get('content-encoding'), 'br');
  assert.equal(first.headers.get('permissions-policy'), 'camera=(), microphone=(), geolocation=()');
  assert.equal(first.headers.get('cross-origin-opener-policy'), 'same-origin');
  const cached = await fetch(origin, { headers: { 'If-None-Match': first.headers.get('etag') } });
  assert.equal(cached.status, 304);
  const asset = await fetch(origin + '/styles.css');
  assert.equal(asset.headers.get('cache-control'), 'public, max-age=3600');
});

test('public media stays bounded and uses optimized responsive formats', async () => {
  const optimized = [
    'spectral-cube-640.webp', 'spectral-cube.webp', 'service-workflow.webp',
    'uav-sensor-640.webp', 'uav-sensor.webp',
    'spectral-site-overview-640.webp', 'spectral-site-overview.webp',
    'uav-monitoring-640.webp', 'uav-monitoring.webp'
  ];
  for (const file of optimized) {
    assert.ok((await stat(path.join(dist, 'media', file))).size < 100_000, file);
  }
  assert.match(html, /srcset="\.\/media\/spectral-cube-640\.webp 640w, \.\/media\/spectral-cube\.webp 1024w"/);
  assert.match(html, /service-workflow\.webp[^>]*loading="lazy"[^>]*decoding="async"/);
  assert.match(html, /brand-mark\.png/);
  assert.doesNotMatch(html, /media\/brand\.png/);
  for (const stem of ['uav-sensor', 'spectral-site-overview', 'uav-monitoring']) {
    assert.match(html, new RegExp(`${stem}-640\\.webp 640w, \\.\\/media\\/${stem}\\.webp 1024w`));
  }
  assert.equal([...html.matchAll(/class="section-media /g)].length, 3);
  assert.equal([...html.matchAll(/<figcaption>Hình minh họa/g)].length, 3);
  assert.ok(!((await readdir(dist, { recursive: true })).some(file => /Gemini|\.html\.files|gtm|unnamed/i.test(file))));
  assert.doesNotMatch(js, /fetch\(|XMLHttpRequest|sendBeacon|localStorage|sessionStorage/);
});

// A minimal event harness exercises our JS logic, not browser layout/native validity.
function domHarness() {
  let focused;
  const nodes = new Map();
  function node(id) {
    const attrs = new Map();
    const classes = new Set();
    const n = { id, value: '', textContent: '', hidden: true, type: 'text', validity: {}, dataset: {},
      handlers: {}, setAttribute: (k, v) => attrs.set(k, v), getAttribute: k => attrs.get(k), removeAttribute: k => attrs.delete(k),
      addEventListener(k, fn) { this.handlers[k] = fn; }, focus() { focused = id; },
      classList: { add: k => classes.add(k), remove: k => classes.delete(k), toggle: (k, on) => on ? classes.add(k) : classes.delete(k), contains: k => classes.has(k) },
      querySelectorAll: () => [] };
    nodes.set(id, n); return n;
  }
  const fields = ['name', 'organization', 'email'].map(node);
  fields.forEach(f => node(`${f.id}-error`));
  fields[2].type = 'email';
  const form = node('lead-form'); form.querySelectorAll = () => fields;
  const menu = node('menu'); menu.setAttribute('aria-expanded', 'false');
  const nav = node('navigation');
  const status = node('form-status'); const button = node('review-lead');
  const level = node('level'); const levelLink = node('level-link'); levelLink.dataset.level = '2';
  const faqSummary = node('faq-summary'); const faqDetails = node('faq-details'); faqDetails.open = false;
  faqDetails.querySelector = selector => selector === 'summary' ? faqSummary : undefined;
  const document = { documentElement: node('html'), addEventListener() {}, createElement: () => node('created-source'),
    querySelector: selector => selector === '.menu-toggle' ? menu : nodes.get(selector.slice(1)),
    querySelectorAll: selector => selector === '[data-level]' ? [levelLink] : selector === 'details' ? [faqDetails] : [] };
  vm.runInNewContext(js, { document, window: { matchMedia: () => ({ matches: false, addEventListener() {} }) } });
  return { fields, form, menu, nav, status, button, level, levelLink, faqDetails, faqSummary, nodes, focus: () => focused };
}

test('form validates errors, focuses first error, never reports a sent request, and clears errors', () => {
  const h = domHarness(); const event = { preventDefault() {} };
  h.button.handlers.click(event);
  assert.equal(h.focus(), 'name');
  assert.equal(h.fields[0].getAttribute('aria-invalid'), 'true');
  h.fields.forEach((f, i) => { f.value = ['Người thử', 'Đơn vị thử', 'qa@example.test'][i]; });
  h.fields[2].validity.typeMismatch = true;
  h.form.handlers.submit(event);
  assert.equal(h.focus(), 'email');
  h.fields[2].validity.typeMismatch = false;
  h.fields[0].value = '<script>';
  h.button.handlers.click(event);
  assert.equal(h.focus(), 'name');
  h.fields[0].value = 'Người thử';
  h.button.handlers.click(event);
  assert.match(h.status.textContent, /Chưa gửi yêu cầu/);
  h.fields[0].value = '  Người thử  ';
  h.button.handlers.click(event);
  assert.equal(h.fields[0].value, 'Người thử');
  h.form.handlers.reset();
  assert.match(h.status.textContent, /Đã xóa/);
  h.fields.forEach(f => assert.equal(f.getAttribute('aria-invalid'), undefined));
});

test('mobile menu toggles its accessible state and level CTA selects the matching level', () => {
  const h = domHarness();
  h.menu.handlers.click();
  assert.equal(h.menu.getAttribute('aria-expanded'), 'true');
  assert.ok(h.nav.classList.contains('open'));
  h.menu.handlers.click();
  assert.equal(h.menu.getAttribute('aria-expanded'), 'false');
  h.levelLink.handlers.click();
  assert.equal(h.level.value, '2');
});

test('FAQ state and field errors expose assistive-technology announcements', () => {
  const h = domHarness();
  assert.equal(h.faqSummary.getAttribute('aria-expanded'), 'false');
  h.faqDetails.open = true;
  h.faqDetails.handlers.toggle();
  assert.equal(h.faqSummary.getAttribute('aria-expanded'), 'true');
  for (const id of ['name', 'organization', 'email']) {
    assert.match(html, new RegExp(`id="${id}-error"[^>]*role="status"[^>]*aria-live="polite"`));
  }
});

test('responsive and motion safeguards cover requested viewport classes', () => {
  for (const breakpoint of ['max-width:1200px', 'max-width:1050px', 'max-width:800px', 'max-width:600px', 'min-width:1700px']) {
    assert.ok(css.includes(breakpoint), breakpoint);
  }
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.match(js, /min-width: 801px.+prefers-reduced-motion: no-preference/);
  assert.match(js, /connection\?\.saveData/);
  assert.match(css, /overflow-x:clip/);
});

function luminance(hex) {
  const c = hex.match(/[a-f\d]{2}/gi).map(h => parseInt(h, 16) / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4);
  return c[0] * .2126 + c[1] * .7152 + c[2] * .0722;
}
test('key text/background pairs exceed WCAG AA normal-text contrast', () => {
  const pairs = [['102a32','f7fbfa'],['466069','edf4f2'],['f7fbfa','071a24'],['b0c7ca','071a24'],['071a24','23c7a5'],['086d5b','edf4f2'],['e6b35a','071a24'],['b0c7ca','0d2f3a']];
  for (const [a,b] of pairs) {
    const [light,dark] = [luminance(a),luminance(b)].sort((x,y) => y-x);
    const ratio = (light + .05) / (dark + .05);
    assert.ok(ratio >= 4.5, `${a}/${b}: ${ratio.toFixed(2)}`);
  }
});

test('design-system contract exposes semantic tokens and interaction states', () => {
  for (const token of [
    '--color-bg:', '--color-bg-subtle:', '--color-surface:', '--color-text:',
    '--color-text-muted:', '--color-border:', '--color-action:', '--color-focus:',
    '--color-warning:', '--data-primary:', '--text-h1:', '--space-12:',
    '--container-wide:', '--grid-gap:', '--shadow-offset:', '--motion-ease:'
  ]) assert.ok(css.includes(token), token);
  for (const state of [
    '.button:hover', '.button:active', '.button[aria-disabled="true"]',
    '.text-link:hover', 'input:hover', 'input:focus', 'input:disabled',
    '[aria-invalid="true"]', '@media (prefers-reduced-motion:reduce)',
    '@media (prefers-contrast:more)', '@media (forced-colors:active)'
  ]) assert.ok(css.includes(state), state);
  const hexValues = [...css.matchAll(/#[0-9a-f]{3,8}\b/gi)].map(match => match[0].toLowerCase());
  const allowed = new Set([
    '#071a24','#0d2f3a','#23c7a5','#e6b35a','#edf4f2','#c9e3de','#102a32','#f7fbfa',
    '#466069','#b0c7ca','#c9d9d6','#2b4650','#77959b','#086d5b','#091e25','#0a232d'
  ]);
  assert.deepEqual([...new Set(hexValues.filter(value => !allowed.has(value)))], []);
});

test('page implements the approved section architecture in order', () => {
  const anchors = ['dau-trang','noi-dung','tong-quan','loi-ich','cong-nghe','ung-dung','cap-do','quy-trinh','ket-qua','gioi-han','faq','tro-ly','lien-he'];
  let cursor = -1;
  for (const id of anchors) {
    const next = html.indexOf(`id="${id}"`);
    assert.ok(next > cursor, `${id} must appear in order`);
    cursor = next;
  }
  assert.equal([...html.matchAll(/class="level-card"/g)].length, 3);
  const workflow = html.match(/<ol class="workflow">([\s\S]*?)<\/ol>/)?.[1] || '';
  assert.equal([...workflow.matchAll(/<li>/g)].length, 5);
  assert.doesNotMatch(html, /Most Popular|Phổ biến nhất/i);
  assert.match(html, /class="deliverable-preview"/);
  assert.match(html, /class="trust-list"/);
  assert.match(html, /class="three-columns ruled"/);
});

test('agent preview shell matches approved public configuration without simulating chat', () => {
  assert.equal(agentConfig.agentId, 'AGENT_S0070');
  assert.equal(agentConfig.serviceId, 'S0070');
  assert.equal(agentConfig.displayName, 'S0070 Service Assistant');
  assert.equal(agentConfig.mode, 'preview');
  assert.equal(agentConfig.endpoint, null);
  assert.equal(agentConfig.suggestedQuestions.length, 4);
  assert.deepEqual(agentConfig.suggestedQuestions.map(item => item.intent), ['overview','levels','hsi','deployment']);
  assert.equal(agentConfig.handoff.label, 'Liên hệ chuyên gia / Trao đổi nhu cầu');
  assert.deepEqual(agentConfig.responseStatuses, ['answer','needs_verification','handoff','refused']);
  for (const marker of ['pricing', 'KPI', 'SLA', 'Internal', 'Restricted', 'coordinates', 'serviceId S0070']) {
    assert.match(agentConfig.guardrails.join(' '), new RegExp(marker, 'i'));
  }
  const shell = html.match(/<section class="section assistant-section[\s\S]*?<\/section>/)?.[0] || '';
  assert.match(shell, /data-agent-id="AGENT_S0070"/);
  assert.match(shell, /data-agent-mode="preview"/);
  assert.match(shell, /CHƯA KẾT NỐI AI/);
  assert.match(shell, /không tạo hoặc mô phỏng câu trả lời AI/i);
  assert.equal([...shell.matchAll(/data-intent=/g)].length, 4);
  assert.doesNotMatch(shell, /<input|<textarea|<form/);
});
