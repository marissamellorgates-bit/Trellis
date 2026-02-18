export function oakGradients(pfx: (name: string) => string) {
  return (
    <>
      <linearGradient id={pfx('oakTrunk')} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#2e1808" />
        <stop offset="15%" stopColor="#4a2c14" />
        <stop offset="35%" stopColor="#6b4528" />
        <stop offset="50%" stopColor="#7a5230" />
        <stop offset="65%" stopColor="#6b4528" />
        <stop offset="85%" stopColor="#4a2c14" />
        <stop offset="100%" stopColor="#2e1808" />
      </linearGradient>
      <linearGradient id={pfx('oakTrunkHi')} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#a07850" stopOpacity="0" />
        <stop offset="35%" stopColor="#a07850" stopOpacity="0.25" />
        <stop offset="50%" stopColor="#b08860" stopOpacity="0.35" />
        <stop offset="65%" stopColor="#a07850" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#a07850" stopOpacity="0" />
      </linearGradient>
      <linearGradient id={pfx('oakBark')} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3a2010" stopOpacity="0.4" />
        <stop offset="50%" stopColor="#2e1808" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#3a2010" stopOpacity="0.3" />
      </linearGradient>
      <radialGradient id={pfx('oakCanopy1')} cx="45%" cy="55%" r="55%">
        <stop offset="0%" stopColor="#5a9c4e" />
        <stop offset="60%" stopColor="#3d7a33" />
        <stop offset="100%" stopColor="#1e5518" />
      </radialGradient>
      <radialGradient id={pfx('oakCanopy2')} cx="40%" cy="45%" r="60%">
        <stop offset="0%" stopColor="#4a8c3f" />
        <stop offset="60%" stopColor="#2d6b25" />
        <stop offset="100%" stopColor="#1a4a14" />
      </radialGradient>
      <radialGradient id={pfx('oakCanopy3')} cx="55%" cy="50%" r="55%">
        <stop offset="0%" stopColor="#68b058" />
        <stop offset="60%" stopColor="#4a8c3f" />
        <stop offset="100%" stopColor="#2d6b25" />
      </radialGradient>
      {/* Oak leaf base */}
      <linearGradient id={pfx('oakLeafBase')} x1="0" y1="0" x2="0.8" y2="1">
        <stop offset="0%" stopColor="#2d6020" />
        <stop offset="100%" stopColor="#1a4a14" />
      </linearGradient>
      {/* Oak leaf mid */}
      <linearGradient id={pfx('oakLeafMid')} x1="0.2" y1="0" x2="1" y2="0.8">
        <stop offset="0%" stopColor="#4a8c3f" />
        <stop offset="50%" stopColor="#3d7a33" />
        <stop offset="100%" stopColor="#2d6020" />
      </linearGradient>
      {/* Oak leaf highlight */}
      <linearGradient id={pfx('oakLeafHi')} x1="0.3" y1="0" x2="0.7" y2="1">
        <stop offset="0%" stopColor="#78c060" stopOpacity="0.55" />
        <stop offset="50%" stopColor="#60a848" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#4a8c3f" stopOpacity="0" />
      </linearGradient>
      {/* Oak leaf shape gradient (canopy edge leaves) */}
      <radialGradient id={pfx('oakLeafG')} cx="40%" cy="40%" r="65%">
        <stop offset="0%" stopColor="#5ea050" />
        <stop offset="100%" stopColor="#2d6b25" />
      </radialGradient>
      <linearGradient id={pfx('acornGrad')} x1="0.3" y1="0" x2="0.7" y2="1">
        <stop offset="0%" stopColor="#b89060" />
        <stop offset="30%" stopColor="#a08050" />
        <stop offset="70%" stopColor="#8b6d3f" />
        <stop offset="100%" stopColor="#6b5030" />
      </linearGradient>
      <linearGradient id={pfx('acornCapGrad')} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#c4a070" />
        <stop offset="50%" stopColor="#a08050" />
        <stop offset="100%" stopColor="#7a5a35" />
      </linearGradient>
      <linearGradient id={pfx('oakBranchGrad')} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#4a2c14" />
        <stop offset="50%" stopColor="#6b4528" />
        <stop offset="100%" stopColor="#4a2c14" />
      </linearGradient>
    </>
  );
}

