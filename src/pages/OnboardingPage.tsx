import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  GraduationCap,
  Target,
  BarChart3,
  Clock,
  Check,
  ArrowRight,
  ArrowLeft,
  Brain,
} from 'lucide-react';
import { Logo } from '@/components/ui/Misc';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/Progress';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { demoStudent } from '@/data/mockData';

const goals = [
  'Improve grades',
  'Crack placements',
  'Software Engineer',
  'AI/ML Engineer',
  'Competitive Exams',
  'Build Projects',
];

const subjects = ['Python', 'DSA', 'DBMS', 'Machine Learning', 'Mathematics', 'Communication'];

const studyTimes = ['30 minutes', '1 hour', '2 hours', '3+ hours'];

export function OnboardingPage() {
  const navigate = useNavigate();
  const { setIsOnboarded, setProfile } = useApp();
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [building, setBuilding] = useState(false);
  const [buildProgress, setBuildProgress] = useState(0);
  const [done, setDone] = useState(false);

  const [data, setData] = useState({
    name: '',
    college: '',
    degree: '',
    branch: '',
    year: '',
    goal: '',
    studyTime: '',
    confidence: {} as Record<string, number>,
  });

  const totalSteps = 4;
  const progress = ((step + 1) / totalSteps) * 100;

  function next() {
    if (step < totalSteps - 1) setStep(step + 1);
    else startBuilding();
  }

  function back() {
    if (step > 0) setStep(step - 1);
  }

  function startBuilding() {
    setBuilding(true);
    const interval = setInterval(() => {
      setBuildProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setDone(true);
          (async () => {
            if (user) {
              await supabase.from('user_profiles').upsert({
                id: user.id,
                name: data.name,
                college: data.college,
                degree: data.degree,
                branch: data.branch,
                year: data.year,
                goal: data.goal,
                study_time: data.studyTime,
                confidence: data.confidence,
                is_onboarded: true,
                updated_at: new Date().toISOString(),
              });
            }
            setProfile({
              ...demoStudent,
              name: data.name || demoStudent.name,
              college: data.college || demoStudent.college,
              degree: data.degree || demoStudent.degree,
              branch: data.branch || demoStudent.branch,
              year: data.year || demoStudent.year,
              goal: data.goal || demoStudent.goal,
              studyTime: data.studyTime || demoStudent.studyTime,
              confidence: data.confidence || demoStudent.confidence,
            });
            setIsOnboarded(true);
            setTimeout(() => navigate('/dashboard'), 1500);
          })();
          return 100;
        }
        return prev + 2;
      });
    }, 60);
  }

  function setConfidence(subject: string, value: number) {
    setData((prev) => ({ ...prev, confidence: { ...prev.confidence, [subject]: value } }));
  }

  const canProceed = () => {
    if (step === 0) return data.name && data.college && data.degree && data.branch && data.year;
    if (step === 1) return data.goal;
    if (step === 2) return subjects.every((s) => data.confidence[s] !== undefined);
    if (step === 3) return data.studyTime;
    return false;
  };

  if (building || done) {
    return <BuildingProfile progress={buildProgress} done={done} name={data.name || 'Student'} />;
  }

  return (
    <div className="min-h-screen bg-ink-950 bg-grid relative overflow-hidden flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-2xl">
        <div className="flex justify-center mb-8">
          <Logo size="lg" />
        </div>

        <div className="glass-strong rounded-3xl p-8 lg:p-10 glow-border">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Step {step + 1} of {totalSteps}</span>
              <span className="text-sm text-brand-400 font-medium">{Math.round(progress)}%</span>
            </div>
            <ProgressBar value={progress} showValue={false} />
          </div>

          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <GraduationCap className="w-5 h-5 text-brand-400" />
                  <h2 className="text-xl font-bold font-display text-white">Tell us about yourself</h2>
                </div>
                <div className="space-y-4">
                  <Field label="Full Name" value={data.name} onChange={(v) => setData({ ...data, name: v })} placeholder="Alex Johnson" />
                  <Field label="College" value={data.college} onChange={(v) => setData({ ...data, college: v })} placeholder="National Institute of Technology" />
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Degree" value={data.degree} onChange={(v) => setData({ ...data, degree: v })} placeholder="B.Tech" />
                    <Field label="Branch" value={data.branch} onChange={(v) => setData({ ...data, branch: v })} placeholder="Computer Science" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Year</label>
                    <div className="grid grid-cols-4 gap-2">
                      {['1st Year', '2nd Year', '3rd Year', '4th Year'].map((y) => (
                        <button
                          key={y}
                          onClick={() => setData({ ...data, year: y })}
                          className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                            data.year === y
                              ? 'bg-gradient-to-r from-brand-500/30 to-accent-500/30 text-white border border-brand-500/40'
                              : 'glass text-gray-400 hover:text-white border border-transparent'
                          }`}
                        >
                          {y}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <Target className="w-5 h-5 text-accent-400" />
                  <h2 className="text-xl font-bold font-display text-white">What's your primary goal?</h2>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {goals.map((g) => (
                    <button
                      key={g}
                      onClick={() => setData({ ...data, goal: g })}
                      className={`px-4 py-4 rounded-xl text-sm font-medium transition-all text-left ${
                        data.goal === g
                          ? 'bg-gradient-to-r from-brand-500/30 to-accent-500/30 text-white border border-brand-500/40 glow-border'
                          : 'glass text-gray-300 hover:text-white border border-transparent'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <BarChart3 className="w-5 h-5 text-electric-400" />
                  <h2 className="text-xl font-bold font-display text-white">Rate your confidence</h2>
                </div>
                <p className="text-sm text-gray-400 mb-4">How confident are you in each subject? (0-100%)</p>
                <div className="space-y-4">
                  {subjects.map((s) => (
                    <div key={s}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm text-gray-300">{s}</span>
                        <span className="text-sm font-semibold text-white">
                          {data.confidence[s] !== undefined ? `${data.confidence[s]}%` : '—'}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={data.confidence[s] ?? 50}
                        onChange={(e) => setConfidence(s, parseInt(e.target.value))}
                        className="w-full accent-brand-500 cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <Clock className="w-5 h-5 text-success-400" />
                  <h2 className="text-xl font-bold font-display text-white">How much can you study daily?</h2>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {studyTimes.map((t) => (
                    <button
                      key={t}
                      onClick={() => setData({ ...data, studyTime: t })}
                      className={`px-4 py-5 rounded-xl text-sm font-medium transition-all ${
                        data.studyTime === t
                          ? 'bg-gradient-to-r from-brand-500/30 to-accent-500/30 text-white border border-brand-500/40 glow-border'
                          : 'glass text-gray-300 hover:text-white border border-transparent'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <Button variant="ghost" onClick={back} disabled={step === 0} icon={ArrowLeft}>
              Back
            </Button>
            <Button onClick={next} disabled={!canProceed()} iconRight={step === 3 ? Sparkles : ArrowRight}>
              {step === 3 ? 'Build My Profile' : 'Continue'}
            </Button>
          </div>
        </div>

        {/* Demo link */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Continue with Demo Student →
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm text-gray-300 mb-2">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-xl glass text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40 transition-all"
      />
    </div>
  );
}

function BuildingProfile({ progress, done, name }: { progress: number; done: boolean; name: string }) {
  const steps = [
    'Analyzing your inputs...',
    'Detecting knowledge levels...',
    'Mapping weak areas...',
    'Creating your AI profile...',
    'Generating study recommendations...',
  ];
  const currentStep = Math.min(Math.floor((progress / 100) * steps.length), steps.length - 1);

  return (
    <div className="min-h-screen bg-ink-950 bg-grid relative overflow-hidden flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-500/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 text-center max-w-md">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-brand-500 via-accent-500 to-electric-500 flex items-center justify-center mb-8"
          style={{ filter: 'blur(1px)' }}
        >
          <div className="w-16 h-16 rounded-full bg-ink-950/50 backdrop-blur-md flex items-center justify-center">
            <Brain className="w-8 h-8 text-white" />
          </div>
        </motion.div>

        {!done ? (
          <>
            <h2 className="text-2xl font-bold font-display text-white mb-2">
              Building your AI Student Profile...
            </h2>
            <p className="text-gray-400 mb-8">{steps[currentStep]}</p>
            <div className="w-full max-w-xs mx-auto">
              <ProgressBar value={progress} showValue={false} />
              <p className="text-sm text-brand-400 mt-2 font-medium">{progress}%</p>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring' }}
          >
            <div className="w-20 h-20 mx-auto rounded-full bg-success-500/20 flex items-center justify-center mb-6">
              <Check className="w-10 h-10 text-success-400" />
            </div>
            <h2 className="text-2xl font-bold font-display text-white mb-2">
              Your AI profile is ready{name ? `, ${name}` : ''}!
            </h2>
            <p className="text-gray-400">Taking you to your dashboard...</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
