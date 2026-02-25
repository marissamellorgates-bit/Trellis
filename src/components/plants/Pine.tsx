export function pineGradients(pfx: (name: string) => string) {
  return (
    <>
      {/* Needle cluster gradient — dark forest green */}
      <linearGradient id={pfx('pinNeedle')} x1="0" y1="0" x2="0.6" y2="1">
        <stop offset="0%" stopColor="#3d8030" />
        <stop offset="40%" stopColor="#2d6b25" />
        <stop offset="100%" stopColor="#1a4a14" />
      </linearGradient>

      {/* Trunk gradient — brown bark */}
      <linearGradient id={pfx('pinTrunk')} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#3a1e0c" />
        <stop offset="20%" stopColor="#4a2c14" />
        <stop offset="50%" stopColor="#6b4528" />
        <stop offset="80%" stopColor="#4a2c14" />
        <stop offset="100%" stopColor="#3a1e0c" />
      </linearGradient>

      {/* Pine cone gradient */}
      <linearGradient id={pfx('pinCone')} x1="0.3" y1="0" x2="0.7" y2="1">
        <stop offset="0%" stopColor="#8b6d3f" />
        <stop offset="50%" stopColor="#7a5c30" />
        <stop offset="100%" stopColor="#6b5030" />
      </linearGradient>

      {/* Foliage tier radial — for depth on triangular layers */}
      <radialGradient id={pfx('pinTier')} cx="50%" cy="60%" r="60%">
        <stop offset="0%" stopColor="#2d6b25" />
        <stop offset="50%" stopColor="#225a1e" />
        <stop offset="100%" stopColor="#1a4a14" />
      </radialGradient>

      {/* Seed gradient — light brown pine nut */}
      <linearGradient id={pfx('pinSeed')} x1="0.3" y1="0" x2="0.7" y2="1">
        <stop offset="0%" stopColor="#d4c098" />
        <stop offset="40%" stopColor="#c4a878" />
        <stop offset="100%" stopColor="#a08050" />
      </linearGradient>

      {/* Trunk highlight */}
      <linearGradient id={pfx('pinTrunkHi')} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#a07850" stopOpacity="0" />
        <stop offset="40%" stopColor="#b08860" stopOpacity="0.2" />
        <stop offset="60%" stopColor="#a07850" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#a07850" stopOpacity="0" />
      </linearGradient>

      {/* Needle highlight for tips and lighter areas */}
      <linearGradient id={pfx('pinNeedleHi')} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4aa03a" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#2d6b25" stopOpacity="0" />
      </linearGradient>
    </>
  );
}

