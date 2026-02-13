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

  // Check if user already has a family
  const { data: profile } = await supabase
    .from('profiles')
    .select('family_id')
    .eq('id', user.id)
    .single();

  if (profile?.family_id) {
    return res.status(400).json({ error: 'You already belong to a family' });
  }

  const { joinCode } = req.body || {};

  let familyId: string | null = null;
  let familyName = '';
  let leaderName = '';

  if (joinCode && typeof joinCode === 'string') {
    // Join by code
    const { data: family } = await supabase
      .from('families')
      .select('id, name, leader_id')
      .eq('join_code', joinCode.toUpperCase().trim())
      .single();

    if (!family) {
      return res.status(404).json({ error: 'Invalid join code' });
    }

    familyId = family.id;
    familyName = family.name;

    // Get leader name
    const { data: leader } = await supabase
      .from('profiles')
      .select('name')
      .eq('id', family.leader_id)
      .single();

    leaderName = leader?.name || 'Unknown';

    // Check for matching pending invite and accept it
    await supabase
      .from('family_invites')
      .update({ status: 'accepted' })
      .eq('family_id', familyId)
      .eq('email', user.email?.toLowerCase())
      .eq('status', 'pending');
  } else {
    // Try to auto-join by pending invite email match
    const userEmail = user.email?.toLowerCase();
    if (!userEmail) {
      return res.status(400).json({ error: 'Join code is required' });
    }

    const { data: invite } = await supabase
      .from('family_invites')
      .select('id, family_id')
      .eq('email', userEmail)
      .eq('status', 'pending')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (!invite) {
      return res.status(400).json({ error: 'Join code is required' });
    }

    familyId = invite.family_id;

    // Mark invite as accepted
    await supabase
      .from('family_invites')
      .update({ status: 'accepted' })
      .eq('id', invite.id);

    // Get family info
    const { data: family } = await supabase
      .from('families')
      .select('name, leader_id')
      .eq('id', familyId)
      .single();

    familyName = family?.name || 'Family';

    const { data: leader } = await supabase
      .from('profiles')
      .select('name')
      .eq('id', family?.leader_id)
      .single();

    leaderName = leader?.name || 'Unknown';
  }

  // Update user's profile
  const { error: updateError } = await supabase
    .from('profiles')
    .update({ family_id: familyId, family_role: 'member' })
    .eq('id', user.id);

  if (updateError) {
    console.error('Failed to join family:', updateError);
    return res.status(500).json({ error: 'Failed to join family' });
  }

  return res.status(200).json({ familyId, familyName, leaderName });
}
