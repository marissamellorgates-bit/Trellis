import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-01-28.clover' });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId, email, priceId, giftRecipientEmail } = req.body;

  if (!userId || !email || !priceId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Look up or create Stripe customer
    const existing = await stripe.customers.list({ email, limit: 1 });
    let customer: Stripe.Customer;
    if (existing.data.length > 0) {
      customer = existing.data[0];
    } else {
      customer = await stripe.customers.create({
        email,
        metadata: { supabase_user_id: userId },
      });
    }

    const isGift = !!giftRecipientEmail;
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      customer: customer.id,
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:5173'}?checkout=success`,
      cancel_url: `${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:5173'}?checkout=cancel`,
      metadata: {
        supabase_user_id: userId,
        ...(isGift ? { gift_recipient_email: giftRecipientEmail, is_gift: 'true' } : {}),
      },
    };

    // Only add trial for non-gift, non-existing subscriptions
    if (!isGift) {
      sessionParams.subscription_data = {
        trial_period_days: 0, // No additional trial — trial is tracked via Supabase
        metadata: { supabase_user_id: userId },
      };
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Checkout error:', err);
    const message = err instanceof Error ? err.message : 'Checkout failed';
    return res.status(500).json({ error: message });
  }
}
