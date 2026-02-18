export const isDesertPlant = true;

export function agaveGradients(pfx: (name: string) => string) {
  return (
    <>
      {/* Thick blue-green leaf gradient */}
      <linearGradient id={pfx('agvLeaf')} x1="0" y1="0" x2="1" y2="0.4">
        <stop offset="0%" stopColor="#3a6858" />
        <stop offset="20%" stopColor="#4a7a6a" />
        <stop offset="50%" stopColor="#5a8a78" />
        <stop offset="80%" stopColor="#4a7a6a" />
        <stop offset="100%" stopColor="#3a6858" />
      </linearGradient>

      {/* Leaf highlight — subtle sheen on upper surface */}
      <linearGradient id={pfx('agvLeafHi')} x1="0" y1="0" x2="0.8" y2="0.6">
        <stop offset="0%" stopColor="#6a9a88" stopOpacity="0" />
        <stop offset="30%" stopColor="#7aaa98" stopOpacity="0.25" />
        <stop offset="50%" stopColor="#8abaa8" stopOpacity="0.35" />
        <stop offset="70%" stopColor="#7aaa98" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#6a9a88" stopOpacity="0" />
      </linearGradient>

      {/* Towering flower stalk gradient */}
      <linearGradient id={pfx('agvStalk')} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#8aa858" />
        <stop offset="30%" stopColor="#7a9048" />
        <stop offset="70%" stopColor="#6a803a" />
        <stop offset="100%" stopColor="#5a7030" />
      </linearGradient>

      {/* Flower cluster gradient — yellow-green */}
      <radialGradient id={pfx('agvFlower')} cx="40%" cy="35%" r="60%">
        <stop offset="0%" stopColor="#d8c450" />
        <stop offset="40%" stopColor="#c8b040" />
        <stop offset="100%" stopColor="#a89830" />
      </radialGradient>

      {/* Sandy soil for desert plants */}
      <linearGradient id={pfx('sandSoil')} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#d4b880" />
        <stop offset="40%" stopColor="#c4a265" />
        <stop offset="100%" stopColor="#a08050" />
      </linearGradient>

      {/* Seed gradient */}
      <linearGradient id={pfx('agvSeedGrad')} x1="0.3" y1="0" x2="0.7" y2="1">
        <stop offset="0%" stopColor="#7a6040" />
        <stop offset="50%" stopColor="#5a4530" />
        <stop offset="100%" stopColor="#3a2818" />
      </linearGradient>
    </>
  );
}

/** Render a single agave leaf as a thick, stiff pointed shape with dark spine tip */
function agaveLeaf(
  cx: number,
  baseY: number,
  angle: number,
  length: number,
  width: number,
  pfx: (name: string) => string,
  key: string,
) {
  return (
    <g key={key} transform={`translate(${cx}, ${baseY}) rotate(${angle})`}>
      {/* Leaf body — thick, stiff, pointed */}
      <path
        d={`M 0 0
            C ${-width * 0.5} ${-length * 0.1} ${-width * 0.55} ${-length * 0.4} ${-width * 0.35} ${-length * 0.8}
            L 0 ${-length}
            L ${width * 0.35} ${-length * 0.8}
            C ${width * 0.55} ${-length * 0.4} ${width * 0.5} ${-length * 0.1} 0 0`}
        fill={`url(#${pfx('agvLeaf')})`}
      />
      {/* Highlight overlay */}
      <path
        d={`M 0 ${-length * 0.05}
            C ${-width * 0.3} ${-length * 0.15} ${-width * 0.35} ${-length * 0.45} ${-width * 0.2} ${-length * 0.75}
            L 0 ${-length * 0.95}
            L ${width * 0.2} ${-length * 0.75}
            C ${width * 0.35} ${-length * 0.45} ${width * 0.3} ${-length * 0.15} 0 ${-length * 0.05}`}
        fill={`url(#${pfx('agvLeafHi')})`}
      />
      {/* Central groove line */}
      <line
        x1="0" y1={-length * 0.05}
        x2="0" y2={-length * 0.9}
        stroke="#3a5a4a"
        strokeWidth="0.6"
        opacity="0.3"
      />
      {/* Leaf edge lines — lighter for definition */}
      <path
        d={`M ${-width * 0.48} ${-length * 0.15}
            C ${-width * 0.53} ${-length * 0.4} ${-width * 0.34} ${-length * 0.78} 0 ${-length}`}
        stroke="#6a9a88"
        strokeWidth="0.3"
        fill="none"
        opacity="0.25"
      />
      <path
        d={`M ${width * 0.48} ${-length * 0.15}
            C ${width * 0.53} ${-length * 0.4} ${width * 0.34} ${-length * 0.78} 0 ${-length}`}
        stroke="#6a9a88"
        strokeWidth="0.3"
        fill="none"
        opacity="0.25"
      />
      {/* Dark terminal spine at tip */}
      <path
        d={`M ${-width * 0.06} ${-length * 0.92} L 0 ${-length - 3} L ${width * 0.06} ${-length * 0.92}`}
        fill="#2a1808"
      />
      {/* Spine highlight */}
      <line
        x1="0" y1={-length * 0.93}
        x2="0" y2={-length - 2.5}
        stroke="#4a3018"
        strokeWidth="0.3"
        opacity="0.5"
      />
    </g>
  );
}

