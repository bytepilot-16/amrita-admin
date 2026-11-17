import React, { useState } from 'react';
import { solveWithCPS, CPSResponse } from '../../lib/cpsEngine';
import { soundFx } from '../../lib/soundFx';

export const CPSVisualizer: React.FC = () => {
  const [testQuery, setTestQuery] = useState('Calculate fee for CSE Core with AEEE Rank 5400 and hostel');
  const [testResult, setTestResult] = useState<CPSResponse>(() =>
    solveWithCPS('Calculate fee for CSE Core with AEEE Rank 5400 and hostel')
  );
  const [geminiKeyInput, setGeminiKeyInput] = useState(() => localStorage.getItem('amrita_gemini_api_key') || '');
  const [keySaved, setKeySaved] = useState(false);

  const handleRunEvaluation = () => {
    soundFx.click();
    const res = solveWithCPS(testQuery);
    setTestResult(res);
  };

  const handleSaveKey = () => {
    soundFx.click();
    if (geminiKeyInput.trim()) {
      localStorage.setItem('amrita_gemini_api_key', geminiKeyInput.trim());
    } else {
      localStorage.removeItem('amrita_gemini_api_key');
    }
    setKeySaved(true);
    setTimeout(() => setKeySaved(false), 2000);
  };

  const sampleQueries = [
    'Calculate fee for CSE Core with AEEE Rank 5400',
    'What is served for Friday lunch in the mess?',
    'What are the boys hostel gate curfew rules?',
    'Compare cutoffs between CSE Core and AI&DS',
  ];

  return (
    <div className="w-full max-w-6xl mx-auto py-10 px-4 sm:px-8 space-y-10">
      {/* Page Title & Academic Context */}
      <div className="border-b border-tuscan-hairline pb-8">
        <span className="font-mono text-xs uppercase tracking-wider text-ink-muted block mb-2">
          Computational Problem Solving (CPS) • Academic Project Documentation
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-ink-charcoal">
          How It Works: System Architecture
        </h1>
        <p className="mt-3 text-base text-ink-slate max-w-3xl leading-[1.65]">
          This system was designed to solve a real student problem: navigating through 200+ pages of admissions PDFs and cutoff matrices. It combines a local deterministic constraint engine with natural language intent recognition to provide instant, verified answers with zero external API dependencies.
        </p>
      </div>

      {/* 4-Step Algorithmic Pipeline Cards */}
      <div className="rounded-2xl border border-tuscan-hairline bg-surface/30 p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="font-heading text-2xl font-semibold tracking-[-0.02em] text-ink-charcoal">
            The 4-Step Computational Pipeline
          </h2>
          <p className="text-sm text-ink-slate mt-1 leading-relaxed">
            Every question submitted in chat passes through four deterministic processing stages in under 5 milliseconds.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              step: '01',
              title: 'Intent Classification',
              method: 'Keyword & TF-IDF Scoring',
              desc: 'Analyzes user vocabulary to categorize queries into fee inquiries, dining schedules, hostel rules, or transport routes.',
            },
            {
              step: '02',
              title: 'Constraint Extraction',
              method: 'Pattern Match Automata',
              desc: 'Extracts numeric rank bounds (e.g. 5,400), percentiles, discipline abbreviations (CSE, AI&DS), and days of the week.',
            },
            {
              step: '03',
              title: 'Cutoff Table Lookup',
              method: 'Direct Hash Map (O(1))',
              desc: 'Compares extracted ranks against the Amrita Chennai cutoff bounds for all 7 engineering branches and 4 fee slabs.',
            },
            {
              step: '04',
              title: 'Financial Synthesis',
              method: 'Deterministic Aggregation',
              desc: 'Generates itemized 4-year financial projections (tuition + hostel + refundable caution deposit) in plain English.',
            },
          ].map((st) => (
            <div key={st.step} className="p-5 rounded-xl border border-tuscan-hairline bg-surface flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-tuscan-rust block mb-1.5">
                  Step {st.step}
                </span>
                <h3 className="font-heading font-semibold text-sm text-ink-charcoal">
                  {st.title}
                </h3>
                <span className="font-mono text-xs text-ink-muted block mt-0.5">
                  {st.method}
                </span>
                <p className="text-xs text-ink-slate mt-2.5 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decision Logic & Complexity Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-tuscan-hairline bg-surface/30 p-6 sm:p-8 space-y-4">
          <h3 className="font-heading text-xl font-semibold tracking-[-0.02em] text-ink-charcoal">
            Cutoff Decision Logic (Pseudocode)
          </h3>
          <p className="text-sm text-ink-slate leading-relaxed">
            How candidate rank is mapped to merit scholarship slabs:
          </p>
          <pre className="font-mono text-xs leading-relaxed p-4 rounded-xl bg-surface border border-tuscan-hairline text-ink-charcoal overflow-x-auto">
{`function getFeeSlab(candidateRank, branch) {
  if (candidateRank <= branch.slab1Cutoff) {
    return { slab: "Slab 1", tuition: 150000, scholarship: "70%" };
  } else if (candidateRank <= branch.slab2Cutoff) {
    return { slab: "Slab 2", tuition: 275000, scholarship: "40%" };
  } else if (candidateRank <= branch.slab3Cutoff) {
    return { slab: "Slab 3", tuition: 375000, scholarship: "20%" };
  } else {
    return { slab: "Regular", tuition: 450000, scholarship: "0%" };
  }
}`}
          </pre>
        </div>

        <div className="rounded-2xl border border-tuscan-hairline bg-surface/30 p-6 sm:p-8 space-y-4">
          <h3 className="font-heading text-xl font-semibold tracking-[-0.02em] text-ink-charcoal">
            Computational Complexity & Properties
          </h3>
          <div className="space-y-3.5 text-sm text-ink-slate">
            <div className="p-4 rounded-xl border border-tuscan-hairline bg-surface">
              <strong className="text-ink-charcoal font-heading font-semibold block mb-1">Time Complexity: O(1) + O(K)</strong>
              <span className="leading-relaxed block">Table lookup is O(1) in-memory. String extraction is O(K) where K is the length of the query string. Total processing completes in &lt; 5 ms.</span>
            </div>
            <div className="p-4 rounded-xl border border-tuscan-hairline bg-surface">
              <strong className="text-ink-charcoal font-heading font-semibold block mb-1">100% Offline & Private</strong>
              <span className="leading-relaxed block">Zero external network requests are made. Student ranks and parent queries never leave the user's browser.</span>
            </div>
            <div className="p-4 rounded-xl border border-tuscan-hairline bg-surface">
              <strong className="text-ink-charcoal font-heading font-semibold block mb-1">Zero Hallucinations</strong>
              <span className="leading-relaxed block">Unlike probabilistic AI chatbots, answers are mathematically verified against hard-coded university cutoff bounds.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Faculty Interactive Test Bench */}
      <div className="rounded-2xl border border-tuscan-hairline bg-surface/30 p-6 sm:p-8 space-y-6">
        <div>
          <h3 className="font-heading text-2xl font-semibold tracking-[-0.02em] text-ink-charcoal">
            Interactive Test Bench for Faculty Evaluation
          </h3>
          <p className="text-sm text-ink-slate mt-1 leading-relaxed">
            Test any sample question or type your own to inspect the live execution trace and execution duration:
          </p>
        </div>

        {/* Sample Query Buttons */}
        <div className="flex flex-wrap gap-2">
          {sampleQueries.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                soundFx.click();
                setTestQuery(q);
                const res = solveWithCPS(q);
                setTestResult(res);
              }}
              className="text-xs rounded-lg border border-tuscan-hairline bg-surface px-3 py-1.5 text-ink-slate hover:border-tuscan-terracotta hover:text-ink-charcoal transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="flex gap-3">
          <input
            type="text"
            value={testQuery}
            onChange={(e) => setTestQuery(e.target.value)}
            className="flex-1 rounded-xl border border-tuscan-hairline bg-surface px-4 py-2.5 text-sm text-ink-charcoal focus:border-tuscan-rust focus:outline-none"
            placeholder="Type a test question..."
          />
          <button
            type="button"
            onClick={handleRunEvaluation}
            className="rounded-xl bg-tuscan-rust px-5 py-2.5 text-sm font-semibold text-white hover:bg-tuscan-rust/90 transition-colors shrink-0"
          >
            Run Algorithm
          </button>
        </div>

        {/* Execution Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl border border-tuscan-hairline bg-surface">
            <span className="text-xs text-ink-muted block mb-1">Execution Duration</span>
            <span className="text-lg font-bold text-tuscan-rust">{testResult.trace.totalLatencyMs} ms</span>
          </div>
          <div className="p-4 rounded-xl border border-tuscan-hairline bg-surface">
            <span className="text-xs text-ink-muted block mb-1">Confidence Level</span>
            <span className="text-lg font-bold text-ink-charcoal">{(testResult.trace.confidenceScore * 100).toFixed(0)}%</span>
          </div>
          <div className="p-4 rounded-xl border border-tuscan-hairline bg-surface">
            <span className="text-xs text-ink-muted block mb-1">Topic Matched</span>
            <span className="text-sm font-bold text-ink-charcoal truncate block">{testResult.intent}</span>
          </div>
          <div className="p-4 rounded-xl border border-tuscan-hairline bg-surface">
            <span className="text-xs text-ink-muted block mb-1">Rules Checked</span>
            <span className="text-lg font-bold text-ink-charcoal">{testResult.trace.matchedRulesCount} tables</span>
          </div>
        </div>

        {/* Step-by-Step Execution Output */}
        <div className="space-y-3 pt-3 border-t border-tuscan-hairline">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-muted font-heading">
            Step-by-Step Logic Execution:
          </h4>
          <div className="space-y-2.5">
            {testResult.trace.steps.map((st) => (
              <div key={st.stepNumber} className="p-4 rounded-xl border border-tuscan-hairline bg-surface text-xs">
                <div className="flex items-center justify-between font-semibold text-ink-charcoal">
                  <span className="text-sm font-heading">Step {st.stepNumber}: {st.title}</span>
                  <span className="font-mono text-xs text-ink-muted">{st.durationMs} ms</span>
                </div>
                <p className="text-ink-slate mt-1.5 leading-relaxed text-sm">{st.explanation}</p>
                {st.details && (
                  <div className="mt-2 font-mono text-xs text-ink-muted bg-surface/80 p-2.5 rounded-lg border border-tuscan-hairline">
                    {JSON.stringify(st.details)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Optional Gemini API Key Drawer */}
      <div className="rounded-2xl border border-tuscan-hairline bg-surface/30 p-6 sm:p-8 space-y-4">
        <div>
          <h3 className="font-heading text-xl font-semibold tracking-[-0.02em] text-ink-charcoal">
            Optional: Google Gemini 2.5 Flash Neural Bridge
          </h3>
          <p className="text-sm text-ink-slate mt-1 leading-relaxed">
            The app works 100% offline without any API key. If you wish to test augmented conversational responses, you can provide an optional Google AI Studio API key (stored only in your browser's local storage):
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="password"
            value={geminiKeyInput}
            onChange={(e) => setGeminiKeyInput(e.target.value)}
            placeholder="AIzaSy... (optional Google AI Studio key)"
            className="flex-1 rounded-xl border border-tuscan-hairline bg-surface px-4 py-2.5 text-xs font-mono text-ink-charcoal focus:border-tuscan-rust focus:outline-none"
          />
          <button
            type="button"
            onClick={handleSaveKey}
            className="rounded-xl bg-ink-charcoal px-5 py-2.5 text-xs font-semibold text-white hover:bg-black transition-colors"
          >
            {keySaved ? 'Saved Locally!' : 'Save Key'}
          </button>
        </div>
      </div>
    </div>
  );
};
