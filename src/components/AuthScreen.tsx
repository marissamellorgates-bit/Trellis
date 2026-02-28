import React, { useState, useRef } from 'react';
import { Sprout, AlertCircle, ChevronLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { ManagedChildSummary } from '../types';
import { listFamilyChildren } from '../lib/family';

// Invite-only gate: comma-separated codes in env var
const VALID_INVITE_CODES = (import.meta.env.VITE_INVITE_CODES || '')
  .split(',')
  .map((c: string) => c.trim().toUpperCase())
  .filter(Boolean);

const AuthScreen: React.FC = () => {
  const [mode, setMode] = useState<'signin' | 'signup' | 'kidlogin'>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [joinCodeInput, setJoinCodeInput] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);

  // Kid login state — skip code step if saved
  const savedCode = localStorage.getItem('trellis_kid_family_code') || '';
  const [kidStep, setKidStep] = useState<1 | 2 | 3>(1);
  const [kidCode, setKidCode] = useState(savedCode);
  const [kidChildren, setKidChildren] = useState<ManagedChildSummary[]>([]);
  const [selectedKid, setSelectedKid] = useState<ManagedChildSummary | null>(null);
  const [kidPin, setKidPin] = useState('');
  const pinInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [autoLoaded, setAutoLoaded] = useState(false);

  // Auto-load children if saved code exists
  React.useEffect(() => {
    if (mode === 'kidlogin' && savedCode && !autoLoaded && kidChildren.length === 0) {
      setAutoLoaded(true);
      setLoading(true);
      listFamilyChildren(savedCode).then(children => {
        if (children.length > 0) {
          setKidChildren(children);
          setKidStep(2);
        }
      }).catch(() => {
        // Saved code no longer valid — clear it
        localStorage.removeItem('trellis_kid_family_code');
      }).finally(() => setLoading(false));
    }
  }, [mode, savedCode, autoLoaded, kidChildren.length]);

  const handleKidCodeSubmit = async () => {
    if (!kidCode.trim()) return;
    setLoading(true);
    setError('');
    try {
      const children = await listFamilyChildren(kidCode.trim());
      if (children.length === 0) {
        setError('No kids found for this family code');
      } else {
        localStorage.setItem('trellis_kid_family_code', kidCode.trim());
        setKidChildren(children);
        setKidStep(2);
      }
    } catch {
      setError('Could not find family. Check your code.');
    } finally {
      setLoading(false);
    }
  };

  const handleKidPinSubmit = async () => {
    if (!selectedKid || kidPin.length !== 4) return;
    setLoading(true);
    setError('');
    try {
      const syntheticEmail = `${selectedKid.slug}.kid@trellis.app`;
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: syntheticEmail,
        password: `trellis-${kidPin}`,
      });
      if (signInError) throw new Error('Wrong PIN. Try again!');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong';
      setError(message);
      setKidPin('');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'signup') {
        // Validate invite code
        const code = inviteCode.trim().toUpperCase();
        if (VALID_INVITE_CODES.length === 0 || !VALID_INVITE_CODES.includes(code)) {
          throw new Error('Invalid invite code. Trellis is currently invite-only.');
        }

        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { name, invite_code: code, ...(joinCodeInput.trim() ? { join_code: joinCodeInput.trim().toUpperCase() } : {}) } },
        });
        if (signUpError) throw signUpError;
        // If email confirmation is required, session will be null
        if (data.user && !data.session) {
          setCheckEmail(true);
          return;
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#2c2c2a] flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-3">
            <Sprout className="text-[#d4af37]" size={32} />
            <h1 className="font-serif text-4xl italic font-bold text-[#fdfbf7]">Trellis.</h1>
          </div>
          <p className="text-[#fdfbf7]/60 text-sm">Your holistic life operating system</p>
        </div>

        {/* Form */}
        <div className="bg-[#fdfbf7]/5 border border-[#fdfbf7]/10 rounded-2xl p-5 md:p-8 space-y-6">
          {/* Mode Toggle */}
          {/* Signup tab hidden — invite-only mode */}
          <div className="flex bg-[#fdfbf7]/5 p-1 rounded-full">
            {(['signin', 'kidlogin'] as const).map(m => (
              <button
                key={m}
                type="button"
                onClick={() => { setMode(m); setError(''); setKidStep(1); setSelectedKid(null); setKidPin(''); }}
                className={`flex-1 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                  mode === m
                    ? 'bg-[#d4af37] text-[#2c2c2a]'
                    : 'text-[#fdfbf7]/60 hover:text-[#fdfbf7]'
                }`}
              >
                {m === 'signin' ? 'Sign In' : 'Kid Login'}
              </button>
            ))}
          </div>

          {/* Kid Login Flow */}
          {mode === 'kidlogin' && (
            <div className="space-y-6">
              {kidStep === 1 && (
                <div className="space-y-4">
                  <div className="text-center space-y-2">
                    <Sprout className="text-emerald-500 mx-auto" size={32} />
                    <p className="text-[#fdfbf7]/60 text-sm">Enter your family code</p>
                  </div>
                  <input
                    type="text"
                    value={kidCode}
                    onChange={e => setKidCode(e.target.value.toUpperCase())}
                    className="w-full bg-[#fdfbf7]/5 border border-[#fdfbf7]/10 rounded-xl px-4 py-3 text-[#fdfbf7] focus:border-[#d4af37] outline-none transition-colors font-mono text-center text-lg uppercase tracking-widest"
                    placeholder="GROVE-7X2K"
                    maxLength={12}
                    onKeyDown={e => { if (e.key === 'Enter') handleKidCodeSubmit(); }}
                  />
                  <button
                    onClick={handleKidCodeSubmit}
                    disabled={loading || !kidCode.trim()}
                    className="w-full bg-[#d4af37] text-[#2c2c2a] py-3 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-[#fdfbf7] transition-all disabled:opacity-50"
                  >
                    {loading ? 'Looking...' : 'Next'}
                  </button>
                </div>
              )}

              {kidStep === 2 && (
                <div className="space-y-4">
                  <button
                    onClick={() => { setKidStep(1); setError(''); localStorage.removeItem('trellis_kid_family_code'); }}
                    className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#fdfbf7]/60 hover:text-[#fdfbf7] transition-all"
                  >
                    <ChevronLeft size={12} />
                    Change Family
                  </button>
                  <p className="text-[#fdfbf7]/60 text-sm text-center">Who are you?</p>
                  <div className="space-y-2">
                    {kidChildren.map(child => (
                      <button
                        key={child.userId}
                        onClick={() => { setSelectedKid(child); setKidStep(3); setError(''); }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#fdfbf7]/5 border border-[#fdfbf7]/10 hover:border-[#d4af37] hover:bg-[#d4af37]/10 transition-all text-left"
                      >
                        <Sprout size={18} className="text-emerald-500" />
                        <span className="text-[#fdfbf7] font-bold text-sm">{child.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {kidStep === 3 && selectedKid && (
                <div className="space-y-4">
                  <button
                    onClick={() => { setKidStep(2); setKidPin(''); setError(''); }}
                    className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#fdfbf7]/60 hover:text-[#fdfbf7] transition-all"
                  >
                    <ChevronLeft size={12} />
                    Back
                  </button>
                  <div className="text-center space-y-2">
                    <Sprout className="text-emerald-500 mx-auto" size={28} />
                    <p className="text-[#fdfbf7] font-bold">Hi, {selectedKid.name}!</p>
                    <p className="text-[#fdfbf7]/60 text-sm">Enter your PIN</p>
                  </div>
                  <div className="flex justify-center gap-3">
                    {[0, 1, 2, 3].map(i => (
                      <input
                        key={i}
                        ref={el => { pinInputRefs.current[i] = el; }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={kidPin[i] || ''}
                        onChange={e => {
                          const val = e.target.value.replace(/\D/g, '');
                          if (!val && kidPin.length > i) {
                            // Backspace
                            setKidPin(prev => prev.slice(0, i) + prev.slice(i + 1));
                            return;
                          }
                          if (!val) return;
                          const newPin = kidPin.slice(0, i) + val + kidPin.slice(i + 1);
                          setKidPin(newPin.slice(0, 4));
                          if (i < 3 && val) {
                            pinInputRefs.current[i + 1]?.focus();
                          }
                        }}
                        onKeyDown={e => {
                          if (e.key === 'Backspace' && !kidPin[i] && i > 0) {
                            pinInputRefs.current[i - 1]?.focus();
                          }
                        }}
                        className="w-12 h-14 bg-[#fdfbf7]/5 border border-[#fdfbf7]/10 rounded-xl text-[#fdfbf7] text-center text-2xl font-mono focus:border-[#d4af37] outline-none transition-colors"
                        autoFocus={i === 0}
                      />
                    ))}
                  </div>
                  <button
                    onClick={handleKidPinSubmit}
                    disabled={loading || kidPin.length !== 4}
                    className="w-full bg-[#d4af37] text-[#2c2c2a] py-3 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-[#fdfbf7] transition-all disabled:opacity-50"
                  >
                    {loading ? 'Signing in...' : 'Go!'}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Regular Sign In / Sign Up */}
          {mode !== 'kidlogin' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name (signup only) */}
              {mode === 'signup' && (
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#fdfbf7]/60">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-[#fdfbf7]/5 border border-[#fdfbf7]/10 rounded-xl px-4 py-3 text-[#fdfbf7] focus:border-[#d4af37] outline-none transition-colors"
                    placeholder="Your name"
                    required
                  />
                </div>
              )}

              {/* Invite Code (signup only — required for invite-only mode) */}
              {mode === 'signup' && (
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#fdfbf7]/60">Invite Code <span className="normal-case font-normal opacity-60">(required)</span></label>
                  <input
                    type="text"
                    value={inviteCode}
                    onChange={e => setInviteCode(e.target.value.toUpperCase())}
                    className="w-full bg-[#fdfbf7]/5 border border-[#fdfbf7]/10 rounded-xl px-4 py-3 text-[#fdfbf7] focus:border-[#d4af37] outline-none transition-colors font-mono uppercase"
                    placeholder="Enter your invite code"
                    required
                  />
                  <p className="text-[9px] text-[#fdfbf7]/50">Trellis is currently invite-only</p>
                </div>
              )}

              {/* Email */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#fdfbf7]/60">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-[#fdfbf7]/5 border border-[#fdfbf7]/10 rounded-xl px-4 py-3 text-[#fdfbf7] focus:border-[#d4af37] outline-none transition-colors"
                  placeholder="you@example.com"
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#fdfbf7]/60">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-[#fdfbf7]/5 border border-[#fdfbf7]/10 rounded-xl px-4 py-3 text-[#fdfbf7] focus:border-[#d4af37] outline-none transition-colors"
                  placeholder="At least 6 characters"
                  minLength={6}
                  required
                />
              </div>

              {/* Join Code (signup only) */}
              {mode === 'signup' && (
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#fdfbf7]/60">Join Code <span className="normal-case font-normal opacity-60">(optional)</span></label>
                  <input
                    type="text"
                    value={joinCodeInput}
                    onChange={e => setJoinCodeInput(e.target.value.toUpperCase())}
                    className="w-full bg-[#fdfbf7]/5 border border-[#fdfbf7]/10 rounded-xl px-4 py-3 text-[#fdfbf7] focus:border-[#d4af37] outline-none transition-colors font-mono uppercase"
                    placeholder="e.g. GROVE-7X2K"
                    maxLength={12}
                  />
                  <p className="text-[9px] text-[#fdfbf7]/50">Have a family join code? Enter it here to auto-join</p>
                </div>
              )}

              {/* Check email notice */}
              {checkEmail && (
                <div className="flex items-start gap-2 bg-[#d4af37]/10 border border-[#d4af37]/20 rounded-xl p-3">
                  <AlertCircle size={16} className="text-[#d4af37] mt-0.5 shrink-0" />
                  <p className="text-[#d4af37] text-sm">Check your email for a confirmation link, then come back and sign in.</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#d4af37] text-[#2c2c2a] py-3 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-[#fdfbf7] transition-all disabled:opacity-50"
              >
                {loading ? 'Loading...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
              </button>
            </form>
          )}

          {/* Error (shared) */}
          {error && (
            <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/20 rounded-xl p-3">
              <AlertCircle size={16} className="text-red-400 mt-0.5 shrink-0" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default AuthScreen;
