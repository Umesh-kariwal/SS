'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  MapPin,
  Building,
  FileEdit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Sparkles,
  AlertTriangle,
  Loader2,
} from 'lucide-react';

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Delete modal state
  const [propertyToDelete, setPropertyToDelete] = useState<any | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/properties?includeDrafts=true');
      if (res.ok) {
        const data = await res.json();
        setProperties(data);
      }
    } catch (e) {
      console.error('Failed to fetch properties:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublish = async (property: any) => {
    const newStatus = property.status === 'Draft' ? 'Available' : 'Draft';
    try {
      const res = await fetch(`/api/properties/${property.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        fetchProperties();
      }
    } catch (e) {
      console.error('Failed to toggle publish status:', e);
    }
  };

  const handleToggleFeature = async (property: any) => {
    try {
      const res = await fetch(`/api/properties/${property.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFeatured: !property.isFeatured }),
      });
      if (res.ok) {
        fetchProperties();
      }
    } catch (e) {
      console.error('Failed to toggle feature status:', e);
    }
  };

  const handleDelete = async () => {
    if (!propertyToDelete) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/properties/${propertyToDelete.id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setPropertyToDelete(null);
        fetchProperties();
      }
    } catch (e) {
      console.error('Failed to delete property:', e);
    } finally {
      setDeleting(false);
    }
  };

  const filteredProperties = properties.filter((p) => {
    if (locationFilter !== 'all' && p.location !== locationFilter) return false;
    if (typeFilter !== 'all' && p.propertyType !== typeFilter) return false;
    if (statusFilter !== 'all' && p.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      if (
        !p.title.toLowerCase().includes(q) &&
        !p.location.toLowerCase().includes(q) &&
        !p.address.toLowerCase().includes(q)
      ) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
            Manage Properties
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Create, edit, publish, or feature listings across Sawriya Seth Properties hubs
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

      {/* Search & Filter Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search property title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-gold"
          />
        </div>

        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-brand-gold"
        >
          <option value="all">All Locations</option>
          {['Debari', 'Nathdwara', 'Daroli', 'Navaniya', 'Dabok', 'Mavli'].map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-brand-gold"
        >
          <option value="all">All Types</option>
          {['Plot', 'Villa', 'Commercial', 'House', 'Land'].map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-brand-gold"
        >
          <option value="all">All Statuses</option>
          {['Available', 'Sold', 'Reserved', 'Coming Soon', 'Draft'].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Property Table / Mobile Cards */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center space-y-4">
          <Loader2 className="w-8 h-8 text-brand-gold animate-spin" />
          <p className="text-sm text-slate-600 font-medium">Loading listings...</p>
        </div>
      ) : filteredProperties.length === 0 ? (
        <div className="p-12 text-center bg-white border border-slate-200 rounded-2xl space-y-3 shadow-sm">
          <Building className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-lg font-serif font-bold text-slate-900">No Properties Found</h3>
          <p className="text-xs text-slate-500 font-medium">
            No properties match your current search parameters. Click below to create one.
          </p>
          <Link
            href="/admin/properties/new"
            className="inline-block px-4 py-2 rounded-xl bg-brand-gold text-white text-xs font-bold shadow-gold-glow"
          >
            Create Property
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-700 uppercase tracking-wider bg-slate-50">
                  <th className="py-4 px-4">Property</th>
                  <th className="py-4 px-4">Type</th>
                  <th className="py-4 px-4">Location</th>
                  <th className="py-4 px-4">Price</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4">Featured</th>
                  <th className="py-4 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-900">
                {filteredProperties.map((prop) => (
                  <tr key={prop.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={prop.images?.[0]?.imageUrl || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=200&q=80'}
                          alt={prop.title}
                          className="w-12 h-12 rounded-xl object-cover flex-shrink-0 border border-slate-200"
                        />
                        <div className="min-w-0">
                          <Link href={`/admin/properties/${prop.id}/edit`} className="font-bold text-slate-900 hover:text-brand-bronze line-clamp-1">
                            {prop.title}
                          </Link>
                          <div className="text-[11px] text-slate-500 font-medium">
                            {prop.area} {prop.areaUnit}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 font-bold text-slate-800">{prop.propertyType}</td>
                    <td className="py-4 px-4 text-slate-700 font-medium">{prop.location}</td>
                    <td className="py-4 px-4 font-bold text-brand-bronze">{prop.priceDisplay}</td>

                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        prop.status === 'Available'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : prop.status === 'Draft'
                          ? 'bg-slate-100 text-slate-600 border border-slate-300'
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}>
                        {prop.status}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleToggleFeature(prop)}
                        className={`p-1.5 px-2.5 rounded-lg border text-[11px] font-bold flex items-center gap-1 transition-colors ${
                          prop.isFeatured
                            ? 'bg-amber-100 text-amber-800 border-amber-300'
                            : 'bg-slate-100 text-slate-600 border-slate-200 hover:text-slate-900'
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{prop.isFeatured ? 'Featured' : 'Off'}</span>
                      </button>
                    </td>

                    <td className="py-4 px-4 text-right space-x-1.5">
                      <Link
                        href={`/properties/${prop.slug}`}
                        target="_blank"
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 inline-block"
                        title="Public View"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>

                      <Link
                        href={`/admin/properties/${prop.id}/edit`}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 inline-block"
                        title="Edit Listing"
                      >
                        <FileEdit className="w-4 h-4" />
                      </Link>

                      <button
                        onClick={() => handleTogglePublish(prop)}
                        className={`p-2 rounded-xl border inline-block ${
                          prop.status === 'Draft'
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : 'bg-amber-100 text-amber-800 border-amber-300'
                        }`}
                        title={prop.status === 'Draft' ? 'Publish Listing' : 'Unpublish to Draft'}
                      >
                        {prop.status === 'Draft' ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={() => setPropertyToDelete(prop)}
                        className="p-2 rounded-xl bg-red-100 hover:bg-red-200 border border-red-200 text-red-700 inline-block"
                        title="Delete Property"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Stacked Card View */}
          <div className="lg:hidden divide-y divide-slate-100">
            {filteredProperties.map((prop) => (
              <div key={prop.id} className="p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <img
                    src={prop.images?.[0]?.imageUrl || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=200&q=80'}
                    alt={prop.title}
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0 border border-slate-200"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="font-serif font-bold text-slate-900 text-sm line-clamp-1">{prop.title}</div>
                    <div className="text-xs text-brand-bronze font-bold mt-0.5">{prop.priceDisplay}</div>
                    <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5 mt-1">
                      <span>{prop.location}</span>
                      <span>•</span>
                      <span>{prop.propertyType}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      prop.status === 'Available'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {prop.status}
                    </span>

                    {prop.isFeatured && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-100 text-amber-800 border border-amber-300">
                        Featured
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/properties/${prop.id}/edit`}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-bold text-white"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => setPropertyToDelete(prop)}
                      className="p-1.5 rounded-lg bg-red-100 text-red-700 border border-red-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {propertyToDelete && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-red-200 rounded-3xl p-6 max-w-md w-full space-y-4 animate-fade-in shadow-2xl">
            <div className="flex items-center gap-3 text-red-600">
              <AlertTriangle className="w-6 h-6 flex-shrink-0" />
              <h3 className="text-lg font-serif font-bold text-slate-900">Confirm Delete Property</h3>
            </div>

            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Are you sure you want to permanently delete property <span className="font-bold text-slate-900">&quot;{propertyToDelete.title}&quot;</span>? This action cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setPropertyToDelete(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-bold text-white flex items-center gap-2 disabled:opacity-50"
              >
                {deleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                <span>Delete Permanently</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
