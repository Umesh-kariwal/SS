'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import PropertyCard, { PropertyCardData } from '../components/PropertyCard';
import PropertyFilter from '../components/PropertyFilter';
import LocationSection from '../components/LocationSection';
import AboutSection from '../components/AboutSection';
import EnquiryForm from '../components/EnquiryForm';
import Footer from '../components/Footer';
import MobileStickyBar from '../components/MobileStickyBar';
import PropertyDetailModal from '../components/PropertyDetailModal';
import {
  Sparkles,
  Building,
  Info,
  Loader2,
  X,
  ShieldCheck,
  Award,
  FileCheck,
  Users,
  CheckCircle2,
  Scale,
} from 'lucide-react';

export default function HomePage() {
  const [settings, setSettings] = useState<any>(null);
  const [properties, setProperties] = useState<PropertyCardData[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [selectedPropertyModal, setSelectedPropertyModal] = useState<PropertyCardData | null>(null);

  // Filters state
  const [search, setSearch] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchSettings();
    fetchProperties();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
      }
    } catch (e) {
      console.error('Failed to load settings:', e);
    }
  };

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/properties');
      if (res.ok) {
        const data = await res.json();
        setProperties(data);
      }
    } catch (e) {
      console.error('Failed to load properties:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectLocation = (locName: string) => {
    setLocationFilter(locName);
    const el = document.getElementById('properties');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleQuickView = (property: PropertyCardData) => {
    setSelectedPropertyModal(property);
  };

  // Filter calculations
  const filteredProperties = properties.filter((p) => {
    if (locationFilter !== 'all' && p.location !== locationFilter) return false;
    if (typeFilter !== 'all' && p.propertyType !== typeFilter) return false;
    if (statusFilter !== 'all' && p.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchLoc = p.location.toLowerCase().includes(q);
      const matchDesc = p.shortDescription.toLowerCase().includes(q);
      if (!matchTitle && !matchLoc && !matchDesc) return false;
    }
    return true;
  });

  const featuredProperties = properties.filter((p) => p.isFeatured && p.status !== 'Draft');

  // Location property counts mapping
  const locationCounts: Record<string, number> = {};
  properties.forEach((p) => {
    if (p.status !== 'Draft') {
      locationCounts[p.location] = (locationCounts[p.location] || 0) + 1;
    }
  });

  const phone = settings?.phone || '9511397967';
  const email = settings?.email || 'khatik.raja93@gmail.com';
  const whatsapp = settings?.whatsapp || '9511397967';

  return (
    <main className="min-h-screen bg-brand-cream text-brand-slate flex flex-col">
      {/* Header Navbar */}
      <Navbar phone={phone} whatsapp={whatsapp} businessName={settings?.businessName || 'Sawriya Seth Properties'} />

      {/* Hero Section */}
      <Hero
        title={settings?.heroTitle}
        subtitle={settings?.heroSubtitle}
        phone={phone}
        whatsapp={whatsapp}
        onSelectLocation={handleSelectLocation}
      />

      {/* Trust & Authority Credentials Section (Why Ronak Khatik is the Best Dealer) */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80">
              <ShieldCheck className="w-6 h-6 text-brand-gold flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-brand-slate">100% Verified Legal Title</h4>
                <p className="text-xs text-brand-slateMuted font-normal mt-0.5">
                  Complete Sub-Registrar & Khasra verification before any deal.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80">
              <Users className="w-6 h-6 text-brand-gold flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-brand-slate">Direct Owner Meetings</h4>
                <p className="text-xs text-brand-slateMuted font-normal mt-0.5">
                  100% transparent negotiations with 0% hidden middleman markup.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80">
              <FileCheck className="w-6 h-6 text-brand-gold flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-brand-slate">Registry & Mutation Support</h4>
                <p className="text-xs text-brand-slateMuted font-normal mt-0.5">
                  Complete paperwork assistance from token to Namantaran.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80">
              <Award className="w-6 h-6 text-brand-gold flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-brand-slate">Regional Market Expertise</h4>
                <p className="text-xs text-brand-slateMuted font-normal mt-0.5">
                  Deep land expertise across Debari, Nathdwara, Dabok, Mavli & Daroli.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Showcase Section */}
      {featuredProperties.length > 0 && (
        <section id="featured" className="py-16 bg-white border-b border-slate-200 bg-grid-pattern-dense">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 border border-amber-200 text-brand-bronze text-xs font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="w-4 h-4 text-brand-gold" />
                  <span>Handpicked Investments</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-slate tracking-tight">
                  Featured Properties
                </h2>
              </div>
              <p className="text-sm text-brand-slateMuted font-normal max-w-md">
                High-demand parcels with immediate registry and strategic growth potential.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProperties.map((property, idx) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  phone={phone}
                  index={idx}
                  onQuickView={handleQuickView}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Property Discovery Section */}
      <section id="properties" className="py-20 bg-brand-cream bg-grid-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-brand-slate text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
              <Building className="w-4 h-4 text-brand-gold" />
              <span>Real-Time Inventory</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-brand-slate tracking-tight mb-4">
              Properties Worth Discovering
            </h2>
            <p className="text-brand-slateMuted font-normal text-base sm:text-lg">
              Explore available plots, land parcels, commercial sites, and residential listings.
            </p>
          </motion.div>

          {/* Property Filter Bar */}
          <PropertyFilter
            search={search}
            setSearch={setSearch}
            location={locationFilter}
            setLocation={setLocationFilter}
            propertyType={typeFilter}
            setPropertyType={setTypeFilter}
            status={statusFilter}
            setStatus={setStatusFilter}
            onReset={() => {
              setSearch('');
              setLocationFilter('all');
              setTypeFilter('all');
              setStatusFilter('all');
            }}
          />

          {/* Properties Grid */}
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center space-y-4">
              <Loader2 className="w-8 h-8 text-brand-gold animate-spin" />
              <p className="text-sm text-brand-slateMuted font-normal">Loading verified properties...</p>
            </div>
          ) : filteredProperties.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white border border-slate-200 space-y-4 max-w-xl mx-auto my-12 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-amber-50 text-brand-gold flex items-center justify-center mx-auto">
                <Info className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-brand-slate">No Matching Properties Found</h3>
              <p className="text-xs text-brand-slateMuted font-normal">
                We couldn&apos;t find properties matching your current filter criteria. Try resetting filters or contact Ronak directly for off-market options.
              </p>
              <button
                onClick={() => {
                  setSearch('');
                  setLocationFilter('all');
                  setTypeFilter('all');
                  setStatusFilter('all');
                }}
                className="px-5 py-2.5 rounded-xl bg-brand-gold text-white text-xs font-bold shadow-gold-glow hover:brightness-110 transition-all"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property, idx) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  phone={phone}
                  index={idx}
                  onQuickView={handleQuickView}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Service Locations Grid */}
      <LocationSection
        propertyCounts={locationCounts}
        onSelectLocation={handleSelectLocation}
      />

      {/* About Ronak Khatik Section */}
      <AboutSection
        ownerName={settings?.ownerName}
        phone={phone}
        email={email}
        heading={settings?.aboutHeading}
        description={settings?.aboutDescription}
        photoUrl={settings?.aboutPhotoUrl || '/uploads/ronak_khatik.jpg'}
      />

      {/* Enquiry & Contact Form Section */}
      <section id="contact" className="py-20 bg-brand-cream relative overflow-hidden border-t border-slate-200 bg-grid-pattern">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-brand-slate tracking-tight mb-4">
              Direct Enquiry & Callback
            </h2>
            <p className="text-brand-slateMuted font-normal text-base">
              Share your requirement below and get personal assistance directly from Ronak Khatik.
            </p>
          </motion.div>

          <EnquiryForm phone={phone} />
        </div>
      </section>

      {/* Footer */}
      <Footer
        phone={phone}
        email={email}
        whatsapp={whatsapp}
        businessName={settings?.businessName}
        onSelectLocation={handleSelectLocation}
      />

      {/* Mobile Sticky Action Bar */}
      <MobileStickyBar
        phone={phone}
        whatsapp={whatsapp}
        onEnquireClick={() => setShowEnquiryModal(true)}
      />

      {/* Quick View Property Detail Modal */}
      {selectedPropertyModal && (
        <PropertyDetailModal
          property={selectedPropertyModal}
          onClose={() => setSelectedPropertyModal(null)}
          phone={phone}
        />
      )}

      {/* Mobile Enquiry Popup Modal */}
      {showEnquiryModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto relative shadow-2xl space-y-4">
            <button
              onClick={() => setShowEnquiryModal(false)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-700 rounded-lg"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-1">
              <h3 className="text-2xl font-serif font-bold text-brand-slate">Quick Property Enquiry</h3>
              <p className="text-xs text-brand-slateMuted font-normal">
                Submit your requirement directly to Ronak Khatik.
              </p>
            </div>

            <EnquiryForm phone={phone} />
          </div>
        </div>
      )}
    </main>
  );
}
