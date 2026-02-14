import { useState, useEffect } from 'react';
import { X, Copy, Check, UserPlus, LogOut as LogOutIcon, Crown, Mail, Clock, Sprout, Eye, Trash2 } from 'lucide-react';
import type { FamilyInfo, FamilyInvite, ManagedChildSummary } from '../types';
import { createFamily, inviteFamilyMember, joinFamily, loadFamilyInfo, loadFamilyInvites, leaveFamily, addManagedChild, removeManagedChild } from '../lib/family';
import { useModal } from '../hooks/useModal';

interface FamilySettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  familyId?: string;
  familyRole?: 'leader' | 'member';
  onFamilyChanged: (familyId: string, role: 'leader' | 'member') => void;
  onFamilyLeft: () => void;
  managedChildren?: ManagedChildSummary[];
  onChildAdded?: () => void;
  onChildRemoved?: () => void;
  onManageChild?: (childUserId: string) => void;
}

const FamilySettingsModal = ({ isOpen, onClose, userId, familyId, familyRole, onFamilyChanged, onFamilyLeft, managedChildren, onChildAdded, onChildRemoved, onManageChild }: FamilySettingsModalProps) => {
  const { modalRef } = useModal(isOpen, onClose);
  const [familyInfo, setFamilyInfo] = useState<FamilyInfo | null>(null);
  const [invites, setInvites] = useState<FamilyInvite[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // No-family state
  const [familyName, setFamilyName] = useState('');
  const [joinCode, setJoinCode] = useState('');

  // Invite state
  const [inviteEmail, setInviteEmail] = useState('');
  const [copied, setCopied] = useState(false);

  // Leave confirmation
  const [confirmLeave, setConfirmLeave] = useState(false);

  // Managed children state
  const [childName, setChildName] = useState('');
  const [childPin, setChildPin] = useState('');
  const [addingChild, setAddingChild] = useState(false);
  const [confirmRemoveChild, setConfirmRemoveChild] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || !familyId) return;

    loadFamilyInfo().then(info => {
      if (info) setFamilyInfo(info);
    });

    if (familyRole === 'leader') {
      loadFamilyInvites(familyId).then(setInvites);
    }
  }, [isOpen, familyId, familyRole]);

  useEffect(() => {
    if (!isOpen) {
      setError('');
      setSuccess('');
      setConfirmLeave(false);
      setCopied(false);
      setInviteEmail('');
      setJoinCode('');
      setFamilyName('');
      setChildName('');
      setChildPin('');
      setAddingChild(false);
      setConfirmRemoveChild(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCreateFamily = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await createFamily(familyName.trim() || undefined);
      setFamilyInfo({ id: result.familyId, name: result.name, joinCode: result.joinCode, leaderId: userId });
      onFamilyChanged(result.familyId, 'leader');
      setSuccess('Family created!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create family');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinFamily = async () => {
    if (!joinCode.trim()) return;
    setLoading(true);
    setError('');
    try {
      const result = await joinFamily(joinCode.trim());
      onFamilyChanged(result.familyId, 'member');
      setFamilyInfo({ id: result.familyId, name: result.familyName, joinCode: '', leaderId: '' });
      setSuccess(`Joined ${result.familyName}!`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to join family');
    } finally {
      setLoading(false);
    }
  };

  const handleInvite = async () => {
    if (!inviteEmail.trim()) return;
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await inviteFamilyMember(inviteEmail.trim());
      setSuccess(`Invite sent to ${inviteEmail.trim()}`);
      setInviteEmail('');
      if (familyId) {
        const updated = await loadFamilyInvites(familyId);
        setInvites(updated);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send invite');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = () => {
    if (familyInfo?.joinCode) {
      navigator.clipboard.writeText(familyInfo.joinCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLeave = async () => {
    setLoading(true);
    setError('');
    try {
      await leaveFamily(userId);
      onFamilyLeft();
      setFamilyInfo(null);
      setConfirmLeave(false);
      setSuccess('You left the family');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to leave family');
    } finally {
      setLoading(false);
    }
  };

  const handleAddChild = async () => {
    if (!childName.trim() || !/^\d{4}$/.test(childPin)) return;
    setAddingChild(true);
    setError('');
    try {
      await addManagedChild(childName.trim(), childPin);
      setSuccess(`${childName.trim()} added! They can use Kid Login with your join code.`);
      setChildName('');
      setChildPin('');
      onChildAdded?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add child');
    } finally {
      setAddingChild(false);
    }
  };

  const handleRemoveChild = async (childUserId: string) => {
    setLoading(true);
    setError('');
    try {
      await removeManagedChild(childUserId);
      setSuccess('Child removed');
      setConfirmRemoveChild(null);
      onChildRemoved?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove child');
    } finally {
      setLoading(false);
    }
  };

  // No family — show create/join options
  if (!familyId) {
    return (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="family-title">
        <div ref={modalRef} className="bg-[#fdfbf7] rounded-3xl max-w-md w-full p-8 relative space-y-6" onClick={e => e.stopPropagation()}>
          <button onClick={onClose} aria-label="Close" className="absolute top-4 right-4 text-[#2c2c2a]/50 hover:text-[#2c2c2a]"><X size={20} /></button>

          <div className="text-center space-y-2">
            <h2 id="family-title" className="font-serif text-2xl italic">My Family</h2>
            <p className="text-sm text-[#2c2c2a]/40">Create a family or join an existing one</p>
          </div>

          {/* Create Family */}
          <div className="bg-white rounded-2xl border border-[#2c2c2a]/10 p-5 space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">Create a Family</p>
            <input
              id="family-name"
              type="text"
              value={familyName}
              onChange={e => setFamilyName(e.target.value)}
              className="w-full bg-[#2c2c2a]/5 border border-[#2c2c2a]/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#d4af37]"
              placeholder="Family name (optional)"
              aria-label="Family name"
              maxLength={50}
            />
            <button
              onClick={handleCreateFamily}
              disabled={loading}
              className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-widest bg-[#d4af37] text-[#2c2c2a] hover:bg-[#c4a030] transition-all disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Family'}
            </button>
          </div>

          {/* Join Family */}
          <div className="bg-white rounded-2xl border border-[#2c2c2a]/10 p-5 space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#2c2c2a]/40">Join a Family</p>
            <input
              id="join-code"
              type="text"
              value={joinCode}
              onChange={e => setJoinCode(e.target.value.toUpperCase())}
              className="w-full bg-[#2c2c2a]/5 border border-[#2c2c2a]/10 rounded-xl px-4 py-3 text-sm font-mono outline-none focus:border-[#d4af37] uppercase"
              placeholder="Enter join code (e.g. GROVE-7X2K)"
              aria-label="Join code"
              maxLength={12}
            />
            <button
              onClick={handleJoinFamily}
              disabled={loading || !joinCode.trim()}
              className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-widest border border-[#2c2c2a]/10 text-[#2c2c2a]/60 hover:bg-[#2c2c2a] hover:text-white transition-all disabled:opacity-30"
            >
              {loading ? 'Joining...' : 'Join Family'}
            </button>
          </div>

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          {success && <p className="text-sm text-emerald-600 text-center">{success}</p>}
        </div>
      </div>
    );
  }

  // Has family — show management view
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="family-title2">
      <div ref={modalRef} className="bg-[#fdfbf7] rounded-3xl max-w-md w-full p-8 relative space-y-6 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} aria-label="Close" className="absolute top-4 right-4 text-[#2c2c2a]/50 hover:text-[#2c2c2a]"><X size={20} /></button>

        <div className="text-center space-y-2">
          <h2 id="family-title2" className="font-serif text-2xl italic">{familyInfo?.name || 'My Family'}</h2>
          <div className="flex items-center justify-center gap-2">
            <Crown size={12} className="text-[#d4af37]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#2c2c2a]/40">
              {familyRole === 'leader' ? 'Leader' : 'Member'}
            </span>
          </div>
        </div>

        {/* Leader View */}
        {familyRole === 'leader' && familyInfo && (
          <>
            {/* Join Code */}
            <div className="bg-white rounded-2xl border border-[#2c2c2a]/10 p-5 space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">Join Code</p>
              <div className="flex items-center gap-2">
                <span className="flex-1 font-mono text-lg font-bold tracking-wider text-[#2c2c2a]">{familyInfo.joinCode}</span>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest bg-[#2c2c2a]/5 text-[#2c2c2a]/60 hover:bg-[#2c2c2a] hover:text-white transition-all"
                >
                  {copied ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
                </button>
              </div>
              <p className="text-[10px] text-[#2c2c2a]/40">Share this code with family members so they can join</p>
            </div>

            {/* Invite by Email */}
            <div className="bg-white rounded-2xl border border-[#2c2c2a]/10 p-5 space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#2c2c2a]/40">Invite by Email</p>
              <form onSubmit={e => { e.preventDefault(); handleInvite(); }} className="flex gap-2">
                <input
                  id="invite-email"
                  type="email"
                  value={inviteEmail}
                  onChange={e => setInviteEmail(e.target.value)}
                  className="flex-1 bg-[#2c2c2a]/5 border border-[#2c2c2a]/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#d4af37]"
                  placeholder="email@example.com"
                  aria-label="Invite email"
                />
                <button
                  type="submit"
                  disabled={loading || !inviteEmail.trim()}
                  aria-label="Send invite"
                  className="px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest bg-[#d4af37] text-[#2c2c2a] hover:bg-[#c4a030] transition-all disabled:opacity-30"
                >
                  <UserPlus size={14} />
                </button>
              </form>
            </div>

            {/* Pending Invites */}
            {invites.length > 0 && (
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#2c2c2a]/40">Invites</p>
                {invites.map(inv => (
                  <div key={inv.id} className="flex items-center gap-3 bg-white rounded-xl border border-[#2c2c2a]/10 px-4 py-3">
                    <Mail size={14} className="text-[#2c2c2a]/50 shrink-0" />
                    <span className="text-sm flex-1 truncate">{inv.email}</span>
                    <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                      inv.status === 'accepted' ? 'bg-emerald-100 text-emerald-700' :
                      inv.status === 'expired' ? 'bg-red-100 text-red-500' :
                      'bg-[#d4af37]/10 text-[#d4af37]'
                    }`}>
                      {inv.status === 'pending' && <Clock size={8} className="inline mr-1" />}
                      {inv.status}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Managed Children */}
            <div className="bg-white rounded-2xl border border-[#2c2c2a]/10 p-5 space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">Kids</p>
              <p className="text-[10px] text-[#2c2c2a]/40">Add children who don't have their own email. They can log in with Kid Login.</p>

              {/* Existing children */}
              {(managedChildren ?? []).length > 0 && (
                <div className="space-y-2">
                  {(managedChildren ?? []).map(child => (
                    <div key={child.userId} className="flex items-center gap-3 bg-[#2c2c2a]/5 rounded-xl px-4 py-3">
                      <Sprout size={14} className="text-emerald-600 shrink-0" />
                      <span className="text-sm font-bold flex-1">{child.name}</span>
                      <button
                        onClick={() => { onManageChild?.(child.userId); onClose(); }}
                        className="p-1.5 rounded-lg text-[#2c2c2a]/50 hover:text-[#d4af37] hover:bg-[#d4af37]/10 transition-all"
                        aria-label="Manage dashboard"
                      >
                        <Eye size={14} />
                      </button>
                      {confirmRemoveChild === child.userId ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleRemoveChild(child.userId)}
                            disabled={loading}
                            className="px-2 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
                          >
                            Remove
                          </button>
                          <button
                            onClick={() => setConfirmRemoveChild(null)}
                            className="px-2 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest text-[#2c2c2a]/50 hover:text-[#2c2c2a] transition-all"
                          >
                            No
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmRemoveChild(child.userId)}
                          className="p-1.5 rounded-lg text-[#2c2c2a]/40 hover:text-red-400 hover:bg-red-50 transition-all"
                          aria-label="Remove child"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Add child form */}
              <div className="space-y-2 pt-1">
                <input
                  id="child-name"
                  type="text"
                  value={childName}
                  onChange={e => setChildName(e.target.value)}
                  className="w-full bg-[#2c2c2a]/5 border border-[#2c2c2a]/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#d4af37]"
                  placeholder="Child's name"
                  aria-label="Child's name"
                  maxLength={30}
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={childPin}
                    onChange={e => setChildPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    className="flex-1 bg-[#2c2c2a]/5 border border-[#2c2c2a]/10 rounded-xl px-4 py-2.5 text-sm font-mono tracking-widest outline-none focus:border-[#d4af37] text-center"
                    placeholder="4-digit PIN"
                    aria-label="4-digit PIN"
                    maxLength={4}
                    inputMode="numeric"
                  />
                  <button
                    onClick={handleAddChild}
                    disabled={addingChild || !childName.trim() || childPin.length !== 4}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest bg-[#d4af37] text-[#2c2c2a] hover:bg-[#c4a030] transition-all disabled:opacity-30"
                  >
                    {addingChild ? '...' : 'Add'}
                  </button>
                </div>
                <p className="text-[9px] text-[#2c2c2a]/50">Tell kids to use "Kid Login" with your join code and their PIN</p>
              </div>
            </div>
          </>
        )}

        {/* Member View */}
        {familyRole === 'member' && (
          <div className="bg-white rounded-2xl border border-[#2c2c2a]/10 p-5 space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#2c2c2a]/40">Family Info</p>
            <p className="text-sm text-[#2c2c2a]/60">You are a member of <strong>{familyInfo?.name || 'this family'}</strong>.</p>

            {confirmLeave ? (
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] text-red-500/80">Leave this family?</span>
                <button
                  onClick={handleLeave}
                  disabled={loading}
                  className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
                >
                  Yes, leave
                </button>
                <button
                  onClick={() => setConfirmLeave(false)}
                  className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#2c2c2a]/50 hover:text-[#2c2c2a] transition-all"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmLeave(true)}
                className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-red-300/60 hover:text-red-400 transition-all mt-2"
              >
                <LogOutIcon size={12} />
                Leave Family
              </button>
            )}
          </div>
        )}

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        {success && <p className="text-sm text-emerald-600 text-center">{success}</p>}
      </div>
    </div>
  );
};

export default FamilySettingsModal;
