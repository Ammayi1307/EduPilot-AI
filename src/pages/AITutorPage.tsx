import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, User, Code, BookOpen, GraduationCap, Briefcase, Globe } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge, AIThinking } from '@/components/ui/Misc';
import { useApp } from '@/context/AppContext';
import { askTutor } from '@/services/aiService';
import type { ChatMessage } from '@/types';

const exampleQuestions = [
  'Explain dynamic programming like I\'m a beginner.',
  'Explain backpropagation with a real-world analogy.',
  'What is database normalization?',
  'How does the Two Sum problem work?',
];

const modes = ['Beginner', 'Intermediate', 'Advanced', 'Interview'];
const languages = ['English', 'Telugu', 'Hindi'];

const quickActions = [
  { label: 'Explain Simpler', icon: BookOpen },
  { label: 'Give Example', icon: Code },
  { label: 'Generate Quiz', icon: GraduationCap },
  { label: 'Practice', icon: Briefcase },
];

export function AITutorPage() {
  const { profile } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('Intermediate');
  const [language, setLanguage] = useState('English');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  async function send(question?: string) {
    const q = question || input.trim();
    if (!q || loading) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(36).slice(2),
      role: 'user',
      content: q,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const response = await askTutor(q, mode, language);
    const aiMsg: ChatMessage = {
      id: Math.random().toString(36).slice(2),
      role: 'ai',
      content: response,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, aiMsg]);
    setLoading(false);
  }

  return (
    <div className="space-y-4 h-[calc(100vh-7rem)] lg:h-[calc(100vh-9rem)] flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold font-display text-white">EduPilot AI Tutor</h1>
          <p className="text-sm text-gray-400">Personalized for {profile.name}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex gap-1 glass rounded-xl p-1">
            {modes.map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  mode === m ? 'bg-gradient-to-r from-brand-500 to-accent-500 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="glass rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none cursor-pointer"
          >
            {languages.map((l) => (
              <option key={l} value={l} className="bg-ink-900">{l}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Chat Area */}
      <Card className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center py-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500/30 to-accent-500/30 flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-brand-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Ask EduPilot AI anything</h3>
              <p className="text-sm text-gray-400 mb-6 max-w-md">
                I understand your learning profile and adapt explanations to your level. Try one of these:
              </p>
              <div className="grid sm:grid-cols-2 gap-2 max-w-2xl w-full">
                {exampleQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="glass rounded-xl p-3 text-left text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-all glow-border-hover"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'ai' && (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              )}
              <div className={`max-w-[80%] rounded-2xl p-4 ${
                msg.role === 'user'
                  ? 'bg-gradient-to-r from-brand-500/20 to-accent-500/20 border border-brand-500/30'
                  : 'glass'
              }`}>
                {msg.role === 'user' ? (
                  <p className="text-sm text-white">{msg.content}</p>
                ) : (
                  <div className="text-sm text-gray-200 leading-relaxed whitespace-pre-wrap [&_code]:bg-ink-800 [&_code]:rounded-lg [&_code]:p-3 [&_code]:block [&_code]:my-2 [&_code]:text-xs [&_code]:text-brand-300 [&_code]:overflow-x-auto [&_strong]:text-white [&_strong]:font-semibold">
                    {formatAIContent(msg.content)}
                  </div>
                )}
                {msg.role === 'ai' && (
                  <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-white/8">
                    {quickActions.map((a) => (
                      <button
                        key={a.label}
                        onClick={() => send(a.label)}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg glass text-xs text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                      >
                        <a.icon className="w-3 h-3" />
                        {a.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-gray-300" />
                </div>
              )}
            </motion.div>
          ))}

          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="glass rounded-2xl p-4">
                <AIThinking text="EduPilot is thinking..." />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-white/8 p-4">
          <form
            onSubmit={(e) => { e.preventDefault(); send(); }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask EduPilot AI anything..."
              className="flex-1 px-4 py-3 rounded-xl glass text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40 transition-all"
            />
            <Button type="submit" disabled={loading || !input.trim()} icon={Send}>
              Send
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}

function formatAIContent(content: string) {
  const parts = content.split(/(```[\s\S]*?```)/g);
  return parts.map((part, i) => {
    if (part.startsWith('```')) {
      const code = part.replace(/```\w*\n?/, '').replace(/```$/, '');
      return (
        <pre key={i} className="bg-ink-800 rounded-lg p-3 my-2 overflow-x-auto">
          <code className="text-xs text-brand-300">{code}</code>
        </pre>
      );
    }
    // Bold formatting
    const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
    return (
      <span key={i}>
        {boldParts.map((bp, j) =>
          bp.startsWith('**') && bp.endsWith('**') ? (
            <strong key={j}>{bp.slice(2, -2)}</strong>
          ) : (
            <span key={j}>{bp}</span>
          )
        )}
      </span>
    );
  });
}
