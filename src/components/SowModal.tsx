import { useState } from 'react';
import { X, Droplets, Hand, Layers, Recycle } from 'lucide-react';
import type { SowModalProps, SowTier, DomainKey } from '../types';
import { SOW_TIERS } from '../types';

const TIER_ICONS = {
  drop: Droplets,
  tend: Hand,
  mulch: Layers,
  compost: Recycle,
} as const;

const SowModal = ({ isOpen, onClose, onComplete, domains, goals }: SowModalProps) => {
  const [tier, setTier] = useState<SowTier>('drop');
  const [note, setNote] = useState('');
  const [outcome, setOutcome] = useState('');
  const [source, setSource] = useState('');
  const [insight, setInsight] = useState('');
  const [reflection, setReflection] = useState('');
  const [nextSteps, setNextSteps] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<DomainKey>(domains[0] || 'intellectual');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!note.trim()) return;
    onComplete({
      tier,
      note,
      ...(tier !== 'drop' && { outcome }),
      ...(tier === 'mulch' || tier === 'compost' ? { source, insight } : {}),
      ...(tier === 'compost' ? { reflection, nextSteps } : {}),
      domain: selectedDomain,
    });
    setNote('');
    setOutcome('');
    setSource('');
    setInsight('');
    setReflection('');
    setNextSteps('');
    setTier('drop');
  };

  const tierInfo = SOW_TIERS.find(t => t.tier === tier);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#2c2c2a]/90 backdrop-blur-md">
      <div className="bg-[#fdfbf7] w-full max-w-md rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
        <div className="p-6 space-y-5">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#d4af37]">Sow</span>
            <button onClick={onClose} className="text-[#2c2c2a]/40 hover:text-[#2c2c2a]"><X size={18}/></button>
          </div>

          {/* Tier selector */}
          <div className="grid grid-cols-4 gap-2">
            {SOW_TIERS.map(t => {
              const Icon = TIER_ICONS[t.tier];
              return (
                <button
                  key={t.tier}
                  onClick={() => setTier(t.tier)}
                  className={`flex flex-col items-center gap-1.5 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                    tier === t.tier
                      ? 'bg-[#2c2c2a] text-[#fdfbf7]'
                      : 'bg-[#2c2c2a]/5 text-[#2c2c2a]/40 hover:text-[#2c2c2a]/60'
                  }`}
                >
                  <Icon size={16} />
                  {t.label}
                </button>
              );
            })}
          </div>

          <p className="text-xs text-[#2c2c2a]/40 italic">{tierInfo?.description}</p>

          {/* Note — all tiers */}
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full bg-[#2c2c2a]/5 p-4 rounded-xl text-sm outline-none focus:ring-1 ring-[#d4af37] min-h-[80px] resize-none"
            placeholder={
              tier === 'drop' ? "What's on your mind?" :
              tier === 'tend' ? "What did you do?" :
              tier === 'mulch' ? "What did you explore?" :
              "Describe the side quest..."
            }
            autoFocus
          />

          {/* Outcome — tend, mulch, compost */}
          {tier !== 'drop' && (
            <input
              value={outcome}
              onChange={(e) => setOutcome(e.target.value)}
              className="w-full bg-[#2c2c2a]/5 p-3 rounded-xl text-sm outline-none focus:ring-1 ring-[#d4af37]"
              placeholder={tier === 'tend' ? "What was the result?" : "What came out of it?"}
            />
          )}

          {/* Source + Insight — mulch, compost */}
          {(tier === 'mulch' || tier === 'compost') && (
            <>
              <input
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full bg-[#2c2c2a]/5 p-3 rounded-xl text-sm outline-none focus:ring-1 ring-[#d4af37]"
                placeholder="Source (book, article, person, etc.)"
              />
              <input
                value={insight}
                onChange={(e) => setInsight(e.target.value)}
                className="w-full bg-[#2c2c2a]/5 p-3 rounded-xl text-sm outline-none focus:ring-1 ring-[#d4af37]"
                placeholder="Key takeaway"
              />
            </>
          )}

          {/* Reflection + Next steps — compost only */}
          {tier === 'compost' && (
            <>
              <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                className="w-full bg-[#2c2c2a]/5 p-4 rounded-xl text-sm outline-none focus:ring-1 ring-[#d4af37] min-h-[60px] resize-none"
                placeholder="What did you learn from this journey?"
              />
              <input
                value={nextSteps}
                onChange={(e) => setNextSteps(e.target.value)}
                className="w-full bg-[#2c2c2a]/5 p-3 rounded-xl text-sm outline-none focus:ring-1 ring-[#d4af37]"
                placeholder="What seeds did this scatter?"
              />
            </>
          )}

          {/* Domain picker */}
          <div className="flex flex-wrap gap-1.5">
            {domains.map(d => (
              <button
                key={d}
                onClick={() => setSelectedDomain(d)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${
                  selectedDomain === d
                    ? 'bg-[#d4af37] text-[#2c2c2a]'
                    : 'bg-[#2c2c2a]/5 text-[#2c2c2a]/30'
                }`}
              >
                {goals[d]?.label ?? d}
              </button>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            disabled={!note.trim()}
            className="w-full bg-[#2c2c2a] text-[#fdfbf7] py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-[#d4af37] hover:text-[#2c2c2a] transition-all disabled:opacity-20"
          >
            Sow
          </button>
        </div>
      </div>
    </div>
  );
};

export default SowModal;
