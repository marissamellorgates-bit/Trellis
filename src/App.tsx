import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Mountain, Anchor, Wind, Shield, Sparkles,
  CheckCircle2,
  Sprout,
  Lock, ChevronDown,
  Building, Home, Tent, Bell,
  LogOut,
  Droplets, Eye, FolderOpen,
  Wrench, FlaskConical, BookOpen,
  Moon, Gamepad2, User,
  // Sea — Harbor
  Heart, Users,
  // Sea — Trade Winds
  Briefcase, Wallet, GraduationCap,
  // Sea — Horizon
  Link, Globe, Award,
  // Sky — Ascent
  Flame, Star,
  // Sky — Atmosphere
  Lightbulb, Palette, Music,
  // Sky — Navigation
  Compass, Telescope, Dice1,
} from 'lucide-react';
import type { Session } from '@supabase/supabase-js';

import type {
  GoalsMap, DomainKey, MetaDomain, DomainConfig, DomainSubGroup, Task, ScheduleItem,
  FamilyMember, CommunityProject, CommunityConfig, PlantArchetype,
  EthicsCheck, HarvestRecord, SowEntry, SowTier, ModuleInfo,
} from './types';
import { ARCHETYPE_INFO, SOW_TIERS } from './types';

import PlantVisual from './components/PlantVisual';
import AIMentorPanel from './components/AIMentorPanel';
import HarvestModal from './components/HarvestModal';
import FlowView from './components/FlowView';
import CommunityGarden from './components/CommunityGarden';
import SowModal from './components/SowModal';
import ModuleWorkshopModal from './components/ModuleWorkshopModal';
import ImportScheduleModal from './components/ImportScheduleModal';
import AuthScreen from './components/AuthScreen';
import { fetchGoogleCalendarEvents } from './lib/googleCalendar';
import { supabase, supabaseConfigured, loadProfile, saveProfile } from './lib/supabase';

// ── Constants ─────────────────────────────────────────────────

const DEFAULT_GOALS: GoalsMap = {
  // Land — Soil
  biological: { completed: 1.0, total: 4, label: 'Physical Health', icon: Droplets, goal: "8h sleep, 2L water" },
  mentalClarity: { completed: 1.0, total: 4, label: 'Mental Clarity', icon: Eye, goal: "Morning meditation" },
  environmentalOrder: { completed: 0.0, total: 4, label: 'Environmental Order', icon: FolderOpen, goal: "Clean workspace" },
  // Land — Vine
  coreCompetencies: { completed: 1.0, total: 5, label: 'Crafts', icon: Wrench, goal: "Deepen primary skill" },
  experimentalTendrils: { completed: 0.0, total: 4, label: 'Tendrils', icon: FlaskConical, goal: "Try something new" },
  reflectiveSynthesis: { completed: 0.0, total: 3, label: 'Reflection', icon: BookOpen, goal: "Weekly review" },
  // Land — Canopy
  passiveRestoration: { completed: 1.0, total: 4, label: 'Rest', icon: Moon, goal: "Guilt-free downtime" },
  activePlay: { completed: 0.0, total: 5, label: 'Play', icon: Gamepad2, goal: "Guitar practice" },
  solitude: { completed: 0.0, total: 3, label: 'Solitude', icon: User, goal: "Solo nature walk" },
  // Sea — Harbor
  innerCircle: { completed: 1.0, total: 5, label: 'Family', icon: Heart, goal: "Quality time with loved ones" },
  socialCommunion: { completed: 0.0, total: 4, label: 'Friends', icon: Users, goal: "Connect with a friend" },
  safePort: { completed: 0.0, total: 4, label: 'Village', icon: Home, goal: "Show up for the community" },
  // Sea — Trade Winds
  professionalExchange: { completed: 0.0, total: 7, label: 'Profession', icon: Briefcase, goal: "Deliver project milestone" },
  marketRealities: { completed: 0.0, total: 5, label: 'Finances', icon: Wallet, goal: "Save 10%" },
  instructionalCurrent: { completed: 0.0, total: 4, label: 'Opportunity', icon: GraduationCap, goal: "Pursue a new opening" },
  // Sea — Horizon
  networking: { completed: 0.0, total: 4, label: 'Connections', icon: Link, goal: "Reach out to someone new" },
  culturalImmersion: { completed: 0.0, total: 3, label: 'Culture', icon: Globe, goal: "Explore an unfamiliar tradition" },
  publicReputation: { completed: 0.0, total: 3, label: 'Reputation', icon: Award, goal: "Curate public presence" },
  // Sky — Ascent
  creativeFlow: { completed: 0.0, total: 5, label: 'Creativity', icon: Sparkles, goal: "Deep creative session" },
  physicalExhilaration: { completed: 0.0, total: 4, label: 'Adventure', icon: Flame, goal: "Adventure outing" },
  aweAndWonder: { completed: 0.0, total: 3, label: 'Wonder', icon: Star, goal: "Seek a sublime moment" },
  // Sky — Atmosphere
  radicalImagination: { completed: 0.0, total: 4, label: 'Imagination', icon: Lightbulb, goal: "Unbounded brainstorm" },
  beautyExploration: { completed: 0.0, total: 3, label: 'Beauty', icon: Palette, goal: "Appreciate art for its own sake" },
  emotionalRelease: { completed: 1.0, total: 4, label: 'Expression', icon: Music, goal: "Music, laughter, or art" },
  // Sky — Navigation
  spiritualPurpose: { completed: 1.0, total: 5, label: 'Spirit', icon: Compass, goal: "Connect with higher meaning" },
  lifeVision: { completed: 0.0, total: 4, label: 'Vision', icon: Telescope, goal: "Dream about the long term" },
  purePlay: { completed: 0.0, total: 3, label: 'Freedom', icon: Dice1, goal: "No-goal, no-outcome play" },
};

