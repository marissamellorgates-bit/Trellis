import type { FamilyMember, SubscriptionStatus } from '../types';

// ── Configuration ────────────────────────────────────────────

const TRIAL_DAYS = 14;

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const monthlyPriceId = import.meta.env.VITE_STRIPE_MONTHLY_PRICE_ID;
const annualPriceId = import.meta.env.VITE_STRIPE_ANNUAL_PRICE_ID;

export const stripeConfigured = !!(stripePublishableKey && monthlyPriceId && annualPriceId);

export const PRICE_IDS = {
  monthly: monthlyPriceId || '',
  annual: annualPriceId || '',
} as const;

// ── Subscription Info ────────────────────────────────────────

export interface SubscriptionInfo {
  status: SubscriptionStatus;
  trialDaysRemaining: number;
  hasActiveAccess: boolean;
  tier: string | null;
}

export function getSubscriptionInfo(member: FamilyMember): SubscriptionInfo {
  const status = member.subscriptionStatus ?? 'trialing';
  const tier = member.subscriptionTier ?? null;

  // Calculate trial days remaining
  let trialDaysRemaining = 0;
  if (status === 'trialing' && member.trialStart) {
    const trialStart = new Date(member.trialStart);
    const now = new Date();
    const elapsed = Math.floor((now.getTime() - trialStart.getTime()) / (1000 * 60 * 60 * 24));
    trialDaysRemaining = Math.max(0, TRIAL_DAYS - elapsed);
  } else if (status === 'trialing' && !member.trialStart) {
    // No trial_start set yet — treat as full trial
    trialDaysRemaining = TRIAL_DAYS;
  }

  // Determine access
  const hasActiveAccess =
    status === 'active' ||
    status === 'past_due' ||
    (status === 'trialing' && trialDaysRemaining > 0);

  return { status, trialDaysRemaining, hasActiveAccess, tier };
}

// ── API Wrappers ─────────────────────────────────────────────

export async function createCheckoutSession(
  userId: string,
  email: string,
  priceId: string,
  giftRecipientEmail?: string
): Promise<string> {
  const res = await fetch('/api/create-checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, email, priceId, giftRecipientEmail }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Checkout failed' }));
    throw new Error(err.error || 'Checkout failed');
  }
  const { url } = await res.json();
  return url;
}

export async function createPortalSession(stripeCustomerId: string): Promise<string> {
  const res = await fetch('/api/create-portal', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ stripeCustomerId }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Portal failed' }));
    throw new Error(err.error || 'Portal failed');
  }
  const { url } = await res.json();
  return url;
}

export async function redeemGift(giftId: string, userId: string, email: string): Promise<void> {
  const res = await fetch('/api/redeem-gift', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ giftId, userId, email }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Redeem failed' }));
    throw new Error(err.error || 'Redeem failed');
  }
}
