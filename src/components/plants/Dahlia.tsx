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

      {/* Leaf gradient — dark green pinnate dahlia leaves */}
      <linearGradient id={pfx('dahLeaf')} x1="0" y1="0" x2="0.8" y2="1">
        <stop offset="0%" stopColor="#2a4e18" />
        <stop offset="50%" stopColor="#3a6524" />
        <stop offset="100%" stopColor="#2a4e18" />
      </linearGradient>

      {/* Leaf highlight */}
      <linearGradient id={pfx('dahLeafHi')} x1="0.3" y1="0" x2="0.7" y2="1">
        <stop offset="0%" stopColor="#6ba048" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#3a6524" stopOpacity="0" />
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

/** Render a pinnate dahlia leaf (compound leaf with serrated leaflets) */
function renderPinnateLeaf(
  cx: number,
  baseY: number,
  length: number,
  angle: number,
  scale: number,
  pfx: (name: string) => string,
) {
  const rad = (angle * Math.PI) / 180;
  const tipX = cx + Math.cos(rad) * length;
  const tipY = baseY + Math.sin(rad) * length;
  const leafletCount = Math.floor(length / 8);
  const perpX = -Math.sin(rad);
  const perpY = Math.cos(rad);

  return (
    <g filter={`url(#${pfx('softShadow')})`}>
      {/* Central rachis (leaf stem) */}
      <line
        x1={cx}
        y1={baseY}
        x2={tipX}
        y2={tipY}
        stroke="#2d5420"
        strokeWidth={1.2 * scale}
        strokeLinecap="round"
      />

      {/* Opposing leaflets along the rachis */}
      {Array.from({ length: leafletCount }, (_, i) => {
        const t = (i + 1) / (leafletCount + 1);
        const px = cx + (tipX - cx) * t;
        const py = baseY + (tipY - baseY) * t;
        const leafletLen = (7 + (1 - Math.abs(t - 0.4)) * 6) * scale;
        const side = i % 2 === 0 ? 1 : -1;
        const lx = px + perpX * side * leafletLen;
        const ly = py + perpY * side * leafletLen;
        const midX = (px + lx) / 2;
        const midY = (py + ly) / 2;

        return (
          <g key={`leaflet-${i}`}>
            {/* Leaflet body — serrated ovate */}
            <path
              d={`M ${px} ${py}
                  C ${midX + perpX * side * 3 * scale} ${midY + perpY * side * 3 * scale},
                    ${lx + perpX * side * 1 * scale} ${ly + perpY * side * 1 * scale},
                    ${lx} ${ly}
                  C ${lx - perpX * side * 1 * scale} ${ly - perpY * side * 1 * scale},
                    ${midX - perpX * side * 2 * scale} ${midY - perpY * side * 2 * scale},
                    ${px} ${py}`}
              fill={`url(#${pfx('dahLeaf')})`}
              opacity={0.85}
            />
            {/* Leaflet highlight */}
            <path
              d={`M ${px} ${py}
                  C ${midX + perpX * side * 2 * scale} ${midY + perpY * side * 2 * scale},
                    ${lx + perpX * side * 0.5 * scale} ${ly + perpY * side * 0.5 * scale},
                    ${lx} ${ly}`}
              stroke="#4a7a30"
              strokeWidth={0.4 * scale}
              fill="none"
              opacity="0.3"
            />
            {/* Serrated edge marks */}
            {Array.from({ length: 3 }, (_, j) => {
              const st = (j + 1) / 4;
              const sx = px + (lx - px) * st;
              const sy = py + (ly - py) * st;
              return (
                <line
                  key={`serr-${j}`}
                  x1={sx}
                  y1={sy}
                  x2={sx + perpX * side * 1.5 * scale}
                  y2={sy + perpY * side * 1.5 * scale}
                  stroke="#2a4e18"
                  strokeWidth={0.3 * scale}
                  opacity="0.35"
                />
              );
            })}
          </g>
        );
      })}

      {/* Terminal leaflet at tip */}
      <path
        d={`M ${tipX} ${tipY}
            C ${tipX + Math.cos(rad) * 4 * scale + perpX * 3 * scale} ${tipY + Math.sin(rad) * 4 * scale + perpY * 3 * scale},
              ${tipX + Math.cos(rad) * 8 * scale} ${tipY + Math.sin(rad) * 8 * scale},
              ${tipX + Math.cos(rad) * 6 * scale - perpX * 3 * scale} ${tipY + Math.sin(rad) * 6 * scale - perpY * 3 * scale}
            C ${tipX + Math.cos(rad) * 3 * scale - perpX * 2 * scale} ${tipY + Math.sin(rad) * 3 * scale - perpY * 2 * scale},
              ${tipX} ${tipY},
              ${tipX} ${tipY}`}
        fill={`url(#${pfx('dahLeaf')})`}
        opacity={0.8}
      />
    </g>
  );
}

