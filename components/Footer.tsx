'use client';

import React from 'react';
import SecretAdminGesture from './SecretAdminGesture';
import { Phone, Mail, MapPin, MessageCircle, ChevronRight, Building2, Instagram } from 'lucide-react';
import { generateWhatsAppLink, formatPhone } from '../lib/utils';

interface FooterProps {
  phone?: string;
  email?: string;
  whatsapp?: string;
  businessName?: string;
  instagramUrl?: string;
  onSelectLocation?: (locationName: string) => void;
}

export default function Footer({
  phone = '9511397967',
  email = 'khatik.raja93@gmail.com',
  whatsapp = '9511397967',
  businessName = 'Sawriya Seth Properties (SS Properties)',
  instagramUrl = 'https://www.instagram.com/ssproperties001?igsi=emJ4emtvenVieXJs',
  onSelectLocation,
}: FooterProps) {
  const waLink = generateWhatsAppLink(
    whatsapp,
    'Hello Ronak Khatik, I would like to get in touch regarding real estate services from Sawriya Seth Properties.'
  );

  const handleLocationClick = (e: React.MouseEvent, loc: string) => {
    e.preventDefault();
    if (onSelectLocation) {
      onSelectLocation(loc);
    }
    const el = document.getElementById('properties');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-brand-slate text-slate-300 border-t border-slate-800 pt-16 pb-24 md:pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="space-y-4">
            <SecretAdminGesture>
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-full p-0.5 bg-gradient-to-br from-brand-gold via-amber-400 to-amber-600 shadow-gold-glow overflow-hidden flex-shrink-0">
                  <img
                    src="/uploads/ronak_khatik.jpg"
                    alt="Ronak Khatik - Sawriya Seth Properties"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif font-bold text-white text-lg leading-snug">
                    Sawriya Seth Properties
                  </span>
                  <span className="text-[10px] tracking-widest uppercase text-brand-gold font-bold">
                    SS Properties • Ronak Khatik
                  </span>
                </div>
              </div>
            </SecretAdminGesture>
            <p className="text-xs font-light text-slate-400 leading-relaxed">
              Sawriya Seth Properties (SS Properties) — Premium local real estate consultancy led by Ronak Khatik, specializing in land sales, residential plots, commercial investments, and farmhouses across Debari, Nathdwara, Daroli, Navaniya, Dabok, and Mavli.
            </p>

            <div className="pt-1">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-rose-500 to-amber-500 text-white font-bold text-xs shadow-md hover:brightness-110 transition-all"
              >
                <Instagram className="w-4 h-4" />
                <span>Follow @ssproperties001</span>
              </a>
            </div>
          </div>

          {/* Service Areas Links */}
          <div>
            <h4 className="text-xs font-extrabold text-white uppercase tracking-widest mb-4">
              Service Locations
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              {['Debari', 'Nathdwara', 'Daroli', 'Navaniya', 'Dabok', 'Mavli'].map((loc) => (
                <li key={loc}>
                  <button
                    onClick={(e) => handleLocationClick(e, loc)}
                    className="hover:text-brand-gold transition-colors flex items-center gap-1.5 text-left text-slate-300 hover:translate-x-1 transform duration-200"
                  >
                    <ChevronRight className="w-3 h-3 text-brand-gold" />
                    <span>Properties in {loc}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className="text-xs font-extrabold text-white uppercase tracking-widest mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <button
                  onClick={(e) => handleNavClick(e, 'properties')}
                  className="hover:text-brand-gold transition-colors flex items-center gap-1.5 text-slate-300 hover:translate-x-1 transform duration-200"
                >
                  <ChevronRight className="w-3 h-3 text-brand-gold" />
                  <span>All Properties</span>
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleNavClick(e, 'featured')}
                  className="hover:text-brand-gold transition-colors flex items-center gap-1.5 text-slate-300 hover:translate-x-1 transform duration-200"
                >
                  <ChevronRight className="w-3 h-3 text-brand-gold" />
                  <span>Featured Listings</span>
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleNavClick(e, 'locations')}
                  className="hover:text-brand-gold transition-colors flex items-center gap-1.5 text-slate-300 hover:translate-x-1 transform duration-200"
                >
                  <ChevronRight className="w-3 h-3 text-brand-gold" />
                  <span>Service Areas</span>
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleNavClick(e, 'about')}
                  className="hover:text-brand-gold transition-colors flex items-center gap-1.5 text-slate-300 hover:translate-x-1 transform duration-200"
                >
                  <ChevronRight className="w-3 h-3 text-brand-gold" />
                  <span>About Ronak Khatik</span>
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleNavClick(e, 'contact')}
                  className="hover:text-brand-gold transition-colors flex items-center gap-1.5 text-slate-300 hover:translate-x-1 transform duration-200"
                >
                  <ChevronRight className="w-3 h-3 text-brand-gold" />
                  <span>Direct Contact Form</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-extrabold text-white uppercase tracking-widest mb-4">
              Direct Contact & Socials
            </h4>
            <div className="space-y-3.5 text-xs">
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-brand-gold transition-colors text-slate-200"
              >
                <Phone className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <span className="font-bold">+91 {phone}</span>
              </a>

              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-brand-gold transition-colors text-slate-200"
              >
                <Mail className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <span className="truncate font-semibold">{email}</span>
              </a>

              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: +91 {whatsapp}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar with 7-tap Secret Gesture on Copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light text-slate-500">
          <SecretAdminGesture>
            <p className="hover:text-slate-300 transition-colors">
              © {new Date().getFullYear()} {businessName}. All rights reserved.
            </p>
          </SecretAdminGesture>

          <div className="flex items-center gap-4 text-slate-500">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-gold transition-colors flex items-center gap-1 font-semibold"
            >
              <Instagram className="w-3.5 h-3.5 text-pink-500" />
              <span>Instagram Page</span>
            </a>
            <span>•</span>
            <SecretAdminGesture>
              <span className="hover:text-brand-gold cursor-pointer transition-colors font-medium">
                Owner Control System
              </span>
            </SecretAdminGesture>
          </div>
        </div>
      </div>
    </footer>
  );
}
