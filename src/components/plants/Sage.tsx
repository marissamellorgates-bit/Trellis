export function sageGradients(pfx: (name: string) => string) {
  return (
    <>
      {/* Woody stem gradient — gray-brown */}
      <linearGradient id={pfx('sagStem')} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#6a5a40" />
        <stop offset="25%" stopColor="#7a6a50" />
        <stop offset="50%" stopColor="#9a8a68" />
        <stop offset="75%" stopColor="#7a6a50" />
        <stop offset="100%" stopColor="#6a5a40" />
      </linearGradient>

      {/* Velvety sage leaf — gray-green */}
      <radialGradient id={pfx('sagLeaf')} cx="45%" cy="40%" r="58%">
        <stop offset="0%" stopColor="#a0aa90" />
        <stop offset="45%" stopColor="#8a9a78" />
        <stop offset="100%" stopColor="#6a7a60" />
      </radialGradient>

      {/* Leaf underside — lighter, silvery */}
      <radialGradient id={pfx('sagLeafLight')} cx="50%" cy="50%" r="55%">
        <stop offset="0%" stopColor="#b8c0a8" />
        <stop offset="50%" stopColor="#a8b298" />
        <stop offset="100%" stopColor="#90a080" />
      </radialGradient>

      {/* Velvety texture overlay — subtle stipple pattern via filter */}
      <filter id={pfx('sagVelvet')} x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="3" seed="42" result="noise" />
        <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
        <feComposite in="SourceGraphic" in2="grayNoise" operator="in" result="clipped" />
        <feBlend in="SourceGraphic" in2="clipped" mode="soft-light" />
      </filter>

      {/* Flower bud gradient — blue-purple */}
      <radialGradient id={pfx('sagBud')} cx="40%" cy="35%" r="60%">
        <stop offset="0%" stopColor="#8470ff" />
        <stop offset="50%" stopColor="#7b68ee" />
        <stop offset="100%" stopColor="#6a5acd" />
      </radialGradient>

      {/* Open flower gradient — lighter purple with pink tones */}
      <radialGradient id={pfx('sagFlower')} cx="45%" cy="40%" r="55%">
        <stop offset="0%" stopColor="#9a8aff" />
        <stop offset="40%" stopColor="#8470ff" />
        <stop offset="100%" stopColor="#6a5acd" />
      </radialGradient>

      {/* Calyx (flower base) gradient */}
      <linearGradient id={pfx('sagCalyx')} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#7a8a68" />
        <stop offset="100%" stopColor="#5a6a48" />
      </linearGradient>

      {/* Seed gradient */}
      <radialGradient id={pfx('sagSeed')} cx="40%" cy="35%" r="55%">
        <stop offset="0%" stopColor="#7a6040" />
        <stop offset="50%" stopColor="#5a4430" />
        <stop offset="100%" stopColor="#3a2a18" />
      </radialGradient>
    </>
  );
}

/** Render a single velvety sage leaf (elliptical with pebbly texture) */
function sageLeaf(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  rotation: number,
  pfx: (name: string) => string,
  opacity: number = 0.85,
  showTexture: boolean = true,
) {
  return (
    <g transform={`rotate(${rotation} ${cx} ${cy})`}>
      {/* Leaf body — soft ellipse */}
      <ellipse
        cx={cx}
        cy={cy}
        rx={rx}
        ry={ry}
        fill={`url(#${pfx('sagLeaf')})`}
        opacity={opacity}
        filter={showTexture ? `url(#${pfx('sagVelvet')})` : undefined}
      />
      {/* Leaf outline — subtle velvety edge */}
      <ellipse
        cx={cx}
        cy={cy}
        rx={rx}
        ry={ry}
        fill="none"
        stroke="#6a7a60"
        strokeWidth="0.4"
        opacity="0.35"
      />
      {/* Central vein */}
      <line
        x1={cx}
        y1={cy - ry * 0.85}
        x2={cx}
        y2={cy + ry * 0.85}
        stroke="#5a6a48"
        strokeWidth="0.5"
        opacity="0.4"
      />
      {/* Pebbly texture dots — the quilted look of sage leaves */}
      {showTexture && Array.from({ length: 5 }, (_, i) => {
        const dx = (i % 3 - 1) * rx * 0.35;
        const dy = (Math.floor(i / 3) - 0.5) * ry * 0.5;
        return (
          <circle
            key={`tex-${i}`}
            cx={cx + dx}
            cy={cy + dy}
            r={0.6}
            fill="#b0ba98"
            opacity="0.2"
          />
        );
      })}
    </g>
  );
}

