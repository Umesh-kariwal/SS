'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, ShieldCheck, MessageCircle, Phone, Award, CheckCircle2, Building2 } from 'lucide-react';
import { generateWhatsAppLink, formatPhone } from '../lib/utils';

interface HeroProps {
  title?: string;
  subtitle?: string;
  phone?: string;
  whatsapp?: string;
  onSelectLocation?: (loc: string) => void;
}

const LOCATIONS = ['Debari', 'Nathdwara', 'Daroli', 'Navaniya', 'Dabok', 'Mavli'];

export default function Hero({
  title = 'Find the Right Property. Build the Right Future.',
  subtitle = 'Trusted local real estate consulting by Ronak Khatik across Debari, Nathdwara, Daroli, Navaniya, Dabok, and Mavli.',
  phone = '9511397967',
  whatsapp = '9511397967',
  onSelectLocation,
}: HeroProps) {
  const waLink = generateWhatsAppLink(
    whatsapp,
    'Hello Ronak Khatik, I am interested in exploring property options listed under Sawriya Seth Properties (SS Properties).'
  );

  const handleChipClick = (e: React.MouseEvent, loc: string) => {
    e.preventDefault();
    if (onSelectLocation) {
      onSelectLocation(loc);
    }
    const el = document.getElementById('properties');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-gradient-to-b from-amber-500/10 via-brand-cream to-brand-cream border-b border-slate-200/80 bg-grid-pattern">
      {/* Background Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-brand-cream/80 to-brand-cream" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Hero Headlines & CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Brand Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-amber-300 text-brand-bronze text-xs font-extrabold uppercase tracking-wider shadow-sm">
              <Building2 className="w-4 h-4 text-brand-gold" />
              <span>Sawriya Seth Properties (SS Properties)</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-brand-slate tracking-tight leading-[1.12]">
              {title.split('.').map((part, index) => (
                <span key={index} className="block">
                  {index === 1 ? (
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-amber-600 to-brand-bronze">
                      {part.trim()}
                    </span>
                  ) : (
                    part.trim()
                  )}
                </span>
              ))}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-brand-slateMuted font-normal leading-relaxed max-w-2xl">
              {subtitle}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#properties"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-brand-gold via-amber-500 to-brand-bronze hover:brightness-110 shadow-gold-glow flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <span>Explore Properties</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Talk on WhatsApp</span>
              </a>
            </div>

            {/* Service Hubs Chips */}
            <div className="pt-6 border-t border-slate-200">
              <div className="text-xs uppercase tracking-widest text-brand-slateMuted font-bold mb-3 flex items-center justify-center lg:justify-start gap-2">
                <MapPin className="w-4 h-4 text-brand-gold" />
                <span>Primary Locations</span>
              </div>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                {LOCATIONS.map((loc) => (
                  <button
                    key={loc}
                    onClick={(e) => handleChipClick(e, loc)}
                    className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-brand-slate hover:border-brand-gold hover:text-brand-bronze transition-all shadow-sm active:scale-95"
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Ronak Khatik Clean Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden bg-white border-2 border-slate-200 p-3 shadow-2xl space-y-4">
              {/* Photo Container */}
              <div className="relative aspect-[4/4.5] rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src="/uploads/ronak_khatik.jpg"
                  alt="Ronak Khatik - Sawriya Seth Properties"
                  className="w-full h-full object-cover"
                />

                {/* Active Consultation Badge */}
                <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-bold text-slate-800 shadow-md flex items-center gap-2 border border-slate-200">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span>Sawriya Seth Properties</span>
                </div>
              </div>

              {/* Owner Info Bar */}
              <div className="p-2 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-brand-slate">Ronak Khatik</h3>
                    <p className="text-xs text-brand-bronze font-bold">Owner & Lead Consultant (SS Properties)</p>
                  </div>
                  <a
                    href={`tel:${phone}`}
                    className="p-3 rounded-2xl bg-amber-100 text-brand-bronze hover:bg-amber-200 transition-colors shadow-sm"
                    title="Call Ronak"
                  >
                    <Phone className="w-5 h-5" />
                  </a>
                </div>

                {/* Value Metrics Pills */}
                <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-slate-100 text-[11px]">
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/60 font-semibold text-brand-slate">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold mx-auto mb-0.5" />
                    <span>Clear Title</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/60 font-semibold text-brand-slate">
                    <Award className="w-3.5 h-3.5 text-brand-gold mx-auto mb-0.5" />
                    <span>6 Hubs</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/60 font-semibold text-brand-slate">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-gold mx-auto mb-0.5" />
                    <span>Direct Owner</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
