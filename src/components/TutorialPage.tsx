import { useState, useEffect } from 'react';
import {
  Mountain, Anchor, Wind, Sparkles, Sprout,
  Heart, Leaf, Scale, Eye, Calendar, Users, Crown,
  ArrowDown, Search, RefreshCw, Lightbulb, Hammer,
  Droplets, FolderOpen, Wrench, FlaskConical, BookOpen,
  Moon, Gamepad2, User, Briefcase, Wallet, GraduationCap,
  Link, Globe, Award, Flame, Star, Palette, Music,
  Compass, Telescope, Dice1, ChevronRight, Lock,
} from 'lucide-react';
import PlantVisual from './PlantVisual';
import type { PlantArchetype } from '../types';

// ── Data ──────────────────────────────────────────────────────

const MODULES = [
  { id: 1, title: 'The Seed', desc: 'Discovery & Alignment', detail: 'Plant the spark of an idea. Define your project, choose your archetype, and align with your ethics.' },
  { id: 2, title: 'The Roots', desc: 'Knowledge Accumulation', detail: 'Build a strong foundation. Gather resources, log knowledge, and map your questions.' },
  { id: 3, title: 'The Stem', desc: 'Experiential Learning', detail: 'Put knowledge into practice. Record experiences and learn through doing.' },
  { id: 4, title: 'The Leaves', desc: 'Prefrontal Insights', detail: 'Recognize patterns. Synthesize what you\'ve learned into deeper understanding.' },
  { id: 5, title: 'The Bloom', desc: 'Community Extension', detail: 'Share your growth. Publish your project and connect with others.' },
  { id: 6, title: 'The Fruit', desc: 'Utilizing Abundance', detail: 'Harvest the results. Apply your learning and generate real-world impact.' },
  { id: 7, title: 'The Harvest', desc: 'Synthesis & Sharing', detail: 'Complete the cycle. Capture wisdom and scatter seeds for the next journey.' },
];

const ARCHETYPE_CATEGORIES: { category: string; label: string; meta: string; plants: { type: PlantArchetype; name: string; desc: string }[] }[] = [
  {
    category: 'visionary', label: 'Visionary', meta: 'Sky (Beautiful Flowers)',
    plants: [
      { type: 'sunflower', name: 'The Visionary', desc: 'Creativity — turns to face the light of new ideas.' },
      { type: 'dahlia', name: 'The Explorer', desc: 'Wonder — infinite layers of discovery.' },
      { type: 'orchid', name: 'The Alchemist', desc: 'Imagination — exotic transformation.' },
      { type: 'cherryBlossom', name: 'The Artist', desc: 'Beauty — fleeting perfection, living art.' },
      { type: 'lotus', name: 'The Enlightened', desc: 'Spirit — rises from darkness, awakening.' },
      { type: 'birdOfParadise', name: 'The Dreamer', desc: 'Vision — dramatic, reaching skyward.' },
    ],
  },
  {
    category: 'builder', label: 'Builder', meta: 'Sea (Exchange)',
    plants: [
      { type: 'oak', name: 'The Builder', desc: 'Family — the gathering tree, shelter for all.' },
      { type: 'apple', name: 'The Provider', desc: 'Village — communal harvest, shared abundance.' },
      { type: 'maple', name: 'The Strategist', desc: 'Finances — valuable resources like sap and wood.' },
      { type: 'pine', name: 'The Sentinel', desc: 'Opportunity — evergreen, always ready to grow.' },
      { type: 'redwood', name: 'The Networker', desc: 'Connections — interconnected root systems.' },
      { type: 'olive', name: 'The Diplomat', desc: 'Culture — ancient heritage, symbol of peace.' },
    ],
  },
  {
    category: 'survivor', label: 'Survivor', meta: 'Land (Medicine & Herbs)',
    plants: [
      { type: 'lavender', name: 'The Survivor', desc: 'Calm — aromatic resilience, soothing spirit.' },
      { type: 'aloe', name: 'The Healer', desc: 'Restoration — soothing balm, inner clarity.' },
      { type: 'chamomile', name: 'The Artisan', desc: 'Gentleness — patient healing, golden remedy.' },
      { type: 'sage', name: 'The Contemplator', desc: 'Wisdom — cleansing herb, deep reflection.' },
      { type: 'echinacea', name: 'The Warrior', desc: 'Defense — immune strength, bold petals.' },
      { type: 'ginseng', name: 'The Hermit', desc: 'Patience — deep roots, hidden power.' },
    ],
  },
];

