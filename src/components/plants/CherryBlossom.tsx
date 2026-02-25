export function cherryBlossomGradients(pfx: (name: string) => string) {
  return (
    <>
      {/* Trunk gradient — dark warm brown bark */}
      <linearGradient id={pfx('cbTrunk')} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#3a2520" />
        <stop offset="30%" stopColor="#5a3830" />
        <stop offset="50%" stopColor="#6a4438" />
        <stop offset="70%" stopColor="#5a3830" />
        <stop offset="100%" stopColor="#3a2520" />
      </linearGradient>

      {/* Trunk highlight */}
      <linearGradient id={pfx('cbTrunkHi')} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#7a5848" stopOpacity="0" />
        <stop offset="45%" stopColor="#8a6858" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#7a5848" stopOpacity="0" />
      </linearGradient>

      {/* Petal gradient — soft pink */}
      <radialGradient id={pfx('cbPetal')} cx="40%" cy="35%" r="60%">
        <stop offset="0%" stopColor="#fff0f3" />
        <stop offset="35%" stopColor="#ffb7c5" />
        <stop offset="70%" stopColor="#ff99b0" />
        <stop offset="100%" stopColor="#ff69b4" />
      </radialGradient>

      {/* Deep pink petal variant */}
      <radialGradient id={pfx('cbPetalDeep')} cx="45%" cy="40%" r="55%">
        <stop offset="0%" stopColor="#ffc0cb" />
        <stop offset="50%" stopColor="#ff90a8" />
        <stop offset="100%" stopColor="#ff69b4" />
      </radialGradient>

      {/* Light petal highlight */}
      <radialGradient id={pfx('cbPetalLight')} cx="35%" cy="30%" r="50%">
        <stop offset="0%" stopColor="#fff5f7" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#ffb7c5" stopOpacity="0" />
      </radialGradient>

      {/* Blossom cloud — overall canopy fill */}
      <radialGradient id={pfx('cbCloud')} cx="50%" cy="48%" r="55%">
        <stop offset="0%" stopColor="#ffc0cb" stopOpacity="0.9" />
        <stop offset="40%" stopColor="#ffb0be" stopOpacity="0.75" />
        <stop offset="70%" stopColor="#ff99b0" stopOpacity="0.55" />
        <stop offset="100%" stopColor="#ff80a0" stopOpacity="0.3" />
      </radialGradient>

      {/* Leaf gradient */}
      <linearGradient id={pfx('cbLeaf')} x1="0" y1="0" x2="0.8" y2="1">
        <stop offset="0%" stopColor="#6a9a44" />
        <stop offset="100%" stopColor="#4a7a2c" />
      </linearGradient>

      {/* Seed gradient — dark reddish-brown */}
      <radialGradient id={pfx('cbSeed')} cx="40%" cy="35%" r="60%">
        <stop offset="0%" stopColor="#6a3028" />
        <stop offset="50%" stopColor="#4a2018" />
        <stop offset="100%" stopColor="#3a1810" />
      </radialGradient>

      {/* Bud gradient — tight pink */}
      <radialGradient id={pfx('cbBud')} cx="40%" cy="30%" r="55%">
        <stop offset="0%" stopColor="#ffb7c5" />
        <stop offset="60%" stopColor="#ff90a8" />
        <stop offset="100%" stopColor="#e06888" />
      </radialGradient>
    </>
  );
}

