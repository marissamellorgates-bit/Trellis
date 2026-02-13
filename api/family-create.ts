import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

function generateJoinCode(): string {
  const words = ['GROVE', 'BLOOM', 'ROOTS', 'SEEDS', 'VINES', 'OASIS', 'FIELD', 'HAVEN'];
  const word = words[Math.floor(Math.random() * words.length)];
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let suffix = '';
  for (let i = 0; i < 4; i++) {
    suffix += chars[Math.floor(Math.random() * chars.length)];
  }
  return `${word}-${suffix}`;
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

  const { name } = req.body || {};
  const familyName = (name as string)?.trim() || 'My Family';

  // Check if user already has a family
  const { data: profile } = await supabase
    .from('profiles')
    .select('family_id')
    .eq('id', user.id)
    .single();

  if (profile?.family_id) {
    return res.status(400).json({ error: 'You already belong to a family' });
  }

  // Generate unique join code (retry on collision)
  let joinCode = generateJoinCode();
  let attempts = 0;
  while (attempts < 5) {
    const { data: existing } = await supabase
      .from('families')
      .select('id')
      .eq('join_code', joinCode)
      .single();

    if (!existing) break;
    joinCode = generateJoinCode();
    attempts++;
  }

  // Create family
  const { data: family, error: createError } = await supabase
    .from('families')
    .insert({ leader_id: user.id, name: familyName, join_code: joinCode })
    .select()
    .single();

  if (createError || !family) {
    console.error('Failed to create family:', createError);
    return res.status(500).json({ error: 'Failed to create family' });
  }

  // Update leader's profile
  const { error: updateError } = await supabase
    .from('profiles')
    .update({ family_id: family.id, family_role: 'leader' })
    .eq('id', user.id);

  if (updateError) {
    console.error('Failed to update profile:', updateError);
    return res.status(500).json({ error: 'Family created but profile update failed' });
  }

  return res.status(200).json({
    familyId: family.id,
    joinCode: family.join_code,
    name: family.name,
  });
}
