import { useState } from 'react';
import { Sprout, Check, Gift, LogOut } from 'lucide-react';
import { PRICE_IDS, createCheckoutSession } from '../lib/subscription';

interface PaywallScreenProps {
  userId: string;
  email: string;
  onLogout: () => void;
  onOpenGift: () => void;
}

const PaywallScreen = ({ userId, email, onLogout, onOpenGift }: PaywallScreenProps) => {
  const [loading, setLoading] = useState<'monthly' | 'annual' | null>(null);

  const handleSubscribe = async (tier: 'monthly' | 'annual') => {
    setLoading(tier);
    try {
      const priceId = tier === 'annual' ? PRICE_IDS.annual : PRICE_IDS.monthly;
      const url = await createCheckoutSession(userId, email, priceId);
      window.location.href = url;
    } catch (err) {
      console.error('Checkout error:', err);
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#2c2c2a] flex items-center justify-center px-4">
      <div className="w-full max-w-2xl space-y-8">
        {/* Logo */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-3">
            <Sprout className="text-[#d4af37]" size={32} />
            <h1 className="font-serif text-4xl italic font-bold text-[#fdfbf7]">Trellis.</h1>
          </div>
          <p className="text-[#fdfbf7]/60 text-sm">Your free trial has ended. Subscribe to keep growing.</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Monthly */}
          <div className="bg-[#fdfbf7]/5 border border-[#fdfbf7]/10 rounded-2xl p-8 space-y-6">
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#fdfbf7]/60">Monthly</h3>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="font-serif text-4xl text-[#fdfbf7]">$5</span>
                <span className="text-[#fdfbf7]/60 text-sm">/month</span>
              </div>
            </div>
            <ul className="space-y-3">
              {['Full app access', 'AI-powered Guide', 'Calendar sync', 'Community Garden'].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-[#fdfbf7]/70">
                  <Check size={14} className="text-[#d4af37] shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleSubscribe('monthly')}
              disabled={loading !== null}
              className="w-full bg-[#fdfbf7]/10 text-[#fdfbf7] py-3 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-[#fdfbf7]/20 transition-all disabled:opacity-50"
            >
              {loading === 'monthly' ? 'Redirecting...' : 'Subscribe Monthly'}
            </button>
          </div>

          {/* Annual */}
          <div className="bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-2xl p-8 space-y-6 relative">
            <span className="absolute -top-3 right-6 bg-[#d4af37] text-[#2c2c2a] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              Save 35%
            </span>
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">Annual</h3>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="font-serif text-4xl text-[#fdfbf7]">$39</span>
                <span className="text-[#fdfbf7]/60 text-sm">/year</span>
              </div>
              <p className="text-[#fdfbf7]/60 text-xs mt-1">$3.25/month</p>
            </div>
            <ul className="space-y-3">
              {['Everything in Monthly', 'Priority support', 'Early access to features', 'Support the mission'].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-[#fdfbf7]/70">
                  <Check size={14} className="text-[#d4af37] shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleSubscribe('annual')}
              disabled={loading !== null}
              className="w-full bg-[#d4af37] text-[#2c2c2a] py-3 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-[#fdfbf7] transition-all disabled:opacity-50"
            >
              {loading === 'annual' ? 'Redirecting...' : 'Subscribe Annually'}
            </button>
          </div>
        </div>

        {/* Bottom links */}
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={onOpenGift}
            className="flex items-center gap-2 text-[#fdfbf7]/40 hover:text-[#d4af37] transition-colors text-sm"
          >
            <Gift size={14} />
            <span>Have a gift code?</span>
          </button>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-[#fdfbf7]/40 hover:text-[#fdfbf7] transition-colors text-sm"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaywallScreen;