export function renderPine(stage: number, pfx: (name: string) => string) {
  return (
    <g>
      {/* ── Stage 1-2: Pine Nut Seed — hidden once stem appears ── */}
      {stage >= 1 && stage < 3 && (
        <g transform="translate(100, 262)" filter={`url(#${pfx('softShadow')})`}>
          {/* Shadow on soil */}
          <ellipse cx="1" cy="5" rx="5" ry="2" fill="#3a2518" opacity="0.2" />
          {/* Elongated pine nut body */}
          <ellipse cx="0" cy="0" rx="3.5" ry="8" fill={`url(#${pfx('pinSeed')})`} transform="rotate(-8)" />
          {/* Outline */}
          <ellipse cx="0" cy="0" rx="3.5" ry="8" fill="none" stroke="#8b7040" strokeWidth="0.4" transform="rotate(-8)" />
          {/* Center seam line */}
          <path d="M 0 -6 C 0.3 -3 0.3 3 0 6" stroke="#9a8050" strokeWidth="0.6" fill="none" opacity="0.4" transform="rotate(-8)" />
          {/* Highlight */}
          <ellipse cx="-1" cy="-2" rx="1.5" ry="4" fill="#e8d8b0" opacity="0.2" transform="rotate(-8)" />
          {/* Pointed tip */}
          <path d="M -0.5 -7.5 C 0 -9 0.5 -7.5 0 -7" fill="#b09060" opacity="0.6" transform="rotate(-8)" />
        </g>
      )}

      {/* ── Stage 2: Roots + Tiny Seedling ── */}
      {stage >= 2 && (
        <g>
          {/* Underground roots */}
          <g opacity="0.6">
            <path d="M 100 266 C 98 274 94 282 90 290" stroke="#8b6d4a" strokeWidth="1.4" fill="none" strokeLinecap="round" />
            <path d="M 100 266 C 103 275 108 284 114 292" stroke="#8b6d4a" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <path d="M 100 270 C 95 275 88 280 83 284" stroke="#8b6d4a" strokeWidth="0.8" fill="none" strokeLinecap="round" />
            <path d="M 93 282 C 90 286 86 289 82 291" stroke="#8b6d4a" strokeWidth="0.5" fill="none" strokeLinecap="round" />
            <path d="M 110 284 C 114 288 118 291 122 292" stroke="#8b6d4a" strokeWidth="0.5" fill="none" strokeLinecap="round" />
            <path d="M 96 287 C 93 290 90 292 87 293" stroke="#8b6d4a" strokeWidth="0.35" fill="none" strokeLinecap="round" />
          </g>
          {/* Tiny seedling emerging — just a small stem with a few needle sprigs */}
          <g filter={`url(#${pfx('softShadow')})`}>
            <line x1="100" y1="262" x2="100" y2="252" stroke="#4a2c14" strokeWidth="1.5" strokeLinecap="round" />
            {/* Needle tuft at top */}
            <path d="M 100 253 L 96 249" stroke="#2d6b25" strokeWidth="0.8" strokeLinecap="round" />
            <path d="M 100 253 L 104 249" stroke="#2d6b25" strokeWidth="0.8" strokeLinecap="round" />
            <path d="M 100 253 L 100 247" stroke="#3d8030" strokeWidth="0.8" strokeLinecap="round" />
            <path d="M 100 254 L 97 251" stroke="#1a4a14" strokeWidth="0.6" strokeLinecap="round" />
            <path d="M 100 254 L 103 251" stroke="#1a4a14" strokeWidth="0.6" strokeLinecap="round" />
          </g>
        </g>
      )}

      {/* ── Stage 3: Young Sapling ── */}
      {stage >= 3 && (() => {
        const trunkTop = stage >= 5 ? 85 : stage >= 4 ? 150 : 200;
        const trunkW = stage >= 5 ? 6 : stage >= 4 ? 4.5 : 3;
        return (
          <g>
            {/* Trunk — straight central column */}
            <g filter={`url(#${pfx('softShadow')})`}>
              {/* Shadow */}
              <line x1="102" y1="262" x2="102" y2={trunkTop + 10} stroke="#1a0e05" strokeWidth={trunkW * 0.5} strokeLinecap="round" opacity="0.12" />
              {/* Main trunk */}
              <line x1="100" y1="262" x2="100" y2={trunkTop + 8} stroke={`url(#${pfx('pinTrunk')})`} strokeWidth={trunkW} strokeLinecap="round" />
              {/* Bark texture lines */}
              {stage >= 4 && (
                <g opacity="0.3">
                  <line x1="99" y1="255" x2="99" y2="248" stroke="#3a1e0c" strokeWidth="0.4" />
                  <line x1="101" y1="240" x2="101" y2="232" stroke="#3a1e0c" strokeWidth="0.4" />
                  <line x1="99.5" y1="225" x2="99.5" y2="218" stroke="#3a1e0c" strokeWidth="0.35" />
                  <line x1="100.5" y1="210" x2="100.5" y2="202" stroke="#3a1e0c" strokeWidth="0.35" />
                </g>
              )}
              {/* Highlight */}
              <line x1="100" y1="260" x2="100" y2={trunkTop + 10} stroke={`url(#${pfx('pinTrunkHi')})`} strokeWidth={trunkW * 0.4} strokeLinecap="round" />
            </g>

            {/* Young pine — small cone shape with sparse needle clusters */}
            {stage < 4 && (
              <g filter={`url(#${pfx('softShadow')})`}>
                {/* Bottom tier — widest */}
                <polygon
                  points="100,208 82,250 118,250"
                  fill={`url(#${pfx('pinTier')})`}
                  opacity="0.9"
                />
                {/* Needle texture on bottom tier */}
                {[
                  { x1: 90, y1: 242, x2: 85, y2: 238 },
                  { x1: 95, y1: 238, x2: 91, y2: 234 },
                  { x1: 100, y1: 235, x2: 96, y2: 230 },
                  { x1: 105, y1: 238, x2: 109, y2: 234 },
                  { x1: 110, y1: 242, x2: 114, y2: 238 },
                  { x1: 100, y1: 242, x2: 100, y2: 237 },
                ].map((n, i) => (
                  <line key={`s3-n-${i}`} x1={n.x1} y1={n.y1} x2={n.x2} y2={n.y2} stroke="#3d8030" strokeWidth="0.7" strokeLinecap="round" opacity="0.6" />
                ))}
                {/* Top tier — narrower, overlapping */}
                <polygon
                  points="100,200 89,232 111,232"
                  fill={`url(#${pfx('pinNeedle')})`}
                  opacity="0.85"
                />
                {/* Needle tip highlights */}
                <path d="M 92 228 L 88 224" stroke="#3d8030" strokeWidth="0.6" strokeLinecap="round" opacity="0.5" />
                <path d="M 108 228 L 112 224" stroke="#3d8030" strokeWidth="0.6" strokeLinecap="round" opacity="0.5" />
                <path d="M 100 205 L 97 210" stroke="#3d8030" strokeWidth="0.5" strokeLinecap="round" opacity="0.4" />
                <path d="M 100 205 L 103 210" stroke="#3d8030" strokeWidth="0.5" strokeLinecap="round" opacity="0.4" />
              </g>
            )}
          </g>
        );
      })()}

      {/* ── Stage 4: Growing Conical Tree ── */}
      {stage >= 4 && stage < 5 && (
        <g filter={`url(#${pfx('softShadow')})`}>
          {/* Tier 1 — bottom, widest */}
          <polygon
            points="100,170 70,250 130,250"
            fill={`url(#${pfx('pinTier')})`}
          />
          {/* Tier 2 — middle */}
          <polygon
            points="100,158 76,222 124,222"
            fill={`url(#${pfx('pinNeedle')})`}
            opacity="0.92"
          />
          {/* Tier 3 — upper */}
          <polygon
            points="100,150 82,198 118,198"
            fill={`url(#${pfx('pinTier')})`}
            opacity="0.95"
          />
          {/* Top spire */}
          <polygon
            points="100,148 91,180 109,180"
            fill={`url(#${pfx('pinNeedle')})`}
          />

          {/* Branch lines angling downward */}
          {[
            { x1: 100, y1: 180, x2: 75, y2: 238 },
            { x1: 100, y1: 180, x2: 125, y2: 238 },
            { x1: 100, y1: 190, x2: 78, y2: 228 },
            { x1: 100, y1: 190, x2: 122, y2: 228 },
            { x1: 100, y1: 170, x2: 84, y2: 210 },
            { x1: 100, y1: 170, x2: 116, y2: 210 },
            { x1: 100, y1: 162, x2: 88, y2: 192 },
            { x1: 100, y1: 162, x2: 112, y2: 192 },
          ].map((b, i) => (
            <line key={`b4-${i}`} x1={b.x1} y1={b.y1} x2={b.x2} y2={b.y2} stroke="#1a4a14" strokeWidth="0.6" strokeLinecap="round" opacity="0.3" />
          ))}

          {/* Needle cluster details */}
          {[
            { cx: 80, cy: 235, r: 6 },
            { cx: 120, cy: 235, r: 6 },
            { cx: 85, cy: 220, r: 5 },
            { cx: 115, cy: 220, r: 5 },
            { cx: 90, cy: 205, r: 4.5 },
            { cx: 110, cy: 205, r: 4.5 },
            { cx: 92, cy: 188, r: 4 },
            { cx: 108, cy: 188, r: 4 },
          ].map((c, i) => (
            <circle key={`nc4-${i}`} cx={c.cx} cy={c.cy} r={c.r} fill={`url(#${pfx('pinNeedle')})`} opacity="0.5" />
          ))}

          {/* Highlight shimmer on tiers */}
          <polygon
            points="100,168 86,210 114,210"
            fill={`url(#${pfx('pinNeedleHi')})`}
            opacity="0.25"
          />
        </g>
      )}

      {/* ── Stage 5: Full Mature Pine — Classic Christmas Tree ── */}
      {stage >= 5 && (
        <g filter={`url(#${pfx('softShadow')})`}>
          {/* Tier 1 — bottom, widest */}
          <polygon
            points="100,130 58,258 142,258"
            fill={`url(#${pfx('pinTier')})`}
          />
          {/* Tier 2 */}
          <polygon
            points="100,118 65,228 135,228"
            fill={`url(#${pfx('pinNeedle')})`}
            opacity="0.93"
          />
          {/* Tier 3 */}
          <polygon
            points="100,108 72,200 128,200"
            fill={`url(#${pfx('pinTier')})`}
            opacity="0.95"
          />
          {/* Tier 4 */}
          <polygon
            points="100,98 78,175 122,175"
            fill={`url(#${pfx('pinNeedle')})`}
            opacity="0.95"
          />
          {/* Tier 5 — top */}
          <polygon
            points="100,85 85,148 115,148"
            fill={`url(#${pfx('pinTier')})`}
          />
          {/* Apex spire */}
          <polygon
            points="100,82 93,120 107,120"
            fill={`url(#${pfx('pinNeedle')})`}
          />

          {/* Branch lines — radiating downward from trunk */}
          {[
            { x1: 100, y1: 240, x2: 64, y2: 254 },
            { x1: 100, y1: 240, x2: 136, y2: 254 },
            { x1: 100, y1: 215, x2: 70, y2: 235 },
            { x1: 100, y1: 215, x2: 130, y2: 235 },
            { x1: 100, y1: 190, x2: 76, y2: 210 },
            { x1: 100, y1: 190, x2: 124, y2: 210 },
            { x1: 100, y1: 165, x2: 82, y2: 185 },
            { x1: 100, y1: 165, x2: 118, y2: 185 },
            { x1: 100, y1: 140, x2: 86, y2: 160 },
            { x1: 100, y1: 140, x2: 114, y2: 160 },
            { x1: 100, y1: 120, x2: 90, y2: 138 },
            { x1: 100, y1: 120, x2: 110, y2: 138 },
          ].map((b, i) => (
            <line key={`b5-${i}`} x1={b.x1} y1={b.y1} x2={b.x2} y2={b.y2} stroke="#1a4a14" strokeWidth="0.7" strokeLinecap="round" opacity="0.25" />
          ))}

          {/* Needle cluster circles for texture */}
          {[
            { cx: 68, cy: 248, r: 7 },
            { cx: 132, cy: 248, r: 7 },
            { cx: 75, cy: 232, r: 6.5 },
            { cx: 125, cy: 232, r: 6.5 },
            { cx: 80, cy: 215, r: 6 },
            { cx: 120, cy: 215, r: 6 },
            { cx: 82, cy: 198, r: 5.5 },
            { cx: 118, cy: 198, r: 5.5 },
            { cx: 86, cy: 180, r: 5 },
            { cx: 114, cy: 180, r: 5 },
            { cx: 90, cy: 162, r: 4.5 },
            { cx: 110, cy: 162, r: 4.5 },
            { cx: 92, cy: 145, r: 4 },
            { cx: 108, cy: 145, r: 4 },
            { cx: 95, cy: 130, r: 3.5 },
            { cx: 105, cy: 130, r: 3.5 },
          ].map((c, i) => (
            <circle key={`nc5-${i}`} cx={c.cx} cy={c.cy} r={c.r} fill="#1a4a14" opacity="0.35" />
          ))}

          {/* Highlight on upper tiers */}
          <polygon
            points="100,95 82,168 118,168"
            fill={`url(#${pfx('pinNeedleHi')})`}
            opacity="0.2"
          />

          {/* Scattered needle tips — small dashes for organic feel */}
          {[
            { x: 72, y: 240, a: -30 }, { x: 128, y: 242, a: 30 },
            { x: 78, y: 222, a: -25 }, { x: 122, y: 224, a: 25 },
            { x: 84, y: 202, a: -20 }, { x: 116, y: 204, a: 20 },
            { x: 88, y: 182, a: -15 }, { x: 112, y: 184, a: 15 },
            { x: 92, y: 158, a: -10 }, { x: 108, y: 160, a: 10 },
          ].map((n, i) => (
            <line key={`nt5-${i}`} x1={n.x} y1={n.y} x2={n.x + 4 * Math.cos((n.a * Math.PI) / 180)} y2={n.y + 4 * Math.sin((n.a * Math.PI) / 180)} stroke="#3d8030" strokeWidth="0.6" strokeLinecap="round" opacity="0.45" />
          ))}
        </g>
      )}

      {/* ── Stage 6: Pine Cones ── */}
      {stage >= 6 && (
        <g>
          {[
            { cx: 78, cy: 210, rot: -15, scale: 1 },
            { cx: 122, cy: 218, rot: 12, scale: 0.9 },
            { cx: 88, cy: 178, rot: -8, scale: 0.85 },
            { cx: 115, cy: 190, rot: 10, scale: 0.8 },
          ].map((cone, i) => (
            <g key={`cone-${i}`} transform={`translate(${cone.cx}, ${cone.cy}) rotate(${cone.rot}) scale(${cone.scale})`} filter={`url(#${pfx('softShadow')})`}>
              {/* Stem connecting to branch */}
              <line x1="0" y1="-6" x2="0" y2="-9" stroke="#4a2c14" strokeWidth="1" strokeLinecap="round" />
              {/* Main cone body — oval */}
              <ellipse cx="0" cy="0" rx="4.5" ry="8" fill={`url(#${pfx('pinCone')})`} />
              {/* Scale texture — overlapping arcs */}
              <path d="M -3 -5 C -1 -4 1 -4 3 -5" stroke="#6b5030" strokeWidth="0.5" fill="none" opacity="0.6" />
              <path d="M -4 -2.5 C -1.5 -1.5 1.5 -1.5 4 -2.5" stroke="#6b5030" strokeWidth="0.5" fill="none" opacity="0.6" />
              <path d="M -4.2 0 C -1.5 1 1.5 1 4.2 0" stroke="#6b5030" strokeWidth="0.5" fill="none" opacity="0.6" />
              <path d="M -4 2.5 C -1.5 3.5 1.5 3.5 4 2.5" stroke="#6b5030" strokeWidth="0.5" fill="none" opacity="0.6" />
              <path d="M -3 5 C -1 6 1 6 3 5" stroke="#6b5030" strokeWidth="0.5" fill="none" opacity="0.6" />
              {/* Highlight */}
              <ellipse cx="-1" cy="-1" rx="2" ry="4" fill="#a08050" opacity="0.15" />
              {/* Outline */}
              <ellipse cx="0" cy="0" rx="4.5" ry="8" fill="none" stroke="#5a4025" strokeWidth="0.4" opacity="0.5" />
            </g>
          ))}
        </g>
      )}

      {/* ── Stage 7: Harvest — Golden Glow + Floating Needles ── */}
      {stage >= 7 && (
        <g>
          {/* Golden harvest aura */}
          <circle cx="100" cy="160" r="80" fill={`url(#${pfx('harvestGlow')})`} className="animate-pulse" />

          {/* Floating needle particles */}
          {[
            { x: 55, y: 100, rot: 25, delay: '0s' },
            { x: 145, y: 95, rot: -20, delay: '1.2s' },
            { x: 48, y: 130, rot: 40, delay: '2.5s' },
            { x: 152, y: 125, rot: -35, delay: '3.8s' },
            { x: 65, y: 80, rot: 15, delay: '1.8s' },
            { x: 135, y: 85, rot: -10, delay: '0.6s' },
            { x: 75, y: 110, rot: 30, delay: '2.2s' },
          ].map((n, i) => (
            <g key={`float-${i}`} className="animate-float-away" style={{ animationDelay: n.delay }}>
              {/* Individual pine needle — thin elongated shape */}
              <line
                x1={n.x - 3 * Math.cos((n.rot * Math.PI) / 180)}
                y1={n.y - 3 * Math.sin((n.rot * Math.PI) / 180)}
                x2={n.x + 3 * Math.cos((n.rot * Math.PI) / 180)}
                y2={n.y + 3 * Math.sin((n.rot * Math.PI) / 180)}
                stroke="#3d8030"
                strokeWidth="0.8"
                strokeLinecap="round"
                opacity="0.7"
              />
              {/* Second needle in cluster */}
              <line
                x1={n.x - 2.5 * Math.cos(((n.rot + 25) * Math.PI) / 180)}
                y1={n.y - 2.5 * Math.sin(((n.rot + 25) * Math.PI) / 180)}
                x2={n.x + 2.5 * Math.cos(((n.rot + 25) * Math.PI) / 180)}
                y2={n.y + 2.5 * Math.sin(((n.rot + 25) * Math.PI) / 180)}
                stroke="#2d6b25"
                strokeWidth="0.6"
                strokeLinecap="round"
                opacity="0.5"
              />
            </g>
          ))}
        </g>
      )}
    </g>
  );
}
