'use client';

import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Phone,
  Mail,
  Calendar,
  CheckCircle,
  Clock,
  Trash2,
  MessageCircle,
  Loader2,
  Search,
} from 'lucide-react';
import { generateWhatsAppLink, formatPhone } from '../../../lib/utils';

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/enquiries');
      if (res.ok) {
        const data = await res.json();
        setEnquiries(data);
      }
    } catch (e) {
      console.error('Failed to fetch enquiries:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        fetchEnquiries();
      }
    } catch (e) {
      console.error('Failed to update status:', e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this enquiry?')) return;
    try {
      const res = await fetch(`/api/enquiries/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchEnquiries();
      }
    } catch (e) {
      console.error('Failed to delete enquiry:', e);
    }
  };

  const filteredEnquiries = enquiries.filter((enq) => {
    if (filterStatus !== 'all' && enq.status !== filterStatus) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchName = enq.name.toLowerCase().includes(q);
      const matchPhone = enq.phone.toLowerCase().includes(q);
      const matchMsg = enq.message.toLowerCase().includes(q);
      if (!matchName && !matchPhone && !matchMsg) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
            Customer Enquiries Inbox
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Manage incoming buyer requirements, calls, and WhatsApp consultations
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              filterStatus === 'all'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            All ({enquiries.length})
          </button>
          <button
            onClick={() => setFilterStatus('New')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              filterStatus === 'New'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            New ({enquiries.filter((e) => e.status === 'New').length})
          </button>
          <button
            onClick={() => setFilterStatus('Contacted')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              filterStatus === 'Contacted'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Contacted ({enquiries.filter((e) => e.status === 'Contacted').length})
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search by customer name, phone, message..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-gold shadow-sm"
        />
      </div>

      {/* Inbox List */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center space-y-4">
          <Loader2 className="w-8 h-8 text-brand-gold animate-spin" />
          <p className="text-sm text-slate-600 font-medium">Loading customer leads...</p>
        </div>
      ) : filteredEnquiries.length === 0 ? (
        <div className="p-12 text-center bg-white border border-slate-200 rounded-2xl space-y-3 shadow-sm">
          <MessageSquare className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-lg font-serif font-bold text-slate-900">No Enquiries Found</h3>
          <p className="text-xs text-slate-500 font-medium">
            Your inbox is empty or no leads match your filter.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEnquiries.map((enq) => {
            const waLink = generateWhatsAppLink(
              enq.phone,
              `Hello ${enq.name}, I received your enquiry regarding ${enq.requirement || 'property options'} on Sawriya Seth Properties.`
            );

            return (
              <div
                key={enq.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 hover:border-brand-gold transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="font-bold text-base text-slate-900">{enq.name}</div>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        enq.status === 'New'
                          ? 'bg-cyan-100 text-cyan-800 border border-cyan-300'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      }`}
                    >
                      {enq.status}
                    </span>
                  </div>

                  <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{new Date(enq.createdAt).toLocaleString()}</span>
                  </div>
                </div>

                {/* Info Pills */}
                <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
                  <span className="px-3 py-1 rounded-lg bg-slate-100 border border-slate-200">
                    Phone: <span className="font-bold text-slate-900">{formatPhone(enq.phone)}</span>
                  </span>
                  {enq.email && (
                    <span className="px-3 py-1 rounded-lg bg-slate-100 border border-slate-200">
                      Email: <span className="font-bold text-slate-900">{enq.email}</span>
                    </span>
                  )}
                  {enq.preferredLocation && (
                    <span className="px-3 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200">
                      Location: <span className="font-bold">{enq.preferredLocation}</span>
                    </span>
                  )}
                  {enq.budget && (
                    <span className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
                      Budget: <span className="font-bold">{enq.budget}</span>
                    </span>
                  )}
                </div>

                {/* Message Body */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium leading-relaxed">
                  &quot;{enq.message}&quot;
                </div>

                {/* Action Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${enq.phone}`}
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-900 border border-slate-300 flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-brand-gold" />
                      <span>Call Customer</span>
                    </a>

                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white flex items-center gap-1.5 shadow-sm"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Reply on WhatsApp</span>
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    {enq.status === 'New' ? (
                      <button
                        onClick={() => handleUpdateStatus(enq.id, 'Contacted')}
                        className="px-3 py-2 rounded-xl bg-cyan-100 hover:bg-cyan-200 text-cyan-800 text-xs font-bold border border-cyan-300 flex items-center gap-1"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Mark Contacted</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUpdateStatus(enq.id, 'New')}
                        className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 flex items-center gap-1"
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>Mark New</span>
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(enq.id)}
                      className="p-2 rounded-xl bg-red-100 hover:bg-red-200 text-red-700 border border-red-200"
                      title="Delete Lead"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
