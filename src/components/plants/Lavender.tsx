export function lavenderGradients(pfx: (name: string) => string) {
  return (
    <>
      {/* Flower spike gradient — rich purple */}
      <linearGradient id={pfx('lavFlower')} x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="#6a0dad" />
        <stop offset="40%" stopColor="#7b68ee" />
        <stop offset="100%" stopColor="#9370db" />
      </linearGradient>

      {/* Deep floret gradient — darker purple for individual florets */}
      <radialGradient id={pfx('lavFloret')} cx="40%" cy="35%" r="60%">
        <stop offset="0%" stopColor="#9370db" />
        <stop offset="50%" stopColor="#7b68ee" />
        <stop offset="100%" stopColor="#6a0dad" />
      </radialGradient>

      {/* Silvery-green leaf gradient */}
      <linearGradient id={pfx('lavLeaf')} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#a0b898" />
        <stop offset="50%" stopColor="#8aaa88" />
        <stop offset="100%" stopColor="#6a8a68" />
      </linearGradient>

      {/* Leaf highlight — silvery sheen */}
      <linearGradient id={pfx('lavLeafHighlight')} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#c0d4b8" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#a0b898" stopOpacity="0" />
      </linearGradient>

      {/* Woody stem base gradient */}
      <linearGradient id={pfx('lavStem')} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#7a6a50" />
        <stop offset="30%" stopColor="#8a7a60" />
        <stop offset="70%" stopColor="#8a7a60" />
        <stop offset="100%" stopColor="#7a6a50" />
      </linearGradient>

      {/* Flower stem — green to slightly woody */}
      <linearGradient id={pfx('lavFlowerStem')} x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="#7a8a68" />
        <stop offset="50%" stopColor="#6a8060" />
        <stop offset="100%" stopColor="#5a7050" />
      </linearGradient>

      {/* Seed gradient */}
      <radialGradient id={pfx('lavSeed')} cx="40%" cy="35%" r="60%">
        <stop offset="0%" stopColor="#5a4a38" />
        <stop offset="100%" stopColor="#3a2a1a" />
      </radialGradient>
    </>
  );
}

/** Render a narrow opposite leaf pair at a given height along a stem */
function leafPair(
  cx: number,
  y: number,
  spread: number,
  leafLen: number,
  pfx: (name: string) => string,
  opacity: number = 0.85,
) {
  return (
    <g>
      {/* Left leaf — narrow, slightly curved */}
      <path
        d={`M ${cx} ${y} C ${cx - spread * 0.3} ${y - leafLen * 0.3} ${cx - spread * 0.8} ${y - leafLen * 0.7} ${cx - spread} ${y - leafLen}
            C ${cx - spread * 0.7} ${y - leafLen * 0.6} ${cx - spread * 0.15} ${y - leafLen * 0.15} ${cx} ${y}`}
        fill={`url(#${pfx('lavLeaf')})`}
        opacity={opacity}
      />
      {/* Left leaf silver highlight */}
      <path
        d={`M ${cx} ${y} C ${cx - spread * 0.2} ${y - leafLen * 0.3} ${cx - spread * 0.6} ${y - leafLen * 0.6} ${cx - spread * 0.85} ${y - leafLen * 0.9}`}
        stroke={`url(#${pfx('lavLeafHighlight')})`}
        strokeWidth="0.5"
        fill="none"
        opacity="0.4"
      />
      {/* Right leaf — mirror */}
      <path
        d={`M ${cx} ${y} C ${cx + spread * 0.3} ${y - leafLen * 0.3} ${cx + spread * 0.8} ${y - leafLen * 0.7} ${cx + spread} ${y - leafLen}
            C ${cx + spread * 0.7} ${y - leafLen * 0.6} ${cx + spread * 0.15} ${y - leafLen * 0.15} ${cx} ${y}`}
        fill={`url(#${pfx('lavLeaf')})`}
        opacity={opacity}
      />
      {/* Right leaf silver highlight */}
      <path
        d={`M ${cx} ${y} C ${cx + spread * 0.2} ${y - leafLen * 0.3} ${cx + spread * 0.6} ${y - leafLen * 0.6} ${cx + spread * 0.85} ${y - leafLen * 0.9}`}
        stroke={`url(#${pfx('lavLeafHighlight')})`}
        strokeWidth="0.5"
        fill="none"
        opacity="0.4"
      />
    </g>
  );
}

