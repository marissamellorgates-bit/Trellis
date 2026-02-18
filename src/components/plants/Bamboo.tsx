export function bambooGradients(pfx: (name: string) => string) {
  return (
    <>
      {/* Culm body — horizontal gradient for cylindrical roundness */}
      <linearGradient id={pfx('bamCulm')} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#2d6b25" />
        <stop offset="18%" stopColor="#3d8530" />
        <stop offset="40%" stopColor="#5a9c4e" />
        <stop offset="60%" stopColor="#5a9c4e" />
        <stop offset="82%" stopColor="#3d8530" />
        <stop offset="100%" stopColor="#2d6b25" />
      </linearGradient>

      {/* Culm highlight overlay */}
      <linearGradient id={pfx('bamCulmHi')} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#7ab860" stopOpacity="0" />
        <stop offset="35%" stopColor="#90d070" stopOpacity="0.45" />
        <stop offset="55%" stopColor="#a0e080" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#7ab860" stopOpacity="0" />
      </linearGradient>

      {/* Leaf gradient */}
      <linearGradient id={pfx('bamLeaf')} x1="0" y1="0" x2="1" y2="0.6">
        <stop offset="0%" stopColor="#3d8030" />
        <stop offset="40%" stopColor="#58a045" />
        <stop offset="100%" stopColor="#68b058" />
      </linearGradient>

      {/* Leaf highlight */}
      <linearGradient id={pfx('bamLeafHi')} x1="0.2" y1="0" x2="0.8" y2="1">
        <stop offset="0%" stopColor="#80c868" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#58a045" stopOpacity="0" />
      </linearGradient>

      {/* Sheath gradient — papery tan */}
      <linearGradient id={pfx('bamSheath')} x1="0" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor="#d4bc78" />
        <stop offset="40%" stopColor="#c4a860" />
        <stop offset="100%" stopColor="#a88c48" />
      </linearGradient>

      {/* Rhizome gradient */}
      <linearGradient id={pfx('bamRhizome')} x1="0.2" y1="0" x2="0.8" y2="1">
        <stop offset="0%" stopColor="#c4a870" />
        <stop offset="50%" stopColor="#a08050" />
        <stop offset="100%" stopColor="#7a5c38" />
      </linearGradient>

      {/* Panicle (flowering) gradient */}
      <linearGradient id={pfx('bamPanicle')} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#d4cc90" />
        <stop offset="50%" stopColor="#c4bc80" />
        <stop offset="100%" stopColor="#a8a060" />
      </linearGradient>
    </>
  );
}

