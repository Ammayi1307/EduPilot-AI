import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: { box: 'w-8 h-8', text: 'text-lg', icon: 16 },
    md: { box: 'w-10 h-10', text: 'text-xl', icon: 20 },
    lg: { box: 'w-14 h-14', text: 'text-2xl', icon: 28 },
  };
  const s = sizes[size];
  return (
    <div className="flex items-center gap-2.5">
      <div className={`${s.box} relative rounded-xl bg-gradient-to-br from-brand-500 to-accent-600 flex items-center justify-center shadow-lg shadow-brand-500/30`}>
        <Sparkles className={`w-[${s.icon}] h-[${s.icon}] text-white`} style={{ width: s.icon, height: s.icon }} />
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent" />
      </div>
      <div className="flex flex-col leading-none">
        <span className={`${s.text} font-bold font-display text-white tracking-tight`}>
          EduPilot <span className="text-gradient">AI</span>
        </span>
      </div>
    </div>
  );
}

export function AIThinking({ text = 'AI is thinking...' }: { text?: string }) {
  return (
    <div className="flex items-center gap-2 text-gray-400">
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-accent-400"
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
      <span className="text-sm">{text}</span>
    </div>
  );
}

export function GlowOrb({ size = 200 }: { size?: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-500 via-accent-500 to-electric-500"
        animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ filter: 'blur(2px)' }}
      />
      <div className="absolute inset-4 rounded-full bg-ink-950/60 backdrop-blur-md" />
      <div className="absolute inset-8 rounded-full bg-gradient-to-br from-brand-400/30 to-accent-500/30 backdrop-blur-sm" />
      <motion.div
        className="absolute inset-0 rounded-full border border-brand-400/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute -inset-4 rounded-full border border-accent-400/20"
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}

export function SectionHeading({ children, subtitle }: { children: ReactNode; subtitle?: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl md:text-4xl font-bold font-display text-white tracking-tight">{children}</h2>
      {subtitle && <p className="mt-2 text-gray-400 text-lg">{subtitle}</p>}
    </div>
  );
}

export function Badge({ children, color = 'brand' }: { children: ReactNode; color?: 'brand' | 'success' | 'warning' | 'error' | 'electric' }) {
  const colors = {
    brand: 'bg-brand-500/15 text-brand-300 border-brand-500/30',
    success: 'bg-success-500/15 text-success-400 border-success-500/30',
    warning: 'bg-warning-500/15 text-warning-400 border-warning-500/30',
    error: 'bg-error-500/15 text-error-400 border-error-500/30',
    electric: 'bg-electric-500/15 text-electric-400 border-electric-500/30',
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${colors[color]}`}>
      {children}
    </span>
  );
}