/** Render the mounded silvery-green foliage base */
function foliageMound(
  cx: number,
  baseY: number,
  width: number,
  height: number,
  leafCount: number,
  pfx: (name: string) => string,
) {
  const leaves = [];
  for (let i = 0; i < leafCount; i++) {
    // Distribute leaves in a dome shape
    const t = (i / (leafCount - 1)) * 2 - 1; // -1 to 1
    const x = cx + t * width * 0.45;
    const y = baseY - Math.abs(t) * height * 0.2; // slight arch
    const angle = t * 35; // splay outward
    const len = height * (0.6 + (1 - Math.abs(t)) * 0.4); // taller in center
    const leafW = 3 + (1 - Math.abs(t)) * 2;

    leaves.push(
      <g key={`mound-leaf-${i}`} transform={`translate(${x}, ${y}) rotate(${angle})`}>
        {/* Narrow upward leaf */}
        <path
          d={`M 0 0 C ${-leafW * 0.5} ${-len * 0.3} ${-leafW * 0.3} ${-len * 0.8} 0 ${-len}
              C ${leafW * 0.3} ${-len * 0.8} ${leafW * 0.5} ${-len * 0.3} 0 0`}
          fill={`url(#${pfx('lavLeaf')})`}
          opacity={0.7 + Math.random() * 0.15}
        />
        {/* Silvery midvein */}
        <line
          x1="0" y1="0" x2="0" y2={-len * 0.85}
          stroke="#b0c8a8"
          strokeWidth="0.3"
          opacity="0.3"
        />
      </g>,
    );
  }
  return <g>{leaves}</g>;
}

/** Render a single flower spike with layered florets */
function flowerSpike(
  cx: number,
  baseY: number,
  topY: number,
  curve: number,
  floretCount: number,
  pfx: (name: string) => string,
  blooming: boolean = false,
  fullBloom: boolean = false,
) {
  const spikeH = baseY - topY;
  const floretZone = spikeH * 0.4; // top 40% of stem has florets

  return (
    <g filter={`url(#${pfx('softShadow')})`}>
      {/* Flower stem */}
      <path
        d={`M ${cx} ${baseY} C ${cx + curve * 0.2} ${baseY - spikeH * 0.3} ${cx + curve * 0.6} ${baseY - spikeH * 0.6} ${cx + curve} ${topY}`}
        stroke={`url(#${pfx('lavFlowerStem')})`}
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />

      {/* Florets clustered at top of spike */}
      {Array.from({ length: floretCount }, (_, i) => {
        const t = i / (floretCount - 1); // 0 (bottom of spike zone) to 1 (tip)
        // Position along the curve
        const frac = 1 - (t * floretZone) / spikeH;
        const fx = cx + curve * frac;
        const fy = topY + t * floretZone;
        // Florets get smaller toward tip
        const size = blooming ? (fullBloom ? 4 : 3) * (1 - t * 0.3) : 2.2 * (1 - t * 0.3);
        const whorls = fullBloom ? 3 : blooming ? 2 : 1;

        return (
          <g key={`floret-${i}`}>
            {/* Calyx whorl layers */}
            {Array.from({ length: whorls }, (_, w) => {
              const wSize = size * (1 - w * 0.2);
              const wOpacity = 0.8 - w * 0.15;
              return (
                <g key={`whorl-${w}`}>
                  {/* Left floret bud */}
                  <ellipse
                    cx={fx - wSize * 0.6 - w * 0.8}
                    cy={fy + w * 1.2}
                    rx={wSize * 0.55}
                    ry={wSize * 0.75}
                    fill={`url(#${pfx('lavFloret')})`}
                    opacity={wOpacity}
                  />
                  {/* Right floret bud */}
                  <ellipse
                    cx={fx + wSize * 0.6 + w * 0.8}
                    cy={fy + w * 1.2}
                    rx={wSize * 0.55}
                    ry={wSize * 0.75}
                    fill={`url(#${pfx('lavFloret')})`}
                    opacity={wOpacity}
                  />
                  {/* Center floret */}
                  {w === 0 && (
                    <ellipse
                      cx={fx}
                      cy={fy}
                      rx={wSize * 0.45}
                      ry={wSize * 0.65}
                      fill={`url(#${pfx('lavFlower')})`}
                      opacity={wOpacity + 0.05}
                    />
                  )}
                </g>
              );
            })}

            {/* Tiny open floret detail (full bloom only) */}
            {fullBloom && i % 2 === 0 && (
              <g>
                <circle cx={fx - size * 0.3} cy={fy} r="0.8" fill="#b8a0e0" opacity="0.6" />
                <circle cx={fx + size * 0.3} cy={fy} r="0.8" fill="#b8a0e0" opacity="0.6" />
              </g>
            )}
          </g>
        );
      })}
    </g>
  );
}

