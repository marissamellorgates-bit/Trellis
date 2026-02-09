import { useState, useRef } from 'react';
import { X, Upload, Calendar, Check, AlertCircle, FileText, ChevronDown } from 'lucide-react';
import type { ImportScheduleModalProps, ScheduleItem } from '../types';
import { parseAndConvert } from '../lib/icsParser';
import {
  isGoogleAuthAvailable,
  initGoogleAuth,
  requestGoogleAuth,
} from '../lib/googleCalendar';

type Tab = 'ics' | 'google';

const ImportScheduleModal = ({ isOpen, onClose, onImport, existingSourceIds }: ImportScheduleModalProps) => {
  const [activeTab, setActiveTab] = useState<Tab>('ics');
  const [preview, setPreview] = useState<ScheduleItem[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState('');
  const [imported, setImported] = useState(false);
  const [importCount, setImportCount] = useState(0);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleAccessToken, setGoogleAccessToken] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showHelp, setShowHelp] = useState(false);

  if (!isOpen) return null;

  const resetState = () => {
    setPreview([]);
    setSelected(new Set());
    setError('');
    setFileName('');
    setImported(false);
    setImportCount(0);
    setGoogleLoading(false);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleTabSwitch = (tab: Tab) => {
    resetState();
    setActiveTab(tab);
  };

  const isAlreadyImported = (item: ScheduleItem) =>
    !!item.sourceId && existingSourceIds.has(item.sourceId);

  const loadPreview = (items: ScheduleItem[]) => {
    setPreview(items);
    const newIndexes = new Set<number>();
    items.forEach((item, i) => {
      if (!isAlreadyImported(item)) newIndexes.add(i);
    });
    setSelected(newIndexes);
  };

  // ── ICS handling ──────────────────────────────────────────

  const processICSText = (text: string) => {
    try {
      const items = parseAndConvert(text);
      if (items.length === 0) {
        setError('No events found for today in this file.');
        return;
      }
      loadPreview(items);
      setError('');
    } catch {
      setError('Could not read this file. Make sure it is a calendar export (.ics).');
    }
  };

  const handleFileSelect = (file: File) => {
    if (!file.name.endsWith('.ics')) {
      setError('Please select a calendar file (.ics).');
      return;
    }
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      if (typeof text === 'string') processICSText(text);
    };
    reader.onerror = () => setError('Failed to read file.');
    reader.readAsText(file);
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  // ── Google handling ───────────────────────────────────────

  const handleGoogleConnect = () => {
    if (!isGoogleAuthAvailable()) {
      setError('Google Calendar is not available. Check that VITE_GOOGLE_CLIENT_ID is set.');
      return;
    }
    setGoogleLoading(true);
    setError('');

    initGoogleAuth(
      async (token) => {
        setGoogleAccessToken(token);
        onImport([], token);
        setGoogleLoading(false);
        handleClose();
      },
      (err) => {
        setError(`Google auth failed: ${err}`);
        setGoogleLoading(false);
      },
    );

    requestGoogleAuth();
  };

  // ── Import ────────────────────────────────────────────────

  const handleImport = () => {
    const items = preview.filter((_, i) => selected.has(i));
    if (items.length === 0) return;
    onImport(items, googleAccessToken ?? undefined);
    setImportCount(items.length);
    setImported(true);
  };

  const toggleItem = (index: number) => {
    if (isAlreadyImported(preview[index])) return;
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const selectableCount = preview.filter((_, i) => selected.has(i)).length;

  // ── Success state ─────────────────────────────────────────

  if (imported) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#2c2c2a]/90 backdrop-blur-md">
        <div className="bg-[#fdfbf7] w-full max-w-md rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in duration-300 p-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto">
            <Check size={24} className="text-green-600" />
          </div>
          <h3 className="font-serif text-2xl">Imported {importCount} event{importCount !== 1 ? 's' : ''}</h3>
          <p className="text-sm text-[#2c2c2a]/50">Your schedule has been updated.</p>
          <button
            onClick={handleClose}
            className="w-full bg-[#2c2c2a] text-[#fdfbf7] py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-[#d4af37] hover:text-[#2c2c2a] transition-all"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  // ── Main modal ────────────────────────────────────────────

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#2c2c2a]/90 backdrop-blur-md">
      <div className="bg-[#fdfbf7] w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in duration-300 max-h-[90vh] flex flex-col">
        <div className="p-6 space-y-5 overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#d4af37]">Import Schedule</span>
            <button onClick={handleClose} className="text-[#2c2c2a]/40 hover:text-[#2c2c2a]"><X size={18}/></button>
          </div>

          {/* Tabs */}
          <div className="grid grid-cols-2 gap-2 bg-[#2c2c2a]/5 p-1 rounded-xl">
            <button
              onClick={() => handleTabSwitch('ics')}
              className={`py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                activeTab === 'ics' ? 'bg-white shadow-sm text-[#2c2c2a]' : 'text-[#2c2c2a]/40'
              }`}
            >
              <Upload size={12} /> Upload Calendar
            </button>
            <button
              onClick={() => handleTabSwitch('google')}
              className={`py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                activeTab === 'google' ? 'bg-white shadow-sm text-[#2c2c2a]' : 'text-[#2c2c2a]/40'
              }`}
            >
              <Calendar size={12} /> Google Calendar
            </button>
          </div>

          {/* ICS Tab */}
          {activeTab === 'ics' && preview.length === 0 && (
            <div
              onDrop={onDrop}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-[#d4af37] bg-[#d4af37]/5'
                  : 'border-[#2c2c2a]/10 hover:border-[#d4af37]/50'
              }`}
            >
              <FileText size={32} className="mx-auto text-[#2c2c2a]/20 mb-3" />
              <p className="text-sm font-medium text-[#2c2c2a]/60">
                {fileName || 'Drop calendar file here or click to browse'}
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".ics"
                onChange={onFileInputChange}
                className="hidden"
              />
            </div>
          )}

          {activeTab === 'ics' && preview.length === 0 && (
            <div>
              <button
                onClick={() => setShowHelp(!showHelp)}
                className="flex items-center gap-1.5 text-xs text-[#2c2c2a]/40 hover:text-[#2c2c2a]/60 transition-colors mx-auto"
              >
                How do I get this file?
                <ChevronDown size={12} className={`transition-transform ${showHelp ? 'rotate-180' : ''}`} />
              </button>
              {showHelp && (
                <div className="mt-3 bg-[#2c2c2a]/5 rounded-xl p-4 space-y-2.5 text-xs text-[#2c2c2a]/60">
                  <p><span className="font-bold text-[#2c2c2a]/80">Google Calendar:</span> Open Settings → Import & Export → Export. It downloads a .zip — unzip it and drop the file here.</p>
                  <p><span className="font-bold text-[#2c2c2a]/80">Apple Calendar:</span> File → Export → Export… Choose where to save, then drop it here.</p>
                  <p><span className="font-bold text-[#2c2c2a]/80">Outlook:</span> File → Open & Export → Import/Export → Export to a file. Save it, then drop it here.</p>
                </div>
              )}
            </div>
          )}

          {/* Google Tab */}
          {activeTab === 'google' && preview.length === 0 && (
            <div className="text-center py-6 space-y-4">
              <Calendar size={32} className="mx-auto text-[#2c2c2a]/20" />
              <p className="text-sm text-[#2c2c2a]/50">Connect your Google Calendar to import today's events.</p>
              <button
                onClick={handleGoogleConnect}
                disabled={googleLoading}
                className="inline-flex items-center gap-2 bg-[#4285F4] text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-[#3367D6] transition-all disabled:opacity-50"
              >
                <Calendar size={14} />
                {googleLoading ? 'Connecting...' : 'Connect Google Calendar'}
              </button>
              {!isGoogleAuthAvailable() && (
                <p className="text-[10px] text-[#2c2c2a]/30">Requires VITE_GOOGLE_CLIENT_ID in .env</p>
              )}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-xl">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Preview Table */}
          {preview.length > 0 && (
            <div className="space-y-3">
              <p className="text-[10px] font-bold tracking-widest uppercase text-[#2c2c2a]/40">
                {preview.length} event{preview.length !== 1 ? 's' : ''} found
              </p>
              <div className="space-y-1.5 max-h-[40vh] overflow-y-auto">
                {preview.map((item, i) => {
                  const alreadyIn = isAlreadyImported(item);
                  const isSelected = selected.has(i);
                  return (
                    <button
                      key={item.sourceId ?? `${item.time}-${item.title}`}
                      onClick={() => toggleItem(i)}
                      disabled={alreadyIn}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl text-left text-sm transition-all ${
                        alreadyIn
                          ? 'bg-[#2c2c2a]/5 opacity-40 cursor-not-allowed'
                          : isSelected
                          ? 'bg-[#d4af37]/10 border border-[#d4af37]/30'
                          : 'bg-white border border-[#2c2c2a]/5 hover:border-[#d4af37]/30'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${
                        alreadyIn ? 'bg-[#2c2c2a]/10 border-[#2c2c2a]/10' :
                        isSelected ? 'bg-[#d4af37] border-[#d4af37] text-white' : 'border-[#2c2c2a]/20'
                      }`}>
                        {(isSelected || alreadyIn) && <Check size={12} />}
                      </div>
                      <span className="font-mono text-xs text-[#2c2c2a]/40 w-12">{item.time}</span>
                      <div className="flex-1 min-w-0">
                        <span className="block truncate">{item.title}</span>
                        {alreadyIn && <span className="text-[10px] text-[#2c2c2a]/30">Already imported</span>}
                      </div>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        item.type === 'bio' ? 'bg-green-100 text-green-700' :
                        item.type === 'block' ? 'bg-blue-100 text-blue-700' :
                        item.type === 'project' ? 'bg-[#d4af37]/10 text-[#d4af37]' :
                        'bg-[#2c2c2a]/5 text-[#2c2c2a]/50'
                      }`}>{item.type}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Import Button */}
          {preview.length > 0 && (
            <button
              onClick={handleImport}
              disabled={selectableCount === 0}
              className="w-full bg-[#2c2c2a] text-[#fdfbf7] py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-[#d4af37] hover:text-[#2c2c2a] transition-all disabled:opacity-20"
            >
              Import {selectableCount} event{selectableCount !== 1 ? 's' : ''}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImportScheduleModal;