const AVAILABLE_COMMUNITIES: CommunityConfig[] = [
  { id: 'private', name: 'Private Greenhouse', icon: Lock, type: 'personal' },
  { id: 'family', name: 'Family Garden', icon: Home, type: 'family' },
  { id: 'work', name: 'Work Orchard', icon: Briefcase, type: 'business' },
  { id: 'town', name: 'Local Community', icon: Building, type: 'local' },
  { id: 'church', name: 'Faith Community', icon: Tent, type: 'org' }
];

const COMMUNITY_PROJECTS: CommunityProject[] = [
  { id: 101, author: "Sarah (Coworker)", community: 'work', title: "Daughter's Cookie Fundraiser", plant: 'sunflower', stage: 5 },
  { id: 102, author: "Mike (Neighbor)", community: 'town', title: "Community Garden Build", plant: 'oak', stage: 3 },
  { id: 103, author: "Noah (Son)", community: 'family', title: "Learn Python", plant: 'cactus', stage: 2 }
];

const INITIAL_TASKS: Task[] = [
  { id: 1, title: "Buy organic potting soil", domain: 'environmentalOrder', isProjectRelated: true, done: false, due: 'Today', estimatedMinutes: 45 },
  { id: 2, title: "Quarterly Review Presentation", domain: 'professionalExchange', isProjectRelated: false, done: false, due: 'Tomorrow', estimatedMinutes: 120 },
  { id: 3, title: "Call Mom", domain: 'innerCircle', isProjectRelated: false, done: false, due: 'Today', estimatedMinutes: 20 }
];

const INITIAL_SCHEDULE: ScheduleItem[] = [
  { time: '08:00', title: 'Deep Work (Sea)', type: 'block' },
  { time: '10:00', title: 'Team Sync', type: 'event' },
  { time: '12:00', title: 'Lunch & Walk (Land)', type: 'bio' },
  { time: '14:00', title: 'Project Time (Sunflower)', type: 'project' }
];

const INITIAL_FAMILY: FamilyMember[] = [
  {
    id: 1,
    name: 'Leader',
    role: 'Project Cultivator',
    goals: { ...DEFAULT_GOALS },
    projectTitle: 'Permacognition Launch',
    projectImpactVectors: ['professionalExchange', 'instructionalCurrent', 'innerCircle'],
    currentModule: 6,
    projectPlant: 'sunflower',
    projectVisibility: ['family', 'work'],
    projectEthicsCheck: { earth: true, people: true, fair: true },
    projectSharingScope: ['family', 'work'],
    tasks: INITIAL_TASKS,
    schedule: INITIAL_SCHEDULE,
    harvestHistory: [],
    sowLog: [],
    knowledgeLog: [],
    questionMap: [],
    experienceLog: [],
    patternJournal: [],
  }
];

const PERMACOGNITION_MODULES: ModuleInfo[] = [
  { id: 1, title: "The Seed", desc: "Discovery & Alignment" },
  { id: 2, title: "The Roots", desc: "Knowledge Accumulation" },
  { id: 3, title: "The Stem", desc: "Experiential Learning" },
  { id: 4, title: "The Leaves", desc: "Prefrontal Insights" },
  { id: 5, title: "The Bloom", desc: "Community Extension" },
  { id: 6, title: "The Fruit", desc: "Utilizing Abundance" },
  { id: 7, title: "The Harvest", desc: "Synthesis & Sharing" }
];

const ALL_DOMAIN_KEYS: DomainKey[] = [
  'biological', 'mentalClarity', 'environmentalOrder',
  'coreCompetencies', 'experimentalTendrils', 'reflectiveSynthesis',
  'passiveRestoration', 'activePlay', 'solitude',
  'innerCircle', 'socialCommunion', 'safePort',
  'professionalExchange', 'marketRealities', 'instructionalCurrent',
  'networking', 'culturalImmersion', 'publicReputation',
  'creativeFlow', 'physicalExhilaration', 'aweAndWonder',
  'radicalImagination', 'beautyExploration', 'emotionalRelease',
  'spiritualPurpose', 'lifeVision', 'purePlay',
];

const scheduleItemKey = (item: ScheduleItem): string =>
  item.sourceId ?? `${item.time}-${item.title}`;

// ── App ───────────────────────────────────────────────────────