/** Renders a single 5-petal cherry blossom flower at the origin */
function blossomFlower(
  pfx: (name: string) => string,
  r: number,
  variant: 'light' | 'deep' = 'light',
  opacity = 0.9
) {
  const grad = variant === 'light' ? pfx('cbPetal') : pfx('cbPetalDeep');
  return (
    <g opacity={opacity}>
      {/* 5 petals arranged radially */}
      {Array.from({ length: 5 }, (_, j) => {
        const angle = (360 / 5) * j - 90;
        return (
          <ellipse
            key={`p-${j}`}
            cx={0}
            cy={-r * 0.6}
            rx={r * 0.42}
            ry={r * 0.58}
            fill={`url(#${grad})`}
            transform={`rotate(${angle})`}
          />
        );
      })}
      {/* Petal highlight overlay */}
      {Array.from({ length: 5 }, (_, j) => {
        const angle = (360 / 5) * j - 90;
        return (
          <ellipse
            key={`ph-${j}`}
            cx={0}
            cy={-r * 0.55}
            rx={r * 0.2}
            ry={r * 0.3}
            fill={`url(#${pfx('cbPetalLight')})`}
            transform={`rotate(${angle})`}
            opacity="0.4"
          />
        );
      })}
      {/* Petal notch (the slight indentation at tip of each petal) */}
      {Array.from({ length: 5 }, (_, j) => {
        const angle = (360 / 5) * j - 90;
        const rad = (angle * Math.PI) / 180;
        const tipX = Math.cos(rad) * r * 0.95;
        const tipY = Math.sin(rad) * r * 0.95;
        return (
          <line
            key={`pn-${j}`}
            x1={tipX}
            y1={tipY}
            x2={tipX + Math.cos(rad) * r * 0.08}
            y2={tipY + Math.sin(rad) * r * 0.08}
            stroke="#ff90a8"
            strokeWidth="0.4"
            opacity="0.5"
          />
        );
      })}
      {/* Stamen cluster center */}
      <circle r={r * 0.2} fill="#f5d060" opacity="0.9" />
      <circle r={r * 0.12} fill="#e8b030" opacity="0.7" />
      {/* Tiny stamen dots */}
      {Array.from({ length: 5 }, (_, j) => {
        const a = ((360 / 5) * j * Math.PI) / 180;
        return (
          <circle
            key={`st-${j}`}
            cx={Math.cos(a) * r * 0.28}
            cy={Math.sin(a) * r * 0.28}
            r={r * 0.05}
            fill="#d4a030"
            opacity="0.6"
          />
        );
      })}
    </g>
  );
}

