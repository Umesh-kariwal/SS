'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';

interface LocationItem {
  name: string;
  image: string;
  description: string;
}

const LOCATION_DETAILS: LocationItem[] = [
  {
    name: 'Debari',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    description: 'Rapidly expanding highway corridor near Debari bypass with prime residential & commercial plots.',
  },
  {
    name: 'Nathdwara',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80',
    description: 'High-value pilgrimage & tourism hub around Shrinathji temple with lucrative commercial parcels.',
  },
  {
    name: 'Daroli',
    image: 'https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=800&q=80',
    description: 'Fertile agricultural land, stone mining belts, and tranquil farmhouse parcels.',
  },
  {
    name: 'Navaniya',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    description: 'Emerging residential township area offering high capital growth potential for plot buyers.',
  },
  {
    name: 'Dabok',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
    description: 'Maharana Pratap Airport vicinity with gated residential societies and premium connectivity.',
  },
  {
    name: 'Mavli',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    description: 'Key railway junction corridor with logistics, commercial warehouse, and industrial land.',
  },
];

interface LocationSectionProps {
  propertyCounts?: Record<string, number>;
  onSelectLocation?: (locationName: string) => void;
}

export default function LocationSection({
  propertyCounts = {},
  onSelectLocation,
}: LocationSectionProps) {
  return (
    <section id="locations" className="py-20 bg-brand-cream relative overflow-hidden border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-brand-bronze text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <MapPin className="w-4 h-4 text-brand-gold" />
            <span>Service Footprint</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-brand-slate tracking-tight mb-4">
            Primary Service Locations
          </h2>
          <p className="text-brand-slateMuted font-normal text-base sm:text-lg">
            Specialized local expertise across six strategic hubs around Udaipur and Rajsamand.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {LOCATION_DETAILS.map((loc, index) => {
            const count = propertyCounts[loc.name] || 0;

            return (
              <motion.div
                key={loc.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => onSelectLocation && onSelectLocation(loc.name)}
                className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200 hover:border-brand-gold cursor-pointer shadow-luxury hover:shadow-luxury-hover transition-all duration-300 flex flex-col justify-end min-h-[300px]"
              >
                {/* Background image */}
                <img
                  src={loc.image}
                  alt={loc.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-75"
                />

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />

                {/* Content */}
                <div className="relative z-10 p-6 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-serif font-bold text-white group-hover:text-brand-gold transition-colors">
                      {loc.name}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/20 border border-white/30 text-xs font-bold text-white backdrop-blur-md">
                      {count} {count === 1 ? 'Property' : 'Properties'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-200 font-normal line-clamp-2 leading-relaxed">
                    {loc.description}
                  </p>

                  <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-brand-gold group-hover:translate-x-1 transition-transform">
                    <span>Explore Listings in {loc.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
