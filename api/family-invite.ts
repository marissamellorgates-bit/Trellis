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

  const { email } = req.body || {};
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email is required' });
  }

  // Verify user is a family leader
  const { data: profile } = await supabase
    .from('profiles')
    .select('family_id, family_role')
    .eq('id', user.id)
    .single();

  if (!profile?.family_id || profile.family_role !== 'leader') {
    return res.status(403).json({ error: 'Only family leaders can send invites' });
  }

  // Insert invite
  const { data: invite, error: insertError } = await supabase
    .from('family_invites')
    .insert({
      family_id: profile.family_id,
      email: email.toLowerCase().trim(),
      invited_by: user.id,
    })
    .select()
    .single();

  if (insertError) {
    if (insertError.code === '23505') {
      return res.status(400).json({ error: 'This person has already been invited' });
    }
    console.error('Failed to create invite:', insertError);
    return res.status(500).json({ error: 'Failed to create invite' });
  }

  return res.status(200).json({ success: true, inviteId: invite.id });
}
