import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Settings } from 'lucide-react';

import { BRAND_CONFIG } from './config/brand';
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
  const [logoFailed, setLogoFailed] = useState<boolean>(false);

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

  const navigateTo = (view: AppView) => {
    soundFx.tabSwitch();
    window.location.hash = view;
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
    { id: 'campus-life', label: 'Campus Life Guide' },
    { id: 'how-it-works', label: 'How It Works' },
  ];

  return (
    <div className="min-h-screen bg-parchment text-ink-charcoal flex flex-col font-sans selection:bg-tuscan-rust selection:text-white">
      <GeminiKeyModal
        isOpen={isGeminiModalOpen}
        onClose={() => setIsGeminiModalOpen(false)}
        onKeySaved={(k) => setGeminiApiKey(k)}
      />

      {/* Top Navigation */}
      <header className="sticky top-0 z-40 border-b border-tuscan-hairline bg-parchment/95 backdrop-blur-md px-4 sm:px-8 py-3">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <a
              href="#ask"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('ask');
              }}
              className="flex items-center gap-3 text-left group"
            >
              {!logoFailed ? (
                <img
                  src={BRAND_CONFIG.logoPath}
                  alt={BRAND_CONFIG.universityName}
                  onError={() => setLogoFailed(true)}
                  className="h-9 w-9 rounded-lg object-contain bg-tuscan-rust p-1"
                />
              ) : (
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-tuscan-rust text-white font-heading font-bold text-base shadow-sm">
                  A
                </div>
              )}
              <div>
                <span className="font-heading text-base font-semibold text-ink-charcoal group-hover:text-tuscan-rust transition-colors leading-none block tracking-[-0.02em]">
                  {BRAND_CONFIG.universityName}
                </span>
                <span className="text-xs text-ink-muted leading-none block mt-1">
                  {BRAND_CONFIG.campusName}
                </span>
              </div>
            </a>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 text-sm font-medium">
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
                      ? 'bg-tuscan-rust text-white font-semibold'
                      : 'text-ink-slate hover:text-ink-charcoal hover:bg-surface'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Controls */}
          <div className="hidden lg:flex items-center gap-2 text-sm">
            <button
              type="button"
              onClick={() => {
                const next = !soundEnabled;
                setSoundEnabled(next);
                soundFx.setEnabled(next);
                if (next) soundFx.click();
              }}
              className="p-1.5 rounded-lg text-ink-muted hover:text-ink-charcoal hover:bg-surface transition-colors"
              title={soundEnabled ? 'Mute click sounds' : 'Enable click sounds'}
            >
              {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>

            <button
              type="button"
              onClick={() => setIsGeminiModalOpen(true)}
              className="inline-flex items-center gap-1 text-sm text-ink-slate hover:text-ink-charcoal px-2 py-1 rounded-md border border-tuscan-hairline hover:border-ink-charcoal transition-colors"
            >
              <Settings className="h-3.5 w-3.5" />
              <span>{geminiApiKey ? 'Gemini Active' : 'API Key'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
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

      {/* Footer */}
      <footer className="border-t border-tuscan-hairline bg-surface py-6 px-4 sm:px-8 text-sm text-ink-slate">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-heading font-semibold text-ink-charcoal tracking-[-0.02em]">
              {BRAND_CONFIG.universityName}
            </p>
            <p className="text-xs text-ink-muted mt-0.5">
              337/1A, Vengal Village, Tiruvallur District, Tamil Nadu 601103
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a
              href="#how-it-works"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('how-it-works');
              }}
              className="hover:text-tuscan-rust underline transition-colors"
            >
              How this works
            </a>
            <button
              type="button"
              onClick={() => setIsGeminiModalOpen(true)}
              className="hover:text-tuscan-rust underline transition-colors"
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
