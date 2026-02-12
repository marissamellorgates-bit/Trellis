import { useState } from 'react';
import { Gift, X } from 'lucide-react';
import { redeemGift } from '../lib/subscription';

interface GiftRedeemBannerProps {
  giftId: string;
  userId: string;
  email: string;
  onRedeemed: () => void;
}

const GiftRedeemBanner = ({ giftId, userId, email, onRedeemed }: GiftRedeemBannerProps) => {
  const [loading, setLoading] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [error, setError] = useState('');

  if (dismissed) return null;

  const handleRedeem = async () => {
    setLoading(true);
    setError('');
    try {
      await redeemGift(giftId, userId, email);
      onRedeemed();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Redeem failed');
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#d4af37]/10 border border-[#d4af37]/20 rounded-2xl p-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <Gift className="text-[#d4af37] shrink-0" size={20} />
        <div>
          <p className="text-sm font-bold text-[#2c2c2a]">Someone gifted you Trellis!</p>
          {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={handleRedeem}
          disabled={loading}
          className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest bg-[#d4af37] text-[#2c2c2a] hover:bg-[#2c2c2a] hover:text-[#fdfbf7] transition-all disabled:opacity-50"
        >
          {loading ? 'Redeeming...' : 'Redeem'}
        </button>
        <button onClick={() => setDismissed(true)} className="text-[#2c2c2a]/30 hover:text-[#2c2c2a]">
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default GiftRedeemBanner;
