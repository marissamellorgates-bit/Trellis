export function chamomileGradients(pfx: (name: string) => string) {
  return (
    <>
      {/* Stem gradient — thin green */}
      <linearGradient id={pfx('chamStem')} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#4a7530" />
        <stop offset="30%" stopColor="#6a9a4a" />
        <stop offset="70%" stopColor="#6a9a4a" />
        <stop offset="100%" stopColor="#4a7530" />
      </linearGradient>

      {/* Feathery leaf gradient — fine green */}
      <linearGradient id={pfx('chamLeaf')} x1="0" y1="0" x2="0.8" y2="1">
        <stop offset="0%" stopColor="#5a8a3c" />
        <stop offset="50%" stopColor="#4a7530" />
        <stop offset="100%" stopColor="#3a6024" />
      </linearGradient>

      {/* Petal gradient — white with slight cream tint */}
      <radialGradient id={pfx('chamPetal')} cx="50%" cy="90%" r="80%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="60%" stopColor="#f8f8f6" />
        <stop offset="100%" stopColor="#f0f0e8" />
      </radialGradient>

      {/* Golden dome center gradient */}
      <radialGradient id={pfx('chamCenter')} cx="45%" cy="40%" r="55%">
        <stop offset="0%" stopColor="#ffd700" />
        <stop offset="40%" stopColor="#f0c040" />
        <stop offset="80%" stopColor="#daa520" />
        <stop offset="100%" stopColor="#c89418" />
      </radialGradient>

      {/* Bud gradient — green with white tips */}
      <linearGradient id={pfx('chamBud')} x1="0.5" y1="1" x2="0.5" y2="0">
        <stop offset="0%" stopColor="#5a8a3c" />
        <stop offset="60%" stopColor="#6a9a4a" />
        <stop offset="85%" stopColor="#d0d8c0" />
        <stop offset="100%" stopColor="#f0f0e8" />
      </linearGradient>

      {/* Seed gradient — pale tan */}
      <radialGradient id={pfx('chamSeed')} cx="40%" cy="35%" r="60%">
        <stop offset="0%" stopColor="#e8dcc0" />
        <stop offset="50%" stopColor="#d4c8a0" />
        <stop offset="100%" stopColor="#b8a880" />
      </radialGradient>
    </>
  );
}

