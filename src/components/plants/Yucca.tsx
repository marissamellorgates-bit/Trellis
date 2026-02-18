export const isDesertPlant = true;

export function yuccaGradients(pfx: (name: string) => string) {
  return (
    <>
      {/* Sword-leaf gradient — dark green with lighter center vein */}
      <linearGradient id={pfx('yucLeaf')} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#3a6830" />
        <stop offset="20%" stopColor="#436e35" />
        <stop offset="45%" stopColor="#5a8848" />
        <stop offset="55%" stopColor="#5a8848" />
        <stop offset="80%" stopColor="#436e35" />
        <stop offset="100%" stopColor="#3a6830" />
      </linearGradient>

      {/* Trunk gradient — gray-brown fibrous bark */}
      <linearGradient id={pfx('yucTrunk')} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#6a5a40" />
        <stop offset="15%" stopColor="#7a6a50" />
        <stop offset="40%" stopColor="#9a8a68" />
        <stop offset="60%" stopColor="#9a8a68" />
        <stop offset="85%" stopColor="#7a6a50" />
        <stop offset="100%" stopColor="#6a5a40" />
      </linearGradient>

      {/* Flower cluster gradient — cream/white bells */}
      <radialGradient id={pfx('yucFlower')} cx="40%" cy="35%" r="60%">
        <stop offset="0%" stopColor="#f8f2e0" />
        <stop offset="40%" stopColor="#f0e8d0" />
        <stop offset="70%" stopColor="#e8e0c0" />
        <stop offset="100%" stopColor="#e0d8c0" />
      </radialGradient>

      {/* Dead leaf gradient — tan/brown hanging leaves */}
      <linearGradient id={pfx('yucDead')} x1="0" y1="0" x2="0.3" y2="1">
        <stop offset="0%" stopColor="#a09070" />
        <stop offset="40%" stopColor="#90805e" />
        <stop offset="100%" stopColor="#7a6a4a" />
      </linearGradient>

      {/* Flower stalk gradient */}
      <linearGradient id={pfx('yucStalk')} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#8a9a60" />
        <stop offset="50%" stopColor="#7a8a50" />
        <stop offset="100%" stopColor="#6a7a42" />
      </linearGradient>

      {/* Seed gradient */}
      <linearGradient id={pfx('yucSeed')} x1="0.3" y1="0" x2="0.7" y2="1">
        <stop offset="0%" stopColor="#8a7050" />
        <stop offset="50%" stopColor="#6b5535" />
        <stop offset="100%" stopColor="#5a4428" />
      </linearGradient>

      {/* Sandy soil (shared with desert plants) */}
      <linearGradient id={pfx('sandSoil')} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#d4b880" />
        <stop offset="40%" stopColor="#c4a265" />
        <stop offset="100%" stopColor="#a08050" />
      </linearGradient>
    </>
  );
}