/** Render the spectacular concentric-ring dahlia bloom */
function renderDahliaBloom(
  cx: number,
  cy: number,
  scale: number,
  openness: number, // 0 = closed, 1 = full bloom
  pfx: (name: string) => string,
  key: string,
) {
  // Ring definitions: outer to inner
  // Each ring: count of petals, radius from center, petal length, petal width, gradient, cupping angle
  const rings = [
    { count: 18, radius: 28, petalLen: 14, petalW: 5.5, grad: 'dahPetalOuter', cup: 0.1 },
    { count: 16, radius: 22, petalLen: 12, petalW: 5, grad: 'dahPetalOuter', cup: 0.2 },
    { count: 14, radius: 17, petalLen: 10, petalW: 4.5, grad: 'dahPetalMid', cup: 0.35 },
    { count: 12, radius: 12, petalLen: 8, petalW: 3.8, grad: 'dahPetalInner', cup: 0.5 },
    { count: 10, radius: 7, petalLen: 6, petalW: 3, grad: 'dahPetalCenter', cup: 0.7 },
  ];

  // Only render rings up to what openness allows
  const activeRings = Math.ceil(openness * rings.length);

  return (
    <g key={key} transform={`translate(${cx}, ${cy}) scale(${scale})`} filter={`url(#${pfx('dropShadow')})`}>
      {rings.slice(0, activeRings).map((ring, ringIdx) => {
        const ringOpenness = Math.min(1, (openness * rings.length - ringIdx) / 1);
        // Offset each ring's petal rotation by half a petal-width from the previous ring
        const angleOffset = ringIdx * (360 / ring.count / 2.2);

        return (
          <g key={`ring-${ringIdx}`} opacity={0.85 + ringIdx * 0.03}>
            {Array.from({ length: ring.count }, (_, i) => {
              const deg = (360 / ring.count) * i + angleOffset;
              const rad = (deg * Math.PI) / 180;
              const pLen = ring.petalLen * ringOpenness;
              const pW = ring.petalW * ringOpenness;
              const cupFactor = ring.cup;

              // Petal base at ring radius, pointing outward
              const baseX = Math.cos(rad) * ring.radius * 0.3 * ringOpenness;
              const baseY = Math.sin(rad) * ring.radius * 0.3 * ringOpenness;
              // Petal tip — further out
              const tipX = Math.cos(rad) * (ring.radius * 0.3 + pLen) * ringOpenness;
              const tipY = Math.sin(rad) * (ring.radius * 0.3 + pLen) * ringOpenness;
              // Control points for cupping — petals curve slightly upward (toward viewer)
              const perpX = -Math.sin(rad);
              const perpY = Math.cos(rad);
              // Cupping makes inner petals more pointed/curved
              const cupOffset = cupFactor * pW * 0.4;

              return (
                <path
                  key={`p-${ringIdx}-${i}`}
                  d={`M ${baseX} ${baseY}
                      C ${baseX + Math.cos(rad) * pLen * 0.3 + perpX * (pW * 0.5 - cupOffset)} ${baseY + Math.sin(rad) * pLen * 0.3 + perpY * (pW * 0.5 - cupOffset)},
                        ${tipX + perpX * pW * 0.25} ${tipY + perpY * pW * 0.25},
                        ${tipX} ${tipY}
                      C ${tipX - perpX * pW * 0.25} ${tipY - perpY * pW * 0.25},
                        ${baseX + Math.cos(rad) * pLen * 0.3 - perpX * (pW * 0.5 - cupOffset)} ${baseY + Math.sin(rad) * pLen * 0.3 - perpY * (pW * 0.5 - cupOffset)},
                        ${baseX} ${baseY}`}
                  fill={`url(#${pfx(ring.grad)})`}
                  opacity={0.88 + (i % 3) * 0.04}
                />
              );
            })}
          </g>
        );
      })}

      {/* Tiny golden center disc — visible when fairly open */}
      {openness > 0.6 && (
        <g>
          <circle r={3 * openness} fill="#ffd54f" opacity="0.7" />
          <circle r={2 * openness} fill="#fff176" opacity="0.5" />
          {/* Tiny floret dots in center */}
          {Array.from({ length: 6 }, (_, i) => {
            const a = ((360 / 6) * i * Math.PI) / 180;
            return (
              <circle
                key={`fc-${i}`}
                cx={Math.cos(a) * 1.5 * openness}
                cy={Math.sin(a) * 1.5 * openness}
                r={0.5 * openness}
                fill="#ffab40"
                opacity="0.6"
              />
            );
          })}
        </g>
      )}
    </g>
  );
}

