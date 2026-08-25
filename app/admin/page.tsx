'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Building,
  CheckCircle,
  FileEdit,
  Sparkles,
  MessageSquare,
  Plus,
  ArrowRight,
  Phone,
  MessageCircle,
  Loader2,
} from 'lucide-react';
import { generateWhatsAppLink, formatPhone } from '@/lib/utils';

export default function AdminDashboardPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [propsRes, enqRes] = await Promise.all([
        fetch('/api/properties?includeDrafts=true'),
        fetch('/api/enquiries'),
      ]);

      if (propsRes.ok) {
        const propsData = await propsRes.json();
        setProperties(propsData);
      }
      if (enqRes.ok) {
        const enqData = await enqRes.json();
        setEnquiries(enqData);
      }
    } catch (e) {
      console.error('Error loading dashboard data:', e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 text-brand-gold animate-spin" />
        <p className="text-sm text-slate-600 font-medium">Loading overview analytics...</p>
      </div>
    );
  }

  const totalProperties = properties.length;
  const publishedProperties = properties.filter((p) => p.status !== 'Draft').length;
  const draftProperties = properties.filter((p) => p.status === 'Draft').length;
  const featuredProperties = properties.filter((p) => p.isFeatured).length;
  const totalEnquiries = enquiries.length;
  const newEnquiries = enquiries.filter((e) => e.status === 'New').length;

  return (
    <div className="space-y-8">
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Sawriya Seth Properties (SS Properties) Control Center
          </p>
        </div>

        <Link
          href="/admin/properties/new"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-brand-gold via-amber-500 to-brand-bronze text-white font-bold text-xs shadow-gold-glow hover:brightness-110 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Property</span>
        </Link>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-600">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Total Properties</span>
            <Building className="w-4 h-4 text-brand-gold" />
          </div>
          <div className="text-3xl font-serif font-bold text-slate-900">{totalProperties}</div>
          <div className="text-[11px] text-slate-500 font-medium">Total listings in DB</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-600">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Published</span>
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-serif font-bold text-emerald-700">{publishedProperties}</div>
          <div className="text-[11px] text-slate-500 font-medium">{draftProperties} Drafts pending</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-600">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Featured</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-serif font-bold text-amber-700">{featuredProperties}</div>
          <div className="text-[11px] text-slate-500 font-medium">Homepage highlights</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-600">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">New Enquiries</span>
            <MessageSquare className="w-4 h-4 text-cyan-600" />
          </div>
          <div className="text-3xl font-serif font-bold text-cyan-700">{newEnquiries}</div>
          <div className="text-[11px] text-slate-500 font-medium">{totalEnquiries} Total received</div>
        </div>
      </div>

      {/* Grid: Recent Properties & Recent Enquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Recent Properties */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-serif font-bold text-slate-900">Recent Properties</h2>
            <Link
              href="/admin/properties"
              className="text-xs text-brand-bronze font-bold flex items-center gap-1 hover:underline"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="divide-y divide-slate-100">
              {properties.slice(0, 5).map((prop) => (
                <div key={prop.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={prop.images?.[0]?.imageUrl || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=200&q=80'}
                      alt={prop.title}
                      className="w-12 h-12 rounded-xl object-cover flex-shrink-0 border border-slate-200"
                    />
                    <div className="min-w-0">
                      <Link href={`/admin/properties/${prop.id}/edit`} className="text-sm font-bold text-slate-900 hover:text-brand-bronze truncate block">
                        {prop.title}
                      </Link>
                      <div className="text-xs text-slate-600 font-medium flex items-center gap-2">
                        <span>{prop.location}</span>
                        <span>•</span>
                        <span className="text-brand-bronze font-bold">{prop.priceDisplay}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                      prop.status === 'Available'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : prop.status === 'Draft'
                        ? 'bg-slate-100 text-slate-600 border border-slate-300'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}>
                      {prop.status}
                    </span>

                    <Link
                      href={`/admin/properties/${prop.id}/edit`}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700"
                      title="Edit Property"
                    >
                      <FileEdit className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Recent Enquiries */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-serif font-bold text-slate-900">Recent Customer Enquiries</h2>
            <Link
              href="/admin/enquiries"
              className="text-xs text-brand-bronze font-bold flex items-center gap-1 hover:underline"
            >
              <span>View Inbox</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="divide-y divide-slate-100">
              {enquiries.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500 font-medium">
                  No customer enquiries received yet.
                </div>
              ) : (
                enquiries.slice(0, 5).map((enq) => {
                  const waLink = generateWhatsAppLink(enq.phone, `Hello ${enq.name}, regarding your enquiry for ${enq.requirement || 'property'} on Sawriya Seth Properties.`);

                  return (
                    <div key={enq.id} className="p-4 space-y-2 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-sm text-slate-900">{enq.name}</div>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          enq.status === 'New'
                            ? 'bg-cyan-100 text-cyan-800 border border-cyan-300'
                            : 'bg-slate-100 text-slate-700 border border-slate-200'
                        }`}>
                          {enq.status}
                        </span>
                      </div>

                      <div className="text-xs text-slate-600 font-medium flex items-center justify-between">
                        <span>{formatPhone(enq.phone)}</span>
                        <span>{new Date(enq.createdAt).toLocaleDateString()}</span>
                      </div>

                      <p className="text-xs text-slate-700 font-medium line-clamp-1 italic">
                        &quot;{enq.message}&quot;
                      </p>

                      <div className="flex items-center gap-2 pt-1">
                        <a
                          href={`tel:${enq.phone}`}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 flex items-center gap-1 border border-slate-200"
                        >
                          <Phone className="w-3.5 h-3.5 text-brand-gold" />
                          <span>Call</span>
                        </a>

                        <a
                          href={waLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white flex items-center gap-1 shadow-sm"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
