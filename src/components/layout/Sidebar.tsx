import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  Calendar,
  Target,
  Library,
  Code2,
  Briefcase,
  BarChart3,
  Settings,
  X,
  Sparkles,
} from 'lucide-react';
import { Logo } from '@/components/ui/Misc';

const navItems = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/ai-tutor', label: 'AI Tutor', icon: MessageSquare },
  { to: '/notes', label: 'My Notes', icon: FileText },
  { to: '/study-planner', label: 'Study Planner', icon: Calendar },
  { to: '/challenges', label: 'AI Challenges', icon: Target },
  { to: '/learning-resources', label: 'Learning Resources', icon: Library },
  { to: '/coding-lab', label: 'Coding Lab', icon: Code2 },
  { to: '/career', label: 'Career Copilot', icon: Briefcase },
  { to: '/insights', label: 'AI Insights', icon: BarChart3 },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 glass-strong border-r border-white/8 z-40 flex flex-col transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-white/8">
          <Logo size="md" />
          <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => onClose()}
              className={({ isActive }) =>
                `relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? 'text-white bg-gradient-to-r from-brand-500/20 to-accent-500/15'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-gradient-to-b from-brand-400 to-accent-400"
                    />
                  )}
                  <item.icon className="w-[18px] h-[18px] shrink-0" />
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/8">
          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-accent-400" />
              <span className="text-sm font-semibold text-white">AI Profile Active</span>
            </div>
            <p className="text-xs text-gray-400">
              EduPilot is continuously learning about your study patterns.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
