export function mushroomGradients(pfx: (name: string) => string) {
  return (
    <>
      {/* Cap radial gradient — deep red-brown with depth */}
      <radialGradient id={pfx('mushCap')} cx="45%" cy="35%" r="60%">
        <stop offset="0%" stopColor="#c04030" />
        <stop offset="40%" stopColor="#b03828" />
        <stop offset="70%" stopColor="#a03020" />
        <stop offset="100%" stopColor="#802418" />
      </radialGradient>

      {/* Stem linear gradient — cream cylindrical shading */}
      <linearGradient id={pfx('mushStem')} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#d4c8a0" />
        <stop offset="20%" stopColor="#e0d4b0" />
        <stop offset="50%" stopColor="#e8dcc0" />
        <stop offset="80%" stopColor="#e0d4b0" />
        <stop offset="100%" stopColor="#d4c8a0" />
      </linearGradient>

      {/* Gill gradient — warm golden-brown */}
      <linearGradient id={pfx('mushGill')} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#d4b880" />
        <stop offset="60%" stopColor="#c4a468" />
        <stop offset="100%" stopColor="#b89860" />
      </linearGradient>

      {/* Spot radial gradient — off-white */}
      <radialGradient id={pfx('mushSpot')} cx="40%" cy="35%" r="55%">
        <stop offset="0%" stopColor="#f8f0e0" />
        <stop offset="60%" stopColor="#f0e8d8" />
        <stop offset="100%" stopColor="#e8dcc8" />
      </radialGradient>

      {/* Mycelium gradient — pale cream threads */}
      <linearGradient id={pfx('mushMycelium')} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#e8e0d0" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#e0d8c0" stopOpacity="0.3" />
      </linearGradient>

      {/* Spore particle gradient */}
      <radialGradient id={pfx('mushSpore')} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#d4af37" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#c49a28" stopOpacity="0" />
      </radialGradient>
    </>
  );
}

