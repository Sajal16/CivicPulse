import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Bot, User, Sparkles, Loader2, MessageSquare } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { askElectionAssistant } from "../services/gemini";
import { cn } from "../lib/utils";
import { useAuth } from "../contexts/AuthContext";

interface Message {
  role: 'user' | 'model';
  text: string;
}

const SUGGESTED_QUESTIONS = [
  "How do I register to vote?",
  "What is a primary election?",
  "When is the next election day?",
  "How can I find my polling place?",
];

export function Assistant() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize with personalized message
  useEffect(() => {
    const name = user?.displayName?.split(' ')[0] || "";
    const greeting = name 
      ? `Hello ${name}! I'm CivicPulse, your personal election assistant. Ready to dive back into your voter journey?`
      : "Hello! I'm CivicPulse, your election assistant. How can I help you understand the voting process today?";
    
    setMessages([{ role: 'model', text: greeting }]);
  }, [user]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Get current progress for context
    const savedChecklist = localStorage.getItem('civicpulse_checklist');
    let context = { name: user?.displayName || undefined, progress: 0, completedTasks: [] as string[] };
    
    if (savedChecklist) {
      try {
        const tasks = JSON.parse(savedChecklist);
        const completed = tasks.filter((t: any) => t.completed);
        context.progress = Math.round((completed.length / tasks.length) * 100);
        context.completedTasks = completed.map((t: any) => t.label);
      } catch (e) {
        console.error("Context parsing error", e);
      }
    }

    const response = await askElectionAssistant(text, messages, context);
    
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  return (
    <section id="assistant" className="py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-4xl font-bold tracking-tight text-slate-900">Election Assistant</h2>
          <p className="mt-2 text-lg text-slate-500">Instant answers to your voting questions.</p>
        </div>

        <div className="flex h-[600px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          {/* Chat Header */}
          <div className="flex items-center gap-4 border-b border-slate-100 bg-white px-8 py-5">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-600 text-white text-xs font-bold">
              C
            </div>
            <div>
              <h3 className="font-bold text-slate-900">CivicPulse AI</h3>
              <div className="text-[10px] uppercase font-bold tracking-widest text-emerald-500">Assistant Online</div>
            </div>
          </div>

          {/* Messages Area */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50/50"
          >
            {messages.map((message, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "flex items-start gap-4",
                  message.role === 'user' ? "flex-row-reverse" : ""
                )}
              >
                <div className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white font-bold text-xs shadow-sm",
                  message.role === 'user' ? "bg-slate-900" : "bg-blue-600"
                )}>
                  {message.role === 'user' ? 'U' : 'C'}
                </div>
                <div className={cn(
                  "max-w-[80%] rounded-xl px-5 py-4",
                  message.role === 'user' 
                    ? "bg-white border border-slate-200 text-slate-900 shadow-sm" 
                    : "bg-white border border-slate-200 text-slate-700 shadow-sm"
                )}>
                  <div className="prose prose-sm prose-slate max-w-none">
                    <ReactMarkdown>{message.text}</ReactMarkdown>
                  </div>
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-start gap-4"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white text-xs font-bold">
                  C
                </div>
                <div className="bg-white border border-slate-200 rounded-xl px-5 py-4 shadow-sm">
                  <Loader2 size={16} className="animate-spin text-blue-600" />
                </div>
              </motion.div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-6 bg-white border-t border-slate-100">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="relative flex items-center"
            >
              <label htmlFor="assistant-input" className="sr-only">Ask a question to the election assistant</label>
              <input
                id="assistant-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask registration rules, local deadlines..."
                className="w-full rounded-xl border border-slate-200 pl-5 pr-14 py-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-0 transition-all bg-slate-50 focus:bg-white"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
                className="absolute right-2.5 h-10 px-4 flex items-center justify-center rounded-lg bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-50 transition-all font-bold text-xs uppercase tracking-widest"
              >
                {isLoading ? <Loader2 size={14} className="animate-spin" aria-hidden="true" /> : "Send"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
