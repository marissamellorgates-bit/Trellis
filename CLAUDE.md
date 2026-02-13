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
- **AI Engine:** OpenAI API (GPT-4o) or Gemini 2.5 Flash — powers "The Guide" and "Spark Architect"
- **Deployment:** Vercel as a PWA (Progressive Web App)

## Architecture

### Entry Flow
`index.html` → `src/main.tsx` (React StrictMode) → `src/App.tsx`

### File Structure
```
api/
├── create-checkout.ts               # Stripe Checkout Session creation
├── create-portal.ts                 # Stripe Customer Portal session
├── stripe-webhook.ts                # Stripe webhook handler (raw body)
├── redeem-gift.ts                   # Gift subscription redemption
└── todoist-auth.ts                  # Todoist OAuth token exchange
src/
├── App.tsx                          # Root component, state management, layout
├── types.ts                         # All TypeScript interfaces and type definitions
├── index.css                        # Tailwind + custom keyframe animations
├── main.tsx                         # React entry point + PWA service worker registration
├── lib/
│   ├── supabase.ts                  # Supabase client, profile load/save
│   ├── community.ts                 # Community marketplace CRUD (projects, interactions, views, analytics)
│   ├── gemini.ts                    # Gemini 2.5 Flash API client (Guide + Spark Architect + Spark Refinement + Image Task Extraction)
│   ├── todoist.ts                   # Todoist OAuth + REST API client (auth URL, token exchange, fetch tasks)
│   ├── notifications.ts             # Notification factories, imbalance detector, browser API
│   ├── subscription.ts              # Subscription status helpers, Stripe checkout/portal wrappers
│   ├── googleCalendar.ts            # Google Calendar API fetch
│   ├── icsParser.ts                 # ICS file parser
│   ├── eventTypeMapper.ts           # Calendar event type mapping
│   └── communityIcons.ts            # Community icon registry, defaults, resolve/ensure helpers
└── components/
    ├── PlantVisual.tsx              # Procedural SVG plant (7 stages, 3 archetypes)
    ├── AIMentorPanel.tsx            # Sliding side panel chat with The Guide (Gemini AI)
    ├── HarvestModal.tsx             # Module 7 completion: wisdom capture + seed scattering
    ├── FlowView.tsx                 # Daily schedule + prioritized task list
    ├── MarketplaceView.tsx           # DB-backed community marketplace with search/filter/sort
    ├── ProjectDetailModal.tsx       # Full project view with interaction history + water/graft actions
    ├── PublishProjectModal.tsx      # Publish/edit project to community marketplace
    ├── AnalyticsDashboard.tsx       # Project analytics — views, waterings, grafts, charts
    ├── LeaderHub.tsx                # Family garden overview — read-only member card grid + detail modal
    ├── MicroCycleModal.tsx          # Standalone 4-step practice (Observe → Analyze → Implement → Reflect)
    ├── ModuleRitualModal.tsx        # Unique rituals for Modules 2-6
    ├── PaywallScreen.tsx            # Full-screen paywall with monthly/annual pricing cards
    ├── GiftModal.tsx                # Gift subscription purchase modal
    ├── GiftRedeemBanner.tsx         # Banner for redeeming gifted subscriptions
    ├── CommunitySettingsModal.tsx   # Manage custom communities — add/rename/delete with icon picker
    ├── ImportTasksModal.tsx          # Two-tab modal: Todoist OAuth import + Photo AI task extraction
    ├── SparkRefinement.tsx           # Inline AI chat for refining goals in Seed Discovery Step 1
    ├── Toast.tsx                    # Auto-dismissing toast notifications (bottom-right, z-200)
    └── NotificationCenter.tsx       # Bell dropdown — notification history with mark-read/clear
```

### Key Components

