export function echinaceaGradients(pfx: (name: string) => string) {
  return (
    <>
      {/* Stem gradient — sturdy dark green */}
      <linearGradient id={pfx('echStem')} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#3a5a2a" />
        <stop offset="30%" stopColor="#4a6a30" />
        <stop offset="55%" stopColor="#5a7a3a" />
        <stop offset="80%" stopColor="#4a6a30" />
        <stop offset="100%" stopColor="#3a5a2a" />
      </linearGradient>

      {/* Stem highlight */}
      <linearGradient id={pfx('echStemHi')} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#6a9a48" stopOpacity="0" />
        <stop offset="40%" stopColor="#7aaa58" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#6a9a48" stopOpacity="0" />
      </linearGradient>

      {/* Leaf gradient — dark coarse green */}
      <linearGradient id={pfx('echLeaf')} x1="0" y1="0" x2="0.8" y2="1">
        <stop offset="0%" stopColor="#3a5a2a" />
        <stop offset="50%" stopColor="#4a6a30" />
        <stop offset="100%" stopColor="#2e4e22" />
      </linearGradient>

      {/* Leaf highlight */}
      <linearGradient id={pfx('echLeafHi')} x1="0.3" y1="0" x2="0.7" y2="1">
        <stop offset="0%" stopColor="#6a9a48" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#4a6a30" stopOpacity="0" />
      </linearGradient>

      {/* Petal gradient — pink-purple drooping petals */}
      <linearGradient id={pfx('echPetal')} x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor="#da70d6" />
        <stop offset="40%" stopColor="#c71585" />
        <stop offset="100%" stopColor="#ba55d3" />
      </linearGradient>

      {/* Inner petal — slightly lighter */}
      <linearGradient id={pfx('echPetalInner')} x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor="#e080d8" />
        <stop offset="40%" stopColor="#d060c0" />
        <stop offset="100%" stopColor="#c71585" />
      </linearGradient>

      {/* Cone gradient — orange-brown spiky dome */}
      <radialGradient id={pfx('echCone')} cx="45%" cy="35%" r="60%">
        <stop offset="0%" stopColor="#d2691e" />
        <stop offset="50%" stopColor="#cd853f" />
        <stop offset="100%" stopColor="#8b4513" />
      </radialGradient>

      {/* Cone highlight */}
      <radialGradient id={pfx('echConeHi')} cx="35%" cy="25%" r="40%">
        <stop offset="0%" stopColor="#e0a050" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#cd853f" stopOpacity="0" />
      </radialGradient>

      {/* Seed gradient — dark angular achene */}
      <linearGradient id={pfx('echSeedGrad')} x1="0.3" y1="0" x2="0.7" y2="1">
        <stop offset="0%" stopColor="#5a4030" />
        <stop offset="50%" stopColor="#3e2a1a" />
        <stop offset="100%" stopColor="#2a1a0e" />
      </linearGradient>

      {/* Bud sepal gradient */}
      <linearGradient id={pfx('echBudSepal')} x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor="#4a6a30" />
        <stop offset="100%" stopColor="#3a5a2a" />
      </linearGradient>
    </>
  );
}

