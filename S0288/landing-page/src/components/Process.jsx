import { prerequisites, process } from '../data/content';
import Reveal from './Reveal';

export default function Process() {
  return (
    <section className="section section--soft" id="process">
      <div className="container">
        <Reveal className="section-head section-head--center">
          <span className="eyebrow">Quy trình triển khai</span>
          <h2 className="section-title">Năm bước từ tiếp nhận hồ sơ đến bàn giao sản phẩm số</h2>
        </Reveal>

        <div className="steps">
          {process.map((step, i) => (
            <Reveal key={step.step} className="step" delay={i * 90}>
              <div className="step__badge">{step.step}</div>
              <h3>{step.title}</h3>
            </Reveal>
          ))}
        </div>

        <Reveal className="section-head" style={{ marginTop: 72, marginBottom: 28 }}>
          <h3 className="section-title" style={{ fontSize: 24 }}>
            Điều kiện phối hợp từ phía khách hàng
          </h3>
        </Reveal>

        <div className="grid grid--3">
          {prerequisites.map((item, i) => (
            <Reveal key={item.title} className="prereq" delay={i * 80}>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
