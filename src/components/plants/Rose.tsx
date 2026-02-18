export function roseGradients(pfx: (name: string) => string) {
  return (
    <>
      {/* Stem gradient — rich green */}
      <linearGradient id={pfx('roseStem')} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#2a5018" />
        <stop offset="30%" stopColor="#3a6524" />
        <stop offset="55%" stopColor="#4a7a30" />
        <stop offset="80%" stopColor="#3a6524" />
        <stop offset="100%" stopColor="#2a5018" />
      </linearGradient>
      {/* Stem highlight */}
      <linearGradient id={pfx('roseStemHi')} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#5a9848" stopOpacity="0" />
        <stop offset="40%" stopColor="#78b858" stopOpacity="0.45" />
        <stop offset="100%" stopColor="#5a9848" stopOpacity="0" />
      </linearGradient>
      {/* Rose petal outer — deep velvety red */}
      <radialGradient id={pfx('rosePetalOuter')} cx="50%" cy="85%" r="85%">
        <stop offset="0%" stopColor="#e8304e" />
        <stop offset="40%" stopColor="#c41e3a" />
        <stop offset="100%" stopColor="#8B0000" />
      </radialGradient>
      {/* Rose petal inner — brighter crimson for depth */}
      <radialGradient id={pfx('rosePetalInner')} cx="50%" cy="80%" r="75%">
        <stop offset="0%" stopColor="#ff5068" />
        <stop offset="35%" stopColor="#e8304e" />
        <stop offset="100%" stopColor="#c41e3a" />
      </radialGradient>
      {/* Rose petal deep — darkest inner petals */}
      <radialGradient id={pfx('rosePetalDeep')} cx="50%" cy="70%" r="65%">
        <stop offset="0%" stopColor="#c41e3a" />
        <stop offset="50%" stopColor="#9a1028" />
        <stop offset="100%" stopColor="#6b0018" />
      </radialGradient>
      {/* Sepal gradient — green calyx */}
      <linearGradient id={pfx('roseSepal')} x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor="#5a8a3c" />
        <stop offset="50%" stopColor="#3a6524" />
        <stop offset="100%" stopColor="#2a5018" />
      </linearGradient>
      {/* Leaf gradient */}
      <linearGradient id={pfx('roseLeaf')} x1="0" y1="0" x2="0.8" y2="1">
        <stop offset="0%" stopColor="#5a8a3c" />
        <stop offset="50%" stopColor="#3a6524" />
        <stop offset="100%" stopColor="#2a5018" />
      </linearGradient>
      {/* Leaf highlight */}
      <linearGradient id={pfx('roseLeafHi')} x1="0.3" y1="0" x2="0.7" y2="1">
        <stop offset="0%" stopColor="#80c060" stopOpacity="0.55" />
        <stop offset="50%" stopColor="#68a848" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#5a8a3c" stopOpacity="0" />
      </linearGradient>
      {/* Seed gradient — dark rose hip */}
      <radialGradient id={pfx('roseSeedGrad')} cx="40%" cy="35%" r="60%">
        <stop offset="0%" stopColor="#8a4030" />
        <stop offset="50%" stopColor="#5a2818" />
        <stop offset="100%" stopColor="#3a180a" />
      </radialGradient>
      {/* Stamen gradient — golden yellow center */}
      <radialGradient id={pfx('roseStamen')} cx="45%" cy="40%" r="55%">
        <stop offset="0%" stopColor="#f0d860" />
        <stop offset="50%" stopColor="#e0c040" />
        <stop offset="100%" stopColor="#c8a030" />
      </radialGradient>
    </>
  );
}

