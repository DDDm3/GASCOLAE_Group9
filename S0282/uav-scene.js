/**
 * Dựng cảnh UAV quét công trình dựa trên mã nguồn S0288
 */
document.addEventListener('DOMContentLoaded', () => {
    const sceneRoot = document.querySelector('.uav-scene');
    if (!sceneRoot) return;

    const VIEW_W = 760;
    const VIEW_H = 560;
    const CARD_W = 210;
    const CX = 374;
    const CY = 300;
    const ORBIT = { cx: 374, cy: 272, rx: 300, ry: 182, e: 0.62 };
    const LOOP_MS = 15000;
    const START_DEG = -90;

    function orbitPoint(deg) {
        const t = (deg * Math.PI) / 180;
        const c = Math.cos(t);
        const s = Math.sin(t);
        return {
            x: ORBIT.cx + ORBIT.rx * Math.sign(c) * Math.pow(Math.abs(c), ORBIT.e),
            y: ORBIT.cy + ORBIT.ry * Math.sign(s) * Math.pow(Math.abs(s), ORBIT.e)
        };
    }

    function sweepAngleOf(x, y) {
        const deg = (Math.atan2(y - CY, x - CX) * 180) / Math.PI;
        return (deg - START_DEG + 360) % 360;
    }

    function seeded(seed) {
        let s = seed;
        return () => {
            s = (s * 1664525 + 1013904223) % 4294967296;
            return s / 4294967296;
        };
    }

    const POIS = [
        { id: 'dry-zone-1', x: 398, y: 136, type: 'heat', tag: 'TVDI cao', title: 'Khu vực khô hạn cục bộ', detail: 'Nguy cơ cháy cao', side: 'right' },
        { id: 'heat-anomaly', x: 452, y: 250, type: 'heat', tag: '42.5°C', title: 'Dị thường nhiệt độ bề mặt', detail: 'Nguồn nhiệt phát sinh', side: 'right' },
        { id: 'dry-vegetation', x: 540, y: 356, type: 'rust', tag: 'Khô héo', title: 'Thảm thực vật suy thoái', detail: 'Dữ liệu đa phổ (Multispectral)', side: 'right' },
        { id: 'ground-truth', x: 286, y: 408, type: 'crack', tag: 'Ground-truth', title: 'Điểm lấy mẫu thực địa', detail: 'Hiệu chuẩn mô hình', side: 'left' },
        { id: 'fire-risk', x: 192, y: 316, type: 'heat', tag: 'Cảnh báo', title: 'Điểm có nguy cơ hỏa hoạn', detail: 'Đề xuất kiểm tra PCCC', side: 'left' }
    ];

    const SURFACES = [
        { x0: 262, x1: 470, y0: 152, y1: 468, step: 17 },
        { x0: 132, x1: 256, y0: 302, y1: 468, step: 17 },
        { x0: 476, x1: 602, y0: 364, y1: 468, step: 17 }
    ];

    const rnd = seeded(20288);
    const dots = [];
    SURFACES.forEach((s) => {
        for (let x = s.x0 + 4; x < s.x1 - 2; x += s.step) {
            for (let y = s.y0 + 4; y < s.y1 - 2; y += s.step) {
                const px = x + (rnd() - 0.5) * 8;
                const py = y + (rnd() - 0.5) * 8;
                const near = POIS.find(p => Math.hypot(p.x - px, p.y - py) < 46 && p.type === 'heat');
                dots.push({ x: px, y: py, a: sweepAngleOf(px, py), hot: Boolean(near), r: 1.3 + rnd() * 1.1 });
            }
        }
    });
    dots.sort((a, b) => a.a - b.a);

    const pois = POIS.map((p) => {
        const rawX = p.side === 'right' ? p.x + 44 : p.x - 44 - CARD_W;
        const cardX = Math.min(Math.max(rawX, 8), VIEW_W - CARD_W - 8);
        return { ...p, a: sweepAngleOf(p.x, p.y), dx: cardX - p.x, dy: -58 };
    });

    const seg = (from, to) => {
        let d = '';
        for (let deg = from; deg <= to; deg += 3) {
            const p = orbitPoint(deg);
            d += `${deg === from ? 'M' : 'L'}${p.x.toFixed(1)} ${p.y.toFixed(1)} `;
        }
        return d.trim();
    };
    const orbitBack = seg(180, 360);
    const orbitFront = seg(0, 180);

    // Build SVG HTML
    let svgHtml = `
    <svg class="uav-scene__svg" viewBox="0 0 ${VIEW_W} ${VIEW_H}" role="img">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#041e3d" />
            <stop offset="55%" stop-color="#073a68" />
            <stop offset="100%" stop-color="#0a5a7a" />
          </linearGradient>
          <linearGradient id="bldFace" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#0d3f6b" />
            <stop offset="100%" stop-color="#0a2f52" />
          </linearGradient>
          <linearGradient id="bldSide" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#092a49" />
            <stop offset="100%" stop-color="#061f38" />
          </linearGradient>
          <linearGradient id="beamGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#22c55e" stop-opacity="0.55" />
            <stop offset="60%" stop-color="#2e86f0" stop-opacity="0.22" />
            <stop offset="100%" stop-color="#2e86f0" stop-opacity="0" />
          </linearGradient>
          <radialGradient id="heatGlow">
            <stop offset="0%" stop-color="#ff7a1a" stop-opacity="0.85" />
            <stop offset="100%" stop-color="#ff7a1a" stop-opacity="0" />
          </radialGradient>
          <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#062f5e" />
            <stop offset="100%" stop-color="#041e3d" />
          </linearGradient>
        </defs>
        <rect width="${VIEW_W}" height="${VIEW_H}" fill="url(#sky)" />
        <g class="uav-scene__grid" stroke="#2e86f0" stroke-width="0.5" opacity="0.16">
    `;

    for (let i = 0; i < 19; i++) {
        svgHtml += `<line x1="${i * 40}" y1="0" x2="${i * 40}" y2="${VIEW_H}" />`;
    }
    for (let i = 0; i < 14; i++) {
        svgHtml += `<line x1="0" y1="${i * 40}" x2="${VIEW_W}" y2="${i * 40}" />`;
    }
    
    svgHtml += `
        </g>
        <rect x="0" y="470" width="${VIEW_W}" height="90" fill="url(#groundGrad)" />
        <line x1="0" y1="470" x2="${VIEW_W}" y2="470" stroke="#2e86f0" stroke-width="1" opacity="0.5" />
        <g class="uav-scene__gcp">
    `;
    
    [96, 268, 452, 640].forEach(gx => {
        svgHtml += `
            <g transform="translate(${gx} 496)">
              <circle r="7" fill="none" stroke="#22c55e" stroke-width="1.4" opacity="0.85" />
              <circle r="2.2" fill="#22c55e" />
              <text x="0" y="24" text-anchor="middle" class="uav-scene__gcp-label">GCP</text>
            </g>
        `;
    });

    svgHtml += `
        </g>
        <path class="uav-scene__orbit uav-scene__orbit--back" d="${orbitBack}" />
        <g class="uav-scene__building">
          <!-- Building shapes -->
          <rect x="132" y="326" width="124" height="144" fill="url(#bldSide)" />
          <path d="M132 326 L154 302 L176 326 L198 302 L220 326 L242 302 L256 318 L256 326 Z" fill="#0a3457" />
    `;
    
    for (let i = 0; i <= 2; i++) {
        svgHtml += `<rect x="${146 + i * 36}" y="352" width="24" height="30" fill="#0f4a78" opacity="0.9" />`;
    }
    
    svgHtml += `
          <rect x="146" y="410" width="96" height="46" rx="3" fill="#0f4a78" opacity="0.5" />
          <rect x="262" y="152" width="208" height="318" fill="url(#bldFace)" />
          <rect x="258" y="144" width="216" height="10" fill="#0f4a78" />
          <rect x="292" y="118" width="44" height="26" fill="#0d3f6b" />
          <rect x="296" y="112" width="36" height="7" fill="#12578a" />
          <rect x="356" y="128" width="78" height="9" rx="2" fill="#12578a" />
          <path d="M362 137 L362 144 M382 137 L382 144 M402 137 L402 144 M422 137 L422 144" stroke="#0f4a78" stroke-width="3" />
    `;

    for (let r = 0; r < 7; r++) {
        for (let c = 0; c < 5; c++) {
            svgHtml += `<rect x="${276 + c * 38}" y="${176 + r * 40}" width="24" height="26" fill="#0f4a78" opacity="${(r * 5 + c) % 3 === 0 ? 0.95 : 0.62}" />`;
        }
    }

    svgHtml += `
          <path d="M448 214 L455 246 L446 268 L452 296" stroke="#0a2137" stroke-width="2.4" fill="none" opacity="0.9" />
          <rect x="476" y="364" width="126" height="106" fill="url(#bldSide)" />
          <rect x="472" y="356" width="134" height="9" fill="#0f4a78" />
    `;

    for (let i = 0; i <= 2; i++) {
        svgHtml += `<rect x="${492 + i * 38}" y="388" width="24" height="26" fill="#0f4a78" opacity="0.75" />`;
    }

    svgHtml += `
        </g>
        <g class="uav-scene__cloud">
    `;

    dots.forEach((d, i) => {
        svgHtml += `<circle id="dot-${i}" class="uav-dot${d.hot ? ' uav-dot--hot' : ''}" cx="${d.x}" cy="${d.y}" r="${d.r}" />`;
    });

    svgHtml += `
        </g>
        <path class="uav-scene__orbit" d="${orbitFront}" />
        <g class="uav-scene__pois">
    `;

    pois.forEach((poi, i) => {
        svgHtml += `
            <g id="poi-${i}" class="uav-poi uav-poi--${poi.type} uav-poi--${poi.side}" transform="translate(${poi.x} ${poi.y})">
              ${poi.type === 'heat' ? '<circle class="uav-poi__glow" r="34" fill="url(#heatGlow)" />' : ''}
              <circle class="uav-poi__pulse" r="10" />
              <circle class="uav-poi__core" r="5" />
              <line class="uav-poi__leader" x1="0" y1="0" x2="${poi.dx + (poi.side === 'right' ? 0 : CARD_W)}" y2="${poi.dy + 56}" />
              <g transform="translate(${poi.dx} ${poi.dy})">
                <rect class="uav-poi__card" width="${CARD_W}" height="56" rx="9" />
                <text class="uav-poi__title" x="14" y="23">${poi.title}</text>
                <text class="uav-poi__detail" x="14" y="43">${poi.detail}</text>
              </g>
              <g transform="translate(${poi.side === 'right' ? 0 : -72} 14)">
                <rect class="uav-poi__tag" width="72" height="24" rx="12" />
                <text class="uav-poi__tag-text" x="36" y="16.5" text-anchor="middle">${poi.tag}</text>
              </g>
            </g>
        `;
    });

    svgHtml += `
        </g>
        <g id="droneGrp" class="uav-drone" transform="translate(374 90)">
          <g id="beamGrp" class="uav-beam" transform="rotate(90) scale(0.1974)">
            <path class="uav-beam__cone" d="M0 0 L1000 -160 L1000 160 Z" fill="url(#beamGrad)" />
            <line class="uav-beam__ray" x1="0" y1="0" x2="1000" y2="0" />
          </g>
          <g id="bodyGrp" class="uav-drone__body">
            <line x1="-22" y1="-8" x2="22" y2="-8" stroke="#0b5fbf" stroke-width="3" stroke-linecap="round" />
            <line x1="-16" y1="2" x2="16" y2="2" stroke="#0b5fbf" stroke-width="2.5" stroke-linecap="round" />
            <rect x="-13" y="-6" width="26" height="13" rx="4" fill="#f4f8fd" />
            <rect x="-8" y="6" width="16" height="8" rx="3" fill="#22c55e" />
            <circle cx="0" cy="10" r="2.6" fill="#041e3d" />
            ${[-22, -12, 12, 22].map(rx => `<g class="uav-rotor" transform="translate(${rx} -8)"><ellipse rx="11" ry="2.4" fill="#8dc0f7" opacity="0.85" /></g>`).join('')}
            <circle class="uav-drone__nav" cx="-24" cy="-8" r="2.4" fill="#22c55e" />
            <circle class="uav-drone__nav uav-drone__nav--alt" cx="24" cy="-8" r="2.4" fill="#ff7a1a" />
          </g>
        </g>
      </svg>
      
      <div class="uav-hud uav-hud--sensors">
        <span class="uav-hud__dot" aria-hidden="true"></span>
        <strong>UAV Multispectral</strong>
        <span>RGB</span>
        <span>Thermal</span>
      </div>

      <div class="uav-hud uav-hud--scan">
        <div class="uav-hud__row">
          <span>Tiến độ quét khu vực</span>
          <strong id="hudProgress">0%</strong>
        </div>
        <div class="uav-hud__bar">
          <span id="hudBar" style="width: 0%"></span>
        </div>
        <div class="uav-hud__row uav-hud__row--sub">
          <span>Định vị RTK • Lấy mẫu Ground-truth</span>
          <span>Dữ liệu vi khí hậu</span>
        </div>
      </div>

      <div class="uav-hud uav-hud--found">
        <span class="uav-hud__alert" aria-hidden="true"></span>
        <div>
          <strong id="hudFound">0</strong> khu vực rủi ro
          <em>Khô hạn cục bộ • Dị thường nhiệt</em>
        </div>
      </div>
    `;

    sceneRoot.innerHTML = svgHtml;

    // Animation loop
    const droneEl = document.getElementById('droneGrp');
    const bodyEl = document.getElementById('bodyGrp');
    const beamEl = document.getElementById('beamGrp');
    const dotEls = dots.map((_, i) => document.getElementById(`dot-${i}`));
    const poiEls = pois.map((_, i) => document.getElementById(`poi-${i}`));
    const hudProgress = document.getElementById('hudProgress');
    const hudBar = document.getElementById('hudBar');
    const hudFound = document.getElementById('hudFound');

    let start = 0;
    let lastPct = -1;
    let lastFound = -1;
    let lastSweep = 0;
    let cursor = 0;

    function frame(now) {
        if (!start) start = now;
        const p = ((now - start) % LOOP_MS) / LOOP_MS;
        const sweep = p * 360;
        const deg = START_DEG + sweep;

        const pos = orbitPoint(deg);
        const bob = Math.sin((now - start) / 320) * 3;
        const toCenter = (Math.atan2(CY - pos.y, CX - pos.x) * 180) / Math.PI;
        const beamLen = Math.max(90, Math.hypot(CX - pos.x, CY - pos.y) * 0.94);

        if (droneEl) droneEl.setAttribute('transform', `translate(${pos.x.toFixed(2)} ${(pos.y + bob).toFixed(2)})`);
        if (bodyEl) {
            const depth = 1.18 + 0.36 * Math.max(0, Math.sin((deg * Math.PI) / 180));
            bodyEl.setAttribute('transform', `scale(${depth.toFixed(3)})`);
        }
        if (beamEl) {
            beamEl.setAttribute('transform', `rotate(${toCenter.toFixed(2)}) scale(${(beamLen / 1000).toFixed(4)})`);
        }

        if (sweep < lastSweep) {
            dotEls.forEach(el => el && el.classList.remove('is-on'));
            cursor = 0;
        }
        lastSweep = sweep;

        while (cursor < dots.length && dots[cursor].a <= sweep) {
            const el = dotEls[cursor];
            if (el) el.classList.add('is-on');
            cursor += 1;
        }

        let detected = 0;
        pois.forEach((poi, i) => {
            if (poi.a <= sweep) {
                detected += 1;
                const el = poiEls[i];
                if (el && !el.classList.contains('is-on')) el.classList.add('is-on');
            }
        });

        const pct = Math.round(p * 100);
        if (pct !== lastPct) {
            lastPct = pct;
            hudProgress.innerText = pct + '%';
            hudBar.style.width = pct + '%';
        }
        if (detected !== lastFound) {
            lastFound = detected;
            hudFound.innerText = detected;
        }

        requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
});
