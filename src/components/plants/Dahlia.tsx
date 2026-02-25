export function dahliaGradients(pfx: (name: string) => string) {
  return (
    <>
      {/* Stem gradient — sturdy green for hollow dahlia stems */}
      <linearGradient id={pfx('dahStem')} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#2d5420" />
        <stop offset="30%" stopColor="#3a6524" />
        <stop offset="55%" stopColor="#5a8a3c" />
        <stop offset="80%" stopColor="#3a6524" />
        <stop offset="100%" stopColor="#2d5420" />
      </linearGradient>

      {/* Stem highlight */}
      <linearGradient id={pfx('dahStemHi')} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#6ba048" stopOpacity="0" />
        <stop offset="40%" stopColor="#8abf60" stopOpacity="0.45" />
        <stop offset="100%" stopColor="#6ba048" stopOpacity="0" />
      </linearGradient>

      {/* Leaf gradient — dark green dahlia leaves */}
      <linearGradient id={pfx('dahLeaf')} x1="0" y1="0" x2="0.8" y2="1">
        <stop offset="0%" stopColor="#2a4e18" />
        <stop offset="50%" stopColor="#3a6524" />
        <stop offset="100%" stopColor="#2a4e18" />
      </linearGradient>

      {/* Outer petal gradient — deep magenta */}
      <radialGradient id={pfx('dahPetalOuter')} cx="50%" cy="80%" r="70%">
        <stop offset="0%" stopColor="#e91e63" />
        <stop offset="40%" stopColor="#c2185b" />
        <stop offset="100%" stopColor="#a0145a" />
      </radialGradient>

      {/* Mid petal gradient — warm pink/coral */}
      <radialGradient id={pfx('dahPetalMid')} cx="50%" cy="75%" r="65%">
        <stop offset="0%" stopColor="#f06292" />
        <stop offset="45%" stopColor="#e91e63" />
        <stop offset="100%" stopColor="#c2185b" />
      </radialGradient>

      {/* Inner petal gradient — coral/peach transition */}
      <radialGradient id={pfx('dahPetalInner')} cx="50%" cy="70%" r="60%">
        <stop offset="0%" stopColor="#ffab40" />
        <stop offset="50%" stopColor="#f48fb1" />
        <stop offset="100%" stopColor="#f06292" />
      </radialGradient>

      {/* Center petal gradient — golden/peach */}
      <radialGradient id={pfx('dahPetalCenter')} cx="50%" cy="60%" r="55%">
        <stop offset="0%" stopColor="#fff176" />
        <stop offset="40%" stopColor="#ffd54f" />
        <stop offset="100%" stopColor="#ffab40" />
      </radialGradient>

      {/* Bud gradient — tight green with magenta hints */}
      <radialGradient id={pfx('dahBud')} cx="45%" cy="35%" r="60%">
        <stop offset="0%" stopColor="#5a8a3c" />
        <stop offset="60%" stopColor="#3a6524" />
        <stop offset="100%" stopColor="#2a4e18" />
      </radialGradient>

      {/* Bud color peek */}
      <radialGradient id={pfx('dahBudPeek')} cx="50%" cy="40%" r="50%">
        <stop offset="0%" stopColor="#e91e63" />
        <stop offset="100%" stopColor="#c2185b" />
      </radialGradient>

      {/* Seed gradient — dark tubular dahlia tuber seed */}
      <linearGradient id={pfx('dahSeedGrad')} x1="0.3" y1="0" x2="0.7" y2="1">
        <stop offset="0%" stopColor="#5a4030" />
        <stop offset="50%" stopColor="#3e2a1a" />
        <stop offset="100%" stopColor="#2a1a0e" />
      </linearGradient>

      {/* Sepal gradient — for bud wrapping */}
      <linearGradient id={pfx('dahSepal')} x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor="#4a7530" />
        <stop offset="100%" stopColor="#2d5420" />
      </linearGradient>
    </>
  );
}

/** Deterministic pseudo-random for natural variation */
const prand = (seed: number) => {
  const x = Math.sin(seed * 127.1 + seed * seed * 0.0031) * 43758.5453;
  return x - Math.floor(x);
};

