import { useEffect, useMemo, useRef, useState } from 'react';

/**
 * Hoạt cảnh UAV bay vòng quanh công trình cũ, phát tia quét LiDAR/Thermal,
 * dựng dần đám mây điểm 3D và phát hiện các điểm đáng chú ý (Hotspot / nứt / rỉ sét).
 *
 * Kỹ thuật: quỹ đạo superellipse quanh khối công trình, vòng lặp requestAnimationFrame
 * ghi thẳng vào DOM (transform + classList) để không re-render React mỗi khung hình.
 */

const VIEW_W = 760;
const VIEW_H = 560;
const CARD_W = 210;

// Tâm công trình – tia quét luôn hướng về tâm này
const CX = 374;
const CY = 300;

// Quỹ đạo bay (superellipse ~ hình chữ nhật bo tròn)
const ORBIT = { cx: 374, cy: 272, rx: 300, ry: 182, e: 0.62 };
const LOOP_MS = 15000;
const START_DEG = -90; // xuất phát phía trên mái

/** Toạ độ UAV trên quỹ đạo tại góc deg */
function orbitPoint(deg) {
  const t = (deg * Math.PI) / 180;
  const c = Math.cos(t);
  const s = Math.sin(t);
  return {
    x: ORBIT.cx + ORBIT.rx * Math.sign(c) * Math.abs(c) ** ORBIT.e,
    y: ORBIT.cy + ORBIT.ry * Math.sign(s) * Math.abs(s) ** ORBIT.e
  };
}

/** Góc của một điểm trên công trình so với tâm, quy về [0,360) tính từ điểm xuất phát */
function sweepAngleOf(x, y) {
  const deg = (Math.atan2(y - CY, x - CX) * 180) / Math.PI;
  return (deg - START_DEG + 360) % 360;
}

