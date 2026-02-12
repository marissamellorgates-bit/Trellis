import { supabase } from './supabase';
import type {
  DBCommunityProject, DBInteraction, MarketplaceFilters, ProjectAnalytics, PlantArchetype,
} from '../types';

// ── Marketplace Queries ─────────────────────────────────────

export async function fetchMarketplaceProjects(
  filters: MarketplaceFilters
): Promise<DBCommunityProject[]> {
  let query = supabase
    .from('community_projects')
    .select('*')
    .eq('status', 'published');

  if (filters.search) {
    query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%,author_name.ilike.%${filters.search}%`);
  }

  if (filters.archetype) {
    query = query.eq('plant', filters.archetype);
  }

  switch (filters.sort) {
    case 'newest':
      query = query.order('published_at', { ascending: false });
      break;
    case 'most_watered':
      query = query.order('water_count', { ascending: false });
      break;
    case 'most_grafted':
      query = query.order('graft_count', { ascending: false });
      break;
    case 'most_viewed':
      query = query.order('view_count', { ascending: false });
      break;
  }

  query = query.limit(50);

  const { data, error } = await query;
  if (error) {
    console.error('Failed to fetch marketplace projects:', error.message);
    return [];
  }
  return (data ?? []) as DBCommunityProject[];
}

// ── My Projects ─────────────────────────────────────────────

export async function fetchMyProjects(userId: string): Promise<DBCommunityProject[]> {
  const { data, error } = await supabase
    .from('community_projects')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('Failed to fetch my projects:', error.message);
    return [];
  }
  return (data ?? []) as DBCommunityProject[];
}

// ── Upsert Project ──────────────────────────────────────────

export async function upsertProject(
  project: Partial<DBCommunityProject> & { user_id: string; author_name: string; title: string; plant: PlantArchetype; stage: number }
): Promise<DBCommunityProject | null> {
  const { data, error } = await supabase
    .from('community_projects')
    .upsert(project, { onConflict: 'id' })
    .select()
    .single();

  if (error) {
    console.error('Failed to upsert project:', error.message);
    return null;
  }
  return data as DBCommunityProject;
}

// ── Publish / Archive ───────────────────────────────────────

export async function publishProject(projectId: string): Promise<boolean> {
  const { error } = await supabase
    .from('community_projects')
    .update({ status: 'published', published_at: new Date().toISOString() })
    .eq('id', projectId);

  if (error) {
    console.error('Failed to publish project:', error.message);
    return false;
  }
  return true;
}

export async function archiveProject(projectId: string): Promise<boolean> {
  const { error } = await supabase
    .from('community_projects')
    .update({ status: 'archived' })
    .eq('id', projectId);

  if (error) {
    console.error('Failed to archive project:', error.message);
    return false;
  }
  return true;
}

// ── Interactions ─────────────────────────────────────────────

export async function recordInteraction(
  projectId: string,
  fromUserId: string,
  fromUserName: string,
  type: 'water' | 'graft',
  tier: string,
  message?: string
): Promise<boolean> {
  const { error } = await supabase
    .from('community_interactions')
    .insert({
      project_id: projectId,
      from_user_id: fromUserId,
      from_user_name: fromUserName,
      type,
      tier,
      message: message ?? '',
    });

  if (error) {
    console.error('Failed to record interaction:', error.message);
    return false;
  }
  return true;
}

export async function fetchProjectInteractions(
  projectId: string,
  limit = 20
): Promise<DBInteraction[]> {
  const { data, error } = await supabase
    .from('community_interactions')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Failed to fetch interactions:', error.message);
    return [];
  }
  return (data ?? []) as DBInteraction[];
}

// ── Views ────────────────────────────────────────────────────

export async function recordView(
  projectId: string,
  viewerId: string
): Promise<void> {
  // Upsert — unique per project+viewer+day
  await supabase
    .from('project_views')
    .upsert(
      { project_id: projectId, viewer_id: viewerId, viewed_at: new Date().toISOString().slice(0, 10) },
      { onConflict: 'project_id,viewer_id,viewed_at' }
    );
}

// ── Analytics ────────────────────────────────────────────────

export async function fetchProjectAnalytics(
  projectId: string
): Promise<ProjectAnalytics> {
  // Get the project for total counts
  const { data: project } = await supabase
    .from('community_projects')
    .select('water_count, graft_count, view_count')
    .eq('id', projectId)
    .single();

  // Views by day (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const { data: views } = await supabase
    .from('project_views')
    .select('viewed_at')
    .eq('project_id', projectId)
    .gte('viewed_at', thirtyDaysAgo.toISOString().slice(0, 10));

  // Count views by day
  const viewsByDayMap: Record<string, number> = {};
  for (const v of views ?? []) {
    const d = (v as { viewed_at: string }).viewed_at;
    viewsByDayMap[d] = (viewsByDayMap[d] ?? 0) + 1;
  }
  const viewsByDay = Object.entries(viewsByDayMap)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));

  // Interactions breakdown
  const { data: interactions } = await supabase
    .from('community_interactions')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false })
    .limit(50);

  const allInteractions = (interactions ?? []) as DBInteraction[];
  const wateringsByTier: Record<string, number> = {};
  const graftingsByTier: Record<string, number> = {};
  for (const i of allInteractions) {
    if (i.type === 'water') {
      wateringsByTier[i.tier] = (wateringsByTier[i.tier] ?? 0) + 1;
    } else {
      graftingsByTier[i.tier] = (graftingsByTier[i.tier] ?? 0) + 1;
    }
  }

  return {
    totalViews: (project as { view_count: number } | null)?.view_count ?? 0,
    totalWaterings: (project as { water_count: number } | null)?.water_count ?? 0,
    totalGraftings: (project as { graft_count: number } | null)?.graft_count ?? 0,
    viewsByDay,
    wateringsByTier,
    graftingsByTier,
    recentInteractions: allInteractions.slice(0, 20),
  };
}

// ── Sync active project to community_projects ────────────────

export async function syncActiveProject(
  userId: string,
  title: string,
  stage: number
): Promise<void> {
  // Check if user already has a project with this title
  const { data: existing } = await supabase
    .from('community_projects')
    .select('id, status')
    .eq('user_id', userId)
    .eq('title', title)
    .limit(1);

  if (existing && existing.length > 0) {
    // Update stage
    await supabase
      .from('community_projects')
      .update({ stage, updated_at: new Date().toISOString() })
      .eq('id', (existing[0] as { id: string }).id);
  }
  // If no existing project, don't auto-create — user must explicitly publish
}
