import { Calendar, CheckSquare, Zap, Check } from 'lucide-react';
import type { FlowViewProps, ScheduleItem, DomainKey } from '../types';

const scheduleItemKey = (item: ScheduleItem): string =>
  item.sourceId ?? `${item.time}-${item.title}`;

const formatTime12 = (time24: string): string => {
  const [h, m] = time24.split(':').map(Number);
  const period = h >= 12 ? 'pm' : 'am';
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${h12}:${String(m).padStart(2, '0')}${period}`;
};

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

const FlowView = ({ schedule, tasks, goals, onToggleTask, onCompleteScheduleItem, completedScheduleItems, onOpenImport, onOpenImportTasks }: FlowViewProps) => (
  <div className="grid md:grid-cols-3 gap-4 md:gap-8 animate-in fade-in slide-in-from-right-8 duration-500">
    <div className="md:col-span-1 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl md:text-3xl text-[#2c2c2a]">Daily Flow</h2>
        <div className="flex gap-2">
          <button
            onClick={onOpenImport}
            aria-label="Import schedule"
            className="w-10 h-10 md:w-8 md:h-8 rounded-full border border-[#2c2c2a]/10 flex items-center justify-center text-[#2c2c2a]/40 hover:bg-[#4285F4] hover:text-white hover:border-transparent transition-all"
          >
            <Calendar size={14}/>
          </button>
          <button
            onClick={onOpenImportTasks}
            aria-label="Import tasks"
            className="w-10 h-10 md:w-8 md:h-8 rounded-full border border-[#2c2c2a]/10 flex items-center justify-center text-[#2c2c2a]/40 hover:bg-[#E44332] hover:text-white hover:border-transparent transition-all"
          >
            <CheckSquare size={14}/>
          </button>
        </div>
      </div>
      <div className="bg-white rounded-2xl md:rounded-3xl border border-[#2c2c2a]/10 p-4 md:p-6 relative overflow-hidden">
        <div className="absolute left-8 top-0 bottom-0 w-px bg-[#2c2c2a]/10"></div>
        <ul className="space-y-6 relative z-10 list-none m-0 p-0">
          {schedule.map((item, i) => {
            const key = scheduleItemKey(item);
            const done = completedScheduleItems.has(key);
            return (
              <li key={key} className="flex gap-4 items-start group">
                <span className="text-xs font-mono text-[#2c2c2a]/40 w-14 pt-1">{formatTime12(item.time)}</span>
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
              </li>
            );
          })}
        </ul>
      </div>
    </div>

    <div className="md:col-span-2 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl md:text-3xl text-[#2c2c2a]">Prioritized Actions</h2>
      </div>
      <ul className="space-y-3 list-none m-0 p-0">
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
          <li key={task.id} className={`p-3 md:p-4 rounded-xl border flex items-center justify-between transition-all group ${task.done ? 'bg-[#fdfbf7] border-transparent opacity-50' : 'bg-white border-[#2c2c2a]/5 hover:border-[#d4af37] hover:shadow-md'}`}>
            <div className="flex items-center gap-4">
              <button
                onClick={() => onToggleTask(task.id)}
                className={`w-8 h-8 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${task.done ? 'bg-[#2c2c2a] border-[#2c2c2a] text-[#fdfbf7]' : 'border-[#2c2c2a]/20 hover:border-[#d4af37]'}`}
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
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default FlowView;
