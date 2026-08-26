import { benefits } from '../data/content';
import { IconCheck } from './Icons';
import Reveal from './Reveal';

export default function Benefits() {
  return (
    <section className="section section--soft" id="benefits">
      <div className="container">
        <Reveal className="section-head section-head--center">
          <span className="eyebrow">Lợi ích chính</span>
          <h2 className="section-title">Giá trị khách hàng nhận được sau mỗi kỳ khảo sát</h2>
        </Reveal>

        <div className="grid grid--2">
          {benefits.map((benefit, i) => (
            <Reveal key={benefit.title} className="benefit" delay={i * 80}>
              <span className="benefit__check">
                <IconCheck width="20" height="20" />
              </span>
              <div>
                <h3>{benefit.title}</h3>
                <p>{benefit.desc}</p>
                {benefit.note && <p className="benefit__note">Lưu ý: {benefit.note}</p>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
