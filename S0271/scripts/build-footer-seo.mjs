import { readFile, writeFile } from 'node:fs/promises';
import { seo, service } from '../src/js/data/content.js';

const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const seoMarkup = `
    <title>${escape(seo.title)}</title>
    <meta name="description" content="${escape(seo.description)}">
    <meta name="robots" content="index, follow">
    <meta property="og:locale" content="vi_VN">
    <meta property="og:type" content="website">
    <meta property="og:title" content="${escape(seo.title)}">
    <meta property="og:description" content="${escape(seo.description)}">
    <meta name="twitter:card" content="summary_large_image">
    `;
const footerMarkup = `
    <footer class="site-footer">
      <div class="footer-inner container">
        <a class="footer-brand" href="#hero" aria-label="GASCOLAE — Trở về đầu trang">
          <span class="footer-brand-mark" aria-hidden="true"><img src="../asset/logo/LOGO_no-bg.png" alt="GASCOLAE" width="1046" height="300" loading="lazy" decoding="async"></span>
          <span class="footer-brand-name">GASCOLAE</span>
        </a>
        <p class="footer-service"><span>Service ID</span><strong>${escape(service.id)}</strong></p>
        <nav class="footer-navigation" aria-label="Điều hướng cuối trang">
          <a href="#overview">Giải pháp</a>
          <a href="#journey">Cách hoạt động</a>
          <a href="#service-levels">Gói dịch vụ</a>
          <a href="#deliverables">Đầu ra</a>
          <a href="#faq">FAQ</a>
          <a href="#contact">Liên hệ</a>
        </nav>
        <p class="footer-note">Đo hiệu quả giảm phát thải CO₂ bằng UAV tại bãi chôn lấp.</p>
      </div>
    </footer>
    `;

const target = new URL('../src/index.html', import.meta.url);
const html = await readFile(target, 'utf8');
const seoMarker = /(?<=<!-- seo:start -->)[\s\S]*?(?=<!-- seo:end -->)/;
const footerMarker = /(?<=<!-- footer:start -->)[\s\S]*?(?=<!-- footer:end -->)/;
if (!seoMarker.test(html) || !footerMarker.test(html)) throw new Error('SEO or footer markers missing');
const next = html.replace(seoMarker, seoMarkup).replace(footerMarker, footerMarkup);
if (process.argv.includes('--check')) {
  if (next !== html) throw new Error('Footer/SEO markup is stale');
  console.log('Footer and SEO markup match data.');
} else {
  await writeFile(target, next, 'utf8');
  console.log('Footer and SEO generated.');
}