export function renderYucca(stage: number, pfx: (name: string) => string) {
  return (
    <g>
      {/* Stage 1: Seed — small dark brown seed near soil */}
      {stage >= 1 && (
        <g transform="translate(100, 260)" filter={`url(#${pfx('softShadow')})`}>
          {/* Ground shadow */}
          <ellipse cx="0.5" cy="5" rx="5" ry="2" fill="#8a7040" opacity="0.2" />
          {/* Seed body — slightly elongated, yucca seeds are flat and dark */}
          <ellipse cx="0" cy="0" rx="5" ry="4" fill={`url(#${pfx('yucSeed')})`} />
          {/* Seed outline */}
          <ellipse cx="0" cy="0" rx="5" ry="4" fill="none" stroke="#4a3820" strokeWidth="0.5" />
          {/* Seed highlight */}
          <ellipse cx="-1.5" cy="-1" rx="2" ry="1.5" fill="#a89068" opacity="0.25" />
          {/* Surface texture */}
          <path d="M -3 -1 Q 0 -2.5 3 -1" stroke="#4a3820" strokeWidth="0.3" fill="none" opacity="0.35" />
          <path d="M -3.5 0.5 Q 0 -0.5 3.5 0.5" stroke="#4a3820" strokeWidth="0.25" fill="none" opacity="0.3" />
          <path d="M -2.5 2 Q 0 1 2.5 2" stroke="#4a3820" strokeWidth="0.2" fill="none" opacity="0.25" />
          {/* Seed wing edge (yucca seeds have a thin margin) */}
          <path d="M -4.5 0 C -5 -1 -4.5 -2.5 -3.5 -3" stroke="#5a4428" strokeWidth="0.3" fill="none" opacity="0.3" />
          <path d="M 4.5 0 C 5 -1 4.5 -2.5 3.5 -3" stroke="#5a4428" strokeWidth="0.3" fill="none" opacity="0.3" />
        </g>
      )}

      {/* Stage 2: Roots + spiky seedling */}
      {stage >= 2 && (
        <>
          {/* Roots spreading under soil */}
          <g opacity="0.5">
            {/* Tap root — yuccas have deep roots */}
            <path d="M 100 267 C 100 274 99 282 98 292" stroke="#6b5535" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M 98 288 C 96 292 94 295 92 296" stroke="#7a6a4a" strokeWidth="0.5" fill="none" strokeLinecap="round" />
            <path d="M 98 290 C 100 293 102 295 104 296" stroke="#7a6a4a" strokeWidth="0.4" fill="none" strokeLinecap="round" />
            {/* Lateral roots */}
            <path d="M 100 270 C 90 272 78 274 65 276" stroke="#6b5535" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <path d="M 100 270 C 110 272 122 274 135 276" stroke="#6b5535" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <path d="M 100 272 C 88 275 76 278 66 280" stroke="#7a6a4a" strokeWidth="0.6" fill="none" strokeLinecap="round" />
            <path d="M 100 272 C 112 275 124 278 134 280" stroke="#7a6a4a" strokeWidth="0.6" fill="none" strokeLinecap="round" />
            {/* Fine root tips */}
            <path d="M 65 276 C 60 277 55 277 50 276" stroke="#7a6a4a" strokeWidth="0.4" fill="none" strokeLinecap="round" />
            <path d="M 135 276 C 140 277 145 277 150 276" stroke="#7a6a4a" strokeWidth="0.4" fill="none" strokeLinecap="round" />
          </g>

          {/* Spiky seedling — a few stiff sword-like leaves emerging */}
          <g filter={`url(#${pfx('softShadow')})`}>
            {/* Center leaf — stiff, upright */}
            <polygon
              points="100,232 97,260 103,260"
              fill={`url(#${pfx('yucLeaf')})`}
            />
            <line x1="100" y1="234" x2="100" y2="258" stroke="#4a8040" strokeWidth="0.3" opacity="0.3" />
            {/* Left leaf */}
            <polygon
              points="88,238 96,260 100,258"
              fill={`url(#${pfx('yucLeaf')})`}
              opacity="0.9"
            />
            {/* Right leaf */}
            <polygon
              points="112,238 104,260 100,258"
              fill={`url(#${pfx('yucLeaf')})`}
              opacity="0.9"
            />
            {/* Far left leaf — more angled */}
            <polygon
              points="80,244 95,260 98,257"
              fill={`url(#${pfx('yucLeaf')})`}
              opacity="0.85"
            />
            {/* Far right leaf */}
            <polygon
              points="120,244 105,260 102,257"
              fill={`url(#${pfx('yucLeaf')})`}
              opacity="0.85"
            />
          </g>
        </>
      )}

      {/* Stage 3: Sword-leaf rosette — stiff pointed leaves radiating from center */}
      {stage >= 3 && (
        <g filter={`url(#${pfx('softShadow')})`}>
          {/* Back leaves (drawn first, behind) */}
          {/* Far back left */}
          <polygon
            points="62,225 94,256 97,252"
            fill="#3a6830"
            opacity="0.7"
          />
          {/* Far back right */}
          <polygon
            points="138,225 106,256 103,252"
            fill="#3a6830"
            opacity="0.7"
          />
          {/* Back left */}
          <polygon
            points="68,218 95,254 98,250"
            fill="#3a6830"
            opacity="0.8"
          />
          {/* Back right */}
          <polygon
            points="132,218 105,254 102,250"
            fill="#3a6830"
            opacity="0.8"
          />

          {/* Mid-layer leaves */}
          {/* Mid left drooping */}
          <polygon
            points="58,232 93,258 96,254"
            fill={`url(#${pfx('yucLeaf')})`}
            opacity="0.85"
          />
          {/* Mid right drooping */}
          <polygon
            points="142,232 107,258 104,254"
            fill={`url(#${pfx('yucLeaf')})`}
            opacity="0.85"
          />

          {/* Front leaves — main rosette */}
          {/* Left sweep */}
          <polygon
            points="72,215 95,256 98,252"
            fill={`url(#${pfx('yucLeaf')})`}
          />
          <line x1="84" y1="236" x2="96" y2="254" stroke="#4a8040" strokeWidth="0.3" opacity="0.25" />
          {/* Left mid */}
          <polygon
            points="78,210 96,254 99,250"
            fill={`url(#${pfx('yucLeaf')})`}
          />
          <line x1="87" y1="232" x2="97" y2="252" stroke="#4a8040" strokeWidth="0.3" opacity="0.25" />

          {/* Center left */}
          <polygon
            points="90,205 98,256 101,254"
            fill={`url(#${pfx('yucLeaf')})`}
          />
          {/* Center */}
          <polygon
            points="100,200 97,256 103,256"
            fill={`url(#${pfx('yucLeaf')})`}
          />
          <line x1="100" y1="202" x2="100" y2="254" stroke="#5a9050" strokeWidth="0.4" opacity="0.2" />
          {/* Center right */}
          <polygon
            points="110,205 102,256 99,254"
            fill={`url(#${pfx('yucLeaf')})`}
          />

          {/* Right mid */}
          <polygon
            points="122,210 104,254 101,250"
            fill={`url(#${pfx('yucLeaf')})`}
          />
          <line x1="113" y1="232" x2="103" y2="252" stroke="#4a8040" strokeWidth="0.3" opacity="0.25" />
          {/* Right sweep */}
          <polygon
            points="128,215 105,256 102,252"
            fill={`url(#${pfx('yucLeaf')})`}
          />
          <line x1="116" y1="236" x2="104" y2="254" stroke="#4a8040" strokeWidth="0.3" opacity="0.25" />

          {/* Leaf tips — sharp pointed highlights */}
          {[
            { x: 72, y: 215 }, { x: 78, y: 210 }, { x: 90, y: 205 },
            { x: 100, y: 200 }, { x: 110, y: 205 }, { x: 122, y: 210 },
            { x: 128, y: 215 },
          ].map((tip, i) => (
            <circle key={`tip-${i}`} cx={tip.x} cy={tip.y} r="0.6" fill="#c4b880" opacity="0.4" />
          ))}

          {/* Rosette center — where leaves converge */}
          <ellipse cx="100" cy="256" rx="5" ry="3" fill="#2a5020" opacity="0.5" />
        </g>
      )}

      {/* Stage 4: Developing woody trunk below leaf crown */}
      {stage >= 4 && (() => {
        const trunkTop = 180;
        const trunkBot = 265;
        const crownCenter = trunkTop - 5;
        return (
          <g>
            {/* Trunk shadow */}
            <path
              d={`M 92 ${trunkBot} L 90 ${trunkTop + 10} Q 100 ${trunkTop} 110 ${trunkTop + 10} L 108 ${trunkBot} Z`}
              fill="#3a2a18"
              opacity="0.1"
              transform="translate(2, 2)"
            />
            {/* Trunk body */}
            <path
              d={`M 93 ${trunkBot} L 91 ${trunkTop + 8} Q 100 ${trunkTop - 2} 109 ${trunkTop + 8} L 107 ${trunkBot} Z`}
              fill={`url(#${pfx('yucTrunk')})`}
            />
            {/* Fibrous bark texture — vertical lines */}
            {[-5, -3, -1, 1, 3, 5].map((offset, i) => (
              <line
                key={`fiber-${i}`}
                x1={100 + offset}
                y1={trunkTop + 12}
                x2={100 + offset + (offset > 0 ? 0.3 : -0.3)}
                y2={trunkBot - 2}
                stroke="#5a4a30"
                strokeWidth="0.4"
                opacity="0.3"
              />
            ))}
            {/* Fibrous texture — horizontal bark rings */}
            {[0.15, 0.3, 0.45, 0.6, 0.75, 0.85].map((frac, i) => {
              const y = trunkTop + 10 + (trunkBot - trunkTop - 12) * frac;
              return (
                <path
                  key={`bark-${i}`}
                  d={`M ${94 + frac * 0.5} ${y} Q ${100} ${y + 1.5} ${106 - frac * 0.5} ${y}`}
                  stroke="#5a4a30"
                  strokeWidth="0.35"
                  fill="none"
                  opacity="0.25"
                />
              );
            })}
            {/* Trunk edge highlights */}
            <line x1="93" y1={trunkBot} x2="91" y2={trunkTop + 8} stroke="#b0a080" strokeWidth="0.5" opacity="0.1" />
            <line x1="107" y1={trunkBot} x2="109" y2={trunkTop + 8} stroke="#b0a080" strokeWidth="0.5" opacity="0.08" />

            {/* Leaf crown at top of trunk */}
            <g filter={`url(#${pfx('softShadow')})`}>
              {/* Back leaves */}
              <polygon points={`60,${crownCenter + 20} 95,${crownCenter + 8} 97,${crownCenter + 4}`} fill="#3a6830" opacity="0.7" />
              <polygon points={`140,${crownCenter + 20} 105,${crownCenter + 8} 103,${crownCenter + 4}`} fill="#3a6830" opacity="0.7" />

              {/* Mid leaves */}
              <polygon points={`55,${crownCenter + 28} 94,${crownCenter + 10} 96,${crownCenter + 6}`} fill={`url(#${pfx('yucLeaf')})`} opacity="0.85" />
              <polygon points={`145,${crownCenter + 28} 106,${crownCenter + 10} 104,${crownCenter + 6}`} fill={`url(#${pfx('yucLeaf')})`} opacity="0.85" />

              {/* Main crown leaves */}
              <polygon points={`65,${crownCenter + 15} 96,${crownCenter + 6} 98,${crownCenter + 2}`} fill={`url(#${pfx('yucLeaf')})`} />
              <polygon points={`75,${crownCenter + 8} 97,${crownCenter + 4} 99,${crownCenter}`} fill={`url(#${pfx('yucLeaf')})`} />
              <polygon points={`88,${crownCenter - 2} 98,${crownCenter + 2} 100,${crownCenter}`} fill={`url(#${pfx('yucLeaf')})`} />
              <polygon points={`100,${crownCenter - 8} 98,${crownCenter + 4} 102,${crownCenter + 4}`} fill={`url(#${pfx('yucLeaf')})`} />
              <polygon points={`112,${crownCenter - 2} 102,${crownCenter + 2} 100,${crownCenter}`} fill={`url(#${pfx('yucLeaf')})`} />
              <polygon points={`125,${crownCenter + 8} 103,${crownCenter + 4} 101,${crownCenter}`} fill={`url(#${pfx('yucLeaf')})`} />
              <polygon points={`135,${crownCenter + 15} 104,${crownCenter + 6} 102,${crownCenter + 2}`} fill={`url(#${pfx('yucLeaf')})`} />

              {/* Leaf vein highlights */}
              <line x1="100" y1={crownCenter - 6} x2="100" y2={crownCenter + 3} stroke="#5a9050" strokeWidth="0.3" opacity="0.2" />

              {/* Sharp leaf tips */}
              {[
                { x: 65, y: crownCenter + 15 }, { x: 75, y: crownCenter + 8 },
                { x: 88, y: crownCenter - 2 }, { x: 100, y: crownCenter - 8 },
                { x: 112, y: crownCenter - 2 }, { x: 125, y: crownCenter + 8 },
                { x: 135, y: crownCenter + 15 },
              ].map((tip, i) => (
                <circle key={`ctip-${i}`} cx={tip.x} cy={tip.y} r="0.5" fill="#c4b880" opacity="0.35" />
              ))}

              {/* Crown center */}
              <ellipse cx="100" cy={crownCenter + 4} rx="4" ry="3" fill="#2a5020" opacity="0.4" />
            </g>
          </g>
        );
      })()}

      {/* Stage 5: Full yucca — taller trunk, dead leaves hanging down */}
      {stage >= 5 && (() => {
        const trunkTop = 120;
        const crownY = trunkTop - 5;
        return (
          <g>
            {/* Extended trunk section (above stage 4 trunk) */}
            <path
              d={`M 94 ${180} L 92 ${trunkTop + 8} Q 100 ${trunkTop - 2} 108 ${trunkTop + 8} L 106 ${180} Z`}
              fill={`url(#${pfx('yucTrunk')})`}
            />
            {/* More fibrous texture on extended trunk */}
            {[-4, -2, 0, 2, 4].map((offset, i) => (
              <line
                key={`fiber2-${i}`}
                x1={100 + offset}
                y1={trunkTop + 12}
                x2={100 + offset}
                y2={178}
                stroke="#5a4a30"
                strokeWidth="0.35"
                opacity="0.25"
              />
            ))}
            {/* Bark rings on upper trunk */}
            {[0.2, 0.4, 0.6, 0.8].map((frac, i) => {
              const y = trunkTop + 12 + (180 - trunkTop - 14) * frac;
              return (
                <path
                  key={`bark2-${i}`}
                  d={`M ${94.5} ${y} Q ${100} ${y + 1} ${105.5} ${y}`}
                  stroke="#5a4a30"
                  strokeWidth="0.3"
                  fill="none"
                  opacity="0.2"
                />
              );
            })}

            {/* Dead/dry leaves hanging down the trunk — "skirt" */}
            {[
              { x: 92, y: 170, tipX: 78, tipY: 195, w: 2 },
              { x: 108, y: 170, tipX: 122, tipY: 195, w: 2 },
              { x: 91, y: 155, tipX: 72, tipY: 180, w: 2.5 },
              { x: 109, y: 155, tipX: 128, tipY: 180, w: 2.5 },
              { x: 93, y: 165, tipX: 82, tipY: 192, w: 1.8 },
              { x: 107, y: 165, tipX: 118, tipY: 192, w: 1.8 },
              { x: 92, y: 148, tipX: 75, tipY: 172, w: 2 },
              { x: 108, y: 148, tipX: 125, tipY: 172, w: 2 },
              { x: 94, y: 160, tipX: 85, tipY: 188, w: 1.5 },
              { x: 106, y: 160, tipX: 115, tipY: 188, w: 1.5 },
              { x: 93, y: 142, tipX: 78, tipY: 165, w: 2.2 },
              { x: 107, y: 142, tipX: 122, tipY: 165, w: 2.2 },
            ].map((dl, i) => (
              <g key={`dead-${i}`}>
                <path
                  d={`M ${dl.x} ${dl.y} Q ${(dl.x + dl.tipX) / 2} ${dl.y + 8} ${dl.tipX} ${dl.tipY}`}
                  stroke={`url(#${pfx('yucDead')})`}
                  strokeWidth={dl.w}
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.65"
                />
                {/* Slight curl at tip */}
                <circle cx={dl.tipX} cy={dl.tipY} r="0.5" fill="#a09070" opacity="0.3" />
              </g>
            ))}

            {/* Taller crown of sword leaves */}
            <g filter={`url(#${pfx('softShadow')})`}>
              {/* Back layer */}
              <polygon points={`52,${crownY + 30} 94,${crownY + 10} 96,${crownY + 5}`} fill="#3a6830" opacity="0.65" />
              <polygon points={`148,${crownY + 30} 106,${crownY + 10} 104,${crownY + 5}`} fill="#3a6830" opacity="0.65" />
              <polygon points={`58,${crownY + 22} 95,${crownY + 8} 97,${crownY + 3}`} fill="#3a6830" opacity="0.75" />
              <polygon points={`142,${crownY + 22} 105,${crownY + 8} 103,${crownY + 3}`} fill="#3a6830" opacity="0.75" />

              {/* Mid drooping leaves */}
              <polygon points={`48,${crownY + 35} 93,${crownY + 12} 95,${crownY + 7}`} fill={`url(#${pfx('yucLeaf')})`} opacity="0.8" />
              <polygon points={`152,${crownY + 35} 107,${crownY + 12} 105,${crownY + 7}`} fill={`url(#${pfx('yucLeaf')})`} opacity="0.8" />

              {/* Main crown */}
              <polygon points={`60,${crownY + 18} 96,${crownY + 7} 98,${crownY + 2}`} fill={`url(#${pfx('yucLeaf')})`} />
              <polygon points={`70,${crownY + 10} 97,${crownY + 5} 99,${crownY}`} fill={`url(#${pfx('yucLeaf')})`} />
              <polygon points={`82,${crownY + 2} 98,${crownY + 3} 100,${crownY - 2}`} fill={`url(#${pfx('yucLeaf')})`} />
              <polygon points={`100,${crownY - 12} 98,${crownY + 5} 102,${crownY + 5}`} fill={`url(#${pfx('yucLeaf')})`} />
              <polygon points={`118,${crownY + 2} 102,${crownY + 3} 100,${crownY - 2}`} fill={`url(#${pfx('yucLeaf')})`} />
              <polygon points={`130,${crownY + 10} 103,${crownY + 5} 101,${crownY}`} fill={`url(#${pfx('yucLeaf')})`} />
              <polygon points={`140,${crownY + 18} 104,${crownY + 7} 102,${crownY + 2}`} fill={`url(#${pfx('yucLeaf')})`} />

              {/* Vein highlights on main leaves */}
              <line x1="100" y1={crownY - 10} x2="100" y2={crownY + 4} stroke="#5a9050" strokeWidth="0.3" opacity="0.2" />
              <line x1="82" y1={crownY + 4} x2="99" y2={crownY + 1} stroke="#5a9050" strokeWidth="0.2" opacity="0.15" />
              <line x1="118" y1={crownY + 4} x2="101" y2={crownY + 1} stroke="#5a9050" strokeWidth="0.2" opacity="0.15" />

              {/* Sharp tips */}
              {[
                { x: 60, y: crownY + 18 }, { x: 70, y: crownY + 10 },
                { x: 82, y: crownY + 2 }, { x: 100, y: crownY - 12 },
                { x: 118, y: crownY + 2 }, { x: 130, y: crownY + 10 },
                { x: 140, y: crownY + 18 },
              ].map((tip, i) => (
                <circle key={`ftip-${i}`} cx={tip.x} cy={tip.y} r="0.5" fill="#c4b880" opacity="0.35" />
              ))}

              {/* Crown center */}
              <ellipse cx="100" cy={crownY + 5} rx="4" ry="3" fill="#2a5020" opacity="0.4" />
            </g>
          </g>
        );
      })()}

      {/* Stage 6: Tall white flower spike from crown center */}
      {stage >= 6 && (() => {
        const stalkBase = 110;
        const stalkTop = 30;
        return (
          <g filter={`url(#${pfx('softShadow')})`}>
            {/* Flower stalk — tall and sturdy */}
            <line
              x1="100" y1={stalkBase}
              x2="100" y2={stalkTop + 5}
              stroke={`url(#${pfx('yucStalk')})`}
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Stalk highlight */}
            <line
              x1="99" y1={stalkBase}
              x2="99" y2={stalkTop + 5}
              stroke="#a0b070"
              strokeWidth="0.6"
              opacity="0.2"
            />

            {/* Flower clusters along the stalk — bell-shaped blooms */}
            {[
              { y: stalkTop + 8, size: 0.7, branches: 3 },
              { y: stalkTop + 18, size: 0.85, branches: 4 },
              { y: stalkTop + 28, size: 1.0, branches: 5 },
              { y: stalkTop + 38, size: 1.0, branches: 5 },
              { y: stalkTop + 48, size: 0.95, branches: 5 },
              { y: stalkTop + 58, size: 0.9, branches: 4 },
              { y: stalkTop + 68, size: 0.8, branches: 3 },
            ].map((cluster, ci) => (
              <g key={`cluster-${ci}`}>
                {/* Branch stems for each cluster */}
                {Array.from({ length: cluster.branches }, (_, bi) => {
                  const side = bi % 2 === 0 ? -1 : 1;
                  const spread = (Math.floor(bi / 2) + 1) * 6 * cluster.size;
                  const tipX = 100 + side * spread;
                  const tipY = cluster.y + 2 + bi * 1.5;
                  return (
                    <g key={`branch-${ci}-${bi}`}>
                      {/* Branch stem */}
                      <path
                        d={`M 100 ${cluster.y + bi * 1} Q ${100 + side * spread * 0.5} ${cluster.y + 1 + bi} ${tipX} ${tipY}`}
                        stroke="#8a9a60"
                        strokeWidth={0.8 * cluster.size}
                        fill="none"
                        strokeLinecap="round"
                      />
                      {/* Bell-shaped flower at tip */}
                      <path
                        d={`M ${tipX - 3 * cluster.size} ${tipY}
                            Q ${tipX - 3.5 * cluster.size} ${tipY + 4 * cluster.size} ${tipX} ${tipY + 6 * cluster.size}
                            Q ${tipX + 3.5 * cluster.size} ${tipY + 4 * cluster.size} ${tipX + 3 * cluster.size} ${tipY}
                            Q ${tipX} ${tipY + 1 * cluster.size} ${tipX - 3 * cluster.size} ${tipY}`}
                        fill={`url(#${pfx('yucFlower')})`}
                        opacity="0.9"
                      />
                      {/* Flower edge highlight */}
                      <path
                        d={`M ${tipX - 2.5 * cluster.size} ${tipY + 0.5}
                            Q ${tipX} ${tipY + 1.5 * cluster.size} ${tipX + 2.5 * cluster.size} ${tipY + 0.5}`}
                        stroke="#f8f0d8"
                        strokeWidth={0.3 * cluster.size}
                        fill="none"
                        opacity="0.4"
                      />
                      {/* Stamen dots inside flower */}
                      <circle cx={tipX} cy={tipY + 3 * cluster.size} r={0.6 * cluster.size} fill="#e8d088" opacity="0.5" />
                    </g>
                  );
                })}
              </g>
            ))}

            {/* Top buds — unopened flowers at apex */}
            <ellipse cx="100" cy={stalkTop + 2} rx="3" ry="4" fill="#d8e8b8" opacity="0.7" />
            <ellipse cx="100" cy={stalkTop} rx="2" ry="3" fill="#c8d8a8" opacity="0.6" />
            <ellipse cx="100" cy={stalkTop - 1} rx="1.2" ry="2" fill="#b8c898" opacity="0.5" />
          </g>
        );
      })()}

      {/* Stage 7: Harvest glow + floating particles */}
      {stage >= 7 && (
        <g>
          {/* Golden aura */}
          <circle cx="100" cy="140" r="90" fill={`url(#${pfx('harvestGlow')})`} className="animate-pulse" />

          {/* Floating particles — small flower petals and golden motes */}
          {[
            { x: 60, y: 50, delay: '0s', r: 2.2 },
            { x: 140, y: 60, delay: '1s', r: 2 },
            { x: 75, y: 35, delay: '2s', r: 1.8 },
            { x: 125, y: 45, delay: '3s', r: 2 },
            { x: 50, y: 80, delay: '0.5s', r: 1.5 },
            { x: 150, y: 75, delay: '1.5s', r: 1.8 },
            { x: 85, y: 25, delay: '2.5s', r: 1.6 },
            { x: 115, y: 30, delay: '3.5s', r: 1.4 },
            { x: 45, y: 100, delay: '0.8s', r: 2 },
            { x: 155, y: 95, delay: '2.2s', r: 1.6 },
          ].map((p, i) => (
            <g key={`float-${i}`} className="animate-float-away" style={{ animationDelay: p.delay }}>
              {/* Cream petal shape */}
              <path
                d={`M ${p.x} ${p.y} C ${p.x - 2} ${p.y - 3} ${p.x - 1} ${p.y - 6} ${p.x} ${p.y - 7} C ${p.x + 1} ${p.y - 6} ${p.x + 2} ${p.y - 3} ${p.x} ${p.y}`}
                fill="#f0e8d0"
                opacity="0.6"
                transform={`rotate(${i * 36} ${p.x} ${p.y})`}
              />
              {/* Golden core */}
              <circle cx={p.x} cy={p.y} r={p.r * 0.5} fill="#ffd700" opacity="0.5" />
            </g>
          ))}

          {/* Extra shimmer dots */}
          {[
            { x: 70, y: 110, delay: '0.3s' },
            { x: 130, y: 100, delay: '1.3s' },
            { x: 90, y: 55, delay: '2.3s' },
            { x: 110, y: 65, delay: '3.3s' },
          ].map((s, i) => (
            <g key={`shimmer-${i}`}>
              <circle
                cx={s.x} cy={s.y} r="2"
                fill="#ffd700"
                opacity="0.4"
                className="animate-pulse"
                style={{ animationDelay: s.delay }}
              />
              <circle
                cx={s.x} cy={s.y} r="0.9"
                fill="#fff8c4"
                opacity="0.5"
                className="animate-pulse"
                style={{ animationDelay: s.delay }}
              />
            </g>
          ))}
        </g>
      )}
    </g>
  );
}
