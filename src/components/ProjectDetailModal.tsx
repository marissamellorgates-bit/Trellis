import { useState, useEffect } from 'react';
import { X, CloudRain, Users2, Eye, Clock } from 'lucide-react';
import PlantVisual from './PlantVisual';
import { WATERING_TIERS, GRAFTING_TIERS } from '../types';
import type { DBCommunityProject, DBInteraction } from '../types';
import { fetchProjectInteractions, recordInteraction, recordView } from '../lib/community';
import { useModal } from '../hooks/useModal';

interface ProjectDetailModalProps {
  project: DBCommunityProject;
  userId: string;
  userName: string;
  isOwn: boolean;
  onClose: () => void;
  onInteraction: () => void;
}

type InteractionMode = 'water' | 'graft' | null;

const ProjectDetailModal = ({ project, userId, userName, isOwn, onClose, onInteraction }: ProjectDetailModalProps) => {
  const [interactions, setInteractions] = useState<DBInteraction[]>([]);
  const [mode, setMode] = useState<InteractionMode>(null);
  const [sending, setSending] = useState(false);
  const { modalRef } = useModal(true, onClose);

  useEffect(() => {
    recordView(project.id, userId);
    fetchProjectInteractions(project.id).then(setInteractions);
  }, [project.id, userId]);

  const handleInteract = async (type: 'water' | 'graft', tier: string) => {
    setSending(true);
    const ok = await recordInteraction(project.id, userId, userName, type, tier);
    if (ok) {
      const updated = await fetchProjectInteractions(project.id);
      setInteractions(updated);
      onInteraction();
    }
    setSending(false);
    setMode(null);
  };

  const tierLabel = (tier: string): string => {
    const w = WATERING_TIERS.find(t => t.tier === tier);
    if (w) return w.label;
    const g = GRAFTING_TIERS.find(t => t.tier === tier);
    if (g) return g.label;
    return tier;
  };

  const timeAgo = (ts: string): string => {
    const diff = Date.now() - new Date(ts).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="project-detail-title">
      <div ref={modalRef} className="bg-[#fdfbf7] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-8 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#2c2c2a]/5 flex items-center justify-center text-[#2c2c2a]/60 font-serif italic">
                  {project.author_name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#2c2c2a]">{project.author_name}</h4>
                  <span className="text-[10px] uppercase font-bold text-[#2c2c2a]/40">Module {project.stage}</span>
                </div>
              </div>
              <h2 id="project-detail-title" className="font-serif text-3xl italic text-[#2c2c2a]">{project.title}</h2>
            </div>
            <button onClick={onClose} aria-label="Close" className="text-[#2c2c2a]/30 hover:text-[#2c2c2a] transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Plant Visual */}
          <div className="flex justify-center">
            <div className="w-48 h-56">
              <PlantVisual stage={project.stage} type={project.plant} instanceId={`detail-${project.id}`} />
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-4 justify-center">
            <div className="flex items-center gap-1.5 text-xs text-[#2c2c2a]/50">
              <Eye size={14} /> {project.view_count} views
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#2c2c2a]/50">
              <CloudRain size={14} /> {project.water_count} waterings
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#2c2c2a]/50">
              <Users2 size={14} /> {project.graft_count} grafts
            </div>
          </div>

          {/* Description */}
          {project.description && (
            <div className="bg-white rounded-2xl p-6 border border-[#2c2c2a]/10">
              <p className="text-sm text-[#2c2c2a]/70 leading-relaxed">{project.description}</p>
            </div>
          )}

          {/* Tags */}
          {project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full bg-[#2c2c2a]/5 text-[10px] font-bold uppercase tracking-widest text-[#2c2c2a]/50">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Archetype + Stage */}
          <div className="flex gap-2">
            <span className="text-xs font-bold uppercase bg-[#2c2c2a]/5 px-3 py-1.5 rounded-full text-[#2c2c2a]/60 capitalize">
              {project.plant} Archetype
            </span>
            <span className="text-xs font-bold uppercase bg-[#d4af37]/10 px-3 py-1.5 rounded-full text-[#d4af37]">
              Module {project.stage} / 7
            </span>
          </div>

          {/* Interaction Buttons */}
          {!isOwn && (
            <div className="space-y-3">
              <div className="flex gap-2">
                <button
                  onClick={() => setMode(mode === 'water' ? null : 'water')}
                  className={`flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                    mode === 'water' ? 'bg-[#d4af37]/10 text-[#d4af37]' : 'bg-white border border-[#2c2c2a]/10 hover:bg-[#2c2c2a]/5'
                  }`}
                >
                  <CloudRain size={16} /> Water
                </button>
                <button
                  onClick={() => setMode(mode === 'graft' ? null : 'graft')}
                  className={`flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all flex items-center justify-center gap-2 ${
                    mode === 'graft' ? 'bg-[#d4af37]/10 text-[#d4af37] border-[#d4af37]' : 'border-[#2c2c2a]/10 hover:bg-[#2c2c2a] hover:text-white'
                  }`}
                >
                  <Users2 size={16} /> Graft
                </button>
              </div>

              {mode === 'water' && (
                <div className="space-y-2 animate-in fade-in duration-200">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#2c2c2a]/40">Choose Watering Level</p>
                  {WATERING_TIERS.map(w => (
                    <button
                      key={w.tier}
                      onClick={() => handleInteract('water', w.tier)}
                      disabled={sending}
                      className="w-full text-left px-4 py-3 rounded-xl border border-[#2c2c2a]/5 hover:border-[#d4af37] hover:bg-[#d4af37]/5 transition-all group disabled:opacity-40"
                    >
                      <span className="text-xs font-bold text-[#2c2c2a] group-hover:text-[#d4af37]">{w.label}</span>
                      <span className="block text-[10px] text-[#2c2c2a]/40 mt-0.5">{w.description}</span>
                    </button>
                  ))}
                </div>
              )}

              {mode === 'graft' && (
                <div className="space-y-2 animate-in fade-in duration-200">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#2c2c2a]/40">Choose Grafting Level</p>
                  {GRAFTING_TIERS.map(g => (
                    <button
                      key={g.tier}
                      onClick={() => handleInteract('graft', g.tier)}
                      disabled={sending}
                      className="w-full text-left px-4 py-3 rounded-xl border border-[#2c2c2a]/5 hover:border-[#d4af37] hover:bg-[#d4af37]/5 transition-all group disabled:opacity-40"
                    >
                      <span className="text-xs font-bold text-[#2c2c2a] group-hover:text-[#d4af37]">{g.label}</span>
                      <span className="block text-[10px] text-[#2c2c2a]/40 mt-0.5">{g.description}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Interaction History */}
          {interactions.length > 0 && (
            <div className="space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#2c2c2a]/40">Recent Activity</p>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {interactions.map(i => (
                  <div key={i.id} className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-[#2c2c2a]/5">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      i.type === 'water' ? 'bg-blue-50 text-blue-500' : 'bg-emerald-50 text-emerald-500'
                    }`}>
                      {i.type === 'water' ? <CloudRain size={14} /> : <Users2 size={14} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-[#2c2c2a]">
                        {i.from_user_name} <span className="font-normal text-[#2c2c2a]/50">sent {tierLabel(i.tier)}</span>
                      </p>
                      {i.message && <p className="text-[10px] text-[#2c2c2a]/40 truncate">{i.message}</p>}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-[#2c2c2a]/30">
                      <Clock size={10} /> {timeAgo(i.created_at)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailModal;
