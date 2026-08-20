import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  MessageSquare,
  FileText,
  Calendar,
  Target,
  Library,
  Briefcase,
  ArrowRight,
  Brain,
  TrendingUp,
  Zap,
  Check,
  X,
  ChevronRight,
} from 'lucide-react';
import { Logo, Badge } from '@/components/ui/Misc';
import { Button } from '@/components/ui/Button';

const orbitNodes = [
  { label: 'Learning', icon: BookIcon, angle: 0, color: 'text-brand-400' },
  { label: 'Exams', icon: Target, angle: 60, color: 'text-accent-400' },
  { label: 'Skills', icon: Zap, angle: 120, color: 'text-electric-400' },
  { label: 'Career', icon: Briefcase, angle: 180, color: 'text-success-400' },
  { label: 'Progress', icon: TrendingUp, angle: 240, color: 'text-warning-400' },
  { label: 'AI Core', icon: Brain, angle: 300, color: 'text-brand-300' },
];

function BookIcon({ className }: { className?: string }) {
  return <FileText className={className} />;
}

const features = [
  {
    icon: MessageSquare,
    title: 'AI Tutor',
    description: 'Personalized explanations and interactive learning tailored to your level.',
    gradient: 'from-brand-500/20 to-accent-500/20',
    iconColor: 'text-brand-400',
  },
  {
    icon: FileText,
    title: 'Talk to Your Notes',
    description: 'Upload notes and learn directly from your study material.',
    gradient: 'from-accent-500/20 to-purple-500/20',
    iconColor: 'text-accent-400',
  },
  {
    icon: Calendar,
    title: 'Adaptive Study Planner',
    description: 'Your plan automatically changes based on your performance.',
    gradient: 'from-electric-500/20 to-cyan-500/20',
    iconColor: 'text-electric-400',
  },
  {
    icon: Target,
    title: 'AI Challenges',
    description: 'Practice generated around your weak topics for targeted improvement.',
    gradient: 'from-success-500/20 to-emerald-500/20',
    iconColor: 'text-success-400',
  },
  {
    icon: Library,
    title: 'Learning Resources',
    description: 'Discover useful videos, courses, tutorials and documentation.',
    gradient: 'from-warning-500/20 to-orange-500/20',
    iconColor: 'text-warning-400',
  },
  {
    icon: Briefcase,
    title: 'Career Copilot',
    description: 'Identify skill gaps and build a career roadmap to your dream job.',
    gradient: 'from-rose-500/20 to-pink-500/20',
    iconColor: 'text-rose-400',
  },
];

