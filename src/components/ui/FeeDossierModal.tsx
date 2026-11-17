import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Printer, X } from 'lucide-react';
import { BranchData } from '../../data/amritaChennaiData';

interface FeeDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  branch: BranchData;
  rank?: number;
  jeePercentile?: number;
  examType: 'AEEE' | 'JEE';
  slab: string;
  annualTuition: number;
  includeHostel: boolean;
  annualHostel: number;
  cautionDeposit: number;
}

export const FeeDossierModal: React.FC<FeeDossierModalProps> = ({
  isOpen,
  onClose,
  branch,
  rank,
  jeePercentile,
  examType,
  slab,
  annualTuition,
  includeHostel,
  annualHostel,
  cautionDeposit,
}) => {
  if (!isOpen) return null;

  const fourYearTuition = annualTuition * 4;
  const fourYearHostel = annualHostel * 4;
  const grandTotal = fourYearTuition + fourYearHostel + cautionDeposit;

  const referenceId = `AVV-CHN-2026-${Math.abs(
    (branch.code.charCodeAt(0) * 1000 + (rank || 5000)) % 89999 + 10000
  )}`;

  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/50 backdrop-blur-sm overflow-y-auto print:p-0 print:bg-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="w-full max-w-2xl rounded-2xl border border-tuscan-hairline bg-parchment p-6 sm:p-8 shadow-paper-lg print:shadow-none print:border-none print:m-0"
        >
          {/* Action Bar (Hidden in Print) */}
          <div className="flex items-center justify-between border-b border-tuscan-hairline pb-4 mb-6 print:hidden">
            <div className="flex items-center gap-2.5">
              <Printer className="h-4 w-4 text-tuscan-rust" />
              <span className="font-heading text-sm font-semibold text-ink-charcoal">
                Official Admissions Fee Estimate & Scholarship Slip
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 rounded-xl bg-tuscan-rust px-4 py-2 text-xs font-semibold text-white hover:bg-tuscan-rust/90 transition-colors"
              >
                <Printer className="h-3.5 w-3.5" />
                <span>Print / Save as PDF</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-1.5 text-ink-muted hover:bg-surface hover:text-ink-charcoal transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Printable Document Body */}
          <div className="border border-tuscan-hairline p-6 rounded-xl bg-surface/30 print:border-2 print:border-black print:bg-white">
            {/* University Letterhead */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b-2 border-tuscan-rust pb-4 mb-5 gap-3">
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-tuscan-rust text-white font-heading font-bold text-2xl shadow-sm">
                  A
                </div>
                <div>
                  <h1 className="font-heading text-base sm:text-lg font-bold text-tuscan-rust tracking-tight">
                    AMRITA VISHWA VIDYAPEETHAM
                  </h1>
                  <p className="text-xs font-bold text-ink-charcoal">
                    CHENNAI CAMPUS (VENGAL, TIRUVALLUR)
                  </p>
                  <p className="text-xs text-ink-slate">
                    Deemed-to-be University • NAAC A++ Grade • NIRF Top 7 in India
                  </p>
                </div>
              </div>

              <div className="text-right font-mono text-xs text-ink-slate">
                <div>Ref: <strong className="text-ink-charcoal">{referenceId}</strong></div>
                <div>Date: {currentDate}</div>
                <div className="text-tuscan-rust font-semibold">Provisional Estimate</div>
              </div>
            </div>

            {/* Candidate & Discipline Assessment Details */}
            <div className="grid grid-cols-2 gap-3.5 text-xs mb-5 p-4 rounded-xl bg-surface border border-tuscan-hairline">
              <div>
                <span className="text-xs uppercase font-mono text-ink-muted block">Program</span>
                <span className="font-heading font-semibold text-sm text-ink-charcoal block mt-0.5">{branch.name} ({branch.code})</span>
                <span className="text-xs text-ink-slate">{branch.department}</span>
              </div>
              <div>
                <span className="text-xs uppercase font-mono text-ink-muted block">Assessment Score</span>
                <span className="font-mono font-bold text-tuscan-rust text-sm block mt-0.5">
                  {examType === 'AEEE' ? `AEEE AIR #${rank?.toLocaleString('en-IN')}` : `JEE Main ${jeePercentile}%ile`}
                </span>
                <span className="text-xs text-ink-slate block">Academic Batch 2026–2030</span>
              </div>
              <div>
                <span className="text-xs uppercase font-mono text-ink-muted block">Allotted Merit Category</span>
                <span className="font-heading font-semibold text-tuscan-rust text-base block mt-0.5">
                  {slab}
                </span>
              </div>
              <div>
                <span className="text-xs uppercase font-mono text-ink-muted block">Accommodation Choice</span>
                <span className="font-medium text-ink-charcoal block mt-0.5">
                  {includeHostel ? 'Hostel & Annapoorna Satvik Mess' : 'Day Scholar'}
                </span>
              </div>
            </div>

            {/* Itemized Financial Table */}
            <div className="mb-5 overflow-hidden rounded-xl border border-tuscan-hairline">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface border-b border-tuscan-hairline font-mono text-xs uppercase text-ink-charcoal">
                  <tr>
                    <th className="p-3">Fee Particulars</th>
                    <th className="p-3 text-right">Annual Amount</th>
                    <th className="p-3 text-right">4-Year Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-tuscan-hairline font-mono text-xs">
                  <tr>
                    <td className="p-3">
                      <strong className="text-ink-charcoal font-sans text-sm font-semibold">Tuition Fee ({slab})</strong>
                      <span className="text-xs text-ink-slate block font-sans mt-0.5">
                        Academic instruction, laboratory sessions & library access
                      </span>
                    </td>
                    <td className="p-3 text-right font-bold text-ink-charcoal">
                      ₹{annualTuition.toLocaleString('en-IN')}
                    </td>
                    <td className="p-3 text-right font-bold text-ink-charcoal">
                      ₹{fourYearTuition.toLocaleString('en-IN')}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3">
                      <strong className="text-ink-charcoal font-sans text-sm font-semibold">Hostel & Annapoorna Mess</strong>
                      <span className="text-xs text-ink-slate block font-sans mt-0.5">
                        4-sharing room + 4-time pure vegetarian Satvik meals
                      </span>
                    </td>
                    <td className="p-3 text-right font-medium text-ink-charcoal">
                      {includeHostel ? `₹${annualHostel.toLocaleString('en-IN')}` : '₹0'}
                    </td>
                    <td className="p-3 text-right font-medium text-ink-charcoal">
                      {includeHostel ? `₹${fourYearHostel.toLocaleString('en-IN')}` : '₹0'}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3">
                      <strong className="text-ink-charcoal font-sans text-sm font-semibold">Caution Deposit (Refundable)</strong>
                      <span className="text-xs text-ink-slate block font-sans mt-0.5">One-time deposit, 100% refunded at end of course</span>
                    </td>
                    <td className="p-3 text-right font-medium text-ink-muted">—</td>
                    <td className="p-3 text-right font-medium text-ink-charcoal">
                      ₹{cautionDeposit.toLocaleString('en-IN')}
                    </td>
                  </tr>
                  <tr className="bg-surface border-t-2 border-tuscan-rust text-tuscan-rust font-bold text-sm">
                    <td className="p-3.5 font-sans">TOTAL 4-YEAR ESTIMATE</td>
                    <td className="p-3.5 text-right font-mono">
                      ₹{(annualTuition + annualHostel).toLocaleString('en-IN')}
                    </td>
                    <td className="p-3.5 text-right font-mono text-base">
                      ₹{grandTotal.toLocaleString('en-IN')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* University Seal & Verification Notice */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-3.5 border-t border-tuscan-hairline text-xs text-ink-slate">
              <div className="space-y-1 max-w-sm">
                <p>• Generated through the <strong>Amrita Chennai Admissions Portal</strong>.</p>
                <p>• Final seat allotment is subject to official AEEE counseling verification.</p>
                <p>• Caution deposit is refundable as per university guidelines.</p>
              </div>

              <div className="text-right flex flex-col items-end">
                <div className="h-10 w-28 border border-dashed border-tuscan-hairline rounded-lg flex items-center justify-center font-mono text-xs text-ink-muted bg-surface/50">
                  [ OFFICIAL SEAL ]
                </div>
                <span className="font-mono text-xs text-ink-muted mt-1.5">
                  Admissions Cell • AVV Chennai
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
