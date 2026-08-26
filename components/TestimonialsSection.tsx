'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, Quote, MapPin } from 'lucide-react';

interface Testimonial {
  name: string;
  location: string;
  role: string;
  comment: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Mahesh Sharma',
    location: 'Debari Bypass',
    role: 'Residential Plot Buyer',
    comment:
      'Ronak Khatik provided 100% genuine guidance for our residential plot near Debari highway. Legal title verification, registry paperwork, and mutation (Namantaran) were completed smoothly with zero hassle.',
    rating: 5,
  },
  {
    name: 'Suresh Choudhary',
    location: 'Nathdwara Road',
    role: 'Commercial Site Investor',
    comment:
      'Finding commercial land near Shrinathji temple zone was difficult until we met Sawriya Seth Properties. Direct meeting with the land owner, transparent pricing, and 0% hidden middleman tricks!',
    rating: 5,
  },
  {
    name: 'Pankaj Vyas',
    location: 'Dabok Airport Belt',
    role: 'Township Plot Owner',
    comment:
      'Ronak is the most honest real estate consultant in Udaipur region. He personally verified Khasra boundaries and helped us secure bank loan approval at reasonable interest rates.',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-brand-cream relative overflow-hidden border-t border-slate-200 bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-brand-bronze text-xs font-extrabold uppercase tracking-wider shadow-sm">
            <ShieldCheck className="w-4 h-4 text-brand-gold" />
            <span>Verified Client Trust</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-brand-slate tracking-tight">
            What Our Buyers Say
          </h2>

          <p className="text-brand-slateMuted text-base sm:text-lg font-normal">
            Real stories from satisfied plot buyers and investors across Debari, Nathdwara, Dabok & Udaipur region.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-luxury flex flex-col justify-between space-y-6 relative"
            >
              <Quote className="w-8 h-8 text-amber-300/40 absolute top-6 right-6" />

              <div className="space-y-4">
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-brand-slateMuted font-normal text-sm sm:text-base leading-relaxed italic">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-serif font-bold text-brand-slate text-base">{t.name}</div>
                  <div className="text-xs text-brand-bronze font-bold">{t.role}</div>
                </div>

                <div className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-brand-gold" />
                  <span>{t.location}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
