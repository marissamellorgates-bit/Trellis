import { useState, useEffect, useRef } from 'react';
import { Search, CloudRain, Users2, Eye, BarChart3, Share2, ChevronDown, Sprout } from 'lucide-react';
import type { FamilyMember, DBCommunityProject, MarketplaceFilters, TrellisNotification, PlantArchetype } from '../types';
import { ARCHETYPE_INFO } from '../types';
import { fetchMarketplaceProjects } from '../lib/community';
import ProjectDetailModal from './ProjectDetailModal';
import PublishProjectModal from './PublishProjectModal';
import AnalyticsDashboard from './AnalyticsDashboard';
import { projectPublishedNotification } from '../lib/notifications';

interface MarketplaceViewProps {
  userId: string;
  userName: string;
  activeMember: FamilyMember;
  onNotify: (notification: TrellisNotification) => void;
}

const SORT_OPTIONS: { value: MarketplaceFilters['sort']; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'most_watered', label: 'Most Watered' },
  { value: 'most_grafted', label: 'Most Grafted' },
  { value: 'most_viewed', label: 'Most Viewed' },
];

const MarketplaceView = ({ userId, userName, activeMember, onNotify }: MarketplaceViewProps) => {
  const [projects, setProjects] = useState<DBCommunityProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<MarketplaceFilters>({
    search: '',
    archetype: null,
    sort: 'newest',
  });
  const [searchInput, setSearchInput] = useState('');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [selectedProject, setSelectedProject] = useState<DBCommunityProject | null>(null);
  const [showPublish, setShowPublish] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  // Debounced search
  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setFilters(f => ({ ...f, search: searchInput }));
    }, 300);
    return () => clearTimeout(debounceRef.current);
  }, [searchInput]);

  // Fetch on filter change
  useEffect(() => {
    setLoading(true);
    fetchMarketplaceProjects(filters).then(p => {
      setProjects(p);
      setLoading(false);
    });
  }, [filters]);

  const handlePublished = (project: DBCommunityProject) => {
    if (project.status === 'published') {
      onNotify(projectPublishedNotification(project.title));
      // Refresh the list
      fetchMarketplaceProjects(filters).then(setProjects);
    }
  };

  const handleInteraction = () => {
    // Refresh project list to get updated counts
    fetchMarketplaceProjects(filters).then(setProjects);
  };

  const setArchetypeFilter = (arch: PlantArchetype | null) => {
    setFilters(f => ({ ...f, archetype: f.archetype === arch ? null : arch }));
  };

  const setSort = (sort: MarketplaceFilters['sort']) => {
    setFilters(f => ({ ...f, sort }));
    setShowSortDropdown(false);
  };

  const hasActiveProject = activeMember.projectTitle && activeMember.currentModule >= 1;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl md:text-3xl text-[#2c2c2a]">The Community Garden</h2>
          <p className="text-xs font-bold uppercase tracking-widest text-[#2c2c2a]/40 mt-2">Discover, Support & Grow Together</p>
        </div>
        <div className="flex gap-2">
          {hasActiveProject && (
            <button
              onClick={() => setShowPublish(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#d4af37] text-[#2c2c2a] text-xs font-bold uppercase tracking-widest hover:bg-[#d4af37]/80 transition-all"
            >
              <Share2 size={14} /> Publish My Project
            </button>
          )}
          <button
            onClick={() => setShowAnalytics(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#2c2c2a]/10 text-xs font-bold uppercase tracking-widest bg-white hover:bg-[#2c2c2a] hover:text-white transition-all"
          >
            <BarChart3 size={14} /> My Analytics
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-0">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2c2c2a]/50" />
          <input
            type="text"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-full bg-white border border-[#2c2c2a]/10 text-sm focus:border-[#d4af37] outline-none"
            placeholder="Search projects..."
          />
        </div>

        {/* Archetype Chips */}
        <div className="flex gap-1.5 overflow-x-auto">
          <button
            onClick={() => setArchetypeFilter(null)}
            className={`px-3 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
              !filters.archetype ? 'bg-[#2c2c2a] text-white' : 'bg-white border border-[#2c2c2a]/10 text-[#2c2c2a]/50 hover:text-[#2c2c2a]'
            }`}
          >
            All
          </button>
          {ARCHETYPE_INFO.map(a => (
            <button
              key={a.type}
              onClick={() => setArchetypeFilter(a.type)}
              className={`px-3 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                filters.archetype === a.type ? 'bg-[#2c2c2a] text-white' : 'bg-white border border-[#2c2c2a]/10 text-[#2c2c2a]/50 hover:text-[#2c2c2a]'
              }`}
            >
              {a.icon} {a.type}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowSortDropdown(!showSortDropdown)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-[#2c2c2a]/10 text-xs font-bold uppercase tracking-widest text-[#2c2c2a]/60 hover:text-[#2c2c2a] transition-all"
          >
            {SORT_OPTIONS.find(s => s.value === filters.sort)?.label}
            <ChevronDown size={12} />
          </button>
          {showSortDropdown && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl border border-[#2c2c2a]/10 shadow-lg py-1 z-50">
              {SORT_OPTIONS.map(s => (
                <button
                  key={s.value}
                  onClick={() => setSort(s.value)}
                  className={`w-full text-left px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all ${
                    filters.sort === s.value ? 'text-[#d4af37]' : 'text-[#2c2c2a]/50 hover:text-[#2c2c2a] hover:bg-[#2c2c2a]/5'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Project Grid */}
      {loading ? (
        <div className="text-center py-16">
          <Sprout className="mx-auto text-[#d4af37] animate-pulse" size={32} />
          <p className="text-xs text-[#2c2c2a]/40 mt-4 font-bold uppercase tracking-widest">Loading garden...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-[#2c2c2a]/10">
          <Sprout className="mx-auto text-[#2c2c2a]/40" size={40} />
          <p className="text-sm text-[#2c2c2a]/40 mt-4">No projects found</p>
          <p className="text-xs text-[#2c2c2a]/50 mt-1">
            {filters.search || filters.archetype ? 'Try adjusting your filters' : 'Be the first to publish a project!'}
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {projects.map(p => {
            const isOwn = p.user_id === userId;
            return (
              <div
                key={p.id}
                className="bg-white p-6 rounded-2xl border border-[#2c2c2a]/10 hover:shadow-lg transition-all group cursor-pointer"
                onClick={() => setSelectedProject(p)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#2c2c2a]/5 flex items-center justify-center text-[#2c2c2a]/60 font-serif italic">
                      {p.author_name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#2c2c2a]">
                        {p.author_name}
                        {isOwn && <span className="ml-1.5 text-[10px] text-[#d4af37] font-bold">(You)</span>}
                      </h4>
                      <span className="text-[10px] uppercase font-bold text-[#2c2c2a]/40 capitalize">{p.plant}</span>
                    </div>
                  </div>
                  <span className="bg-[#2c2c2a]/5 text-[#2c2c2a] text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                    Module {p.stage}
                  </span>
                </div>

                <h3 className="font-serif text-xl italic text-[#2c2c2a] mb-2">{p.title}</h3>

                {p.description && (
                  <p className="text-xs text-[#2c2c2a]/50 mb-3 line-clamp-2">{p.description}</p>
                )}

                {/* Tags */}
                {p.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {p.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-[#2c2c2a]/5 rounded-full text-[9px] font-bold uppercase text-[#2c2c2a]/40">
                        {tag}
                      </span>
                    ))}
                    {p.tags.length > 3 && (
                      <span className="text-[9px] text-[#2c2c2a]/50">+{p.tags.length - 3}</span>
                    )}
                  </div>
                )}

                {/* Progress bar */}
                <div className="w-full h-1 bg-[#2c2c2a]/5 rounded-full mb-4 overflow-hidden">
                  <div className="h-full bg-[#d4af37]" style={{ width: `${(p.stage / 7) * 100}%` }} />
                </div>

                {/* Stats */}
                <div className="flex gap-4 text-xs text-[#2c2c2a]/40 border-t border-[#2c2c2a]/5 pt-4">
                  <span className="flex items-center gap-1"><Eye size={12} /> {p.view_count}</span>
                  <span className="flex items-center gap-1"><CloudRain size={12} /> {p.water_count}</span>
                  <span className="flex items-center gap-1"><Users2 size={12} /> {p.graft_count}</span>
                  {isOwn && (
                    <button
                      onClick={(e) => { e.stopPropagation(); setShowAnalytics(true); }}
                      className="ml-auto flex items-center gap-1 text-[#d4af37] hover:text-[#b08d2b]"
                    >
                      <BarChart3 size={12} /> Analytics
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modals */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          userId={userId}
          userName={userName}
          isOwn={selectedProject.user_id === userId}
          onClose={() => setSelectedProject(null)}
          onInteraction={handleInteraction}
        />
      )}

      <PublishProjectModal
        isOpen={showPublish}
        onClose={() => setShowPublish(false)}
        member={activeMember}
        userId={userId}
        onPublished={handlePublished}
      />

      <AnalyticsDashboard
        isOpen={showAnalytics}
        onClose={() => setShowAnalytics(false)}
        userId={userId}
      />
    </div>
  );
};

export default MarketplaceView;