- **`App`** — Root component. Manages all state via `useState`. Contains four view modes, Seed Discovery flow, delete/abandon projects, notification system, shelved projects, dashboard inline editing, customizable communities, task import, and layout. ~1200 lines.
- **`CommunitySettingsModal`** — Full community management modal opened from user dropdown menu. Inline rename, icon picker (16 Lucide icons), delete button (Private Greenhouse undeletable), add community row. Cap at 10 communities. Works on local copy, commits on Save.
- **`PlantVisual`** — Procedural SVG plant generation with 7 stages and 3 archetypes (sunflower, oak, cactus). Uses unique SVG filter IDs via `useId()` to prevent collisions. Keyframe animation in `index.css`.
- **`AIMentorPanel`** — Sliding side panel chat with "The Guide". Uses **Gemini 2.5 Flash** for Socratic questioning within the 7-Module framework, prioritizing "Earth Care, People Care, Fair Share." Falls back to mock keyword matching when no API key is configured. Supports AbortController cancel, error handling, and persisted chat history.
- **`MicroCycleModal`** — Standalone 4-step practice loop (Observe → Analyze → Implement → Reflect). Independent of module progression. Users can run anytime.
- **`ModuleRitualModal`** — Unique ritual for each module (2-6): Roots (knowledge logging), Stem (experiential learning), Leaves (pattern journal + clearing practice), Bloom (community sharing), Fruit (abundance tracking).
- **`HarvestModal`** — Module 7 completion: captures wisdom, sharing choices. Persists harvest to `harvestHistory` array on the member.
- **`FlowView`** — Daily schedule timeline (12-hour format) + task list with domain tags.
- **`MarketplaceView`** — DB-backed community marketplace. Search, filter by archetype, sort (newest/most watered/most grafted/most viewed). Publish projects, view analytics. Replaces the old `CommunityGarden`.
- **`ProjectDetailModal`** — Full project view with plant visual, stats, interaction history, and water/graft tier selectors. Records views on open.
- **`PublishProjectModal`** — Publish active project to the community. Pre-fills from current project, allows editing description/tags/visibility.
- **`AnalyticsDashboard`** — Overview and per-project analytics. SVG bar chart for views by day (30d), interaction tier breakdowns, recent interaction list.
- **`ImportTasksModal`** — Two-tab modal for importing tasks into Prioritized Actions. **Todoist tab:** OAuth popup flow → fetch tasks → checklist with select-all → domain picker → import. **Photo tab:** Camera capture or file upload → Gemini multimodal AI extraction → editable checklist → domain picker → import. Graceful degradation: tabs hidden when respective env vars are missing. Triggered by CheckSquare button in FlowView.
- **`SparkRefinement`** — Inline AI chat widget in Seed Discovery Step 1. User's initial spark is auto-sent to The Guide, who asks 2-3 clarifying questions, then suggests a refined goal. Editable refined goal textarea with gold border. On accept, auto-triggers Spark Architect analysis. Only appears when AI is configured.
- **`Toast`** — Auto-dismissing toast popups (fixed bottom-right, z-200). 6-second duration with fade-out animation. Type-specific icons (Sprout, CheckCircle2, AlertTriangle, Calendar).
- **`NotificationCenter`** — Bell dropdown with notification history. Supports tap-to-mark-read on individual items, mark-all-read, clear-all. Shows "Enable Push Notifications" button when browser permission is `default`. Newest-first, max-h-80 scrollable list.

### Four View Modes
1. **Dashboard** — Active project with plant visual, Sovereignty Score, Land/Sea/Sky domain cards. Empty state shows decorative plant silhouettes (cactus, oak, sunflower) with gold "Start a Permacognition Project" CTA button
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

User selects archetype during Seed Discovery (Step 3). Spark Architect AI suggests title, domains, and archetype.

