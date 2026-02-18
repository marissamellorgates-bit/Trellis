export function sunflowerGradients(pfx: (name: string) => string) {
  return (
    <>
      <linearGradient id={pfx('sfStemGrad')} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#2d5420" />
        <stop offset="30%" stopColor="#3d6b2e" />
        <stop offset="55%" stopColor="#5a8a3c" />
        <stop offset="80%" stopColor="#4a7530" />
        <stop offset="100%" stopColor="#2d5420" />
      </linearGradient>
      <linearGradient id={pfx('sfStemHi')} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#6ba048" stopOpacity="0" />
        <stop offset="40%" stopColor="#8abf60" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#6ba048" stopOpacity="0" />
      </linearGradient>
      <linearGradient id={pfx('sfLeafBase')} x1="0" y1="0" x2="0.8" y2="1">
        <stop offset="0%" stopColor="#3a6524" />
        <stop offset="100%" stopColor="#2a4e18" />
      </linearGradient>
      <linearGradient id={pfx('sfLeafMid')} x1="0.2" y1="0" x2="1" y2="0.8">
        <stop offset="0%" stopColor="#5a8a3c" />
        <stop offset="50%" stopColor="#4a7a30" />
        <stop offset="100%" stopColor="#3a6524" />
      </linearGradient>
      <linearGradient id={pfx('sfLeafHi')} x1="0.3" y1="0" x2="0.7" y2="1">
        <stop offset="0%" stopColor="#8dc060" stopOpacity="0.6" />
        <stop offset="50%" stopColor="#7ab050" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#5a8a3c" stopOpacity="0" />
      </linearGradient>
      <radialGradient id={pfx('sfPetalOuter')} cx="50%" cy="100%" r="80%">
        <stop offset="0%" stopColor="#f5c040" />
        <stop offset="40%" stopColor="#f0a830" />
        <stop offset="100%" stopColor="#c47008" />
      </radialGradient>
      <radialGradient id={pfx('sfPetalInner')} cx="50%" cy="100%" r="80%">
        <stop offset="0%" stopColor="#ffe070" />
        <stop offset="40%" stopColor="#ffd54f" />
        <stop offset="100%" stopColor="#e8a020" />
      </radialGradient>
      <radialGradient id={pfx('sfCenter')} cx="40%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#6b4422" />
        <stop offset="40%" stopColor="#4a2a12" />
        <stop offset="100%" stopColor="#1a0a04" />
      </radialGradient>
      <linearGradient id={pfx('sfSeedGrad')} x1="0.3" y1="0" x2="0.7" y2="1">
        <stop offset="0%" stopColor="#d4b880" />
        <stop offset="50%" stopColor="#c4a265" />
        <stop offset="100%" stopColor="#8b6d3f" />
      </linearGradient>
    </>
  );
}

