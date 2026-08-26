import { useEffect, useState } from 'react';
import { nav } from '../data/content';
import BrandLogo from './BrandLogo';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? 'site-header--scrolled' : 'site-header--top'}`}>
      <div className="container site-header__inner">
        <a className="brand" href="#top" aria-label="GASCOLAE – trang chủ dịch vụ S0288">
          <BrandLogo className="brand__logo" />
        </a>

        <nav className={`site-nav ${open ? 'site-nav--open' : ''}`} aria-label="Điều hướng chính">
          {nav.map((item) => (
            <a key={item.id} href={`#${item.id}`} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="btn btn--accent btn--sm site-header__cta" href="#lead-form">
          Đăng ký khảo sát
        </a>

        <button
          type="button"
          className="nav-toggle"
          aria-label={open ? 'Đóng menu' : 'Mở menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
        </button>
      </div>
    </header>
  );
}
