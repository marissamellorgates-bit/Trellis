export function orchidGradients(pfx: (name: string) => string) {
  return (
    <>
      {/* Petal gradient — purple/magenta outer petals */}
      <radialGradient id={pfx('orchPetal')} cx="50%" cy="60%" r="70%">
        <stop offset="0%" stopColor="#e0b0ff" />
        <stop offset="40%" stopColor="#c77dff" />
        <stop offset="100%" stopColor="#9b30ff" />
      </radialGradient>

      {/* Sepal gradient — slightly greener purple */}
      <radialGradient id={pfx('orchSepal')} cx="50%" cy="60%" r="75%">
        <stop offset="0%" stopColor="#d8a0f0" />
        <stop offset="50%" stopColor="#b868e0" />
        <stop offset="100%" stopColor="#8a20d8" />
      </radialGradient>

      {/* Labellum (lip) gradient — hot pink with spots */}
      <radialGradient id={pfx('orchLip')} cx="50%" cy="40%" r="65%">
        <stop offset="0%" stopColor="#ff90c0" />
        <stop offset="50%" stopColor="#ff69b4" />
        <stop offset="100%" stopColor="#e04890" />
      </radialGradient>

      {/* Leaf gradient — thick, waxy dark green */}
      <linearGradient id={pfx('orchLeaf')} x1="0" y1="0" x2="1" y2="0.3">
        <stop offset="0%" stopColor="#2d5420" />
        <stop offset="30%" stopColor="#3a6828" />
        <stop offset="50%" stopColor="#4a7530" />
        <stop offset="70%" stopColor="#3a6828" />
        <stop offset="100%" stopColor="#2d5420" />
      </linearGradient>

      {/* Leaf highlight */}
      <linearGradient id={pfx('orchLeafHi')} x1="0.3" y1="0" x2="0.7" y2="1">
        <stop offset="0%" stopColor="#68a050" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#4a7530" stopOpacity="0" />
      </linearGradient>

      {/* Spike (flower stem) gradient */}
      <linearGradient id={pfx('orchSpike')} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#3a6828" />
        <stop offset="30%" stopColor="#4a7830" />
        <stop offset="70%" stopColor="#4a7830" />
        <stop offset="100%" stopColor="#3a6828" />
      </linearGradient>

      {/* Aerial root gradient — silvery tan */}
      <linearGradient id={pfx('orchRoot')} x1="0" y1="0" x2="1" y2="0.5">
        <stop offset="0%" stopColor="#c8b898" />
        <stop offset="40%" stopColor="#b8a890" />
        <stop offset="100%" stopColor="#a09078" />
      </linearGradient>

      {/* Bud gradient — closed bud, pale purple */}
      <linearGradient id={pfx('orchBud')} x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor="#d8a0f0" />
        <stop offset="50%" stopColor="#c080e0" />
        <stop offset="100%" stopColor="#9b60d0" />
      </linearGradient>

      {/* Seed gradient — tiny dust-like seeds */}
      <radialGradient id={pfx('orchSeed')} cx="40%" cy="35%" r="60%">
        <stop offset="0%" stopColor="#c8b898" />
        <stop offset="50%" stopColor="#a09078" />
        <stop offset="100%" stopColor="#786850" />
      </radialGradient>
    </>
  );
}

