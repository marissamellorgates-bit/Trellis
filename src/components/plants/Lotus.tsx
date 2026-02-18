export function lotusGradients(pfx: (name: string) => string) {
  return (
    <>
      {/* Petal gradient — soft pink outer petals */}
      <radialGradient id={pfx('lotPetal')} cx="50%" cy="80%" r="80%">
        <stop offset="0%" stopColor="#f8c8d4" />
        <stop offset="50%" stopColor="#f0a0b8" />
        <stop offset="100%" stopColor="#e88098" />
      </radialGradient>

      {/* Inner petal gradient — cream/white center petals */}
      <radialGradient id={pfx('lotInnerPetal')} cx="50%" cy="80%" r="75%">
        <stop offset="0%" stopColor="#fff0e8" />
        <stop offset="40%" stopColor="#fde0d4" />
        <stop offset="100%" stopColor="#f8c8d4" />
      </radialGradient>

      {/* Stem gradient — green */}
      <linearGradient id={pfx('lotStem')} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#2d5a20" />
        <stop offset="30%" stopColor="#3d7030" />
        <stop offset="55%" stopColor="#4a8038" />
        <stop offset="80%" stopColor="#3d7030" />
        <stop offset="100%" stopColor="#2d5a20" />
      </linearGradient>

      {/* Lily pad gradient */}
      <radialGradient id={pfx('lotPad')} cx="45%" cy="45%" r="60%">
        <stop offset="0%" stopColor="#408a38" />
        <stop offset="50%" stopColor="#358030" />
        <stop offset="100%" stopColor="#2d6820" />
      </radialGradient>

      {/* Water gradient — translucent blue */}
      <linearGradient id={pfx('lotWater')} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#6090b0" stopOpacity="0.35" />
        <stop offset="50%" stopColor="#5084a8" stopOpacity="0.45" />
        <stop offset="100%" stopColor="#4878a0" stopOpacity="0.55" />
      </linearGradient>

      {/* Seed pod gradient — muted green */}
      <radialGradient id={pfx('lotSeedPod')} cx="45%" cy="40%" r="55%">
        <stop offset="0%" stopColor="#8ba060" />
        <stop offset="50%" stopColor="#7a9050" />
        <stop offset="100%" stopColor="#6b8040" />
      </radialGradient>

      {/* Seed gradient — dark brown mud seed */}
      <radialGradient id={pfx('lotSeedGrad')} cx="40%" cy="35%" r="60%">
        <stop offset="0%" stopColor="#6b5030" />
        <stop offset="50%" stopColor="#4a3520" />
        <stop offset="100%" stopColor="#2a1a0e" />
      </radialGradient>

      {/* Bud gradient — closed bud, pink/cream */}
      <linearGradient id={pfx('lotBud')} x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor="#f8c8d4" />
        <stop offset="40%" stopColor="#f0b0c0" />
        <stop offset="100%" stopColor="#e09088" />
      </linearGradient>
    </>
  );
}

