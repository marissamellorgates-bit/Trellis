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

      {/* Water gradient — translucent blue, extends to cover soil */}
      <linearGradient id={pfx('lotWater')} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#6090b0" stopOpacity="0.35" />
        <stop offset="40%" stopColor="#5084a8" stopOpacity="0.45" />
        <stop offset="80%" stopColor="#4878a0" stopOpacity="0.55" />
        <stop offset="100%" stopColor="#3a6890" stopOpacity="0.6" />
      </linearGradient>

      {/* Mud bottom */}
      <linearGradient id={pfx('lotMud')} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#5a4a30" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#3a2a18" stopOpacity="0.6" />
      </linearGradient>

      {/* Seed pod gradient — muted green */}
      <radialGradient id={pfx('lotSeedPod')} cx="45%" cy="40%" r="55%">
        <stop offset="0%" stopColor="#8ba060" />
        <stop offset="50%" stopColor="#7a9050" />
        <stop offset="100%" stopColor="#6b8040" />
      </radialGradient>

      {/* Seed gradient — dark brown */}
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

/** Draw a single broad, rounded lotus petal (the characteristic spoon/bowl shape) */
function lotusPetal(
  angle: number, length: number, width: number,
  fill: string, opacity: number, key: string,
) {
  const hw = width / 2; // half-width
  return (
    <path
      key={key}
      d={`M 0 0
          C ${-hw * 0.6} ${-length * 0.12}, ${-hw} ${-length * 0.45}, ${-hw * 0.7} ${-length * 0.82}
          C ${-hw * 0.35} ${-length * 0.97}, ${hw * 0.35} ${-length * 0.97}, ${hw * 0.7} ${-length * 0.82}
          C ${hw} ${-length * 0.45}, ${hw * 0.6} ${-length * 0.12}, 0 0`}
      fill={fill}
      opacity={opacity}
      transform={`rotate(${angle})`}
    />
  );
}

