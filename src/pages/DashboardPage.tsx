import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import {
  Sparkles,
  ArrowRight,
  Brain,
  TrendingUp,
  Flame,
  BookOpen,
  Target,
  Lightbulb,
  Play,
  Eye,
  Zap,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgressRing, ProgressBar } from '@/components/ui/Progress';
import { Badge } from '@/components/ui/Misc';
import { useApp } from '@/context/AppContext';
import { radarSkills, knowledgeGrowthData } from '@/data/mockData';
import { detectKnowledgeGap } from '@/services/aiService';

export function DashboardPage() {
  const { profile } = useApp();
  const navigate = useNavigate();
  const [showLearnAnimation, setShowLearnAnimation] = useState(false);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div>
        <h1 className="text-3xl lg:text-4xl font-bold font-display text-white">
          {greeting}, {profile.name.split(' ')[0]}
        </h1>
        <p className="mt-2 text-gray-400">Here's what your AI recommends today.</p>
      </div>

      {/* Next Best Action */}
      <Card glow className="overflow-hidden">
        <CardContent>
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Badge color="brand"><Sparkles className="w-3 h-3" /> AI Recommended</Badge>
                <Badge color="electric">Next Best Action</Badge>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold font-display text-white mb-2">
                Revise DBMS Normalization for 35 minutes
              </h2>
              <p className="text-gray-400 max-w-xl">
                Your recent quiz performance shows a knowledge gap in normalization.
              </p>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-success-400" />
                  <span className="text-sm text-gray-300">Expected improvement: <span className="text-success-400 font-semibold">+8% readiness</span></span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full lg:w-auto">
              <Button onClick={() => navigate('/ai-tutor')} icon={Play}>Start Personalized Session</Button>
              <Button variant="outline" onClick={() => setShowLearnAnimation(true)} icon={Eye}>
                Watch EduPilot Learn About You
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={BookOpen}
          label="Academic Readiness"
          value={`${profile.academicReadiness}%`}
          progress={profile.academicReadiness}
          color="from-brand-500 to-accent-500"
        />
        <MetricCard
          icon={Target}
          label="Career Readiness"
          value={`${profile.careerReadiness}%`}
          progress={profile.careerReadiness}
          color="from-electric-500 to-cyan-500"
        />
        <MetricCard
          icon={Flame}
          label="Study Streak"
          value={`${profile.studyStreak} days`}
          progress={Math.min((profile.studyStreak / 10) * 100, 100)}
          color="from-orange-500 to-red-500"
        />
        <MetricCard
          icon={Brain}
          label="Knowledge Coverage"
          value={`${profile.knowledgeCoverage}%`}
          progress={profile.knowledgeCoverage}
          color="from-success-500 to-emerald-500"
        />
      </div>

      {/* Intelligence + Insight */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Radar Chart */}
        <Card className="lg:col-span-2">
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">Student Intelligence</h3>
                <p className="text-sm text-gray-400">Your skill profile across subjects</p>
              </div>
              <Badge color="brand"><Brain className="w-3 h-3" /> AI Analyzed</Badge>
            </div>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarSkills}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#a5a5c0', fontSize: 11 }} />
                  <Radar
                    name="Skill"
                    dataKey="score"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(10,10,26,0.95)',
                      border: '1px solid rgba(139,92,246,0.3)',
                      borderRadius: '12px',
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-xs text-gray-500 mb-2">WEAK AREAS</p>
                <div className="flex flex-wrap gap-2">
                  {profile.weakAreas.map((area) => (
                    <Badge key={area} color="error">{area}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-2">STRONG AREAS</p>
                <div className="flex flex-wrap gap-2">
                  {profile.strongAreas.map((area) => (
                    <Badge key={area} color="success">{area}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Insight */}
        <Card glow className="flex flex-col">
          <CardContent className="flex flex-col h-full">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500/30 to-accent-500/30 flex items-center justify-center">
                <Lightbulb className="w-4 h-4 text-brand-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">AI Insight</h3>
            </div>
            <p className="text-gray-300 leading-relaxed flex-1">
              You're improving fastest in <span className="text-success-400 font-medium">Python</span> and <span className="text-success-400 font-medium">SQL</span>. Your biggest opportunity is <span className="text-warning-400 font-medium">DBMS</span>. Focus on normalization before starting advanced database topics.
            </p>
            <div className="mt-4">
              <Button onClick={() => navigate('/learning-resources?topic=DBMS')} size="sm" iconRight={ArrowRight}>
                Study Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Knowledge Growth Chart */}
      <Card>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-white">Knowledge Growth</h3>
              <p className="text-sm text-gray-400">Your coverage over the last 6 weeks</p>
            </div>
            <Badge color="success"><TrendingUp className="w-3 h-3" /> +26% growth</Badge>
          </div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={knowledgeGrowthData}>
                <defs>
                  <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="week" tick={{ fill: '#8a8aa8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#8a8aa8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(10,10,26,0.95)',
                    border: '1px solid rgba(139,92,246,0.3)',
                    borderRadius: '12px',
                  }}
                />
                <Area type="monotone" dataKey="coverage" stroke="#8b5cf6" strokeWidth={2} fill="url(#growthGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Learn Animation Modal */}
      <AnimatePresence>
        {showLearnAnimation && (
          <LearnAnimation onClose={() => setShowLearnAnimation(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  progress,
  color,
}: {
  icon: typeof Sparkles;
  label: string;
  value: string;
  progress: number;
  color: string;
}) {
  return (
    <Card hover>
      <CardContent className="!p-5">
        <div className="flex items-center justify-between mb-3">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
        </div>
        <p className="text-2xl font-bold font-display text-white">{value}</p>
        <p className="text-xs text-gray-400 mb-3">{label}</p>
        <ProgressBar value={progress} showValue={false} color={color} />
      </CardContent>
    </Card>
  );
}

function LearnAnimation({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const { setStudyPlan, profile, setProfile, showToast } = useApp();
  const [stage, setStage] = useState(0);

  const stages = [
    { title: 'Reviewing your quiz history...', icon: BookOpen },
    { title: 'AI analyzing performance...', icon: Brain },
    { title: 'Knowledge Gap Detected: Backpropagation', icon: Target },
    { title: 'Updating Student Intelligence...', icon: Zap },
    { title: 'Adapting your study plan...', icon: Sparkles },
  ];

  useState(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    stages.forEach((_, i) => {
      timers.push(setTimeout(() => setStage(i + 1), (i + 1) * 1500));
    });
    timers.push(
      setTimeout(() => {
        detectKnowledgeGap().then((result) => {
          setStudyPlan(result.adaptedPlan);
          setProfile({ ...profile, academicReadiness: result.newReadiness });
          showToast('success', 'Your study plan was automatically personalized based on your performance.');
        });
      }, stages.length * 1500 + 500)
    );
    return () => timers.forEach(clearTimeout);
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative glass-strong rounded-3xl p-8 max-w-lg w-full glow-border"
      >
        <h2 className="text-2xl font-bold font-display text-white text-center mb-8">
          Watch EduPilot Learn About You
        </h2>

        <div className="space-y-4">
          {stages.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: stage >= i ? 1 : 0.3, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                stage >= i ? 'glass' : 'opacity-30'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                stage > i
                  ? 'bg-success-500/20'
                  : stage === i
                  ? 'bg-gradient-to-br from-brand-500 to-accent-500 animate-pulse'
                  : 'bg-white/5'
              }`}>
                {stage > i ? (
                  <span className="text-success-400 text-lg">✓</span>
                ) : (
                  <s.icon className="w-5 h-5 text-white" />
                )}
              </div>
              <span className={`text-sm ${stage >= i ? 'text-white' : 'text-gray-500'}`}>
                {s.title}
              </span>
            </motion.div>
          ))}
        </div>

        {stage >= stages.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <div className="glass rounded-xl p-4 border border-brand-500/30">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400 mb-1">Before (Day 3):</p>
                  <p className="text-gray-300 line-through">CNN</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">After (Day 3):</p>
                  <p className="text-success-400 font-medium">Backpropagation Review</p>
                </div>
              </div>
            </div>
            <p className="text-center text-gray-300 mt-4 text-sm">
              Your study plan was automatically personalized based on your performance.
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <Button onClick={() => { onClose(); navigate('/study-planner'); }} size="sm" iconRight={ArrowRight}>
                View Updated Plan
              </Button>
              <Button variant="outline" onClick={onClose} size="sm">Close</Button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
