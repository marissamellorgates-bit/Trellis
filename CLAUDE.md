# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev          # Start Vite dev server
npm run build        # Production build (vite build)
npm run preview      # Preview production build locally
npm run lint         # ESLint across the project
npm run typecheck    # TypeScript type checking (tsc --noEmit)
```

No test framework is configured yet. If adding tests, Vitest is the natural choice for a Vite project.

## Project Overview

Trellis is a holistic life operating system (Ontology Engine) built around **permaculture metaphors**. It maps a user's existence across three domains (Land, Sea, Sky) and facilitates growth using natural system metaphors. It is distinguished by procedural plant art, fractal growth logic, and ecosystem management linking individuals to family and community.

## Tech Stack

- **React 18** + **TypeScript** with **Vite** bundler
- **Tailwind CSS** for styling (utility-first, no custom theme extensions)
- **Lucide React** for icons
- **Supabase** JS client installed but not yet integrated

### Production Target Stack
- **Backend/DB:** Supabase (PostgreSQL) — relational data linking Families → Communities → Projects
- **AI Engine:** OpenAI API (GPT-4o) or Gemini 1.5 Pro — powers "The Guide" and "Spark Architect"
- **Deployment:** Vercel as a PWA (Progressive Web App)

## Architecture

### Entry Flow
`index.html` → `src/main.tsx` (React StrictMode) → `src/App.tsx`

### File Structure
```
src/
├── App.tsx                          # Root component, state management, layout
├── types.ts                         # All TypeScript interfaces and type definitions
├── index.css                        # Tailwind + custom keyframe animations
├── main.tsx                         # React entry point
└── components/
    ├── PlantVisual.tsx              # Procedural SVG plant (7 stages, 3 archetypes)
    ├── AIMentorPanel.tsx            # Sliding side panel chat with The Guide (mocked)
    ├── HarvestModal.tsx             # Module 7 completion: wisdom capture + seed scattering
    ├── FlowView.tsx                 # Daily schedule + prioritized task list
    ├── CommunityGarden.tsx          # Community projects with tiered water/graft interactions
    ├── LeaderHub.tsx                # Family garden overview — read-only member card grid + detail modal
    ├── MicroCycleModal.tsx          # Standalone 4-step practice (Observe → Analyze → Implement → Reflect)
    └── ModuleRitualModal.tsx        # Unique rituals for Modules 2-6
```

### Key Components

- **`App`** — Root component. Manages all state via `useState`. Contains three view modes, Seed Discovery flow, and dashboard layout.
- **`PlantVisual`** — Procedural SVG plant generation with 7 stages and 3 archetypes (sunflower, oak, cactus). Uses unique SVG filter IDs via `useId()` to prevent collisions. Keyframe animation in `index.css`.
- **`AIMentorPanel`** — Sliding side panel chat with "The Guide". **Currently mocked** with keyword matching. Target: Socratic questioning within the 7-Module framework, prioritizing "Earth Care, People Care, Fair Share."
- **`MicroCycleModal`** — Standalone 4-step practice loop (Observe → Analyze → Implement → Reflect). Independent of module progression. Users can run anytime.
- **`ModuleRitualModal`** — Unique ritual for each module (2-6): Roots (knowledge logging), Stem (experiential learning), Leaves (pattern journal + clearing practice), Bloom (community sharing), Fruit (abundance tracking).
- **`HarvestModal`** — Module 7 completion: captures wisdom, sharing choices. Persists harvest to `harvestHistory` array on the member.
- **`FlowView`** — Daily schedule timeline + task list with domain tags.
- **`CommunityGarden`** — Browse/interact with community projects. Tiered watering (Light Rain → Steady Rain → Downpour → Flood) and grafting (Budding → Branch Graft → Full Graft).

### Three View Modes
1. **Dashboard** — Active project with plant visual, Sovereignty Score, Land/Sea/Sky domain cards
2. **Daily Flow** — Schedule timeline + task list with domain tags
3. **Community** — Grid of community projects with tiered interaction buttons

### Domain Model

Goals are organized into **3 meta-domains** containing **10 life domains**:
- **Land** (Foundation): Spiritual, Physical, Psychological, Passion
- **Sea** (Exchange): Intellectual, Financial, Career
- **Sky** (Atmosphere): Family, Social, Environment

Each goal tracks `completed`/`total` progress. The **Sovereignty Score** is the average of Land, Sea, and Sky percentages. Code variable: `totalSovereigntyScore`.

### Canonical Module Names (Code version — confirmed)
1. **The Seed** — Discovery & Alignment
2. **The Roots** — Knowledge Accumulation
3. **The Stem** — Experiential Learning
4. **The Leaves** — Prefrontal Insights / Patterns
5. **The Bloom** — Community Extension (Prototype stage)
6. **The Fruit** — Utilizing Abundance (Final product stage)
7. **The Harvest** — Synthesis & Sharing

### Permacognition Engine

**Micro-Cycle** (Observe → Analyze → Implement → Reflect) is a **standalone practice** — a separate loop users can run anytime, independent of module progression. Implemented in `MicroCycleModal`.

**Macro-Cycle (7 Modules)** each have their own **unique ritual/process** (implemented in `ModuleRitualModal` for modules 2-6, `HarvestModal` for module 7, Seed Discovery in `App.tsx` for module 1).

Module advancement comes from completing that module's unique process, NOT from accumulating micro-cycles.

### Plant Archetypes
- **Sunflower** = "The Visionary" (creative/spiritual/intellectual)
- **Oak** = "The Builder" (legacy/financial/long-term)
- **Cactus** = "The Survivor" (resilience/health/efficiency)

User selects archetype during Seed Discovery (Step 3). AI suggestion planned for Phase 3.

### Community Interactions (Tiered)

**Watering (Nourishment):**
1. Light Rain — Encouragement / "I see you"
2. Steady Rain — Share a resource
3. Downpour — Commit time/labor
4. Flood — Fund the project financially

**Grafting (Mentorship):**
1. Budding — One-time skill tip
2. Branch Graft — Ongoing mentorship
3. Full Graft — Deep co-growth partnership

### Planned Database Schema
- **Profiles:** id, email, family_id, role (Leader/Member), level (Cultivator/Mentor/Think Tank)
- **Ecosystems (Families):** id, name, leaders[]
- **Projects (The Plants):** id, user_id, archetype, current_module (1-7), status, visibility, ethics_check, sharing_scope
- **Cycles (Growth Logs):** id, project_id, module_step, reflection_data, timestamp
- **Communities:** id, type (Work/Church/Town), members[]
- **Harvest History:** id, project_id, wisdom, shared_with, seeds_scattered, completed_at
- **Micro-Cycles:** id, user_id, observation, analysis, implementation, reflection, domain, completed_at

### Data Model (TypeScript)

All types defined in `src/types.ts`. Key interfaces:
- `FamilyMember` — includes `harvestHistory`, `microCycles`, `knowledgeLog`, `questionMap`, `experienceLog`, `patternJournal`
- `GoalsMap` — `Record<DomainKey, Goal>`
- `HarvestRecord` — persisted harvest wisdom + sharing choices
- `MicroCycleEntry` — 4-step practice entry
- `KnowledgeEntry`, `QuestionEntry`, `ExperienceEntry`, `PatternEntry` — module ritual data

### Design System
- Primary gold: `#d4af37`
- Dark: `#2c2c2a`
- Light background: `#fdfbf7`
- Typography: serif font for headings (italic), sans for body
- Labels use `text-[10px] font-bold uppercase tracking-widest` pattern throughout
- UI should feel "hand-crafted" — procedural/organic visuals

