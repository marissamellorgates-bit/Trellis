export function fernGradients(pfx: (name: string) => string) {
  return (
    <>
      {/* Frond body gradient — dark forest green to lighter green */}
      <linearGradient id={pfx('fernFrond')} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#5aa848" />
        <stop offset="40%" stopColor="#3d8030" />
        <stop offset="100%" stopColor="#2a6e20" />
      </linearGradient>

      {/* Individual pinna (leaflet) gradient */}
      <linearGradient id={pfx('fernPinna')} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#60b050" />
        <stop offset="50%" stopColor="#48903c" />
        <stop offset="100%" stopColor="#3a7a2e" />
      </linearGradient>

      {/* Fiddlehead coil gradient */}
      <radialGradient id={pfx('fernFiddlehead')} cx="40%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#5caa48" />
        <stop offset="50%" stopColor="#4a9040" />
        <stop offset="100%" stopColor="#367830" />
      </radialGradient>

      {/* Rachis (central stem of frond) */}
      <linearGradient id={pfx('fernRachis')} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#2a5e18" />
        <stop offset="30%" stopColor="#3d7030" />
        <stop offset="70%" stopColor="#3d7030" />
        <stop offset="100%" stopColor="#2a5e18" />
      </linearGradient>

      {/* Spore (sori) gradient */}
      <radialGradient id={pfx('fernSpore')} cx="40%" cy="35%" r="55%">
        <stop offset="0%" stopColor="#a0845a" />
        <stop offset="100%" stopColor="#8b6d3f" />
      </radialGradient>
    </>
  );
}

/** Generate pinnae (leaflets) along one side of a frond rachis */
function pinnae(
  side: 'left' | 'right',
  count: number,
  rachisLength: number,
  pfx: (name: string) => string,
  pinnaScale: number = 1,
  showSori: boolean = false,
) {
  const dir = side === 'left' ? -1 : 1;
  return Array.from({ length: count }, (_, i) => {
    const t = (i + 1) / (count + 1); // position along rachis 0..1
    const y = -rachisLength * t;
    // pinnae get smaller toward tip
    const size = pinnaScale * (1 - t * 0.5);
    const w = 8 * size;
    const h = 3.5 * size;
    const angle = dir * (30 + t * 15);

    return (
      <g key={`${side}-${i}`} transform={`translate(0, ${y}) rotate(${angle})`}>
        {/* Pinna shape — teardrop leaf */}
        <path
          d={`M 0 0 C ${dir * w * 0.3} ${-h * 0.6} ${dir * w * 0.8} ${-h * 0.8} ${dir * w} ${-h * 0.2}
              C ${dir * w * 0.9} ${h * 0.3} ${dir * w * 0.4} ${h * 0.5} 0 0`}
          fill={`url(#${pfx('fernPinna')})`}
          opacity={0.85 + t * 0.1}
        />
        {/* Pinna midvein */}
        <line
          x1="0" y1="0"
          x2={dir * w * 0.85} y2={-h * 0.1}
          stroke="#3d7030"
          strokeWidth={0.4 * size}
          opacity="0.5"
        />
        {/* Sori (spore dots) on underside — stage 6+ */}
        {showSori && i % 2 === 0 && (
          <circle
            cx={dir * w * 0.6}
            cy={h * 0.15}
            r={1.2 * size}
            fill={`url(#${pfx('fernSpore')})`}
            opacity="0.75"
          />
        )}
      </g>
    );
  });
}

/** Render a complete frond with rachis and pinnae on both sides */
function renderFrondWithPinnae(
  cx: number,
  baseY: number,
  topY: number,
  curve: number,
  rotation: number,
  pinnaCount: number,
  pfx: (name: string) => string,
  pinnaScale: number = 1,
  showSori: boolean = false,
  rachisWidth: number = 2,
) {
  const rachisLength = baseY - topY;
  return (
    <g transform={`translate(${cx}, ${baseY}) rotate(${rotation})`} filter={`url(#${pfx('softShadow')})` }>
      {/* Rachis (central stem) */}
      <path
        d={`M 0 0 C ${curve * 0.3} ${-rachisLength * 0.3} ${curve * 0.6} ${-rachisLength * 0.7} ${curve} ${-rachisLength}`}
        stroke={`url(#${pfx('fernRachis')})`}
        strokeWidth={rachisWidth}
        fill="none"
        strokeLinecap="round"
      />
      {/* Pinnae along both sides */}
      <g transform={`translate(${curve * 0.05}, 0)`}>
        {pinnae('left', pinnaCount, rachisLength, pfx, pinnaScale, showSori)}
        {pinnae('right', pinnaCount, rachisLength, pfx, pinnaScale, showSori)}
      </g>
    </g>
  );
}