export function renderAgave(stage: number, pfx: (name: string) => string) {
  return (
    <g>
      {/* ── Stage 1: Dark brown seed near soil ── */}
      {stage >= 1 && (
        <g transform="translate(100, 262)" filter={`url(#${pfx('softShadow')})`}>
          {/* Ground shadow */}
          <ellipse cx="0" cy="5" rx="5" ry="1.8" fill="#8a7040" opacity="0.2" />
          {/* Seed body — dark brown, round */}
          <ellipse cx="0" cy="0" rx="4" ry="4.5" fill={`url(#${pfx('agvSeedGrad')})`} />
          {/* Seed outline */}
          <ellipse cx="0" cy="0" rx="4" ry="4.5" fill="none" stroke="#3a2818" strokeWidth="0.5" opacity="0.5" />
          {/* Seed highlight */}
          <ellipse cx="-1.2" cy="-1.2" rx="1.5" ry="2" fill="#8a7050" opacity="0.25" />
          {/* Seed texture lines */}
          <path d="M -2 -2.5 Q 0 -3.5 2 -2.5" stroke="#3a2818" strokeWidth="0.35" fill="none" opacity="0.4" />
          <path d="M -2.5 -0.5 Q 0 -1.5 2.5 -0.5" stroke="#3a2818" strokeWidth="0.3" fill="none" opacity="0.35" />
          <path d="M -2 1.5 Q 0 0.5 2 1.5" stroke="#3a2818" strokeWidth="0.25" fill="none" opacity="0.3" />
          {/* Hilum (seed scar) */}
          <ellipse cx="0" cy="-4" rx="0.8" ry="0.4" fill="#4a3520" opacity="0.4" />
        </g>
      )}

      {/* ── Stage 2: Roots spreading + 2 first pointed leaves ── */}
      {stage >= 2 && (
        <g>
          {/* Underground roots — agave roots spread wide and shallow */}
          <g opacity="0.5">
            <path d="M 100 267 C 92 270 80 273 65 275" stroke="#6b5535" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M 100 267 C 108 270 120 273 135 275" stroke="#6b5535" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M 100 269 C 94 272 82 276 70 278" stroke="#7a6a4a" strokeWidth="0.8" fill="none" strokeLinecap="round" />
            <path d="M 100 269 C 106 272 118 276 130 278" stroke="#7a6a4a" strokeWidth="0.8" fill="none" strokeLinecap="round" />
            {/* Fine root tips */}
            <path d="M 67 275 C 62 276 57 276 52 275" stroke="#7a6a4a" strokeWidth="0.4" fill="none" strokeLinecap="round" />
            <path d="M 133 275 C 138 276 143 276 148 275" stroke="#7a6a4a" strokeWidth="0.4" fill="none" strokeLinecap="round" />
            {/* Short taproot */}
            <path d="M 100 268 C 100 275 99 282 98 288" stroke="#6b5535" strokeWidth="1" fill="none" strokeLinecap="round" />
          </g>

          {/* Two first pointed leaves emerging from center */}
          <g filter={`url(#${pfx('softShadow')})`}>
            {agaveLeaf(100, 262, -15, 28, 8, pfx, 'leaf2-l')}
            {agaveLeaf(100, 262, 12, 25, 7, pfx, 'leaf2-r')}
          </g>
        </g>
      )}

      {/* ── Stage 3: Compact rosette — 4-5 stiff pointed leaves ── */}
      {stage >= 3 && stage < 4 && (
        <g filter={`url(#${pfx('softShadow')})`}>
          {/* Back leaves */}
          {agaveLeaf(100, 264, -35, 38, 10, pfx, 'leaf3-bl')}
          {agaveLeaf(100, 264, 30, 36, 9, pfx, 'leaf3-br')}
          {/* Side leaves */}
          {agaveLeaf(100, 264, -18, 42, 11, pfx, 'leaf3-ml')}
          {agaveLeaf(100, 264, 15, 40, 10, pfx, 'leaf3-mr')}
          {/* Center leaf */}
          {agaveLeaf(100, 264, 0, 44, 10, pfx, 'leaf3-c')}
        </g>
      )}

      {/* ── Stage 4: Large spreading rosette — 8-10 thick leaves ── */}
      {stage >= 4 && stage < 5 && (
        <g filter={`url(#${pfx('softShadow')})`}>
          {/* Outermost leaves — wide spreading */}
          {agaveLeaf(100, 265, -55, 48, 12, pfx, 'leaf4-fl')}
          {agaveLeaf(100, 265, 50, 46, 11, pfx, 'leaf4-fr')}
          {/* Outer leaves */}
          {agaveLeaf(100, 265, -40, 55, 13, pfx, 'leaf4-ol')}
          {agaveLeaf(100, 265, 38, 53, 12, pfx, 'leaf4-or')}
          {/* Middle leaves */}
          {agaveLeaf(100, 265, -25, 60, 14, pfx, 'leaf4-ml')}
          {agaveLeaf(100, 265, 22, 58, 13, pfx, 'leaf4-mr')}
          {/* Inner leaves */}
          {agaveLeaf(100, 265, -10, 65, 14, pfx, 'leaf4-il')}
          {agaveLeaf(100, 265, 8, 63, 13, pfx, 'leaf4-ir')}
          {/* Center leaf */}
          {agaveLeaf(100, 265, 0, 70, 14, pfx, 'leaf4-c')}
        </g>
      )}

      {/* ── Stage 5: Full massive agave rosette — 15+ large thick leaves ── */}
      {stage >= 5 && (
        <g filter={`url(#${pfx('softShadow')})`}>
          {/* Ground-level outermost leaves — nearly horizontal */}
          {agaveLeaf(100, 266, -72, 52, 13, pfx, 'leaf5-gfl')}
          {agaveLeaf(100, 266, 68, 50, 12, pfx, 'leaf5-gfr')}
          {agaveLeaf(100, 266, -85, 44, 11, pfx, 'leaf5-gxl')}
          {agaveLeaf(100, 266, 82, 42, 10, pfx, 'leaf5-gxr')}

          {/* Outer ring — spreading wide */}
          {agaveLeaf(100, 266, -58, 60, 14, pfx, 'leaf5-ofl')}
          {agaveLeaf(100, 266, 55, 58, 13, pfx, 'leaf5-ofr')}
          {agaveLeaf(100, 266, -45, 68, 15, pfx, 'leaf5-ol')}
          {agaveLeaf(100, 266, 42, 66, 14, pfx, 'leaf5-or')}

          {/* Middle ring */}
          {agaveLeaf(100, 266, -32, 78, 16, pfx, 'leaf5-ml')}
          {agaveLeaf(100, 266, 30, 76, 15, pfx, 'leaf5-mr')}
          {agaveLeaf(100, 266, -18, 88, 16, pfx, 'leaf5-mil')}
          {agaveLeaf(100, 266, 16, 86, 15, pfx, 'leaf5-mir')}

          {/* Inner ring */}
          {agaveLeaf(100, 266, -8, 100, 16, pfx, 'leaf5-il')}
          {agaveLeaf(100, 266, 6, 98, 15, pfx, 'leaf5-ir')}

          {/* Center leaf — tallest, reaches ~150 */}
          {agaveLeaf(100, 266, 0, 116, 16, pfx, 'leaf5-c')}
        </g>
      )}

      {/* ── Stage 6: The quiote — towering flower stalk ── */}
      {stage >= 6 && (
        <g>
          {/* Stalk shadow */}
          <rect x="97.5" y="52" width="7" height="215" rx="3" fill="#1a2a10" opacity="0.08" transform="translate(2, 2)" />

          {/* Main towering stalk — shoots straight up from center */}
          <rect
            x="97"
            y="50"
            width="6"
            height="216"
            rx="3"
            fill={`url(#${pfx('agvStalk')})`}
          />

          {/* Stalk highlight — cylindrical sheen */}
          <rect
            x="98.5"
            y="50"
            width="2.5"
            height="216"
            rx="1.2"
            fill="#8aaa58"
            opacity="0.2"
          />

          {/* Stalk nodes/rings */}
          {[80, 120, 160, 200, 240].map((y, i) => (
            <g key={`node-${i}`}>
              <ellipse cx="100" cy={y} rx="4" ry="1" fill="#5a7030" opacity="0.3" />
              <ellipse cx="100" cy={y + 0.5} rx="3.8" ry="0.8" fill="#8aa858" opacity="0.15" />
            </g>
          ))}

          {/* Branching flower clusters at top — characteristic candelabra shape */}
          {/* Central cluster */}
          <g transform="translate(100, 50)" filter={`url(#${pfx('softShadow')})`}>
            {/* Central flower ball */}
            <circle cx="0" cy="-8" r="8" fill={`url(#${pfx('agvFlower')})`} />
            <circle cx="-2" cy="-10" r="3" fill="#d8d060" opacity="0.3" />
            {/* Tiny flower detail dots */}
            {Array.from({ length: 8 }, (_, i) => {
              const a = (360 / 8) * i;
              const rad = (a * Math.PI) / 180;
              return (
                <circle
                  key={`cf-${i}`}
                  cx={Math.cos(rad) * 5}
                  cy={-8 + Math.sin(rad) * 5}
                  r="1.2"
                  fill="#e0c840"
                  opacity="0.6"
                />
              );
            })}
          </g>

          {/* Side flower branches — left side */}
          {[
            { bx: -18, by: 68, angle: -30, len: 22, r: 6 },
            { bx: -24, by: 88, angle: -40, len: 28, r: 7 },
            { bx: -20, by: 110, angle: -35, len: 24, r: 5.5 },
            { bx: -14, by: 130, angle: -25, len: 18, r: 5 },
          ].map((b, i) => (
            <g key={`lbranch-${i}`}>
              {/* Branch stem */}
              <line
                x1="100"
                y1={b.by}
                x2={100 + b.bx}
                y2={b.by - b.len * 0.5}
                stroke="#6a803a"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* Flower cluster */}
              <circle
                cx={100 + b.bx}
                cy={b.by - b.len * 0.5}
                r={b.r}
                fill={`url(#${pfx('agvFlower')})`}
                filter={`url(#${pfx('softShadow')})`}
              />
              <circle
                cx={100 + b.bx - 1}
                cy={b.by - b.len * 0.5 - 1.5}
                r={b.r * 0.35}
                fill="#d8d060"
                opacity="0.3"
              />
              {/* Small flower dots */}
              {Array.from({ length: 5 }, (_, j) => {
                const a = (360 / 5) * j + i * 20;
                const rad = (a * Math.PI) / 180;
                return (
                  <circle
                    key={`lf-${i}-${j}`}
                    cx={100 + b.bx + Math.cos(rad) * (b.r * 0.65)}
                    cy={b.by - b.len * 0.5 + Math.sin(rad) * (b.r * 0.65)}
                    r="1"
                    fill="#e0c840"
                    opacity="0.5"
                  />
                );
              })}
            </g>
          ))}

          {/* Side flower branches — right side */}
          {[
            { bx: 18, by: 72, angle: 30, len: 22, r: 6 },
            { bx: 22, by: 95, angle: 35, len: 26, r: 6.5 },
            { bx: 18, by: 118, angle: 30, len: 22, r: 5.5 },
            { bx: 12, by: 138, angle: 20, len: 16, r: 4.5 },
          ].map((b, i) => (
            <g key={`rbranch-${i}`}>
              {/* Branch stem */}
              <line
                x1="100"
                y1={b.by}
                x2={100 + b.bx}
                y2={b.by - b.len * 0.5}
                stroke="#6a803a"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* Flower cluster */}
              <circle
                cx={100 + b.bx}
                cy={b.by - b.len * 0.5}
                r={b.r}
                fill={`url(#${pfx('agvFlower')})`}
                filter={`url(#${pfx('softShadow')})`}
              />
              <circle
                cx={100 + b.bx + 1}
                cy={b.by - b.len * 0.5 - 1.5}
                r={b.r * 0.35}
                fill="#d8d060"
                opacity="0.3"
              />
              {/* Small flower dots */}
              {Array.from({ length: 5 }, (_, j) => {
                const a = (360 / 5) * j + i * 25;
                const rad = (a * Math.PI) / 180;
                return (
                  <circle
                    key={`rf-${i}-${j}`}
                    cx={100 + b.bx + Math.cos(rad) * (b.r * 0.65)}
                    cy={b.by - b.len * 0.5 + Math.sin(rad) * (b.r * 0.65)}
                    r="1"
                    fill="#e0c840"
                    opacity="0.5"
                  />
                );
              })}
            </g>
          ))}
        </g>
      )}

      {/* ── Stage 7: Golden harvest glow + floating particles ── */}
      {stage >= 7 && (
        <g>
          {/* Harvest aura */}
          <circle
            cx="100"
            cy="160"
            r="100"
            fill={`url(#${pfx('harvestGlow')})`}
            className="animate-pulse"
          />

          {/* Floating golden particles — ascending from the agave */}
          {[
            { x: 60, y: 60, delay: '0s', r: 2.5 },
            { x: 140, y: 55, delay: '0.8s', r: 2 },
            { x: 45, y: 90, delay: '1.6s', r: 2.2 },
            { x: 155, y: 85, delay: '2.4s', r: 1.8 },
            { x: 75, y: 40, delay: '3.2s', r: 2 },
            { x: 125, y: 45, delay: '1.0s', r: 1.5 },
            { x: 85, y: 75, delay: '2.0s', r: 2.3 },
            { x: 115, y: 70, delay: '3.6s', r: 1.8 },
            { x: 100, y: 30, delay: '0.4s', r: 2 },
            { x: 55, y: 120, delay: '1.4s', r: 1.6 },
          ].map((s, i) => (
            <g key={`float-${i}`} className="animate-float-away" style={{ animationDelay: s.delay }}>
              {/* Outer glow */}
              <circle
                cx={s.x}
                cy={s.y}
                r={s.r}
                fill="#ffd700"
                opacity="0.45"
              />
              {/* Inner bright core */}
              <circle
                cx={s.x}
                cy={s.y}
                r={s.r * 0.4}
                fill="#fff8c4"
                opacity="0.55"
              />
            </g>
          ))}
        </g>
      )}
    </g>
  );
}
