'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import MobileStickyBar from '../../../components/MobileStickyBar';
import EnquiryForm from '../../../components/EnquiryForm';
import {
  MapPin,
  Maximize2,
  Tag,
  ArrowLeft,
  MessageCircle,
  Phone,
  CheckCircle2,
  Video,
  ShieldAlert,
  Loader2,
} from 'lucide-react';
import { generateWhatsAppLink, formatPhone } from '../../../lib/utils';

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [property, setProperty] = useState<any>(null);
  const [settings, setSettings] = useState<any>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProperty();
    fetchSettings();
  }, [slug]);

  const fetchProperty = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/properties/${slug}`);
      if (!res.ok) {
        throw new Error('Property not found');
      }
      const data = await res.json();
      setProperty(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load property details');
    } finally {
      setLoading(false);
    }
  };

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

  const phone = settings?.phone || '9511397967';
  const email = settings?.email || 'khatik.raja93@gmail.com';
  const whatsapp = settings?.whatsapp || '9511397967';

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 text-brand-gold animate-spin" />
        <p className="text-sm text-brand-slateMuted font-normal">Loading property details...</p>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-brand-cream text-brand-slate flex flex-col items-center justify-center p-6 text-center">
        <ShieldAlert className="w-12 h-12 text-amber-500 mb-4" />
        <h1 className="text-2xl font-serif font-bold mb-2">Property Not Found</h1>
        <p className="text-brand-slateMuted text-sm max-w-md mb-6">
          The requested listing may have been moved or removed from our inventory.
        </p>
        <button
          onClick={() => router.push('/#properties')}
          className="px-6 py-3 rounded-xl bg-brand-gold text-white font-bold text-xs flex items-center gap-2 shadow-gold-glow"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to All Properties</span>
        </button>
      </div>
    );
  }

  const images = property.images && property.images.length > 0
    ? property.images
    : [{ imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80', isCover: true }];

  const activeImage = images[activeImageIndex]?.imageUrl || images[0].imageUrl;

  const waText = `Hello Ronak, I am interested in [${property.title}] in [${property.location}] (${property.priceDisplay}). Please share further details.`;
  const waLink = generateWhatsAppLink(whatsapp, waText);

  const isSold = property.status === 'Sold';
  const isReserved = property.status === 'Reserved';

  return (
    <main className="min-h-screen bg-brand-cream text-brand-slate flex flex-col">
      <Navbar phone={phone} whatsapp={whatsapp} businessName={settings?.ownerName} />

      <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 space-y-8">
        {/* Back Button & Breadcrumbs */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-xs font-bold text-brand-slateMuted hover:text-brand-bronze transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Listings</span>
          </button>

          <div className="flex items-center gap-2">
            {property.isFeatured && (
              <span className="px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-gradient-to-r from-brand-gold to-amber-500 text-white shadow-gold-glow">
                Featured Property
              </span>
            )}
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                isSold
                  ? 'bg-red-800 text-white'
                  : isReserved
                  ? 'bg-amber-700 text-white'
                  : 'bg-emerald-700 text-white'
              }`}
            >
              {property.status}
            </span>
          </div>
        </div>

        {/* Title Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-brand-bronze font-bold">
            <MapPin className="w-4 h-4 text-brand-gold" />
            <span>
              {property.location} • {property.address}
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-brand-slate tracking-tight">
            {property.title}
          </h1>
        </div>

        {/* Gallery & Quick Specs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Gallery Column */}
          <div className="lg:col-span-8 space-y-6">
            {/* Main Active Image Container */}
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-luxury">
              <img
                src={activeImage}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6">
                <div className="text-2xl sm:text-4xl font-serif font-bold text-white drop-shadow-md">
                  {property.priceDisplay}
                </div>
              </div>
            </div>

            {/* Thumbnail Row */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
                {images.map((img: any, idx: number) => (
                  <button
                    key={img.id || idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-24 h-16 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                      activeImageIndex === idx
                        ? 'border-brand-gold scale-105 shadow-gold-glow'
                        : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img.imageUrl} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Key Specs Pill Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-3xl bg-white border border-slate-200 shadow-luxury text-center">
              <div>
                <div className="text-[11px] font-bold text-brand-slateMuted uppercase tracking-wider mb-1">
                  Price
                </div>
                <div className="text-lg font-serif font-bold text-brand-bronze">
                  {property.priceDisplay}
                </div>
              </div>

              <div>
                <div className="text-[11px] font-bold text-brand-slateMuted uppercase tracking-wider mb-1">
                  Area Size
                </div>
                <div className="text-lg font-bold text-brand-slate">
                  {property.area} {property.areaUnit}
                </div>
              </div>

              <div>
                <div className="text-[11px] font-bold text-brand-slateMuted uppercase tracking-wider mb-1">
                  Property Type
                </div>
                <div className="text-lg font-bold text-brand-slate">{property.propertyType}</div>
              </div>

              <div>
                <div className="text-[11px] font-bold text-brand-slateMuted uppercase tracking-wider mb-1">
                  Location
                </div>
                <div className="text-lg font-bold text-brand-slate">{property.location}</div>
              </div>
            </div>

            {/* Description Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-luxury space-y-4">
              <h2 className="text-xl font-serif font-bold text-brand-slate">Property Overview & Description</h2>
              <p className="text-brand-slateMuted font-normal leading-relaxed text-sm sm:text-base whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Property Features Checklist */}
            {property.features && property.features.length > 0 && (
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-luxury space-y-4">
                <h2 className="text-xl font-serif font-bold text-brand-slate">Highlights & Features</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {property.features.map((item: any, index: number) => (
                    <div
                      key={item.id || index}
                      className="flex items-center gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-sm font-semibold text-brand-slate"
                    >
                      <CheckCircle2 className="w-4 h-4 text-brand-gold flex-shrink-0" />
                      <span>{item.feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Embedded Video Tour if exists */}
            {property.videoUrl && (
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-luxury space-y-4">
                <div className="flex items-center gap-2 text-xl font-serif font-bold text-brand-slate">
                  <Video className="w-5 h-5 text-brand-gold" />
                  <span>Video Tour / Virtual Walkthrough</span>
                </div>
                <div className="aspect-video rounded-2xl overflow-hidden bg-black border border-slate-200">
                  <iframe
                    src={property.videoUrl.replace('watch?v=', 'embed/')}
                    title="Property Video Tour"
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right Action Sidebar Column */}
          <div className="lg:col-span-4 space-y-6">
            {/* Owner Contact Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-5 sticky top-28 shadow-luxury">
              <div className="border-b border-slate-100 pb-4">
                <div className="text-xs font-bold text-brand-bronze uppercase tracking-wider mb-1">
                  Direct Owner Representative
                </div>
                <h3 className="text-2xl font-serif font-bold text-brand-slate">{settings?.ownerName || 'Ronak Khatik'}</h3>
                <p className="text-xs text-brand-slateMuted font-medium">Real Estate Consultant</p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Inquire via WhatsApp</span>
                </a>

                <a
                  href={`tel:${phone}`}
                  className="w-full py-3.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-brand-slate font-bold text-sm flex items-center justify-center gap-2 transition-all border border-slate-200"
                >
                  <Phone className="w-4 h-4 text-brand-gold" />
                  <span>Call +91 {phone}</span>
                </a>
              </div>

              {/* Property Enquiry Form Component */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-sm font-bold text-brand-slate mb-3">Request Property Site Visit</h4>
                <EnquiryForm propertyId={property.id} propertyTitle={property.title} phone={phone} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer phone={phone} email={email} whatsapp={whatsapp} businessName={settings?.businessName} />
      <MobileStickyBar phone={phone} whatsapp={whatsapp} />
    </main>
  );
}
