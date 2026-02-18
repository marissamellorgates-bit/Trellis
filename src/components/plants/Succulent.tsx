export const isDesertPlant = true;

export function succulentGradients(pfx: (name: string) => string) {
  return (
    <>
      {/* Leaf gradient — sage green body to pink tip */}
      <linearGradient id={pfx('sucLeaf')} x1="0" y1="0.5" x2="1" y2="0.5">
        <stop offset="0%" stopColor="#5a9a7a" />
        <stop offset="35%" stopColor="#6aaa88" />
        <stop offset="65%" stopColor="#7ab898" />
        <stop offset="85%" stopColor="#a09090" />
        <stop offset="100%" stopColor="#c07888" />
      </linearGradient>

      {/* Inner/center leaf — lighter, younger growth */}
      <linearGradient id={pfx('sucLeafInner')} x1="0" y1="0.5" x2="1" y2="0.5">
        <stop offset="0%" stopColor="#8ac0a0" />
        <stop offset="40%" stopColor="#9acca8" />
        <stop offset="70%" stopColor="#a8c8b0" />
        <stop offset="100%" stopColor="#b8a8a0" />
      </linearGradient>

      {/* Flower radial gradient — coral/orange */}
      <radialGradient id={pfx('sucFlower')} cx="50%" cy="40%" r="55%">
        <stop offset="0%" stopColor="#e07848" />
        <stop offset="50%" stopColor="#d86840" />
        <stop offset="100%" stopColor="#c05838" />
      </radialGradient>

      {/* Flower stalk gradient */}
      <linearGradient id={pfx('sucStalk')} x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="#7a9060" />
        <stop offset="50%" stopColor="#8aa070" />
        <stop offset="100%" stopColor="#6a8050" />
      </linearGradient>

      {/* Cutting / seed leaf gradient */}
      <linearGradient id={pfx('sucCutting')} x1="0.3" y1="0" x2="0.7" y2="1">
        <stop offset="0%" stopColor="#8ac0a0" />
        <stop offset="50%" stopColor="#7ab898" />
        <stop offset="100%" stopColor="#6aaa88" />
      </linearGradient>
    </>
  );
}

/** Render a single succulent leaf as an elongated teardrop/oval */
function renderLeaf(
  index: number,
  angle: number,
  length: number,
  width: number,
  pfx: (name: string) => string,
  isInner: boolean = false,
) {
  const gradId = isInner ? pfx('sucLeafInner') : pfx('sucLeaf');
  // Teardrop leaf: wide at base, narrowing to a rounded point
  const lx = length;
  const wy = width;
  return (
    <g key={`leaf-${index}`} transform={`rotate(${angle})`}>
      {/* Main leaf body */}
      <path
        d={`M 0 0
            C ${-wy * 0.4} ${-lx * 0.15} ${-wy * 0.7} ${-lx * 0.4} ${-wy * 0.5} ${-lx * 0.75}
            C ${-wy * 0.3} ${-lx * 0.92} 0 ${-lx * 1.02} 0 ${-lx}
            C 0 ${-lx * 1.02} ${wy * 0.3} ${-lx * 0.92} ${wy * 0.5} ${-lx * 0.75}
            C ${wy * 0.7} ${-lx * 0.4} ${wy * 0.4} ${-lx * 0.15} 0 0`}
        fill={`url(#${gradId})`}
        stroke="#5a9a7a"
        strokeWidth="0.3"
        opacity={0.92}
      />
      {/* Center vein highlight */}
      <line
        x1="0" y1={-lx * 0.1}
        x2="0" y2={-lx * 0.85}
        stroke="#a0d0b8"
        strokeWidth={width * 0.08}
        opacity="0.25"
        strokeLinecap="round"
      />
      {/* Fleshy highlight on left side */}
      <path
        d={`M ${-wy * 0.1} ${-lx * 0.15}
            C ${-wy * 0.3} ${-lx * 0.3} ${-wy * 0.45} ${-lx * 0.5} ${-wy * 0.3} ${-lx * 0.7}
            C ${-wy * 0.15} ${-lx * 0.55} ${-wy * 0.05} ${-lx * 0.3} ${-wy * 0.1} ${-lx * 0.15}`}
        fill="#a0d8b8"
        opacity="0.15"
      />
    </g>
  );
}