export function renderLavender(stage: number, pfx: (name: string) => string) {
  return (
    <g>
      {/* ── Stage 1: Seed on soil ── */}
      {stage >= 1 && stage < 2 && (
        <g transform="translate(100, 264)" filter={`url(#${pfx('softShadow')})`}>
          {/* Seed shadow */}
          <ellipse cx="0.5" cy="3" rx="4" ry="1.5" fill="#3a2518" opacity="0.15" />
          {/* Seed body — tiny dark oval */}
          <ellipse cx="0" cy="0" rx="3" ry="4.5" fill={`url(#${pfx('lavSeed')})`} />
          {/* Seed outline */}
          <ellipse cx="0" cy="0" rx="3" ry="4.5" fill="none" stroke="#3a2a1a" strokeWidth="0.4" opacity="0.4" />
          {/* Highlight */}
          <ellipse cx="-0.8" cy="-1" rx="1.2" ry="2" fill="#7a6a50" opacity="0.2" />
        </g>
      )}

      {/* ── Stage 2: Seedling — tiny pair of narrow silvery-green leaves ── */}
      {stage >= 2 && (
        <g>
          {/* Thin stem */}
          <line
            x1="100" y1="262"
            x2="100" y2={stage >= 4 ? 226 : stage >= 3 ? 238 : 250}
            stroke={`url(#${pfx('lavStem')})`}
            strokeWidth={stage >= 4 ? 3 : stage >= 3 ? 2.5 : 1.5}
            strokeLinecap="round"
          />

          {/* Stage 2 only: small first leaf pair */}
          {stage === 2 && (
            <g filter={`url(#${pfx('softShadow')})`}>
              {leafPair(100, 250, 10, 12, pfx, 0.8)}
              {/* Tiny second pair emerging */}
              {leafPair(100, 254, 6, 7, pfx, 0.6)}
            </g>
          )}
        </g>
      )}

      {/* ── Stage 3: Bush forming — mounded shape with many narrow opposite leaves ── */}
      {stage >= 3 && (
        <g filter={`url(#${pfx('softShadow')})`}>
          {/* Woody base thickening */}
          <path
            d={`M 97 262 C 96 258 96 ${stage >= 4 ? 234 : 244} 97 ${stage >= 4 ? 228 : 240}`}
            stroke="#8a7a60"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            opacity="0.5"
          />
          <path
            d={`M 103 262 C 104 258 104 ${stage >= 4 ? 234 : 244} 103 ${stage >= 4 ? 228 : 240}`}
            stroke="#8a7a60"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            opacity="0.5"
          />

          {/* Leaf pairs along the stem */}
          {stage === 3 && (
            <g>
              {leafPair(100, 256, 12, 14, pfx, 0.85)}
              {leafPair(100, 248, 14, 16, pfx, 0.85)}
              {leafPair(100, 240, 12, 14, pfx, 0.8)}
              {/* Mounded foliage mass */}
              {foliageMound(100, 258, 40, 30, 12, pfx)}
            </g>
          )}

          {/* Stage 4+ gets bigger mound */}
          {stage >= 4 && (
            <g>
              {leafPair(100, 258, 14, 16, pfx, 0.85)}
              {leafPair(100, 250, 18, 20, pfx, 0.85)}
              {leafPair(100, 242, 20, 22, pfx, 0.85)}
              {leafPair(100, 234, 16, 18, pfx, 0.8)}
              {leafPair(100, 228, 12, 14, pfx, 0.75)}
              {/* Fuller mounded foliage */}
              {foliageMound(100, 260, 55, 42, 18, pfx)}
            </g>
          )}
        </g>
      )}

      {/* ── Stage 4: Stems rising with buds ── */}
      {stage >= 4 && stage < 5 && (
        <g>
          {/* Multiple thin flower stems rising above foliage with tiny bud clusters */}
          {[
            { cx: 88, curve: -4, topY: 168 },
            { cx: 96, curve: -1, topY: 158 },
            { cx: 100, curve: 1, topY: 152 },
            { cx: 104, curve: 2, topY: 156 },
            { cx: 112, curve: 5, topY: 164 },
          ].map((s, i) => (
            <g key={`bud-stem-${i}`} filter={`url(#${pfx('softShadow')})`}>
              {/* Thin green stem */}
              <path
                d={`M ${s.cx} 226 C ${s.cx + s.curve * 0.3} 210 ${s.cx + s.curve * 0.7} 190 ${s.cx + s.curve} ${s.topY}`}
                stroke={`url(#${pfx('lavFlowerStem')})`}
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
              {/* Small bud cluster at top — tight ellipses */}
              <ellipse
                cx={s.cx + s.curve}
                cy={s.topY}
                rx="3"
                ry="5"
                fill={`url(#${pfx('lavFlower')})`}
                opacity="0.7"
              />
              <ellipse
                cx={s.cx + s.curve - 2}
                cy={s.topY + 2}
                rx="2"
                ry="3.5"
                fill="#6a0dad"
                opacity="0.5"
              />
              <ellipse
                cx={s.cx + s.curve + 2}
                cy={s.topY + 2}
                rx="2"
                ry="3.5"
                fill="#6a0dad"
                opacity="0.5"
              />
            </g>
          ))}
        </g>
      )}

      {/* ── Stage 5: Flowering — 7-9 tall purple flower spikes ── */}
      {stage >= 5 && stage < 6 && (
        <g>
          {flowerSpike(84, 224, 130, -8, 8, pfx, true)}
          {flowerSpike(90, 224, 118, -5, 9, pfx, true)}
          {flowerSpike(95, 224, 108, -2, 10, pfx, true)}
          {flowerSpike(100, 224, 100, 0, 10, pfx, true)}
          {flowerSpike(105, 224, 106, 2, 10, pfx, true)}
          {flowerSpike(110, 224, 114, 4, 9, pfx, true)}
          {flowerSpike(116, 224, 126, 7, 8, pfx, true)}
          {/* Extra side spikes for fullness */}
          {flowerSpike(80, 226, 142, -10, 7, pfx, true)}
          {flowerSpike(120, 226, 138, 9, 7, pfx, true)}
        </g>
      )}

      {/* ── Stage 6: Peak bloom — full rich purple, all spikes deep bloom ── */}
      {stage >= 6 && (
        <g>
          {/* Back row spikes */}
          {flowerSpike(78, 224, 138, -12, 8, pfx, true, true)}
          {flowerSpike(86, 224, 122, -7, 9, pfx, true, true)}
          {flowerSpike(122, 224, 126, 10, 9, pfx, true, true)}

          {/* Middle row — tallest, richest */}
          {flowerSpike(92, 224, 108, -4, 10, pfx, true, true)}
          {flowerSpike(98, 224, 96, -1, 11, pfx, true, true)}
          {flowerSpike(103, 224, 94, 1, 11, pfx, true, true)}
          {flowerSpike(108, 224, 100, 3, 10, pfx, true, true)}

          {/* Front row */}
          {flowerSpike(84, 226, 134, -9, 8, pfx, true, true)}
          {flowerSpike(116, 226, 130, 8, 8, pfx, true, true)}

          {/* Small butterfly or bee for charm (stage 6 only, not 7) */}
          {stage < 7 && (
            <g>
              {/* Butterfly near top-left spike */}
              <g transform="translate(72, 120) rotate(-15)" opacity="0.7">
                {/* Left wing */}
                <ellipse cx="-3.5" cy="-1" rx="4" ry="2.5" fill="#e8d070" opacity="0.8" />
                <ellipse cx="-3.5" cy="-1" rx="3" ry="1.8" fill="#f0e090" opacity="0.5" />
                {/* Right wing */}
                <ellipse cx="3.5" cy="-1" rx="4" ry="2.5" fill="#e8d070" opacity="0.8" />
                <ellipse cx="3.5" cy="-1" rx="3" ry="1.8" fill="#f0e090" opacity="0.5" />
                {/* Body */}
                <ellipse cx="0" cy="0" rx="0.8" ry="3" fill="#6a5a30" />
                {/* Antennae */}
                <line x1="0" y1="-3" x2="-2" y2="-5.5" stroke="#6a5a30" strokeWidth="0.3" />
                <line x1="0" y1="-3" x2="2" y2="-5.5" stroke="#6a5a30" strokeWidth="0.3" />
              </g>

              {/* Small bee near center */}
              <g transform="translate(130, 108)" opacity="0.65">
                {/* Wings */}
                <ellipse cx="-2" cy="-2" rx="3" ry="1.5" fill="#d8e8f0" opacity="0.6" />
                <ellipse cx="2" cy="-2" rx="3" ry="1.5" fill="#d8e8f0" opacity="0.6" />
                {/* Body */}
                <ellipse cx="0" cy="0" rx="2" ry="3" fill="#d4a830" />
                {/* Stripes */}
                <line x1="-1.5" y1="-0.5" x2="1.5" y2="-0.5" stroke="#3a2a10" strokeWidth="0.6" />
                <line x1="-1.5" y1="1" x2="1.5" y2="1" stroke="#3a2a10" strokeWidth="0.6" />
              </g>
            </g>
          )}
        </g>
      )}

      {/* ── Stage 7: Harvest — golden glow + floating purple floret particles ── */}
      {stage >= 7 && (
        <g>
          {/* Golden harvest glow */}
          <circle
            cx="100"
            cy="160"
            r="85"
            fill={`url(#${pfx('harvestGlow')})`}
            className="animate-pulse"
          />

          {/* Floating purple floret particles */}
          {[
            { x: 55, y: 90, delay: '0s' },
            { x: 145, y: 85, delay: '0.9s' },
            { x: 40, y: 120, delay: '1.7s' },
            { x: 160, y: 110, delay: '2.5s' },
            { x: 70, y: 75, delay: '3.3s' },
            { x: 130, y: 70, delay: '1.1s' },
            { x: 85, y: 100, delay: '2.1s' },
            { x: 115, y: 95, delay: '3.7s' },
            { x: 50, y: 105, delay: '0.5s' },
            { x: 150, y: 98, delay: '2.8s' },
          ].map((s, i) => (
            <g key={`floret-float-${i}`} className="animate-float-away" style={{ animationDelay: s.delay }}>
              {/* Tiny purple floret */}
              <ellipse cx={s.x} cy={s.y} rx="1.8" ry="2.5" fill="#7b68ee" opacity="0.6" />
              <ellipse cx={s.x} cy={s.y} rx="1" ry="1.5" fill="#9370db" opacity="0.35" />
            </g>
          ))}
        </g>
      )}
    </g>
  );
}
