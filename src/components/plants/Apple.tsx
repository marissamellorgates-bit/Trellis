export function appleGradients(pfx: (name: string) => string) {
  return (
    <>
      {/* Trunk gradient — warm brown */}
      <linearGradient id={pfx('aplTrunk')} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#5a3820" />
        <stop offset="35%" stopColor="#7a5838" />
        <stop offset="65%" stopColor="#6a4830" />
        <stop offset="100%" stopColor="#5a3820" />
      </linearGradient>
      {/* Trunk highlight */}
      <linearGradient id={pfx('aplTrunkHi')} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#8a6848" stopOpacity="0" />
        <stop offset="40%" stopColor="#9a7858" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#8a6848" stopOpacity="0" />
      </linearGradient>
      {/* Canopy gradient — green radial */}
      <radialGradient id={pfx('aplCanopy')} cx="50%" cy="45%" r="55%">
        <stop offset="0%" stopColor="#58a040" />
        <stop offset="50%" stopColor="#4a8a35" />
        <stop offset="85%" stopColor="#3d7a30" />
        <stop offset="100%" stopColor="#2d6020" />
      </radialGradient>
      {/* Canopy highlight */}
      <radialGradient id={pfx('aplCanopyHi')} cx="35%" cy="30%" r="40%">
        <stop offset="0%" stopColor="#78c060" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#58a040" stopOpacity="0" />
      </radialGradient>
      {/* Blossom gradient — pink */}
      <radialGradient id={pfx('aplBlossom')} cx="40%" cy="35%" r="55%">
        <stop offset="0%" stopColor="#fff0f4" />
        <stop offset="40%" stopColor="#ffb8c8" />
        <stop offset="100%" stopColor="#ff90a8" />
      </radialGradient>
      {/* Fruit gradient — red apple */}
      <radialGradient id={pfx('aplFruit')} cx="35%" cy="30%" r="60%">
        <stop offset="0%" stopColor="#ff6060" />
        <stop offset="40%" stopColor="#d42020" />
        <stop offset="100%" stopColor="#a01818" />
      </radialGradient>
      {/* Seed gradient */}
      <linearGradient id={pfx('aplSeedGrad')} x1="0.3" y1="0" x2="0.7" y2="1">
        <stop offset="0%" stopColor="#5a3820" />
        <stop offset="50%" stopColor="#3e2510" />
        <stop offset="100%" stopColor="#2a1808" />
      </linearGradient>
      {/* Leaf gradient for individual leaves */}
      <linearGradient id={pfx('aplLeaf')} x1="0" y1="0" x2="0.8" y2="1">
        <stop offset="0%" stopColor="#58a040" />
        <stop offset="100%" stopColor="#3d7a30" />
      </linearGradient>
    </>
  );
}