### Seed Discovery Flow
- **Step 1: The Spark** — Textarea for initial idea. When AI is configured, pressing Enter or clicking outside auto-triggers guided refinement with The Guide (SparkRefinement component). On accept, Spark Architect auto-analyzes the refined goal.
- **Step 2: Domain Mapping** — Domain chips grouped under Land (Foundation), Sea (Social Space), Sky (Aspiration) with category labels. Spark Architect pre-selects suggested domains.
- **Step 3: Archetype** — User picks Sunflower/Oak/Cactus. Spark Architect pre-selects suggested archetype.
- **Step 4: Ethics Check** — Earth Care, People Care, Share the Harvest toggles.
- **Step 5: Pollination Strategy** — Select sharing communities from user's custom list + quick-add inline input to create new communities on the fly.

### Shelved Projects
- Users can save ("shelve") their current project and start a new one
- Maximum 3 total projects (1 active + 2 shelved)
- Resume saved projects from the "No Project" empty state
- Active projects can be abandoned (clears without harvest record, archives from community if published)
- Shelved projects can be deleted via X button on each card
- Both delete actions require inline confirmation before executing
- Swapping projects auto-shelves the current one
- Shelved data includes: title, plant, module, impact vectors, ethics check, sharing scope, visibility, knowledge log, question map, experience log, pattern journal, chat history
- Stored in `profiles.shelved_projects` (jsonb column)

### Customizable Communities
- Replaces the old hardcoded 5-community list with user-managed communities
- 3 defaults: Private Greenhouse (`Lock`), Family Garden (`Home`), Friends Circle (`Users`)
- Private Greenhouse is always present and undeletable (`isDefault: true`)
- Users can add/rename/delete communities from the settings modal (user dropdown → "My Communities")
- Quick-add inline input in Seed Discovery Step 5 — creates community and auto-selects it
- Cap at 10 communities per user
- Icon picker with 16 curated Lucide icons
- **Architecture:** `src/lib/communityIcons.ts` provides `COMMUNITY_ICON_MAP`, `DEFAULT_COMMUNITIES`, `ensureDefaults()`, `resolveCommunitiesForUI()`
- **Data:** `UserCommunity` interface: `{ id, name, iconKey: string, type, isDefault }`
- **Serialization:** `iconKey` is a string (e.g. `'Lock'`, `'Users'`) → resolved to `LucideIcon` at render time via `COMMUNITY_ICON_MAP`
- **Persistence:** `customCommunities?: UserCommunity[]` on `FamilyMember`, stored in `profiles.custom_communities` (jsonb column, default NULL)
- Communities derived from member data: `ensureDefaults(activeMember.customCommunities)` → `resolveCommunitiesForUI()`
- HarvestModal receives `resolvedCommunities` (same list)

### Task Import (Todoist + Photo)

**Architecture:** `ImportTasksModal` component with two tabs. Todoist uses full OAuth flow via popup window + serverless token exchange. Photo uses Gemini 2.5 Flash multimodal API for image-to-text extraction.

**Todoist Import Flow:**
1. User clicks "Connect Todoist" → opens OAuth popup to `todoist.com/oauth/authorize`
2. Todoist redirects to `/todoist-callback.html` which posts auth code via `postMessage`
3. Parent receives code, calls `/api/todoist-auth` serverless function for token exchange
4. Token stored in component state (not persisted — user re-connects each session)
5. Fetches active tasks from Todoist REST API v2, displays as selectable checklist
6. User picks domain, imports selected tasks into Prioritized Actions

**Photo Import Flow:**
1. User takes photo (`capture="environment"`) or uploads image from gallery
2. Image loaded as base64 via FileReader, preview shown
3. "Extract Tasks" sends image to `extractTasksFromImage()` (Gemini multimodal with `inlineData`)
4. AI returns array of `{ title, estimatedMinutes? }`, displayed as editable checklist
5. User can fix AI mistakes, select/deselect, pick domain, then import

**Graceful Degradation:**
- Todoist tab hidden when `VITE_TODOIST_CLIENT_ID` not set
- Photo tab hidden when `VITE_GEMINI_API_KEY` not set
- If both missing, modal shows setup instructions
- If only one configured, opens directly to that tab (no tab bar)

