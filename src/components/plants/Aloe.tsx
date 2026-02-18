export function aloeGradients(pfx: (name: string) => string) {
  return (
    <>
      {/* Leaf body gradient — medium green with depth */}
      <linearGradient id={pfx('aloeLeaf')} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#2d6830" />
        <stop offset="15%" stopColor="#357838" />
        <stop offset="35%" stopColor="#3d8040" />
        <stop offset="50%" stopColor="#4a9048" />
        <stop offset="65%" stopColor="#5aa858" />
        <stop offset="80%" stopColor="#4a9048" />
        <stop offset="100%" stopColor="#2d6830" />
      </linearGradient>

      {/* Leaf highlight for surface sheen */}
      <linearGradient id={pfx('aloeLeafHi')} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#70c070" stopOpacity="0" />
        <stop offset="30%" stopColor="#8ac8a0" stopOpacity="0.2" />
        <stop offset="50%" stopColor="#9ad8a8" stopOpacity="0.3" />
        <stop offset="70%" stopColor="#8ac8a0" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#70c070" stopOpacity="0" />
      </linearGradient>

      {/* Flower spike gradient — orange-red */}
      <linearGradient id={pfx('aloeFlower')} x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="#c85020" />
        <stop offset="30%" stopColor="#d85828" />
        <stop offset="60%" stopColor="#e06830" />
        <stop offset="100%" stopColor="#e87838" />
      </linearGradient>

      {/* Leaf spot gradient — pale green spots */}
      <radialGradient id={pfx('aloeSpot')} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#8ac8a0" stopOpacity="0.6" />
        <stop offset="70%" stopColor="#8ac8a0" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#8ac8a0" stopOpacity="0" />
      </radialGradient>

      {/* Seed gradient */}
      <linearGradient id={pfx('aloeSeedGrad')} x1="0.3" y1="0" x2="0.7" y2="1">
        <stop offset="0%" stopColor="#a08860" />
        <stop offset="50%" stopColor="#8b7050" />
        <stop offset="100%" stopColor="#6b5535" />
      </linearGradient>

      {/* Flower stalk gradient */}
      <linearGradient id={pfx('aloeStalk')} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#4a7830" />
        <stop offset="30%" stopColor="#5a8840" />
        <stop offset="50%" stopColor="#6a8848" />
        <stop offset="70%" stopColor="#5a8840" />
        <stop offset="100%" stopColor="#4a7830" />
      </linearGradient>
    </>
  );
}

/**
 * Render a single aloe leaf — a thick, pointed teardrop with serrated edges and pale spots.
 * The leaf originates at (0,0) and extends upward/outward.
 */
