export function birdOfParadiseGradients(pfx: (name: string) => string) {
  return (
    <>
      {/* Stem gradient — thick tropical green */}
      <linearGradient id={pfx('bopStem')} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#2d5a20" />
        <stop offset="30%" stopColor="#3a6b2a" />
        <stop offset="55%" stopColor="#4a8038" />
        <stop offset="80%" stopColor="#3a6b2a" />
        <stop offset="100%" stopColor="#2d5a20" />
      </linearGradient>

      {/* Stem highlight */}
      <linearGradient id={pfx('bopStemHi')} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#60a040" stopOpacity="0" />
        <stop offset="40%" stopColor="#80c058" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#60a040" stopOpacity="0" />
      </linearGradient>

      {/* Large paddle leaf gradient — banana-leaf style */}
      <linearGradient id={pfx('bopLeaf')} x1="0.2" y1="0" x2="0.8" y2="1">
        <stop offset="0%" stopColor="#5a8a3c" />
        <stop offset="40%" stopColor="#4a7a30" />
        <stop offset="100%" stopColor="#3a6524" />
      </linearGradient>

      {/* Leaf highlight */}
      <linearGradient id={pfx('bopLeafHi')} x1="0.3" y1="0" x2="0.7" y2="1">
        <stop offset="0%" stopColor="#88c060" stopOpacity="0.5" />
        <stop offset="50%" stopColor="#70a848" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#5a8a3c" stopOpacity="0" />
      </linearGradient>

      {/* Leaf dark side */}
      <linearGradient id={pfx('bopLeafDk')} x1="0" y1="0" x2="1" y2="0.5">
        <stop offset="0%" stopColor="#2d5a18" />
        <stop offset="100%" stopColor="#3a6524" />
      </linearGradient>

      {/* Spathe gradient — green/purple boat shape */}
      <linearGradient id={pfx('bopSpathe')} x1="0" y1="0" x2="1" y2="0.5">
        <stop offset="0%" stopColor="#2d6830" />
        <stop offset="40%" stopColor="#3a6040" />
        <stop offset="70%" stopColor="#4a3868" />
        <stop offset="100%" stopColor="#3a2858" />
      </linearGradient>

      {/* Orange sepal gradient — vivid fiery crest */}
      <linearGradient id={pfx('bopSepal')} x1="0.5" y1="1" x2="0.5" y2="0">
        <stop offset="0%" stopColor="#ff8c00" />
        <stop offset="40%" stopColor="#ff6b00" />
        <stop offset="100%" stopColor="#ff5500" />
      </linearGradient>

      {/* Orange sepal highlight */}
      <linearGradient id={pfx('bopSepalHi')} x1="0.3" y1="0" x2="0.7" y2="1">
        <stop offset="0%" stopColor="#ffaa30" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#ff8c00" stopOpacity="0" />
      </linearGradient>

      {/* Blue-purple petal gradient — arrow tongue */}
      <linearGradient id={pfx('bopPetal')} x1="0" y1="0.5" x2="1" y2="0.5">
        <stop offset="0%" stopColor="#4169e1" />
        <stop offset="50%" stopColor="#3358d0" />
        <stop offset="100%" stopColor="#1e3a8a" />
      </linearGradient>

      {/* Blue petal highlight */}
      <linearGradient id={pfx('bopPetalHi')} x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor="#6090ff" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#4169e1" stopOpacity="0" />
      </linearGradient>

      {/* Seed gradient — dark with orange tuft */}
      <radialGradient id={pfx('bopSeed')} cx="40%" cy="35%" r="60%">
        <stop offset="0%" stopColor="#3a3030" />
        <stop offset="50%" stopColor="#1a1414" />
        <stop offset="100%" stopColor="#0a0808" />
      </radialGradient>

      {/* Seed tuft gradient */}
      <radialGradient id={pfx('bopTuft')} cx="50%" cy="80%" r="70%">
        <stop offset="0%" stopColor="#ff8c00" />
        <stop offset="60%" stopColor="#ff6b00" />
        <stop offset="100%" stopColor="#cc5500" stopOpacity="0.4" />
      </radialGradient>

      {/* Flower stalk — slightly different from leaf stems */}
      <linearGradient id={pfx('bopStalk')} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#2d6830" />
        <stop offset="50%" stopColor="#4a8848" />
        <stop offset="100%" stopColor="#2d6830" />
      </linearGradient>
    </>
  );
}