**Files:**
- `api/todoist-auth.ts` — Vercel serverless function (uses `TODOIST_CLIENT_ID` + `TODOIST_CLIENT_SECRET`)
- `public/todoist-callback.html` — OAuth redirect page (extracts code, posts to parent, auto-closes)
- `src/lib/todoist.ts` — `isTodoistConfigured()`, `getTodoistAuthUrl()`, `exchangeTodoistToken()`, `fetchTodoistTasks()`, `mapTodoistToTrellisTask()`
- `src/lib/gemini.ts` — `extractTasksFromImage()`, `ExtractedTask` interface
- `src/components/ImportTasksModal.tsx` — Modal with TodoistTab + PhotoTab sub-components

**Trigger:** CheckSquare button in FlowView header → `onOpenImportTasks` prop → `showImportTasks` state in App.tsx

### Dashboard Empty State
- Gold "Start a Permacognition Project" button (matches Guide button color `#d4af37`)
- 3 decorative `PlantVisual` silhouettes: cactus (left), oak (center), sunflower (right)
- Plants at `opacity-[0.04–0.06]`, `pointer-events-none`, positioned with `-bottom-3` so bases clip at card edge
- Card uses `overflow-hidden` with `relative` positioning; plants use `absolute` + `h-[160%]` to scale tall
- Only visible when no active project (`!activeMember.projectTitle`)

### Dashboard Inline Editing
- Pencil icon on active project card opens inline edit mode
- Edit project title and archetype without going through Seed Discovery
- Save/Cancel buttons with immediate persistence

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

**Notification Types:** `NotificationType` = `module_advance | harvest_complete | sow_logged | task_complete | schedule_complete | calendar_synced | imbalance_alert | community_interaction | project_published | system`

**Toast Behavior:** Auto-dismisses after 6 seconds with fade-out. Fixed bottom-right, z-[200].

**Bell Behavior:** Gold dot indicator when unread count > 0. Tap individual notifications to mark read. Checkmark button marks all read. Trash button clears all. Notifications capped at 50, newest first.

**Browser Push:** `requestNotificationPermission()` wraps the Notification API. `sendBrowserNotification()` fires OS-level notifications (used for imbalance alerts).

**Persistence:** `TrellisNotification[]` stored on `FamilyMember.notifications`, persisted to Supabase `profiles.notifications` (jsonb column). All notification access uses `?? []` null safety.

### AI Integration (Gemini 2.5 Flash)

**Architecture:** `src/lib/gemini.ts` is a pure API client with no state. `AIMentorPanel` owns the UI and delegates API calls. Chat history is lifted to `App.tsx` via `onChatHistoryChange` callback and persisted to Supabase `profiles.chat_history` (jsonb).

**The Guide:**
- Socratic AI mentor using Gemini 2.5 Flash (REST API via fetch, no SDK)
- System prompt includes: project context, current module + module-specific instructions, domain scores, recent activity (sow log, knowledge log, open questions, experience log, pattern journal), current tasks, imbalance detection
- Module-specific prompting: each of the 7 modules has a unique focus area injected into the system prompt
- Task suggestions: Guide can include `{"task": {"title": "...", "domain": "..."}}` at end of response, parsed and displayed as actionable buttons
- Last 20 messages sent to API; full history displayed in UI
- AbortController cancel button for long requests
- Error handling: `GeminiError` class with codes `RATE_LIMIT`, `AUTH`, `NETWORK`, `SAFETY`, `PARSE`
- **Fallback:** When `VITE_GEMINI_API_KEY` is not set, uses mock keyword matching (demo mode)
- Chat history clears on Harvest (new project = fresh conversation)
- Config: temperature 0.8, maxOutputTokens 500

