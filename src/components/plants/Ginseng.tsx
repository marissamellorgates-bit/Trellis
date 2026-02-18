export function ginsengGradients(pfx: (name: string) => string) {
  return (
    <>
      {/* Root body gradient — warm tan/gold, human-shaped root */}
      <linearGradient id={pfx('ginRoot')} x1="0" y1="0" x2="0.3" y2="1">
        <stop offset="0%" stopColor="#d4a862" />
        <stop offset="40%" stopColor="#c49452" />
        <stop offset="100%" stopColor="#8a6a3a" />
      </linearGradient>

      {/* Root highlight — lighter golden sheen */}
      <linearGradient id={pfx('ginRootHi')} x1="0.2" y1="0" x2="0.8" y2="1">
        <stop offset="0%" stopColor="#e8c878" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#d4a862" stopOpacity="0" />
      </linearGradient>

      {/* Root glow — golden aura around the precious root */}
      <radialGradient id={pfx('ginRootGlow')} cx="50%" cy="40%" r="55%">
        <stop offset="0%" stopColor="#ffd700" stopOpacity="0.25" />
        <stop offset="60%" stopColor="#d4af37" stopOpacity="0.08" />
        <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
      </radialGradient>

      {/* Stem gradient — thin green */}
      <linearGradient id={pfx('ginStem')} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#486a30" />
        <stop offset="30%" stopColor="#5a7a40" />
        <stop offset="70%" stopColor="#5a7a40" />
        <stop offset="100%" stopColor="#486a30" />
      </linearGradient>

      {/* Compound leaf gradient — deep green */}
      <linearGradient id={pfx('ginLeaf')} x1="0" y1="0" x2="0.6" y2="1">
        <stop offset="0%" stopColor="#5a8a3c" />
        <stop offset="50%" stopColor="#4a7a30" />
        <stop offset="100%" stopColor="#3a6a2a" />
      </linearGradient>

      {/* Leaf highlight */}
      <linearGradient id={pfx('ginLeafHi')} x1="0.3" y1="0" x2="0.7" y2="1">
        <stop offset="0%" stopColor="#78a858" stopOpacity="0.45" />
        <stop offset="100%" stopColor="#5a8a3c" stopOpacity="0" />
      </linearGradient>

      {/* Berry gradient — bright red */}
      <radialGradient id={pfx('ginBerry')} cx="35%" cy="30%" r="55%">
        <stop offset="0%" stopColor="#e03040" />
        <stop offset="60%" stopColor="#c41e3a" />
        <stop offset="100%" stopColor="#9a1828" />
      </radialGradient>

      {/* Flower gradient — greenish-white tiny umbel */}
      <radialGradient id={pfx('ginFlower')} cx="45%" cy="40%" r="55%">
        <stop offset="0%" stopColor="#e8f0d8" />
        <stop offset="50%" stopColor="#c8d8a8" />
        <stop offset="100%" stopColor="#a0b880" />
      </radialGradient>

      {/* Underground soil cross-section — semi-transparent earth */}
      <linearGradient id={pfx('ginSoilCut')} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#5a3e28" stopOpacity="0.35" />
        <stop offset="30%" stopColor="#4a3020" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#3a2518" stopOpacity="0.15" />
      </linearGradient>
    </>
  );
}

