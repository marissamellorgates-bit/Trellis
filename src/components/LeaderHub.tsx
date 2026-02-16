import { useState } from 'react';
import { X, Mountain, Anchor, Wind, Crown, Users, Sprout, Eye } from 'lucide-react';
import type { LeaderHubProps, FamilyMember, GoalsMap, DomainKey } from '../types';
import PlantVisual from './PlantVisual';
import { useModal } from '../hooks/useModal';

// ── Domain key groups ────────────────────────────────────────

const LAND_KEYS: DomainKey[] = [
  'biological', 'mentalClarity', 'environmentalOrder',
  'coreCompetencies', 'experimentalTendrils', 'reflectiveSynthesis',
  'passiveRestoration', 'activePlay', 'solitude',
];

const SEA_KEYS: DomainKey[] = [
  'innerCircle', 'socialCommunion', 'safePort',
  'professionalExchange', 'marketRealities', 'instructionalCurrent',
  'networking', 'culturalImmersion', 'publicReputation',
];

const SKY_KEYS: DomainKey[] = [
  'creativeFlow', 'physicalExhilaration', 'aweAndWonder',
  'radicalImagination', 'beautyExploration', 'emotionalRelease',
  'spiritualPurpose', 'lifeVision', 'purePlay',
];

// ── Helpers ──────────────────────────────────────────────────

const getDomainScore = (goalsObj: GoalsMap, keys: DomainKey[]) => {
  let total = 0;
  let completed = 0;
  keys.forEach(key => {
    total += goalsObj[key].total;
    completed += goalsObj[key].completed;
  });
  return Math.min(Math.round((completed / total) * 100), 100);
};

const MODULE_NAMES = [
  'The Seed', 'The Roots', 'The Stem', 'The Leaves',
  'The Bloom', 'The Fruit', 'The Harvest',
];

// ── Component ────────────────────────────────────────────────