/** Render a single coneflower head — cone on top, petals drooping down */
function renderConeflower(
  cx: number,
  cy: number,
  scale: number,
  rotation: number,
  petalCount: number,
  pfx: (name: string) => string,
  opening: number, // 0 = closed, 1 = fully open drooping
) {
  const coneRx = 8 * scale;
  const coneRy = 6 * scale;
  const petalLen = 20 * scale * opening;
  const droopAngle = 25 + opening * 45; // petals droop more as they open

  return (
    <g transform={`translate(${cx}, ${cy}) rotate(${rotation})`}>
      {/* Drooping petals — hanging DOWN from the cone base */}
      {Array.from({ length: petalCount }, (_, i) => {
        const spreadAngle = (360 / petalCount) * i;
        const petalDroop = droopAngle + (i % 3) * 5;
        const rad = (spreadAngle * Math.PI) / 180;
        // Petal attachment point at cone edge
        const attachX = Math.cos(rad) * coneRx * 0.7;
        const attachY = coneRy * 0.5;
        // Petal tip droops down and out
        const tipX = attachX + Math.cos(rad) * petalLen * 0.6;
        const tipY = attachY + Math.sin((petalDroop * Math.PI) / 180) * petalLen;
        const pw = 3 * scale;

        return (
          <path
            key={`petal-${i}`}
            d={`M ${attachX} ${attachY}
                C ${attachX + Math.cos(rad) * pw} ${attachY + petalLen * 0.2},
                  ${tipX - Math.cos(rad) * pw * 0.5} ${tipY - petalLen * 0.15},
                  ${tipX} ${tipY}
                C ${tipX + Math.cos(rad) * pw * 0.3} ${tipY + 1 * scale},
                  ${attachX - Math.cos(rad) * pw * 0.2} ${attachY + petalLen * 0.3},
                  ${attachX} ${attachY}`}
            fill={i % 2 === 0 ? `url(#${pfx('echPetal')})` : `url(#${pfx('echPetalInner')})`}
            opacity={0.85 + (i % 3) * 0.05}
          />
        );
      })}

      {/* Cone dome — raised, spiky, orange-brown */}
      <ellipse cx="0" cy="0" rx={coneRx} ry={coneRy} fill={`url(#${pfx('echCone')})`} />
      <ellipse cx="0" cy="0" rx={coneRx} ry={coneRy} fill={`url(#${pfx('echConeHi')})`} />
      {/* Cone outline */}
      <ellipse cx="0" cy="0" rx={coneRx} ry={coneRy} fill="none" stroke="#8b4513" strokeWidth={0.4 * scale} opacity="0.5" />

      {/* Spiky florets on cone surface */}
      {Array.from({ length: Math.floor(16 * scale) }, (_, i) => {
        const angle = (137.508 * i * Math.PI) / 180; // golden angle spiral
        const r = Math.sqrt(i) * 1.6 * scale;
        const sx = r * Math.cos(angle);
        const sy = r * Math.sin(angle) * (coneRy / coneRx); // squash to ellipse
        if (Math.sqrt(sx * sx + (sy * coneRx / coneRy) * (sy * coneRx / coneRy)) > coneRx * 0.85) return null;
        const spikeH = (1.5 + (i % 3) * 0.5) * scale;
        return (
          <g key={`spike-${i}`}>
            <line
              x1={sx}
              y1={sy}
              x2={sx}
              y2={sy - spikeH}
              stroke="#8b4513"
              strokeWidth={0.6 * scale}
              strokeLinecap="round"
              opacity="0.7"
            />
            <circle
              cx={sx}
              cy={sy - spikeH}
              r={0.5 * scale}
              fill="#d2691e"
              opacity="0.6"
            />
          </g>
        );
      })}
    </g>
  );
}