export function renderLotus(stage: number, pfx: (name: string) => string) {
  return (
    <g>
      {/* ── Water area — covers soil, extends to bottom ── */}
      {stage >= 2 && (
        <g>
          {/* Muddy bottom layer */}
          <rect x="10" y="260" width="180" height="20" rx="3" fill={`url(#${pfx('lotMud')})`} />
          {/* Water body — from surface down through soil area */}
          <rect x="10" y="230" width="180" height="50" rx="4" fill={`url(#${pfx('lotWater')})`} />
          {/* Water surface line */}
          <line x1="12" y1="230" x2="188" y2="230" stroke="#80b8d8" strokeWidth="0.8" opacity="0.5" />
          {/* Ripples */}
          <path d="M 25 234 Q 40 231 55 234 Q 70 237 85 234" stroke="#a0d0e8" strokeWidth="0.4" fill="none" opacity="0.35" />
          <path d="M 100 238 Q 120 235 140 238 Q 155 241 170 238" stroke="#a0d0e8" strokeWidth="0.35" fill="none" opacity="0.3" />
          <path d="M 45 244 Q 65 241 85 244 Q 105 247 125 244" stroke="#90c0d8" strokeWidth="0.3" fill="none" opacity="0.25" />
        </g>
      )}

      {/* ── Stage 1: Seed in mud ── */}
      {stage >= 1 && stage < 2 && (
        <g transform="translate(100, 264)" filter={`url(#${pfx('softShadow')})`}>
          <ellipse cx="1" cy="4" rx="5" ry="2" fill="#3a2518" opacity="0.2" />
          <ellipse cx="0" cy="0" rx="5" ry="6" fill={`url(#${pfx('lotSeedGrad')})`} />
          <ellipse cx="0" cy="0" rx="5" ry="6" fill="none" stroke="#4a3520" strokeWidth="0.5" />
          <path d="M 0 -5 C 0.5 -2 0.5 2 0 5" stroke="#6b5030" strokeWidth="0.6" fill="none" opacity="0.4" />
          <ellipse cx="-1.5" cy="-1.5" rx="2" ry="2.5" fill="#8b7050" opacity="0.2" />
        </g>
      )}

      {/* ── Stem — grows from mud through water (stages 2+) ── */}
      {stage >= 2 && (() => {
        const stemTop = stage >= 5 ? 118 : stage >= 4 ? 150 : stage >= 3 ? 185 : 220;
        const sw = stage >= 5 ? 4 : stage >= 4 ? 3.5 : stage >= 3 ? 3 : 2.5;
        return (
          <g filter={`url(#${pfx('softShadow')})`}>
            <path d={`M 100 270 C 101 250 99 ${stemTop + 30} 100 ${stemTop}`}
              stroke={`url(#${pfx('lotStem')})`} strokeWidth={sw} fill="none" strokeLinecap="round" />
            <path d={`M 99.5 266 C 100.5 248 98.5 ${stemTop + 32} 99.5 ${stemTop + 3}`}
              stroke="#5a9848" strokeWidth={sw * 0.3} fill="none" strokeLinecap="round" opacity="0.3" />
          </g>
        );
      })()}

      {/* ── Lily pad (stages 3+) ── */}
      {stage >= 3 && (() => {
        const padY = 231;
        const padRx = stage >= 5 ? 32 : stage >= 4 ? 28 : 22;
        const padRy = stage >= 5 ? 8 : stage >= 4 ? 7 : 5.5;
        return (
          <g filter={`url(#${pfx('softShadow')})`}>
            <ellipse cx="101" cy={padY + 2} rx={padRx} ry={padRy} fill="#1a3010" opacity="0.15" />
            <ellipse cx="100" cy={padY} rx={padRx} ry={padRy} fill={`url(#${pfx('lotPad')})`} />
            {/* Notch */}
            <path
              d={`M 100 ${padY} L ${100 + padRx * 0.6} ${padY - padRy * 0.45} L ${100 + padRx * 0.95} ${padY} L ${100 + padRx * 0.6} ${padY + padRy * 0.45} Z`}
              fill={`url(#${pfx('lotWater')})`} opacity="0.85"
            />
            {/* Veins */}
            {[0, 45, 90, 135, 180, 225, 270].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              return (
                <line key={`vein-${i}`} x1="100" y1={padY}
                  x2={100 + Math.cos(rad) * padRx * 0.85} y2={padY + Math.sin(rad) * padRy * 0.85}
                  stroke="#2d5a20" strokeWidth="0.4" opacity="0.4" />
              );
            })}
          </g>
        );
      })()}

      {/* ── Stage 3: Closed bud above water ── */}
      {stage === 3 && (
        <g transform="translate(100, 188)" filter={`url(#${pfx('softShadow')})`}>
          <path d="M 0 -14 C -5 -10 -7 -2 -6 6 C -5 10 -3 13 0 14 C 3 13 5 10 6 6 C 7 -2 5 -10 0 -14"
            fill={`url(#${pfx('lotBud')})`} />
          <path d="M 0 14 C -4 12 -6 8 -6 6 C -5 5 -3 4 0 3 C 3 4 5 5 6 6 C 6 8 4 12 0 14"
            fill="#3d7030" opacity="0.7" />
          <path d="M -1 -12 C -3 -6 -3 0 -2 4" stroke="#fde0d4" strokeWidth="0.8" fill="none" opacity="0.35" />
        </g>
      )}

      {/* ── Stage 4: Partially opening — broad petals starting to unfurl ── */}
      {stage === 4 && (
        <g transform="translate(100, 155)" filter={`url(#${pfx('softShadow')})`}>
          {/* Back petals — partially open, tips visible above */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
            lotusPetal(deg, 26, 20, `url(#${pfx('lotPetal')})`, 0.8, `o4-${i}`)
          ))}
          {/* Inner petals — still cupped tight */}
          {[30, 90, 150, 210, 270, 330].map((deg, i) => (
            lotusPetal(deg, 18, 15, `url(#${pfx('lotInnerPetal')})`, 0.85, `i4-${i}`)
          ))}
          {/* Center */}
          <circle r="5" fill="#c8b040" opacity="0.6" />
          <circle r="3" fill="#d4c050" opacity="0.4" />
        </g>
      )}

      {/* ── Stage 5: Full layered lotus bloom — broad rounded petals in bowl ── */}
      {stage >= 5 && stage < 6 && (
        <g transform="translate(100, 125)" filter={`url(#${pfx('softShadow')})`}>
          {/* Outer ring — 12 broad pink petals */}
          {Array.from({ length: 12 }, (_, i) => {
            const deg = (360 / 12) * i;
            return lotusPetal(deg, 38, 28, `url(#${pfx('lotPetal')})`, 0.78, `r1-${i}`);
          })}
          {/* Middle ring — 10 petals, offset */}
          {Array.from({ length: 10 }, (_, i) => {
            const deg = (360 / 10) * i + 18;
            return lotusPetal(deg, 30, 24, `url(#${pfx('lotPetal')})`, 0.84, `r2-${i}`);
          })}
          {/* Inner ring — 8 cream/white petals */}
          {Array.from({ length: 8 }, (_, i) => {
            const deg = (360 / 8) * i + 10;
            return lotusPetal(deg, 22, 18, `url(#${pfx('lotInnerPetal')})`, 0.9, `r3-${i}`);
          })}
          {/* Golden receptacle center */}
          <circle r="8" fill="#d4b840" opacity="0.7" />
          <circle r="5.5" fill="#e0c850" opacity="0.5" />
          <circle r="3.5" fill="#e8d460" opacity="0.3" />
          {/* Stamen ring */}
          {Array.from({ length: 10 }, (_, i) => {
            const a = ((360 / 10) * i * Math.PI) / 180;
            return <circle key={`st-${i}`} cx={Math.cos(a) * 5.5} cy={Math.sin(a) * 5.5} r="0.8" fill="#c4a020" opacity="0.6" />;
          })}
        </g>
      )}

      {/* ── Stage 6: Seed pod visible with fading petals ── */}
      {stage >= 6 && stage < 7 && (
        <g transform="translate(100, 125)" filter={`url(#${pfx('softShadow')})`}>
          {/* Remaining outer petals — drooping */}
          {Array.from({ length: 6 }, (_, i) => {
            const deg = (360 / 6) * i + 15;
            return lotusPetal(deg, 32, 24, `url(#${pfx('lotPetal')})`, 0.45, `rem-${i}`);
          })}
          {/* Few inner petals wilting */}
          {Array.from({ length: 4 }, (_, i) => {
            const deg = (360 / 4) * i + 45;
            return lotusPetal(deg, 20, 16, `url(#${pfx('lotInnerPetal')})`, 0.4, `wilt-${i}`);
          })}
          {/* Seed pod — flat-topped disc (the "shower head") */}
          <ellipse cx="0" cy="-2" rx="12" ry="10" fill={`url(#${pfx('lotSeedPod')})`} />
          <ellipse cx="0" cy="-6" rx="11" ry="5" fill="#8ba060" opacity="0.6" />
          {/* Seed holes */}
          {[
            { x: 0, y: -6, r: 2.2 }, { x: -4.5, y: -5, r: 1.8 }, { x: 4.5, y: -5, r: 1.8 },
            { x: -2.5, y: -8.5, r: 1.6 }, { x: 2.5, y: -8.5, r: 1.6 },
            { x: -6.5, y: -3, r: 1.4 }, { x: 6.5, y: -3, r: 1.4 },
            { x: 0, y: -3, r: 1.5 }, { x: -3, y: -2, r: 1.3 }, { x: 3, y: -2, r: 1.3 },
          ].map((h, i) => (
            <g key={`hole-${i}`}>
              <circle cx={h.x} cy={h.y} r={h.r} fill="#3a4a20" opacity="0.7" />
              <circle cx={h.x} cy={h.y} r={h.r * 0.6} fill="#5a6830" opacity="0.5" />
              <circle cx={h.x} cy={h.y} r={h.r} fill="none" stroke="#6b8040" strokeWidth="0.3" opacity="0.5" />
            </g>
          ))}
          <ellipse cx="0" cy="-2" rx="12" ry="10" fill="none" stroke="#6b8040" strokeWidth="0.5" opacity="0.4" />
        </g>
      )}

      {/* ── Stage 7: Harvest — seed pod + golden glow + floating petals ── */}
      {stage >= 7 && (
        <g>
          <g transform="translate(100, 125)" filter={`url(#${pfx('softShadow')})`}>
            {/* Faded remaining petals */}
            {Array.from({ length: 6 }, (_, i) => {
              const deg = (360 / 6) * i + 15;
              return lotusPetal(deg, 32, 24, `url(#${pfx('lotPetal')})`, 0.35, `hr-${i}`);
            })}
            {/* Seed pod */}
            <ellipse cx="0" cy="-2" rx="12" ry="10" fill={`url(#${pfx('lotSeedPod')})`} />
            <ellipse cx="0" cy="-6" rx="11" ry="5" fill="#8ba060" opacity="0.6" />
            {[
              { x: 0, y: -6, r: 2.2 }, { x: -4.5, y: -5, r: 1.8 }, { x: 4.5, y: -5, r: 1.8 },
              { x: -2.5, y: -8.5, r: 1.6 }, { x: 2.5, y: -8.5, r: 1.6 },
              { x: -6.5, y: -3, r: 1.4 }, { x: 6.5, y: -3, r: 1.4 },
              { x: 0, y: -3, r: 1.5 }, { x: -3, y: -2, r: 1.3 }, { x: 3, y: -2, r: 1.3 },
            ].map((h, i) => (
              <g key={`hh-${i}`}>
                <circle cx={h.x} cy={h.y} r={h.r} fill="#3a4a20" opacity="0.7" />
                <circle cx={h.x} cy={h.y} r={h.r * 0.6} fill="#5a6830" opacity="0.5" />
              </g>
            ))}
          </g>

          {/* Golden harvest glow */}
          <circle cx="100" cy="140" r="75" fill={`url(#${pfx('harvestGlow')})`} className="animate-pulse" />

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
              <path
                d={`M ${p.x} ${p.y} C ${p.x - 3} ${p.y - 4} ${p.x - 2} ${p.y - 8} ${p.x} ${p.y - 10} C ${p.x + 2} ${p.y - 8} ${p.x + 3} ${p.y - 4} ${p.x} ${p.y}`}
                fill="#f0a0b8" opacity="0.5" transform={`rotate(${p.rot} ${p.x} ${p.y})`} />
              <path
                d={`M ${p.x} ${p.y} C ${p.x - 1.5} ${p.y - 3} ${p.x - 1} ${p.y - 6} ${p.x} ${p.y - 7} C ${p.x + 1} ${p.y - 6} ${p.x + 1.5} ${p.y - 3} ${p.x} ${p.y}`}
                fill="#fde0d4" opacity="0.3" transform={`rotate(${p.rot} ${p.x} ${p.y})`} />
            </g>
          ))}
        </g>
      )}
    </g>
  );
}
