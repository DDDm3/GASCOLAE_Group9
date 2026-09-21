// Progressive enhancement only: no analytics, persistence, network or simulated AI.
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
menu.hidden = false;
document.documentElement.classList.add('enhanced');
function closeMenu(returnFocus = false) {
  menu.setAttribute('aria-expanded', 'false');
  nav.classList.remove('open');
  if (returnFocus) menu.focus();
}
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('open', open);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') closeMenu(true);
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('.header')) closeMenu();
});
nav.querySelectorAll('a').forEach(anchor => anchor.addEventListener('click', () => {
  closeMenu();
  const target = document.querySelector(anchor.getAttribute('href'));
  if (target) {
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  }
}));
window.matchMedia('(min-width: 1051px)').addEventListener('change', () => closeMenu());

document.querySelectorAll('details').forEach(details => {
  const summary = details.querySelector('summary');
  const syncExpanded = () => summary.setAttribute('aria-expanded', String(details.open));
  syncExpanded();
  details.addEventListener('toggle', syncExpanded);
});

// Keep the poster on constrained devices; only desktop users who accept motion
// and are not using data saver download the optional hero video.
const videoQuery = window.matchMedia('(min-width: 801px) and (prefers-reduced-motion: no-preference)');
const saveData = globalThis.navigator?.connection?.saveData === true;
if (videoQuery.matches && !saveData) {
  document.querySelectorAll('video[data-src]').forEach(video => {
    const source = document.createElement('source');
    source.src = video.dataset.src;
    source.type = 'video/mp4';
    video.append(source);
    video.play().catch(() => {});
  });
}

const form = document.querySelector('#lead-form');
const status = document.querySelector('#form-status');
const review = document.querySelector('#review-lead');
const required = [...form.querySelectorAll('input[required]')];
review.hidden = false;
function validateField(field) {
  let error = '';
  const normalized = field.value.trim();
  if (!normalized) error = 'Vui lòng điền thông tin này.';
  else if (field.validity.tooLong) error = 'Thông tin vượt quá độ dài cho phép.';
  else if (field.type === 'email' && field.validity.typeMismatch) error = 'Vui lòng nhập email hợp lệ.';
  else if (/[<>\u0000-\u001f]/.test(normalized)) error = 'Vui lòng chỉ nhập thông tin liên hệ dạng văn bản.';
  else field.value = normalized;
  field.setAttribute('aria-invalid', String(Boolean(error)));
  document.querySelector(`#${field.id}-error`).textContent = error;
  return !error;
}
function reviewForm(event) {
  event.preventDefault();
  const results = required.map(validateField);
  if (results.includes(false)) {
    status.textContent = 'Vui lòng kiểm tra các trường được đánh dấu. Chưa có thông tin nào được gửi.';
    required[results.indexOf(false)].focus();
    return;
  }
  status.textContent = 'Thông tin liên hệ đã đúng định dạng. Chưa gửi yêu cầu: kênh tiếp nhận GASCOLAE hiện chưa được kết nối. Bạn có thể xóa thông tin bằng nút bên trên.';
}
review.addEventListener('click', reviewForm);
form.addEventListener('submit', reviewForm);
required.forEach(field => field.addEventListener('input', () => {
  if (field.getAttribute('aria-invalid') === 'true') validateField(field);
  status.textContent = 'Biểu mẫu chưa kết nối gửi yêu cầu.';
}));
form.addEventListener('reset', () => {
  required.forEach(field => {
    field.removeAttribute('aria-invalid');
    document.querySelector(`#${field.id}-error`).textContent = '';
  });
  status.textContent = 'Đã xóa thông tin. Chưa có thông tin nào được gửi.';
});
document.querySelectorAll('[data-level]').forEach(anchor => anchor.addEventListener('click', () => {
  document.querySelector('#level').value = anchor.dataset.level;
}));
