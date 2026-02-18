export const isDesertPlant = true;

export function joshuaTreeGradients(pfx: (name: string) => string) {
  return (
    <>
      {/* Trunk gradient — gray-brown with shaggy bark feel */}
      <linearGradient id={pfx('jtTrunk')} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#5a4a30" />
        <stop offset="20%" stopColor="#6b5a40" />
        <stop offset="45%" stopColor="#7a6a4e" />
        <stop offset="55%" stopColor="#8a7a58" />
        <stop offset="75%" stopColor="#7a6a4e" />
        <stop offset="100%" stopColor="#5a4a30" />
      </linearGradient>

      {/* Trunk vertical gradient overlay for depth */}
      <linearGradient id={pfx('jtTrunkVert')} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#8a7a58" stopOpacity="0.2" />
        <stop offset="50%" stopColor="#6b5a40" stopOpacity="0" />
        <stop offset="100%" stopColor="#4a3a28" stopOpacity="0.15" />
      </linearGradient>

      {/* Spiky leaf cluster — olive-green radial */}
      <radialGradient id={pfx('jtLeafCluster')} cx="45%" cy="40%" r="55%">
        <stop offset="0%" stopColor="#6a8850" />
        <stop offset="40%" stopColor="#5a7840" />
        <stop offset="70%" stopColor="#4a6838" />
        <stop offset="100%" stopColor="#3a5828" />
      </radialGradient>

      {/* Flower cluster — cream/white waxy */}
      <radialGradient id={pfx('jtFlower')} cx="40%" cy="35%" r="60%">
        <stop offset="0%" stopColor="#f8f0d8" />
        <stop offset="35%" stopColor="#f0e8c8" />
        <stop offset="70%" stopColor="#e8e0b8" />
        <stop offset="100%" stopColor="#e0d8b0" />
      </radialGradient>

      {/* Sandy soil */}
      <linearGradient id={pfx('sandSoil')} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#d4b880" />
        <stop offset="40%" stopColor="#c4a265" />
        <stop offset="100%" stopColor="#a08050" />
      </linearGradient>

      {/* Seed gradient */}
      <linearGradient id={pfx('jtSeedGrad')} x1="0.3" y1="0" x2="0.7" y2="1">
        <stop offset="0%" stopColor="#a08860" />
        <stop offset="50%" stopColor="#8b7050" />
        <stop offset="100%" stopColor="#6b5535" />
      </linearGradient>

      {/* Dead leaf / shaggy bark pieces */}
      <linearGradient id={pfx('jtDeadLeaf')} x1="0" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor="#9a8a68" />
        <stop offset="50%" stopColor="#8a7a60" />
        <stop offset="100%" stopColor="#7a6a50" />
      </linearGradient>
    </>
  );
}