/** Render a broad dahlia leaf clearly attached to stem */
function renderLeaf(
  stemX: number, stemY: number,
  length: number, angle: number,
  widthFactor: number,
  pfx: (name: string) => string,
  key: string,
) {
  const rad = (angle * Math.PI) / 180;
  const tipX = stemX + Math.cos(rad) * length;
  const tipY = stemY + Math.sin(rad) * length;
  const perpX = -Math.sin(rad);
  const perpY = Math.cos(rad);
  const w = length * 0.32 * widthFactor;
  const dx = tipX - stemX;
  const dy = tipY - stemY;

  return (
    <g key={key} filter={`url(#${pfx('softShadow')})`}>
      <path
        d={`M ${stemX} ${stemY}
            C ${stemX + dx * 0.25 + perpX * w * 1.1} ${stemY + dy * 0.25 + perpY * w * 1.1},
              ${stemX + dx * 0.6 + perpX * w * 0.85} ${stemY + dy * 0.6 + perpY * w * 0.85},
              ${tipX} ${tipY}
            C ${stemX + dx * 0.6 - perpX * w * 0.85} ${stemY + dy * 0.6 - perpY * w * 0.85},
              ${stemX + dx * 0.25 - perpX * w * 1.1} ${stemY + dy * 0.25 - perpY * w * 1.1},
              ${stemX} ${stemY}`}
        fill={`url(#${pfx('dahLeaf')})`}
        opacity={0.85}
      />
      {/* Central vein */}
      <line x1={stemX} y1={stemY} x2={tipX} y2={tipY}
        stroke="#2d5420" strokeWidth={0.7} opacity="0.35" strokeLinecap="round" />
      {/* Side veins */}
      {[0.3, 0.5, 0.7].map((t, j) => {
        const vx = stemX + dx * t;
        const vy = stemY + dy * t;
        const vl = w * (1 - Math.abs(t - 0.45) * 1.5) * 0.7;
        return (
          <g key={`v-${j}`}>
            <line x1={vx} y1={vy} x2={vx + perpX * vl} y2={vy + perpY * vl}
              stroke="#2d5420" strokeWidth={0.35} opacity="0.2" />
            <line x1={vx} y1={vy} x2={vx - perpX * vl} y2={vy - perpY * vl}
              stroke="#2d5420" strokeWidth={0.35} opacity="0.2" />
          </g>
        );
      })}
    </g>
  );
}

/** Render the spectacular golden-angle spiral dahlia bloom */
function renderDahliaBloom(
  cx: number, cy: number,
  scale: number,
  openness: number,
  pfx: (name: string) => string,
  key: string,
) {
  const goldenAngle = 137.508;
  const totalPetals = 52;

  const petals: { i: number; bx: number; by: number; tx: number; ty: number; w: number; px: number; py: number; grad: string }[] = [];

  for (let i = 0; i < totalPetals; i++) {
    const t = 1 - i / (totalPetals - 1); // 1=outermost → 0=innermost
    const minOpen = t * 0.7;
    if (openness < minOpen) continue;

    const localOpen = Math.min(1, (openness - minOpen) / (1 - minOpen));
    const angle = i * goldenAngle + (prand(i * 7 + 3) - 0.5) * 14;
    const rad = (angle * Math.PI) / 180;

    const sizeVar = 0.85 + prand(i * 13 + 7) * 0.3;
    const petalLen = (5 + t * 16) * sizeVar * localOpen;
    const petalW = petalLen * (0.22 + t * 0.08);

    const emitR = (1.5 + t * 5.5) * localOpen;
    const bx = Math.cos(rad) * emitR;
    const by = Math.sin(rad) * emitR;
    const tx = bx + Math.cos(rad) * petalLen;
    const ty = by + Math.sin(rad) * petalLen;

    let grad: string;
    if (t > 0.72) grad = 'dahPetalOuter';
    else if (t > 0.45) grad = 'dahPetalMid';
    else if (t > 0.2) grad = 'dahPetalInner';
    else grad = 'dahPetalCenter';

    petals.push({ i, bx, by, tx, ty, w: petalW, px: -Math.sin(rad), py: Math.cos(rad), grad });
  }

  return (
    <g key={key} transform={`translate(${cx}, ${cy}) scale(${scale})`} filter={`url(#${pfx('dropShadow')})`}>
      {petals.map(p => {
        const dx = p.tx - p.bx;
        const dy = p.ty - p.by;
        return (
          <path
            key={`p-${p.i}`}
            d={`M ${p.bx} ${p.by}
                C ${p.bx + dx * 0.3 + p.px * p.w * 0.85} ${p.by + dy * 0.3 + p.py * p.w * 0.85},
                  ${p.tx + p.px * p.w * 0.12} ${p.ty + p.py * p.w * 0.12},
                  ${p.tx} ${p.ty}
                C ${p.tx - p.px * p.w * 0.12} ${p.ty - p.py * p.w * 0.12},
                  ${p.bx + dx * 0.3 - p.px * p.w * 0.85} ${p.by + dy * 0.3 - p.py * p.w * 0.85},
                  ${p.bx} ${p.by}`}
            fill={`url(#${pfx(p.grad)})`}
            opacity={0.87}
          />
        );
      })}

      {/* Tiny golden center disc */}
      {openness > 0.6 && (
        <g>
          <circle r={3.5 * openness} fill="#ffd54f" opacity="0.7" />
          <circle r={2 * openness} fill="#fff176" opacity="0.5" />
          {Array.from({ length: 8 }, (_, i) => {
            const a = ((360 / 8) * i * Math.PI) / 180;
            return (
              <circle key={`fc-${i}`}
                cx={Math.cos(a) * 1.8 * openness}
                cy={Math.sin(a) * 1.8 * openness}
                r={0.5 * openness} fill="#ffab40" opacity="0.6" />
            );
          })}
        </g>
      )}
    </g>
  );
}