/** Render a closed/opening dahlia bud */
function renderDahliaBud(
  cx: number,
  cy: number,
  scale: number,
  rotation: number,
  opening: number, // 0 = tight, 1 = about to bloom
  pfx: (name: string) => string,
  key: string,
) {
  return (
    <g key={key} transform={`translate(${cx}, ${cy}) rotate(${rotation}) scale(${scale})`} filter={`url(#${pfx('softShadow')})`}>
      {/* Sepal layers wrapping the bud */}
      <path
        d="M 0 -10 C -5 -8 -8 -3 -8 3 C -8 7 -5 10 0 11 C 5 10 8 7 8 3 C 8 -3 5 -8 0 -10"
        fill={`url(#${pfx('dahSepal')})`}
        opacity="0.9"
      />
      {/* Second sepal layer */}
      <path
        d="M 0 -9 C -4 -7 -6 -2 -6 3 C -6 6 -4 9 0 10 C 4 9 6 6 6 3 C 6 -2 4 -7 0 -9"
        fill={`url(#${pfx('dahBud')})`}
        opacity="0.85"
      />
      {/* Color peeking through — magenta hints */}
      {opening > 0.3 && (
        <>
          <path
            d={`M -3 -6 C -5 -3 -5 2 -3 5`}
            stroke="#e91e63"
            strokeWidth={1.2 * opening}
            fill="none"
            opacity={0.5 * opening}
            strokeLinecap="round"
          />
          <path
            d={`M 3 -6 C 5 -3 5 2 3 5`}
            stroke="#c2185b"
            strokeWidth={1 * opening}
            fill="none"
            opacity={0.4 * opening}
            strokeLinecap="round"
          />
          <ellipse cx="0" cy="-5" rx={3 * opening} ry={2 * opening} fill={`url(#${pfx('dahBudPeek')})`} opacity={0.5 * opening} />
        </>
      )}
      {/* Sepal highlight */}
      <path
        d="M -2 -8 C -3 -5 -3 0 -2 4"
        stroke="#6ba048"
        strokeWidth="0.6"
        fill="none"
        opacity="0.3"
      />
      {/* Bud stem */}
      <line x1="0" y1="11" x2="0" y2="16" stroke="#3a6524" strokeWidth={1.5} strokeLinecap="round" />
    </g>
  );
}

