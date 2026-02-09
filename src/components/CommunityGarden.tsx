import { useState } from 'react';
import { Briefcase, Building, Home, CloudRain, Users2, X } from 'lucide-react';
import { WATERING_TIERS, GRAFTING_TIERS } from '../types';
import type { CommunityGardenProps, CommunityProject } from '../types';

type InteractionMode = { type: 'water' | 'graft'; projectId: number } | null;

const CommunityGarden = ({ projects }: CommunityGardenProps) => {
  const [interaction, setInteraction] = useState<InteractionMode>(null);

  const communityIcon = (community: string) => {
    switch (community) {
      case 'work': return <Briefcase size={10}/>;
      case 'town': return <Building size={10}/>;
      case 'family': return <Home size={10}/>;
      default: return null;
    }
  };

  const handleWater = () => {
    // Placeholder: in Phase 2 this will persist to Supabase with projectId + tier
    setInteraction(null);
  };

  const handleGraft = () => {
    // Placeholder: in Phase 2 this will persist to Supabase with projectId + tier
    setInteraction(null);
  };

  const renderTierPanel = (project: CommunityProject) => {
    if (!interaction || interaction.projectId !== project.id) return null;

    if (interaction.type === 'water') {
      return (
        <div className="mt-4 pt-4 border-t border-[#2c2c2a]/5 space-y-2 animate-in fade-in duration-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#2c2c2a]/40">Choose Watering Level</p>
            <button onClick={() => setInteraction(null)} className="text-[#2c2c2a]/30 hover:text-[#2c2c2a]"><X size={14}/></button>
          </div>
          {WATERING_TIERS.map(w => (
            <button
              key={w.tier}
              onClick={() => handleWater()}
              className="w-full text-left px-4 py-3 rounded-xl border border-[#2c2c2a]/5 hover:border-[#d4af37] hover:bg-[#d4af37]/5 transition-all group"
            >
              <span className="text-xs font-bold text-[#2c2c2a] group-hover:text-[#d4af37]">{w.label}</span>
              <span className="block text-[10px] text-[#2c2c2a]/40 mt-0.5">{w.description}</span>
            </button>
          ))}
        </div>
      );
    }

    return (
      <div className="mt-4 pt-4 border-t border-[#2c2c2a]/5 space-y-2 animate-in fade-in duration-200">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#2c2c2a]/40">Choose Grafting Level</p>
          <button onClick={() => setInteraction(null)} className="text-[#2c2c2a]/30 hover:text-[#2c2c2a]"><X size={14}/></button>
        </div>
        {GRAFTING_TIERS.map(g => (
          <button
            key={g.tier}
            onClick={() => handleGraft()}
            className="w-full text-left px-4 py-3 rounded-xl border border-[#2c2c2a]/5 hover:border-[#d4af37] hover:bg-[#d4af37]/5 transition-all group"
          >
            <span className="text-xs font-bold text-[#2c2c2a] group-hover:text-[#d4af37]">{g.label}</span>
            <span className="block text-[10px] text-[#2c2c2a]/40 mt-0.5">{g.description}</span>
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-3xl text-[#2c2c2a]">The Community Garden</h2>
          <p className="text-xs font-bold uppercase tracking-widest text-[#2c2c2a]/40 mt-2">Pollination & Mentorship Opportunities</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-full border border-[#2c2c2a]/10 text-xs font-bold uppercase bg-white hover:bg-[#2c2c2a] hover:text-white transition-all">My Circles</button>
          <button className="px-4 py-2 rounded-full border border-[#2c2c2a]/10 text-xs font-bold uppercase bg-white hover:bg-[#2c2c2a] hover:text-white transition-all">Global</button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((p) => (
          <div key={p.id} className="bg-white p-6 rounded-2xl border border-[#2c2c2a]/10 hover:shadow-lg transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#2c2c2a]/5 flex items-center justify-center text-[#2c2c2a]/60 font-serif italic">
                  {p.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#2c2c2a]">{p.author}</h4>
                  <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-[#2c2c2a]/40">
                    {communityIcon(p.community)}
                    <span>{p.community}</span>
                  </div>
                </div>
              </div>
              <span className="bg-[#2c2c2a]/5 text-[#2c2c2a] text-[10px] font-bold px-2 py-1 rounded-full uppercase">Module {p.stage}</span>
            </div>
            <h3 className="font-serif text-xl italic text-[#2c2c2a] mb-2">{p.title}</h3>
            <div className="w-full h-1 bg-[#2c2c2a]/5 rounded-full mb-6 overflow-hidden">
              <div className="h-full bg-[#d4af37]" style={{width: `${(p.stage/7)*100}%`}}></div>
            </div>
            <div className="flex gap-2 border-t border-[#2c2c2a]/5 pt-4">
              <button
                onClick={() => setInteraction(interaction?.projectId === p.id && interaction.type === 'water' ? null : { type: 'water', projectId: p.id })}
                className={`flex-1 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                  interaction?.projectId === p.id && interaction.type === 'water'
                    ? 'bg-[#d4af37]/10 text-[#d4af37]'
                    : 'hover:bg-[#2c2c2a]/5'
                }`}
              >
                <CloudRain size={14}/> Water
              </button>
              <button
                onClick={() => setInteraction(interaction?.projectId === p.id && interaction.type === 'graft' ? null : { type: 'graft', projectId: p.id })}
                className={`flex-1 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest border transition-all flex items-center justify-center gap-2 ${
                  interaction?.projectId === p.id && interaction.type === 'graft'
                    ? 'bg-[#d4af37]/10 text-[#d4af37] border-[#d4af37]'
                    : 'border-[#2c2c2a]/10 text-[#2c2c2a] hover:bg-[#2c2c2a] hover:text-white'
                }`}
              >
                <Users2 size={14}/> Graft
              </button>
            </div>
            {renderTierPanel(p)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityGarden;