export function renderJoshuaTree(stage: number, pfx: (name: string) => string) {
  /* ── Helper: draw a spiky leaf cluster (ball of dagger-like leaves) ── */
  const leafCluster = (
    cx: number,
    cy: number,
    radius: number,
    key: string,
  ) => {
    const spikes = 16;
    return (
      <g key={key}>
        {/* Core mass */}
        <circle cx={cx} cy={cy} r={radius * 0.55} fill={`url(#${pfx('jtLeafCluster')})`} />
        {/* Spiky leaves radiating outward */}
        {Array.from({ length: spikes }, (_, i) => {
          const angle = (360 / spikes) * i + (i % 2 === 0 ? 5 : -3);
          const rad = (angle * Math.PI) / 180;
          const len = radius * (0.85 + (i % 3) * 0.12);
          const tipX = cx + Math.cos(rad) * len;
          const tipY = cy + Math.sin(rad) * len;
          const midX = cx + Math.cos(rad) * (len * 0.5);
          const midY = cy + Math.sin(rad) * (len * 0.5);
          const perpX = Math.sin(rad) * 1.8;
          const perpY = -Math.cos(rad) * 1.8;
          return (
            <path
              key={`spike-${i}`}
              d={`M ${cx} ${cy} C ${midX + perpX} ${midY + perpY} ${midX - perpX} ${midY - perpY} ${tipX} ${tipY}`}
              stroke={i % 2 === 0 ? '#5a7840' : '#4a6838'}
              strokeWidth={1.4}
              fill="none"
              strokeLinecap="round"
              opacity={0.7 + (i % 3) * 0.1}
            />
          );
        })}
        {/* Inner highlight */}
        <circle cx={cx - radius * 0.12} cy={cy - radius * 0.15} r={radius * 0.3} fill="#6a8850" opacity="0.3" />
      </g>
    );
  };

  /* ── Helper: draw a flower cluster (dense cream blossoms) ── */
  const flowerCluster = (
    cx: number,
    cy: number,
    radius: number,
    key: string,
  ) => {
    const petals = 10;
    return (
      <g key={key} filter={`url(#${pfx('softShadow')})`}>
        {/* Base cluster shape */}
        <ellipse cx={cx} cy={cy} rx={radius} ry={radius * 0.85} fill={`url(#${pfx('jtFlower')})`} />
        {/* Individual petal bumps */}
        {Array.from({ length: petals }, (_, i) => {
          const angle = (360 / petals) * i;
          const rad = (angle * Math.PI) / 180;
          const px = cx + Math.cos(rad) * radius * 0.55;
          const py = cy + Math.sin(rad) * radius * 0.5;
          return (
            <ellipse
              key={`fp-${i}`}
              cx={px}
              cy={py}
              rx={radius * 0.35}
              ry={radius * 0.3}
              fill="#f0e8c8"
              opacity={0.5 + (i % 3) * 0.1}
            />
          );
        })}
        {/* Center highlight */}
        <ellipse cx={cx - radius * 0.1} cy={cy - radius * 0.12} rx={radius * 0.35} ry={radius * 0.3} fill="#f8f0d8" opacity="0.4" />
        {/* Subtle outline */}
        <ellipse cx={cx} cy={cy} rx={radius} ry={radius * 0.85} fill="none" stroke="#d0c8a0" strokeWidth="0.4" opacity="0.3" />
      </g>
    );
  };

  /* ── Helper: draw shaggy bark texture on a branch segment ── */
  const shaggyBark = (
    x1: number, y1: number,
    x2: number, y2: number,
    count: number,
    key: string,
  ) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy);
    const nx = -dy / len;
    const ny = dx / len;
    return (
      <g key={key}>
        {Array.from({ length: count }, (_, i) => {
          const t = (i + 0.5) / count;
          const px = x1 + dx * t;
          const py = y1 + dy * t;
          const side = i % 2 === 0 ? 1 : -1;
          const hangLen = 3 + (i % 3) * 1.5;
          return (
            <path
              key={`bark-${i}`}
              d={`M ${px} ${py} C ${px + nx * side * 2} ${py + ny * side * 2 + 1} ${px + nx * side * 1} ${py + hangLen} ${px + nx * side * 0.5} ${py + hangLen + 1.5}`}
              stroke="#8a7a60"
              strokeWidth="0.6"
              fill="none"
              opacity={0.25 + (i % 4) * 0.05}
              strokeLinecap="round"
            />
          );
        })}
      </g>
    );
  };

  return (
    <g>
      {/* ══════ Stage 1: Seed ══════ */}
      {stage >= 1 && (
        <g transform="translate(100, 260)" filter={`url(#${pfx('softShadow')})`}>
          {/* Ground shadow */}
          <ellipse cx="0" cy="5" rx="5" ry="2" fill="#8a7040" opacity="0.2" />
          {/* Seed body — small dark seed */}
          <ellipse cx="0" cy="0" rx="4" ry="4.5" fill={`url(#${pfx('jtSeedGrad')})`} />
          {/* Seed outline */}
          <ellipse cx="0" cy="0" rx="4" ry="4.5" fill="none" stroke="#5a4428" strokeWidth="0.5" />
          {/* Seed highlight */}
          <ellipse cx="-1.2" cy="-1.2" rx="1.8" ry="2.2" fill="#c4a870" opacity="0.25" />
          {/* Seed texture */}
          <path d="M -2 -2.5 Q 0 -3.5 2 -2.5" stroke="#5a4428" strokeWidth="0.3" fill="none" opacity="0.4" />
          <path d="M -2.5 0 Q 0 -1 2.5 0" stroke="#5a4428" strokeWidth="0.25" fill="none" opacity="0.35" />
          <path d="M -2 2 Q 0 1 2 2" stroke="#5a4428" strokeWidth="0.2" fill="none" opacity="0.3" />
          {/* Wing-like papery edge (Joshua tree seeds have thin wings) */}
          <path d="M 3.5 -2 C 5 -2.5 6 -1 5.5 0.5 C 5 2 4 2.5 3.5 2" stroke="#b09868" strokeWidth="0.3" fill="#b09868" opacity="0.2" />
        </g>
      )}

      {/* ══════ Stage 2: Roots + Spiky Seedling ══════ */}
      {stage >= 2 && (
        <g>
          {/* Root system — spreading below soil */}
          <g opacity="0.55">
            {/* Primary tap root */}
            <path d="M 100 267 C 100 274 99 282 98 290" stroke="#6b5535" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <path d="M 100 267 C 100 274 101 282 102 290" stroke="#6b5535" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            {/* Lateral roots */}
            <path d="M 100 270 C 90 272 78 275 66 278" stroke="#7a6a4a" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <path d="M 100 270 C 110 272 122 275 134 278" stroke="#7a6a4a" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            {/* Fine tips */}
            <path d="M 66 278 C 60 280 55 281 50 280" stroke="#7a6a4a" strokeWidth="0.5" fill="none" strokeLinecap="round" />
            <path d="M 134 278 C 140 280 145 281 150 280" stroke="#7a6a4a" strokeWidth="0.5" fill="none" strokeLinecap="round" />
            <path d="M 98 286 C 95 289 92 291 90 292" stroke="#7a6a4a" strokeWidth="0.4" fill="none" strokeLinecap="round" />
            <path d="M 102 286 C 105 289 108 291 110 292" stroke="#7a6a4a" strokeWidth="0.4" fill="none" strokeLinecap="round" />
          </g>

          {/* Spiky seedling — tiny rosette of dagger leaves */}
          {stage < 3 && (
            <g transform="translate(100, 255)" filter={`url(#${pfx('softShadow')})`}>
              {/* Central bud */}
              <ellipse cx="0" cy="0" rx="3" ry="2.5" fill="#5a7840" />
              {/* Emerging spiky leaves */}
              {Array.from({ length: 8 }, (_, i) => {
                const angle = -90 + (i - 3.5) * 25;
                const rad = (angle * Math.PI) / 180;
                const len = 8 + (i % 2) * 3;
                const tipX = Math.cos(rad) * len;
                const tipY = Math.sin(rad) * len;
                return (
                  <line
                    key={`seedling-${i}`}
                    x1="0"
                    y1="0"
                    x2={tipX}
                    y2={tipY}
                    stroke={i % 2 === 0 ? '#5a7840' : '#4a6838'}
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    opacity="0.8"
                  />
                );
              })}
            </g>
          )}
        </g>
      )}

      {/* ══════ Stage 3: Single Trunk + Leaf Tuft ══════ */}
      {stage >= 3 && stage < 4 && (
        <g filter={`url(#${pfx('softShadow')})`}>
          {/* Trunk shadow */}
          <path
            d="M 95 265 C 95 240 96 215 97 200 L 103 200 C 104 215 105 240 105 265 Z"
            fill="#3a2a18"
            opacity="0.1"
            transform="translate(1.5, 2)"
          />
          {/* Main trunk */}
          <path
            d="M 94 265 C 94 240 95 215 96 200 L 104 200 C 105 215 106 240 106 265 Z"
            fill={`url(#${pfx('jtTrunk')})`}
          />
          {/* Trunk depth overlay */}
          <path
            d="M 94 265 C 94 240 95 215 96 200 L 104 200 C 105 215 106 240 106 265 Z"
            fill={`url(#${pfx('jtTrunkVert')})`}
          />
          {/* Bark texture lines */}
          <path d="M 96 260 C 96 245 97 230 97 215" stroke="#4a3a28" strokeWidth="0.5" fill="none" opacity="0.3" />
          <path d="M 98 260 C 98 245 99 230 99 215" stroke="#4a3a28" strokeWidth="0.4" fill="none" opacity="0.25" />
          <path d="M 102 260 C 102 245 103 230 103 215" stroke="#4a3a28" strokeWidth="0.4" fill="none" opacity="0.25" />
          <path d="M 104 258 C 104 245 104 230 104 215" stroke="#4a3a28" strokeWidth="0.35" fill="none" opacity="0.2" />
          {/* A few dead leaf stubs clinging to trunk */}
          <path d="M 94 240 C 90 242 88 244 87 246" stroke="#8a7a60" strokeWidth="0.7" fill="none" opacity="0.3" />
          <path d="M 106 235 C 110 237 112 238 113 240" stroke="#8a7a60" strokeWidth="0.6" fill="none" opacity="0.25" />
          <path d="M 94 225 C 91 226 89 228 88 230" stroke="#8a7a60" strokeWidth="0.5" fill="none" opacity="0.2" />

          {/* Leaf tuft at top */}
          {leafCluster(100, 192, 14, 'lc-top-3')}
        </g>
      )}

      {/* ══════ Stage 4: First Branch Fork ══════ */}
      {stage >= 4 && stage < 5 && (
        <g filter={`url(#${pfx('softShadow')})`}>
          {/* Main trunk — thicker, taller */}
          <path
            d="M 92 265 C 92 245 93 225 95 210 L 105 210 C 107 225 108 245 108 265 Z"
            fill={`url(#${pfx('jtTrunk')})`}
          />
          <path
            d="M 92 265 C 92 245 93 225 95 210 L 105 210 C 107 225 108 245 108 265 Z"
            fill={`url(#${pfx('jtTrunkVert')})`}
          />
          {/* Bark texture */}
          <path d="M 95 260 C 95 240 96 220 97 210" stroke="#4a3a28" strokeWidth="0.5" fill="none" opacity="0.3" />
          <path d="M 100 260 C 100 240 100 220 100 210" stroke="#4a3a28" strokeWidth="0.4" fill="none" opacity="0.2" />
          <path d="M 105 260 C 105 240 105 220 104 210" stroke="#4a3a28" strokeWidth="0.4" fill="none" opacity="0.2" />

          {/* Dead leaf stubs on trunk */}
          <path d="M 92 250 C 88 252 86 254 85 256" stroke="#8a7a60" strokeWidth="0.7" fill="none" opacity="0.3" />
          <path d="M 108 245 C 112 247 114 249 115 251" stroke="#8a7a60" strokeWidth="0.6" fill="none" opacity="0.25" />
          <path d="M 92 235 C 89 236 87 238 86 240" stroke="#8a7a60" strokeWidth="0.5" fill="none" opacity="0.2" />
          <path d="M 108 230 C 111 231 113 233 114 235" stroke="#8a7a60" strokeWidth="0.5" fill="none" opacity="0.2" />

          {/* Fork point — trunk splits at ~210 */}
          {/* Left branch */}
          <path
            d="M 95 210 C 90 205 82 195 78 180 C 76 174 74 170 74 165
               L 80 165 C 80 170 82 174 84 180 C 88 195 93 202 98 208 Z"
            fill={`url(#${pfx('jtTrunk')})`}
          />
          <path
            d="M 95 210 C 90 205 82 195 78 180 C 76 174 74 170 74 165
               L 80 165 C 80 170 82 174 84 180 C 88 195 93 202 98 208 Z"
            fill={`url(#${pfx('jtTrunkVert')})`}
          />

          {/* Right branch */}
          <path
            d="M 105 210 C 110 205 118 195 122 180 C 124 174 126 170 126 165
               L 120 165 C 120 170 118 174 116 180 C 112 195 107 202 102 208 Z"
            fill={`url(#${pfx('jtTrunk')})`}
          />
          <path
            d="M 105 210 C 110 205 118 195 122 180 C 124 174 126 170 126 165
               L 120 165 C 120 170 118 174 116 180 C 112 195 107 202 102 208 Z"
            fill={`url(#${pfx('jtTrunkVert')})`}
          />

          {/* Shaggy bark at fork */}
          <path d="M 96 210 C 93 208 90 203 87 198" stroke="#8a7a60" strokeWidth="0.6" fill="none" opacity="0.25" />
          <path d="M 104 210 C 107 208 110 203 113 198" stroke="#8a7a60" strokeWidth="0.6" fill="none" opacity="0.25" />

          {/* Leaf clusters at branch tips */}
          {leafCluster(77, 157, 13, 'lc-left-4')}
          {leafCluster(123, 157, 13, 'lc-right-4')}
        </g>
      )}

      {/* ══════ Stage 5: Mature Multi-Fork Silhouette ══════ */}
      {stage >= 5 && (
        <g filter={`url(#${pfx('softShadow')})`}>
          {/* ── Main trunk (thick, tall) ── */}
          <path
            d="M 90 265 C 90 245 91 225 93 205 L 107 205 C 109 225 110 245 110 265 Z"
            fill={`url(#${pfx('jtTrunk')})`}
          />
          <path
            d="M 90 265 C 90 245 91 225 93 205 L 107 205 C 109 225 110 245 110 265 Z"
            fill={`url(#${pfx('jtTrunkVert')})`}
          />
          {/* Trunk bark grooves */}
          {[93, 96, 100, 104, 107].map((x, i) => (
            <path
              key={`tbark-${i}`}
              d={`M ${x} 260 C ${x} 240 ${x} 220 ${x + (i % 2 === 0 ? 0.5 : -0.5)} 205`}
              stroke="#4a3a28"
              strokeWidth="0.4"
              fill="none"
              opacity={0.2 + (i % 2) * 0.08}
            />
          ))}

          {/* Dead leaf stubs on trunk */}
          <path d="M 90 250 C 86 253 84 256 83 258" stroke="#8a7a60" strokeWidth="0.8" fill="none" opacity="0.3" />
          <path d="M 110 248 C 114 251 116 254 117 256" stroke="#8a7a60" strokeWidth="0.7" fill="none" opacity="0.28" />
          <path d="M 90 235 C 87 237 85 240 84 242" stroke="#8a7a60" strokeWidth="0.6" fill="none" opacity="0.22" />
          <path d="M 110 232 C 113 234 115 237 116 239" stroke="#8a7a60" strokeWidth="0.6" fill="none" opacity="0.22" />
          <path d="M 90 220 C 88 222 86 225 85 227" stroke="#8a7a60" strokeWidth="0.5" fill="none" opacity="0.18" />

          {/* ── Left primary branch ── */}
          <path
            d="M 93 205 C 86 198 76 185 70 170 C 67 163 64 155 62 148
               L 68 146 C 70 153 73 161 76 168 C 82 183 90 195 97 202 Z"
            fill={`url(#${pfx('jtTrunk')})`}
          />

          {/* Left sub-branch upper (going up-left) */}
          <path
            d="M 65 155 C 60 148 54 138 50 128 C 48 123 46 118 45 112
               L 50 110 C 51 116 53 121 55 126 C 59 136 64 145 69 152 Z"
            fill={`url(#${pfx('jtTrunk')})`}
          />

          {/* Left sub-branch lower (going out-left) */}
          <path
            d="M 70 170 C 62 167 54 162 48 155 C 45 152 42 148 40 145
               L 45 142 C 47 145 49 149 52 152 C 58 159 65 164 73 167 Z"
            fill={`url(#${pfx('jtTrunk')})`}
          />

          {/* ── Right primary branch ── */}
          <path
            d="M 107 205 C 114 197 126 182 134 165 C 138 157 141 148 142 140
               L 136 138 C 135 146 132 155 128 163 C 120 180 110 194 103 202 Z"
            fill={`url(#${pfx('jtTrunk')})`}
          />

          {/* Right sub-branch upper (going up-right) */}
          <path
            d="M 140 148 C 144 140 148 130 150 120 C 151 115 152 108 152 102
               L 147 100 C 147 106 146 113 145 118 C 143 128 139 138 135 146 Z"
            fill={`url(#${pfx('jtTrunk')})`}
          />

          {/* Right mid-branch (asymmetric — goes more horizontal) */}
          <path
            d="M 134 165 C 140 160 148 154 155 150 C 158 148 161 147 163 147
               L 162 152 C 160 152 157 153 154 155 C 147 159 139 164 132 169 Z"
            fill={`url(#${pfx('jtTrunk')})`}
          />

          {/* ── Shaggy bark on branches ── */}
          {shaggyBark(93, 205, 65, 155, 6, 'bark-lb')}
          {shaggyBark(65, 155, 48, 118, 4, 'bark-lub')}
          {shaggyBark(70, 170, 42, 148, 4, 'bark-llb')}
          {shaggyBark(107, 205, 140, 148, 6, 'bark-rb')}
          {shaggyBark(140, 148, 150, 108, 4, 'bark-rub')}
          {shaggyBark(134, 165, 160, 150, 3, 'bark-rmb')}

          {/* ── Leaf clusters at every branch tip ── */}
          {leafCluster(47, 104, 13, 'lc5-lub')}
          {leafCluster(40, 138, 11, 'lc5-llb')}
          {leafCluster(64, 140, 12, 'lc5-lmid')}
          {leafCluster(150, 93, 14, 'lc5-rub')}
          {leafCluster(163, 143, 11, 'lc5-rmb')}
          {leafCluster(138, 132, 12, 'lc5-rmid')}
        </g>
      )}

      {/* ══════ Stage 6: Cream Flower Clusters ══════ */}
      {stage >= 6 && (
        <g>
          {/* Flower clusters at branch tips — among the leaf clusters */}
          {flowerCluster(50, 96, 8, 'fl6-lub')}
          {flowerCluster(38, 132, 6.5, 'fl6-llb')}
          {flowerCluster(67, 134, 7, 'fl6-lmid')}
          {flowerCluster(153, 86, 8.5, 'fl6-rub')}
          {flowerCluster(165, 138, 6.5, 'fl6-rmb')}
          {flowerCluster(140, 126, 7, 'fl6-rmid')}

          {/* Extra small buds near clusters */}
          <g opacity="0.6">
            <ellipse cx="42" cy="107" rx="3" ry="2.5" fill="#e8e0b8" />
            <ellipse cx="155" cy="98" rx="3.5" ry="2.8" fill="#e8e0b8" />
            <ellipse cx="62" cy="145" rx="2.5" ry="2" fill="#e8e0b8" />
            <ellipse cx="160" cy="147" rx="2.5" ry="2" fill="#e8e0b8" />
          </g>
        </g>
      )}

      {/* ══════ Stage 7: Golden Harvest Glow + Floating Particles ══════ */}
      {stage >= 7 && (
        <g>
          {/* Golden aura */}
          <circle
            cx="100"
            cy="160"
            r="85"
            fill={`url(#${pfx('harvestGlow')})`}
            className="animate-pulse"
          />

          {/* Floating golden particles */}
          {[
            { x: 38, y: 95, delay: '0s', r: 2.2 },
            { x: 160, y: 82, delay: '1.2s', r: 2.5 },
            { x: 55, y: 120, delay: '2.4s', r: 2 },
            { x: 145, y: 115, delay: '0.6s', r: 1.8 },
            { x: 75, y: 85, delay: '1.8s', r: 2 },
            { x: 130, y: 95, delay: '3s', r: 1.6 },
            { x: 48, y: 145, delay: '3.6s', r: 1.5 },
            { x: 168, y: 130, delay: '0.3s', r: 1.8 },
          ].map((p, i) => (
            <g key={`harvest-p-${i}`} className="animate-float-away" style={{ animationDelay: p.delay }}>
              {/* Outer glow */}
              <circle
                cx={p.x}
                cy={p.y}
                r={p.r}
                fill="#ffd700"
                opacity="0.4"
                className="animate-pulse"
                style={{ animationDelay: p.delay }}
              />
              {/* Inner bright core */}
              <circle
                cx={p.x}
                cy={p.y}
                r={p.r * 0.45}
                fill="#fff8c4"
                opacity="0.5"
                className="animate-pulse"
                style={{ animationDelay: p.delay }}
              />
            </g>
          ))}
        </g>
      )}
    </g>
  );
}
