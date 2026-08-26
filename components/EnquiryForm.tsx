'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, Phone, Mail, User, MapPin, Tag, MessageCircle, Loader2 } from 'lucide-react';
import { generateWhatsAppLink } from '../lib/utils';

interface EnquiryFormProps {
  phone?: string;
  defaultRequirement?: string;
  propertyId?: string;
  propertyTitle?: string;
}

const LOCATIONS = ['Debari', 'Nathdwara', 'Daroli', 'Navaniya', 'Dabok', 'Mavli'];
const REQUIREMENTS = ['Plot', 'Commercial Land', 'Agricultural Parcel', 'Farmhouse', 'Villa / House'];

export default function EnquiryForm({
  phone = '9511397967',
  defaultRequirement,
  propertyId,
  propertyTitle,
}: EnquiryFormProps) {
  const initialReq = propertyTitle || defaultRequirement || 'Plot';

  const [name, setName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [email, setEmail] = useState('');
  const [requirement, setRequirement] = useState(initialReq);
  const [preferredLocation, setPreferredLocation] = useState('Debari');
  const [budget, setBudget] = useState('₹ 25 - 50 Lakhs');
  const [message, setMessage] = useState(propertyTitle ? `Inquiry regarding property: ${propertyTitle}` : '');

  useEffect(() => {
    if (propertyTitle) {
      setRequirement(propertyTitle);
      setMessage(`Inquiry regarding property: ${propertyTitle}`);
    } else if (defaultRequirement) {
      setRequirement(defaultRequirement);
    }
  }, [propertyTitle, defaultRequirement]);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone: userPhone,
          email,
          requirement,
          preferredLocation,
          budget,
          message,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit enquiry');
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Submission failed. Please try again or WhatsApp directly.');
    } finally {
      setLoading(false);
    }
  };

  const waLink = generateWhatsAppLink(
    phone,
    `Hello Ronak Khatik, my name is ${name || 'Customer'}. I am looking for ${requirement} in ${preferredLocation} (Budget: ${budget}). Message: ${message}`
  );

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 sm:p-12 rounded-3xl bg-white border-2 border-emerald-200 shadow-xl text-center space-y-6 max-w-2xl mx-auto"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-serif font-bold text-brand-slate">Enquiry Submitted Successfully!</h3>
          <p className="text-sm text-brand-slateMuted font-normal">
            Thank you, <span className="font-bold text-brand-slate">{name}</span>. Ronak Khatik from Sawriya Seth Properties has received your request and will call you shortly.
          </p>
        </div>

        <div className="pt-2">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Connect Immediately on WhatsApp</span>
          </a>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-brand-slate uppercase tracking-wider mb-1">
              Your Full Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                placeholder="e.g. Vikram Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-brand-slate placeholder-slate-400 focus:outline-none focus:border-brand-gold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-slate uppercase tracking-wider mb-1">
              Phone Number *
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="tel"
                required
                placeholder="e.g. 98290XXXXX"
                value={userPhone}
                onChange={(e) => setUserPhone(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-brand-slate placeholder-slate-400 focus:outline-none focus:border-brand-gold"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-brand-slate uppercase tracking-wider mb-1">
              Property Type / Title
            </label>
            <input
              type="text"
              value={requirement}
              onChange={(e) => setRequirement(e.target.value)}
              className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-brand-slate focus:outline-none focus:border-brand-gold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-slate uppercase tracking-wider mb-1">
              Preferred Location
            </label>
            <select
              value={preferredLocation}
              onChange={(e) => setPreferredLocation(e.target.value)}
              className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-brand-slate focus:outline-none focus:border-brand-gold"
            >
              {LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-slate uppercase tracking-wider mb-1">
              Approx. Budget
            </label>
            <input
              type="text"
              placeholder="e.g. ₹ 30 - 50 Lakhs"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-brand-slate placeholder-slate-400 focus:outline-none focus:border-brand-gold"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-brand-slate uppercase tracking-wider mb-1">
            Requirement Details / Questions
          </label>
          <textarea
            rows={3}
            required
            placeholder="Tell us what size, frontage, or highway access you are looking for..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-brand-slate placeholder-slate-400 focus:outline-none focus:border-brand-gold"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-1/2 py-4 px-6 rounded-2xl bg-gradient-to-r from-brand-gold via-amber-500 to-brand-bronze text-white font-bold text-sm flex items-center justify-center gap-2 shadow-gold-glow hover:brightness-110 transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Direct Requirement</span>
              </>
            )}
          </button>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-1/2 py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat Directly on WhatsApp</span>
          </a>
        </div>
      </form>
    </div>
  );
}