export function renderSunflower(stage: number, pfx: (name: string) => string) {
  return (
    <g>
      {/* Stage 1: Seed */}
      {stage >= 1 && (
        <g transform="translate(100, 262)" filter={`url(#${pfx('softShadow')})`}>
          <ellipse cx="1" cy="4" rx="4" ry="2" fill="#3a2518" opacity="0.2" />
          <ellipse cx="0" cy="0" rx="4.5" ry="7" fill={`url(#${pfx('sfSeedGrad')})`} transform="rotate(-12)" />
          <ellipse cx="0" cy="0" rx="4.5" ry="7" fill="none" stroke="#6b5030" strokeWidth="0.5" transform="rotate(-12)" />
          <path d="M -0.5 -5 C 0 -3 0.5 0 0 3" stroke="#a08050" strokeWidth="0.8" fill="none" opacity="0.4" transform="rotate(-12)" />
          <ellipse cx="-1.5" cy="-2" rx="1.5" ry="3" fill="#e0d0a0" opacity="0.2" transform="rotate(-12)" />
        </g>
      )}

      {/* Stage 2: Roots */}
      {stage >= 2 && (
        <g opacity="0.65">
          <path d="M 100 266 C 99 274 96 282 92 290" stroke="#8b6d4a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M 100 266 C 102 275 106 284 112 292" stroke="#8b6d4a" strokeWidth="1.3" fill="none" strokeLinecap="round" />
          <path d="M 100 270 C 96 274 90 278 85 281" stroke="#8b6d4a" strokeWidth="0.9" fill="none" strokeLinecap="round" />
          <path d="M 95 280 C 92 284 88 287 84 289" stroke="#8b6d4a" strokeWidth="0.5" fill="none" strokeLinecap="round" />
          <path d="M 108 282 C 111 286 115 289 118 290" stroke="#8b6d4a" strokeWidth="0.5" fill="none" strokeLinecap="round" />
          <path d="M 93 286 C 90 289 87 291 85 292" stroke="#8b6d4a" strokeWidth="0.35" fill="none" strokeLinecap="round" />
          <path d="M 110 287 C 113 290 116 292 119 292" stroke="#8b6d4a" strokeWidth="0.35" fill="none" strokeLinecap="round" />
        </g>
      )}

      {/* Stage 3: Stem */}
      {stage >= 3 && (() => {
        const stemTop = stage >= 5 ? 120 : stage >= 4 ? 155 : 205;
        const sw = stage >= 5 ? 7 : stage >= 4 ? 5.5 : 4;
        return (
          <g filter={`url(#${pfx('softShadow')})`}>
            <path d={`M 102 262 C 103 238 101 ${stemTop + 42} 102 ${stemTop + 2}`} stroke="#1a3010" strokeWidth={sw * 0.6} fill="none" strokeLinecap="round" opacity="0.15" />
            <path d={`M 100 262 C 101 238 99 ${stemTop + 40} 100 ${stemTop}`} stroke={`url(#${pfx('sfStemGrad')})`} strokeWidth={sw} fill="none" strokeLinecap="round" />
            <path d={`M 100 258 C 101 236 99 ${stemTop + 42} 100 ${stemTop + 3}`} stroke={`url(#${pfx('sfStemHi')})`} strokeWidth={sw * 0.5} fill="none" strokeLinecap="round" />
            {stage >= 4 && (
              <>
                <ellipse cx="100" cy="228" rx={sw * 0.55} ry="2" fill="#4a7530" opacity="0.5" />
                <ellipse cx="100" cy="188" rx={sw * 0.5} ry="1.8" fill="#4a7530" opacity="0.4" />
              </>
            )}
          </g>
        );
      })()}

      {/* Stage 4: Leaves */}
      {stage >= 4 && (
        <g>
          {/* Lower left leaf */}
          <g filter={`url(#${pfx('softShadow')})`}>
            <path d="M 100 230 C 97 228 92 225 88 222" stroke="#3d6b2e" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M 100 230 C 97 228 92 225 88 222" stroke="#5a8a3c" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.4" />
            <g transform="translate(88, 222) rotate(-40)">
              <path d="M 0 0 C -3 -2 -9 -7 -16 -10 C -20 -12 -26 -14 -30 -13 C -34 -12 -35 -8 -33 -4 C -31 0 -26 5 -20 8 C -14 11 -8 12 -4 11 C -1 9 0 4 0 0" fill={`url(#${pfx('sfLeafBase')})`} />
              <path d="M -0.5 0 C -3 -2 -9 -6 -15 -9 C -19 -11 -25 -13 -28 -12 C -32 -11 -33 -8 -31 -4 C -29 -1 -25 4 -19 7 C -14 9 -8 10 -4 9 C -1 7.5 0 3.5 -0.5 0" fill={`url(#${pfx('sfLeafMid')})`} opacity="0.85" />
              <path d="M -2 -1 C -5 -3 -10 -6 -15 -8 C -19 -10 -23 -11 -26 -10 C -29 -9 -30 -6 -28 -3 C -26 0 -22 3 -18 5 C -13 7 -8 7 -5 6 C -3 4 -2 2 -2 -1" fill={`url(#${pfx('sfLeafHi')})`} opacity="0.4" />
              <path d="M 0 0 C -4 -2 -12 -5 -20 -8 C -26 -10 -31 -10 -33 -5" stroke="#2d4e18" strokeWidth="0.9" fill="none" />
              <path d="M 0 0 C -4 -2 -12 -5 -20 -8 C -26 -10 -31 -10 -33 -5" stroke="#4a7530" strokeWidth="0.35" fill="none" opacity="0.35" />
              <path d="M -6 -2 C -8 -5 -10 -9 -12 -11" stroke="#3a6020" strokeWidth="0.4" fill="none" opacity="0.55" />
              <path d="M -6 -2 C -8 1 -10 4 -11 6" stroke="#3a6020" strokeWidth="0.35" fill="none" opacity="0.45" />
              <path d="M -12 -4 C -15 -8 -17 -11 -19 -12" stroke="#3a6020" strokeWidth="0.35" fill="none" opacity="0.5" />
              <path d="M -12 -4 C -14 -1 -16 2 -18 4" stroke="#3a6020" strokeWidth="0.3" fill="none" opacity="0.4" />
              <path d="M -18 -6 C -21 -9 -24 -11 -26 -12" stroke="#3a6020" strokeWidth="0.3" fill="none" opacity="0.45" />
              <path d="M -18 -6 C -20 -3 -23 0 -24 2" stroke="#3a6020" strokeWidth="0.25" fill="none" opacity="0.35" />
              <path d="M -24 -8 C -27 -10 -29 -11 -30 -11" stroke="#3a6020" strokeWidth="0.25" fill="none" opacity="0.4" />
              <path d="M -24 -8 C -26 -5 -28 -2 -29 0" stroke="#3a6020" strokeWidth="0.2" fill="none" opacity="0.3" />
              <path d="M -9 -4 C -10 -6 -11 -8 -12 -9" stroke="#4a7a30" strokeWidth="0.2" fill="none" opacity="0.2" />
              <path d="M -15 -6 C -16 -8 -17 -9 -18 -10" stroke="#4a7a30" strokeWidth="0.2" fill="none" opacity="0.2" />
            </g>
          </g>

          {/* Lower right leaf */}
          <g filter={`url(#${pfx('softShadow')})`}>
            <path d="M 100 224 C 103 222 108 218 112 215" stroke="#3d6b2e" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M 100 224 C 103 222 108 218 112 215" stroke="#5a8a3c" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.4" />
            <g transform="translate(112, 215) rotate(35)">
              <path d="M 0 0 C 3 -2 9 -8 17 -12 C 21 -14 27 -16 31 -15 C 35 -14 37 -10 35 -6 C 33 -2 28 3 22 7 C 16 10 10 11 6 10 C 2 8 0 4 0 0" fill={`url(#${pfx('sfLeafBase')})`} />
              <path d="M 0.5 0 C 3 -2 9.5 -7 16 -11 C 20 -13 26 -15 29 -14 C 33 -13 34 -9 33 -6 C 31 -2 27 3 21 6 C 16 8 10 9 6 8 C 2 7 0.5 3.5 0.5 0" fill={`url(#${pfx('sfLeafMid')})`} opacity="0.85" />
              <path d="M 2 -1 C 5 -3 11 -7 16 -10 C 20 -12 24 -13 27 -12 C 30 -11 31 -8 30 -5 C 28 -2 24 2 20 4 C 15 6 10 6 7 5 C 4 3 2 1 2 -1" fill={`url(#${pfx('sfLeafHi')})`} opacity="0.4" />
              <path d="M 0 0 C 4 -2 13 -6 22 -10 C 28 -12 33 -12 35 -7" stroke="#2d4e18" strokeWidth="0.9" fill="none" />
              <path d="M 0 0 C 4 -2 13 -6 22 -10 C 28 -12 33 -12 35 -7" stroke="#4a7530" strokeWidth="0.35" fill="none" opacity="0.35" />
              <path d="M 6 -3 C 8 -6 10 -10 12 -13" stroke="#3a6020" strokeWidth="0.4" fill="none" opacity="0.55" />
              <path d="M 6 -3 C 8 0 10 3 11 5" stroke="#3a6020" strokeWidth="0.35" fill="none" opacity="0.45" />
              <path d="M 13 -5 C 16 -9 18 -12 20 -14" stroke="#3a6020" strokeWidth="0.35" fill="none" opacity="0.5" />
              <path d="M 13 -5 C 15 -2 17 1 19 3" stroke="#3a6020" strokeWidth="0.3" fill="none" opacity="0.4" />
              <path d="M 19 -7 C 22 -10 25 -13 27 -14" stroke="#3a6020" strokeWidth="0.3" fill="none" opacity="0.45" />
              <path d="M 19 -7 C 21 -4 24 -1 26 1" stroke="#3a6020" strokeWidth="0.25" fill="none" opacity="0.35" />
              <path d="M 25 -9 C 28 -11 30 -12 32 -13" stroke="#3a6020" strokeWidth="0.25" fill="none" opacity="0.4" />
              <path d="M 25 -9 C 27 -6 29 -3 30 -1" stroke="#3a6020" strokeWidth="0.2" fill="none" opacity="0.3" />
              <path d="M 10 -5 C 11 -7 12 -9 13 -10" stroke="#4a7a30" strokeWidth="0.2" fill="none" opacity="0.2" />
              <path d="M 16 -7 C 17 -9 18 -10 19 -11" stroke="#4a7a30" strokeWidth="0.2" fill="none" opacity="0.2" />
            </g>
          </g>

          {/* Upper left leaf */}
          <g filter={`url(#${pfx('softShadow')})`}>
            <path d="M 100 192 C 97 190 94 187 91 185" stroke="#3d6b2e" strokeWidth="1.6" fill="none" strokeLinecap="round" />
            <path d="M 100 192 C 97 190 94 187 91 185" stroke="#5a8a3c" strokeWidth="0.6" fill="none" strokeLinecap="round" opacity="0.4" />
            <g transform="translate(91, 185) rotate(-45)">
              <path d="M 0 0 C -2 -1.5 -7 -5 -12 -7 C -15 -9 -19 -10 -22 -9 C -25 -8 -26 -5 -24 -2 C -22 1 -19 4 -14 6 C -10 8 -6 8 -3 7 C -1 5 0 2.5 0 0" fill={`url(#${pfx('sfLeafBase')})`} />
              <path d="M -0.5 0 C -2.5 -1.5 -7 -4.5 -11.5 -6.5 C -14 -8 -18 -9.5 -21 -8.5 C -23 -7.5 -24 -5 -23 -2 C -21 0.5 -18 3.5 -14 5.5 C -10 7 -6 7 -3 6 C -1 4.5 -0.5 2 -0.5 0" fill={`url(#${pfx('sfLeafMid')})`} opacity="0.85" />
              <path d="M -1.5 -0.5 C -3 -2 -7 -4 -11 -6 C -14 -7 -17 -8 -19 -7 C -21 -6 -22 -4 -21 -2 C -19 0 -16 2.5 -13 4 C -9 5 -6 5 -4 4 C -2 2.5 -1.5 1 -1.5 -0.5" fill={`url(#${pfx('sfLeafHi')})`} opacity="0.4" />
              <path d="M 0 0 C -3 -1 -10 -4 -16 -6 C -20 -7 -24 -7 -24 -3" stroke="#2d4e18" strokeWidth="0.7" fill="none" />
              <path d="M -5 -2 C -7 -4 -8 -6 -9 -8" stroke="#3a6020" strokeWidth="0.3" fill="none" opacity="0.5" />
              <path d="M -5 -2 C -6 0 -7 2 -8 3" stroke="#3a6020" strokeWidth="0.25" fill="none" opacity="0.4" />
              <path d="M -10 -3 C -12 -5 -14 -7 -15 -8" stroke="#3a6020" strokeWidth="0.25" fill="none" opacity="0.45" />
              <path d="M -10 -3 C -12 -1 -14 1 -15 2" stroke="#3a6020" strokeWidth="0.2" fill="none" opacity="0.35" />
              <path d="M -16 -5 C -18 -6 -20 -8 -21 -8" stroke="#3a6020" strokeWidth="0.2" fill="none" opacity="0.4" />
              <path d="M -16 -5 C -18 -3 -20 -1 -21 0" stroke="#3a6020" strokeWidth="0.18" fill="none" opacity="0.3" />
            </g>
          </g>

          {/* Upper right leaf */}
          <g filter={`url(#${pfx('softShadow')})`}>
            <path d="M 100 182 C 103 180 106 177 109 175" stroke="#3d6b2e" strokeWidth="1.6" fill="none" strokeLinecap="round" />
            <path d="M 100 182 C 103 180 106 177 109 175" stroke="#5a8a3c" strokeWidth="0.6" fill="none" strokeLinecap="round" opacity="0.4" />
            <g transform="translate(109, 175) rotate(40)">
              <path d="M 0 0 C 2 -2 7 -5.5 13 -8 C 16 -10 20 -11 23 -10 C 26 -9 27 -6 25 -3 C 23 0 20 3.5 15 6 C 11 8 7 8 4 7 C 1 5.5 0 3 0 0" fill={`url(#${pfx('sfLeafBase')})`} />
              <path d="M 0.5 0 C 2.5 -2 7.5 -5 12.5 -7.5 C 15 -9 19 -10 22 -9.5 C 24 -8.5 25 -6 24 -3 C 22 0 19 3 15 5 C 11 7 7 7 4 6 C 1.5 4.5 0.5 2 0.5 0" fill={`url(#${pfx('sfLeafMid')})`} opacity="0.85" />
              <path d="M 1.5 -0.5 C 3.5 -2 8 -4.5 12 -7 C 15 -8 18 -9 20 -8 C 22 -7 23 -5 22 -3 C 20 -1 18 2 14 3.5 C 10 5 7 5 5 4 C 3 2.5 1.5 1 1.5 -0.5" fill={`url(#${pfx('sfLeafHi')})`} opacity="0.4" />
              <path d="M 0 0 C 3 -1 10 -4 17 -7 C 21 -8 25 -8 25 -4" stroke="#2d4e18" strokeWidth="0.7" fill="none" />
              <path d="M 5 -2 C 7 -4 9 -7 10 -9" stroke="#3a6020" strokeWidth="0.3" fill="none" opacity="0.5" />
              <path d="M 5 -2 C 7 0 8 2 9 3" stroke="#3a6020" strokeWidth="0.25" fill="none" opacity="0.4" />
              <path d="M 11 -4 C 13 -6 15 -8 16 -9" stroke="#3a6020" strokeWidth="0.25" fill="none" opacity="0.45" />
              <path d="M 11 -4 C 13 -2 15 0 16 2" stroke="#3a6020" strokeWidth="0.2" fill="none" opacity="0.35" />
              <path d="M 17 -6 C 19 -7 21 -8 22 -9" stroke="#3a6020" strokeWidth="0.2" fill="none" opacity="0.4" />
              <path d="M 17 -6 C 19 -4 21 -2 22 -1" stroke="#3a6020" strokeWidth="0.18" fill="none" opacity="0.3" />
            </g>
          </g>
        </g>
      )}

      {/* Stage 5: Bloom */}
      {stage >= 5 && (
        <g transform="translate(100, 120)" filter={`url(#${pfx('dropShadow')})`}>
          {Array.from({ length: 16 }, (_, i) => {
            const deg = (360 / 16) * i;
            return (
              <path key={`outer-${i}`} d="M 0 -3 C -5 -14 -7 -30 -4 -42 C -2 -46 2 -46 4 -42 C 7 -30 5 -14 0 -3" fill={`url(#${pfx('sfPetalOuter')})`} transform={`rotate(${deg})`} />
            );
          })}
          {Array.from({ length: 16 }, (_, i) => {
            const deg = (360 / 16) * i + (360 / 32);
            return (
              <path key={`inner-${i}`} d="M 0 -2 C -4 -10 -5 -24 -3 -34 C -1.5 -37 1.5 -37 3 -34 C 5 -24 4 -10 0 -2" fill={`url(#${pfx('sfPetalInner')})`} transform={`rotate(${deg})`} />
            );
          })}
          <circle r="19" fill="#2a1508" opacity="0.3" cx="0.5" cy="0.5" />
          <circle r="18" fill={`url(#${pfx('sfCenter')})`} />
          <circle r="16" fill="none" stroke="#5d3a1a" strokeWidth="0.4" opacity="0.3" />
          <circle r="12" fill="none" stroke="#4a2a12" strokeWidth="0.3" opacity="0.2" />
          <circle r="8" fill="none" stroke="#5d3a1a" strokeWidth="0.3" opacity="0.15" />
          <ellipse cx="-4" cy="-4" rx="5" ry="4" fill="#6b4422" opacity="0.25" />
        </g>
      )}

      {/* Stage 6: Fibonacci seeds */}
      {stage >= 6 && (
        <g transform="translate(100, 120)">
          {Array.from({ length: 100 }, (_, i) => {
            const angle = (137.508 * i * Math.PI) / 180;
            const r = 1.1 * Math.sqrt(i);
            const x = r * Math.cos(angle);
            const y = r * Math.sin(angle);
            if (Math.sqrt(x * x + y * y) > 16.5) return null;
            const shade = i % 7;
            return (
              <circle key={`seed-${i}`} cx={x} cy={y} r={0.7 + (i % 4) * 0.1} fill={shade < 2 ? "#6b4422" : shade < 4 ? "#4a2a12" : "#3e2210"} opacity={0.6 + (i % 3) * 0.12} />
            );
          })}
        </g>
      )}

      {/* Stage 7: Harvest glow */}
      {stage >= 7 && (
        <g>
          <circle cx="100" cy="140" r="70" fill={`url(#${pfx('harvestGlow')})`} className="animate-pulse" />
          {[
            { x: 140, y: 75, delay: '0s' },
            { x: 60, y: 65, delay: '1.2s' },
            { x: 155, y: 100, delay: '2.5s' },
            { x: 48, y: 90, delay: '3.8s' },
            { x: 130, y: 60, delay: '1.8s' },
          ].map((s, i) => (
            <g key={`float-${i}`} className="animate-float-away" style={{ animationDelay: s.delay }}>
              <ellipse cx={s.x} cy={s.y} rx="1.8" ry="3" fill="#a08050" opacity="0.6" transform={`rotate(${25 * i} ${s.x} ${s.y})`} />
              <ellipse cx={s.x} cy={s.y} rx="1" ry="1.5" fill="#c4b080" opacity="0.3" transform={`rotate(${25 * i} ${s.x} ${s.y})`} />
            </g>
          ))}
        </g>
      )}
    </g>
  );
}
