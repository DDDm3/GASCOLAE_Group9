export function initNavigation() {
  const header = document.querySelector('[data-header]');
  if (!header) return;

  const toggle = header.querySelector('.nav-toggle');
  const navigation = header.querySelector('#primary-navigation');
  const label = toggle.querySelector('[data-menu-label]');
  const mobile = window.matchMedia('(max-width: 64rem)');
  let expanded = false;

  function setExpanded(next, restoreFocus = false) {
    expanded = mobile.matches && next;
    toggle.setAttribute('aria-expanded', String(expanded));
    label.textContent = expanded ? 'Đóng menu' : 'Mở menu';
    navigation.hidden = mobile.matches && !expanded;
    if (restoreFocus) toggle.focus();
  }

  function syncViewport() {
    const focusInNavigation = navigation.contains(document.activeElement);
    const focusOnToggle = document.activeElement === toggle;
    toggle.hidden = !mobile.matches;
    setExpanded(false, mobile.matches && focusInNavigation);
    if (!mobile.matches && focusOnToggle) navigation.querySelector('a').focus();
  }

  toggle.addEventListener('click', () => setExpanded(!expanded));
  header.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && expanded) {
      event.preventDefault();
      setExpanded(false, true);
    }
  });

  navigation.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || !mobile.matches) return;
    setExpanded(false, true);
    const target = document.getElementById(link.hash.slice(1));
    if (target) {
      const hadTabindex = target.hasAttribute('tabindex');
      if (!hadTabindex) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      if (!hadTabindex) target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
    }
  });

  // This is a non-modal disclosure: Tab can leave it without a focus trap.
  document.addEventListener('click', (event) => {
    if (expanded && !header.contains(event.target)) {
      setExpanded(false, navigation.contains(document.activeElement));
    }
  });
  header.addEventListener('focusout', (event) => {
    if (expanded && event.relatedTarget && !header.contains(event.relatedTarget)) setExpanded(false);
  });
  mobile.addEventListener('change', syncViewport);
  syncViewport();
  header.setAttribute('data-nav-ready', '');

  let scrollQueued = false;
  const updateScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 12);
    scrollQueued = false;
  };
  window.addEventListener('scroll', () => {
    if (scrollQueued) return;
    scrollQueued = true;
    window.requestAnimationFrame(updateScroll);
  }, { passive: true });
  updateScroll();
}