/** Render a closed/opening dahlia bud */
function renderDahliaBud(
  cx: number, cy: number,
  scale: number, rotation: number,
  opening: number,
  pfx: (name: string) => string,
  key: string,
) {
  return (
    <g key={key} transform={`translate(${cx}, ${cy}) rotate(${rotation}) scale(${scale})`} filter={`url(#${pfx('softShadow')})`}>
      <path d="M 0 -10 C -5 -8 -8 -3 -8 3 C -8 7 -5 10 0 11 C 5 10 8 7 8 3 C 8 -3 5 -8 0 -10"
        fill={`url(#${pfx('dahSepal')})`} opacity="0.9" />
      <path d="M 0 -9 C -4 -7 -6 -2 -6 3 C -6 6 -4 9 0 10 C 4 9 6 6 6 3 C 6 -2 4 -7 0 -9"
        fill={`url(#${pfx('dahBud')})`} opacity="0.85" />
      {opening > 0.3 && (
        <>
          <path d="M -3 -6 C -5 -3 -5 2 -3 5" stroke="#e91e63"
            strokeWidth={1.2 * opening} fill="none" opacity={0.5 * opening} strokeLinecap="round" />
          <path d="M 3 -6 C 5 -3 5 2 3 5" stroke="#c2185b"
            strokeWidth={1 * opening} fill="none" opacity={0.4 * opening} strokeLinecap="round" />
          <ellipse cx="0" cy="-5" rx={3 * opening} ry={2 * opening}
            fill={`url(#${pfx('dahBudPeek')})`} opacity={0.5 * opening} />
        </>
      )}
      <path d="M -2 -8 C -3 -5 -3 0 -2 4" stroke="#6ba048"
        strokeWidth="0.6" fill="none" opacity="0.3" />
      <line x1="0" y1="11" x2="0" y2="16" stroke="#3a6524" strokeWidth={1.5} strokeLinecap="round" />
    </g>
  );
}

