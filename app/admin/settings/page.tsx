'use client';

import React, { useState, useEffect } from 'react';
import { Settings, Save, Loader2, CheckCircle2, AlertCircle, Phone, Mail, MessageCircle, Building2, User } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<any>({
    businessName: 'Sawriya Seth Properties (SS Properties)',
    ownerName: 'Ronak Khatik',
    phone: '9511397967',
    email: 'khatik.raja93@gmail.com',
    whatsapp: '9511397967',
    heroTitle: 'Find the Right Property. Build the Right Future.',
    heroSubtitle: 'Trusted local real estate consulting by Ronak Khatik across Debari, Nathdwara, Daroli, Navaniya, Dabok, and Mavli.',
    aboutHeading: 'Sawriya Seth Properties — Your Property Partner',
    aboutDescription: 'Sawriya Seth Properties (SS Properties), led by Ronak Khatik, provides transparent, expert real estate consultancy services specializing in residential plots, commercial land, agricultural parcels, and luxury properties across the Udaipur & Rajsamand region.',
    aboutPhotoUrl: '/uploads/ronak_khatik.jpg',
    footerText: 'Sawriya Seth Properties (SS Properties). All rights reserved.',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
      }
    } catch (e) {
      console.error('Failed to fetch settings:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess(false);

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (!res.ok) {
        throw new Error('Failed to update website settings');
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Error saving settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 text-brand-gold animate-spin" />
        <p className="text-sm text-slate-600 font-medium">Loading website configuration...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-4xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
            Website Content & Contact Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Update business details, phone numbers, hero text, and about information
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-gold via-amber-500 to-brand-bronze text-white font-bold text-xs shadow-gold-glow hover:brightness-110 flex items-center gap-2 disabled:opacity-50"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving Changes...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Website Settings</span>
            </>
          )}
        </button>
      </div>

      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>Website settings updated successfully! Public pages now reflect your changes.</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* 1. Business & Contact Info */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-lg font-serif font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-brand-gold" />
          <span>1. Business Branding & Direct Contact Details</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
              Company Name
            </label>
            <input
              type="text"
              required
              value={settings.businessName || ''}
              onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:border-brand-gold focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
              Owner / Lead Consultant Name
            </label>
            <input
              type="text"
              required
              value={settings.ownerName || ''}
              onChange={(e) => setSettings({ ...settings, ownerName: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:border-brand-gold focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-brand-gold" />
              <span>Primary Phone Number</span>
            </label>
            <input
              type="text"
              required
              value={settings.phone || ''}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:border-brand-gold focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1 flex items-center gap-1">
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp Number</span>
            </label>
            <input
              type="text"
              required
              value={settings.whatsapp || ''}
              onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:border-brand-gold focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-brand-gold" />
              <span>Official Email Address</span>
            </label>
            <input
              type="email"
              required
              value={settings.email || ''}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:border-brand-gold focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* 2. Hero Section Configuration */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-lg font-serif font-bold text-slate-900 border-b border-slate-100 pb-3">
          2. Hero Section Copy
        </h2>

        <div>
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
            Hero Headline (Main Banner Title)
          </label>
          <input
            type="text"
            required
            value={settings.heroTitle || ''}
            onChange={(e) => setSettings({ ...settings, heroTitle: e.target.value })}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:border-brand-gold focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
            Hero Subtitle / Description
          </label>
          <textarea
            rows={2}
            required
            value={settings.heroSubtitle || ''}
            onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:border-brand-gold focus:outline-none"
          />
        </div>
      </div>

      {/* 3. About Section Configuration */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-lg font-serif font-bold text-slate-900 border-b border-slate-100 pb-3">
          3. About Section Copy
        </h2>

        <div>
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
            About Heading
          </label>
          <input
            type="text"
            required
            value={settings.aboutHeading || ''}
            onChange={(e) => setSettings({ ...settings, aboutHeading: e.target.value })}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:border-brand-gold focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
            About Consultant Description
          </label>
          <textarea
            rows={4}
            required
            value={settings.aboutDescription || ''}
            onChange={(e) => setSettings({ ...settings, aboutDescription: e.target.value })}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:border-brand-gold focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
            Owner Profile Photo URL
          </label>
          <input
            type="text"
            value={settings.aboutPhotoUrl || '/uploads/ronak_khatik.jpg'}
            onChange={(e) => setSettings({ ...settings, aboutPhotoUrl: e.target.value })}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:border-brand-gold focus:outline-none"
          />
        </div>
      </div>
    </form>
  );
}