**Spark Refinement (Guided Goal Refinement):**
- Inline AI chat in Seed Discovery Step 1 — helps users turn vague ideas into clear, measurable goals
- **Auto-triggers on textarea blur**: when AI is configured and user has typed text, clicking/tabbing out of the textarea automatically opens the refinement chat (no button click needed)
- Subtle hint text below textarea: "Click outside the box when you're ready — The Guide will help you refine your idea"
- Replaces the textarea with a compact chat widget (`SparkRefinement` component)
- AI asks one clarifying question at a time (warm, direct tone — no riddles)
- After 2-3 exchanges, suggests a refined goal as JSON: `{"refinedGoal": "...", "suggestedTitle": "..."}`
- Refined goal appears in an editable textarea with gold border; user can modify before accepting
- On accept: sets `sparkInput` to refined goal, auto-triggers Spark Architect analysis
- "Back to editing" returns to the original textarea with text intact
- Uses `refineSparkGoal()` in `gemini.ts` with `SPARK_REFINEMENT_SYSTEM_PROMPT`
- Config: temperature 0.8, maxOutputTokens 500
- Without AI key: refinement skipped entirely, flow unchanged

**Spark Architect:**
- AI auto-analyzes goal text during Seed Discovery Step 1
- Button appears only when `VITE_GEMINI_API_KEY` is set and goal text is non-empty
- Returns `SparkResult`: `suggestedDomains` (DomainKey[]), `suggestedArchetype`, `domainRationale`, `archetypeRationale`
- Pre-populates domain chips (Step 2) and archetype selection (Step 3) from AI suggestion
- Shows rationale text below domain chips and archetype cards
- User can always manually override AI suggestions
- Config: temperature 0.8, maxOutputTokens 300

**Image Task Extraction:**
- `extractTasksFromImage(base64Image, mimeType)` — Sends image to Gemini 2.5 Flash multimodal with `inlineData`
- System prompt instructs AI to extract tasks/to-dos from handwritten or printed lists
- Returns `ExtractedTask[]`: `{ title: string, estimatedMinutes?: number }`
- Config: temperature 0.8, maxOutputTokens 1024

**Security:** `VITE_GEMINI_API_KEY` is exposed in client bundle (frontend-only architecture). Mitigate by restricting the key to Generative Language API only with HTTP referrer restrictions + per-key quotas in Google AI Studio. Future: move to serverless proxy.

### PWA Configuration

- **Plugin:** `vite-plugin-pwa` with `registerType: 'autoUpdate'`
- **Manifest:** name "Trellis", theme `#2c2c2a`, bg `#fdfbf7`, display `standalone`
- **Icons:** `/trellis-logo.png` at 192x192 and 512x512
- **Service Worker:** Generated via Workbox. Caches static assets. NetworkFirst for Supabase API calls.
- **Registration:** `virtual:pwa-register` in `src/main.tsx`
- **Meta tags:** `theme-color`, `mobile-web-app-capable`, `apple-touch-icon` in `index.html`

### Stripe Payments Integration

**Architecture:** Stripe Checkout (hosted) for payment UI. Vercel serverless functions (`/api/*`) handle Stripe API calls and webhooks. Supabase `profiles` table stores subscription state.

**Subscription Model:**
- 14-day free trial (full access), then $5/month or $39/year
- Gifting supported via `gift_subscriptions` table
- Status tracked in `profiles.subscription_status`: `trialing`, `active`, `past_due`, `expired`, `canceled`
- Trial countdown shown in nav when trialing

**Serverless Functions (`/api/`):**
- `create-checkout.ts` — Creates Stripe Checkout Session (supports gift purchases)
- `create-portal.ts` — Creates Stripe Customer Portal session (manage/cancel)
- `stripe-webhook.ts` — Handles Stripe webhook events (raw body, signature verification)
- `redeem-gift.ts` — Validates and redeems gift subscriptions
- `todoist-auth.ts` — Todoist OAuth token exchange (receives auth code, returns access token)

