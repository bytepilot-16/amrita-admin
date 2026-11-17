import React, { useState, useMemo } from 'react';
import {
  Printer,
  ArrowRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CHENNAI_BRANCHES, AMRITA_CAMPUS_META } from '../../data/amritaChennaiData';
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
        colors: ['#8A2B0E', '#E35336', '#FFD3AC'],
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
    <div className="w-full max-w-6xl mx-auto py-10 px-4 sm:px-8 space-y-10">
      {/* Page Title & Intro */}
      <div className="border-b border-tuscan-hairline pb-8">
        <span className="font-mono text-xs uppercase tracking-wider text-ink-muted block mb-2">
          Official Fee Structure 2026 • Chennai Campus (Vengal)
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-ink-charcoal">
          B.Tech Fee & Scholarship Calculator
        </h1>
        <p className="mt-3 text-base text-ink-slate max-w-3xl leading-[1.65]">
          Amrita Vishwa Vidyapeetham offers substantial merit scholarships based on your AEEE rank or JEE Main score. Select your entrance score and engineering branch below to view your exact yearly fee, accommodation costs, and 4-year cumulative investment.
        </p>
      </div>

      {/* Main Interactive Configuration Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Input Sliders & Branch Select (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-tuscan-hairline bg-surface/30 p-6 sm:p-8 space-y-7">
          {/* Exam Type Toggle */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-3 font-heading">
              Select Entrance Exam
            </label>
            <div className="inline-flex rounded-xl border border-tuscan-hairline bg-surface p-1">
              <button
                type="button"
                onClick={() => {
                  soundFx.click();
                  setExamType('AEEE');
                }}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                  examType === 'AEEE'
                    ? 'bg-parchment text-tuscan-rust shadow-sm'
                    : 'text-ink-slate hover:text-ink-charcoal'
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
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                  examType === 'JEE'
                    ? 'bg-parchment text-tuscan-rust shadow-sm'
                    : 'text-ink-slate hover:text-ink-charcoal'
                }`}
              >
                JEE Main Percentile
              </button>
            </div>
          </div>

          {/* Rank or Percentile Slider & Number Input */}
          {examType === 'AEEE' ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-ink-slate">
                  Your AEEE All-India Rank:
                </label>
                <div className="flex items-center gap-1.5 font-mono text-base font-bold text-tuscan-rust bg-surface px-3.5 py-1.5 rounded-lg border border-tuscan-hairline">
                  <span className="text-xs text-ink-muted">#</span>
                  <input
                    type="number"
                    min="1"
                    max="45000"
                    value={aeeeRank}
                    onChange={(e) => handleRankChange(Number(e.target.value) || 1)}
                    className="w-24 bg-transparent text-right font-mono font-bold focus:outline-none text-ink-charcoal"
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
                className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer accent-[#E35336]"
              />
              <div className="flex justify-between text-xs text-ink-muted font-mono">
                <span>Top 50 (Slab 1)</span>
                <span>Rank 7,500 (Slab 2)</span>
                <span>Rank 18,000 (Slab 3)</span>
                <span>Rank 35,000+ (Regular)</span>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-ink-slate">
                  Your JEE Main Percentile:
                </label>
                <div className="flex items-center gap-1 font-mono text-base font-bold text-tuscan-rust bg-surface px-3.5 py-1.5 rounded-lg border border-tuscan-hairline">
                  <input
                    type="number"
                    min="70"
                    max="99.9"
                    step="0.1"
                    value={jeePercentile}
                    onChange={(e) => setJeePercentile(parseFloat(e.target.value) || 70)}
                    className="w-20 bg-transparent text-right font-mono font-bold focus:outline-none text-ink-charcoal"
                  />
                  <span className="text-xs text-ink-muted">%</span>
                </div>
              </div>
              <input
                type="range"
                min="70"
                max="99.9"
                step="0.1"
                value={jeePercentile}
                onChange={(e) => setJeePercentile(parseFloat(e.target.value))}
                className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer accent-[#E35336]"
              />
              <div className="flex justify-between text-xs text-ink-muted font-mono">
                <span>70.0% (Regular)</span>
                <span>88.0% (Slab 3)</span>
                <span>93.0% (Slab 2)</span>
                <span>97.0%+ (Slab 1)</span>
              </div>
            </div>
          )}

          {/* Engineering Discipline Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-3 font-heading">
              Choose B.Tech Discipline
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
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
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-tuscan-rust bg-surface shadow-sm'
                        : 'border-tuscan-hairline bg-surface/40 hover:border-tuscan-terracotta'
                    }`}
                  >
                    <div className="font-heading font-semibold text-sm text-ink-charcoal">
                      {b.name}
                    </div>
                    <div className="font-mono text-xs text-ink-muted mt-1">
                      Code: {b.code} • {b.seats} Seats
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Accommodation Option */}
          <div className="pt-4 border-t border-tuscan-hairline">
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="text-sm font-heading font-semibold text-ink-charcoal block">
                  Hostel & Annapoorna Satvik Mess
                </span>
                <span className="text-xs text-ink-slate mt-0.5 block leading-relaxed">
                  4-sharing room + breakfast, lunch, evening snacks & dinner (₹1,10,000 / year)
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  soundFx.click();
                  setIncludeHostel(!includeHostel);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-colors shrink-0 ${
                  includeHostel
                    ? 'border-tuscan-rust bg-surface text-tuscan-rust'
                    : 'border-tuscan-hairline bg-surface/40 text-ink-slate'
                }`}
              >
                {includeHostel ? 'Hostel Included' : 'Day Scholar'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Calculated Cost Breakdown Card (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-tuscan-hairline bg-surface/30 p-6 sm:p-8 space-y-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-ink-muted block">
              Calculated Outcome
            </span>
            <div className="flex items-baseline justify-between mt-1">
              <h2 className="font-heading text-3xl font-semibold tracking-[-0.02em] text-tuscan-rust">
                {currentSlabInfo.slab}
              </h2>
              {currentSlabInfo.scholarshipPct > 0 && (
                <span className="text-xs font-semibold text-tuscan-rust bg-[rgba(255,211,172,0.35)] px-3 py-1 rounded-full border border-tuscan-hairline">
                  {currentSlabInfo.scholarshipPct}% Scholarship
                </span>
              )}
            </div>
            <p className="text-sm text-ink-slate mt-2 leading-relaxed">
              For {selectedBranch.name} with {examType === 'AEEE' ? `AEEE Rank #${aeeeRank.toLocaleString('en-IN')}` : `JEE Main ${jeePercentile}%`}.
            </p>
          </div>

          {/* Key Figures Table */}
          <div className="space-y-3.5 pt-3 border-t border-tuscan-hairline text-sm">
            <div className="flex items-center justify-between py-1.5 border-b border-tuscan-hairline/60">
              <span className="text-ink-slate">Annual Tuition Fee:</span>
              <span className="font-mono font-bold text-ink-charcoal">
                ₹{annualTuition.toLocaleString('en-IN')} / yr
              </span>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-tuscan-hairline/60">
              <span className="text-ink-slate">Hostel & Satvik Mess:</span>
              <span className="font-mono font-medium text-ink-charcoal">
                {includeHostel ? `₹${annualHostel.toLocaleString('en-IN')} / yr` : '₹0 (Day Scholar)'}
              </span>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-tuscan-hairline/60">
              <span className="text-ink-slate">Caution Deposit (Refundable):</span>
              <span className="font-mono font-medium text-ink-charcoal">
                ₹{cautionDeposit.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Total 4 Years Highlight Box */}
            <div className="p-5 rounded-xl bg-surface border border-tuscan-hairline mt-4">
              <div className="text-xs text-ink-muted uppercase tracking-wider font-mono">
                Total Estimated 4-Year Cost
              </div>
              <div className="font-mono text-3xl font-bold text-ink-charcoal mt-1">
                ₹{total4Years.toLocaleString('en-IN')}
              </div>
              <div className="text-xs text-ink-slate mt-2 leading-relaxed">
                Includes 4 years tuition + {includeHostel ? '4 years hostel & mess' : 'day scholar'} + refundable deposit.
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <button
              type="button"
              onClick={() => {
                soundFx.click();
                setIsDossierOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-tuscan-hairline bg-surface py-3 text-sm font-semibold text-ink-charcoal hover:border-tuscan-rust hover:text-tuscan-rust transition-colors"
            >
              <Printer className="h-4 w-4 text-tuscan-rust" />
              <span>Print Official Fee Estimate Dossier</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundFx.click();
                handleSendToChat();
              }}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-tuscan-rust py-3 text-sm font-semibold text-white hover:bg-tuscan-rust/90 transition-colors"
            >
              <span>Ask a Question in Admissions Chat</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Matrix Across All 7 Chennai Branches */}
      <div className="rounded-2xl border border-tuscan-hairline bg-surface/30 p-6 sm:p-8 space-y-5">
        <div>
          <h3 className="font-heading text-2xl font-semibold tracking-[-0.02em] text-ink-charcoal">
            What Your Score Gets You Across All 7 Engineering Disciplines
          </h3>
          <p className="text-sm text-ink-slate mt-1 leading-relaxed">
            Compare fee categories for your current score ({examType === 'AEEE' ? `AEEE Rank #${aeeeRank}` : `${jeePercentile}%ile`}) to explore alternative program opportunities.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-tuscan-hairline font-mono text-xs text-ink-muted uppercase">
                <th className="pb-3.5 font-semibold">Engineering Discipline</th>
                <th className="pb-3.5 font-semibold">Your Fee Slab</th>
                <th className="pb-3.5 font-semibold text-right">Yearly Tuition</th>
                <th className="pb-3.5 font-semibold text-right">Average Package</th>
                <th className="pb-3.5 text-center">Switch</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-tuscan-hairline/60">
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
                    className={`transition-colors hover:bg-surface/50 ${
                      isSelected ? 'bg-surface/70 font-medium' : ''
                    }`}
                  >
                    <td className="py-3.5 pr-3">
                      <div className="font-heading font-semibold text-ink-charcoal text-base">
                        {branch.name}
                      </div>
                      <div className="text-xs text-ink-muted font-mono mt-0.5">
                        Code: {branch.code}
                      </div>
                    </td>
                    <td className="py-3.5">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          info.slab === 'Slab 1'
                            ? 'bg-[rgba(255,211,172,0.45)] text-tuscan-rust border border-tuscan-hairline'
                            : info.slab === 'Slab 2'
                            ? 'bg-[rgba(255,211,172,0.25)] text-tuscan-terracotta border border-tuscan-hairline'
                            : info.slab === 'Slab 3'
                            ? 'bg-surface text-ink-slate border border-tuscan-hairline'
                            : 'bg-surface text-ink-muted border border-tuscan-hairline'
                        }`}
                      >
                        {info.slab}
                      </span>
                    </td>
                    <td className="py-3.5 text-right font-mono font-medium text-ink-charcoal">
                      ₹{info.fee.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 text-right font-mono text-tuscan-rust font-medium">
                      {branch.avgPackage}
                    </td>
                    <td className="py-3.5 text-center">
                      <button
                        type="button"
                        onClick={() => {
                          soundFx.click();
                          setSelectedBranchId(branch.id);
                        }}
                        className={`text-xs font-semibold underline transition-colors ${
                          isSelected ? 'text-tuscan-rust' : 'text-ink-slate hover:text-ink-charcoal'
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
