import React, { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  Settings,
  HelpCircle,
} from 'lucide-react';

import { GeminiKeyModal } from './components/ui/GeminiKeyModal';
import { ChatTerminal } from './components/chat/ChatTerminal';
import { ChatMessage } from './components/chat/ChatMessageItem';
import { RankFeeSimulator } from './components/tabs/RankFeeSimulator';
import { HostelMessInspector } from './components/tabs/HostelMessInspector';
import { CPSVisualizer } from './components/tabs/CPSVisualizer';
import { solveWithCPS, queryGeminiWithCPS } from './lib/cpsEngine';
import { soundFx } from './lib/soundFx';

export type AppView = 'ask' | 'calculator' | 'campus-life' | 'how-it-works';

export function App() {
  const [activeView, setActiveView] = useState<AppView>('ask');
  const [isGeminiModalOpen, setIsGeminiModalOpen] = useState<boolean>(false);
  const [geminiApiKey, setGeminiApiKey] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Sync with browser URL hash for real navigation (#ask, #calculator, #campus-life, #how-it-works)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as AppView;
      if (['ask', 'calculator', 'campus-life', 'how-it-works'].includes(hash)) {
        setActiveView(hash);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    } else {
      window.location.hash = 'ask';
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update hash when activeView changes programmatically
  const navigateTo = (view: AppView) => {
    soundFx.tabSwitch();
    window.location.hash = view;
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Conversation state for Ask a Question view
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const welcome = solveWithCPS('Hello! Welcome to Amrita Chennai');
    return [
      {
        id: 'msg-welcome',
        sender: 'assistant',
        text: welcome.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        cpsData: welcome,
      },
    ];
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const key = localStorage.getItem('amrita_gemini_api_key');
    if (key) setGeminiApiKey(key);
  }, []);

  const handleSendMessage = async (query: string) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const localResult = solveWithCPS(query);
      let finalResult = localResult;

      if (geminiApiKey) {
        finalResult = await queryGeminiWithCPS(query, geminiApiKey, localResult);
      }

      const botMsg: ChatMessage = {
        id: finalResult.id,
        sender: 'assistant',
        text: finalResult.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        cpsData: finalResult,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Error generating response:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const navLinks: { id: AppView; label: string }[] = [
    { id: 'ask', label: 'Ask a Question' },
    { id: 'calculator', label: 'Fee & Rank Calculator' },
    { id: 'campus-life', label: 'Hostel, Mess & Campus Guide' },
    { id: 'how-it-works', label: 'How It Works (Project Info)' },
  ];

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#141413] flex flex-col font-sans selection:bg-[#9E1B34] selection:text-white">
      {/* Gemini Settings Modal */}
      <GeminiKeyModal
        isOpen={isGeminiModalOpen}
        onClose={() => setIsGeminiModalOpen(false)}
        onKeySaved={(k) => setGeminiApiKey(k)}
      />

      {/* Top Navigation Bar (Clean, human, real URL links, no neon status pills) */}
      <header className="sticky top-0 z-40 border-b border-[#E2DCD0] bg-[#FBF9F5]/95 backdrop-blur-md px-4 sm:px-8 py-3">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Left Brand Identity */}
          <div className="flex items-center gap-3">
            <a
              href="#ask"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('ask');
              }}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#9E1B34] text-white font-serif font-bold text-base shadow-xs">
                A
              </div>
              <div>
                <span className="font-serif text-base font-bold text-[#141413] group-hover:text-[#9E1B34] transition-colors leading-none block">
                  Amrita Vishwa Vidyapeetham
                </span>
                <span className="text-xs text-[#57534E] leading-none block mt-0.5">
                  Chennai Campus (Vengal) Admissions Helpdesk
                </span>
              </div>
            </a>
          </div>

          {/* Center Navigation Links (Real <a href="#..."> for back/forward support) */}
          <nav className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 text-xs font-medium">
            {navLinks.map((link) => {
              const isActive = activeView === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo(link.id);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#141413] text-[#FBF9F5] font-semibold'
                      : 'text-[#57534E] hover:text-[#141413] hover:bg-[#FAF8F5]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Controls: Subtle Sound & Key Settings (No neon pills!) */}
          <div className="hidden lg:flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={() => {
                const next = !soundEnabled;
                setSoundEnabled(next);
                soundFx.setEnabled(next);
                if (next) soundFx.click();
              }}
              className="p-1.5 rounded-lg text-[#57534E] hover:text-[#141413] hover:bg-[#FAF8F5] transition-colors"
              title={soundEnabled ? 'Mute click sounds' : 'Enable click sounds'}
            >
              {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>

            <button
              type="button"
              onClick={() => setIsGeminiModalOpen(true)}
              className="inline-flex items-center gap-1 text-[11px] text-[#57534E] hover:text-[#141413] px-2 py-1 rounded-md border border-[#E2DCD0] hover:border-[#141413] transition-colors"
            >
              <Settings className="h-3 w-3" />
              <span>{geminiApiKey ? 'Gemini Active' : 'API Key'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area (Spacious, full-page scrolling, no double-scrollbars!) */}
      <main className="flex-1">
        {activeView === 'ask' && (
          <ChatTerminal
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            onNavigateToCalculator={() => navigateTo('calculator')}
          />
        )}

        {activeView === 'calculator' && (
          <RankFeeSimulator
            onAskQuestion={(prompt) => {
              navigateTo('ask');
              handleSendMessage(prompt);
            }}
          />
        )}

        {activeView === 'campus-life' && (
          <HostelMessInspector
            onAskQuestion={(prompt) => {
              navigateTo('ask');
              handleSendMessage(prompt);
            }}
          />
        )}

        {activeView === 'how-it-works' && (
          <CPSVisualizer />
        )}
      </main>

      {/* Clean University Footer */}
      <footer className="border-t border-[#E2DCD0] bg-white py-6 px-4 sm:px-8 text-xs text-[#57534E]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-[#141413]">
              Amrita Vishwa Vidyapeetham • Chennai Campus
            </p>
            <p className="text-[11px] text-[#8C857B] mt-0.5">
              337/1A, Vengal Village, Tiruvallur Taluk &amp; District, Tamil Nadu 601103 • Admissions: +91 44 3553 9000
            </p>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <a
              href="#how-it-works"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('how-it-works');
              }}
              className="hover:text-[#141413] underline"
            >
              CPS Project Info
            </a>
            <button
              type="button"
              onClick={() => setIsGeminiModalOpen(true)}
              className="hover:text-[#141413] underline"
            >
              Configure Gemini Key
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
