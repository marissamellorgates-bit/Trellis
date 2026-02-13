import { useId } from 'react';
import type { PlantVisualProps } from '../types';

const PlantVisual = ({ stage, type, instanceId }: PlantVisualProps) => {
  const reactId = useId();
  const uid = instanceId || reactId;
  const pfx = (name: string) => `${name}-${uid}`;

  const isSunflower = type === 'sunflower';
  const isOak = type === 'oak';
  const isCactus = type === 'cactus';

  return (
    <div className="w-full h-full pointer-events-none select-none">
      <svg
        viewBox="0 0 200 300"
        preserveAspectRatio="xMidYMax meet"
        className="w-full h-full transition-all duration-1000"
        aria-hidden="true"
      >
        <defs>
          {/* ── Shared filters ── */}
          <filter id={pfx('dropShadow')} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#1a0e05" floodOpacity="0.25" />
          </filter>
          <filter id={pfx('softShadow')} x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0.5" dy="1" stdDeviation="1.2" floodColor="#1a0e05" floodOpacity="0.18" />
          </filter>
          <filter id={pfx('glow')}>
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* ── Sunflower gradients ── */}
          {isSunflower && (
            <>
              <linearGradient id={pfx('sfStemGrad')} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#2d5420" />
                <stop offset="30%" stopColor="#3d6b2e" />
                <stop offset="55%" stopColor="#5a8a3c" />
                <stop offset="80%" stopColor="#4a7530" />
                <stop offset="100%" stopColor="#2d5420" />
              </linearGradient>
              <linearGradient id={pfx('sfStemHi')} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#6ba048" stopOpacity="0" />
                <stop offset="40%" stopColor="#8abf60" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#6ba048" stopOpacity="0" />
              </linearGradient>
              {/* Leaf: dark base */}
              <linearGradient id={pfx('sfLeafBase')} x1="0" y1="0" x2="0.8" y2="1">
                <stop offset="0%" stopColor="#3a6524" />
                <stop offset="100%" stopColor="#2a4e18" />
              </linearGradient>
              {/* Leaf: mid layer */}
              <linearGradient id={pfx('sfLeafMid')} x1="0.2" y1="0" x2="1" y2="0.8">
                <stop offset="0%" stopColor="#5a8a3c" />
                <stop offset="50%" stopColor="#4a7a30" />
                <stop offset="100%" stopColor="#3a6524" />
              </linearGradient>
              {/* Leaf: specular highlight */}
              <linearGradient id={pfx('sfLeafHi')} x1="0.3" y1="0" x2="0.7" y2="1">
                <stop offset="0%" stopColor="#8dc060" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#7ab050" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#5a8a3c" stopOpacity="0" />
              </linearGradient>
              <radialGradient id={pfx('sfPetalOuter')} cx="50%" cy="100%" r="80%">
                <stop offset="0%" stopColor="#f5c040" />
                <stop offset="40%" stopColor="#f0a830" />
                <stop offset="100%" stopColor="#c47008" />
              </radialGradient>
              <radialGradient id={pfx('sfPetalInner')} cx="50%" cy="100%" r="80%">
                <stop offset="0%" stopColor="#ffe070" />
                <stop offset="40%" stopColor="#ffd54f" />
                <stop offset="100%" stopColor="#e8a020" />
              </radialGradient>
              <radialGradient id={pfx('sfCenter')} cx="40%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#6b4422" />
                <stop offset="40%" stopColor="#4a2a12" />
                <stop offset="100%" stopColor="#1a0a04" />
              </radialGradient>
              <linearGradient id={pfx('sfSeedGrad')} x1="0.3" y1="0" x2="0.7" y2="1">
                <stop offset="0%" stopColor="#d4b880" />
                <stop offset="50%" stopColor="#c4a265" />
                <stop offset="100%" stopColor="#8b6d3f" />
              </linearGradient>
            </>
          )}

          {/* ── Oak gradients ── */}
          {isOak && (
            <>
              <linearGradient id={pfx('oakTrunk')} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#2e1808" />
                <stop offset="15%" stopColor="#4a2c14" />
                <stop offset="35%" stopColor="#6b4528" />
                <stop offset="50%" stopColor="#7a5230" />
                <stop offset="65%" stopColor="#6b4528" />
                <stop offset="85%" stopColor="#4a2c14" />
                <stop offset="100%" stopColor="#2e1808" />
              </linearGradient>
              <linearGradient id={pfx('oakTrunkHi')} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#a07850" stopOpacity="0" />
                <stop offset="35%" stopColor="#a07850" stopOpacity="0.25" />
                <stop offset="50%" stopColor="#b08860" stopOpacity="0.35" />
                <stop offset="65%" stopColor="#a07850" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#a07850" stopOpacity="0" />
              </linearGradient>
              <linearGradient id={pfx('oakBark')} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3a2010" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#2e1808" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#3a2010" stopOpacity="0.3" />
              </linearGradient>
              <radialGradient id={pfx('oakCanopy1')} cx="45%" cy="55%" r="55%">
                <stop offset="0%" stopColor="#5a9c4e" />
                <stop offset="60%" stopColor="#3d7a33" />
                <stop offset="100%" stopColor="#1e5518" />
              </radialGradient>
              <radialGradient id={pfx('oakCanopy2')} cx="40%" cy="45%" r="60%">
                <stop offset="0%" stopColor="#4a8c3f" />
                <stop offset="60%" stopColor="#2d6b25" />
                <stop offset="100%" stopColor="#1a4a14" />
              </radialGradient>
              <radialGradient id={pfx('oakCanopy3')} cx="55%" cy="50%" r="55%">
                <stop offset="0%" stopColor="#68b058" />
                <stop offset="60%" stopColor="#4a8c3f" />
                <stop offset="100%" stopColor="#2d6b25" />
              </radialGradient>
              {/* Oak leaf base */}
              <linearGradient id={pfx('oakLeafBase')} x1="0" y1="0" x2="0.8" y2="1">
                <stop offset="0%" stopColor="#2d6020" />
                <stop offset="100%" stopColor="#1a4a14" />
              </linearGradient>
              {/* Oak leaf mid */}
              <linearGradient id={pfx('oakLeafMid')} x1="0.2" y1="0" x2="1" y2="0.8">
                <stop offset="0%" stopColor="#4a8c3f" />
                <stop offset="50%" stopColor="#3d7a33" />
                <stop offset="100%" stopColor="#2d6020" />
              </linearGradient>
              {/* Oak leaf highlight */}
              <linearGradient id={pfx('oakLeafHi')} x1="0.3" y1="0" x2="0.7" y2="1">
                <stop offset="0%" stopColor="#78c060" stopOpacity="0.55" />
                <stop offset="50%" stopColor="#60a848" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#4a8c3f" stopOpacity="0" />
              </linearGradient>
              {/* Oak leaf shape gradient (canopy edge leaves) */}
              <radialGradient id={pfx('oakLeafG')} cx="40%" cy="40%" r="65%">
                <stop offset="0%" stopColor="#5ea050" />
                <stop offset="100%" stopColor="#2d6b25" />
              </radialGradient>
              <linearGradient id={pfx('acornGrad')} x1="0.3" y1="0" x2="0.7" y2="1">
                <stop offset="0%" stopColor="#b89060" />
                <stop offset="30%" stopColor="#a08050" />
                <stop offset="70%" stopColor="#8b6d3f" />
                <stop offset="100%" stopColor="#6b5030" />
              </linearGradient>
              <linearGradient id={pfx('acornCapGrad')} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c4a070" />
                <stop offset="50%" stopColor="#a08050" />
                <stop offset="100%" stopColor="#7a5a35" />
              </linearGradient>
              <linearGradient id={pfx('oakBranchGrad')} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#4a2c14" />
                <stop offset="50%" stopColor="#6b4528" />
                <stop offset="100%" stopColor="#4a2c14" />
              </linearGradient>
            </>
          )}

          {/* ── Cactus gradients ── */}
          {isCactus && (
            <>
              <linearGradient id={pfx('cacBody')} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#14442a" />
                <stop offset="10%" stopColor="#1e5530" />
                <stop offset="25%" stopColor="#2a7040" />
                <stop offset="40%" stopColor="#3d9050" />
                <stop offset="52%" stopColor="#4aa55c" />
                <stop offset="60%" stopColor="#3d9050" />
                <stop offset="75%" stopColor="#2a7040" />
                <stop offset="90%" stopColor="#1e5530" />
                <stop offset="100%" stopColor="#14442a" />
              </linearGradient>
              <linearGradient id={pfx('cacBodyHi')} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#60c070" stopOpacity="0" />
                <stop offset="30%" stopColor="#6dd07a" stopOpacity="0.2" />
                <stop offset="45%" stopColor="#80e090" stopOpacity="0.3" />
                <stop offset="55%" stopColor="#8ae898" stopOpacity="0.2" />
                <stop offset="70%" stopColor="#6dd07a" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#60c070" stopOpacity="0" />
              </linearGradient>
              <linearGradient id={pfx('cacBodyVert')} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4aa55c" stopOpacity="0.15" />
                <stop offset="50%" stopColor="#3d9050" stopOpacity="0" />
                <stop offset="100%" stopColor="#1e5530" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id={pfx('cacArm')} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#14442a" />
                <stop offset="20%" stopColor="#1e5530" />
                <stop offset="45%" stopColor="#3d9050" />
                <stop offset="60%" stopColor="#45a05a" />
                <stop offset="80%" stopColor="#2d7843" />
                <stop offset="100%" stopColor="#1e5530" />
              </linearGradient>
              <linearGradient id={pfx('cacArmHi')} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#60c070" stopOpacity="0" />
                <stop offset="40%" stopColor="#70d080" stopOpacity="0.2" />
                <stop offset="60%" stopColor="#80e090" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#60c070" stopOpacity="0" />
              </linearGradient>
              <radialGradient id={pfx('cacFlowerOuter')} cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#ff8ab5" />
                <stop offset="30%" stopColor="#ff6b9d" />
                <stop offset="60%" stopColor="#e91e63" />
                <stop offset="100%" stopColor="#c2185b" />
              </radialGradient>
              <radialGradient id={pfx('cacFlowerInner')} cx="40%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#ffb8d4" />
                <stop offset="40%" stopColor="#ff8ab5" />
                <stop offset="100%" stopColor="#e91e63" />
              </radialGradient>
              <radialGradient id={pfx('cacFlowerCenter')} cx="40%" cy="40%" r="50%">
                <stop offset="0%" stopColor="#ffe880" />
                <stop offset="50%" stopColor="#ffd54f" />
                <stop offset="100%" stopColor="#f0a830" />
              </radialGradient>
              <linearGradient id={pfx('cacFruit')} x1="0.2" y1="0" x2="0.8" y2="1">
                <stop offset="0%" stopColor="#f07098" />
                <stop offset="30%" stopColor="#e85088" />
                <stop offset="60%" stopColor="#d83878" />
                <stop offset="100%" stopColor="#a31545" />
              </linearGradient>
              <linearGradient id={pfx('cacFruitHi')} x1="0.3" y1="0" x2="0.7" y2="1">
                <stop offset="0%" stopColor="#ff9ab8" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#ff8ab0" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#f07098" stopOpacity="0" />
              </linearGradient>
              <linearGradient id={pfx('sandSoil')} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d4b880" />
                <stop offset="40%" stopColor="#c4a265" />
                <stop offset="100%" stopColor="#a08050" />
              </linearGradient>
              <linearGradient id={pfx('cacSeedGrad')} x1="0.3" y1="0" x2="0.7" y2="1">
                <stop offset="0%" stopColor="#a08860" />
                <stop offset="50%" stopColor="#8b7050" />
                <stop offset="100%" stopColor="#6b5535" />
              </linearGradient>
            </>
          )}

          {/* Harvest glow */}
          <radialGradient id={pfx('harvestGlow')} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffd700" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#ffd700" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#ffd700" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ════════════ SOIL ════════════ */}
        <g>
          {/* Soil body */}
          <path
            d={isCactus
              ? "M 8 272 Q 60 267 100 265 Q 140 267 192 272 L 196 290 L 4 290 Z"
              : "M 8 272 Q 60 264 100 262 Q 140 264 192 272 L 196 290 L 4 290 Z"
            }
            fill={isCactus ? `url(#${pfx('sandSoil')})` : "#5a3e28"}
          />
          {/* Darker soil lower layer */}
          <path
            d={isCactus
              ? "M 8 278 Q 60 275 100 274 Q 140 275 192 278 L 196 290 L 4 290 Z"
              : "M 8 278 Q 60 274 100 273 Q 140 274 192 278 L 196 290 L 4 290 Z"
            }
            fill={isCactus ? "#9a7a50" : "#4a3020"}
            opacity="0.5"
          />
          {/* Surface texture line */}
          <path
            d={isCactus
              ? "M 12 272 Q 60 267 100 265 Q 140 267 188 272"
              : "M 12 272 Q 60 264 100 262 Q 140 264 188 272"
            }
            fill="none"
            stroke={isCactus ? "#b89060" : "#3a2518"}
            strokeWidth="1"
            opacity="0.7"
          />
          {/* Soil particles / pebbles */}
          {!isCactus && (
            <g opacity="0.4">
              <circle cx="60" cy="275" r="1.5" fill="#6b4e30" />
              <circle cx="85" cy="278" r="1" fill="#7a5e3a" />
              <circle cx="130" cy="276" r="1.3" fill="#6b4e30" />
              <circle cx="110" cy="280" r="0.8" fill="#5a3e28" />
              <circle cx="45" cy="279" r="1.1" fill="#7a5e3a" />
              <circle cx="155" cy="278" r="0.9" fill="#6b4e30" />
            </g>
          )}
          {isCactus && (
            <g opacity="0.35">
              <circle cx="55" cy="274" r="1.8" fill="#b89060" />
              <circle cx="80" cy="276" r="1.2" fill="#c4a265" />
              <circle cx="125" cy="275" r="1.5" fill="#b89060" />
              <circle cx="145" cy="277" r="1" fill="#a08050" />
              <circle cx="40" cy="276" r="0.9" fill="#c4a265" />
              <circle cx="160" cy="275" r="1.3" fill="#b89060" />
            </g>
          )}
        </g>

        {/* ════════════ SUNFLOWER ════════════ */}
        {isSunflower && (
          <g>
            {/* Stage 1: Seed */}
            {stage >= 1 && (
              <g transform="translate(100, 262)" filter={`url(#${pfx('softShadow')})`}>
                {/* Seed shadow on soil */}
                <ellipse cx="1" cy="4" rx="4" ry="2" fill="#3a2518" opacity="0.2" />
                {/* Seed body */}
                <ellipse cx="0" cy="0" rx="4.5" ry="7" fill={`url(#${pfx('sfSeedGrad')})`} transform="rotate(-12)" />
                {/* Seed edge/outline */}
                <ellipse cx="0" cy="0" rx="4.5" ry="7" fill="none" stroke="#6b5030" strokeWidth="0.5" transform="rotate(-12)" />
                {/* Seed stripe */}
                <path d="M -0.5 -5 C 0 -3 0.5 0 0 3" stroke="#a08050" strokeWidth="0.8" fill="none" opacity="0.4" transform="rotate(-12)" />
                {/* Seed highlight */}
                <ellipse cx="-1.5" cy="-2" rx="1.5" ry="3" fill="#e0d0a0" opacity="0.2" transform="rotate(-12)" />
              </g>
            )}

            {/* Stage 2: Roots */}
            {stage >= 2 && (
              <g opacity="0.65">
                <path d="M 100 266 C 99 274 96 282 92 290" stroke="#8b6d4a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <path d="M 100 266 C 102 275 106 284 112 292" stroke="#8b6d4a" strokeWidth="1.3" fill="none" strokeLinecap="round" />
                <path d="M 100 270 C 96 274 90 278 85 281" stroke="#8b6d4a" strokeWidth="0.9" fill="none" strokeLinecap="round" />
                <path d="M 95 280 C 92 284 88 287 84 289" stroke="#8b6d4a" strokeWidth="0.5" fill="none" strokeLinecap="round" />
                <path d="M 108 282 C 111 286 115 289 118 290" stroke="#8b6d4a" strokeWidth="0.5" fill="none" strokeLinecap="round" />
                <path d="M 93 286 C 90 289 87 291 85 292" stroke="#8b6d4a" strokeWidth="0.35" fill="none" strokeLinecap="round" />
                <path d="M 110 287 C 113 290 116 292 119 292" stroke="#8b6d4a" strokeWidth="0.35" fill="none" strokeLinecap="round" />
              </g>
            )}

            {/* Stage 3: Stem */}
            {stage >= 3 && (() => {
              const stemTop = stage >= 5 ? 120 : stage >= 4 ? 155 : 205;
              const sw = stage >= 5 ? 7 : stage >= 4 ? 5.5 : 4;
              return (
                <g filter={`url(#${pfx('softShadow')})`}>
                  {/* Stem shadow (offset dark stroke behind) */}
                  <path
                    d={`M 102 262 C 103 238 101 ${stemTop + 42} 102 ${stemTop + 2}`}
                    stroke="#1a3010"
                    strokeWidth={sw * 0.6}
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.15"
                  />
                  {/* Main stem */}
                  <path
                    d={`M 100 262 C 101 238 99 ${stemTop + 40} 100 ${stemTop}`}
                    stroke={`url(#${pfx('sfStemGrad')})`}
                    strokeWidth={sw}
                    fill="none"
                    strokeLinecap="round"
                  />
                  {/* Stem center highlight */}
                  <path
                    d={`M 100 258 C 101 236 99 ${stemTop + 42} 100 ${stemTop + 3}`}
                    stroke={`url(#${pfx('sfStemHi')})`}
                    strokeWidth={sw * 0.5}
                    fill="none"
                    strokeLinecap="round"
                  />
                  {/* Stem node bumps */}
                  {stage >= 4 && (
                    <>
                      <ellipse cx="100" cy="228" rx={sw * 0.55} ry="2" fill="#4a7530" opacity="0.5" />
                      <ellipse cx="100" cy="188" rx={sw * 0.5} ry="1.8" fill="#4a7530" opacity="0.4" />
                    </>
                  )}
                </g>
              );
            })()}

            {/* Stage 4: Leaves with petioles attached to stem */}
            {stage >= 4 && (
              <g>
                {/* ── Lower left leaf ── */}
                <g filter={`url(#${pfx('softShadow')})`}>
                  {/* Petiole (leaf stem) connecting to main stem */}
                  <path d="M 100 230 C 97 228 92 225 88 222" stroke="#3d6b2e" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <path d="M 100 230 C 97 228 92 225 88 222" stroke="#5a8a3c" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.4" />
                  <g transform="translate(88, 222) rotate(-40)">
                    {/* Base layer */}
                    <path
                      d="M 0 0 C -3 -2 -9 -7 -16 -10 C -20 -12 -26 -14 -30 -13 C -34 -12 -35 -8 -33 -4 C -31 0 -26 5 -20 8 C -14 11 -8 12 -4 11 C -1 9 0 4 0 0"
                      fill={`url(#${pfx('sfLeafBase')})`}
                    />
                    {/* Mid layer */}
                    <path
                      d="M -0.5 0 C -3 -2 -9 -6 -15 -9 C -19 -11 -25 -13 -28 -12 C -32 -11 -33 -8 -31 -4 C -29 -1 -25 4 -19 7 C -14 9 -8 10 -4 9 C -1 7.5 0 3.5 -0.5 0"
                      fill={`url(#${pfx('sfLeafMid')})`}
                      opacity="0.85"
                    />
                    {/* Highlight */}
                    <path
                      d="M -2 -1 C -5 -3 -10 -6 -15 -8 C -19 -10 -23 -11 -26 -10 C -29 -9 -30 -6 -28 -3 C -26 0 -22 3 -18 5 C -13 7 -8 7 -5 6 C -3 4 -2 2 -2 -1"
                      fill={`url(#${pfx('sfLeafHi')})`}
                      opacity="0.4"
                    />
                    {/* Midrib */}
                    <path d="M 0 0 C -4 -2 -12 -5 -20 -8 C -26 -10 -31 -10 -33 -5" stroke="#2d4e18" strokeWidth="0.9" fill="none" />
                    <path d="M 0 0 C -4 -2 -12 -5 -20 -8 C -26 -10 -31 -10 -33 -5" stroke="#4a7530" strokeWidth="0.35" fill="none" opacity="0.35" />
                    {/* Secondary veins — 4 pairs */}
                    <path d="M -6 -2 C -8 -5 -10 -9 -12 -11" stroke="#3a6020" strokeWidth="0.4" fill="none" opacity="0.55" />
                    <path d="M -6 -2 C -8 1 -10 4 -11 6" stroke="#3a6020" strokeWidth="0.35" fill="none" opacity="0.45" />
                    <path d="M -12 -4 C -15 -8 -17 -11 -19 -12" stroke="#3a6020" strokeWidth="0.35" fill="none" opacity="0.5" />
                    <path d="M -12 -4 C -14 -1 -16 2 -18 4" stroke="#3a6020" strokeWidth="0.3" fill="none" opacity="0.4" />
                    <path d="M -18 -6 C -21 -9 -24 -11 -26 -12" stroke="#3a6020" strokeWidth="0.3" fill="none" opacity="0.45" />
                    <path d="M -18 -6 C -20 -3 -23 0 -24 2" stroke="#3a6020" strokeWidth="0.25" fill="none" opacity="0.35" />
                    <path d="M -24 -8 C -27 -10 -29 -11 -30 -11" stroke="#3a6020" strokeWidth="0.25" fill="none" opacity="0.4" />
                    <path d="M -24 -8 C -26 -5 -28 -2 -29 0" stroke="#3a6020" strokeWidth="0.2" fill="none" opacity="0.3" />
                    {/* Tertiary veins */}
                    <path d="M -9 -4 C -10 -6 -11 -8 -12 -9" stroke="#4a7a30" strokeWidth="0.2" fill="none" opacity="0.2" />
                    <path d="M -15 -6 C -16 -8 -17 -9 -18 -10" stroke="#4a7a30" strokeWidth="0.2" fill="none" opacity="0.2" />
                  </g>
                </g>

                {/* ── Lower right leaf ── */}
                <g filter={`url(#${pfx('softShadow')})`}>
                  <path d="M 100 224 C 103 222 108 218 112 215" stroke="#3d6b2e" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <path d="M 100 224 C 103 222 108 218 112 215" stroke="#5a8a3c" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.4" />
                  <g transform="translate(112, 215) rotate(35)">
                    <path
                      d="M 0 0 C 3 -2 9 -8 17 -12 C 21 -14 27 -16 31 -15 C 35 -14 37 -10 35 -6 C 33 -2 28 3 22 7 C 16 10 10 11 6 10 C 2 8 0 4 0 0"
                      fill={`url(#${pfx('sfLeafBase')})`}
                    />
                    <path
                      d="M 0.5 0 C 3 -2 9.5 -7 16 -11 C 20 -13 26 -15 29 -14 C 33 -13 34 -9 33 -6 C 31 -2 27 3 21 6 C 16 8 10 9 6 8 C 2 7 0.5 3.5 0.5 0"
                      fill={`url(#${pfx('sfLeafMid')})`}
                      opacity="0.85"
                    />
                    <path
                      d="M 2 -1 C 5 -3 11 -7 16 -10 C 20 -12 24 -13 27 -12 C 30 -11 31 -8 30 -5 C 28 -2 24 2 20 4 C 15 6 10 6 7 5 C 4 3 2 1 2 -1"
                      fill={`url(#${pfx('sfLeafHi')})`}
                      opacity="0.4"
                    />
                    <path d="M 0 0 C 4 -2 13 -6 22 -10 C 28 -12 33 -12 35 -7" stroke="#2d4e18" strokeWidth="0.9" fill="none" />
                    <path d="M 0 0 C 4 -2 13 -6 22 -10 C 28 -12 33 -12 35 -7" stroke="#4a7530" strokeWidth="0.35" fill="none" opacity="0.35" />
                    <path d="M 6 -3 C 8 -6 10 -10 12 -13" stroke="#3a6020" strokeWidth="0.4" fill="none" opacity="0.55" />
                    <path d="M 6 -3 C 8 0 10 3 11 5" stroke="#3a6020" strokeWidth="0.35" fill="none" opacity="0.45" />
                    <path d="M 13 -5 C 16 -9 18 -12 20 -14" stroke="#3a6020" strokeWidth="0.35" fill="none" opacity="0.5" />
                    <path d="M 13 -5 C 15 -2 17 1 19 3" stroke="#3a6020" strokeWidth="0.3" fill="none" opacity="0.4" />
                    <path d="M 19 -7 C 22 -10 25 -13 27 -14" stroke="#3a6020" strokeWidth="0.3" fill="none" opacity="0.45" />
                    <path d="M 19 -7 C 21 -4 24 -1 26 1" stroke="#3a6020" strokeWidth="0.25" fill="none" opacity="0.35" />
                    <path d="M 25 -9 C 28 -11 30 -12 32 -13" stroke="#3a6020" strokeWidth="0.25" fill="none" opacity="0.4" />
                    <path d="M 25 -9 C 27 -6 29 -3 30 -1" stroke="#3a6020" strokeWidth="0.2" fill="none" opacity="0.3" />
                    <path d="M 10 -5 C 11 -7 12 -9 13 -10" stroke="#4a7a30" strokeWidth="0.2" fill="none" opacity="0.2" />
                    <path d="M 16 -7 C 17 -9 18 -10 19 -11" stroke="#4a7a30" strokeWidth="0.2" fill="none" opacity="0.2" />
                  </g>
                </g>

                {/* ── Upper left leaf (smaller) ── */}
                <g filter={`url(#${pfx('softShadow')})`}>
                  <path d="M 100 192 C 97 190 94 187 91 185" stroke="#3d6b2e" strokeWidth="1.6" fill="none" strokeLinecap="round" />
                  <path d="M 100 192 C 97 190 94 187 91 185" stroke="#5a8a3c" strokeWidth="0.6" fill="none" strokeLinecap="round" opacity="0.4" />
                  <g transform="translate(91, 185) rotate(-45)">
                    <path
                      d="M 0 0 C -2 -1.5 -7 -5 -12 -7 C -15 -9 -19 -10 -22 -9 C -25 -8 -26 -5 -24 -2 C -22 1 -19 4 -14 6 C -10 8 -6 8 -3 7 C -1 5 0 2.5 0 0"
                      fill={`url(#${pfx('sfLeafBase')})`}
                    />
                    <path
                      d="M -0.5 0 C -2.5 -1.5 -7 -4.5 -11.5 -6.5 C -14 -8 -18 -9.5 -21 -8.5 C -23 -7.5 -24 -5 -23 -2 C -21 0.5 -18 3.5 -14 5.5 C -10 7 -6 7 -3 6 C -1 4.5 -0.5 2 -0.5 0"
                      fill={`url(#${pfx('sfLeafMid')})`}
                      opacity="0.85"
                    />
                    <path
                      d="M -1.5 -0.5 C -3 -2 -7 -4 -11 -6 C -14 -7 -17 -8 -19 -7 C -21 -6 -22 -4 -21 -2 C -19 0 -16 2.5 -13 4 C -9 5 -6 5 -4 4 C -2 2.5 -1.5 1 -1.5 -0.5"
                      fill={`url(#${pfx('sfLeafHi')})`}
                      opacity="0.4"
                    />
                    <path d="M 0 0 C -3 -1 -10 -4 -16 -6 C -20 -7 -24 -7 -24 -3" stroke="#2d4e18" strokeWidth="0.7" fill="none" />
                    <path d="M -5 -2 C -7 -4 -8 -6 -9 -8" stroke="#3a6020" strokeWidth="0.3" fill="none" opacity="0.5" />
                    <path d="M -5 -2 C -6 0 -7 2 -8 3" stroke="#3a6020" strokeWidth="0.25" fill="none" opacity="0.4" />
                    <path d="M -10 -3 C -12 -5 -14 -7 -15 -8" stroke="#3a6020" strokeWidth="0.25" fill="none" opacity="0.45" />
                    <path d="M -10 -3 C -12 -1 -14 1 -15 2" stroke="#3a6020" strokeWidth="0.2" fill="none" opacity="0.35" />
                    <path d="M -16 -5 C -18 -6 -20 -8 -21 -8" stroke="#3a6020" strokeWidth="0.2" fill="none" opacity="0.4" />
                    <path d="M -16 -5 C -18 -3 -20 -1 -21 0" stroke="#3a6020" strokeWidth="0.18" fill="none" opacity="0.3" />
                  </g>
                </g>

                {/* ── Upper right leaf (smaller) ── */}
                <g filter={`url(#${pfx('softShadow')})`}>
                  <path d="M 100 182 C 103 180 106 177 109 175" stroke="#3d6b2e" strokeWidth="1.6" fill="none" strokeLinecap="round" />
                  <path d="M 100 182 C 103 180 106 177 109 175" stroke="#5a8a3c" strokeWidth="0.6" fill="none" strokeLinecap="round" opacity="0.4" />
                  <g transform="translate(109, 175) rotate(40)">
                    <path
                      d="M 0 0 C 2 -2 7 -5.5 13 -8 C 16 -10 20 -11 23 -10 C 26 -9 27 -6 25 -3 C 23 0 20 3.5 15 6 C 11 8 7 8 4 7 C 1 5.5 0 3 0 0"
                      fill={`url(#${pfx('sfLeafBase')})`}
                    />
                    <path
                      d="M 0.5 0 C 2.5 -2 7.5 -5 12.5 -7.5 C 15 -9 19 -10 22 -9.5 C 24 -8.5 25 -6 24 -3 C 22 0 19 3 15 5 C 11 7 7 7 4 6 C 1.5 4.5 0.5 2 0.5 0"
                      fill={`url(#${pfx('sfLeafMid')})`}
                      opacity="0.85"
                    />
                    <path
                      d="M 1.5 -0.5 C 3.5 -2 8 -4.5 12 -7 C 15 -8 18 -9 20 -8 C 22 -7 23 -5 22 -3 C 20 -1 18 2 14 3.5 C 10 5 7 5 5 4 C 3 2.5 1.5 1 1.5 -0.5"
                      fill={`url(#${pfx('sfLeafHi')})`}
                      opacity="0.4"
                    />
                    <path d="M 0 0 C 3 -1 10 -4 17 -7 C 21 -8 25 -8 25 -4" stroke="#2d4e18" strokeWidth="0.7" fill="none" />
                    <path d="M 5 -2 C 7 -4 9 -7 10 -9" stroke="#3a6020" strokeWidth="0.3" fill="none" opacity="0.5" />
                    <path d="M 5 -2 C 7 0 8 2 9 3" stroke="#3a6020" strokeWidth="0.25" fill="none" opacity="0.4" />
                    <path d="M 11 -4 C 13 -6 15 -8 16 -9" stroke="#3a6020" strokeWidth="0.25" fill="none" opacity="0.45" />
                    <path d="M 11 -4 C 13 -2 15 0 16 2" stroke="#3a6020" strokeWidth="0.2" fill="none" opacity="0.35" />
                    <path d="M 17 -6 C 19 -7 21 -8 22 -9" stroke="#3a6020" strokeWidth="0.2" fill="none" opacity="0.4" />
                    <path d="M 17 -6 C 19 -4 21 -2 22 -1" stroke="#3a6020" strokeWidth="0.18" fill="none" opacity="0.3" />
                  </g>
                </g>
              </g>
            )}

            {/* Stage 5: Bloom */}
            {stage >= 5 && (
              <g transform="translate(100, 120)" filter={`url(#${pfx('dropShadow')})`}>
                {/* Outer petals (amber/orange) */}
                {Array.from({ length: 16 }, (_, i) => {
                  const deg = (360 / 16) * i;
                  return (
                    <path
                      key={`outer-${i}`}
                      d="M 0 -3 C -5 -14 -7 -30 -4 -42 C -2 -46 2 -46 4 -42 C 7 -30 5 -14 0 -3"
                      fill={`url(#${pfx('sfPetalOuter')})`}
                      transform={`rotate(${deg})`}
                    />
                  );
                })}

                {/* Inner petals (gold/yellow) */}
                {Array.from({ length: 16 }, (_, i) => {
                  const deg = (360 / 16) * i + (360 / 32);
                  return (
                    <path
                      key={`inner-${i}`}
                      d="M 0 -2 C -4 -10 -5 -24 -3 -34 C -1.5 -37 1.5 -37 3 -34 C 5 -24 4 -10 0 -2"
                      fill={`url(#${pfx('sfPetalInner')})`}
                      transform={`rotate(${deg})`}
                    />
                  );
                })}

                {/* Center disc with depth */}
                <circle r="19" fill="#2a1508" opacity="0.3" cx="0.5" cy="0.5" />
                <circle r="18" fill={`url(#${pfx('sfCenter')})`} />
                {/* Ring texture on center */}
                <circle r="16" fill="none" stroke="#5d3a1a" strokeWidth="0.4" opacity="0.3" />
                <circle r="12" fill="none" stroke="#4a2a12" strokeWidth="0.3" opacity="0.2" />
                <circle r="8" fill="none" stroke="#5d3a1a" strokeWidth="0.3" opacity="0.15" />
                {/* Center highlight */}
                <ellipse cx="-4" cy="-4" rx="5" ry="4" fill="#6b4422" opacity="0.25" />
              </g>
            )}

            {/* Stage 6: Fibonacci seeds */}
            {stage >= 6 && (
              <g transform="translate(100, 120)">
                {Array.from({ length: 100 }, (_, i) => {
                  const angle = (137.508 * i * Math.PI) / 180;
                  const r = 1.1 * Math.sqrt(i);
                  const x = r * Math.cos(angle);
                  const y = r * Math.sin(angle);
                  if (Math.sqrt(x * x + y * y) > 16.5) return null;
                  const shade = i % 7;
                  return (
                    <circle
                      key={`seed-${i}`}
                      cx={x}
                      cy={y}
                      r={0.7 + (i % 4) * 0.1}
                      fill={shade < 2 ? "#6b4422" : shade < 4 ? "#4a2a12" : "#3e2210"}
                      opacity={0.6 + (i % 3) * 0.12}
                    />
                  );
                })}
              </g>
            )}

            {/* Stage 7: Harvest glow + floating seeds */}
            {stage >= 7 && (
              <g>
                <circle cx="100" cy="140" r="70" fill={`url(#${pfx('harvestGlow')})`} className="animate-pulse" />
                {[
                  { x: 140, y: 75, delay: '0s' },
                  { x: 60, y: 65, delay: '1.2s' },
                  { x: 155, y: 100, delay: '2.5s' },
                  { x: 48, y: 90, delay: '3.8s' },
                  { x: 130, y: 60, delay: '1.8s' },
                ].map((s, i) => (
                  <g key={`float-${i}`} className="animate-float-away" style={{ animationDelay: s.delay }}>
                    <ellipse cx={s.x} cy={s.y} rx="1.8" ry="3" fill="#a08050" opacity="0.6" transform={`rotate(${25 * i} ${s.x} ${s.y})`} />
                    <ellipse cx={s.x} cy={s.y} rx="1" ry="1.5" fill="#c4b080" opacity="0.3" transform={`rotate(${25 * i} ${s.x} ${s.y})`} />
                  </g>
                ))}
              </g>
            )}
          </g>
        )}

        {/* ════════════ OAK ════════════ */}
        {isOak && (
          <g>
            {/* Stage 1: Acorn with detailed cap */}
            {stage >= 1 && (
              <g transform="translate(100, 256)" filter={`url(#${pfx('softShadow')})`}>
                {/* Ground shadow */}
                <ellipse cx="0.5" cy="10" rx="6" ry="2.5" fill="#3a2518" opacity="0.2" />
                {/* Cap stem nub */}
                <path d="M -0.6 -12 C -0.6 -14 0.6 -14 0.6 -12 L 0.6 -9.5 L -0.6 -9.5 Z" fill="#5a4025" />
                <path d="M -0.3 -13.5 C -0.3 -14.5 0.3 -14.5 0.3 -13.5 L 0.3 -12 L -0.3 -12 Z" fill="#7a5a35" opacity="0.5" />
                {/* Cap */}
                <path d="M -7 -2 C -7.5 -5.5 -5 -8 -2.5 -9.5 C 0 -10.5 2.5 -9.5 5 -8 C 7 -5.5 7.5 -2 7 -2 Z" fill={`url(#${pfx('acornCapGrad')})`} />
                <path d="M -7 -2 C -7.5 -5.5 -5 -8 -2.5 -9.5 C 0 -10.5 2.5 -9.5 5 -8 C 7 -5.5 7.5 -2 7 -2 Z" fill="none" stroke="#6b5030" strokeWidth="0.4" />
                {/* Cap crosshatch texture */}
                <path d="M -5 -5 Q -3 -4 0 -5.5 Q 3 -4 5.5 -5" stroke="#8a6a40" strokeWidth="0.35" fill="none" opacity="0.5" />
                <path d="M -6 -3.5 Q -3 -2.5 0 -3.8 Q 3 -2.5 6 -3.5" stroke="#8a6a40" strokeWidth="0.3" fill="none" opacity="0.4" />
                <path d="M -4.5 -7 Q -2 -6 0 -7.5 Q 2 -6 4.5 -7" stroke="#8a6a40" strokeWidth="0.25" fill="none" opacity="0.35" />
                {/* Cap rim */}
                <path d="M -7 -2 Q 0 -0.5 7 -2" stroke="#6b5030" strokeWidth="0.6" fill="none" />
                {/* Acorn body */}
                <path d="M -6.5 -2 C -6.5 2 -5 6 -3 8 C -1 9.5 1 9.5 3 8 C 5 6 6.5 2 6.5 -2 Z" fill={`url(#${pfx('acornGrad')})`} />
                {/* Body highlight */}
                <path d="M -3 -1 C -4 2 -3.5 5 -2 7 C -1 8 0 7 0.5 5 C 1 3 0 0 -1 -1 Z" fill="#c4a870" opacity="0.25" />
                {/* Body outline */}
                <path d="M -6.5 -2 C -6.5 2 -5 6 -3 8 C -1 9.5 1 9.5 3 8 C 5 6 6.5 2 6.5 -2" fill="none" stroke="#5a4025" strokeWidth="0.4" />
                {/* Tip */}
                <ellipse cx="0" cy="9" rx="1.2" ry="1" fill="#5a4025" />
                <ellipse cx="0" cy="9" rx="0.6" ry="0.5" fill="#7a6040" opacity="0.4" />
              </g>
            )}

            {/* Stage 2: Thick taproot + lateral roots */}
            {stage >= 2 && (
              <g opacity="0.65">
                {/* Main taproot */}
                <path d="M 100 266 C 100 274 99 284 98 295" stroke="#5a3e28" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                <path d="M 100 266 C 100 274 99 284 98 295" stroke="#7a5a3a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M 100.5 268 C 100.5 274 100 282 99 292" stroke="#9a7a5a" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.3" />
                {/* Primary laterals */}
                <path d="M 100 271 C 93 275 83 279 74 282" stroke="#6b4e30" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M 100 271 C 107 276 117 280 126 283" stroke="#6b4e30" strokeWidth="2" fill="none" strokeLinecap="round" />
                {/* Secondary laterals */}
                <path d="M 99 277 C 94 281 86 285 79 288" stroke="#7a5a3a" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                <path d="M 100 279 C 106 283 114 287 122 289" stroke="#7a5a3a" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                {/* Fine root tips */}
                <path d="M 78 281 C 74 283 70 284 66 284" stroke="#7a5a3a" strokeWidth="0.5" fill="none" strokeLinecap="round" />
                <path d="M 74 282 C 72 285 69 287 66 288" stroke="#7a5a3a" strokeWidth="0.4" fill="none" strokeLinecap="round" />
                <path d="M 124 282 C 128 284 132 285 136 284" stroke="#7a5a3a" strokeWidth="0.5" fill="none" strokeLinecap="round" />
                <path d="M 122 284 C 125 287 129 289 133 289" stroke="#7a5a3a" strokeWidth="0.4" fill="none" strokeLinecap="round" />
                <path d="M 80 287 C 76 289 73 290 70 290" stroke="#7a5a3a" strokeWidth="0.3" fill="none" strokeLinecap="round" />
                <path d="M 120 288 C 124 290 127 291 130 290" stroke="#7a5a3a" strokeWidth="0.3" fill="none" strokeLinecap="round" />
              </g>
            )}

            {/* Stage 3: Trunk */}
            {stage >= 3 && (() => {
              const trunkTop = stage >= 5 ? 138 : stage >= 4 ? 185 : 225;
              const tw = stage >= 5 ? 12 : stage >= 4 ? 8 : 5.5;
              return (
                <g>
                  {/* Trunk shadow */}
                  <path
                    d={`M 103 262 C 102 248 104 ${trunkTop + 32} 103 ${trunkTop + 2}`}
                    stroke="#1a0e05"
                    strokeWidth={tw * 0.55}
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.12"
                  />
                  {/* Main trunk */}
                  <path
                    d={`M 100 262 C 99 248 101 ${trunkTop + 30} 100 ${trunkTop}`}
                    stroke={`url(#${pfx('oakTrunk')})`}
                    strokeWidth={tw}
                    fill="none"
                    strokeLinecap="round"
                  />
                  {/* Trunk highlight */}
                  <path
                    d={`M 100 258 C 99 246 101 ${trunkTop + 32} 100 ${trunkTop + 3}`}
                    stroke={`url(#${pfx('oakTrunkHi')})`}
                    strokeWidth={tw * 0.45}
                    fill="none"
                    strokeLinecap="round"
                  />
                  {/* Bark fissure lines */}
                  {stage >= 3 && (
                    <g opacity="0.35">
                      <path d={`M ${100 - tw * 0.35} 260 C ${100 - tw * 0.35} 250 ${100 - tw * 0.3} 240 ${100 - tw * 0.35} ${trunkTop + 15}`} stroke="#2e1808" strokeWidth="0.6" fill="none" />
                      <path d={`M ${100 - tw * 0.15} 258 C ${100 - tw * 0.15} 248 ${100 - tw * 0.1} 238 ${100 - tw * 0.15} ${trunkTop + 12}`} stroke="#2e1808" strokeWidth="0.4" fill="none" />
                      <path d={`M ${100 + tw * 0.15} 259 C ${100 + tw * 0.15} 249 ${100 + tw * 0.2} 239 ${100 + tw * 0.15} ${trunkTop + 14}`} stroke="#2e1808" strokeWidth="0.5" fill="none" />
                      <path d={`M ${100 + tw * 0.35} 257 C ${100 + tw * 0.35} 247 ${100 + tw * 0.3} 237 ${100 + tw * 0.35} ${trunkTop + 16}`} stroke="#2e1808" strokeWidth="0.4" fill="none" />
                      {/* Light bark ridges next to fissures */}
                      <path d={`M ${100 - tw * 0.25} 260 C ${100 - tw * 0.25} 248 ${100 - tw * 0.2} 236 ${100 - tw * 0.25} ${trunkTop + 13}`} stroke="#8a6840" strokeWidth="0.3" fill="none" opacity="0.6" />
                      <path d={`M ${100 + tw * 0.25} 258 C ${100 + tw * 0.25} 246 ${100 + tw * 0.25} 234 ${100 + tw * 0.25} ${trunkTop + 15}`} stroke="#8a6840" strokeWidth="0.3" fill="none" opacity="0.5" />
                    </g>
                  )}
                  {/* Bark knots */}
                  {stage >= 4 && (
                    <>
                      <ellipse cx="101" cy="238" rx="2.5" ry="2" fill="#2e1808" opacity="0.3" />
                      <ellipse cx="101" cy="238" rx="1.5" ry="1" fill="#4a2c14" opacity="0.4" />
                      <ellipse cx="101" cy="238" rx="0.6" ry="0.4" fill="#6b4528" opacity="0.3" />
                      {stage >= 5 && (
                        <>
                          <ellipse cx="99" cy="210" rx="2" ry="1.5" fill="#2e1808" opacity="0.25" />
                          <ellipse cx="99" cy="210" rx="1.2" ry="0.7" fill="#4a2c14" opacity="0.35" />
                        </>
                      )}
                    </>
                  )}
                  {/* Branch forks */}
                  {stage >= 4 && (
                    <>
                      {/* Left main branch */}
                      <path
                        d={`M 100 ${trunkTop + 22} C 90 ${trunkTop + 12} 74 ${trunkTop - 2} 62 ${trunkTop - 12}`}
                        stroke={`url(#${pfx('oakBranchGrad')})`}
                        strokeWidth={tw * 0.5}
                        fill="none"
                        strokeLinecap="round"
                      />
                      <path
                        d={`M 100 ${trunkTop + 22} C 90 ${trunkTop + 12} 74 ${trunkTop - 2} 62 ${trunkTop - 12}`}
                        stroke={`url(#${pfx('oakTrunkHi')})`}
                        strokeWidth={tw * 0.2}
                        fill="none"
                        strokeLinecap="round"
                      />
                      {/* Right main branch */}
                      <path
                        d={`M 100 ${trunkTop + 16} C 110 ${trunkTop + 6} 126 ${trunkTop - 5} 138 ${trunkTop - 14}`}
                        stroke={`url(#${pfx('oakBranchGrad')})`}
                        strokeWidth={tw * 0.5}
                        fill="none"
                        strokeLinecap="round"
                      />
                      <path
                        d={`M 100 ${trunkTop + 16} C 110 ${trunkTop + 6} 126 ${trunkTop - 5} 138 ${trunkTop - 14}`}
                        stroke={`url(#${pfx('oakTrunkHi')})`}
                        strokeWidth={tw * 0.2}
                        fill="none"
                        strokeLinecap="round"
                      />
                      {/* Sub-branches */}
                      {stage >= 5 && (
                        <>
                          <path
                            d={`M 76 ${trunkTop - 4} C 70 ${trunkTop - 11} 60 ${trunkTop - 19} 52 ${trunkTop - 24}`}
                            stroke="#5c3a1e"
                            strokeWidth={tw * 0.25}
                            fill="none"
                            strokeLinecap="round"
                          />
                          <path
                            d={`M 68 ${trunkTop - 8} C 62 ${trunkTop - 16} 56 ${trunkTop - 22} 48 ${trunkTop - 28}`}
                            stroke="#5c3a1e"
                            strokeWidth={tw * 0.18}
                            fill="none"
                            strokeLinecap="round"
                          />
                          <path
                            d={`M 124 ${trunkTop - 7} C 130 ${trunkTop - 15} 140 ${trunkTop - 21} 148 ${trunkTop - 26}`}
                            stroke="#5c3a1e"
                            strokeWidth={tw * 0.25}
                            fill="none"
                            strokeLinecap="round"
                          />
                          <path
                            d={`M 132 ${trunkTop - 10} C 138 ${trunkTop - 18} 144 ${trunkTop - 24} 152 ${trunkTop - 30}`}
                            stroke="#5c3a1e"
                            strokeWidth={tw * 0.18}
                            fill="none"
                            strokeLinecap="round"
                          />
                          {/* Center upward branch */}
                          <path
                            d={`M 100 ${trunkTop + 5} C 100 ${trunkTop - 5} 100 ${trunkTop - 18} 100 ${trunkTop - 28}`}
                            stroke="#5c3a1e"
                            strokeWidth={tw * 0.22}
                            fill="none"
                            strokeLinecap="round"
                          />
                          {/* Twig tips */}
                          <path d={`M 55 ${trunkTop - 22} C 50 ${trunkTop - 26} 46 ${trunkTop - 30} 42 ${trunkTop - 32}`} stroke="#6b4528" strokeWidth="1" fill="none" strokeLinecap="round" />
                          <path d={`M 145 ${trunkTop - 24} C 150 ${trunkTop - 28} 154 ${trunkTop - 32} 158 ${trunkTop - 34}`} stroke="#6b4528" strokeWidth="1" fill="none" strokeLinecap="round" />
                        </>
                      )}
                    </>
                  )}
                </g>
              );
            })()}

            {/* Stage 4: Leaf clusters with detailed oak leaves */}
            {stage >= 4 && stage < 5 && (
              <g>
                {/* ── Left branch leaves ── */}
                {[
                  { x: 62, y: 170, rot: -25, s: 1 },
                  { x: 55, y: 176, rot: -40, s: 0.85 },
                  { x: 70, y: 164, rot: -10, s: 0.9 },
                ].map((lf, i) => (
                  <g key={`oll-${i}`} transform={`translate(${lf.x}, ${lf.y}) rotate(${lf.rot}) scale(${lf.s})`} filter={`url(#${pfx('softShadow')})`}>
                    {/* Lobed oak leaf — 3 layers */}
                    <path
                      d="M 0 0 C -1 -2 -4 -4 -6 -6 C -8 -5 -9 -3 -10 -5 C -11 -7 -9 -10 -7 -11 C -6 -13 -7 -15 -5 -17 C -3 -18 -1 -16 0 -14 C 1 -16 3 -18 5 -17 C 7 -15 6 -13 7 -11 C 9 -10 11 -7 10 -5 C 9 -3 8 -5 6 -6 C 4 -4 1 -2 0 0"
                      fill={`url(#${pfx('oakLeafBase')})`}
                    />
                    <path
                      d="M 0 -0.5 C -1 -2.5 -3.5 -4.5 -5.5 -6.5 C -7.5 -5.5 -8.5 -3.5 -9.5 -5.5 C -10 -7 -8.5 -9.5 -6.5 -10.5 C -5.5 -12.5 -6.5 -14.5 -4.5 -16.5 C -2.5 -17 -1 -15.5 0 -13.5 C 1 -15.5 2.5 -17 4.5 -16.5 C 6.5 -14.5 5.5 -12.5 6.5 -10.5 C 8.5 -9.5 10 -7 9.5 -5.5 C 8.5 -3.5 7.5 -5.5 5.5 -6.5 C 3.5 -4.5 1 -2.5 0 -0.5"
                      fill={`url(#${pfx('oakLeafMid')})`}
                      opacity="0.8"
                    />
                    <path
                      d="M 0 -1.5 C -0.5 -3 -2.5 -5 -4 -6.5 C -5.5 -6 -6.5 -5 -7 -6 C -7.5 -7.5 -6 -9 -5 -10 C -4 -11.5 -5 -13 -3.5 -15 C -2 -15.5 -0.5 -14 0 -13 C 0.5 -14 2 -15.5 3.5 -15 C 5 -13 4 -11.5 5 -10 C 6 -9 7.5 -7.5 7 -6 C 6.5 -5 5.5 -6 4 -6.5 C 2.5 -5 0.5 -3 0 -1.5"
                      fill={`url(#${pfx('oakLeafHi')})`}
                      opacity="0.35"
                    />
                    {/* Midrib */}
                    <path d="M 0 0 L 0 -16" stroke="#1e4a14" strokeWidth="0.6" fill="none" />
                    <path d="M 0 0 L 0 -16" stroke="#4a8c3f" strokeWidth="0.25" fill="none" opacity="0.3" />
                    {/* Side veins */}
                    <path d="M 0 -4 C -3 -5 -6 -5 -8 -5" stroke="#2d5518" strokeWidth="0.3" fill="none" opacity="0.4" />
                    <path d="M 0 -4 C 3 -5 6 -5 8 -5" stroke="#2d5518" strokeWidth="0.3" fill="none" opacity="0.4" />
                    <path d="M 0 -8 C -3 -9 -5 -10 -7 -10" stroke="#2d5518" strokeWidth="0.25" fill="none" opacity="0.35" />
                    <path d="M 0 -8 C 3 -9 5 -10 7 -10" stroke="#2d5518" strokeWidth="0.25" fill="none" opacity="0.35" />
                    <path d="M 0 -12 C -2 -14 -4 -15 -5 -16" stroke="#2d5518" strokeWidth="0.2" fill="none" opacity="0.3" />
                    <path d="M 0 -12 C 2 -14 4 -15 5 -16" stroke="#2d5518" strokeWidth="0.2" fill="none" opacity="0.3" />
                  </g>
                ))}

                {/* ── Right branch leaves ── */}
                {[
                  { x: 138, y: 168, rot: 20, s: 1 },
                  { x: 145, y: 174, rot: 35, s: 0.85 },
                  { x: 130, y: 162, rot: 5, s: 0.9 },
                ].map((lf, i) => (
                  <g key={`olr-${i}`} transform={`translate(${lf.x}, ${lf.y}) rotate(${lf.rot}) scale(${lf.s})`} filter={`url(#${pfx('softShadow')})`}>
                    <path
                      d="M 0 0 C -1 -2 -4 -4 -6 -6 C -8 -5 -9 -3 -10 -5 C -11 -7 -9 -10 -7 -11 C -6 -13 -7 -15 -5 -17 C -3 -18 -1 -16 0 -14 C 1 -16 3 -18 5 -17 C 7 -15 6 -13 7 -11 C 9 -10 11 -7 10 -5 C 9 -3 8 -5 6 -6 C 4 -4 1 -2 0 0"
                      fill={`url(#${pfx('oakLeafBase')})`}
                    />
                    <path
                      d="M 0 -0.5 C -1 -2.5 -3.5 -4.5 -5.5 -6.5 C -7.5 -5.5 -8.5 -3.5 -9.5 -5.5 C -10 -7 -8.5 -9.5 -6.5 -10.5 C -5.5 -12.5 -6.5 -14.5 -4.5 -16.5 C -2.5 -17 -1 -15.5 0 -13.5 C 1 -15.5 2.5 -17 4.5 -16.5 C 6.5 -14.5 5.5 -12.5 6.5 -10.5 C 8.5 -9.5 10 -7 9.5 -5.5 C 8.5 -3.5 7.5 -5.5 5.5 -6.5 C 3.5 -4.5 1 -2.5 0 -0.5"
                      fill={`url(#${pfx('oakLeafMid')})`}
                      opacity="0.8"
                    />
                    <path d="M 0 0 L 0 -16" stroke="#1e4a14" strokeWidth="0.6" fill="none" />
                    <path d="M 0 -4 C -3 -5 -6 -5 -8 -5" stroke="#2d5518" strokeWidth="0.3" fill="none" opacity="0.4" />
                    <path d="M 0 -4 C 3 -5 6 -5 8 -5" stroke="#2d5518" strokeWidth="0.3" fill="none" opacity="0.4" />
                    <path d="M 0 -8 C -3 -9 -5 -10 -7 -10" stroke="#2d5518" strokeWidth="0.25" fill="none" opacity="0.35" />
                    <path d="M 0 -8 C 3 -9 5 -10 7 -10" stroke="#2d5518" strokeWidth="0.25" fill="none" opacity="0.35" />
                  </g>
                ))}

                {/* Center leaves */}
                <g transform="translate(100, 178) scale(0.8)" filter={`url(#${pfx('softShadow')})`}>
                  <path
                    d="M 0 0 C -1 -2 -4 -4 -6 -6 C -8 -5 -9 -3 -10 -5 C -11 -7 -9 -10 -7 -11 C -6 -13 -7 -15 -5 -17 C -3 -18 -1 -16 0 -14 C 1 -16 3 -18 5 -17 C 7 -15 6 -13 7 -11 C 9 -10 11 -7 10 -5 C 9 -3 8 -5 6 -6 C 4 -4 1 -2 0 0"
                    fill={`url(#${pfx('oakLeafMid')})`}
                  />
                  <path d="M 0 0 L 0 -16" stroke="#1e4a14" strokeWidth="0.5" fill="none" />
                </g>
              </g>
            )}

            {/* Stage 5: Full canopy */}
            {stage >= 5 && (
              <g>
                {/* Shadow under canopy on trunk */}
                <ellipse cx="100" cy="158" rx="50" ry="10" fill="#1a0e05" opacity="0.08" />

                {/* Deep canopy layers (back to front for depth) */}
                <ellipse cx="100" cy="115" rx="52" ry="36" fill={`url(#${pfx('oakCanopy2')})`} opacity="0.9" />
                <ellipse cx="64" cy="130" rx="36" ry="28" fill={`url(#${pfx('oakCanopy1')})`} opacity="0.85" />
                <ellipse cx="136" cy="128" rx="38" ry="29" fill={`url(#${pfx('oakCanopy3')})`} opacity="0.85" />
                <ellipse cx="80" cy="104" rx="30" ry="24" fill={`url(#${pfx('oakCanopy1')})`} opacity="0.8" />
                <ellipse cx="122" cy="102" rx="32" ry="25" fill={`url(#${pfx('oakCanopy3')})`} opacity="0.8" />
                <ellipse cx="100" cy="93" rx="26" ry="20" fill={`url(#${pfx('oakCanopy2')})`} opacity="0.75" />
                {/* Top crown */}
                <ellipse cx="100" cy="84" rx="18" ry="12" fill={`url(#${pfx('oakCanopy3')})`} opacity="0.65" />

                {/* Detailed lobed oak leaves around edges */}
                {[
                  { x: 48, y: 122, r: -35, s: 0.65 },
                  { x: 38, y: 132, r: -15, s: 0.55 },
                  { x: 52, y: 142, r: -45, s: 0.6 },
                  { x: 42, y: 118, r: -50, s: 0.5 },
                  { x: 152, y: 120, r: 25, s: 0.65 },
                  { x: 162, y: 130, r: 40, s: 0.55 },
                  { x: 154, y: 140, r: 15, s: 0.6 },
                  { x: 160, y: 116, r: 50, s: 0.5 },
                  { x: 78, y: 82, r: -22, s: 0.5 },
                  { x: 122, y: 80, r: 18, s: 0.5 },
                  { x: 100, y: 74, r: 0, s: 0.45 },
                  { x: 90, y: 78, r: -10, s: 0.4 },
                  { x: 112, y: 76, r: 12, s: 0.42 },
                  { x: 62, y: 105, r: -28, s: 0.5 },
                  { x: 142, y: 103, r: 32, s: 0.5 },
                ].map((lf, i) => (
                  <g key={`clf-${i}`} transform={`translate(${lf.x}, ${lf.y}) rotate(${lf.r}) scale(${lf.s})`}>
                    {/* 3-layer lobed oak leaf */}
                    <path
                      d="M 0 0 C -1 -2 -4 -4 -6 -6 C -8 -5 -9 -3 -10 -5 C -11 -7 -9 -10 -7 -11 C -6 -13 -7 -15 -5 -17 C -3 -18 -1 -16 0 -14 C 1 -16 3 -18 5 -17 C 7 -15 6 -13 7 -11 C 9 -10 11 -7 10 -5 C 9 -3 8 -5 6 -6 C 4 -4 1 -2 0 0"
                      fill={`url(#${pfx('oakLeafBase')})`}
                      opacity="0.85"
                    />
                    <path
                      d="M 0 -0.5 C -1 -2.5 -3.5 -4.5 -5.5 -6.5 C -7.5 -5.5 -8.5 -3.5 -9.5 -5.5 C -10 -7 -8.5 -9.5 -6.5 -10.5 C -5.5 -12.5 -6.5 -14.5 -4.5 -16.5 C -2.5 -17 -1 -15.5 0 -13.5 C 1 -15.5 2.5 -17 4.5 -16.5 C 6.5 -14.5 5.5 -12.5 6.5 -10.5 C 8.5 -9.5 10 -7 9.5 -5.5 C 8.5 -3.5 7.5 -5.5 5.5 -6.5 C 3.5 -4.5 1 -2.5 0 -0.5"
                      fill={`url(#${pfx('oakLeafMid')})`}
                      opacity="0.7"
                    />
                    {/* Midrib + veins */}
                    <path d="M 0 0 L 0 -16" stroke="#1e4a14" strokeWidth="0.5" fill="none" opacity="0.5" />
                    <path d="M 0 -5 C -3 -6 -6 -5.5 -8 -5" stroke="#2d5518" strokeWidth="0.2" fill="none" opacity="0.35" />
                    <path d="M 0 -5 C 3 -6 6 -5.5 8 -5" stroke="#2d5518" strokeWidth="0.2" fill="none" opacity="0.35" />
                    <path d="M 0 -10 C -2 -11 -5 -10.5 -7 -10" stroke="#2d5518" strokeWidth="0.18" fill="none" opacity="0.3" />
                    <path d="M 0 -10 C 2 -11 5 -10.5 7 -10" stroke="#2d5518" strokeWidth="0.18" fill="none" opacity="0.3" />
                  </g>
                ))}

                {/* Light dapple highlights */}
                {[
                  { cx: 76, cy: 110, r: 4 },
                  { cx: 108, cy: 98, r: 3.5 },
                  { cx: 90, cy: 122, r: 3 },
                  { cx: 124, cy: 120, r: 3.5 },
                  { cx: 68, cy: 126, r: 2.5 },
                  { cx: 100, cy: 106, r: 3 },
                  { cx: 115, cy: 112, r: 2.5 },
                  { cx: 86, cy: 92, r: 2.5 },
                  { cx: 134, cy: 112, r: 2 },
                  { cx: 72, cy: 118, r: 2 },
                ].map((d, i) => (
                  <circle key={`lh-${i}`} cx={d.cx} cy={d.cy} r={d.r} fill="#80c060" opacity="0.15" />
                ))}
                {/* Dark depth spots */}
                {[
                  { cx: 82, cy: 128, r: 5 },
                  { cx: 118, cy: 126, r: 4.5 },
                  { cx: 100, cy: 133, r: 4 },
                  { cx: 95, cy: 115, r: 3 },
                  { cx: 110, cy: 108, r: 2.5 },
                ].map((d, i) => (
                  <circle key={`ds-${i}`} cx={d.cx} cy={d.cy} r={d.r} fill="#1a4a14" opacity="0.12" />
                ))}
              </g>
            )}

            {/* Stage 6: Detailed acorns dangling */}
            {stage >= 6 && (
              <g>
                {[
                  { x: 65, y: 148, rot: -10, s: 1 },
                  { x: 80, y: 154, rot: 6, s: 0.9 },
                  { x: 128, y: 149, rot: -5, s: 1 },
                  { x: 114, y: 156, rot: 12, s: 0.85 },
                  { x: 95, y: 151, rot: -3, s: 0.95 },
                ].map((a, i) => (
                  <g key={`acorn-${i}`} transform={`translate(${a.x}, ${a.y}) rotate(${a.rot}) scale(${a.s})`} filter={`url(#${pfx('softShadow')})`}>
                    {/* Stem */}
                    <path d="M 0 -7 C 0 -9 0.2 -11 0 -12" stroke="#5a3e28" strokeWidth="0.7" fill="none" strokeLinecap="round" />
                    <path d="M 0.3 -7 C 0.3 -9 0.4 -11 0.3 -12" stroke="#8a6840" strokeWidth="0.25" fill="none" strokeLinecap="round" opacity="0.4" />
                    {/* Cap */}
                    <path d="M -4 -7 C -4.5 -9 -2.5 -11 0 -11.5 C 2.5 -11 4.5 -9 4 -7 Z" fill={`url(#${pfx('acornCapGrad')})`} />
                    <path d="M -4 -7 C -4.5 -9 -2.5 -11 0 -11.5 C 2.5 -11 4.5 -9 4 -7 Z" fill="none" stroke="#6b5030" strokeWidth="0.3" />
                    {/* Cap texture */}
                    <path d="M -3 -8.5 Q 0 -8 3 -8.5" stroke="#8a6a40" strokeWidth="0.2" fill="none" opacity="0.5" />
                    <path d="M -3.5 -9.5 Q 0 -9 3.5 -9.5" stroke="#8a6a40" strokeWidth="0.18" fill="none" opacity="0.4" />
                    {/* Acorn body */}
                    <path d="M -3.8 -7 C -3.8 -5 -3 -1.5 -1.5 0 C 0 1 1.5 0 1.5 0 C 3 -1.5 3.8 -5 3.8 -7 Z" fill={`url(#${pfx('acornGrad')})`} />
                    {/* Body highlight */}
                    <path d="M -1.5 -6 C -2 -4 -1.5 -2 -0.5 -1 C 0 -0.5 0.5 -1.5 0.5 -3 C 0.5 -4.5 0 -6 -0.5 -6.5 Z" fill="#c4a870" opacity="0.2" />
                    {/* Tip */}
                    <ellipse cx="0" cy="0.5" rx="0.8" ry="0.6" fill="#5a4025" />
                  </g>
                ))}
              </g>
            )}

            {/* Stage 7: Golden aura + drifting detailed leaves */}
            {stage >= 7 && (
              <g>
                <circle cx="100" cy="120" r="80" fill={`url(#${pfx('harvestGlow')})`} className="animate-pulse" />
                {[
                  { x: 42, y: 90, rot: 35, delay: '0s' },
                  { x: 155, y: 82, rot: -25, delay: '1.5s' },
                  { x: 50, y: 70, rot: 50, delay: '3s' },
                  { x: 145, y: 95, rot: -40, delay: '2s' },
                  { x: 60, y: 105, rot: 20, delay: '0.8s' },
                ].map((l, i) => (
                  <g key={`drift-${i}`} className="animate-float-away" style={{ animationDelay: l.delay }}>
                    <g transform={`translate(${l.x}, ${l.y}) rotate(${l.rot}) scale(0.45)`}>
                      {/* Autumn-colored lobed leaf */}
                      <path
                        d="M 0 0 C -1 -2 -4 -4 -6 -6 C -8 -5 -9 -3 -10 -5 C -11 -7 -9 -10 -7 -11 C -6 -13 -7 -15 -5 -17 C -3 -18 -1 -16 0 -14 C 1 -16 3 -18 5 -17 C 7 -15 6 -13 7 -11 C 9 -10 11 -7 10 -5 C 9 -3 8 -5 6 -6 C 4 -4 1 -2 0 0"
                        fill={i % 2 === 0 ? "#c4883a" : "#a06830"}
                        opacity="0.65"
                      />
                      <path d="M 0 0 L 0 -16" stroke="#8a5a28" strokeWidth="0.4" fill="none" opacity="0.5" />
                    </g>
                  </g>
                ))}
              </g>
            )}
          </g>
        )}

        {/* ════════════ CACTUS ════════════ */}
        {isCactus && (
          <g>
            {/* Stage 1: Detailed seed */}
            {stage >= 1 && (
              <g transform="translate(100, 260)" filter={`url(#${pfx('softShadow')})`}>
                {/* Ground shadow */}
                <ellipse cx="0.5" cy="5" rx="5" ry="2" fill="#8a7040" opacity="0.2" />
                {/* Seed body */}
                <ellipse cx="0" cy="0" rx="4.5" ry="5" fill={`url(#${pfx('cacSeedGrad')})`} />
                {/* Seed outline */}
                <ellipse cx="0" cy="0" rx="4.5" ry="5" fill="none" stroke="#5a4428" strokeWidth="0.5" />
                {/* Seed highlight */}
                <ellipse cx="-1.5" cy="-1.5" rx="2" ry="2.5" fill="#c4a870" opacity="0.25" />
                {/* Seed texture lines */}
                <path d="M -2 -3 Q 0 -4 2 -3" stroke="#5a4428" strokeWidth="0.35" fill="none" opacity="0.4" />
                <path d="M -2.5 -1 Q 0 -2 2.5 -1" stroke="#5a4428" strokeWidth="0.3" fill="none" opacity="0.35" />
                <path d="M -2 1 Q 0 0 2 1" stroke="#5a4428" strokeWidth="0.25" fill="none" opacity="0.3" />
                {/* Seed dimple */}
                <ellipse cx="0.5" cy="1.5" rx="0.8" ry="0.6" fill="#5a4428" opacity="0.25" />
                {/* Tiny hilum (seed scar) at top */}
                <ellipse cx="0" cy="-4.5" rx="1" ry="0.5" fill="#6b5535" opacity="0.4" />
              </g>
            )}

            {/* Stage 2: Shallow wide roots */}
            {stage >= 2 && (
              <g opacity="0.55">
                {/* Primary shallow laterals — cactus roots spread wide, stay near surface */}
                <path d="M 100 267 C 90 269 76 272 60 273" stroke="#6b5535" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                <path d="M 100 267 C 90 269 76 272 60 273" stroke="#8a7050" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.4" />
                <path d="M 100 267 C 110 269 124 272 140 273" stroke="#6b5535" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                <path d="M 100 267 C 110 269 124 272 140 273" stroke="#8a7050" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.4" />
                {/* Secondary roots */}
                <path d="M 100 269 C 88 272 74 275 62 277" stroke="#7a6a4a" strokeWidth="1" fill="none" strokeLinecap="round" />
                <path d="M 100 269 C 112 272 126 275 138 277" stroke="#7a6a4a" strokeWidth="1" fill="none" strokeLinecap="round" />
                {/* Fine root tips */}
                <path d="M 64 273 C 58 274 52 274 46 273" stroke="#7a6a4a" strokeWidth="0.5" fill="none" strokeLinecap="round" />
                <path d="M 60 273 C 56 276 52 277 48 277" stroke="#7a6a4a" strokeWidth="0.35" fill="none" strokeLinecap="round" />
                <path d="M 136 272 C 142 273 148 273 154 272" stroke="#7a6a4a" strokeWidth="0.5" fill="none" strokeLinecap="round" />
                <path d="M 140 273 C 144 276 148 277 152 277" stroke="#7a6a4a" strokeWidth="0.35" fill="none" strokeLinecap="round" />
                {/* Short downward root */}
                <path d="M 100 268 C 100 274 99 280 98 286" stroke="#6b5535" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                <path d="M 99 282 C 97 286 95 289 93 290" stroke="#7a6a4a" strokeWidth="0.4" fill="none" strokeLinecap="round" />
                <path d="M 99 284 C 101 287 103 289 105 290" stroke="#7a6a4a" strokeWidth="0.4" fill="none" strokeLinecap="round" />
              </g>
            )}

            {/* Stage 3: Ribbed columnar body */}
            {stage >= 3 && (() => {
              const bodyTop = stage >= 4 ? 165 : 195;
              const bodyBot = 270;
              const bodyH = bodyBot - bodyTop;
              return (
                <g>
                  {/* Body shadow */}
                  <path
                    d={`M 87 ${bodyBot + 2} C 85 ${bodyBot - bodyH * 0.3} 86 ${bodyTop + 12} 90 ${bodyTop + 2} Q 102 ${bodyTop - 8} 114 ${bodyTop + 2} C 118 ${bodyTop + 12} 119 ${bodyBot - bodyH * 0.3} 117 ${bodyBot + 2} Z`}
                    fill="#0a2a15"
                    opacity="0.12"
                    transform="translate(2, 2.5)"
                  />
                  {/* Main body */}
                  <path
                    d={`M 85 ${bodyBot} C 83 ${bodyBot - bodyH * 0.3} 84 ${bodyTop + 10} 88 ${bodyTop} Q 100 ${bodyTop - 9} 112 ${bodyTop} C 116 ${bodyTop + 10} 117 ${bodyBot - bodyH * 0.3} 115 ${bodyBot} Z`}
                    fill={`url(#${pfx('cacBody')})`}
                  />
                  {/* Vertical gradient overlay for depth */}
                  <path
                    d={`M 85 ${bodyBot} C 83 ${bodyBot - bodyH * 0.3} 84 ${bodyTop + 10} 88 ${bodyTop} Q 100 ${bodyTop - 9} 112 ${bodyTop} C 116 ${bodyTop + 10} 117 ${bodyBot - bodyH * 0.3} 115 ${bodyBot} Z`}
                    fill={`url(#${pfx('cacBodyVert')})`}
                  />
                  {/* Center highlight overlay */}
                  <path
                    d={`M 93 ${bodyBot - 2} C 92 ${bodyBot - bodyH * 0.25} 93 ${bodyTop + 14} 96 ${bodyTop + 3} Q 100 ${bodyTop - 5} 104 ${bodyTop + 3} C 107 ${bodyTop + 14} 108 ${bodyBot - bodyH * 0.25} 107 ${bodyBot - 2} Z`}
                    fill={`url(#${pfx('cacBodyHi')})`}
                  />
                  {/* Edge highlights — left and right for roundness */}
                  <path
                    d={`M 87 ${bodyBot - 2} C 86 ${bodyBot - bodyH * 0.2} 86 ${bodyTop + 16} 89 ${bodyTop + 4}`}
                    stroke="#4aa55c"
                    strokeWidth="1.2"
                    fill="none"
                    opacity="0.08"
                    strokeLinecap="round"
                  />
                  <path
                    d={`M 113 ${bodyBot - 2} C 114 ${bodyBot - bodyH * 0.2} 114 ${bodyTop + 16} 111 ${bodyTop + 4}`}
                    stroke="#4aa55c"
                    strokeWidth="1"
                    fill="none"
                    opacity="0.06"
                    strokeLinecap="round"
                  />
                  {/* Rib groove lines (paired: dark groove + light ridge for 3D) */}
                  {[-13, -8, -3, 3, 8, 12].map((offset, i) => (
                    <g key={`rib-${i}`}>
                      <path
                        d={`M ${100 + offset - 0.6} ${bodyBot - 2} C ${100 + offset - 0.8} ${bodyBot - bodyH * 0.5} ${100 + offset - 0.6} ${bodyTop + 16} ${100 + offset - 0.6} ${bodyTop + 4}`}
                        stroke="#14442a"
                        strokeWidth="0.7"
                        fill="none"
                        opacity="0.3"
                      />
                      <path
                        d={`M ${100 + offset + 0.6} ${bodyBot - 2} C ${100 + offset + 0.4} ${bodyBot - bodyH * 0.5} ${100 + offset + 0.6} ${bodyTop + 16} ${100 + offset + 0.6} ${bodyTop + 4}`}
                        stroke="#5ac068"
                        strokeWidth="0.45"
                        fill="none"
                        opacity="0.18"
                      />
                    </g>
                  ))}
                  {/* Areoles with spine clusters */}
                  {[
                    { x: 86, y: 248, dir: -1 }, { x: 114, y: 250, dir: 1 },
                    { x: 87, y: 230, dir: -1 }, { x: 113, y: 234, dir: 1 },
                    { x: 88, y: 212, dir: -1 }, { x: 112, y: 216, dir: 1 },
                    { x: 90, y: 194, dir: -1 }, { x: 110, y: 198, dir: 1 },
                    { x: 92, y: 178, dir: -1 }, { x: 108, y: 182, dir: 1 },
                  ].filter(s => s.y > bodyTop + 8).map((s, i) => (
                    <g key={`spine-${i}`}>
                      {/* Areole pad — woolly white/tan dot */}
                      <ellipse cx={s.x} cy={s.y} rx="1.5" ry="1.2" fill="#d4c890" opacity="0.45" />
                      <ellipse cx={s.x} cy={s.y} rx="0.8" ry="0.6" fill="#e8dca8" opacity="0.3" />
                      {/* Spine cluster (4-5 spines radiating outward) */}
                      <line x1={s.x} y1={s.y} x2={s.x + s.dir * 5} y2={s.y - 3.5} stroke="#d4c88a" strokeWidth="0.35" opacity="0.6" />
                      <line x1={s.x} y1={s.y} x2={s.x + s.dir * 4.5} y2={s.y + 1.5} stroke="#d4c88a" strokeWidth="0.3" opacity="0.55" />
                      <line x1={s.x} y1={s.y} x2={s.x + s.dir * 2.5} y2={s.y - 5} stroke="#d4c88a" strokeWidth="0.28" opacity="0.5" />
                      <line x1={s.x} y1={s.y} x2={s.x + s.dir * 1.5} y2={s.y + 3} stroke="#d4c88a" strokeWidth="0.22" opacity="0.45" />
                      <line x1={s.x} y1={s.y} x2={s.x + s.dir * 5.5} y2={s.y - 0.5} stroke="#e0d8a0" strokeWidth="0.2" opacity="0.4" />
                    </g>
                  ))}
                </g>
              );
            })()}

            {/* Stage 4: Side arms */}
            {stage >= 4 && (
              <g>
                {/* ── Left arm ── */}
                {/* Shadow */}
                <path
                  d="M 89 222 C 73 220 62 211 60 198 Q 60 185 66 181 Q 73 177 77 181 C 82 188 79 210 89 217"
                  fill="#0a2a15" opacity="0.1" transform="translate(1.5, 2.5)"
                />
                {/* Arm body */}
                <path
                  d="M 88 220 C 72 218 62 210 60 198 Q 60 186 66 182 Q 72 178 76 182 C 80 188 78 208 88 215"
                  fill={`url(#${pfx('cacArm')})`}
                />
                {/* Arm highlight */}
                <path
                  d="M 82 218 C 74 216 67 210 65 201 Q 65 193 69 189 Q 72 187 74 189 C 76 194 74 212 82 216"
                  fill={`url(#${pfx('cacArmHi')})`}
                />
                {/* Left arm rib grooves */}
                <path d="M 78 216 C 72 212 66 202 66 192" stroke="#14442a" strokeWidth="0.6" fill="none" opacity="0.25" />
                <path d="M 79 217 C 73 213 67 203 67 193" stroke="#5ac068" strokeWidth="0.35" fill="none" opacity="0.12" />
                <path d="M 74 214 C 68 210 63 200 64 190" stroke="#14442a" strokeWidth="0.5" fill="none" opacity="0.2" />
                <path d="M 75 215 C 69 211 64 201 65 191" stroke="#5ac068" strokeWidth="0.3" fill="none" opacity="0.1" />
                {/* Left arm areoles + spines */}
                {[
                  { x: 63, y: 198, dx: -4.5, dy: -2 },
                  { x: 68, y: 184, dx: -3.5, dy: -3 },
                  { x: 74, y: 210, dx: -4, dy: 0.5 },
                ].map((s, i) => (
                  <g key={`lsp-${i}`}>
                    <ellipse cx={s.x} cy={s.y} rx="1.3" ry="1" fill="#d4c890" opacity="0.4" />
                    <line x1={s.x} y1={s.y} x2={s.x + s.dx} y2={s.y + s.dy} stroke="#d4c88a" strokeWidth="0.35" opacity="0.55" />
                    <line x1={s.x} y1={s.y} x2={s.x + s.dx * 0.7} y2={s.y + s.dy + 2} stroke="#d4c88a" strokeWidth="0.25" opacity="0.45" />
                    <line x1={s.x} y1={s.y} x2={s.x + s.dx * 0.5} y2={s.y + s.dy - 2.5} stroke="#d4c88a" strokeWidth="0.22" opacity="0.4" />
                  </g>
                ))}

                {/* ── Right arm ── */}
                {/* Shadow */}
                <path
                  d="M 113 212 C 127 210 136 201 138 190 Q 138 179 133 175 Q 127 173 124 177 C 120 184 122 202 113 208"
                  fill="#0a2a15" opacity="0.1" transform="translate(1.5, 2.5)"
                />
                {/* Arm body */}
                <path
                  d="M 112 210 C 126 208 134 200 136 190 Q 136 180 132 176 Q 126 174 124 178 C 120 184 122 200 112 206"
                  fill={`url(#${pfx('cacArm')})`}
                />
                {/* Arm highlight */}
                <path
                  d="M 118 208 C 128 206 133 198 134 192 Q 134 185 131 181 Q 128 179 127 181 C 124 186 126 198 118 204"
                  fill={`url(#${pfx('cacArmHi')})`}
                />
                {/* Right arm rib grooves */}
                <path d="M 122 206 C 128 202 134 192 133 183" stroke="#14442a" strokeWidth="0.6" fill="none" opacity="0.25" />
                <path d="M 121 207 C 127 203 133 193 132 184" stroke="#5ac068" strokeWidth="0.35" fill="none" opacity="0.12" />
                <path d="M 126 204 C 132 200 136 192 135 185" stroke="#14442a" strokeWidth="0.5" fill="none" opacity="0.2" />
                <path d="M 125 205 C 131 201 135 193 134 186" stroke="#5ac068" strokeWidth="0.3" fill="none" opacity="0.1" />
                {/* Right arm areoles + spines */}
                {[
                  { x: 135, y: 188, dx: 4.5, dy: -2 },
                  { x: 130, y: 178, dx: 3.5, dy: -3 },
                  { x: 126, y: 202, dx: 4, dy: 0.5 },
                ].map((s, i) => (
                  <g key={`rsp-${i}`}>
                    <ellipse cx={s.x} cy={s.y} rx="1.3" ry="1" fill="#d4c890" opacity="0.4" />
                    <line x1={s.x} y1={s.y} x2={s.x + s.dx} y2={s.y + s.dy} stroke="#d4c88a" strokeWidth="0.35" opacity="0.55" />
                    <line x1={s.x} y1={s.y} x2={s.x + s.dx * 0.7} y2={s.y + s.dy + 2} stroke="#d4c88a" strokeWidth="0.25" opacity="0.45" />
                    <line x1={s.x} y1={s.y} x2={s.x + s.dx * 0.5} y2={s.y + s.dy - 2.5} stroke="#d4c88a" strokeWidth="0.22" opacity="0.4" />
                  </g>
                ))}
              </g>
            )}

            {/* Stage 5: Flowers */}
            {stage >= 5 && (
              <g>
                {/* ── Top flower (large) ── */}
                <g transform="translate(100, 157)" filter={`url(#${pfx('softShadow')})`}>
                  {/* Outer petals */}
                  {Array.from({ length: 12 }, (_, i) => {
                    const deg = (360 / 12) * i;
                    return (
                      <g key={`tf-${i}`} transform={`rotate(${deg})`}>
                        <path
                          d="M 0 -1 C -3.5 -6 -4.5 -13 -2.5 -18 C -0.5 -20 2 -20 2.5 -18 C 4.5 -13 3.5 -6 0 -1"
                          fill={`url(#${pfx('cacFlowerOuter')})`}
                        />
                        {/* Petal vein */}
                        <path d="M 0 -3 C 0 -8 0 -14 0 -17" stroke="#ffb8d4" strokeWidth="0.3" fill="none" opacity="0.3" />
                      </g>
                    );
                  })}
                  {/* Inner petals */}
                  {Array.from({ length: 10 }, (_, i) => {
                    const deg = (360 / 10) * i + 18;
                    return (
                      <g key={`tfi-${i}`} transform={`rotate(${deg})`}>
                        <path
                          d="M 0 -0.5 C -2.5 -4 -3 -9 -1 -12 C 0 -13.5 1.5 -13.5 1 -12 C 3 -9 2.5 -4 0 -0.5"
                          fill={`url(#${pfx('cacFlowerInner')})`}
                          opacity="0.75"
                        />
                      </g>
                    );
                  })}
                  {/* Stamen center */}
                  <circle r="4.5" fill={`url(#${pfx('cacFlowerCenter')})`} />
                  <circle r="3" fill="#ffee88" opacity="0.4" />
                  {/* Stamen filaments */}
                  {Array.from({ length: 8 }, (_, i) => {
                    const deg = (360 / 8) * i + 10;
                    const rad = (deg * Math.PI) / 180;
                    const tx = Math.cos(rad) * 3.2;
                    const ty = Math.sin(rad) * 3.2;
                    return (
                      <g key={`stm-${i}`}>
                        <line x1={tx * 0.3} y1={ty * 0.3} x2={tx} y2={ty} stroke="#f0a830" strokeWidth="0.3" opacity="0.5" />
                        <circle cx={tx} cy={ty} r="0.6" fill="#e89020" opacity="0.6" />
                      </g>
                    );
                  })}
                </g>

                {/* ── Left arm flower (medium) ── */}
                <g transform="translate(62, 178)" filter={`url(#${pfx('softShadow')})`}>
                  {Array.from({ length: 10 }, (_, i) => {
                    const deg = (360 / 10) * i;
                    return (
                      <g key={`lf-${i}`} transform={`rotate(${deg})`}>
                        <path
                          d="M 0 -0.5 C -2.8 -5 -3.5 -10 -1.5 -14 C 0 -15.5 1.5 -15.5 1.5 -14 C 3.5 -10 2.8 -5 0 -0.5"
                          fill={`url(#${pfx('cacFlowerOuter')})`}
                        />
                        <path d="M 0 -2 C 0 -6 0 -10 0 -13" stroke="#ffb8d4" strokeWidth="0.25" fill="none" opacity="0.25" />
                      </g>
                    );
                  })}
                  {Array.from({ length: 8 }, (_, i) => {
                    const deg = (360 / 8) * i + 22.5;
                    return (
                      <path
                        key={`lfi-${i}`}
                        d="M 0 -0.3 C -2 -3.5 -2.5 -7 -0.5 -9.5 C 0.5 -10.5 1.5 -10.5 1 -9.5 C 2.5 -7 2 -3.5 0 -0.3"
                        fill={`url(#${pfx('cacFlowerInner')})`}
                        transform={`rotate(${deg})`}
                        opacity="0.7"
                      />
                    );
                  })}
                  <circle r="3.5" fill={`url(#${pfx('cacFlowerCenter')})`} />
                  <circle r="2.2" fill="#ffee88" opacity="0.4" />
                  {Array.from({ length: 6 }, (_, i) => {
                    const deg = (360 / 6) * i;
                    const rad = (deg * Math.PI) / 180;
                    return (
                      <circle key={`lstm-${i}`} cx={Math.cos(rad) * 2.5} cy={Math.sin(rad) * 2.5} r="0.5" fill="#e89020" opacity="0.5" />
                    );
                  })}
                </g>

                {/* ── Right arm bud (small, partially open) ── */}
                <g transform="translate(134, 172)" filter={`url(#${pfx('softShadow')})`}>
                  {Array.from({ length: 6 }, (_, i) => {
                    const deg = (360 / 6) * i - 30;
                    return (
                      <path
                        key={`rb-${i}`}
                        d="M 0 0 C -1.8 -3 -2 -6.5 -0.8 -9 C 0 -10 1 -10 0.8 -9 C 2 -6.5 1.8 -3 0 0"
                        fill={`url(#${pfx('cacFlowerOuter')})`}
                        transform={`rotate(${deg})`}
                        opacity="0.8"
                      />
                    );
                  })}
                  <circle r="2.5" fill="#3d9050" />
                  <circle r="1.8" fill="#4aa55c" opacity="0.5" />
                </g>
              </g>
            )}

            {/* Stage 6: Prickly pear fruit */}
            {stage >= 6 && (
              <g>
                {/* ── Right arm fruit (large) ── */}
                <g transform="translate(134, 172)" filter={`url(#${pfx('softShadow')})`}>
                  {/* Fruit body */}
                  <ellipse cx="0" cy="0" rx="6" ry="8" fill={`url(#${pfx('cacFruit')})`} />
                  {/* Highlight */}
                  <ellipse cx="-2" cy="-2.5" rx="2.5" ry="3.5" fill={`url(#${pfx('cacFruitHi')})`} />
                  {/* Outline hint */}
                  <ellipse cx="0" cy="0" rx="6" ry="8" fill="none" stroke="#8a1838" strokeWidth="0.3" opacity="0.3" />
                  {/* Areoles with tiny spines */}
                  {[
                    [-3, -4], [2, -2], [-1.5, 1], [3, 2.5], [0.5, -5.5],
                    [-2.5, -1], [1, 4], [-0.5, 3], [2.5, -4], [-3, 3],
                  ].map(([dx, dy], i) => (
                    <g key={`fsp-${i}`}>
                      <ellipse cx={dx} cy={dy} rx="0.6" ry="0.5" fill="#d4c890" opacity="0.5" />
                      <line x1={dx} y1={dy} x2={dx + 1.5} y2={dy - 1} stroke="#d4c88a" strokeWidth="0.2" opacity="0.4" />
                      <line x1={dx} y1={dy} x2={dx - 0.8} y2={dy - 1.2} stroke="#d4c88a" strokeWidth="0.15" opacity="0.3" />
                    </g>
                  ))}
                  {/* Crown remnant at top */}
                  <ellipse cx="0" cy="-7.5" rx="2" ry="1" fill="#8a1838" opacity="0.3" />
                </g>

                {/* ── Top fruit (medium, angled) ── */}
                <g transform="translate(107, 155) rotate(-18)" filter={`url(#${pfx('softShadow')})`}>
                  <ellipse cx="0" cy="0" rx="5" ry="6.5" fill={`url(#${pfx('cacFruit')})`} />
                  <ellipse cx="-1.5" cy="-2" rx="2" ry="3" fill={`url(#${pfx('cacFruitHi')})`} />
                  <ellipse cx="0" cy="0" rx="5" ry="6.5" fill="none" stroke="#8a1838" strokeWidth="0.25" opacity="0.25" />
                  {[[-2, -3], [1.5, -1], [-0.5, 2], [2, 3], [0, -4.5], [-1.5, 0.5]].map(([dx, dy], i) => (
                    <g key={`fsp2-${i}`}>
                      <ellipse cx={dx} cy={dy} rx="0.5" ry="0.4" fill="#d4c890" opacity="0.45" />
                      <line x1={dx} y1={dy} x2={dx + 1.2} y2={dy - 0.8} stroke="#d4c88a" strokeWidth="0.18" opacity="0.35" />
                    </g>
                  ))}
                  <ellipse cx="0" cy="-6" rx="1.5" ry="0.8" fill="#8a1838" opacity="0.25" />
                </g>

                {/* ── Left arm small fruit ── */}
                <g transform="translate(60, 180) rotate(12)" filter={`url(#${pfx('softShadow')})`}>
                  <ellipse cx="0" cy="0" rx="4" ry="5.5" fill={`url(#${pfx('cacFruit')})`} />
                  <ellipse cx="-1" cy="-1.5" rx="1.5" ry="2.2" fill={`url(#${pfx('cacFruitHi')})`} />
                  {[[-1.5, -2.5], [1, -0.5], [0, 2], [-0.5, 0.5]].map(([dx, dy], i) => (
                    <ellipse key={`fsp3-${i}`} cx={dx} cy={dy} rx="0.4" ry="0.35" fill="#d4c890" opacity="0.4" />
                  ))}
                </g>
              </g>
            )}

            {/* Stage 7: Golden aura + shimmer particles */}
            {stage >= 7 && (
              <g>
                <circle cx="100" cy="195" r="75" fill={`url(#${pfx('harvestGlow')})`} className="animate-pulse" />
                {/* Shimmer particles around the cactus */}
                {[
                  { x: 65, y: 158, delay: '0s', r: 2.5 },
                  { x: 135, y: 170, delay: '1s', r: 2 },
                  { x: 85, y: 145, delay: '2s', r: 2.2 },
                  { x: 120, y: 150, delay: '3s', r: 1.8 },
                  { x: 72, y: 178, delay: '0.5s', r: 2 },
                  { x: 140, y: 155, delay: '1.5s', r: 1.5 },
                  { x: 55, y: 190, delay: '2.5s', r: 1.8 },
                  { x: 145, y: 192, delay: '3.5s', r: 1.5 },
                ].map((s, i) => (
                  <g key={`shimmer-${i}`}>
                    {/* Outer glow */}
                    <circle
                      cx={s.x} cy={s.y}
                      r={s.r}
                      fill="#ffd700"
                      opacity="0.4"
                      className="animate-pulse"
                      style={{ animationDelay: s.delay }}
                    />
                    {/* Inner bright core */}
                    <circle
                      cx={s.x} cy={s.y}
                      r={s.r * 0.45}
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
        )}
      </svg>
    </div>
  );
};

export default PlantVisual;
