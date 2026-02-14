import { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import type { FamilyMember, DBCommunityProject } from '../types';
import { upsertProject, publishProject } from '../lib/community';
import { useModal } from '../hooks/useModal';

interface PublishProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: FamilyMember;
  userId: string;
  existingProject?: DBCommunityProject | null;
  onPublished: (project: DBCommunityProject) => void;
}

const COMMUNITY_OPTIONS = [
  { id: 'family', label: 'Family Garden' },
  { id: 'work', label: 'Work Orchard' },
  { id: 'town', label: 'Local Community' },
  { id: 'church', label: 'Faith Community' },
];

const PublishProjectModal = ({ isOpen, onClose, member, userId, existingProject, onPublished }: PublishProjectModalProps) => {
  const [description, setDescription] = useState(existingProject?.description ?? '');
  const [tagsInput, setTagsInput] = useState(existingProject?.tags.join(', ') ?? '');
  const [visibility, setVisibility] = useState<string[]>(existingProject?.visibility ?? ['family']);
  const [saving, setSaving] = useState(false);
  const { modalRef } = useModal(isOpen, onClose);

  if (!isOpen) return null;

  const parseTags = (input: string): string[] =>
    input.split(',').map(t => t.trim().toLowerCase()).filter(Boolean);

  const handleSave = async (publish: boolean) => {
    setSaving(true);
    const tags = parseTags(tagsInput);

    const projectData = {
      ...(existingProject?.id ? { id: existingProject.id } : {}),
      user_id: userId,
      author_name: member.name,
      title: member.projectTitle,
      description,
      plant: member.projectPlant,
      stage: member.currentModule,
      status: existingProject?.status ?? 'draft' as const,
      visibility,
      tags,
      impact_vectors: member.projectImpactVectors as string[],
    };

    const result = await upsertProject(projectData);
    if (result) {
      if (publish && result.status !== 'published') {
        const ok = await publishProject(result.id);
        if (ok) {
          result.status = 'published';
          result.published_at = new Date().toISOString();
        }
      }
      onPublished(result);
    }
    setSaving(false);
    onClose();
  };

  const toggleVisibility = (id: string) => {
    setVisibility(prev => prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="publish-title">
      <div ref={modalRef} className="bg-[#fdfbf7] rounded-3xl max-w-lg w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-8 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 id="publish-title" className="font-serif text-2xl italic text-[#2c2c2a]">
                {existingProject ? 'Edit Project' : 'Share to Community'}
              </h2>
              <p className="text-xs text-[#2c2c2a]/40 mt-1">{member.projectTitle}</p>
            </div>
            <button onClick={onClose} aria-label="Close" className="text-[#2c2c2a]/50 hover:text-[#2c2c2a]"><X size={20} /></button>
          </div>

          {/* Pre-filled info */}
          <div className="flex gap-2">
            <span className="text-xs font-bold uppercase bg-[#2c2c2a]/5 px-3 py-1.5 rounded-full text-[#2c2c2a]/60 capitalize">
              {member.projectPlant}
            </span>
            <span className="text-xs font-bold uppercase bg-[#2c2c2a]/5 px-3 py-1.5 rounded-full text-[#2c2c2a]/60">
              Module {member.currentModule}
            </span>
            {member.projectEthicsCheck && Object.values(member.projectEthicsCheck).every(Boolean) && (
              <span className="text-xs font-bold uppercase bg-emerald-50 px-3 py-1.5 rounded-full text-emerald-600 flex items-center gap-1">
                <CheckCircle2 size={12} /> Ethics
              </span>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label htmlFor="publish-desc" className="text-[10px] font-bold uppercase tracking-widest text-[#2c2c2a]/40">Description</label>
            <textarea
              id="publish-desc"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full bg-white border border-[#2c2c2a]/10 rounded-xl p-4 h-28 text-sm focus:border-[#d4af37] outline-none resize-none"
              placeholder="Tell the community about your project..."
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <label htmlFor="publish-tags" className="text-[10px] font-bold uppercase tracking-widest text-[#2c2c2a]/40">Tags</label>
            <input
              id="publish-tags"
              type="text"
              value={tagsInput}
              onChange={e => setTagsInput(e.target.value)}
              className="w-full bg-white border border-[#2c2c2a]/10 rounded-xl px-4 py-3 text-sm focus:border-[#d4af37] outline-none"
              placeholder="e.g. permaculture, garden, learning"
            />
            {tagsInput && (
              <div className="flex flex-wrap gap-1.5">
                {parseTags(tagsInput).map(tag => (
                  <span key={tag} className="px-2 py-0.5 bg-[#d4af37]/10 text-[#d4af37] rounded-full text-[10px] font-bold">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Visibility */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#2c2c2a]/40">Visible to</label>
            <div className="grid grid-cols-2 gap-2">
              {COMMUNITY_OPTIONS.map(c => (
                <button
                  key={c.id}
                  onClick={() => toggleVisibility(c.id)}
                  className={`px-4 py-3 rounded-xl border text-xs font-bold uppercase tracking-widest transition-all ${
                    visibility.includes(c.id)
                      ? 'bg-[#d4af37] border-[#d4af37] text-[#2c2c2a]'
                      : 'border-[#2c2c2a]/10 text-[#2c2c2a]/40 hover:border-[#2c2c2a]/30'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => handleSave(false)}
              disabled={saving}
              className="flex-1 py-3 rounded-xl border border-[#2c2c2a]/10 text-xs font-bold uppercase tracking-widest hover:bg-[#2c2c2a]/5 transition-all disabled:opacity-40"
            >
              Save Draft
            </button>
            <button
              onClick={() => handleSave(true)}
              disabled={saving}
              className="flex-1 py-3 rounded-xl bg-[#d4af37] text-[#2c2c2a] text-xs font-bold uppercase tracking-widest hover:bg-[#d4af37]/80 transition-all disabled:opacity-40"
            >
              {existingProject?.status === 'published' ? 'Update' : 'Publish'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishProjectModal;