/** PRNG có hạt giống cố định để đám mây điểm luôn giống nhau giữa các lần tải */
function seeded(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

/* Các điểm bất thường UAV "phát hiện" khi quét ngang qua */
const POIS = [
  {
    id: 'hotspot-roof',
    x: 398,
    y: 136,
    type: 'heat',
    tag: '78.4°C',
    title: 'Điểm quá nhiệt máng cáp',
    detail: 'Nguy cơ chập cháy',
    side: 'right'
  },
  {
    id: 'crack-facade',
    x: 452,
    y: 250,
    type: 'crack',
    tag: 'Nứt',
    title: 'Vết nứt mặt dựng',
    detail: 'Ảnh RGB phóng to',
    side: 'right'
  },
  {
    id: 'heat-annex',
    x: 540,
    y: 356,
    type: 'heat',
    tag: '61.2°C',
    title: 'Dị thường nhiệt mái phụ',
    detail: 'Lớp bảo vệ suy thoái',
    side: 'right'
  },
  {
    id: 'spalling',
    x: 286,
    y: 408,
    type: 'crack',
    tag: 'Bong tróc',
    title: 'Bong tróc lớp bảo vệ bê tông',
    detail: 'Toạ độ X,Y,Z',
    side: 'left'
  },
  {
    id: 'corrosion',
    x: 192,
    y: 316,
    type: 'rust',
    tag: 'Rỉ sét',
    title: 'Rỉ sét kết cấu thép mái',
    detail: 'Điểm mù',
    side: 'left'
  }
];

/* Bề mặt được quét → sinh đám mây điểm */
const SURFACES = [
  { x0: 262, x1: 470, y0: 152, y1: 468, step: 17 }, // khối tháp chính
  { x0: 132, x1: 256, y0: 302, y1: 468, step: 17 }, // nhà xưởng trái
  { x0: 476, x1: 602, y0: 364, y1: 468, step: 17 } // khối phụ phải
];

function buildPointCloud() {
  const rnd = seeded(20288);
  const dots = [];
  SURFACES.forEach((s) => {
    for (let x = s.x0 + 4; x < s.x1 - 2; x += s.step) {
      for (let y = s.y0 + 4; y < s.y1 - 2; y += s.step) {
        const px = x + (rnd() - 0.5) * 8;
        const py = y + (rnd() - 0.5) * 8;
        const near = POIS.find(
          (p) => Math.hypot(p.x - px, p.y - py) < 46 && p.type === 'heat'
        );
        dots.push({
          x: px,
          y: py,
          a: sweepAngleOf(px, py),
          hot: Boolean(near),
          r: 1.3 + rnd() * 1.1
        });
      }
    }
  });
  return dots.sort((a, b) => a.a - b.a);
}

export default function UavScanScene() {
  const droneRef = useRef(null);
  const bodyRef = useRef(null);
  const beamRef = useRef(null);
  const dotRefs = useRef([]);
  const poiRefs = useRef([]);
  const rafRef = useRef(0);
  const cursorRef = useRef(0);

  const [progress, setProgress] = useState(0);
  const [found, setFound] = useState(0);

  const dots = useMemo(buildPointCloud, []);
  const pois = useMemo(
    () =>
      POIS.map((p) => {
        // Ghim nhãn nằm gọn trong khung hình dù điểm phát hiện sát mép
        const rawX = p.side === 'right' ? p.x + 44 : p.x - 44 - CARD_W;
        const cardX = Math.min(Math.max(rawX, 8), VIEW_W - CARD_W - 8);
        return { ...p, a: sweepAngleOf(p.x, p.y), dx: cardX - p.x, dy: -58 };
      }),
    []
  );
  // Nửa quỹ đạo phía sau công trình vẽ trước, nửa phía trước vẽ sau → tạo chiều sâu
  const [orbitBack, orbitFront] = useMemo(() => {
    const seg = (from, to) => {
      let d = '';
      for (let deg = from; deg <= to; deg += 3) {
        const p = orbitPoint(deg);
        d += `${deg === from ? 'M' : 'L'}${p.x.toFixed(1)} ${p.y.toFixed(1)} `;
      }
      return d.trim();
    };
    return [seg(180, 360), seg(0, 180)];
  }, []);

  useEffect(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      dotRefs.current.forEach((el) => el && el.classList.add('is-on'));
      poiRefs.current.forEach((el) => el && el.classList.add('is-on'));
      setProgress(100);
      setFound(pois.length);
      return undefined;
    }

    let start = 0;
    let lastPct = -1;
    let lastFound = -1;
    let lastSweep = 0;

    const frame = (now) => {
      if (!start) start = now;
      const p = ((now - start) % LOOP_MS) / LOOP_MS;
      const sweep = p * 360;
      const deg = START_DEG + sweep;

      // Vị trí UAV + hướng tia quét về phía công trình
      const pos = orbitPoint(deg);
      const bob = Math.sin((now - start) / 320) * 3;
      const toCenter = (Math.atan2(CY - pos.y, CX - pos.x) * 180) / Math.PI;
      const beamLen = Math.max(90, Math.hypot(CX - pos.x, CY - pos.y) * 0.94);

      if (droneRef.current) {
        droneRef.current.setAttribute(
          'transform',
          `translate(${pos.x.toFixed(2)} ${(pos.y + bob).toFixed(2)})`
        );
      }
      // Càng ở phía trước công trình (nửa dưới quỹ đạo) UAV càng gần người xem
      if (bodyRef.current) {
        const depth = 1.18 + 0.36 * Math.max(0, Math.sin((deg * Math.PI) / 180));
        bodyRef.current.setAttribute('transform', `scale(${depth.toFixed(3)})`);
      }
      if (beamRef.current) {
        beamRef.current.setAttribute(
          'transform',
          `rotate(${toCenter.toFixed(2)}) scale(${(beamLen / 1000).toFixed(4)})`
        );
      }

      // Sang vòng quét mới (góc quét quay về 0): xoá đám mây điểm cũ, quét lại từ đầu
      if (sweep < lastSweep) {
        dotRefs.current.forEach((el) => el && el.classList.remove('is-on'));
        cursorRef.current = 0;
      }
      lastSweep = sweep;
      while (cursorRef.current < dots.length && dots[cursorRef.current].a <= sweep) {
        const el = dotRefs.current[cursorRef.current];
        if (el) el.classList.add('is-on');
        cursorRef.current += 1;
      }

      let detected = 0;
      pois.forEach((poi, i) => {
        if (poi.a <= sweep) {
          detected += 1;
          const el = poiRefs.current[i];
          if (el && !el.classList.contains('is-on')) el.classList.add('is-on');
        }
      });

      const pct = Math.round(p * 100);
      if (pct !== lastPct) {
        lastPct = pct;
        setProgress(pct);
      }
      if (detected !== lastFound) {
        lastFound = detected;
        setFound((prev) => Math.max(prev, detected));
      }

      rafRef.current = requestAnimationFrame(frame);
    };

    rafRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafRef.current);
  }, [dots, pois]);

  return (
    <div className="uav-scene">
      <svg
        className="uav-scene__svg"
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        role="img"
        aria-label="Mô phỏng UAV LiDAR bay quét quanh công trình cũ và phát hiện các điểm bất thường: điểm quá nhiệt, vết nứt, rỉ sét kết cấu."
      >
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#041e3d" />
            <stop offset="55%" stopColor="#073a68" />
            <stop offset="100%" stopColor="#0a5a7a" />
          </linearGradient>
          <linearGradient id="bldFace" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0d3f6b" />
            <stop offset="100%" stopColor="#0a2f52" />
          </linearGradient>
          <linearGradient id="bldSide" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#092a49" />
            <stop offset="100%" stopColor="#061f38" />
          </linearGradient>
          <linearGradient id="beamGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.55" />
            <stop offset="60%" stopColor="#2e86f0" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#2e86f0" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="heatGlow">
            <stop offset="0%" stopColor="#ff7a1a" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#ff7a1a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#062f5e" />
            <stop offset="100%" stopColor="#041e3d" />
          </linearGradient>
        </defs>

        {/* Nền trời + lưới toạ độ VN-2000 */}
        <rect width={VIEW_W} height={VIEW_H} fill="url(#sky)" />
        <g className="uav-scene__grid" stroke="#2e86f0" strokeWidth="0.5" opacity="0.16">
          {Array.from({ length: 19 }, (_, i) => (
            <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2={VIEW_H} />
          ))}
          {Array.from({ length: 14 }, (_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 40} x2={VIEW_W} y2={i * 40} />
          ))}
        </g>

        {/* Mặt đất */}
        <rect x="0" y="470" width={VIEW_W} height="90" fill="url(#groundGrad)" />
        <line x1="0" y1="470" x2={VIEW_W} y2="470" stroke="#2e86f0" strokeWidth="1" opacity="0.5" />

        {/* Điểm khống chế trắc địa GCP dưới mặt đất */}
        <g className="uav-scene__gcp">
          {[96, 268, 452, 640].map((gx) => (
            <g key={gx} transform={`translate(${gx} 496)`}>
              <circle r="7" fill="none" stroke="#22c55e" strokeWidth="1.4" opacity="0.85" />
              <circle r="2.2" fill="#22c55e" />
              <text x="0" y="24" textAnchor="middle" className="uav-scene__gcp-label">
                GCP
              </text>
            </g>
          ))}
        </g>

        {/* Nửa quỹ đạo phía sau công trình */}
        <path className="uav-scene__orbit uav-scene__orbit--back" d={orbitBack} />

        {/* ----- Công trình cũ ----- */}
        <g className="uav-scene__building">
          {/* Nhà xưởng trái + mái răng cưa */}
          <rect x="132" y="326" width="124" height="144" fill="url(#bldSide)" />
          <path
            d="M132 326 L154 302 L176 326 L198 302 L220 326 L242 302 L256 318 L256 326 Z"
            fill="#0a3457"
          />
          {[0, 1, 2].map((i) => (
            <rect
              key={`fw${i}`}
              x={146 + i * 36}
              y={352}
              width="24"
              height="30"
              fill="#0f4a78"
              opacity="0.9"
            />
          ))}
          <rect x="146" y="410" width="96" height="46" rx="3" fill="#0f4a78" opacity="0.5" />

          {/* Tháp chính */}
          <rect x="262" y="152" width="208" height="318" fill="url(#bldFace)" />
          <rect x="258" y="144" width="216" height="10" fill="#0f4a78" />
          {/* Thiết bị & máng cáp trên mái */}
          <rect x="292" y="118" width="44" height="26" fill="#0d3f6b" />
          <rect x="296" y="112" width="36" height="7" fill="#12578a" />
          <rect x="356" y="128" width="78" height="9" rx="2" fill="#12578a" />
          <path
            d="M362 137 L362 144 M382 137 L382 144 M402 137 L402 144 M422 137 L422 144"
            stroke="#0f4a78"
            strokeWidth="3"
          />
          {/* Lưới cửa sổ */}
          {Array.from({ length: 7 }, (_, r) =>
            Array.from({ length: 5 }, (_, c) => (
              <rect
                key={`w${r}-${c}`}
                x={276 + c * 38}
                y={176 + r * 40}
                width="24"
                height="26"
                fill="#0f4a78"
                opacity={(r * 5 + c) % 3 === 0 ? 0.95 : 0.62}
              />
            ))
          )}
          {/* Vệt nứt trên mặt dựng */}
          <path
            d="M448 214 L455 246 L446 268 L452 296"
            stroke="#0a2137"
            strokeWidth="2.4"
            fill="none"
            opacity="0.9"
          />

          {/* Khối phụ phải */}
          <rect x="476" y="364" width="126" height="106" fill="url(#bldSide)" />
          <rect x="472" y="356" width="134" height="9" fill="#0f4a78" />
          {[0, 1, 2].map((i) => (
            <rect
              key={`aw${i}`}
              x={492 + i * 38}
              y={388}
              width="24"
              height="26"
              fill="#0f4a78"
              opacity="0.75"
            />
          ))}
        </g>

        {/* ----- Đám mây điểm 3D dựng dần theo tia quét ----- */}
        <g className="uav-scene__cloud">
          {dots.map((d, i) => (
            <circle
              key={`d${i}`}
              ref={(el) => {
                dotRefs.current[i] = el;
              }}
              className={`uav-dot${d.hot ? ' uav-dot--hot' : ''}`}
              cx={d.x}
              cy={d.y}
              r={d.r}
            />
          ))}
        </g>

        {/* Nửa quỹ đạo phía trước công trình */}
        <path className="uav-scene__orbit" d={orbitFront} />

        {/* ----- Điểm phát hiện ----- */}
        <g className="uav-scene__pois">
          {pois.map((poi, i) => (
            <g
              key={poi.id}
              ref={(el) => {
                poiRefs.current[i] = el;
              }}
              className={`uav-poi uav-poi--${poi.type} uav-poi--${poi.side}`}
              transform={`translate(${poi.x} ${poi.y})`}
            >
              {poi.type === 'heat' && <circle className="uav-poi__glow" r="34" fill="url(#heatGlow)" />}
              <circle className="uav-poi__pulse" r="10" />
              <circle className="uav-poi__core" r="5" />
              <line
                className="uav-poi__leader"
                x1="0"
                y1="0"
                x2={poi.dx + (poi.side === 'right' ? 0 : CARD_W)}
                y2={poi.dy + 56}
              />
              <g transform={`translate(${poi.dx} ${poi.dy})`}>
                <rect className="uav-poi__card" width={CARD_W} height="56" rx="9" />
                <text className="uav-poi__title" x="14" y="23">
                  {poi.title}
                </text>
                <text className="uav-poi__detail" x="14" y="43">
                  {poi.detail}
                </text>
              </g>
              <g transform={`translate(${poi.side === 'right' ? 0 : -72} 14)`}>
                <rect className="uav-poi__tag" width="72" height="24" rx="12" />
                <text className="uav-poi__tag-text" x="36" y="16.5" textAnchor="middle">
                  {poi.tag}
                </text>
              </g>
            </g>
          ))}
        </g>

        {/* ----- UAV ----- */}
        <g ref={droneRef} className="uav-drone" transform="translate(374 90)">
          {/* Tia quét LiDAR/Thermal */}
          <g ref={beamRef} className="uav-beam" transform="rotate(90) scale(0.1974)">
            <path className="uav-beam__cone" d="M0 0 L1000 -160 L1000 160 Z" fill="url(#beamGrad)" />
            <line className="uav-beam__ray" x1="0" y1="0" x2="1000" y2="0" />
          </g>

          {/* Thân UAV */}
          <g ref={bodyRef} className="uav-drone__body">
            <line x1="-22" y1="-8" x2="22" y2="-8" stroke="#0b5fbf" strokeWidth="3" strokeLinecap="round" />
            <line x1="-16" y1="2" x2="16" y2="2" stroke="#0b5fbf" strokeWidth="2.5" strokeLinecap="round" />
            <rect x="-13" y="-6" width="26" height="13" rx="4" fill="#f4f8fd" />
            <rect x="-8" y="6" width="16" height="8" rx="3" fill="#22c55e" />
            <circle cx="0" cy="10" r="2.6" fill="#041e3d" />
            {[-22, -12, 12, 22].map((rx, i) => (
              <g key={`rotor${i}`} className="uav-rotor" transform={`translate(${rx} -8)`}>
                <ellipse rx="11" ry="2.4" fill="#8dc0f7" opacity="0.85" />
              </g>
            ))}
            <circle className="uav-drone__nav" cx="-24" cy="-8" r="2.4" fill="#22c55e" />
            <circle className="uav-drone__nav uav-drone__nav--alt" cx="24" cy="-8" r="2.4" fill="#ff7a1a" />
          </g>
        </g>
      </svg>

      {/* ----- HUD ----- */}
      <div className="uav-hud uav-hud--sensors">
        <span className="uav-hud__dot" aria-hidden="true" />
        <strong>UAV LiDAR</strong>
        <span>RGB</span>
        <span>Thermal</span>
      </div>

      <div className="uav-hud uav-hud--scan">
        <div className="uav-hud__row">
          <span>Tiến độ quét mặt ngoài</span>
          <strong>{progress}%</strong>
        </div>
        <div className="uav-hud__bar">
          <span style={{ width: `${progress}%` }} />
        </div>
        <div className="uav-hud__row uav-hud__row--sub">
          <span>Hệ toạ độ VN-2000 • GCP RTK</span>
          <span>Sai số ≤ 5 cm</span>
        </div>
      </div>

      <div className="uav-hud uav-hud--found">
        <span className="uav-hud__alert" aria-hidden="true" />
        <div>
          <strong>{found}</strong> điểm đáng chú ý
          <em>Hotspot nhiệt • Nứt • Rỉ sét</em>
        </div>
      </div>
    </div>
  );
}