export function renderCherryBlossom(stage: number, pfx: (name: string) => string) {
  return (
    <g>
      {/* ── Stage 1: Cherry pit on soil ── */}
      {stage >= 1 && (
        <g transform="translate(100, 262)" filter={`url(#${pfx('softShadow')})`}>
          {/* Pit shadow */}
          <ellipse cx="1" cy="6" rx="7" ry="2" fill="#3a2518" opacity="0.15" />
          {/* Cherry pit body — round with ridged surface */}
          <ellipse cx="0" cy="1" rx="5" ry="5.5" fill={`url(#${pfx('cbSeed')})`} />
          {/* Pit ridge line (vertical) */}
          <path d="M 0 -4.5 C 0.5 -2 0.5 3 0 5.5" stroke="#5a3020" strokeWidth="0.7" fill="none" opacity="0.5" />
          {/* Secondary ridges */}
          <path d="M -2 -4 C -1.5 -1 -1.5 3 -2 5" stroke="#5a3020" strokeWidth="0.35" fill="none" opacity="0.3" />
          <path d="M 2 -4 C 1.5 -1 1.5 3 2 5" stroke="#5a3020" strokeWidth="0.35" fill="none" opacity="0.3" />
          {/* Pit highlight */}
          <ellipse cx="-1.5" cy="-1" rx="1.8" ry="2.5" fill="#7a4038" opacity="0.25" />
          {/* Pit top dimple */}
          <ellipse cx="0" cy="-4.5" rx="1.5" ry="0.8" fill="#3a1810" opacity="0.3" />
        </g>
      )}

      {/* ── Stage 2: Thin sapling with 2-3 small branches + tiny leaves ── */}
      {stage >= 2 && (
        <g>
          {/* Underground roots */}
          <g opacity="0.5">
            <path d="M 100 266 C 97 274 94 282 90 290" stroke="#8b6d4a" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <path d="M 100 266 C 103 275 108 283 114 291" stroke="#8b6d4a" strokeWidth="1" fill="none" strokeLinecap="round" />
            <path d="M 100 270 C 95 276 89 280 84 284" stroke="#8b6d4a" strokeWidth="0.6" fill="none" strokeLinecap="round" />
          </g>

          {/* Thin sapling trunk */}
          <g filter={`url(#${pfx('softShadow')})`}>
            <path
              d={`M 100 262 C 100 254 99.5 246 100 ${stage >= 4 ? 155 : stage >= 3 ? 185 : 235}`}
              stroke={`url(#${pfx('cbTrunk')})`}
              strokeWidth={stage >= 4 ? 5 : stage >= 3 ? 3.5 : 2}
              fill="none"
              strokeLinecap="round"
            />
            <path
              d={`M 100 258 C 100 252 99.5 244 100 ${stage >= 4 ? 158 : stage >= 3 ? 188 : 238}`}
              stroke={`url(#${pfx('cbTrunkHi')})`}
              strokeWidth={stage >= 4 ? 2 : stage >= 3 ? 1.2 : 0.7}
              fill="none"
              strokeLinecap="round"
            />
          </g>

          {/* Stage 2 only: small branches + tiny leaves */}
          {stage === 2 && (
            <g filter={`url(#${pfx('softShadow')})`}>
              {/* Left branch */}
              <path d="M 100 244 C 96 240 91 238 87 237" stroke="#5a3830" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              {/* Left leaf */}
              <path d="M 87 237 C 84 234 82 231 83 229 C 84 228 86 229 87 231 C 88 233 87 236 87 237" fill={`url(#${pfx('cbLeaf')})`} opacity="0.8" />
              <path d="M 87 237 C 85 233 83 230 83 229" stroke="#3a6020" strokeWidth="0.3" fill="none" opacity="0.5" />

              {/* Right branch */}
              <path d="M 100 240 C 104 237 109 235 113 234" stroke="#5a3830" strokeWidth="1" fill="none" strokeLinecap="round" />
              {/* Right leaf */}
              <path d="M 113 234 C 115 231 117 228 116 226 C 115 225 113 226 112 228 C 111 230 112 233 113 234" fill={`url(#${pfx('cbLeaf')})`} opacity="0.75" />

              {/* Top tiny leaf */}
              <path d="M 100 236 C 98 233 97 230 98 228 C 99 227 101 228 101 230 C 101 232 100 234 100 236" fill="#5a8a3c" opacity="0.7" />
            </g>
          )}
        </g>
      )}

      {/* ── Stage 3: Graceful curving trunk, multiple branches, small green leaves ── */}
      {stage >= 3 && stage < 4 && (
        <g>
          {/* Graceful branches spreading outward */}
          <g filter={`url(#${pfx('softShadow')})`}>
            {/* Left sweeping branch */}
            <path d="M 100 210 C 94 205 85 200 76 197" stroke={`url(#${pfx('cbTrunk')})`} strokeWidth="2.2" fill="none" strokeLinecap="round" />
            <path d="M 76 197 C 72 195 67 194 63 194" stroke={`url(#${pfx('cbTrunk')})`} strokeWidth="1.2" fill="none" strokeLinecap="round" />
            {/* Right sweeping branch */}
            <path d="M 100 205 C 107 200 116 196 124 194" stroke={`url(#${pfx('cbTrunk')})`} strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M 124 194 C 129 193 134 192 138 192" stroke={`url(#${pfx('cbTrunk')})`} strokeWidth="1" fill="none" strokeLinecap="round" />
            {/* Upper left */}
            <path d="M 100 200 C 95 195 88 192 82 190" stroke={`url(#${pfx('cbTrunk')})`} strokeWidth="1.5" fill="none" strokeLinecap="round" />
            {/* Upper right */}
            <path d="M 100 195 C 106 191 113 188 119 187" stroke={`url(#${pfx('cbTrunk')})`} strokeWidth="1.3" fill="none" strokeLinecap="round" />
            {/* Top */}
            <path d="M 100 190 C 100 186 100 183 100 180" stroke={`url(#${pfx('cbTrunk')})`} strokeWidth="1" fill="none" strokeLinecap="round" />
          </g>

          {/* Small green leaves scattered on branches */}
          <g filter={`url(#${pfx('softShadow')})`}>
            {[
              { x: 63, y: 192, rot: -30 },
              { x: 76, y: 195, rot: -15 },
              { x: 82, y: 188, rot: -25 },
              { x: 138, y: 190, rot: 25 },
              { x: 124, y: 192, rot: 10 },
              { x: 119, y: 185, rot: 20 },
              { x: 100, y: 178, rot: 0 },
              { x: 90, y: 192, rot: -8 },
              { x: 112, y: 190, rot: 12 },
            ].map((l, i) => (
              <g key={`s3leaf-${i}`} transform={`translate(${l.x}, ${l.y}) rotate(${l.rot})`}>
                <path
                  d="M 0 0 C -2 -2 -4 -5 -3 -7 C -2 -8 0 -7 1 -5 C 2 -3 1 -1 0 0"
                  fill={i % 2 === 0 ? '#5a8a3c' : '#4a7a2c'}
                  opacity="0.8"
                />
                <path d="M 0 0 C -1 -3 -2 -5 -3 -7" stroke="#3a6020" strokeWidth="0.3" fill="none" opacity="0.4" />
              </g>
            ))}
          </g>
        </g>
      )}

      {/* ── Stage 4: Branches covered in tight pink buds ── */}
      {stage >= 4 && (
        <g>
          {/* Bark texture on thicker trunk */}
          <g opacity="0.2">
            <path d="M 98 240 C 98.5 230 99 220 98.5 210" stroke="#2a1510" strokeWidth="0.4" fill="none" />
            <path d="M 101 235 C 101.5 225 102 215 101.5 205" stroke="#2a1510" strokeWidth="0.3" fill="none" />
            <path d="M 99 210 C 99.5 200 100 190 99.5 180" stroke="#2a1510" strokeWidth="0.3" fill="none" />
          </g>

          {/* Major graceful branches */}
          <g filter={`url(#${pfx('softShadow')})`}>
            {/* Left sweeping branch — graceful curve */}
            <path d="M 100 190 C 92 182 78 172 64 166" stroke={`url(#${pfx('cbTrunk')})`} strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 64 166 C 56 162 48 160 42 160" stroke={`url(#${pfx('cbTrunk')})`} strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <path d="M 56 163 C 52 158 48 154 44 152" stroke={`url(#${pfx('cbTrunk')})`} strokeWidth="1" fill="none" strokeLinecap="round" />

            {/* Right sweeping branch */}
            <path d="M 100 185 C 110 177 124 170 138 165" stroke={`url(#${pfx('cbTrunk')})`} strokeWidth="2.8" fill="none" strokeLinecap="round" />
            <path d="M 138 165 C 146 162 152 160 158 160" stroke={`url(#${pfx('cbTrunk')})`} strokeWidth="1.6" fill="none" strokeLinecap="round" />
            <path d="M 146 163 C 150 158 154 155 158 153" stroke={`url(#${pfx('cbTrunk')})`} strokeWidth="1" fill="none" strokeLinecap="round" />

            {/* Upper left branch */}
            <path d="M 100 175 C 92 168 82 162 72 158" stroke={`url(#${pfx('cbTrunk')})`} strokeWidth="2.2" fill="none" strokeLinecap="round" />
            <path d="M 72 158 C 66 155 60 154 56 154" stroke={`url(#${pfx('cbTrunk')})`} strokeWidth="1.2" fill="none" strokeLinecap="round" />

            {/* Upper right branch */}
            <path d="M 100 170 C 108 164 118 158 128 155" stroke={`url(#${pfx('cbTrunk')})`} strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M 128 155 C 134 153 140 152 144 152" stroke={`url(#${pfx('cbTrunk')})`} strokeWidth="1" fill="none" strokeLinecap="round" />

            {/* Top branches */}
            <path d="M 100 165 C 96 158 90 152 84 148" stroke={`url(#${pfx('cbTrunk')})`} strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M 100 162 C 104 156 110 150 116 147" stroke={`url(#${pfx('cbTrunk')})`} strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M 100 158 C 100 152 100 148 100 142" stroke={`url(#${pfx('cbTrunk')})`} strokeWidth="1.2" fill="none" strokeLinecap="round" />
          </g>

          {/* Stage 4 only: tight pink buds in clusters */}
          {stage === 4 && (
            <g>
              {[
                // Branch tip clusters
                { x: 42, y: 159 }, { x: 44, y: 151 },
                { x: 56, y: 153 }, { x: 64, y: 165 },
                { x: 72, y: 157 }, { x: 84, y: 147 },
                { x: 100, y: 141 },
                { x: 116, y: 146 }, { x: 128, y: 154 },
                { x: 144, y: 151 }, { x: 138, y: 164 },
                { x: 158, y: 159 }, { x: 158, y: 152 },
                // Along branches
                { x: 78, y: 170 }, { x: 86, y: 164 },
                { x: 114, y: 162 }, { x: 122, y: 168 },
                { x: 94, y: 156 }, { x: 106, y: 154 },
                { x: 52, y: 162 }, { x: 148, y: 161 },
                { x: 68, y: 160 }, { x: 134, y: 158 },
              ].map((b, i) => (
                <g key={`bud-${i}`} transform={`translate(${b.x}, ${b.y})`}>
                  {/* Cluster of 3-5 buds per location */}
                  <ellipse cx="0" cy="0" rx="2" ry="3" fill={`url(#${pfx('cbBud')})`} opacity="0.85" />
                  <ellipse cx="-2.5" cy="1" rx="1.5" ry="2.5" fill={`url(#${pfx('cbBud')})`} opacity="0.75" />
                  <ellipse cx="2.5" cy="0.5" rx="1.5" ry="2.3" fill={`url(#${pfx('cbBud')})`} opacity="0.7" />
                  {i % 2 === 0 && (
                    <>
                      <ellipse cx="-1" cy="-2.5" rx="1.3" ry="2" fill={`url(#${pfx('cbBud')})`} opacity="0.65" />
                      <ellipse cx="1.5" cy="-2" rx="1.2" ry="1.8" fill={`url(#${pfx('cbBud')})`} opacity="0.6" />
                    </>
                  )}
                  {/* Tiny calyx (green base of bud) */}
                  <ellipse cx="0" cy="2.5" rx="1.5" ry="0.8" fill="#5a8a3c" opacity="0.5" />
                </g>
              ))}
            </g>
          )}
        </g>
      )}

      {/* ── Stage 5: Explosion of pink blossoms! ── */}
      {stage === 5 && (
        <g>
          {/* Individual open blossoms — distinct flowers, no blurry clouds */}
          <g>
            {[
              // Outer ring of flowers
              { cx: 42, cy: 160, r: 7, v: 'light' as const },
              { cx: 52, cy: 153, r: 7.5, v: 'deep' as const },
              { cx: 48, cy: 167, r: 6, v: 'light' as const },
              { cx: 38, cy: 155, r: 6.5, v: 'deep' as const },
              { cx: 158, cy: 160, r: 6.5, v: 'deep' as const },
              { cx: 150, cy: 152, r: 7, v: 'light' as const },
              { cx: 155, cy: 167, r: 6, v: 'light' as const },
              { cx: 162, cy: 154, r: 6, v: 'light' as const },
              // Mid ring
              { cx: 64, cy: 155, r: 8, v: 'light' as const },
              { cx: 60, cy: 145, r: 7.5, v: 'deep' as const },
              { cx: 72, cy: 149, r: 8, v: 'light' as const },
              { cx: 56, cy: 160, r: 7, v: 'deep' as const },
              { cx: 138, cy: 154, r: 8, v: 'deep' as const },
              { cx: 142, cy: 145, r: 7.5, v: 'light' as const },
              { cx: 130, cy: 149, r: 8, v: 'light' as const },
              { cx: 146, cy: 160, r: 7, v: 'light' as const },
              // Inner blossoms
              { cx: 84, cy: 147, r: 9, v: 'light' as const },
              { cx: 88, cy: 138, r: 7.5, v: 'deep' as const },
              { cx: 76, cy: 143, r: 7, v: 'deep' as const },
              { cx: 116, cy: 146, r: 9, v: 'deep' as const },
              { cx: 112, cy: 137, r: 7.5, v: 'light' as const },
              { cx: 124, cy: 142, r: 7, v: 'light' as const },
              { cx: 100, cy: 141, r: 9.5, v: 'light' as const },
              { cx: 100, cy: 132, r: 8, v: 'deep' as const },
              { cx: 94, cy: 143, r: 7, v: 'deep' as const },
              { cx: 106, cy: 143, r: 7, v: 'light' as const },
              // Top crown
              { cx: 92, cy: 131, r: 7, v: 'light' as const },
              { cx: 108, cy: 132, r: 7, v: 'deep' as const },
              { cx: 100, cy: 126, r: 6.5, v: 'light' as const },
              { cx: 84, cy: 135, r: 6.5, v: 'deep' as const },
              { cx: 116, cy: 134, r: 6.5, v: 'light' as const },
              // Lower fringe
              { cx: 78, cy: 162, r: 7, v: 'deep' as const },
              { cx: 90, cy: 158, r: 7.5, v: 'light' as const },
              { cx: 110, cy: 157, r: 7.5, v: 'light' as const },
              { cx: 122, cy: 162, r: 7, v: 'deep' as const },
              { cx: 100, cy: 155, r: 7, v: 'deep' as const },
              // Fill gaps
              { cx: 68, cy: 163, r: 6.5, v: 'light' as const },
              { cx: 134, cy: 163, r: 6.5, v: 'deep' as const },
              { cx: 96, cy: 150, r: 7, v: 'deep' as const },
              { cx: 104, cy: 148, r: 7, v: 'light' as const },
              { cx: 68, cy: 142, r: 6.5, v: 'light' as const },
              { cx: 134, cy: 141, r: 6.5, v: 'deep' as const },
            ].map((f, i) => (
              <g key={`s5blossom-${i}`} transform={`translate(${f.cx}, ${f.cy}) rotate(${i * 37 % 360})`}>
                {blossomFlower(pfx, f.r, f.v)}
              </g>
            ))}
          </g>

          {/* Some remaining buds mixed in */}
          {[
            { x: 44, y: 155 }, { x: 56, y: 148 },
            { x: 146, y: 152 }, { x: 155, y: 158 },
            { x: 80, y: 136 }, { x: 120, y: 137 },
          ].map((b, i) => (
            <g key={`s5bud-${i}`} transform={`translate(${b.x}, ${b.y})`}>
              <ellipse cx="0" cy="0" rx="1.8" ry="2.8" fill={`url(#${pfx('cbBud')})`} opacity="0.7" />
              <ellipse cx="1.5" cy="0.5" rx="1.3" ry="2.2" fill={`url(#${pfx('cbBud')})`} opacity="0.6" />
            </g>
          ))}
        </g>
      )}

      {/* ── Stage 6: Peak bloom — maximum blossoms + falling petals ── */}
      {stage === 6 && (
        <g>
          {/* Densely packed blossoms — no blurry clouds, just flowers */}
          <g>
            {[
              // Outer crown — maximum spread
              { cx: 38, cy: 162, r: 7, v: 'light' as const },
              { cx: 44, cy: 154, r: 7.5, v: 'deep' as const },
              { cx: 48, cy: 165, r: 6, v: 'light' as const },
              { cx: 50, cy: 146, r: 7, v: 'light' as const },
              { cx: 162, cy: 162, r: 6.5, v: 'deep' as const },
              { cx: 156, cy: 154, r: 7.5, v: 'light' as const },
              { cx: 153, cy: 165, r: 6, v: 'deep' as const },
              { cx: 152, cy: 146, r: 7, v: 'deep' as const },
              // Mid layer
              { cx: 58, cy: 156, r: 8, v: 'deep' as const },
              { cx: 56, cy: 144, r: 7.5, v: 'light' as const },
              { cx: 64, cy: 149, r: 8, v: 'light' as const },
              { cx: 62, cy: 163, r: 7, v: 'deep' as const },
              { cx: 142, cy: 155, r: 8, v: 'light' as const },
              { cx: 144, cy: 144, r: 7, v: 'deep' as const },
              { cx: 136, cy: 149, r: 8, v: 'deep' as const },
              { cx: 140, cy: 164, r: 7, v: 'light' as const },
              // Inner dense cluster
              { cx: 74, cy: 151, r: 8.5, v: 'light' as const },
              { cx: 78, cy: 141, r: 8, v: 'deep' as const },
              { cx: 82, cy: 156, r: 7.5, v: 'light' as const },
              { cx: 86, cy: 145, r: 9, v: 'light' as const },
              { cx: 126, cy: 151, r: 8.5, v: 'deep' as const },
              { cx: 122, cy: 142, r: 8, v: 'light' as const },
              { cx: 118, cy: 156, r: 7.5, v: 'deep' as const },
              { cx: 114, cy: 145, r: 9, v: 'deep' as const },
              // Center blooms — largest
              { cx: 94, cy: 147, r: 9, v: 'deep' as const },
              { cx: 100, cy: 143, r: 9.5, v: 'light' as const },
              { cx: 106, cy: 147, r: 9, v: 'light' as const },
              { cx: 100, cy: 134, r: 8, v: 'deep' as const },
              { cx: 92, cy: 137, r: 7.5, v: 'light' as const },
              { cx: 108, cy: 137, r: 7.5, v: 'deep' as const },
              // Top crown
              { cx: 88, cy: 131, r: 7, v: 'deep' as const },
              { cx: 100, cy: 126, r: 8, v: 'light' as const },
              { cx: 112, cy: 131, r: 7, v: 'light' as const },
              { cx: 96, cy: 124, r: 6, v: 'deep' as const },
              { cx: 104, cy: 124, r: 6, v: 'light' as const },
              // Lower fringe flowers
              { cx: 70, cy: 165, r: 7, v: 'light' as const },
              { cx: 82, cy: 163, r: 7.5, v: 'deep' as const },
              { cx: 92, cy: 160, r: 7, v: 'light' as const },
              { cx: 108, cy: 159, r: 7, v: 'deep' as const },
              { cx: 118, cy: 163, r: 7.5, v: 'light' as const },
              { cx: 130, cy: 165, r: 7, v: 'deep' as const },
            ].map((f, i) => (
              <g key={`s6blossom-${i}`} transform={`translate(${f.cx}, ${f.cy}) rotate(${(i * 43 + 15) % 360})`}>
                {blossomFlower(pfx, f.r, f.v, 0.92)}
              </g>
            ))}
          </g>

          {/* Loose petals starting to fall */}
          {[
            { x: 145, y: 180, rot: 25 },
            { x: 58, y: 185, rot: -40 },
            { x: 130, y: 195, rot: 50 },
            { x: 72, y: 200, rot: -20 },
            { x: 110, y: 210, rot: 35 },
            { x: 85, y: 215, rot: -55 },
            { x: 150, y: 205, rot: 15 },
            { x: 50, y: 210, rot: -30 },
          ].map((p, i) => (
            <g key={`loose-petal-${i}`} transform={`translate(${p.x}, ${p.y}) rotate(${p.rot})`} opacity={0.5 + (i % 3) * 0.1}>
              <ellipse cx="0" cy="0" rx="2.5" ry="3.5" fill={i % 2 === 0 ? '#ffb7c5' : '#ffc0cb'} />
              <ellipse cx="-0.5" cy="-0.5" rx="1" ry="1.5" fill="#fff0f3" opacity="0.4" />
            </g>
          ))}
        </g>
      )}

      {/* ── Stage 7: Harvest — golden glow + famous petal shower ── */}
      {stage >= 7 && (
        <g>
          {/* Remaining blossoms on tree — thinning out but still visible */}
          <g>
            {[
              { cx: 58, cy: 155, r: 7.5, v: 'light' as const },
              { cx: 74, cy: 150, r: 8, v: 'deep' as const },
              { cx: 86, cy: 145, r: 8.5, v: 'light' as const },
              { cx: 100, cy: 141, r: 9, v: 'light' as const },
              { cx: 114, cy: 145, r: 8.5, v: 'deep' as const },
              { cx: 126, cy: 150, r: 8, v: 'light' as const },
              { cx: 142, cy: 155, r: 7.5, v: 'deep' as const },
              { cx: 100, cy: 131, r: 7.5, v: 'deep' as const },
              { cx: 88, cy: 135, r: 7, v: 'light' as const },
              { cx: 112, cy: 135, r: 7, v: 'deep' as const },
              { cx: 66, cy: 161, r: 7, v: 'deep' as const },
              { cx: 134, cy: 159, r: 7, v: 'light' as const },
              { cx: 48, cy: 163, r: 6.5, v: 'light' as const },
              { cx: 152, cy: 161, r: 6.5, v: 'deep' as const },
              { cx: 80, cy: 157, r: 7, v: 'deep' as const },
              { cx: 120, cy: 156, r: 7, v: 'light' as const },
            ].map((f, i) => (
              <g key={`s7blossom-${i}`} transform={`translate(${f.cx}, ${f.cy}) rotate(${i * 47 % 360})`}>
                {blossomFlower(pfx, f.r, f.v, 0.8)}
              </g>
            ))}
          </g>

          {/* Golden harvest glow */}
          <circle cx="100" cy="148" r="80" fill={`url(#${pfx('harvestGlow')})`} className="animate-pulse" />

          {/* Famous petal shower — floating pink petals with animate-float-away */}
          {[
            { x: 40, y: 120, rot: 30, delay: '0s' },
            { x: 160, y: 115, rot: -25, delay: '0.7s' },
            { x: 55, y: 100, rot: 45, delay: '1.4s' },
            { x: 148, y: 95, rot: -40, delay: '2.1s' },
            { x: 75, y: 85, rot: 20, delay: '2.8s' },
            { x: 130, y: 80, rot: -15, delay: '3.5s' },
            { x: 100, y: 75, rot: 10, delay: '1.0s' },
            { x: 45, y: 140, rot: -50, delay: '0.4s' },
            { x: 155, y: 135, rot: 35, delay: '1.8s' },
            { x: 68, y: 110, rot: -20, delay: '2.5s' },
            { x: 135, y: 105, rot: 55, delay: '3.2s' },
            { x: 90, y: 90, rot: -35, delay: '0.9s' },
            { x: 115, y: 88, rot: 42, delay: '1.6s' },
            { x: 50, y: 130, rot: 15, delay: '2.3s' },
            { x: 150, y: 125, rot: -45, delay: '3.0s' },
          ].map((petal, i) => (
            <g key={`float-petal-${i}`} className="animate-float-away" style={{ animationDelay: petal.delay }}>
              <g transform={`translate(${petal.x}, ${petal.y}) rotate(${petal.rot})`}>
                {/* Individual petal shape */}
                <ellipse cx="0" cy="0" rx="2.8" ry="4" fill={i % 3 === 0 ? '#ffb7c5' : i % 3 === 1 ? '#ffc0cb' : '#ff99b0'} opacity="0.65" />
                <ellipse cx="-0.5" cy="-0.8" rx="1.2" ry="2" fill="#fff0f3" opacity="0.35" />
              </g>
            </g>
          ))}
        </g>
      )}
    </g>
  );
}
