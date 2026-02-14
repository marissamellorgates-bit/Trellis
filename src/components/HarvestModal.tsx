import React from 'react';
import { Wheat } from 'lucide-react';
import type { HarvestModalProps } from '../types';
import { useModal } from '../hooks/useModal';

const HarvestModal = ({ isOpen, wisdom, sharing, communities, onWisdomChange, onSharingChange, onFinalize }: HarvestModalProps) => {
  const { modalRef } = useModal(isOpen, onFinalize);
  if (!isOpen) return null;

  const toggleSharing = (name: string) => {
    onSharingChange(
      sharing.includes(name)
        ? sharing.filter(x => x !== name)
        : [...sharing, name]
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#2c2c2a]/95 backdrop-blur-xl animate-in fade-in duration-700" role="dialog" aria-modal="true" aria-labelledby="harvest-title">
      <div ref={modalRef} className="bg-[#fdfbf7] w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
        <div className="bg-[#d4af37] p-8 flex items-center justify-center md:w-1/3">
          <Wheat size={64} className="text-[#2c2c2a] animate-bounce" aria-hidden="true"/>
        </div>
        <div className="p-8 md:w-2/3 space-y-6">
          <div>
            <h2 id="harvest-title" className="font-serif text-3xl italic text-[#2c2c2a]">The Harvest</h2>
            <p className="text-[#2c2c2a]/60 text-sm mt-1">You have completed the cycle. Synthesis is required to crystallize the wisdom.</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="harvest-wisdom" className="text-[10px] font-bold uppercase tracking-widest text-[#2c2c2a]/40">Key Wisdom Gained</label>
            <textarea
              id="harvest-wisdom"
              value={wisdom}
              onChange={(e) => onWisdomChange(e.target.value)}
              className="w-full bg-[#2c2c2a]/5 p-3 rounded-xl text-sm outline-none focus:ring-1 ring-[#d4af37]"
              rows={3}
              placeholder="What did this season teach you?"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#2c2c2a]/40">Scatter Seeds (Share)</label>
            <div className="grid grid-cols-2 gap-2">
              {communities.map(c => (
                <button
                  key={c.id}
                  onClick={() => toggleSharing(c.name)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${sharing.includes(c.name) ? 'bg-[#2c2c2a] text-[#d4af37]' : 'border border-[#2c2c2a]/10 text-[#2c2c2a]/50'}`}
                >
                  {React.createElement(c.icon, {size: 12})} {c.name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#2c2c2a]/40">Seeds to Scatter (New Projects Born)</label>
            <p className="text-xs text-[#2c2c2a]/40">After harvest, you can start a new focus project inspired by this one.</p>
          </div>

          <button onClick={onFinalize} className="w-full bg-[#2c2c2a] text-[#fdfbf7] py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-[#d4af37] hover:text-[#2c2c2a] transition-all">
            Complete Harvest & Archive
          </button>
        </div>
      </div>
    </div>
  );
};

export default HarvestModal;
