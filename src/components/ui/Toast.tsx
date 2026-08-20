import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const iconMap = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
};

const colorMap = {
  success: 'text-success-400 border-success-500/30 bg-success-500/10',
  error: 'text-error-400 border-error-500/30 bg-error-500/10',
  info: 'text-electric-400 border-electric-500/30 bg-electric-500/10',
};

export function ToastContainer() {
  const { toasts, dismissToast } = useApp();

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 max-w-sm">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = iconMap[toast.type];
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={`glass-strong rounded-xl border px-4 py-3 flex items-center gap-3 shadow-xl ${colorMap[toast.type]}`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="text-sm text-white flex-1">{toast.message}</span>
              <button
                onClick={() => dismissToast(toast.id)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
