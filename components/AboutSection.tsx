'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, CheckCircle, MessageCircle, ShieldCheck, MapPin, Award, Building2 } from 'lucide-react';
import { generateWhatsAppLink, formatPhone } from '@/lib/utils';

interface AboutSectionProps {
  ownerName?: string;
  phone?: string;
  email?: string;
  heading?: string;
  description?: string;
  photoUrl?: string;
}

export default function AboutSection({
  ownerName = 'Ronak Khatik',
  phone = '9511397967',
  email = 'khatik.raja93@gmail.com',
  heading = 'Sawriya Seth Properties — Your Property Partner',
  description = 'Sawriya Seth Properties (SS Properties), led by Ronak Khatik, provides transparent, expert real estate consultancy services specializing in residential plots, commercial land, agricultural parcels, and luxury properties across the Udaipur & Rajsamand region.',
  photoUrl = '/uploads/ronak_khatik.jpg',
}: AboutSectionProps) {
  const waLink = generateWhatsAppLink(
    phone,
    `Hello Ronak, I would like to consult with Sawriya Seth Properties (SS Properties) regarding real estate options.`
  );

  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Photo Column with Ronak's Office Photograph */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden bg-white border-2 border-slate-200 p-3 shadow-2xl space-y-3">
              <div className="relative aspect-[4/4.8] rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src="/uploads/ronak_khatik.jpg"
                  alt={ownerName}
                  className="w-full h-full object-cover"
                />

                {/* Overlaid Badge */}
                <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-xs font-extrabold text-brand-slate shadow-md flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-brand-gold" />
                  <span>Sawriya Seth Properties</span>
                </div>
              </div>

              {/* Owner Title Card */}
              <div className="p-3.5 bg-brand-cream rounded-2xl border border-slate-200/80 flex items-center justify-between">
                <div>
                  <div className="text-xl font-serif font-bold text-brand-slate">{ownerName}</div>
                  <div className="text-xs text-brand-bronze font-extrabold">
                    Owner & Consultant (SS Properties)
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-100 text-brand-bronze font-bold text-xs flex items-center gap-1">
                  <Award className="w-4 h-4 text-brand-gold" />
                  <span>Udaipur Region</span>
                </div>
              </div>
            </div>

            {/* Background Accent glow */}
            <div className="absolute -bottom-6 -right-6 w-36 h-36 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
          </motion.div>

          {/* Text Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-brand-bronze text-xs font-extrabold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-brand-gold" />
              <span>Sawriya Seth Properties (SS Properties)</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-brand-slate tracking-tight leading-tight">
              {heading}
            </h2>

            <p className="text-brand-slateMuted font-normal text-base sm:text-lg leading-relaxed">
              {description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <CheckCircle className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-brand-slate">Transparent Title Verification</div>
                  <div className="text-xs text-brand-slateMuted font-normal">
                    Direct registry & legal verification before every plot transaction.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <CheckCircle className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-brand-slate">Deep Regional Footprint</div>
                  <div className="text-xs text-brand-slateMuted font-normal">
                    Active inventory across Debari, Nathdwara, Daroli, Navaniya, Dabok, Mavli.
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Contact Options Box */}
            <div className="p-6 sm:p-8 rounded-3xl bg-brand-cream border border-slate-200 space-y-5 shadow-sm">
              <div className="text-xs font-extrabold text-brand-bronze uppercase tracking-wider">
                Direct Contact Options
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href={`tel:${phone}`}
                  className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-slate-200 hover:border-brand-gold transition-colors text-brand-slate text-sm shadow-sm"
                >
                  <div className="p-2.5 rounded-xl bg-amber-100 text-brand-bronze">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-brand-slateMuted font-medium">Direct Line</div>
                    <div className="font-bold text-sm">{formatPhone(phone)}</div>
                  </div>
                </a>

                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-slate-200 hover:border-brand-gold transition-colors text-brand-slate text-sm shadow-sm"
                >
                  <div className="p-2.5 rounded-xl bg-amber-100 text-brand-bronze">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[11px] text-brand-slateMuted font-medium">Email Address</div>
                    <div className="font-bold text-xs truncate">{email}</div>
                  </div>
                </a>
              </div>

              <div className="pt-2">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-all text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Connect Directly on WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