/** Render a rough, lance-shaped echinacea leaf with texture dots */
function renderEchinaceaLeaf(
  cx: number,
  baseY: number,
  length: number,
  angle: number,
  width: number,
  pfx: (name: string) => string,
) {
  const rad = (angle * Math.PI) / 180;
  const tipX = cx + Math.cos(rad) * length;
  const tipY = baseY + Math.sin(rad) * length;
  const perpX = -Math.sin(rad) * width;
  const perpY = Math.cos(rad) * width;
  const midX = (cx + tipX) / 2;
  const midY = (baseY + tipY) / 2;

  // Number of texture dots based on leaf size
  const dotCount = Math.floor(length / 4);

  return (
    <g filter={`url(#${pfx('softShadow')})`}>
      {/* Leaf body — lance-shaped */}
      <path
        d={`M ${cx} ${baseY}
            C ${cx + perpX * 0.3} ${baseY + perpY * 0.3},
              ${midX + perpX * 0.6} ${midY + perpY * 0.6},
              ${tipX} ${tipY}
            C ${midX - perpX * 0.6} ${midY - perpY * 0.6},
              ${cx - perpX * 0.3} ${baseY - perpY * 0.3},
              ${cx} ${baseY}`}
        fill={`url(#${pfx('echLeaf')})`}
      />
      {/* Leaf highlight overlay */}
      <path
        d={`M ${cx} ${baseY}
            C ${cx + perpX * 0.2} ${baseY + perpY * 0.2},
              ${midX + perpX * 0.4} ${midY + perpY * 0.4},
              ${tipX} ${tipY}
            C ${midX - perpX * 0.3} ${midY - perpY * 0.3},
              ${cx - perpX * 0.15} ${baseY - perpY * 0.15},
              ${cx} ${baseY}`}
        fill={`url(#${pfx('echLeafHi')})`}
        opacity="0.4"
      />
      {/* Central midrib */}
      <line
        x1={cx}
        y1={baseY}
        x2={tipX}
        y2={tipY}
        stroke="#2e4e22"
        strokeWidth="0.7"
        opacity="0.5"
      />
      {/* Rough texture dots — small bumps simulating hairy/coarse surface */}
      {Array.from({ length: dotCount }, (_, i) => {
        const t = (i + 1) / (dotCount + 1);
        const dx = cx + (tipX - cx) * t;
        const dy = baseY + (tipY - baseY) * t;
        const offsetScale = width * 0.3 * (1 - Math.abs(t - 0.5) * 1.6);
        return (
          <g key={`dot-${i}`}>
            <circle
              cx={dx + perpX * 0.2 * ((i % 2) * 2 - 1) * offsetScale / width}
              cy={dy + perpY * 0.2 * ((i % 2) * 2 - 1) * offsetScale / width}
              r="0.6"
              fill="#2e4e22"
              opacity="0.35"
            />
            <circle
              cx={dx - perpX * 0.15 * ((i % 3 === 0) ? 1 : -0.5) * offsetScale / width}
              cy={dy - perpY * 0.15 * ((i % 3 === 0) ? 1 : -0.5) * offsetScale / width}
              r="0.5"
              fill="#5a7a3a"
              opacity="0.25"
            />
          </g>
        );
      })}
      {/* Serrated edge suggestion — small zigzag strokes along edges */}
      {Array.from({ length: Math.floor(dotCount * 0.6) }, (_, i) => {
        const t = (i + 1) / (Math.floor(dotCount * 0.6) + 1);
        const dx = cx + (tipX - cx) * t;
        const dy = baseY + (tipY - baseY) * t;
        const edgeDist = width * 0.45 * Math.sin(t * Math.PI);
        return (
          <g key={`serr-${i}`}>
            <line
              x1={dx + perpX * edgeDist / width}
              y1={dy + perpY * edgeDist / width}
              x2={dx + perpX * (edgeDist + 1.2) / width}
              y2={dy + perpY * (edgeDist + 1.2) / width}
              stroke="#3a5a2a"
              strokeWidth="0.3"
              opacity="0.3"
            />
            <line
              x1={dx - perpX * edgeDist / width}
              y1={dy - perpY * edgeDist / width}
              x2={dx - perpX * (edgeDist + 1.2) / width}
              y2={dy - perpY * (edgeDist + 1.2) / width}
              stroke="#3a5a2a"
              strokeWidth="0.3"
              opacity="0.3"
            />
          </g>
        );
      })}
    </g>
  );
}

