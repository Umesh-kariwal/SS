'use client';

import React, { useState } from 'react';
import { Search, MapPin, Building2, RotateCcw, SlidersHorizontal, X, Check } from 'lucide-react';

interface PropertyFilterProps {
  search: string;
  setSearch: (val: string) => void;
  location: string;
  setLocation: (val: string) => void;
  propertyType: string;
  setPropertyType: (val: string) => void;
  status: string;
  setStatus: (val: string) => void;
  onReset: () => void;
}

const LOCATIONS = ['all', 'Debari', 'Nathdwara', 'Daroli', 'Navaniya', 'Dabok', 'Mavli'];
const TYPES = ['all', 'Plot', 'Villa', 'Commercial', 'House', 'Land'];
const STATUSES = ['all', 'Available', 'Sold', 'Reserved', 'Coming Soon'];

export default function PropertyFilter({
  search,
  setSearch,
  location,
  setLocation,
  propertyType,
  setPropertyType,
  status,
  setStatus,
  onReset,
}: PropertyFilterProps) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const activeFiltersCount =
    (location !== 'all' ? 1 : 0) +
    (propertyType !== 'all' ? 1 : 0) +
    (status !== 'all' ? 1 : 0) +
    (search.trim() ? 1 : 0);

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 shadow-luxury mb-10">
      {/* Mobile Filter Header & Quick Search Bar (<640px) */}
      <div className="flex sm:hidden items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search properties..."
            className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-brand-slate placeholder-slate-400 focus:outline-none focus:border-brand-gold"
          />
        </div>

        <button
          onClick={() => setMobileDrawerOpen(true)}
          className="px-3 py-2.5 rounded-xl bg-brand-slate text-white text-xs font-bold flex items-center gap-1.5 flex-shrink-0 shadow-sm"
        >
          <SlidersHorizontal className="w-4 h-4 text-brand-gold" />
          <span>Filter</span>
          {activeFiltersCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-brand-gold text-brand-slate text-[10px] font-extrabold flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      {/* Desktop Filter Toolbar (>=640px) */}
      <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search Input */}
        <div>
          <label className="block text-[11px] font-bold text-brand-slate uppercase tracking-wider mb-1.5">
            Search Keyword
          </label>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Title, address, keyword..."
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-brand-slate placeholder-slate-400 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors"
            />
          </div>
        </div>

        {/* Location Dropdown */}
        <div>
          <label className="block text-[11px] font-bold text-brand-slate uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-brand-gold" />
            <span>Service Location</span>
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-brand-slate focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors"
          >
            <option value="all">All Locations (Debari, Dabok...)</option>
            {LOCATIONS.filter((l) => l !== 'all').map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Property Type Dropdown */}
        <div>
          <label className="block text-[11px] font-bold text-brand-slate uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5 text-brand-gold" />
            <span>Property Category</span>
          </label>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-brand-slate focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors"
          >
            <option value="all">All Types (Plot, Villa...)</option>
            {TYPES.filter((t) => t !== 'all').map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter Dropdown */}
        <div>
          <label className="block text-[11px] font-bold text-brand-slate uppercase tracking-wider mb-1.5">
            Property Status
          </label>
          <div className="flex items-center gap-2">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-brand-slate focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors"
            >
              <option value="all">All Statuses</option>
              {STATUSES.filter((s) => s !== 'all').map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>

            <button
              onClick={onReset}
              className="p-3 bg-slate-100 border border-slate-200 hover:border-brand-gold rounded-xl text-slate-500 hover:text-brand-bronze transition-colors flex-shrink-0"
              title="Reset Filters"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Slide-Up Mobile Filter Drawer Modal (<640px) */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center sm:hidden animate-fade-in">
          <div className="bg-white border-t border-slate-200 rounded-t-3xl p-6 w-full space-y-5 max-h-[85vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-brand-gold" />
                <h3 className="text-lg font-serif font-bold text-brand-slate">Filter Listings</h3>
              </div>

              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="p-1 text-slate-400 hover:text-brand-slate rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Location Select Pills */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-brand-slate uppercase tracking-wider">
                Service Location
              </label>
              <div className="flex flex-wrap gap-2">
                {LOCATIONS.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => setLocation(loc)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                      location === loc
                        ? 'bg-brand-slate text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {loc === 'all' ? 'All Locations' : loc}
                  </button>
                ))}
              </div>
            </div>

            {/* Property Type Pills */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-brand-slate uppercase tracking-wider">
                Property Category
              </label>
              <div className="flex flex-wrap gap-2">
                {TYPES.map((t) => (
                  <button
                    key={t}
                    onClick={() => setPropertyType(t)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                      propertyType === t
                        ? 'bg-brand-gold text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {t === 'all' ? 'All Types' : t}
                  </button>
                ))}
              </div>
            </div>

            {/* Status Pills */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-brand-slate uppercase tracking-wider">
                Listing Status
              </label>
              <div className="flex flex-wrap gap-2">
                {STATUSES.map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatus(st)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                      status === st
                        ? 'bg-brand-bronze text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {st === 'all' ? 'All Statuses' : st}
                  </button>
                ))}
              </div>
            </div>

            {/* Drawer Actions */}
            <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => {
                  onReset();
                  setMobileDrawerOpen(false);
                }}
                className="w-1/3 py-3 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200"
              >
                Reset All
              </button>

              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="w-2/3 py-3 rounded-xl bg-brand-gold text-white text-xs font-bold flex items-center justify-center gap-2 shadow-gold-glow"
              >
                <Check className="w-4 h-4" />
                <span>Apply Filters ({filteredCountMessage(activeFiltersCount)})</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function filteredCountMessage(count: number): string {
  if (count === 0) return 'All Listings';
  return `${count} active`;
}