export function renderGinseng(stage: number, pfx: (name: string) => string) {
  /* ── Helper: draw a single compound leaflet (5 leaflets in a palmate whorl) ── */
  const compoundLeaf = (
    cx: number,
    cy: number,
    scale: number,
    rotation: number,
    key: string,
  ) => {
    const s = scale;
    return (
      <g key={key} transform={`translate(${cx}, ${cy}) rotate(${rotation}) scale(${s})`}>
        {/* Petiole (leaf stem) */}
        <line x1="0" y1="0" x2="0" y2="-8" stroke="#5a7a40" strokeWidth="0.8" opacity="0.7" />
        {/* 5 leaflets radiating from tip of petiole */}
        {[
          { angle: -60, len: 14, w: 5 },
          { angle: -30, len: 16, w: 5.5 },
          { angle: 0, len: 18, w: 6 },
          { angle: 30, len: 16, w: 5.5 },
          { angle: 60, len: 14, w: 5 },
        ].map((lf, i) => (
          <g key={`lf-${i}`} transform={`translate(0, -8) rotate(${lf.angle})`}>
            {/* Leaflet body — serrated elliptical shape */}
            <path
              d={`M 0 0
                  C ${lf.w * 0.4} ${-lf.len * 0.15} ${lf.w * 0.5} ${-lf.len * 0.5} ${lf.w * 0.15} ${-lf.len}
                  C 0 ${-lf.len * 1.05} 0 ${-lf.len * 1.05} ${-lf.w * 0.15} ${-lf.len}
                  C ${-lf.w * 0.5} ${-lf.len * 0.5} ${-lf.w * 0.4} ${-lf.len * 0.15} 0 0`}
              fill={`url(#${pfx('ginLeaf')})`}
              opacity="0.9"
            />
            {/* Leaflet highlight */}
            <path
              d={`M 0 ${-lf.len * 0.1}
                  C ${lf.w * 0.25} ${-lf.len * 0.2} ${lf.w * 0.3} ${-lf.len * 0.5} ${lf.w * 0.05} ${-lf.len * 0.85}
                  C ${-lf.w * 0.1} ${-lf.len * 0.6} ${-lf.w * 0.15} ${-lf.len * 0.3} 0 ${-lf.len * 0.1}`}
              fill={`url(#${pfx('ginLeafHi')})`}
              opacity="0.35"
            />
            {/* Midrib */}
            <line x1="0" y1="0" x2="0" y2={-lf.len * 0.95} stroke="#2a5a1a" strokeWidth="0.3" opacity="0.4" />
            {/* Serration marks */}
            {Array.from({ length: 4 }, (_, j) => {
              const ty = -lf.len * (0.2 + j * 0.18);
              const tw = lf.w * (0.35 - j * 0.04);
              return (
                <g key={`sr-${j}`}>
                  <line x1={-tw} y1={ty} x2={-tw + 0.5} y2={ty - 0.8} stroke="#3a6a2a" strokeWidth="0.2" opacity="0.25" />
                  <line x1={tw} y1={ty} x2={tw - 0.5} y2={ty - 0.8} stroke="#3a6a2a" strokeWidth="0.2" opacity="0.25" />
                </g>
              );
            })}
          </g>
        ))}
      </g>
    );
  };

  /* ── Helper: draw the human-shaped root (the star of the show) ── */
  const humanRoot = (
    cx: number,
    cy: number,
    scale: number,
    key: string,
    showGlow: boolean = false,
    showRings: boolean = false,
  ) => {
    const s = scale;
    return (
      <g key={key} transform={`translate(${cx}, ${cy}) scale(${s})`}>
        {/* Golden glow behind root (stages 6+) */}
        {showGlow && (
          <ellipse cx="0" cy="8" rx="22" ry="28" fill={`url(#${pfx('ginRootGlow')})`} />
        )}

        {/* Main root body — human torso shape */}
        <path
          d={`M -4 -8 C -5 -6 -6 -2 -6 4
              C -6 8 -5 12 -4 16
              C -3 18 -3 20 -5 24
              C -6 28 -8 32 -9 36
              L -7 37 C -5 34 -3 28 -2 24
              C -1 20 0 18 0 16
              C 0 18 1 20 2 24
              C 3 28 5 34 7 37
              L 9 36 C 8 32 6 28 5 24
              C 3 20 3 18 4 16
              C 5 12 6 8 6 4
              C 6 -2 5 -6 4 -8
              C 2 -10 -2 -10 -4 -8 Z`}
          fill={`url(#${pfx('ginRoot')})`}
          filter={`url(#${pfx('softShadow')})`}
        />

        {/* Root highlight */}
        <path
          d={`M -2 -6 C -3 -3 -3 2 -3 6
              C -3 10 -2 14 -1 16
              L 1 16 C 2 14 3 10 3 6
              C 3 2 3 -3 2 -6 Z`}
          fill={`url(#${pfx('ginRootHi')})`}
          opacity="0.3"
        />

        {/* Arm-like side roots (left) */}
        <path
          d={`M -5 2 C -8 0 -12 -1 -16 0
              C -18 1 -19 3 -18 4`}
          stroke="#c49452" strokeWidth="2" fill="none" strokeLinecap="round"
        />
        <path
          d="M -18 4 C -20 5 -21 4 -22 3"
          stroke="#b08442" strokeWidth="1.2" fill="none" strokeLinecap="round"
        />

        {/* Arm-like side roots (right) */}
        <path
          d={`M 5 2 C 8 0 12 -1 16 0
              C 18 1 19 3 18 4`}
          stroke="#c49452" strokeWidth="2" fill="none" strokeLinecap="round"
        />
        <path
          d="M 18 4 C 20 5 21 4 22 3"
          stroke="#b08442" strokeWidth="1.2" fill="none" strokeLinecap="round"
        />

        {/* Fine root tendrils at "feet" */}
        <path d="M -9 36 C -11 38 -13 40 -14 42" stroke="#a07a40" strokeWidth="0.7" fill="none" strokeLinecap="round" />
        <path d="M -8 37 C -9 40 -8 43 -7 45" stroke="#a07a40" strokeWidth="0.5" fill="none" strokeLinecap="round" />
        <path d="M 9 36 C 11 38 13 40 14 42" stroke="#a07a40" strokeWidth="0.7" fill="none" strokeLinecap="round" />
        <path d="M 8 37 C 9 40 8 43 7 45" stroke="#a07a40" strokeWidth="0.5" fill="none" strokeLinecap="round" />

        {/* Hair roots from "head" */}
        <path d="M -3 -8 C -4 -12 -5 -14 -6 -15" stroke="#b08442" strokeWidth="0.6" fill="none" strokeLinecap="round" />
        <path d="M 0 -9 C 0 -13 0 -15 0 -16" stroke="#b08442" strokeWidth="0.5" fill="none" strokeLinecap="round" />
        <path d="M 3 -8 C 4 -12 5 -14 6 -15" stroke="#b08442" strokeWidth="0.6" fill="none" strokeLinecap="round" />

        {/* Wrinkle/ring texture on root body (stages 5+) */}
        {showRings && (
          <g opacity="0.3">
            <path d="M -5 0 C -3 -0.5 3 -0.5 5 0" stroke="#8a6a3a" strokeWidth="0.5" fill="none" />
            <path d="M -5 5 C -3 4.5 3 4.5 5 5" stroke="#8a6a3a" strokeWidth="0.5" fill="none" />
            <path d="M -5 10 C -3 9.5 3 9.5 5 10" stroke="#8a6a3a" strokeWidth="0.5" fill="none" />
            <path d="M -4 15 C -2 14.5 2 14.5 4 15" stroke="#8a6a3a" strokeWidth="0.5" fill="none" />
            <path d="M -4 20 C -2 19.5 2 19.5 4 20" stroke="#8a6a3a" strokeWidth="0.4" fill="none" />
          </g>
        )}
      </g>
    );
  };

  return (
    <g>
      {/* ══════ Stage 1: Seed — small red berry-like seed on soil ══════ */}
      {stage >= 1 && stage < 2 && (
        <g transform="translate(100, 261)" filter={`url(#${pfx('softShadow')})`}>
          {/* Shadow on soil */}
          <ellipse cx="0" cy="3" rx="5" ry="1.5" fill="#3a2518" opacity="0.15" />
          {/* Berry seed body */}
          <ellipse cx="0" cy="0" rx="3.5" ry="3" fill={`url(#${pfx('ginBerry')})`} />
          {/* Specular highlight */}
          <ellipse cx="-1" cy="-1" rx="1.2" ry="0.8" fill="#f0a0a0" opacity="0.35" />
          {/* Tiny stem nub on top */}
          <line x1="0" y1="-3" x2="0" y2="-5" stroke="#5a7a40" strokeWidth="0.6" strokeLinecap="round" />
        </g>
      )}

      {/* ══════ Underground cross-section backdrop (stages 2+) ══════ */}
      {stage >= 2 && (
        <g>
          {/* Semi-transparent soil cross-section window */}
          <rect
            x="60" y="264" width="80" height="35"
            fill={`url(#${pfx('ginSoilCut')})`}
            rx="4"
          />
          {/* Dividing line at soil surface */}
          <line
            x1="62" y1="264" x2="138" y2="264"
            stroke="#8a6a3a" strokeWidth="0.6" opacity="0.35"
            strokeDasharray="3 2"
          />
          {/* Fine soil particles in cross-section */}
          <g opacity="0.2">
            <circle cx="75" cy="274" r="0.6" fill="#6b4e30" />
            <circle cx="90" cy="280" r="0.5" fill="#7a5e3a" />
            <circle cx="115" cy="276" r="0.7" fill="#6b4e30" />
            <circle cx="125" cy="282" r="0.4" fill="#5a3e28" />
            <circle cx="80" cy="288" r="0.5" fill="#7a5e3a" />
            <circle cx="110" cy="290" r="0.6" fill="#6b4e30" />
          </g>
        </g>
      )}

      {/* ══════ Stage 2: Seedling — single thin stem, one compound leaf, tiny root ══════ */}
      {stage >= 2 && (
        <g>
          {/* Thin stem */}
          <line
            x1="100" y1="262" x2="100" y2={stage < 3 ? 232 : stage < 4 ? 210 : stage < 5 ? 190 : 185}
            stroke={`url(#${pfx('ginStem')})`}
            strokeWidth={stage < 3 ? 1.5 : stage < 5 ? 2 : 2.2}
            strokeLinecap="round"
            filter={`url(#${pfx('softShadow')})`}
          />
        </g>
      )}

      {/* Stage 2 only: single compound leaf + tiny root */}
      {stage >= 2 && stage < 3 && (
        <g>
          {/* Single compound leaf */}
          {compoundLeaf(100, 232, 0.55, 0, 'leaf-s2')}

          {/* Tiny forking root below soil */}
          <g filter={`url(#${pfx('softShadow')})`}>
            <path
              d="M 100 264 C 100 270 99 274 97 278"
              stroke="#c49452" strokeWidth="1.5" fill="none" strokeLinecap="round"
            />
            <path
              d="M 100 270 C 101 274 103 276 105 278"
              stroke="#c49452" strokeWidth="1" fill="none" strokeLinecap="round"
            />
            {/* Tiny hair roots */}
            <path d="M 97 278 C 95 280 94 282 93 283" stroke="#a07a40" strokeWidth="0.4" fill="none" strokeLinecap="round" />
            <path d="M 105 278 C 107 280 108 282 108 283" stroke="#a07a40" strokeWidth="0.4" fill="none" strokeLinecap="round" />
          </g>
        </g>
      )}

      {/* ══════ Stage 3: Growing — 2 whorled compound leaves, root becoming human-shaped ══════ */}
      {stage >= 3 && stage < 4 && (
        <g>
          {/* 2 compound leaves in a whorl */}
          {compoundLeaf(100, 214, 0.65, -15, 'leaf-s3a')}
          {compoundLeaf(100, 214, 0.65, 15, 'leaf-s3b')}

          {/* Root below soil — starting to show human shape */}
          <g filter={`url(#${pfx('softShadow')})`}>
            {/* Simple body shape beginning to form */}
            <path
              d={`M 97 264 C 96 268 95 272 95 276
                  C 95 280 96 284 97 288
                  C 97 290 96 292 95 295
                  L 97 296 C 98 293 99 290 99 288
                  C 99 290 100 293 101 296
                  L 103 295 C 102 292 101 290 101 288
                  C 102 284 103 280 103 276
                  C 103 272 102 268 101 264 Z`}
              fill={`url(#${pfx('ginRoot')})`}
            />
            {/* Small side root buds (proto-arms) */}
            <path d="M 95 274 C 93 273 91 273 89 274" stroke="#c49452" strokeWidth="1" fill="none" strokeLinecap="round" />
            <path d="M 103 274 C 105 273 107 273 109 274" stroke="#c49452" strokeWidth="1" fill="none" strokeLinecap="round" />
            {/* Hair roots at tips */}
            <path d="M 95 295 C 93 297 92 298 91 299" stroke="#a07a40" strokeWidth="0.4" fill="none" strokeLinecap="round" />
            <path d="M 103 295 C 105 297 106 298 107 299" stroke="#a07a40" strokeWidth="0.4" fill="none" strokeLinecap="round" />
          </g>
        </g>
      )}

      {/* ══════ Stage 4: Mature plant — 3 compound leaves, clear human-shaped root ══════ */}
      {stage >= 4 && stage < 5 && (
        <g>
          {/* 3 compound leaves in a whorl */}
          {compoundLeaf(100, 194, 0.75, -25, 'leaf-s4a')}
          {compoundLeaf(100, 194, 0.8, 0, 'leaf-s4b')}
          {compoundLeaf(100, 194, 0.75, 25, 'leaf-s4c')}

          {/* Human-shaped root — clear body + legs + arms */}
          {humanRoot(100, 272, 0.8, 'root-s4', false, false)}
        </g>
      )}

      {/* ══════ Stage 5: Flowering — tiny umbel flowers, large detailed root ══════ */}
      {stage >= 5 && stage < 6 && (
        <g>
          {/* 3 compound leaves */}
          {compoundLeaf(100, 192, 0.8, -25, 'leaf-s5a')}
          {compoundLeaf(100, 192, 0.85, 0, 'leaf-s5b')}
          {compoundLeaf(100, 192, 0.8, 25, 'leaf-s5c')}

          {/* Umbel flower cluster at stem top */}
          <g transform="translate(100, 185)" filter={`url(#${pfx('softShadow')})`}>
            {/* Flower stalk */}
            <line x1="0" y1="0" x2="0" y2="-10" stroke="#5a7a40" strokeWidth="0.8" strokeLinecap="round" />
            {/* Small greenish-white flower umbel */}
            {Array.from({ length: 12 }, (_, i) => {
              const angle = (i / 12) * Math.PI * 2;
              const r = 4 + (i % 3);
              const fx = Math.cos(angle) * r;
              const fy = -10 + Math.sin(angle) * r * 0.5;
              return (
                <g key={`fl-${i}`}>
                  <line x1="0" y1="-10" x2={fx} y2={fy} stroke="#7a9a5a" strokeWidth="0.3" opacity="0.5" />
                  <circle cx={fx} cy={fy} r="1.2" fill={`url(#${pfx('ginFlower')})`} opacity="0.85" />
                </g>
              );
            })}
          </g>

          {/* Large human-shaped root with wrinkle rings */}
          {humanRoot(100, 270, 0.95, 'root-s5', false, true)}
        </g>
      )}

      {/* ══════ Stage 6: Berries — bright red berry cluster, magnificent root ══════ */}
      {stage >= 6 && stage < 7 && (
        <g>
          {/* 3 compound leaves */}
          {compoundLeaf(100, 192, 0.8, -25, 'leaf-s6a')}
          {compoundLeaf(100, 192, 0.85, 0, 'leaf-s6b')}
          {compoundLeaf(100, 192, 0.8, 25, 'leaf-s6c')}

          {/* Berry cluster at stem top */}
          <g transform="translate(100, 185)" filter={`url(#${pfx('softShadow')})`}>
            {/* Berry stalks */}
            <line x1="0" y1="0" x2="0" y2="-8" stroke="#5a7a40" strokeWidth="0.8" strokeLinecap="round" />
            {/* Bright red berry cluster */}
            {[
              { x: 0, y: -12, r: 2.5 },
              { x: -3, y: -10, r: 2.2 },
              { x: 3, y: -10, r: 2.3 },
              { x: -1.5, y: -8, r: 2.0 },
              { x: 1.5, y: -8, r: 2.1 },
              { x: -4.5, y: -8, r: 1.8 },
              { x: 4.5, y: -8, r: 1.9 },
              { x: 0, y: -14, r: 2.0 },
              { x: -2.5, y: -13, r: 1.8 },
              { x: 2.5, y: -13, r: 1.9 },
              { x: -5, y: -11, r: 1.6 },
              { x: 5, y: -11, r: 1.7 },
            ].map((b, i) => (
              <g key={`berry-${i}`}>
                <line x1="0" y1="-8" x2={b.x} y2={b.y} stroke="#5a7a40" strokeWidth="0.3" opacity="0.4" />
                <circle cx={b.x} cy={b.y} r={b.r} fill={`url(#${pfx('ginBerry')})`} />
                {/* Berry highlight */}
                <circle cx={b.x - b.r * 0.25} cy={b.y - b.r * 0.3} r={b.r * 0.3} fill="#f0a0a0" opacity="0.3" />
              </g>
            ))}
          </g>

          {/* Magnificent root with glow + rings */}
          {humanRoot(100, 268, 1.1, 'root-s6', true, true)}
        </g>
      )}

      {/* ══════ Stage 7: Harvest — golden glow on ROOT + floating golden root particles ══════ */}
      {stage >= 7 && (
        <g>
          {/* Above ground: modest plant with berries */}
          {compoundLeaf(100, 192, 0.8, -25, 'leaf-s7a')}
          {compoundLeaf(100, 192, 0.85, 0, 'leaf-s7b')}
          {compoundLeaf(100, 192, 0.8, 25, 'leaf-s7c')}

          {/* Berry cluster */}
          <g transform="translate(100, 185)" filter={`url(#${pfx('softShadow')})`}>
            <line x1="0" y1="0" x2="0" y2="-8" stroke="#5a7a40" strokeWidth="0.8" strokeLinecap="round" />
            {[
              { x: 0, y: -12, r: 2.5 },
              { x: -3, y: -10, r: 2.2 },
              { x: 3, y: -10, r: 2.3 },
              { x: -1.5, y: -8, r: 2.0 },
              { x: 1.5, y: -8, r: 2.1 },
              { x: 0, y: -14, r: 2.0 },
              { x: -2.5, y: -13, r: 1.8 },
              { x: 2.5, y: -13, r: 1.9 },
            ].map((b, i) => (
              <g key={`berry7-${i}`}>
                <line x1="0" y1="-8" x2={b.x} y2={b.y} stroke="#5a7a40" strokeWidth="0.3" opacity="0.4" />
                <circle cx={b.x} cy={b.y} r={b.r} fill={`url(#${pfx('ginBerry')})`} />
                <circle cx={b.x - b.r * 0.25} cy={b.y - b.r * 0.3} r={b.r * 0.3} fill="#f0a0a0" opacity="0.3" />
              </g>
            ))}
          </g>

          {/* The magnificent root with full glow */}
          {humanRoot(100, 268, 1.1, 'root-s7', true, true)}

          {/* Harvest glow centered on ROOT (below soil) */}
          <circle
            cx="100"
            cy="285"
            r="60"
            fill={`url(#${pfx('harvestGlow')})`}
            className="animate-pulse"
          />

          {/* Floating golden root particles — shaped like little root pieces */}
          {[
            { x: 70, y: 275, delay: '0s' },
            { x: 135, y: 268, delay: '1.2s' },
            { x: 55, y: 282, delay: '2.5s' },
            { x: 145, y: 280, delay: '3.8s' },
            { x: 120, y: 270, delay: '1.8s' },
            { x: 80, y: 290, delay: '0.6s' },
            { x: 60, y: 265, delay: '2.8s' },
            { x: 140, y: 292, delay: '3.2s' },
          ].map((p, i) => (
            <g key={`float-${i}`} className="animate-float-away" style={{ animationDelay: p.delay }}>
              {/* Tiny golden root-shaped particle */}
              <path
                d={`M ${p.x} ${p.y}
                    C ${p.x + 2} ${p.y - 1} ${p.x + 4} ${p.y - 0.5} ${p.x + 6} ${p.y + 1}
                    C ${p.x + 4} ${p.y + 2} ${p.x + 2} ${p.y + 1.5} ${p.x} ${p.y}`}
                fill="#d4af37"
                opacity="0.55"
              />
              <circle cx={p.x + 3} cy={p.y + 0.5} r="1" fill="#ffd700" opacity="0.3" />
            </g>
          ))}
        </g>
      )}
    </g>
  );
}
