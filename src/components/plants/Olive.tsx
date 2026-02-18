export function oliveGradients(pfx: (name: string) => string) {
  return (
    <>
      {/* Gnarled trunk — weathered gray-brown */}
      <linearGradient id={pfx('olvTrunk')} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#5a4830" />
        <stop offset="20%" stopColor="#6b5535" />
        <stop offset="45%" stopColor="#8a7050" />
        <stop offset="60%" stopColor="#7a6242" />
        <stop offset="80%" stopColor="#6b5535" />
        <stop offset="100%" stopColor="#5a4830" />
      </linearGradient>

      {/* Trunk bark texture highlight */}
      <linearGradient id={pfx('olvBark')} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#9a8560" stopOpacity="0" />
        <stop offset="35%" stopColor="#a89068" stopOpacity="0.3" />
        <stop offset="65%" stopColor="#9a8560" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#9a8560" stopOpacity="0" />
      </linearGradient>

      {/* Silvery-green foliage */}
      <radialGradient id={pfx('olvLeaf')} cx="45%" cy="40%" r="55%">
        <stop offset="0%" stopColor="#a0b880" />
        <stop offset="40%" stopColor="#8aaa68" />
        <stop offset="75%" stopColor="#7a9860" />
        <stop offset="100%" stopColor="#607848" />
      </radialGradient>

      {/* Green olive fruit */}
      <radialGradient id={pfx('olvFruit')} cx="35%" cy="30%" r="60%">
        <stop offset="0%" stopColor="#8aa870" />
        <stop offset="40%" stopColor="#6a8850" />
        <stop offset="100%" stopColor="#4a6830" />
      </radialGradient>

      {/* Ripe purple olive */}
      <radialGradient id={pfx('olvFruitRipe')} cx="35%" cy="30%" r="60%">
        <stop offset="0%" stopColor="#7a5080" />
        <stop offset="40%" stopColor="#6a4070" />
        <stop offset="100%" stopColor="#5a3060" />
      </radialGradient>
    </>
  );
}

