export const isDesertPlant = true;

export function cactusGradients(pfx: (name: string) => string) {
  return (
    <>
      <linearGradient id={pfx('cacBody')} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#14442a" />
        <stop offset="10%" stopColor="#1e5530" />
        <stop offset="25%" stopColor="#2a7040" />
        <stop offset="40%" stopColor="#3d9050" />
        <stop offset="52%" stopColor="#4aa55c" />
        <stop offset="60%" stopColor="#3d9050" />
        <stop offset="75%" stopColor="#2a7040" />
        <stop offset="90%" stopColor="#1e5530" />
        <stop offset="100%" stopColor="#14442a" />
      </linearGradient>
      <linearGradient id={pfx('cacBodyHi')} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#60c070" stopOpacity="0" />
        <stop offset="30%" stopColor="#6dd07a" stopOpacity="0.2" />
        <stop offset="45%" stopColor="#80e090" stopOpacity="0.3" />
        <stop offset="55%" stopColor="#8ae898" stopOpacity="0.2" />
        <stop offset="70%" stopColor="#6dd07a" stopOpacity="0.1" />
        <stop offset="100%" stopColor="#60c070" stopOpacity="0" />
      </linearGradient>
      <linearGradient id={pfx('cacBodyVert')} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4aa55c" stopOpacity="0.15" />
        <stop offset="50%" stopColor="#3d9050" stopOpacity="0" />
        <stop offset="100%" stopColor="#1e5530" stopOpacity="0.1" />
      </linearGradient>
      <linearGradient id={pfx('cacArm')} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#14442a" />
        <stop offset="20%" stopColor="#1e5530" />
        <stop offset="45%" stopColor="#3d9050" />
        <stop offset="60%" stopColor="#45a05a" />
        <stop offset="80%" stopColor="#2d7843" />
        <stop offset="100%" stopColor="#1e5530" />
      </linearGradient>
      <linearGradient id={pfx('cacArmHi')} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#60c070" stopOpacity="0" />
        <stop offset="40%" stopColor="#70d080" stopOpacity="0.2" />
        <stop offset="60%" stopColor="#80e090" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#60c070" stopOpacity="0" />
      </linearGradient>
      <radialGradient id={pfx('cacFlowerOuter')} cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#ff8ab5" />
        <stop offset="30%" stopColor="#ff6b9d" />
        <stop offset="60%" stopColor="#e91e63" />
        <stop offset="100%" stopColor="#c2185b" />
      </radialGradient>
      <radialGradient id={pfx('cacFlowerInner')} cx="40%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#ffb8d4" />
        <stop offset="40%" stopColor="#ff8ab5" />
        <stop offset="100%" stopColor="#e91e63" />
      </radialGradient>
      <radialGradient id={pfx('cacFlowerCenter')} cx="40%" cy="40%" r="50%">
        <stop offset="0%" stopColor="#ffe880" />
        <stop offset="50%" stopColor="#ffd54f" />
        <stop offset="100%" stopColor="#f0a830" />
      </radialGradient>
      <linearGradient id={pfx('cacFruit')} x1="0.2" y1="0" x2="0.8" y2="1">
        <stop offset="0%" stopColor="#f07098" />
        <stop offset="30%" stopColor="#e85088" />
        <stop offset="60%" stopColor="#d83878" />
        <stop offset="100%" stopColor="#a31545" />
      </linearGradient>
      <linearGradient id={pfx('cacFruitHi')} x1="0.3" y1="0" x2="0.7" y2="1">
        <stop offset="0%" stopColor="#ff9ab8" stopOpacity="0.4" />
        <stop offset="50%" stopColor="#ff8ab0" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#f07098" stopOpacity="0" />
      </linearGradient>
      <linearGradient id={pfx('sandSoil')} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#d4b880" />
        <stop offset="40%" stopColor="#c4a265" />
        <stop offset="100%" stopColor="#a08050" />
      </linearGradient>
      <linearGradient id={pfx('cacSeedGrad')} x1="0.3" y1="0" x2="0.7" y2="1">
        <stop offset="0%" stopColor="#a08860" />
        <stop offset="50%" stopColor="#8b7050" />
        <stop offset="100%" stopColor="#6b5535" />
      </linearGradient>
    </>
  );
}

