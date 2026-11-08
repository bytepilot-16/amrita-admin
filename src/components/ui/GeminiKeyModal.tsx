import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Key, X, Check, Trash2, Info } from 'lucide-react';

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
          className="w-full max-w-md rounded-2xl border border-[#E2DCD0] bg-white p-6 shadow-paper"
        >
          <div className="flex items-center justify-between border-b border-[#E2DCD0] pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Key className="h-4 w-4 text-[#9E1B34]" />
              <h3 className="font-serif text-lg font-bold text-[#141413]">
                Optional Google Gemini API Key
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1 text-[#8C857B] hover:bg-[#FAF8F5] hover:text-[#141413]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <p className="text-xs text-[#57534E] leading-relaxed mb-4">
            This guide works <strong>100% offline</strong> using built-in university cutoff rules. You can optionally provide a Google AI Studio API key to test neural conversational responses. The key is stored only on your own device in <code>localStorage</code>.
          </p>

          <div className="space-y-3">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#57534E] mb-1">
                API Key (starts with AIzaSy...)
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Paste key here..."
                className="w-full rounded-xl border border-[#E2DCD0] bg-[#FAF8F5] px-3 py-2 text-xs font-mono text-[#141413] focus:border-[#9E1B34] focus:outline-none"
              />
            </div>

            <div className="rounded-xl border border-[#E2DCD0] bg-[#FAF8F5] p-3 text-[11px] text-[#57534E] flex items-start gap-2">
              <Info className="h-3.5 w-3.5 text-[#8C857B] shrink-0 mt-0.5" />
              <span>
                Zero key required for standard use. All fee calculations, mess menus, bus routes, and hostel rules run locally with zero latency.
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6 pt-3 border-t border-[#E2DCD0]">
            {apiKey ? (
              <button
                type="button"
                onClick={handleClear}
                className="text-xs text-rose-700 hover:underline"
              >
                Remove saved key
              </button>
            ) : <span />}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-1.5 rounded-lg border border-[#E2DCD0] text-xs font-medium text-[#57534E] hover:bg-[#FAF8F5]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#9E1B34] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#7D1529] transition-colors"
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