export function renderOlive(stage: number, pfx: (name: string) => string) {
  return (
    <g>
      {/* ── Stage 1: Olive pit ── */}
      {stage >= 1 && (
        <g transform="translate(100, 262)" filter={`url(#${pfx('softShadow')})`}>
          {/* Ground shadow */}
          <ellipse cx="0" cy="5" rx="5" ry="1.5" fill="#3a2518" opacity="0.15" />
          {/* Olive pit — elongated oval */}
          <ellipse cx="0" cy="0" rx="4" ry="6.5" fill="#5a3e20" transform="rotate(-8)" />
          <ellipse cx="0" cy="0" rx="4" ry="6.5" fill="none" stroke="#4a3018" strokeWidth="0.5" opacity="0.6" transform="rotate(-8)" />
          {/* Pit texture — longitudinal ridges */}
          <path d="M -1 -5 C -1.2 -2 -0.8 2 -0.5 5" stroke="#6b4e2a" strokeWidth="0.4" fill="none" opacity="0.4" transform="rotate(-8)" />
          <path d="M 1.2 -4.5 C 1.4 -1.5 1 2.5 0.8 4.8" stroke="#6b4e2a" strokeWidth="0.35" fill="none" opacity="0.35" transform="rotate(-8)" />
          {/* Highlight */}
          <ellipse cx="-1.2" cy="-2" rx="1.5" ry="3" fill="#7a5e38" opacity="0.25" transform="rotate(-8)" />
          {/* Pointed tip */}
          <path d="M 0 -6 C 0.3 -7 0 -7.5 -0.2 -7" stroke="#4a3018" strokeWidth="0.3" fill="none" opacity="0.5" transform="rotate(-8)" />
        </g>
      )}

      {/* ── Stage 2: Roots + silvery sprout ── */}
      {stage >= 2 && (
        <g>
          {/* Underground roots */}
          <g opacity="0.55">
            <path d="M 100 266 C 98 274 94 282 89 290" stroke="#7a5d3a" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <path d="M 100 266 C 102 274 107 283 113 291" stroke="#7a5d3a" strokeWidth="1" fill="none" strokeLinecap="round" />
            <path d="M 100 270 C 96 275 91 279 86 282" stroke="#7a5d3a" strokeWidth="0.7" fill="none" strokeLinecap="round" />
            <path d="M 100 270 C 104 276 109 280 114 283" stroke="#7a5d3a" strokeWidth="0.65" fill="none" strokeLinecap="round" />
            {/* Fine root tips */}
            <path d="M 92 284 C 89 287 86 289 83 290" stroke="#7a5d3a" strokeWidth="0.35" fill="none" strokeLinecap="round" />
            <path d="M 110 285 C 113 288 116 290 119 291" stroke="#7a5d3a" strokeWidth="0.35" fill="none" strokeLinecap="round" />
          </g>
          {/* Silvery-green sprout */}
          <g transform="translate(100, 260)" filter={`url(#${pfx('softShadow')})`}>
            <path
              d="M 0 0 C -0.3 -4 0.2 -8 0.5 -12"
              stroke="#7a9860"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
            />
            {/* Tiny first leaves — silvery-green */}
            <path
              d="M 0.5 -12 C -1 -14 -4 -15 -5 -13 C -4.5 -11.5 -2 -11 0 -11.5"
              fill="#8aaa68"
              opacity="0.85"
            />
            <path
              d="M 0.5 -12 C 2 -14 5 -15 6 -13 C 5 -11.5 3 -11 1 -11.5"
              fill="#a0b880"
              opacity="0.8"
            />
          </g>
        </g>
      )}

      {/* ── Stage 3: Young twisted trunk forming ── */}
      {stage >= 3 && (
        <g filter={`url(#${pfx('softShadow')})`}>
          {/* Main trunk — beginning twist */}
          <path
            d={`M 100 262 C 99 252 102 242 100 232 C 98 222 103 212 101 ${stage >= 5 ? 155 : 200}`}
            stroke={`url(#${pfx('olvTrunk')})`}
            strokeWidth={stage >= 5 ? 8 : stage >= 4 ? 6 : 4.5}
            fill="none"
            strokeLinecap="round"
          />
          {/* Bark highlight */}
          <path
            d={`M 100 260 C 99 250 102 240 100 230 C 98 220 103 210 101 ${stage >= 5 ? 157 : 202}`}
            stroke={`url(#${pfx('olvBark')})`}
            strokeWidth={stage >= 5 ? 5 : stage >= 4 ? 3.5 : 2.5}
            fill="none"
            strokeLinecap="round"
          />

          {/* Twist texture lines on trunk */}
          {stage >= 4 && (
            <g opacity="0.3">
              <path
                d="M 98 258 C 96 248 101 238 99 228 C 97 218 102 208 100 195"
                stroke="#4a3820"
                strokeWidth="0.6"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M 102 258 C 104 248 99 238 101 228 C 103 218 98 208 100 195"
                stroke="#4a3820"
                strokeWidth="0.5"
                fill="none"
                strokeLinecap="round"
              />
            </g>
          )}

          {/* Secondary twisting trunk element (stage 4+) */}
          {stage >= 4 && (
            <path
              d={`M 98 262 C 96 248 104 235 101 220 C 97 205 103 190 100 ${stage >= 5 ? 160 : 175}`}
              stroke="#6b5535"
              strokeWidth={stage >= 5 ? 5 : 3}
              fill="none"
              strokeLinecap="round"
              opacity="0.5"
            />
          )}

          {/* Stage 3 small branches */}
          {stage === 3 && (
            <>
              <path d="M 101 215 C 108 210 114 208 118 210" stroke={`url(#${pfx('olvTrunk')})`} strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M 100 225 C 93 220 88 218 84 220" stroke={`url(#${pfx('olvTrunk')})`} strokeWidth="1.8" fill="none" strokeLinecap="round" />
              {/* Small leaf clusters */}
              <ellipse cx="118" cy="207" rx="8" ry="6" fill={`url(#${pfx('olvLeaf')})`} opacity="0.7" />
              <ellipse cx="84" cy="217" rx="7" ry="5.5" fill={`url(#${pfx('olvLeaf')})`} opacity="0.65" />
              <ellipse cx="101" cy="197" rx="9" ry="7" fill={`url(#${pfx('olvLeaf')})`} opacity="0.7" />
            </>
          )}
        </g>
      )}

      {/* ── Stage 4: More pronounced twisted trunk + branches with foliage ── */}
      {stage >= 4 && stage < 5 && (
        <g>
          {/* Branches */}
          <g filter={`url(#${pfx('softShadow')})`}>
            {/* Left branch */}
            <path d="M 100 195 C 92 188 82 182 72 180" stroke={`url(#${pfx('olvTrunk')})`} strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 100 195 C 92 188 82 182 72 180" stroke={`url(#${pfx('olvBark')})`} strokeWidth="1.5" fill="none" strokeLinecap="round" />
            {/* Right branch */}
            <path d="M 101 185 C 110 178 120 174 130 175" stroke={`url(#${pfx('olvTrunk')})`} strokeWidth="2.8" fill="none" strokeLinecap="round" />
            <path d="M 101 185 C 110 178 120 174 130 175" stroke={`url(#${pfx('olvBark')})`} strokeWidth="1.3" fill="none" strokeLinecap="round" />
            {/* Upper branch */}
            <path d="M 101 175 C 105 168 108 162 106 158" stroke={`url(#${pfx('olvTrunk')})`} strokeWidth="2.2" fill="none" strokeLinecap="round" />
            {/* Small sub-branches */}
            <path d="M 80 181 C 76 176 72 172 68 171" stroke="#6b5535" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <path d="M 124 175 C 128 170 132 168 136 169" stroke="#6b5535" strokeWidth="1" fill="none" strokeLinecap="round" />
          </g>
          {/* Foliage clouds */}
          <g opacity="0.8">
            <ellipse cx="68" cy="170" rx="14" ry="10" fill={`url(#${pfx('olvLeaf')})`} />
            <ellipse cx="72" cy="176" rx="12" ry="8" fill={`url(#${pfx('olvLeaf')})`} opacity="0.7" />
            <ellipse cx="130" cy="170" rx="15" ry="9" fill={`url(#${pfx('olvLeaf')})`} />
            <ellipse cx="136" cy="166" rx="10" ry="7" fill={`url(#${pfx('olvLeaf')})`} opacity="0.7" />
            <ellipse cx="106" cy="155" rx="13" ry="10" fill={`url(#${pfx('olvLeaf')})`} />
            <ellipse cx="100" cy="162" rx="10" ry="8" fill={`url(#${pfx('olvLeaf')})`} opacity="0.65" />
          </g>
        </g>
      )}

      {/* ── Stage 5+: Full ancient gnarled olive tree ── */}
      {stage >= 5 && (
        <g>
          {/* Heavily twisted trunk detail */}
          <g filter={`url(#${pfx('softShadow')})`}>
            {/* Main gnarled trunk — thick with twists */}
            <path
              d="M 104 262 C 107 250 96 240 103 228 C 110 216 94 206 102 195 C 108 186 96 178 100 168 C 103 160 98 155 100 150"
              stroke={`url(#${pfx('olvTrunk')})`}
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
            />
            {/* Parallel twist strand */}
            <path
              d="M 96 262 C 93 248 104 238 97 226 C 90 214 106 204 98 192 C 92 182 104 174 100 165 C 97 158 102 153 100 148"
              stroke="#6b5535"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              opacity="0.55"
            />
            {/* Bark texture lines */}
            <path
              d="M 102 260 C 105 248 95 238 101 226 C 108 214 93 205 100 194"
              stroke="#4a3820"
              strokeWidth="0.7"
              fill="none"
              opacity="0.35"
            />
            <path
              d="M 98 260 C 95 250 105 240 99 228 C 93 218 106 208 100 196"
              stroke="#4a3820"
              strokeWidth="0.6"
              fill="none"
              opacity="0.3"
            />
            {/* Knot/hollow detail */}
            <ellipse cx="100" cy="225" rx="3.5" ry="5" fill="#3a2a18" opacity="0.4" />
            <ellipse cx="100" cy="225" rx="2.5" ry="3.5" fill="#2a1a10" opacity="0.3" />

            {/* ── Major branches ── */}
            {/* Left lower branch */}
            <path
              d="M 100 185 C 90 178 78 172 64 168"
              stroke={`url(#${pfx('olvTrunk')})`}
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
            />
            <path d="M 100 185 C 90 178 78 172 64 168" stroke={`url(#${pfx('olvBark')})`} strokeWidth="2.5" fill="none" strokeLinecap="round" />
            {/* Left upper branch */}
            <path
              d="M 100 170 C 88 162 74 155 58 152"
              stroke={`url(#${pfx('olvTrunk')})`}
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            {/* Right lower branch */}
            <path
              d="M 100 180 C 112 174 126 170 140 168"
              stroke={`url(#${pfx('olvTrunk')})`}
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
            />
            <path d="M 100 180 C 112 174 126 170 140 168" stroke={`url(#${pfx('olvBark')})`} strokeWidth="2.5" fill="none" strokeLinecap="round" />
            {/* Right upper branch */}
            <path
              d="M 101 165 C 114 158 128 153 144 150"
              stroke={`url(#${pfx('olvTrunk')})`}
              strokeWidth="3.5"
              fill="none"
              strokeLinecap="round"
            />
            {/* Top center branch */}
            <path
              d="M 100 155 C 102 145 104 135 103 125"
              stroke={`url(#${pfx('olvTrunk')})`}
              strokeWidth="3.5"
              fill="none"
              strokeLinecap="round"
            />
            <path d="M 100 155 C 102 145 104 135 103 125" stroke={`url(#${pfx('olvBark')})`} strokeWidth="1.8" fill="none" strokeLinecap="round" />
            {/* Top left branch */}
            <path
              d="M 100 150 C 92 140 82 132 72 128"
              stroke={`url(#${pfx('olvTrunk')})`}
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            {/* Top right branch */}
            <path
              d="M 101 148 C 112 138 124 130 134 128"
              stroke={`url(#${pfx('olvTrunk')})`}
              strokeWidth="2.8"
              fill="none"
              strokeLinecap="round"
            />

            {/* Sub-branches / twigs */}
            <path d="M 68 168 C 62 164 56 162 50 163" stroke="#6b5535" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M 62 155 C 56 150 50 148 44 150" stroke="#6b5535" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <path d="M 136 168 C 142 164 148 162 154 163" stroke="#6b5535" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M 140 153 C 148 149 154 148 160 150" stroke="#6b5535" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <path d="M 103 128 C 106 120 108 114 107 108" stroke="#6b5535" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M 74 130 C 68 124 62 120 56 120" stroke="#6b5535" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <path d="M 130 130 C 138 124 144 120 150 120" stroke="#6b5535" strokeWidth="1" fill="none" strokeLinecap="round" />
          </g>

          {/* ── Foliage: loose silvery-green clouds ── */}
          <g>
            {/* Left foliage cluster */}
            <ellipse cx="52" cy="158" rx="16" ry="11" fill={`url(#${pfx('olvLeaf')})`} opacity="0.65" />
            <ellipse cx="60" cy="150" rx="14" ry="10" fill={`url(#${pfx('olvLeaf')})`} opacity="0.7" />
            <ellipse cx="48" cy="148" rx="12" ry="9" fill={`url(#${pfx('olvLeaf')})`} opacity="0.6" />
            <ellipse cx="64" cy="163" rx="13" ry="9" fill={`url(#${pfx('olvLeaf')})`} opacity="0.6" />

            {/* Right foliage cluster */}
            <ellipse cx="148" cy="158" rx="16" ry="11" fill={`url(#${pfx('olvLeaf')})`} opacity="0.65" />
            <ellipse cx="140" cy="150" rx="14" ry="10" fill={`url(#${pfx('olvLeaf')})`} opacity="0.7" />
            <ellipse cx="155" cy="148" rx="12" ry="9" fill={`url(#${pfx('olvLeaf')})`} opacity="0.6" />
            <ellipse cx="138" cy="164" rx="12" ry="8" fill={`url(#${pfx('olvLeaf')})`} opacity="0.55" />

            {/* Top center foliage */}
            <ellipse cx="103" cy="112" rx="16" ry="13" fill={`url(#${pfx('olvLeaf')})`} opacity="0.7" />
            <ellipse cx="95" cy="108" rx="12" ry="10" fill={`url(#${pfx('olvLeaf')})`} opacity="0.6" />
            <ellipse cx="112" cy="106" rx="13" ry="10" fill={`url(#${pfx('olvLeaf')})`} opacity="0.65" />
            <ellipse cx="107" cy="100" rx="10" ry="8" fill={`url(#${pfx('olvLeaf')})`} opacity="0.55" />

            {/* Top left foliage */}
            <ellipse cx="68" cy="124" rx="14" ry="10" fill={`url(#${pfx('olvLeaf')})`} opacity="0.65" />
            <ellipse cx="58" cy="118" rx="11" ry="9" fill={`url(#${pfx('olvLeaf')})`} opacity="0.55" />
            <ellipse cx="76" cy="130" rx="10" ry="7" fill={`url(#${pfx('olvLeaf')})`} opacity="0.6" />

            {/* Top right foliage */}
            <ellipse cx="136" cy="124" rx="14" ry="10" fill={`url(#${pfx('olvLeaf')})`} opacity="0.65" />
            <ellipse cx="146" cy="118" rx="11" ry="8" fill={`url(#${pfx('olvLeaf')})`} opacity="0.55" />
            <ellipse cx="128" cy="132" rx="10" ry="7" fill={`url(#${pfx('olvLeaf')})`} opacity="0.6" />

            {/* Fill gaps — inner canopy */}
            <ellipse cx="82" cy="140" rx="12" ry="9" fill={`url(#${pfx('olvLeaf')})`} opacity="0.5" />
            <ellipse cx="118" cy="140" rx="12" ry="9" fill={`url(#${pfx('olvLeaf')})`} opacity="0.5" />
            <ellipse cx="100" cy="135" rx="10" ry="8" fill={`url(#${pfx('olvLeaf')})`} opacity="0.45" />

            {/* Individual leaf sprays at edges — small elongated marks */}
            {[
              { cx: 40, cy: 152, r: 15 },
              { cx: 164, cy: 152, r: -15 },
              { cx: 48, cy: 140, r: 20 },
              { cx: 156, cy: 140, r: -20 },
              { cx: 90, cy: 96, r: 10 },
              { cx: 115, cy: 94, r: -12 },
            ].map((l, i) => (
              <ellipse
                key={`leaf-spray-${i}`}
                cx={l.cx}
                cy={l.cy}
                rx="3"
                ry="1.3"
                fill="#a0b880"
                opacity="0.5"
                transform={`rotate(${l.r} ${l.cx} ${l.cy})`}
              />
            ))}
          </g>
        </g>
      )}

      {/* ── Stage 6: Olives hanging from branches ── */}
      {stage >= 6 && (
        <g>
          {/* Green olives — clusters on left branches */}
          {[
            { x: 55, y: 158, ripe: false },
            { x: 50, y: 153, ripe: false },
            { x: 58, y: 162, ripe: true },
            { x: 62, y: 148, ripe: false },
            { x: 46, y: 146, ripe: true },
            { x: 52, y: 143, ripe: false },
          ].map((o, i) => (
            <g key={`olive-l-${i}`}>
              {/* Tiny stem */}
              <line x1={o.x} y1={o.y - 3} x2={o.x + 0.5} y2={o.y - 5} stroke="#607848" strokeWidth="0.5" />
              {/* Olive fruit — elongated oval */}
              <ellipse
                cx={o.x}
                cy={o.y}
                rx="2.2"
                ry="3"
                fill={`url(#${pfx(o.ripe ? 'olvFruitRipe' : 'olvFruit')})`}
              />
              {/* Highlight */}
              <ellipse cx={o.x - 0.5} cy={o.y - 1} rx="0.8" ry="1.2" fill="#c0d8a0" opacity={o.ripe ? 0.15 : 0.25} />
            </g>
          ))}

          {/* Olives on right branches */}
          {[
            { x: 145, y: 156, ripe: true },
            { x: 150, y: 151, ripe: false },
            { x: 142, y: 161, ripe: false },
            { x: 138, y: 148, ripe: true },
            { x: 155, y: 146, ripe: false },
            { x: 148, y: 142, ripe: true },
          ].map((o, i) => (
            <g key={`olive-r-${i}`}>
              <line x1={o.x} y1={o.y - 3} x2={o.x - 0.5} y2={o.y - 5} stroke="#607848" strokeWidth="0.5" />
              <ellipse
                cx={o.x}
                cy={o.y}
                rx="2.2"
                ry="3"
                fill={`url(#${pfx(o.ripe ? 'olvFruitRipe' : 'olvFruit')})`}
              />
              <ellipse cx={o.x - 0.5} cy={o.y - 1} rx="0.8" ry="1.2" fill="#c0d8a0" opacity={o.ripe ? 0.15 : 0.25} />
            </g>
          ))}

          {/* Olives on top branches */}
          {[
            { x: 98, y: 112, ripe: false },
            { x: 108, y: 108, ripe: true },
            { x: 93, y: 106, ripe: false },
            { x: 113, y: 114, ripe: false },
            { x: 70, y: 126, ripe: true },
            { x: 65, y: 122, ripe: false },
            { x: 134, y: 126, ripe: false },
            { x: 140, y: 122, ripe: true },
          ].map((o, i) => (
            <g key={`olive-t-${i}`}>
              <line x1={o.x} y1={o.y - 3} x2={o.x} y2={o.y - 5.5} stroke="#607848" strokeWidth="0.5" />
              <ellipse
                cx={o.x}
                cy={o.y}
                rx="2"
                ry="2.8"
                fill={`url(#${pfx(o.ripe ? 'olvFruitRipe' : 'olvFruit')})`}
              />
              <ellipse cx={o.x - 0.4} cy={o.y - 0.8} rx="0.7" ry="1" fill="#c0d8a0" opacity={o.ripe ? 0.15 : 0.25} />
            </g>
          ))}
        </g>
      )}

      {/* ── Stage 7: Harvest glow + floating silvery leaves ── */}
      {stage >= 7 && (
        <g>
          {/* Golden harvest glow */}
          <circle
            cx="100"
            cy="155"
            r="80"
            fill={`url(#${pfx('harvestGlow')})`}
            className="animate-pulse"
          />

          {/* Floating silvery-green leaves drifting away */}
          {[
            { x: 55, y: 100, rot: 25, delay: '0s' },
            { x: 145, y: 95, rot: -30, delay: '1.0s' },
            { x: 40, y: 130, rot: 45, delay: '2.2s' },
            { x: 160, y: 120, rot: -40, delay: '3.0s' },
            { x: 70, y: 85, rot: 15, delay: '1.5s' },
            { x: 130, y: 80, rot: -20, delay: '2.8s' },
            { x: 85, y: 110, rot: 35, delay: '0.6s' },
            { x: 115, y: 105, rot: -35, delay: '3.5s' },
          ].map((s, i) => (
            <g key={`float-${i}`} className="animate-float-away" style={{ animationDelay: s.delay }}>
              {/* Silvery olive leaf — narrow elongated shape */}
              <ellipse
                cx={s.x}
                cy={s.y}
                rx="1.5"
                ry="4"
                fill="#a0b880"
                opacity="0.6"
                transform={`rotate(${s.rot} ${s.x} ${s.y})`}
              />
              {/* Leaf midrib */}
              <line
                x1={s.x}
                y1={s.y - 3}
                x2={s.x}
                y2={s.y + 3}
                stroke="#c0d8a0"
                strokeWidth="0.3"
                opacity="0.35"
                transform={`rotate(${s.rot} ${s.x} ${s.y})`}
              />
            </g>
          ))}
        </g>
      )}
    </g>
  );
}