/** Render a single feathery leaf — finely divided like a tiny fern frond */
function renderFeatheryLeaf(
  cx: number,
  baseY: number,
  length: number,
  angle: number,
  pfx: (name: string) => string,
  scale: number = 1,
) {
  const segments = Math.floor(4 + length / 8);
  const leaflets: JSX.Element[] = [];

  for (let i = 0; i < segments; i++) {
    const t = (i + 1) / (segments + 1);
    const segLen = (3.5 + (1 - t) * 3) * scale;
    const leftAngle = -55 - t * 15;
    const rightAngle = 55 + t * 15;

    leaflets.push(
      <g key={`ll-${i}`} transform={`translate(0, ${-length * t})`}>
        {/* Left sub-leaflet */}
        <line
          x1="0" y1="0"
          x2={segLen * Math.cos((leftAngle * Math.PI) / 180)}
          y2={segLen * Math.sin((leftAngle * Math.PI) / 180)}
          stroke="#5a8a3c"
          strokeWidth={0.6 * scale}
          strokeLinecap="round"
          opacity={0.7 + t * 0.2}
        />
        {/* Right sub-leaflet */}
        <line
          x1="0" y1="0"
          x2={segLen * Math.cos((rightAngle * Math.PI) / 180)}
          y2={segLen * Math.sin((rightAngle * Math.PI) / 180)}
          stroke="#5a8a3c"
          strokeWidth={0.6 * scale}
          strokeLinecap="round"
          opacity={0.7 + t * 0.2}
        />
        {/* Tiny secondary divisions on larger leaflets */}
        {segLen > 3 && (
          <>
            <line
              x1={segLen * 0.4 * Math.cos((leftAngle * Math.PI) / 180)}
              y1={segLen * 0.4 * Math.sin((leftAngle * Math.PI) / 180)}
              x2={segLen * 0.4 * Math.cos((leftAngle * Math.PI) / 180) + 1.5 * scale * Math.cos(((leftAngle - 30) * Math.PI) / 180)}
              y2={segLen * 0.4 * Math.sin((leftAngle * Math.PI) / 180) + 1.5 * scale * Math.sin(((leftAngle - 30) * Math.PI) / 180)}
              stroke="#6a9a4a"
              strokeWidth={0.35 * scale}
              strokeLinecap="round"
              opacity="0.5"
            />
            <line
              x1={segLen * 0.4 * Math.cos((rightAngle * Math.PI) / 180)}
              y1={segLen * 0.4 * Math.sin((rightAngle * Math.PI) / 180)}
              x2={segLen * 0.4 * Math.cos((rightAngle * Math.PI) / 180) + 1.5 * scale * Math.cos(((rightAngle + 30) * Math.PI) / 180)}
              y2={segLen * 0.4 * Math.sin((rightAngle * Math.PI) / 180) + 1.5 * scale * Math.sin(((rightAngle + 30) * Math.PI) / 180)}
              stroke="#6a9a4a"
              strokeWidth={0.35 * scale}
              strokeLinecap="round"
              opacity="0.5"
            />
          </>
        )}
      </g>,
    );
  }

  return (
    <g transform={`translate(${cx}, ${baseY}) rotate(${angle})`}>
      {/* Central rachis of the leaf */}
      <line
        x1="0" y1="0"
        x2="0" y2={-length}
        stroke={`url(#${pfx('chamLeaf')})`}
        strokeWidth={0.8 * scale}
        strokeLinecap="round"
      />
      {leaflets}
    </g>
  );
}

/** Render a single chamomile flower — daisy shape with white ray petals around golden dome */
function renderChamomileFlower(
  cx: number,
  cy: number,
  size: number,
  tilt: number,
  pfx: (name: string) => string,
) {
  const petalCount = 13;
  const petalLen = 7 * size;
  const petalWid = 2.2 * size;
  const centerR = 4 * size;

  return (
    <g transform={`translate(${cx}, ${cy}) rotate(${tilt})`}>
      {/* White ray petals — evenly spaced around center */}
      {Array.from({ length: petalCount }, (_, i) => {
        const deg = (360 / petalCount) * i;
        // Slight variation in petal length for natural look
        const pLen = petalLen * (0.9 + (i % 3) * 0.07);
        return (
          <path
            key={`petal-${i}`}
            d={`M 0 0 C ${-petalWid * 0.5} ${-pLen * 0.3} ${-petalWid * 0.6} ${-pLen * 0.7} ${-petalWid * 0.15} ${-pLen}
                C 0 ${-pLen * 1.04} ${petalWid * 0.15} ${-pLen}
                  ${petalWid * 0.6} ${-pLen * 0.7} C ${petalWid * 0.5} ${-pLen * 0.3} 0 0 0 0`}
            fill={`url(#${pfx('chamPetal')})`}
            transform={`rotate(${deg})`}
            opacity="0.92"
            stroke="#e0e0d8"
            strokeWidth="0.15"
          />
        );
      })}

      {/* Golden dome center — slightly raised/conical appearance */}
      <ellipse cx="0" cy="-0.5" rx={centerR} ry={centerR * 0.85} fill={`url(#${pfx('chamCenter')})`} />
      {/* Dome highlight — upper-left */}
      <ellipse cx={-centerR * 0.25} cy={-centerR * 0.35} rx={centerR * 0.5} ry={centerR * 0.4} fill="#ffe060" opacity="0.3" />
      {/* Dome texture dots — tiny bumps representing disc florets */}
      {Array.from({ length: 12 }, (_, i) => {
        const a = (137.508 * i * Math.PI) / 180;
        const r = centerR * 0.2 + (i * centerR * 0.06);
        if (r > centerR * 0.8) return null;
        const dx = r * Math.cos(a);
        const dy = r * Math.sin(a) * 0.85 - 0.5;
        return (
          <circle key={`dot-${i}`} cx={dx} cy={dy} r={0.4 * size} fill="#c89418" opacity="0.4" />
        );
      })}
      {/* Dome rim shadow */}
      <ellipse
        cx="0" cy={centerR * 0.15}
        rx={centerR * 0.9} ry={centerR * 0.3}
        fill="#b88a10"
        opacity="0.12"
      />
    </g>
  );
}

