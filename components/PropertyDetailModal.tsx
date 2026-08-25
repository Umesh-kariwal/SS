'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  MapPin,
  Building2,
  CheckCircle2,
  Phone,
  MessageCircle,
  Share2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Video,
} from 'lucide-react';
import { PropertyCardData } from './PropertyCard';
import { generateWhatsAppLink, formatPhone } from '@/lib/utils';
import EnquiryForm from './EnquiryForm';

interface PropertyDetailModalProps {
  property: PropertyCardData | null;
  onClose: () => void;
  phone?: string;
}

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';

export default function PropertyDetailModal({
  property,
  onClose,
  phone = '9511397967',
}: PropertyDetailModalProps) {
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [imgErrorMap, setImgErrorMap] = useState<Record<number, boolean>>({});

  if (!property) return null;

  const rawImages =
    property.images && property.images.length > 0
      ? property.images.map((i) => i.imageUrl)
      : [FALLBACK_IMAGE];

  const currentImgUrl = imgErrorMap[activeImgIndex]
    ? FALLBACK_IMAGE
    : rawImages[activeImgIndex] || FALLBACK_IMAGE;

  const waLink = generateWhatsAppLink(
    phone,
    `Hello Ronak Khatik, I am inquiring about "${property.title}" (Location: ${property.location}, Price: ${property.priceDisplay}) on Sawriya Seth Properties.`
  );

  const handlePrevImg = () => {
    setActiveImgIndex((prev) => (prev === 0 ? rawImages.length - 1 : prev - 1));
  };

  const handleNextImg = () => {
    setActiveImgIndex((prev) => (prev === rawImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fade-in overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className="bg-white border border-slate-200 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl relative my-auto"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50 flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-brand-bronze text-xs font-bold uppercase tracking-wider flex-shrink-0">
              {property.propertyType}
            </div>
            <h2 className="text-base sm:text-lg font-serif font-bold text-brand-slate truncate">
              {property.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors flex-shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Main Photo Gallery Player */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-slate-900 shadow-md group">
            <img
              src={currentImgUrl}
              alt={property.title}
              onError={() =>
                setImgErrorMap((prev) => ({ ...prev, [activeImgIndex]: true }))
              }
              className="w-full h-full object-cover transition-all duration-300"
            />

            {/* Price Highlight Tag */}
            <div className="absolute top-4 left-4 px-4 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 text-brand-slate font-serif font-bold text-lg sm:text-xl shadow-lg">
              {property.priceDisplay}
            </div>

            {/* Location Pill */}
            <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1.5 border border-white/20">
              <MapPin className="w-3.5 h-3.5 text-brand-gold" />
              <span>{property.location}</span>
            </div>

            {/* Gallery Navigation Arrows */}
            {rawImages.length > 1 && (
              <>
                <button
                  onClick={handlePrevImg}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/90 transition-all opacity-80 group-hover:opacity-100"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextImg}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/90 transition-all opacity-80 group-hover:opacity-100"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Gallery Thumbnails Strip */}
          {rawImages.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {rawImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImgIndex(idx)}
                  className={`relative w-20 h-14 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                    activeImgIndex === idx
                      ? 'border-brand-gold ring-2 ring-amber-400 scale-105'
                      : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={imgErrorMap[idx] ? FALLBACK_IMAGE : img}
                    alt="thumbnail"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Property Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-brand-cream border border-slate-200">
            <div>
              <div className="text-[11px] text-brand-slateMuted font-bold uppercase tracking-wider">
                Plot / Parcel Size
              </div>
              <div className="text-base font-bold text-brand-slate mt-0.5">
                {property.area} {property.areaUnit}
              </div>
            </div>

            <div>
              <div className="text-[11px] text-brand-slateMuted font-bold uppercase tracking-wider">
                Category
              </div>
              <div className="text-base font-bold text-brand-slate mt-0.5">
                {property.propertyType}
              </div>
            </div>

            <div>
              <div className="text-[11px] text-brand-slateMuted font-bold uppercase tracking-wider">
                Primary Location
              </div>
              <div className="text-base font-bold text-brand-slate mt-0.5">
                {property.location}
              </div>
            </div>

            <div>
              <div className="text-[11px] text-brand-slateMuted font-bold uppercase tracking-wider">
                Listing Status
              </div>
              <div className="text-base font-bold text-emerald-700 mt-0.5">
                {property.status}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-base font-serif font-bold text-brand-slate">
              Property Description & Overview
            </h3>
            <p className="text-xs sm:text-sm text-brand-slateMuted font-normal leading-relaxed whitespace-pre-line">
              {property.description || property.shortDescription}
            </p>
          </div>

          {/* Features List */}
          {property.features && property.features.length > 0 && (
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <h3 className="text-base font-serif font-bold text-brand-slate">
                Key Features & Amenities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {property.features.map((feat: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-brand-slate"
                  >
                    <CheckCircle2 className="w-4 h-4 text-brand-gold flex-shrink-0" />
                    <span>{typeof feat === 'string' ? feat : feat.feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* YouTube Video Tour if available */}
          {property.videoUrl && (
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="text-xs font-bold text-brand-slate uppercase tracking-wider flex items-center gap-1.5">
                <Video className="w-4 h-4 text-brand-gold" />
                <span>Video Walkthrough</span>
              </div>
              <a
                href={property.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-brand-slate border border-slate-300"
              >
                <ExternalLink className="w-4 h-4 text-brand-gold" />
                <span>Watch Video Tour on YouTube</span>
              </a>
            </div>
          )}

          {/* Direct Lead Form inside Modal */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <h3 className="text-base font-serif font-bold text-brand-slate">
              Inquire Directly with Ronak Khatik
            </h3>
            <EnquiryForm phone={phone} defaultRequirement={property.title} />
          </div>
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-2 text-xs text-brand-slate font-bold">
            <ShieldCheck className="w-4 h-4 text-brand-gold" />
            <span>Sawriya Seth Properties Verification Guaranteed</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={`tel:${phone}`}
              className="flex-1 sm:flex-initial px-5 py-3 rounded-2xl bg-white border border-slate-300 hover:border-brand-gold text-brand-slate text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
            >
              <Phone className="w-4 h-4 text-brand-gold" />
              <span>Call +91 {phone}</span>
            </a>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Inquiry</span>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