const MICRO_CYCLE = [
  { step: 'Observe', icon: Eye, desc: 'Notice what\'s happening in your life without judgment.' },
  { step: 'Analyze', icon: Search, desc: 'Identify patterns, gaps, and opportunities for growth.' },
  { step: 'Implement', icon: Hammer, desc: 'Take one meaningful action based on your insights.' },
  { step: 'Reflect', icon: RefreshCw, desc: 'Review what happened. What will you carry forward?' },
];

const ETHICS = [
  { name: 'Earth Care', icon: Leaf, color: 'text-emerald-600 bg-emerald-50', desc: 'Nurture the living systems around you.' },
  { name: 'People Care', icon: Heart, color: 'text-rose-600 bg-rose-50', desc: 'Uplift the people in your life.' },
  { name: 'Share the Harvest', icon: Scale, color: 'text-blue-600 bg-blue-50', desc: 'Share your abundance with your community.' },
];

const LAND_DOMAINS = [
  { label: 'Physical Health', icon: Droplets }, { label: 'Mental Clarity', icon: Eye }, { label: 'Environmental Order', icon: FolderOpen },
  { label: 'Crafts', icon: Wrench }, { label: 'Tendrils', icon: FlaskConical }, { label: 'Reflection', icon: BookOpen },
  { label: 'Rest', icon: Moon }, { label: 'Play', icon: Gamepad2 }, { label: 'Solitude', icon: User },
];

const SEA_DOMAINS = [
  { label: 'Family', icon: Heart }, { label: 'Friends', icon: Users }, { label: 'Village', icon: Sprout },
  { label: 'Profession', icon: Briefcase }, { label: 'Finances', icon: Wallet }, { label: 'Opportunity', icon: GraduationCap },
  { label: 'Connections', icon: Link }, { label: 'Culture', icon: Globe }, { label: 'Reputation', icon: Award },
];

const SKY_DOMAINS = [
  { label: 'Creativity', icon: Sparkles }, { label: 'Adventure', icon: Flame }, { label: 'Wonder', icon: Star },
  { label: 'Imagination', icon: Lightbulb }, { label: 'Beauty', icon: Palette }, { label: 'Expression', icon: Music },
  { label: 'Spirit', icon: Compass }, { label: 'Vision', icon: Telescope }, { label: 'Freedom', icon: Dice1 },
];

// ── Component ─────────────────────────────────────────────────

const TUTORIAL_PASSWORD = 'trellis2026';