/** Render a single orchid bloom — classic phalaenopsis shape */
function renderBloom(
  cx: number,
  cy: number,
  scale: number,
  rotation: number,
  pfx: (name: string) => string,
  key: string,
) {
  return (
    <g key={key} transform={`translate(${cx}, ${cy}) rotate(${rotation}) scale(${scale})`} filter={`url(#${pfx('softShadow')})`}>
      {/* 3 Sepals — triangular arrangement (top, bottom-left, bottom-right) */}
      {/* Top (dorsal) sepal */}
      <path
        d="M 0 -2 C -4 -6 -5 -14 -3 -18 C -1 -20 1 -20 3 -18 C 5 -14 4 -6 0 -2"
        fill={`url(#${pfx('orchSepal')})`}
        opacity="0.85"
      />
      {/* Bottom-left (lateral) sepal */}
      <path
        d="M 0 0 C -6 2 -14 5 -17 9 C -18 12 -16 14 -13 13 C -10 11 -5 6 0 0"
        fill={`url(#${pfx('orchSepal')})`}
        opacity="0.8"
      />
      {/* Bottom-right (lateral) sepal */}
      <path
        d="M 0 0 C 6 2 14 5 17 9 C 18 12 16 14 13 13 C 10 11 5 6 0 0"
        fill={`url(#${pfx('orchSepal')})`}
        opacity="0.8"
      />

      {/* 2 Inner petals — wider, rounder */}
      {/* Left petal */}
      <path
        d="M 0 -1 C -5 -5 -12 -8 -15 -5 C -17 -2 -14 3 -10 5 C -6 6 -2 3 0 -1"
        fill={`url(#${pfx('orchPetal')})`}
        opacity="0.9"
      />
      {/* Right petal */}
      <path
        d="M 0 -1 C 5 -5 12 -8 15 -5 C 17 -2 14 3 10 5 C 6 6 2 3 0 -1"
        fill={`url(#${pfx('orchPetal')})`}
        opacity="0.9"
      />

      {/* Labellum (lip) — distinctive shape with contrasting color */}
      <path
        d="M 0 1 C -3 3 -6 6 -7 10 C -7 13 -5 15 -3 15 C -1 15 0 14 0 14 C 0 14 1 15 3 15 C 5 15 7 13 7 10 C 6 6 3 3 0 1"
        fill={`url(#${pfx('orchLip')})`}
        opacity="0.92"
      />
      {/* Lip spots — characteristic markings */}
      <circle cx="-2" cy="9" r="0.8" fill="#d03070" opacity="0.6" />
      <circle cx="2" cy="9" r="0.8" fill="#d03070" opacity="0.6" />
      <circle cx="0" cy="11" r="0.7" fill="#d03070" opacity="0.5" />
      <circle cx="-3" cy="12" r="0.5" fill="#d03070" opacity="0.4" />
      <circle cx="3" cy="12" r="0.5" fill="#d03070" opacity="0.4" />

      {/* Column — tiny central structure */}
      <path
        d="M -1 0 C -1 -2 0 -3 0 -3 C 0 -3 1 -2 1 0"
        fill="#e8d8f0"
        opacity="0.7"
      />
      {/* Anther cap — tiny yellow dot */}
      <circle cx="0" cy="-2.5" r="0.8" fill="#e8d060" opacity="0.7" />
    </g>
  );
}

/** Render a closed orchid bud */
function renderBud(
  cx: number,
  cy: number,
  scale: number,
  rotation: number,
  pfx: (name: string) => string,
  key: string,
) {
  return (
    <g key={key} transform={`translate(${cx}, ${cy}) rotate(${rotation}) scale(${scale})`}>
      {/* Bud body — elongated teardrop */}
      <path
        d="M 0 -8 C -2 -6 -3 -2 -3 2 C -3 5 -1.5 7 0 7 C 1.5 7 3 5 3 2 C 3 -2 2 -6 0 -8"
        fill={`url(#${pfx('orchBud')})`}
      />
      {/* Bud sepal wrapping */}
      <path
        d="M 0 7 C -2 5 -3 3 -3 2 C -2 1 0 0.5 0 0.5 C 0 0.5 2 1 3 2 C 3 3 2 5 0 7"
        fill="#4a7530"
        opacity="0.5"
      />
      {/* Bud highlight */}
      <path
        d="M -0.5 -6 C -1.5 -3 -1.5 0 -1 3"
        stroke="#e0c0ff"
        strokeWidth="0.6"
        fill="none"
        opacity="0.3"
      />
      {/* Bud stem stub */}
      <line x1="0" y1="7" x2="0" y2="10" stroke="#4a7830" strokeWidth="1" strokeLinecap="round" />
    </g>
  );
}

