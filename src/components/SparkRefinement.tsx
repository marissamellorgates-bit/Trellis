import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ArrowUp, X, Loader2 } from 'lucide-react';
import { refineSparkGoal, AIError } from '../lib/ai';

interface SparkRefinementProps {
  initialSpark: string;
  onAcceptRefinedGoal: (goal: string, title?: string) => void;
  onCancel: () => void;
}

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

const SparkRefinement: React.FC<SparkRefinementProps> = ({ initialSpark, onAcceptRefinedGoal, onCancel }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [refinedGoal, setRefinedGoal] = useState('');
  const [suggestedTitle, setSuggestedTitle] = useState('');
  const [error, setError] = useState('');
  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  // On mount, send the initial spark as the first user message
  useEffect(() => {
    const initMessages: ChatMessage[] = [
      { role: 'user', text: `I want to work on this: ${initialSpark}` },
    ];
    setMessages(initMessages);
    sendToAI(initMessages);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const sendToAI = async (conversation: ChatMessage[]) => {
    setIsThinking(true);
    setError('');
    abortRef.current = new AbortController();

    try {
      const result = await refineSparkGoal(conversation, abortRef.current.signal);
      const aiMessage: ChatMessage = { role: 'model', text: result.text };
      setMessages(prev => [...prev, aiMessage]);

      if (result.refinedGoal) {
        setRefinedGoal(result.refinedGoal);
        if (result.suggestedTitle) setSuggestedTitle(result.suggestedTitle);
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      const msg = err instanceof AIError ? err.message : 'Something went wrong. Try again.';
      setError(msg);
    } finally {
      setIsThinking(false);
      abortRef.current = null;
    }
  };

  const handleSend = () => {
    const text = input.trim();
    if (!text || isThinking) return;
    setInput('');
    const userMessage: ChatMessage = { role: 'user', text };
    const updated = [...messages, userMessage];
    setMessages(updated);
    sendToAI(updated);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Clean up abort on unmount
  useEffect(() => {
    return () => { abortRef.current?.abort(); };
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-[#d4af37]" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">Refining with The Guide</span>
        </div>
        <button onClick={onCancel} className="text-[#fdfbf7]/50 hover:text-[#fdfbf7]/80 transition-colors">
          <X size={16} />
        </button>
      </div>

      {/* Chat messages */}
      <div ref={scrollRef} className="max-h-64 overflow-y-auto space-y-3 pr-1">
        {messages.map((msg, i) => (
          <div key={i} className={`text-sm rounded-xl px-4 py-3 ${
            msg.role === 'user'
              ? 'bg-[#d4af37]/20 text-[#d4af37] ml-8'
              : 'bg-[#fdfbf7]/5 text-[#fdfbf7]/80 mr-8'
          }`}>
            {msg.text}
          </div>
        ))}
        {isThinking && (
          <div className="bg-[#fdfbf7]/5 text-[#fdfbf7]/60 rounded-xl px-4 py-3 mr-8 flex items-center gap-2 text-sm">
            <Loader2 size={14} className="animate-spin" />
            Thinking...
          </div>
        )}
        {error && (
          <div className="text-red-400 text-xs px-4 py-2">{error}</div>
        )}
      </div>

      {/* Refined goal display */}
      {refinedGoal && (
        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">Suggested Goal</label>
          <textarea
            value={refinedGoal}
            onChange={e => setRefinedGoal(e.target.value)}
            className="w-full bg-[#fdfbf7]/5 border-2 border-[#d4af37] rounded-xl p-4 text-lg text-[#fdfbf7] focus:border-[#d4af37] outline-none resize-none"
            rows={3}
          />
          <p className="text-[10px] text-[#fdfbf7]/50 italic">Edit the goal above if you'd like, then accept it.</p>
          <div className="flex gap-3">
            <button
              onClick={() => onAcceptRefinedGoal(refinedGoal, suggestedTitle || undefined)}
              className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest bg-[#d4af37] text-[#2c2c2a] hover:bg-[#d4af37]/80 transition-all"
            >
              Accept Refined Goal
            </button>
            <button
              onClick={onCancel}
              className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#fdfbf7]/60 hover:text-[#fdfbf7] transition-all"
            >
              Back to editing
            </button>
          </div>
        </div>
      )}

      {/* Input row — hidden once a refined goal is shown */}
      {!refinedGoal && (
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your response..."
            className="flex-1 bg-[#fdfbf7]/5 border border-[#fdfbf7]/10 rounded-full px-4 py-2.5 text-sm text-[#fdfbf7] focus:border-[#d4af37] outline-none placeholder:text-[#fdfbf7]/20"
            disabled={isThinking}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isThinking}
            className="w-10 h-10 rounded-full bg-[#d4af37]/20 text-[#d4af37] flex items-center justify-center hover:bg-[#d4af37] hover:text-[#2c2c2a] transition-all disabled:opacity-20"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default SparkRefinement;
