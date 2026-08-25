'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Building,
  PlusCircle,
  MessageSquare,
  Image as ImageIcon,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [adminUser, setAdminUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (pathname === '/admin/login') {
      setLoading(false);
      return;
    }
    checkAuth();
  }, [pathname]);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (!res.ok) {
        router.push('/admin/login');
        return;
      }
      const data = await res.json();
      setAdminUser(data.user);
    } catch (e) {
      router.push('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center space-y-4">
        <div className="w-8 h-8 border-4 border-brand-gold border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-brand-slateMuted font-medium">Verifying admin session...</p>
      </div>
    );
  }

  const navItems = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Manage Properties', href: '/admin/properties', icon: Building },
    { label: 'Add New Property', href: '/admin/properties/new', icon: PlusCircle },
    { label: 'Customer Enquiries', href: '/admin/enquiries', icon: MessageSquare },
    { label: 'Media Library', href: '/admin/media', icon: ImageIcon },
    { label: 'Website Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-white p-5 space-y-8 flex-shrink-0">
        {/* Brand Header */}
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full p-0.5 bg-gradient-to-br from-brand-gold to-amber-500 overflow-hidden flex-shrink-0">
            <img
              src="/uploads/ronak_khatik.jpg"
              alt="Ronak Khatik"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="min-w-0">
            <div className="font-serif font-bold text-white text-sm truncate">Sawriya Seth Properties</div>
            <div className="text-[10px] uppercase tracking-wider text-brand-gold font-bold truncate">
              Ronak Khatik (SS Properties)
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5 flex-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-brand-gold text-white shadow-gold-glow'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-slate-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
          >
            <span>View Public Website</span>
            <ExternalLink className="w-3.5 h-3.5 text-brand-gold" />
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3.5 py-2.5 rounded-xl text-xs font-bold text-red-400 hover:bg-red-950/50 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Top Navigation */}
      <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img
            src="/uploads/ronak_khatik.jpg"
            alt="Ronak Khatik"
            className="w-8 h-8 rounded-full object-cover border border-brand-gold"
          />
          <div>
            <div className="font-serif font-bold text-white text-xs">Sawriya Seth Properties</div>
            <div className="text-[9px] text-brand-gold font-bold">Control Panel</div>
          </div>
        </div>

        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="text-slate-300 p-1.5"
        >
          {mobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 space-y-3">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold ${
                    isActive ? 'bg-brand-gold text-white' : 'text-slate-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <Link
              href="/"
              target="_blank"
              className="text-xs text-brand-gold font-bold flex items-center gap-1"
            >
              <span>Public Website</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs text-red-400 font-bold flex items-center gap-1"
            >
              <LogOut className="w-3 h-3" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-6">{children}</div>
      </main>
    </div>
  );
}