export function renderCactus(stage: number, pfx: (name: string) => string) {
  return (
    <g>
      {/* Stage 1: Detailed seed */}
      {stage >= 1 && (
        <g transform="translate(100, 260)" filter={`url(#${pfx('softShadow')})`}>
          {/* Ground shadow */}
          <ellipse cx="0.5" cy="5" rx="5" ry="2" fill="#8a7040" opacity="0.2" />
          {/* Seed body */}
          <ellipse cx="0" cy="0" rx="4.5" ry="5" fill={`url(#${pfx('cacSeedGrad')})`} />
          {/* Seed outline */}
          <ellipse cx="0" cy="0" rx="4.5" ry="5" fill="none" stroke="#5a4428" strokeWidth="0.5" />
          {/* Seed highlight */}
          <ellipse cx="-1.5" cy="-1.5" rx="2" ry="2.5" fill="#c4a870" opacity="0.25" />
          {/* Seed texture lines */}
          <path d="M -2 -3 Q 0 -4 2 -3" stroke="#5a4428" strokeWidth="0.35" fill="none" opacity="0.4" />
          <path d="M -2.5 -1 Q 0 -2 2.5 -1" stroke="#5a4428" strokeWidth="0.3" fill="none" opacity="0.35" />
          <path d="M -2 1 Q 0 0 2 1" stroke="#5a4428" strokeWidth="0.25" fill="none" opacity="0.3" />
          {/* Seed dimple */}
          <ellipse cx="0.5" cy="1.5" rx="0.8" ry="0.6" fill="#5a4428" opacity="0.25" />
          {/* Tiny hilum (seed scar) at top */}
          <ellipse cx="0" cy="-4.5" rx="1" ry="0.5" fill="#6b5535" opacity="0.4" />
        </g>
      )}

      {/* Stage 2: Shallow wide roots */}
      {stage >= 2 && (
        <g opacity="0.55">
          {/* Primary shallow laterals — cactus roots spread wide, stay near surface */}
          <path d="M 100 267 C 90 269 76 272 60 273" stroke="#6b5535" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M 100 267 C 90 269 76 272 60 273" stroke="#8a7050" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.4" />
          <path d="M 100 267 C 110 269 124 272 140 273" stroke="#6b5535" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M 100 267 C 110 269 124 272 140 273" stroke="#8a7050" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.4" />
          {/* Secondary roots */}
          <path d="M 100 269 C 88 272 74 275 62 277" stroke="#7a6a4a" strokeWidth="1" fill="none" strokeLinecap="round" />
          <path d="M 100 269 C 112 272 126 275 138 277" stroke="#7a6a4a" strokeWidth="1" fill="none" strokeLinecap="round" />
          {/* Fine root tips */}
          <path d="M 64 273 C 58 274 52 274 46 273" stroke="#7a6a4a" strokeWidth="0.5" fill="none" strokeLinecap="round" />
          <path d="M 60 273 C 56 276 52 277 48 277" stroke="#7a6a4a" strokeWidth="0.35" fill="none" strokeLinecap="round" />
          <path d="M 136 272 C 142 273 148 273 154 272" stroke="#7a6a4a" strokeWidth="0.5" fill="none" strokeLinecap="round" />
          <path d="M 140 273 C 144 276 148 277 152 277" stroke="#7a6a4a" strokeWidth="0.35" fill="none" strokeLinecap="round" />
          {/* Short downward root */}
          <path d="M 100 268 C 100 274 99 280 98 286" stroke="#6b5535" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          <path d="M 99 282 C 97 286 95 289 93 290" stroke="#7a6a4a" strokeWidth="0.4" fill="none" strokeLinecap="round" />
          <path d="M 99 284 C 101 287 103 289 105 290" stroke="#7a6a4a" strokeWidth="0.4" fill="none" strokeLinecap="round" />
        </g>
      )}

      {/* Stage 3: Ribbed columnar body */}
      {stage >= 3 && (() => {
        const bodyTop = stage >= 4 ? 165 : 195;
        const bodyBot = 270;
        const bodyH = bodyBot - bodyTop;
        return (
          <g>
            {/* Body shadow */}
            <path
              d={`M 87 ${bodyBot + 2} C 85 ${bodyBot - bodyH * 0.3} 86 ${bodyTop + 12} 90 ${bodyTop + 2} Q 102 ${bodyTop - 8} 114 ${bodyTop + 2} C 118 ${bodyTop + 12} 119 ${bodyBot - bodyH * 0.3} 117 ${bodyBot + 2} Z`}
              fill="#0a2a15"
              opacity="0.12"
              transform="translate(2, 2.5)"
            />
            {/* Main body */}
            <path
              d={`M 85 ${bodyBot} C 83 ${bodyBot - bodyH * 0.3} 84 ${bodyTop + 10} 88 ${bodyTop} Q 100 ${bodyTop - 9} 112 ${bodyTop} C 116 ${bodyTop + 10} 117 ${bodyBot - bodyH * 0.3} 115 ${bodyBot} Z`}
              fill={`url(#${pfx('cacBody')})`}
            />
            {/* Vertical gradient overlay for depth */}
            <path
              d={`M 85 ${bodyBot} C 83 ${bodyBot - bodyH * 0.3} 84 ${bodyTop + 10} 88 ${bodyTop} Q 100 ${bodyTop - 9} 112 ${bodyTop} C 116 ${bodyTop + 10} 117 ${bodyBot - bodyH * 0.3} 115 ${bodyBot} Z`}
              fill={`url(#${pfx('cacBodyVert')})`}
            />
            {/* Center highlight overlay */}
            <path
              d={`M 93 ${bodyBot - 2} C 92 ${bodyBot - bodyH * 0.25} 93 ${bodyTop + 14} 96 ${bodyTop + 3} Q 100 ${bodyTop - 5} 104 ${bodyTop + 3} C 107 ${bodyTop + 14} 108 ${bodyBot - bodyH * 0.25} 107 ${bodyBot - 2} Z`}
              fill={`url(#${pfx('cacBodyHi')})`}
            />
            {/* Edge highlights — left and right for roundness */}
            <path
              d={`M 87 ${bodyBot - 2} C 86 ${bodyBot - bodyH * 0.2} 86 ${bodyTop + 16} 89 ${bodyTop + 4}`}
              stroke="#4aa55c"
              strokeWidth="1.2"
              fill="none"
              opacity="0.08"
              strokeLinecap="round"
            />
            <path
              d={`M 113 ${bodyBot - 2} C 114 ${bodyBot - bodyH * 0.2} 114 ${bodyTop + 16} 111 ${bodyTop + 4}`}
              stroke="#4aa55c"
              strokeWidth="1"
              fill="none"
              opacity="0.06"
              strokeLinecap="round"
            />
            {/* Rib groove lines (paired: dark groove + light ridge for 3D) */}
            {[-13, -8, -3, 3, 8, 12].map((offset, i) => (
              <g key={`rib-${i}`}>
                <path
                  d={`M ${100 + offset - 0.6} ${bodyBot - 2} C ${100 + offset - 0.8} ${bodyBot - bodyH * 0.5} ${100 + offset - 0.6} ${bodyTop + 16} ${100 + offset - 0.6} ${bodyTop + 4}`}
                  stroke="#14442a"
                  strokeWidth="0.7"
                  fill="none"
                  opacity="0.3"
                />
                <path
                  d={`M ${100 + offset + 0.6} ${bodyBot - 2} C ${100 + offset + 0.4} ${bodyBot - bodyH * 0.5} ${100 + offset + 0.6} ${bodyTop + 16} ${100 + offset + 0.6} ${bodyTop + 4}`}
                  stroke="#5ac068"
                  strokeWidth="0.45"
                  fill="none"
                  opacity="0.18"
                />
              </g>
            ))}
            {/* Areoles with spine clusters */}
            {[
              { x: 86, y: 248, dir: -1 }, { x: 114, y: 250, dir: 1 },
              { x: 87, y: 230, dir: -1 }, { x: 113, y: 234, dir: 1 },
              { x: 88, y: 212, dir: -1 }, { x: 112, y: 216, dir: 1 },
              { x: 90, y: 194, dir: -1 }, { x: 110, y: 198, dir: 1 },
              { x: 92, y: 178, dir: -1 }, { x: 108, y: 182, dir: 1 },
            ].filter(s => s.y > bodyTop + 8).map((s, i) => (
              <g key={`spine-${i}`}>
                {/* Areole pad — woolly white/tan dot */}
                <ellipse cx={s.x} cy={s.y} rx="1.5" ry="1.2" fill="#d4c890" opacity="0.45" />
                <ellipse cx={s.x} cy={s.y} rx="0.8" ry="0.6" fill="#e8dca8" opacity="0.3" />
                {/* Spine cluster (4-5 spines radiating outward) */}
                <line x1={s.x} y1={s.y} x2={s.x + s.dir * 5} y2={s.y - 3.5} stroke="#d4c88a" strokeWidth="0.35" opacity="0.6" />
                <line x1={s.x} y1={s.y} x2={s.x + s.dir * 4.5} y2={s.y + 1.5} stroke="#d4c88a" strokeWidth="0.3" opacity="0.55" />
                <line x1={s.x} y1={s.y} x2={s.x + s.dir * 2.5} y2={s.y - 5} stroke="#d4c88a" strokeWidth="0.28" opacity="0.5" />
                <line x1={s.x} y1={s.y} x2={s.x + s.dir * 1.5} y2={s.y + 3} stroke="#d4c88a" strokeWidth="0.22" opacity="0.45" />
                <line x1={s.x} y1={s.y} x2={s.x + s.dir * 5.5} y2={s.y - 0.5} stroke="#e0d8a0" strokeWidth="0.2" opacity="0.4" />
              </g>
            ))}
          </g>
        );
      })()}

      {/* Stage 4: Side arms */}
      {stage >= 4 && (
        <g>
          {/* ── Left arm ── */}
          {/* Shadow */}
          <path
            d="M 89 222 C 73 220 62 211 60 198 Q 60 185 66 181 Q 73 177 77 181 C 82 188 79 210 89 217"
            fill="#0a2a15" opacity="0.1" transform="translate(1.5, 2.5)"
          />
          {/* Arm body */}
          <path
            d="M 88 220 C 72 218 62 210 60 198 Q 60 186 66 182 Q 72 178 76 182 C 80 188 78 208 88 215"
            fill={`url(#${pfx('cacArm')})`}
          />
          {/* Arm highlight */}
          <path
            d="M 82 218 C 74 216 67 210 65 201 Q 65 193 69 189 Q 72 187 74 189 C 76 194 74 212 82 216"
            fill={`url(#${pfx('cacArmHi')})`}
          />
          {/* Left arm rib grooves */}
          <path d="M 78 216 C 72 212 66 202 66 192" stroke="#14442a" strokeWidth="0.6" fill="none" opacity="0.25" />
          <path d="M 79 217 C 73 213 67 203 67 193" stroke="#5ac068" strokeWidth="0.35" fill="none" opacity="0.12" />
          <path d="M 74 214 C 68 210 63 200 64 190" stroke="#14442a" strokeWidth="0.5" fill="none" opacity="0.2" />
          <path d="M 75 215 C 69 211 64 201 65 191" stroke="#5ac068" strokeWidth="0.3" fill="none" opacity="0.1" />
          {/* Left arm areoles + spines */}
          {[
            { x: 63, y: 198, dx: -4.5, dy: -2 },
            { x: 68, y: 184, dx: -3.5, dy: -3 },
            { x: 74, y: 210, dx: -4, dy: 0.5 },
          ].map((s, i) => (
            <g key={`lsp-${i}`}>
              <ellipse cx={s.x} cy={s.y} rx="1.3" ry="1" fill="#d4c890" opacity="0.4" />
              <line x1={s.x} y1={s.y} x2={s.x + s.dx} y2={s.y + s.dy} stroke="#d4c88a" strokeWidth="0.35" opacity="0.55" />
              <line x1={s.x} y1={s.y} x2={s.x + s.dx * 0.7} y2={s.y + s.dy + 2} stroke="#d4c88a" strokeWidth="0.25" opacity="0.45" />
              <line x1={s.x} y1={s.y} x2={s.x + s.dx * 0.5} y2={s.y + s.dy - 2.5} stroke="#d4c88a" strokeWidth="0.22" opacity="0.4" />
            </g>
          ))}

          {/* ── Right arm ── */}
          {/* Shadow */}
          <path
            d="M 113 212 C 127 210 136 201 138 190 Q 138 179 133 175 Q 127 173 124 177 C 120 184 122 202 113 208"
            fill="#0a2a15" opacity="0.1" transform="translate(1.5, 2.5)"
          />
          {/* Arm body */}
          <path
            d="M 112 210 C 126 208 134 200 136 190 Q 136 180 132 176 Q 126 174 124 178 C 120 184 122 200 112 206"
            fill={`url(#${pfx('cacArm')})`}
          />
          {/* Arm highlight */}
          <path
            d="M 118 208 C 128 206 133 198 134 192 Q 134 185 131 181 Q 128 179 127 181 C 124 186 126 198 118 204"
            fill={`url(#${pfx('cacArmHi')})`}
          />
          {/* Right arm rib grooves */}
          <path d="M 122 206 C 128 202 134 192 133 183" stroke="#14442a" strokeWidth="0.6" fill="none" opacity="0.25" />
          <path d="M 121 207 C 127 203 133 193 132 184" stroke="#5ac068" strokeWidth="0.35" fill="none" opacity="0.12" />
          <path d="M 126 204 C 132 200 136 192 135 185" stroke="#14442a" strokeWidth="0.5" fill="none" opacity="0.2" />
          <path d="M 125 205 C 131 201 135 193 134 186" stroke="#5ac068" strokeWidth="0.3" fill="none" opacity="0.1" />
          {/* Right arm areoles + spines */}
          {[
            { x: 135, y: 188, dx: 4.5, dy: -2 },
            { x: 130, y: 178, dx: 3.5, dy: -3 },
            { x: 126, y: 202, dx: 4, dy: 0.5 },
          ].map((s, i) => (
            <g key={`rsp-${i}`}>
              <ellipse cx={s.x} cy={s.y} rx="1.3" ry="1" fill="#d4c890" opacity="0.4" />
              <line x1={s.x} y1={s.y} x2={s.x + s.dx} y2={s.y + s.dy} stroke="#d4c88a" strokeWidth="0.35" opacity="0.55" />
              <line x1={s.x} y1={s.y} x2={s.x + s.dx * 0.7} y2={s.y + s.dy + 2} stroke="#d4c88a" strokeWidth="0.25" opacity="0.45" />
              <line x1={s.x} y1={s.y} x2={s.x + s.dx * 0.5} y2={s.y + s.dy - 2.5} stroke="#d4c88a" strokeWidth="0.22" opacity="0.4" />
            </g>
          ))}
        </g>
      )}

      {/* Stage 5: Flowers */}
      {stage >= 5 && (
        <g>
          {/* ── Top flower (large) ── */}
          <g transform="translate(100, 157)" filter={`url(#${pfx('softShadow')})`}>
            {/* Outer petals */}
            {Array.from({ length: 12 }, (_, i) => {
              const deg = (360 / 12) * i;
              return (
                <g key={`tf-${i}`} transform={`rotate(${deg})`}>
                  <path
                    d="M 0 -1 C -3.5 -6 -4.5 -13 -2.5 -18 C -0.5 -20 2 -20 2.5 -18 C 4.5 -13 3.5 -6 0 -1"
                    fill={`url(#${pfx('cacFlowerOuter')})`}
                  />
                  {/* Petal vein */}
                  <path d="M 0 -3 C 0 -8 0 -14 0 -17" stroke="#ffb8d4" strokeWidth="0.3" fill="none" opacity="0.3" />
                </g>
              );
            })}
            {/* Inner petals */}
            {Array.from({ length: 10 }, (_, i) => {
              const deg = (360 / 10) * i + 18;
              return (
                <g key={`tfi-${i}`} transform={`rotate(${deg})`}>
                  <path
                    d="M 0 -0.5 C -2.5 -4 -3 -9 -1 -12 C 0 -13.5 1.5 -13.5 1 -12 C 3 -9 2.5 -4 0 -0.5"
                    fill={`url(#${pfx('cacFlowerInner')})`}
                    opacity="0.75"
                  />
                </g>
              );
            })}
            {/* Stamen center */}
            <circle r="4.5" fill={`url(#${pfx('cacFlowerCenter')})`} />
            <circle r="3" fill="#ffee88" opacity="0.4" />
            {/* Stamen filaments */}
            {Array.from({ length: 8 }, (_, i) => {
              const deg = (360 / 8) * i + 10;
              const rad = (deg * Math.PI) / 180;
              const tx = Math.cos(rad) * 3.2;
              const ty = Math.sin(rad) * 3.2;
              return (
                <g key={`stm-${i}`}>
                  <line x1={tx * 0.3} y1={ty * 0.3} x2={tx} y2={ty} stroke="#f0a830" strokeWidth="0.3" opacity="0.5" />
                  <circle cx={tx} cy={ty} r="0.6" fill="#e89020" opacity="0.6" />
                </g>
              );
            })}
          </g>

          {/* ── Left arm flower (medium) ── */}
          <g transform="translate(62, 178)" filter={`url(#${pfx('softShadow')})`}>
            {Array.from({ length: 10 }, (_, i) => {
              const deg = (360 / 10) * i;
              return (
                <g key={`lf-${i}`} transform={`rotate(${deg})`}>
                  <path
                    d="M 0 -0.5 C -2.8 -5 -3.5 -10 -1.5 -14 C 0 -15.5 1.5 -15.5 1.5 -14 C 3.5 -10 2.8 -5 0 -0.5"
                    fill={`url(#${pfx('cacFlowerOuter')})`}
                  />
                  <path d="M 0 -2 C 0 -6 0 -10 0 -13" stroke="#ffb8d4" strokeWidth="0.25" fill="none" opacity="0.25" />
                </g>
              );
            })}
            {Array.from({ length: 8 }, (_, i) => {
              const deg = (360 / 8) * i + 22.5;
              return (
                <path
                  key={`lfi-${i}`}
                  d="M 0 -0.3 C -2 -3.5 -2.5 -7 -0.5 -9.5 C 0.5 -10.5 1.5 -10.5 1 -9.5 C 2.5 -7 2 -3.5 0 -0.3"
                  fill={`url(#${pfx('cacFlowerInner')})`}
                  transform={`rotate(${deg})`}
                  opacity="0.7"
                />
              );
            })}
            <circle r="3.5" fill={`url(#${pfx('cacFlowerCenter')})`} />
            <circle r="2.2" fill="#ffee88" opacity="0.4" />
            {Array.from({ length: 6 }, (_, i) => {
              const deg = (360 / 6) * i;
              const rad = (deg * Math.PI) / 180;
              return (
                <circle key={`lstm-${i}`} cx={Math.cos(rad) * 2.5} cy={Math.sin(rad) * 2.5} r="0.5" fill="#e89020" opacity="0.5" />
              );
            })}
          </g>

          {/* ── Right arm bud (small, partially open) ── */}
          <g transform="translate(134, 172)" filter={`url(#${pfx('softShadow')})`}>
            {Array.from({ length: 6 }, (_, i) => {
              const deg = (360 / 6) * i - 30;
              return (
                <path
                  key={`rb-${i}`}
                  d="M 0 0 C -1.8 -3 -2 -6.5 -0.8 -9 C 0 -10 1 -10 0.8 -9 C 2 -6.5 1.8 -3 0 0"
                  fill={`url(#${pfx('cacFlowerOuter')})`}
                  transform={`rotate(${deg})`}
                  opacity="0.8"
                />
              );
            })}
            <circle r="2.5" fill="#3d9050" />
            <circle r="1.8" fill="#4aa55c" opacity="0.5" />
          </g>
        </g>
      )}

      {/* Stage 6: Prickly pear fruit */}
      {stage >= 6 && (
        <g>
          {/* ── Right arm fruit (large) ── */}
          <g transform="translate(134, 172)" filter={`url(#${pfx('softShadow')})`}>
            {/* Fruit body */}
            <ellipse cx="0" cy="0" rx="6" ry="8" fill={`url(#${pfx('cacFruit')})`} />
            {/* Highlight */}
            <ellipse cx="-2" cy="-2.5" rx="2.5" ry="3.5" fill={`url(#${pfx('cacFruitHi')})`} />
            {/* Outline hint */}
            <ellipse cx="0" cy="0" rx="6" ry="8" fill="none" stroke="#8a1838" strokeWidth="0.3" opacity="0.3" />
            {/* Areoles with tiny spines */}
            {[
              [-3, -4], [2, -2], [-1.5, 1], [3, 2.5], [0.5, -5.5],
              [-2.5, -1], [1, 4], [-0.5, 3], [2.5, -4], [-3, 3],
            ].map(([dx, dy], i) => (
              <g key={`fsp-${i}`}>
                <ellipse cx={dx} cy={dy} rx="0.6" ry="0.5" fill="#d4c890" opacity="0.5" />
                <line x1={dx} y1={dy} x2={dx + 1.5} y2={dy - 1} stroke="#d4c88a" strokeWidth="0.2" opacity="0.4" />
                <line x1={dx} y1={dy} x2={dx - 0.8} y2={dy - 1.2} stroke="#d4c88a" strokeWidth="0.15" opacity="0.3" />
              </g>
            ))}
            {/* Crown remnant at top */}
            <ellipse cx="0" cy="-7.5" rx="2" ry="1" fill="#8a1838" opacity="0.3" />
          </g>

          {/* ── Top fruit (medium, angled) ── */}
          <g transform="translate(107, 155) rotate(-18)" filter={`url(#${pfx('softShadow')})`}>
            <ellipse cx="0" cy="0" rx="5" ry="6.5" fill={`url(#${pfx('cacFruit')})`} />
            <ellipse cx="-1.5" cy="-2" rx="2" ry="3" fill={`url(#${pfx('cacFruitHi')})`} />
            <ellipse cx="0" cy="0" rx="5" ry="6.5" fill="none" stroke="#8a1838" strokeWidth="0.25" opacity="0.25" />
            {[[-2, -3], [1.5, -1], [-0.5, 2], [2, 3], [0, -4.5], [-1.5, 0.5]].map(([dx, dy], i) => (
              <g key={`fsp2-${i}`}>
                <ellipse cx={dx} cy={dy} rx="0.5" ry="0.4" fill="#d4c890" opacity="0.45" />
                <line x1={dx} y1={dy} x2={dx + 1.2} y2={dy - 0.8} stroke="#d4c88a" strokeWidth="0.18" opacity="0.35" />
              </g>
            ))}
            <ellipse cx="0" cy="-6" rx="1.5" ry="0.8" fill="#8a1838" opacity="0.25" />
          </g>

          {/* ── Left arm small fruit ── */}
          <g transform="translate(60, 180) rotate(12)" filter={`url(#${pfx('softShadow')})`}>
            <ellipse cx="0" cy="0" rx="4" ry="5.5" fill={`url(#${pfx('cacFruit')})`} />
            <ellipse cx="-1" cy="-1.5" rx="1.5" ry="2.2" fill={`url(#${pfx('cacFruitHi')})`} />
            {[[-1.5, -2.5], [1, -0.5], [0, 2], [-0.5, 0.5]].map(([dx, dy], i) => (
              <ellipse key={`fsp3-${i}`} cx={dx} cy={dy} rx="0.4" ry="0.35" fill="#d4c890" opacity="0.4" />
            ))}
          </g>
        </g>
      )}

      {/* Stage 7: Golden aura + shimmer particles */}
      {stage >= 7 && (
        <g>
          <circle cx="100" cy="195" r="75" fill={`url(#${pfx('harvestGlow')})`} className="animate-pulse" />
          {/* Shimmer particles around the cactus */}
          {[
            { x: 65, y: 158, delay: '0s', r: 2.5 },
            { x: 135, y: 170, delay: '1s', r: 2 },
            { x: 85, y: 145, delay: '2s', r: 2.2 },
            { x: 120, y: 150, delay: '3s', r: 1.8 },
            { x: 72, y: 178, delay: '0.5s', r: 2 },
            { x: 140, y: 155, delay: '1.5s', r: 1.5 },
            { x: 55, y: 190, delay: '2.5s', r: 1.8 },
            { x: 145, y: 192, delay: '3.5s', r: 1.5 },
          ].map((s, i) => (
            <g key={`shimmer-${i}`}>
              {/* Outer glow */}
              <circle
                cx={s.x} cy={s.y}
                r={s.r}
                fill="#ffd700"
                opacity="0.4"
                className="animate-pulse"
                style={{ animationDelay: s.delay }}
              />
              {/* Inner bright core */}
              <circle
                cx={s.x} cy={s.y}
                r={s.r * 0.45}
                fill="#fff8c4"
                opacity="0.5"
                className="animate-pulse"
                style={{ animationDelay: s.delay }}
              />
            </g>
          ))}
        </g>
      )}
    </g>
  );
}