/** Generate a ring of leaves at a given radius/size for the rosette */
function renderRosetteRing(
  leafCount: number,
  baseAngle: number,
  length: number,
  width: number,
  pfx: (name: string) => string,
  isInner: boolean = false,
  startIndex: number = 0,
) {
  return Array.from({ length: leafCount }, (_, i) => {
    const angle = baseAngle + (360 / leafCount) * i;
    return renderLeaf(startIndex + i, angle, length, width, pfx, isInner);
  });
}

export function renderSucculent(stage: number, pfx: (name: string) => string) {
  return (
    <g>
      {/* ── Stage 1: Small cutting/leaf lying on soil ── */}
      {stage >= 1 && (
        <g transform="translate(100, 262)" filter={`url(#${pfx('softShadow')})`}>
          {/* Shadow on soil */}
          <ellipse cx="1" cy="4" rx="6" ry="1.5" fill="#8b6d3f" opacity="0.15" />
          {/* Thick teardrop leaf cutting */}
          <path
            d="M -7 2 C -8 0 -7 -3 -4 -4 C -1 -5 3 -4 5 -2 C 7 0 7 2 5 3 C 3 4 -1 4 -4 3 C -6 2.5 -7 2.5 -7 2"
            fill={`url(#${pfx('sucCutting')})`}
            stroke="#5a9a7a"
            strokeWidth="0.4"
          />
          {/* Highlight on cutting */}
          <ellipse cx="-1" cy="-1" rx="3" ry="1.5" fill="#a0d8b8" opacity="0.2" transform="rotate(-10)" />
          {/* Tiny nub where roots will sprout */}
          <circle cx="-6" cy="2" r="1" fill="#6aaa88" opacity="0.5" />
        </g>
      )}

      {/* ── Stage 2: Tiny roots + first baby leaves ── */}
      {stage >= 2 && (
        <g>
          {/* Roots emerging from cutting base */}
          <g opacity="0.5">
            <path d="M 94 266 C 92 272 89 278 86 284" stroke="#8b6d4a" strokeWidth="0.8" fill="none" strokeLinecap="round" />
            <path d="M 93 268 C 90 273 87 277 83 281" stroke="#8b6d4a" strokeWidth="0.5" fill="none" strokeLinecap="round" />
            <path d="M 95 267 C 94 274 91 280 88 286" stroke="#8b6d4a" strokeWidth="0.6" fill="none" strokeLinecap="round" />
            <path d="M 87 280 C 85 283 83 285 81 286" stroke="#8b6d4a" strokeWidth="0.3" fill="none" strokeLinecap="round" />
          </g>
          {/* First 2-3 tiny baby leaves emerging upward */}
          <g transform="translate(100, 258)" filter={`url(#${pfx('softShadow')})`}>
            {/* Center tiny leaf */}
            <path
              d="M 0 0 C -1.5 -2 -2 -5 -1 -7 C 0 -8.5 1 -8.5 2 -7 C 3 -5 2.5 -2 1 0"
              fill={`url(#${pfx('sucLeafInner')})`}
              stroke="#5a9a7a"
              strokeWidth="0.3"
            />
            {/* Left baby leaf */}
            <path
              d="M -1 0 C -3 -1 -5 -3 -5.5 -5 C -5.5 -6.5 -4.5 -7 -3.5 -6 C -2 -4.5 -1.5 -2 -1 0"
              fill={`url(#${pfx('sucCutting')})`}
              stroke="#5a9a7a"
              strokeWidth="0.25"
            />
            {/* Right baby leaf */}
            <path
              d="M 2 0 C 4 -1 6 -3 6.5 -5 C 6.5 -6.5 5.5 -7 4.5 -6 C 3 -4.5 2.5 -2 2 0"
              fill={`url(#${pfx('sucCutting')})`}
              stroke="#5a9a7a"
              strokeWidth="0.25"
            />
          </g>
        </g>
      )}

      {/* ── Stage 3: Tight compact rosette of 5-6 leaves ── */}
      {stage >= 3 && stage < 5 && (
        <g transform="translate(100, 250)" filter={`url(#${pfx('softShadow')})`}>
          {/* Outer ring: 5 leaves */}
          {renderRosetteRing(5, 0, stage >= 4 ? 18 : 14, stage >= 4 ? 7 : 5.5, pfx, false, 0)}
          {/* Inner ring: 3 small leaves offset */}
          {renderRosetteRing(3, 30, stage >= 4 ? 10 : 8, stage >= 4 ? 4.5 : 3.5, pfx, true, 10)}
          {/* Center bud */}
          <circle cx="0" cy="0" r={stage >= 4 ? 3 : 2.5} fill="#8ac0a0" opacity="0.7" />
          <circle cx="-0.5" cy="-0.5" r={stage >= 4 ? 1.5 : 1} fill="#a0d8b8" opacity="0.3" />
        </g>
      )}

      {/* ── Stage 4: Larger rosette, 8-10 leaves ── (shown via stage 3 block with size scaling) */}
      {stage >= 4 && stage < 5 && (
        <g transform="translate(100, 240)" filter={`url(#${pfx('softShadow')})`}>
          {/* Additional outer ring for stage 4 */}
          {renderRosetteRing(8, 0, 22, 8, pfx, false, 20)}
          {/* Middle ring */}
          {renderRosetteRing(5, 18, 14, 6, pfx, false, 30)}
          {/* Inner ring */}
          {renderRosetteRing(3, 40, 8, 4, pfx, true, 40)}
          {/* Center bud */}
          <circle cx="0" cy="0" r="3.5" fill="#8ac0a0" opacity="0.7" />
          <circle cx="-0.5" cy="-0.5" r="1.8" fill="#a0d8b8" opacity="0.35" />
        </g>
      )}

      {/* ── Stage 5+: Beautiful full rosette, 12-15+ leaves in spiral ── */}
      {stage >= 5 && (
        <g transform="translate(100, 220)" filter={`url(#${pfx('softShadow')})`}>
          {/* Outermost ring — largest, most spread, pink-tipped */}
          {Array.from({ length: 12 }, (_, i) => {
            const angle = (360 / 12) * i + 15;
            return renderLeaf(i, angle, 38, 13, pfx, false);
          })}
          {/* Second ring — medium leaves */}
          {Array.from({ length: 8 }, (_, i) => {
            const angle = (360 / 8) * i + 5;
            return renderLeaf(100 + i, angle, 26, 10, pfx, false);
          })}
          {/* Third ring — smaller, lighter */}
          {Array.from({ length: 6 }, (_, i) => {
            const angle = (360 / 6) * i + 30;
            return renderLeaf(200 + i, angle, 16, 7, pfx, true);
          })}
          {/* Inner ring — tiny, very light */}
          {Array.from({ length: 4 }, (_, i) => {
            const angle = (360 / 4) * i + 45;
            return renderLeaf(300 + i, angle, 9, 5, pfx, true);
          })}
          {/* Center rosette bud */}
          <circle cx="0" cy="0" r="5" fill="#8ac0a0" opacity="0.75" />
          <circle cx="-1" cy="-1" r="2.5" fill="#a0d8b8" opacity="0.35" />
          <circle cx="0" cy="0" r="5" fill="none" stroke="#5a9a7a" strokeWidth="0.3" opacity="0.4" />
        </g>
      )}

      {/* ── Stage 6: Flower stalk + bell-shaped flowers ── */}
      {stage >= 6 && (
        <g>
          {/* Tall thin flower stalk emerging from center of rosette */}
          <g filter={`url(#${pfx('softShadow')})`}>
            {/* Main stalk */}
            <path
              d="M 100 220 C 99 200 98 170 97 140 C 96 120 98 105 100 95"
              stroke={`url(#${pfx('sucStalk')})`}
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            {/* Stalk highlight */}
            <path
              d="M 100 218 C 99 198 98 168 97 138 C 96 118 98 103 100 93"
              stroke="#a0c080"
              strokeWidth="0.8"
              fill="none"
              strokeLinecap="round"
              opacity="0.3"
            />
            {/* Small bracts (tiny leaves) on stalk */}
            <path d="M 99 190 C 95 186 92 184 90 185" stroke="#7a9060" strokeWidth="1" fill="none" strokeLinecap="round" />
            <path d="M 99 160 C 103 156 106 155 107 156" stroke="#7a9060" strokeWidth="0.8" fill="none" strokeLinecap="round" />
            <path d="M 98 130 C 95 127 93 126 92 127" stroke="#7a9060" strokeWidth="0.7" fill="none" strokeLinecap="round" />
          </g>

          {/* Bell-shaped flowers at top of stalk */}
          <g filter={`url(#${pfx('softShadow')})`}>
            {/* Main flower cluster */}
            {[
              { x: 100, y: 90, size: 1, rot: 0 },
              { x: 96, y: 96, size: 0.85, rot: -15 },
              { x: 104, y: 94, size: 0.9, rot: 12 },
              { x: 93, y: 103, size: 0.75, rot: -25 },
              { x: 107, y: 100, size: 0.8, rot: 20 },
              { x: 99, y: 84, size: 0.7, rot: -5 },
              { x: 103, y: 87, size: 0.65, rot: 8 },
            ].map((f, i) => (
              <g key={`flower-${i}`} transform={`translate(${f.x}, ${f.y}) rotate(${f.rot}) scale(${f.size})`}>
                {/* Bell shape */}
                <path
                  d="M -4 0 C -5 -3 -4 -7 -3 -9 C -1 -11 1 -11 3 -9 C 4 -7 5 -3 4 0 C 3 2 -3 2 -4 0"
                  fill={`url(#${pfx('sucFlower')})`}
                />
                {/* Bell rim */}
                <path
                  d="M -4 0 C -3 2 3 2 4 0"
                  stroke="#c05838"
                  strokeWidth="0.5"
                  fill="none"
                  opacity="0.6"
                />
                {/* Inner shadow */}
                <ellipse cx="0" cy="-1" rx="2" ry="3" fill="#b04828" opacity="0.2" />
                {/* Highlight */}
                <ellipse cx="-1" cy="-5" rx="1.2" ry="2" fill="#f0a070" opacity="0.3" />
                {/* Stamen dots */}
                <circle cx="0" cy="1" r="0.6" fill="#ffd040" opacity="0.7" />
                <circle cx="-1.5" cy="0.5" r="0.4" fill="#ffd040" opacity="0.5" />
                <circle cx="1.5" cy="0.5" r="0.4" fill="#ffd040" opacity="0.5" />
              </g>
            ))}
          </g>
        </g>
      )}

      {/* ── Stage 7: Harvest glow + floating particles ── */}
      {stage >= 7 && (
        <g>
          {/* Golden harvest glow around the whole plant */}
          <circle
            cx="100"
            cy="180"
            r="80"
            fill={`url(#${pfx('harvestGlow')})`}
            className="animate-pulse"
          />

          {/* Floating golden particles drifting upward */}
          {[
            { x: 65, y: 140, delay: '0s' },
            { x: 135, y: 135, delay: '0.9s' },
            { x: 80, y: 110, delay: '1.8s' },
            { x: 120, y: 105, delay: '2.7s' },
            { x: 55, y: 160, delay: '3.5s' },
            { x: 145, y: 155, delay: '1.4s' },
            { x: 95, y: 80, delay: '2.2s' },
            { x: 110, y: 75, delay: '3.0s' },
          ].map((s, i) => (
            <g key={`float-${i}`} className="animate-float-away" style={{ animationDelay: s.delay }}>
              {/* Succulent petal / golden mote */}
              <ellipse
                cx={s.x} cy={s.y}
                rx="2" ry="3.5"
                fill="#d4af37"
                opacity="0.5"
                transform={`rotate(${30 * i} ${s.x} ${s.y})`}
              />
              <ellipse
                cx={s.x} cy={s.y}
                rx="1" ry="1.8"
                fill="#f0d060"
                opacity="0.3"
                transform={`rotate(${30 * i} ${s.x} ${s.y})`}
              />
            </g>
          ))}
        </g>
      )}
    </g>
  );
}