export function renderBirdOfParadise(stage: number, pfx: (name: string) => string) {
  return (
    <g>
      {/* ── Stage 1: Hard black seed with orange tuft ── */}
      {stage >= 1 && stage < 2 && (
        <g transform="translate(100, 262)" filter={`url(#${pfx('softShadow')})`}>
          {/* Seed shadow */}
          <ellipse cx="1" cy="5" rx="5" ry="2" fill="#3a2518" opacity="0.2" />
          {/* Seed body — hard, dark, nearly black */}
          <ellipse cx="0" cy="0" rx="5" ry="6.5" fill={`url(#${pfx('bopSeed')})`} />
          <ellipse cx="0" cy="0" rx="5" ry="6.5" fill="none" stroke="#2a1a1a" strokeWidth="0.5" />
          {/* Seed ridge */}
          <path d="M 0 -5.5 C 0.5 -2 0.5 2 0 5.5" stroke="#4a3a3a" strokeWidth="0.6" fill="none" opacity="0.4" />
          {/* Highlight */}
          <ellipse cx="-1.5" cy="-1.5" rx="2" ry="2.5" fill="#5a4a4a" opacity="0.2" />
          {/* Orange tuft of fluff on top */}
          <g transform="translate(0, -7)">
            <path d="M 0 0 C -2 -4 -1 -8 0 -10 C 1 -8 2 -4 0 0" fill={`url(#${pfx('bopTuft')})`} opacity="0.8" />
            <path d="M -1 -1 C -4 -3 -5 -6 -4 -8 C -3 -6 -1 -4 -1 -1" fill="#ff8c00" opacity="0.6" />
            <path d="M 1 -1 C 4 -3 5 -6 4 -8 C 3 -6 1 -4 1 -1" fill="#ff8c00" opacity="0.6" />
            <path d="M 0 -1 C -1 -5 0 -9 1 -11 C 1.5 -9 1 -5 0 -1" fill="#ffaa30" opacity="0.4" />
          </g>
        </g>
      )}

      {/* ── Stage 2: Two large paddle-shaped leaves ── */}
      {stage >= 2 && (() => {
        const leafScale = stage >= 5 ? 1.2 : stage >= 4 ? 1.1 : stage >= 3 ? 1.0 : 0.85;
        return (
          <g>
            {/* Thick central stems emerging from soil */}
            <g filter={`url(#${pfx('softShadow')})`}>
              {/* Left leaf stem */}
              <path
                d={`M 94 264 C 92 248 88 232 82 ${stage >= 4 ? 190 : 210}`}
                stroke={`url(#${pfx('bopStem')})`}
                strokeWidth={stage >= 4 ? 4.5 : 3.5}
                fill="none"
                strokeLinecap="round"
              />
              <path
                d={`M 93.5 260 C 91.5 246 87.5 230 81.5 ${stage >= 4 ? 192 : 212}`}
                stroke={`url(#${pfx('bopStemHi')})`}
                strokeWidth={stage >= 4 ? 2 : 1.5}
                fill="none"
                strokeLinecap="round"
              />
              {/* Right leaf stem */}
              <path
                d={`M 106 264 C 108 248 112 232 118 ${stage >= 4 ? 190 : 210}`}
                stroke={`url(#${pfx('bopStem')})`}
                strokeWidth={stage >= 4 ? 4.5 : 3.5}
                fill="none"
                strokeLinecap="round"
              />
              <path
                d={`M 106.5 260 C 108.5 246 112.5 230 118.5 ${stage >= 4 ? 192 : 212}`}
                stroke={`url(#${pfx('bopStemHi')})`}
                strokeWidth={stage >= 4 ? 2 : 1.5}
                fill="none"
                strokeLinecap="round"
              />
            </g>

            {/* Left paddle leaf */}
            <g transform={`translate(82, ${stage >= 4 ? 190 : 210}) scale(${leafScale})`} filter={`url(#${pfx('softShadow')})`}>
              <path
                d="M 0 0 C -8 -10 -22 -30 -28 -50 C -30 -60 -28 -68 -22 -72 C -16 -76 -8 -72 -4 -60 C 0 -48 2 -28 0 0"
                fill={`url(#${pfx('bopLeaf')})`}
              />
              <path
                d="M 0 0 C -6 -10 -18 -28 -24 -48 C -26 -56 -24 -64 -20 -68 C -15 -71 -9 -68 -5 -58 C -1 -46 1 -28 0 0"
                fill={`url(#${pfx('bopLeafHi')})`}
                opacity="0.4"
              />
              {/* Midrib */}
              <path
                d="M 0 0 C -5 -12 -16 -35 -20 -55 C -22 -62 -20 -68 -16 -70"
                stroke="#2d5a18"
                strokeWidth="0.8"
                fill="none"
                opacity="0.6"
              />
              {/* Side veins */}
              {[-15, -25, -35, -45, -55].map((y, i) => (
                <g key={`lv-${i}`}>
                  <path
                    d={`M ${-3 - i * 2} ${y} C ${-8 - i * 2} ${y - 3} ${-14 - i} ${y - 5} ${-18 - i} ${y - 4}`}
                    stroke="#3a6020"
                    strokeWidth="0.3"
                    fill="none"
                    opacity="0.4"
                  />
                  <path
                    d={`M ${-3 - i * 2} ${y} C ${-1 - i} ${y + 3} ${1 - i * 0.5} ${y + 5} ${2} ${y + 4}`}
                    stroke="#3a6020"
                    strokeWidth="0.25"
                    fill="none"
                    opacity="0.35"
                  />
                </g>
              ))}
            </g>

            {/* Right paddle leaf */}
            <g transform={`translate(118, ${stage >= 4 ? 190 : 210}) scale(${leafScale})`} filter={`url(#${pfx('softShadow')})`}>
              <path
                d="M 0 0 C 8 -10 22 -30 28 -50 C 30 -60 28 -68 22 -72 C 16 -76 8 -72 4 -60 C 0 -48 -2 -28 0 0"
                fill={`url(#${pfx('bopLeaf')})`}
              />
              <path
                d="M 0 0 C 6 -10 18 -28 24 -48 C 26 -56 24 -64 20 -68 C 15 -71 9 -68 5 -58 C 1 -46 -1 -28 0 0"
                fill={`url(#${pfx('bopLeafHi')})`}
                opacity="0.4"
              />
              {/* Midrib */}
              <path
                d="M 0 0 C 5 -12 16 -35 20 -55 C 22 -62 20 -68 16 -70"
                stroke="#2d5a18"
                strokeWidth="0.8"
                fill="none"
                opacity="0.6"
              />
              {/* Side veins */}
              {[-15, -25, -35, -45, -55].map((y, i) => (
                <g key={`rv-${i}`}>
                  <path
                    d={`M ${3 + i * 2} ${y} C ${8 + i * 2} ${y - 3} ${14 + i} ${y - 5} ${18 + i} ${y - 4}`}
                    stroke="#3a6020"
                    strokeWidth="0.3"
                    fill="none"
                    opacity="0.4"
                  />
                  <path
                    d={`M ${3 + i * 2} ${y} C ${1 + i} ${y + 3} ${-1 + i * 0.5} ${y + 5} ${-2} ${y + 4}`}
                    stroke="#3a6020"
                    strokeWidth="0.25"
                    fill="none"
                    opacity="0.35"
                  />
                </g>
              ))}
            </g>
          </g>
        );
      })()}

      {/* ── Stage 3: Fan of 4-5 large paddle leaves spreading outward ── */}
      {stage >= 3 && (() => {
        const extraLeaves = [
          { stemD: 'M 98 264 C 94 240 78 210 68 185', leafX: 68, leafY: 185, rot: -25, side: 'left' },
          { stemD: 'M 102 264 C 106 240 122 210 132 185', leafX: 132, leafY: 185, rot: 25, side: 'right' },
          ...(stage >= 4 ? [
            { stemD: 'M 96 264 C 90 235 72 200 58 175', leafX: 58, leafY: 175, rot: -40, side: 'left' },
          ] : []),
        ];
        const lScale = stage >= 5 ? 0.9 : 0.75;
        return (
          <g>
            {extraLeaves.map((leaf, idx) => (
              <g key={`extra-${idx}`}>
                {/* Leaf stem */}
                <path
                  d={leaf.stemD}
                  stroke={`url(#${pfx('bopStem')})`}
                  strokeWidth={3}
                  fill="none"
                  strokeLinecap="round"
                  filter={`url(#${pfx('softShadow')})`}
                />
                {/* Paddle leaf */}
                <g transform={`translate(${leaf.leafX}, ${leaf.leafY}) rotate(${leaf.rot}) scale(${lScale})`} filter={`url(#${pfx('softShadow')})`}>
                  {leaf.side === 'left' ? (
                    <>
                      <path
                        d="M 0 0 C -7 -8 -18 -25 -23 -42 C -25 -50 -23 -56 -18 -59 C -13 -62 -7 -58 -4 -48 C 0 -38 1 -22 0 0"
                        fill={`url(#${pfx('bopLeaf')})`}
                      />
                      <path
                        d="M 0 0 C -5 -8 -15 -23 -20 -40 C -22 -47 -20 -53 -16 -55 C -12 -58 -7 -55 -4 -46 C -1 -36 0 -22 0 0"
                        fill={`url(#${pfx('bopLeafHi')})`}
                        opacity="0.35"
                      />
                      <path
                        d="M 0 0 C -4 -10 -14 -28 -17 -44 C -18 -50 -17 -55 -14 -57"
                        stroke="#2d5a18"
                        strokeWidth="0.7"
                        fill="none"
                        opacity="0.5"
                      />
                    </>
                  ) : (
                    <>
                      <path
                        d="M 0 0 C 7 -8 18 -25 23 -42 C 25 -50 23 -56 18 -59 C 13 -62 7 -58 4 -48 C 0 -38 -1 -22 0 0"
                        fill={`url(#${pfx('bopLeaf')})`}
                      />
                      <path
                        d="M 0 0 C 5 -8 15 -23 20 -40 C 22 -47 20 -53 16 -55 C 12 -58 7 -55 4 -46 C 1 -36 0 -22 0 0"
                        fill={`url(#${pfx('bopLeafHi')})`}
                        opacity="0.35"
                      />
                      <path
                        d="M 0 0 C 4 -10 14 -28 17 -44 C 18 -50 17 -55 14 -57"
                        stroke="#2d5a18"
                        strokeWidth="0.7"
                        fill="none"
                        opacity="0.5"
                      />
                    </>
                  )}
                </g>
              </g>
            ))}
          </g>
        );
      })()}

      {/* ── Stage 4: Boat-shaped spathe bud on tall stalk ── */}
      {stage >= 4 && stage < 5 && (
        <g>
          {/* Flower stalk — tall, emerging from leaf center */}
          <path
            d="M 100 258 C 101 230 102 190 103 150"
            stroke={`url(#${pfx('bopStalk')})`}
            strokeWidth={4}
            fill="none"
            strokeLinecap="round"
            filter={`url(#${pfx('softShadow')})`}
          />
          {/* Pointed boat-shaped spathe — the "beak" */}
          <g transform="translate(103, 145) rotate(-15)" filter={`url(#${pfx('dropShadow')})`}>
            {/* Spathe body — elongated, pointed, slightly curved like a canoe */}
            <path
              d="M -20 0 C -18 -4 -8 -6 5 -5 C 18 -4 28 -2 32 0 C 28 2 18 4 5 3 C -8 3 -18 2 -20 0"
              fill={`url(#${pfx('bopSpathe')})`}
            />
            {/* Spathe outline */}
            <path
              d="M -20 0 C -18 -4 -8 -6 5 -5 C 18 -4 28 -2 32 0 C 28 2 18 4 5 3 C -8 3 -18 2 -20 0"
              fill="none"
              stroke="#1a3a1a"
              strokeWidth="0.5"
              opacity="0.4"
            />
            {/* Spathe ridge */}
            <path
              d="M -18 0 C -10 -0.5 10 -0.8 30 0"
              stroke="#4a8848"
              strokeWidth="0.5"
              fill="none"
              opacity="0.4"
            />
            {/* Tip hint of color — orange peeking out */}
            <path
              d="M 18 -3 C 22 -4 26 -3.5 30 -1"
              stroke="#ff6b00"
              strokeWidth="1"
              fill="none"
              opacity="0.4"
            />
          </g>
        </g>
      )}

      {/* ── Stage 5: First flower opening — bird head shape ── */}
      {stage >= 5 && stage < 6 && (
        <g>
          {/* Flower stalk */}
          <path
            d="M 100 258 C 101 225 102 180 103 140"
            stroke={`url(#${pfx('bopStalk')})`}
            strokeWidth={4.5}
            fill="none"
            strokeLinecap="round"
            filter={`url(#${pfx('softShadow')})`}
          />

          {/* Single flower head — bird in profile */}
          <g transform="translate(103, 135) rotate(-10)" filter={`url(#${pfx('dropShadow')})`}>
            {/* Spathe — the beak, pointing right */}
            <path
              d="M -22 2 C -20 -3 -8 -6 8 -5 C 22 -4 34 -1 38 2 C 34 4 22 6 8 5 C -8 5 -20 4 -22 2"
              fill={`url(#${pfx('bopSpathe')})`}
            />
            <path
              d="M -22 2 C -20 -3 -8 -6 8 -5 C 22 -4 34 -1 38 2"
              fill="none"
              stroke="#1a3a1a"
              strokeWidth="0.4"
              opacity="0.3"
            />

            {/* Orange sepals — the crest, fanning upward from the spathe */}
            {/* First sepal — tallest, center */}
            <path
              d="M 5 -5 C 3 -14 1 -28 3 -40 C 5 -46 9 -46 10 -40 C 11 -28 9 -14 7 -5"
              fill={`url(#${pfx('bopSepal')})`}
            />
            <path
              d="M 5.5 -6 C 4 -14 2 -26 3.5 -38 C 5 -43 8 -43 9 -38 C 10 -26 8.5 -14 7 -6"
              fill={`url(#${pfx('bopSepalHi')})`}
              opacity="0.5"
            />
            {/* Second sepal — slightly shorter, angled left */}
            <path
              d="M 2 -4 C -2 -12 -5 -24 -3 -33 C -1 -37 3 -38 4 -33 C 5 -24 4 -12 4 -4"
              fill={`url(#${pfx('bopSepal')})`}
              opacity="0.85"
            />

            {/* Blue-purple petal tongue — pointing forward/right */}
            <path
              d="M 8 1 C 16 -1 28 -2 38 -1 C 42 -0.5 42 2.5 38 3 C 28 4 16 3 8 2"
              fill={`url(#${pfx('bopPetal')})`}
            />
            <path
              d="M 10 1 C 16 0 26 -0.5 36 0 C 38 0.3 38 2 36 2.2 C 26 2.8 16 2.5 10 2"
              fill={`url(#${pfx('bopPetalHi')})`}
              opacity="0.35"
            />
            {/* Second blue petal — slightly lower */}
            <path
              d="M 10 3 C 18 2.5 28 2 35 3 C 38 3.5 38 5.5 35 5.8 C 28 6 18 5.5 10 4.5"
              fill={`url(#${pfx('bopPetal')})`}
              opacity="0.7"
            />
          </g>
        </g>
      )}

      {/* ── Stage 6: Full bloom — 2-3 dramatic flower heads ── */}
      {stage >= 6 && stage < 7 && (
        <g>
          {/* Three flower stalks rising from the leaf fan */}
          {/* Center stalk (tallest) */}
          <path
            d="M 100 258 C 101 220 102 170 100 120"
            stroke={`url(#${pfx('bopStalk')})`}
            strokeWidth={4.5}
            fill="none"
            strokeLinecap="round"
            filter={`url(#${pfx('softShadow')})`}
          />
          {/* Left stalk */}
          <path
            d="M 96 260 C 92 225 86 185 80 148"
            stroke={`url(#${pfx('bopStalk')})`}
            strokeWidth={3.5}
            fill="none"
            strokeLinecap="round"
            filter={`url(#${pfx('softShadow')})`}
          />
          {/* Right stalk */}
          <path
            d="M 104 260 C 110 228 118 190 126 155"
            stroke={`url(#${pfx('bopStalk')})`}
            strokeWidth={3.5}
            fill="none"
            strokeLinecap="round"
            filter={`url(#${pfx('softShadow')})`}
          />

          {/* ── Center flower head (largest, most detailed) ── */}
          <g transform="translate(100, 115) rotate(-8)" filter={`url(#${pfx('dropShadow')})`}>
            {/* Spathe beak */}
            <path
              d="M -24 2 C -22 -4 -10 -7 10 -6 C 26 -5 38 -2 42 2 C 38 5 26 7 10 6 C -10 6 -22 5 -24 2"
              fill={`url(#${pfx('bopSpathe')})`}
            />
            {/* Three orange sepals — dramatic crest fanning upward */}
            <path
              d="M 6 -6 C 4 -16 1 -34 3 -48 C 5 -54 10 -54 11 -48 C 13 -34 10 -16 8 -6"
              fill={`url(#${pfx('bopSepal')})`}
            />
            <path
              d="M 6.5 -7 C 5 -16 2 -32 3.5 -46 C 5 -51 9 -51 10 -46 C 11 -32 9.5 -16 8 -7"
              fill={`url(#${pfx('bopSepalHi')})`}
              opacity="0.45"
            />
            <path
              d="M 1 -5 C -3 -14 -7 -28 -5 -40 C -3 -45 2 -46 3 -40 C 5 -28 4 -14 3 -5"
              fill={`url(#${pfx('bopSepal')})`}
              opacity="0.9"
            />
            <path
              d="M 11 -5 C 13 -12 16 -22 15 -32 C 14 -36 10 -37 9 -32 C 8 -22 9 -12 10 -5"
              fill={`url(#${pfx('bopSepal')})`}
              opacity="0.8"
            />

            {/* Blue-purple arrow-shaped petals pointing forward */}
            <path
              d="M 10 0 C 20 -2 34 -3 44 -1 C 48 -0.3 48 2.3 44 3 C 34 4.5 20 3.5 10 2"
              fill={`url(#${pfx('bopPetal')})`}
            />
            <path
              d="M 12 0.5 C 20 -0.5 32 -1 42 0 C 44 0.3 44 2 42 2.3 C 32 3 20 2.5 12 1.8"
              fill={`url(#${pfx('bopPetalHi')})`}
              opacity="0.3"
            />
            <path
              d="M 12 3 C 22 2.5 34 2 42 3.5 C 45 4 45 6 42 6.3 C 34 7 22 6 12 4.5"
              fill={`url(#${pfx('bopPetal')})`}
              opacity="0.75"
            />
          </g>

          {/* ── Left flower head ── */}
          <g transform="translate(80, 142) rotate(-20)" filter={`url(#${pfx('dropShadow')})`}>
            {/* Spathe */}
            <path
              d="M -18 1.5 C -16 -2.5 -6 -5 8 -4 C 20 -3 28 -1 32 1.5 C 28 3.5 20 5 8 4.5 C -6 4.5 -16 3.5 -18 1.5"
              fill={`url(#${pfx('bopSpathe')})`}
            />
            {/* Orange sepals */}
            <path
              d="M 4 -4 C 2 -12 0 -24 2 -34 C 3.5 -38 7 -38 8 -34 C 9 -24 7 -12 6 -4"
              fill={`url(#${pfx('bopSepal')})`}
            />
            <path
              d="M 0 -3 C -2 -10 -4 -20 -3 -28 C -2 -32 1 -32 2 -28 C 3 -20 2 -10 1 -3"
              fill={`url(#${pfx('bopSepal')})`}
              opacity="0.85"
            />
            <path
              d="M 8 -3 C 10 -8 12 -16 11 -22 C 10 -25 8 -25 7 -22 C 6 -16 7 -8 7 -3"
              fill={`url(#${pfx('bopSepal')})`}
              opacity="0.7"
            />
            {/* Blue petals */}
            <path
              d="M 8 0 C 16 -1 26 -2 34 -0.5 C 36 0 36 2 34 2.5 C 26 3.5 16 2.5 8 1.5"
              fill={`url(#${pfx('bopPetal')})`}
            />
            <path
              d="M 9 2.5 C 18 2 26 1.5 32 2.5 C 34 3 34 4.5 32 4.8 C 26 5.5 18 4.5 9 3.5"
              fill={`url(#${pfx('bopPetal')})`}
              opacity="0.7"
            />
          </g>

          {/* ── Right flower head ── */}
          <g transform="translate(126, 150) rotate(5)" filter={`url(#${pfx('dropShadow')})`}>
            {/* Spathe */}
            <path
              d="M -18 1.5 C -16 -2.5 -6 -5 8 -4 C 20 -3 28 -1 32 1.5 C 28 3.5 20 5 8 4.5 C -6 4.5 -16 3.5 -18 1.5"
              fill={`url(#${pfx('bopSpathe')})`}
            />
            {/* Orange sepals */}
            <path
              d="M 5 -4 C 3 -12 1 -24 3 -34 C 4.5 -38 8 -38 9 -34 C 10 -24 8 -12 7 -4"
              fill={`url(#${pfx('bopSepal')})`}
            />
            <path
              d="M 1 -3 C -1 -10 -3 -18 -2 -26 C -1 -30 2 -30 3 -26 C 4 -18 3 -10 2 -3"
              fill={`url(#${pfx('bopSepal')})`}
              opacity="0.85"
            />
            <path
              d="M 9 -3 C 11 -8 13 -16 12 -22 C 11 -25 9 -25 8 -22 C 7 -16 8 -8 8 -3"
              fill={`url(#${pfx('bopSepal')})`}
              opacity="0.7"
            />
            {/* Blue petals */}
            <path
              d="M 8 0 C 16 -1 26 -2 34 -0.5 C 36 0 36 2 34 2.5 C 26 3.5 16 2.5 8 1.5"
              fill={`url(#${pfx('bopPetal')})`}
            />
            <path
              d="M 9 2.5 C 18 2 26 1.5 32 2.5 C 34 3 34 4.5 32 4.8 C 26 5.5 18 4.5 9 3.5"
              fill={`url(#${pfx('bopPetal')})`}
              opacity="0.7"
            />
          </g>
        </g>
      )}

      {/* ── Stage 7: Harvest — golden glow + floating particles ── */}
      {stage >= 7 && (
        <g>
          {/* Re-render full bloom at stage 7 */}
          {/* Three flower stalks */}
          <path
            d="M 100 258 C 101 220 102 170 100 120"
            stroke={`url(#${pfx('bopStalk')})`}
            strokeWidth={4.5}
            fill="none"
            strokeLinecap="round"
            filter={`url(#${pfx('softShadow')})`}
          />
          <path
            d="M 96 260 C 92 225 86 185 80 148"
            stroke={`url(#${pfx('bopStalk')})`}
            strokeWidth={3.5}
            fill="none"
            strokeLinecap="round"
            filter={`url(#${pfx('softShadow')})`}
          />
          <path
            d="M 104 260 C 110 228 118 190 126 155"
            stroke={`url(#${pfx('bopStalk')})`}
            strokeWidth={3.5}
            fill="none"
            strokeLinecap="round"
            filter={`url(#${pfx('softShadow')})`}
          />

          {/* Center flower */}
          <g transform="translate(100, 115) rotate(-8)" filter={`url(#${pfx('dropShadow')})`}>
            <path
              d="M -24 2 C -22 -4 -10 -7 10 -6 C 26 -5 38 -2 42 2 C 38 5 26 7 10 6 C -10 6 -22 5 -24 2"
              fill={`url(#${pfx('bopSpathe')})`}
            />
            <path
              d="M 6 -6 C 4 -16 1 -34 3 -48 C 5 -54 10 -54 11 -48 C 13 -34 10 -16 8 -6"
              fill={`url(#${pfx('bopSepal')})`}
            />
            <path
              d="M 1 -5 C -3 -14 -7 -28 -5 -40 C -3 -45 2 -46 3 -40 C 5 -28 4 -14 3 -5"
              fill={`url(#${pfx('bopSepal')})`}
              opacity="0.9"
            />
            <path
              d="M 11 -5 C 13 -12 16 -22 15 -32 C 14 -36 10 -37 9 -32 C 8 -22 9 -12 10 -5"
              fill={`url(#${pfx('bopSepal')})`}
              opacity="0.8"
            />
            <path
              d="M 10 0 C 20 -2 34 -3 44 -1 C 48 -0.3 48 2.3 44 3 C 34 4.5 20 3.5 10 2"
              fill={`url(#${pfx('bopPetal')})`}
            />
            <path
              d="M 12 3 C 22 2.5 34 2 42 3.5 C 45 4 45 6 42 6.3 C 34 7 22 6 12 4.5"
              fill={`url(#${pfx('bopPetal')})`}
              opacity="0.75"
            />
          </g>

          {/* Left flower */}
          <g transform="translate(80, 142) rotate(-20)" filter={`url(#${pfx('dropShadow')})`}>
            <path
              d="M -18 1.5 C -16 -2.5 -6 -5 8 -4 C 20 -3 28 -1 32 1.5 C 28 3.5 20 5 8 4.5 C -6 4.5 -16 3.5 -18 1.5"
              fill={`url(#${pfx('bopSpathe')})`}
            />
            <path
              d="M 4 -4 C 2 -12 0 -24 2 -34 C 3.5 -38 7 -38 8 -34 C 9 -24 7 -12 6 -4"
              fill={`url(#${pfx('bopSepal')})`}
            />
            <path
              d="M 0 -3 C -2 -10 -4 -20 -3 -28 C -2 -32 1 -32 2 -28 C 3 -20 2 -10 1 -3"
              fill={`url(#${pfx('bopSepal')})`}
              opacity="0.85"
            />
            <path
              d="M 8 0 C 16 -1 26 -2 34 -0.5 C 36 0 36 2 34 2.5 C 26 3.5 16 2.5 8 1.5"
              fill={`url(#${pfx('bopPetal')})`}
            />
          </g>

          {/* Right flower */}
          <g transform="translate(126, 150) rotate(5)" filter={`url(#${pfx('dropShadow')})`}>
            <path
              d="M -18 1.5 C -16 -2.5 -6 -5 8 -4 C 20 -3 28 -1 32 1.5 C 28 3.5 20 5 8 4.5 C -6 4.5 -16 3.5 -18 1.5"
              fill={`url(#${pfx('bopSpathe')})`}
            />
            <path
              d="M 5 -4 C 3 -12 1 -24 3 -34 C 4.5 -38 8 -38 9 -34 C 10 -24 8 -12 7 -4"
              fill={`url(#${pfx('bopSepal')})`}
            />
            <path
              d="M 1 -3 C -1 -10 -3 -18 -2 -26 C -1 -30 2 -30 3 -26 C 4 -18 3 -10 2 -3"
              fill={`url(#${pfx('bopSepal')})`}
              opacity="0.85"
            />
            <path
              d="M 8 0 C 16 -1 26 -2 34 -0.5 C 36 0 36 2 34 2.5 C 26 3.5 16 2.5 8 1.5"
              fill={`url(#${pfx('bopPetal')})`}
            />
          </g>

          {/* Golden harvest glow */}
          <circle cx="100" cy="140" r="80" fill={`url(#${pfx('harvestGlow')})`} className="animate-pulse" />

          {/* Floating orange and blue petal particles */}
          {[
            { x: 145, y: 80, color: 'orange', rot: 15, delay: '0s' },
            { x: 55, y: 70, color: 'blue', rot: -25, delay: '1.2s' },
            { x: 160, y: 110, color: 'orange', rot: 40, delay: '2.5s' },
            { x: 40, y: 95, color: 'blue', rot: -10, delay: '3.8s' },
            { x: 135, y: 60, color: 'orange', rot: 55, delay: '1.8s' },
            { x: 65, y: 115, color: 'blue', rot: -45, delay: '0.6s' },
            { x: 150, y: 65, color: 'blue', rot: 30, delay: '2.0s' },
            { x: 48, y: 80, color: 'orange', rot: -35, delay: '3.2s' },
          ].map((p, i) => (
            <g key={`float-${i}`} className="animate-float-away" style={{ animationDelay: p.delay }}>
              {p.color === 'orange' ? (
                <>
                  {/* Orange sepal particle */}
                  <path
                    d={`M ${p.x} ${p.y} C ${p.x - 2} ${p.y - 5} ${p.x - 1} ${p.y - 12} ${p.x} ${p.y - 14} C ${p.x + 1} ${p.y - 12} ${p.x + 2} ${p.y - 5} ${p.x} ${p.y}`}
                    fill="#ff6b00"
                    opacity="0.55"
                    transform={`rotate(${p.rot} ${p.x} ${p.y})`}
                  />
                  <path
                    d={`M ${p.x} ${p.y} C ${p.x - 1} ${p.y - 3} ${p.x - 0.5} ${p.y - 8} ${p.x} ${p.y - 10} C ${p.x + 0.5} ${p.y - 8} ${p.x + 1} ${p.y - 3} ${p.x} ${p.y}`}
                    fill="#ffaa30"
                    opacity="0.3"
                    transform={`rotate(${p.rot} ${p.x} ${p.y})`}
                  />
                </>
              ) : (
                <>
                  {/* Blue petal particle */}
                  <path
                    d={`M ${p.x} ${p.y} C ${p.x - 4} ${p.y - 1} ${p.x - 8} ${p.y - 1.5} ${p.x - 10} ${p.y} C ${p.x - 8} ${p.y + 1.5} ${p.x - 4} ${p.y + 1} ${p.x} ${p.y}`}
                    fill="#4169e1"
                    opacity="0.5"
                    transform={`rotate(${p.rot} ${p.x} ${p.y})`}
                  />
                  <path
                    d={`M ${p.x} ${p.y} C ${p.x - 2.5} ${p.y - 0.5} ${p.x - 5} ${p.y - 0.8} ${p.x - 7} ${p.y} C ${p.x - 5} ${p.y + 0.8} ${p.x - 2.5} ${p.y + 0.5} ${p.x} ${p.y}`}
                    fill="#6090ff"
                    opacity="0.3"
                    transform={`rotate(${p.rot} ${p.x} ${p.y})`}
                  />
                </>
              )}
            </g>
          ))}
        </g>
      )}
    </g>
  );
}
