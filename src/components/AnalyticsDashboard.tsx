import { useState, useEffect } from 'react';
import { X, Eye, CloudRain, Users2, BarChart3, ArrowLeft } from 'lucide-react';
import type { DBCommunityProject, ProjectAnalytics } from '../types';
import { fetchMyProjects, fetchProjectAnalytics } from '../lib/community';
import { useModal } from '../hooks/useModal';

interface AnalyticsDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

const AnalyticsDashboard = ({ isOpen, onClose, userId }: AnalyticsDashboardProps) => {
  const [projects, setProjects] = useState<DBCommunityProject[]>([]);
  const [selectedProject, setSelectedProject] = useState<DBCommunityProject | null>(null);
  const [analytics, setAnalytics] = useState<ProjectAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const { modalRef } = useModal(isOpen, onClose);

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    fetchMyProjects(userId).then(p => {
      setProjects(p);
      setLoading(false);
    });
  }, [isOpen, userId]);

  useEffect(() => {
    if (!selectedProject) {
      setAnalytics(null);
      return;
    }
    setLoading(true);
    fetchProjectAnalytics(selectedProject.id).then(a => {
      setAnalytics(a);
      setLoading(false);
    });
  }, [selectedProject]);

  if (!isOpen) return null;

  const totalViews = projects.reduce((s, p) => s + p.view_count, 0);
  const totalWaterings = projects.reduce((s, p) => s + p.water_count, 0);
  const totalGraftings = projects.reduce((s, p) => s + p.graft_count, 0);

  // SVG bar chart for views by day
  const renderViewsChart = (viewsByDay: { date: string; count: number }[]) => {
    if (viewsByDay.length === 0) {
      return <p className="text-xs text-[#2c2c2a]/40 text-center py-8">No view data yet</p>;
    }

    const maxCount = Math.max(...viewsByDay.map(d => d.count), 1);
    const barWidth = Math.max(8, Math.min(20, 400 / viewsByDay.length - 2));
    const chartWidth = viewsByDay.length * (barWidth + 2);
    const chartHeight = 120;

    return (
      <div className="overflow-x-auto">
        <svg width={Math.max(chartWidth, 200)} height={chartHeight + 30} className="mx-auto">
          {viewsByDay.map((d, i) => {
            const barHeight = (d.count / maxCount) * chartHeight;
            const x = i * (barWidth + 2);
            return (
              <g key={d.date}>
                <rect
                  x={x}
                  y={chartHeight - barHeight}
                  width={barWidth}
                  height={barHeight}
                  fill="#d4af37"
                  rx={2}
                  opacity={0.8}
                />
                <title>{d.date}: {d.count} views</title>
                {i % Math.ceil(viewsByDay.length / 6) === 0 && (
                  <text
                    x={x + barWidth / 2}
                    y={chartHeight + 16}
                    textAnchor="middle"
                    className="text-[8px] fill-[#2c2c2a]/30"
                  >
                    {d.date.slice(5)}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    );
  };

  const renderTierBreakdown = (label: string, byTier: Record<string, number>) => {
    const entries = Object.entries(byTier);
    if (entries.length === 0) return null;
    const total = entries.reduce((s, [, c]) => s + c, 0);

    return (
      <div className="space-y-2">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#2c2c2a]/40">{label}</p>
        {entries.map(([tier, count]) => (
          <div key={tier} className="flex items-center gap-3">
            <span className="text-xs font-bold text-[#2c2c2a] w-28 capitalize">{tier.replace(/-/g, ' ')}</span>
            <div className="flex-1 bg-[#2c2c2a]/5 h-2 rounded-full overflow-hidden">
              <div className="h-full bg-[#d4af37] rounded-full" style={{ width: `${(count / total) * 100}%` }} />
            </div>
            <span className="text-xs font-mono text-[#2c2c2a]/40 w-8 text-right">{count}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="analytics-title">
      <div ref={modalRef} className="bg-[#fdfbf7] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-8 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              {selectedProject && (
                <button onClick={() => setSelectedProject(null)} aria-label="Back to overview" className="text-[#2c2c2a]/40 hover:text-[#2c2c2a]">
                  <ArrowLeft size={20} />
                </button>
              )}
              <div>
                <h2 id="analytics-title" className="font-serif text-2xl italic text-[#2c2c2a]">
                  {selectedProject ? selectedProject.title : 'My Analytics'}
                </h2>
                <p className="text-xs text-[#2c2c2a]/40 mt-1">
                  {selectedProject ? 'Project performance' : 'Across all published projects'}
                </p>
              </div>
            </div>
            <button onClick={onClose} aria-label="Close" className="text-[#2c2c2a]/30 hover:text-[#2c2c2a]"><X size={20} /></button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <BarChart3 className="mx-auto text-[#d4af37] animate-pulse" size={32} />
              <p className="text-xs text-[#2c2c2a]/40 mt-3">Loading analytics...</p>
            </div>
          ) : !selectedProject ? (
            /* Overview Mode */
            <div className="space-y-6">
              {/* Totals */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-[#2c2c2a]/10 text-center">
                  <Eye size={20} className="mx-auto text-[#2c2c2a]/30 mb-2" />
                  <p className="font-serif text-3xl text-[#2c2c2a]">{totalViews}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#2c2c2a]/40 mt-1">Views</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-[#2c2c2a]/10 text-center">
                  <CloudRain size={20} className="mx-auto text-blue-400 mb-2" />
                  <p className="font-serif text-3xl text-[#2c2c2a]">{totalWaterings}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#2c2c2a]/40 mt-1">Waterings</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-[#2c2c2a]/10 text-center">
                  <Users2 size={20} className="mx-auto text-emerald-400 mb-2" />
                  <p className="font-serif text-3xl text-[#2c2c2a]">{totalGraftings}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#2c2c2a]/40 mt-1">Grafts</p>
                </div>
              </div>

              {/* Project List */}
              {projects.length === 0 ? (
                <div className="text-center py-8 bg-white rounded-2xl border border-[#2c2c2a]/10">
                  <p className="text-sm text-[#2c2c2a]/40">No projects yet. Publish your first project to see analytics.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#2c2c2a]/40">Your Projects</p>
                  {projects.map(p => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedProject(p)}
                      className="w-full flex items-center gap-4 bg-white p-4 rounded-2xl border border-[#2c2c2a]/10 hover:border-[#d4af37] transition-all text-left"
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm text-[#2c2c2a] truncate">{p.title}</h4>
                        <div className="flex items-center gap-3 mt-1">
                          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                            p.status === 'published' ? 'bg-emerald-50 text-emerald-600' :
                            p.status === 'draft' ? 'bg-amber-50 text-amber-600' :
                            'bg-[#2c2c2a]/5 text-[#2c2c2a]/40'
                          }`}>
                            {p.status}
                          </span>
                          <span className="text-[10px] text-[#2c2c2a]/30 capitalize">{p.plant}</span>
                        </div>
                      </div>
                      <div className="flex gap-4 text-xs text-[#2c2c2a]/40 shrink-0">
                        <span className="flex items-center gap-1"><Eye size={12} />{p.view_count}</span>
                        <span className="flex items-center gap-1"><CloudRain size={12} />{p.water_count}</span>
                        <span className="flex items-center gap-1"><Users2 size={12} />{p.graft_count}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : analytics ? (
            /* Project Detail Mode */
            <div className="space-y-6">
              {/* Totals */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-[#2c2c2a]/10 text-center">
                  <p className="font-serif text-2xl text-[#2c2c2a]">{analytics.totalViews}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#2c2c2a]/40">Views</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-[#2c2c2a]/10 text-center">
                  <p className="font-serif text-2xl text-[#2c2c2a]">{analytics.totalWaterings}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#2c2c2a]/40">Waterings</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-[#2c2c2a]/10 text-center">
                  <p className="font-serif text-2xl text-[#2c2c2a]">{analytics.totalGraftings}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#2c2c2a]/40">Grafts</p>
                </div>
              </div>

              {/* Views Chart */}
              <div className="bg-white p-6 rounded-2xl border border-[#2c2c2a]/10">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#2c2c2a]/40 mb-4">Views — Last 30 Days</p>
                {renderViewsChart(analytics.viewsByDay)}
              </div>

              {/* Tier Breakdowns */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-[#2c2c2a]/10">
                  {renderTierBreakdown('Watering Breakdown', analytics.wateringsByTier) ?? (
                    <p className="text-xs text-[#2c2c2a]/40 text-center py-4">No waterings yet</p>
                  )}
                </div>
                <div className="bg-white p-6 rounded-2xl border border-[#2c2c2a]/10">
                  {renderTierBreakdown('Grafting Breakdown', analytics.graftingsByTier) ?? (
                    <p className="text-xs text-[#2c2c2a]/40 text-center py-4">No grafts yet</p>
                  )}
                </div>
              </div>

              {/* Recent Interactions */}
              {analytics.recentInteractions.length > 0 && (
                <div className="space-y-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#2c2c2a]/40">Recent Interactions</p>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {analytics.recentInteractions.map(i => (
                      <div key={i.id} className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-[#2c2c2a]/5">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                          i.type === 'water' ? 'bg-blue-50 text-blue-500' : 'bg-emerald-50 text-emerald-500'
                        }`}>
                          {i.type === 'water' ? <CloudRain size={14} /> : <Users2 size={14} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-[#2c2c2a]">
                            {i.from_user_name} <span className="font-normal text-[#2c2c2a]/50 capitalize">{i.tier.replace(/-/g, ' ')}</span>
                          </p>
                        </div>
                        <span className="text-[10px] text-[#2c2c2a]/30 shrink-0">
                          {new Date(i.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
