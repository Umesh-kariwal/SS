'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import SecretAdminGesture from './SecretAdminGesture';
import { Phone, MessageCircle, Menu, X, ShieldCheck, Instagram } from 'lucide-react';
import { generateWhatsAppLink } from '@/lib/utils';

interface NavbarProps {
  phone?: string;
  whatsapp?: string;
  businessName?: string;
  instagramUrl?: string;
}

export default function Navbar({
  phone = '9511397967',
  whatsapp = '9511397967',
  businessName = 'Sawriya Seth Properties',
  instagramUrl = 'https://www.instagram.com/ssproperties001?igsi=emJ4emtvenVieXJs',
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const waLink = generateWhatsAppLink(
    whatsapp,
    'Hello Ronak Khatik, I am browsing Sawriya Seth Properties (SS Properties) and would like to inquire about available listings.'
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 py-3 shadow-md'
          : 'bg-gradient-to-b from-white/95 via-white/70 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo with 7-tap Secret Gesture & Owner Avatar */}
        <SecretAdminGesture>
          <div className="flex items-center gap-3 group flex-shrink-0">
            <div className="relative w-11 h-11 rounded-full p-0.5 bg-gradient-to-br from-brand-gold via-amber-400 to-amber-600 shadow-gold-glow overflow-hidden flex-shrink-0">
              <img
                src="/uploads/ronak_khatik.jpg"
                alt="Ronak Khatik - Sawriya Seth Properties"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-bold text-lg tracking-tight text-brand-slate group-hover:text-brand-bronze transition-colors truncate">
                  Sawriya Seth Properties
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-amber-100 text-brand-bronze border border-amber-300 flex-shrink-0">
                  SS
                </span>
              </div>
              <span className="text-[10px] tracking-widest uppercase text-brand-bronze font-extrabold truncate">
                Ronak Khatik • Real Estate
              </span>
            </div>
          </div>
        </SecretAdminGesture>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-bold text-brand-slate whitespace-nowrap">
          <a href="#properties" className="hover:text-brand-bronze transition-colors">
            Properties
          </a>
          <a href="#featured" className="hover:text-brand-bronze transition-colors">
            Featured
          </a>
          <a href="#locations" className="hover:text-brand-bronze transition-colors">
            Service Locations
          </a>
          <a href="#about" className="hover:text-brand-bronze transition-colors">
            About Ronak
          </a>
          <a href="#contact" className="hover:text-brand-bronze transition-colors">
            Contact
          </a>
        </nav>

        {/* Desktop Call, WhatsApp & Instagram Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5 flex-shrink-0">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full text-pink-600 bg-pink-50 border border-pink-200 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 hover:text-white shadow-sm transition-all flex-shrink-0"
            title="Follow Sawriya Seth Properties on Instagram (@ssproperties001)"
          >
            <Instagram className="w-4 h-4" />
          </a>

          <a
            href={`tel:${phone}`}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold text-brand-slate border border-slate-300 hover:border-brand-gold hover:text-brand-bronze bg-white shadow-sm transition-all whitespace-nowrap"
          >
            <Phone className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
            <span>Call +91 {phone}</span>
          </a>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-all whitespace-nowrap flex-shrink-0 min-w-max"
          >
            <MessageCircle className="w-4 h-4 flex-shrink-0" />
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-brand-slate hover:text-brand-bronze p-2.5 rounded-xl bg-slate-100 border border-slate-200 flex-shrink-0"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4 animate-fade-in shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <img
                src="/uploads/ronak_khatik.jpg"
                alt="Ronak Khatik"
                className="w-12 h-12 rounded-full object-cover border-2 border-brand-gold"
              />
              <div>
                <div className="font-serif font-bold text-brand-slate text-base">Sawriya Seth Properties</div>
                <div className="text-xs text-brand-bronze font-bold">Ronak Khatik (SS Properties)</div>
              </div>
            </div>

            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-pink-100 text-pink-600 border border-pink-300"
              title="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>

          <nav className="flex flex-col space-y-4 text-base font-bold text-brand-slate">
            <a
              href="#properties"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-brand-bronze py-1"
            >
              Properties
            </a>
            <a
              href="#featured"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-brand-bronze py-1"
            >
              Featured Listings
            </a>
            <a
              href="#locations"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-brand-bronze py-1"
            >
              Service Locations
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-brand-bronze py-1"
            >
              About Ronak Khatik
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-brand-bronze py-1"
            >
              Contact Us
            </a>
          </nav>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-purple-600 via-rose-500 to-amber-500 shadow-md"
            >
              <Instagram className="w-4 h-4" />
              <span>Follow on Instagram (@ssproperties001)</span>
            </a>

            <a
              href={`tel:${phone}`}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-bold text-brand-slate border border-slate-300 bg-slate-50"
            >
              <Phone className="w-4 h-4 text-brand-gold" />
              <span>Call +91 {phone}</span>
            </a>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-bold text-white bg-emerald-600 shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