export function renderApple(stage: number, pfx: (name: string) => string) {
  return (
    <g>
      {/* Stage 1-2: Apple seed — hidden once stem appears */}
      {stage >= 1 && stage < 3 && (
        <g transform="translate(100, 262)" filter={`url(#${pfx('softShadow')})`}>
          {/* Seed shadow */}
          <ellipse cx="1" cy="5" rx="4" ry="1.5" fill="#3a2518" opacity="0.15" />
          {/* Seed body — teardrop shape */}
          <path
            d="M 0 -6 C -3 -3 -4 1 -3.5 4 C -3 6 -1 7.5 0 7.5 C 1 7.5 3 6 3.5 4 C 4 1 3 -3 0 -6 Z"
            fill={`url(#${pfx('aplSeedGrad')})`}
          />
          {/* Seed outline */}
          <path
            d="M 0 -6 C -3 -3 -4 1 -3.5 4 C -3 6 -1 7.5 0 7.5 C 1 7.5 3 6 3.5 4 C 4 1 3 -3 0 -6 Z"
            fill="none" stroke="#2a1808" strokeWidth="0.4"
          />
          {/* Seed ridge */}
          <path d="M 0 -4 C 0.3 -1 0.3 3 0 6" stroke="#5a4020" strokeWidth="0.6" fill="none" opacity="0.35" />
          {/* Seed highlight */}
          <ellipse cx="-1.2" cy="0" rx="1.2" ry="3" fill="#7a5838" opacity="0.2" transform="rotate(-8)" />
        </g>
      )}

      {/* Stage 2: Root system + tiny seedling */}
      {stage >= 2 && (
        <g>
          {/* Underground roots */}
          <g opacity="0.6">
            <path d="M 100 266 C 98 274 95 282 90 290" stroke="#8b6d4a" strokeWidth="1.4" fill="none" strokeLinecap="round" />
            <path d="M 100 266 C 103 275 107 283 113 291" stroke="#8b6d4a" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <path d="M 100 270 C 95 275 88 280 83 283" stroke="#8b6d4a" strokeWidth="0.8" fill="none" strokeLinecap="round" />
            <path d="M 92 282 C 89 286 85 289 82 291" stroke="#8b6d4a" strokeWidth="0.5" fill="none" strokeLinecap="round" />
            <path d="M 109 281 C 112 285 116 288 120 290" stroke="#8b6d4a" strokeWidth="0.5" fill="none" strokeLinecap="round" />
            <path d="M 87 286 C 84 289 81 291 79 292" stroke="#8b6d4a" strokeWidth="0.35" fill="none" strokeLinecap="round" />
            <path d="M 115 286 C 118 289 121 291 123 292" stroke="#8b6d4a" strokeWidth="0.35" fill="none" strokeLinecap="round" />
          </g>
          {/* Tiny seedling above soil */}
          <g filter={`url(#${pfx('softShadow')})`}>
            <path d="M 100 262 C 100.5 258 100 254 100 250" stroke="#4a7530" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            {/* Two cotyledon leaves */}
            <path d="M 100 252 C 96 250 92 248 90 246 C 89 244 90 242 93 242 C 96 242 98 244 100 248" fill="#58a040" opacity="0.8" />
            <path d="M 100 252 C 104 250 108 248 110 246 C 111 244 110 242 107 242 C 104 242 102 244 100 248" fill="#4a8a35" opacity="0.8" />
          </g>
        </g>
      )}

      {/* Stage 3: Sapling — thin trunk + a few leaves, height ~200 */}
      {stage >= 3 && (
        <g filter={`url(#${pfx('softShadow')})`}>
          {/* Trunk shadow */}
          <path
            d={`M 102 262 C 103 245 101 220 102 ${stage >= 5 ? 105 : stage >= 4 ? 148 : 200}`}
            stroke="#1a0e05" strokeWidth={stage >= 5 ? 6 : stage >= 4 ? 4.5 : 3}
            fill="none" strokeLinecap="round" opacity="0.12"
          />
          {/* Main trunk */}
          <path
            d={`M 100 262 C 101 244 99 218 100 ${stage >= 5 ? 103 : stage >= 4 ? 146 : 198}`}
            stroke={`url(#${pfx('aplTrunk')})`}
            strokeWidth={stage >= 5 ? 8 : stage >= 4 ? 6 : 3.5}
            fill="none" strokeLinecap="round"
          />
          {/* Trunk highlight */}
          <path
            d={`M 100 258 C 101 242 99 220 100 ${stage >= 5 ? 106 : stage >= 4 ? 150 : 202}`}
            stroke={`url(#${pfx('aplTrunkHi')})`}
            strokeWidth={stage >= 5 ? 3 : stage >= 4 ? 2.5 : 1.5}
            fill="none" strokeLinecap="round"
          />

          {/* Sapling leaves (stage 3 only, replaced by canopy later) */}
          {stage < 4 && (
            <g>
              {/* Left leaf */}
              <path d="M 100 220 C 95 216 88 214 84 212 C 82 210 83 207 86 208 C 90 209 95 212 100 216"
                fill={`url(#${pfx('aplLeaf')})`} opacity="0.85" />
              <path d="M 100 220 C 95 216 88 214 84 212" stroke="#2d6020" strokeWidth="0.5" fill="none" opacity="0.5" />
              {/* Right leaf */}
              <path d="M 100 212 C 105 208 112 206 116 205 C 118 203 117 200 114 201 C 110 202 105 205 100 209"
                fill={`url(#${pfx('aplLeaf')})`} opacity="0.8" />
              <path d="M 100 212 C 105 208 112 206 116 205" stroke="#2d6020" strokeWidth="0.5" fill="none" opacity="0.5" />
              {/* Top leaf */}
              <path d="M 100 202 C 98 198 97 194 96 190 C 95 188 96 186 98 187 C 100 189 101 193 100 198"
                fill="#58a040" opacity="0.7" />
            </g>
          )}
        </g>
      )}

      {/* Stage 4: Rounded leafy canopy developing, height ~150 */}
      {stage >= 4 && (
        <g>
          {/* Branches visible beneath canopy */}
          <g filter={`url(#${pfx('softShadow')})`}>
            {/* Left branch */}
            <path d="M 100 175 C 94 168 85 160 78 155" stroke={`url(#${pfx('aplTrunk')})`} strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 78 155 C 73 150 68 148 64 147" stroke={`url(#${pfx('aplTrunk')})`} strokeWidth="1.5" fill="none" strokeLinecap="round" />
            {/* Right branch */}
            <path d="M 100 170 C 108 162 118 155 126 150" stroke={`url(#${pfx('aplTrunk')})`} strokeWidth="2.8" fill="none" strokeLinecap="round" />
            <path d="M 126 150 C 131 146 135 144 138 143" stroke={`url(#${pfx('aplTrunk')})`} strokeWidth="1.4" fill="none" strokeLinecap="round" />
            {/* Upper left branch */}
            <path d="M 100 160 C 93 152 86 146 80 142" stroke={`url(#${pfx('aplTrunk')})`} strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* Upper right branch */}
            <path d="M 100 155 C 110 148 118 142 124 138" stroke={`url(#${pfx('aplTrunk')})`} strokeWidth="1.8" fill="none" strokeLinecap="round" />
          </g>

          {/* Canopy — rounded and wider than tall */}
          <g filter={`url(#${pfx('softShadow')})`}>
            {/* Canopy shadow */}
            <ellipse cx="101" cy="134" rx="52" ry="42" fill="#1a3010" opacity="0.1" />
            {/* Main canopy shape — wide rounded */}
            <ellipse cx="100" cy="130" rx={stage >= 5 ? 56 : 50} ry={stage >= 5 ? 46 : 40} fill={`url(#${pfx('aplCanopy')})`} />
            {/* Canopy highlight */}
            <ellipse cx="100" cy="130" rx={stage >= 5 ? 56 : 50} ry={stage >= 5 ? 46 : 40} fill={`url(#${pfx('aplCanopyHi')})`} />
            {/* Bumpy canopy edges — organic feel */}
            <ellipse cx="68" cy="125" rx="18" ry="16" fill="#4a8a35" opacity="0.5" />
            <ellipse cx="132" cy="122" rx="17" ry="15" fill="#4a8a35" opacity="0.45" />
            <ellipse cx="100" cy="98" rx="20" ry="14" fill="#58a040" opacity="0.4" />
            <ellipse cx="82" cy="145" rx="15" ry="12" fill="#3d7a30" opacity="0.4" />
            <ellipse cx="118" cy="148" rx="16" ry="11" fill="#3d7a30" opacity="0.35" />
            {/* Leaf texture dots */}
            <circle cx="75" cy="118" r="3" fill="#68b050" opacity="0.3" />
            <circle cx="88" cy="108" r="2.5" fill="#68b050" opacity="0.25" />
            <circle cx="112" cy="112" r="3" fill="#68b050" opacity="0.28" />
            <circle cx="125" cy="125" r="2.5" fill="#68b050" opacity="0.22" />
            <circle cx="95" cy="140" r="2" fill="#68b050" opacity="0.2" />
            <circle cx="108" cy="145" r="2.5" fill="#68b050" opacity="0.2" />
          </g>
        </g>
      )}

      {/* Stage 5: Apple blossoms — pink/white 5-petal flowers */}
      {stage >= 5 && stage < 7 && (
        <g>
          {[
            { cx: 72, cy: 112, r: 7, rot: 0 },
            { cx: 128, cy: 108, r: 6.5, rot: 20 },
            { cx: 100, cy: 92, r: 7.5, rot: 10 },
            { cx: 60, cy: 132, r: 5.5, rot: 35 },
            { cx: 140, cy: 128, r: 6, rot: -15 },
            { cx: 88, cy: 150, r: 5, rot: 25 },
            { cx: 115, cy: 148, r: 5.5, rot: -10 },
            { cx: 78, cy: 98, r: 5, rot: 40 },
            { cx: 122, cy: 96, r: 5.5, rot: -30 },
          ].map((blossom, i) => (
            <g key={`blossom-${i}`} transform={`translate(${blossom.cx}, ${blossom.cy}) rotate(${blossom.rot})`}>
              {/* 5 petals */}
              {Array.from({ length: 5 }, (_, j) => {
                const angle = (360 / 5) * j;
                return (
                  <ellipse
                    key={`petal-${j}`}
                    cx={0}
                    cy={-blossom.r * 0.65}
                    rx={blossom.r * 0.38}
                    ry={blossom.r * 0.55}
                    fill={`url(#${pfx('aplBlossom')})`}
                    transform={`rotate(${angle})`}
                    opacity="0.85"
                  />
                );
              })}
              {/* Flower center */}
              <circle r={blossom.r * 0.22} fill="#f0d060" opacity="0.9" />
              <circle r={blossom.r * 0.12} fill="#e0a030" opacity="0.7" />
            </g>
          ))}
        </g>
      )}

      {/* Stage 6: Red apples hanging from branches */}
      {stage >= 6 && (
        <g>
          {[
            { cx: 78, cy: 118, r: 8, stemAngle: -15 },
            { cx: 122, cy: 112, r: 9, stemAngle: 10 },
            { cx: 95, cy: 98, r: 7.5, stemAngle: -8 },
            { cx: 135, cy: 135, r: 7, stemAngle: 20 },
            { cx: 68, cy: 140, r: 7.5, stemAngle: -18 },
          ].map((apple, i) => (
            <g key={`apple-${i}`} filter={`url(#${pfx('softShadow')})`}>
              {/* Stem */}
              <path
                d={`M ${apple.cx} ${apple.cy - apple.r + 1} C ${apple.cx + Math.sin(apple.stemAngle * Math.PI / 180) * 3} ${apple.cy - apple.r - 3} ${apple.cx + Math.sin(apple.stemAngle * Math.PI / 180) * 5} ${apple.cy - apple.r - 6} ${apple.cx + Math.sin(apple.stemAngle * Math.PI / 180) * 4} ${apple.cy - apple.r - 8}`}
                stroke="#5a4020" strokeWidth="1.2" fill="none" strokeLinecap="round"
              />
              {/* Small leaf on stem */}
              <path
                d={`M ${apple.cx + Math.sin(apple.stemAngle * Math.PI / 180) * 3} ${apple.cy - apple.r - 4} C ${apple.cx + 5} ${apple.cy - apple.r - 7} ${apple.cx + 8} ${apple.cy - apple.r - 6} ${apple.cx + 6} ${apple.cy - apple.r - 3}`}
                fill="#4a8a35" opacity="0.7"
              />
              {/* Apple shadow */}
              <ellipse cx={apple.cx + 1} cy={apple.cy + apple.r - 1} rx={apple.r * 0.7} ry={apple.r * 0.2} fill="#1a0e05" opacity="0.1" />
              {/* Apple body */}
              <circle cx={apple.cx} cy={apple.cy} r={apple.r} fill={`url(#${pfx('aplFruit')})`} />
              {/* Apple indent at top */}
              <path
                d={`M ${apple.cx - 2} ${apple.cy - apple.r + 1.5} C ${apple.cx - 1} ${apple.cy - apple.r + 3} ${apple.cx + 1} ${apple.cy - apple.r + 3} ${apple.cx + 2} ${apple.cy - apple.r + 1.5}`}
                stroke="#a01818" strokeWidth="0.6" fill="none" opacity="0.5"
              />
              {/* Apple highlight */}
              <ellipse cx={apple.cx - apple.r * 0.25} cy={apple.cy - apple.r * 0.3} rx={apple.r * 0.3} ry={apple.r * 0.25} fill="#ff8080" opacity="0.35" transform={`rotate(-20 ${apple.cx} ${apple.cy})`} />
              {/* Apple bottom highlight */}
              <ellipse cx={apple.cx + apple.r * 0.1} cy={apple.cy + apple.r * 0.4} rx={apple.r * 0.15} ry={apple.r * 0.1} fill="#ff4040" opacity="0.15" />
            </g>
          ))}
          {/* A few remaining blossoms (fading) */}
          {[
            { cx: 60, cy: 120, r: 4 },
            { cx: 140, cy: 115, r: 3.5 },
          ].map((b, i) => (
            <g key={`late-blossom-${i}`} transform={`translate(${b.cx}, ${b.cy})`} opacity="0.4">
              {Array.from({ length: 5 }, (_, j) => (
                <ellipse
                  key={`lb-petal-${j}`}
                  cx={0}
                  cy={-b.r * 0.6}
                  rx={b.r * 0.35}
                  ry={b.r * 0.5}
                  fill={`url(#${pfx('aplBlossom')})`}
                  transform={`rotate(${(360 / 5) * j})`}
                />
              ))}
              <circle r={b.r * 0.18} fill="#f0d060" opacity="0.7" />
            </g>
          ))}
        </g>
      )}

      {/* Stage 7: Harvest glow + floating apple blossom petals */}
      {stage >= 7 && (
        <g>
          {/* Golden harvest glow */}
          <circle cx="100" cy="130" r="80" fill={`url(#${pfx('harvestGlow')})`} className="animate-pulse" />
          {/* Floating blossom petals */}
          {[
            { x: 55, y: 90, rot: 15, delay: '0s' },
            { x: 145, y: 80, rot: -25, delay: '1.3s' },
            { x: 40, y: 110, rot: 40, delay: '2.6s' },
            { x: 160, y: 100, rot: -10, delay: '3.5s' },
            { x: 130, y: 70, rot: 30, delay: '0.8s' },
            { x: 70, y: 75, rot: -35, delay: '2.0s' },
          ].map((petal, i) => (
            <g key={`float-petal-${i}`} className="animate-float-away" style={{ animationDelay: petal.delay }}>
              {/* Petal shape */}
              <ellipse
                cx={petal.x} cy={petal.y}
                rx="3" ry="4.5"
                fill="#ffb8c8" opacity="0.65"
                transform={`rotate(${petal.rot} ${petal.x} ${petal.y})`}
              />
              <ellipse
                cx={petal.x} cy={petal.y}
                rx="1.5" ry="2.5"
                fill="#fff0f4" opacity="0.3"
                transform={`rotate(${petal.rot} ${petal.x} ${petal.y})`}
              />
            </g>
          ))}
        </g>
      )}
    </g>
  );
}
