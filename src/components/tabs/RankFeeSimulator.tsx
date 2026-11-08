import React, { useState, useMemo } from 'react';
import {
  Printer,
  ArrowRight,
  ShieldCheck,
  Building2,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CHENNAI_BRANCHES, AMRITA_CAMPUS_META, BranchData } from '../../data/amritaChennaiData';
import { calculateBranchSlab } from '../../lib/cpsEngine';
import { FeeDossierModal } from '../ui/FeeDossierModal';
import { soundFx } from '../../lib/soundFx';

interface RankFeeSimulatorProps {
  onAskQuestion: (prompt: string) => void;
  initialRank?: number;
  initialBranchId?: string;
}

export const RankFeeSimulator: React.FC<RankFeeSimulatorProps> = ({
  onAskQuestion,
  initialRank = 5400,
  initialBranchId = 'cse-core',
}) => {
  const [examType, setExamType] = useState<'AEEE' | 'JEE'>('AEEE');
  const [aeeeRank, setAeeeRank] = useState<number>(initialRank);
  const [jeePercentile, setJeePercentile] = useState<number>(93.5);
  const [selectedBranchId, setSelectedBranchId] = useState<string>(initialBranchId);
  const [includeHostel, setIncludeHostel] = useState<boolean>(true);
  const [isDossierOpen, setIsDossierOpen] = useState<boolean>(false);

  const selectedBranch = useMemo(
    () => CHENNAI_BRANCHES.find((b) => b.id === selectedBranchId) || CHENNAI_BRANCHES[0],
    [selectedBranchId]
  );

  const currentSlabInfo = useMemo(() => {
    return calculateBranchSlab(
      selectedBranch,
      examType === 'AEEE' ? aeeeRank : undefined,
      examType === 'JEE' ? jeePercentile : undefined
    );
  }, [selectedBranch, examType, aeeeRank, jeePercentile]);

  const handleRankChange = (newRank: number) => {
    setAeeeRank(newRank);
    if (newRank <= selectedBranch.slabCutoffs.slab1.aeee) {
      soundFx.successChime();
      confetti({
        particleCount: 28,
        spread: 60,
        origin: { y: 0.65, x: 0.5 },
        colors: ['#9E1B34', '#A87622', '#15803D'],
      });
    }
  };

  const annualTuition = currentSlabInfo.fee;
  const annualHostel = includeHostel ? AMRITA_CAMPUS_META.hostelAnnualBase : 0;
  const cautionDeposit = AMRITA_CAMPUS_META.cautionDeposit;
  const total4Years = annualTuition * 4 + annualHostel * 4 + cautionDeposit;

  const handleSendToChat = () => {
    const examStr = examType === 'AEEE' ? `AEEE Rank ${aeeeRank}` : `JEE Percentile ${jeePercentile}%`;
    const prompt = `What are the fee slabs and cutoffs for ${selectedBranch.name} with ${examStr}?`;
    onAskQuestion(prompt);
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      {/* Page Title & Intro */}
      <div>
        <span className="font-mono text-xs uppercase tracking-wider text-[#8C857B]">
          Official Fee Structure 2026 • Chennai Campus (Vengal)
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#141413] mt-1">
          B.Tech Fee & Scholarship Calculator
        </h1>
        <p className="mt-2 text-sm text-[#57534E] max-w-3xl leading-relaxed">
          Amrita Vishwa Vidyapeetham offers substantial merit scholarships based on your AEEE rank or JEE Main score. Select your entrance score and engineering branch below to view your exact yearly fee, accommodation costs, and 4-year cumulative investment.
        </p>
      </div>

      {/* Main Interactive Configuration Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Input Sliders & Branch Select (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-[#E2DCD0] bg-white p-6 shadow-paper space-y-6">
          {/* Exam Type Toggle */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#57534E] mb-2">
              Select Entrance Exam
            </label>
            <div className="inline-flex rounded-xl border border-[#E2DCD0] bg-[#FAF8F5] p-1">
              <button
                type="button"
                onClick={() => {
                  soundFx.click();
                  setExamType('AEEE');
                }}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                  examType === 'AEEE'
                    ? 'bg-white text-[#9E1B34] shadow-xs'
                    : 'text-[#57534E] hover:text-[#141413]'
                }`}
              >
                AEEE Rank (All-India)
              </button>
              <button
                type="button"
                onClick={() => {
                  soundFx.click();
                  setExamType('JEE');
                }}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                  examType === 'JEE'
                    ? 'bg-white text-[#9E1B34] shadow-xs'
                    : 'text-[#57534E] hover:text-[#141413]'
                }`}
              >
                JEE Main Percentile
              </button>
            </div>
          </div>

          {/* Rank or Percentile Slider & Number Input */}
          {examType === 'AEEE' ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-[#57534E]">
                  Your AEEE All-India Rank:
                </label>
                <div className="flex items-center gap-1 font-mono text-base font-bold text-[#9E1B34] bg-[#FAF8F5] px-3 py-1 rounded-lg border border-[#E2DCD0]">
                  <span className="text-xs text-[#8C857B]">#</span>
                  <input
                    type="number"
                    min="1"
                    max="45000"
                    value={aeeeRank}
                    onChange={(e) => handleRankChange(Number(e.target.value) || 1)}
                    className="w-20 bg-transparent text-right font-mono font-bold focus:outline-none"
                  />
                </div>
              </div>
              <input
                type="range"
                min="50"
                max="35000"
                step="50"
                value={aeeeRank}
                onChange={(e) => handleRankChange(Number(e.target.value))}
                className="w-full h-2 bg-[#EAE4D9] rounded-lg appearance-none cursor-pointer accent-[#9E1B34]"
              />
              <div className="flex justify-between text-[11px] text-[#8C857B] font-mono">
                <span>Top 50 (Slab 1)</span>
                <span>Rank 7,500 (Slab 2)</span>
                <span>Rank 18,000 (Slab 3)</span>
                <span>Rank 35,000+ (Regular)</span>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-[#57534E]">
                  Your JEE Main Percentile:
                </label>
                <div className="flex items-center gap-1 font-mono text-base font-bold text-[#9E1B34] bg-[#FAF8F5] px-3 py-1 rounded-lg border border-[#E2DCD0]">
                  <input
                    type="number"
                    min="70"
                    max="99.9"
                    step="0.1"
                    value={jeePercentile}
                    onChange={(e) => setJeePercentile(parseFloat(e.target.value) || 70)}
                    className="w-16 bg-transparent text-right font-mono font-bold focus:outline-none"
                  />
                  <span className="text-xs text-[#8C857B]">%</span>
                </div>
              </div>
              <input
                type="range"
                min="70"
                max="99.9"
                step="0.1"
                value={jeePercentile}
                onChange={(e) => setJeePercentile(parseFloat(e.target.value))}
                className="w-full h-2 bg-[#EAE4D9] rounded-lg appearance-none cursor-pointer accent-[#9E1B34]"
              />
              <div className="flex justify-between text-[11px] text-[#8C857B] font-mono">
                <span>70.0% (Regular)</span>
                <span>88.0% (Slab 3)</span>
                <span>93.0% (Slab 2)</span>
                <span>97.0%+ (Slab 1)</span>
              </div>
            </div>
          )}

          {/* Engineering Discipline Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#57534E] mb-2">
              Choose B.Tech Discipline
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {CHENNAI_BRANCHES.map((b) => {
                const isSelected = b.id === selectedBranchId;
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => {
                      soundFx.click();
                      setSelectedBranchId(b.id);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-[#9E1B34] bg-[#FAF8F5] shadow-xs'
                        : 'border-[#E2DCD0] bg-white hover:border-[#8C857B]'
                    }`}
                  >
                    <div className="font-semibold text-xs text-[#141413]">
                      {b.name}
                    </div>
                    <div className="font-mono text-[10px] text-[#8C857B] mt-0.5">
                      Code: {b.code} • {b.seats} Seats
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Accommodation Option */}
          <div className="pt-2 border-t border-[#E2DCD0]">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-[#141413] block">
                  Hostel & Annapoorna Satvik Mess
                </span>
                <span className="text-[11px] text-[#57534E]">
                  4-sharing room + breakfast, lunch, evening snacks & dinner (₹1,10,000 / year)
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  soundFx.click();
                  setIncludeHostel(!includeHostel);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  includeHostel
                    ? 'border-[#15803D] bg-[#F0F7F2] text-[#15803D]'
                    : 'border-[#E2DCD0] bg-white text-[#57534E]'
                }`}
              >
                {includeHostel ? 'Hostel Included' : 'Day Scholar'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Calculated Cost Breakdown Card (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-[#E2DCD0] bg-white p-6 shadow-paper space-y-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-[#8C857B]">
              Calculated Outcome
            </span>
            <div className="flex items-baseline justify-between mt-1">
              <h2 className="font-serif text-2xl font-bold text-[#9E1B34]">
                {currentSlabInfo.slab}
              </h2>
              {currentSlabInfo.scholarshipPct > 0 && (
                <span className="text-xs font-semibold text-[#A87622] bg-[#FAF5ED] px-2.5 py-1 rounded-full border border-[#E6D7BE]">
                  {currentSlabInfo.scholarshipPct}% Scholarship
                </span>
              )}
            </div>
            <p className="text-xs text-[#57534E] mt-1">
              For {selectedBranch.name} with {examType === 'AEEE' ? `AEEE Rank #${aeeeRank.toLocaleString('en-IN')}` : `JEE Main ${jeePercentile}%`}.
            </p>
          </div>

          {/* Key Figures Table */}
          <div className="space-y-3 pt-2 border-t border-[#E2DCD0] text-xs">
            <div className="flex items-center justify-between py-1 border-b border-[#EAE4D9]">
              <span className="text-[#57534E]">Annual Tuition Fee:</span>
              <span className="font-mono font-bold text-[#141413]">
                ₹{annualTuition.toLocaleString('en-IN')} / yr
              </span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-[#EAE4D9]">
              <span className="text-[#57534E]">Hostel & Satvik Mess:</span>
              <span className="font-mono font-medium text-[#141413]">
                {includeHostel ? `₹${annualHostel.toLocaleString('en-IN')} / yr` : '₹0 (Day Scholar)'}
              </span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-[#EAE4D9]">
              <span className="text-[#57534E]">Caution Deposit (One-time, Refundable):</span>
              <span className="font-mono font-medium text-[#141413]">
                ₹{cautionDeposit.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Total 4 Years Highlight Box */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E2DCD0] mt-3">
              <div className="text-[11px] text-[#8C857B] uppercase tracking-wider font-mono">
                Total Estimated 4-Year Cost
              </div>
              <div className="font-mono text-2xl font-bold text-[#141413] mt-1">
                ₹{total4Years.toLocaleString('en-IN')}
              </div>
              <div className="text-[11px] text-[#57534E] mt-1">
                Includes 4 years tuition + {includeHostel ? '4 years hostel & mess' : 'day scholar'} + refundable deposit.
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <button
              type="button"
              onClick={() => {
                soundFx.click();
                setIsDossierOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#E2DCD0] bg-white py-2.5 text-xs font-semibold text-[#141413] hover:border-[#141413] transition-colors"
            >
              <Printer className="h-3.5 w-3.5 text-[#9E1B34]" />
              <span>Print Official Fee Estimate Dossier</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundFx.click();
                handleSendToChat();
              }}
              className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-[#9E1B34] py-2.5 text-xs font-semibold text-white hover:bg-[#7D1529] transition-colors"
            >
              <span>Ask a Question in Admissions Chat</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Matrix Across All 7 Chennai Branches */}
      <div className="rounded-2xl border border-[#E2DCD0] bg-white p-6 shadow-paper space-y-4">
        <div>
          <h3 className="font-serif text-xl font-bold text-[#141413]">
            What Your Score Gets You Across All 7 Engineering Disciplines
          </h3>
          <p className="text-xs text-[#57534E] mt-0.5">
            Compare fee categories for your current score ({examType === 'AEEE' ? `AEEE Rank #${aeeeRank}` : `${jeePercentile}%ile`}) to explore alternative program opportunities.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E2DCD0] font-mono text-[11px] text-[#8C857B] uppercase">
                <th className="pb-3 font-semibold">Engineering Discipline</th>
                <th className="pb-3 font-semibold">Your Fee Slab</th>
                <th className="pb-3 font-semibold text-right">Yearly Tuition</th>
                <th className="pb-3 font-semibold text-right">Average Placement</th>
                <th className="pb-3 text-center">Switch</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE4D9]">
              {CHENNAI_BRANCHES.map((branch) => {
                const info = calculateBranchSlab(
                  branch,
                  examType === 'AEEE' ? aeeeRank : undefined,
                  examType === 'JEE' ? jeePercentile : undefined
                );
                const isSelected = branch.id === selectedBranchId;

                return (
                  <tr
                    key={branch.id}
                    className={`transition-colors hover:bg-[#FAF8F5] ${
                      isSelected ? 'bg-[#FAF8F5] font-medium' : ''
                    }`}
                  >
                    <td className="py-3 pr-2">
                      <div className="font-semibold text-[#141413]">
                        {branch.name}
                      </div>
                      <div className="text-[11px] text-[#8C857B] font-mono">
                        Code: {branch.code}
                      </div>
                    </td>
                    <td className="py-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold ${
                          info.slab === 'Slab 1'
                            ? 'bg-[#F0F7F2] text-[#15803D]'
                            : info.slab === 'Slab 2'
                            ? 'bg-[#FAF5ED] text-[#A87622]'
                            : info.slab === 'Slab 3'
                            ? 'bg-amber-50 text-amber-800'
                            : 'bg-stone-100 text-stone-700'
                        }`}
                      >
                        {info.slab}
                      </span>
                    </td>
                    <td className="py-3 text-right font-mono font-medium text-[#141413]">
                      ₹{info.fee.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 text-right font-mono text-[#15803D] font-medium">
                      {branch.avgPackage}
                    </td>
                    <td className="py-3 text-center">
                      <button
                        type="button"
                        onClick={() => {
                          soundFx.click();
                          setSelectedBranchId(branch.id);
                        }}
                        className={`text-xs font-semibold underline ${
                          isSelected ? 'text-[#9E1B34]' : 'text-[#57534E] hover:text-[#141413]'
                        }`}
                      >
                        {isSelected ? 'Selected' : 'Select'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Official Fee Dossier Modal */}
      <FeeDossierModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
        branch={selectedBranch}
        rank={examType === 'AEEE' ? aeeeRank : undefined}
        jeePercentile={examType === 'JEE' ? jeePercentile : undefined}
        examType={examType}
        slab={currentSlabInfo.slab}
        annualTuition={annualTuition}
        includeHostel={includeHostel}
        annualHostel={annualHostel}
        cautionDeposit={cautionDeposit}
      />
    </div>
  );
};