### Current Limitations
- ~~All state is local (no persistence — resets on refresh)~~ — Supabase profiles table with RLS
- ~~No backend integration despite Supabase dependency~~ — Auth + profile persistence active
- AI mentor is mocked with keyword matching
- Plant stage gating not enforced (renders based on module number only)
- `isFamilyMenuOpen` toggles a dropdown but no member selection is implemented (only 1 hardcoded member)
- No accessibility: Missing ARIA labels, keyboard focus indicators, low-contrast text patterns

### Resolved Technical Debt (Phase 1.5)
- ~~Components defined inside `App()`~~ — Extracted to `src/components/`
- ~~`any` types throughout~~ — All replaced with proper TypeScript interfaces in `src/types.ts`
- ~~`dangerouslySetInnerHTML` for CSS~~ — Moved to `src/index.css`
- ~~Duplicate SVG filter IDs~~ — `PlantVisual` uses `useId()` for unique IDs
- ~~`sharingScope` and `ethicsCheck` discarded~~ — Now persisted on `FamilyMember`
- ~~Random plant archetype assignment~~ — User selects during Seed Discovery
- ~~Harvest resets without persistence~~ — Now saves `HarvestRecord` to `harvestHistory`
- ~~No micro-cycle UI~~ — `MicroCycleModal` implements standalone 4-step practice
- ~~Generic CycleModal~~ — Replaced with unique module rituals in `ModuleRitualModal`
- ~~Flat water/graft buttons~~ — Tiered interaction system in `CommunityGarden`
- ~~Module naming drift~~ — Canonical names confirmed (Seed/Roots/Stem/Leaves/Bloom/Fruit/Harvest)

## Development Roadmap

**Phase 1: The Seed (complete)** — Prototype UI, plant art engine, family/community switching

**Phase 1.5: UI Gap Fixes (complete)** — Component extraction, TypeScript interfaces, module rituals, micro-cycle, tiered communities, Seed Discovery fix, Harvest persistence

**Phase 2: The Roots (in progress)** — ~~Supabase setup~~, ~~auth~~, ~~persist state~~, ~~Leader Mode~~, ~~prioritization logic~~, ~~calendar sync~~, notifications

**Phase 3: The Bloom (future)** — Real AI for The Guide (all 4 touchpoints), Guide personality, Spark Architect, PWA, push notifications, payments

**Phase 4: The Fruit** — Community marketplace, content publishing, analytics dashboards

## Technical Document

The primary source is `docs/Trellis_Technical_Manifesto.md.txt`. See also `docs/Gem Summary.txt` for the confirmed product vision.
