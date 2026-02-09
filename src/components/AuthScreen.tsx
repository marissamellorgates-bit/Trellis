import React, { useState } from 'react';
import { Sprout, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

const AuthScreen: React.FC = () => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'signup') {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { name } },
        });
        if (signUpError) throw signUpError;
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
    <div className="min-h-screen bg-[#2c2c2a] flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-3">
            <Sprout className="text-[#d4af37]" size={32} />
            <h1 className="font-serif text-4xl italic font-bold text-[#fdfbf7]">Trellis.</h1>
          </div>
          <p className="text-[#fdfbf7]/40 text-sm">Your holistic life operating system</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-[#fdfbf7]/5 border border-[#fdfbf7]/10 rounded-2xl p-8 space-y-6">
          {/* Mode Toggle */}
          <div className="flex bg-[#fdfbf7]/5 p-1 rounded-full">
            {(['signin', 'signup'] as const).map(m => (
              <button
                key={m}
                type="button"
                onClick={() => { setMode(m); setError(''); }}
                className={`flex-1 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                  mode === m
                    ? 'bg-[#d4af37] text-[#2c2c2a]'
                    : 'text-[#fdfbf7]/40 hover:text-[#fdfbf7]'
                }`}
              >
                {m === 'signin' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          {/* Name (signup only) */}
          {mode === 'signup' && (
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#fdfbf7]/50">Name</label>
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

          {/* Email */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#fdfbf7]/50">Email</label>
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
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#fdfbf7]/50">Password</label>
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

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/20 rounded-xl p-3">
              <AlertCircle size={16} className="text-red-400 mt-0.5 shrink-0" />
              <p className="text-red-400 text-sm">{error}</p>
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
      </div>
    </div>
  );
};

export default AuthScreen;
