import logoUrl from '../assets/gascolae-logo.svg';
import logoWhiteUrl from '../assets/gascolae-logo-white.svg';

/**
 * Logo GASCOLAE chính thức (nguồn: Comp Assets/GASCOLAE.svg).
 *
 * variant="white" dùng bản SVG đã đổi toàn bộ fill sang #ffffff
 * (gascolae-logo-white.svg) cho các nền tối như footer — không dùng filter CSS.
 */
export default function BrandLogo({ className = '', variant = 'default' }) {
  return (
    <img
      className={`brand-logo ${className}`.trim()}
      src={variant === 'white' ? logoWhiteUrl : logoUrl}
      alt="GASCOLAE"
    />
  );
}
