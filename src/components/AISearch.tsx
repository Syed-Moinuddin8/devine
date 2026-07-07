import React, { useState, useEffect, useRef } from 'react';
import { Search, Mic, MicOff, Sparkles, X, ArrowRight, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';

interface AISearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  voiceActiveOnInit?: boolean;
}

export default function AISearch({
  isOpen,
  onClose,
  onSelectProduct,
  voiceActiveOnInit = false
}: AISearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'en-US';

      rec.onstart = () => {
        setIsListening(true);
        setErrorMsg(null);
      };

      rec.onresult = (e: any) => {
        const transcript = e.results[0][0].transcript;
        setSearchQuery(transcript);
        setIsListening(false);
        // Instant AI submission after voice recognition
        handleAISearchSubmit(null, transcript);
      };

      rec.onerror = (err: any) => {
        console.error('Speech recognition error:', err);
        setIsListening(false);
        setErrorMsg('Could not capture voice input. Try typing instead!');
      };

      rec.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
    }
  }, []);

  useEffect(() => {
    if (isOpen && voiceActiveOnInit) {
      handleToggleVoice();
    }
    if (!isOpen) {
      setSearchQuery('');
      setAiResponse(null);
      setRecommendedProducts([]);
      setIsListening(false);
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    }
  }, [isOpen, voiceActiveOnInit]);

  const handleToggleVoice = () => {
    if (!recognitionRef.current) {
      setErrorMsg('Speech recognition is not supported in this browser. Please use Chrome or Safari.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  const handleAISearchSubmit = async (e: React.FormEvent | null, overrideQuery?: string) => {
    if (e) e.preventDefault();
    const query = (overrideQuery || searchQuery).trim();
    if (!query) return;

    setAiLoading(true);
    setAiResponse(null);
    setRecommendedProducts([]);
    setErrorMsg(null);

    try {
      const response = await fetch(`/api/ai-search?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      
      if (data.success) {
        setAiResponse(data.recommendation);
        setRecommendedProducts(data.products || []);
      } else {
        setErrorMsg('AI styling is temporarily offline. Please search for literal keywords e.g. "Oversized", "Cargo".');
      }
    } catch (err) {
      console.error('AI Search Error:', err);
      setErrorMsg('Network error connecting to Gemini. Try searching catalog keywords.');
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/90"
          />

          {/* Dialog Panel */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="fixed inset-x-4 top-20 z-50 mx-auto max-w-2xl rounded-2xl bg-zinc-950 border border-zinc-900 p-6 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-900 pb-4 mb-6">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-brand-accent animate-pulse" />
                <h3 className="font-heading text-xl tracking-widest text-white uppercase">
                  AI STYLING CONCIERGE & SEARCH
                </h3>
              </div>
              <button
                id="close-ai-search-btn"
                className="rounded-lg text-zinc-400 hover:text-white p-2 border border-zinc-900"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Input Form with voice buttons */}
            <form onSubmit={(e) => handleAISearchSubmit(e)} className="relative flex items-center mb-4">
              <input
                type="text"
                autoFocus
                placeholder="Ask e.g. 'Suggest oversized styling with sneakers for college festival'..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl bg-black border border-zinc-900 px-5 py-4 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-brand-accent pr-24"
              />
              
              <div className="absolute right-3 flex items-center space-x-1.5">
                {/* Voice Mic toggle */}
                <button
                  type="button"
                  id="voice-mic-btn"
                  onClick={handleToggleVoice}
                  className={`p-2.5 rounded-lg border transition-colors cursor-pointer ${
                    isListening 
                      ? 'bg-red-600 text-white border-red-600 animate-pulse' 
                      : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                  }`}
                  title="Voice Style Search"
                >
                  {isListening ? <MicOff className="h-3.5 w-3.5" /> : <Mic className="h-3.5 w-3.5" />}
                </button>

                {/* Submit button */}
                <button
                  type="submit"
                  id="ai-submit-btn"
                  className="p-2.5 rounded-lg bg-brand-accent text-black hover:bg-white transition-colors cursor-pointer"
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </form>

            {/* Micro instructions / Voice hints */}
            <div className="flex items-center justify-between px-1 text-[10px] text-zinc-500 uppercase tracking-widest font-sans">
              <span>{isListening ? '🎙️ Listening... Speak your fashion request' : 'Type or use Voice to consult Gemini'}</span>
              <span>DEVINE BLY ARCHIVES</span>
            </div>

            {errorMsg && (
              <p className="text-[10px] text-red-500 font-sans tracking-wide mt-4 uppercase border-t border-zinc-950 pt-3">{errorMsg}</p>
            )}

            {/* AI Results Segment */}
            <div className="mt-6 max-h-96 overflow-y-auto space-y-6 pr-1 border-t border-zinc-900/60 pt-5">
              
              {/* Loader */}
              {aiLoading && (
                <div className="flex flex-col items-center justify-center py-10 space-y-3">
                  <div className="h-8 w-8 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
                  <p className="font-sans text-[10px] text-zinc-400 tracking-widest uppercase animate-pulse">Consulting Gemini Styling recommendations...</p>
                </div>
              )}

              {/* Gemini styling text response */}
              {aiResponse && (
                <div className="rounded-xl bg-zinc-900/40 p-4 border border-zinc-900 leading-normal text-xs font-sans text-zinc-300 space-y-3">
                  <div className="flex items-center space-x-2 text-brand-accent">
                    <Sparkles className="h-4 w-4" />
                    <span className="text-[10px] font-bold tracking-wider uppercase font-sans">STYLING DIRECTIVE</span>
                  </div>
                  <p className="whitespace-pre-line font-light leading-relaxed">{aiResponse}</p>
                </div>
              )}

              {/* Real products recommendations */}
              {recommendedProducts.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-sans text-[10px] font-bold tracking-widest text-zinc-400 uppercase">RECOMMENDED ARTICLES:</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {recommendedProducts.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          onSelectProduct(p);
                          onClose();
                        }}
                        className="flex items-center space-x-3 bg-black hover:bg-zinc-900 rounded-xl p-3 border border-zinc-900/60 hover:border-brand-accent/40 cursor-pointer transition-colors"
                      >
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="h-16 w-12 object-cover rounded-md"
                        />
                        <div className="min-w-0">
                          <p className="font-heading text-sm text-white tracking-wider line-clamp-1 uppercase">{p.name}</p>
                          <p className="font-sans text-[10px] text-zinc-400 mt-1 uppercase truncate">{p.category}</p>
                          <p className="font-sans text-xs text-brand-accent font-bold mt-1">₹{p.price.toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Empty default screen */}
              {!aiLoading && !aiResponse && !errorMsg && (
                <div className="text-center py-8 text-zinc-500 text-xs font-sans">
                  <MessageSquare className="h-8 w-8 mx-auto mb-3 text-zinc-700" />
                  <p className="uppercase tracking-wide font-medium">No active consulting session</p>
                  <p className="mt-1 leading-relaxed text-[11px] font-light text-zinc-600 max-w-sm mx-auto">
                    Try searching: "A modern relaxed oversized look for hot summer days" or "Suggest sneaker matches for heavy flannels."
                  </p>
                </div>
              )}

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
