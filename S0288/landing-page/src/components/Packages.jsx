import { packages } from '../data/content';
import Reveal from './Reveal';

export default function Packages() {
  return (
    <section className="section" id="packages">
      <div className="container">
        <Reveal className="section-head section-head--center">
          <span className="eyebrow">Gói dịch vụ</span>
          <h2 className="section-title">Ba cấp độ khảo sát theo chiều sâu phân tích dữ liệu</h2>
          <p className="section-sub">
            Từ quét hình học cơ bản đến Digital Twin và kiểm toán rủi ro cháy — lựa chọn theo mục tiêu
            quản lý tài sản và mức độ rủi ro của công trình.
          </p>
        </Reveal>

        <div className="grid grid--3" style={{ marginTop: 40 }}>
          {packages.map((pkg, i) => (
            <Reveal
              key={pkg.level}
              className={`pkg ${pkg.featured ? 'pkg--featured' : ''}`}
              delay={i * 100}
            >
              {pkg.featured && <span className="pkg__ribbon">Được khuyến nghị</span>}

              <span className="pkg__level">{pkg.level}</span>
              <h3 className="pkg__name">{pkg.name}</h3>
              <span className="pkg__tagline">{pkg.tagline}</span>
              <p className="pkg__desc">{pkg.desc}</p>

              <div className="pkg__tech">
                {pkg.tech.map((t) => (
                  <span key={t} className={`chip ${pkg.featured ? 'chip--green' : ''}`}>
                    {t}
                  </span>
                ))}
              </div>

              <ul className="pkg__outputs">
                {pkg.outputs.map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ul>

              <div className="pkg__cta">
                <a
                  className={`btn btn--block ${pkg.featured ? 'btn--accent' : 'btn--ghost'}`}
                  href="#lead-form"
                >
                  Liên hệ tư vấn {pkg.level}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
