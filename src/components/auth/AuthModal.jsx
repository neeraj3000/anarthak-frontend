// src/components/auth/AuthModal.jsx
import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Lock, Mail, User, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const AuthModal = () => {
  const { isAuthOpen, setIsAuthOpen, user, setUser, showToast } = useStore();
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup' | 'forgot'
  const [email, setEmail] = useState('julian.vance@atelier-verite.com');
  const [password, setPassword] = useState('••••••••');
  const [name, setName] = useState('Julian Vance');

  if (!isAuthOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'forgot') {
      showToast('Password recovery instructions sent to your email', 'info');
      setMode('signin');
      return;
    }
    setUser({
      name: name || 'Julian Vance',
      email: email || 'julian.vance@atelier-verite.com',
      tier: 'VIP Atelier Patron',
      memberSince: '2024'
    });
    showToast(`Welcome back, ${name || 'Julian Vance'}`, 'success');
    setIsAuthOpen(false);
  };

  const handleDemoSignIn = () => {
    setUser({
      name: 'Julian Vance',
      email: 'julian.vance@atelier-verite.com',
      tier: 'VIP Atelier Patron',
      memberSince: '2024'
    });
    showToast('Signed in as VIP Atelier Patron', 'success');
    setIsAuthOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
        onClick={() => setIsAuthOpen(false)}
      />

      <div className="relative w-full max-w-md bg-[#141418] border border-[rgba(255,255,255,0.12)] rounded-2xl shadow-2xl p-6 sm:p-8 z-10 animate-fade-in space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest block">
              ATELIER CLIENT PORTAL
            </span>
            <h2 className="font-editorial text-2xl font-bold text-white">
              {mode === 'signin' ? 'Sign In to Archive' : mode === 'signup' ? 'Create Patron Account' : 'Recover Key'}
            </h2>
          </div>
          <button
            onClick={() => setIsAuthOpen(false)}
            className="p-1 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Demo One-Click Sign In Banner */}
        <div className="p-3 bg-[#1C1C24] border border-[#D4AF37]/30 rounded-lg flex items-center justify-between text-xs font-mono">
          <span className="text-zinc-300">Quick Demo Experience:</span>
          <button
            onClick={handleDemoSignIn}
            className="text-[#D4AF37] hover:underline font-bold flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3 h-3" />
            <span>VIP Auto-Login</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="input-hallmark pl-9"
                  placeholder="Julian Vance"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-mono text-zinc-400 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-hallmark pl-9"
                placeholder="patron@atelier-verite.com"
              />
            </div>
          </div>

          {mode !== 'forgot' && (
            <div>
              <div className="flex justify-between items-center mb-1 text-xs font-mono">
                <label className="text-zinc-400">Password</label>
                {mode === 'signin' && (
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-[#D4AF37] hover:underline cursor-pointer"
                  >
                    Forgot?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input-hallmark pl-9 font-mono"
                  placeholder="••••••••"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="btn-hallmark-primary w-full py-3 text-xs uppercase font-bold tracking-wider cursor-pointer flex items-center justify-center gap-2 mt-4"
          >
            <span>{mode === 'signin' ? 'Sign In' : mode === 'signup' ? 'Join Atelier Registry' : 'Send Recovery Key'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Mode Switcher */}
        <div className="pt-4 border-t border-zinc-800 text-center text-xs font-mono text-zinc-400">
          {mode === 'signin' ? (
            <p>
              New patron?{' '}
              <button onClick={() => setMode('signup')} className="text-[#D4AF37] hover:underline font-bold">
                Create an account
              </button>
            </p>
          ) : (
            <p>
              Already registered?{' '}
              <button onClick={() => setMode('signin')} className="text-[#D4AF37] hover:underline font-bold">
                Sign in to account
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