export function renderChamomile(stage: number, pfx: (name: string) => string) {
  return (
    <g>
      {/* ── Stage 1: Tiny pale seed on soil ── */}
      {stage >= 1 && stage < 2 && (
        <g transform="translate(100, 264)" filter={`url(#${pfx('softShadow')})`}>
          {/* Seed shadow */}
          <ellipse cx="0.5" cy="3" rx="3" ry="1" fill="#3a2518" opacity="0.15" />
          {/* Seed body — small pale oval */}
          <ellipse cx="0" cy="0" rx="2.5" ry="3.5" fill={`url(#${pfx('chamSeed')})`} />
          <ellipse cx="0" cy="0" rx="2.5" ry="3.5" fill="none" stroke="#b8a880" strokeWidth="0.4" opacity="0.5" />
          {/* Ridge line */}
          <path d="M 0 -3 C 0.3 -1 0.3 1 0 3" stroke="#c4b890" strokeWidth="0.4" fill="none" opacity="0.35" />
          {/* Highlight */}
          <ellipse cx="-0.7" cy="-1" rx="1" ry="1.5" fill="#f0e8d0" opacity="0.25" />
        </g>
      )}

      {/* ── Stage 2: Thin stem with 2 feathery leaves ── */}
      {stage >= 2 && (
        <g>
          {/* Main central stem — thin and delicate */}
          {(() => {
            const stemTop = stage >= 6 ? 80 : stage >= 5 ? 90 : stage >= 4 ? 120 : stage >= 3 ? 165 : 235;
            const sw = stage >= 5 ? 2 : stage >= 4 ? 1.8 : stage >= 3 ? 1.5 : 1.2;
            return (
              <g filter={`url(#${pfx('softShadow')})`}>
                <path
                  d={`M 100 262 C 100.5 245 99.5 ${stemTop + 30} 100 ${stemTop}`}
                  stroke={`url(#${pfx('chamStem')})`}
                  strokeWidth={sw}
                  fill="none"
                  strokeLinecap="round"
                />
                {/* Stem highlight */}
                <path
                  d={`M 99.7 258 C 100.2 243 98.7 ${stemTop + 32} 99.7 ${stemTop + 2}`}
                  stroke="#7ab050"
                  strokeWidth={sw * 0.25}
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.3"
                />
              </g>
            );
          })()}

          {/* Stage 2 only: Two small feathery leaves near base */}
          {stage >= 2 && stage < 3 && (
            <g filter={`url(#${pfx('softShadow')})`}>
              {renderFeatheryLeaf(100, 250, 12, -35, pfx, 0.7)}
              {renderFeatheryLeaf(100, 248, 11, 30, pfx, 0.65)}
            </g>
          )}
        </g>
      )}

      {/* ── Stage 3: Low spreading bush of feathery foliage ── */}
      {stage >= 3 && (
        <g filter={`url(#${pfx('softShadow')})`}>
          {/* Multiple branching stems with feathery leaves */}
          {/* Left branch */}
          <path
            d="M 100 255 C 95 245 88 238 80 232"
            stroke={`url(#${pfx('chamStem')})`}
            strokeWidth={stage >= 5 ? 1.3 : 1}
            fill="none"
            strokeLinecap="round"
          />
          {renderFeatheryLeaf(85, 240, stage >= 5 ? 20 : 16, -45, pfx, 0.8)}
          {renderFeatheryLeaf(80, 232, stage >= 5 ? 18 : 14, -60, pfx, 0.75)}

          {/* Right branch */}
          <path
            d="M 100 255 C 105 245 112 238 120 232"
            stroke={`url(#${pfx('chamStem')})`}
            strokeWidth={stage >= 5 ? 1.3 : 1}
            fill="none"
            strokeLinecap="round"
          />
          {renderFeatheryLeaf(115, 240, stage >= 5 ? 20 : 16, 45, pfx, 0.8)}
          {renderFeatheryLeaf(120, 232, stage >= 5 ? 18 : 14, 55, pfx, 0.75)}

          {/* Center leaves */}
          {renderFeatheryLeaf(100, 248, stage >= 5 ? 22 : 18, -10, pfx, 0.85)}
          {renderFeatheryLeaf(100, 250, stage >= 5 ? 20 : 16, 15, pfx, 0.8)}
          {renderFeatheryLeaf(95, 252, stage >= 5 ? 18 : 14, -25, pfx, 0.7)}
          {renderFeatheryLeaf(105, 252, stage >= 5 ? 18 : 14, 20, pfx, 0.7)}

          {/* More foliage for stages 4+ */}
          {stage >= 4 && (
            <>
              {renderFeatheryLeaf(75, 235, 16, -70, pfx, 0.7)}
              {renderFeatheryLeaf(125, 235, 16, 65, pfx, 0.7)}
              {renderFeatheryLeaf(90, 245, 18, -20, pfx, 0.75)}
              {renderFeatheryLeaf(110, 245, 18, 25, pfx, 0.75)}
            </>
          )}
        </g>
      )}

      {/* ── Stage 4: Stems with green buds, white petal tips peeking ── */}
      {stage >= 4 && stage < 5 && (
        <g filter={`url(#${pfx('softShadow')})`}>
          {/* Bud stems rising above foliage */}
          {[
            { x: 100, topY: 125, curve: 1 },
            { x: 88, topY: 140, curve: -3 },
            { x: 112, topY: 135, curve: 4 },
            { x: 78, topY: 155, curve: -5 },
            { x: 120, topY: 148, curve: 3 },
          ].map((bud, i) => (
            <g key={`bud-${i}`}>
              {/* Thin stem to bud */}
              <path
                d={`M ${bud.x} ${bud.topY + 80} C ${bud.x + bud.curve * 0.3} ${bud.topY + 50} ${bud.x + bud.curve * 0.7} ${bud.topY + 20} ${bud.x + bud.curve} ${bud.topY}`}
                stroke={`url(#${pfx('chamStem')})`}
                strokeWidth="1"
                fill="none"
                strokeLinecap="round"
              />
              {/* Bud — elongated oval, green at base, white tips */}
              <g transform={`translate(${bud.x + bud.curve}, ${bud.topY})`}>
                <ellipse cx="0" cy="0" rx="3" ry="5" fill={`url(#${pfx('chamBud')})`} />
                <ellipse cx="0" cy="0" rx="3" ry="5" fill="none" stroke="#5a8a3c" strokeWidth="0.3" opacity="0.5" />
                {/* Sepal lines */}
                <path d="M -2 3 C -1.5 1 -0.5 -1 0 -2" stroke="#4a7530" strokeWidth="0.4" fill="none" opacity="0.5" />
                <path d="M 2 3 C 1.5 1 0.5 -1 0 -2" stroke="#4a7530" strokeWidth="0.4" fill="none" opacity="0.5" />
              </g>
            </g>
          ))}
        </g>
      )}

      {/* ── Stage 5: 5-7 open chamomile flowers ── */}
      {stage >= 5 && stage < 6 && (
        <g filter={`url(#${pfx('dropShadow')})`}>
          {/* Flower stems */}
          {[
            { baseX: 100, baseY: 210, topX: 100, topY: 98, tilt: 0, size: 1 },
            { baseX: 92, baseY: 220, topX: 80, topY: 112, tilt: -12, size: 0.9 },
            { baseX: 108, baseY: 218, topX: 118, topY: 106, tilt: 10, size: 0.92 },
            { baseX: 86, baseY: 230, topX: 68, topY: 128, tilt: -18, size: 0.82 },
            { baseX: 114, baseY: 228, topX: 132, topY: 122, tilt: 15, size: 0.85 },
            { baseX: 96, baseY: 225, topX: 88, topY: 140, tilt: -8, size: 0.75 },
            { baseX: 106, baseY: 222, topX: 110, topY: 135, tilt: 5, size: 0.78 },
          ].map((f, i) => (
            <g key={`flower-${i}`}>
              {/* Thin stem to flower */}
              <path
                d={`M ${f.baseX} ${f.baseY} C ${f.baseX + (f.topX - f.baseX) * 0.3} ${f.baseY - (f.baseY - f.topY) * 0.4} ${f.topX - (f.topX - f.baseX) * 0.2} ${f.topY + (f.baseY - f.topY) * 0.3} ${f.topX} ${f.topY}`}
                stroke={`url(#${pfx('chamStem')})`}
                strokeWidth="1.1"
                fill="none"
                strokeLinecap="round"
              />
              {/* The flower head */}
              {renderChamomileFlower(f.topX, f.topY, f.size, f.tilt, pfx)}
            </g>
          ))}
        </g>
      )}

      {/* ── Stage 6: 10-12 flowers in a cheerful spray ── */}
      {stage >= 6 && stage < 7 && (
        <g filter={`url(#${pfx('dropShadow')})`}>
          {[
            { baseX: 100, baseY: 200, topX: 100, topY: 88, tilt: 0, size: 1.05 },
            { baseX: 92, baseY: 215, topX: 76, topY: 96, tilt: -15, size: 0.95 },
            { baseX: 108, baseY: 212, topX: 124, topY: 92, tilt: 12, size: 0.98 },
            { baseX: 85, baseY: 225, topX: 60, topY: 110, tilt: -22, size: 0.85 },
            { baseX: 115, baseY: 222, topX: 140, topY: 105, tilt: 20, size: 0.88 },
            { baseX: 96, baseY: 220, topX: 85, topY: 125, tilt: -8, size: 0.8 },
            { baseX: 104, baseY: 218, topX: 115, topY: 120, tilt: 6, size: 0.82 },
            { baseX: 80, baseY: 235, topX: 55, topY: 130, tilt: -28, size: 0.75 },
            { baseX: 120, baseY: 232, topX: 148, topY: 125, tilt: 25, size: 0.78 },
            { baseX: 90, baseY: 228, topX: 72, topY: 140, tilt: -10, size: 0.72 },
            { baseX: 110, baseY: 226, topX: 130, topY: 138, tilt: 14, size: 0.74 },
            { baseX: 100, baseY: 215, topX: 96, topY: 108, tilt: -3, size: 0.9 },
          ].map((f, i) => (
            <g key={`bloom-${i}`}>
              {/* Thin stem to flower */}
              <path
                d={`M ${f.baseX} ${f.baseY} C ${f.baseX + (f.topX - f.baseX) * 0.3} ${f.baseY - (f.baseY - f.topY) * 0.4} ${f.topX - (f.topX - f.baseX) * 0.2} ${f.topY + (f.baseY - f.topY) * 0.3} ${f.topX} ${f.topY}`}
                stroke={`url(#${pfx('chamStem')})`}
                strokeWidth="1.1"
                fill="none"
                strokeLinecap="round"
              />
              {/* The flower head */}
              {renderChamomileFlower(f.topX, f.topY, f.size, f.tilt, pfx)}
            </g>
          ))}
        </g>
      )}

      {/* ── Stage 7: Harvest glow + floating white petal particles ── */}
      {stage >= 7 && (
        <g>
          {/* Re-render the full bloom flowers at stage 7 */}
          <g filter={`url(#${pfx('dropShadow')})`}>
            {[
              { baseX: 100, baseY: 200, topX: 100, topY: 88, tilt: 0, size: 1.05 },
              { baseX: 92, baseY: 215, topX: 76, topY: 96, tilt: -15, size: 0.95 },
              { baseX: 108, baseY: 212, topX: 124, topY: 92, tilt: 12, size: 0.98 },
              { baseX: 85, baseY: 225, topX: 60, topY: 110, tilt: -22, size: 0.85 },
              { baseX: 115, baseY: 222, topX: 140, topY: 105, tilt: 20, size: 0.88 },
              { baseX: 96, baseY: 220, topX: 85, topY: 125, tilt: -8, size: 0.8 },
              { baseX: 104, baseY: 218, topX: 115, topY: 120, tilt: 6, size: 0.82 },
              { baseX: 80, baseY: 235, topX: 55, topY: 130, tilt: -28, size: 0.75 },
              { baseX: 120, baseY: 232, topX: 148, topY: 125, tilt: 25, size: 0.78 },
              { baseX: 90, baseY: 228, topX: 72, topY: 140, tilt: -10, size: 0.72 },
              { baseX: 110, baseY: 226, topX: 130, topY: 138, tilt: 14, size: 0.74 },
              { baseX: 100, baseY: 215, topX: 96, topY: 108, tilt: -3, size: 0.9 },
            ].map((f, i) => (
              <g key={`h-bloom-${i}`}>
                <path
                  d={`M ${f.baseX} ${f.baseY} C ${f.baseX + (f.topX - f.baseX) * 0.3} ${f.baseY - (f.baseY - f.topY) * 0.4} ${f.topX - (f.topX - f.baseX) * 0.2} ${f.topY + (f.baseY - f.topY) * 0.3} ${f.topX} ${f.topY}`}
                  stroke={`url(#${pfx('chamStem')})`}
                  strokeWidth="1.1"
                  fill="none"
                  strokeLinecap="round"
                />
                {renderChamomileFlower(f.topX, f.topY, f.size, f.tilt, pfx)}
              </g>
            ))}
          </g>

          {/* Golden harvest glow */}
          <circle
            cx="100"
            cy="130"
            r="80"
            fill={`url(#${pfx('harvestGlow')})`}
            className="animate-pulse"
          />

          {/* Floating white petal particles */}
          {[
            { x: 60, y: 75, rot: 15, delay: '0s' },
            { x: 140, y: 68, rot: -25, delay: '1.0s' },
            { x: 45, y: 100, rot: 40, delay: '2.2s' },
            { x: 155, y: 90, rot: -10, delay: '3.4s' },
            { x: 75, y: 60, rot: 55, delay: '1.5s' },
            { x: 125, y: 55, rot: -35, delay: '0.7s' },
            { x: 50, y: 120, rot: 20, delay: '2.8s' },
            { x: 150, y: 115, rot: -45, delay: '3.9s' },
          ].map((p, i) => (
            <g key={`float-${i}`} className="animate-float-away" style={{ animationDelay: p.delay }}>
              {/* Floating white petal */}
              <path
                d={`M ${p.x} ${p.y} C ${p.x - 1.5} ${p.y - 3} ${p.x - 2} ${p.y - 7} ${p.x - 0.5} ${p.y - 9}
                    C ${p.x + 0.5} ${p.y - 9.5} ${p.x + 2} ${p.y - 7} ${p.x + 1.5} ${p.y - 3} Z`}
                fill="#ffffff"
                opacity="0.55"
                transform={`rotate(${p.rot} ${p.x} ${p.y})`}
              />
              {/* Petal inner highlight */}
              <path
                d={`M ${p.x} ${p.y - 1} C ${p.x - 0.8} ${p.y - 3.5} ${p.x - 1} ${p.y - 6} ${p.x} ${p.y - 7}
                    C ${p.x + 1} ${p.y - 6} ${p.x + 0.8} ${p.y - 3.5} ${p.x} ${p.y - 1}`}
                fill="#f8f4e8"
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
