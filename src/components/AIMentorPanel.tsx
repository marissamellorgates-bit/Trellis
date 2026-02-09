import { useState, useEffect, useRef } from 'react';
import { Bot, Send, X, Plus } from 'lucide-react';
import type { AIMentorPanelProps, AIMessage } from '../types';

const AIMentorPanel = ({ isOpen, onClose, context, onAddTask }: AIMentorPanelProps) => {
  const [messages, setMessages] = useState<AIMessage[]>([
    { role: 'ai', text: `Greetings. I am your Guide. I see you are cultivating a ${context.plant} for "${context.title}". You are currently in Module ${context.module}: ${context.moduleName}. How can I assist your growth today?` }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: AIMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let aiText = "";
      let suggestedTask: { title: string; domain: string } | null = null;

      if (input.toLowerCase().includes("stuck") || input.toLowerCase().includes("help")) {
        aiText = `In the ${context.moduleName} phase, friction is normal. Remember, we are building the ${context.module === 2 ? "Roots (Knowledge)" : "Structure"}. What is one small ${context.module === 2 ? "question you need answered" : "action you can take"} today?`;
      } else if (input.toLowerCase().includes("plan") || input.toLowerCase().includes("task")) {
        aiText = `Excellent. Based on Module ${context.module}, I suggest we add a focused task to your Flow.`;
        suggestedTask = { title: `Research: ${context.title} fundamentals`, domain: 'intellectual' };
      } else {
        aiText = "That is a valuable observation. How does that align with your core ethics for this project?";
      }

      const aiMsg: AIMessage = { role: 'ai', text: aiText, task: suggestedTask };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

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
            <p className="text-[10px] uppercase tracking-widest opacity-50">Trellis AI Engine</p>
          </div>
        </div>
        <button onClick={onClose}><X size={20} className="opacity-50 hover:opacity-100" /></button>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-6" ref={scrollRef}>
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-[#d4af37] text-[#2c2c2a]' : 'bg-[#fdfbf7]/10 border border-[#fdfbf7]/5'}`}>
              {m.text}
              {m.task && (
                <div className="mt-3 pt-3 border-t border-current/20">
                  <p className="text-[10px] font-bold uppercase mb-2 opacity-70">Suggested Action</p>
                  <div className="bg-black/10 p-2 rounded flex justify-between items-center">
                    <span>{m.task.title}</span>
                    <button
                      onClick={() => onAddTask(m.task!)}
                      className="bg-white/20 hover:bg-white/40 p-1 rounded transition-colors" title="Add to Flow"
                    >
                      <Plus size={14}/>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && <div className="text-xs opacity-50 italic animate-pulse">The Guide is thinking...</div>}
      </div>
      <div className="p-4 border-t border-[#fdfbf7]/10 bg-[#2c2c2a]">
        <div className="flex items-center gap-2 bg-[#fdfbf7]/5 rounded-xl p-2 border border-[#fdfbf7]/10 focus-within:border-[#d4af37] transition-colors">
          <input
            className="flex-1 bg-transparent outline-none px-2 text-sm placeholder:text-[#fdfbf7]/20"
            placeholder="Ask for guidance..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend} className="p-2 rounded-lg bg-[#d4af37] text-[#2c2c2a] hover:bg-white transition-colors">
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIMentorPanel;