export function renderOrchid(stage: number, pfx: (name: string) => string) {
  return (
    <g>
      {/* ── Stage 1: Tiny dust-like orchid seed cluster ── */}
      {stage >= 1 && stage < 2 && (
        <g transform="translate(100, 265)" filter={`url(#${pfx('softShadow')})`}>
          {/* Ground shadow */}
          <ellipse cx="0" cy="3" rx="8" ry="1.5" fill="#3a2518" opacity="0.12" />
          {/* Dust-like seed cluster — scattered tiny dots */}
          {[
            { x: -3, y: 0, r: 0.8 },
            { x: -1, y: -1, r: 0.9 },
            { x: 1.5, y: 0.5, r: 0.7 },
            { x: 3, y: -0.5, r: 0.8 },
            { x: 0, y: 1, r: 0.6 },
            { x: -2, y: 1.5, r: 0.5 },
            { x: 2.5, y: 1.5, r: 0.5 },
            { x: -4, y: 1, r: 0.4 },
            { x: 4, y: 0, r: 0.4 },
            { x: -0.5, y: -1.5, r: 0.5 },
            { x: 1, y: -1.2, r: 0.6 },
            { x: -1.5, y: 0.8, r: 0.3 },
          ].map((s, i) => (
            <circle
              key={`seed-${i}`}
              cx={s.x}
              cy={s.y}
              r={s.r}
              fill={`url(#${pfx('orchSeed')})`}
              opacity={0.5 + (i % 3) * 0.15}
            />
          ))}
        </g>
      )}

      {/* ── Stage 2: 2 thick waxy leaves + tiny aerial roots ── */}
      {stage >= 2 && (
        <g>
          {/* Aerial roots — visible from stage 2 onward, grow with stage */}
          <g opacity="0.6">
            {/* Right aerial root */}
            <path
              d={`M 104 262 C 108 268 112 ${stage >= 4 ? 275 : 270} ${stage >= 4 ? 118 : 114} ${stage >= 4 ? 280 : 274}`}
              stroke={`url(#${pfx('orchRoot')})`}
              strokeWidth={stage >= 4 ? 2 : 1.5}
              fill="none"
              strokeLinecap="round"
            />
            {/* Left aerial root */}
            <path
              d={`M 96 264 C 92 270 88 ${stage >= 4 ? 278 : 272} ${stage >= 4 ? 83 : 86} ${stage >= 4 ? 282 : 276}`}
              stroke={`url(#${pfx('orchRoot')})`}
              strokeWidth={stage >= 4 ? 1.8 : 1.3}
              fill="none"
              strokeLinecap="round"
            />
            {/* Additional roots at higher stages */}
            {stage >= 3 && (
              <>
                <path
                  d={`M 107 260 C 114 264 120 ${stage >= 5 ? 272 : 268} ${stage >= 5 ? 125 : 122} ${stage >= 5 ? 278 : 272}`}
                  stroke={`url(#${pfx('orchRoot')})`}
                  strokeWidth={1.2}
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M 93 262 C 86 267 80 274 76 280"
                  stroke={`url(#${pfx('orchRoot')})`}
                  strokeWidth={1}
                  fill="none"
                  strokeLinecap="round"
                />
              </>
            )}
            {stage >= 5 && (
              <path
                d="M 100 266 C 100 274 98 282 96 288"
                stroke={`url(#${pfx('orchRoot')})`}
                strokeWidth={1.4}
                fill="none"
                strokeLinecap="round"
              />
            )}
            {/* Green root tips */}
            {stage >= 3 && (
              <>
                <circle cx={stage >= 4 ? 118 : 114} cy={stage >= 4 ? 280 : 274} r="1.5" fill="#5a9040" opacity="0.5" />
                <circle cx={stage >= 4 ? 83 : 86} cy={stage >= 4 ? 282 : 276} r="1.3" fill="#5a9040" opacity="0.5" />
              </>
            )}
          </g>

          {/* Leaf rosette — thick waxy ovals, count grows with stage */}
          {(() => {
            const leaves: Array<{ angle: number; length: number; width: number; opacity: number }> = [];
            if (stage >= 2) {
              leaves.push(
                { angle: -25, length: 40, width: 14, opacity: 0.9 },
                { angle: 20, length: 38, width: 13, opacity: 0.88 },
              );
            }
            if (stage >= 3) {
              leaves.push(
                { angle: -45, length: 44, width: 15, opacity: 0.85 },
                { angle: 40, length: 42, width: 14, opacity: 0.87 },
                { angle: -5, length: 36, width: 12, opacity: 0.9 },
              );
            }

            return leaves.map((leaf, i) => (
              <g
                key={`leaf-${i}`}
                transform={`translate(100, 258) rotate(${leaf.angle})`}
                filter={`url(#${pfx('softShadow')})`}
              >
                {/* Leaf body — thick fleshy oval */}
                <path
                  d={`M 0 0 C ${-leaf.width * 0.5} ${-leaf.length * 0.3} ${-leaf.width * 0.5} ${-leaf.length * 0.7} 0 ${-leaf.length}
                      C ${leaf.width * 0.5} ${-leaf.length * 0.7} ${leaf.width * 0.5} ${-leaf.length * 0.3} 0 0`}
                  fill={`url(#${pfx('orchLeaf')})`}
                  opacity={leaf.opacity}
                />
                {/* Leaf highlight */}
                <path
                  d={`M ${-leaf.width * 0.15} ${-leaf.length * 0.1}
                      C ${-leaf.width * 0.3} ${-leaf.length * 0.35} ${-leaf.width * 0.25} ${-leaf.length * 0.65} 0 ${-leaf.length * 0.9}`}
                  stroke="#68a050"
                  strokeWidth="0.8"
                  fill="none"
                  opacity="0.25"
                />
                {/* Central vein */}
                <line
                  x1="0" y1={-2}
                  x2="0" y2={-leaf.length * 0.9}
                  stroke="#2d5420"
                  strokeWidth="0.5"
                  opacity="0.3"
                />
              </g>
            ));
          })()}
        </g>
      )}

      {/* ── Stage 3: Flower spike just emerging from rosette ── */}
      {stage >= 3 && stage < 4 && (
        <g filter={`url(#${pfx('softShadow')})`}>
          {/* Short emerging spike */}
          <path
            d="M 100 252 C 100 245 101 235 102 225"
            stroke={`url(#${pfx('orchSpike')})`}
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          {/* Spike tip — rounded growth point */}
          <circle cx="102" cy="224" r="2" fill="#5a8838" opacity="0.7" />
        </g>
      )}

      {/* ── Stage 4: Tall arching spike with buds ── */}
      {stage >= 4 && (
        <g>
          {/* Main arching spike — curves elegantly to the right */}
          <path
            d="M 100 255 C 100 230 102 200 108 170 C 114 140 125 115 140 100"
            stroke={`url(#${pfx('orchSpike')})`}
            strokeWidth={stage >= 5 ? 3 : 2.5}
            fill="none"
            strokeLinecap="round"
            filter={`url(#${pfx('softShadow')})`}
          />
          {/* Spike highlight */}
          <path
            d="M 99 252 C 99 228 101 198 107 168 C 113 138 124 113 139 98"
            stroke="#68a050"
            strokeWidth="0.6"
            fill="none"
            strokeLinecap="round"
            opacity="0.25"
          />

          {/* Stage 4: Buds only (no open blooms) */}
          {stage === 4 && (
            <g>
              {/* Buds arranged along the arching spike */}
              {renderBud(122, 148, 0.8, 15, pfx, 'bud-1')}
              {renderBud(114, 165, 0.7, 10, pfx, 'bud-2')}
              {renderBud(130, 132, 0.85, 20, pfx, 'bud-3')}
              {renderBud(136, 118, 0.9, 28, pfx, 'bud-4')}
              {renderBud(140, 105, 0.75, 35, pfx, 'bud-5')}
            </g>
          )}

          {/* Stage 5: First 2-3 blooms + remaining buds */}
          {stage === 5 && (
            <g>
              {/* Open blooms — lower ones bloom first */}
              {renderBloom(113, 168, 0.7, -5, pfx, 'bloom-1')}
              {renderBloom(121, 150, 0.8, 5, pfx, 'bloom-2')}
              {renderBloom(129, 134, 0.75, 12, pfx, 'bloom-3')}
              {/* Remaining buds — upper portion */}
              {renderBud(136, 118, 0.8, 25, pfx, 'bud-s5-1')}
              {renderBud(140, 105, 0.7, 32, pfx, 'bud-s5-2')}
            </g>
          )}

          {/* Stage 6: Full bloom — 5-7 open flowers */}
          {stage >= 6 && stage < 7 && (
            <g>
              {/* All blooms along the elegant arch — varying sizes */}
              {renderBloom(108, 180, 0.6, -10, pfx, 'bloom-f1')}
              {renderBloom(113, 165, 0.75, -5, pfx, 'bloom-f2')}
              {renderBloom(120, 150, 0.85, 3, pfx, 'bloom-f3')}
              {renderBloom(128, 135, 0.9, 10, pfx, 'bloom-f4')}
              {renderBloom(135, 120, 0.85, 18, pfx, 'bloom-f5')}
              {renderBloom(140, 107, 0.75, 25, pfx, 'bloom-f6')}
              {renderBloom(143, 96, 0.6, 32, pfx, 'bloom-f7')}
            </g>
          )}

          {/* Stage 7: Harvest — same blooms but with golden glow + floating petals */}
          {stage >= 7 && (
            <g>
              {/* Re-render all blooms */}
              {renderBloom(108, 180, 0.6, -10, pfx, 'bloom-h1')}
              {renderBloom(113, 165, 0.75, -5, pfx, 'bloom-h2')}
              {renderBloom(120, 150, 0.85, 3, pfx, 'bloom-h3')}
              {renderBloom(128, 135, 0.9, 10, pfx, 'bloom-h4')}
              {renderBloom(135, 120, 0.85, 18, pfx, 'bloom-h5')}
              {renderBloom(140, 107, 0.75, 25, pfx, 'bloom-h6')}
              {renderBloom(143, 96, 0.6, 32, pfx, 'bloom-h7')}

              {/* Golden harvest glow */}
              <circle
                cx="125"
                cy="140"
                r="80"
                fill={`url(#${pfx('harvestGlow')})`}
                className="animate-pulse"
              />

              {/* Floating purple petal particles */}
              {[
                { x: 80, y: 90, rot: 25, delay: '0s' },
                { x: 155, y: 85, rot: -20, delay: '1.2s' },
                { x: 60, y: 120, rot: 40, delay: '2.5s' },
                { x: 165, y: 110, rot: -35, delay: '3.8s' },
                { x: 90, y: 70, rot: 55, delay: '1.8s' },
                { x: 150, y: 130, rot: -45, delay: '0.6s' },
                { x: 70, y: 145, rot: 15, delay: '3.0s' },
                { x: 140, y: 75, rot: -60, delay: '2.0s' },
              ].map((p, i) => (
                <g key={`float-${i}`} className="animate-float-away" style={{ animationDelay: p.delay }}>
                  {/* Floating orchid petal — purple */}
                  <path
                    d={`M ${p.x} ${p.y}
                        C ${p.x - 3} ${p.y - 5} ${p.x - 2} ${p.y - 10} ${p.x} ${p.y - 12}
                        C ${p.x + 2} ${p.y - 10} ${p.x + 3} ${p.y - 5} ${p.x} ${p.y}`}
                    fill="#c77dff"
                    opacity="0.5"
                    transform={`rotate(${p.rot} ${p.x} ${p.y})`}
                  />
                  {/* Inner highlight */}
                  <path
                    d={`M ${p.x} ${p.y}
                        C ${p.x - 1.5} ${p.y - 3} ${p.x - 1} ${p.y - 7} ${p.x} ${p.y - 8}
                        C ${p.x + 1} ${p.y - 7} ${p.x + 1.5} ${p.y - 3} ${p.x} ${p.y}`}
                    fill="#e0b0ff"
                    opacity="0.3"
                    transform={`rotate(${p.rot} ${p.x} ${p.y})`}
                  />
                </g>
              ))}
            </g>
          )}
        </g>
      )}
    </g>
  );
}
