import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-01-28.clover' });
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

// Vercel requires raw body for signature verification
export const config = {
  api: { bodyParser: false },
};

async function buffer(readable: VercelRequest): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const rawBody = await buffer(req);
  const sig = req.headers['stripe-signature'] as string;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return res.status(400).json({ error: 'Invalid signature' });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.supabase_user_id;
        const isGift = session.metadata?.is_gift === 'true';

        if (isGift) {
          // Insert gift subscription record
          const recipientEmail = session.metadata?.gift_recipient_email;
          await supabase.from('gift_subscriptions').insert({
            purchaser_user_id: userId,
            recipient_email: recipientEmail,
            stripe_checkout_session_id: session.id,
            tier: session.amount_total && session.amount_total >= 3900 ? 'annual' : 'monthly',
            status: 'pending',
          });
        } else if (userId) {
          // Update the user's profile with Stripe info
          const subscriptionId = session.subscription as string;
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);
          const priceId = subscription.items.data[0]?.price.id;
          const tier = priceId === process.env.VITE_STRIPE_ANNUAL_PRICE_ID ? 'annual' : 'monthly';

          await supabase.from('profiles').update({
            stripe_customer_id: session.customer as string,
            stripe_subscription_id: subscriptionId,
            subscription_status: 'active',
            subscription_tier: tier,
            subscription_current_period_end: new Date(subscription.items.data[0].current_period_end * 1000).toISOString(),
          }).eq('id', userId);
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata?.supabase_user_id;
        if (!userId) break;

        const status = subscription.status === 'active' ? 'active'
          : subscription.status === 'past_due' ? 'past_due'
          : subscription.status === 'canceled' ? 'canceled'
          : subscription.status === 'trialing' ? 'trialing'
          : 'expired';

        const priceId = subscription.items.data[0]?.price.id;
        const tier = priceId === process.env.VITE_STRIPE_ANNUAL_PRICE_ID ? 'annual' : 'monthly';

        await supabase.from('profiles').update({
          subscription_status: status,
          subscription_tier: tier,
          subscription_current_period_end: new Date(subscription.items.data[0].current_period_end * 1000).toISOString(),
        }).eq('id', userId);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata?.supabase_user_id;
        if (!userId) break;

        await supabase.from('profiles').update({
          subscription_status: 'expired',
        }).eq('id', userId);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        const subscriptionRef = invoice.parent?.subscription_details?.subscription;
        const subscriptionId = typeof subscriptionRef === 'string' ? subscriptionRef : subscriptionRef?.id;
        if (!subscriptionId) break;

        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const userId = subscription.metadata?.supabase_user_id;
        if (!userId) break;

        await supabase.from('profiles').update({
          subscription_status: 'past_due',
        }).eq('id', userId);
        break;
      }

      case 'invoice.paid': {
        const invoice = event.data.object as Stripe.Invoice;
        const paidSubRef = invoice.parent?.subscription_details?.subscription;
        const paidSubId = typeof paidSubRef === 'string' ? paidSubRef : paidSubRef?.id;
        if (!paidSubId) break;

        const subscription = await stripe.subscriptions.retrieve(paidSubId);
        const userId = subscription.metadata?.supabase_user_id;
        if (!userId) break;

        await supabase.from('profiles').update({
          subscription_status: 'active',
          subscription_current_period_end: new Date(subscription.items.data[0].current_period_end * 1000).toISOString(),
        }).eq('id', userId);
        break;
      }
    }
  } catch (err) {
    console.error('Webhook handler error:', err);
    return res.status(500).json({ error: 'Webhook handler failed' });
  }

  return res.status(200).json({ received: true });
}
