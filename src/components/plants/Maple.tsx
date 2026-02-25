export function mapleGradients(pfx: (name: string) => string) {
  return (
    <>
      {/* Radial gradient for green leaf canopy */}
      <radialGradient id={pfx('mapLeaf')} cx="50%" cy="55%" r="55%">
        <stop offset="0%" stopColor="#5aa848" />
        <stop offset="40%" stopColor="#4a9038" />
        <stop offset="75%" stopColor="#3d8030" />
        <stop offset="100%" stopColor="#2d6620" />
      </radialGradient>

      {/* Linear gradient for trunk */}
      <linearGradient id={pfx('mapTrunk')} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#5a3e28" />
        <stop offset="20%" stopColor="#6a4e35" />
        <stop offset="50%" stopColor="#7a5840" />
        <stop offset="80%" stopColor="#6a4e35" />
        <stop offset="100%" stopColor="#5a3e28" />
      </linearGradient>

      {/* Radial gradient for autumn canopy (stage 6) */}
      <radialGradient id={pfx('mapAutumn')} cx="50%" cy="50%" r="55%">
        <stop offset="0%" stopColor="#e08030" />
        <stop offset="30%" stopColor="#d4a020" />
        <stop offset="60%" stopColor="#c44020" />
        <stop offset="100%" stopColor="#a03018" />
      </radialGradient>

      {/* Linear gradient for samara (winged seed) */}
      <linearGradient id={pfx('mapSamara')} x1="0" y1="0" x2="0.6" y2="1">
        <stop offset="0%" stopColor="#c8a870" />
        <stop offset="50%" stopColor="#b89060" />
        <stop offset="100%" stopColor="#9a7848" />
      </linearGradient>

      {/* Trunk highlight */}
      <linearGradient id={pfx('mapTrunkHi')} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#a08060" stopOpacity="0" />
        <stop offset="45%" stopColor="#b09070" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#a08060" stopOpacity="0" />
      </linearGradient>

      {/* Leaf highlight for depth */}
      <radialGradient id={pfx('mapLeafHi')} cx="40%" cy="35%" r="45%">
        <stop offset="0%" stopColor="#7cc860" stopOpacity="0.5" />
        <stop offset="60%" stopColor="#5aa848" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#3d8030" stopOpacity="0" />
      </radialGradient>

      {/* Autumn highlight */}
      <radialGradient id={pfx('mapAutumnHi')} cx="40%" cy="35%" r="45%">
        <stop offset="0%" stopColor="#f0c040" stopOpacity="0.45" />
        <stop offset="60%" stopColor="#e09030" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#c44020" stopOpacity="0" />
      </radialGradient>
    </>
  );
}

/** Reusable 5-pointed maple leaf path (centered at origin, ~12px wide) */
function mapleLeafPath(scale = 1): string {
  const s = scale;
  return [
    `M 0 ${6 * s}`,
    // bottom-left lobe
    `C ${-1 * s} ${4 * s} ${-3 * s} ${3 * s} ${-5 * s} ${2 * s}`,
    `L ${-3.5 * s} ${1 * s}`,
    // left lobe
    `C ${-5 * s} ${0.5 * s} ${-7 * s} ${-1 * s} ${-6 * s} ${-2 * s}`,
    `L ${-4 * s} ${-2 * s}`,
    // top-left lobe
    `C ${-5 * s} ${-3.5 * s} ${-4 * s} ${-5 * s} ${-2 * s} ${-6 * s}`,
    `L ${-1 * s} ${-4.5 * s}`,
    // top center
    `C ${-1 * s} ${-5.5 * s} ${0 * s} ${-7 * s} ${0 * s} ${-7 * s}`,
    `C ${0 * s} ${-7 * s} ${1 * s} ${-5.5 * s} ${1 * s} ${-4.5 * s}`,
    `L ${2 * s} ${-6 * s}`,
    // top-right lobe
    `C ${4 * s} ${-5 * s} ${5 * s} ${-3.5 * s} ${4 * s} ${-2 * s}`,
    `L ${6 * s} ${-2 * s}`,
    // right lobe
    `C ${7 * s} ${-1 * s} ${5 * s} ${0.5 * s} ${3.5 * s} ${1 * s}`,
    `L ${5 * s} ${2 * s}`,
    // bottom-right lobe
    `C ${3 * s} ${3 * s} ${1 * s} ${4 * s} ${0 * s} ${6 * s}`,
    'Z',
  ].join(' ');
}