function aloeLeaf(
  length: number,
  baseWidth: number,
  rotation: number,
  pfx: (name: string) => string,
  showSpots: boolean = false,
  showSerrations: boolean = false,
  key: string,
) {
  // Leaf is drawn pointing upward from origin, then rotated
  const tipY = -length;
  const midY = -length * 0.5;
  const hw = baseWidth / 2; // half width at base

  // Serration teeth along edges
  const serrations = showSerrations
    ? Array.from({ length: Math.floor(length / 8) }, (_, i) => {
        const t = (i + 1) / (Math.floor(length / 8) + 1);
        const y = -length * t;
        const widthAtPoint = hw * (1 - t * 0.85);
        return { y, w: widthAtPoint };
      })
    : [];

  // Spots along the leaf face
  const spots = showSpots
    ? Array.from({ length: Math.floor(length / 15) + 1 }, (_, i) => {
        const t = 0.2 + (i * 0.55) / Math.max(1, Math.floor(length / 15));
        const y = -length * t;
        const offset = ((i % 3) - 1) * (hw * 0.3 * (1 - t));
        return { cx: offset, cy: y, r: 1.2 + (1 - t) * 0.8 };
      })
    : [];

  return (
    <g key={key} transform={`rotate(${rotation})`}>
      {/* Leaf body — thick pointed teardrop */}
      <path
        d={`M 0 0
            C ${-hw} ${-length * 0.05} ${-hw * 1.05} ${midY * 0.6} ${-hw * 0.9} ${midY}
            C ${-hw * 0.7} ${midY + tipY * 0.15} ${-hw * 0.3} ${tipY * 0.85} 0 ${tipY}
            C ${hw * 0.3} ${tipY * 0.85} ${hw * 0.7} ${midY + tipY * 0.15} ${hw * 0.9} ${midY}
            C ${hw * 1.05} ${midY * 0.6} ${hw} ${-length * 0.05} 0 0`}
        fill={`url(#${pfx('aloeLeaf')})`}
      />
      {/* Highlight overlay */}
      <path
        d={`M 0 ${-length * 0.05}
            C ${-hw * 0.5} ${-length * 0.08} ${-hw * 0.55} ${midY * 0.7} ${-hw * 0.45} ${midY}
            C ${-hw * 0.35} ${midY + tipY * 0.12} ${-hw * 0.15} ${tipY * 0.88} 0 ${tipY * 0.95}
            C ${hw * 0.15} ${tipY * 0.88} ${hw * 0.35} ${midY + tipY * 0.12} ${hw * 0.45} ${midY}
            C ${hw * 0.55} ${midY * 0.7} ${hw * 0.5} ${-length * 0.08} 0 ${-length * 0.05}`}
        fill={`url(#${pfx('aloeLeafHi')})`}
      />
      {/* Central vein — subtle lighter line */}
      <path
        d={`M 0 ${-length * 0.05} C 0 ${midY * 0.8} 0 ${tipY * 0.6} 0 ${tipY * 0.92}`}
        stroke="#8ac8a0"
        strokeWidth="0.5"
        fill="none"
        opacity="0.25"
      />
      {/* Leaf edge outline */}
      <path
        d={`M 0 0
            C ${-hw} ${-length * 0.05} ${-hw * 1.05} ${midY * 0.6} ${-hw * 0.9} ${midY}
            C ${-hw * 0.7} ${midY + tipY * 0.15} ${-hw * 0.3} ${tipY * 0.85} 0 ${tipY}
            C ${hw * 0.3} ${tipY * 0.85} ${hw * 0.7} ${midY + tipY * 0.15} ${hw * 0.9} ${midY}
            C ${hw * 1.05} ${midY * 0.6} ${hw} ${-length * 0.05} 0 0`}
        fill="none"
        stroke="#2d6830"
        strokeWidth="0.4"
        opacity="0.3"
      />
      {/* Spots / pale markings */}
      {spots.map((s, i) => (
        <ellipse
          key={`spot-${i}`}
          cx={s.cx}
          cy={s.cy}
          rx={s.r}
          ry={s.r * 0.7}
          fill={`url(#${pfx('aloeSpot')})`}
          opacity="0.7"
        />
      ))}
      {/* Serrated edge teeth — tiny triangles along both edges */}
      {serrations.map((s, i) => (
        <g key={`serr-${i}`}>
          {/* Left edge tooth */}
          <polygon
            points={`${-s.w * 1.05},${s.y} ${-s.w * 1.2},${s.y - 1.2} ${-s.w * 0.95},${s.y - 0.8}`}
            fill="#4a9048"
            opacity="0.5"
          />
          {/* Right edge tooth */}
          <polygon
            points={`${s.w * 1.05},${s.y} ${s.w * 1.2},${s.y - 1.2} ${s.w * 0.95},${s.y - 0.8}`}
            fill="#4a9048"
            opacity="0.5"
          />
        </g>
      ))}
      {/* Leaf tip — slightly paler/pointed */}
      <circle cx="0" cy={tipY} r="0.8" fill="#5aa858" opacity="0.6" />
    </g>
  );
}

