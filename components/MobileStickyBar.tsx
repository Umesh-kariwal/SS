'use client';

import React from 'react';
import { Phone, MessageCircle, FileText } from 'lucide-react';
import { generateWhatsAppLink } from '../lib/utils';

interface MobileStickyBarProps {
  phone?: string;
  whatsapp?: string;
  onEnquireClick?: () => void;
}

export default function MobileStickyBar({
  phone = '9511397967',
  whatsapp = '9511397967',
  onEnquireClick,
}: MobileStickyBarProps) {
  const waLink = generateWhatsAppLink(
    whatsapp,
    'Hello Ronak, I am browsing your real estate website and would like to talk to you.'
  );

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 border-t border-slate-200 backdrop-blur-lg p-2.5 shadow-2xl pb-safe">
      <div className="grid grid-cols-3 gap-2">
        {/* Call CTA */}
        <a
          href={`tel:${phone}`}
          className="flex flex-col items-center justify-center py-2.5 px-1 rounded-xl bg-slate-100 text-brand-slate hover:bg-slate-200 transition-all text-[11px] font-bold gap-1 border border-slate-200 active:scale-95 shadow-sm"
        >
          <Phone className="w-4 h-4 text-brand-gold" />
          <span>Call Now</span>
        </a>

        {/* WhatsApp CTA */}
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2.5 px-1 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-all text-[11px] font-bold gap-1 active:scale-95 shadow-md"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp</span>
        </a>

        {/* Enquire CTA */}
        <button
          onClick={onEnquireClick}
          className="flex flex-col items-center justify-center py-2.5 px-1 rounded-xl bg-gradient-to-r from-brand-gold via-amber-500 to-brand-bronze text-white hover:brightness-110 transition-all text-[11px] font-bold gap-1 active:scale-95 shadow-gold-glow"
        >
          <FileText className="w-4 h-4" />
          <span>Enquire</span>
        </button>
      </div>
    </div>
  );
}