export function renderDahlia(stage: number, pfx: (name: string) => string) {
  return (
    <g>
      {/* ── Stage 1: Dahlia seed — elongated tubular seed ── */}
      {stage >= 1 && stage < 2 && (
        <g transform="translate(100, 262)" filter={`url(#${pfx('softShadow')})`}>
          <ellipse cx="1" cy="5" rx="5" ry="1.5" fill="#3a2518" opacity="0.15" />
          <path d="M -1.5 -8 L 0 -10 L 1.5 -8 L 2 -2 L 1.5 4 L 0 6 L -1.5 4 L -2 -2 Z"
            fill={`url(#${pfx('dahSeedGrad')})`} />
          <path d="M 0 -10 L 0 6" stroke="#5a4030" strokeWidth="0.4" fill="none" opacity="0.4" />
          <path d="M -0.8 -7 L -0.8 4" stroke="#4a3520" strokeWidth="0.25" fill="none" opacity="0.3" />
          <path d="M 0.8 -7 L 0.8 4" stroke="#4a3520" strokeWidth="0.25" fill="none" opacity="0.3" />
          <path d="M -1.5 -8 L 0 -10 L 1.5 -8 L 2 -2 L 1.5 4 L 0 6 L -1.5 4 L -2 -2 Z"
            fill="none" stroke="#3e2a1a" strokeWidth="0.4" opacity="0.4" />
          <line x1="0" y1="-10" x2="-0.8" y2="-12" stroke="#8a7a60" strokeWidth="0.3" opacity="0.4" />
          <line x1="0" y1="-10" x2="0" y2="-12.5" stroke="#8a7a60" strokeWidth="0.3" opacity="0.4" />
          <line x1="0" y1="-10" x2="0.8" y2="-12" stroke="#8a7a60" strokeWidth="0.3" opacity="0.4" />
        </g>
      )}

      {/* ── Stage 2: Sprout — short stem with 2 pairs of broad leaves ── */}
      {stage >= 2 && stage < 3 && (
        <g>
          <g opacity="0.5">
            <path d="M 100 266 C 97 273 94 280 90 286" stroke="#7a5d3a" strokeWidth="0.9" fill="none" strokeLinecap="round" />
            <path d="M 100 266 C 103 274 107 281 112 287" stroke="#7a5d3a" strokeWidth="0.8" fill="none" strokeLinecap="round" />
          </g>
          <g filter={`url(#${pfx('softShadow')})`}>
            <path d="M 100 262 C 100 255 100 245 100 230"
              stroke={`url(#${pfx('dahStem')})`} strokeWidth={3} fill="none" strokeLinecap="round" />
            <path d="M 99.5 258 C 99.5 252 99.5 243 99.5 232"
              stroke={`url(#${pfx('dahStemHi')})`} strokeWidth={1} fill="none" strokeLinecap="round" />
          </g>
          {renderLeaf(100, 252, 24, -130, 0.9, pfx, 'l2a')}
          {renderLeaf(100, 252, 24, -50, 0.9, pfx, 'l2b')}
          {renderLeaf(100, 240, 20, -140, 0.8, pfx, 'l2c')}
          {renderLeaf(100, 240, 20, -40, 0.8, pfx, 'l2d')}
          <circle cx="100" cy="228" r="2" fill="#4a7530" opacity="0.6" />
        </g>
      )}

      {/* ── Stage 3+: Main plant body (stems + leaves grow with stage) ── */}
      {stage >= 3 && (
        <g>
          {/* Roots */}
          <g opacity="0.55">
            <path d="M 100 266 C 97 274 93 282 87 290" stroke="#7a5d3a" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <path d="M 100 266 C 103 275 108 283 114 291" stroke="#7a5d3a" strokeWidth="1" fill="none" strokeLinecap="round" />
            <path d="M 100 269 C 95 274 90 279 85 282" stroke="#7a5d3a" strokeWidth="0.6" fill="none" strokeLinecap="round" />
            <path d="M 100 269 C 105 275 110 280 116 283" stroke="#7a5d3a" strokeWidth="0.6" fill="none" strokeLinecap="round" />
          </g>

          {(() => {
            const mainTop = stage >= 6 ? 72 : stage >= 5 ? 85 : stage >= 4 ? 120 : 170;
            const mainSW = stage >= 5 ? 5.5 : stage >= 4 ? 4.5 : 3.5;

            return (
              <g>
                {/* Main center stem */}
                <g filter={`url(#${pfx('softShadow')})`}>
                  <path d={`M 100 262 C 101 240 99 ${mainTop + 40} 100 ${mainTop}`}
                    stroke={`url(#${pfx('dahStem')})`} strokeWidth={mainSW} fill="none" strokeLinecap="round" />
                  <path d={`M 99.5 258 C 100.5 238 98.5 ${mainTop + 42} 99.5 ${mainTop + 3}`}
                    stroke={`url(#${pfx('dahStemHi')})`} strokeWidth={mainSW * 0.4} fill="none" strokeLinecap="round" />
                </g>

                {/* Side stems — stage 5+ */}
                {stage >= 5 && (
                  <>
                    <g filter={`url(#${pfx('softShadow')})`}>
                      <path d={`M 100 200 C 92 185 82 ${stage >= 6 ? 140 : 155} ${stage >= 6 ? 68 : 72} ${stage >= 6 ? 120 : 140}`}
                        stroke={`url(#${pfx('dahStem')})`} strokeWidth={mainSW * 0.7} fill="none" strokeLinecap="round" />
                    </g>
                    <g filter={`url(#${pfx('softShadow')})`}>
                      <path d={`M 100 195 C 108 180 118 ${stage >= 6 ? 135 : 150} ${stage >= 6 ? 132 : 128} ${stage >= 6 ? 115 : 135}`}
                        stroke={`url(#${pfx('dahStem')})`} strokeWidth={mainSW * 0.7} fill="none" strokeLinecap="round" />
                    </g>
                  </>
                )}

                {/* Basal leaves — from stem at ground level */}
                {renderLeaf(100, 250, 30, -140, 1, pfx, 'lb1')}
                {renderLeaf(100, 250, 30, -40, 1, pfx, 'lb2')}
                {renderLeaf(100, 240, 26, -155, 0.9, pfx, 'lb3')}
                {renderLeaf(100, 240, 26, -25, 0.9, pfx, 'lb4')}

                {/* Mid-stem leaves */}
                {renderLeaf(100, 222, 22, -135, 0.85, pfx, 'lm1')}
                {renderLeaf(100, 222, 24, -45, 0.85, pfx, 'lm2')}
                {renderLeaf(100, 202, 20, -150, 0.75, pfx, 'lm3')}
                {renderLeaf(100, 202, 22, -30, 0.75, pfx, 'lm4')}

                {/* Upper leaves — stage 4+ */}
                {stage >= 4 && (
                  <>
                    {renderLeaf(100, 180, 18, -140, 0.7, pfx, 'lu1')}
                    {renderLeaf(100, 180, 20, -40, 0.7, pfx, 'lu2')}
                    {renderLeaf(100, 160, 16, -150, 0.6, pfx, 'lu3')}
                    {renderLeaf(100, 160, 16, -30, 0.6, pfx, 'lu4')}
                  </>
                )}

                {/* Side stem leaves — stage 5+ (positioned on the side stem paths) */}
                {stage >= 5 && (
                  <>
                    {renderLeaf(87, 172, 16, -155, 0.65, pfx, 'ls1')}
                    {renderLeaf(83, 158, 14, -135, 0.55, pfx, 'ls2')}
                    {renderLeaf(114, 168, 16, -25, 0.65, pfx, 'ls3')}
                    {renderLeaf(117, 153, 14, -45, 0.55, pfx, 'ls4')}
                  </>
                )}
              </g>
            );
          })()}
        </g>
      )}

      {/* ── Stage 3: Green growing tips (no buds yet) ── */}
      {stage >= 3 && stage < 4 && (
        <g>
          <circle cx="100" cy="168" r="2.5" fill="#4a7530" opacity="0.6" />
          <circle cx="100" cy="168" r="1.5" fill="#5a8a3c" opacity="0.4" />
        </g>
      )}

      {/* ── Stage 4: Round buds with green sepals on short branch stems ── */}
      {stage >= 4 && stage < 5 && (
        <g>
          {/* Short branch stems for side buds */}
          <g filter={`url(#${pfx('softShadow')})`}>
            <path d="M 100 155 C 95 148 89 140 83 134"
              stroke={`url(#${pfx('dahStem')})`} strokeWidth={2.5} fill="none" strokeLinecap="round" />
            <path d="M 100 150 C 105 143 111 137 117 131"
              stroke={`url(#${pfx('dahStem')})`} strokeWidth={2.5} fill="none" strokeLinecap="round" />
          </g>
          {/* Main bud at top of main stem (stem ends at y=120, bud body overlaps) */}
          {renderDahliaBud(100, 112, 1.3, 0, 0.4, pfx, 'main-bud')}
          {/* Side buds at branch endpoints — pushed down so body overlaps stem */}
          {renderDahliaBud(83, 126, 1.0, -8, 0.2, pfx, 'left-bud')}
          {renderDahliaBud(117, 123, 0.95, 6, 0.15, pfx, 'right-bud')}
        </g>
      )}

      {/* ── Stage 5: Main bloom opening + side buds at stem tips ── */}
      {stage === 5 && (
        <g>
          {/* Main bloom at top of main stem (stem ends at y=85) */}
          {renderDahliaBloom(100, 80, 0.9, 0.45, pfx, 'main-opening')}
          {/* Side buds at side stem endpoints — body overlaps stem ends */}
          {renderDahliaBud(72, 132, 1.1, -10, 0.6, pfx, 'left-bud-s5')}
          {renderDahliaBud(128, 127, 1.05, 8, 0.5, pfx, 'right-bud-s5')}
        </g>
      )}

      {/* ── Stage 6: Full spectacular dinner-plate dahlia ── */}
      {stage === 6 && (
        <g>
          {/* Main bloom at main stem top (y=72) */}
          {renderDahliaBloom(100, 68, 1.15, 1.0, pfx, 'main-bloom-s6')}
          {/* Side blooms at side stem endpoints: left=(68,120), right=(132,115) */}
          {renderDahliaBloom(68, 115, 1.0, 0.95, pfx, 'left-bloom-s6')}
          {renderDahliaBloom(132, 110, 0.95, 0.9, pfx, 'right-bloom-s6')}
        </g>
      )}

      {/* ── Stage 7: Harvest — golden glow + floating petals ── */}
      {stage >= 7 && (
        <g>
          {renderDahliaBloom(100, 68, 1.15, 1.0, pfx, 'main-bloom-s7')}
          {renderDahliaBloom(68, 115, 1.0, 0.95, pfx, 'left-bloom-s7')}
          {renderDahliaBloom(132, 110, 0.95, 0.9, pfx, 'right-bloom-s7')}

          <circle cx="100" cy="100" r="80" fill={`url(#${pfx('harvestGlow')})`} className="animate-pulse" />

          {[
            { x: 45, y: 40, rot: 30, delay: '0s', color: '#e91e63' },
            { x: 155, y: 35, rot: -25, delay: '0.8s', color: '#ffd54f' },
            { x: 35, y: 70, rot: 45, delay: '1.6s', color: '#c2185b' },
            { x: 165, y: 65, rot: -40, delay: '2.4s', color: '#ffab40' },
            { x: 60, y: 30, rot: 20, delay: '3.2s', color: '#f06292' },
            { x: 140, y: 25, rot: -15, delay: '0.5s', color: '#fff176' },
            { x: 50, y: 55, rot: -35, delay: '1.2s', color: '#e91e63' },
            { x: 150, y: 50, rot: 50, delay: '2.0s', color: '#ffd54f' },
            { x: 75, y: 20, rot: 15, delay: '2.8s', color: '#c2185b' },
            { x: 130, y: 18, rot: -50, delay: '3.6s', color: '#ffab40' },
            { x: 90, y: 15, rot: 40, delay: '1.0s', color: '#f06292' },
            { x: 110, y: 12, rot: -30, delay: '1.8s', color: '#fff176' },
          ].map((p, i) => (
            <g key={`float-${i}`} className="animate-float-away" style={{ animationDelay: p.delay }}>
              <path
                d={`M ${p.x} ${p.y}
                    C ${p.x - 2} ${p.y - 4} ${p.x - 1.5} ${p.y - 10} ${p.x} ${p.y - 12}
                    C ${p.x + 1.5} ${p.y - 10} ${p.x + 2} ${p.y - 4} ${p.x} ${p.y}`}
                fill={p.color} opacity="0.55"
                transform={`rotate(${p.rot} ${p.x} ${p.y})`} />
              <path
                d={`M ${p.x} ${p.y}
                    C ${p.x - 1} ${p.y - 2.5} ${p.x - 0.8} ${p.y - 7} ${p.x} ${p.y - 8}
                    C ${p.x + 0.8} ${p.y - 7} ${p.x + 1} ${p.y - 2.5} ${p.x} ${p.y}`}
                fill="#fff0f3" opacity="0.25"
                transform={`rotate(${p.rot} ${p.x} ${p.y})`} />
            </g>
          ))}
        </g>
      )}
    </g>
  );
}
