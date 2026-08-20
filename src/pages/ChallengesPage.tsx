import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Clock, Play, Check, X, ArrowRight, Trophy, Brain, RotateCcw } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Misc';
import { ProgressBar } from '@/components/ui/Progress';
import { useApp } from '@/context/AppContext';
import { quizQuestions } from '@/data/mockData';
import { analyzeQuizResult } from '@/services/aiService';
import type { QuizResult } from '@/types';

type Phase = 'intro' | 'quiz' | 'result';

export function ChallengesPage() {
  const { showToast } = useApp();
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(false);

  function startChallenge() {
    setPhase('quiz');
    setCurrentQ(0);
    setAnswers([]);
    setSelected(null);
  }

  function submitAnswer() {
    if (selected === null) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setSelected(null);
    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      finishChallenge(newAnswers);
    }
  }

  async function finishChallenge(finalAnswers: number[]) {
    setLoading(true);
    setPhase('result');
    const r = await analyzeQuizResult(finalAnswers, quizQuestions);
    setResult(r);
    setLoading(false);
  }

  function reset() {
    setPhase('intro');
    setResult(null);
    setAnswers([]);
    setSelected(null);
    setCurrentQ(0);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold font-display text-white">Daily AI Challenge</h1>
        <p className="mt-2 text-gray-400">Practice questions generated around your weak topics.</p>
      </div>

      <AnimatePresence mode="wait">
        {/* Intro */}
        {phase === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card glow>
              <CardContent>
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge color="brand"><Brain className="w-3 h-3" /> Adaptive</Badge>
                      <Badge color="electric">Today's Challenge</Badge>
                    </div>
                    <h2 className="text-2xl font-bold font-display text-white mb-2">SQL Joins</h2>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1.5 text-sm text-gray-400">
                        <Target className="w-4 h-4" /> {quizQuestions.length} questions
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-gray-400">
                        <Clock className="w-4 h-4" /> 10 minutes
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-gray-400">
                        <Trophy className="w-4 h-4" /> Adaptive difficulty
                      </div>
                    </div>
                  </div>
                  <Button size="lg" icon={Play} onClick={startChallenge}>Start Challenge</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Quiz */}
        {phase === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Question {currentQ + 1} of {quizQuestions.length}</span>
                  <Badge color="brand">SQL Joins</Badge>
                </div>
                <ProgressBar
                  value={((currentQ + 1) / quizQuestions.length) * 100}
                  showValue={false}
                />
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    {quizQuestions[currentQ].question}
                  </h3>
                  <div className="space-y-2">
                    {quizQuestions[currentQ].options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => setSelected(i)}
                        className={`w-full text-left p-3.5 rounded-xl transition-all flex items-center gap-3 ${
                          selected === i
                            ? 'bg-gradient-to-r from-brand-500/30 to-accent-500/30 border border-brand-500/40 text-white'
                            : 'glass text-gray-300 hover:text-white border border-transparent'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                          selected === i ? 'bg-brand-500 text-white' : 'bg-white/10 text-gray-400'
                        }`}>
                          {String.fromCharCode(65 + i)}
                        </div>
                        <span className="text-sm">{opt}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button variant="ghost" onClick={reset} icon={RotateCcw}>Exit</Button>
                  <Button onClick={submitAnswer} disabled={selected === null} iconRight={ArrowRight}>
                    {currentQ < quizQuestions.length - 1 ? 'Next Question' : 'Submit Challenge'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Result */}
        {phase === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {loading ? (
              <Card>
                <CardContent className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="w-12 h-12 mx-auto mb-4"
                    >
                      <Brain className="w-12 h-12 text-brand-400" />
                    </motion.div>
                    <p className="text-gray-400">AI analyzing your performance...</p>
                  </div>
                </CardContent>
              </Card>
            ) : result ? (
              <div className="space-y-4">
                {/* Score */}
                <Card glow>
                  <CardContent>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-500/30 to-accent-500/30 flex items-center justify-center mb-4">
                        <Trophy className="w-10 h-10 text-warning-400" />
                      </div>
                      <h2 className="text-3xl font-bold font-display text-white">
                        {result.score}/{result.total}
                      </h2>
                      <p className="text-gray-400 mt-1">Understanding: {result.understanding}%</p>
                      <div className="w-full max-w-xs mt-4">
                        <ProgressBar value={result.understanding} showValue={false} color="from-brand-500 to-accent-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Review */}
                <Card>
                  <CardContent>
                    <h3 className="text-sm font-semibold text-white mb-4">Answer Review</h3>
                    <div className="space-y-3">
                      {quizQuestions.map((q, i) => {
                        const userAnswer = answers[i];
                        const correct = userAnswer === q.correctIndex;
                        return (
                          <div key={q.id} className="glass rounded-xl p-3">
                            <div className="flex items-start gap-2">
                              {correct ? (
                                <Check className="w-4 h-4 text-success-400 shrink-0 mt-0.5" />
                              ) : (
                                <X className="w-4 h-4 text-error-400 shrink-0 mt-0.5" />
                              )}
                              <div className="flex-1">
                                <p className="text-sm text-gray-200">{q.question}</p>
                                {!correct && (
                                  <p className="text-xs text-error-400 mt-1">
                                    Correct answer: {q.options[q.correctIndex]}
                                  </p>
                                )}
                                <p className="text-xs text-gray-500 mt-1">{q.explanation}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* AI Feedback */}
                <Card glow>
                  <CardContent>
                    <div className="flex items-center gap-2 mb-3">
                      <Brain className="w-5 h-5 text-brand-400" />
                      <h3 className="text-lg font-semibold text-white">AI Feedback</h3>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{result.feedback}</p>
                    <div className="mt-4">
                      <Badge color="warning">Weak Area: {result.weakArea}</Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button onClick={() => navigate('/learning-resources?topic=SQL')} icon={ArrowRight} className="flex-1">
                    Practice Weak Area
                  </Button>
                  <Button variant="outline" onClick={reset} icon={RotateCcw} className="flex-1">
                    Try Another Challenge
                  </Button>
                </div>
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
