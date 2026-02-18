import type { LucideIcon } from 'lucide-react';

// ── Domain Model ──────────────────────────────────────────────

export type DomainKey =
  // Land — Soil / Vine / Canopy
  | 'biological' | 'mentalClarity' | 'environmentalOrder'
  | 'coreCompetencies' | 'experimentalTendrils' | 'reflectiveSynthesis'
  | 'passiveRestoration' | 'activePlay' | 'solitude'
  // Sea — Harbor / Trade Winds / Horizon
  | 'innerCircle' | 'socialCommunion' | 'safePort'
  | 'professionalExchange' | 'marketRealities' | 'instructionalCurrent'
  | 'networking' | 'culturalImmersion' | 'publicReputation'
  // Sky — Ascent / Atmosphere / Navigation
  | 'creativeFlow' | 'physicalExhilaration' | 'aweAndWonder'
  | 'radicalImagination' | 'beautyExploration' | 'emotionalRelease'
  | 'spiritualPurpose' | 'lifeVision' | 'purePlay';

export type MetaDomain = 'land' | 'sea' | 'sky';

export interface Goal {
  completed: number;
  total: number;
  label: string;
  icon: LucideIcon;
  goal: string;
}

export type GoalsMap = Record<DomainKey, Goal>;

export interface DomainSubGroup {
  name: string;
  subtitle: string;
  keys: DomainKey[];
}

export interface DomainConfig {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  color: string;
  bg: string;
  keys: DomainKey[];
  groups?: DomainSubGroup[];
}

// ── Task & Schedule ───────────────────────────────────────────

export interface Task {
  id: number;
  title: string;
  domain: DomainKey | string;
  isProjectRelated: boolean;
  done: boolean;
  due: string;
  estimatedMinutes?: number;
}

export interface ScheduleItem {
  time: string;
  title: string;
  type: 'block' | 'event' | 'bio' | 'project';
  source?: 'manual' | 'ics' | 'google';
  sourceId?: string;
  date?: string;
  description?: string;
}

// ── Plant & Project ───────────────────────────────────────────

export type PlantArchetype =
  // Visionary (Sky) — Beautiful Flowers
  | 'sunflower' | 'rose' | 'orchid' | 'cherryBlossom' | 'lotus' | 'birdOfParadise'
  // Builder (Sea) — Trees
  | 'oak' | 'apple' | 'maple' | 'pine' | 'redwood' | 'olive'
  // Survivor (Land) — Medicine & Herbs
  | 'lavender' | 'aloe' | 'chamomile' | 'sage' | 'echinacea' | 'ginseng';

export type ArchetypeCategory = 'visionary' | 'builder' | 'survivor';

export interface ArchetypeInfo {
  type: PlantArchetype;
  category: ArchetypeCategory;
  name: string;
  description: string;
  icon: string;
}

export const ARCHETYPE_INFO: ArchetypeInfo[] = [
  // Visionary — Sky (Beautiful Flowers)
  { type: 'sunflower', category: 'visionary', name: 'The Visionary', description: 'Creativity — turns to face the light', icon: '🌻' },
  { type: 'rose', category: 'visionary', name: 'The Explorer', description: 'Wonder — beauty found through thorns', icon: '🌹' },
  { type: 'orchid', category: 'visionary', name: 'The Alchemist', description: 'Imagination — exotic transformation', icon: '🪻' },
  { type: 'cherryBlossom', category: 'visionary', name: 'The Artist', description: 'Beauty — fleeting perfection', icon: '🌸' },
  { type: 'lotus', category: 'visionary', name: 'The Enlightened', description: 'Spirit — rises from darkness, awakening', icon: '🪷' },
  { type: 'birdOfParadise', category: 'visionary', name: 'The Dreamer', description: 'Vision — dramatic, reaching skyward', icon: '🧡' },
  // Builder — Sea (Trees)
  { type: 'oak', category: 'builder', name: 'The Builder', description: 'Family — the gathering tree, shelter', icon: '🌳' },
  { type: 'apple', category: 'builder', name: 'The Provider', description: 'Village — communal harvest, shared abundance', icon: '🍎' },
  { type: 'maple', category: 'builder', name: 'The Strategist', description: 'Finances — valuable resources', icon: '🍁' },
  { type: 'pine', category: 'builder', name: 'The Sentinel', description: 'Opportunity — evergreen, always ready', icon: '🌲' },
  { type: 'redwood', category: 'builder', name: 'The Networker', description: 'Connections — interconnected root systems', icon: '🏔️' },
  { type: 'olive', category: 'builder', name: 'The Diplomat', description: 'Culture — ancient heritage, symbol of peace', icon: '🫒' },
  // Survivor — Land (Medicine & Herbs)
  { type: 'lavender', category: 'survivor', name: 'The Survivor', description: 'Calm — aromatic resilience, soothing spirit', icon: '💜' },
  { type: 'aloe', category: 'survivor', name: 'The Healer', description: 'Restoration — soothing balm, inner clarity', icon: '💚' },
  { type: 'chamomile', category: 'survivor', name: 'The Artisan', description: 'Gentleness — patient healing, golden remedy', icon: '🌼' },
  { type: 'sage', category: 'survivor', name: 'The Contemplator', description: 'Wisdom — cleansing herb, deep reflection', icon: '🍃' },
  { type: 'echinacea', category: 'survivor', name: 'The Warrior', description: 'Defense — immune strength, bold petals', icon: '🌺' },
  { type: 'ginseng', category: 'survivor', name: 'The Hermit', description: 'Patience — deep roots, hidden power', icon: '🫚' },
];

