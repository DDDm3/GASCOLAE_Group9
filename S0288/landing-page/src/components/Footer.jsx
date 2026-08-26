import { company, legalRefs, nav, service } from '../data/content';
import BrandLogo from './BrandLogo';

export default function Footer() {
  const half = Math.ceil(nav.length / 2);
  const navCols = [nav.slice(0, half), nav.slice(half)];

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Cột 1 – Nhận diện & liên hệ GASCOLAE */}
          <div className="footer-brand">
            <BrandLogo className="footer-brand__logo" variant="white" />
            <div className="footer-col__body">
            <p className="footer-brand__tagline">{company.tagline}</p>
            <p className="footer-brand__established">{company.established}</p>

            <dl className="footer-contact">
              <div>
                <dt>Support email:</dt>
                <dd>
                  <a href={`mailto:${company.email}`}>{company.email}</a>
                </dd>
              </div>
              <div>
                <dt>Phone:</dt>
                <dd>
                  <a href={`tel:${company.phone.replace(/[^\d+]/g, '')}`}>{company.phone}</a>
                </dd>
              </div>
              <div>
                <dt>Address:</dt>
                <dd>{company.address}</dd>
              </div>
            </dl>
            </div>
          </div>

          {/* Cột 2 – Nội dung trang, chia đều hai bên mỗi bên 4 mục */}
          <div className="footer-menu">
            <h4>Nội dung trang</h4>
            <div className="footer-col__body footer-menu__cols">
              {navCols.map((col, i) => (
                <ul key={i}>
                  {col.map((item) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`}>{item.label}</a>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>

          {/* Cột 3 – Giới thiệu dịch vụ + căn cứ pháp lý tham chiếu */}
          <div className="footer-service">
            <h4>Dịch vụ {service.id}</h4>
            <div className="footer-col__body">
              <p className="footer-service__name">{service.name}</p>

              <span className="footer-service__label">Tuân thủ &amp; tham chiếu</span>
              <ul className="footer-legal">
                {legalRefs.map((ref) => (
                  <li key={ref}>{ref}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} GASCOLAE Platform. Service ID: {service.id}.
          </span>
          <span>
            Báo cáo khảo sát là dữ liệu đầu vào phục vụ bảo trì/kiểm định, không thay thế chứng thư
            kiểm định hoặc PCCC của cơ quan Nhà nước.
          </span>
        </div>
      </div>
    </footer>
  );
}
