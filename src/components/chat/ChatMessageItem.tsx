import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Volume2,
  VolumeX,
  ExternalLink,
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
      <div className="flex items-start justify-end my-4">
        <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-[#141413] px-4 py-3 text-sm text-[#FBF9F5] shadow-xs">
          <p className="leading-relaxed">{message.text}</p>
          <span className="font-mono text-[10px] text-[#A8A29E] block text-right mt-1.5">
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
    <div className="flex items-start gap-3.5 my-6">
      {/* Amrita Clean Monogram */}
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#9E1B34] text-white font-serif font-bold text-sm shadow-xs mt-0.5">
        A
      </div>

      <div className="flex-1 max-w-[92%] space-y-3">
        {/* Main Response Box */}
        <div className="rounded-2xl rounded-tl-sm border border-[#E2DCD0] bg-white p-5 sm:p-6 shadow-paper">
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-[#E2DCD0] pb-2.5 mb-4 text-xs text-[#57534E]">
            <span className="font-medium text-[#141413]">
              Amrita Admissions Guide
            </span>
            <div className="flex items-center gap-2 font-mono text-[11px] text-[#8C857B]">
              <button
                type="button"
                onClick={toggleSpeech}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-[#E2DCD0] hover:border-[#141413] hover:text-[#141413] transition-colors"
                title={isSpeaking ? 'Stop reading' : 'Read aloud'}
              >
                {isSpeaking ? <VolumeX className="h-3 w-3 text-[#9E1B34]" /> : <Volume2 className="h-3 w-3" />}
                <span>{isSpeaking ? 'Stop' : 'Read aloud'}</span>
              </button>
              <span>{message.timestamp}</span>
            </div>
          </div>

          {/* Formatted Content */}
          <MarkdownContent content={message.text} />

          {/* Inline Link Card to Fee Calculator if query was fee-related */}
          {isFeeQuery && (
            <div className="mt-4 p-4 rounded-xl border border-[#E2DCD0] bg-[#FAF8F5] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-xs font-semibold text-[#141413]">
                  Want to simulate different ranks or print an official fee slip?
                </h4>
                <p className="text-[11px] text-[#57534E] mt-0.5">
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
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#9E1B34] text-white text-xs font-medium hover:bg-[#7D1529] transition-colors shrink-0"
              >
                <span>Open Calculator</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          )}

          {/* Plain-English Calculation Logic Toggle */}
          {cps && cps.trace && (
            <div className="mt-4 pt-3 border-t border-[#E2DCD0]">
              <button
                type="button"
                onClick={() => setShowTrace(!showTrace)}
                className="flex items-center justify-between w-full text-left text-xs text-[#57534E] hover:text-[#141413] py-1 transition-colors"
              >
                <span className="font-medium">
                  {showTrace ? 'Hide calculation details' : 'See how this answer was calculated'}
                </span>
                <span className="text-[#8C857B]">
                  {showTrace ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                </span>
              </button>

              <AnimatePresence>
                {showTrace && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden mt-2 pt-2 border-t border-[#EAE4D9] text-xs text-[#57534E] space-y-2"
                  >
                    <p className="text-[11px] text-[#8C857B]">
                      This query was processed locally in your browser in {cps.trace.totalLatencyMs} ms using deterministic admissions rules:
                    </p>
                    <div className="space-y-1.5 pl-2 border-l-2 border-[#E2DCD0]">
                      {cps.trace.steps.map((st: CPSTraceStep) => (
                        <div key={st.stepNumber} className="text-[11px]">
                          <strong className="text-[#141413]">Step {st.stepNumber}: {st.title}</strong>
                          <div className="text-[#57534E]">{st.explanation}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Suggestion Follow-up Questions (Clean text buttons, no icon noise) */}
        {cps && cps.suggestedQuestions && cps.suggestedQuestions.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] text-[#8C857B] mr-1">Suggested:</span>
            {cps.suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectQuestion(q)}
                className="inline-flex items-center rounded-lg border border-[#E2DCD0] bg-white px-2.5 py-1 text-xs text-[#57534E] hover:border-[#141413] hover:text-[#141413] transition-colors"
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
