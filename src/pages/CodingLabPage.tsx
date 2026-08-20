import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Sparkles, Brain, Lightbulb, Zap, FileCode, Check, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge, AIThinking } from '@/components/ui/Misc';
import { useApp } from '@/context/AppContext';
import { codingProblem, codeTemplates } from '@/data/mockData';
import { analyzeCode } from '@/services/aiService';
import type { CodeReview } from '@/types';

const languages = ['Python', 'Java', 'JavaScript', 'C++'];

export function CodingLabPage() {
  const { showToast } = useApp();
  const [language, setLanguage] = useState('Python');
  const [code, setCode] = useState(codeTemplates['Python']);
  const [review, setReview] = useState<CodeReview | null>(null);
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState<string>('');

  function switchLanguage(lang: string) {
    setLanguage(lang);
    setCode(codeTemplates[lang] || '');
    setReview(null);
  }

  async function handleAnalyze() {
    setLoading(true);
    setAction('Analyze Code');
    const result = await analyzeCode(code, language);
    setReview(result);
    setLoading(false);
    setAction('');
    showToast('success', 'AI code review complete!');
  }

  async function handleAction(act: string) {
    setLoading(true);
    setAction(act);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setAction('');
    showToast('success', `${act} complete!`);
  }

  function handleRun() {
    showToast('info', 'Running code... Output: [0, 1]');
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold font-display text-white">AI Coding Lab</h1>
        <p className="mt-2 text-gray-400">Write code, get instant AI-powered analysis and feedback.</p>
      </div>

      {/* Problem */}
      <Card>
        <CardContent>
          <div className="flex items-center gap-2 mb-3">
            <Badge color="brand">Problem</Badge>
            <Badge color="success">Easy</Badge>
          </div>
          <h2 className="text-xl font-bold font-display text-white mb-2">{codingProblem.title}</h2>
          <p className="text-sm text-gray-300 leading-relaxed mb-3">{codingProblem.description}</p>
          <div className="glass rounded-xl p-3">
            <p className="text-xs text-gray-500 mb-1">Example:</p>
            <pre className="text-xs text-brand-300 whitespace-pre-wrap">{codingProblem.example}</pre>
          </div>
        </CardContent>
      </Card>

      {/* Editor */}
      <Card>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-1 glass rounded-xl p-1">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => switchLanguage(lang)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    language === lang ? 'bg-gradient-to-r from-brand-500 to-accent-500 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
            <Button size="sm" variant="secondary" icon={Play} onClick={handleRun}>Run</Button>
          </div>

          {/* Code textarea */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-10 glass border-r border-white/8 flex flex-col items-center pt-3 text-xs text-gray-600 select-none">
              {code.split('\n').map((_, i) => (
                <div key={i} className="leading-6">{i + 1}</div>
              ))}
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className="w-full pl-12 pr-4 py-3 bg-transparent text-sm font-mono text-brand-200 focus:outline-none resize-none min-h-[240px] leading-6"
              style={{ tabSize: 4 }}
            />
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2 mt-4">
            <Button size="sm" icon={Sparkles} onClick={handleAnalyze} loading={loading && action === 'Analyze Code'}>
              Analyze Code
            </Button>
            <Button size="sm" variant="secondary" icon={Brain} onClick={() => handleAction('Explain')} loading={loading && action === 'Explain'}>
              Explain
            </Button>
            <Button size="sm" variant="secondary" icon={Zap} onClick={() => handleAction('Optimize')} loading={loading && action === 'Optimize'}>
              Optimize
            </Button>
            <Button size="sm" variant="secondary" icon={FileCode} onClick={() => handleAction('Generate Test Cases')} loading={loading && action === 'Generate Test Cases'}>
              Generate Test Cases
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* AI Review */}
      <AnimatePresence>
        {loading && !review && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Card>
              <CardContent className="flex items-center justify-center py-8">
                <AIThinking text={`AI is ${action.toLowerCase()}...`} />
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {review && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card glow>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500/30 to-accent-500/30 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-brand-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">AI Code Review</h3>
              </div>

              <div className="grid sm:grid-cols-3 gap-3 mb-4">
                <div className="glass rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Correctness</p>
                  <p className="text-2xl font-bold font-display text-white">{review.correctness}%</p>
                  <div className="mt-2 h-1.5 rounded-full bg-white/8 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${review.correctness}%` }}
                      transition={{ duration: 1 }}
                      className={`h-full rounded-full ${review.correctness >= 80 ? 'bg-success-500' : 'bg-warning-500'}`}
                    />
                  </div>
                </div>
                <div className="glass rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Time Complexity</p>
                  <p className="text-2xl font-bold font-display text-electric-400">{review.timeComplexity}</p>
                </div>
                <div className="glass rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Space Complexity</p>
                  <p className="text-2xl font-bold font-display text-accent-400">{review.spaceComplexity}</p>
                </div>
              </div>

              <div className="glass rounded-xl p-4 border border-brand-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-4 h-4 text-brand-400" />
                  <span className="text-sm font-semibold text-white">AI Feedback</span>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">{review.feedback}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
