import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Key, X, Check, Info } from 'lucide-react';

interface GeminiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKeySaved: (key: string | null) => void;
}

export const GeminiKeyModal: React.FC<GeminiKeyModalProps> = ({
  isOpen,
  onClose,
  onKeySaved,
}) => {
  const [apiKey, setApiKey] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const existing = localStorage.getItem('amrita_gemini_api_key') || '';
    setApiKey(existing);
  }, [isOpen]);

  const handleSave = () => {
    if (apiKey.trim()) {
      localStorage.setItem('amrita_gemini_api_key', apiKey.trim());
      onKeySaved(apiKey.trim());
    } else {
      localStorage.removeItem('amrita_gemini_api_key');
      onKeySaved(null);
    }
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  };

  const handleClear = () => {
    localStorage.removeItem('amrita_gemini_api_key');
    setApiKey('');
    onKeySaved(null);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="w-full max-w-md rounded-2xl border border-tuscan-hairline bg-parchment p-6 sm:p-7 shadow-paper"
        >
          <div className="flex items-center justify-between border-b border-tuscan-hairline pb-4 mb-4">
            <div className="flex items-center gap-2.5">
              <Key className="h-4 w-4 text-tuscan-rust" />
              <h3 className="font-heading text-lg font-semibold tracking-[-0.02em] text-ink-charcoal">
                Optional Google Gemini API Key
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1.5 text-ink-muted hover:bg-surface hover:text-ink-charcoal transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <p className="text-sm text-ink-slate leading-relaxed mb-4">
            This guide works <strong>100% offline</strong> using built-in university cutoff rules. You can optionally provide a Google AI Studio API key to test neural conversational responses. The key is stored only on your own device in <code className="font-mono text-xs text-tuscan-rust bg-surface px-1.5 py-0.5 rounded border border-tuscan-hairline">localStorage</code>.
          </p>

          <div className="space-y-3.5">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-ink-muted mb-1.5">
                API Key (starts with AIzaSy...)
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Paste key here..."
                className="w-full rounded-xl border border-tuscan-hairline bg-surface px-3.5 py-2.5 text-xs font-mono text-ink-charcoal focus:border-tuscan-rust focus:outline-none"
              />
            </div>

            <div className="rounded-xl border border-tuscan-hairline bg-surface p-3.5 text-xs text-ink-slate flex items-start gap-2.5 leading-relaxed">
              <Info className="h-4 w-4 text-ink-muted shrink-0 mt-0.5" />
              <span>
                Zero key required for standard use. All fee calculations, mess menus, bus routes, and hostel rules run locally with zero latency.
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6 pt-4 border-t border-tuscan-hairline">
            {apiKey ? (
              <button
                type="button"
                onClick={handleClear}
                className="text-xs text-tuscan-terracotta hover:underline font-medium"
              >
                Remove saved key
              </button>
            ) : <span />}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-tuscan-hairline text-xs font-medium text-ink-slate hover:bg-surface transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="inline-flex items-center gap-1.5 rounded-xl bg-tuscan-rust px-4 py-2 text-xs font-semibold text-white hover:bg-tuscan-rust/90 transition-colors"
              >
                {savedSuccess ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span>Saved</span>
                  </>
                ) : (
                  <span>Save Key</span>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
