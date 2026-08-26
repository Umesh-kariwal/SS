'use client';

import React, { useState } from 'react';
import { X, Calculator, MessageCircle, Info } from 'lucide-react';
import { generateWhatsAppLink } from '../lib/utils';

interface EmiCalculatorModalProps {
  onClose: () => void;
  whatsapp?: string;
}

export default function EmiCalculatorModal({
  onClose,
  whatsapp = '9511397967',
}: EmiCalculatorModalProps) {
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

  const waText = `Hello Ronak Khatik, I used the EMI & Land Finance Calculator on Sawriya Seth Properties:
- Estimated Property Value: ${formatCurrency(propertyPrice)}
- Down Payment: ${downPaymentPercent}% (${formatCurrency(downPaymentAmount)})
- Required Loan: ${formatCurrency(loanAmount)}
- Calculated Monthly EMI: ₹ ${Math.round(monthlyEmi).toLocaleString('en-IN')} / month (${tenureYears} years @ ${interestRate}%).

Please advise me on available plots and bank loan guidance.`;

  const waLink = generateWhatsAppLink(whatsapp, waText);

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-brand-bronze text-xs font-extrabold uppercase tracking-wider">
            <Calculator className="w-4 h-4 text-brand-gold" />
            <span>On-Demand EMI & Loan Planner</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-brand-slate">
            Property EMI & Investment Calculator
          </h3>
          <p className="text-xs text-brand-slateMuted font-normal">
            Calculate estimated monthly plot EMI, down payment requirement, and interest breakdown.
          </p>
        </div>

        {/* Disclaimer Alert */}
        <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-medium flex items-start gap-2.5">
          <Info className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
          <span>
            Note: Land plot loan rates & eligibility are subject to bank approval. Contact Ronak Khatik for exact registry rules & verified banking support.
          </span>
        </div>

        {/* Calculator Sliders */}
        <div className="space-y-5 p-5 rounded-2xl bg-brand-cream border border-slate-200">
          {/* Property Price Slider */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-brand-slate">
              <label>Estimated Plot / Property Price</label>
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
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-gold"
            />
          </div>

          {/* Down Payment Slider */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-brand-slate">
              <label>Down Payment ({downPaymentPercent}%)</label>
              <span className="text-brand-bronze font-bold text-xs">
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
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-gold"
            />
          </div>

          {/* Interest & Tenure Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5 p-3 rounded-xl bg-white border border-slate-200">
              <div className="flex items-center justify-between text-[11px] font-bold text-brand-slate">
                <span>Interest Rate</span>
                <span className="text-brand-bronze">{interestRate}% p.a.</span>
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

            <div className="space-y-1.5 p-3 rounded-xl bg-white border border-slate-200">
              <div className="flex items-center justify-between text-[11px] font-bold text-brand-slate">
                <span>Tenure</span>
                <span className="text-brand-bronze">{tenureYears} Years</span>
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

        {/* Results Card */}
        <div className="p-5 rounded-2xl bg-brand-slate text-white space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">Estimated Monthly EMI</span>
            <span className="text-2xl font-serif font-bold text-amber-300">
              ₹ {Math.round(monthlyEmi).toLocaleString('en-IN')} / mo
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-medium">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-slate-400 text-[10px]">Required Loan</div>
              <div className="font-bold text-white text-sm">{formatCurrency(loanAmount)}</div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-slate-400 text-[10px]">Total Interest</div>
              <div className="font-bold text-amber-300 text-sm">{formatCurrency(totalInterest)}</div>
            </div>
          </div>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Send EMI Calculation to Ronak on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