export function renderFern(stage: number, pfx: (name: string) => string) {
  return (
    <g>
      {/* ── Stage 1: Spore (tiny dot near soil) ── */}
      {stage >= 1 && (
        <g transform="translate(100, 264)" filter={`url(#${pfx('softShadow')})`}>
          {/* Ground shadow */}
          <ellipse cx="0" cy="3" rx="3.5" ry="1.2" fill="#3a2518" opacity="0.15" />
          {/* Spore body */}
          <circle cx="0" cy="0" r="3" fill="#3a5e28" />
          <circle cx="0" cy="0" r="3" fill="none" stroke="#2a4e18" strokeWidth="0.5" opacity="0.5" />
          {/* Highlight */}
          <circle cx="-0.8" cy="-1" r="1" fill="#5a8a40" opacity="0.35" />
        </g>
      )}

      {/* ── Stage 2: Fibrous roots + tiny fiddlehead ── */}
      {stage >= 2 && (
        <g>
          {/* Underground fibrous roots */}
          <g opacity="0.55">
            <path d="M 100 266 C 98 272 94 278 89 284" stroke="#7a5d3a" strokeWidth="1" fill="none" strokeLinecap="round" />
            <path d="M 100 266 C 102 273 106 280 112 286" stroke="#7a5d3a" strokeWidth="0.9" fill="none" strokeLinecap="round" />
            <path d="M 100 268 C 97 272 93 276 88 279" stroke="#7a5d3a" strokeWidth="0.6" fill="none" strokeLinecap="round" />
            <path d="M 100 268 C 103 273 107 277 113 280" stroke="#7a5d3a" strokeWidth="0.6" fill="none" strokeLinecap="round" />
            {/* Finer root hairs */}
            <path d="M 93 278 C 90 281 87 283 85 284" stroke="#7a5d3a" strokeWidth="0.35" fill="none" strokeLinecap="round" />
            <path d="M 108 280 C 111 283 114 285 117 286" stroke="#7a5d3a" strokeWidth="0.35" fill="none" strokeLinecap="round" />
            <path d="M 91 282 C 88 285 86 287 84 288" stroke="#7a5d3a" strokeWidth="0.25" fill="none" strokeLinecap="round" />
            <path d="M 110 284 C 113 286 115 288 118 289" stroke="#7a5d3a" strokeWidth="0.25" fill="none" strokeLinecap="round" />
          </g>
          {/* Tiny fiddlehead just breaking surface */}
          <g transform="translate(100, 260)" filter={`url(#${pfx('softShadow')})`}>
            <path
              d="M 0 0 C -0.5 -3 0 -6 1 -8 C 2 -9 3 -8.5 3 -7 C 3 -6 2.5 -5.5 2 -5.5"
              stroke="#4a9040"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        </g>
      )}

      {/* ── Stage 3: Beautiful fiddlehead unfurling ── */}
      {stage >= 3 && stage < 5 && (
        <g transform="translate(100, 262)" filter={`url(#${pfx('softShadow')})`}>
          {/* Main fiddlehead stalk */}
          <path
            d="M 0 0 C -1 -8 0 -16 2 -22"
            stroke={`url(#${pfx('fernRachis')})`}
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          {/* Coiled spiral tip */}
          <path
            d="M 2 -22 C 3 -26 5 -28 7 -28 C 9 -28 10 -26 9 -24 C 8 -22 6 -21.5 5 -22 C 4.5 -22.5 5 -23.5 6 -23.5"
            stroke="#4a9040"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          {/* Fiddlehead body fill */}
          <circle cx="7" cy="-25" r="4" fill={`url(#${pfx('fernFiddlehead')})`} opacity="0.7" />
          {/* Fine hairs on fiddlehead */}
          {Array.from({ length: 5 }, (_, i) => {
            const angle = -40 + i * 30;
            return (
              <line
                key={`hair-${i}`}
                x1="7" y1="-25"
                x2={7 + 3.5 * Math.cos((angle * Math.PI) / 180)}
                y2={-25 + 3.5 * Math.sin((angle * Math.PI) / 180)}
                stroke="#6aaa50"
                strokeWidth="0.5"
                opacity="0.4"
                strokeLinecap="round"
              />
            );
          })}
          {/* Small emerging pinnae near base */}
          {stage >= 4 && (
            <g>
              <path d="M 0 -6 C -4 -9 -8 -10 -10 -8" stroke="#48903c" strokeWidth="0.8" fill="none" strokeLinecap="round" />
              <path d="M 1 -6 C 5 -9 9 -10 11 -8" stroke="#48903c" strokeWidth="0.8" fill="none" strokeLinecap="round" />
              <path d="M 0 -12 C -3 -15 -6 -16 -8 -14" stroke="#48903c" strokeWidth="0.6" fill="none" strokeLinecap="round" />
              <path d="M 1 -12 C 4 -15 7 -16 9 -14" stroke="#48903c" strokeWidth="0.6" fill="none" strokeLinecap="round" />
            </g>
          )}
        </g>
      )}

      {/* ── Stage 4: 2-3 small fronds unfurling ── */}
      {stage >= 4 && stage < 5 && (
        <g>
          {/* Left frond — partially unfurled */}
          {renderFrondWithPinnae(100, 262, 195, -15, -12, 5, pfx, 0.7)}
          {/* Right frond — partially unfurled */}
          {renderFrondWithPinnae(100, 262, 200, 12, 10, 4, pfx, 0.65)}
        </g>
      )}

      {/* ── Stage 5: Full rosette of 5-7 arching fronds ── */}
      {stage >= 5 && (
        <g>
          {/* Back fronds (rendered first for depth) */}
          {renderFrondWithPinnae(100, 262, 105, -30, -35, 9, pfx, 0.9, false, 2.2)}
          {renderFrondWithPinnae(100, 262, 110, 28, 32, 8, pfx, 0.85, false, 2)}

          {/* Middle fronds */}
          {renderFrondWithPinnae(100, 262, 95, -18, -20, 10, pfx, 1, stage >= 6, 2.5)}
          {renderFrondWithPinnae(100, 262, 90, 15, 18, 10, pfx, 1, stage >= 6, 2.5)}

          {/* Front fronds */}
          {renderFrondWithPinnae(100, 262, 100, -8, -8, 9, pfx, 0.95, stage >= 6, 2.3)}
          {renderFrondWithPinnae(100, 262, 92, 5, 5, 10, pfx, 1, stage >= 6, 2.5)}

          {/* Center frond — tallest, nearly vertical */}
          {renderFrondWithPinnae(100, 262, 88, 2, 0, 11, pfx, 1.05, stage >= 6, 2.8)}
        </g>
      )}

      {/* ── Stage 6: Sori (spore dots) — handled via showSori flag in stage 5+ rendering ── */}
      {stage >= 6 && stage < 7 && (
        <g>
          {/* Additional prominent sori clusters on lower fronds for visibility */}
          {Array.from({ length: 8 }, (_, i) => {
            const angle = -140 + i * 40;
            const rad = 50 + (i % 3) * 15;
            const cx = 100 + rad * Math.cos((angle * Math.PI) / 180) * 0.5;
            const cy = 180 + rad * Math.sin((angle * Math.PI) / 180) * 0.3 - i * 3;
            return (
              <g key={`sorus-${i}`}>
                <circle cx={cx} cy={cy} r="1.8" fill={`url(#${pfx('fernSpore')})`} opacity="0.6" />
                <circle cx={cx + 3} cy={cy + 1.5} r="1.3" fill="#8b6d3f" opacity="0.5" />
                <circle cx={cx - 2} cy={cy + 2} r="1.0" fill="#9a7d4f" opacity="0.45" />
              </g>
            );
          })}
        </g>
      )}

      {/* ── Stage 7: Harvest glow + floating spores ── */}
      {stage >= 7 && (
        <g>
          {/* Golden harvest glow */}
          <circle
            cx="100"
            cy="170"
            r="80"
            fill={`url(#${pfx('harvestGlow')})`}
            className="animate-pulse"
          />

          {/* Floating spores drifting away */}
          {[
            { x: 55, y: 100, delay: '0s' },
            { x: 145, y: 95, delay: '0.8s' },
            { x: 40, y: 130, delay: '1.6s' },
            { x: 160, y: 120, delay: '2.4s' },
            { x: 70, y: 80, delay: '3.2s' },
            { x: 130, y: 75, delay: '1.0s' },
            { x: 85, y: 110, delay: '2.0s' },
            { x: 115, y: 105, delay: '3.6s' },
          ].map((s, i) => (
            <g key={`spore-float-${i}`} className="animate-float-away" style={{ animationDelay: s.delay }}>
              {/* Tiny spore — round dot */}
              <circle cx={s.x} cy={s.y} r="1.5" fill="#8b6d3f" opacity="0.7" />
              <circle cx={s.x} cy={s.y} r="0.8" fill="#c4a870" opacity="0.4" />
            </g>
          ))}
        </g>
      )}
    </g>
  );
}
