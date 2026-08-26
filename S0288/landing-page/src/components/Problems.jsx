import { problems } from '../data/content';
import { problemIcons } from './Icons';
import Reveal from './Reveal';

export default function Problems() {
  return (
    <section className="section section--soft" id="problems">
      <div className="container">
        <Reveal className="section-head section-head--center">
          <span className="eyebrow">Vấn đề của công trình cũ</span>
          <h2 className="section-title">
            Công trình lâu năm đối mặt rủi ro kết cấu và hỏa hoạn khó nhận biết
          </h2>
        </Reveal>

        <div className="grid grid--4">
          {problems.map((problem, i) => {
            const Icon = problemIcons[problem.icon];
            return (
              <Reveal key={problem.title} className="card problem-card" delay={i * 90}>
                <div className="problem-card__icon">
                  <Icon />
                </div>
                <h3 className="card__title">{problem.title}</h3>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
