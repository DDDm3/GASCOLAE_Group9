import { mkdir, writeFile, copyFile, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { content as c, media } from '../src/content.mjs';
import { articleList, arrow, buttonLink, escapeHtml as esc, heroMedia, responsiveFigure, sectionLabel as label } from '../src/components.mjs';
import { agentConfig } from '../src/agent-config.mjs';
import { serviceSchemaJson } from '../src/seo.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const out = path.join(root, 'dist');
await rm(out, { recursive: true, force: true });
await mkdir(path.join(out, 'media'), { recursive: true });
const canonical = process.env.SITE_URL || '';
if (canonical && (!/^https:\/\//.test(canonical) || new URL(canonical).search || new URL(canonical).hash)) throw new Error('SITE_URL must be the final HTTPS page URL, without query or fragment.');
const headCanonical = canonical ? `<link rel="canonical" href="${esc(canonical)}"><meta property="og:url" content="${esc(canonical)}">` : '<meta name="robots" content="noindex, nofollow">';
const html = `<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(c.meta.title)}</title><meta name="description" content="${esc(c.meta.description)}">
  <meta name="theme-color" content="#071A24"><meta name="referrer" content="no-referrer">
  <meta property="og:type" content="website"><meta property="og:locale" content="vi_VN">
  <meta property="og:title" content="${esc(c.meta.title)}"><meta property="og:description" content="${esc(c.meta.description)}">
  ${headCanonical}
  <script type="application/ld+json">${serviceSchemaJson}</script>
  <link rel="icon" href="./media/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="./styles.css"><script src="./app.js" defer></script>
</head>
<body id="dau-trang">
<a class="skip" href="#noi-dung">Chuyển đến nội dung chính</a>
<header class="header">
  <div class="container header-inner">
    <a class="brand" href="#dau-trang" aria-label="GASCOLAE — về đầu trang"><img src="./media/${media.brand.file}" width="${media.brand.width}" height="${media.brand.height}" alt="" decoding="async"><span>GASCOLAE</span></a>
    <span class="service-tag">S0070 <span>/</span> UAV & SPECTRAL AI</span>
    <button class="menu-toggle" aria-expanded="false" aria-controls="navigation" hidden>Menu <span aria-hidden="true">☰</span></button>
    <nav id="navigation" aria-label="Điều hướng chính">
      ${c.navigation.map(item => `<a href="${esc(item.href)}">${esc(item.text)}</a>`).join('')}
      ${buttonLink('Trao đổi nhu cầu', '#lien-he', 'compact')}
    </nav>
  </div>
</header>
<main id="noi-dung" tabindex="-1">
  <section class="hero dark" aria-labelledby="hero-title">
    <div class="container hero-grid">
      <div class="hero-copy">
        <p class="eyebrow"><span class="dot" aria-hidden="true"></span> S0070 / KHẢO SÁT & GIÁM SÁT QUANG PHỔ</p>
        <h1 id="hero-title">Phát hiện bất thường bằng <em>UAV quang phổ & AI</em></h1>
        <p class="hero-description">${esc(c.hero.text)}</p>
        <div class="hero-actions">${buttonLink('Trao đổi nhu cầu')}${buttonLink('Xem các cấp độ dịch vụ', '#cap-do', 'secondary')}</div>
        <p class="review-note"><span aria-hidden="true">⊙</span> ${esc(c.hero.review)}</p>
      </div>
      <figure class="hero-media">
        <div class="media-top"><span>SPECTRAL DATA CUBE</span><span>RGB / MSI / HSI</span></div>
        ${heroMedia(media.hero)}
        <figcaption><span class="legend-dot" aria-hidden="true"></span> Dữ liệu phổ <span class="legend-dot amber" aria-hidden="true"></span> Vùng khác biệt <span class="illustration">Hình minh họa</span></figcaption>
      </figure>
    </div>
    <div class="container hero-bottom"><span>THU NHẬN</span><b>RGB + MSI / HSI</b><span>ĐỐI CHIẾU</span><b>GIS & orthomosaic</b><span>KIỂM CHỨNG</span><b>Human-in-the-loop</b></div>
  </section>

  <section class="section problems container" aria-labelledby="problem-title">
    ${label('01', 'BÀI TOÁN')}
    <div class="section-heading"><h2 id="problem-title">Từ quan sát diện rộng<br>đến điểm cần chú ý.</h2><p>Thêm thông tin phổ để hỗ trợ việc rà soát, đối chiếu và xác minh.</p></div>
    <div class="three-columns ruled">${articleList(c.problems)}</div>
  </section>

  <section class="section overview light" id="tong-quan" aria-labelledby="overview-title">
    <div class="container split">
      <div>${label('02', 'GIẢI PHÁP S0070')}<h2 id="overview-title">Một luồng dữ liệu.<br>Nhiều lớp thông tin.</h2><p class="lead">${esc(c.overview.lead)}</p>
      ${c.overview.paragraphs.map(paragraph => `<p>${esc(paragraph)}</p>`).join('')}<a class="text-link" href="#ket-qua">Khám phá kết quả bàn giao ${arrow}</a></div>
      <figure class="workflow-image"><img src="./media/${media.workflow.file}" width="${media.workflow.width}" height="${media.workflow.height}" loading="lazy" decoding="async" alt="${media.workflow.alt}"><figcaption>Thu nhận → Xử lý dữ liệu → GIS → Chuyên gia<br><span>Minh họa quy trình, không phải hệ thống đang vận hành.</span></figcaption></figure>
    </div>
  </section>

  <section class="section benefits-section container" id="loi-ich" aria-labelledby="benefit-title">
    ${label('03', 'GIÁ TRỊ MANG LẠI')}
    <div class="section-heading"><h2 id="benefit-title">Tập trung nguồn lực<br>vào nơi cần kiểm tra.</h2><p>Giá trị đến từ khả năng ưu tiên dữ liệu, bổ sung thông tin phổ và tạo đầu ra có thể đối chiếu.</p></div>
    <div class="three-columns benefits">${articleList(c.benefits)}</div>
  </section>

  <section class="section dark capabilities" id="cong-nghe" aria-labelledby="capability-title">
    <div class="container">${label('04', 'NĂNG LỰC & CÔNG NGHỆ')}<div class="section-heading"><h2 id="capability-title">Nhìn xa hơn<br>một ảnh màu.</h2><p>Dữ liệu phổ bổ sung thông tin. GIS tạo ngữ cảnh. Chuyên gia kiểm chứng kết quả.</p></div>
      ${responsiveFigure(media.sensor, 'media-sensor')}
      <div class="capability-grid">${c.capabilities.map((v, i) => `<article><div class="data-visual visual-${i}" aria-hidden="true">${i === 0 ? '<i></i><i></i><i></i><i></i><i></i><i></i><i></i>' : i === 1 ? '<svg viewBox="0 0 320 100"><path d="M0 75 Q30 75 45 54 T95 64 T145 30 T195 52 T245 18 T320 40"/><path d="M0 83 Q30 60 45 72 T95 45 T145 71 T195 23 T245 58 T320 28"/></svg>' : '<span>RGB</span><span>GIS</span><span>REVIEW ✓</span>'}</div><p class="eyebrow">${v.tag}</p><h3>${esc(v.title)}</h3><p>${esc(v.text)}</p></article>`).join('')}</div>
      <p class="fine-print">Đồ họa mô tả nguyên lý, không phải dữ liệu đo hay benchmark. Cấu hình thiết bị và hiệu năng cần được xác nhận theo dự án.</p>
    </div>
  </section>

  <section class="section container" id="ung-dung" aria-labelledby="use-title">${label('05', 'TÌNH HUỐNG SỬ DỤNG')}
    <div class="split use-layout"><div><h2 id="use-title">Phù hợp với<br>nhu cầu khảo sát nào?</h2>${responsiveFigure(media.applications, 'media-applications')}</div><div class="use-list">${articleList(c.useCases, 'use-row')}</div></div>
  </section>

  <section class="section light" id="cap-do" aria-labelledby="levels-title"><div class="container">
    ${label('06', 'CẤP ĐỘ DỊCH VỤ')}<div class="section-heading"><h2 id="levels-title">Chọn chiều sâu<br>phù hợp với nhu cầu.</h2><p>Ba cấp độ theo mục tiêu phân tích và nhu cầu theo dõi. Giá được tư vấn theo phạm vi dự án.</p></div>
    <div class="level-grid">${c.levels.map(v => `<article id="level-${v.id}" class="level-card"><div class="level-top"><span class="eyebrow">LEVEL ${v.id}</span><span aria-hidden="true">0${v.id}</span></div><p class="level-name" lang="en">${v.name}</p><h3>${v.title}</h3><p class="sensor">${v.sensor}</p><p>${v.text}</p><ul>${v.items.map(t => `<li>${esc(t)}</li>`).join('')}</ul><p class="level-note">${esc(v.note)}</p><div class="level-action"><span>Liên hệ tư vấn</span><a href="#lien-he" data-level="${v.id}" aria-label="Trao đổi nhu cầu về Level ${v.id}">Trao đổi nhu cầu ${arrow}</a></div></article>`).join('')}</div>
  </div></section>

  <section class="section container" id="quy-trinh" aria-labelledby="workflow-title">${label('07', 'CÁCH THỨC THỰC HIỆN')}
    <div class="section-heading"><h2 id="workflow-title">Có kiểm soát<br>ở mỗi giai đoạn.</h2><p>Triển khai trong phạm vi được phê duyệt. Kết quả luôn đi qua bước chuyên gia rà soát.</p></div>
    ${responsiveFigure(media.monitoring, 'media-monitoring')}
    <ol class="workflow">${c.workflow.map((v, i) => `<li><span class="step">0${i + 1}</span><h3>${esc(v.title)}</h3><p>${esc(v.text)}</p></li>`).join('')}</ol>
  </section>

  <section class="section dark" id="ket-qua" aria-labelledby="deliverable-title"><div class="container split">
    <div>${label('08', 'KẾT QUẢ BÀN GIAO')}<h2 id="deliverable-title">Dữ liệu có ngữ cảnh.<br>Kết quả có giới hạn rõ.</h2><div class="deliverable-list">${articleList(c.deliverables)}</div></div>
    <figure class="deliverable-preview"><div class="preview-toolbar"><span>S0070 / DELIVERABLES</span><span>MINH HỌA</span></div><div class="schematic-map" aria-hidden="true"><svg viewBox="0 0 500 300"><path class="contour" d="M-40 50Q100 220 230 90T550 140M-40 80Q100 250 230 120T550 170M-40 110Q100 280 230 150T550 200M-40 140Q100 310 230 180T550 230M-40 170Q100 340 230 210T550 260"/><path class="region" d="M90 85L270 40 410 142 315 254 100 228Z"/><ellipse cx="186" cy="140" rx="42" ry="28"/><ellipse cx="322" cy="189" rx="28" ry="20"/></svg><span>ĐỊA HÌNH GIẢ LẬP / KHÔNG CÓ TỌA ĐỘ THỰC</span></div><div class="preview-files"><div><span>01</span><b>Orthomosaic</b><span>Lớp nền</span></div><div><span>02</span><b>Anomaly layer</b><span>Vùng khác biệt</span></div><div><span>03</span><b>QA report</b><span>Phương pháp & giới hạn</span></div></div><figcaption>Sơ đồ minh họa các lớp bàn giao. Các vùng tô màu thể hiện bất thường cần rà soát, không phải kết luận về mối đe dọa.</figcaption></figure>
  </div></section>

  <section class="section light" id="gioi-han" aria-labelledby="trust-title"><div class="container split">
    <div>${label('09', 'TIN CẬY TỪ SỰ MINH BẠCH')}<h2 id="trust-title">Chuyên gia luôn<br>ở trong quy trình.</h2><p class="lead">AI hỗ trợ sàng lọc và phân tích. Kết quả cần được kiểm chứng.</p></div>
    <div class="trust-list">${c.trust.map(item => `<article><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p></article>`).join('')}</div>
  </div></section>

  <section class="section container" id="faq" aria-labelledby="faq-title"><div class="split"><div>${label('10', 'GIẢI ĐÁP')}<h2 id="faq-title">Trước khi<br>bắt đầu khảo sát.</h2><a class="text-link" href="#lien-he">Trao đổi nhu cầu ${arrow}</a></div><div class="faq-list">${c.faq.map((v, i) => `<details><summary id="faq-question-${i + 1}" aria-expanded="false" aria-controls="faq-answer-${i + 1}"><span>${esc(v.title)}</span><span aria-hidden="true" class="plus">+</span></summary><p id="faq-answer-${i + 1}" role="region" aria-labelledby="faq-question-${i + 1}">${esc(v.text)}</p></details>`).join('')}</div></div></section>

  <section class="section assistant-section light" id="tro-ly" aria-labelledby="assistant-title"><div class="container assistant-grid">
    <div>${label('11', 'TÌM HIỂU THÊM')}<h2 id="assistant-title">${esc(agentConfig.displayName)}</h2><p>Thông tin dịch vụ có nguồn, với giới hạn được nêu rõ.</p><a class="text-link" href="${esc(agentConfig.handoff.href)}">${esc(agentConfig.handoff.label)} ${arrow}</a></div>
    <div class="assistant-shell" data-agent-id="${esc(agentConfig.agentId)}" data-agent-mode="${esc(agentConfig.mode)}"><p class="assistant-status"><span class="legend-dot amber" aria-hidden="true"></span> BẢN XEM TRƯỚC · CHƯA KẾT NỐI AI</p><p class="welcome">${esc(agentConfig.welcome)}</p><p class="fine-print">Chọn câu hỏi để đọc phần thông tin tương ứng trên trang. Khối này không tạo hoặc mô phỏng câu trả lời AI.</p><nav class="suggestions" aria-label="Câu hỏi gợi ý">${agentConfig.suggestedQuestions.map(v => `<a href="${esc(v.href)}" data-intent="${esc(v.intent)}">${esc(v.text)} ${arrow}</a>`).join('')}</nav><p class="assistant-notice">${esc(agentConfig.notice)}</p></div>
  </div></section>

  <section class="section contact dark" id="lien-he" aria-labelledby="contact-title"><div class="container split">
    <div>${label('12', 'BƯỚC TIẾP THEO')}<h2 id="contact-title">${esc(c.contact.heading)}</h2><p class="lead">${esc(c.contact.lead)}</p><p>${esc(c.contact.text)}</p><div class="contact-notice"><b>Biểu mẫu xem trước</b><p>Kênh tiếp nhận đang chờ kết nối. Thông tin nhập tại đây chưa được gửi tới GASCOLAE và không được lưu trên máy chủ.</p></div></div>
    <form id="lead-form" aria-describedby="form-privacy form-status" novalidate>
      <div class="form-grid"><div class="field"><label for="name">Họ và tên <span aria-hidden="true">*</span></label><input id="name" name="name" autocomplete="name" required maxlength="80" aria-describedby="name-error"><span class="field-error" id="name-error" role="status" aria-live="polite" aria-atomic="true"></span></div><div class="field"><label for="organization">Tổ chức / đơn vị <span aria-hidden="true">*</span></label><input id="organization" name="organization" autocomplete="organization" required maxlength="120" aria-describedby="organization-error"><span class="field-error" id="organization-error" role="status" aria-live="polite" aria-atomic="true"></span></div></div>
      <div class="field"><label for="email">Email công việc <span aria-hidden="true">*</span></label><input id="email" name="email" type="email" autocomplete="email" required maxlength="160" aria-describedby="email-error"><span class="field-error" id="email-error" role="status" aria-live="polite" aria-atomic="true"></span></div>
      <div class="form-grid"><div class="field"><label for="goal">Mục tiêu khảo sát</label><select id="goal" name="goal"><option value="overview">Tìm hiểu dịch vụ</option><option value="screening">Sàng lọc định kỳ</option><option value="material">Phân tích vật liệu</option><option value="monitoring">Theo dõi thay đổi</option></select></div><div class="field"><label for="level">Cấp độ quan tâm</label><select id="level" name="level"><option value="unsure">Cần tư vấn thêm</option><option value="1">Level 1 — Screening</option><option value="2">Level 2 — Material Analysis</option><option value="3">Level 3 — Monitoring</option></select></div></div>
      <p id="form-privacy" class="fine-print">${esc(c.contact.privacy)}</p>
      <button class="button" type="button" id="review-lead" hidden>Kiểm tra thông tin <span aria-hidden="true">↗</span></button><button class="clear-form" type="reset">Xóa thông tin</button>
      <p id="form-status" role="status" aria-live="polite">Biểu mẫu chưa kết nối gửi yêu cầu.</p><noscript><p>JavaScript đang tắt. Nội dung dịch vụ vẫn xem được; biểu mẫu không gửi hoặc lưu thông tin.</p></noscript>
    </form>
  </div></section>
</main>
<footer class="footer dark"><div class="container footer-main"><a class="wordmark" href="#dau-trang" aria-label="GASCOLAE — về đầu trang"><img src="./media/${media.brand.file}" width="${media.brand.width}" height="${media.brand.height}" alt="" loading="lazy" decoding="async"><span>GASCOLAE</span></a><p>${esc(c.footer.descriptor).replace('\n','<br>')}</p><a href="#dau-trang">Về đầu trang ↑</a></div><div class="container footer-bottom"><span>GASCOLAE / S0070</span><span>${esc(c.footer.notice)}</span></div></footer>
</body></html>`;
await writeFile(path.join(out, 'index.html'), html);
for (const name of ['styles.css', 'app.js']) await copyFile(path.join(root, 'src', name), path.join(out, name));
const mediaFiles = [...new Set(Object.values(media).flatMap(asset => [asset.file, asset.small, asset.video]).filter(Boolean))];
for (const name of mediaFiles) await copyFile(path.join(root, 'assets/web', name), path.join(out, 'media', name));
await copyFile(path.join(root, 'src/favicon.svg'), path.join(out, 'media/favicon.svg'));
console.log(`Built S0070 in dist/ (public files only). ${canonical ? 'Canonical configured.' : 'Preview is noindex; SITE_URL not configured.'}`);
