import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { MarkdownContent } from './MarkdownContent';
import { CPSResponse, CPSTraceStep } from '../../lib/cpsEngine';
import { soundFx } from '../../lib/soundFx';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  cpsData?: CPSResponse;
}

interface ChatMessageItemProps {
  message: ChatMessage;
  onSelectQuestion: (question: string) => void;
  onNavigateToCalculator?: () => void;
}

export const ChatMessageItem: React.FC<ChatMessageItemProps> = ({
  message,
  onSelectQuestion,
  onNavigateToCalculator,
}) => {
  const [showTrace, setShowTrace] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const toggleSpeech = () => {
    soundFx.click();
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = message.text
      .replace(/[#*`_>|~-]/g, ' ')
      .replace(/\[.*?\]/g, '')
      .replace(/https?:\/\/\S+/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  if (message.sender === 'user') {
    return (
      <div className="flex items-start justify-end my-5">
        <div className="max-w-[85%] sm:max-w-[75%] rounded-2xl rounded-tr-sm bg-surface border border-tuscan-hairline px-5 py-3.5 text-base text-ink-charcoal leading-[1.65]">
          <p>{message.text}</p>
          <span className="font-mono text-xs text-ink-muted block text-right mt-1.5">
            {message.timestamp}
          </span>
        </div>
      </div>
    );
  }

  // Assistant Message
  const cps = message.cpsData;
  const isFeeQuery = cps?.intent === 'FEE_SLAB' || !!cps?.calculationSummary;

  return (
    <div className="flex items-start gap-4 my-7">
      {/* Amrita Monogram */}
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-tuscan-rust text-white font-heading font-bold text-base mt-0.5">
        A
      </div>

      <div className="flex-1 max-w-[94%] space-y-3.5">
        {/* Main Response Box */}
        <div className="rounded-2xl rounded-tl-sm border border-tuscan-hairline bg-surface/30 p-6 sm:p-7">
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-tuscan-hairline pb-3 mb-4 text-xs text-ink-slate">
            <span className="font-heading font-semibold text-ink-charcoal text-sm">
              Amrita Admissions Guide
            </span>
            <div className="flex items-center gap-2.5 font-mono text-xs text-ink-muted">
              <button
                type="button"
                onClick={toggleSpeech}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-tuscan-hairline hover:border-ink-charcoal hover:text-ink-charcoal transition-colors bg-surface/50"
                title={isSpeaking ? 'Stop reading' : 'Read aloud'}
              >
                {isSpeaking ? (
                  <VolumeX className="h-3.5 w-3.5 text-tuscan-rust" />
                ) : (
                  <Volume2 className="h-3.5 w-3.5" />
                )}
                <span>{isSpeaking ? 'Stop' : 'Read aloud'}</span>
              </button>
              <span>{message.timestamp}</span>
            </div>
          </div>

          {/* Formatted Markdown Content */}
          <MarkdownContent content={message.text} />

          {/* Inline Link Card to Fee Calculator if query was fee-related */}
          {isFeeQuery && (
            <div className="mt-5 p-4 sm:p-5 rounded-xl border border-tuscan-hairline bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-semibold font-heading text-ink-charcoal">
                  Want to test different ranks or print an official fee slip?
                </h4>
                <p className="text-xs text-ink-slate mt-1 leading-relaxed">
                  Open the interactive Fee & Rank Calculator to compare all 7 branches side-by-side.
                </p>
              </div>
              <a
                href="#calculator"
                onClick={(e) => {
                  if (onNavigateToCalculator) {
                    e.preventDefault();
                    onNavigateToCalculator();
                  }
                }}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-tuscan-rust text-white text-xs font-semibold hover:bg-tuscan-rust/90 transition-colors shrink-0"
              >
                <span>Open Calculator</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          )}

          {/* Calculation Logic Toggle */}
          {cps && cps.trace && (
            <div className="mt-5 pt-3.5 border-t border-tuscan-hairline">
              <button
                type="button"
                onClick={() => setShowTrace(!showTrace)}
                className="flex items-center justify-between w-full text-left text-xs font-medium text-ink-slate hover:text-ink-charcoal py-1 transition-colors"
              >
                <span>
                  {showTrace ? 'Hide calculation details' : 'See how this answer was calculated'}
                </span>
                <span className="text-ink-muted">
                  {showTrace ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </span>
              </button>

              <AnimatePresence>
                {showTrace && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden mt-3 pt-3 border-t border-tuscan-hairline/60 text-xs text-ink-slate space-y-2.5"
                  >
                    <p className="text-xs text-ink-muted">
                      This query was processed locally in your browser in {cps.trace.totalLatencyMs} ms using deterministic admissions rules:
                    </p>
                    <div className="space-y-2 pl-3 border-l-2 border-tuscan-hairline">
                      {cps.trace.steps.map((st: CPSTraceStep) => (
                        <div key={st.stepNumber} className="text-xs">
                          <strong className="text-ink-charcoal font-semibold block">
                            Step {st.stepNumber}: {st.title}
                          </strong>
                          <div className="text-ink-slate mt-0.5 leading-relaxed">{st.explanation}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Suggestion Follow-up Questions */}
        {cps && cps.suggestedQuestions && cps.suggestedQuestions.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs text-ink-muted mr-1">Suggested:</span>
            {cps.suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectQuestion(q)}
                className="inline-flex items-center rounded-lg border border-tuscan-hairline bg-surface/50 px-3 py-1.5 text-xs text-ink-slate hover:border-tuscan-terracotta hover:text-ink-charcoal hover:bg-surface transition-all"
              >
                <span>{q}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
