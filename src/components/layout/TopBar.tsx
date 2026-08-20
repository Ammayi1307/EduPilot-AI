import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Menu, ChevronDown } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';

export function TopBar({ onMenuClick }: { onMenuClick: () => void }) {
  const { profile } = useApp();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotifications(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setShowProfile(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const notifications = [
    { id: 1, text: 'Your DBMS quiz score improved by 14%', time: '2h ago' },
    { id: 2, text: 'New AI challenge available: SQL Joins', time: '5h ago' },
    { id: 3, text: 'Study streak reached 7 days!', time: '1d ago' },
  ];

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/learning-resources?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  }

  return (
    <header className="sticky top-0 z-20 glass-strong border-b border-white/8 px-4 lg:px-6 py-3 flex items-center gap-3 lg:gap-4">
      <button onClick={onMenuClick} className="lg:hidden p-2 text-gray-300 hover:text-white">
        <Menu className="w-5 h-5" />
      </button>

      <form onSubmit={handleSearch} className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search learning resources..."
            className="w-full pl-10 pr-4 py-2 rounded-xl glass text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40 transition-all"
          />
        </div>
      </form>

      <div className="flex items-center gap-2 lg:gap-3">
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl glass text-gray-300 hover:text-white transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent-500 ring-2 ring-ink-900" />
          </button>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 glass-strong rounded-xl border border-white/10 shadow-2xl overflow-hidden">
              <div className="p-3 border-b border-white/8">
                <span className="text-sm font-semibold text-white">Notifications</span>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="p-3 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
                    <p className="text-sm text-gray-200">{n.text}</p>
                    <p className="text-xs text-gray-500 mt-1">{n.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div ref={profileRef} className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 p-1 pr-2 rounded-xl glass hover:bg-white/10 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white text-sm font-bold">
              {profile.name.charAt(0)}
            </div>
            <span className="hidden md:block text-sm text-white font-medium">{profile.name.split(' ')[0]}</span>
            <ChevronDown className="hidden md:block w-4 h-4 text-gray-400" />
          </button>
          {showProfile && (
            <div className="absolute right-0 mt-2 w-56 glass-strong rounded-xl border border-white/10 shadow-2xl overflow-hidden">
              <div className="p-3 border-b border-white/8">
                <p className="text-sm font-semibold text-white">{profile.name}</p>
                <p className="text-xs text-gray-400">{profile.degree} {profile.branch}</p>
              </div>
              <div className="p-1">
                <button
                  onClick={() => { setShowProfile(false); navigate('/settings'); }}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                >
                  Settings
                </button>
                <button
                  onClick={() => { setShowProfile(false); signOut().then(() => navigate('/auth')); }}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
