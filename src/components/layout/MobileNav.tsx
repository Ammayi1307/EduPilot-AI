import { NavLink } from 'react-router-dom';
import { Home, MessageSquare, Calendar, Target, User } from 'lucide-react';

const items = [
  { to: '/dashboard', label: 'Home', icon: Home },
  { to: '/ai-tutor', label: 'Tutor', icon: MessageSquare },
  { to: '/study-planner', label: 'Plan', icon: Calendar },
  { to: '/challenges', label: 'Challenges', icon: Target },
  { to: '/settings', label: 'Profile', icon: User },
];

export function MobileNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 glass-strong border-t border-white/8 px-2 py-1.5 flex items-center justify-around">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors ${
              isActive ? 'text-brand-400' : 'text-gray-500'
            }`
          }
        >
          <item.icon className="w-5 h-5" />
          <span className="text-[10px] font-medium">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
