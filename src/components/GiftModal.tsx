import { useState } from 'react';
import { X, Gift } from 'lucide-react';
import { PRICE_IDS, createCheckoutSession } from '../lib/subscription';
import { useModal } from '../hooks/useModal';

interface GiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  email: string;
}

const GiftModal = ({ isOpen, onClose, userId, email }: GiftModalProps) => {
  const [recipientEmail, setRecipientEmail] = useState('');
  const [tier, setTier] = useState<'monthly' | 'annual'>('annual');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { modalRef } = useModal(isOpen, onClose);

  if (!isOpen) return null;

  const handleSend = async () => {
    if (!recipientEmail.trim()) return;
    setLoading(true);
    setError('');
    try {
      const priceId = tier === 'annual' ? PRICE_IDS.annual : PRICE_IDS.monthly;
      const url = await createCheckoutSession(userId, email, priceId, recipientEmail.trim());
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="gift-title">
      <div ref={modalRef} className="bg-[#fdfbf7] rounded-3xl max-w-md w-full p-5 md:p-8 relative space-y-6" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} aria-label="Close" className="absolute top-4 right-4 text-[#2c2c2a]/50 hover:text-[#2c2c2a] transition-colors">
          <X size={20} />
        </button>

        <div className="text-center space-y-2">
          <Gift className="text-[#d4af37] mx-auto" size={28} aria-hidden="true" />
          <h2 id="gift-title" className="font-serif text-2xl italic">Gift Trellis</h2>
          <p className="text-sm text-[#2c2c2a]/40">Give the gift of growth to someone you care about</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="gift-email" className="text-[10px] font-bold uppercase tracking-widest text-[#2c2c2a]/50">Recipient's Email</label>
            <input
              id="gift-email"
              type="email"
              value={recipientEmail}
              onChange={e => setRecipientEmail(e.target.value)}
              className="w-full bg-white border border-[#2c2c2a]/10 rounded-xl px-4 py-3 text-sm focus:border-[#d4af37] outline-none transition-colors"
              placeholder="friend@example.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#2c2c2a]/50">Gift Plan</label>
            <div className="flex gap-2">
              {(['monthly', 'annual'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setTier(t)}
                  className={`flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all border ${
                    tier === t
                      ? 'bg-[#d4af37] border-[#d4af37] text-[#2c2c2a]'
                      : 'border-[#2c2c2a]/10 text-[#2c2c2a]/40 hover:border-[#d4af37]/30'
                  }`}
                >
                  {t === 'monthly' ? '$5/mo' : '$39/yr'}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            onClick={handleSend}
            disabled={loading || !recipientEmail.trim()}
            className="w-full bg-[#d4af37] text-[#2c2c2a] py-3 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-[#2c2c2a] hover:text-[#fdfbf7] transition-all disabled:opacity-40"
          >
            {loading ? 'Redirecting...' : 'Send Gift'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GiftModal;
