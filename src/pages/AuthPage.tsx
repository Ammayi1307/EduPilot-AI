import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Mail, Lock, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';
import { Logo } from '@/components/ui/Misc';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';

export function AuthPage() {
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = mode === 'signin'
      ? await signIn(email, password)
      : await signUp(email, password);

    setLoading(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    if (mode === 'signup') {
      navigate('/onboarding');
    } else {
      navigate('/dashboard');
    }
  }

  return (
    <div className="min-h-screen bg-ink-950 bg-grid relative overflow-hidden flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link to="/">
            <Logo size="lg" />
          </Link>
        </div>

        <div className="glass-strong rounded-3xl p-8 glow-border">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-brand-400" />
            <h2 className="text-xl font-bold font-display text-white">
              {mode === 'signin' ? 'Welcome back' : 'Create your account'}
            </h2>
          </div>

          <p className="text-sm text-gray-400 mb-6">
            {mode === 'signin'
              ? 'Sign in to continue your learning journey.'
              : 'Sign up to get your personal AI student copilot.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl glass text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl glass text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40 transition-all"
                />
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 p-3 rounded-xl bg-error-500/10 border border-error-500/20"
                >
                  <AlertCircle className="w-4 h-4 text-error-400 shrink-0" />
                  <p className="text-sm text-error-300">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <Button type="submit" disabled={loading} className="w-full" iconRight={ArrowRight}>
              {loading ? 'Please wait...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setMode(mode === 'signin' ? 'signup' : 'signin');
                setError(null);
              }}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {mode === 'signin'
                ? "Don't have an account? Sign up"
                : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Continue with Demo Student <ArrowRight className="inline w-3 h-3" />
          </button>
        </div>

        <div className="text-center mt-4">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-300 transition-colors">
            <ArrowLeft className="w-3 h-3" /> Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
