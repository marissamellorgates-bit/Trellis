import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

function generateSlug(name: string): string {
  const sanitized = name.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 10) || 'kid';
  const chars = 'abcdefghjklmnpqrstuvwxyz23456789';
  let suffix = '';
  for (let i = 0; i < 4; i++) {
    suffix += chars[Math.floor(Math.random() * chars.length)];
  }
  return `${sanitized}-${suffix}`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing auth token' });
  }

  const token = authHeader.slice(7);
  const { data: { user }, error: authError } = await supabase.auth.getUser(token);
  if (authError || !user) {
    return res.status(401).json({ error: 'Invalid auth token' });
  }

  const { childName, pin } = req.body || {};

  if (!childName || typeof childName !== 'string' || !childName.trim()) {
    return res.status(400).json({ error: 'Child name is required' });
  }

  if (!pin || typeof pin !== 'string' || !/^\d{4}$/.test(pin)) {
    return res.status(400).json({ error: 'PIN must be exactly 4 digits' });
  }

  // Check parent has a family
  const { data: profile } = await supabase
    .from('profiles')
    .select('family_id, family_role')
    .eq('id', user.id)
    .single();

  if (!profile?.family_id) {
    return res.status(400).json({ error: 'You must create a family first' });
  }

  // Check max 5 managed children
  const { count } = await supabase
    .from('profiles')
    .select('id', { count: 'exact', head: true })
    .eq('managed_by_user_id', user.id)
    .eq('is_managed_child', true);

  if ((count ?? 0) >= 5) {
    return res.status(400).json({ error: 'Maximum 5 managed children per parent' });
  }

  // Generate unique slug
  let slug = generateSlug(childName.trim());
  let attempts = 0;
  while (attempts < 5) {
    const { data: existing } = await supabase
      .from('profiles')
      .select('id')
      .eq('child_slug', slug)
      .single();
    if (!existing) break;
    slug = generateSlug(childName.trim());
    attempts++;
  }

  const syntheticEmail = `${slug}.kid@trellis.app`;
  const password = `trellis-${pin}`;

  // Create auth user (no email confirmation)
  const { data: newUser, error: createUserError } = await supabase.auth.admin.createUser({
    email: syntheticEmail,
    password,
    email_confirm: true,
    user_metadata: { name: childName.trim(), is_managed_child: true },
  });

  if (createUserError || !newUser.user) {
    console.error('Failed to create child user:', createUserError);
    return res.status(500).json({ error: 'Failed to create child account' });
  }

  const childUserId = newUser.user.id;

  // Create profile row
  const { error: profileError } = await supabase
    .from('profiles')
    .upsert({
      id: childUserId,
      name: childName.trim(),
      role: 'Project Cultivator',
      family_id: profile.family_id,
      family_role: 'member',
      is_managed_child: true,
      managed_by_user_id: user.id,
      child_slug: slug,
      subscription_status: 'active',
      goals: {},
      tasks: [],
      schedule: [],
      harvest_history: [],
      sow_log: [],
      knowledge_log: [],
      question_map: [],
      experience_log: [],
      pattern_journal: [],
      notifications: [],
      chat_history: [],
      shelved_projects: [],
      project_title: '',
      project_plant: 'sunflower',
      project_impact_vectors: [],
      current_module: 1,
      project_visibility: [],
      project_sharing_scope: ['private'],
    });

  if (profileError) {
    console.error('Failed to create child profile:', profileError);
    // Clean up auth user
    await supabase.auth.admin.deleteUser(childUserId);
    return res.status(500).json({ error: 'Failed to create child profile' });
  }

  return res.status(200).json({
    userId: childUserId,
    name: childName.trim(),
    slug,
  });
}
