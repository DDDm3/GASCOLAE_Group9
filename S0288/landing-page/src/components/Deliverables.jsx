import { deliverables } from '../data/content';
import Reveal from './Reveal';

export default function Deliverables() {
  return (
    <section className="section section--soft" id="deliverables">
      <div className="container">
        <Reveal className="section-head section-head--center">
          <span className="eyebrow">Kết quả bàn giao</span>
          <h2 className="section-title">Bộ hồ sơ số hóa khách hàng nhận được</h2>
          <p className="section-sub">
            Toàn bộ sản phẩm được chuẩn hóa theo hệ tọa độ quốc gia VN-2000, có thể lưu trữ và đối
            chiếu qua nhiều chu kỳ khảo sát.
          </p>
        </Reveal>

        <div className="grid grid--2">
          {deliverables.map((item, i) => (
            <Reveal key={item.no} className="deliverable" delay={i * 80}>
              <span className="deliverable__no">{item.no}</span>
              <div className="deliverable__body">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <div className="deliverable__meta">
                  <span className="chip chip--green">{item.level}</span>
                  {item.formats.map((f) => (
                    <span key={f} className="chip">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