export function renderEchinacea(stage: number, pfx: (name: string) => string) {
  return (
    <g>
      {/* ── Stage 1: Seed — dark elongated achene on soil ── */}
      {stage >= 1 && stage < 2 && (
        <g transform="translate(100, 262)" filter={`url(#${pfx('softShadow')})`}>
          {/* Seed shadow */}
          <ellipse cx="1" cy="4" rx="4" ry="1.5" fill="#3a2518" opacity="0.2" />
          {/* Achene body — angular, elongated */}
          <path
            d="M -2 -6 L 0 -8 L 2 -6 L 2.5 0 L 1.5 5 L 0 6 L -1.5 5 L -2.5 0 Z"
            fill={`url(#${pfx('echSeedGrad')})`}
          />
          {/* Seed ridges */}
          <path d="M 0 -8 L 0 6" stroke="#5a4030" strokeWidth="0.4" fill="none" opacity="0.4" />
          <path d="M -1.2 -5 L -1.2 4.5" stroke="#4a3520" strokeWidth="0.3" fill="none" opacity="0.3" />
          <path d="M 1.2 -5 L 1.2 4.5" stroke="#4a3520" strokeWidth="0.3" fill="none" opacity="0.3" />
          {/* Seed outline */}
          <path
            d="M -2 -6 L 0 -8 L 2 -6 L 2.5 0 L 1.5 5 L 0 6 L -1.5 5 L -2.5 0 Z"
            fill="none"
            stroke="#3e2a1a"
            strokeWidth="0.4"
            opacity="0.5"
          />
          {/* Tiny pappus bristles at top */}
          <line x1="0" y1="-8" x2="-1" y2="-10" stroke="#8a7a60" strokeWidth="0.3" opacity="0.4" />
          <line x1="0" y1="-8" x2="0" y2="-10.5" stroke="#8a7a60" strokeWidth="0.3" opacity="0.4" />
          <line x1="0" y1="-8" x2="1" y2="-10" stroke="#8a7a60" strokeWidth="0.3" opacity="0.4" />
          {/* Highlight */}
          <path d="M -1 -4 L -0.5 -1 L -1 2" stroke="#7a6a50" strokeWidth="0.5" fill="none" opacity="0.2" />
        </g>
      )}

      {/* ── Stage 2: Basal rosette of rough dark green leaves ── */}
      {stage >= 2 && stage < 3 && (
        <g>
          {/* Small fibrous roots */}
          <g opacity="0.5">
            <path d="M 100 266 C 98 272 95 278 91 283" stroke="#7a5d3a" strokeWidth="0.9" fill="none" strokeLinecap="round" />
            <path d="M 100 266 C 102 273 105 279 110 284" stroke="#7a5d3a" strokeWidth="0.8" fill="none" strokeLinecap="round" />
            <path d="M 100 268 C 97 273 93 277 89 280" stroke="#7a5d3a" strokeWidth="0.5" fill="none" strokeLinecap="round" />
          </g>

          {/* Basal rosette — low, spreading leaves radiating from ground */}
          {renderEchinaceaLeaf(100, 260, 28, -155, 6, pfx)}
          {renderEchinaceaLeaf(100, 260, 30, -130, 7, pfx)}
          {renderEchinaceaLeaf(100, 260, 32, -105, 7, pfx)}
          {renderEchinaceaLeaf(100, 260, 30, -80, 7, pfx)}
          {renderEchinaceaLeaf(100, 260, 26, -55, 6, pfx)}
          {renderEchinaceaLeaf(100, 260, 24, -35, 5, pfx)}
          {/* Center bud suggestion */}
          <circle cx="100" cy="258" r="2.5" fill="#3a5a2a" opacity="0.6" />
          <circle cx="100" cy="258" r="1.5" fill="#4a6a30" opacity="0.4" />
        </g>
      )}

      {/* ── Stage 3: Multiple stems with rough lance-shaped leaves ── */}
      {stage >= 3 && (
        <g>
          {/* Roots */}
          <g opacity="0.5">
            <path d="M 100 266 C 97 274 93 282 87 290" stroke="#7a5d3a" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <path d="M 100 266 C 103 275 107 284 114 291" stroke="#7a5d3a" strokeWidth="1" fill="none" strokeLinecap="round" />
            <path d="M 100 269 C 96 274 91 279 86 282" stroke="#7a5d3a" strokeWidth="0.6" fill="none" strokeLinecap="round" />
            <path d="M 100 269 C 104 275 109 280 115 283" stroke="#7a5d3a" strokeWidth="0.6" fill="none" strokeLinecap="round" />
          </g>

          {/* Main stems — grow taller with stage */}
          {(() => {
            const mainTop = stage >= 6 ? 80 : stage >= 5 ? 95 : stage >= 4 ? 130 : 175;
            const mainSW = stage >= 5 ? 4.5 : stage >= 4 ? 4 : 3;
            const sideTop = stage >= 6 ? 105 : stage >= 5 ? 115 : stage >= 4 ? 150 : 195;
            const sideSW = stage >= 5 ? 3.5 : stage >= 4 ? 3 : 2.5;

            return (
              <g>
                {/* Main center stem */}
                <g filter={`url(#${pfx('softShadow')})`}>
                  <path
                    d={`M 100 262 C 101 240 99 ${mainTop + 40} 100 ${mainTop}`}
                    stroke={`url(#${pfx('echStem')})`}
                    strokeWidth={mainSW}
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d={`M 99.5 258 C 100.5 238 98.5 ${mainTop + 42} 99.5 ${mainTop + 3}`}
                    stroke={`url(#${pfx('echStemHi')})`}
                    strokeWidth={mainSW * 0.4}
                    fill="none"
                    strokeLinecap="round"
                  />
                </g>

                {/* Secondary stems — stage 5+ */}
                {stage >= 5 && (
                  <>
                    {/* Left branching stem */}
                    <g filter={`url(#${pfx('softShadow')})`}>
                      <path
                        d={`M 97 210 C 90 190 82 ${sideTop + 30} 78 ${sideTop}`}
                        stroke={`url(#${pfx('echStem')})`}
                        strokeWidth={sideSW}
                        fill="none"
                        strokeLinecap="round"
                      />
                      <path
                        d={`M 96.5 208 C 89.5 188 81.5 ${sideTop + 32} 77.5 ${sideTop + 3}`}
                        stroke={`url(#${pfx('echStemHi')})`}
                        strokeWidth={sideSW * 0.4}
                        fill="none"
                        strokeLinecap="round"
                      />
                    </g>
                    {/* Right branching stem */}
                    <g filter={`url(#${pfx('softShadow')})`}>
                      <path
                        d={`M 103 200 C 110 180 118 ${sideTop + 25} 122 ${sideTop}`}
                        stroke={`url(#${pfx('echStem')})`}
                        strokeWidth={sideSW}
                        fill="none"
                        strokeLinecap="round"
                      />
                      <path
                        d={`M 103.5 198 C 110.5 178 118.5 ${sideTop + 27} 122.5 ${sideTop + 3}`}
                        stroke={`url(#${pfx('echStemHi')})`}
                        strokeWidth={sideSW * 0.4}
                        fill="none"
                        strokeLinecap="round"
                      />
                    </g>
                  </>
                )}

                {/* Extra stems for stage 6 — fuller plant */}
                {stage >= 6 && (
                  <>
                    {/* Far left stem */}
                    <g filter={`url(#${pfx('softShadow')})`}>
                      <path
                        d="M 94 220 C 84 200 68 155 60 125"
                        stroke={`url(#${pfx('echStem')})`}
                        strokeWidth={sideSW * 0.85}
                        fill="none"
                        strokeLinecap="round"
                      />
                    </g>
                    {/* Far right stem */}
                    <g filter={`url(#${pfx('softShadow')})`}>
                      <path
                        d="M 106 215 C 116 195 132 150 140 120"
                        stroke={`url(#${pfx('echStem')})`}
                        strokeWidth={sideSW * 0.85}
                        fill="none"
                        strokeLinecap="round"
                      />
                    </g>
                  </>
                )}

                {/* ── Leaves along stems ── */}
                {/* Basal leaves — always present at stage 3+ */}
                {renderEchinaceaLeaf(98, 250, 30, -145, 7, pfx)}
                {renderEchinaceaLeaf(102, 248, 32, -35, 7, pfx)}
                {renderEchinaceaLeaf(97, 240, 26, -155, 6, pfx)}
                {renderEchinaceaLeaf(103, 238, 28, -25, 6, pfx)}

                {/* Mid-stem leaves — stage 4+ */}
                {stage >= 4 && (
                  <>
                    {renderEchinaceaLeaf(99, 210, 24, -140, 5.5, pfx)}
                    {renderEchinaceaLeaf(101, 205, 22, -40, 5, pfx)}
                    {renderEchinaceaLeaf(99, 185, 20, -150, 5, pfx)}
                    {renderEchinaceaLeaf(101, 180, 18, -30, 4.5, pfx)}
                  </>
                )}

                {/* Upper leaves — stage 5+ */}
                {stage >= 5 && (
                  <>
                    {renderEchinaceaLeaf(99, 165, 16, -145, 4, pfx)}
                    {renderEchinaceaLeaf(101, 160, 15, -35, 4, pfx)}
                    {/* Leaves on side stems */}
                    {renderEchinaceaLeaf(85, 170, 16, -155, 4, pfx)}
                    {renderEchinaceaLeaf(115, 165, 16, -25, 4, pfx)}
                  </>
                )}
              </g>
            );
          })()}
        </g>
      )}

      {/* ── Stage 4: Green buds at stem tops ── */}
      {stage >= 4 && stage < 5 && (
        <g>
          {/* Main bud — rounded green with developing cone visible */}
          <g transform="translate(100, 128)" filter={`url(#${pfx('softShadow')})`}>
            {/* Bud sepals — green wrapping */}
            <path
              d="M -7 4 C -8 -2 -6 -8 -3 -12 C -1 -14 1 -14 3 -12 C 6 -8 8 -2 7 4 C 5 8 3 10 0 10 C -3 10 -5 8 -7 4"
              fill={`url(#${pfx('echBudSepal')})`}
            />
            {/* Hint of the cone inside — darker top */}
            <ellipse cx="0" cy="-8" rx="4" ry="3" fill="#8b6530" opacity="0.5" />
            {/* Tiny petal tips peeking — pink-purple */}
            <path d="M -5 2 C -6 4 -7 7 -6 9" stroke="#c71585" strokeWidth="0.8" fill="none" opacity="0.5" strokeLinecap="round" />
            <path d="M 5 2 C 6 4 7 7 6 9" stroke="#c71585" strokeWidth="0.8" fill="none" opacity="0.5" strokeLinecap="round" />
            <path d="M -3 5 C -4 7 -4 10 -3 12" stroke="#ba55d3" strokeWidth="0.6" fill="none" opacity="0.4" strokeLinecap="round" />
            <path d="M 3 5 C 4 7 4 10 3 12" stroke="#ba55d3" strokeWidth="0.6" fill="none" opacity="0.4" strokeLinecap="round" />
            {/* Bud outline */}
            <path
              d="M -7 4 C -8 -2 -6 -8 -3 -12 C -1 -14 1 -14 3 -12 C 6 -8 8 -2 7 4 C 5 8 3 10 0 10 C -3 10 -5 8 -7 4"
              fill="none"
              stroke="#3a5a2a"
              strokeWidth="0.4"
              opacity="0.4"
            />
            {/* Highlight */}
            <path d="M -4 -6 C -3 -10 0 -12 2 -10" stroke="#6a9a48" strokeWidth="0.5" fill="none" opacity="0.3" />
          </g>
        </g>
      )}

      {/* ── Stage 5: 2-3 coneflowers opening ── */}
      {stage === 5 && (
        <g filter={`url(#${pfx('dropShadow')})`}>
          {/* Main flower — mostly open */}
          {renderConeflower(100, 88, 1, 0, 12, pfx, 0.85)}
          {/* Left flower — partially open, slightly tilted */}
          {renderConeflower(78, 108, 0.7, -10, 10, pfx, 0.6)}
          {/* Right flower — bud just opening */}
          {renderConeflower(122, 112, 0.6, 8, 8, pfx, 0.4)}
        </g>
      )}

      {/* ── Stage 6: 4-5 bold coneflowers at different heights ── */}
      {stage >= 6 && stage < 7 && (
        <g filter={`url(#${pfx('dropShadow')})`}>
          {/* Main center flower — fully open, dramatic droop */}
          {renderConeflower(100, 78, 1.1, 0, 14, pfx, 1)}
          {/* Left flower — bold, open */}
          {renderConeflower(78, 103, 0.9, -8, 12, pfx, 0.95)}
          {/* Right flower — bold, open */}
          {renderConeflower(122, 98, 0.85, 6, 12, pfx, 0.9)}
          {/* Far left flower — slightly smaller */}
          {renderConeflower(60, 123, 0.7, -12, 10, pfx, 0.85)}
          {/* Far right flower — slightly smaller */}
          {renderConeflower(140, 118, 0.7, 10, 10, pfx, 0.85)}
        </g>
      )}

      {/* ── Stage 7: Harvest — golden glow + floating pink petal particles ── */}
      {stage >= 7 && (
        <g>
          {/* Re-render the full bloom flowers */}
          <g filter={`url(#${pfx('dropShadow')})`}>
            {renderConeflower(100, 78, 1.1, 0, 14, pfx, 1)}
            {renderConeflower(78, 103, 0.9, -8, 12, pfx, 0.95)}
            {renderConeflower(122, 98, 0.85, 6, 12, pfx, 0.9)}
            {renderConeflower(60, 123, 0.7, -12, 10, pfx, 0.85)}
            {renderConeflower(140, 118, 0.7, 10, 10, pfx, 0.85)}
          </g>

          {/* Golden harvest glow */}
          <circle cx="100" cy="120" r="80" fill={`url(#${pfx('harvestGlow')})`} className="animate-pulse" />

          {/* Floating pink petal particles */}
          {[
            { x: 50, y: 60, rot: 25, delay: '0s' },
            { x: 150, y: 55, rot: -20, delay: '1.2s' },
            { x: 35, y: 90, rot: 40, delay: '2.5s' },
            { x: 165, y: 85, rot: -35, delay: '3.8s' },
            { x: 70, y: 50, rot: 15, delay: '1.8s' },
            { x: 130, y: 45, rot: -45, delay: '0.6s' },
            { x: 55, y: 75, rot: 30, delay: '2.0s' },
          ].map((p, i) => (
            <g key={`float-${i}`} className="animate-float-away" style={{ animationDelay: p.delay }}>
              {/* Floating drooping petal — pink-purple */}
              <path
                d={`M ${p.x} ${p.y}
                    C ${p.x - 2} ${p.y + 3} ${p.x - 1.5} ${p.y + 8} ${p.x} ${p.y + 10}
                    C ${p.x + 1.5} ${p.y + 8} ${p.x + 2} ${p.y + 3} ${p.x} ${p.y}`}
                fill="#c71585"
                opacity="0.5"
                transform={`rotate(${p.rot} ${p.x} ${p.y})`}
              />
              {/* Petal inner highlight */}
              <path
                d={`M ${p.x} ${p.y}
                    C ${p.x - 1} ${p.y + 2} ${p.x - 0.8} ${p.y + 6} ${p.x} ${p.y + 7}
                    C ${p.x + 0.8} ${p.y + 6} ${p.x + 1} ${p.y + 2} ${p.x} ${p.y}`}
                fill="#da70d6"
                opacity="0.3"
                transform={`rotate(${p.rot} ${p.x} ${p.y})`}
              />
            </g>
          ))}
        </g>
      )}
    </g>
  );
}