/** Render a pair of opposite sage leaves at a given height */
function leafPair(
  baseX: number,
  baseY: number,
  spread: number,
  leafRx: number,
  leafRy: number,
  angleOffset: number,
  pfx: (name: string) => string,
  opacity: number = 0.85,
) {
  return (
    <g>
      {/* Left leaf */}
      {sageLeaf(baseX - spread, baseY, leafRx, leafRy, -25 + angleOffset, pfx, opacity)}
      {/* Right leaf */}
      {sageLeaf(baseX + spread, baseY, leafRx, leafRy, 25 - angleOffset, pfx, opacity)}
    </g>
  );
}

/** Render a flower whorl — a ring of small tubular flowers around a stem point */
function flowerWhorl(
  cx: number,
  cy: number,
  count: number,
  radius: number,
  pfx: (name: string) => string,
  isBud: boolean = false,
) {
  return (
    <g>
      {Array.from({ length: count }, (_, i) => {
        const angle = (360 / count) * i;
        const rad = (angle * Math.PI) / 180;
        const fx = cx + Math.cos(rad) * radius;
        const fy = cy + Math.sin(rad) * radius * 0.5;
        const tubuleLength = isBud ? 3 : 5;
        const outAngle = angle;

        return (
          <g key={`whorl-${i}`}>
            {/* Calyx base */}
            <ellipse
              cx={fx}
              cy={fy}
              rx={1.5}
              ry={1}
              fill={`url(#${pfx('sagCalyx')})`}
              opacity="0.7"
            />
            {/* Tubular flower / bud */}
            <path
              d={`M ${fx} ${fy}
                  C ${fx + Math.cos((outAngle * Math.PI) / 180) * tubuleLength * 0.4} ${fy - tubuleLength * 0.3}
                    ${fx + Math.cos((outAngle * Math.PI) / 180) * tubuleLength * 0.7} ${fy - tubuleLength * 0.6}
                    ${fx + Math.cos((outAngle * Math.PI) / 180) * tubuleLength} ${fy - tubuleLength * 0.8}`}
              stroke={isBud ? `url(#${pfx('sagBud')})` : `url(#${pfx('sagFlower')})`}
              strokeWidth={isBud ? 2 : 2.5}
              fill="none"
              strokeLinecap="round"
            />
            {/* Two-lipped tip for open flowers */}
            {!isBud && (
              <circle
                cx={fx + Math.cos((outAngle * Math.PI) / 180) * tubuleLength}
                cy={fy - tubuleLength * 0.8}
                r={1.3}
                fill={`url(#${pfx('sagFlower')})`}
                opacity="0.9"
              />
            )}
          </g>
        );
      })}
    </g>
  );
}

