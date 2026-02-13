import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

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

  const { childUserId } = req.body || {};
  if (!childUserId || typeof childUserId !== 'string') {
    return res.status(400).json({ error: 'childUserId is required' });
  }

  // Verify parent owns this child
  const { data: child } = await supabase
    .from('profiles')
    .select('id, managed_by_user_id, is_managed_child')
    .eq('id', childUserId)
    .single();

  if (!child || !child.is_managed_child || child.managed_by_user_id !== user.id) {
    return res.status(403).json({ error: 'Not authorized to remove this child' });
  }

  // Archive any community projects
  await supabase
    .from('community_projects')
    .update({ status: 'archived' })
    .eq('user_id', childUserId)
    .eq('status', 'published');

  // Delete profile
  const { error: deleteProfileError } = await supabase
    .from('profiles')
    .delete()
    .eq('id', childUserId);

  if (deleteProfileError) {
    console.error('Failed to delete child profile:', deleteProfileError);
    return res.status(500).json({ error: 'Failed to remove child profile' });
  }

  // Delete auth user
  const { error: deleteUserError } = await supabase.auth.admin.deleteUser(childUserId);
  if (deleteUserError) {
    console.error('Failed to delete child auth user:', deleteUserError);
    // Profile is already deleted, auth user is orphaned but not blocking
  }

  return res.status(200).json({ success: true });
}