export interface EthicsCheck {
  earth: boolean;
  people: boolean;
  fair: boolean;
}

// ── Harvest & Cycles ──────────────────────────────────────────

export interface HarvestRecord {
  id: number;
  projectTitle: string;
  plant: PlantArchetype;
  wisdom: string;
  sharedWith: string[];
  completedAt: string;
  seedsScattered: string[];
}

export type SowTier = 'drop' | 'tend' | 'mulch' | 'compost';

export interface SowEntry {
  id: number;
  tier: SowTier;
  note: string;
  outcome?: string;
  source?: string;
  insight?: string;
  reflection?: string;
  nextSteps?: string;
  domain: DomainKey | string;
  completedAt: string;
}

export const SOW_TIERS: { tier: SowTier; label: string; description: string; boost: number }[] = [
  { tier: 'drop', label: 'Drop', description: 'A quick thought or observation', boost: 0.25 },
  { tier: 'tend', label: 'Tend', description: 'An action or activity you did', boost: 0.5 },
  { tier: 'mulch', label: 'Mulch', description: 'A deeper research session', boost: 1.0 },
  { tier: 'compost', label: 'Compost', description: 'A whole side quest or journey', boost: 2.0 },
];

// ── Module Workshops ──────────────────────────────────────────

export interface ModuleInfo {
  id: number;
  title: string;
  desc: string;
}

export interface KnowledgeEntry {
  id: number;
  resource: string;
  type: 'book' | 'article' | 'conversation' | 'video' | 'other';
  domains: DomainKey[];
  notes: string;
  addedAt: string;
}

export interface QuestionEntry {
  id: number;
  question: string;
  status: 'open' | 'exploring' | 'answered';
  answer?: string;
}

export interface ExperienceEntry {
  id: number;
  action: string;
  evidence: string;
  outcome: string;
  date: string;
}

export interface PatternEntry {
  id: number;
  pattern: string;
  sources: string;
  insight: string;
}

// ── Community ─────────────────────────────────────────────────

export interface CommunityConfig {
  id: string;
  name: string;
  icon: LucideIcon;
  type: string;
}

export interface UserCommunity {
  id: string;
  name: string;
  iconKey: string;
  type: string;
  isDefault: boolean;
}

export type WateringTier = 'light-rain' | 'steady-rain' | 'downpour' | 'flood';
export type GraftingTier = 'budding' | 'branch-graft' | 'full-graft';

export interface WateringAction {
  tier: WateringTier;
  label: string;
  description: string;
}

export interface GraftingAction {
  tier: GraftingTier;
  label: string;
  description: string;
}

export const WATERING_TIERS: WateringAction[] = [
  { tier: 'light-rain', label: 'Light Rain', description: 'Encouragement — "I see you"' },
  { tier: 'steady-rain', label: 'Steady Rain', description: 'Share a resource (link, book, skill)' },
  { tier: 'downpour', label: 'Downpour', description: 'Commit time/labor to help' },
  { tier: 'flood', label: 'Flood', description: 'Fund the project financially' },
];

export const GRAFTING_TIERS: GraftingAction[] = [
  { tier: 'budding', label: 'Budding', description: 'One-time skill tip or advice' },
  { tier: 'branch-graft', label: 'Branch Graft', description: 'Ongoing mentorship on a sub-goal' },
  { tier: 'full-graft', label: 'Full Graft', description: 'Deep co-growth partnership' },
];

// ── Shelved Projects ─────────────────────────────────────

export interface ShelvedProject {
  id: number;
  title: string;
  plant: PlantArchetype;
  module: number;
  impactVectors: DomainKey[];
  ethicsCheck?: EthicsCheck;
  sharingScope?: string[];
  visibility: string[];
  knowledgeLog: KnowledgeEntry[];
  questionMap: QuestionEntry[];
  experienceLog: ExperienceEntry[];
  patternJournal: PatternEntry[];
  chatHistory: AIMessage[];
  shelvedAt: string;
}

// ── Family & Member ───────────────────────────────────────────

export type SubscriptionStatus = 'trialing' | 'active' | 'past_due' | 'expired' | 'canceled';