export function renderSage(stage: number, pfx: (name: string) => string) {
  return (
    <g>
      {/* ── Stage 1-2: Seed — hidden once stem appears ── */}
      {stage >= 1 && stage < 3 && (
        <g transform="translate(100, 264)" filter={`url(#${pfx('softShadow')})`}>
          {/* Ground shadow */}
          <ellipse cx="0" cy="3" rx="4" ry="1.2" fill="#3a2518" opacity="0.15" />
          {/* Sage seed — small round brown */}
          <circle cx="0" cy="0" r="3" fill={`url(#${pfx('sagSeed')})`} />
          <circle cx="0" cy="0" r="3" fill="none" stroke="#4a3420" strokeWidth="0.4" opacity="0.5" />
          {/* Highlight */}
          <circle cx="-0.8" cy="-0.8" r="1" fill="#9a8060" opacity="0.25" />
        </g>
      )}

      {/* ── Stage 2: Seedling — short stem + 2 pairs opposite leaves ── */}
      {stage >= 2 && (
        <g>
          {/* Underground roots */}
          <g opacity="0.5">
            <path d="M 100 266 C 97 272 93 278 88 283" stroke="#7a5d3a" strokeWidth="0.9" fill="none" strokeLinecap="round" />
            <path d="M 100 266 C 103 273 107 279 112 284" stroke="#7a5d3a" strokeWidth="0.8" fill="none" strokeLinecap="round" />
            <path d="M 100 268 C 96 273 92 277 87 280" stroke="#7a5d3a" strokeWidth="0.5" fill="none" strokeLinecap="round" />
            <path d="M 100 268 C 104 274 108 278 113 281" stroke="#7a5d3a" strokeWidth="0.5" fill="none" strokeLinecap="round" />
          </g>

          {/* Short seedling stem */}
          <g filter={`url(#${pfx('softShadow')})`}>
            <path
              d="M 100 262 C 100 256 100 248 100 240"
              stroke="#7a8a60"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />

            {/* First pair of tiny opposite leaves (lower) */}
            {sageLeaf(92, 254, 5, 3.5, -30, pfx, 0.8, false)}
            {sageLeaf(108, 254, 5, 3.5, 30, pfx, 0.8, false)}

            {/* Second pair (upper, slightly larger) */}
            {sageLeaf(90, 245, 6, 4, -20, pfx, 0.85, false)}
            {sageLeaf(110, 245, 6, 4, 20, pfx, 0.85, false)}

            {/* Tiny terminal leaf bud */}
            <ellipse cx="100" cy="238" rx="3" ry="2.5" fill="#a0aa90" opacity="0.7" />
          </g>
        </g>
      )}

      {/* ── Stage 3: Mounded sub-shrub with woody base ── */}
      {stage >= 3 && stage < 5 && (
        <g filter={`url(#${pfx('softShadow')})`}>
          {/* Woody base stems */}
          <path
            d="M 100 262 C 99 252 98 242 97 230"
            stroke={`url(#${pfx('sagStem')})`}
            strokeWidth={stage >= 4 ? 4 : 3}
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 100 262 C 95 250 88 240 84 228"
            stroke={`url(#${pfx('sagStem')})`}
            strokeWidth={stage >= 4 ? 3.5 : 2.5}
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 100 262 C 106 250 112 240 116 228"
            stroke={`url(#${pfx('sagStem')})`}
            strokeWidth={stage >= 4 ? 3.5 : 2.5}
            fill="none"
            strokeLinecap="round"
          />

          {/* Stage 4: additional woody branches */}
          {stage >= 4 && (
            <g>
              <path
                d="M 100 262 C 92 248 82 238 75 222"
                stroke={`url(#${pfx('sagStem')})`}
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M 100 262 C 108 248 118 238 125 222"
                stroke={`url(#${pfx('sagStem')})`}
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
              />
              {/* Bark texture on woody base */}
              <path d="M 99 260 C 98 252 97 244 96 235" stroke="#5a4a30" strokeWidth="0.4" fill="none" opacity="0.3" />
              <path d="M 101 260 C 102 252 103 244 104 235" stroke="#5a4a30" strokeWidth="0.3" fill="none" opacity="0.25" />
            </g>
          )}

          {/* Many pairs of textured oval leaves — mounded shape */}
          {/* Bottom pairs (larger) */}
          {leafPair(97, 250, 14, 8, 5.5, 5, pfx, 0.8)}
          {leafPair(97, 242, 16, 9, 6, 0, pfx, 0.85)}
          {leafPair(97, 234, 15, 8.5, 5.5, 3, pfx, 0.85)}

          {/* Side leaves on outer branches */}
          {sageLeaf(78, 235, 7, 5, -35, pfx, 0.8)}
          {sageLeaf(120, 235, 7, 5, 35, pfx, 0.8)}
          {sageLeaf(80, 243, 6.5, 4.5, -40, pfx, 0.75)}
          {sageLeaf(118, 243, 6.5, 4.5, 40, pfx, 0.75)}

          {/* Upper pairs (smaller, forming mound top) */}
          {leafPair(97, 226, 12, 7, 5, -5, pfx, 0.85)}

          {stage >= 4 && (
            <g>
              {/* Additional leaves for fuller bush */}
              {leafPair(75, 228, 8, 7, 5, 10, pfx, 0.8)}
              {leafPair(125, 228, 8, 7, 5, -10, pfx, 0.8)}
              {sageLeaf(70, 222, 6.5, 4.5, -30, pfx, 0.75)}
              {sageLeaf(130, 222, 6.5, 4.5, 30, pfx, 0.75)}
              {leafPair(97, 218, 10, 6, 4.5, 0, pfx, 0.85)}

              {/* Crown leaves */}
              {sageLeaf(97, 212, 7, 5, 0, pfx, 0.8)}
              {sageLeaf(88, 215, 6, 4.5, -15, pfx, 0.75)}
              {sageLeaf(106, 215, 6, 4.5, 15, pfx, 0.75)}
            </g>
          )}

          {/* Top of mound */}
          {stage < 4 && (
            <g>
              {sageLeaf(97, 222, 6, 4.5, 0, pfx, 0.8)}
              {sageLeaf(90, 226, 5.5, 4, -10, pfx, 0.75)}
              {sageLeaf(104, 226, 5.5, 4, 10, pfx, 0.75)}
            </g>
          )}
        </g>
      )}

      {/* ── Stage 5+: Full bush with flower spikes rising ── */}
      {stage >= 5 && (
        <g>
          {/* Woody lower stems — thicker, more gnarled */}
          <g filter={`url(#${pfx('softShadow')})`}>
            <path
              d="M 100 262 C 99 250 97 238 96 225"
              stroke={`url(#${pfx('sagStem')})`}
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 100 262 C 93 248 85 236 78 218"
              stroke={`url(#${pfx('sagStem')})`}
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 100 262 C 107 248 115 236 122 218"
              stroke={`url(#${pfx('sagStem')})`}
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 100 262 C 90 246 78 234 68 215"
              stroke={`url(#${pfx('sagStem')})`}
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 100 262 C 110 246 122 234 132 215"
              stroke={`url(#${pfx('sagStem')})`}
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            {/* Bark texture */}
            <path d="M 98 260 C 97 248 95 236 94 224" stroke="#5a4a30" strokeWidth="0.5" fill="none" opacity="0.3" />
            <path d="M 102 260 C 103 248 105 236 106 224" stroke="#5a4a30" strokeWidth="0.4" fill="none" opacity="0.25" />
          </g>

          {/* Lush leafy growth — full bush shape */}
          <g>
            {/* Bottom layer leaves */}
            {leafPair(100, 252, 16, 9, 6, 5, pfx, 0.75)}
            {leafPair(100, 244, 18, 9.5, 6, 0, pfx, 0.8)}
            {sageLeaf(72, 240, 7.5, 5, -40, pfx, 0.7)}
            {sageLeaf(128, 240, 7.5, 5, 40, pfx, 0.7)}

            {/* Middle layer */}
            {leafPair(100, 236, 17, 8.5, 5.5, 3, pfx, 0.82)}
            {leafPair(100, 228, 15, 8, 5.5, -2, pfx, 0.85)}
            {sageLeaf(66, 230, 7, 5, -35, pfx, 0.7)}
            {sageLeaf(134, 230, 7, 5, 35, pfx, 0.7)}
            {sageLeaf(74, 222, 7, 4.5, -30, pfx, 0.75)}
            {sageLeaf(126, 222, 7, 4.5, 30, pfx, 0.75)}

            {/* Upper layer */}
            {leafPair(100, 220, 13, 7.5, 5, 0, pfx, 0.85)}
            {leafPair(100, 214, 10, 6.5, 4.5, -5, pfx, 0.82)}
            {sageLeaf(68, 218, 6, 4.5, -25, pfx, 0.7)}
            {sageLeaf(132, 218, 6, 4.5, 25, pfx, 0.7)}

            {/* Crown */}
            {sageLeaf(100, 208, 7, 5, 0, pfx, 0.8)}
            {sageLeaf(92, 210, 6, 4.5, -10, pfx, 0.75)}
            {sageLeaf(108, 210, 6, 4.5, 10, pfx, 0.75)}
          </g>

          {/* ── Flower spikes (stage 5 = buds) ── */}
          {stage === 5 && (
            <g filter={`url(#${pfx('softShadow')})`}>
              {/* Square flower stems rising above foliage */}
              {/* Center spike */}
              <path
                d="M 100 210 C 100 195 100 180 100 160"
                stroke="#6a7a50"
                strokeWidth="2.2"
                fill="none"
                strokeLinecap="round"
              />
              {/* Whorled bud tiers */}
              {flowerWhorl(100, 180, 5, 4, pfx, true)}
              {flowerWhorl(100, 172, 5, 3.5, pfx, true)}
              {flowerWhorl(100, 165, 4, 3, pfx, true)}

              {/* Left spike */}
              <path
                d="M 86 215 C 82 200 78 185 76 170"
                stroke="#6a7a50"
                strokeWidth="1.8"
                fill="none"
                strokeLinecap="round"
              />
              {flowerWhorl(78, 188, 4, 3.5, pfx, true)}
              {flowerWhorl(77, 180, 4, 3, pfx, true)}
              {flowerWhorl(76, 174, 3, 2.5, pfx, true)}

              {/* Right spike */}
              <path
                d="M 114 215 C 118 200 122 185 124 170"
                stroke="#6a7a50"
                strokeWidth="1.8"
                fill="none"
                strokeLinecap="round"
              />
              {flowerWhorl(122, 188, 4, 3.5, pfx, true)}
              {flowerWhorl(123, 180, 4, 3, pfx, true)}
              {flowerWhorl(124, 174, 3, 2.5, pfx, true)}

              {/* Small leaf bracts at whorl bases */}
              {sageLeaf(94, 183, 4, 2.5, -20, pfx, 0.6, false)}
              {sageLeaf(106, 183, 4, 2.5, 20, pfx, 0.6, false)}
            </g>
          )}
        </g>
      )}

      {/* ── Stage 6: Full bloom — open tubular flowers + fragrance wisps ── */}
      {stage >= 6 && stage < 7 && (
        <g>
          {/* Flower spikes in full bloom */}
          <g filter={`url(#${pfx('softShadow')})`}>
            {/* Center spike — tallest */}
            <path
              d="M 100 208 C 100 190 100 172 100 148"
              stroke="#6a7a50"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            {/* Open flower whorls — larger, more petals */}
            {flowerWhorl(100, 195, 6, 5, pfx, false)}
            {flowerWhorl(100, 185, 6, 4.5, pfx, false)}
            {flowerWhorl(100, 176, 5, 4, pfx, false)}
            {flowerWhorl(100, 168, 5, 3.5, pfx, false)}
            {flowerWhorl(100, 160, 4, 3, pfx, false)}
            {flowerWhorl(100, 153, 3, 2.5, pfx, true)}

            {/* Left spike */}
            <path
              d="M 84 214 C 80 196 76 178 73 158"
              stroke="#6a7a50"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            {flowerWhorl(77, 195, 5, 4.5, pfx, false)}
            {flowerWhorl(76, 186, 5, 4, pfx, false)}
            {flowerWhorl(75, 178, 4, 3.5, pfx, false)}
            {flowerWhorl(74, 170, 4, 3, pfx, false)}
            {flowerWhorl(73, 163, 3, 2.5, pfx, true)}

            {/* Right spike */}
            <path
              d="M 116 214 C 120 196 124 178 127 158"
              stroke="#6a7a50"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            {flowerWhorl(123, 195, 5, 4.5, pfx, false)}
            {flowerWhorl(124, 186, 5, 4, pfx, false)}
            {flowerWhorl(125, 178, 4, 3.5, pfx, false)}
            {flowerWhorl(126, 170, 4, 3, pfx, false)}
            {flowerWhorl(127, 163, 3, 2.5, pfx, true)}

            {/* Far left short spike */}
            <path
              d="M 72 218 C 66 202 62 188 60 174"
              stroke="#6a7a50"
              strokeWidth="1.6"
              fill="none"
              strokeLinecap="round"
            />
            {flowerWhorl(63, 198, 4, 3.5, pfx, false)}
            {flowerWhorl(62, 190, 4, 3, pfx, false)}
            {flowerWhorl(61, 183, 3, 2.5, pfx, false)}

            {/* Far right short spike */}
            <path
              d="M 128 218 C 134 202 138 188 140 174"
              stroke="#6a7a50"
              strokeWidth="1.6"
              fill="none"
              strokeLinecap="round"
            />
            {flowerWhorl(137, 198, 4, 3.5, pfx, false)}
            {flowerWhorl(138, 190, 4, 3, pfx, false)}
            {flowerWhorl(139, 183, 3, 2.5, pfx, false)}

            {/* Leaf bracts along flower stems */}
            {sageLeaf(93, 198, 4.5, 2.8, -25, pfx, 0.55, false)}
            {sageLeaf(107, 198, 4.5, 2.8, 25, pfx, 0.55, false)}
            {sageLeaf(71, 200, 4, 2.5, -35, pfx, 0.5, false)}
            {sageLeaf(129, 200, 4, 2.5, 35, pfx, 0.5, false)}
          </g>

          {/* Fragrance wisps — tiny floating dots suggesting aroma */}
          {[
            { x: 95, y: 140, delay: '0s' },
            { x: 108, y: 135, delay: '1.5s' },
            { x: 85, y: 148, delay: '3s' },
            { x: 118, y: 145, delay: '0.8s' },
            { x: 100, y: 128, delay: '2.2s' },
            { x: 70, y: 155, delay: '1.2s' },
            { x: 132, y: 152, delay: '2.8s' },
          ].map((w, i) => (
            <circle
              key={`wisp-${i}`}
              cx={w.x}
              cy={w.y}
              r="0.8"
              fill="#b8a8e0"
              opacity="0.35"
            >
              <animate
                attributeName="cy"
                values={`${w.y};${w.y - 12};${w.y}`}
                dur="4s"
                begin={w.delay}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.35;0.1;0.35"
                dur="4s"
                begin={w.delay}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </g>
      )}

      {/* ── Stage 7: Harvest glow + floating sage-green leaf particles ── */}
      {stage >= 7 && (
        <g>
          {/* Re-render the bush with faded flowers (post-bloom harvest feel) */}
          <g filter={`url(#${pfx('softShadow')})`}>
            {/* Flower spikes — faded */}
            <path d="M 100 208 C 100 190 100 172 100 148" stroke="#6a7a50" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.6" />
            <path d="M 84 214 C 80 196 76 178 73 158" stroke="#6a7a50" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
            <path d="M 116 214 C 120 196 124 178 127 158" stroke="#6a7a50" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />

            {/* Faded whorls */}
            {[195, 185, 176, 168, 160].map((y, i) => (
              <g key={`hw-${i}`} opacity="0.4">
                {flowerWhorl(100, y, 5, 4 - i * 0.3, pfx, false)}
              </g>
            ))}
            {[195, 186, 178, 170].map((y, i) => (
              <g key={`hwl-${i}`} opacity="0.35">
                {flowerWhorl(76 - i, y, 4, 3.5 - i * 0.3, pfx, false)}
              </g>
            ))}
            {[195, 186, 178, 170].map((y, i) => (
              <g key={`hwr-${i}`} opacity="0.35">
                {flowerWhorl(124 + i, y, 4, 3.5 - i * 0.3, pfx, false)}
              </g>
            ))}
          </g>

          {/* Golden harvest glow */}
          <circle
            cx="100"
            cy="185"
            r="80"
            fill={`url(#${pfx('harvestGlow')})`}
            className="animate-pulse"
          />

          {/* Floating sage-green leaf particles */}
          {[
            { x: 55, y: 110, rot: 30, delay: '0s' },
            { x: 145, y: 105, rot: -25, delay: '0.9s' },
            { x: 40, y: 140, rot: 45, delay: '1.8s' },
            { x: 160, y: 130, rot: -40, delay: '2.6s' },
            { x: 70, y: 90, rot: 20, delay: '3.4s' },
            { x: 130, y: 85, rot: -15, delay: '1.3s' },
            { x: 85, y: 120, rot: 50, delay: '2.1s' },
            { x: 115, y: 115, rot: -35, delay: '3.8s' },
          ].map((s, i) => (
            <g key={`sage-float-${i}`} className="animate-float-away" style={{ animationDelay: s.delay }}>
              {/* Small sage leaf shape — elliptical with gray-green tint */}
              <ellipse
                cx={s.x}
                cy={s.y}
                rx="2"
                ry="3.5"
                fill="#8a9a78"
                opacity="0.55"
                transform={`rotate(${s.rot} ${s.x} ${s.y})`}
              />
              {/* Leaf vein highlight */}
              <line
                x1={s.x}
                y1={s.y - 2.5}
                x2={s.x}
                y2={s.y + 2.5}
                stroke="#a0aa90"
                strokeWidth="0.3"
                opacity="0.3"
                transform={`rotate(${s.rot} ${s.x} ${s.y})`}
              />
            </g>
          ))}
        </g>
      )}
    </g>
  );
}
