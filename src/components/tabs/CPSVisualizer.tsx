import React, { useState } from 'react';
import {
  Check,
  ArrowRight,
  Terminal,
  Key,
  ShieldCheck,
} from 'lucide-react';
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
    <div className="w-full max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      {/* Page Title & Academic Context */}
      <div>
        <span className="font-mono text-xs uppercase tracking-wider text-[#8C857B]">
          Computational Problem Solving (CPS) • Academic Project Documentation
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#141413] mt-1">
          How It Works: System Architecture
        </h1>
        <p className="mt-2 text-sm text-[#57534E] max-w-3xl leading-relaxed">
          This system was designed to solve a real student problem: navigating through 200+ pages of admissions PDFs and cutoff matrices. It combines a local deterministic constraint engine with natural language intent recognition to provide instant, verified answers with zero external API dependencies.
        </p>
      </div>

      {/* 4-Step Algorithmic Pipeline Cards */}
      <div className="rounded-2xl border border-[#E2DCD0] bg-white p-6 shadow-paper space-y-6">
        <div>
          <h2 className="font-serif text-xl font-bold text-[#141413]">
            The 4-Step Computational Pipeline
          </h2>
          <p className="text-xs text-[#57534E] mt-0.5">
            Every question submitted in chat passes through four deterministic processing stages in under 5 milliseconds.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
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
            <div key={st.step} className="p-4 rounded-xl border border-[#E2DCD0] bg-[#FAF8F5] flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-[#9E1B34] block mb-1">
                  Step {st.step}
                </span>
                <h3 className="font-semibold text-xs text-[#141413]">
                  {st.title}
                </h3>
                <span className="font-mono text-[10px] text-[#8C857B] block mt-0.5">
                  {st.method}
                </span>
                <p className="text-xs text-[#57534E] mt-2 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decision Logic & Complexity Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-[#E2DCD0] bg-white p-6 shadow-paper space-y-3">
          <h3 className="font-serif text-lg font-bold text-[#141413]">
            Cutoff Decision Logic (Pseudocode)
          </h3>
          <p className="text-xs text-[#57534E]">
            How candidate rank is mapped to merit scholarship slabs:
          </p>
          <pre className="font-mono text-xs leading-relaxed p-4 rounded-xl bg-[#FAF8F5] border border-[#E2DCD0] text-[#141413] overflow-x-auto">
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

        <div className="rounded-2xl border border-[#E2DCD0] bg-white p-6 shadow-paper space-y-4">
          <h3 className="font-serif text-lg font-bold text-[#141413]">
            Computational Complexity & Properties
          </h3>
          <div className="space-y-3 text-xs text-[#57534E]">
            <div className="p-3 rounded-xl border border-[#E2DCD0] bg-[#FAF8F5]">
              <strong className="text-[#141413] block mb-0.5">Time Complexity: O(1) + O(K)</strong>
              <span>Table lookup is O(1) in-memory. String extraction is O(K) where K is the length of the query string. Total processing completes in &lt; 5 ms.</span>
            </div>
            <div className="p-3 rounded-xl border border-[#E2DCD0] bg-[#FAF8F5]">
              <strong className="text-[#141413] block mb-0.5">100% Offline & Private</strong>
              <span>Zero external network requests are made. Student ranks and parent queries never leave the user's browser.</span>
            </div>
            <div className="p-3 rounded-xl border border-[#E2DCD0] bg-[#FAF8F5]">
              <strong className="text-[#141413] block mb-0.5">Zero Hallucinations</strong>
              <span>Unlike probabilistic AI chatbots, answers are mathematically verified against hard-coded university cutoff bounds.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Faculty Interactive Test Bench */}
      <div className="rounded-2xl border border-[#E2DCD0] bg-white p-6 shadow-paper space-y-4">
        <div>
          <h3 className="font-serif text-xl font-bold text-[#141413]">
            Interactive Test Bench for Faculty Evaluation
          </h3>
          <p className="text-xs text-[#57534E] mt-0.5">
            Test any sample question or type your own to inspect the live execution trace and execution duration:
          </p>
        </div>

        {/* Sample Query Buttons */}
        <div className="flex flex-wrap gap-1.5">
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
              className="text-xs rounded-lg border border-[#E2DCD0] bg-[#FAF8F5] px-3 py-1 text-[#57534E] hover:border-[#141413] hover:text-[#141413] transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="flex gap-2">
          <input
            type="text"
            value={testQuery}
            onChange={(e) => setTestQuery(e.target.value)}
            className="flex-1 rounded-xl border border-[#E2DCD0] bg-[#FAF8F5] px-4 py-2 text-xs text-[#141413] focus:border-[#9E1B34] focus:outline-none"
            placeholder="Type a test question..."
          />
          <button
            type="button"
            onClick={handleRunEvaluation}
            className="rounded-xl bg-[#9E1B34] px-4 py-2 text-xs font-semibold text-white hover:bg-[#7D1529] transition-colors"
          >
            Run Algorithm
          </button>
        </div>

        {/* Execution Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3 rounded-xl border border-[#E2DCD0] bg-[#FAF8F5]">
            <span className="text-[10px] text-[#8C857B] block">Execution Duration</span>
            <span className="text-sm font-bold text-[#15803D]">{testResult.trace.totalLatencyMs} ms</span>
          </div>
          <div className="p-3 rounded-xl border border-[#E2DCD0] bg-[#FAF8F5]">
            <span className="text-[10px] text-[#8C857B] block">Confidence Level</span>
            <span className="text-sm font-bold text-[#141413]">{(testResult.trace.confidenceScore * 100).toFixed(0)}%</span>
          </div>
          <div className="p-3 rounded-xl border border-[#E2DCD0] bg-[#FAF8F5]">
            <span className="text-[10px] text-[#8C857B] block">Topic Matched</span>
            <span className="text-sm font-bold text-[#141413]">{testResult.intent}</span>
          </div>
          <div className="p-3 rounded-xl border border-[#E2DCD0] bg-[#FAF8F5]">
            <span className="text-[10px] text-[#8C857B] block">Rules Checked</span>
            <span className="text-sm font-bold text-[#141413]">{testResult.trace.matchedRulesCount} tables</span>
          </div>
        </div>

        {/* Step-by-Step Execution Output */}
        <div className="space-y-2 pt-2 border-t border-[#E2DCD0]">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#57534E]">
            Step-by-Step Logic Execution:
          </h4>
          <div className="space-y-2">
            {testResult.trace.steps.map((st) => (
              <div key={st.stepNumber} className="p-3 rounded-xl border border-[#E2DCD0] bg-[#FAF8F5] text-xs">
                <div className="flex items-center justify-between font-semibold text-[#141413]">
                  <span>Step {st.stepNumber}: {st.title}</span>
                  <span className="font-mono text-[11px] text-[#8C857B]">{st.durationMs} ms</span>
                </div>
                <p className="text-[#57534E] mt-1">{st.explanation}</p>
                {st.details && (
                  <div className="mt-1.5 font-mono text-[11px] text-[#8C857B] bg-white p-2 rounded-lg border border-[#E2DCD0]">
                    {JSON.stringify(st.details)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Optional Gemini API Key Drawer */}
      <div className="rounded-2xl border border-[#E2DCD0] bg-white p-6 shadow-paper space-y-4">
        <div>
          <h3 className="font-serif text-lg font-bold text-[#141413]">
            Optional: Google Gemini 2.5 Flash Neural Bridge
          </h3>
          <p className="text-xs text-[#57534E] mt-0.5">
            The app works 100% offline without any API key. If you wish to test augmented conversational responses, you can provide an optional Google AI Studio API key (stored only in your browser's local storage):
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="password"
            value={geminiKeyInput}
            onChange={(e) => setGeminiKeyInput(e.target.value)}
            placeholder="AIzaSy... (optional Google AI Studio key)"
            className="flex-1 rounded-xl border border-[#E2DCD0] bg-[#FAF8F5] px-4 py-2 text-xs font-mono text-[#141413] focus:border-[#9E1B34] focus:outline-none"
          />
          <button
            type="button"
            onClick={handleSaveKey}
            className="rounded-xl bg-[#141413] px-4 py-2 text-xs font-semibold text-white hover:bg-black transition-colors"
          >
            {keySaved ? 'Saved Locally!' : 'Save Key'}
          </button>
        </div>
      </div>
    </div>
  );
};
