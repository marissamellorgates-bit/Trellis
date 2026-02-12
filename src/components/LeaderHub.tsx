import { useState } from 'react';
import { X, Mountain, Anchor, Wind, Crown } from 'lucide-react';
import type { LeaderHubProps, FamilyMember, GoalsMap, DomainKey } from '../types';
import PlantVisual from './PlantVisual';

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

// ── Mock goals factory ───────────────────────────────────────

const makeGoals = (overrides: Partial<Record<DomainKey, { completed: number }>>): GoalsMap => {
  const base: GoalsMap = {
    biological: { completed: 0, total: 4, label: 'Physical Health', icon: Mountain, goal: '' },
    mentalClarity: { completed: 0, total: 4, label: 'Mental Clarity', icon: Mountain, goal: '' },
    environmentalOrder: { completed: 0, total: 4, label: 'Environmental Order', icon: Mountain, goal: '' },
    coreCompetencies: { completed: 0, total: 5, label: 'Crafts', icon: Mountain, goal: '' },
    experimentalTendrils: { completed: 0, total: 4, label: 'Tendrils', icon: Mountain, goal: '' },
    reflectiveSynthesis: { completed: 0, total: 3, label: 'Reflection', icon: Mountain, goal: '' },
    passiveRestoration: { completed: 0, total: 4, label: 'Rest', icon: Mountain, goal: '' },
    activePlay: { completed: 0, total: 5, label: 'Play', icon: Mountain, goal: '' },
    solitude: { completed: 0, total: 3, label: 'Solitude', icon: Mountain, goal: '' },
    innerCircle: { completed: 0, total: 5, label: 'Family', icon: Anchor, goal: '' },
    socialCommunion: { completed: 0, total: 4, label: 'Friends', icon: Anchor, goal: '' },
    safePort: { completed: 0, total: 4, label: 'Village', icon: Anchor, goal: '' },
    professionalExchange: { completed: 0, total: 7, label: 'Profession', icon: Anchor, goal: '' },
    marketRealities: { completed: 0, total: 5, label: 'Finances', icon: Anchor, goal: '' },
    instructionalCurrent: { completed: 0, total: 4, label: 'Opportunity', icon: Anchor, goal: '' },
    networking: { completed: 0, total: 4, label: 'Connections', icon: Anchor, goal: '' },
    culturalImmersion: { completed: 0, total: 3, label: 'Culture', icon: Anchor, goal: '' },
    publicReputation: { completed: 0, total: 3, label: 'Reputation', icon: Anchor, goal: '' },
    creativeFlow: { completed: 0, total: 5, label: 'Creativity', icon: Wind, goal: '' },
    physicalExhilaration: { completed: 0, total: 4, label: 'Adventure', icon: Wind, goal: '' },
    aweAndWonder: { completed: 0, total: 3, label: 'Wonder', icon: Wind, goal: '' },
    radicalImagination: { completed: 0, total: 4, label: 'Imagination', icon: Wind, goal: '' },
    beautyExploration: { completed: 0, total: 3, label: 'Beauty', icon: Wind, goal: '' },
    emotionalRelease: { completed: 0, total: 4, label: 'Expression', icon: Wind, goal: '' },
    spiritualPurpose: { completed: 0, total: 5, label: 'Spirit', icon: Wind, goal: '' },
    lifeVision: { completed: 0, total: 4, label: 'Vision', icon: Wind, goal: '' },
    purePlay: { completed: 0, total: 3, label: 'Freedom', icon: Wind, goal: '' },
  };
  for (const [key, val] of Object.entries(overrides)) {
    if (base[key as DomainKey]) {
      base[key as DomainKey] = { ...base[key as DomainKey], completed: val.completed };
    }
  }
  return base;
};

// ── Mock family members ──────────────────────────────────────

const MOCK_MEMBERS: Omit<FamilyMember, 'goals'>[] = [
  {
    id: 100,
    name: 'Elena',
    role: 'Family Historian',
    projectTitle: 'Family Cookbook Archive',
    projectImpactVectors: ['innerCircle', 'culturalImmersion', 'creativeFlow'],
    currentModule: 4,
    projectPlant: 'oak',
    projectVisibility: ['family'],
    tasks: [],
    schedule: [],
    harvestHistory: [],
    sowLog: [],
    knowledgeLog: [],
    questionMap: [],
    experienceLog: [],
    patternJournal: [],
    notifications: [],
    chatHistory: [],
    shelvedProjects: [],
    subscriptionStatus: 'active',
  },
  {
    id: 101,
    name: 'Noah',
    role: 'Young Explorer',
    projectTitle: 'Learn Python',
    projectImpactVectors: ['coreCompetencies', 'instructionalCurrent', 'professionalExchange'],
    currentModule: 2,
    projectPlant: 'cactus',
    projectVisibility: ['family'],
    tasks: [],
    schedule: [],
    harvestHistory: [],
    sowLog: [],
    knowledgeLog: [],
    questionMap: [],
    experienceLog: [],
    patternJournal: [],
    notifications: [],
    chatHistory: [],
    shelvedProjects: [],
    subscriptionStatus: 'active',
  },
  {
    id: 102,
    name: 'Ava',
    role: 'Creative Spark',
    projectTitle: 'Community Art Mural',
    projectImpactVectors: ['creativeFlow', 'socialCommunion', 'beautyExploration'],
    currentModule: 5,
    projectPlant: 'sunflower',
    projectVisibility: ['family', 'town'],
    tasks: [],
    schedule: [],
    harvestHistory: [],
    sowLog: [],
    knowledgeLog: [],
    questionMap: [],
    experienceLog: [],
    patternJournal: [],
    notifications: [],
    chatHistory: [],
    shelvedProjects: [],
    subscriptionStatus: 'active',
  },
];

