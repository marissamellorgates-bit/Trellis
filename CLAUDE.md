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
- **Supabase** for auth + PostgreSQL persistence (profiles table with RLS)
- **vite-plugin-pwa** for PWA installability + service worker

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
├── main.tsx                         # React entry point + PWA service worker registration
├── lib/
│   ├── supabase.ts                  # Supabase client, profile load/save
│   ├── notifications.ts             # Notification factories, imbalance detector, browser API
│   ├── googleCalendar.ts            # Google Calendar API fetch
│   ├── icsParser.ts                 # ICS file parser
│   └── eventTypeMapper.ts           # Calendar event type mapping
└── components/
    ├── PlantVisual.tsx              # Procedural SVG plant (7 stages, 3 archetypes)
    ├── AIMentorPanel.tsx            # Sliding side panel chat with The Guide (mocked)
    ├── HarvestModal.tsx             # Module 7 completion: wisdom capture + seed scattering
    ├── FlowView.tsx                 # Daily schedule + prioritized task list
    ├── CommunityGarden.tsx          # Community projects with tiered water/graft interactions
    ├── LeaderHub.tsx                # Family garden overview — read-only member card grid + detail modal
    ├── MicroCycleModal.tsx          # Standalone 4-step practice (Observe → Analyze → Implement → Reflect)
    ├── ModuleRitualModal.tsx        # Unique rituals for Modules 2-6
    ├── Toast.tsx                    # Auto-dismissing toast notifications (bottom-right, z-200)
    └── NotificationCenter.tsx       # Bell dropdown — notification history with mark-read/clear
```

### Key Components

- **`App`** — Root component. Manages all state via `useState`. Contains four view modes, Seed Discovery flow, notification system, and dashboard layout. ~960 lines.
- **`PlantVisual`** — Procedural SVG plant generation with 7 stages and 3 archetypes (sunflower, oak, cactus). Uses unique SVG filter IDs via `useId()` to prevent collisions. Keyframe animation in `index.css`.
- **`AIMentorPanel`** — Sliding side panel chat with "The Guide". **Currently mocked** with keyword matching. Target: Socratic questioning within the 7-Module framework, prioritizing "Earth Care, People Care, Fair Share."
- **`MicroCycleModal`** — Standalone 4-step practice loop (Observe → Analyze → Implement → Reflect). Independent of module progression. Users can run anytime.
- **`ModuleRitualModal`** — Unique ritual for each module (2-6): Roots (knowledge logging), Stem (experiential learning), Leaves (pattern journal + clearing practice), Bloom (community sharing), Fruit (abundance tracking).
- **`HarvestModal`** — Module 7 completion: captures wisdom, sharing choices. Persists harvest to `harvestHistory` array on the member.
- **`FlowView`** — Daily schedule timeline + task list with domain tags.
- **`CommunityGarden`** — Browse/interact with community projects. Tiered watering (Light Rain → Steady Rain → Downpour → Flood) and grafting (Budding → Branch Graft → Full Graft).
- **`Toast`** — Auto-dismissing toast popups (fixed bottom-right, z-200). 6-second duration with fade-out animation. Type-specific icons (Sprout, CheckCircle2, AlertTriangle, Calendar).
- **`NotificationCenter`** — Bell dropdown with notification history. Supports tap-to-mark-read on individual items, mark-all-read, clear-all. Shows "Enable Push Notifications" button when browser permission is `default`. Newest-first, max-h-80 scrollable list.

### Four View Modes
1. **Dashboard** — Active project with plant visual, Sovereignty Score, Land/Sea/Sky domain cards
2. **Daily Flow** — Schedule timeline + task list with domain tags
3. **Community** — Grid of community projects with tiered interaction buttons
4. **Leader Hub** — Read-only family garden overview with member cards + detail modal

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

### Notification System

**Architecture:** `src/lib/notifications.ts` provides pure factory functions. `App.tsx` owns notification/toast state and the `notify()` callback. Toast and NotificationCenter are presentational components.

**7 Notification Triggers:**
1. **Module Advance** — `advanceModule()` → fires when entering a new module
2. **Harvest Complete** — `finalizeHarvest()` → fires when a project is harvested
3. **Sow Logged** — `completeSow()` → fires on manual sow submission
4. **Task Complete** — `toggleTask()` → fires when checking off a task
5. **Schedule Complete** — `completeScheduleItem()` → fires when completing a time block
6. **Calendar Synced** — `syncGoogleCalendar()` → fires when Google Calendar events are found
7. **Imbalance Alert** — `useEffect` on score changes → fires when Land/Sea/Sky gap ≥ 25 points (1-hour cooldown, also sends browser push notification)

**Notification Types:** `NotificationType` = `module_advance | harvest_complete | sow_logged | task_complete | schedule_complete | calendar_synced | imbalance_alert | system`

**Toast Behavior:** Auto-dismisses after 6 seconds with fade-out. Fixed bottom-right, z-[200].

**Bell Behavior:** Gold dot indicator when unread count > 0. Tap individual notifications to mark read. Checkmark button marks all read. Trash button clears all. Notifications capped at 50, newest first.

**Browser Push:** `requestNotificationPermission()` wraps the Notification API. `sendBrowserNotification()` fires OS-level notifications (used for imbalance alerts).

**Persistence:** `TrellisNotification[]` stored on `FamilyMember.notifications`, persisted to Supabase `profiles.notifications` (jsonb column). All notification access uses `?? []` null safety.

### PWA Configuration

- **Plugin:** `vite-plugin-pwa` with `registerType: 'autoUpdate'`
- **Manifest:** name "Trellis", theme `#2c2c2a`, bg `#fdfbf7`, display `standalone`
- **Icons:** `/trellis-logo.png` at 192x192 and 512x512
- **Service Worker:** Generated via Workbox. Caches static assets. NetworkFirst for Supabase API calls.
- **Registration:** `virtual:pwa-register` in `src/main.tsx`
- **Meta tags:** `theme-color`, `mobile-web-app-capable`, `apple-touch-icon` in `index.html`

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
- `FamilyMember` — includes `harvestHistory`, `sowLog`, `knowledgeLog`, `questionMap`, `experienceLog`, `patternJournal`, `notifications`
- `GoalsMap` — `Record<DomainKey, Goal>`
- `HarvestRecord` — persisted harvest wisdom + sharing choices
- `TrellisNotification` — `{ id, type, title, message, timestamp, read, domain? }`
- `ToastData` — `{ id, title, message, type, duration? }`
- `NotificationType` — union of 8 event types
- `KnowledgeEntry`, `QuestionEntry`, `ExperienceEntry`, `PatternEntry` — module ritual data

