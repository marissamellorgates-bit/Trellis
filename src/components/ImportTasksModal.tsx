import { useState, useEffect, useRef, useCallback } from 'react';
import { X, CheckSquare, Camera, Upload, Loader2, Check, ChevronDown } from 'lucide-react';
import type { Task, DomainKey, GoalsMap } from '../types';
import { isTodoistConfigured, getTodoistAuthUrl, exchangeTodoistToken, fetchTodoistTasks, mapTodoistToTrellisTask } from '../lib/todoist';
import type { TodoistTask } from '../lib/todoist';
import { isAIConfigured, extractTasksFromImage } from '../lib/ai';
import type { ExtractedTask } from '../lib/ai';
import { useModal } from '../hooks/useModal';

interface ImportTasksModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportTasks: (tasks: Task[]) => void;
  goals: GoalsMap;
}

type Tab = 'todoist' | 'photo';

const DOMAIN_OPTIONS: { key: DomainKey; label: string }[] = [
  { key: 'coreCompetencies', label: 'Crafts' },
  { key: 'professionalExchange', label: 'Profession' },
  { key: 'biological', label: 'Physical Health' },
  { key: 'mentalClarity', label: 'Mental Clarity' },
  { key: 'innerCircle', label: 'Family' },
  { key: 'socialCommunion', label: 'Friends' },
  { key: 'creativeFlow', label: 'Creativity' },
  { key: 'environmentalOrder', label: 'Environmental Order' },
  { key: 'marketRealities', label: 'Finances' },
  { key: 'instructionalCurrent', label: 'Opportunity' },
];

