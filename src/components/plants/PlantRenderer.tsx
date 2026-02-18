import { useId } from 'react';
import type { PlantVisualProps, PlantArchetype } from '../../types';

// ── Plant imports ──────────────────────────────────────────
// Visionary (Sky) — Beautiful Flowers
import { sunflowerGradients, renderSunflower } from './Sunflower';
import { dahliaGradients, renderDahlia } from './Dahlia';
import { orchidGradients, renderOrchid } from './Orchid';
import { cherryBlossomGradients, renderCherryBlossom } from './CherryBlossom';
import { lotusGradients, renderLotus } from './Lotus';
import { birdOfParadiseGradients, renderBirdOfParadise } from './BirdOfParadise';
// Builder (Sea) — Trees
import { oakGradients, renderOak } from './Oak';
import { appleGradients, renderApple } from './Apple';
import { mapleGradients, renderMaple } from './Maple';
import { pineGradients, renderPine } from './Pine';
import { redwoodGradients, renderRedwood } from './Redwood';
import { oliveGradients, renderOlive } from './Olive';
// Survivor (Land) — Medicine & Herbs
import { lavenderGradients, renderLavender } from './Lavender';
import { aloeGradients, renderAloe } from './Aloe';
import { chamomileGradients, renderChamomile } from './Chamomile';
import { sageGradients, renderSage } from './Sage';
import { echinaceaGradients, renderEchinacea } from './Echinacea';
import { ginsengGradients, renderGinseng } from './Ginseng';

// ── Plant registry ─────────────────────────────────────────

const plantRegistry: Record<PlantArchetype, {
  gradients: (pfx: (name: string) => string) => JSX.Element;
  render: (stage: number, pfx: (name: string) => string) => JSX.Element;
  isDesert?: boolean;
}> = {
  // Visionary (Sky) — Beautiful Flowers
  sunflower: { gradients: sunflowerGradients, render: renderSunflower },
  dahlia: { gradients: dahliaGradients, render: renderDahlia },
  orchid: { gradients: orchidGradients, render: renderOrchid },
  cherryBlossom: { gradients: cherryBlossomGradients, render: renderCherryBlossom },
  lotus: { gradients: lotusGradients, render: renderLotus },
  birdOfParadise: { gradients: birdOfParadiseGradients, render: renderBirdOfParadise },
  // Builder (Sea) — Trees
  oak: { gradients: oakGradients, render: renderOak },
  apple: { gradients: appleGradients, render: renderApple },
  maple: { gradients: mapleGradients, render: renderMaple },
  pine: { gradients: pineGradients, render: renderPine },
  redwood: { gradients: redwoodGradients, render: renderRedwood },
  olive: { gradients: oliveGradients, render: renderOlive },
  // Survivor (Land) — Medicine & Herbs
  lavender: { gradients: lavenderGradients, render: renderLavender },
  aloe: { gradients: aloeGradients, render: renderAloe },
  chamomile: { gradients: chamomileGradients, render: renderChamomile },
  sage: { gradients: sageGradients, render: renderSage },
  echinacea: { gradients: echinaceaGradients, render: renderEchinacea },
  ginseng: { gradients: ginsengGradients, render: renderGinseng },
};

// ── Component ──────────────────────────────────────────────

const PlantVisual = ({ stage, type, instanceId }: PlantVisualProps) => {
  const reactId = useId();
  const uid = instanceId || reactId;
  const pfx = (name: string) => `${name}-${uid}`;

  const plant = plantRegistry[type] || plantRegistry.sunflower;
  const isDesert = plant.isDesert || false;

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

          {/* ── Plant-specific gradients ── */}
          {plant.gradients(pfx)}

          {/* ── Shared harvest glow ── */}
          <radialGradient id={pfx('harvestGlow')} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffd700" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#ffd700" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#ffd700" stopOpacity="0" />
          </radialGradient>

          {/* ── Desert soil gradient (shared by all desert plants) ── */}
          {isDesert && (
            <linearGradient id={pfx('sandSoil')} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d4b880" />
              <stop offset="40%" stopColor="#c4a265" />
              <stop offset="100%" stopColor="#a08050" />
            </linearGradient>
          )}
        </defs>

        {/* ════════════ SOIL ════════════ */}
        <g>
          <path
            d={isDesert
              ? "M 8 272 Q 60 267 100 265 Q 140 267 192 272 L 196 290 L 4 290 Z"
              : "M 8 272 Q 60 264 100 262 Q 140 264 192 272 L 196 290 L 4 290 Z"
            }
            fill={isDesert ? `url(#${pfx('sandSoil')})` : "#5a3e28"}
          />
          <path
            d={isDesert
              ? "M 8 278 Q 60 275 100 274 Q 140 275 192 278 L 196 290 L 4 290 Z"
              : "M 8 278 Q 60 274 100 273 Q 140 274 192 278 L 196 290 L 4 290 Z"
            }
            fill={isDesert ? "#9a7a50" : "#4a3020"}
            opacity="0.5"
          />
          <path
            d={isDesert
              ? "M 12 272 Q 60 267 100 265 Q 140 267 188 272"
              : "M 12 272 Q 60 264 100 262 Q 140 264 188 272"
            }
            fill="none"
            stroke={isDesert ? "#b89060" : "#3a2518"}
            strokeWidth="1"
            opacity="0.7"
          />
          {!isDesert && (
            <g opacity="0.4">
              <circle cx="60" cy="275" r="1.5" fill="#6b4e30" />
              <circle cx="85" cy="278" r="1" fill="#7a5e3a" />
              <circle cx="130" cy="276" r="1.3" fill="#6b4e30" />
              <circle cx="110" cy="280" r="0.8" fill="#5a3e28" />
              <circle cx="45" cy="279" r="1.1" fill="#7a5e3a" />
              <circle cx="155" cy="278" r="0.9" fill="#6b4e30" />
            </g>
          )}
          {isDesert && (
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

        {/* ════════════ PLANT ════════════ */}
        {plant.render(stage, pfx)}
      </svg>
    </div>
  );
};

export default PlantVisual;
