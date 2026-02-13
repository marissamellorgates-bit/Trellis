import { supabase } from './supabase';
import type { FamilyInfo, FamilyInvite, FamilyMember, ManagedChildSummary, GoalsMap, DomainKey, PlantArchetype, UserCommunity, SubscriptionStatus } from '../types';

async function getAuthToken(): Promise<string> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.access_token) throw new Error('Not authenticated');
  return session.access_token;
}

export async function createFamily(name?: string): Promise<{ familyId: string; joinCode: string; name: string }> {
  const token = await getAuthToken();
  const res = await fetch('/api/family-create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to create family');
  }
  return res.json();
}

export async function inviteFamilyMember(email: string): Promise<{ success: boolean; inviteId: string }> {
  const token = await getAuthToken();
  const res = await fetch('/api/family-invite', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to send invite');
  }
  return res.json();
}

export async function joinFamily(joinCode: string): Promise<{ familyId: string; familyName: string; leaderName: string }> {
  const token = await getAuthToken();
  const res = await fetch('/api/family-join', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ joinCode }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to join family');
  }
  return res.json();
}

export async function checkPendingInvite(): Promise<{ familyId: string; familyName: string; leaderName: string } | null> {
  const token = await getAuthToken();
  const res = await fetch('/api/family-join', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({}),
  });
  if (!res.ok) return null;
  return res.json();
}

export async function loadFamilyMembers(defaultGoals: GoalsMap): Promise<FamilyMember[]> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*');

  if (error || !data) return [];

  return data.map((row: Record<string, unknown>) => ({
    id: 1,
    supabaseId: (row.id as string) || undefined,
    name: (row.name as string) || '',
    role: (row.role as string) || 'Project Cultivator',
    goals: rehydrateGoals((row.goals as Record<string, { completed: number; total: number }>) || {}, defaultGoals),
    projectTitle: (row.project_title as string) || '',
    projectPlant: (row.project_plant as PlantArchetype) || 'sunflower',
    projectImpactVectors: (row.project_impact_vectors as DomainKey[]) || [],
    currentModule: (row.current_module as number) || 1,
    projectVisibility: (row.project_visibility as string[]) || [],
    projectEthicsCheck: (row.project_ethics_check as FamilyMember['projectEthicsCheck']) ?? undefined,
    projectSharingScope: (row.project_sharing_scope as string[]) ?? ['private'],
    tasks: (row.tasks as FamilyMember['tasks']) || [],
    schedule: (row.schedule as FamilyMember['schedule']) || [],
    harvestHistory: (row.harvest_history as FamilyMember['harvestHistory']) || [],
    sowLog: (row.sow_log as FamilyMember['sowLog']) || [],
    knowledgeLog: (row.knowledge_log as FamilyMember['knowledgeLog']) || [],
    questionMap: (row.question_map as FamilyMember['questionMap']) || [],
    experienceLog: (row.experience_log as FamilyMember['experienceLog']) || [],
    patternJournal: (row.pattern_journal as FamilyMember['patternJournal']) || [],
    notifications: (row.notifications as FamilyMember['notifications']) || [],
    chatHistory: (row.chat_history as FamilyMember['chatHistory']) ?? [],
    shelvedProjects: (row.shelved_projects as FamilyMember['shelvedProjects']) ?? [],
    customCommunities: (row.custom_communities as UserCommunity[]) ?? undefined,
    familyId: (row.family_id as string) ?? undefined,
    familyRole: (row.family_role as 'leader' | 'member') ?? undefined,
    isManagedChild: (row.is_managed_child as boolean) ?? false,
    managedByUserId: (row.managed_by_user_id as string) ?? undefined,
    childSlug: (row.child_slug as string) ?? undefined,
    trialStart: (row.trial_start as string) ?? undefined,
    subscriptionStatus: (row.subscription_status as SubscriptionStatus) ?? 'trialing',
    stripeCustomerId: (row.stripe_customer_id as string) ?? undefined,
    stripeSubscriptionId: (row.stripe_subscription_id as string) ?? undefined,
    subscriptionTier: (row.subscription_tier as string) ?? undefined,
    subscriptionCurrentPeriodEnd: (row.subscription_current_period_end as string) ?? undefined,
  }));
}

export async function loadFamilyInfo(): Promise<FamilyInfo | null> {
  const { data, error } = await supabase
    .from('families')
    .select('id, name, join_code, leader_id')
    .limit(1)
    .single();

  if (error || !data) return null;

  return {
    id: data.id,
    name: data.name,
    joinCode: data.join_code,
    leaderId: data.leader_id,
  };
}

export async function loadFamilyInvites(familyId: string): Promise<FamilyInvite[]> {
  const { data, error } = await supabase
    .from('family_invites')
    .select('id, email, status, created_at')
    .eq('family_id', familyId)
    .order('created_at', { ascending: false });

  if (error || !data) return [];

  return data.map(row => ({
    id: row.id,
    email: row.email,
    status: row.status,
    createdAt: row.created_at,
  }));
}

export async function leaveFamily(userId: string): Promise<void> {
  const { error } = await supabase
    .from('profiles')
    .update({ family_id: null, family_role: 'member' })
    .eq('id', userId);

  if (error) throw new Error('Failed to leave family');
}

export async function addManagedChild(childName: string, pin: string): Promise<ManagedChildSummary> {
  const token = await getAuthToken();
  const res = await fetch('/api/family-add-child', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ childName, pin }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to add child');
  }
  return res.json();
}

export async function removeManagedChild(childUserId: string): Promise<void> {
  const token = await getAuthToken();
  const res = await fetch('/api/family-remove-child', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ childUserId }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to remove child');
  }
}

export async function listFamilyChildren(joinCode: string): Promise<ManagedChildSummary[]> {
  const res = await fetch(`/api/family-children?code=${encodeURIComponent(joinCode)}`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.children || [];
}

export async function loadManagedChildren(): Promise<ManagedChildSummary[]> {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, name, child_slug')
    .eq('is_managed_child', true);

  if (error || !data) return [];

  return data.map((row: Record<string, unknown>) => ({
    userId: row.id as string,
    name: (row.name as string) || '',
    slug: (row.child_slug as string) || '',
  }));
}

function rehydrateGoals(row: Record<string, { completed: number; total: number }>, defaults: GoalsMap): GoalsMap {
  const goals = { ...defaults };
  for (const key of Object.keys(defaults) as DomainKey[]) {
    if (row[key]) {
      goals[key] = { ...defaults[key], completed: row[key].completed, total: row[key].total };
    }
  }
  return goals;
}
