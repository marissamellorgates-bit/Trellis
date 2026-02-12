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

  const { giftId, userId, email } = req.body;

  if (!giftId || !userId || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Fetch gift
    const { data: gift, error: giftError } = await supabase
      .from('gift_subscriptions')
      .select('*')
      .eq('id', giftId)
      .single();

    if (giftError || !gift) {
      return res.status(404).json({ error: 'Gift not found' });
    }

    if (gift.status !== 'pending') {
      return res.status(400).json({ error: 'Gift has already been redeemed' });
    }

    if (gift.recipient_email.toLowerCase() !== email.toLowerCase()) {
      return res.status(403).json({ error: 'This gift is for a different email address' });
    }

    // Mark gift as redeemed
    await supabase.from('gift_subscriptions').update({
      status: 'redeemed',
      redeemed_at: new Date().toISOString(),
      redeemed_by_user_id: userId,
    }).eq('id', giftId);

    // Activate the recipient's subscription
    // Duration: monthly = 30 days, annual = 365 days
    const durationDays = gift.tier === 'annual' ? 365 : 30;
    const periodEnd = new Date();
    periodEnd.setDate(periodEnd.getDate() + durationDays);

    await supabase.from('profiles').update({
      subscription_status: 'active',
      subscription_tier: gift.tier,
      subscription_current_period_end: periodEnd.toISOString(),
    }).eq('id', userId);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Redeem gift error:', err);
    const message = err instanceof Error ? err.message : 'Redeem failed';
    return res.status(500).json({ error: message });
  }
}