**Client-side (`src/lib/subscription.ts`):**
- `getSubscriptionInfo(member)` — Returns `{ status, trialDaysRemaining, hasActiveAccess, tier }`
- `stripeConfigured` — Checks if `VITE_STRIPE_*` env vars are set
- When Stripe keys not configured (dev mode), paywall is skipped entirely

**Components:**
- `PaywallScreen` — Full-screen paywall with monthly/annual pricing cards
- `GiftModal` — Purchase a gift subscription for someone else
- `GiftRedeemBanner` — Banner at top of dashboard for pending gifts

**Environment Variables:**
- `VITE_STRIPE_PUBLISHABLE_KEY` — Client-visible (`.env` + Vercel)
- `VITE_STRIPE_MONTHLY_PRICE_ID` — Client-visible (`.env` + Vercel)
- `VITE_STRIPE_ANNUAL_PRICE_ID` — Client-visible (`.env` + Vercel)
- `STRIPE_SECRET_KEY` — Server-only (Vercel only)
- `STRIPE_WEBHOOK_SECRET` — Server-only (Vercel only)
- `SUPABASE_SERVICE_ROLE_KEY` — Server-only (Vercel only)
- `VITE_TODOIST_CLIENT_ID` — Client-visible (`.env` + Vercel) — Todoist OAuth app client ID
- `TODOIST_CLIENT_SECRET` — Server-only (Vercel only) — Todoist OAuth app secret

**Stripe Webhook Events:**
- `checkout.session.completed` — Activate subscription or create gift record
- `customer.subscription.updated` — Update status/tier/period
- `customer.subscription.deleted` — Set expired
- `invoice.payment_failed` — Set past_due
- `invoice.paid` — Set active + update period

**Database Migration Required:**
```sql
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS trial_start timestamptz DEFAULT now(),
  ADD COLUMN IF NOT EXISTS subscription_status text DEFAULT 'trialing',
  ADD COLUMN IF NOT EXISTS stripe_customer_id text,
  ADD COLUMN IF NOT EXISTS stripe_subscription_id text,
  ADD COLUMN IF NOT EXISTS subscription_tier text,
  ADD COLUMN IF NOT EXISTS subscription_current_period_end timestamptz;

CREATE TABLE IF NOT EXISTS gift_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  purchaser_user_id uuid NOT NULL,
  recipient_email text NOT NULL,
  stripe_checkout_session_id text,
  tier text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  redeemed_at timestamptz,
  redeemed_by_user_id uuid
);
ALTER TABLE gift_subscriptions ENABLE ROW LEVEL SECURITY;

UPDATE profiles SET trial_start = now(), subscription_status = 'trialing' WHERE trial_start IS NULL;
```

### Database Schema
- **Profiles:** id, email, family_id, role (Leader/Member), level (Cultivator/Mentor/Think Tank), subscription fields
- **community_projects:** id, user_id, author_name, title, description, plant, stage, status (draft/published/archived), visibility[], tags[], impact_vectors[], water_count, graft_count, view_count, created_at, updated_at, published_at
- **community_interactions:** id, project_id, from_user_id, from_user_name, type (water/graft), tier, message, created_at
- **project_views:** id, project_id, viewer_id, viewed_at (unique per project+viewer+day)
- **gift_subscriptions:** id, purchaser_user_id, recipient_email, stripe_checkout_session_id, tier, status, created_at, redeemed_at, redeemed_by_user_id
- **Planned:** Ecosystems (Families), Cycles (Growth Logs), Communities, Micro-Cycles

### Data Model (TypeScript)