export function renderMaple(stage: number, pfx: (name: string) => string) {
  const leafPath = mapleLeafPath(1);
  const smallLeaf = mapleLeafPath(0.7);

  return (
    <g>
      {/* ── Stage 1-2: Samara — hidden once stem appears ── */}
      {stage >= 1 && stage < 3 && (
        <g transform="translate(100, 262)" filter={`url(#${pfx('softShadow')})`}>
          {/* Shadow on soil */}
          <ellipse cx="1" cy="6" rx="10" ry="2" fill="#3a2518" opacity="0.15" />
          {/* Seed body (rounded bulge at one end) */}
          <ellipse cx="-1" cy="2" rx="3" ry="4" fill={`url(#${pfx('mapSamara')})`} transform="rotate(-15)" />
          {/* Wing (elongated, slightly curved) */}
          <path
            d="M 0 -1 C 3 -5 8 -12 14 -16 C 16 -17 17 -16 16 -14 C 14 -10 8 -5 2 -1"
            fill={`url(#${pfx('mapSamara')})`}
            opacity="0.85"
            transform="rotate(-15)"
          />
          {/* Wing vein */}
          <path
            d="M 0 -1 C 4 -6 10 -13 15 -16"
            stroke="#9a7848"
            strokeWidth="0.5"
            fill="none"
            opacity="0.6"
            transform="rotate(-15)"
          />
          {/* Wing texture lines */}
          <path d="M 3 -3 C 5 -7 8 -10 10 -12" stroke="#a08858" strokeWidth="0.25" fill="none" opacity="0.4" transform="rotate(-15)" />
          <path d="M 4 -2 C 6 -5 9 -8 11 -10" stroke="#a08858" strokeWidth="0.25" fill="none" opacity="0.3" transform="rotate(-15)" />
          {/* Seed highlight */}
          <ellipse cx="-2" cy="0" rx="1.2" ry="2" fill="#d8c498" opacity="0.3" transform="rotate(-15)" />
        </g>
      )}

      {/* ── Stage 2: Roots + twin-leaf seedling ── */}
      {stage >= 2 && (
        <g>
          {/* Underground roots */}
          <g opacity="0.6">
            <path d="M 100 266 C 98 274 95 282 91 290" stroke="#8b6d4a" strokeWidth="1.4" fill="none" strokeLinecap="round" />
            <path d="M 100 266 C 102 275 107 283 113 291" stroke="#8b6d4a" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <path d="M 100 270 C 96 276 90 280 86 283" stroke="#8b6d4a" strokeWidth="0.8" fill="none" strokeLinecap="round" />
            <path d="M 94 281 C 91 285 87 288 84 290" stroke="#8b6d4a" strokeWidth="0.45" fill="none" strokeLinecap="round" />
            <path d="M 108 280 C 112 284 116 287 120 289" stroke="#8b6d4a" strokeWidth="0.45" fill="none" strokeLinecap="round" />
            <path d="M 92 287 C 89 290 86 292 84 293" stroke="#8b6d4a" strokeWidth="0.3" fill="none" strokeLinecap="round" />
          </g>

          {/* Tiny seedling stem */}
          <path d="M 100 262 C 100 256 100 252 100 248" stroke="#5a8a3c" strokeWidth="1.5" fill="none" strokeLinecap="round" />

          {/* Twin cotyledon leaves (distinctive maple seedling) */}
          <g filter={`url(#${pfx('softShadow')})`}>
            {/* Left cotyledon */}
            <path
              d="M 100 250 C 97 248 92 247 89 248 C 87 249 87 251 89 252 C 92 253 96 252 100 250"
              fill="#5aa848"
              opacity="0.9"
            />
            <path d="M 100 250 C 95 249 90 248 89 249" stroke="#3d8030" strokeWidth="0.4" fill="none" opacity="0.5" />
            {/* Right cotyledon */}
            <path
              d="M 100 250 C 103 248 108 247 111 248 C 113 249 113 251 111 252 C 108 253 104 252 100 250"
              fill="#4a9038"
              opacity="0.9"
            />
            <path d="M 100 250 C 105 249 110 248 111 249" stroke="#3d8030" strokeWidth="0.4" fill="none" opacity="0.5" />
          </g>
        </g>
      )}

      {/* ── Stage 3: Young sapling with thin trunk and a few maple leaves ── */}
      {stage >= 3 && (() => {
        const trunkTop = stage >= 6 ? 100 : stage >= 5 ? 105 : stage >= 4 ? 155 : 200;
        const trunkWidth = stage >= 5 ? 6 : stage >= 4 ? 4.5 : 3;
        return (
          <g>
            {/* Trunk shadow */}
            <path
              d={`M 102 262 C 102 240 101 ${trunkTop + 30} 101 ${trunkTop + 5}`}
              stroke="#1a1008"
              strokeWidth={trunkWidth * 0.5}
              fill="none"
              strokeLinecap="round"
              opacity="0.12"
            />
            {/* Main trunk */}
            <path
              d={`M 100 262 C 100 238 100 ${trunkTop + 28} 100 ${trunkTop}`}
              stroke={`url(#${pfx('mapTrunk')})`}
              strokeWidth={trunkWidth}
              fill="none"
              strokeLinecap="round"
              filter={`url(#${pfx('softShadow')})`}
            />
            {/* Trunk highlight */}
            <path
              d={`M 100 258 C 100 236 100 ${trunkTop + 30} 100 ${trunkTop + 5}`}
              stroke={`url(#${pfx('mapTrunkHi')})`}
              strokeWidth={trunkWidth * 0.4}
              fill="none"
              strokeLinecap="round"
            />
            {/* Bark texture lines */}
            {stage >= 4 && (
              <g opacity="0.2">
                <path d={`M 98 240 C 98.5 235 99 230 98.5 225`} stroke="#3a2818" strokeWidth="0.4" fill="none" />
                <path d={`M 101 245 C 101.5 238 102 232 101.5 228`} stroke="#3a2818" strokeWidth="0.3" fill="none" />
                <path d={`M 99 220 C 99.5 215 100 210 99.5 205`} stroke="#3a2818" strokeWidth="0.3" fill="none" />
              </g>
            )}

            {/* Stage 3 small maple leaves on the sapling */}
            {stage === 3 && (
              <g filter={`url(#${pfx('softShadow')})`}>
                {/* Left branch + leaf */}
                <path d="M 100 225 C 96 222 90 220 86 219" stroke="#5a3e28" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                <g transform="translate(86, 219) rotate(-20) scale(1.1)">
                  <path d={smallLeaf} fill="#4a9038" />
                  <path d="M 0 5 L 0 -5" stroke="#3d8030" strokeWidth="0.4" fill="none" opacity="0.5" />
                </g>

                {/* Right branch + leaf */}
                <path d="M 100 215 C 104 212 109 211 113 210" stroke="#5a3e28" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                <g transform="translate(113, 210) rotate(15) scale(1.1)">
                  <path d={smallLeaf} fill="#5aa848" />
                  <path d="M 0 5 L 0 -5" stroke="#3d8030" strokeWidth="0.4" fill="none" opacity="0.5" />
                </g>

                {/* Top leaf */}
                <g transform="translate(100, 200) rotate(0) scale(1.0)">
                  <path d={smallLeaf} fill="#4a9038" />
                  <path d="M 0 5 L 0 -5" stroke="#3d8030" strokeWidth="0.4" fill="none" opacity="0.5" />
                </g>
              </g>
            )}
          </g>
        );
      })()}

      {/* ── Stage 4: Spreading branches with maple leaves ── */}
      {stage >= 4 && stage < 6 && (
        <g>
          {/* Branches */}
          <g filter={`url(#${pfx('softShadow')})`}>
            {/* Left main branch */}
            <path d="M 100 195 C 94 188 84 180 74 175" stroke={`url(#${pfx('mapTrunk')})`} strokeWidth="3" fill="none" strokeLinecap="round" />
            {/* Right main branch */}
            <path d="M 100 190 C 106 184 116 177 126 173" stroke={`url(#${pfx('mapTrunk')})`} strokeWidth="2.8" fill="none" strokeLinecap="round" />
            {/* Left upper branch */}
            <path d="M 100 175 C 94 170 86 166 80 164" stroke={`url(#${pfx('mapTrunk')})`} strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* Right upper branch */}
            <path d="M 100 170 C 106 166 114 162 120 160" stroke={`url(#${pfx('mapTrunk')})`} strokeWidth="1.8" fill="none" strokeLinecap="round" />
            {/* Center top */}
            <path d="M 100 165 C 100 160 100 157 100 155" stroke={`url(#${pfx('mapTrunk')})`} strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </g>

          {/* Individual maple leaves on branches */}
          <g filter={`url(#${pfx('softShadow')})`}>
            {[
              { x: 74, y: 175, rot: -30, s: 1.3 },
              { x: 68, y: 170, rot: -45, s: 1.0 },
              { x: 80, y: 164, rot: -20, s: 1.2 },
              { x: 126, y: 173, rot: 25, s: 1.3 },
              { x: 132, y: 168, rot: 40, s: 1.0 },
              { x: 120, y: 160, rot: 15, s: 1.2 },
              { x: 100, y: 155, rot: 0, s: 1.4 },
              { x: 90, y: 168, rot: -10, s: 1.0 },
              { x: 110, y: 165, rot: 10, s: 1.0 },
              { x: 85, y: 178, rot: -35, s: 0.9 },
              { x: 115, y: 176, rot: 30, s: 0.9 },
            ].map((l, i) => (
              <g key={`s4leaf-${i}`} transform={`translate(${l.x}, ${l.y}) rotate(${l.rot}) scale(${l.s})`}>
                <path d={leafPath} fill={i % 2 === 0 ? '#4a9038' : '#5aa848'} />
                <path d={leafPath} fill={`url(#${pfx('mapLeafHi')})`} opacity="0.3" />
                {/* Center vein */}
                <path d="M 0 6 L 0 -6" stroke="#3d8030" strokeWidth="0.4" fill="none" opacity="0.5" />
                {/* Side veins */}
                <path d="M 0 1 L -4 -2" stroke="#3d8030" strokeWidth="0.25" fill="none" opacity="0.3" />
                <path d="M 0 1 L 4 -2" stroke="#3d8030" strokeWidth="0.25" fill="none" opacity="0.3" />
              </g>
            ))}
          </g>
        </g>
      )}

      {/* ── Stage 5: Full rounded canopy of green maple leaves ── */}
      {stage === 5 && (
        <g filter={`url(#${pfx('softShadow')})`}>
          {/* Branches visible at edges */}
          <path d="M 100 145 C 90 135 72 125 58 120" stroke={`url(#${pfx('mapTrunk')})`} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M 100 140 C 110 130 128 122 142 118" stroke={`url(#${pfx('mapTrunk')})`} strokeWidth="2.3" fill="none" strokeLinecap="round" />
          <path d="M 100 130 C 92 122 80 115 70 112" stroke={`url(#${pfx('mapTrunk')})`} strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M 100 125 C 108 118 120 112 130 110" stroke={`url(#${pfx('mapTrunk')})`} strokeWidth="1.8" fill="none" strokeLinecap="round" />

          {/* Canopy mass — layered ellipses for organic shape */}
          <ellipse cx="100" cy="108" rx="52" ry="38" fill={`url(#${pfx('mapLeaf')})`} opacity="0.85" />
          <ellipse cx="88" cy="112" rx="40" ry="32" fill="#3d8030" opacity="0.4" />
          <ellipse cx="115" cy="105" rx="38" ry="30" fill="#4a9038" opacity="0.35" />
          <ellipse cx="100" cy="95" rx="35" ry="22" fill="#5aa848" opacity="0.3" />
          {/* Highlight */}
          <ellipse cx="92" cy="98" rx="22" ry="16" fill={`url(#${pfx('mapLeafHi')})`} opacity="0.4" />

          {/* Individual leaf silhouettes at canopy edges for maple identity */}
          {[
            { x: 55, y: 115, rot: -40, s: 1.3 },
            { x: 48, y: 108, rot: -55, s: 1.1 },
            { x: 60, y: 98, rot: -25, s: 1.2 },
            { x: 145, y: 112, rot: 35, s: 1.3 },
            { x: 150, y: 105, rot: 50, s: 1.0 },
            { x: 140, y: 96, rot: 20, s: 1.2 },
            { x: 100, y: 85, rot: 0, s: 1.5 },
            { x: 85, y: 88, rot: -15, s: 1.1 },
            { x: 118, y: 86, rot: 12, s: 1.1 },
            { x: 70, y: 105, rot: -30, s: 1.0 },
            { x: 130, y: 100, rot: 28, s: 1.0 },
            { x: 76, y: 92, rot: -18, s: 0.9 },
            { x: 125, y: 90, rot: 22, s: 0.9 },
          ].map((l, i) => (
            <g key={`s5leaf-${i}`} transform={`translate(${l.x}, ${l.y}) rotate(${l.rot}) scale(${l.s})`}>
              <path d={leafPath} fill={['#3d8030', '#4a9038', '#5aa848'][i % 3]} />
              <path d="M 0 6 L 0 -6" stroke="#2d6620" strokeWidth="0.35" fill="none" opacity="0.4" />
            </g>
          ))}
        </g>
      )}

      {/* ── Stage 6: Autumn colors — orange, red, gold leaves + falling samaras ── */}
      {stage >= 6 && stage < 7 && (
        <g>
          {/* Branches */}
          <g filter={`url(#${pfx('softShadow')})`}>
            <path d="M 100 145 C 90 135 72 125 58 120" stroke={`url(#${pfx('mapTrunk')})`} strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 100 140 C 110 130 128 122 142 118" stroke={`url(#${pfx('mapTrunk')})`} strokeWidth="2.3" fill="none" strokeLinecap="round" />
            <path d="M 100 130 C 92 122 80 115 70 112" stroke={`url(#${pfx('mapTrunk')})`} strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <path d="M 100 125 C 108 118 120 112 130 110" stroke={`url(#${pfx('mapTrunk')})`} strokeWidth="1.8" fill="none" strokeLinecap="round" />
          </g>

          {/* Autumn canopy mass */}
          <g filter={`url(#${pfx('softShadow')})`}>
            <ellipse cx="100" cy="108" rx="52" ry="38" fill={`url(#${pfx('mapAutumn')})`} opacity="0.85" />
            <ellipse cx="88" cy="114" rx="38" ry="30" fill="#c44020" opacity="0.35" />
            <ellipse cx="115" cy="104" rx="36" ry="28" fill="#d4a020" opacity="0.3" />
            <ellipse cx="100" cy="96" rx="30" ry="20" fill="#e08030" opacity="0.25" />
            <ellipse cx="92" cy="98" rx="20" ry="14" fill={`url(#${pfx('mapAutumnHi')})`} opacity="0.4" />
          </g>

          {/* Individual autumn leaves at canopy edges */}
          {[
            { x: 54, y: 116, rot: -42, s: 1.3, c: '#c44020' },
            { x: 48, y: 106, rot: -58, s: 1.1, c: '#d4a020' },
            { x: 62, y: 97, rot: -22, s: 1.2, c: '#e08030' },
            { x: 146, y: 113, rot: 38, s: 1.3, c: '#e08030' },
            { x: 151, y: 104, rot: 52, s: 1.0, c: '#c44020' },
            { x: 138, y: 95, rot: 18, s: 1.2, c: '#d4a020' },
            { x: 100, y: 84, rot: 0, s: 1.5, c: '#c44020' },
            { x: 84, y: 87, rot: -16, s: 1.1, c: '#e08030' },
            { x: 118, y: 86, rot: 14, s: 1.1, c: '#d4a020' },
            { x: 72, y: 104, rot: -32, s: 1.0, c: '#c44020' },
            { x: 130, y: 100, rot: 26, s: 1.0, c: '#e08030' },
          ].map((l, i) => (
            <g key={`autumn-leaf-${i}`} transform={`translate(${l.x}, ${l.y}) rotate(${l.rot}) scale(${l.s})`}>
              <path d={leafPath} fill={l.c} />
              <path d="M 0 6 L 0 -6" stroke="#8a3018" strokeWidth="0.35" fill="none" opacity="0.4" />
            </g>
          ))}

          {/* Falling samaras (spinning down) */}
          {[
            { x: 140, y: 155, rot: 65, delay: '0s' },
            { x: 60, y: 165, rot: -50, delay: '1.5s' },
            { x: 120, y: 180, rot: 40, delay: '3s' },
            { x: 75, y: 195, rot: -70, delay: '2s' },
            { x: 135, y: 210, rot: 55, delay: '0.8s' },
          ].map((s, i) => (
            <g key={`samara-${i}`} transform={`translate(${s.x}, ${s.y}) rotate(${s.rot})`} opacity="0.6">
              <ellipse cx="0" cy="0" rx="2" ry="3" fill={`url(#${pfx('mapSamara')})`} />
              <path d="M 0 -2 C 2 -5 5 -9 8 -11 C 9 -11.5 9.5 -11 9 -10 C 7 -7 4 -4 1 -2" fill="#b89060" opacity="0.7" />
              <path d="M 0 -2 C 3 -6 7 -10 8.5 -11" stroke="#9a7848" strokeWidth="0.3" fill="none" opacity="0.5" />
            </g>
          ))}
        </g>
      )}

      {/* ── Stage 7: Harvest — golden glow + floating autumn leaves ── */}
      {stage >= 7 && (
        <g>
          {/* Branches */}
          <g filter={`url(#${pfx('softShadow')})`}>
            <path d="M 100 145 C 90 135 72 125 58 120" stroke={`url(#${pfx('mapTrunk')})`} strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 100 140 C 110 130 128 122 142 118" stroke={`url(#${pfx('mapTrunk')})`} strokeWidth="2.3" fill="none" strokeLinecap="round" />
            <path d="M 100 130 C 92 122 80 115 70 112" stroke={`url(#${pfx('mapTrunk')})`} strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <path d="M 100 125 C 108 118 120 112 130 110" stroke={`url(#${pfx('mapTrunk')})`} strokeWidth="1.8" fill="none" strokeLinecap="round" />
          </g>

          {/* Autumn canopy (same as stage 6 base) */}
          <g filter={`url(#${pfx('softShadow')})`}>
            <ellipse cx="100" cy="108" rx="52" ry="38" fill={`url(#${pfx('mapAutumn')})`} opacity="0.85" />
            <ellipse cx="88" cy="114" rx="38" ry="30" fill="#c44020" opacity="0.3" />
            <ellipse cx="115" cy="104" rx="36" ry="28" fill="#d4a020" opacity="0.25" />
            <ellipse cx="100" cy="96" rx="30" ry="20" fill="#e08030" opacity="0.2" />
          </g>

          {/* Autumn leaves at edges */}
          {[
            { x: 54, y: 116, rot: -42, s: 1.3, c: '#c44020' },
            { x: 146, y: 113, rot: 38, s: 1.3, c: '#e08030' },
            { x: 100, y: 84, rot: 0, s: 1.5, c: '#d4a020' },
            { x: 62, y: 97, rot: -22, s: 1.2, c: '#e08030' },
            { x: 138, y: 95, rot: 18, s: 1.2, c: '#c44020' },
            { x: 84, y: 87, rot: -16, s: 1.1, c: '#d4a020' },
            { x: 118, y: 86, rot: 14, s: 1.1, c: '#c44020' },
          ].map((l, i) => (
            <g key={`h-leaf-${i}`} transform={`translate(${l.x}, ${l.y}) rotate(${l.rot}) scale(${l.s})`}>
              <path d={leafPath} fill={l.c} />
              <path d="M 0 6 L 0 -6" stroke="#8a3018" strokeWidth="0.35" fill="none" opacity="0.4" />
            </g>
          ))}

          {/* Golden harvest glow */}
          <circle cx="100" cy="115" r="75" fill={`url(#${pfx('harvestGlow')})`} className="animate-pulse" />

          {/* Floating autumn leaves drifting away */}
          {[
            { x: 45, y: 90, rot: -35, delay: '0s', c: '#c44020' },
            { x: 155, y: 85, rot: 30, delay: '1.2s', c: '#e08030' },
            { x: 50, y: 120, rot: -50, delay: '2.5s', c: '#d4a020' },
            { x: 152, y: 115, rot: 45, delay: '3.8s', c: '#c44020' },
            { x: 100, y: 75, rot: 10, delay: '1.8s', c: '#e08030' },
            { x: 65, y: 100, rot: -25, delay: '0.6s', c: '#d4a020' },
          ].map((f, i) => (
            <g key={`float-leaf-${i}`} className="animate-float-away" style={{ animationDelay: f.delay }}>
              <g transform={`translate(${f.x}, ${f.y}) rotate(${f.rot}) scale(0.8)`}>
                <path d={smallLeaf} fill={f.c} opacity="0.7" />
                <path d="M 0 4 L 0 -4" stroke="#8a3018" strokeWidth="0.3" fill="none" opacity="0.3" />
              </g>
            </g>
          ))}
        </g>
      )}
    </g>
  );
}
