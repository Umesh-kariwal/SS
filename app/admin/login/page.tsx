'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Key, Shield, AlertCircle, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('khatik.raja93@gmail.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Invalid credentials');
      }

      router.push('/admin');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-brand-cream bg-grid-pattern flex items-center justify-center p-4 relative overflow-hidden">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 shadow-2xl relative z-10 space-y-6">
        {/* Header Logo & Avatar */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-br from-brand-gold via-amber-400 to-amber-600 shadow-gold-glow mx-auto overflow-hidden">
            <img
              src="/uploads/ronak_khatik.jpg"
              alt="Ronak Khatik - Sawriya Seth Properties"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          <div>
            <h1 className="text-2xl font-serif font-bold text-brand-slate tracking-tight">
              Sawriya Seth Properties
            </h1>
            <p className="text-xs text-brand-bronze font-bold uppercase tracking-wider mt-0.5">
              Owner Control Panel (SS Properties)
            </p>
            <p className="text-xs text-brand-slateMuted font-normal mt-1">
              Sign in to manage listings, content, and enquiries
            </p>
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-brand-slate uppercase tracking-wider mb-1.5">
              Admin Email / Username *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="khatik.raja93@gmail.com"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold shadow-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-slate uppercase tracking-wider mb-1.5">
              Password *
            </label>
            <div className="relative">
              <Key className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold shadow-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-4 rounded-xl bg-gradient-to-r from-brand-gold via-amber-500 to-brand-bronze text-white font-bold text-sm flex items-center justify-center gap-2 hover:brightness-110 shadow-gold-glow transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Log In to Dashboard</span>
              </>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center text-[11px] text-brand-slateMuted font-medium">
          Protected Owner Portal • Sawriya Seth Properties (SS Properties)
        </div>
      </div>
    </main>
  );
}