const App = () => {
  // ── Auth State ─────────────────────────────────────────────
  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(supabaseConfigured);
  const [profileLoaded, setProfileLoaded] = useState(!supabaseConfigured);

  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(INITIAL_FAMILY);
  const [activeMemberId] = useState(1);
  const [viewMode, setViewMode] = useState<'dashboard' | 'flow' | 'community'>('dashboard');
  const [isFamilyMenuOpen, setIsFamilyMenuOpen] = useState(false);
  const [showAIMentor, setShowAIMentor] = useState(false);
  const [showSow, setShowSow] = useState(false);
  const [showModuleWorkshop, setShowModuleWorkshop] = useState(false);
  const [showImportSchedule, setShowImportSchedule] = useState(false);
  const [completedScheduleItems, setCompletedScheduleItems] = useState<Set<string>>(new Set());
  const [googleToken, setGoogleToken] = useState<string | null>(null);
  const syncIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const activeMember = familyMembers.find(m => m.id === activeMemberId) || familyMembers[0];
  const goals = activeMember.goals;
  const tasks = activeMember.tasks;
  const schedule = activeMember.schedule;

  const [activeDomain, setActiveDomain] = useState<MetaDomain>('land');
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  const [isArchitecting, setIsArchitecting] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [sparkInput, setSparkInput] = useState("");
  const [harvestWisdom, setHarvestWisdom] = useState("");
  const [harvestSharing, setHarvestSharing] = useState<string[]>([]);

  const [selectedDiscoveryVectors, setSelectedDiscoveryVectors] = useState<DomainKey[]>([]);
  const [ethicsCheck, setEthicsCheck] = useState<EthicsCheck>({ earth: false, people: false, fair: false });
  const [sharingScope, setSharingScope] = useState<string[]>(['private']);
  const [selectedArchetype, setSelectedArchetype] = useState<PlantArchetype | null>(null);

  // ── Auth Bootstrap ─────────────────────────────────────────

  useEffect(() => {
    if (!supabaseConfigured) return;

    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setAuthLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      if (!s) {
        setProfileLoaded(false);
        setFamilyMembers(INITIAL_FAMILY);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // ── Load Profile from DB ──────────────────────────────────

  useEffect(() => {
    if (!session?.user || profileLoaded) return;

    loadProfile(session.user.id, DEFAULT_GOALS).then(member => {
      if (member) {
        setFamilyMembers([member]);
      } else {
        // New user — use defaults but set name from auth metadata
        const defaultMember = { ...INITIAL_FAMILY[0] };
        defaultMember.name = session.user.user_metadata?.name || 'You';
        defaultMember.projectTitle = '';
        defaultMember.currentModule = 1;
        defaultMember.tasks = [];
        defaultMember.schedule = [];
        defaultMember.harvestHistory = [];
        defaultMember.sowLog = [];
        defaultMember.knowledgeLog = [];
        defaultMember.questionMap = [];
        defaultMember.experienceLog = [];
        defaultMember.patternJournal = [];
        setFamilyMembers([defaultMember]);

        // Insert profile row so future saves work
        saveProfile(session.user.id, defaultMember);
      }
      setProfileLoaded(true);
    });
  }, [session, profileLoaded]);

  // ── Persist Helper ─────────────────────────────────────────

  const updateActiveMember = useCallback((updates: Partial<FamilyMember>) => {
    setFamilyMembers(prev => prev.map(m => m.id === activeMemberId ? { ...m, ...updates } : m));

    // Fire-and-forget DB save
    if (session?.user) {
      saveProfile(session.user.id, updates);
    }
  }, [activeMemberId, session]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const addTask = (task: { title: string; domain: string }) => {
    const newTask: Task = {
      id: Date.now(),
      title: task.title || "New Task",
      domain: task.domain || "instructionalCurrent",
      isProjectRelated: true,
      done: false,
      due: 'Today'
    };
    updateActiveMember({ tasks: [...tasks, newTask] });
    setViewMode('flow');
    setShowAIMentor(false);
  };

  const getDomainScore = (goalsObj: GoalsMap, keys: DomainKey[]) => {
    let total = 0;
    let completed = 0;
    keys.forEach(key => {
      total += goalsObj[key].total;
      completed += goalsObj[key].completed;
    });
    return Math.min(Math.round((completed / total) * 100), 100);
  };

  const landScore = getDomainScore(goals, [
    'biological', 'mentalClarity', 'environmentalOrder',
    'coreCompetencies', 'experimentalTendrils', 'reflectiveSynthesis',
    'passiveRestoration', 'activePlay', 'solitude',
  ]);
  const seaScore = getDomainScore(goals, [
    'innerCircle', 'socialCommunion', 'safePort',
    'professionalExchange', 'marketRealities', 'instructionalCurrent',
    'networking', 'culturalImmersion', 'publicReputation',
  ]);
  const skyScore = getDomainScore(goals, [
    'creativeFlow', 'physicalExhilaration', 'aweAndWonder',
    'radicalImagination', 'beautyExploration', 'emotionalRelease',
    'spiritualPurpose', 'lifeVision', 'purePlay',
  ]);
  const totalSovereigntyScore = Math.round((landScore + seaScore + skyScore) / 3);

  const LAND_GROUPS: DomainSubGroup[] = [
    { name: 'Soil', subtitle: 'Base care', keys: ['biological', 'mentalClarity', 'environmentalOrder'] },
    { name: 'Vine', subtitle: 'Growth & learning', keys: ['coreCompetencies', 'experimentalTendrils', 'reflectiveSynthesis'] },
    { name: 'Canopy', subtitle: 'Rest & shade', keys: ['passiveRestoration', 'activePlay', 'solitude'] },
  ];

  const SEA_GROUPS: DomainSubGroup[] = [
    { name: 'Harbor', subtitle: 'Close community', keys: ['innerCircle', 'socialCommunion', 'safePort'] },
    { name: 'Trade Winds', subtitle: 'Exchange & movement', keys: ['professionalExchange', 'marketRealities', 'instructionalCurrent'] },
    { name: 'Horizon', subtitle: 'Expansion', keys: ['networking', 'culturalImmersion', 'publicReputation'] },
  ];

  const SKY_GROUPS: DomainSubGroup[] = [
    { name: 'Ascent', subtitle: 'Peak experiences', keys: ['creativeFlow', 'physicalExhilaration', 'aweAndWonder'] },
    { name: 'Atmosphere', subtitle: 'Mental freedom', keys: ['radicalImagination', 'beautyExploration', 'emotionalRelease'] },
    { name: 'Navigation', subtitle: 'Vision & purpose', keys: ['spiritualPurpose', 'lifeVision', 'purePlay'] },
  ];

  const domains: Record<MetaDomain, DomainConfig> = {
    land: {
      title: 'Land', subtitle: 'Foundation', icon: Mountain, color: 'text-emerald-700', bg: 'bg-emerald-50',
      keys: ['biological', 'mentalClarity', 'environmentalOrder', 'coreCompetencies', 'experimentalTendrils', 'reflectiveSynthesis', 'passiveRestoration', 'activePlay', 'solitude'],
      groups: LAND_GROUPS,
    },
    sea: {
      title: 'Sea', subtitle: 'Social Space', icon: Anchor, color: 'text-blue-800', bg: 'bg-blue-50',
      keys: ['innerCircle', 'socialCommunion', 'safePort', 'professionalExchange', 'marketRealities', 'instructionalCurrent', 'networking', 'culturalImmersion', 'publicReputation'],
      groups: SEA_GROUPS,
    },
    sky: {
      title: 'Sky', subtitle: 'Realm of Flight', icon: Wind, color: 'text-amber-700', bg: 'bg-amber-50',
      keys: ['creativeFlow', 'physicalExhilaration', 'aweAndWonder', 'radicalImagination', 'beautyExploration', 'emotionalRelease', 'spiritualPurpose', 'lifeVision', 'purePlay'],
      groups: SKY_GROUPS,
    }
  };

  // ── Seed Discovery ────────────────────────────────────────

  const finalizeDiscovery = () => {
    if (!selectedArchetype) return;
    updateActiveMember({
      projectTitle: sparkInput,
      projectPlant: selectedArchetype,
      projectImpactVectors: selectedDiscoveryVectors,
      projectEthicsCheck: { ...ethicsCheck },
      projectSharingScope: [...sharingScope],
      currentModule: 1
    });
    setIsArchitecting(false);
    setSparkInput("");
    setSelectedDiscoveryVectors([]);
    setEthicsCheck({ earth: false, people: false, fair: false });
    setSharingScope(['private']);
    setSelectedArchetype(null);
  };

  // ── Harvest ───────────────────────────────────────────────

  const finalizeHarvest = () => {
    const record: HarvestRecord = {
      id: Date.now(),
      projectTitle: activeMember.projectTitle,
      plant: activeMember.projectPlant,
      wisdom: harvestWisdom,
      sharedWith: harvestSharing,
      completedAt: new Date().toISOString(),
      seedsScattered: [],
    };
    updateActiveMember({
      currentModule: 1,
      projectTitle: '',
      harvestHistory: [...activeMember.harvestHistory, record],
      knowledgeLog: [],
      questionMap: [],
      experienceLog: [],
      patternJournal: [],
    });
    setIsSynthesizing(false);
    setHarvestWisdom("");
    setHarvestSharing([]);
  };

  // ── Module Advancement ────────────────────────────────────

  const advanceModule = () => {
    const next = activeMember.currentModule + 1;
    if (next <= 7) {
      updateActiveMember({ currentModule: next });
    } else {
      setIsSynthesizing(true);
    }
    setShowModuleWorkshop(false);
  };

  // ── Sow Completion ───────────────────────────────────

  const completeSow = (entry: Omit<SowEntry, 'id' | 'completedAt'>) => {
    const newEntry: SowEntry = {
      ...entry,
      id: Date.now(),
      completedAt: new Date().toISOString(),
    };
    // Bump the tagged domain's score based on tier
    const domain = entry.domain as DomainKey;
    const boost = SOW_TIERS.find(t => t.tier === entry.tier)?.boost ?? 0.25;
    const updatedGoals = { ...activeMember.goals };
    if (updatedGoals[domain]) {
      updatedGoals[domain] = {
        ...updatedGoals[domain],
        completed: Math.min(updatedGoals[domain].completed + boost, updatedGoals[domain].total),
      };
    }
    updateActiveMember({
      sowLog: [...activeMember.sowLog, newEntry],
      goals: updatedGoals,
    });
    setShowSow(false);
  };

  // ── Auto-Sow from Tasks & Schedule ──────────────────────

  const tierFromMinutes = (minutes: number): SowTier => {
    if (minutes >= 120) return 'compost';
    if (minutes >= 60) return 'mulch';
    if (minutes >= 30) return 'tend';
    return 'drop';
  };

  const scheduleItemMinutes = (index: number): number => {
    const parseTime = (t: string) => {
      const [h, m] = t.split(':').map(Number);
      return h * 60 + m;
    };
    const sorted = [...schedule].sort((a, b) => a.time.localeCompare(b.time));
    const start = parseTime(sorted[index].time);
    const end = index + 1 < sorted.length ? parseTime(sorted[index + 1].time) : start + 60;
    return end - start;
  };

  const existingSourceIds = new Set(
    schedule.filter(s => s.sourceId).map(s => s.sourceId!)
  );

  const handleImportScheduleItems = (items: ScheduleItem[], token?: string) => {
    if (token) setGoogleToken(token);
    const deduped = items.filter(
      item => !item.sourceId || !existingSourceIds.has(item.sourceId)
    );
    if (deduped.length === 0) return;
    const merged = [...schedule, ...deduped].sort((a, b) => a.time.localeCompare(b.time));
    updateActiveMember({ schedule: merged });
  };

  // ── Google Calendar Auto-Sync ──────────────────────────

  const syncGoogleCalendar = async (token: string) => {
    try {
      const freshEvents = await fetchGoogleCalendarEvents(token);
      setFamilyMembers(prev => prev.map(m => {
        if (m.id !== activeMemberId) return m;
        const nonGoogle = m.schedule.filter(s => s.source !== 'google');
        const googleIds = new Set(freshEvents.map(e => e.sourceId));
        const keptGoogle = m.schedule.filter(s => s.source === 'google' && !googleIds.has(s.sourceId));
        const merged = [...nonGoogle, ...keptGoogle, ...freshEvents].sort((a, b) => a.time.localeCompare(b.time));
        return { ...m, schedule: merged };
      }));
    } catch {
      // Token expired — stop syncing
      setGoogleToken(null);
    }
  };

  useEffect(() => {
    if (syncIntervalRef.current) {
      clearInterval(syncIntervalRef.current);
      syncIntervalRef.current = null;
    }
    if (!googleToken) return;

    // Sync immediately, then every 3 minutes
    syncGoogleCalendar(googleToken);
    syncIntervalRef.current = setInterval(() => {
      syncGoogleCalendar(googleToken);
    }, 3 * 60 * 1000);

    return () => {
      if (syncIntervalRef.current) clearInterval(syncIntervalRef.current);
    };
  }, [googleToken]);

  const autoSow = (note: string, domain: DomainKey | string, tier: SowTier) => {
    const entry: SowEntry = {
      id: Date.now(),
      tier,
      note,
      domain,
      completedAt: new Date().toISOString(),
    };
    const domainKey = domain as DomainKey;
    const boost = SOW_TIERS.find(t => t.tier === tier)?.boost ?? 0.25;
    const updatedGoals = { ...activeMember.goals };
    if (updatedGoals[domainKey]) {
      updatedGoals[domainKey] = {
        ...updatedGoals[domainKey],
        completed: Math.min(updatedGoals[domainKey].completed + boost, updatedGoals[domainKey].total),
      };
    }
    updateActiveMember({
      sowLog: [...activeMember.sowLog, entry],
      goals: updatedGoals,
    });
  };

  const toggleTask = (taskId: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    const wasDone = task.done;
    const updatedTasks = tasks.map(t => t.id === taskId ? { ...t, done: !t.done } : t);
    updateActiveMember({ tasks: updatedTasks });
    if (!wasDone) {
      const tier = tierFromMinutes(task.estimatedMinutes ?? 15);
      autoSow(`Completed: ${task.title}`, task.domain, tier);
    }
  };

  const completeScheduleItem = (index: number) => {
    const item = schedule[index];
    if (!item) return;
    const key = scheduleItemKey(item);
    if (completedScheduleItems.has(key)) return;
    setCompletedScheduleItems(prev => new Set(prev).add(key));
    const minutes = scheduleItemMinutes(index);
    const tier = tierFromMinutes(minutes);
    const domainGuess: DomainKey =
      item.type === 'project' ? (activeMember.projectImpactVectors[0] || 'instructionalCurrent') :
      item.type === 'bio' ? 'biological' :
      'professionalExchange';
    autoSow(`Completed: ${item.title}`, domainGuess, tier);
  };

  // ── Render ────────────────────────────────────────────────

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#2c2c2a] flex items-center justify-center">
        <div className="text-center space-y-4">
          <Sprout className="text-[#d4af37] mx-auto animate-pulse" size={40} />
          <p className="text-[#fdfbf7]/40 text-sm font-bold uppercase tracking-widest">Loading...</p>
        </div>
      </div>
    );
  }

  if (supabaseConfigured && !session) {
    return <AuthScreen />;
  }

  if (!profileLoaded) {
    return (
      <div className="min-h-screen bg-[#2c2c2a] flex items-center justify-center">
        <div className="text-center space-y-4">
          <Sprout className="text-[#d4af37] mx-auto animate-pulse" size={40} />
          <p className="text-[#fdfbf7]/40 text-sm font-bold uppercase tracking-widest">Loading your garden...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-[#2c2c2a] font-sans selection:bg-[#2c2c2a] selection:text-[#fdfbf7]">
      <AIMentorPanel
        isOpen={showAIMentor}
        onClose={() => setShowAIMentor(false)}
        context={{
          title: activeMember.projectTitle,
          plant: activeMember.projectPlant,
          module: activeMember.currentModule,
          moduleName: PERMACOGNITION_MODULES[activeMember.currentModule - 1]?.title
        }}
        onAddTask={addTask}
      />

      <HarvestModal
        isOpen={isSynthesizing}
        wisdom={harvestWisdom}
        sharing={harvestSharing}
        communities={AVAILABLE_COMMUNITIES}
        onWisdomChange={setHarvestWisdom}
        onSharingChange={setHarvestSharing}
        onFinalize={finalizeHarvest}
      />

      <SowModal
        isOpen={showSow}
        onClose={() => setShowSow(false)}
        onComplete={completeSow}
        domains={ALL_DOMAIN_KEYS}
        goals={goals}
      />

      <ModuleWorkshopModal
        isOpen={showModuleWorkshop}
        module={activeMember.currentModule}
        onClose={() => setShowModuleWorkshop(false)}
        onAdvance={advanceModule}
        member={activeMember}
        onUpdateMember={updateActiveMember}
      />

      <ImportScheduleModal
        isOpen={showImportSchedule}
        onClose={() => setShowImportSchedule(false)}
        onImport={handleImportScheduleItems}
        existingSourceIds={existingSourceIds}
      />

      {/* Nav */}
      <nav className="border-b border-[#2c2c2a]/10 bg-white/50 backdrop-blur-md px-6 h-16 flex justify-between items-center sticky top-0 md:relative z-50">
        <div className="flex items-center gap-8">
          <img src="/trellis-logo.png" alt="Trellis." className="h-14 mix-blend-multiply rounded-xl" />
          <div className="hidden md:flex gap-1 bg-[#2c2c2a]/5 p-1 rounded-full">
            {(['dashboard', 'flow', 'community'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${viewMode === mode ? 'bg-white shadow-sm text-[#2c2c2a]' : 'text-[#2c2c2a]/40 hover:text-[#2c2c2a]'}`}
              >
                {mode === 'flow' ? 'Daily Flow' : mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={() => setShowSow(true)} className="flex items-center gap-2 text-[#2c2c2a]/60 hover:text-[#2c2c2a] transition-colors border border-[#2c2c2a]/10 px-3 py-1.5 rounded-full bg-white/50">
            <Shield size={14} />
            <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Sow</span>
          </button>
          <button onClick={() => setShowAIMentor(true)} className="flex items-center gap-2 text-[#d4af37] hover:text-[#b08d2b] transition-colors border border-[#d4af37]/20 px-3 py-1.5 rounded-full bg-[#d4af37]/5">
            <Sparkles size={16} />
            <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Consult Guide</span>
          </button>
          <button className="relative text-[#2c2c2a]/60 hover:text-[#2c2c2a]"><Bell size={20}/><span className="absolute top-0 right-0 w-2 h-2 bg-[#d4af37] rounded-full"></span></button>
          <div className="relative">
            <button className="flex items-center gap-3 bg-[#2c2c2a] text-[#fdfbf7] px-4 py-2 rounded-full hover:bg-[#d4af37] hover:text-[#2c2c2a] transition-all" onClick={() => setIsFamilyMenuOpen(!isFamilyMenuOpen)}>
              <span className="text-xs font-bold uppercase tracking-widest">{activeMember.name}</span>
              <ChevronDown size={14}/>
            </button>
            {isFamilyMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl border border-[#2c2c2a]/10 shadow-lg py-2 z-50">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#2c2c2a]/60 hover:text-[#2c2c2a] hover:bg-[#2c2c2a]/5 transition-all"
                >
                  <LogOut size={14} />
                  <span className="font-bold uppercase tracking-widest text-[10px]">Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        {viewMode === 'flow' && <FlowView schedule={schedule} tasks={tasks} goals={goals} onToggleTask={toggleTask} onCompleteScheduleItem={completeScheduleItem} completedScheduleItems={completedScheduleItems} onOpenImport={() => setShowImportSchedule(true)} />}
        {viewMode === 'community' && <CommunityGarden projects={COMMUNITY_PROJECTS} />}
        {viewMode === 'dashboard' && (
          <div className="space-y-12">
            {activeMember.projectTitle ? (
              <div className="bg-white rounded-3xl border border-[#2c2c2a]/10 p-8 flex justify-between items-center relative">
                <div className="relative z-10 space-y-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">Active Project</span>
                  <h2 className="font-serif text-4xl italic">{activeMember.projectTitle}</h2>
                  <div className="flex gap-2">
                    <span className="text-xs font-bold uppercase bg-[#2c2c2a]/5 px-2 py-1 rounded text-[#2c2c2a]/60">Module {activeMember.currentModule}</span>
                    <span className="text-xs font-bold uppercase bg-[#2c2c2a]/5 px-2 py-1 rounded text-[#2c2c2a]/60 capitalize">{activeMember.projectPlant} Archetype</span>
                  </div>
                  {activeMember.currentModule >= 2 && activeMember.currentModule <= 6 && (
                    <button
                      onClick={() => setShowModuleWorkshop(true)}
                      className="mt-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest bg-[#d4af37]/10 text-[#d4af37] hover:bg-[#d4af37] hover:text-[#2c2c2a] transition-all"
                    >
                      Enter {PERMACOGNITION_MODULES[activeMember.currentModule - 1]?.title}
                    </button>
                  )}
                  {activeMember.currentModule === 7 && (
                    <button
                      onClick={() => setIsSynthesizing(true)}
                      className="mt-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest bg-[#d4af37]/10 text-[#d4af37] hover:bg-[#d4af37] hover:text-[#2c2c2a] transition-all"
                    >
                      Begin Harvest
                    </button>
                  )}
                </div>
                <div className="relative w-56 h-64 shrink-0"><PlantVisual stage={activeMember.currentModule} type={activeMember.projectPlant}/></div>
              </div>
            ) : (
              <div className="bg-white border-2 border-dashed border-[#2c2c2a]/10 rounded-3xl p-16 text-center space-y-6">
                <h2 className="font-serif text-3xl">No Active Spiral</h2>
                <p className="text-sm text-[#2c2c2a]/40">Begin a new growth project to start your journey.</p>
                {activeMember.harvestHistory.length > 0 && (
                  <div className="mt-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#2c2c2a]/40 mb-2">Past Harvests</p>
                    <div className="flex gap-2 justify-center flex-wrap">
                      {activeMember.harvestHistory.map(h => (
                        <div key={h.id} className="px-3 py-2 bg-[#d4af37]/10 rounded-xl text-xs">
                          <span className="font-bold">{h.projectTitle}</span>
                          <span className="text-[#2c2c2a]/40 ml-2">{h.plant}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <button onClick={() => setIsArchitecting(true)} className="bg-[#2c2c2a] text-[#fdfbf7] px-8 py-4 rounded-full font-bold uppercase">Start Discovery</button>
              </div>
            )}

            {/* Sovereignty Score + Domain Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white p-8 rounded-2xl border border-[#2c2c2a]/10 shadow-sm">
                <p className="text-xs font-bold uppercase text-[#2c2c2a]/40">Sovereignty Score</p>
                <h2 className="font-serif text-5xl mt-2">{totalSovereigntyScore}%</h2>
              </div>
              {(['land', 'sea', 'sky'] as const).map(d => (
                <button key={d} onClick={() => { setActiveDomain(d); setExpandedGroup(null); }} className={`p-8 rounded-2xl border text-left transition-all ${activeDomain === d ? 'bg-[#2c2c2a] text-white' : 'bg-white hover:border-[#d4af37]'}`}>
                  <h3 className="font-serif text-2xl capitalize">{d}</h3>
                  <p className="text-xs opacity-50 mt-1 uppercase font-bold tracking-widest">{domains[d].subtitle}</p>
                </button>
              ))}
            </div>

            {/* Domain Detail */}
            <div className="space-y-4">
              <div className={`px-6 py-4 rounded-2xl ${domains[activeDomain].bg} flex items-center gap-4`}>
                {React.createElement(domains[activeDomain].icon, {size: 20, className: domains[activeDomain].color})}
                <div>
                  <h3 className="font-serif text-xl italic capitalize">{activeDomain}</h3>
                  <p className="text-xs opacity-50">{domains[activeDomain].subtitle}</p>
                </div>
              </div>
              {domains[activeDomain].groups && !expandedGroup ? (
                <div className="grid md:grid-cols-3 gap-8">
                  {domains[activeDomain].groups!.map(group => {
                    const groupScore = getDomainScore(goals, group.keys);
                    return (
                      <button
                        key={group.name}
                        onClick={() => setExpandedGroup(group.name)}
                        className="bg-white p-8 rounded-2xl border border-[#2c2c2a]/10 hover:border-[#d4af37] transition-all text-center flex flex-col items-center"
                      >
                        <h4 className="font-serif text-lg">{group.name}</h4>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#2c2c2a]/40 mt-2">{group.subtitle}</p>
                        <div className="flex items-center gap-3 mt-auto pt-4 w-full">
                          <div className="flex-1 bg-[#2c2c2a]/5 h-1.5 rounded-full overflow-hidden">
                            <div className="h-full bg-[#d4af37] transition-all" style={{width: `${groupScore}%`}}></div>
                          </div>
                          <span className="text-xs font-mono text-[#2c2c2a]/40">{groupScore}%</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 pt-3 w-full">
                          {group.keys.map(k => (
                            <span key={k} className="text-[8px] text-[#2c2c2a]/30 font-bold uppercase text-center">{goals[k].label}</span>
                          ))}
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : domains[activeDomain].groups && expandedGroup ? (
                <div className="space-y-4">
                  <button
                    onClick={() => setExpandedGroup(null)}
                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#2c2c2a]/40 hover:text-[#2c2c2a] transition-colors"
                  >
                    <ChevronDown size={12} className="rotate-90" />
                    Back to {activeDomain}
                  </button>
                  {domains[activeDomain].groups!.filter(g => g.name === expandedGroup).map(group => (
                    <div key={group.name} className="space-y-3">
                      <div className="flex items-baseline gap-2 px-1">
                        <h4 className="font-serif text-lg">{group.name}</h4>
                        <span className="text-[10px] text-[#2c2c2a]/25">{group.subtitle}</span>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4">
                        {group.keys.map(k => (
                          <div key={k} className="bg-white p-6 rounded-2xl border border-[#2c2c2a]/10 hover:border-[#d4af37] transition-all">
                            <div className="flex justify-between mb-4">
                              {React.createElement(goals[k].icon, {size: 20, className: "text-[#d4af37]"})}
                              <span className="text-xs font-mono opacity-40">{Math.floor(goals[k].completed)}/{goals[k].total}</span>
                            </div>
                            <h4 className="font-bold text-sm mb-1">{goals[k].label}</h4>
                            <div className="w-full bg-[#2c2c2a]/5 h-1 rounded-full overflow-hidden mt-4">
                              <div className="h-full bg-[#d4af37]" style={{width: `${(goals[k].completed/goals[k].total)*100}%`}}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        )}

        {/* Seed Discovery */}
        {isArchitecting && (
          <section className="bg-[#2c2c2a] text-[#fdfbf7] rounded-3xl p-8 md:p-12 shadow-xl animate-in zoom-in duration-300 relative overflow-hidden">
            <div className="relative z-10 space-y-8">
              <div className="flex items-center gap-3"><Sprout className="text-[#d4af37]" /><h2 className="font-serif text-3xl">The Seed: Discovery</h2></div>
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-50">Step 1: The Spark</label>
                  <textarea value={sparkInput} onChange={(e) => setSparkInput(e.target.value)} className="w-full bg-[#fdfbf7]/5 border border-[#fdfbf7]/10 rounded-xl p-4 h-32 text-lg focus:border-[#d4af37] outline-none" placeholder="What dream are you planting?" />

                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-50">Step 2: Domain Mapping</label>
                  <div className="flex flex-wrap gap-2">
                    {ALL_DOMAIN_KEYS.map(k => (
                      <button key={k} onClick={() => setSelectedDiscoveryVectors(v => v.includes(k) ? v.filter(x => x !== k) : [...v, k])}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border transition-all ${selectedDiscoveryVectors.includes(k) ? 'bg-[#d4af37] border-[#d4af37] text-[#2c2c2a]' : 'border-white/10 opacity-40'}`}>{DEFAULT_GOALS[k].label}</button>
                    ))}
                  </div>

                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-50">Step 3: Choose Your Archetype</label>
                  <div className="grid grid-cols-3 gap-3">
                    {ARCHETYPE_INFO.map(a => (
                      <button
                        key={a.type}
                        onClick={() => setSelectedArchetype(a.type)}
                        className={`p-4 rounded-xl border text-center transition-all ${
                          selectedArchetype === a.type
                            ? 'bg-[#d4af37] border-[#d4af37] text-[#2c2c2a]'
                            : 'border-white/10 hover:bg-white/5'
                        }`}
                      >
                        <div className="text-2xl mb-1">{a.icon}</div>
                        <div className="text-xs font-bold">{a.name}</div>
                        <div className="text-[10px] opacity-60 mt-1">{a.description}</div>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-8 border-l border-white/10 pl-0 md:pl-12">
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-widest opacity-50">Step 4: Ethics Check</label>
                    <div className="flex gap-2">
                      {(['earth', 'people', 'fair'] as const).map(e => (
                        <button key={e} onClick={() => setEthicsCheck(p => ({...p, [e]: !p[e]}))} className={`flex-1 flex flex-col items-center gap-2 px-2 py-3 rounded-lg text-[10px] font-bold uppercase transition-all ${ethicsCheck[e] ? 'bg-white/10 text-white border border-[#d4af37]' : 'bg-white/5 text-white/40 border border-transparent'}`}>
                          {ethicsCheck[e] ? <CheckCircle2 size={16} className="text-[#d4af37]"/> : <div className="w-4 h-4 rounded-full border border-current"/>}
                          {e === 'fair' ? 'Fair Share' : `${e === 'earth' ? 'Earth' : 'People'} Care`}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-widest opacity-50">Step 5: Pollination Strategy</label>
                    <div className="grid grid-cols-1 gap-2">
                      {AVAILABLE_COMMUNITIES.map(c => (
                        <button key={c.id} onClick={() => setSharingScope(s => s.includes(c.id) ? s.filter(x => x !== c.id) : [...s, c.id])} className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-bold transition-all ${sharingScope.includes(c.id) ? 'bg-[#d4af37] border-[#d4af37] text-[#2c2c2a]' : 'border-white/10 text-white/40 hover:bg-white/5'}`}>
                          <div className="flex items-center gap-3">{React.createElement(c.icon, { size: 16 })}<span>{c.name}</span></div>
                          {sharingScope.includes(c.id) && <CheckCircle2 size={16}/>}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 pt-6">
                <button onClick={() => setIsArchitecting(false)} className="px-8 py-4 opacity-50 font-bold uppercase tracking-widest text-xs">Cancel</button>
                <button onClick={finalizeDiscovery} disabled={!sparkInput || selectedDiscoveryVectors.length === 0 || !ethicsCheck.earth || !selectedArchetype} className="flex-1 bg-[#d4af37] text-[#2c2c2a] py-4 rounded-xl font-bold uppercase tracking-widest disabled:opacity-20 hover:bg-white transition-all">Initialize Growth</button>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default App;