const LeaderHub = ({ currentMember, familyMembers, onManageChild }: LeaderHubProps) => {
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const { modalRef } = useModal(!!selectedMember, () => setSelectedMember(null));

  // Build the full member list: current user first, then other family members
  const otherMembers = familyMembers.filter(m => m.name !== currentMember.name);
  const allMembers: FamilyMember[] = [currentMember, ...otherMembers];

  const getScores = (goals: GoalsMap) => {
    const land = getDomainScore(goals, LAND_KEYS);
    const sea = getDomainScore(goals, SEA_KEYS);
    const sky = getDomainScore(goals, SKY_KEYS);
    const sovereignty = Math.round((land + sea + sky) / 3);
    return { land, sea, sky, sovereignty };
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="font-serif text-2xl md:text-4xl italic">The Family Garden</h1>
        <p className="text-sm text-[#2c2c2a]/40">See how everyone is growing</p>
      </div>

      {/* Empty State */}
      {allMembers.length <= 1 && (
        <div className="text-center py-12 space-y-4">
          <Users size={40} className="text-[#2c2c2a]/50 mx-auto" />
          <p className="text-sm text-[#2c2c2a]/40">No family members yet</p>
          <p className="text-xs text-[#2c2c2a]/50">Invite your family from the "My Family" option in the menu</p>
        </div>
      )}

      {/* Member Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {allMembers.map((member, i) => {
          const scores = getScores(member.goals);
          const moduleName = MODULE_NAMES[member.currentModule - 1] || 'Unknown';
          const isYou = i === 0;
          const isChild = member.isManagedChild;

          return (
            <button
              key={`${member.name}-${i}`}
              onClick={() => setSelectedMember(member)}
              className="bg-white rounded-2xl md:rounded-3xl border border-[#2c2c2a]/10 p-4 md:p-6 text-left hover:border-[#d4af37] hover:shadow-md transition-all relative"
            >
              {isYou && (
                <span className="absolute top-4 right-4 flex items-center gap-1 bg-[#d4af37]/10 text-[#d4af37] px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  <Crown size={10} />
                  You
                </span>
              )}
              {!isYou && isChild && (
                <span className="absolute top-4 right-4 flex items-center gap-1 bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  <Sprout size={10} />
                  Kid
                </span>
              )}

              <div className="flex items-start gap-4">
                <div className="w-24 h-32 md:w-32 md:h-40 shrink-0">
                  <PlantVisual
                    stage={member.currentModule}
                    type={member.projectPlant}
                    instanceId={`leader-hub-${member.name}-${i}`}
                  />
                </div>
                <div className="flex-1 min-w-0 space-y-3 pt-1">
                  <div>
                    <h3 className="font-serif text-lg italic truncate">{member.name}</h3>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#2c2c2a]/40">{member.role}</p>
                  </div>

                  <p className="text-sm text-[#2c2c2a]/70 truncate">{member.projectTitle || 'No active project'}</p>

                  {/* Module badge + progress */}
                  <div className="space-y-1.5">
                    <span className="inline-block text-[10px] font-bold uppercase tracking-widest bg-[#2c2c2a]/5 px-2 py-0.5 rounded text-[#2c2c2a]/50">
                      {moduleName}
                    </span>
                    <div className="w-full bg-[#2c2c2a]/5 h-1 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#d4af37] transition-all"
                        style={{ width: `${(member.currentModule / 7) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Sovereignty Score */}
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-2xl">{scores.sovereignty}%</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#2c2c2a]/50">Sovereignty</span>
                  </div>

                  {/* Mini domain bars */}
                  <div className="space-y-1">
                    {([
                      { label: 'Land', score: scores.land, color: 'bg-emerald-500' },
                      { label: 'Sea', score: scores.sea, color: 'bg-blue-500' },
                      { label: 'Sky', score: scores.sky, color: 'bg-amber-500' },
                    ] as const).map(d => (
                      <div key={d.label} className="flex items-center gap-2">
                        <span className="text-[8px] font-bold uppercase tracking-widest text-[#2c2c2a]/50 w-6">{d.label}</span>
                        <div className="flex-1 bg-[#2c2c2a]/5 h-1 rounded-full overflow-hidden">
                          <div className={`h-full ${d.color} transition-all`} style={{ width: `${d.score}%` }} />
                        </div>
                        <span className="text-[9px] font-mono text-[#2c2c2a]/50 w-7 text-right">{d.score}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detail Modal */}
      {selectedMember && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMember(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="leader-detail-title"
        >
          <div
            ref={modalRef}
            className="bg-[#fdfbf7] rounded-3xl max-w-lg w-full p-5 md:p-8 relative space-y-6 max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedMember(null)}
              aria-label="Close"
              className="absolute top-4 right-4 text-[#2c2c2a]/50 hover:text-[#2c2c2a] transition-colors"
            >
              <X size={20} />
            </button>

            {/* Plant */}
            <div className="flex justify-center">
              <div className="w-48 h-56">
                <PlantVisual
                  stage={selectedMember.currentModule}
                  type={selectedMember.projectPlant}
                  instanceId={`leader-detail-${selectedMember.name}`}
                />
              </div>
            </div>

            {/* Info */}
            <div className="text-center space-y-2">
              <h2 id="leader-detail-title" className="font-serif text-3xl italic">{selectedMember.name}</h2>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#2c2c2a]/40">{selectedMember.role}</p>
            </div>

            {/* Project details */}
            <div className="bg-white rounded-2xl border border-[#2c2c2a]/10 p-5 space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#2c2c2a]/40">Active Project</p>
              <h3 className="font-serif text-xl italic">{selectedMember.projectTitle || 'No active project'}</h3>
              <div className="flex gap-2 flex-wrap">
                <span className="text-[10px] font-bold uppercase bg-[#2c2c2a]/5 px-2 py-1 rounded text-[#2c2c2a]/50">
                  {MODULE_NAMES[selectedMember.currentModule - 1]}
                </span>
                <span className="text-[10px] font-bold uppercase bg-[#2c2c2a]/5 px-2 py-1 rounded text-[#2c2c2a]/50 capitalize">
                  {selectedMember.projectPlant} Archetype
                </span>
              </div>
              <div className="w-full bg-[#2c2c2a]/5 h-1.5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#d4af37] transition-all"
                  style={{ width: `${(selectedMember.currentModule / 7) * 100}%` }}
                />
              </div>
            </div>

            {/* Sovereignty */}
            {(() => {
              const scores = getScores(selectedMember.goals);
              return (
                <>
                  <div className="text-center">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#2c2c2a]/40">Sovereignty Score</p>
                    <p className="font-serif text-3xl md:text-5xl mt-1">{scores.sovereignty}%</p>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-emerald-50 rounded-2xl p-4 text-center space-y-1">
                      <Mountain size={16} className="text-emerald-700 mx-auto" />
                      <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-700/60">Land</p>
                      <p className="font-serif text-2xl text-emerald-800">{scores.land}%</p>
                    </div>
                    <div className="bg-blue-50 rounded-2xl p-4 text-center space-y-1">
                      <Anchor size={16} className="text-blue-800 mx-auto" />
                      <p className="text-[10px] font-bold uppercase tracking-widest text-blue-800/60">Sea</p>
                      <p className="font-serif text-2xl text-blue-900">{scores.sea}%</p>
                    </div>
                    <div className="bg-amber-50 rounded-2xl p-4 text-center space-y-1">
                      <Wind size={16} className="text-amber-700 mx-auto" />
                      <p className="text-[10px] font-bold uppercase tracking-widest text-amber-700/60">Sky</p>
                      <p className="font-serif text-2xl text-amber-800">{scores.sky}%</p>
                    </div>
                  </div>
                </>
              );
            })()}

            {selectedMember.isManagedChild && onManageChild && selectedMember.supabaseId ? (
              <button
                onClick={() => {
                  onManageChild(selectedMember.supabaseId!);
                  setSelectedMember(null);
                }}
                className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-widest bg-[#d4af37] text-[#2c2c2a] hover:bg-[#c4a030] transition-all flex items-center justify-center gap-2"
              >
                <Eye size={14} />
                Manage Dashboard
              </button>
            ) : (
              <p className="text-center text-[10px] font-bold uppercase tracking-widest text-[#2c2c2a]/40">
                Read only — view only mode
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaderHub;
