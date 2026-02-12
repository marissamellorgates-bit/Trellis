import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import type { UserCommunity } from '../types';
import { ICON_PICKER_OPTIONS, COMMUNITY_ICON_MAP } from '../lib/communityIcons';

interface CommunitySettingsModalProps {
  isOpen: boolean;
  communities: UserCommunity[];
  onSave: (communities: UserCommunity[]) => void;
  onClose: () => void;
}

const MAX_COMMUNITIES = 10;

const CommunitySettingsModal = ({ isOpen, communities, onSave, onClose }: CommunitySettingsModalProps) => {
  const [local, setLocal] = useState<UserCommunity[]>(() => [...communities]);
  const [newName, setNewName] = useState('');
  const [newIconKey, setNewIconKey] = useState('Users');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [showIconPicker, setShowIconPicker] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDelete = (id: string) => {
    setLocal(prev => prev.filter(c => c.id !== id));
  };

  const handleAdd = () => {
    if (!newName.trim() || local.length >= MAX_COMMUNITIES) return;
    const newCommunity: UserCommunity = {
      id: `custom-${Date.now()}`,
      name: newName.trim(),
      iconKey: newIconKey,
      type: 'custom',
      isDefault: false,
    };
    setLocal(prev => [...prev, newCommunity]);
    setNewName('');
    setNewIconKey('Users');
  };

  const handleRename = (id: string) => {
    if (!editName.trim()) return;
    setLocal(prev => prev.map(c => c.id === id ? { ...c, name: editName.trim() } : c));
    setEditingId(null);
    setEditName('');
  };

  const handleIconChange = (id: string, iconKey: string) => {
    setLocal(prev => prev.map(c => c.id === id ? { ...c, iconKey } : c));
    setShowIconPicker(null);
  };

  const handleSave = () => {
    onSave(local);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#2c2c2a]/80 backdrop-blur-sm">
      <div className="bg-[#fdfbf7] w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2c2c2a]/10">
          <h2 className="font-serif text-xl italic">My Communities</h2>
          <button onClick={onClose} className="text-[#2c2c2a]/30 hover:text-[#2c2c2a] transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="px-6 py-4 space-y-2 max-h-[60vh] overflow-y-auto">
          {local.map(c => {
            const Icon = COMMUNITY_ICON_MAP[c.iconKey] ?? COMMUNITY_ICON_MAP['Users'];
            const isEditing = editingId === c.id;
            const isPrivate = c.id === 'private';

            return (
              <div key={c.id} className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white border border-[#2c2c2a]/5 group">
                {/* Icon (clickable for icon picker) */}
                <div className="relative">
                  <button
                    onClick={() => {
                      if (!isPrivate) setShowIconPicker(showIconPicker === c.id ? null : c.id);
                    }}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${isPrivate ? 'bg-[#2c2c2a]/5 cursor-default' : 'bg-[#2c2c2a]/5 hover:bg-[#d4af37]/20'}`}
                    title={isPrivate ? 'Private Greenhouse' : 'Change icon'}
                  >
                    <Icon size={16} className="text-[#2c2c2a]/60" />
                  </button>
                  {showIconPicker === c.id && (
                    <div className="absolute top-10 left-0 bg-white border border-[#2c2c2a]/10 rounded-xl shadow-lg p-2 grid grid-cols-4 gap-1 z-10 w-40">
                      {ICON_PICKER_OPTIONS.map(opt => (
                        <button
                          key={opt.key}
                          onClick={() => handleIconChange(c.id, opt.key)}
                          className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${c.iconKey === opt.key ? 'bg-[#d4af37] text-[#2c2c2a]' : 'hover:bg-[#2c2c2a]/5'}`}
                        >
                          <opt.icon size={14} />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Name */}
                <div className="flex-1 min-w-0">
                  {isEditing ? (
                    <form onSubmit={e => { e.preventDefault(); handleRename(c.id); }} className="flex gap-2">
                      <input
                        type="text"
                        value={editName}
                        onChange={e => setEditName(e.target.value)}
                        className="flex-1 text-sm bg-transparent border-b border-[#d4af37] outline-none py-0.5"
                        autoFocus
                      />
                      <button type="submit" className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">OK</button>
                      <button type="button" onClick={() => setEditingId(null)} className="text-[10px] font-bold uppercase tracking-widest text-[#2c2c2a]/30">Cancel</button>
                    </form>
                  ) : (
                    <button
                      onClick={() => {
                        if (!isPrivate) {
                          setEditingId(c.id);
                          setEditName(c.name);
                        }
                      }}
                      className={`text-sm text-left truncate w-full ${isPrivate ? 'cursor-default' : 'hover:text-[#d4af37] transition-colors'}`}
                      title={isPrivate ? undefined : 'Click to rename'}
                    >
                      {c.name}
                      {isPrivate && <span className="text-[9px] text-[#2c2c2a]/30 ml-2 uppercase">(always present)</span>}
                    </button>
                  )}
                </div>

                {/* Delete */}
                {!isPrivate && (
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="text-[#2c2c2a]/15 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                    title="Remove community"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            );
          })}

          {/* Add New */}
          {local.length < MAX_COMMUNITIES && (
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl border-2 border-dashed border-[#2c2c2a]/10">
              <div className="relative">
                <button
                  onClick={() => setShowIconPicker(showIconPicker === '_new' ? null : '_new')}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#2c2c2a]/5 hover:bg-[#d4af37]/20 transition-all"
                >
                  {React.createElement(COMMUNITY_ICON_MAP[newIconKey] ?? COMMUNITY_ICON_MAP['Users'], { size: 16, className: 'text-[#2c2c2a]/40' })}
                </button>
                {showIconPicker === '_new' && (
                  <div className="absolute top-10 left-0 bg-white border border-[#2c2c2a]/10 rounded-xl shadow-lg p-2 grid grid-cols-4 gap-1 z-10 w-40">
                    {ICON_PICKER_OPTIONS.map(opt => (
                      <button
                        key={opt.key}
                        onClick={() => { setNewIconKey(opt.key); setShowIconPicker(null); }}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${newIconKey === opt.key ? 'bg-[#d4af37] text-[#2c2c2a]' : 'hover:bg-[#2c2c2a]/5'}`}
                      >
                        <opt.icon size={14} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <form onSubmit={e => { e.preventDefault(); handleAdd(); }} className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="New community name..."
                  className="flex-1 text-sm bg-transparent outline-none placeholder:text-[#2c2c2a]/20"
                  maxLength={40}
                />
                <button
                  type="submit"
                  disabled={!newName.trim()}
                  className="flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[#d4af37]/10 text-[#d4af37] hover:bg-[#d4af37] hover:text-[#2c2c2a] transition-all disabled:opacity-20"
                >
                  <Plus size={12} /> Add
                </button>
              </form>
            </div>
          )}

          {local.length >= MAX_COMMUNITIES && (
            <p className="text-[10px] text-[#2c2c2a]/30 text-center py-1">Maximum 10 communities reached</p>
          )}
        </div>

        <div className="flex gap-3 px-6 py-4 border-t border-[#2c2c2a]/10">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#2c2c2a]/40 hover:text-[#2c2c2a] transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest bg-[#2c2c2a] text-[#fdfbf7] hover:bg-[#d4af37] hover:text-[#2c2c2a] transition-all"
          >
            Save Communities
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunitySettingsModal;