const DomainPicker = ({ value, onChange, goals }: { value: DomainKey; onChange: (d: DomainKey) => void; goals: GoalsMap }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl border border-[#2c2c2a]/10 text-sm bg-white hover:border-[#d4af37] transition-all"
      >
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#2c2c2a]/40">Domain:</span>
        <span className="font-medium">{goals[value]?.label ?? value}</span>
        <ChevronDown size={14} className="text-[#2c2c2a]/30" />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-[#2c2c2a]/10 rounded-xl shadow-lg py-1 z-50 max-h-60 overflow-y-auto">
          {DOMAIN_OPTIONS.map(d => (
            <button
              key={d.key}
              onClick={() => { onChange(d.key); setOpen(false); }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-[#d4af37]/10 transition-all ${value === d.key ? 'bg-[#d4af37]/5 font-bold' : ''}`}
            >
              {d.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Todoist Tab ──────────────────────────────────────────────

const TodoistTab = ({ onImportTasks, goals }: { onImportTasks: (tasks: Task[]) => void; goals: GoalsMap }) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [todoistTasks, setTodoistTasks] = useState<TodoistTask[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [domain, setDomain] = useState<DomainKey>('coreCompetencies');
  const [imported, setImported] = useState(0);

  const handleOAuthMessage = useCallback(async (event: MessageEvent) => {
    if (event.origin !== window.location.origin) return;
    if (event.data?.type !== 'todoist-oauth') return;

    if (event.data.error) {
      setError('Todoist authorization was denied.');
      setLoading(false);
      return;
    }

    const code = event.data.code;
    if (!code) return;

    try {
      const accessToken = await exchangeTodoistToken(code);
      setToken(accessToken);
      const tasks = await fetchTodoistTasks(accessToken);
      setTodoistTasks(tasks);
      setSelected(new Set(tasks.map(t => t.id)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect Todoist');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('message', handleOAuthMessage);
    return () => window.removeEventListener('message', handleOAuthMessage);
  }, [handleOAuthMessage]);

  const startOAuth = () => {
    setLoading(true);
    setError('');
    const url = getTodoistAuthUrl();
    const w = 500;
    const h = 700;
    const left = window.screenX + (window.innerWidth - w) / 2;
    const top = window.screenY + (window.innerHeight - h) / 2;
    window.open(url, 'todoist-oauth', `width=${w},height=${h},left=${left},top=${top}`);
  };

  const toggleSelect = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selected.size === todoistTasks.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(todoistTasks.map(t => t.id)));
    }
  };

  const handleImport = () => {
    const tasksToImport = todoistTasks
      .filter(t => selected.has(t.id))
      .map(t => mapTodoistToTrellisTask(t, domain));
    onImportTasks(tasksToImport);
    setImported(tasksToImport.length);
  };

  if (imported > 0) {
    return (
      <div className="text-center py-12 space-y-4">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
          <Check className="text-green-600" size={28} />
        </div>
        <p className="text-lg font-bold">{imported} task{imported !== 1 ? 's' : ''} imported</p>
        <p className="text-sm text-[#2c2c2a]/50">Check your Prioritized Actions in Daily Flow</p>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="text-center py-12 space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#E44332]/10 flex items-center justify-center mx-auto">
          <CheckSquare className="text-[#E44332]" size={28} />
        </div>
        <div className="space-y-2">
          <p className="text-sm text-[#2c2c2a]/60">Connect your Todoist account to import tasks</p>
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          onClick={startOAuth}
          disabled={loading}
          className="px-6 py-3 rounded-full bg-[#E44332] text-white font-bold text-sm uppercase tracking-widest hover:bg-[#C93726] transition-all disabled:opacity-50"
        >
          {loading ? 'Connecting...' : 'Connect Todoist'}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#2c2c2a]/60">{todoistTasks.length} task{todoistTasks.length !== 1 ? 's' : ''} found</p>
        <button onClick={toggleSelectAll} className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37] hover:text-[#b08d2b] transition-colors">
          {selected.size === todoistTasks.length ? 'Deselect All' : 'Select All'}
        </button>
      </div>
      <div className="max-h-64 overflow-y-auto space-y-1 border border-[#2c2c2a]/5 rounded-xl p-2">
        {todoistTasks.map(task => (
          <button
            key={task.id}
            onClick={() => toggleSelect(task.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${selected.has(task.id) ? 'bg-[#d4af37]/10' : 'hover:bg-[#2c2c2a]/5'}`}
          >
            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${selected.has(task.id) ? 'bg-[#d4af37] border-[#d4af37] text-white' : 'border-[#2c2c2a]/20'}`}>
              {selected.has(task.id) && <Check size={12} />}
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-sm block truncate">{task.content}</span>
              {task.due && <span className="text-[10px] text-[#2c2c2a]/40">{task.due.string}</span>}
            </div>
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between gap-3 pt-2">
        <DomainPicker value={domain} onChange={setDomain} goals={goals} />
        <button
          onClick={handleImport}
          disabled={selected.size === 0}
          className="px-5 py-2.5 rounded-full bg-[#d4af37] text-[#2c2c2a] font-bold text-xs uppercase tracking-widest hover:bg-[#b08d2b] hover:text-white transition-all disabled:opacity-30"
        >
          Import {selected.size} Task{selected.size !== 1 ? 's' : ''}
        </button>
      </div>
    </div>
  );
};

// ── Photo Tab ───────────────────────────────────────────────

const PhotoTab = ({ onImportTasks, goals }: { onImportTasks: (tasks: Task[]) => void; goals: GoalsMap }) => {
  const [imageData, setImageData] = useState<{ base64: string; mimeType: string; preview: string } | null>(null);
  const [extracting, setExtracting] = useState(false);
  const [error, setError] = useState('');
  const [extractedTasks, setExtractedTasks] = useState<(ExtractedTask & { selected: boolean })[]>([]);
  const [domain, setDomain] = useState<DomainKey>('coreCompetencies');
  const [imported, setImported] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }
    setError('');
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // result is "data:<mime>;base64,<data>"
      const base64 = result.split(',')[1];
      setImageData({ base64, mimeType: file.type, preview: result });
      setExtractedTasks([]);
    };
    reader.readAsDataURL(file);
  };

  const handleExtract = async () => {
    if (!imageData) return;
    setExtracting(true);
    setError('');
    try {
      const tasks = await extractTasksFromImage(imageData.base64, imageData.mimeType);
      if (tasks.length === 0) {
        setError('No tasks found in the image. Try a clearer photo.');
      } else {
        setExtractedTasks(tasks.map(t => ({ ...t, selected: true })));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to extract tasks');
    } finally {
      setExtracting(false);
    }
  };

  const toggleTask = (index: number) => {
    setExtractedTasks(prev => prev.map((t, i) => i === index ? { ...t, selected: !t.selected } : t));
  };

  const updateTaskTitle = (index: number, title: string) => {
    setExtractedTasks(prev => prev.map((t, i) => i === index ? { ...t, title } : t));
  };

  const handleImport = () => {
    const tasksToImport: Task[] = extractedTasks
      .filter(t => t.selected && t.title.trim())
      .map(t => ({
        id: Date.now() + Math.random(),
        title: t.title.trim(),
        domain,
        isProjectRelated: false,
        done: false,
        due: 'Today',
        estimatedMinutes: t.estimatedMinutes,
      }));
    onImportTasks(tasksToImport);
    setImported(tasksToImport.length);
  };

  if (imported > 0) {
    return (
      <div className="text-center py-12 space-y-4">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
          <Check className="text-green-600" size={28} />
        </div>
        <p className="text-lg font-bold">{imported} task{imported !== 1 ? 's' : ''} imported</p>
        <p className="text-sm text-[#2c2c2a]/50">Check your Prioritized Actions in Daily Flow</p>
      </div>
    );
  }

  const selectedCount = extractedTasks.filter(t => t.selected).length;

  return (
    <div className="space-y-4">
      {!imageData ? (
        <div className="text-center py-8 space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#d4af37]/10 flex items-center justify-center mx-auto">
            <Camera className="text-[#d4af37]" size={28} />
          </div>
          <p className="text-sm text-[#2c2c2a]/60">Take a photo or upload an image of your task list</p>
          <div className="flex gap-3 justify-center">
            <label className="px-5 py-3 rounded-full bg-[#2c2c2a] text-[#fdfbf7] font-bold text-xs uppercase tracking-widest hover:bg-[#d4af37] hover:text-[#2c2c2a] transition-all cursor-pointer">
              <span className="flex items-center gap-2"><Camera size={14} /> Take Photo</span>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
              />
            </label>
            <label className="px-5 py-3 rounded-full border border-[#2c2c2a]/10 text-[#2c2c2a] font-bold text-xs uppercase tracking-widest hover:border-[#d4af37] transition-all cursor-pointer">
              <span className="flex items-center gap-2"><Upload size={14} /> Upload Image</span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
              />
            </label>
          </div>
        </div>
      ) : extractedTasks.length === 0 ? (
        <div className="space-y-4">
          <div className="relative rounded-xl overflow-hidden border border-[#2c2c2a]/10">
            <img src={imageData.preview} alt="Task list" className="w-full max-h-48 object-contain bg-[#2c2c2a]/5" />
            <button
              onClick={() => setImageData(null)}
              aria-label="Remove image"
              className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center text-[#2c2c2a]/60 hover:text-[#2c2c2a] shadow-sm transition-all"
            >
              <X size={14} />
            </button>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            onClick={handleExtract}
            disabled={extracting}
            className="w-full py-3 rounded-xl bg-[#d4af37] text-[#2c2c2a] font-bold text-sm uppercase tracking-widest hover:bg-[#b08d2b] hover:text-white transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {extracting ? <><Loader2 size={16} className="animate-spin" /> Extracting Tasks...</> : 'Extract Tasks'}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#2c2c2a]/60">{extractedTasks.length} task{extractedTasks.length !== 1 ? 's' : ''} found</p>
            <button onClick={() => { setImageData(null); setExtractedTasks([]); }} className="text-[10px] font-bold uppercase tracking-widest text-[#2c2c2a]/40 hover:text-[#2c2c2a] transition-colors">
              Try Another Photo
            </button>
          </div>
          <div className="max-h-64 overflow-y-auto space-y-1 border border-[#2c2c2a]/5 rounded-xl p-2">
            {extractedTasks.map((task, i) => (
              <div key={i} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${task.selected ? 'bg-[#d4af37]/10' : 'bg-[#2c2c2a]/5 opacity-50'}`}>
                <button
                  onClick={() => toggleTask(i)}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${task.selected ? 'bg-[#d4af37] border-[#d4af37] text-white' : 'border-[#2c2c2a]/20'}`}
                >
                  {task.selected && <Check size={12} />}
                </button>
                <input
                  type="text"
                  value={task.title}
                  onChange={e => updateTaskTitle(i, e.target.value)}
                  className="flex-1 bg-transparent outline-none text-sm"
                />
                {task.estimatedMinutes && (
                  <span className="text-[10px] text-[#2c2c2a]/40 shrink-0">{task.estimatedMinutes}min</span>
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between gap-3 pt-2">
            <DomainPicker value={domain} onChange={setDomain} goals={goals} />
            <button
              onClick={handleImport}
              disabled={selectedCount === 0}
              className="px-5 py-2.5 rounded-full bg-[#d4af37] text-[#2c2c2a] font-bold text-xs uppercase tracking-widest hover:bg-[#b08d2b] hover:text-white transition-all disabled:opacity-30"
            >
              Import {selectedCount} Task{selectedCount !== 1 ? 's' : ''}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ── Main Modal ──────────────────────────────────────────────

const ImportTasksModal = ({ isOpen, onClose, onImportTasks, goals }: ImportTasksModalProps) => {
  const todoistAvailable = isTodoistConfigured();
  const photoAvailable = isAIConfigured();
  const bothAvailable = todoistAvailable && photoAvailable;
  const neitherAvailable = !todoistAvailable && !photoAvailable;

  const defaultTab: Tab = todoistAvailable ? 'todoist' : 'photo';
  const [activeTab, setActiveTab] = useState<Tab>(defaultTab);
  const { modalRef } = useModal(isOpen, onClose);

  // Reset tab when opening
  useEffect(() => {
    if (isOpen) setActiveTab(todoistAvailable ? 'todoist' : 'photo');
  }, [isOpen, todoistAvailable]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="import-tasks-title">
      <div ref={modalRef} className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-0">
          <h2 id="import-tasks-title" className="font-serif text-2xl">Import Tasks</h2>
          <button onClick={onClose} aria-label="Close" className="w-8 h-8 rounded-full hover:bg-[#2c2c2a]/5 flex items-center justify-center text-[#2c2c2a]/40 hover:text-[#2c2c2a] transition-all">
            <X size={18} />
          </button>
        </div>

        {/* Tab Bar (only when both are available) */}
        {bothAvailable && (
          <div className="flex gap-1 mx-6 mt-4 bg-[#2c2c2a]/5 p-1 rounded-full">
            <button
              onClick={() => setActiveTab('todoist')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'todoist' ? 'bg-white shadow-sm text-[#2c2c2a]' : 'text-[#2c2c2a]/40 hover:text-[#2c2c2a]'}`}
            >
              <CheckSquare size={14} /> Todoist
            </button>
            <button
              onClick={() => setActiveTab('photo')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'photo' ? 'bg-white shadow-sm text-[#2c2c2a]' : 'text-[#2c2c2a]/40 hover:text-[#2c2c2a]'}`}
            >
              <Camera size={14} /> Photo
            </button>
          </div>
        )}

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {neitherAvailable ? (
            <div className="text-center py-8 space-y-4">
              <p className="text-sm text-[#2c2c2a]/60">
                To import tasks, configure at least one of these:
              </p>
              <div className="space-y-2 text-[#2c2c2a]/40 text-xs">
                <p><strong>Todoist:</strong> Set VITE_TODOIST_CLIENT_ID in your environment</p>
                <p><strong>Photo Import:</strong> Set VITE_GEMINI_API_KEY in your environment</p>
              </div>
            </div>
          ) : (
            <>
              {activeTab === 'todoist' && todoistAvailable && (
                <TodoistTab onImportTasks={onImportTasks} goals={goals} />
              )}
              {activeTab === 'photo' && photoAvailable && (
                <PhotoTab onImportTasks={onImportTasks} goals={goals} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImportTasksModal;
