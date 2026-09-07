/**
 * src/js/navbar.js
 * Deterministic Mobile Navigation & Independent Overlay Controller
 */
export function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.navbar__toggle');
  const drawer = document.getElementById('navbar-drawer');
  const overlay = document.getElementById('navbar-overlay');
  const closeBtn = document.querySelector('.navbar__drawer-close');
  const drawerLinks = document.querySelectorAll('.navbar__drawer-link, .navbar__drawer-foot a');

  function openDrawer() {
    if (!drawer || !overlay) return;
    drawer.hidden = false;
    overlay.hidden = false;
    if (toggle) toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('no-scroll');
    if (navbar) navbar.classList.remove('navbar--hidden');
  }

  function closeDrawer() {
    if (!drawer || !overlay) return;
    drawer.hidden = true;
    overlay.hidden = true;
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
  }

  if (toggle) {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeDrawer();
    });
  }

  if (overlay) {
    overlay.addEventListener('click', () => {
      closeDrawer();
    });
  }

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer && !drawer.hidden) {
      closeDrawer();
    }
  });

  // Auto-close drawer if viewport resized to desktop (>= 1280px)
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1280 && drawer && !drawer.hidden) {
      closeDrawer();
    }
  });

  // ── Scroll-Direction Header Hide/Show Engine ──
  if (navbar) {
    let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
    let ticking = false;
    const SCROLL_THRESHOLD_DOWN = 12;
    const SCROLL_THRESHOLD_UP = 8;
    const TOP_THRESHOLD = 12;

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;

          // If mobile drawer is open, keep header visible and exit
          if (drawer && !drawer.hidden) {
            navbar.classList.remove('navbar--hidden');
            lastScrollY = currentScrollY;
            ticking = false;
            return;
          }

          // At top of page: always visible
          if (currentScrollY <= TOP_THRESHOLD) {
            navbar.classList.remove('navbar--hidden');
          } else if (currentScrollY > lastScrollY) {
            // Scrolling DOWN
            const diff = currentScrollY - lastScrollY;
            if (diff >= SCROLL_THRESHOLD_DOWN) {
              navbar.classList.add('navbar--hidden');
            }
          } else {
            // Scrolling UP
            const diff = lastScrollY - currentScrollY;
            if (diff >= SCROLL_THRESHOLD_UP) {
              navbar.classList.remove('navbar--hidden');
            }
          }

          lastScrollY = Math.max(0, currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
  }
}