export function renderAloe(stage: number, pfx: (name: string) => string) {
  return (
    <g>
      {/* Stage 1: Small aloe pup — tiny triangular leaf near soil */}
      {stage >= 1 && (
        <g transform="translate(100, 262)" filter={`url(#${pfx('softShadow')})`}>
          {/* Ground shadow */}
          <ellipse cx="0.5" cy="5" rx="5" ry="1.8" fill="#8a7040" opacity="0.2" />
          {/* Tiny pup leaf */}
          <path
            d="M 0 0 C -3 -1 -4 -6 -3 -10 C -2 -13 0 -15 0 -15 C 0 -15 2 -13 3 -10 C 4 -6 3 -1 0 0"
            fill="#3d8040"
          />
          {/* Highlight */}
          <path
            d="M 0 -2 C -1.5 -4 -2 -8 -1.5 -11 C -0.5 -13 0 -14 0 -14 C 0 -14 0.5 -13 1.5 -11 C 2 -8 1.5 -4 0 -2"
            fill="#5aa858"
            opacity="0.35"
          />
          {/* Tiny central vein */}
          <path d="M 0 -2 C 0 -6 0 -10 0 -13" stroke="#8ac8a0" strokeWidth="0.4" fill="none" opacity="0.3" />
        </g>
      )}

      {/* Stage 2: Small roots spreading + 2-3 tiny pointed leaves */}
      {stage >= 2 && (
        <g>
          {/* Underground roots — shallow fibrous */}
          <g opacity="0.55">
            <path d="M 100 266 C 96 270 88 274 80 277" stroke="#6b5535" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <path d="M 100 266 C 104 270 112 274 120 277" stroke="#6b5535" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <path d="M 100 268 C 94 272 86 275 78 278" stroke="#7a6a4a" strokeWidth="0.7" fill="none" strokeLinecap="round" />
            <path d="M 100 268 C 106 272 114 275 122 278" stroke="#7a6a4a" strokeWidth="0.7" fill="none" strokeLinecap="round" />
            {/* Fine root tips */}
            <path d="M 80 277 C 76 279 72 280 69 280" stroke="#7a6a4a" strokeWidth="0.35" fill="none" strokeLinecap="round" />
            <path d="M 120 277 C 124 279 128 280 131 280" stroke="#7a6a4a" strokeWidth="0.35" fill="none" strokeLinecap="round" />
            {/* Short downward root */}
            <path d="M 100 267 C 100 273 99 279 98 285" stroke="#6b5535" strokeWidth="0.9" fill="none" strokeLinecap="round" />
          </g>
          {/* 2-3 tiny pointed leaves emerging */}
          <g transform="translate(100, 260)" filter={`url(#${pfx('softShadow')})`}>
            {/* Center leaf */}
            <path
              d="M 0 0 C -2.5 -1 -3.5 -6 -2.5 -12 C -1.5 -16 0 -18 0 -18 C 0 -18 1.5 -16 2.5 -12 C 3.5 -6 2.5 -1 0 0"
              fill="#3d8040"
            />
            <path d="M 0 -2 C 0 -8 0 -14 0 -17" stroke="#8ac8a0" strokeWidth="0.35" fill="none" opacity="0.25" />
            {/* Left leaf */}
            <g transform="rotate(-25)">
              <path
                d="M 0 0 C -2 -0.8 -2.8 -5 -2 -9 C -1.2 -12 0 -14 0 -14 C 0 -14 1.2 -12 2 -9 C 2.8 -5 2 -0.8 0 0"
                fill="#3d8040"
                opacity="0.9"
              />
            </g>
            {/* Right leaf */}
            <g transform="rotate(22)">
              <path
                d="M 0 0 C -1.8 -0.6 -2.5 -4.5 -1.8 -8 C -1 -11 0 -12 0 -12 C 0 -12 1 -11 1.8 -8 C 2.5 -4.5 1.8 -0.6 0 0"
                fill="#3d8040"
                opacity="0.85"
              />
            </g>
          </g>
        </g>
      )}

      {/* Stage 3: Small rosette of 4-5 pointed upright leaves, height to ~220 */}
      {stage >= 3 && stage < 4 && (
        <g transform="translate(100, 262)" filter={`url(#${pfx('softShadow')})`}>
          {/* Back leaves (rendered first for depth) */}
          {aloeLeaf(35, 8, -30, pfx, true, false, 'l3-back-l')}
          {aloeLeaf(32, 7.5, 28, pfx, true, false, 'l3-back-r')}
          {/* Mid leaves */}
          {aloeLeaf(38, 9, -14, pfx, true, false, 'l3-mid-l')}
          {aloeLeaf(40, 9, 12, pfx, true, false, 'l3-mid-r')}
          {/* Center leaf — tallest */}
          {aloeLeaf(42, 9.5, 0, pfx, true, false, 'l3-center')}
        </g>
      )}

      {/* Stage 4: Larger rosette with 6-8 thick leaves, height to ~190 */}
      {stage >= 4 && stage < 5 && (
        <g transform="translate(100, 262)" filter={`url(#${pfx('softShadow')})`}>
          {/* Outer leaves — curve outward more */}
          {aloeLeaf(48, 10, -45, pfx, true, true, 'l4-outer-l2')}
          {aloeLeaf(45, 9.5, 42, pfx, true, true, 'l4-outer-r2')}
          {aloeLeaf(55, 11, -30, pfx, true, true, 'l4-outer-l')}
          {aloeLeaf(52, 10.5, 28, pfx, true, true, 'l4-outer-r')}
          {/* Mid leaves */}
          {aloeLeaf(60, 11.5, -14, pfx, true, true, 'l4-mid-l')}
          {aloeLeaf(62, 12, 12, pfx, true, true, 'l4-mid-r')}
          {/* Center leaves */}
          {aloeLeaf(65, 12, -3, pfx, true, true, 'l4-center-l')}
          {aloeLeaf(68, 12.5, 4, pfx, true, true, 'l4-center')}
        </g>
      )}

      {/* Stage 5: Full mature aloe — 10+ large pointed leaves with serrated edges */}
      {stage >= 5 && (
        <g transform="translate(100, 262)" filter={`url(#${pfx('softShadow')})`}>
          {/* Back layer — most outward-curving leaves */}
          {aloeLeaf(60, 11, -62, pfx, true, true, 'l5-far-l')}
          {aloeLeaf(58, 10.5, 60, pfx, true, true, 'l5-far-r')}
          {aloeLeaf(65, 12, -48, pfx, true, true, 'l5-back-l')}
          {aloeLeaf(62, 11.5, 45, pfx, true, true, 'l5-back-r')}
          {/* Mid layer */}
          {aloeLeaf(75, 13, -34, pfx, true, true, 'l5-mid-l2')}
          {aloeLeaf(72, 12.5, 32, pfx, true, true, 'l5-mid-r2')}
          {aloeLeaf(82, 14, -20, pfx, true, true, 'l5-mid-l')}
          {aloeLeaf(80, 13.5, 18, pfx, true, true, 'l5-mid-r')}
          {/* Inner layer */}
          {aloeLeaf(90, 14.5, -9, pfx, true, true, 'l5-inner-l')}
          {aloeLeaf(88, 14, 8, pfx, true, true, 'l5-inner-r')}
          {/* Center leaves — tallest, reaching to ~150 */}
          {aloeLeaf(100, 15, -2, pfx, true, true, 'l5-center-l')}
          {aloeLeaf(105, 15.5, 3, pfx, true, true, 'l5-center')}
        </g>
      )}

      {/* Stage 6: Tall orange-red flower spike rising from center */}
      {stage >= 6 && (
        <g>
          {/* Flower stalk — tall and thick */}
          <g filter={`url(#${pfx('softShadow')})`}>
            <path
              d="M 100 170 C 100 150 101 120 101 90"
              stroke={`url(#${pfx('aloeStalk')})`}
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            {/* Stalk highlight */}
            <path
              d="M 100 168 C 100 148 101 118 101 92"
              stroke="#7a9858"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              opacity="0.2"
            />
            {/* Small bract leaves along stalk */}
            {Array.from({ length: 4 }, (_, i) => {
              const y = 160 - i * 18;
              const side = i % 2 === 0 ? -1 : 1;
              return (
                <path
                  key={`bract-${i}`}
                  d={`M ${100.5 + side * 1.5} ${y} C ${100.5 + side * 6} ${y - 3} ${100.5 + side * 8} ${y - 8} ${100.5 + side * 5} ${y - 12}`}
                  stroke="#5a8840"
                  strokeWidth="1.2"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.5"
                />
              );
            })}
          </g>
          {/* Tubular flowers along the top portion of the stalk */}
          <g filter={`url(#${pfx('softShadow')})`}>
            {Array.from({ length: 14 }, (_, i) => {
              const t = i / 13;
              const y = 130 - t * 40; // flowers from y=130 to y=90
              const side = i % 2 === 0 ? -1 : 1;
              const offsetX = side * (3 + t * 2);
              const flowerLen = 8 + (1 - t) * 4; // flowers taper shorter toward top
              const droop = (1 - t) * 5; // lower flowers droop more
              const opacity = 0.7 + t * 0.3;
              return (
                <g key={`flower-${i}`}>
                  {/* Flower pedicel (small stem) */}
                  <path
                    d={`M ${101} ${y} C ${101 + offsetX * 0.3} ${y} ${101 + offsetX * 0.6} ${y + droop * 0.3} ${101 + offsetX} ${y + droop * 0.5}`}
                    stroke="#6a8848"
                    strokeWidth="0.8"
                    fill="none"
                    strokeLinecap="round"
                  />
                  {/* Tubular flower body */}
                  <path
                    d={`M ${101 + offsetX} ${y + droop * 0.5}
                        C ${101 + offsetX + side * 1.5} ${y + droop * 0.5 + flowerLen * 0.2}
                          ${101 + offsetX + side * 2} ${y + droop * 0.5 + flowerLen * 0.7}
                          ${101 + offsetX + side * 1.2} ${y + droop * 0.5 + flowerLen}`}
                    stroke={`url(#${pfx('aloeFlower')})`}
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    opacity={opacity}
                  />
                  {/* Flower highlight */}
                  <path
                    d={`M ${101 + offsetX} ${y + droop * 0.5 + 1}
                        C ${101 + offsetX + side * 1.2} ${y + droop * 0.5 + flowerLen * 0.25}
                          ${101 + offsetX + side * 1.5} ${y + droop * 0.5 + flowerLen * 0.6}
                          ${101 + offsetX + side * 0.8} ${y + droop * 0.5 + flowerLen * 0.85}`}
                    stroke="#e87838"
                    strokeWidth="1"
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.3"
                  />
                  {/* Tiny stamen tip */}
                  <circle
                    cx={101 + offsetX + side * 1.2}
                    cy={y + droop * 0.5 + flowerLen + 0.5}
                    r="0.6"
                    fill="#ffd54f"
                    opacity="0.6"
                  />
                </g>
              );
            })}
            {/* Top bud cluster — unopened flowers at the very top */}
            {Array.from({ length: 4 }, (_, i) => {
              const y = 88 - i * 3;
              const side = i % 2 === 0 ? -1 : 1;
              return (
                <ellipse
                  key={`bud-${i}`}
                  cx={101 + side * (1 + i * 0.5)}
                  cy={y}
                  rx="1.8"
                  ry="2.5"
                  fill="#c85020"
                  opacity={0.7 - i * 0.1}
                  transform={`rotate(${side * 10} ${101 + side * (1 + i * 0.5)} ${y})`}
                />
              );
            })}
          </g>
        </g>
      )}

      {/* Stage 7: Harvest golden glow + floating particles */}
      {stage >= 7 && (
        <g>
          {/* Golden harvest aura */}
          <circle
            cx="100"
            cy="170"
            r="85"
            fill={`url(#${pfx('harvestGlow')})`}
            className="animate-pulse"
          />
          {/* Floating aloe gel/nectar particles */}
          {[
            { x: 55, y: 100, delay: '0s' },
            { x: 145, y: 95, delay: '1.0s' },
            { x: 40, y: 140, delay: '2.2s' },
            { x: 160, y: 130, delay: '3.4s' },
            { x: 70, y: 80, delay: '0.8s' },
            { x: 130, y: 75, delay: '1.8s' },
            { x: 85, y: 115, delay: '2.8s' },
            { x: 115, y: 108, delay: '3.8s' },
          ].map((s, i) => (
            <g key={`float-${i}`} className="animate-float-away" style={{ animationDelay: s.delay }}>
              {/* Outer particle */}
              <ellipse
                cx={s.x}
                cy={s.y}
                rx="2"
                ry="2.5"
                fill="#d4af37"
                opacity="0.5"
                transform={`rotate(${20 * i} ${s.x} ${s.y})`}
              />
              {/* Inner bright core */}
              <ellipse
                cx={s.x}
                cy={s.y}
                rx="1"
                ry="1.3"
                fill="#f0d860"
                opacity="0.3"
                transform={`rotate(${20 * i} ${s.x} ${s.y})`}
              />
            </g>
          ))}
        </g>
      )}
    </g>
  );
}