export function renderMushroom(stage: number, pfx: (name: string) => string) {
  return (
    <g>
      {/* Stage 1: Spore cluster — tiny dark dots near soil */}
      {stage >= 1 && (
        <g transform="translate(100, 264)" filter={`url(#${pfx('softShadow')})`}>
          <circle cx="-2" cy="-1" r="1.8" fill="#3a2518" opacity="0.7" />
          <circle cx="2" cy="0" r="1.5" fill="#4a3020" opacity="0.65" />
          <circle cx="0" cy="-3" r="1.3" fill="#3a2518" opacity="0.6" />
          <circle cx="-3.5" cy="1" r="1.1" fill="#4a3020" opacity="0.5" />
          <circle cx="3.5" cy="-2" r="1.2" fill="#3a2518" opacity="0.55" />
          <circle cx="1" cy="1.5" r="0.9" fill="#4a3020" opacity="0.45" />
          <circle cx="-1" cy="2" r="0.7" fill="#3a2518" opacity="0.4" />
        </g>
      )}

      {/* Stage 2: Underground mycelium — branching white/cream threads below soil */}
      {stage >= 2 && (
        <g opacity="0.6">
          {/* Central downward threads */}
          <path
            d="M 100 268 C 99 274 97 280 94 288"
            stroke="#e0d8c0" strokeWidth="1.2" fill="none" strokeLinecap="round"
          />
          <path
            d="M 100 268 C 101 275 104 282 108 290"
            stroke="#e0d8c0" strokeWidth="1.0" fill="none" strokeLinecap="round"
          />
          <path
            d="M 100 270 C 96 273 91 276 86 280"
            stroke="#e0d8c0" strokeWidth="0.8" fill="none" strokeLinecap="round"
          />
          <path
            d="M 100 270 C 104 274 110 278 116 282"
            stroke="#e0d8c0" strokeWidth="0.8" fill="none" strokeLinecap="round"
          />
          {/* Fine branching sub-threads */}
          <path
            d="M 94 280 C 91 283 87 286 83 288"
            stroke="#e0d8c0" strokeWidth="0.5" fill="none" strokeLinecap="round"
          />
          <path
            d="M 94 280 C 92 284 90 288 88 292"
            stroke="#e0d8c0" strokeWidth="0.4" fill="none" strokeLinecap="round"
          />
          <path
            d="M 108 282 C 112 285 116 288 120 290"
            stroke="#e0d8c0" strokeWidth="0.5" fill="none" strokeLinecap="round"
          />
          <path
            d="M 108 282 C 110 286 112 290 114 294"
            stroke="#e0d8c0" strokeWidth="0.4" fill="none" strokeLinecap="round"
          />
          <path
            d="M 86 280 C 82 282 78 284 75 285"
            stroke="#e0d8c0" strokeWidth="0.35" fill="none" strokeLinecap="round"
          />
          <path
            d="M 116 282 C 120 284 124 285 127 286"
            stroke="#e0d8c0" strokeWidth="0.35" fill="none" strokeLinecap="round"
          />
          {/* Tiny branching tips */}
          <path
            d="M 83 288 C 80 290 77 291 75 291"
            stroke="#e0d8c0" strokeWidth="0.25" fill="none" strokeLinecap="round"
          />
          <path
            d="M 120 290 C 123 291 126 292 128 292"
            stroke="#e0d8c0" strokeWidth="0.25" fill="none" strokeLinecap="round"
          />
        </g>
      )}

      {/* Stage 3: Tiny pin breaking the surface — small rounded bump */}
      {stage >= 3 && stage < 4 && (
        <g transform="translate(100, 258)" filter={`url(#${pfx('softShadow')})`}>
          {/* Small shadow at base */}
          <ellipse cx="0" cy="6" rx="5" ry="1.5" fill="#3a2518" opacity="0.15" />
          {/* Pin body — rounded bump */}
          <path
            d="M -3 4 C -3 2 -4 -2 -3 -4 C -2 -6 2 -6 3 -4 C 4 -2 3 2 3 4 Z"
            fill="#e8dcc0" stroke="#d4c8a0" strokeWidth="0.4"
          />
          {/* Tiny cap forming — slight dome */}
          <ellipse cx="0" cy="-4" rx="4.5" ry="3" fill="#c04030" opacity="0.7" />
          <ellipse cx="-1" cy="-4.5" rx="1.5" ry="1" fill="#f0e8d8" opacity="0.4" />
        </g>
      )}

      {/* Stage 4+: Growing/full stem */}
      {stage >= 4 && (() => {
        const stemTop = stage >= 5 ? 160 : 190;
        const stemWidth = stage >= 5 ? 10 : 7;
        const stemBaseWidth = stage >= 5 ? 14 : 10;
        return (
          <g filter={`url(#${pfx('softShadow')})`}>
            {/* Stem shadow */}
            <ellipse cx="101" cy="265" rx={stemBaseWidth * 0.7} ry="2.5" fill="#3a2518" opacity="0.15" />
            {/* Stem body — tapers wider at base */}
            <path
              d={`M ${100 - stemWidth * 0.5} ${stemTop + 10}
                  C ${100 - stemWidth * 0.5} ${stemTop + 40} ${100 - stemBaseWidth * 0.5} 248 ${100 - stemBaseWidth * 0.5} 264
                  L ${100 + stemBaseWidth * 0.5} 264
                  C ${100 + stemBaseWidth * 0.5} 248 ${100 + stemWidth * 0.5} ${stemTop + 40} ${100 + stemWidth * 0.5} ${stemTop + 10}
                  Z`}
              fill={`url(#${pfx('mushStem')})`}
            />
            {/* Stem highlight — central lighter stripe */}
            <path
              d={`M ${100 - stemWidth * 0.15} ${stemTop + 14}
                  C ${100 - stemWidth * 0.15} ${stemTop + 45} ${100 - stemBaseWidth * 0.15} 250 ${100 - stemBaseWidth * 0.15} 262
                  L ${100 + stemBaseWidth * 0.15} 262
                  C ${100 + stemBaseWidth * 0.15} 250 ${100 + stemWidth * 0.15} ${stemTop + 45} ${100 + stemWidth * 0.15} ${stemTop + 14}
                  Z`}
              fill="#f0e8d8" opacity="0.2"
            />
            {/* Annulus (ring) on stem */}
            {stage >= 5 && (
              <ellipse cx="100" cy={stemTop + 30} rx={stemWidth * 0.65} ry="2" fill="#e0d4b0" stroke="#d4c8a0" strokeWidth="0.4" opacity="0.7" />
            )}
          </g>
        );
      })()}

      {/* Stage 4: Expanding cap — dome shape, not yet full */}
      {stage >= 4 && stage < 5 && (
        <g transform="translate(100, 180)" filter={`url(#${pfx('softShadow')})`}>
          {/* Cap dome */}
          <path
            d="M -24 10 C -26 0 -22 -16 -12 -24 C -4 -30 4 -30 12 -24 C 22 -16 26 0 24 10 Z"
            fill={`url(#${pfx('mushCap')})`}
          />
          {/* Cap edge highlight */}
          <path
            d="M -24 10 C -26 0 -22 -16 -12 -24 C -4 -30 4 -30 12 -24 C 22 -16 26 0 24 10"
            fill="none" stroke="#d04838" strokeWidth="0.5" opacity="0.4"
          />
          {/* White spots */}
          <ellipse cx="-8" cy="-14" rx="3.5" ry="2.5" fill={`url(#${pfx('mushSpot')})`} opacity="0.85" transform="rotate(-10 -8 -14)" />
          <ellipse cx="6" cy="-18" rx="2.5" ry="2" fill={`url(#${pfx('mushSpot')})`} opacity="0.8" transform="rotate(8 6 -18)" />
          <ellipse cx="-14" cy="-4" rx="2" ry="1.5" fill={`url(#${pfx('mushSpot')})`} opacity="0.7" transform="rotate(-15 -14 -4)" />
          <ellipse cx="14" cy="-6" rx="2.5" ry="1.8" fill={`url(#${pfx('mushSpot')})`} opacity="0.75" transform="rotate(12 14 -6)" />
          {/* Cap underside — partial arc */}
          <path
            d="M -22 10 Q 0 16 22 10"
            fill={`url(#${pfx('mushGill')})`} opacity="0.5"
          />
        </g>
      )}

      {/* Stage 5+: Full mature mushroom cap with gills */}
      {stage >= 5 && (
        <g>
          {/* Main mushroom cap */}
          <g transform="translate(100, 150)" filter={`url(#${pfx('softShadow')})`}>
            {/* Cap dome — large fairy-tale shape */}
            <path
              d="M -38 12 C -42 -2 -36 -26 -20 -38 C -10 -46 10 -46 20 -38 C 36 -26 42 -2 38 12 Z"
              fill={`url(#${pfx('mushCap')})`}
            />
            {/* Cap edge highlight */}
            <path
              d="M -38 12 C -42 -2 -36 -26 -20 -38 C -10 -46 10 -46 20 -38 C 36 -26 42 -2 38 12"
              fill="none" stroke="#d04838" strokeWidth="0.6" opacity="0.3"
            />
            {/* Specular highlight on cap */}
            <ellipse cx="-8" cy="-24" rx="14" ry="8" fill="#d05040" opacity="0.25" transform="rotate(-8 -8 -24)" />
            {/* White spots — classic fairy-tale pattern */}
            <ellipse cx="-12" cy="-28" rx="5" ry="3.5" fill={`url(#${pfx('mushSpot')})`} opacity="0.9" transform="rotate(-8 -12 -28)" />
            <ellipse cx="10" cy="-32" rx="4" ry="3" fill={`url(#${pfx('mushSpot')})`} opacity="0.85" transform="rotate(10 10 -32)" />
            <ellipse cx="-24" cy="-10" rx="3.5" ry="2.5" fill={`url(#${pfx('mushSpot')})`} opacity="0.8" transform="rotate(-18 -24 -10)" />
            <ellipse cx="22" cy="-14" rx="4" ry="2.8" fill={`url(#${pfx('mushSpot')})`} opacity="0.82" transform="rotate(14 22 -14)" />
            <ellipse cx="0" cy="-38" rx="3" ry="2.2" fill={`url(#${pfx('mushSpot')})`} opacity="0.75" transform="rotate(2 0 -38)" />
            <ellipse cx="-20" cy="-24" rx="2.5" ry="2" fill={`url(#${pfx('mushSpot')})`} opacity="0.7" transform="rotate(-5 -20 -24)" />
            <ellipse cx="28" cy="-4" rx="3" ry="2" fill={`url(#${pfx('mushSpot')})`} opacity="0.65" transform="rotate(20 28 -4)" />

            {/* Gill area — underside of cap */}
            <path
              d="M -36 12 Q 0 22 36 12"
              fill={`url(#${pfx('mushGill')})`} opacity="0.6"
            />
            {/* Radial gill lines */}
            {Array.from({ length: 13 }, (_, i) => {
              const x = -30 + (60 / 12) * i;
              const curve = Math.abs(x) * 0.12;
              return (
                <path
                  key={`gill-${i}`}
                  d={`M ${x} ${12 + Math.abs(x) * 0.08} L ${x * 0.3} ${17 - curve}`}
                  stroke="#b89860" strokeWidth="0.4" fill="none" opacity={0.4 + Math.random() * 0.2}
                />
              );
            })}
          </g>

          {/* Smaller companion mushroom — left side */}
          <g transform="translate(68, 240)" filter={`url(#${pfx('softShadow')})`}>
            {/* Small stem */}
            <path
              d="M -3 0 C -3 -8 -4 -22 -3 -30 L 3 -30 C 4 -22 3 -8 3 0 Z"
              fill={`url(#${pfx('mushStem')})`}
            />
            {/* Small cap */}
            <path
              d="M -14 -28 C -16 -34 -12 -44 -6 -48 C -2 -50 2 -50 6 -48 C 12 -44 16 -34 14 -28 Z"
              fill={`url(#${pfx('mushCap')})`}
            />
            {/* Small spots */}
            <ellipse cx="-4" cy="-40" rx="2" ry="1.5" fill={`url(#${pfx('mushSpot')})`} opacity="0.8" />
            <ellipse cx="5" cy="-42" rx="1.8" ry="1.3" fill={`url(#${pfx('mushSpot')})`} opacity="0.7" />
            <ellipse cx="-8" cy="-34" rx="1.5" ry="1" fill={`url(#${pfx('mushSpot')})`} opacity="0.65" />
            {/* Small gills */}
            <path d="M -12 -28 Q 0 -24 12 -28" fill={`url(#${pfx('mushGill')})`} opacity="0.5" />
          </g>

          {/* Tiny companion mushroom — right side */}
          {stage >= 5 && (
            <g transform="translate(138, 248)" filter={`url(#${pfx('softShadow')})`}>
              {/* Tiny stem */}
              <path
                d="M -2 0 C -2 -5 -2.5 -14 -2 -18 L 2 -18 C 2.5 -14 2 -5 2 0 Z"
                fill={`url(#${pfx('mushStem')})`}
              />
              {/* Tiny cap */}
              <path
                d="M -9 -16 C -10 -20 -8 -28 -4 -31 C -1 -33 1 -33 4 -31 C 8 -28 10 -20 9 -16 Z"
                fill={`url(#${pfx('mushCap')})`}
              />
              {/* Tiny spots */}
              <ellipse cx="-2" cy="-25" rx="1.5" ry="1" fill={`url(#${pfx('mushSpot')})`} opacity="0.75" />
              <ellipse cx="3" cy="-27" rx="1.2" ry="0.9" fill={`url(#${pfx('mushSpot')})`} opacity="0.65" />
              {/* Tiny gills */}
              <path d="M -8 -16 Q 0 -13 8 -16" fill={`url(#${pfx('mushGill')})`} opacity="0.45" />
            </g>
          )}
        </g>
      )}

      {/* Stage 6: Spore cloud — particles drifting upward from under the cap */}
      {stage >= 6 && (
        <g>
          {[
            { x: 88, y: 164, r: 1.4, opacity: 0.5 },
            { x: 96, y: 168, r: 1.0, opacity: 0.45 },
            { x: 104, y: 166, r: 1.2, opacity: 0.5 },
            { x: 112, y: 165, r: 1.1, opacity: 0.4 },
            { x: 92, y: 170, r: 0.9, opacity: 0.35 },
            { x: 108, y: 172, r: 1.0, opacity: 0.4 },
            { x: 100, y: 158, r: 1.3, opacity: 0.55 },
            { x: 84, y: 160, r: 0.8, opacity: 0.3 },
            { x: 116, y: 162, r: 0.9, opacity: 0.35 },
            { x: 94, y: 152, r: 1.1, opacity: 0.45 },
            { x: 106, y: 148, r: 1.0, opacity: 0.4 },
            { x: 100, y: 144, r: 0.8, opacity: 0.3 },
            { x: 88, y: 150, r: 0.7, opacity: 0.25 },
            { x: 112, y: 154, r: 0.9, opacity: 0.35 },
          ].map((p, i) => (
            <circle
              key={`spore-${i}`}
              cx={p.x}
              cy={p.y}
              r={p.r}
              fill={`url(#${pfx('mushSpore')})`}
              opacity={p.opacity}
            >
              <animate
                attributeName="cy"
                values={`${p.y};${p.y - 20 - i * 3};${p.y}`}
                dur={`${3 + (i % 4) * 0.8}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values={`${p.opacity};${p.opacity * 0.3};${p.opacity}`}
                dur={`${3 + (i % 4) * 0.8}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </g>
      )}

      {/* Stage 7: Harvest — golden glow + floating spore particles */}
      {stage >= 7 && (
        <g>
          {/* Golden harvest glow */}
          <circle
            cx="100"
            cy="155"
            r="75"
            fill={`url(#${pfx('harvestGlow')})`}
            className="animate-pulse"
          />
          {/* Floating spore particles drifting away */}
          {[
            { x: 140, y: 100, delay: '0s' },
            { x: 60, y: 90, delay: '1.2s' },
            { x: 155, y: 130, delay: '2.5s' },
            { x: 48, y: 120, delay: '3.8s' },
            { x: 130, y: 80, delay: '1.8s' },
            { x: 70, y: 110, delay: '0.6s' },
            { x: 120, y: 70, delay: '2.8s' },
            { x: 80, y: 75, delay: '3.2s' },
          ].map((s, i) => (
            <g key={`float-${i}`} className="animate-float-away" style={{ animationDelay: s.delay }}>
              <circle cx={s.x} cy={s.y} r="2" fill="#d4af37" opacity="0.6" />
              <circle cx={s.x} cy={s.y} r="1" fill="#f0d860" opacity="0.3" />
            </g>
          ))}
        </g>
      )}
    </g>
  );
}