export function renderLotus(stage: number, pfx: (name: string) => string) {
  return (
    <g>
      {/* ── Water area (drawn behind the plant, stages 2+) ── */}
      {stage >= 2 && (
        <g>
          {/* Water body — translucent blue band from water line to mud */}
          <rect
            x="10"
            y="220"
            width="180"
            height="42"
            rx="4"
            fill={`url(#${pfx('lotWater')})`}
          />
          {/* Water surface line — subtle shimmer */}
          <line x1="12" y1="220" x2="188" y2="220" stroke="#80b8d8" strokeWidth="0.8" opacity="0.5" />
          {/* Water ripples */}
          <path d="M 25 225 Q 40 222 55 225 Q 70 228 85 225" stroke="#a0d0e8" strokeWidth="0.4" fill="none" opacity="0.35" />
          <path d="M 100 230 Q 120 227 140 230 Q 155 233 170 230" stroke="#a0d0e8" strokeWidth="0.35" fill="none" opacity="0.3" />
          <path d="M 50 238 Q 70 235 90 238 Q 110 241 130 238" stroke="#90c0d8" strokeWidth="0.3" fill="none" opacity="0.25" />
        </g>
      )}

      {/* ── Stage 1: Seed in mud ── */}
      {stage >= 1 && stage < 2 && (
        <g transform="translate(100, 264)" filter={`url(#${pfx('softShadow')})`}>
          {/* Seed shadow on mud */}
          <ellipse cx="1" cy="4" rx="5" ry="2" fill="#3a2518" opacity="0.2" />
          {/* Seed body — dark round seed */}
          <ellipse cx="0" cy="0" rx="5" ry="6" fill={`url(#${pfx('lotSeedGrad')})`} />
          {/* Seed outline */}
          <ellipse cx="0" cy="0" rx="5" ry="6" fill="none" stroke="#4a3520" strokeWidth="0.5" />
          {/* Seed ridge line */}
          <path d="M 0 -5 C 0.5 -2 0.5 2 0 5" stroke="#6b5030" strokeWidth="0.6" fill="none" opacity="0.4" />
          {/* Highlight */}
          <ellipse cx="-1.5" cy="-1.5" rx="2" ry="2.5" fill="#8b7050" opacity="0.2" />
        </g>
      )}

      {/* ── Stage 2: Stem rising through water ── */}
      {stage >= 2 && (() => {
        const stemTop = stage >= 5 ? 108 : stage >= 4 ? 140 : stage >= 3 ? 175 : 210;
        const sw = stage >= 5 ? 4 : stage >= 4 ? 3.5 : stage >= 3 ? 3 : 2.5;
        return (
          <g filter={`url(#${pfx('softShadow')})`}>
            {/* Stem shadow */}
            <path
              d={`M 101.5 262 C 102 240 100 ${stemTop + 30} 101 ${stemTop + 2}`}
              stroke="#1a2a10"
              strokeWidth={sw * 0.5}
              fill="none"
              strokeLinecap="round"
              opacity="0.12"
            />
            {/* Main stem — slightly curved, rising from mud through water */}
            <path
              d={`M 100 262 C 101 240 99 ${stemTop + 28} 100 ${stemTop}`}
              stroke={`url(#${pfx('lotStem')})`}
              strokeWidth={sw}
              fill="none"
              strokeLinecap="round"
            />
            {/* Stem highlight */}
            <path
              d={`M 99.5 258 C 100.5 238 98.5 ${stemTop + 30} 99.5 ${stemTop + 3}`}
              stroke="#5a9848"
              strokeWidth={sw * 0.3}
              fill="none"
              strokeLinecap="round"
              opacity="0.3"
            />
          </g>
        );
      })()}

      {/* ── Stage 3: Lily pad + closed bud ── */}
      {stage >= 3 && (() => {
        const padY = 221;
        const padRx = stage >= 5 ? 32 : stage >= 4 ? 28 : 22;
        const padRy = stage >= 5 ? 8 : stage >= 4 ? 7 : 5.5;
        return (
          <g>
            {/* Lily pad — ellipse with notch */}
            <g filter={`url(#${pfx('softShadow')})`}>
              {/* Pad shadow on water */}
              <ellipse cx="101" cy={padY + 2} rx={padRx} ry={padRy} fill="#1a3010" opacity="0.15" />
              {/* Pad body with notch cut — uses a clipping path effect via layered shapes */}
              <ellipse cx="100" cy={padY} rx={padRx} ry={padRy} fill={`url(#${pfx('lotPad')})`} />
              {/* Notch — a V-cut from edge to center */}
              <path
                d={`M 100 ${padY} L ${100 + padRx * 0.6} ${padY - padRy * 0.45} L ${100 + padRx * 0.95} ${padY} L ${100 + padRx * 0.6} ${padY + padRy * 0.45} Z`}
                fill={`url(#${pfx('lotWater')})`}
                opacity="0.85"
              />
              {/* Pad veins — radiating lines from center */}
              {[0, 45, 90, 135, 180, 225, 270].map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                const endX = 100 + Math.cos(rad) * padRx * 0.85;
                const endY = padY + Math.sin(rad) * padRy * 0.85;
                return (
                  <line
                    key={`vein-${i}`}
                    x1="100"
                    y1={padY}
                    x2={endX}
                    y2={endY}
                    stroke="#2d5a20"
                    strokeWidth="0.4"
                    opacity="0.4"
                  />
                );
              })}
              {/* Pad highlight */}
              <ellipse
                cx={100 - padRx * 0.2}
                cy={padY - padRy * 0.2}
                rx={padRx * 0.4}
                ry={padRy * 0.4}
                fill="#60b050"
                opacity="0.15"
              />
            </g>

            {/* Closed bud — only at stage 3 */}
            {stage === 3 && (
              <g transform="translate(100, 178)" filter={`url(#${pfx('softShadow')})`}>
                {/* Bud body — elongated pointed oval */}
                <path
                  d="M 0 -14 C -5 -10 -7 -2 -6 6 C -5 10 -3 13 0 14 C 3 13 5 10 6 6 C 7 -2 5 -10 0 -14"
                  fill={`url(#${pfx('lotBud')})`}
                />
                {/* Bud sepal (green base wrapping) */}
                <path
                  d="M 0 14 C -4 12 -6 8 -6 6 C -5 5 -3 4 0 3 C 3 4 5 5 6 6 C 6 8 4 12 0 14"
                  fill="#3d7030"
                  opacity="0.7"
                />
                {/* Bud tip highlight */}
                <path
                  d="M -1 -12 C -3 -6 -3 0 -2 4"
                  stroke="#fde0d4"
                  strokeWidth="0.8"
                  fill="none"
                  opacity="0.35"
                />
                {/* Bud outline */}
                <path
                  d="M 0 -14 C -5 -10 -7 -2 -6 6 C -5 10 -3 13 0 14 C 3 13 5 10 6 6 C 7 -2 5 -10 0 -14"
                  fill="none"
                  stroke="#d88898"
                  strokeWidth="0.4"
                  opacity="0.5"
                />
              </g>
            )}
          </g>
        );
      })()}

      {/* ── Stage 4: Partially opening petals ── */}
      {stage === 4 && (
        <g transform="translate(100, 148)" filter={`url(#${pfx('softShadow')})`}>
          {/* Outer petals — spreading outward */}
          {Array.from({ length: 8 }, (_, i) => {
            const deg = (360 / 8) * i - 90;
            return (
              <path
                key={`outer4-${i}`}
                d="M 0 0 C -4 -6 -6 -18 -5 -26 C -3 -30 3 -30 5 -26 C 6 -18 4 -6 0 0"
                fill={`url(#${pfx('lotPetal')})`}
                transform={`rotate(${deg})`}
                opacity="0.85"
              />
            );
          })}
          {/* Inner petals — still cupped upward */}
          {Array.from({ length: 6 }, (_, i) => {
            const deg = (360 / 6) * i - 60;
            return (
              <path
                key={`inner4-${i}`}
                d="M 0 0 C -3 -5 -4 -14 -3 -20 C -1.5 -23 1.5 -23 3 -20 C 4 -14 3 -5 0 0"
                fill={`url(#${pfx('lotInnerPetal')})`}
                transform={`rotate(${deg})`}
                opacity="0.9"
              />
            );
          })}
          {/* Center — small golden-green disc */}
          <circle r="4" fill="#c8b040" opacity="0.6" />
          <circle r="3" fill="#d4c050" opacity="0.4" />
        </g>
      )}

      {/* ── Stage 5: Full layered lotus bloom ── */}
      {stage >= 5 && stage < 6 && (
        <g transform="translate(100, 115)" filter={`url(#${pfx('softShadow')})`}>
          {/* Outermost petal ring — 12 petals, widest spread */}
          {Array.from({ length: 12 }, (_, i) => {
            const deg = (360 / 12) * i;
            return (
              <path
                key={`ring1-${i}`}
                d="M 0 0 C -5 -8 -8 -24 -6 -36 C -4 -42 4 -42 6 -36 C 8 -24 5 -8 0 0"
                fill={`url(#${pfx('lotPetal')})`}
                transform={`rotate(${deg})`}
                opacity="0.8"
              />
            );
          })}
          {/* Middle petal ring — 10 petals, slightly shorter */}
          {Array.from({ length: 10 }, (_, i) => {
            const deg = (360 / 10) * i + 18;
            return (
              <path
                key={`ring2-${i}`}
                d="M 0 0 C -4 -6 -6 -18 -5 -28 C -3 -32 3 -32 5 -28 C 6 -18 4 -6 0 0"
                fill={`url(#${pfx('lotPetal')})`}
                transform={`rotate(${deg})`}
                opacity="0.85"
              />
            );
          })}
          {/* Inner petal ring — 8 cream/white petals */}
          {Array.from({ length: 8 }, (_, i) => {
            const deg = (360 / 8) * i + 10;
            return (
              <path
                key={`ring3-${i}`}
                d="M 0 0 C -3 -5 -5 -14 -4 -22 C -2 -25 2 -25 4 -22 C 5 -14 3 -5 0 0"
                fill={`url(#${pfx('lotInnerPetal')})`}
                transform={`rotate(${deg})`}
                opacity="0.9"
              />
            );
          })}
          {/* Center — golden receptacle */}
          <circle r="7" fill="#d4b840" opacity="0.7" />
          <circle r="5" fill="#e0c850" opacity="0.5" />
          <circle r="3" fill="#e8d460" opacity="0.3" />
          {/* Center dots — stamens */}
          {Array.from({ length: 8 }, (_, i) => {
            const angle = (360 / 8) * i * (Math.PI / 180);
            const cx = Math.cos(angle) * 4.5;
            const cy = Math.sin(angle) * 4.5;
            return (
              <circle key={`stamen-${i}`} cx={cx} cy={cy} r="0.8" fill="#c4a020" opacity="0.6" />
            );
          })}
        </g>
      )}

      {/* ── Stage 6: Seed pod with remaining petals ── */}
      {stage >= 6 && stage < 7 && (
        <g transform="translate(100, 115)" filter={`url(#${pfx('softShadow')})`}>
          {/* Remaining outer petals — drooping, fewer */}
          {Array.from({ length: 6 }, (_, i) => {
            const deg = (360 / 6) * i + 15;
            return (
              <path
                key={`remain-${i}`}
                d="M 0 0 C -5 -6 -7 -18 -6 -28 C -4 -33 4 -33 6 -28 C 7 -18 5 -6 0 0"
                fill={`url(#${pfx('lotPetal')})`}
                transform={`rotate(${deg})`}
                opacity="0.5"
              />
            );
          })}
          {/* A few inner petals, wilting */}
          {Array.from({ length: 4 }, (_, i) => {
            const deg = (360 / 4) * i + 45;
            return (
              <path
                key={`wilt-${i}`}
                d="M 0 0 C -3 -4 -4 -12 -3 -18 C -1.5 -21 1.5 -21 3 -18 C 4 -12 3 -4 0 0"
                fill={`url(#${pfx('lotInnerPetal')})`}
                transform={`rotate(${deg})`}
                opacity="0.45"
              />
            );
          })}
          {/* Seed pod — flat-topped disc */}
          <ellipse cx="0" cy="-2" rx="12" ry="10" fill={`url(#${pfx('lotSeedPod')})`} />
          {/* Flat top of the seed pod */}
          <ellipse cx="0" cy="-6" rx="11" ry="5" fill="#8ba060" opacity="0.6" />
          {/* Seed holes — the distinctive lotus pod pattern */}
          {[
            { x: 0, y: -6, r: 2.2 },
            { x: -4.5, y: -5, r: 1.8 },
            { x: 4.5, y: -5, r: 1.8 },
            { x: -2.5, y: -8.5, r: 1.6 },
            { x: 2.5, y: -8.5, r: 1.6 },
            { x: -6.5, y: -3, r: 1.4 },
            { x: 6.5, y: -3, r: 1.4 },
            { x: 0, y: -3, r: 1.5 },
            { x: -3, y: -2, r: 1.3 },
            { x: 3, y: -2, r: 1.3 },
          ].map((hole, i) => (
            <g key={`hole-${i}`}>
              {/* Dark hole */}
              <circle cx={hole.x} cy={hole.y} r={hole.r} fill="#3a4a20" opacity="0.7" />
              {/* Seed inside — slightly lighter, smaller */}
              <circle cx={hole.x} cy={hole.y} r={hole.r * 0.6} fill="#5a6830" opacity="0.5" />
              {/* Hole rim highlight */}
              <circle
                cx={hole.x}
                cy={hole.y}
                r={hole.r}
                fill="none"
                stroke="#6b8040"
                strokeWidth="0.3"
                opacity="0.5"
              />
            </g>
          ))}
          {/* Pod outline */}
          <ellipse cx="0" cy="-2" rx="12" ry="10" fill="none" stroke="#6b8040" strokeWidth="0.5" opacity="0.4" />
        </g>
      )}

      {/* ── Stage 7: Harvest glow + floating petal particles ── */}
      {stage >= 7 && (
        <g>
          {/* Re-render the seed pod at stage 7 */}
          <g transform="translate(100, 115)" filter={`url(#${pfx('softShadow')})`}>
            {/* Remaining petals — faded */}
            {Array.from({ length: 6 }, (_, i) => {
              const deg = (360 / 6) * i + 15;
              return (
                <path
                  key={`h-remain-${i}`}
                  d="M 0 0 C -5 -6 -7 -18 -6 -28 C -4 -33 4 -33 6 -28 C 7 -18 5 -6 0 0"
                  fill={`url(#${pfx('lotPetal')})`}
                  transform={`rotate(${deg})`}
                  opacity="0.4"
                />
              );
            })}
            {/* Seed pod */}
            <ellipse cx="0" cy="-2" rx="12" ry="10" fill={`url(#${pfx('lotSeedPod')})`} />
            <ellipse cx="0" cy="-6" rx="11" ry="5" fill="#8ba060" opacity="0.6" />
            {/* Seed holes */}
            {[
              { x: 0, y: -6, r: 2.2 },
              { x: -4.5, y: -5, r: 1.8 },
              { x: 4.5, y: -5, r: 1.8 },
              { x: -2.5, y: -8.5, r: 1.6 },
              { x: 2.5, y: -8.5, r: 1.6 },
              { x: -6.5, y: -3, r: 1.4 },
              { x: 6.5, y: -3, r: 1.4 },
              { x: 0, y: -3, r: 1.5 },
              { x: -3, y: -2, r: 1.3 },
              { x: 3, y: -2, r: 1.3 },
            ].map((hole, i) => (
              <g key={`h-hole-${i}`}>
                <circle cx={hole.x} cy={hole.y} r={hole.r} fill="#3a4a20" opacity="0.7" />
                <circle cx={hole.x} cy={hole.y} r={hole.r * 0.6} fill="#5a6830" opacity="0.5" />
              </g>
            ))}
          </g>

          {/* Golden harvest glow */}
          <circle cx="100" cy="130" r="75" fill={`url(#${pfx('harvestGlow')})`} className="animate-pulse" />

          {/* Floating petal particles */}
          {[
            { x: 140, y: 80, rot: 20, delay: '0s' },
            { x: 58, y: 72, rot: -30, delay: '1.2s' },
            { x: 155, y: 105, rot: 45, delay: '2.5s' },
            { x: 45, y: 95, rot: -15, delay: '3.8s' },
            { x: 130, y: 65, rot: 60, delay: '1.8s' },
            { x: 70, y: 110, rot: -50, delay: '0.6s' },
          ].map((p, i) => (
            <g key={`float-${i}`} className="animate-float-away" style={{ animationDelay: p.delay }}>
              {/* Floating petal — soft pink */}
              <path
                d={`M ${p.x} ${p.y} C ${p.x - 3} ${p.y - 4} ${p.x - 2} ${p.y - 8} ${p.x} ${p.y - 10} C ${p.x + 2} ${p.y - 8} ${p.x + 3} ${p.y - 4} ${p.x} ${p.y}`}
                fill="#f0a0b8"
                opacity="0.5"
                transform={`rotate(${p.rot} ${p.x} ${p.y})`}
              />
              {/* Petal highlight */}
              <path
                d={`M ${p.x} ${p.y} C ${p.x - 1.5} ${p.y - 3} ${p.x - 1} ${p.y - 6} ${p.x} ${p.y - 7} C ${p.x + 1} ${p.y - 6} ${p.x + 1.5} ${p.y - 3} ${p.x} ${p.y}`}
                fill="#fde0d4"
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
