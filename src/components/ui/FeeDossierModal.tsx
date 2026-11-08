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
          className="w-full max-w-2xl rounded-2xl border border-[#E2DCD0] bg-white p-6 sm:p-8 shadow-paper-lg print:shadow-none print:border-none print:m-0"
        >
          {/* Action Bar (Hidden in Print) */}
          <div className="flex items-center justify-between border-b border-[#E2DCD0] pb-3 mb-6 print:hidden">
            <div className="flex items-center gap-2">
              <Printer className="h-4 w-4 text-[#9E1B34]" />
              <span className="font-serif text-sm font-bold text-[#141413]">
                Official Admissions Fee Estimate & Scholarship Slip
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#9E1B34] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#7D1529] transition-colors"
              >
                <Printer className="h-3.5 w-3.5" />
                <span>Print / Save as PDF</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-1 text-[#8C857B] hover:bg-[#FAF8F5] hover:text-[#141413]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Printable Document Body */}
          <div className="border border-[#E2DCD0] p-6 rounded-xl bg-white print:border-2 print:border-black">
            {/* University Letterhead */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b-2 border-[#9E1B34] pb-4 mb-4 gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#9E1B34] text-white font-serif font-bold text-2xl shadow-xs">
                  A
                </div>
                <div>
                  <h1 className="font-serif text-base sm:text-lg font-bold text-[#9E1B34] tracking-tight">
                    AMRITA VISHWA VIDYAPEETHAM
                  </h1>
                  <p className="text-xs font-bold text-[#141413]">
                    CHENNAI CAMPUS (VENGAL, TIRUVALLUR)
                  </p>
                  <p className="text-[10px] text-[#57534E]">
                    Deemed-to-be University • NAAC A++ Grade • NIRF Top 7 in India
                  </p>
                </div>
              </div>

              <div className="text-right font-mono text-[10px] text-[#57534E]">
                <div>Ref: <strong className="text-[#141413]">{referenceId}</strong></div>
                <div>Date: {currentDate}</div>
                <div className="text-[#15803D] font-medium">Provisional Estimate</div>
              </div>
            </div>

            {/* Candidate & Discipline Assessment Details */}
            <div className="grid grid-cols-2 gap-3 text-xs mb-5 p-3 rounded-lg bg-[#FAF8F5] border border-[#E2DCD0]">
              <div>
                <span className="text-[10px] uppercase font-mono text-[#8C857B] block">Program</span>
                <span className="font-bold text-[#141413] block">{branch.name} ({branch.code})</span>
                <span className="text-[11px] text-[#57534E]">{branch.department}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-[#8C857B] block">Assessment Score</span>
                <span className="font-mono font-bold text-[#9E1B34] text-sm">
                  {examType === 'AEEE' ? `AEEE AIR #${rank?.toLocaleString('en-IN')}` : `JEE Main ${jeePercentile}%ile`}
                </span>
                <span className="text-[10px] text-[#57534E] block">Academic Batch 2026–2030</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-[#8C857B] block">Allotted Merit Category</span>
                <span className="font-bold text-[#9E1B34] text-sm block">
                  {slab}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-[#8C857B] block">Accommodation Choice</span>
                <span className="font-medium text-[#141413]">
                  {includeHostel ? 'Hostel & Annapoorna Satvik Mess' : 'Day Scholar'}
                </span>
              </div>
            </div>

            {/* Itemized Financial Table */}
            <div className="mb-5 overflow-hidden rounded-lg border border-[#E2DCD0]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF8F5] border-b border-[#E2DCD0] font-mono text-[10px] uppercase text-[#141413]">
                  <tr>
                    <th className="p-2.5">Fee Particulars</th>
                    <th className="p-2.5 text-right">Annual Amount</th>
                    <th className="p-2.5 text-right">4-Year Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2DCD0] font-mono">
                  <tr>
                    <td className="p-2.5">
                      <strong className="text-[#141413]">Tuition Fee ({slab})</strong>
                      <span className="text-[10px] text-[#57534E] block">
                        Academic instruction, laboratory sessions & library access
                      </span>
                    </td>
                    <td className="p-2.5 text-right font-bold text-[#141413]">
                      ₹{annualTuition.toLocaleString('en-IN')}
                    </td>
                    <td className="p-2.5 text-right font-bold text-[#141413]">
                      ₹{fourYearTuition.toLocaleString('en-IN')}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5">
                      <strong className="text-[#141413]">Hostel & Annapoorna Mess</strong>
                      <span className="text-[10px] text-[#57534E] block">
                        4-sharing room + 4-time pure vegetarian Satvik meals
                      </span>
                    </td>
                    <td className="p-2.5 text-right font-medium text-[#141413]">
                      {includeHostel ? `₹${annualHostel.toLocaleString('en-IN')}` : '₹0'}
                    </td>
                    <td className="p-2.5 text-right font-medium text-[#141413]">
                      {includeHostel ? `₹${fourYearHostel.toLocaleString('en-IN')}` : '₹0'}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5">
                      <strong className="text-[#141413]">Caution Deposit (Refundable)</strong>
                      <span className="text-[10px] text-[#57534E] block">One-time deposit, 100% refunded at end of course</span>
                    </td>
                    <td className="p-2.5 text-right font-medium text-[#57534E]">—</td>
                    <td className="p-2.5 text-right font-medium text-[#141413]">
                      ₹{cautionDeposit.toLocaleString('en-IN')}
                    </td>
                  </tr>
                  <tr className="bg-[#FAF8F5] border-t-2 border-[#9E1B34] text-[#9E1B34] font-bold text-sm">
                    <td className="p-3">TOTAL 4-YEAR ESTIMATE</td>
                    <td className="p-3 text-right">
                      ₹{(annualTuition + annualHostel).toLocaleString('en-IN')}
                    </td>
                    <td className="p-3 text-right">
                      ₹{grandTotal.toLocaleString('en-IN')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* University Seal & Verification Notice */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-3 border-t border-[#E2DCD0] text-[10px] text-[#57534E]">
              <div className="space-y-0.5 max-w-sm">
                <p>• Generated through the <strong>Amrita Chennai Admissions Portal</strong>.</p>
                <p>• Final seat allotment is subject to official AEEE counseling verification.</p>
                <p>• Caution deposit is refundable as per university guidelines.</p>
              </div>

              <div className="text-right flex flex-col items-end">
                <div className="h-9 w-24 border border-dashed border-[#8C857B] rounded flex items-center justify-center font-mono text-[9px] text-[#8C857B]">
                  [ OFFICIAL SEAL ]
                </div>
                <span className="font-mono text-[9px] text-[#8C857B] mt-1">
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