export function renderDahlia(stage: number, pfx: (name: string) => string) {
  return (
    <g>
      {/* ── Stage 1: Dahlia seed — elongated thin tubular seed on soil ── */}
      {stage >= 1 && stage < 2 && (
        <g transform="translate(100, 262)" filter={`url(#${pfx('softShadow')})`}>
          {/* Seed shadow */}
          <ellipse cx="1" cy="5" rx="5" ry="1.5" fill="#3a2518" opacity="0.15" />
          {/* Elongated tubular dahlia seed */}
          <path
            d="M -1.5 -8 L 0 -10 L 1.5 -8 L 2 -2 L 1.5 4 L 0 6 L -1.5 4 L -2 -2 Z"
            fill={`url(#${pfx('dahSeedGrad')})`}
          />
          {/* Seed ridges */}
          <path d="M 0 -10 L 0 6" stroke="#5a4030" strokeWidth="0.4" fill="none" opacity="0.4" />
          <path d="M -0.8 -7 L -0.8 4" stroke="#4a3520" strokeWidth="0.25" fill="none" opacity="0.3" />
          <path d="M 0.8 -7 L 0.8 4" stroke="#4a3520" strokeWidth="0.25" fill="none" opacity="0.3" />
          {/* Seed outline */}
          <path
            d="M -1.5 -8 L 0 -10 L 1.5 -8 L 2 -2 L 1.5 4 L 0 6 L -1.5 4 L -2 -2 Z"
            fill="none"
            stroke="#3e2a1a"
            strokeWidth="0.4"
            opacity="0.4"
          />
          {/* Tiny tuft at top */}
          <line x1="0" y1="-10" x2="-0.8" y2="-12" stroke="#8a7a60" strokeWidth="0.3" opacity="0.4" />
          <line x1="0" y1="-10" x2="0" y2="-12.5" stroke="#8a7a60" strokeWidth="0.3" opacity="0.4" />
          <line x1="0" y1="-10" x2="0.8" y2="-12" stroke="#8a7a60" strokeWidth="0.3" opacity="0.4" />
          {/* Highlight */}
          <path d="M -0.8 -6 C -0.3 -3 -0.5 1 -0.8 3" stroke="#7a6a50" strokeWidth="0.4" fill="none" opacity="0.2" />
        </g>
      )}

      {/* ── Stage 2: Sprout — short sturdy stem with 2 pairs of opposite compound leaves ── */}
      {stage >= 2 && stage < 3 && (
        <g>
          {/* Small roots */}
          <g opacity="0.5">
            <path d="M 100 266 C 97 273 94 280 90 286" stroke="#7a5d3a" strokeWidth="0.9" fill="none" strokeLinecap="round" />
            <path d="M 100 266 C 103 274 107 281 112 287" stroke="#7a5d3a" strokeWidth="0.8" fill="none" strokeLinecap="round" />
            <path d="M 100 268 C 96 273 92 277 88 280" stroke="#7a5d3a" strokeWidth="0.5" fill="none" strokeLinecap="round" />
          </g>

          {/* Short sturdy stem */}
          <g filter={`url(#${pfx('softShadow')})`}>
            <path
              d="M 100 262 C 100 255 100 245 100 230"
              stroke={`url(#${pfx('dahStem')})`}
              strokeWidth={3}
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 99.5 258 C 99.5 252 99.5 243 99.5 232"
              stroke={`url(#${pfx('dahStemHi')})`}
              strokeWidth={1}
              fill="none"
              strokeLinecap="round"
            />
          </g>

          {/* 2 pairs of opposite pinnate leaves */}
          {/* Lower pair */}
          {renderPinnateLeaf(100, 252, 22, -135, 0.7, pfx)}
          {renderPinnateLeaf(100, 252, 22, -45, 0.7, pfx)}
          {/* Upper pair */}
          {renderPinnateLeaf(100, 240, 20, -140, 0.65, pfx)}
          {renderPinnateLeaf(100, 240, 20, -40, 0.65, pfx)}

          {/* Growing tip */}
          <circle cx="100" cy="228" r="2" fill="#4a7530" opacity="0.6" />
        </g>
      )}

      {/* ── Stage 3: Bushy plant — taller with multiple leaf pairs on branching hollow stems ── */}
      {stage >= 3 && (
        <g>
          {/* Roots — visible from stage 3 onward */}
          <g opacity="0.55">
            <path d="M 100 266 C 97 274 93 282 87 290" stroke="#7a5d3a" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <path d="M 100 266 C 103 275 108 283 114 291" stroke="#7a5d3a" strokeWidth="1" fill="none" strokeLinecap="round" />
            <path d="M 100 269 C 95 274 90 279 85 282" stroke="#7a5d3a" strokeWidth="0.6" fill="none" strokeLinecap="round" />
            <path d="M 100 269 C 105 275 110 280 116 283" stroke="#7a5d3a" strokeWidth="0.6" fill="none" strokeLinecap="round" />
          </g>

          {/* Main stem — grows taller with stage */}
          {(() => {
            const mainTop = stage >= 6 ? 72 : stage >= 5 ? 85 : stage >= 4 ? 120 : 170;
            const mainSW = stage >= 5 ? 5.5 : stage >= 4 ? 4.5 : 3.5;

            return (
              <g>
                {/* Main center stem */}
                <g filter={`url(#${pfx('softShadow')})`}>
                  <path
                    d={`M 100 262 C 101 240 99 ${mainTop + 40} 100 ${mainTop}`}
                    stroke={`url(#${pfx('dahStem')})`}
                    strokeWidth={mainSW}
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d={`M 99.5 258 C 100.5 238 98.5 ${mainTop + 42} 99.5 ${mainTop + 3}`}
                    stroke={`url(#${pfx('dahStemHi')})`}
                    strokeWidth={mainSW * 0.4}
                    fill="none"
                    strokeLinecap="round"
                  />
                </g>

                {/* Side stems — stage 5+ for secondary blooms */}
                {stage >= 5 && (
                  <>
                    {/* Left side stem */}
                    <g filter={`url(#${pfx('softShadow')})`}>
                      <path
                        d={`M 98 200 C 90 185 80 ${stage >= 6 ? 140 : 155} ${stage >= 6 ? 68 : 72} ${stage >= 6 ? 120 : 140}`}
                        stroke={`url(#${pfx('dahStem')})`}
                        strokeWidth={mainSW * 0.7}
                        fill="none"
                        strokeLinecap="round"
                      />
                    </g>
                    {/* Right side stem */}
                    <g filter={`url(#${pfx('softShadow')})`}>
                      <path
                        d={`M 102 195 C 110 180 120 ${stage >= 6 ? 135 : 150} ${stage >= 6 ? 132 : 128} ${stage >= 6 ? 115 : 135}`}
                        stroke={`url(#${pfx('dahStem')})`}
                        strokeWidth={mainSW * 0.7}
                        fill="none"
                        strokeLinecap="round"
                      />
                    </g>
                  </>
                )}

                {/* Pinnate leaves along stems — bushy dahlia habit */}
                {/* Basal leaves — always from stage 3 */}
                {renderPinnateLeaf(99, 250, 28, -145, 0.8, pfx)}
                {renderPinnateLeaf(101, 248, 30, -35, 0.8, pfx)}
                {renderPinnateLeaf(98, 240, 24, -155, 0.75, pfx)}
                {renderPinnateLeaf(102, 238, 26, -25, 0.75, pfx)}

                {/* Mid-stem leaves */}
                {stage >= 3 && (
                  <>
                    {renderPinnateLeaf(99, 220, 22, -140, 0.7, pfx)}
                    {renderPinnateLeaf(101, 218, 24, -40, 0.7, pfx)}
                    {renderPinnateLeaf(99, 200, 20, -150, 0.65, pfx)}
                    {renderPinnateLeaf(101, 198, 22, -30, 0.65, pfx)}
                  </>
                )}

                {/* Upper leaves — stage 4+ */}
                {stage >= 4 && (
                  <>
                    {renderPinnateLeaf(99, 180, 18, -145, 0.6, pfx)}
                    {renderPinnateLeaf(101, 178, 20, -35, 0.6, pfx)}
                    {renderPinnateLeaf(100, 160, 16, -140, 0.55, pfx)}
                    {renderPinnateLeaf(100, 158, 16, -40, 0.55, pfx)}
                  </>
                )}

                {/* Leaves on side stems — stage 5+ */}
                {stage >= 5 && (
                  <>
                    {renderPinnateLeaf(85, 170, 16, -155, 0.55, pfx)}
                    {renderPinnateLeaf(88, 160, 14, -130, 0.5, pfx)}
                    {renderPinnateLeaf(115, 165, 16, -25, 0.55, pfx)}
                    {renderPinnateLeaf(118, 155, 14, -50, 0.5, pfx)}
                  </>
                )}
              </g>
            );
          })()}
        </g>
      )}

      {/* ── Stage 3 only: Bushy green growing tips (no buds yet) ── */}
      {stage >= 3 && stage < 4 && (
        <g>
          {/* Green growing tips at stem ends */}
          <circle cx="100" cy="168" r="2.5" fill="#4a7530" opacity="0.6" />
          <circle cx="100" cy="168" r="1.5" fill="#5a8a3c" opacity="0.4" />
        </g>
      )}

      {/* ── Stage 4: Round tightly-packed buds with green sepals ── */}
      {stage >= 4 && stage < 5 && (
        <g>
          {/* Main bud — prominent, round, with layered sepals */}
          {renderDahliaBud(100, 115, 1.2, 0, 0.4, pfx, 'main-bud')}

          {/* Side buds on shorter stems — smaller, tighter */}
          {renderDahliaBud(85, 145, 0.8, -8, 0.2, pfx, 'left-bud')}
          {renderDahliaBud(115, 140, 0.7, 6, 0.15, pfx, 'right-bud')}
        </g>
      )}

      {/* ── Stage 5: One large dahlia beginning to open + side buds ── */}
      {stage === 5 && (
        <g>
          {/* Main bloom opening — outer ring visible, inner still coiled */}
          {renderDahliaBloom(100, 82, 0.9, 0.45, pfx, 'main-opening')}

          {/* Side buds showing more color */}
          {renderDahliaBud(68, 118, 0.9, -10, 0.6, pfx, 'left-bud-s5')}
          {renderDahliaBud(132, 113, 0.85, 8, 0.5, pfx, 'right-bud-s5')}
        </g>
      )}

      {/* ── Stage 6: SPECTACULAR full dinner-plate dahlia ── */}
      {stage === 6 && (
        <g>
          {/* THE main bloom — fully open, all 5 concentric rings, breathtaking */}
          {renderDahliaBloom(100, 68, 1.15, 1.0, pfx, 'main-bloom-s6')}

          {/* Secondary bloom — slightly smaller, opening on left stem */}
          {renderDahliaBloom(68, 116, 0.65, 0.85, pfx, 'left-bloom-s6')}

          {/* Tertiary bloom — just opening on right stem */}
          {renderDahliaBloom(132, 110, 0.55, 0.7, pfx, 'right-bloom-s6')}
        </g>
      )}

      {/* ── Stage 7: Harvest — golden glow + floating magenta/gold petal particles ── */}
      {stage >= 7 && (
        <g>
          {/* Re-render all blooms */}
          {renderDahliaBloom(100, 68, 1.15, 1.0, pfx, 'main-bloom-s7')}
          {renderDahliaBloom(68, 116, 0.65, 0.85, pfx, 'left-bloom-s7')}
          {renderDahliaBloom(132, 110, 0.55, 0.7, pfx, 'right-bloom-s7')}

          {/* Golden harvest glow */}
          <circle cx="100" cy="100" r="80" fill={`url(#${pfx('harvestGlow')})`} className="animate-pulse" />

          {/* Floating petal particles — mixed magenta and gold colors */}
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
              {/* Dahlia petal shape — pointed, slightly cupped */}
              <path
                d={`M ${p.x} ${p.y}
                    C ${p.x - 2} ${p.y - 4} ${p.x - 1.5} ${p.y - 10} ${p.x} ${p.y - 12}
                    C ${p.x + 1.5} ${p.y - 10} ${p.x + 2} ${p.y - 4} ${p.x} ${p.y}`}
                fill={p.color}
                opacity="0.55"
                transform={`rotate(${p.rot} ${p.x} ${p.y})`}
              />
              {/* Inner highlight */}
              <path
                d={`M ${p.x} ${p.y}
                    C ${p.x - 1} ${p.y - 2.5} ${p.x - 0.8} ${p.y - 7} ${p.x} ${p.y - 8}
                    C ${p.x + 0.8} ${p.y - 7} ${p.x + 1} ${p.y - 2.5} ${p.x} ${p.y}`}
                fill="#fff0f3"
                opacity="0.25"
                transform={`rotate(${p.rot} ${p.x} ${p.y})`}
              />
            </g>
          ))}
        </g>
      )}
    </g>
  );
}