### Design System
- Primary gold: `#d4af37`
- Dark: `#2c2c2a`
- Light background: `#fdfbf7`
- Typography: serif font for headings (italic), sans for body
- Labels use `text-[10px] font-bold uppercase tracking-widest` pattern throughout
- UI should feel "hand-crafted" — procedural/organic visuals
- Z-index stack: nav z-50 → notification backdrop z-[90] → dropdown z-[100] → toasts z-[200]

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

**Phase 2: The Roots (complete)** — ~~Supabase setup~~, ~~auth~~, ~~persist state~~, ~~Leader Mode~~, ~~prioritization logic~~, ~~calendar sync~~, ~~notifications~~

**Phase 3: The Bloom (future)** — Real AI for The Guide (all 4 touchpoints), Guide personality, Spark Architect, ~~PWA~~, ~~push notifications~~, payments

**Phase 4: The Fruit** — Community marketplace, content publishing, analytics dashboards

## Deployment

- **Hosting:** Vercel (https://trellis-tau.vercel.app)
- **Deploy method:** `npx vercel --prod` from project root (GitHub auto-deploy is not connected)
- **Supabase project:** `hoslzlcbvdynwmsczvnj` (West US / Oregon)
- **Supabase CLI:** Binary at `/tmp/supabase`, linked to project ref `hoslzlcbvdynwmsczvnj`
  - **Install:** `curl -L https://github.com/supabase/cli/releases/latest/download/supabase_darwin_amd64.tar.gz -o /tmp/supabase.tar.gz && tar -xzf /tmp/supabase.tar.gz -C /tmp/`
  - **Login:** `/tmp/supabase login --no-browser` (opens auth URL, no tokens in chat)
  - **Link:** `/tmp/supabase link --project-ref hoslzlcbvdynwmsczvnj`
- **Run SQL via Management API:**
  ```bash
  curl -s -X POST "https://api.supabase.com/v1/projects/hoslzlcbvdynwmsczvnj/database/query" \
    -H "Authorization: Bearer <ACCESS_TOKEN>" \
    -H "Content-Type: application/json" \
    -d '{"query": "YOUR SQL HERE"}'
  ```
- **Database columns on `profiles`:** id, name, role, goals, project_title, project_plant, project_impact_vectors, current_module, project_visibility, project_ethics_check, project_sharing_scope, tasks, schedule, harvest_history, sow_log, knowledge_log, question_map, experience_log, pattern_journal, notifications

## Technical Document

The primary source is `docs/Trellis_Technical_Manifesto.md.txt`. See also `docs/Gem Summary.txt` for the confirmed product vision.
