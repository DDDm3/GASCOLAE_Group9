import { useState } from 'react';
import { faqs } from '../data/content';
import Reveal from './Reveal';

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section" id="faq">
      <div className="container">
        <Reveal className="section-head section-head--center">
          <span className="eyebrow">Câu hỏi thường gặp</span>
          <h2 className="section-title">Giải đáp trước khi triển khai khảo sát</h2>
        </Reveal>

        <div className="faq">
          {faqs.map((item, i) => {
            const open = openIndex === i;
            return (
              <Reveal key={item.q} className={`faq__item ${open ? 'is-open' : ''}`} delay={i * 50}>
                <button
                  type="button"
                  className="faq__q"
                  aria-expanded={open}
                  onClick={() => setOpenIndex(open ? -1 : i)}
                >
                  {item.q}
                  <span className="faq__icon" aria-hidden="true">
                    +
                  </span>
                </button>
                <div className="faq__a">
                  <div>
                    <p>
                      {item.a}
                      {item.note && (
                        <>
                          {' '}
                          <strong style={{ color: '#a45a06' }}>{item.note}</strong>
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
