'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  MapPin,
  Maximize2,
  Phone,
  MessageCircle,
  Sparkles,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Eye,
  CheckCircle2,
} from 'lucide-react';
import { generateWhatsAppLink, formatPhone } from '../lib/utils';

export interface PropertyImage {
  imageUrl: string;
  isCover?: boolean;
}

export interface PropertyCardData {
  id: string;
  title: string;
  slug: string;
  propertyType: string;
  location: string;
  priceDisplay: string;
  area: number;
  areaUnit: string;
  shortDescription: string;
  description?: string;
  status: string;
  isFeatured?: boolean;
  videoUrl?: string | null;
  images?: PropertyImage[];
  features?: any[];
}

interface PropertyCardProps {
  property: PropertyCardData;
  phone?: string;
  index?: number;
  onQuickView?: (property: PropertyCardData) => void;
}

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';

export default function PropertyCard({
  property,
  phone = '9511397967',
  index = 0,
  onQuickView,
}: PropertyCardProps) {
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const [imgErrorMap, setImgErrorMap] = useState<Record<number, boolean>>({});

  const rawImages =
    property.images && property.images.length > 0
      ? property.images.map((i) => i.imageUrl)
      : [FALLBACK_IMAGE];

  const currentImgUrl = imgErrorMap[currentImgIdx]
    ? FALLBACK_IMAGE
    : rawImages[currentImgIdx] || FALLBACK_IMAGE;

  const waLink = generateWhatsAppLink(
    phone,
    `Hello Ronak Khatik, I am inquiring about "${property.title}" (Location: ${property.location}, Price: ${property.priceDisplay}) on Sawriya Seth Properties.`
  );

  const handlePrevImg = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImgIdx((prev) => (prev === 0 ? rawImages.length - 1 : prev - 1));
  };

  const handleNextImg = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImgIdx((prev) => (prev === rawImages.length - 1 ? 0 : prev + 1));
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    if (onQuickView) {
      e.preventDefault();
      onQuickView(property);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-luxury hover:shadow-2xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1"
    >
      {/* Property Image Container with Carousel */}
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
        <img
          src={currentImgUrl}
          alt={property.title}
          onError={() =>
            setImgErrorMap((prev) => ({ ...prev, [currentImgIdx]: true }))
          }
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none z-10">
          <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-white/90 backdrop-blur-md text-brand-slate shadow-sm border border-slate-200">
            {property.propertyType}
          </span>

          <div className="flex items-center gap-1.5">
            {property.isFeatured && (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-brand-gold text-white shadow-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3 fill-current" />
                <span>Featured</span>
              </span>
            )}

            <span
              className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase shadow-sm ${
                property.status === 'Available'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-amber-600 text-white'
              }`}
            >
              {property.status}
            </span>
          </div>
        </div>

        {/* Image Carousel Navigation Controls */}
        {rawImages.length > 1 && (
          <>
            <button
              onClick={handlePrevImg}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 hover:bg-black/80 transition-all z-20"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={handleNextImg}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 hover:bg-black/80 transition-all z-20"
              aria-label="Next Image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Carousel Dots */}
            <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1.5 pointer-events-none z-10">
              {rawImages.map((_, i) => (
                <span
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    currentImgIdx === i
                      ? 'w-4 bg-white shadow-sm'
                      : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Price Tag Overlay on Image */}
        <div className="absolute bottom-3 left-3.5 text-white font-serif font-bold text-xl sm:text-2xl drop-shadow-md z-10">
          {property.priceDisplay}
        </div>
      </div>

      {/* Property Details Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Location Chip */}
          <div className="flex items-center gap-1 text-xs font-bold text-brand-gold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{property.location}</span>
          </div>

          {/* Title */}
          <Link
            href={`/properties/${property.slug}`}
            onClick={handleViewDetails}
            className="text-lg font-serif font-bold text-brand-slate hover:text-brand-bronze transition-colors line-clamp-1 block"
          >
            {property.title}
          </Link>

          {/* Short Description */}
          <p className="text-xs text-brand-slateMuted font-normal line-clamp-2 leading-relaxed">
            {property.shortDescription}
          </p>
        </div>

        {/* Spec Pills Bar */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-brand-slate font-semibold">
          <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/80">
            <Maximize2 className="w-3.5 h-3.5 text-brand-gold" />
            <span>
              {property.area} {property.areaUnit}
            </span>
          </div>

          {property.features && property.features.length > 0 && (
            <div className="text-[11px] text-brand-slateMuted font-medium">
              {property.features.length} Features
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={handleViewDetails}
            className="w-full py-3 px-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-brand-slate font-bold text-xs flex items-center justify-center gap-1 transition-all border border-slate-200 active:scale-95"
          >
            <span>View Details</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-brand-gold" />
          </button>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1 transition-all shadow-md active:scale-95"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
