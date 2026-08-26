import { audiences, whyGascolae } from '../data/content';
import Reveal from './Reveal';

export default function WhyGascolae() {
  return (
    <section className="section section--dark" id="why">
      <div className="container">
        <div className="why">
          <Reveal>
            <span className="eyebrow">Vì sao chọn GASCOLAE</span>
            <h2 className="section-title">
              Dữ liệu chuẩn xác, quy trình tuân thủ và phân tích có truy vết nguồn
            </h2>
            <p className="section-sub">
              Dịch vụ được định vị theo hướng khảo sát viễn thám thay cho kiểm tra thủ công tại các vị
              trí cao, độc hại hoặc khó tiếp cận — với dữ liệu số lưu trữ được qua nhiều kỳ kiểm tra.
            </p>

            <div className="audience-box">
              <h4>Dành cho</h4>
              <ul>
                {audiences.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          </Reveal>

          <div className="why__list">
            {whyGascolae.map((item, i) => (
              <Reveal key={item.title} className="why__item" delay={i * 90}>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
