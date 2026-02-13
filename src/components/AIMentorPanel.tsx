import { useState, useEffect, useRef, useCallback } from 'react';
import { Bot, Send, X, Plus, Square } from 'lucide-react';
import type { AIMentorPanelProps, AIMessage } from '../types';
import { isAIConfigured, sendGuideMessage, AIError } from '../lib/ai';

// ── Mock Fallback ───────────────────────────────────────────

function getMockResponse(input: string, context: { module: number; moduleName: string }): AIMessage {
  let text = '';
  let task: { title: string; domain: string } | null = null;

  if (input.toLowerCase().includes('stuck') || input.toLowerCase().includes('help')) {
    text = `In the ${context.moduleName} phase, friction is normal. Remember, we are building the ${context.module === 2 ? 'Roots (Knowledge)' : 'Structure'}. What is one small ${context.module === 2 ? 'question you need answered' : 'action you can take'} today?`;
  } else if (input.toLowerCase().includes('plan') || input.toLowerCase().includes('task')) {
    text = `Excellent. Based on Module ${context.module}, I suggest we add a focused task to your Flow.`;
    task = { title: `Research: fundamentals`, domain: 'instructionalCurrent' };
  } else {
    text = 'That is a valuable observation. How does that align with your core ethics for this project?';
  }

  return { role: 'ai', text, task };
}

// ── Component ───────────────────────────────────────────────

const AIMentorPanel = ({
  isOpen, onClose, context, onAddTask,
  member, domainScores, chatHistory, onChatHistoryChange,
}: AIMentorPanelProps) => {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const useAI = isAIConfigured();

  // Generate greeting when history is empty and panel opens
  useEffect(() => {
    if (isOpen && chatHistory.length === 0) {
      const greeting: AIMessage = {
        role: 'ai',
        text: `Welcome back. You're working on "${context.title}" — currently in Module ${context.module}: ${context.moduleName}. What can I help you with?`,
      };
      onChatHistoryChange([greeting]);
    }
  }, [isOpen]);

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [chatHistory, isTyping]);

  const cancelRequest = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
    setIsTyping(false);
  }, []);

  const handleSend = useCallback(async () => {
    if (!input.trim() || isTyping) return;
    const userMsg: AIMessage = { role: 'user', text: input };
    const updated = [...chatHistory, userMsg];
    onChatHistoryChange(updated);
    setInput('');
    setIsTyping(true);

    if (!useAI) {
      // Mock fallback
      setTimeout(() => {
        const aiMsg = getMockResponse(input, context);
        onChatHistoryChange([...updated, aiMsg]);
        setIsTyping(false);
      }, 1500);
      return;
    }

    // Real AI call via proxy
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await sendGuideMessage(
        updated,
        member,
        domainScores,
        controller.signal,
      );
      const aiMsg: AIMessage = {
        role: 'ai',
        text: response.text,
        task: response.suggestedTask ?? null,
      };
      onChatHistoryChange([...updated, aiMsg]);
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        // User cancelled — don't add error message
        return;
      }
      let errorText = 'The Guide is resting. Try again in a moment.';
      if (err instanceof AIError) {
        if (err.code === 'RATE_LIMIT') {
          errorText = `The Guide needs a moment to rest. Try again in ${err.retryAfter ?? 30} seconds.`;
        } else if (err.code === 'AUTH') {
          errorText = 'The Guide cannot connect — please check your API configuration.';
        } else if (err.code === 'SAFETY') {
          errorText = 'The Guide could not respond to that. Try rephrasing your question.';
        }
      }
      const errorMsg: AIMessage = { role: 'ai', text: errorText };
      onChatHistoryChange([...updated, errorMsg]);
    } finally {
      abortRef.current = null;
      setIsTyping(false);
    }
  }, [input, isTyping, chatHistory, useAI, context, member, domainScores, onChatHistoryChange]);

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 bottom-0 w-full md:w-96 bg-[#2c2c2a] text-[#fdfbf7] shadow-2xl z-[100] flex flex-col animate-in slide-in-from-right duration-300">
      <div className="p-6 border-b border-[#fdfbf7]/10 flex justify-between items-center bg-[#2c2c2a]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#d4af37] flex items-center justify-center text-[#2c2c2a]">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="font-serif italic text-xl">The Guide</h3>
            <p className="text-[10px] uppercase tracking-widest opacity-50">
              {useAI ? 'AI Engine' : 'Demo Mode'}
            </p>
          </div>
        </div>
        <button onClick={onClose}><X size={20} className="opacity-50 hover:opacity-100" /></button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6" ref={scrollRef}>
        {chatHistory.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
              m.role === 'user'
                ? 'bg-[#d4af37] text-[#2c2c2a]'
                : 'bg-[#fdfbf7]/10 border border-[#fdfbf7]/5'
            }`}>
              {m.text}
              {m.task && (
                <div className="mt-3 pt-3 border-t border-current/20">
                  <p className="text-[10px] font-bold uppercase mb-2 opacity-70">Suggested Action</p>
                  <div className="bg-black/10 p-2 rounded flex justify-between items-center">
                    <span>{m.task.title}</span>
                    <button
                      onClick={() => onAddTask(m.task!)}
                      className="bg-white/20 hover:bg-white/40 p-1 rounded transition-colors"
                      title="Add to Flow"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center gap-2 text-xs opacity-50 italic">
            <span className="animate-pulse">The Guide is thinking...</span>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-[#fdfbf7]/10 bg-[#2c2c2a]">
        <div className="flex items-center gap-2 bg-[#fdfbf7]/5 rounded-xl p-2 border border-[#fdfbf7]/10 focus-within:border-[#d4af37] transition-colors">
          <input
            className="flex-1 bg-transparent outline-none px-2 text-sm placeholder:text-[#fdfbf7]/20"
            placeholder="Ask for guidance..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={isTyping}
          />
          {isTyping ? (
            <button
              onClick={cancelRequest}
              className="p-2 rounded-lg bg-red-500/80 text-white hover:bg-red-500 transition-colors"
              title="Cancel"
            >
              <Square size={16} />
            </button>
          ) : (
            <button
              onClick={handleSend}
              className="p-2 rounded-lg bg-[#d4af37] text-[#2c2c2a] hover:bg-white transition-colors"
            >
              <Send size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIMentorPanel;
