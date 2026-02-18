export function bonsaiGradients(pfx: (name: string) => string) {
  return (
    <>
      {/* Trunk gradient — dark brown, horizontal for bark roundness */}
      <linearGradient id={pfx('bonTrunk')} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#2e1808" />
        <stop offset="15%" stopColor="#4a2c14" />
        <stop offset="40%" stopColor="#6b4528" />
        <stop offset="55%" stopColor="#7a5230" />
        <stop offset="70%" stopColor="#6b4528" />
        <stop offset="85%" stopColor="#4a2c14" />
        <stop offset="100%" stopColor="#2e1808" />
      </linearGradient>
      {/* Trunk highlight for bark texture */}
      <linearGradient id={pfx('bonTrunkHi')} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#a07850" stopOpacity="0" />
        <stop offset="35%" stopColor="#a07850" stopOpacity="0.2" />
        <stop offset="50%" stopColor="#b08860" stopOpacity="0.3" />
        <stop offset="65%" stopColor="#a07850" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#a07850" stopOpacity="0" />
      </linearGradient>
      {/* Bark texture vertical */}
      <linearGradient id={pfx('bonBark')} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3a2010" stopOpacity="0.35" />
        <stop offset="50%" stopColor="#2e1808" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#3a2010" stopOpacity="0.25" />
      </linearGradient>
      {/* Foliage pad — radial gradient for cloud-like shapes */}
      <radialGradient id={pfx('bonLeafPad')} cx="45%" cy="45%" r="55%">
        <stop offset="0%" stopColor="#4a8c3f" />
        <stop offset="50%" stopColor="#3a7a30" />
        <stop offset="80%" stopColor="#2d6b25" />
        <stop offset="100%" stopColor="#1e5518" />
      </radialGradient>
      {/* Foliage highlight */}
      <radialGradient id={pfx('bonLeafHi')} cx="35%" cy="35%" r="50%">
        <stop offset="0%" stopColor="#68b058" stopOpacity="0.5" />
        <stop offset="60%" stopColor="#4a8c3f" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#2d6b25" stopOpacity="0" />
      </radialGradient>
      {/* Ceramic pot — teal gradient */}
      <linearGradient id={pfx('bonPot')} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#145555" />
        <stop offset="15%" stopColor="#1a6b6b" />
        <stop offset="45%" stopColor="#2a8a8a" />
        <stop offset="55%" stopColor="#2d9494" />
        <stop offset="70%" stopColor="#2a8a8a" />
        <stop offset="85%" stopColor="#1a6b6b" />
        <stop offset="100%" stopColor="#145555" />
      </linearGradient>
      {/* Pot rim — darker teal */}
      <linearGradient id={pfx('bonPotRim')} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#0e4040" />
        <stop offset="20%" stopColor="#1a5555" />
        <stop offset="50%" stopColor="#1f6666" />
        <stop offset="80%" stopColor="#1a5555" />
        <stop offset="100%" stopColor="#0e4040" />
      </linearGradient>
      {/* Pot inner shadow */}
      <linearGradient id={pfx('bonPotInner')} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#0a3030" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#1a6b6b" stopOpacity="0" />
      </linearGradient>
      {/* Blossom gradient */}
      <radialGradient id={pfx('bonBlossom')} cx="40%" cy="40%" r="55%">
        <stop offset="0%" stopColor="#ffd8e4" />
        <stop offset="40%" stopColor="#ffb8c8" />
        <stop offset="80%" stopColor="#ff8aa8" />
        <stop offset="100%" stopColor="#e87090" />
      </radialGradient>
      {/* Blossom center */}
      <radialGradient id={pfx('bonBlossomCenter')} cx="45%" cy="45%" r="45%">
        <stop offset="0%" stopColor="#ffe880" />
        <stop offset="60%" stopColor="#ffd54f" />
        <stop offset="100%" stopColor="#f0a830" />
      </radialGradient>
      {/* Seed gradient */}
      <linearGradient id={pfx('bonSeedGrad')} x1="0.3" y1="0" x2="0.7" y2="1">
        <stop offset="0%" stopColor="#c4a265" />
        <stop offset="40%" stopColor="#a08050" />
        <stop offset="100%" stopColor="#6b5030" />
      </linearGradient>
      {/* Soil in pot */}
      <linearGradient id={pfx('bonSoil')} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#5a3a20" />
        <stop offset="60%" stopColor="#4a2c18" />
        <stop offset="100%" stopColor="#3a2010" />
      </linearGradient>
      {/* Branch gradient */}
      <linearGradient id={pfx('bonBranch')} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#4a2c14" />
        <stop offset="50%" stopColor="#6b4528" />
        <stop offset="100%" stopColor="#4a2c14" />
      </linearGradient>
    </>
  );
}

