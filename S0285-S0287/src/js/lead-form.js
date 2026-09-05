export function initLeadForm() {
  const form = document.querySelector('.lead__form');
  const successEl = document.querySelector('.lead__success');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      let firstInvalid = null;

      form.querySelectorAll('[required]').forEach(input => {
        const isEmpty = !input.value.trim();
        // P0-WG-03: Set aria-invalid to communicate validation state to screen readers
        input.setAttribute('aria-invalid', isEmpty ? 'true' : 'false');
        input.classList.toggle('error', isEmpty);

        // Show/hide linked error message span
        const errId = input.getAttribute('aria-describedby');
        if (errId) {
          const errEl = document.getElementById(errId);
          if (errEl) errEl.hidden = !isEmpty;
        }

        if (isEmpty) {
          valid = false;
          if (!firstInvalid) firstInvalid = input;
        }
      });

      // Move focus to first invalid field for keyboard/AT users
      if (!valid && firstInvalid) {
        firstInvalid.focus();
        return;
      }

      if (valid) {
        form.style.display = 'none';
        if (successEl) successEl.hidden = false;
      }
    });

    // Clear aria-invalid on input change
    form.querySelectorAll('[required]').forEach(input => {
      input.addEventListener('input', () => {
        if (input.value.trim()) {
          input.setAttribute('aria-invalid', 'false');
          input.classList.remove('error');
          const errId = input.getAttribute('aria-describedby');
          if (errId) {
            const errEl = document.getElementById(errId);
            if (errEl) errEl.hidden = true;
          }
        }
      });
    });
  }
}
