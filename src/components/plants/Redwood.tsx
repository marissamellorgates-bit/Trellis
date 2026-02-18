export function redwoodGradients(pfx: (name: string) => string) {
  return (
    <>
      {/* Bark gradient — warm reddish-brown, horizontal for trunk roundness */}
      <linearGradient id={pfx('rwBark')} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#6b3018" />
        <stop offset="20%" stopColor="#8b4020" />
        <stop offset="45%" stopColor="#a05030" />
        <stop offset="60%" stopColor="#945038" />
        <stop offset="80%" stopColor="#8b4020" />
        <stop offset="100%" stopColor="#6b3018" />
      </linearGradient>

      {/* Bark highlight — subtle specular strip */}
      <linearGradient id={pfx('rwBarkHi')} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#b06040" stopOpacity="0" />
        <stop offset="35%" stopColor="#c07050" stopOpacity="0.35" />
        <stop offset="65%" stopColor="#b06040" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#b06040" stopOpacity="0" />
      </linearGradient>

      {/* Foliage — dark evergreen radial */}
      <radialGradient id={pfx('rwFoliage')} cx="50%" cy="60%" r="55%">
        <stop offset="0%" stopColor="#2d5518" />
        <stop offset="40%" stopColor="#1f4a14" />
        <stop offset="80%" stopColor="#1a3e10" />
        <stop offset="100%" stopColor="#14300c" />
      </radialGradient>

      {/* Buttressed base gradient — wider and darker */}
      <linearGradient id={pfx('rwBase')} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#5a2810" />
        <stop offset="25%" stopColor="#7a3818" />
        <stop offset="50%" stopColor="#8b4020" />
        <stop offset="75%" stopColor="#7a3818" />
        <stop offset="100%" stopColor="#5a2810" />
      </linearGradient>

      {/* Seed gradient */}
      <linearGradient id={pfx('rwSeed')} x1="0.3" y1="0" x2="0.7" y2="1">
        <stop offset="0%" stopColor="#9b6840" />
        <stop offset="50%" stopColor="#7a5030" />
        <stop offset="100%" stopColor="#5a3820" />
      </linearGradient>

      {/* Cone gradient */}
      <linearGradient id={pfx('rwCone')} x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor="#7a6038" />
        <stop offset="50%" stopColor="#6b5030" />
        <stop offset="100%" stopColor="#5a4028" />
      </linearGradient>
    </>
  );
}

