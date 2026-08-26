'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, MessageCircle, ArrowRight, ShieldCheck, Percent, Calendar, DollarSign } from 'lucide-react';
import { generateWhatsAppLink } from '../lib/utils';

interface EmiCalculatorProps {
  whatsapp?: string;
}

export default function EmiCalculator({ whatsapp = '9511397967' }: EmiCalculatorProps) {
  const [propertyPrice, setPropertyPrice] = useState<number>(3500000); // 35 Lakhs default
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20); // 20% down payment
  const [interestRate, setInterestRate] = useState<number>(8.5); // 8.5% default loan rate
  const [tenureYears, setTenureYears] = useState<number>(15); // 15 years loan tenure

  // EMI Calculations
  const downPaymentAmount = (propertyPrice * downPaymentPercent) / 100;
  const loanAmount = propertyPrice - downPaymentAmount;

  const monthlyInterestRate = interestRate / 12 / 100;
  const totalMonths = tenureYears * 12;

  let monthlyEmi = 0;
  if (monthlyInterestRate > 0 && totalMonths > 0) {
    monthlyEmi =
      (loanAmount *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, totalMonths)) /
      (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);
  }

  const totalPayable = monthlyEmi * totalMonths;
  const totalInterest = totalPayable - loanAmount;

  const formatCurrency = (val: number) => {
    if (val >= 10000000) {
      return `₹ ${(val / 10000000).toFixed(2)} Cr`;
    } else if (val >= 100000) {
      return `₹ ${(val / 100000).toFixed(2)} Lakhs`;
    } else {
      return `₹ ${Math.round(val).toLocaleString('en-IN')}`;
    }
  };

  const waText = `Hello Ronak Khatik, I used the EMI & Land Finance Calculator on Sawriya Seth Properties website:
- Property Value: ${formatCurrency(propertyPrice)}
- Down Payment: ${downPaymentPercent}% (${formatCurrency(downPaymentAmount)})
- Required Loan: ${formatCurrency(loanAmount)}
- Calculated Monthly EMI: ₹ ${Math.round(monthlyEmi).toLocaleString('en-IN')} / month (${tenureYears} years @ ${interestRate}%).

Please advise me on plot availability and loan guidance.`;

  const waLink = generateWhatsAppLink(whatsapp, waText);

  return (
    <section id="calculator" className="py-20 bg-white relative overflow-hidden border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-brand-bronze text-xs font-extrabold uppercase tracking-wider shadow-sm">
            <Calculator className="w-4 h-4 text-brand-gold" />
            <span>Land Finance & EMI Planner</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-brand-slate tracking-tight">
            Property EMI & Investment Calculator
          </h2>

          <p className="text-brand-slateMuted text-base sm:text-lg font-normal">
            Calculate your monthly plot EMI, down payment requirement, and interest breakdown in seconds.
          </p>
        </motion.div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Controls Box */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-brand-cream border border-slate-200 space-y-6 shadow-sm">
            {/* Property Price Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm font-bold text-brand-slate">
                <label>Estimated Property / Plot Price</label>
                <span className="text-brand-bronze font-serif font-extrabold text-base">
                  {formatCurrency(propertyPrice)}
                </span>
              </div>
              <input
                type="range"
                min={500000}
                max={20000000}
                step={100000}
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-gold"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                <span>₹ 5 Lakhs</span>
                <span>₹ 1 Crore</span>
                <span>₹ 2 Crores</span>
              </div>
            </div>

            {/* Down Payment Percent Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm font-bold text-brand-slate">
                <label>Down Payment ({downPaymentPercent}%)</label>
                <span className="text-brand-bronze font-bold text-sm">
                  {formatCurrency(downPaymentAmount)}
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={50}
                step={5}
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-gold"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                <span>10%</span>
                <span>25%</span>
                <span>50%</span>
              </div>
            </div>

            {/* Interest Rate & Tenure Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Interest Rate */}
              <div className="space-y-2 p-4 rounded-2xl bg-white border border-slate-200">
                <div className="flex items-center justify-between text-xs font-bold text-brand-slate">
                  <span>Interest Rate</span>
                  <span className="text-brand-bronze font-bold">{interestRate}% p.a.</span>
                </div>
                <input
                  type="range"
                  min={6.5}
                  max={14}
                  step={0.25}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-gold"
                />
              </div>

              {/* Loan Tenure */}
              <div className="space-y-2 p-4 rounded-2xl bg-white border border-slate-200">
                <div className="flex items-center justify-between text-xs font-bold text-brand-slate">
                  <span>Loan Tenure</span>
                  <span className="text-brand-bronze font-bold">{tenureYears} Years</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={30}
                  step={1}
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-gold"
                />
              </div>
            </div>
          </div>

          {/* Right Results & Lead Box */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-brand-slate text-white space-y-6 shadow-2xl relative overflow-hidden">
            <div className="border-b border-slate-800 pb-4 space-y-1">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                Calculated Monthly Breakdown
              </div>
              <div className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                ₹ {Math.round(monthlyEmi).toLocaleString('en-IN')}{' '}
                <span className="text-xs font-normal text-slate-400">/ month</span>
              </div>
            </div>

            {/* Financial Summary Breakdown */}
            <div className="space-y-3 text-xs font-medium">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400">Loan Amount Required</span>
                <span className="font-bold text-white text-sm">{formatCurrency(loanAmount)}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400">Down Payment ({downPaymentPercent}%)</span>
                <span className="font-bold text-amber-300 text-sm">{formatCurrency(downPaymentAmount)}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400">Total Interest Payable</span>
                <span className="font-bold text-white text-sm">{formatCurrency(totalInterest)}</span>
              </div>
            </div>

            {/* 1-Click WhatsApp Lead Button */}
            <div className="pt-2">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Send Calculation to Ronak on WhatsApp</span>
              </a>
              <p className="text-[11px] text-slate-400 text-center mt-2">
                Ronak Khatik will assist you with plot options matching your exact EMI budget.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