const MOCK_GOALS: Record<number, GoalsMap> = {
  100: makeGoals({
    biological: { completed: 3 },
    mentalClarity: { completed: 2 },
    coreCompetencies: { completed: 4 },
    passiveRestoration: { completed: 3 },
    innerCircle: { completed: 4 },
    socialCommunion: { completed: 3 },
    professionalExchange: { completed: 2 },
    creativeFlow: { completed: 3 },
    spiritualPurpose: { completed: 2 },
    beautyExploration: { completed: 2 },
  }),
  101: makeGoals({
    biological: { completed: 2 },
    coreCompetencies: { completed: 1 },
    experimentalTendrils: { completed: 2 },
    activePlay: { completed: 4 },
    innerCircle: { completed: 3 },
    professionalExchange: { completed: 1 },
    instructionalCurrent: { completed: 2 },
    creativeFlow: { completed: 1 },
    physicalExhilaration: { completed: 3 },
    purePlay: { completed: 3 },
  }),
  102: makeGoals({
    biological: { completed: 2 },
    mentalClarity: { completed: 3 },
    environmentalOrder: { completed: 2 },
    coreCompetencies: { completed: 3 },
    reflectiveSynthesis: { completed: 2 },
    innerCircle: { completed: 3 },
    socialCommunion: { completed: 4 },
    safePort: { completed: 3 },
    networking: { completed: 2 },
    creativeFlow: { completed: 5 },
    beautyExploration: { completed: 3 },
    emotionalRelease: { completed: 3 },
    radicalImagination: { completed: 3 },
  }),
};

// ── Component ────────────────────────────────────────────────

const LeaderHub = ({ currentMember }: LeaderHubProps) => {
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);

  // Build the full member list: leader first, then mock members
  const allMembers: FamilyMember[] = [
    currentMember,
    ...MOCK_MEMBERS.map(m => ({ ...m, goals: MOCK_GOALS[m.id] })),
  ];

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
        <h1 className="font-serif text-4xl italic">The Family Garden</h1>
        <p className="text-sm text-[#2c2c2a]/40">See how everyone is growing</p>
      </div>

      {/* Member Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allMembers.map((member, i) => {
          const scores = getScores(member.goals);
          const moduleName = MODULE_NAMES[member.currentModule - 1] || 'Unknown';
          const isLeader = i === 0;

          return (
            <button
              key={member.id}
              onClick={() => setSelectedMember(member)}
              className="bg-white rounded-3xl border border-[#2c2c2a]/10 p-6 text-left hover:border-[#d4af37] hover:shadow-md transition-all relative"
            >
              {isLeader && (
                <span className="absolute top-4 right-4 flex items-center gap-1 bg-[#d4af37]/10 text-[#d4af37] px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  <Crown size={10} />
                  You
                </span>
              )}

              <div className="flex items-start gap-4">
                <div className="w-32 h-40 shrink-0">
                  <PlantVisual
                    stage={member.currentModule}
                    type={member.projectPlant}
                    instanceId={`leader-hub-${member.id}`}
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
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#2c2c2a]/30">Sovereignty</span>
                  </div>

                  {/* Mini domain bars */}
                  <div className="space-y-1">
                    {([
                      { label: 'Land', score: scores.land, color: 'bg-emerald-500' },
                      { label: 'Sea', score: scores.sea, color: 'bg-blue-500' },
                      { label: 'Sky', score: scores.sky, color: 'bg-amber-500' },
                    ] as const).map(d => (
                      <div key={d.label} className="flex items-center gap-2">
                        <span className="text-[8px] font-bold uppercase tracking-widest text-[#2c2c2a]/30 w-6">{d.label}</span>
                        <div className="flex-1 bg-[#2c2c2a]/5 h-1 rounded-full overflow-hidden">
                          <div className={`h-full ${d.color} transition-all`} style={{ width: `${d.score}%` }} />
                        </div>
                        <span className="text-[9px] font-mono text-[#2c2c2a]/30 w-7 text-right">{d.score}%</span>
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
        >
          <div
            className="bg-[#fdfbf7] rounded-3xl max-w-lg w-full p-8 relative space-y-6 max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 text-[#2c2c2a]/30 hover:text-[#2c2c2a] transition-colors"
            >
              <X size={20} />
            </button>

            {/* Plant */}
            <div className="flex justify-center">
              <div className="w-48 h-56">
                <PlantVisual
                  stage={selectedMember.currentModule}
                  type={selectedMember.projectPlant}
                  instanceId={`leader-detail-${selectedMember.id}`}
                />
              </div>
            </div>

            {/* Info */}
            <div className="text-center space-y-2">
              <h2 className="font-serif text-3xl italic">{selectedMember.name}</h2>
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
                    <p className="font-serif text-5xl mt-1">{scores.sovereignty}%</p>
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

            <p className="text-center text-[10px] font-bold uppercase tracking-widest text-[#2c2c2a]/20">
              Read only — view only mode
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaderHub;