export function renderRedwood(stage: number, pfx: (name: string) => string) {
  // Trunk dimensions scale with stage
  const trunkTop = stage >= 7 ? 50 : stage >= 6 ? 55 : stage >= 5 ? 70 : stage >= 4 ? 140 : 190;
  const trunkWidth = stage >= 5 ? 12 : stage >= 4 ? 8 : 5;
  const baseWidth = stage >= 5 ? 22 : stage >= 4 ? 14 : 8;

  return (
    <g>
      {/* Stage 1: Tiny redwood seed — surprisingly small */}
      {stage >= 1 && (
        <g transform="translate(100, 262)" filter={`url(#${pfx('softShadow')})`}>
          {/* Shadow on soil */}
          <ellipse cx="0.5" cy="3" rx="3" ry="1.2" fill="#3a2518" opacity="0.2" />
          {/* Tiny seed body — redwood seeds are very small */}
          <ellipse cx="0" cy="0" rx="2.5" ry="3.5" fill={`url(#${pfx('rwSeed')})`} transform="rotate(-8)" />
          <ellipse cx="0" cy="0" rx="2.5" ry="3.5" fill="none" stroke="#5a3820" strokeWidth="0.4" transform="rotate(-8)" />
          {/* Tiny wing on seed */}
          <path d="M 1 -2.5 C 2 -4 3.5 -5 4 -4.5 C 4.5 -4 3 -2.5 1.5 -1.5" fill="#9b7850" opacity="0.5" />
          {/* Highlight */}
          <ellipse cx="-0.8" cy="-1" rx="1" ry="1.8" fill="#b08050" opacity="0.2" transform="rotate(-8)" />
        </g>
      )}

      {/* Stage 2: Root system */}
      {stage >= 2 && (
        <g opacity="0.6">
          {/* Main taproot */}
          <path d="M 100 266 C 100 274 99 282 98 292" stroke="#8b6d4a" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          {/* Spreading laterals */}
          <path d="M 100 268 C 96 272 90 278 84 284" stroke="#8b6d4a" strokeWidth="1.3" fill="none" strokeLinecap="round" />
          <path d="M 100 268 C 104 272 110 278 116 284" stroke="#8b6d4a" strokeWidth="1.3" fill="none" strokeLinecap="round" />
          {/* Fine roots */}
          <path d="M 100 272 C 94 276 87 280 82 282" stroke="#8b6d4a" strokeWidth="0.7" fill="none" strokeLinecap="round" />
          <path d="M 100 272 C 106 276 113 280 118 282" stroke="#8b6d4a" strokeWidth="0.7" fill="none" strokeLinecap="round" />
          <path d="M 88 280 C 85 283 82 286 80 288" stroke="#8b6d4a" strokeWidth="0.4" fill="none" strokeLinecap="round" />
          <path d="M 112 280 C 115 283 118 286 120 288" stroke="#8b6d4a" strokeWidth="0.4" fill="none" strokeLinecap="round" />
          <path d="M 96 284 C 93 287 90 290 88 292" stroke="#8b6d4a" strokeWidth="0.35" fill="none" strokeLinecap="round" />
          <path d="M 104 284 C 107 287 110 290 112 292" stroke="#8b6d4a" strokeWidth="0.35" fill="none" strokeLinecap="round" />
          {/* Tiny sprout emerging */}
          <g transform="translate(100, 262)" filter={`url(#${pfx('softShadow')})`}>
            <path d="M 0 0 C 0 -3 0 -6 -0.5 -9" stroke="#3d6020" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <path d="M -0.5 -7 C -3 -9 -5 -10 -5 -8 C -5 -6 -3 -5 -0.5 -7" fill="#3a6524" />
            <path d="M -0.5 -8.5 C 2 -10 4 -11 4 -9 C 4 -7 2 -6 -0.5 -8.5" fill="#2d5518" />
          </g>
        </g>
      )}

      {/* Stage 3+: Straight trunk — redwoods grow extremely straight */}
      {stage >= 3 && (() => {
        return (
          <g filter={`url(#${pfx('softShadow')})`}>
            {/* Trunk shadow */}
            <path
              d={`M ${100 + trunkWidth * 0.6 + 1} 262 L ${100 + trunkWidth * 0.4 + 1} ${trunkTop + 2} L ${100 - trunkWidth * 0.4 + 1} ${trunkTop + 2} L ${100 - trunkWidth * 0.6 + 1} 262 Z`}
              fill="#1a0e05"
              opacity="0.12"
            />

            {/* Buttressed base (visible from stage 4+) */}
            {stage >= 4 && (
              <path
                d={`M ${100 - baseWidth} 266 C ${100 - baseWidth} 258 ${100 - trunkWidth} ${trunkTop + 60} ${100 - trunkWidth} ${trunkTop + 40}
                    L ${100 + trunkWidth} ${trunkTop + 40}
                    C ${100 + trunkWidth} ${trunkTop + 60} ${100 + baseWidth} 258 ${100 + baseWidth} 266 Z`}
                fill={`url(#${pfx('rwBase')})`}
              />
            )}

            {/* Main trunk — very straight */}
            <rect
              x={100 - trunkWidth}
              y={trunkTop}
              width={trunkWidth * 2}
              height={stage >= 4 ? 262 - trunkTop - 30 : 262 - trunkTop}
              fill={`url(#${pfx('rwBark')})`}
              rx="1"
            />

            {/* Bark highlight */}
            <rect
              x={100 - trunkWidth * 0.3}
              y={trunkTop + 5}
              width={trunkWidth * 0.6}
              height={stage >= 4 ? 262 - trunkTop - 40 : 262 - trunkTop - 10}
              fill={`url(#${pfx('rwBarkHi')})`}
              rx="0.5"
            />

            {/* Bark texture — vertical fissures (characteristic of redwood bark) */}
            {stage >= 4 && (() => {
              const fissures = [];
              const fissureCount = stage >= 5 ? 14 : 8;
              for (let i = 0; i < fissureCount; i++) {
                const xOff = (i % 5 - 2) * (trunkWidth * 0.35);
                const yStart = trunkTop + 10 + (i * 17) % (262 - trunkTop - 60);
                const yLen = 15 + (i * 7) % 20;
                fissures.push(
                  <path
                    key={`fissure-${i}`}
                    d={`M ${100 + xOff} ${yStart} C ${100 + xOff + 0.5} ${yStart + yLen * 0.3} ${100 + xOff - 0.3} ${yStart + yLen * 0.7} ${100 + xOff + 0.2} ${yStart + yLen}`}
                    stroke="#5a2810"
                    strokeWidth={0.5 + (i % 3) * 0.2}
                    fill="none"
                    opacity={0.3 + (i % 4) * 0.05}
                    strokeLinecap="round"
                  />
                );
              }
              return <g>{fissures}</g>;
            })()}

            {/* Connect trunk to soil for stages 3 (no buttress) */}
            {stage < 4 && (
              <rect
                x={100 - trunkWidth}
                y={260}
                width={trunkWidth * 2}
                height={6}
                fill={`url(#${pfx('rwBark')})`}
                rx="0.5"
              />
            )}
          </g>
        );
      })()}

      {/* Stage 4+: High branches only — redwoods have no low branches */}
      {stage >= 4 && (() => {
        const branchY = stage >= 5 ? trunkTop + 20 : trunkTop + 15;
        return (
          <g filter={`url(#${pfx('softShadow')})`}>
            {/* Left high branch */}
            <path
              d={`M 100 ${branchY + 10} C 95 ${branchY + 6} 88 ${branchY + 3} 82 ${branchY + 5}`}
              stroke="#7a3818"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            {/* Right high branch */}
            <path
              d={`M 100 ${branchY + 5} C 105 ${branchY + 1} 112 ${branchY - 2} 118 ${branchY}`}
              stroke="#7a3818"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
            />
            {/* Additional branches at stage 5+ */}
            {stage >= 5 && (
              <>
                <path
                  d={`M 100 ${branchY + 25} C 94 ${branchY + 20} 86 ${branchY + 18} 78 ${branchY + 20}`}
                  stroke="#7a3818"
                  strokeWidth="1.6"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d={`M 100 ${branchY + 20} C 106 ${branchY + 15} 114 ${branchY + 13} 122 ${branchY + 15}`}
                  stroke="#7a3818"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d={`M 100 ${branchY - 5} C 96 ${branchY - 10} 90 ${branchY - 14} 86 ${branchY - 12}`}
                  stroke="#7a3818"
                  strokeWidth="1.3"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d={`M 100 ${branchY - 8} C 104 ${branchY - 13} 110 ${branchY - 16} 114 ${branchY - 14}`}
                  stroke="#7a3818"
                  strokeWidth="1.2"
                  fill="none"
                  strokeLinecap="round"
                />
              </>
            )}
          </g>
        );
      })()}

      {/* Stage 4+: Foliage at the top only — feathery, conifer-like */}
      {stage >= 4 && (() => {
        const foliageY = stage >= 5 ? trunkTop - 15 : trunkTop - 8;
        const foliageWidth = stage >= 5 ? 36 : 22;
        const foliageHeight = stage >= 5 ? 55 : 35;

        return (
          <g filter={`url(#${pfx('softShadow')})`}>
            {/* Conical foliage mass — top-heavy like a real redwood crown */}
            <ellipse
              cx="100"
              cy={foliageY + foliageHeight * 0.45}
              rx={foliageWidth}
              ry={foliageHeight}
              fill={`url(#${pfx('rwFoliage')})`}
              opacity="0.85"
            />
            {/* Layered feathery sub-canopies */}
            <ellipse
              cx="96"
              cy={foliageY + foliageHeight * 0.3}
              rx={foliageWidth * 0.7}
              ry={foliageHeight * 0.6}
              fill="#1f4a14"
              opacity="0.4"
            />
            <ellipse
              cx="104"
              cy={foliageY + foliageHeight * 0.5}
              rx={foliageWidth * 0.65}
              ry={foliageHeight * 0.55}
              fill="#2d5518"
              opacity="0.35"
            />
            {/* Top tuft — spire-like apex */}
            <ellipse
              cx="100"
              cy={foliageY - foliageHeight * 0.15}
              rx={foliageWidth * 0.3}
              ry={foliageHeight * 0.35}
              fill="#1a4a14"
              opacity="0.7"
            />
            {/* Highlight dapple */}
            <ellipse
              cx="97"
              cy={foliageY + foliageHeight * 0.2}
              rx={foliageWidth * 0.25}
              ry={foliageHeight * 0.25}
              fill="#3a6820"
              opacity="0.2"
            />

            {/* Foliage on high branches (stage 5+) */}
            {stage >= 5 && (
              <>
                {/* Left branch foliage clusters */}
                <ellipse cx="82" cy={trunkTop + 22} rx="10" ry="7" fill="#1f4a14" opacity="0.6" />
                <ellipse cx="80" cy={trunkTop + 20} rx="8" ry="5" fill="#2d5518" opacity="0.4" />
                <ellipse cx="78" cy={trunkTop + 42} rx="12" ry="8" fill="#1a3e10" opacity="0.55" />
                <ellipse cx="76" cy={trunkTop + 40} rx="9" ry="6" fill="#2d5518" opacity="0.35" />
                {/* Right branch foliage clusters */}
                <ellipse cx="118" cy={trunkTop + 17} rx="10" ry="7" fill="#1f4a14" opacity="0.6" />
                <ellipse cx="120" cy={trunkTop + 15} rx="8" ry="5" fill="#2d5518" opacity="0.4" />
                <ellipse cx="122" cy={trunkTop + 37} rx="12" ry="8" fill="#1a3e10" opacity="0.55" />
                <ellipse cx="124" cy={trunkTop + 35} rx="9" ry="6" fill="#2d5518" opacity="0.35" />
                {/* Upper branch foliage */}
                <ellipse cx="86" cy={trunkTop + 5} rx="8" ry="6" fill="#1a4a14" opacity="0.5" />
                <ellipse cx="114" cy={trunkTop + 2} rx="8" ry="6" fill="#1a4a14" opacity="0.5" />
              </>
            )}
          </g>
        );
      })()}

      {/* Stage 6: Tiny cones among the foliage */}
      {stage >= 6 && (() => {
        const coneY = trunkTop - 10;
        const cones = [
          { x: 94, y: coneY + 8, rot: -10 },
          { x: 108, y: coneY + 12, rot: 15 },
          { x: 100, y: coneY - 2, rot: 5 },
          { x: 88, y: coneY + 20, rot: -20 },
          { x: 112, y: coneY + 18, rot: 12 },
          { x: 96, y: coneY + 30, rot: -8 },
          { x: 106, y: coneY + 28, rot: 18 },
        ];
        return (
          <g>
            {cones.map((c, i) => (
              <g key={`cone-${i}`} transform={`translate(${c.x}, ${c.y}) rotate(${c.rot})`}>
                {/* Tiny oval cone — redwood cones are very small */}
                <ellipse cx="0" cy="0" rx="2.2" ry="3.5" fill={`url(#${pfx('rwCone')})`} />
                <ellipse cx="0" cy="0" rx="2.2" ry="3.5" fill="none" stroke="#5a4028" strokeWidth="0.3" opacity="0.5" />
                {/* Scale pattern */}
                <path d="M -1.2 -1.5 C 0 -0.8 1.2 -1.5 1.2 -1.5" stroke="#5a4028" strokeWidth="0.25" fill="none" opacity="0.4" />
                <path d="M -1.6 0 C 0 0.6 1.6 0 1.6 0" stroke="#5a4028" strokeWidth="0.25" fill="none" opacity="0.4" />
                <path d="M -1.2 1.5 C 0 2 1.2 1.5 1.2 1.5" stroke="#5a4028" strokeWidth="0.25" fill="none" opacity="0.4" />
                {/* Highlight */}
                <ellipse cx="-0.5" cy="-0.5" rx="0.8" ry="1.2" fill="#8b7050" opacity="0.2" />
              </g>
            ))}
          </g>
        );
      })()}

      {/* Stage 7: Harvest glow + floating particles */}
      {stage >= 7 && (
        <g>
          {/* Golden harvest glow centered on the crown */}
          <circle cx="100" cy={trunkTop + 10} r="80" fill={`url(#${pfx('harvestGlow')})`} className="animate-pulse" />
          {/* Floating seed particles */}
          {[
            { x: 135, y: 45, delay: '0s' },
            { x: 65, y: 38, delay: '1.2s' },
            { x: 150, y: 70, delay: '2.5s' },
            { x: 52, y: 60, delay: '3.8s' },
            { x: 125, y: 30, delay: '1.8s' },
            { x: 78, y: 50, delay: '0.6s' },
            { x: 140, y: 55, delay: '2.8s' },
          ].map((s, i) => (
            <g key={`float-${i}`} className="animate-float-away" style={{ animationDelay: s.delay }}>
              {/* Tiny floating seeds */}
              <ellipse cx={s.x} cy={s.y} rx="1.5" ry="2.5" fill="#9b7040" opacity="0.55" transform={`rotate(${30 * i} ${s.x} ${s.y})`} />
              {/* Seed wing */}
              <ellipse cx={s.x + 1.5} cy={s.y - 1.5} rx="1" ry="0.5" fill="#c4a870" opacity="0.3" transform={`rotate(${30 * i} ${s.x} ${s.y})`} />
            </g>
          ))}
        </g>
      )}
    </g>
  );
}
