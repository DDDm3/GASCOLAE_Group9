export function initLeadForm() {
  const form = document.querySelector('.lead__form');
  const successEl = document.querySelector('.lead__success');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      form.querySelectorAll('[required]').forEach(input => {
        if (!input.value.trim()) {
          input.classList.add('error');
          valid = false;
        } else {
          input.classList.remove('error');
        }
      });

      if (valid) {
        form.style.display = 'none';
        if (successEl) successEl.hidden = false;
      }
    });
  }
}