export function renderBonsai(stage: number, pfx: (name: string) => string) {
  // Pot dimensions (consistent across stages 2-7)
  const potTop = 252;
  const potBottom = 270;
  const potRimH = 4;
  const potLeftTop = 72;
  const potRightTop = 128;
  const potLeftBottom = 78;
  const potRightBottom = 122;

  return (
    <g>
      {/* ── Stage 1: Seed ── */}
      {stage === 1 && (
        <g transform="translate(100, 264)" filter={`url(#${pfx('softShadow')})`}>
          {/* Shadow under seed */}
          <ellipse cx="1" cy="4" rx="5" ry="2" fill="#3a2518" opacity="0.2" />
          {/* Seed body — slightly oval brown seed */}
          <ellipse cx="0" cy="0" rx="5" ry="7.5" fill={`url(#${pfx('bonSeedGrad')})`} transform="rotate(-8)" />
          <ellipse cx="0" cy="0" rx="5" ry="7.5" fill="none" stroke="#6b5030" strokeWidth="0.5" transform="rotate(-8)" />
          {/* Seed line */}
          <path d="M -0.5 -6 C 0 -3 0.5 1 0 5" stroke="#8b6d3f" strokeWidth="0.8" fill="none" opacity="0.4" transform="rotate(-8)" />
          {/* Highlight */}
          <ellipse cx="-1.5" cy="-2" rx="2" ry="3.5" fill="#d4c090" opacity="0.2" transform="rotate(-8)" />
        </g>
      )}

      {/* ── Ceramic Pot (stages 2+) ── */}
      {stage >= 2 && (
        <g filter={`url(#${pfx('softShadow')})`}>
          {/* Pot shadow */}
          <ellipse cx="100" cy={potBottom + 2} rx="28" ry="3" fill="#1a0e05" opacity="0.15" />
          {/* Pot body — trapezoid shape */}
          <path
            d={`M ${potLeftTop} ${potTop} L ${potLeftBottom} ${potBottom} L ${potRightBottom} ${potBottom} L ${potRightTop} ${potTop} Z`}
            fill={`url(#${pfx('bonPot')})`}
          />
          {/* Pot highlight edge */}
          <path
            d={`M ${potLeftTop + 3} ${potTop + 2} L ${potLeftBottom + 2} ${potBottom - 1} L ${potRightBottom - 2} ${potBottom - 1} L ${potRightTop - 3} ${potTop + 2} Z`}
            fill="none"
            stroke="#3aA0A0"
            strokeWidth="0.4"
            opacity="0.2"
          />
          {/* Pot rim — thicker band at top */}
          <rect
            x={potLeftTop - 3}
            y={potTop - potRimH}
            width={potRightTop - potLeftTop + 6}
            height={potRimH}
            rx="1.5"
            fill={`url(#${pfx('bonPotRim')})`}
          />
          {/* Rim highlight line */}
          <line
            x1={potLeftTop - 2}
            y1={potTop - potRimH + 1}
            x2={potRightTop + 2}
            y2={potTop - potRimH + 1}
            stroke="#2a8a8a"
            strokeWidth="0.6"
            opacity="0.3"
          />
          {/* Soil surface inside pot */}
          <ellipse cx="100" cy={potTop} rx="28" ry="3.5" fill={`url(#${pfx('bonSoil')})`} />
          {/* Soil texture dots */}
          <circle cx="88" cy={potTop - 0.5} r="0.8" fill="#3a2010" opacity="0.3" />
          <circle cx="95" cy={potTop + 1} r="0.6" fill="#5a3a20" opacity="0.25" />
          <circle cx="105" cy={potTop + 0.5} r="0.7" fill="#3a2010" opacity="0.3" />
          <circle cx="112" cy={potTop - 0.3} r="0.5" fill="#4a2c18" opacity="0.25" />
          {/* Pot feet — two small rectangles */}
          <rect x="82" y={potBottom} width="5" height="3" rx="1" fill="#1a5555" />
          <rect x="113" y={potBottom} width="5" height="3" rx="1" fill="#1a5555" />
        </g>
      )}

      {/* ── Stage 2: Tiny Seedling ── */}
      {stage >= 2 && stage < 3 && (
        <g filter={`url(#${pfx('softShadow')})`}>
          {/* Thin stem */}
          <path
            d="M 100 251 C 100 245 99 238 99 232"
            stroke="#3d6b2e"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
          />
          {/* Left small leaf */}
          <path
            d="M 99 235 C 96 232 90 230 87 231 C 85 233 87 236 91 237 C 94 237 97 236 99 235"
            fill="#4a8c3f"
          />
          <path
            d="M 99 235 C 94 233 89 232 87 233"
            stroke="#2d6b25"
            strokeWidth="0.5"
            fill="none"
          />
          {/* Right small leaf */}
          <path
            d="M 99 238 C 102 235 108 233 111 234 C 113 236 111 239 107 240 C 104 240 101 239 99 238"
            fill="#4a8c3f"
          />
          <path
            d="M 99 238 C 104 236 109 235 111 236"
            stroke="#2d6b25"
            strokeWidth="0.5"
            fill="none"
          />
        </g>
      )}

      {/* ── Stage 3: S-Curve Trunk ── */}
      {stage >= 3 && (
        <g filter={`url(#${pfx('softShadow')})`}>
          {/* Trunk shadow */}
          <path
            d={`M 102 ${potTop - 1} C 108 235 88 220 94 200`}
            stroke="#1a0e05"
            strokeWidth={stage >= 5 ? 8 : stage >= 4 ? 7 : 5.5}
            fill="none"
            strokeLinecap="round"
            opacity="0.12"
          />
          {/* Main trunk — S-curve */}
          <path
            d={`M 100 ${potTop - 1} C 106 235 86 220 92 ${stage >= 5 ? 195 : 200}`}
            stroke={`url(#${pfx('bonTrunk')})`}
            strokeWidth={stage >= 5 ? 7 : stage >= 4 ? 6 : 4.5}
            fill="none"
            strokeLinecap="round"
          />
          {/* Trunk highlight */}
          <path
            d={`M 100 ${potTop - 2} C 106 234 86 219 92 ${stage >= 5 ? 196 : 201}`}
            stroke={`url(#${pfx('bonTrunkHi')})`}
            strokeWidth={stage >= 5 ? 3.5 : stage >= 4 ? 3 : 2.2}
            fill="none"
            strokeLinecap="round"
          />
          {/* Bark texture lines */}
          {stage >= 3 && (
            <>
              <path d="M 101 248 C 102 246 103 244" stroke="#3a2010" strokeWidth="0.4" fill="none" opacity="0.3" />
              <path d="M 104 238 C 103 236 101 233" stroke="#3a2010" strokeWidth="0.35" fill="none" opacity="0.25" />
              <path d="M 99 228 C 97 226 95 224" stroke="#3a2010" strokeWidth="0.3" fill="none" opacity="0.25" />
              <path d="M 90 215 C 89 213 88 211" stroke="#3a2010" strokeWidth="0.3" fill="none" opacity="0.2" />
              <path d="M 92 208 C 91 206 90 204" stroke="#3a2010" strokeWidth="0.25" fill="none" opacity="0.2" />
            </>
          )}
          {/* Exposed surface roots at pot soil line */}
          <path d="M 100 251 C 94 252 86 253 82 252" stroke="#4a2c14" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />
          <path d="M 100 251 C 106 252 114 253 118 252" stroke="#4a2c14" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.5" />
          <path d="M 98 251 C 92 253 88 254 85 254" stroke="#6b4528" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.35" />
        </g>
      )}

      {/* ── Stage 4: Branches with Wiring ── */}
      {stage >= 4 && (
        <g>
          {/* Main right branch */}
          <g filter={`url(#${pfx('softShadow')})`}>
            <path
              d="M 92 200 C 98 195 108 188 120 178 C 128 172 134 168 138 165"
              stroke={`url(#${pfx('bonBranch')})`}
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            {/* Branch highlight */}
            <path
              d="M 92 200 C 98 195 108 188 120 178 C 128 172 134 168 138 165"
              stroke={`url(#${pfx('bonTrunkHi')})`}
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
            />
            {/* Training wire on right branch */}
            <path
              d="M 94 199 C 100 194 110 187 122 177 C 130 171 136 167 140 164"
              stroke="#8a8a8a"
              strokeWidth="0.5"
              fill="none"
              strokeDasharray="2 3"
              opacity="0.4"
            />
          </g>
          {/* Left branch — shorter, curves upward */}
          <g filter={`url(#${pfx('softShadow')})`}>
            <path
              d="M 95 215 C 88 210 78 205 68 198 C 62 194 58 190 56 186"
              stroke={`url(#${pfx('bonBranch')})`}
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 95 215 C 88 210 78 205 68 198 C 62 194 58 190 56 186"
              stroke={`url(#${pfx('bonTrunkHi')})`}
              strokeWidth="1"
              fill="none"
              strokeLinecap="round"
            />
            {/* Training wire on left branch */}
            <path
              d="M 93 214 C 86 209 76 204 66 197 C 60 193 56 189 54 185"
              stroke="#8a8a8a"
              strokeWidth="0.5"
              fill="none"
              strokeDasharray="2 3"
              opacity="0.4"
            />
          </g>
          {/* Upper sub-branch from main trunk curve */}
          <g filter={`url(#${pfx('softShadow')})`}>
            <path
              d="M 92 200 C 90 194 88 186 90 178 C 91 173 93 170 95 168"
              stroke={`url(#${pfx('bonBranch')})`}
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </g>

          {/* Beginning leaf pads at branch tips (stage 4 only — small) */}
          {stage === 4 && (
            <g>
              {/* Right branch tip pad */}
              <ellipse cx="138" cy="162" rx="10" ry="7" fill={`url(#${pfx('bonLeafPad')})`} opacity="0.7" />
              <ellipse cx="137" cy="161" rx="8" ry="5.5" fill={`url(#${pfx('bonLeafHi')})`} opacity="0.3" />
              {/* Left branch tip pad */}
              <ellipse cx="55" cy="183" rx="9" ry="6" fill={`url(#${pfx('bonLeafPad')})`} opacity="0.7" />
              <ellipse cx="54" cy="182" rx="7" ry="4.5" fill={`url(#${pfx('bonLeafHi')})`} opacity="0.3" />
              {/* Top pad */}
              <ellipse cx="94" cy="165" rx="8" ry="6" fill={`url(#${pfx('bonLeafPad')})`} opacity="0.7" />
              <ellipse cx="93" cy="164" rx="6" ry="4.5" fill={`url(#${pfx('bonLeafHi')})`} opacity="0.3" />
            </g>
          )}
        </g>
      )}

      {/* ── Stage 5: Full Canopy — Shaped Leaf Pad Clouds ── */}
      {stage >= 5 && (
        <g>
          {/* Right canopy cluster (largest) */}
          <g filter={`url(#${pfx('softShadow')})`}>
            <ellipse cx="140" cy="155" rx="20" ry="14" fill={`url(#${pfx('bonLeafPad')})`} />
            <ellipse cx="135" cy="150" rx="14" ry="10" fill={`url(#${pfx('bonLeafHi')})`} opacity="0.3" />
            <ellipse cx="150" cy="160" rx="12" ry="9" fill={`url(#${pfx('bonLeafPad')})`} />
            <ellipse cx="148" cy="158" rx="9" ry="6.5" fill={`url(#${pfx('bonLeafHi')})`} opacity="0.25" />
            {/* Texture — leaf edge bumps */}
            <path d="M 122 150 C 124 145 130 141 138 140 C 145 140 152 143 156 148" stroke="#1e5518" strokeWidth="0.4" fill="none" opacity="0.3" />
            <path d="M 155 155 C 158 160 157 166 153 170" stroke="#1e5518" strokeWidth="0.4" fill="none" opacity="0.25" />
          </g>

          {/* Left canopy cluster */}
          <g filter={`url(#${pfx('softShadow')})`}>
            <ellipse cx="52" cy="178" rx="17" ry="12" fill={`url(#${pfx('bonLeafPad')})`} />
            <ellipse cx="48" cy="174" rx="12" ry="8" fill={`url(#${pfx('bonLeafHi')})`} opacity="0.3" />
            <ellipse cx="60" cy="183" rx="10" ry="7" fill={`url(#${pfx('bonLeafPad')})`} />
            <ellipse cx="58" cy="181" rx="7" ry="5" fill={`url(#${pfx('bonLeafHi')})`} opacity="0.25" />
            {/* Texture */}
            <path d="M 38 173 C 40 168 46 164 54 164 C 60 165 65 169 67 174" stroke="#1e5518" strokeWidth="0.4" fill="none" opacity="0.3" />
          </g>

          {/* Top-center canopy cluster (apex) */}
          <g filter={`url(#${pfx('softShadow')})`}>
            <ellipse cx="92" cy="112" rx="18" ry="13" fill={`url(#${pfx('bonLeafPad')})`} />
            <ellipse cx="88" cy="108" rx="13" ry="9" fill={`url(#${pfx('bonLeafHi')})`} opacity="0.3" />
            <ellipse cx="100" cy="118" rx="11" ry="8" fill={`url(#${pfx('bonLeafPad')})`} />
            <ellipse cx="98" cy="116" rx="8" ry="5.5" fill={`url(#${pfx('bonLeafHi')})`} opacity="0.25" />
            {/* Texture */}
            <path d="M 76 108 C 78 102 84 98 92 97 C 100 98 106 103 108 110" stroke="#1e5518" strokeWidth="0.4" fill="none" opacity="0.3" />
          </g>

          {/* Upper-right extension canopy (between apex and right cluster) */}
          <g filter={`url(#${pfx('softShadow')})`}>
            <ellipse cx="118" cy="130" rx="14" ry="10" fill={`url(#${pfx('bonLeafPad')})`} />
            <ellipse cx="115" cy="127" rx="10" ry="7" fill={`url(#${pfx('bonLeafHi')})`} opacity="0.25" />
          </g>

          {/* Extending trunk to apex for stages 5+ */}
          <path
            d="M 92 195 C 90 188 88 175 90 165 C 91 155 92 140 92 125 C 92 118 92 114 92 112"
            stroke={`url(#${pfx('bonBranch')})`}
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 92 195 C 90 188 88 175 90 165 C 91 155 92 140 92 125 C 92 118 92 114 92 112"
            stroke={`url(#${pfx('bonTrunkHi')})`}
            strokeWidth="0.8"
            fill="none"
            strokeLinecap="round"
          />
          {/* Sub-branch to upper-right cluster */}
          <path
            d="M 92 145 C 98 140 108 135 118 130"
            stroke={`url(#${pfx('bonBranch')})`}
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      )}

      {/* ── Stage 6: Cherry Blossoms ── */}
      {stage >= 6 && (
        <g>
          {/* Blossoms scattered across foliage pads */}
          {[
            // Top-center cluster blossoms
            { x: 85, y: 105, r: 3.5, rot: 0 },
            { x: 98, y: 110, r: 3, rot: 25 },
            { x: 78, y: 112, r: 2.8, rot: 50 },
            { x: 92, y: 100, r: 3.2, rot: 72 },
            { x: 104, y: 115, r: 2.5, rot: 15 },
            // Upper-right cluster blossoms
            { x: 115, y: 125, r: 3, rot: 40 },
            { x: 124, y: 132, r: 2.8, rot: 10 },
            { x: 110, y: 130, r: 2.5, rot: 60 },
            // Right cluster blossoms
            { x: 135, y: 150, r: 3.2, rot: 30 },
            { x: 148, y: 155, r: 2.8, rot: 55 },
            { x: 142, y: 145, r: 3, rot: 80 },
            { x: 155, y: 162, r: 2.5, rot: 20 },
            { x: 130, y: 158, r: 2.6, rot: 45 },
            // Left cluster blossoms
            { x: 48, y: 173, r: 3, rot: 35 },
            { x: 58, y: 178, r: 2.8, rot: 65 },
            { x: 42, y: 180, r: 2.5, rot: 10 },
            { x: 55, y: 170, r: 2.7, rot: 50 },
          ].map((b, i) => (
            <g key={`blossom-${i}`} transform={`translate(${b.x}, ${b.y}) rotate(${b.rot})`}>
              {/* 5-petal flower */}
              {Array.from({ length: 5 }, (_, p) => {
                const angle = (360 / 5) * p;
                return (
                  <ellipse
                    key={`petal-${p}`}
                    cx={0}
                    cy={-b.r * 0.7}
                    rx={b.r * 0.45}
                    ry={b.r * 0.7}
                    fill={`url(#${pfx('bonBlossom')})`}
                    transform={`rotate(${angle})`}
                    opacity="0.85"
                  />
                );
              })}
              {/* Flower center */}
              <circle cx="0" cy="0" r={b.r * 0.25} fill={`url(#${pfx('bonBlossomCenter')})`} />
            </g>
          ))}

          {/* Falling petals — a few loose petals drifting */}
          {[
            { x: 72, y: 135, rot: 30 },
            { x: 128, y: 140, rot: -20 },
            { x: 108, y: 170, rot: 45 },
            { x: 62, y: 195, rot: -15 },
            { x: 145, y: 180, rot: 55 },
          ].map((p, i) => (
            <ellipse
              key={`fallen-${i}`}
              cx={p.x}
              cy={p.y}
              rx="1.5"
              ry="2.5"
              fill="#ffb8c8"
              opacity={0.35 + (i % 3) * 0.1}
              transform={`rotate(${p.rot} ${p.x} ${p.y})`}
            />
          ))}
        </g>
      )}

      {/* ── Stage 7: Harvest Glow + Floating Petals ── */}
      {stage >= 7 && (
        <g>
          {/* Golden harvest glow */}
          <circle cx="100" cy="155" r="80" fill={`url(#${pfx('harvestGlow')})`} className="animate-pulse" />

          {/* Floating petal particles */}
          {[
            { x: 60, y: 100, delay: '0s' },
            { x: 140, y: 95, delay: '1.2s' },
            { x: 45, y: 130, delay: '2.5s' },
            { x: 155, y: 120, delay: '3.8s' },
            { x: 80, y: 85, delay: '1.8s' },
            { x: 120, y: 90, delay: '0.6s' },
            { x: 50, y: 150, delay: '3.0s' },
          ].map((s, i) => (
            <g key={`float-${i}`} className="animate-float-away" style={{ animationDelay: s.delay }}>
              <ellipse
                cx={s.x}
                cy={s.y}
                rx="2"
                ry="3"
                fill="#ffb8c8"
                opacity="0.6"
                transform={`rotate(${30 * i} ${s.x} ${s.y})`}
              />
              <ellipse
                cx={s.x}
                cy={s.y}
                rx="1"
                ry="1.5"
                fill="#ffd8e4"
                opacity="0.3"
                transform={`rotate(${30 * i} ${s.x} ${s.y})`}
              />
            </g>
          ))}
        </g>
      )}
    </g>
  );
}