export interface FamilyMember {
  id: number;
  supabaseId?: string;
  name: string;
  role: string;
  goals: GoalsMap;
  projectTitle: string;
  projectImpactVectors: DomainKey[];
  currentModule: number;
  projectPlant: PlantArchetype;
  projectVisibility: string[];
  projectEthicsCheck?: EthicsCheck;
  projectSharingScope?: string[];
  tasks: Task[];
  schedule: ScheduleItem[];
  harvestHistory: HarvestRecord[];
  sowLog: SowEntry[];
  knowledgeLog: KnowledgeEntry[];
  questionMap: QuestionEntry[];
  experienceLog: ExperienceEntry[];
  patternJournal: PatternEntry[];
  notifications: TrellisNotification[];
  chatHistory: AIMessage[];
  shelvedProjects: ShelvedProject[];
  customCommunities?: UserCommunity[];
  familyId?: string;
  familyRole?: 'leader' | 'member';
  isManagedChild?: boolean;
  managedByUserId?: string;
  childSlug?: string;
  trialStart?: string;
  subscriptionStatus?: SubscriptionStatus;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  subscriptionTier?: string;
  subscriptionCurrentPeriodEnd?: string;
}

// ── Notifications ──────────────────────────────────────────────

export type NotificationType =
  | 'module_advance'
  | 'harvest_complete'
  | 'sow_logged'
  | 'task_complete'
  | 'schedule_complete'
  | 'calendar_synced'
  | 'imbalance_alert'
  | 'community_interaction'
  | 'project_published'
  | 'system';

export interface TrellisNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  domain?: MetaDomain;
}

export interface ToastData {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  duration?: number;
}

export interface NotificationCenterProps {
  notifications: TrellisNotification[];
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
  onClear: () => void;
  onClose: () => void;
}

// ── AI Mentor ─────────────────────────────────────────────────

export interface AIMessage {
  role: 'ai' | 'user';
  text: string;
  task?: { title: string; domain: string } | null;
}

export interface AIMentorContext {
  title: string;
  plant: PlantArchetype;
  module: number;
  moduleName: string;
}

export interface AIMentorPanelProps {
  isOpen: boolean;
  onClose: () => void;
  context: AIMentorContext;
  onAddTask: (task: { title: string; domain: string }) => void;
  member: FamilyMember;
  domainScores: { land: number; sea: number; sky: number };
  chatHistory: AIMessage[];
  onChatHistoryChange: (messages: AIMessage[]) => void;
}

export interface SparkResult {
  suggestedTitle: string;
  suggestedDomains: DomainKey[];
  suggestedArchetype: PlantArchetype;
  domainRationale: string;
  archetypeRationale: string;
}

// ── Component Props ───────────────────────────────────────────

export interface PlantVisualProps {
  stage: number;
  type: PlantArchetype;
  instanceId?: string;
}

export interface HarvestModalProps {
  isOpen: boolean;
  wisdom: string;
  sharing: string[];
  communities: CommunityConfig[];
  onWisdomChange: (value: string) => void;
  onSharingChange: (communities: string[]) => void;
  onFinalize: () => void;
}

export interface FlowViewProps {
  schedule: ScheduleItem[];
  tasks: Task[];
  goals: GoalsMap;
  onToggleTask: (taskId: number) => void;
  onCompleteScheduleItem: (index: number) => void;
  completedScheduleItems: Set<string>;
  onOpenImport: () => void;
  onOpenImportTasks: () => void;
}

export interface ImportScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (items: ScheduleItem[], googleToken?: string) => void;
  existingSourceIds: Set<string>;
}

// ── DB-backed Community ─────────────────────────────────────

export interface DBCommunityProject {
  id: string;
  user_id: string;
  author_name: string;
  title: string;
  description: string;
  plant: PlantArchetype;
  stage: number;
  status: 'draft' | 'published' | 'archived';
  visibility: string[];
  tags: string[];
  impact_vectors: string[];
  water_count: number;
  graft_count: number;
  view_count: number;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

export interface DBInteraction {
  id: string;
  project_id: string;
  from_user_id: string;
  from_user_name: string;
  type: 'water' | 'graft';
  tier: string;
  message: string;
  created_at: string;
}

export interface MarketplaceFilters {
  search: string;
  archetype: PlantArchetype | null;
  sort: 'newest' | 'most_watered' | 'most_grafted' | 'most_viewed';
}

export interface ProjectAnalytics {
  totalViews: number;
  totalWaterings: number;
  totalGraftings: number;
  viewsByDay: { date: string; count: number }[];
  wateringsByTier: Record<string, number>;
  graftingsByTier: Record<string, number>;
  recentInteractions: DBInteraction[];
}

export interface SowModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (entry: Omit<SowEntry, 'id' | 'completedAt'>) => void;
  domains: DomainKey[];
  goals: GoalsMap;
}

export interface ModuleWorkshopModalProps {
  isOpen: boolean;
  module: number;
  onClose: () => void;
  onAdvance: () => void;
  member: FamilyMember;
  onUpdateMember: (updates: Partial<FamilyMember>) => void;
}

export interface ManagedChildSummary {
  userId: string;
  name: string;
  slug: string;
}

export interface LeaderHubProps {
  currentMember: FamilyMember;
  familyMembers: FamilyMember[];
  onManageChild?: (childUserId: string) => void;
}

// ── Family System ─────────────────────────────────────────────

export interface FamilyInfo {
  id: string;
  name: string;
  joinCode: string;
  leaderId: string;
}

export interface FamilyInvite {
  id: string;
  email: string;
  status: 'pending' | 'accepted' | 'expired';
  createdAt: string;
}