export function renderOak(stage: number, pfx: (name: string) => string) {
  return (
    <g>
      {/* Stage 1: Acorn with detailed cap */}
      {stage >= 1 && (
        <g transform="translate(100, 256)" filter={`url(#${pfx('softShadow')})`}>
          {/* Ground shadow */}
          <ellipse cx="0.5" cy="10" rx="6" ry="2.5" fill="#3a2518" opacity="0.2" />
          {/* Cap stem nub */}
          <path d="M -0.6 -12 C -0.6 -14 0.6 -14 0.6 -12 L 0.6 -9.5 L -0.6 -9.5 Z" fill="#5a4025" />
          <path d="M -0.3 -13.5 C -0.3 -14.5 0.3 -14.5 0.3 -13.5 L 0.3 -12 L -0.3 -12 Z" fill="#7a5a35" opacity="0.5" />
          {/* Cap */}
          <path d="M -7 -2 C -7.5 -5.5 -5 -8 -2.5 -9.5 C 0 -10.5 2.5 -9.5 5 -8 C 7 -5.5 7.5 -2 7 -2 Z" fill={`url(#${pfx('acornCapGrad')})`} />
          <path d="M -7 -2 C -7.5 -5.5 -5 -8 -2.5 -9.5 C 0 -10.5 2.5 -9.5 5 -8 C 7 -5.5 7.5 -2 7 -2 Z" fill="none" stroke="#6b5030" strokeWidth="0.4" />
          {/* Cap crosshatch texture */}
          <path d="M -5 -5 Q -3 -4 0 -5.5 Q 3 -4 5.5 -5" stroke="#8a6a40" strokeWidth="0.35" fill="none" opacity="0.5" />
          <path d="M -6 -3.5 Q -3 -2.5 0 -3.8 Q 3 -2.5 6 -3.5" stroke="#8a6a40" strokeWidth="0.3" fill="none" opacity="0.4" />
          <path d="M -4.5 -7 Q -2 -6 0 -7.5 Q 2 -6 4.5 -7" stroke="#8a6a40" strokeWidth="0.25" fill="none" opacity="0.35" />
          {/* Cap rim */}
          <path d="M -7 -2 Q 0 -0.5 7 -2" stroke="#6b5030" strokeWidth="0.6" fill="none" />
          {/* Acorn body */}
          <path d="M -6.5 -2 C -6.5 2 -5 6 -3 8 C -1 9.5 1 9.5 3 8 C 5 6 6.5 2 6.5 -2 Z" fill={`url(#${pfx('acornGrad')})`} />
          {/* Body highlight */}
          <path d="M -3 -1 C -4 2 -3.5 5 -2 7 C -1 8 0 7 0.5 5 C 1 3 0 0 -1 -1 Z" fill="#c4a870" opacity="0.25" />
          {/* Body outline */}
          <path d="M -6.5 -2 C -6.5 2 -5 6 -3 8 C -1 9.5 1 9.5 3 8 C 5 6 6.5 2 6.5 -2" fill="none" stroke="#5a4025" strokeWidth="0.4" />
          {/* Tip */}
          <ellipse cx="0" cy="9" rx="1.2" ry="1" fill="#5a4025" />
          <ellipse cx="0" cy="9" rx="0.6" ry="0.5" fill="#7a6040" opacity="0.4" />
        </g>
      )}

      {/* Stage 2: Thick taproot + lateral roots */}
      {stage >= 2 && (
        <g opacity="0.65">
          {/* Main taproot */}
          <path d="M 100 266 C 100 274 99 284 98 295" stroke="#5a3e28" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M 100 266 C 100 274 99 284 98 295" stroke="#7a5a3a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M 100.5 268 C 100.5 274 100 282 99 292" stroke="#9a7a5a" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.3" />
          {/* Primary laterals */}
          <path d="M 100 271 C 93 275 83 279 74 282" stroke="#6b4e30" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 100 271 C 107 276 117 280 126 283" stroke="#6b4e30" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Secondary laterals */}
          <path d="M 99 277 C 94 281 86 285 79 288" stroke="#7a5a3a" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          <path d="M 100 279 C 106 283 114 287 122 289" stroke="#7a5a3a" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          {/* Fine root tips */}
          <path d="M 78 281 C 74 283 70 284 66 284" stroke="#7a5a3a" strokeWidth="0.5" fill="none" strokeLinecap="round" />
          <path d="M 74 282 C 72 285 69 287 66 288" stroke="#7a5a3a" strokeWidth="0.4" fill="none" strokeLinecap="round" />
          <path d="M 124 282 C 128 284 132 285 136 284" stroke="#7a5a3a" strokeWidth="0.5" fill="none" strokeLinecap="round" />
          <path d="M 122 284 C 125 287 129 289 133 289" stroke="#7a5a3a" strokeWidth="0.4" fill="none" strokeLinecap="round" />
          <path d="M 80 287 C 76 289 73 290 70 290" stroke="#7a5a3a" strokeWidth="0.3" fill="none" strokeLinecap="round" />
          <path d="M 120 288 C 124 290 127 291 130 290" stroke="#7a5a3a" strokeWidth="0.3" fill="none" strokeLinecap="round" />
        </g>
      )}

      {/* Stage 3: Trunk */}
      {stage >= 3 && (() => {
        const trunkTop = stage >= 5 ? 138 : stage >= 4 ? 185 : 225;
        const tw = stage >= 5 ? 12 : stage >= 4 ? 8 : 5.5;
        return (
          <g>
            {/* Trunk shadow */}
            <path
              d={`M 103 262 C 102 248 104 ${trunkTop + 32} 103 ${trunkTop + 2}`}
              stroke="#1a0e05"
              strokeWidth={tw * 0.55}
              fill="none"
              strokeLinecap="round"
              opacity="0.12"
            />
            {/* Main trunk */}
            <path
              d={`M 100 262 C 99 248 101 ${trunkTop + 30} 100 ${trunkTop}`}
              stroke={`url(#${pfx('oakTrunk')})`}
              strokeWidth={tw}
              fill="none"
              strokeLinecap="round"
            />
            {/* Trunk highlight */}
            <path
              d={`M 100 258 C 99 246 101 ${trunkTop + 32} 100 ${trunkTop + 3}`}
              stroke={`url(#${pfx('oakTrunkHi')})`}
              strokeWidth={tw * 0.45}
              fill="none"
              strokeLinecap="round"
            />
            {/* Bark fissure lines */}
            {stage >= 3 && (
              <g opacity="0.35">
                <path d={`M ${100 - tw * 0.35} 260 C ${100 - tw * 0.35} 250 ${100 - tw * 0.3} 240 ${100 - tw * 0.35} ${trunkTop + 15}`} stroke="#2e1808" strokeWidth="0.6" fill="none" />
                <path d={`M ${100 - tw * 0.15} 258 C ${100 - tw * 0.15} 248 ${100 - tw * 0.1} 238 ${100 - tw * 0.15} ${trunkTop + 12}`} stroke="#2e1808" strokeWidth="0.4" fill="none" />
                <path d={`M ${100 + tw * 0.15} 259 C ${100 + tw * 0.15} 249 ${100 + tw * 0.2} 239 ${100 + tw * 0.15} ${trunkTop + 14}`} stroke="#2e1808" strokeWidth="0.5" fill="none" />
                <path d={`M ${100 + tw * 0.35} 257 C ${100 + tw * 0.35} 247 ${100 + tw * 0.3} 237 ${100 + tw * 0.35} ${trunkTop + 16}`} stroke="#2e1808" strokeWidth="0.4" fill="none" />
                {/* Light bark ridges next to fissures */}
                <path d={`M ${100 - tw * 0.25} 260 C ${100 - tw * 0.25} 248 ${100 - tw * 0.2} 236 ${100 - tw * 0.25} ${trunkTop + 13}`} stroke="#8a6840" strokeWidth="0.3" fill="none" opacity="0.6" />
                <path d={`M ${100 + tw * 0.25} 258 C ${100 + tw * 0.25} 246 ${100 + tw * 0.25} 234 ${100 + tw * 0.25} ${trunkTop + 15}`} stroke="#8a6840" strokeWidth="0.3" fill="none" opacity="0.5" />
              </g>
            )}
            {/* Bark knots */}
            {stage >= 4 && (
              <>
                <ellipse cx="101" cy="238" rx="2.5" ry="2" fill="#2e1808" opacity="0.3" />
                <ellipse cx="101" cy="238" rx="1.5" ry="1" fill="#4a2c14" opacity="0.4" />
                <ellipse cx="101" cy="238" rx="0.6" ry="0.4" fill="#6b4528" opacity="0.3" />
                {stage >= 5 && (
                  <>
                    <ellipse cx="99" cy="210" rx="2" ry="1.5" fill="#2e1808" opacity="0.25" />
                    <ellipse cx="99" cy="210" rx="1.2" ry="0.7" fill="#4a2c14" opacity="0.35" />
                  </>
                )}
              </>
            )}
            {/* Branch forks */}
            {stage >= 4 && (
              <>
                {/* Left main branch */}
                <path
                  d={`M 100 ${trunkTop + 22} C 90 ${trunkTop + 12} 74 ${trunkTop - 2} 62 ${trunkTop - 12}`}
                  stroke={`url(#${pfx('oakBranchGrad')})`}
                  strokeWidth={tw * 0.5}
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d={`M 100 ${trunkTop + 22} C 90 ${trunkTop + 12} 74 ${trunkTop - 2} 62 ${trunkTop - 12}`}
                  stroke={`url(#${pfx('oakTrunkHi')})`}
                  strokeWidth={tw * 0.2}
                  fill="none"
                  strokeLinecap="round"
                />
                {/* Right main branch */}
                <path
                  d={`M 100 ${trunkTop + 16} C 110 ${trunkTop + 6} 126 ${trunkTop - 5} 138 ${trunkTop - 14}`}
                  stroke={`url(#${pfx('oakBranchGrad')})`}
                  strokeWidth={tw * 0.5}
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d={`M 100 ${trunkTop + 16} C 110 ${trunkTop + 6} 126 ${trunkTop - 5} 138 ${trunkTop - 14}`}
                  stroke={`url(#${pfx('oakTrunkHi')})`}
                  strokeWidth={tw * 0.2}
                  fill="none"
                  strokeLinecap="round"
                />
                {/* Sub-branches */}
                {stage >= 5 && (
                  <>
                    <path
                      d={`M 76 ${trunkTop - 4} C 70 ${trunkTop - 11} 60 ${trunkTop - 19} 52 ${trunkTop - 24}`}
                      stroke="#5c3a1e"
                      strokeWidth={tw * 0.25}
                      fill="none"
                      strokeLinecap="round"
                    />
                    <path
                      d={`M 68 ${trunkTop - 8} C 62 ${trunkTop - 16} 56 ${trunkTop - 22} 48 ${trunkTop - 28}`}
                      stroke="#5c3a1e"
                      strokeWidth={tw * 0.18}
                      fill="none"
                      strokeLinecap="round"
                    />
                    <path
                      d={`M 124 ${trunkTop - 7} C 130 ${trunkTop - 15} 140 ${trunkTop - 21} 148 ${trunkTop - 26}`}
                      stroke="#5c3a1e"
                      strokeWidth={tw * 0.25}
                      fill="none"
                      strokeLinecap="round"
                    />
                    <path
                      d={`M 132 ${trunkTop - 10} C 138 ${trunkTop - 18} 144 ${trunkTop - 24} 152 ${trunkTop - 30}`}
                      stroke="#5c3a1e"
                      strokeWidth={tw * 0.18}
                      fill="none"
                      strokeLinecap="round"
                    />
                    {/* Center upward branch */}
                    <path
                      d={`M 100 ${trunkTop + 5} C 100 ${trunkTop - 5} 100 ${trunkTop - 18} 100 ${trunkTop - 28}`}
                      stroke="#5c3a1e"
                      strokeWidth={tw * 0.22}
                      fill="none"
                      strokeLinecap="round"
                    />
                    {/* Twig tips */}
                    <path d={`M 55 ${trunkTop - 22} C 50 ${trunkTop - 26} 46 ${trunkTop - 30} 42 ${trunkTop - 32}`} stroke="#6b4528" strokeWidth="1" fill="none" strokeLinecap="round" />
                    <path d={`M 145 ${trunkTop - 24} C 150 ${trunkTop - 28} 154 ${trunkTop - 32} 158 ${trunkTop - 34}`} stroke="#6b4528" strokeWidth="1" fill="none" strokeLinecap="round" />
                  </>
                )}
              </>
            )}
          </g>
        );
      })()}

      {/* Stage 4: Leaf clusters with detailed oak leaves */}
      {stage >= 4 && stage < 5 && (
        <g>
          {/* ── Left branch leaves ── */}
          {[
            { x: 62, y: 170, rot: -25, s: 1 },
            { x: 55, y: 176, rot: -40, s: 0.85 },
            { x: 70, y: 164, rot: -10, s: 0.9 },
          ].map((lf, i) => (
            <g key={`oll-${i}`} transform={`translate(${lf.x}, ${lf.y}) rotate(${lf.rot}) scale(${lf.s})`} filter={`url(#${pfx('softShadow')})`}>
              {/* Lobed oak leaf — 3 layers */}
              <path
                d="M 0 0 C -1 -2 -4 -4 -6 -6 C -8 -5 -9 -3 -10 -5 C -11 -7 -9 -10 -7 -11 C -6 -13 -7 -15 -5 -17 C -3 -18 -1 -16 0 -14 C 1 -16 3 -18 5 -17 C 7 -15 6 -13 7 -11 C 9 -10 11 -7 10 -5 C 9 -3 8 -5 6 -6 C 4 -4 1 -2 0 0"
                fill={`url(#${pfx('oakLeafBase')})`}
              />
              <path
                d="M 0 -0.5 C -1 -2.5 -3.5 -4.5 -5.5 -6.5 C -7.5 -5.5 -8.5 -3.5 -9.5 -5.5 C -10 -7 -8.5 -9.5 -6.5 -10.5 C -5.5 -12.5 -6.5 -14.5 -4.5 -16.5 C -2.5 -17 -1 -15.5 0 -13.5 C 1 -15.5 2.5 -17 4.5 -16.5 C 6.5 -14.5 5.5 -12.5 6.5 -10.5 C 8.5 -9.5 10 -7 9.5 -5.5 C 8.5 -3.5 7.5 -5.5 5.5 -6.5 C 3.5 -4.5 1 -2.5 0 -0.5"
                fill={`url(#${pfx('oakLeafMid')})`}
                opacity="0.8"
              />
              <path
                d="M 0 -1.5 C -0.5 -3 -2.5 -5 -4 -6.5 C -5.5 -6 -6.5 -5 -7 -6 C -7.5 -7.5 -6 -9 -5 -10 C -4 -11.5 -5 -13 -3.5 -15 C -2 -15.5 -0.5 -14 0 -13 C 0.5 -14 2 -15.5 3.5 -15 C 5 -13 4 -11.5 5 -10 C 6 -9 7.5 -7.5 7 -6 C 6.5 -5 5.5 -6 4 -6.5 C 2.5 -5 0.5 -3 0 -1.5"
                fill={`url(#${pfx('oakLeafHi')})`}
                opacity="0.35"
              />
              {/* Midrib */}
              <path d="M 0 0 L 0 -16" stroke="#1e4a14" strokeWidth="0.6" fill="none" />
              <path d="M 0 0 L 0 -16" stroke="#4a8c3f" strokeWidth="0.25" fill="none" opacity="0.3" />
              {/* Side veins */}
              <path d="M 0 -4 C -3 -5 -6 -5 -8 -5" stroke="#2d5518" strokeWidth="0.3" fill="none" opacity="0.4" />
              <path d="M 0 -4 C 3 -5 6 -5 8 -5" stroke="#2d5518" strokeWidth="0.3" fill="none" opacity="0.4" />
              <path d="M 0 -8 C -3 -9 -5 -10 -7 -10" stroke="#2d5518" strokeWidth="0.25" fill="none" opacity="0.35" />
              <path d="M 0 -8 C 3 -9 5 -10 7 -10" stroke="#2d5518" strokeWidth="0.25" fill="none" opacity="0.35" />
              <path d="M 0 -12 C -2 -14 -4 -15 -5 -16" stroke="#2d5518" strokeWidth="0.2" fill="none" opacity="0.3" />
              <path d="M 0 -12 C 2 -14 4 -15 5 -16" stroke="#2d5518" strokeWidth="0.2" fill="none" opacity="0.3" />
            </g>
          ))}

          {/* ── Right branch leaves ── */}
          {[
            { x: 138, y: 168, rot: 20, s: 1 },
            { x: 145, y: 174, rot: 35, s: 0.85 },
            { x: 130, y: 162, rot: 5, s: 0.9 },
          ].map((lf, i) => (
            <g key={`olr-${i}`} transform={`translate(${lf.x}, ${lf.y}) rotate(${lf.rot}) scale(${lf.s})`} filter={`url(#${pfx('softShadow')})`}>
              <path
                d="M 0 0 C -1 -2 -4 -4 -6 -6 C -8 -5 -9 -3 -10 -5 C -11 -7 -9 -10 -7 -11 C -6 -13 -7 -15 -5 -17 C -3 -18 -1 -16 0 -14 C 1 -16 3 -18 5 -17 C 7 -15 6 -13 7 -11 C 9 -10 11 -7 10 -5 C 9 -3 8 -5 6 -6 C 4 -4 1 -2 0 0"
                fill={`url(#${pfx('oakLeafBase')})`}
              />
              <path
                d="M 0 -0.5 C -1 -2.5 -3.5 -4.5 -5.5 -6.5 C -7.5 -5.5 -8.5 -3.5 -9.5 -5.5 C -10 -7 -8.5 -9.5 -6.5 -10.5 C -5.5 -12.5 -6.5 -14.5 -4.5 -16.5 C -2.5 -17 -1 -15.5 0 -13.5 C 1 -15.5 2.5 -17 4.5 -16.5 C 6.5 -14.5 5.5 -12.5 6.5 -10.5 C 8.5 -9.5 10 -7 9.5 -5.5 C 8.5 -3.5 7.5 -5.5 5.5 -6.5 C 3.5 -4.5 1 -2.5 0 -0.5"
                fill={`url(#${pfx('oakLeafMid')})`}
                opacity="0.8"
              />
              <path d="M 0 0 L 0 -16" stroke="#1e4a14" strokeWidth="0.6" fill="none" />
              <path d="M 0 -4 C -3 -5 -6 -5 -8 -5" stroke="#2d5518" strokeWidth="0.3" fill="none" opacity="0.4" />
              <path d="M 0 -4 C 3 -5 6 -5 8 -5" stroke="#2d5518" strokeWidth="0.3" fill="none" opacity="0.4" />
              <path d="M 0 -8 C -3 -9 -5 -10 -7 -10" stroke="#2d5518" strokeWidth="0.25" fill="none" opacity="0.35" />
              <path d="M 0 -8 C 3 -9 5 -10 7 -10" stroke="#2d5518" strokeWidth="0.25" fill="none" opacity="0.35" />
            </g>
          ))}

          {/* Center leaves */}
          <g transform="translate(100, 178) scale(0.8)" filter={`url(#${pfx('softShadow')})`}>
            <path
              d="M 0 0 C -1 -2 -4 -4 -6 -6 C -8 -5 -9 -3 -10 -5 C -11 -7 -9 -10 -7 -11 C -6 -13 -7 -15 -5 -17 C -3 -18 -1 -16 0 -14 C 1 -16 3 -18 5 -17 C 7 -15 6 -13 7 -11 C 9 -10 11 -7 10 -5 C 9 -3 8 -5 6 -6 C 4 -4 1 -2 0 0"
              fill={`url(#${pfx('oakLeafMid')})`}
            />
            <path d="M 0 0 L 0 -16" stroke="#1e4a14" strokeWidth="0.5" fill="none" />
          </g>
        </g>
      )}

      {/* Stage 5: Full canopy */}
      {stage >= 5 && (
        <g>
          {/* Shadow under canopy on trunk */}
          <ellipse cx="100" cy="158" rx="50" ry="10" fill="#1a0e05" opacity="0.08" />

          {/* Deep canopy layers (back to front for depth) */}
          <ellipse cx="100" cy="115" rx="52" ry="36" fill={`url(#${pfx('oakCanopy2')})`} opacity="0.9" />
          <ellipse cx="64" cy="130" rx="36" ry="28" fill={`url(#${pfx('oakCanopy1')})`} opacity="0.85" />
          <ellipse cx="136" cy="128" rx="38" ry="29" fill={`url(#${pfx('oakCanopy3')})`} opacity="0.85" />
          <ellipse cx="80" cy="104" rx="30" ry="24" fill={`url(#${pfx('oakCanopy1')})`} opacity="0.8" />
          <ellipse cx="122" cy="102" rx="32" ry="25" fill={`url(#${pfx('oakCanopy3')})`} opacity="0.8" />
          <ellipse cx="100" cy="93" rx="26" ry="20" fill={`url(#${pfx('oakCanopy2')})`} opacity="0.75" />
          {/* Top crown */}
          <ellipse cx="100" cy="84" rx="18" ry="12" fill={`url(#${pfx('oakCanopy3')})`} opacity="0.65" />

          {/* Detailed lobed oak leaves around edges */}
          {[
            { x: 48, y: 122, r: -35, s: 0.65 },
            { x: 38, y: 132, r: -15, s: 0.55 },
            { x: 52, y: 142, r: -45, s: 0.6 },
            { x: 42, y: 118, r: -50, s: 0.5 },
            { x: 152, y: 120, r: 25, s: 0.65 },
            { x: 162, y: 130, r: 40, s: 0.55 },
            { x: 154, y: 140, r: 15, s: 0.6 },
            { x: 160, y: 116, r: 50, s: 0.5 },
            { x: 78, y: 82, r: -22, s: 0.5 },
            { x: 122, y: 80, r: 18, s: 0.5 },
            { x: 100, y: 74, r: 0, s: 0.45 },
            { x: 90, y: 78, r: -10, s: 0.4 },
            { x: 112, y: 76, r: 12, s: 0.42 },
            { x: 62, y: 105, r: -28, s: 0.5 },
            { x: 142, y: 103, r: 32, s: 0.5 },
          ].map((lf, i) => (
            <g key={`clf-${i}`} transform={`translate(${lf.x}, ${lf.y}) rotate(${lf.r}) scale(${lf.s})`}>
              {/* 3-layer lobed oak leaf */}
              <path
                d="M 0 0 C -1 -2 -4 -4 -6 -6 C -8 -5 -9 -3 -10 -5 C -11 -7 -9 -10 -7 -11 C -6 -13 -7 -15 -5 -17 C -3 -18 -1 -16 0 -14 C 1 -16 3 -18 5 -17 C 7 -15 6 -13 7 -11 C 9 -10 11 -7 10 -5 C 9 -3 8 -5 6 -6 C 4 -4 1 -2 0 0"
                fill={`url(#${pfx('oakLeafBase')})`}
                opacity="0.85"
              />
              <path
                d="M 0 -0.5 C -1 -2.5 -3.5 -4.5 -5.5 -6.5 C -7.5 -5.5 -8.5 -3.5 -9.5 -5.5 C -10 -7 -8.5 -9.5 -6.5 -10.5 C -5.5 -12.5 -6.5 -14.5 -4.5 -16.5 C -2.5 -17 -1 -15.5 0 -13.5 C 1 -15.5 2.5 -17 4.5 -16.5 C 6.5 -14.5 5.5 -12.5 6.5 -10.5 C 8.5 -9.5 10 -7 9.5 -5.5 C 8.5 -3.5 7.5 -5.5 5.5 -6.5 C 3.5 -4.5 1 -2.5 0 -0.5"
                fill={`url(#${pfx('oakLeafMid')})`}
                opacity="0.7"
              />
              {/* Midrib + veins */}
              <path d="M 0 0 L 0 -16" stroke="#1e4a14" strokeWidth="0.5" fill="none" opacity="0.5" />
              <path d="M 0 -5 C -3 -6 -6 -5.5 -8 -5" stroke="#2d5518" strokeWidth="0.2" fill="none" opacity="0.35" />
              <path d="M 0 -5 C 3 -6 6 -5.5 8 -5" stroke="#2d5518" strokeWidth="0.2" fill="none" opacity="0.35" />
              <path d="M 0 -10 C -2 -11 -5 -10.5 -7 -10" stroke="#2d5518" strokeWidth="0.18" fill="none" opacity="0.3" />
              <path d="M 0 -10 C 2 -11 5 -10.5 7 -10" stroke="#2d5518" strokeWidth="0.18" fill="none" opacity="0.3" />
            </g>
          ))}

          {/* Light dapple highlights */}
          {[
            { cx: 76, cy: 110, r: 4 },
            { cx: 108, cy: 98, r: 3.5 },
            { cx: 90, cy: 122, r: 3 },
            { cx: 124, cy: 120, r: 3.5 },
            { cx: 68, cy: 126, r: 2.5 },
            { cx: 100, cy: 106, r: 3 },
            { cx: 115, cy: 112, r: 2.5 },
            { cx: 86, cy: 92, r: 2.5 },
            { cx: 134, cy: 112, r: 2 },
            { cx: 72, cy: 118, r: 2 },
          ].map((d, i) => (
            <circle key={`lh-${i}`} cx={d.cx} cy={d.cy} r={d.r} fill="#80c060" opacity="0.15" />
          ))}
          {/* Dark depth spots */}
          {[
            { cx: 82, cy: 128, r: 5 },
            { cx: 118, cy: 126, r: 4.5 },
            { cx: 100, cy: 133, r: 4 },
            { cx: 95, cy: 115, r: 3 },
            { cx: 110, cy: 108, r: 2.5 },
          ].map((d, i) => (
            <circle key={`ds-${i}`} cx={d.cx} cy={d.cy} r={d.r} fill="#1a4a14" opacity="0.12" />
          ))}
        </g>
      )}

      {/* Stage 6: Detailed acorns dangling */}
      {stage >= 6 && (
        <g>
          {[
            { x: 65, y: 148, rot: -10, s: 1 },
            { x: 80, y: 154, rot: 6, s: 0.9 },
            { x: 128, y: 149, rot: -5, s: 1 },
            { x: 114, y: 156, rot: 12, s: 0.85 },
            { x: 95, y: 151, rot: -3, s: 0.95 },
          ].map((a, i) => (
            <g key={`acorn-${i}`} transform={`translate(${a.x}, ${a.y}) rotate(${a.rot}) scale(${a.s})`} filter={`url(#${pfx('softShadow')})`}>
              {/* Stem */}
              <path d="M 0 -7 C 0 -9 0.2 -11 0 -12" stroke="#5a3e28" strokeWidth="0.7" fill="none" strokeLinecap="round" />
              <path d="M 0.3 -7 C 0.3 -9 0.4 -11 0.3 -12" stroke="#8a6840" strokeWidth="0.25" fill="none" strokeLinecap="round" opacity="0.4" />
              {/* Cap */}
              <path d="M -4 -7 C -4.5 -9 -2.5 -11 0 -11.5 C 2.5 -11 4.5 -9 4 -7 Z" fill={`url(#${pfx('acornCapGrad')})`} />
              <path d="M -4 -7 C -4.5 -9 -2.5 -11 0 -11.5 C 2.5 -11 4.5 -9 4 -7 Z" fill="none" stroke="#6b5030" strokeWidth="0.3" />
              {/* Cap texture */}
              <path d="M -3 -8.5 Q 0 -8 3 -8.5" stroke="#8a6a40" strokeWidth="0.2" fill="none" opacity="0.5" />
              <path d="M -3.5 -9.5 Q 0 -9 3.5 -9.5" stroke="#8a6a40" strokeWidth="0.18" fill="none" opacity="0.4" />
              {/* Acorn body */}
              <path d="M -3.8 -7 C -3.8 -5 -3 -1.5 -1.5 0 C 0 1 1.5 0 1.5 0 C 3 -1.5 3.8 -5 3.8 -7 Z" fill={`url(#${pfx('acornGrad')})`} />
              {/* Body highlight */}
              <path d="M -1.5 -6 C -2 -4 -1.5 -2 -0.5 -1 C 0 -0.5 0.5 -1.5 0.5 -3 C 0.5 -4.5 0 -6 -0.5 -6.5 Z" fill="#c4a870" opacity="0.2" />
              {/* Tip */}
              <ellipse cx="0" cy="0.5" rx="0.8" ry="0.6" fill="#5a4025" />
            </g>
          ))}
        </g>
      )}

      {/* Stage 7: Golden aura + drifting detailed leaves */}
      {stage >= 7 && (
        <g>
          <circle cx="100" cy="120" r="80" fill={`url(#${pfx('harvestGlow')})`} className="animate-pulse" />
          {[
            { x: 42, y: 90, rot: 35, delay: '0s' },
            { x: 155, y: 82, rot: -25, delay: '1.5s' },
            { x: 50, y: 70, rot: 50, delay: '3s' },
            { x: 145, y: 95, rot: -40, delay: '2s' },
            { x: 60, y: 105, rot: 20, delay: '0.8s' },
          ].map((l, i) => (
            <g key={`drift-${i}`} className="animate-float-away" style={{ animationDelay: l.delay }}>
              <g transform={`translate(${l.x}, ${l.y}) rotate(${l.rot}) scale(0.45)`}>
                {/* Autumn-colored lobed leaf */}
                <path
                  d="M 0 0 C -1 -2 -4 -4 -6 -6 C -8 -5 -9 -3 -10 -5 C -11 -7 -9 -10 -7 -11 C -6 -13 -7 -15 -5 -17 C -3 -18 -1 -16 0 -14 C 1 -16 3 -18 5 -17 C 7 -15 6 -13 7 -11 C 9 -10 11 -7 10 -5 C 9 -3 8 -5 6 -6 C 4 -4 1 -2 0 0"
                  fill={i % 2 === 0 ? "#c4883a" : "#a06830"}
                  opacity="0.65"
                />
                <path d="M 0 0 L 0 -16" stroke="#8a5a28" strokeWidth="0.4" fill="none" opacity="0.5" />
              </g>
            </g>
          ))}
        </g>
      )}
    </g>
  );
}