const traditionalAI = ['Generic answers', 'Static schedules', 'No learning profile', 'Reactive'];
const edupilotAI = [
  'Understands the student',
  'Detects knowledge gaps',
  'Creates personalized plans',
  'Adapts automatically',
  'Gives proactive recommendations',
];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-ink-950 bg-grid relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 lg:px-12 py-5">
        <Logo size="md" />
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">Features</a>
          <a href="#differentiator" className="text-sm text-gray-400 hover:text-white transition-colors">Why EduPilot</a>
          <a href="#how" className="text-sm text-gray-400 hover:text-white transition-colors">How It Works</a>
        </div>
        <Link to="/auth">
          <Button size="sm" variant="secondary" iconRight={ArrowRight}>Get Started</Button>
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative z-10 px-6 lg:px-12 pt-12 lg:pt-20 pb-16">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge color="brand">
                <Sparkles className="w-3 h-3" /> Your Personal AI Student Copilot
              </Badge>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-5 text-5xl lg:text-6xl font-bold font-display text-white tracking-tight leading-[1.1]"
            >
              Your AI Student <span className="text-gradient">Copilot</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 text-xl text-gray-300 font-medium"
            >
              Learn smarter. Prepare faster. Build your future.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-4 text-gray-400 leading-relaxed max-w-lg"
            >
              EduPilot AI understands how you learn, identifies what you're missing, and continuously creates your next best step for academic and career growth.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              <Link to="/auth">
                <Button size="lg" icon={Sparkles}>Start Your AI Journey</Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" iconRight={ArrowRight}>Explore Demo</Button>
              </Link>
            </motion.div>
          </div>

          {/* AI Orb Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex items-center justify-center h-[400px] lg:h-[500px]"
          >
            <AIOrbVisual />
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 px-6 lg:px-12 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge color="electric">Features</Badge>
            <h2 className="mt-4 text-3xl lg:text-4xl font-bold font-display text-white">
              Everything you need to <span className="text-gradient">succeed</span>
            </h2>
            <p className="mt-3 text-gray-400 max-w-2xl mx-auto">
              Six powerful AI-driven tools that work together to understand, teach, and adapt to you.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link to="/auth">
                  <div className="glass rounded-2xl p-6 glow-border-hover h-full group">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-4`}>
                      <f.icon className={`w-6 h-6 ${f.iconColor}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{f.description}</p>
                    <div className="mt-4 flex items-center gap-1 text-sm text-brand-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn more <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiator */}
      <section id="differentiator" className="relative z-10 px-6 lg:px-12 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Badge color="electric">Why EduPilot</Badge>
            <h2 className="mt-4 text-3xl lg:text-5xl font-bold font-display text-white">
              Not another chatbot.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Traditional AI */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-6 border border-error-500/20"
            >
              <h3 className="text-lg font-semibold text-gray-400 mb-4">Traditional AI</h3>
              <ul className="space-y-3">
                {traditionalAI.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-400">
                    <div className="w-5 h-5 rounded-full bg-error-500/15 flex items-center justify-center shrink-0">
                      <X className="w-3 h-3 text-error-400" />
                    </div>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* EduPilot AI */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-strong rounded-2xl p-6 border border-brand-500/30 glow-border"
            >
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-brand-400" />
                <h3 className="text-lg font-semibold text-white">EduPilot AI</h3>
              </div>
              <ul className="space-y-3">
                {edupilotAI.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-success-500/15 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-success-400" />
                    </div>
                    <span className="text-sm text-white">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="relative z-10 px-6 lg:px-12 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Badge color="brand">How It Works</Badge>
            <h2 className="mt-4 text-3xl lg:text-4xl font-bold font-display text-white">
              EduPilot knows what you need to learn next.
            </h2>
          </div>
          <div className="flex flex-col items-center gap-3">
            {['Student', 'AI Profile', 'Knowledge Gap', 'Recommendation', 'Learning Resource', 'Quiz', 'Adaptive Study Plan', 'Improved Student'].map((step, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className={`px-6 py-3 rounded-xl glass ${i === 0 || i === 7 ? 'glow-border' : ''}`}>
                  <span className={`text-sm font-medium ${i === 7 ? 'text-success-400' : 'text-white'}`}>{step}</span>
                </div>
                {i < 7 && <ArrowRight className="w-5 h-5 text-gray-600 rotate-90 my-1" />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-6 lg:px-12 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="glass-strong rounded-3xl p-10 lg:p-14 glow-border">
            <h2 className="text-3xl lg:text-4xl font-bold font-display text-white">
              Don't study everything. <span className="text-gradient">Study what matters next.</span>
            </h2>
            <p className="mt-4 text-gray-400">
              EduPilot doesn't just answer students. It learns about them and decides what they should do next.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/auth">
                <Button size="lg" icon={Sparkles}>Start Your AI Journey</Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline">Continue with Demo Student</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/8 px-6 lg:px-12 py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo size="sm" />
          <p className="text-sm text-gray-500">Your Personal AI Student Copilot</p>
          <p className="text-sm text-gray-500">© 2026 EduPilot AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function AIOrbVisual() {
  return (
    <div className="relative w-[340px] h-[340px] lg:w-[440px] lg:h-[440px]">
      {/* Orbit rings */}
      <motion.div
        className="absolute inset-0 rounded-full border border-brand-500/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute inset-8 rounded-full border border-accent-500/15"
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute inset-16 rounded-full border border-electric-500/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
      />

      {/* Center orb */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-28 h-28 lg:w-36 lg:h-36 rounded-full bg-gradient-to-br from-brand-500 via-accent-500 to-electric-500 relative"
          animate={{ scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{ filter: 'blur(1px)' }}
        >
          <div className="absolute inset-3 rounded-full bg-ink-950/50 backdrop-blur-md flex items-center justify-center">
            <Brain className="w-10 h-10 lg:w-14 lg:h-14 text-white" />
          </div>
        </motion.div>
      </div>

      {/* Orbit nodes */}
      {orbitNodes.map((node, i) => {
        const radius = 160;
        const x = Math.cos((node.angle * Math.PI) / 180) * radius;
        const y = Math.sin((node.angle * Math.PI) / 180) * radius;
        return (
          <motion.div
            key={node.label}
            className="absolute top-1/2 left-1/2"
            style={{ x, y }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.1, type: 'spring' }}
          >
            <div className="-translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5">
              <div className="w-11 h-11 lg:w-14 lg:h-14 rounded-xl glass-strong flex items-center justify-center glow-border">
                <node.icon className={`w-5 h-5 lg:w-7 lg:h-7 ${node.color}`} />
              </div>
              <span className="text-xs text-gray-400 font-medium">{node.label}</span>
            </div>
          </motion.div>
        );
      })}

      {/* Connecting lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: 'blur(0.5px)' }}>
        {orbitNodes.map((node, i) => {
          const radius = 160;
          const x = Math.cos((node.angle * Math.PI) / 180) * radius + 220;
          const y = Math.sin((node.angle * Math.PI) / 180) * radius + 220;
          return (
            <line
              key={i}
              x1="220"
              y1="220"
              x2={x}
              y2={y}
              stroke="url(#lineGrad)"
              strokeWidth="1"
              opacity="0.3"
            />
          );
        })}
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
