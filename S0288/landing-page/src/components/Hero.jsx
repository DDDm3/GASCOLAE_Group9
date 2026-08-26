import { hero } from '../data/content';
import UavScanScene from './UavScanScene';

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero__inner">
        <div className="hero__copy">
          <h1 className="hero__title">
            Kiểm Tra Kết Cấu &amp; <em>Tầm Soát Nguy Cơ Cháy</em> Công Trình Cũ Bằng UAV LiDAR
          </h1>

          <p className="hero__sub">{hero.sub}</p>

          <div className="hero__actions">
            <a className="btn btn--accent" href="#lead-form">
              {hero.primaryCta}
            </a>
            <a className="btn btn--ghost-light" href="#packages">
              {hero.secondaryCta}
            </a>
          </div>
        </div>

        <div className="hero__visual">
          <UavScanScene />
        </div>
      </div>

      <div className="container">
        <div className="hero__stats">
          {hero.stats.map((stat) => (
            <div key={stat.label} className="hero__stat">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
