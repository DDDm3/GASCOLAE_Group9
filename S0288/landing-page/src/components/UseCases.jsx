import { useCases } from '../data/content';
import Reveal from './Reveal';

export default function UseCases() {
  return (
    <section className="section" id="use-cases">
      <div className="container">
        <Reveal className="section-head section-head--center">
          <span className="eyebrow">Trường hợp sử dụng</span>
          <h2 className="section-title">Bốn tình huống triển khai phổ biến nhất của dịch vụ S0288</h2>
        </Reveal>

        <div className="grid grid--2">
          {useCases.map((uc, i) => (
            <Reveal key={uc.no} className="usecase" delay={i * 80}>
              <span className="usecase__no">{uc.no}</span>
              <div className="usecase__body">
                <h3>{uc.title}</h3>
                <dl>
                  <div>
                    <dt>Khách hàng / Tình huống</dt>
                    <dd>{uc.customer}</dd>
                  </div>
                  <div className="usecase__out">
                    <dt>Output chính</dt>
                    <dd className="is-output">{uc.output}</dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