export function renderRose(stage: number, pfx: (name: string) => string) {
  return (
    <g>
      {/* ── Stage 1: Rose hip seed on rich soil ── */}
      {stage >= 1 && stage < 2 && (
        <g transform="translate(100, 262)" filter={`url(#${pfx('softShadow')})`}>
          {/* Seed shadow */}
          <ellipse cx="1" cy="5" rx="5" ry="2" fill="#3a2518" opacity="0.18" />
          {/* Seed body — oval rose hip with pointed tip */}
          <path
            d="M 0 -7 C -3 -5 -5 -1 -4.5 3 C -4 6 -2 8 0 8.5 C 2 8 4 6 4.5 3 C 5 -1 3 -5 0 -7 Z"
            fill={`url(#${pfx('roseSeedGrad')})`}
          />
          {/* Seed outline */}
          <path
            d="M 0 -7 C -3 -5 -5 -1 -4.5 3 C -4 6 -2 8 0 8.5 C 2 8 4 6 4.5 3 C 5 -1 3 -5 0 -7 Z"
            fill="none" stroke="#3a180a" strokeWidth="0.4"
          />
          {/* Tiny crown at top (dried sepals) */}
          <path d="M -1.5 -6.5 L -2 -9 L -0.5 -7.5" stroke="#5a3020" strokeWidth="0.5" fill="none" opacity="0.6" />
          <path d="M 0 -7 L 0 -10 L 0.8 -7.5" stroke="#5a3020" strokeWidth="0.5" fill="none" opacity="0.6" />
          <path d="M 1.5 -6.5 L 2 -9 L 0.5 -7.5" stroke="#5a3020" strokeWidth="0.5" fill="none" opacity="0.6" />
          {/* Seed ridge */}
          <path d="M 0 -5 C 0.3 -2 0.3 2 0 6" stroke="#7a4830" strokeWidth="0.5" fill="none" opacity="0.3" />
          {/* Seed highlight */}
          <ellipse cx="-1.5" cy="0" rx="1.5" ry="3.5" fill="#a06040" opacity="0.2" />
        </g>
      )}

      {/* ── Stage 2+: Stem with thorns ── */}
      {stage >= 2 && (() => {
        const stemTop = stage >= 5 ? 100 : stage >= 4 ? 135 : stage >= 3 ? 175 : 230;
        const sw = stage >= 5 ? 5 : stage >= 4 ? 4.5 : stage >= 3 ? 3.5 : 2.5;
        return (
          <g filter={`url(#${pfx('softShadow')})`}>
            {/* Stem shadow */}
            <path
              d={`M 102 262 C 103 245 99 ${stemTop + 35} 101 ${stemTop + 2}`}
              stroke="#1a2a10" strokeWidth={sw * 0.5}
              fill="none" strokeLinecap="round" opacity="0.12"
            />
            {/* Main stem */}
            <path
              d={`M 100 262 C 101 244 98 ${stemTop + 32} 100 ${stemTop}`}
              stroke={`url(#${pfx('roseStem')})`}
              strokeWidth={sw} fill="none" strokeLinecap="round"
            />
            {/* Stem highlight */}
            <path
              d={`M 99.5 258 C 100.5 242 97.5 ${stemTop + 34} 99.5 ${stemTop + 3}`}
              stroke={`url(#${pfx('roseStemHi')})`}
              strokeWidth={sw * 0.4} fill="none" strokeLinecap="round"
            />
            {/* Thorns — small sharp triangles along stem */}
            {stage >= 2 && (() => {
              const thornPositions = stage >= 4
                ? [240, 222, 205, 190, 175, 160, 145]
                : stage >= 3
                  ? [240, 222, 205, 190]
                  : [245, 235];
              return thornPositions.filter(ty => ty > stemTop + 10).map((ty, i) => (
                <g key={`thorn-${i}`}>
                  {i % 2 === 0 ? (
                    /* Left thorn */
                    <path
                      d={`M ${99 - sw * 0.4} ${ty} L ${94 - sw * 0.3} ${ty - 4} L ${99 - sw * 0.3} ${ty - 1.5}`}
                      fill="#4a3020" opacity="0.7"
                    />
                  ) : (
                    /* Right thorn */
                    <path
                      d={`M ${101 + sw * 0.4} ${ty} L ${106 + sw * 0.3} ${ty - 4} L ${101 + sw * 0.3} ${ty - 1.5}`}
                      fill="#4a3020" opacity="0.7"
                    />
                  )}
                </g>
              ));
            })()}
          </g>
        );
      })()}

      {/* ── Stage 2: Small compound leaves (sprout) ── */}
      {stage >= 2 && stage < 3 && (
        <g filter={`url(#${pfx('softShadow')})`}>
          {/* Left compound leaf — 3 leaflets */}
          <g transform="translate(96, 236)">
            <path d="M 0 0 C -4 -2 -8 -4 -12 -3" stroke="#3a6524" strokeWidth="1" fill="none" strokeLinecap="round" />
            {/* Center leaflet */}
            <path d="M -12 -3 C -14 -6 -16 -10 -14 -13 C -12 -14 -10 -12 -9 -9 C -8 -6 -10 -3 -12 -3"
              fill={`url(#${pfx('roseLeaf')})`} opacity="0.85" />
            {/* Left leaflet */}
            <path d="M -9 -2 C -12 -4 -14 -7 -13 -9 C -11 -10 -9 -8 -8 -6 C -7 -4 -8 -2 -9 -2"
              fill={`url(#${pfx('roseLeaf')})`} opacity="0.75" />
            {/* Right leaflet */}
            <path d="M -11 -1 C -13 -2 -15 -5 -14 -7 C -13 -8 -11 -6 -10 -4 C -9 -2 -10 -1 -11 -1"
              fill={`url(#${pfx('roseLeaf')})`} opacity="0.75" />
          </g>
          {/* Right compound leaf — 3 leaflets */}
          <g transform="translate(104, 240)">
            <path d="M 0 0 C 4 -2 8 -3 12 -2" stroke="#3a6524" strokeWidth="1" fill="none" strokeLinecap="round" />
            <path d="M 12 -2 C 14 -5 16 -9 14 -11 C 12 -12 10 -10 9 -7 C 8 -4 10 -2 12 -2"
              fill={`url(#${pfx('roseLeaf')})`} opacity="0.85" />
            <path d="M 9 -1 C 11 -3 13 -5 12 -7 C 11 -8 9 -6 8 -4 C 7 -2 8 -1 9 -1"
              fill={`url(#${pfx('roseLeaf')})`} opacity="0.75" />
            <path d="M 11 0 C 13 -1 15 -3 14 -5 C 13 -6 11 -4 10 -2 C 9 0 10 0 11 0"
              fill={`url(#${pfx('roseLeaf')})`} opacity="0.75" />
          </g>
        </g>
      )}

      {/* ── Stage 3+: Larger compound leaves with serrated edges ── */}
      {stage >= 3 && (
        <g>
          {/* Lower-left compound leaf */}
          <g filter={`url(#${pfx('softShadow')})`}>
            <path d="M 100 228 C 96 226 90 222 84 220" stroke="#3a6524" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <g transform="translate(84, 220) rotate(-30)">
              {/* 5 leaflets for compound rose leaf */}
              {/* Terminal leaflet — largest */}
              <path d="M 0 0 C -4 -3 -9 -9 -12 -15 C -13 -19 -10 -22 -7 -20 C -4 -18 -1 -12 0 -6 C 1 -12 4 -18 7 -20 C 10 -22 13 -19 12 -15 C 9 -9 4 -3 0 0"
                fill={`url(#${pfx('roseLeaf')})`} opacity="0.85" />
              {/* Serrated edge marks on terminal */}
              <path d="M -7 -10 L -9 -11 M -10 -15 L -12 -16 M -5 -6 L -7 -7" stroke="#2a5018" strokeWidth="0.3" fill="none" opacity="0.4" />
              <path d="M 7 -10 L 9 -11 M 10 -15 L 12 -16 M 5 -6 L 7 -7" stroke="#2a5018" strokeWidth="0.3" fill="none" opacity="0.4" />
              {/* Leaf vein */}
              <path d="M 0 0 C 0 -4 0 -10 0 -16" stroke="#2a5018" strokeWidth="0.5" fill="none" opacity="0.5" />
              {/* Side leaflets */}
              <path d="M -2 -2 C -6 -4 -11 -6 -14 -5 C -16 -3 -14 0 -11 1 C -8 2 -4 0 -2 -2"
                fill={`url(#${pfx('roseLeaf')})`} opacity="0.75" />
              <path d="M 2 -2 C 6 -4 11 -6 14 -5 C 16 -3 14 0 11 1 C 8 2 4 0 2 -2"
                fill={`url(#${pfx('roseLeaf')})`} opacity="0.75" />
              {/* Highlight */}
              <path d="M -3 -8 C -2 -12 0 -14 1 -10 C 0 -7 -1 -6 -3 -8"
                fill={`url(#${pfx('roseLeafHi')})`} opacity="0.35" />
            </g>
          </g>

          {/* Lower-right compound leaf */}
          <g filter={`url(#${pfx('softShadow')})`}>
            <path d="M 100 222 C 104 220 110 217 116 215" stroke="#3a6524" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <g transform="translate(116, 215) rotate(25)">
              <path d="M 0 0 C -3 -3 -8 -8 -10 -13 C -11 -17 -8 -19 -5 -17 C -3 -15 -1 -10 0 -5 C 1 -10 3 -15 5 -17 C 8 -19 11 -17 10 -13 C 8 -8 3 -3 0 0"
                fill={`url(#${pfx('roseLeaf')})`} opacity="0.85" />
              <path d="M 0 0 C 0 -3 0 -8 0 -14" stroke="#2a5018" strokeWidth="0.5" fill="none" opacity="0.5" />
              <path d="M -2 -1 C -5 -3 -9 -4 -11 -3 C -13 -1 -11 1 -8 2 C -5 2 -3 0 -2 -1"
                fill={`url(#${pfx('roseLeaf')})`} opacity="0.75" />
              <path d="M 2 -1 C 5 -3 9 -4 11 -3 C 13 -1 11 1 8 2 C 5 2 3 0 2 -1"
                fill={`url(#${pfx('roseLeaf')})`} opacity="0.75" />
              <path d="M -6 -7 L -8 -8 M -8 -12 L -10 -13 M 6 -7 L 8 -8 M 8 -12 L 10 -13" stroke="#2a5018" strokeWidth="0.3" fill="none" opacity="0.4" />
            </g>
          </g>

          {/* Upper leaves (stages 4+) */}
          {stage >= 4 && (
            <>
              {/* Upper-left compound leaf */}
              <g filter={`url(#${pfx('softShadow')})`}>
                <path d="M 100 190 C 95 187 89 183 84 181" stroke="#3a6524" strokeWidth="1.3" fill="none" strokeLinecap="round" />
                <g transform="translate(84, 181) rotate(-40)">
                  <path d="M 0 0 C -3 -2 -7 -7 -9 -12 C -10 -15 -7 -17 -5 -15 C -3 -13 -1 -9 0 -4 C 1 -9 3 -13 5 -15 C 7 -17 10 -15 9 -12 C 7 -7 3 -2 0 0"
                    fill={`url(#${pfx('roseLeaf')})`} opacity="0.82" />
                  <path d="M 0 0 C 0 -3 0 -7 0 -12" stroke="#2a5018" strokeWidth="0.4" fill="none" opacity="0.5" />
                  <path d="M -1.5 -1 C -4 -2 -8 -3 -10 -2 C -11 -1 -9 1 -7 1.5 C -4 1 -2 0 -1.5 -1"
                    fill={`url(#${pfx('roseLeaf')})`} opacity="0.7" />
                  <path d="M 1.5 -1 C 4 -2 8 -3 10 -2 C 11 -1 9 1 7 1.5 C 4 1 2 0 1.5 -1"
                    fill={`url(#${pfx('roseLeaf')})`} opacity="0.7" />
                </g>
              </g>
              {/* Upper-right compound leaf */}
              <g filter={`url(#${pfx('softShadow')})`}>
                <path d="M 100 180 C 105 177 111 174 116 172" stroke="#3a6524" strokeWidth="1.3" fill="none" strokeLinecap="round" />
                <g transform="translate(116, 172) rotate(35)">
                  <path d="M 0 0 C -3 -2 -7 -7 -9 -12 C -10 -15 -7 -17 -5 -15 C -3 -13 -1 -9 0 -4 C 1 -9 3 -13 5 -15 C 7 -17 10 -15 9 -12 C 7 -7 3 -2 0 0"
                    fill={`url(#${pfx('roseLeaf')})`} opacity="0.82" />
                  <path d="M 0 0 C 0 -3 0 -7 0 -12" stroke="#2a5018" strokeWidth="0.4" fill="none" opacity="0.5" />
                  <path d="M -1.5 -1 C -4 -2 -8 -3 -10 -2 C -11 -1 -9 1 -7 1.5 C -4 1 -2 0 -1.5 -1"
                    fill={`url(#${pfx('roseLeaf')})`} opacity="0.7" />
                  <path d="M 1.5 -1 C 4 -2 8 -3 10 -2 C 11 -1 9 1 7 1.5 C 4 1 2 0 1.5 -1"
                    fill={`url(#${pfx('roseLeaf')})`} opacity="0.7" />
                </g>
              </g>
            </>
          )}

          {/* Side branches with leaves (stage 3+) */}
          {stage >= 3 && stage < 4 && (
            <g filter={`url(#${pfx('softShadow')})`}>
              {/* Left branch */}
              <path d="M 99 205 C 95 200 90 197 86 196" stroke={`url(#${pfx('roseStem')})`} strokeWidth="1.8" fill="none" strokeLinecap="round" />
              {/* Left branch thorn */}
              <path d="M 93 199 L 89 196 L 92 197" fill="#4a3020" opacity="0.6" />
              {/* Right branch */}
              <path d="M 101 198 C 105 194 110 192 114 191" stroke={`url(#${pfx('roseStem')})`} strokeWidth="1.8" fill="none" strokeLinecap="round" />
              {/* Right branch thorn */}
              <path d="M 107 193 L 111 190 L 108 192" fill="#4a3020" opacity="0.6" />
            </g>
          )}
        </g>
      )}

      {/* ── Stage 4: Tight rose buds at branch tips ── */}
      {stage >= 4 && stage < 5 && (
        <g>
          {/* Main bud at top */}
          <g transform="translate(100, 132)" filter={`url(#${pfx('dropShadow')})`}>
            {/* Sepals — green wrapping around bud */}
            <path d="M 0 8 C -5 6 -7 2 -8 -3 C -7 -6 -5 -8 -3 -4 C -2 0 -1 4 0 8"
              fill={`url(#${pfx('roseSepal')})`} opacity="0.8" />
            <path d="M 0 8 C 5 6 7 2 8 -3 C 7 -6 5 -8 3 -4 C 2 0 1 4 0 8"
              fill={`url(#${pfx('roseSepal')})`} opacity="0.8" />
            <path d="M 0 8 C -3 5 -4 0 -4 -5 C -3 -8 -1 -10 0 -6 C 1 -10 3 -8 4 -5 C 4 0 3 5 0 8"
              fill={`url(#${pfx('roseSepal')})`} opacity="0.7" />
            {/* Red bud visible between sepals */}
            <path d="M -2 -2 C -3 -6 -2 -12 0 -14 C 2 -12 3 -6 2 -2 C 1 0 -1 0 -2 -2"
              fill={`url(#${pfx('rosePetalOuter')})`} opacity="0.85" />
            {/* Bud highlight */}
            <path d="M -0.5 -4 C -1 -8 -0.5 -11 0 -12 C 0.5 -10 0.8 -7 0.5 -4"
              fill="#e8304e" opacity="0.3" />
          </g>

          {/* Side buds — smaller */}
          <g transform="translate(78, 160)" filter={`url(#${pfx('softShadow')})`}>
            {/* Left branch to bud */}
            <path d="M 0 0 C -3 -3 -6 -5 -8 -7" stroke={`url(#${pfx('roseStem')})`} strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <g transform="translate(-8, -7) scale(0.65)">
              <path d="M 0 6 C -4 4 -5 0 -5 -3 C -4 -5 -2 -4 -1 -1 C 0 2 0 4 0 6"
                fill={`url(#${pfx('roseSepal')})`} opacity="0.75" />
              <path d="M 0 6 C 4 4 5 0 5 -3 C 4 -5 2 -4 1 -1 C 0 2 0 4 0 6"
                fill={`url(#${pfx('roseSepal')})`} opacity="0.75" />
              <path d="M -1.5 -1 C -2 -5 -1 -10 0 -11 C 1 -10 2 -5 1.5 -1"
                fill={`url(#${pfx('rosePetalOuter')})`} opacity="0.8" />
            </g>
          </g>

          <g transform="translate(122, 155)" filter={`url(#${pfx('softShadow')})`}>
            <path d="M 0 0 C 3 -3 6 -5 8 -6" stroke={`url(#${pfx('roseStem')})`} strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <g transform="translate(8, -6) scale(0.6)">
              <path d="M 0 6 C -4 4 -5 0 -5 -3 C -4 -5 -2 -4 -1 -1 C 0 2 0 4 0 6"
                fill={`url(#${pfx('roseSepal')})`} opacity="0.75" />
              <path d="M 0 6 C 4 4 5 0 5 -3 C 4 -5 2 -4 1 -1 C 0 2 0 4 0 6"
                fill={`url(#${pfx('roseSepal')})`} opacity="0.75" />
              <path d="M -1.5 -1 C -2 -5 -1 -10 0 -11 C 1 -10 2 -5 1.5 -1"
                fill={`url(#${pfx('rosePetalOuter')})`} opacity="0.8" />
            </g>
          </g>
        </g>
      )}

      {/* ── Stage 5: One large open bloom + side buds still closed ── */}
      {stage >= 5 && stage < 6 && (
        <g>
          {/* Main bloom — layered concentric rose petals */}
          <g transform="translate(100, 100)" filter={`url(#${pfx('dropShadow')})`}>
            {/* Outermost petal ring — 8 petals curving outward */}
            {Array.from({ length: 8 }, (_, i) => {
              const deg = (360 / 8) * i;
              return (
                <path
                  key={`outer5-${i}`}
                  d="M 0 0 C -6 -4 -10 -16 -9 -26 C -8 -30 -4 -32 -1 -30 C 2 -28 5 -22 6 -16 C 7 -10 4 -4 0 0"
                  fill={`url(#${pfx('rosePetalOuter')})`}
                  transform={`rotate(${deg})`}
                  opacity="0.8"
                />
              );
            })}
            {/* Second ring — 8 petals, slightly shorter, offset */}
            {Array.from({ length: 8 }, (_, i) => {
              const deg = (360 / 8) * i + 22;
              return (
                <path
                  key={`mid5-${i}`}
                  d="M 0 0 C -5 -3 -8 -12 -7 -20 C -6 -24 -3 -25 -1 -23 C 1 -21 3 -17 4 -12 C 5 -7 3 -3 0 0"
                  fill={`url(#${pfx('rosePetalInner')})`}
                  transform={`rotate(${deg})`}
                  opacity="0.85"
                />
              );
            })}
            {/* Third ring — 6 tighter petals */}
            {Array.from({ length: 6 }, (_, i) => {
              const deg = (360 / 6) * i + 10;
              return (
                <path
                  key={`inner5-${i}`}
                  d="M 0 0 C -4 -2 -6 -8 -5 -14 C -4 -17 -2 -18 0 -16 C 2 -14 3 -10 3 -7 C 3 -4 2 -2 0 0"
                  fill={`url(#${pfx('rosePetalDeep')})`}
                  transform={`rotate(${deg})`}
                  opacity="0.9"
                />
              );
            })}
            {/* Tight spiral center — overlapping crescents */}
            <path d="M 0 -1 C -3 -3 -4 -7 -3 -9 C -1 -10 1 -8 2 -6 C 3 -4 2 -1 0 -1"
              fill="#9a1028" opacity="0.85" />
            <path d="M 1 0 C 3 -2 4 -5 3 -7 C 2 -8 0 -7 -1 -5 C -2 -3 -1 -1 1 0"
              fill="#8B0000" opacity="0.8" />
            <path d="M 0 1 C -2 -1 -2 -4 -1 -5 C 0 -5.5 1 -4.5 1.5 -3 C 2 -1.5 1 0 0 1"
              fill="#6b0018" opacity="0.75" />
            {/* Tiny center curl */}
            <ellipse cx="0" cy="-2" rx="1.5" ry="2" fill="#4a000e" opacity="0.6" />
          </g>

          {/* Side buds — still closed */}
          <g transform="translate(72, 145)" filter={`url(#${pfx('softShadow')})`}>
            <path d="M 28 -2 C 22 -5 16 -8 12 -10" stroke={`url(#${pfx('roseStem')})`} strokeWidth="2" fill="none" strokeLinecap="round" />
            <g transform="translate(12, -10) scale(0.55)">
              <path d="M 0 6 C -4 4 -6 0 -6 -4 C -5 -7 -3 -5 -1 -2 C 0 1 0 4 0 6" fill={`url(#${pfx('roseSepal')})`} opacity="0.75" />
              <path d="M 0 6 C 4 4 6 0 6 -4 C 5 -7 3 -5 1 -2 C 0 1 0 4 0 6" fill={`url(#${pfx('roseSepal')})`} opacity="0.75" />
              <path d="M -2 -1 C -2.5 -6 -1 -12 0 -14 C 1 -12 2.5 -6 2 -1" fill={`url(#${pfx('rosePetalOuter')})`} opacity="0.8" />
            </g>
          </g>
          <g transform="translate(128, 140)" filter={`url(#${pfx('softShadow')})`}>
            <path d="M -28 -2 C -22 -5 -16 -7 -12 -9" stroke={`url(#${pfx('roseStem')})`} strokeWidth="2" fill="none" strokeLinecap="round" />
            <g transform="translate(-12, -9) scale(0.5)">
              <path d="M 0 6 C -4 4 -6 0 -6 -4 C -5 -7 -3 -5 -1 -2 C 0 1 0 4 0 6" fill={`url(#${pfx('roseSepal')})`} opacity="0.75" />
              <path d="M 0 6 C 4 4 6 0 6 -4 C 5 -7 3 -5 1 -2 C 0 1 0 4 0 6" fill={`url(#${pfx('roseSepal')})`} opacity="0.75" />
              <path d="M -2 -1 C -2.5 -6 -1 -12 0 -14 C 1 -12 2.5 -6 2 -1" fill={`url(#${pfx('rosePetalOuter')})`} opacity="0.8" />
            </g>
          </g>
        </g>
      )}

      {/* ── Stage 6: Full bloom — multiple open roses, stamens visible ── */}
      {stage >= 6 && stage < 7 && (
        <g>
          {/* Main bloom — fully open with visible golden stamens */}
          <g transform="translate(100, 98)" filter={`url(#${pfx('dropShadow')})`}>
            {/* Outermost ring — 10 petals, wide open, curving back */}
            {Array.from({ length: 10 }, (_, i) => {
              const deg = (360 / 10) * i;
              return (
                <path
                  key={`full-outer-${i}`}
                  d="M 0 0 C -7 -5 -11 -18 -10 -30 C -9 -35 -5 -37 -2 -34 C 1 -31 4 -24 5 -18 C 6 -12 4 -5 0 0"
                  fill={`url(#${pfx('rosePetalOuter')})`}
                  transform={`rotate(${deg})`}
                  opacity="0.78"
                />
              );
            })}
            {/* Second ring — 10 petals offset */}
            {Array.from({ length: 10 }, (_, i) => {
              const deg = (360 / 10) * i + 18;
              return (
                <path
                  key={`full-mid-${i}`}
                  d="M 0 0 C -5 -4 -9 -14 -8 -24 C -7 -28 -4 -29 -2 -27 C 0 -25 3 -19 4 -14 C 5 -9 3 -4 0 0"
                  fill={`url(#${pfx('rosePetalInner')})`}
                  transform={`rotate(${deg})`}
                  opacity="0.82"
                />
              );
            })}
            {/* Third ring — 8 inner petals */}
            {Array.from({ length: 8 }, (_, i) => {
              const deg = (360 / 8) * i + 8;
              return (
                <path
                  key={`full-inner-${i}`}
                  d="M 0 0 C -4 -3 -7 -10 -6 -17 C -5 -20 -3 -21 -1 -19 C 1 -17 3 -12 3 -9 C 3 -5 2 -2 0 0"
                  fill={`url(#${pfx('rosePetalDeep')})`}
                  transform={`rotate(${deg})`}
                  opacity="0.88"
                />
              );
            })}
            {/* Innermost spiral petals — 5 tight curls */}
            {Array.from({ length: 5 }, (_, i) => {
              const deg = (360 / 5) * i + 15;
              return (
                <path
                  key={`full-core-${i}`}
                  d="M 0 0 C -3 -2 -4 -6 -3 -10 C -2 -12 -1 -12 0 -10 C 1 -8 2 -5 1.5 -3 C 1 -1 0.5 0 0 0"
                  fill="#9a1028"
                  transform={`rotate(${deg})`}
                  opacity="0.8"
                />
              );
            })}
            {/* Golden stamens in center */}
            <circle r="5" fill={`url(#${pfx('roseStamen')})`} opacity="0.85" />
            {/* Individual stamen dots around center */}
            {Array.from({ length: 10 }, (_, i) => {
              const angle = (360 / 10) * i * (Math.PI / 180);
              const cx = Math.cos(angle) * 3.5;
              const cy = Math.sin(angle) * 3.5;
              return (
                <circle key={`stamen6-${i}`} cx={cx} cy={cy} r="0.7" fill="#c8a030" opacity="0.75" />
              );
            })}
            {/* Center highlight */}
            <circle r="2" fill="#f0d860" opacity="0.25" />
          </g>

          {/* Secondary bloom — upper left, smaller */}
          <g transform="translate(68, 130)" filter={`url(#${pfx('softShadow')})`}>
            {/* Branch to secondary bloom */}
            <path d="M 32 15 C 24 10 16 5 8 2" stroke={`url(#${pfx('roseStem')})`} strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <g transform="scale(0.6)">
              {Array.from({ length: 8 }, (_, i) => {
                const deg = (360 / 8) * i;
                return (
                  <path key={`s2-outer-${i}`}
                    d="M 0 0 C -6 -4 -10 -16 -9 -26 C -8 -30 -4 -32 -1 -30 C 2 -28 5 -22 6 -16 C 7 -10 4 -4 0 0"
                    fill={`url(#${pfx('rosePetalOuter')})`} transform={`rotate(${deg})`} opacity="0.75" />
                );
              })}
              {Array.from({ length: 6 }, (_, i) => {
                const deg = (360 / 6) * i + 15;
                return (
                  <path key={`s2-inner-${i}`}
                    d="M 0 0 C -4 -3 -7 -10 -6 -17 C -5 -20 -3 -21 -1 -19 C 1 -17 3 -12 3 -9 C 3 -5 2 -2 0 0"
                    fill={`url(#${pfx('rosePetalInner')})`} transform={`rotate(${deg})`} opacity="0.82" />
                );
              })}
              {/* Center spiral */}
              <path d="M 0 -1 C -2 -3 -3 -6 -2 -8 C -1 -8.5 0 -7 1 -5 C 2 -3 1 -1 0 -1"
                fill="#9a1028" opacity="0.8" />
              <ellipse cx="0" cy="-2" rx="1.2" ry="1.5" fill="#6b0018" opacity="0.6" />
              {/* Stamens */}
              <circle r="3" fill={`url(#${pfx('roseStamen')})`} opacity="0.7" />
            </g>
          </g>

          {/* Third bloom — right side, even smaller */}
          <g transform="translate(138, 122)" filter={`url(#${pfx('softShadow')})`}>
            <path d="M -38 20 C -30 14 -20 8 -10 4" stroke={`url(#${pfx('roseStem')})`} strokeWidth="2.2" fill="none" strokeLinecap="round" />
            <g transform="scale(0.5)">
              {Array.from({ length: 8 }, (_, i) => {
                const deg = (360 / 8) * i + 10;
                return (
                  <path key={`s3-outer-${i}`}
                    d="M 0 0 C -6 -4 -10 -16 -9 -26 C -8 -30 -4 -32 -1 -30 C 2 -28 5 -22 6 -16 C 7 -10 4 -4 0 0"
                    fill={`url(#${pfx('rosePetalOuter')})`} transform={`rotate(${deg})`} opacity="0.72" />
                );
              })}
              {Array.from({ length: 5 }, (_, i) => {
                const deg = (360 / 5) * i + 20;
                return (
                  <path key={`s3-inner-${i}`}
                    d="M 0 0 C -4 -3 -7 -10 -6 -17 C -5 -20 -3 -21 -1 -19 C 1 -17 3 -12 3 -9 C 3 -5 2 -2 0 0"
                    fill={`url(#${pfx('rosePetalInner')})`} transform={`rotate(${deg})`} opacity="0.8" />
                );
              })}
              <path d="M 0 0 C -2 -2 -2 -5 -1 -6 C 0 -6.5 1 -5 1.5 -3 C 1.5 -1 1 0 0 0"
                fill="#9a1028" opacity="0.75" />
              <circle r="2.5" fill={`url(#${pfx('roseStamen')})`} opacity="0.65" />
            </g>
          </g>

          {/* One still-closed bud for variety */}
          <g transform="translate(58, 158)" filter={`url(#${pfx('softShadow')})`}>
            <path d="M 42 5 C 35 2 28 -2 22 -4" stroke={`url(#${pfx('roseStem')})`} strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <g transform="translate(22, -4) scale(0.45)">
              <path d="M 0 6 C -4 4 -6 0 -6 -4 C -5 -7 -3 -5 -1 -2 C 0 1 0 4 0 6" fill={`url(#${pfx('roseSepal')})`} opacity="0.7" />
              <path d="M 0 6 C 4 4 6 0 6 -4 C 5 -7 3 -5 1 -2 C 0 1 0 4 0 6" fill={`url(#${pfx('roseSepal')})`} opacity="0.7" />
              <path d="M -2 -1 C -2.5 -6 -1 -12 0 -14 C 1 -12 2.5 -6 2 -1" fill={`url(#${pfx('rosePetalOuter')})`} opacity="0.75" />
            </g>
          </g>
        </g>
      )}

      {/* ── Stage 7: Harvest — golden glow + floating red petal particles ── */}
      {stage >= 7 && (
        <g>
          {/* Re-render the full bloom at stage 7 (slightly faded) */}
          <g transform="translate(100, 98)" filter={`url(#${pfx('softShadow')})`}>
            {Array.from({ length: 10 }, (_, i) => {
              const deg = (360 / 10) * i;
              return (
                <path key={`h-outer-${i}`}
                  d="M 0 0 C -7 -5 -11 -18 -10 -30 C -9 -35 -5 -37 -2 -34 C 1 -31 4 -24 5 -18 C 6 -12 4 -5 0 0"
                  fill={`url(#${pfx('rosePetalOuter')})`} transform={`rotate(${deg})`} opacity="0.65" />
              );
            })}
            {Array.from({ length: 10 }, (_, i) => {
              const deg = (360 / 10) * i + 18;
              return (
                <path key={`h-mid-${i}`}
                  d="M 0 0 C -5 -4 -9 -14 -8 -24 C -7 -28 -4 -29 -2 -27 C 0 -25 3 -19 4 -14 C 5 -9 3 -4 0 0"
                  fill={`url(#${pfx('rosePetalInner')})`} transform={`rotate(${deg})`} opacity="0.7" />
              );
            })}
            {Array.from({ length: 8 }, (_, i) => {
              const deg = (360 / 8) * i + 8;
              return (
                <path key={`h-inner-${i}`}
                  d="M 0 0 C -4 -3 -7 -10 -6 -17 C -5 -20 -3 -21 -1 -19 C 1 -17 3 -12 3 -9 C 3 -5 2 -2 0 0"
                  fill={`url(#${pfx('rosePetalDeep')})`} transform={`rotate(${deg})`} opacity="0.75" />
              );
            })}
            <circle r="5" fill={`url(#${pfx('roseStamen')})`} opacity="0.7" />
          </g>

          {/* Golden harvest glow aura */}
          <circle cx="100" cy="120" r="80" fill={`url(#${pfx('harvestGlow')})`} className="animate-pulse" />

          {/* Floating red petal particles */}
          {[
            { x: 145, y: 75, rot: 25, delay: '0s' },
            { x: 55, y: 68, rot: -35, delay: '1.1s' },
            { x: 160, y: 100, rot: 50, delay: '2.4s' },
            { x: 42, y: 92, rot: -20, delay: '3.6s' },
            { x: 135, y: 60, rot: 65, delay: '1.7s' },
            { x: 65, y: 108, rot: -45, delay: '0.5s' },
            { x: 120, y: 55, rot: 15, delay: '2.8s' },
            { x: 80, y: 80, rot: -60, delay: '4.0s' },
          ].map((p, i) => (
            <g key={`float-${i}`} className="animate-float-away" style={{ animationDelay: p.delay }}>
              {/* Floating rose petal — deep red with velvety feel */}
              <path
                d={`M ${p.x} ${p.y} C ${p.x - 4} ${p.y - 3} ${p.x - 5} ${p.y - 8} ${p.x - 3} ${p.y - 12} C ${p.x - 1} ${p.y - 14} ${p.x + 2} ${p.y - 12} ${p.x + 3} ${p.y - 8} C ${p.x + 4} ${p.y - 5} ${p.x + 2} ${p.y - 2} ${p.x} ${p.y}`}
                fill="#c41e3a"
                opacity="0.55"
                transform={`rotate(${p.rot} ${p.x} ${p.y})`}
              />
              {/* Petal velvety highlight */}
              <path
                d={`M ${p.x} ${p.y} C ${p.x - 2} ${p.y - 2} ${p.x - 2.5} ${p.y - 5} ${p.x - 1} ${p.y - 8} C ${p.x} ${p.y - 9} ${p.x + 1} ${p.y - 7} ${p.x + 1.5} ${p.y - 5} C ${p.x + 2} ${p.y - 3} ${p.x + 1} ${p.y - 1} ${p.x} ${p.y}`}
                fill="#e8304e"
                opacity="0.3"
                transform={`rotate(${p.rot} ${p.x} ${p.y})`}
              />
            </g>
          ))}
        </g>
      )}
    </g>
  );
}
