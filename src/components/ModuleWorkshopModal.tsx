import { useState } from 'react';
import {
  X, CloudRain, MoveDown, Hexagon, Flower2, Apple,
  BookOpen, HelpCircle, FlaskConical, TreePine, Eye, Users2
} from 'lucide-react';
import type { ModuleWorkshopModalProps, KnowledgeEntry, QuestionEntry, ExperienceEntry, PatternEntry } from '../types';
import { useModal } from '../hooks/useModal';

// ── Module 2: The Roots — Knowledge Accumulation ──────────────

const RootsWorkshop = ({ onAdvance, member, onUpdateMember }: Pick<ModuleWorkshopModalProps, 'onAdvance' | 'member' | 'onUpdateMember'>) => {
  const [tab, setTab] = useState<'knowledge' | 'questions'>('knowledge');
  const [resource, setResource] = useState('');
  const [resourceType, setResourceType] = useState<KnowledgeEntry['type']>('article');
  const [notes, setNotes] = useState('');
  const [question, setQuestion] = useState('');

  const addKnowledge = () => {
    if (!resource.trim()) return;
    const entry: KnowledgeEntry = {
      id: Date.now(),
      resource,
      type: resourceType,
      domains: member.projectImpactVectors,
      notes,
      addedAt: new Date().toISOString(),
    };
    onUpdateMember({ knowledgeLog: [...member.knowledgeLog, entry] });
    setResource('');
    setNotes('');
  };

  const addQuestion = () => {
    if (!question.trim()) return;
    const entry: QuestionEntry = { id: Date.now(), question, status: 'open' };
    onUpdateMember({ questionMap: [...member.questionMap, entry] });
    setQuestion('');
  };

  const canAdvance = member.knowledgeLog.length >= 1;

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button onClick={() => setTab('knowledge')} className={`flex-1 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${tab === 'knowledge' ? 'bg-[#2c2c2a] text-[#fdfbf7]' : 'border border-[#2c2c2a]/10'}`}>
          <BookOpen size={12} className="inline mr-1"/> Knowledge Log
        </button>
        <button onClick={() => setTab('questions')} className={`flex-1 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${tab === 'questions' ? 'bg-[#2c2c2a] text-[#fdfbf7]' : 'border border-[#2c2c2a]/10'}`}>
          <HelpCircle size={12} className="inline mr-1"/> Question Map
        </button>
      </div>

      {tab === 'knowledge' && (
        <div className="space-y-4">
          <div className="flex gap-2">
            {(['book', 'article', 'conversation', 'video', 'other'] as const).map(t => (
              <button key={t} onClick={() => setResourceType(t)} className={`px-2 py-1 rounded text-[10px] font-bold uppercase transition-all ${resourceType === t ? 'bg-[#d4af37] text-[#2c2c2a]' : 'bg-[#2c2c2a]/5 text-[#2c2c2a]/40'}`}>
                {t}
              </button>
            ))}
          </div>
          <input value={resource} onChange={e => setResource(e.target.value)} placeholder="Resource title or link..." className="w-full bg-[#2c2c2a]/5 p-3 rounded-xl text-sm outline-none focus:ring-1 ring-[#d4af37]"/>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Key takeaways..." className="w-full bg-[#2c2c2a]/5 p-3 rounded-xl text-sm outline-none focus:ring-1 ring-[#d4af37]" rows={2}/>
          <button onClick={addKnowledge} disabled={!resource.trim()} className="w-full py-2 rounded-xl text-xs font-bold uppercase bg-[#2c2c2a]/5 hover:bg-[#d4af37]/10 transition-all disabled:opacity-20">
            + Add to Knowledge Log
          </button>
          {member.knowledgeLog.length > 0 && (
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {member.knowledgeLog.map(k => (
                <div key={k.id} className="p-3 rounded-lg bg-[#2c2c2a]/5 text-sm">
                  <span className="text-[10px] font-bold uppercase text-[#d4af37] mr-2">{k.type}</span>
                  <span className="font-medium">{k.resource}</span>
                  {k.notes && <p className="text-xs text-[#2c2c2a]/50 mt-1">{k.notes}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === 'questions' && (
        <div className="space-y-4">
          <input value={question} onChange={e => setQuestion(e.target.value)} placeholder="What question needs answering?" className="w-full bg-[#2c2c2a]/5 p-3 rounded-xl text-sm outline-none focus:ring-1 ring-[#d4af37]"/>
          <button onClick={addQuestion} disabled={!question.trim()} className="w-full py-2 rounded-xl text-xs font-bold uppercase bg-[#2c2c2a]/5 hover:bg-[#d4af37]/10 transition-all disabled:opacity-20">
            + Add Question
          </button>
          {member.questionMap.length > 0 && (
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {member.questionMap.map(q => (
                <div key={q.id} className="p-3 rounded-lg bg-[#2c2c2a]/5 text-sm flex items-start gap-2">
                  <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${q.status === 'answered' ? 'bg-green-100 text-green-700' : q.status === 'exploring' ? 'bg-amber-100 text-amber-700' : 'bg-[#2c2c2a]/10 text-[#2c2c2a]/40'}`}>{q.status}</span>
                  <span>{q.question}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <button onClick={onAdvance} disabled={!canAdvance} className="w-full bg-[#2c2c2a] text-[#fdfbf7] py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-[#d4af37] hover:text-[#2c2c2a] transition-all disabled:opacity-20">
        Advance to The Stem
      </button>
    </div>
  );
};

// ── Module 3: The Stem — Experiential Learning ────────────────

const StemWorkshop = ({ onAdvance, member, onUpdateMember }: Pick<ModuleWorkshopModalProps, 'onAdvance' | 'member' | 'onUpdateMember'>) => {
  const [action, setAction] = useState('');
  const [evidence, setEvidence] = useState('');
  const [outcome, setOutcome] = useState('');

  const addExperience = () => {
    if (!action.trim()) return;
    const entry: ExperienceEntry = {
      id: Date.now(),
      action,
      evidence,
      outcome,
      date: new Date().toISOString(),
    };
    onUpdateMember({ experienceLog: [...member.experienceLog, entry] });
    setAction('');
    setEvidence('');
    setOutcome('');
  };

  const canAdvance = member.experienceLog.length >= 1;

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <input value={action} onChange={e => setAction(e.target.value)} placeholder="What action did you take?" className="w-full bg-[#2c2c2a]/5 p-3 rounded-xl text-sm outline-none focus:ring-1 ring-[#d4af37]"/>
        <input value={evidence} onChange={e => setEvidence(e.target.value)} placeholder="Evidence or notes..." className="w-full bg-[#2c2c2a]/5 p-3 rounded-xl text-sm outline-none focus:ring-1 ring-[#d4af37]"/>
        <textarea value={outcome} onChange={e => setOutcome(e.target.value)} placeholder="What was the outcome?" className="w-full bg-[#2c2c2a]/5 p-3 rounded-xl text-sm outline-none focus:ring-1 ring-[#d4af37]" rows={2}/>
        <button onClick={addExperience} disabled={!action.trim()} className="w-full py-2 rounded-xl text-xs font-bold uppercase bg-[#2c2c2a]/5 hover:bg-[#d4af37]/10 transition-all disabled:opacity-20">
          + Log Experience
        </button>
      </div>
      {member.experienceLog.length > 0 && (
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {member.experienceLog.map(e => (
            <div key={e.id} className="p-3 rounded-lg bg-[#2c2c2a]/5 text-sm">
              <span className="font-medium">{e.action}</span>
              {e.outcome && <p className="text-xs text-[#2c2c2a]/50 mt-1">{e.outcome}</p>}
            </div>
          ))}
        </div>
      )}
      <button onClick={onAdvance} disabled={!canAdvance} className="w-full bg-[#2c2c2a] text-[#fdfbf7] py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-[#d4af37] hover:text-[#2c2c2a] transition-all disabled:opacity-20">
        Advance to The Leaves
      </button>
    </div>
  );
};

// ── Module 4: The Leaves — Pattern Recognition ────────────────

const LeavesWorkshop = ({ onAdvance, member, onUpdateMember }: Pick<ModuleWorkshopModalProps, 'onAdvance' | 'member' | 'onUpdateMember'>) => {
  const [showClearing, setShowClearing] = useState(false);
  const [pattern, setPattern] = useState('');
  const [sources, setSources] = useState('');
  const [insight, setInsight] = useState('');

  const addPattern = () => {
    if (!pattern.trim()) return;
    const entry: PatternEntry = { id: Date.now(), pattern, sources, insight };
    onUpdateMember({ patternJournal: [...member.patternJournal, entry] });
    setPattern('');
    setSources('');
    setInsight('');
  };

  const canAdvance = member.patternJournal.length >= 1;

  if (showClearing) {
    return (
      <div className="space-y-6 text-center">
        <div className="mx-auto w-20 h-20 bg-[#d4af37]/10 rounded-full flex items-center justify-center text-[#d4af37]">
          <TreePine size={40}/>
        </div>
        <h4 className="font-serif text-2xl italic text-[#2c2c2a]">Clearing Practice</h4>
        <p className="text-sm text-[#2c2c2a]/60 leading-relaxed max-w-md mx-auto">
          Before reflecting, step away. Take a walk, meditate, pray, or simply breathe.
          Return with fresh eyes to see the patterns your mind has been weaving.
        </p>
        <button onClick={() => setShowClearing(false)} className="bg-[#2c2c2a] text-[#fdfbf7] px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-[#d4af37] hover:text-[#2c2c2a] transition-all">
          I've Returned — Begin Reflection
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <button onClick={() => setShowClearing(true)} className="w-full py-3 rounded-xl border border-[#d4af37]/30 text-[#d4af37] text-xs font-bold uppercase tracking-widest hover:bg-[#d4af37]/5 transition-all flex items-center justify-center gap-2">
        <Eye size={14}/> Start with Clearing Practice
      </button>

      <div className="space-y-3">
        <textarea value={pattern} onChange={e => setPattern(e.target.value)} placeholder="What pattern are you seeing?" className="w-full bg-[#2c2c2a]/5 p-3 rounded-xl text-sm outline-none focus:ring-1 ring-[#d4af37]" rows={2}/>
        <input value={sources} onChange={e => setSources(e.target.value)} placeholder="Where did you notice this? (Roots knowledge, Stem experiences...)" className="w-full bg-[#2c2c2a]/5 p-3 rounded-xl text-sm outline-none focus:ring-1 ring-[#d4af37]"/>
        <textarea value={insight} onChange={e => setInsight(e.target.value)} placeholder="What insight does this pattern reveal?" className="w-full bg-[#2c2c2a]/5 p-3 rounded-xl text-sm outline-none focus:ring-1 ring-[#d4af37]" rows={2}/>
        <button onClick={addPattern} disabled={!pattern.trim()} className="w-full py-2 rounded-xl text-xs font-bold uppercase bg-[#2c2c2a]/5 hover:bg-[#d4af37]/10 transition-all disabled:opacity-20">
          + Record Pattern
        </button>
      </div>

      {member.patternJournal.length > 0 && (
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {member.patternJournal.map(p => (
            <div key={p.id} className="p-3 rounded-lg bg-[#2c2c2a]/5 text-sm">
              <span className="font-medium">{p.pattern}</span>
              {p.insight && <p className="text-xs text-[#2c2c2a]/50 mt-1">{p.insight}</p>}
            </div>
          ))}
        </div>
      )}

      <button onClick={onAdvance} disabled={!canAdvance} className="w-full bg-[#2c2c2a] text-[#fdfbf7] py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-[#d4af37] hover:text-[#2c2c2a] transition-all disabled:opacity-20">
        Advance to The Bloom
      </button>
    </div>
  );
};

// ── Module 5: The Bloom — Community Extension ─────────────────

const BloomWorkshop = ({ onAdvance }: Pick<ModuleWorkshopModalProps, 'onAdvance'>) => {
  const [shared, setShared] = useState(false);
  const [feedback, setFeedback] = useState('');

  return (
    <div className="space-y-6">
      <p className="text-sm text-[#2c2c2a]/60 leading-relaxed">
        Share your project with a smaller, trusted group. Practice presenting your work and collect feedback before broader release.
      </p>
      <div className="space-y-4">
        <button
          onClick={() => setShared(true)}
          className={`w-full py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
            shared ? 'bg-[#d4af37] text-[#2c2c2a]' : 'border border-[#2c2c2a]/10 hover:bg-[#2c2c2a]/5'
          }`}
        >
          <Users2 size={14}/> {shared ? 'Shared with Inner Circle' : 'Share with Inner Circle'}
        </button>
        {shared && (
          <textarea
            value={feedback}
            onChange={e => setFeedback(e.target.value)}
            placeholder="What feedback did you receive? What needs refining?"
            className="w-full bg-[#2c2c2a]/5 p-3 rounded-xl text-sm outline-none focus:ring-1 ring-[#d4af37]"
            rows={3}
          />
        )}
      </div>
      <button onClick={onAdvance} disabled={!shared} className="w-full bg-[#2c2c2a] text-[#fdfbf7] py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-[#d4af37] hover:text-[#2c2c2a] transition-all disabled:opacity-20">
        Advance to The Fruit
      </button>
    </div>
  );
};

// ── Module 6: The Fruit — Utilizing Abundance ─────────────────

const FruitWorkshop = ({ onAdvance }: Pick<ModuleWorkshopModalProps, 'onAdvance'>) => {
  const [impact, setImpact] = useState('');
  const [value, setValue] = useState('');
  const [giving, setGiving] = useState('');

  const canAdvance = impact.trim().length > 0;

  return (
    <div className="space-y-4">
      <p className="text-sm text-[#2c2c2a]/60 leading-relaxed">
        Your project is finished and ready for the world. Track its impact, value created, and how you're giving back.
      </p>
      <div className="space-y-3">
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-widest text-[#2c2c2a]/40">Impact Description</label>
          <textarea value={impact} onChange={e => setImpact(e.target.value)} placeholder="What impact is this project having?" className="w-full bg-[#2c2c2a]/5 p-3 rounded-xl text-sm outline-none focus:ring-1 ring-[#d4af37]" rows={2}/>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-widest text-[#2c2c2a]/40">Value Created</label>
          <input value={value} onChange={e => setValue(e.target.value)} placeholder="Revenue, skills gained, relationships built..." className="w-full bg-[#2c2c2a]/5 p-3 rounded-xl text-sm outline-none focus:ring-1 ring-[#d4af37]"/>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-widest text-[#2c2c2a]/40">Giving Back</label>
          <input value={giving} onChange={e => setGiving(e.target.value)} placeholder="How are you sharing this abundance?" className="w-full bg-[#2c2c2a]/5 p-3 rounded-xl text-sm outline-none focus:ring-1 ring-[#d4af37]"/>
        </div>
      </div>
      <button onClick={onAdvance} disabled={!canAdvance} className="w-full bg-[#2c2c2a] text-[#fdfbf7] py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-[#d4af37] hover:text-[#2c2c2a] transition-all disabled:opacity-20">
        Advance to The Harvest
      </button>
    </div>
  );
};

// ── Main Modal ────────────────────────────────────────────────

const MODULE_CONFIG = [
  { id: 2, title: 'The Roots', subtitle: 'Knowledge Accumulation', icon: CloudRain },
  { id: 3, title: 'The Stem', subtitle: 'Experiential Learning', icon: MoveDown },
  { id: 4, title: 'The Leaves', subtitle: 'Prefrontal Insights', icon: Hexagon },
  { id: 5, title: 'The Bloom', subtitle: 'Community Extension', icon: Flower2 },
  { id: 6, title: 'The Fruit', subtitle: 'Utilizing Abundance', icon: Apple },
  { id: 7, title: 'The Harvest', subtitle: 'Synthesis & Sharing', icon: FlaskConical },
];

const ModuleWorkshopModal = ({ isOpen, module, onClose, onAdvance, member, onUpdateMember }: ModuleWorkshopModalProps) => {
  const { modalRef } = useModal(isOpen, onClose);
  if (!isOpen) return null;

  const config = MODULE_CONFIG.find(m => m.id === module);
  if (!config) return null;

  const renderWorkshop = () => {
    switch (module) {
      case 2: return <RootsWorkshop onAdvance={onAdvance} member={member} onUpdateMember={onUpdateMember} />;
      case 3: return <StemWorkshop onAdvance={onAdvance} member={member} onUpdateMember={onUpdateMember} />;
      case 4: return <LeavesWorkshop onAdvance={onAdvance} member={member} onUpdateMember={onUpdateMember} />;
      case 5: return <BloomWorkshop onAdvance={onAdvance} />;
      case 6: return <FruitWorkshop onAdvance={onAdvance} />;
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#2c2c2a]/90 backdrop-blur-md" role="dialog" aria-modal="true" aria-labelledby="module-workshop-title">
      <div ref={modalRef} className="bg-[#fdfbf7] w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in duration-300">
        <div className="p-8 space-y-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#d4af37]/10 rounded-full flex items-center justify-center text-[#d4af37]">
                {<config.icon size={24} aria-hidden="true" />}
              </div>
              <div>
                <h3 id="module-workshop-title" className="font-serif text-2xl italic text-[#2c2c2a]">{config.title}</h3>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#2c2c2a]/40">{config.subtitle}</p>
              </div>
            </div>
            <button onClick={onClose} aria-label="Close" className="text-[#2c2c2a] hover:text-[#d4af37]"><X size={20}/></button>
          </div>

          {renderWorkshop()}
        </div>
      </div>
    </div>
  );
};

export default ModuleWorkshopModal;
