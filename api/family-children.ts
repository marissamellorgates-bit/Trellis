import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const code = req.query.code as string;
  if (!code || typeof code !== 'string') {
    return res.status(400).json({ error: 'Join code is required' });
  }

  // Look up family by join code
  const { data: family, error: familyError } = await supabase
    .from('families')
    .select('id')
    .eq('join_code', code.toUpperCase())
    .single();

  if (familyError || !family) {
    return res.status(404).json({ error: 'Family not found' });
  }

  // Get managed children in this family
  const { data: children, error: childrenError } = await supabase
    .from('profiles')
    .select('id, name, child_slug')
    .eq('family_id', family.id)
    .eq('is_managed_child', true);

  if (childrenError) {
    return res.status(500).json({ error: 'Failed to load children' });
  }

  return res.status(200).json({
    children: (children || []).map(c => ({
      userId: c.id,
      name: c.name,
      slug: c.child_slug,
    })),
  });
}
