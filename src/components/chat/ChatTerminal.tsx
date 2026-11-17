import React, { useState, useRef, useEffect } from 'react';
import { Send, ArrowRight, RefreshCw } from 'lucide-react';
import { ChatMessageItem, ChatMessage } from './ChatMessageItem';
import { soundFx } from '../../lib/soundFx';

interface ChatTerminalProps {
  messages: ChatMessage[];
  onSendMessage: (query: string) => void;
  isLoading: boolean;
  onNavigateToCalculator: () => void;
}

export const ChatTerminal: React.FC<ChatTerminalProps> = ({
  messages,
  onSendMessage,
  isLoading,
  onNavigateToCalculator,
}) => {
  const [inputQuery, setInputQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (messages.length > 1) {
      scrollToBottom();
    }
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim() || isLoading) return;
    soundFx.click();
    onSendMessage(inputQuery.trim());
    setInputQuery('');
  };

  const QUESTION_STARTERS = [
    { num: '01', text: 'What fee slab will I get with an AEEE rank of 5,400 in CSE?' },
    { num: '02', text: 'What are the hostel room rules and gate timings at Chennai?' },
    { num: '03', text: 'What are the cutoff differences between CSE Core and AI & Data Science?' },
    { num: '04', text: 'What is served in the daily vegetarian mess and what are meal times?' },
    { num: '05', text: 'What is the formal dress code and what should freshers pack?' },
    { num: '06', text: 'How do I reach the Vengal campus by college bus or train?' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto py-10 px-4 sm:px-8">
      {/* Messages Stream */}
      <div className="space-y-6 min-h-[520px]">
        {/* Welcome Empty State Banner */}
        {messages.length <= 1 && (
          <div className="mb-12">
            <div className="mb-8 border-b border-tuscan-hairline pb-8">
              <span className="font-mono text-xs uppercase tracking-wider text-ink-muted block mb-2">
                Amrita Vishwa Vidyapeetham • Chennai Campus (Vengal)
              </span>
              <h1 className="font-heading text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-ink-charcoal">
                Admissions & Campus Guide
              </h1>
              <p className="mt-3 text-base text-ink-slate leading-[1.65] max-w-2xl">
                Ask anything about B.Tech fee slabs, AEEE rank cutoffs, hostel rules, or daily mess food at the Vengal campus. Select a common question below or type your own.
              </p>
            </div>

            {/* 6 Clean Question Cards (Editorial numbering, no icon boxes, subtle hairline borders) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {QUESTION_STARTERS.map((starter) => (
                <button
                  key={starter.num}
                  type="button"
                  onClick={() => {
                    soundFx.click();
                    onSendMessage(starter.text);
                  }}
                  className="group flex items-start gap-3.5 rounded-xl border border-tuscan-hairline bg-surface/50 p-4 text-left transition-all hover:border-tuscan-terracotta hover:bg-surface"
                >
                  <span className="font-mono text-xs font-semibold text-tuscan-rust group-hover:text-tuscan-terracotta transition-colors mt-0.5">
                    {starter.num}
                  </span>
                  <div className="flex-1">
                    <span className="text-sm font-medium text-ink-charcoal group-hover:text-tuscan-rust transition-colors leading-relaxed block">
                      {starter.text}
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-ink-muted group-hover:text-tuscan-rust transition-colors shrink-0 mt-0.5" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Message Items */}
        {messages.map((msg) => (
          <ChatMessageItem
            key={msg.id}
            message={msg}
            onSelectQuestion={(q) => onSendMessage(q)}
            onNavigateToCalculator={onNavigateToCalculator}
          />
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-center gap-3 py-4 text-sm text-ink-slate font-medium">
            <RefreshCw className="h-4 w-4 animate-spin text-tuscan-rust" />
            <span>Consulting campus records and cutoff matrices...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Centered Input Bar */}
      <div className="sticky bottom-6 mt-10 z-30">
        <form
          onSubmit={handleSubmit}
          className="relative flex items-center rounded-2xl border border-tuscan-hairline bg-parchment/95 p-2 shadow-paper backdrop-blur-md transition-all focus-within:border-tuscan-rust"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask about AEEE rank cutoffs, CSE fee slabs, hostel rules, or mess food..."
            className="w-full bg-transparent py-2.5 pl-4 pr-24 text-base text-ink-charcoal placeholder:text-ink-muted focus:outline-none"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isLoading}
            className="inline-flex items-center gap-1.5 rounded-xl bg-tuscan-rust px-5 py-2.5 text-sm font-semibold text-white hover:bg-tuscan-rust/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
          >
            <span>Ask</span>
            <Send className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
