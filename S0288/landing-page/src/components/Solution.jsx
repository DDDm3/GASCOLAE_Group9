import { solution } from '../data/content';
import Reveal from './Reveal';

export default function Solution() {
  return (
    <section className="section" id="solution">
      <div className="container">
        <Reveal className="solution__intro">
          <span className="eyebrow">Giải pháp GASCOLAE</span>
          <h2 className="section-title section-title--upper">{solution.title}</h2>
          <div className="solution__body">
            {solution.paragraphs.map((text) => (
              <p key={text.slice(0, 40)}>{text}</p>
            ))}
          </div>
        </Reveal>

        {/* Bảng phạm vi dịch vụ: trái = Bao gồm, phải = Không bao gồm.
            Thứ tự DOM là head→list của từng cột nên khi xuống 1 cột trên mobile
            tiêu đề vẫn dính liền danh sách tương ứng. */}
        <Reveal className="scope-table" delay={100}>
          <div className="scope-table__caption">Phạm vi dịch vụ</div>

          <div className="scope-table__head scope-table__head--in">Bao gồm</div>
          <ul className="scope-table__list scope-table__list--in">
            {solution.scope.inScope.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="scope-table__head scope-table__head--out">Không bao gồm</div>
          <ul className="scope-table__list scope-table__list--out">
            {solution.scope.outScope.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
