import { capabilities } from '../data/content';
import Reveal from './Reveal';

export default function Capabilities() {
  return (
    <section className="section section--dark" id="capabilities">
      <div className="container">
        <Reveal className="section-head section-head--center">
          <span className="eyebrow">Năng lực & Công nghệ</span>
          <h2 className="section-title">
            Cụm cảm biến đa lớp và phân tích AI trên cùng nền tảng UAV
          </h2>
        </Reveal>

        <div className="grid grid--2 tech-grid">
          {capabilities.map((cap, i) => (
            <Reveal key={cap.title} className="tech-card" delay={i * 70}>
              <h3>{cap.title}</h3>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