export function renderBamboo(stage: number, pfx: (name: string) => string) {
  /* ── Helper: draw a single bamboo leaf ── */
  const bambooLeaf = (
    cx: number,
    cy: number,
    angle: number,
    length: number,
    key: string,
  ) => (
    <g key={key} transform={`translate(${cx}, ${cy}) rotate(${angle})`}>
      {/* Main leaf body */}
      <path
        d={`M 0 0 C ${length * 0.15} ${-length * 0.08} ${length * 0.6} ${-length * 0.12} ${length} 0
            C ${length * 0.6} ${length * 0.12} ${length * 0.15} ${length * 0.08} 0 0`}
        fill={`url(#${pfx('bamLeaf')})`}
        opacity="0.9"
      />
      {/* Highlight layer */}
      <path
        d={`M ${length * 0.1} ${-length * 0.02} C ${length * 0.3} ${-length * 0.08} ${length * 0.6} ${-length * 0.09} ${length * 0.85} ${-length * 0.01}
            C ${length * 0.6} ${length * 0.04} ${length * 0.3} ${length * 0.03} ${length * 0.1} ${-length * 0.02}`}
        fill={`url(#${pfx('bamLeafHi')})`}
        opacity="0.4"
      />
      {/* Midrib */}
      <line
        x1="0"
        y1="0"
        x2={length * 0.95}
        y2="0"
        stroke="#2d6020"
        strokeWidth="0.4"
        opacity="0.5"
      />
    </g>
  );

  /* ── Helper: draw a culm segment with node ring ── */
  const culmSegment = (
    x: number,
    yTop: number,
    yBot: number,
    w: number,
    key: string,
    showNode: boolean = true,
  ) => {
    const segH = yBot - yTop;
    return (
      <g key={key}>
        {/* Shadow */}
        <rect
          x={x - w / 2 + 1}
          y={yTop + 1}
          width={w}
          height={segH}
          rx={w * 0.2}
          fill="#1a3010"
          opacity="0.12"
        />
        {/* Main culm body */}
        <rect
          x={x - w / 2}
          y={yTop}
          width={w}
          height={segH}
          rx={w * 0.2}
          fill={`url(#${pfx('bamCulm')})`}
        />
        {/* Highlight */}
        <rect
          x={x - w / 2}
          y={yTop}
          width={w}
          height={segH}
          rx={w * 0.2}
          fill={`url(#${pfx('bamCulmHi')})`}
          opacity="0.5"
        />
        {/* Node ring at bottom */}
        {showNode && (
          <>
            <ellipse
              cx={x}
              cy={yBot}
              rx={w * 0.58}
              ry={1.5}
              fill="#4a8040"
              opacity="0.7"
            />
            <ellipse
              cx={x}
              cy={yBot - 0.5}
              rx={w * 0.55}
              ry={1}
              fill="#7aba60"
              opacity="0.35"
            />
          </>
        )}
      </g>
    );
  };

  /* ── Helper: draw a full culm (stack of segments) ── */
  const fullCulm = (
    x: number,
    baseY: number,
    topY: number,
    w: number,
    segments: number,
    prefix: string,
  ) => {
    const totalH = baseY - topY;
    const segH = totalH / segments;
    return (
      <g filter={`url(#${pfx('softShadow')})`}>
        {Array.from({ length: segments }, (_, i) => {
          const yTop = topY + i * segH;
          const yBot = yTop + segH;
          return culmSegment(x, yTop, yBot, w, `${prefix}-seg-${i}`, i < segments - 1);
        })}
      </g>
    );
  };

  return (
    <g>
      {/* ══════ Stage 1: Rhizome Seed ══════ */}
      {stage >= 1 && (
        <g transform="translate(100, 262)" filter={`url(#${pfx('softShadow')})`}>
          {/* Shadow on soil */}
          <ellipse cx="0" cy="6" rx="14" ry="3" fill="#3a2518" opacity="0.15" />

          {/* Main rhizome body — chunky horizontal root piece */}
          <path
            d="M -12 0 C -11 -3 -6 -5 0 -4 C 6 -3 11 -4 14 -2
               C 16 0 14 3 10 4 C 5 5 -4 5 -10 3 C -13 2 -13 1 -12 0"
            fill={`url(#${pfx('bamRhizome')})`}
          />
          {/* Rhizome texture lines */}
          <path d="M -8 -2 C -4 -3 2 -3 6 -2" stroke="#7a5c38" strokeWidth="0.5" fill="none" opacity="0.4" />
          <path d="M -6 1 C -2 0 4 0 8 1" stroke="#7a5c38" strokeWidth="0.4" fill="none" opacity="0.3" />
          {/* Highlight */}
          <path
            d="M -8 -2 C -5 -4 1 -4 6 -3 C 9 -3 12 -3 13 -2"
            stroke="#d4c890"
            strokeWidth="0.6"
            fill="none"
            opacity="0.25"
          />
          {/* Bud eye — growth point */}
          <ellipse cx="3" cy="-3" rx="2" ry="1.5" fill="#b8a060" opacity="0.6" />
          <ellipse cx="3" cy="-3.5" rx="1" ry="0.8" fill="#c8b870" opacity="0.4" />

          {/* Root hairs */}
          <path d="M -8 3 C -10 6 -12 9 -13 11" stroke="#8b7050" strokeWidth="0.5" fill="none" opacity="0.4" strokeLinecap="round" />
          <path d="M -4 4 C -5 7 -6 10 -7 12" stroke="#8b7050" strokeWidth="0.4" fill="none" opacity="0.35" strokeLinecap="round" />
          <path d="M 2 4 C 2 7 1 10 0 12" stroke="#8b7050" strokeWidth="0.45" fill="none" opacity="0.38" strokeLinecap="round" />
          <path d="M 7 3 C 8 6 9 9 10 11" stroke="#8b7050" strokeWidth="0.4" fill="none" opacity="0.35" strokeLinecap="round" />
          <path d="M 11 2 C 13 5 14 8 14 10" stroke="#8b7050" strokeWidth="0.35" fill="none" opacity="0.3" strokeLinecap="round" />
          {/* Tiny root hair branches */}
          <path d="M -12 9 C -14 10 -15 11 -16 11" stroke="#8b7050" strokeWidth="0.25" fill="none" opacity="0.25" strokeLinecap="round" />
          <path d="M -6 10 C -8 11 -9 12 -10 12" stroke="#8b7050" strokeWidth="0.25" fill="none" opacity="0.25" strokeLinecap="round" />
          <path d="M 9 9 C 11 10 12 11 13 12" stroke="#8b7050" strokeWidth="0.25" fill="none" opacity="0.25" strokeLinecap="round" />
        </g>
      )}

      {/* ══════ Stage 2: Underground Rhizome Network ══════ */}
      {stage >= 2 && (
        <g opacity="0.6">
          {/* Primary horizontal runners */}
          <path d="M 100 268 C 92 267 82 268 72 270" stroke="#9b7d55" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 100 268 C 108 267 118 268 128 270" stroke="#9b7d55" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M 100 272 C 95 273 85 275 78 278" stroke="#9b7d55" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M 100 272 C 105 273 115 275 122 278" stroke="#9b7d55" strokeWidth="1.4" fill="none" strokeLinecap="round" />

          {/* Secondary branches */}
          <path d="M 82 268 C 78 272 74 278 72 284" stroke="#8b6d4a" strokeWidth="1" fill="none" strokeLinecap="round" />
          <path d="M 72 270 C 68 273 64 278 62 282" stroke="#8b6d4a" strokeWidth="0.8" fill="none" strokeLinecap="round" />
          <path d="M 118 268 C 122 272 126 278 128 284" stroke="#8b6d4a" strokeWidth="1" fill="none" strokeLinecap="round" />
          <path d="M 128 270 C 132 273 136 278 138 282" stroke="#8b6d4a" strokeWidth="0.8" fill="none" strokeLinecap="round" />

          {/* Fine root tips */}
          <path d="M 78 278 C 74 282 70 286 68 290" stroke="#8b6d4a" strokeWidth="0.5" fill="none" strokeLinecap="round" />
          <path d="M 72 284 C 70 287 68 290 67 292" stroke="#8b6d4a" strokeWidth="0.4" fill="none" strokeLinecap="round" />
          <path d="M 122 278 C 126 282 130 286 132 290" stroke="#8b6d4a" strokeWidth="0.5" fill="none" strokeLinecap="round" />
          <path d="M 128 284 C 130 287 132 290 133 292" stroke="#8b6d4a" strokeWidth="0.4" fill="none" strokeLinecap="round" />

          {/* Rhizome nodes (small bumps) */}
          <circle cx="82" cy="268" r="1.5" fill="#a08050" opacity="0.5" />
          <circle cx="118" cy="268" r="1.5" fill="#a08050" opacity="0.5" />
          <circle cx="72" cy="270" r="1.2" fill="#a08050" opacity="0.45" />
          <circle cx="128" cy="270" r="1.2" fill="#a08050" opacity="0.45" />
          <circle cx="78" cy="278" r="1" fill="#a08050" opacity="0.4" />
          <circle cx="122" cy="278" r="1" fill="#a08050" opacity="0.4" />
        </g>
      )}

      {/* ══════ Stage 3: Single Shoot Breaking Through ══════ */}
      {stage >= 3 && stage < 4 && (
        <g filter={`url(#${pfx('softShadow')})`}>
          {/* Soil break marks */}
          <path d="M 96 263 C 97 262 99 261 101 261 C 103 261 104 262 105 263" stroke="#5a4830" strokeWidth="0.6" fill="none" opacity="0.3" />

          {/* Protective sheaths (overlapping layers) */}
          <path
            d="M 95 262 C 94 248 96 230 100 210
               C 101 210 102 212 102 215
               C 101 230 104 248 106 262"
            fill={`url(#${pfx('bamSheath')})`}
            opacity="0.85"
          />
          {/* Sheath texture lines */}
          <path d="M 97 255 C 98 240 99 225 100 215" stroke="#b09858" strokeWidth="0.5" fill="none" opacity="0.3" />
          <path d="M 103 255 C 102 240 101 225 100 215" stroke="#b09858" strokeWidth="0.4" fill="none" opacity="0.25" />

          {/* Inner shoot tip — pointed conical shape */}
          <path
            d="M 98 230 C 98 222 99 214 100 208
               C 101 214 102 222 102 230"
            fill="#8aac50"
            opacity="0.7"
          />
          {/* Shoot tip point */}
          <path
            d="M 99.2 215 C 99.5 211 99.8 209 100 207
               C 100.2 209 100.5 211 100.8 215"
            fill="#a0c060"
            opacity="0.8"
          />

          {/* Sheath overlap marks */}
          <path d="M 96 250 C 98 249 102 249 104 250" stroke="#a89050" strokeWidth="0.6" fill="none" opacity="0.35" />
          <path d="M 96.5 240 C 98 239 102 239 103.5 240" stroke="#a89050" strokeWidth="0.5" fill="none" opacity="0.3" />
          <path d="M 97 232 C 98.5 231 101.5 231 103 232" stroke="#a89050" strokeWidth="0.45" fill="none" opacity="0.25" />
        </g>
      )}

      {/* ══════ Stage 4: 2-3 Segmented Culms ══════ */}
      {stage >= 4 && stage < 5 && (
        <g>
          {/* Center culm — tallest */}
          {fullCulm(100, 262, 160, 7, 4, 'c4-main')}

          {/* Left culm — shorter */}
          {fullCulm(88, 262, 185, 5.5, 3, 'c4-left')}

          {/* Right culm — mid height */}
          {fullCulm(112, 262, 175, 6, 3, 'c4-right')}

          {/* Small leaf clusters at nodes */}
          <g filter={`url(#${pfx('softShadow')})`}>
            {/* Main culm leaves */}
            {bambooLeaf(100, 186, -35, 18, 'l4-1')}
            {bambooLeaf(100, 186, 25, 15, 'l4-2')}
            {bambooLeaf(100, 212, -45, 14, 'l4-3')}
            {bambooLeaf(100, 212, 40, 12, 'l4-4')}
            {bambooLeaf(100, 160, -20, 16, 'l4-5')}
            {bambooLeaf(100, 160, 15, 14, 'l4-6')}

            {/* Left culm leaves */}
            {bambooLeaf(88, 211, -50, 12, 'l4-7')}
            {bambooLeaf(88, 211, 30, 10, 'l4-8')}
            {bambooLeaf(88, 185, -40, 14, 'l4-9')}

            {/* Right culm leaves */}
            {bambooLeaf(112, 204, 45, 13, 'l4-10')}
            {bambooLeaf(112, 204, -30, 11, 'l4-11')}
            {bambooLeaf(112, 175, 35, 14, 'l4-12')}
          </g>
        </g>
      )}

      {/* ══════ Stage 5: Dense Grove (4-5 Tall Culms) ══════ */}
      {stage >= 5 && (
        <g>
          {/* Back culms (rendered first, slightly translucent for depth) */}
          <g opacity="0.75">
            {fullCulm(82, 262, 90, 5, 5, 'c5-back-l')}
            {fullCulm(118, 262, 95, 5, 5, 'c5-back-r')}
          </g>

          {/* Main culms */}
          {fullCulm(92, 262, 80, 7, 6, 'c5-left')}
          {fullCulm(100, 262, 70, 8, 7, 'c5-center')}
          {fullCulm(108, 262, 75, 7, 6, 'c5-right')}

          {/* Leaf canopy at top */}
          <g filter={`url(#${pfx('softShadow')})`}>
            {/* Center culm top leaves */}
            {bambooLeaf(100, 72, -30, 22, 'l5-1')}
            {bambooLeaf(100, 72, 20, 20, 'l5-2')}
            {bambooLeaf(100, 72, -55, 18, 'l5-3')}
            {bambooLeaf(100, 72, 50, 17, 'l5-4')}
            {bambooLeaf(100, 98, -40, 18, 'l5-5')}
            {bambooLeaf(100, 98, 35, 16, 'l5-6')}

            {/* Left culm top leaves */}
            {bambooLeaf(92, 82, -45, 20, 'l5-7')}
            {bambooLeaf(92, 82, 15, 17, 'l5-8')}
            {bambooLeaf(92, 82, -65, 15, 'l5-9')}
            {bambooLeaf(92, 112, -50, 16, 'l5-10')}
            {bambooLeaf(92, 112, 30, 14, 'l5-11')}

            {/* Right culm top leaves */}
            {bambooLeaf(108, 77, 40, 20, 'l5-12')}
            {bambooLeaf(108, 77, -20, 18, 'l5-13')}
            {bambooLeaf(108, 77, 60, 15, 'l5-14')}
            {bambooLeaf(108, 107, 45, 16, 'l5-15')}
            {bambooLeaf(108, 107, -35, 14, 'l5-16')}

            {/* Back culm leaves (subtle) */}
            {bambooLeaf(82, 92, -55, 16, 'l5-17')}
            {bambooLeaf(82, 92, -75, 13, 'l5-18')}
            {bambooLeaf(118, 97, 50, 16, 'l5-19')}
            {bambooLeaf(118, 97, 70, 13, 'l5-20')}

            {/* Mid-height accent leaves */}
            {bambooLeaf(92, 150, -40, 14, 'l5-21')}
            {bambooLeaf(100, 140, 30, 13, 'l5-22')}
            {bambooLeaf(108, 145, 42, 14, 'l5-23')}
            {bambooLeaf(100, 180, -35, 12, 'l5-24')}
            {bambooLeaf(108, 175, 38, 12, 'l5-25')}
          </g>
        </g>
      )}

      {/* ══════ Stage 6: Rare Flowering — Feathery Panicles ══════ */}
      {stage >= 6 && (
        <g>
          {/* Panicles at culm tips — feathery seed heads */}
          {[
            { x: 100, y: 70, scale: 1.0 },
            { x: 92, y: 82, scale: 0.85 },
            { x: 108, y: 77, scale: 0.9 },
            { x: 82, y: 92, scale: 0.7 },
            { x: 118, y: 97, scale: 0.7 },
          ].map((p, pi) => (
            <g
              key={`panicle-${pi}`}
              transform={`translate(${p.x}, ${p.y}) scale(${p.scale})`}
              filter={`url(#${pfx('softShadow')})`}
            >
              {/* Central panicle stalk */}
              <line x1="0" y1="0" x2="0" y2="-18" stroke="#8a9a60" strokeWidth="0.8" opacity="0.6" />

              {/* Feathery branches radiating from stalk */}
              {Array.from({ length: 7 }, (_, i) => {
                const angle = -80 + i * 22;
                const len = 8 + (i % 3) * 3;
                const yOff = -3 - i * 2;
                return (
                  <g key={`pan-br-${i}`} transform={`translate(0, ${yOff})`}>
                    {/* Branch line */}
                    <line
                      x1="0"
                      y1="0"
                      x2={len * Math.cos((angle * Math.PI) / 180)}
                      y2={len * Math.sin((angle * Math.PI) / 180)}
                      stroke="#a0a868"
                      strokeWidth="0.5"
                      opacity="0.5"
                    />
                    {/* Tiny seed clusters */}
                    {Array.from({ length: 3 }, (_, j) => {
                      const t = (j + 1) / 4;
                      const sx = t * len * Math.cos((angle * Math.PI) / 180);
                      const sy = t * len * Math.sin((angle * Math.PI) / 180);
                      return (
                        <ellipse
                          key={`seed-${j}`}
                          cx={sx}
                          cy={sy}
                          rx="1.2"
                          ry="0.6"
                          fill={`url(#${pfx('bamPanicle')})`}
                          opacity={0.5 + j * 0.1}
                          transform={`rotate(${angle} ${sx} ${sy})`}
                        />
                      );
                    })}
                  </g>
                );
              })}

              {/* Dangling pollen wisps */}
              <path d="M -3 -14 C -4 -18 -2 -20 -1 -22" stroke="#c8c490" strokeWidth="0.3" fill="none" opacity="0.35" />
              <path d="M 2 -12 C 3 -16 4 -18 3 -20" stroke="#c8c490" strokeWidth="0.3" fill="none" opacity="0.3" />
              <path d="M -1 -16 C -2 -19 0 -21 1 -23" stroke="#c8c490" strokeWidth="0.25" fill="none" opacity="0.25" />
            </g>
          ))}
        </g>
      )}

      {/* ══════ Stage 7: Harvest Glow + Floating Leaf Particles ══════ */}
      {stage >= 7 && (
        <g>
          {/* Golden harvest glow */}
          <circle
            cx="100"
            cy="140"
            r="80"
            fill={`url(#${pfx('harvestGlow')})`}
            className="animate-pulse"
          />

          {/* Floating leaf particles */}
          {[
            { x: 65, y: 70, angle: 30, delay: '0s' },
            { x: 140, y: 60, angle: -25, delay: '1.2s' },
            { x: 50, y: 95, angle: 45, delay: '2.5s' },
            { x: 150, y: 85, angle: -40, delay: '3.8s' },
            { x: 130, y: 55, angle: 15, delay: '1.8s' },
            { x: 75, y: 50, angle: -50, delay: '0.6s' },
          ].map((p, i) => (
            <g
              key={`float-${i}`}
              className="animate-float-away"
              style={{ animationDelay: p.delay }}
            >
              {/* Tiny bamboo leaf shape */}
              <path
                d={`M ${p.x} ${p.y}
                    C ${p.x + 3} ${p.y - 1.5} ${p.x + 7} ${p.y - 2} ${p.x + 10} ${p.y}
                    C ${p.x + 7} ${p.y + 2} ${p.x + 3} ${p.y + 1.5} ${p.x} ${p.y}`}
                fill="#68b058"
                opacity="0.5"
                transform={`rotate(${p.angle} ${p.x} ${p.y})`}
              />
              <line
                x1={p.x}
                y1={p.y}
                x2={p.x + 9}
                y2={p.y}
                stroke="#3d6020"
                strokeWidth="0.3"
                opacity="0.3"
                transform={`rotate(${p.angle} ${p.x} ${p.y})`}
              />
            </g>
          ))}
        </g>
      )}
    </g>
  );
}
