/** Bộ icon nội tuyến (inline SVG) dùng chung – không phụ thuộc thư viện ngoài. */

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round'
};

export function IconFire(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M12 3s5 4.2 5 8.6A5 5 0 0 1 7 12c0-1.6.8-3 1.8-4.2 0 1.6 1 2.6 2 2.6 1.6 0 1.2-3.4 1.2-7.4Z" />
      <path d="M12 21a5 5 0 0 0 5-5" opacity="0.5" />
    </svg>
  );
}

export function IconScaffold(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M4 3v18M12 3v18M20 3v18" />
      <path d="M4 8h16M4 14h16" />
      <path d="M2 21h20" />
    </svg>
  );
}

export function IconBlindspot(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M2 12s3.6-6.5 10-6.5c2 0 3.7.6 5.1 1.5" />
      <path d="M22 12s-3.6 6.5-10 6.5c-2 0-3.7-.6-5.1-1.5" />
      <circle cx="12" cy="12" r="2.6" />
      <path d="M3 3l18 18" />
    </svg>
  );
}

export function IconData(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M3 20V9l9-5 9 5v11" />
      <path d="M3 20h18" />
      <path d="M8 20v-6h8v6" />
      <path d="M12 4v5" opacity="0.6" />
    </svg>
  );
}

export function IconCheck(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} strokeWidth="2.4" {...props}>
      <path d="M4.5 12.5 9.5 17.5 19.5 7" />
    </svg>
  );
}

export function IconPhone(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M4 5c0-1 .9-2 2-2h2l2 5-2.2 1.5a13 13 0 0 0 6.7 6.7L16 14l5 2v2c0 1.1-.9 2-2 2A16 16 0 0 1 4 5Z" />
    </svg>
  );
}

export function IconMail(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}

export function IconClock(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.5l3.5 2" />
    </svg>
  );
}

export function IconChat(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-5.2A8 8 0 1 1 21 12Z" />
      <path d="M9 11h6M9 14.5h4" opacity="0.7" />
    </svg>
  );
}

export function IconDrone(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <rect x="9" y="9.5" width="6" height="5" rx="1.6" />
      <path d="M9 10 5.5 6.5M15 10l3.5-3.5M9 14l-3.5 3.5M15 14l3.5 3.5" />
      <circle cx="4.6" cy="5.6" r="1.8" />
      <circle cx="19.4" cy="5.6" r="1.8" />
      <circle cx="4.6" cy="18.4" r="1.8" />
      <circle cx="19.4" cy="18.4" r="1.8" />
    </svg>
  );
}

export const problemIcons = {
  fire: IconFire,
  scaffold: IconScaffold,
  blindspot: IconBlindspot,
  data: IconData
};