All types defined in `src/types.ts`. Key interfaces:
- `FamilyMember` — includes `harvestHistory`, `sowLog`, `knowledgeLog`, `questionMap`, `experienceLog`, `patternJournal`, `notifications`, `chatHistory`, `shelvedProjects`, `customCommunities`
- `GoalsMap` — `Record<DomainKey, Goal>`
- `HarvestRecord` — persisted harvest wisdom + sharing choices
- `TrellisNotification` — `{ id, type, title, message, timestamp, read, domain? }`
- `ToastData` — `{ id, title, message, type, duration? }`
- `NotificationType` — union of 10 event types
- `DBCommunityProject`, `DBInteraction`, `MarketplaceFilters`, `ProjectAnalytics` — community marketplace types
- `ShelvedProject` — saved project state (title, plant, module, logs, chat history)
- `UserCommunity` — `{ id, name, iconKey: string, type, isDefault }` — serializable community definition
- `SparkResult` — `{ suggestedTitle, suggestedDomains, suggestedArchetype, domainRationale, archetypeRationale }`
- `RefinementResponse` — `{ text, refinedGoal?, suggestedTitle? }` — returned by `refineSparkGoal()`
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
- AI mentor requires `VITE_GEMINI_API_KEY` — falls back to mock keyword matching when not set
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

**Phase 3: The Bloom (complete)** — ~~Real AI for The Guide~~, ~~Guide personality~~, ~~Spark Architect~~, ~~PWA~~, ~~push notifications~~, ~~payments~~

**Phase 3.5: Payments Go-Live (pending setup)** — Stripe Dashboard (product + prices + portal + webhook), DB migration (6 columns + gift_subscriptions table + RLS), Vercel env vars (STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, SUPABASE_SERVICE_ROLE_KEY, VITE_STRIPE_*), fill .env locally, deploy + test with Stripe test mode

**Phase 4: The Fruit (complete)** — ~~Community marketplace~~, ~~content publishing~~, ~~analytics dashboards~~, ~~DB-backed interactions~~, ~~project views tracking~~

**Phase 4.5: UX Polish (complete)** — ~~12-hour time format~~, ~~AI-generated project titles~~, ~~dashboard inline editing~~, ~~shelved projects~~, ~~3-project limit~~

**Phase 5: Guided Discovery (complete)** — ~~Guided goal refinement with The Guide in Seed Discovery~~, ~~SparkRefinement inline chat component~~, ~~Auto-trigger Spark Architect after refinement~~

**Phase 5.5: Customizable Communities (complete)** — ~~User-managed community list~~, ~~CommunitySettingsModal with icon picker~~, ~~Quick-add in Seed Discovery Step 5~~, ~~Private Greenhouse always present~~, ~~DB persistence~~

**Phase 6: Task Import (complete)** — ~~Todoist OAuth import~~, ~~Photo-to-tasks via Gemini multimodal~~, ~~ImportTasksModal with two tabs~~, ~~Serverless token exchange~~, ~~Graceful degradation when APIs not configured~~

**DB migration required for Phase 4:** 3 new tables (`community_projects`, `community_interactions`, `project_views`) with RLS, triggers, and indexes. See migration SQL in project docs.

**DB migration required for shelved projects:** `ALTER TABLE profiles ADD COLUMN IF NOT EXISTS shelved_projects jsonb DEFAULT '[]'::jsonb;`

**DB migration required for custom communities (done):** `ALTER TABLE profiles ADD COLUMN IF NOT EXISTS custom_communities jsonb DEFAULT NULL;`

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
- **Database columns on `profiles`:** id, name, role, goals, project_title, project_plant, project_impact_vectors, current_module, project_visibility, project_ethics_check, project_sharing_scope, tasks, schedule, harvest_history, sow_log, knowledge_log, question_map, experience_log, pattern_journal, notifications, chat_history, shelved_projects, custom_communities, trial_start, subscription_status, stripe_customer_id, stripe_subscription_id, subscription_tier, subscription_current_period_end
- **Additional tables:** community_projects, community_interactions, project_views, gift_subscriptions

## Technical Document

The primary source is `docs/Trellis_Technical_Manifesto.md.txt`. See also `docs/Gem Summary.txt` for the confirmed product vision.
