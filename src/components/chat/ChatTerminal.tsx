import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
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
    <div className="w-full max-w-3xl mx-auto py-6 px-4 sm:px-6">
      {/* Messages Stream */}
      <div className="space-y-4 min-h-[500px]">
        {/* Welcome Empty State Banner */}
        {messages.length <= 1 && (
          <div className="mb-10 text-center sm:text-left">
            <div className="mb-3">
              <span className="font-mono text-xs uppercase tracking-wider text-[#8C857B]">
                Amrita Vishwa Vidyapeetham • Chennai Campus (Vengal)
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#141413] mt-1">
                Admissions & Campus Guide
              </h1>
              <p className="mt-2 text-sm text-[#57534E] leading-relaxed max-w-2xl">
                Ask anything about B.Tech fee slabs, AEEE rank cutoffs, hostel rules, or daily mess food at the Vengal campus. Select a common question below or type your own.
              </p>
            </div>

            {/* 6 Clean Question Cards (No pastel icon boxes, no sparkles, clean 01-06 numbering) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-6">
              {QUESTION_STARTERS.map((starter) => (
                <button
                  key={starter.num}
                  type="button"
                  onClick={() => {
                    soundFx.click();
                    onSendMessage(starter.text);
                  }}
                  className="group flex items-start gap-3 rounded-xl border border-[#E2DCD0] bg-white p-3.5 text-left transition-all hover:border-[#141413] hover:shadow-paper-sm"
                >
                  <span className="font-mono text-xs font-semibold text-[#8C857B] group-hover:text-[#9E1B34] transition-colors mt-0.5">
                    {starter.num}
                  </span>
                  <div className="flex-1">
                    <span className="text-xs font-medium text-[#141413] group-hover:text-[#9E1B34] transition-colors leading-snug block">
                      {starter.text}
                    </span>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-[#8C857B] group-hover:text-[#141413] transition-colors shrink-0 mt-0.5" />
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
          <div className="flex items-center gap-2.5 p-4 my-2 text-xs text-[#57534E]">
            <RefreshCw className="h-3.5 w-3.5 animate-spin text-[#9E1B34]" />
            <span>Looking up campus records and cutoff rules...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Floating Centered Input Bar */}
      <div className="sticky bottom-6 mt-8 z-30">
        <form
          onSubmit={handleSubmit}
          className="relative flex items-center rounded-2xl border border-[#E2DCD0] bg-white/95 p-1.5 shadow-paper backdrop-blur-md"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask about AEEE rank cutoffs, CSE fee slabs, hostel rules, or mess food..."
            className="w-full bg-transparent py-2.5 pl-4 pr-24 text-sm text-[#141413] placeholder:text-[#8C857B] focus:outline-none"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isLoading}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#9E1B34] px-4 py-2 text-xs font-semibold text-white hover:bg-[#7D1529] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <span>Ask</span>
            <Send className="h-3 w-3" />
          </button>
        </form>
      </div>
    </div>
  );
};
