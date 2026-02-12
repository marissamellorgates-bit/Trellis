import { createClient } from '@supabase/supabase-js';
import type { GoalsMap, DomainKey, FamilyMember, PlantArchetype, SubscriptionStatus } from '../types';

// ── Supabase Client ──────────────────────────────────────────

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabaseConfigured = !!(url && key);

export const supabase = createClient(
  url || 'https://placeholder.supabase.co',
  key || 'placeholder-key'
);

// ── DB Row Shape ─────────────────────────────────────────────

// What we store per domain in the DB (no icon/label/goal — those are code constants)
interface GoalRow {
  completed: number;
  total: number;
}

type GoalsRow = Partial<Record<DomainKey, GoalRow>>;

interface ProfileRow {
  id: string;
  name: string;
  role: string;
  goals: GoalsRow;
  project_title: string;
  project_plant: PlantArchetype;
  project_impact_vectors: DomainKey[];
  current_module: number;
  project_visibility: string[];
  project_ethics_check: FamilyMember['projectEthicsCheck'] | null;
  project_sharing_scope: string[];
  tasks: FamilyMember['tasks'];
  schedule: FamilyMember['schedule'];
  harvest_history: FamilyMember['harvestHistory'];
  sow_log: FamilyMember['sowLog'];
  knowledge_log: FamilyMember['knowledgeLog'];
  question_map: FamilyMember['questionMap'];
  experience_log: FamilyMember['experienceLog'];
  pattern_journal: FamilyMember['patternJournal'];
  notifications: FamilyMember['notifications'];
  chat_history: FamilyMember['chatHistory'];
  trial_start: string | null;
  subscription_status: SubscriptionStatus | null;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  subscription_tier: string | null;
  subscription_current_period_end: string | null;
}

// ── Serialization Helpers ────────────────────────────────────

/** Strip icon/label/goal from GoalsMap for DB storage */
function goalsToRow(goals: GoalsMap): GoalsRow {
  const row: GoalsRow = {};
  for (const key of Object.keys(goals) as DomainKey[]) {
    row[key] = { completed: goals[key].completed, total: goals[key].total };
  }
  return row;
}

/** Rehydrate DB goals with code-constant icon/label/goal */
function rowToGoals(row: GoalsRow, defaults: GoalsMap): GoalsMap {
  const goals = { ...defaults };
  for (const key of Object.keys(defaults) as DomainKey[]) {
    if (row[key]) {
      goals[key] = { ...defaults[key], completed: row[key].completed, total: row[key].total };
    }
  }
  return goals;
}

// ── Public API ───────────────────────────────────────────────

/** Load a profile from DB and merge with DEFAULT_GOALS constants */
export async function loadProfile(
  userId: string,
  defaultGoals: GoalsMap
): Promise<FamilyMember | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error || !data) return null;

  const row = data as ProfileRow;

  return {
    id: 1, // local UI still uses numeric id
    name: row.name || '',
    role: row.role || 'Project Cultivator',
    goals: rowToGoals(row.goals || {}, defaultGoals),
    projectTitle: row.project_title || '',
    projectPlant: row.project_plant || 'sunflower',
    projectImpactVectors: row.project_impact_vectors || [],
    currentModule: row.current_module || 1,
    projectVisibility: row.project_visibility || [],
    projectEthicsCheck: row.project_ethics_check ?? undefined,
    projectSharingScope: row.project_sharing_scope ?? ['private'],
    tasks: row.tasks || [],
    schedule: row.schedule || [],
    harvestHistory: row.harvest_history || [],
    sowLog: row.sow_log || [],
    knowledgeLog: row.knowledge_log || [],
    questionMap: row.question_map || [],
    experienceLog: row.experience_log || [],
    patternJournal: row.pattern_journal || [],
    notifications: row.notifications || [],
    chatHistory: row.chat_history ?? [],
    trialStart: row.trial_start ?? undefined,
    subscriptionStatus: row.subscription_status ?? 'trialing',
    stripeCustomerId: row.stripe_customer_id ?? undefined,
    stripeSubscriptionId: row.stripe_subscription_id ?? undefined,
    subscriptionTier: row.subscription_tier ?? undefined,
    subscriptionCurrentPeriodEnd: row.subscription_current_period_end ?? undefined,
  };
}

/** Save partial member updates to the DB. Fire-and-forget. */
export async function saveProfile(
  userId: string,
  updates: Partial<FamilyMember>
): Promise<void> {
  // Map FamilyMember field names → DB column names
  const row: Record<string, unknown> = {};

  if (updates.name !== undefined) row.name = updates.name;
  if (updates.role !== undefined) row.role = updates.role;
  if (updates.goals !== undefined) row.goals = goalsToRow(updates.goals);
  if (updates.projectTitle !== undefined) row.project_title = updates.projectTitle;
  if (updates.projectPlant !== undefined) row.project_plant = updates.projectPlant;
  if (updates.projectImpactVectors !== undefined) row.project_impact_vectors = updates.projectImpactVectors;
  if (updates.currentModule !== undefined) row.current_module = updates.currentModule;
  if (updates.projectVisibility !== undefined) row.project_visibility = updates.projectVisibility;
  if (updates.projectEthicsCheck !== undefined) row.project_ethics_check = updates.projectEthicsCheck;
  if (updates.projectSharingScope !== undefined) row.project_sharing_scope = updates.projectSharingScope;
  if (updates.tasks !== undefined) row.tasks = updates.tasks;
  if (updates.schedule !== undefined) row.schedule = updates.schedule;
  if (updates.harvestHistory !== undefined) row.harvest_history = updates.harvestHistory;
  if (updates.sowLog !== undefined) row.sow_log = updates.sowLog;
  if (updates.knowledgeLog !== undefined) row.knowledge_log = updates.knowledgeLog;
  if (updates.questionMap !== undefined) row.question_map = updates.questionMap;
  if (updates.experienceLog !== undefined) row.experience_log = updates.experienceLog;
  if (updates.patternJournal !== undefined) row.pattern_journal = updates.patternJournal;
  if (updates.notifications !== undefined) row.notifications = updates.notifications;
  if (updates.chatHistory !== undefined) row.chat_history = updates.chatHistory;
  if (updates.trialStart !== undefined) row.trial_start = updates.trialStart;
  if (updates.subscriptionStatus !== undefined) row.subscription_status = updates.subscriptionStatus;
  if (updates.stripeCustomerId !== undefined) row.stripe_customer_id = updates.stripeCustomerId;
  if (updates.stripeSubscriptionId !== undefined) row.stripe_subscription_id = updates.stripeSubscriptionId;
  if (updates.subscriptionTier !== undefined) row.subscription_tier = updates.subscriptionTier;
  if (updates.subscriptionCurrentPeriodEnd !== undefined) row.subscription_current_period_end = updates.subscriptionCurrentPeriodEnd;

  if (Object.keys(row).length === 0) return;

  const { error } = await supabase
    .from('profiles')
    .upsert({ id: userId, ...row });

  if (error) {
    console.error('Failed to save profile:', error.message);
  }
}
