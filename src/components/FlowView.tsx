import { Calendar, CheckSquare, Zap, Check } from 'lucide-react';
import type { FlowViewProps, ScheduleItem, DomainKey } from '../types';

const scheduleItemKey = (item: ScheduleItem): string =>
  item.sourceId ?? `${item.time}-${item.title}`;

const SourceBadge = ({ source }: { source?: ScheduleItem['source'] }) => {
  if (!source || source === 'manual') return null;
  const label = source === 'google' ? 'GCal' : 'Imported';
  const color = source === 'google' ? 'bg-[#4285F4]/10 text-[#4285F4]' : 'bg-purple-100 text-purple-600';
  return (
    <span className={`text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded ${color}`}>
      {label}
    </span>
  );
};

const FlowView = ({ schedule, tasks, goals, onToggleTask, onCompleteScheduleItem, completedScheduleItems, onOpenImport }: FlowViewProps) => (
  <div className="grid lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-right-8 duration-500">
    <div className="lg:col-span-1 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-3xl text-[#2c2c2a]">Daily Flow</h2>
        <div className="flex gap-2">
          <button
            onClick={onOpenImport}
            title="Import Schedule"
            className="w-8 h-8 rounded-full border border-[#2c2c2a]/10 flex items-center justify-center text-[#2c2c2a]/40 hover:bg-[#4285F4] hover:text-white hover:border-transparent transition-all"
          >
            <Calendar size={14}/>
          </button>
          <button title="Import from Todoist" className="w-8 h-8 rounded-full border border-[#2c2c2a]/10 flex items-center justify-center text-[#2c2c2a]/40 hover:bg-[#E44332] hover:text-white hover:border-transparent transition-all">
            <CheckSquare size={14}/>
          </button>
        </div>
      </div>
      <div className="bg-white rounded-3xl border border-[#2c2c2a]/10 p-6 relative overflow-hidden">
        <div className="absolute left-8 top-0 bottom-0 w-px bg-[#2c2c2a]/10"></div>
        <div className="space-y-6 relative z-10">
          {schedule.map((item, i) => {
            const key = scheduleItemKey(item);
            const done = completedScheduleItems.has(key);
            return (
              <div key={key} className="flex gap-4 items-start group">
                <span className="text-xs font-mono text-[#2c2c2a]/40 w-12 pt-1">{item.time}</span>
                <button
                  onClick={() => !done && onCompleteScheduleItem(i)}
                  className={`flex-1 p-3 rounded-xl border-l-4 text-sm font-medium transition-all text-left ${
                    done ? 'border-green-500 bg-green-50/50 opacity-50 line-through' :
                    item.type === 'project' ? 'border-[#d4af37] bg-[#d4af37]/10 hover:bg-[#d4af37]/20' :
                    item.type === 'bio' ? 'border-green-500 bg-green-50 hover:bg-green-100' :
                    'border-[#2c2c2a]/20 bg-[#fdfbf7] hover:bg-[#2c2c2a]/5'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate">{item.title}</span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <SourceBadge source={item.source} />
                      {done && <Check size={14} className="text-green-500" />}
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>

    <div className="lg:col-span-2 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-3xl text-[#2c2c2a]">Prioritized Actions</h2>
      </div>
      <div className="space-y-3">
        {[...tasks].sort((a, b) => {
          // 1. Done tasks last
          if (a.done !== b.done) return a.done ? 1 : -1;
          // 2. Due date: Today > Tomorrow > other
          const dueOrder = (d: string) => d === 'Today' ? 0 : d === 'Tomorrow' ? 1 : 2;
          const dueDiff = dueOrder(a.due) - dueOrder(b.due);
          if (dueDiff !== 0) return dueDiff;
          // 3. Project-related first
          if (a.isProjectRelated !== b.isProjectRelated) return a.isProjectRelated ? -1 : 1;
          // 4. Shorter tasks first (quick wins)
          const aMin = a.estimatedMinutes ?? 999;
          const bMin = b.estimatedMinutes ?? 999;
          return aMin - bMin;
        }).map((task) => (
          <div key={task.id} className={`p-4 rounded-xl border flex items-center justify-between transition-all group ${task.done ? 'bg-[#fdfbf7] border-transparent opacity-50' : 'bg-white border-[#2c2c2a]/5 hover:border-[#d4af37] hover:shadow-md'}`}>
            <div className="flex items-center gap-4">
              <button
                onClick={() => onToggleTask(task.id)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${task.done ? 'bg-[#2c2c2a] border-[#2c2c2a] text-[#fdfbf7]' : 'border-[#2c2c2a]/20 hover:border-[#d4af37]'}`}
              >
                {task.done && <CheckSquare size={14}/>}
              </button>
              <div>
                <span className={`block font-medium ${task.done ? 'line-through text-[#2c2c2a]/40' : 'text-[#2c2c2a]'}`}>{task.title}</span>
                <div className="flex gap-2 mt-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#2c2c2a]/40 bg-[#2c2c2a]/5 px-2 py-0.5 rounded">{goals[task.domain as DomainKey]?.label ?? task.domain}</span>
                  {task.isProjectRelated && (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37] bg-[#d4af37]/10 px-2 py-0.5 rounded flex items-center gap-1">
                      <Zap size={8}/> Focus
                    </span>
                  )}
                </div>
              </div>
            </div>
            <span className="text-xs font-mono text-[#2c2c2a]/40">{task.due}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default FlowView;