const TutorialPage = () => {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem('trellis_tutorial_unlocked') === 'true');
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    document.title = 'Trellis - How It Works';
    return () => { document.title = 'Trellis'; };
  }, []);

  const goToApp = () => { window.location.href = '/'; };

  const scrollToContent = () => {
    document.getElementById('domains')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === TUTORIAL_PASSWORD) {
      sessionStorage.setItem('trellis_tutorial_unlocked', 'true');
      setUnlocked(true);
    } else {
      setPasswordError(true);
      setPasswordInput('');
    }
  };

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-[#2c2c2a] flex items-center justify-center px-4">
        <div className="w-full max-w-sm space-y-8 text-center">
          <div className="space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#fdfbf7]/5 flex items-center justify-center mx-auto">
              <Lock className="text-[#d4af37]" size={24} />
            </div>
            <h1 className="font-serif text-2xl italic text-[#fdfbf7]">Trellis.</h1>
            <p className="text-[#fdfbf7]/50 text-sm">Enter the password to view this page</p>
          </div>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <input
              type="password"
              value={passwordInput}
              onChange={e => { setPasswordInput(e.target.value); setPasswordError(false); }}
              className="w-full bg-[#fdfbf7]/5 border border-[#fdfbf7]/10 rounded-xl px-4 py-3 text-[#fdfbf7] focus:border-[#d4af37] outline-none transition-colors text-center"
              placeholder="Password"
              autoFocus
            />
            {passwordError && (
              <p className="text-red-400 text-sm">Incorrect password</p>
            )}
            <button
              type="submit"
              className="w-full bg-[#d4af37] text-[#2c2c2a] py-3 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-[#fdfbf7] transition-all"
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-[#2c2c2a] font-sans selection:bg-[#2c2c2a] selection:text-[#fdfbf7]">

      {/* ── Fixed Nav ─────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#2c2c2a]/10">
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sprout className="text-[#d4af37]" size={22} />
            <span className="font-serif text-xl italic font-bold">Trellis.</span>
          </div>
          <button
            onClick={goToApp}
            className="bg-[#d4af37] text-[#2c2c2a] px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#c4a030] transition-colors"
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="bg-[#2c2c2a] text-[#fdfbf7] pt-28 pb-16 md:pt-36 md:pb-24 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">Welcome to Trellis</p>
            <h1 className="font-serif text-4xl md:text-6xl italic leading-tight">Your Life, Growing.</h1>
            <p className="text-[#fdfbf7]/60 text-sm md:text-base leading-relaxed max-w-lg mx-auto">
              A holistic life operating system built on the wisdom of natural systems. Map your existence across Land, Sea, and Sky — and watch yourself bloom.
            </p>
            <button
              onClick={scrollToContent}
              className="inline-flex items-center gap-2 bg-[#d4af37] text-[#2c2c2a] px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#fdfbf7] transition-colors"
            >
              Begin Your Journey
              <ArrowDown size={14} />
            </button>
          </div>
        </div>
        {/* Decorative plants */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-8 md:gap-20 opacity-[0.06] pointer-events-none" aria-hidden="true">
          <div className="w-32 h-48 md:w-48 md:h-64">
            <PlantVisual stage={6} type="sunflower" instanceId="tutorial-hero-sunflower" />
          </div>
          <div className="w-32 h-48 md:w-48 md:h-64">
            <PlantVisual stage={5} type="oak" instanceId="tutorial-hero-oak" />
          </div>
          <div className="w-32 h-48 md:w-48 md:h-64">
            <PlantVisual stage={4} type="lavender" instanceId="tutorial-hero-lavender" />
          </div>
        </div>
      </section>

      {/* ── Three Domains ─────────────────────────────────── */}
      <section id="domains" className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 md:px-8 space-y-10">
          <div className="text-center space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">The Framework</p>
            <h2 className="font-serif text-3xl md:text-4xl italic">Land, Sea, and Sky</h2>
            <p className="text-sm text-[#2c2c2a]/60 max-w-lg mx-auto">
              Your life is mapped across three domains — 27 dimensions of human flourishing, each one a thread in the tapestry of your sovereignty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {/* Land */}
            <div className="bg-emerald-50 rounded-2xl md:rounded-3xl border border-emerald-200/50 p-5 md:p-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Mountain size={18} className="text-emerald-700" />
                </div>
                <div>
                  <h3 className="font-serif text-xl italic text-emerald-900">Land</h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-700/60">Foundation</p>
                </div>
              </div>
              <p className="text-sm text-emerald-800/70">Your physical health, skills, rest, and inner landscape. The soil from which everything grows.</p>
              <div className="flex flex-wrap gap-1.5">
                {LAND_DOMAINS.map(d => (
                  <span key={d.label} className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                    <d.icon size={10} />
                    {d.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Sea */}
            <div className="bg-blue-50 rounded-2xl md:rounded-3xl border border-blue-200/50 p-5 md:p-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Anchor size={18} className="text-blue-800" />
                </div>
                <div>
                  <h3 className="font-serif text-xl italic text-blue-900">Sea</h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-blue-800/60">Social Space</p>
                </div>
              </div>
              <p className="text-sm text-blue-800/70">Your relationships, career, finances, and public life. The currents that connect you to the world.</p>
              <div className="flex flex-wrap gap-1.5">
                {SEA_DOMAINS.map(d => (
                  <span key={d.label} className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    <d.icon size={10} />
                    {d.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Sky */}
            <div className="bg-amber-50 rounded-2xl md:rounded-3xl border border-amber-200/50 p-5 md:p-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <Wind size={18} className="text-amber-700" />
                </div>
                <div>
                  <h3 className="font-serif text-xl italic text-amber-900">Sky</h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-amber-700/60">Aspiration</p>
                </div>
              </div>
              <p className="text-sm text-amber-800/70">Your creativity, spirituality, vision, and play. The atmosphere that gives life its color and meaning.</p>
              <div className="flex flex-wrap gap-1.5">
                {SKY_DOMAINS.map(d => (
                  <span key={d.label} className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                    <d.icon size={10} />
                    {d.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sovereignty Score ─────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">Your North Star</p>
              <h2 className="font-serif text-3xl md:text-4xl italic">The Sovereignty Score</h2>
              <p className="text-sm text-[#2c2c2a]/60">
                One number that reflects how balanced and intentional your life is across all three domains. Not a grade — a compass.
              </p>
            </div>

            {/* Mock score display */}
            <div className="bg-[#fdfbf7] rounded-2xl md:rounded-3xl border border-[#2c2c2a]/10 p-6 md:p-10 space-y-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#2c2c2a]/40">Sovereignty Score</p>
                <p className="font-serif text-5xl md:text-7xl mt-1">72%</p>
              </div>
              <div className="space-y-3 max-w-sm mx-auto">
                {([
                  { label: 'Land', score: 78, color: 'bg-emerald-500' },
                  { label: 'Sea', score: 65, color: 'bg-blue-500' },
                  { label: 'Sky', score: 73, color: 'bg-amber-500' },
                ] as const).map(d => (
                  <div key={d.label} className="flex items-center gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#2c2c2a]/50 w-8">{d.label}</span>
                    <div className="flex-1 bg-[#2c2c2a]/5 h-2 rounded-full overflow-hidden">
                      <div className={`h-full ${d.color} rounded-full transition-all`} style={{ width: `${d.score}%` }} />
                    </div>
                    <span className="text-xs font-mono text-[#2c2c2a]/50 w-10 text-right">{d.score}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Growth Journey (7 Modules) ────────────────────── */}
      <section className="py-16 md:py-24 bg-[#2c2c2a] text-[#fdfbf7]">
        <div className="max-w-6xl mx-auto px-4 md:px-8 space-y-10">
          <div className="text-center space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">The Growth Cycle</p>
            <h2 className="font-serif text-3xl md:text-4xl italic">Seven Modules of Transformation</h2>
            <p className="text-sm text-[#fdfbf7]/60 max-w-lg mx-auto">
              Every project follows the natural cycle of a plant — from seed to harvest. Each module has its own unique ritual and practice.
            </p>
          </div>

          {/* Module cards — horizontal scroll on mobile, wrapped grid on desktop */}
          <div className="flex md:grid md:grid-cols-7 gap-4 overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory md:snap-none -mx-4 px-4 md:mx-0 md:px-0">
            {MODULES.map(mod => (
              <div
                key={mod.id}
                className="flex-shrink-0 w-[200px] md:w-auto snap-center bg-[#fdfbf7]/5 border border-[#fdfbf7]/10 rounded-2xl p-4 space-y-3"
              >
                <div className="w-full h-28 md:h-24" aria-hidden="true">
                  <PlantVisual stage={mod.id} type="sunflower" instanceId={`tutorial-module-${mod.id}`} />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">Module {mod.id}</p>
                  <h3 className="font-serif text-sm italic">{mod.title}</h3>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-[#fdfbf7]/40">{mod.desc}</p>
                </div>
                <p className="text-xs text-[#fdfbf7]/50 leading-relaxed">{mod.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Plant Archetypes ──────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 md:px-8 space-y-10">
          <div className="text-center space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">Choose Your Path</p>
            <h2 className="font-serif text-3xl md:text-4xl italic">18 Plant Archetypes</h2>
            <p className="text-sm text-[#2c2c2a]/60 max-w-lg mx-auto">
              Every project grows as a unique plant. Your archetype reflects your approach to growth across three domains.
            </p>
          </div>

          {ARCHETYPE_CATEGORIES.map(cat => (
            <div key={cat.category} className="space-y-4">
              <div className="text-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">{cat.label} — {cat.meta}</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
                {cat.plants.map(arch => (
                  <div key={arch.type} className="bg-white rounded-xl md:rounded-2xl border border-[#2c2c2a]/10 p-3 md:p-4 text-center space-y-2">
                    <div className="w-20 h-28 md:w-24 md:h-32 mx-auto" aria-hidden="true">
                      <PlantVisual stage={5} type={arch.type} instanceId={`tutorial-arch-${arch.type}`} />
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="font-serif text-sm italic">{arch.name}</h3>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-[#2c2c2a]/40 capitalize">{arch.type}</p>
                    </div>
                    <p className="text-[10px] text-[#2c2c2a]/60 leading-relaxed">{arch.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Permacognition Micro-Cycle ────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8 space-y-10">
          <div className="text-center space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">The Practice</p>
            <h2 className="font-serif text-3xl md:text-4xl italic">The Permacognition Micro-Cycle</h2>
            <p className="text-sm text-[#2c2c2a]/60 max-w-lg mx-auto">
              A four-step practice loop you can run anytime — in a meeting, on a walk, or during a creative session. Growth on demand.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {MICRO_CYCLE.map((step, i) => (
              <div key={step.step} className="relative bg-[#fdfbf7] rounded-2xl border border-[#2c2c2a]/10 p-4 md:p-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center mx-auto">
                  <step.icon size={20} className="text-[#d4af37]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#2c2c2a]/40">Step {i + 1}</p>
                  <h3 className="font-serif text-lg italic">{step.step}</h3>
                </div>
                <p className="text-xs text-[#2c2c2a]/60 leading-relaxed">{step.desc}</p>
                {i < 3 && (
                  <ChevronRight size={16} className="absolute -right-2.5 top-1/2 -translate-y-1/2 text-[#d4af37] hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ethics Framework ──────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 md:px-8 space-y-10">
          <div className="text-center space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">The Foundation</p>
            <h2 className="font-serif text-3xl md:text-4xl italic">Three Ethical Pillars</h2>
            <p className="text-sm text-[#2c2c2a]/60 max-w-lg mx-auto">
              Every project in Trellis is grounded in three principles drawn from permaculture ethics. Growth that serves only yourself isn't growth at all.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {ETHICS.map(e => (
              <div key={e.name} className={`rounded-2xl md:rounded-3xl p-5 md:p-8 text-center space-y-4 ${e.color}`}>
                <div className="w-14 h-14 rounded-full bg-white/60 flex items-center justify-center mx-auto">
                  <e.icon size={24} />
                </div>
                <h3 className="font-serif text-xl italic">{e.name}</h3>
                <p className="text-sm opacity-80 leading-relaxed">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Daily Flow ────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">Your Day</p>
                <h2 className="font-serif text-3xl md:text-4xl italic">Daily Flow & Tasks</h2>
                <p className="text-sm text-[#2c2c2a]/60 leading-relaxed">
                  Structure your day around what matters. Your schedule and tasks are tagged with domains so you can see exactly where your energy is going.
                </p>
              </div>
              <ul className="space-y-3">
                {[
                  { icon: Calendar, text: 'Import from Google Calendar or ICS files' },
                  { icon: Sparkles, text: 'AI extracts tasks from photos of your to-do list' },
                  { icon: Mountain, text: 'Every task maps to a Land, Sea, or Sky domain' },
                ].map(item => (
                  <li key={item.text} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#d4af37]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <item.icon size={14} className="text-[#d4af37]" />
                    </div>
                    <span className="text-sm text-[#2c2c2a]/70">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Mock schedule */}
            <div className="bg-[#fdfbf7] rounded-2xl md:rounded-3xl border border-[#2c2c2a]/10 p-5 md:p-6 space-y-4">
              {[
                { time: '8:00am', title: 'Deep Work (Sea)', type: 'block' },
                { time: '10:00am', title: 'Team Sync', type: 'event' },
                { time: '12:00pm', title: 'Lunch & Walk (Land)', type: 'bio' },
                { time: '2:00pm', title: 'Project Time', type: 'project' },
              ].map(item => (
                <div key={item.time} className="flex gap-4 items-center">
                  <span className="text-xs font-mono text-[#2c2c2a]/40 w-16">{item.time}</span>
                  <div className={`flex-1 p-3 rounded-xl border-l-4 text-sm font-medium ${
                    item.type === 'project' ? 'border-[#d4af37] bg-[#d4af37]/10' :
                    item.type === 'bio' ? 'border-green-500 bg-green-50' :
                    'border-[#2c2c2a]/20 bg-white'
                  }`}>
                    {item.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Community & Family ────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 md:px-8 space-y-10">
          <div className="text-center space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">Together</p>
            <h2 className="font-serif text-3xl md:text-4xl italic">Community & Family</h2>
            <p className="text-sm text-[#2c2c2a]/60 max-w-lg mx-auto">
              Growth doesn't happen in isolation. Share your projects, nourish others, and watch your family garden flourish.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Community */}
            <div className="bg-white rounded-2xl md:rounded-3xl border border-[#2c2c2a]/10 p-5 md:p-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <Users size={18} className="text-blue-700" />
                </div>
                <h3 className="font-serif text-xl italic">Community Marketplace</h3>
              </div>
              <p className="text-sm text-[#2c2c2a]/60 leading-relaxed">
                Publish your projects for others to discover. Water projects with encouragement, resources, or funding. Graft your skills through mentorship.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Watering', 'Grafting', 'Publishing', 'Analytics'].map(tag => (
                  <span key={tag} className="text-[9px] font-bold uppercase tracking-widest bg-[#2c2c2a]/5 text-[#2c2c2a]/50 px-2.5 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Family */}
            <div className="bg-white rounded-2xl md:rounded-3xl border border-[#2c2c2a]/10 p-5 md:p-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center">
                  <Crown size={18} className="text-amber-700" />
                </div>
                <h3 className="font-serif text-xl italic">Family Garden</h3>
              </div>
              <p className="text-sm text-[#2c2c2a]/60 leading-relaxed">
                Create a family, invite members with a join code, and see everyone's progress in one beautiful garden. Kids get their own profiles with simple PIN login.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Join Codes', 'Kid Profiles', 'Shared Progress', 'Management'].map(tag => (
                  <span key={tag} className="text-[9px] font-bold uppercase tracking-widest bg-[#2c2c2a]/5 text-[#2c2c2a]/50 px-2.5 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AI Guide ──────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[#d4af37]/5">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#d4af37]/10 flex items-center justify-center mx-auto">
              <Sparkles size={28} className="text-[#d4af37]" />
            </div>
            <div className="space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">AI-Powered</p>
              <h2 className="font-serif text-3xl md:text-4xl italic">The Guide</h2>
              <p className="text-sm text-[#2c2c2a]/60 leading-relaxed max-w-lg mx-auto">
                Your Socratic mentor for every stage of growth. The Guide knows which module you're in, understands your domains, and asks the questions that lead to real insight — never just gives answers.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {['Module-Aware', 'Socratic Method', 'Task Suggestions', 'Goal Refinement', 'Photo Task Import'].map(tag => (
                <span key={tag} className="text-[9px] font-bold uppercase tracking-widest bg-[#d4af37]/10 text-[#d4af37] px-3 py-1.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Footer ────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[#2c2c2a] text-[#fdfbf7] relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="font-serif text-3xl md:text-5xl italic">Ready to grow?</h2>
            <p className="text-[#fdfbf7]/60 text-sm max-w-md mx-auto">
              Trellis is currently invite-only. Reach out to request access and begin mapping your life across Land, Sea, and Sky.
            </p>
          </div>
        </div>
        {/* Decorative plants */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-12 opacity-[0.04] pointer-events-none" aria-hidden="true">
          <div className="w-40 h-56">
            <PlantVisual stage={7} type="oak" instanceId="tutorial-cta-oak" />
          </div>
          <div className="w-40 h-56">
            <PlantVisual stage={7} type="sunflower" instanceId="tutorial-cta-sunflower" />
          </div>
          <div className="w-40 h-56">
            <PlantVisual stage={7} type="lavender" instanceId="tutorial-cta-lavender" />
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────── */}
      <footer className="py-6 bg-[#2c2c2a] border-t border-[#fdfbf7]/10">
        <div className="max-w-6xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sprout className="text-[#d4af37]" size={16} />
            <span className="font-serif text-sm italic text-[#fdfbf7]/40">Trellis.</span>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#fdfbf7]/30">
            Your holistic life operating system
          </p>
        </div>
      </footer>
    </div>
  );
};

export default TutorialPage;
