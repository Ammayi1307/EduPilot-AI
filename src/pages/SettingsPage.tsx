import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Bell, Target, Clock, Globe, Moon, Sun, LogOut, Sparkles, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Misc';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';

export function SettingsPage() {
  const { profile, showToast } = useApp();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [studyReminder, setStudyReminder] = useState(true);
  const [language, setLanguage] = useState('English');

  function handleSave() {
    showToast('success', 'Settings saved successfully!');
  }

  async function handleSignOut() {
    await signOut();
    navigate('/auth');
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold font-display text-white">Settings</h1>
        <p className="mt-2 text-gray-400">Manage your account and preferences.</p>
      </div>

      {/* Profile */}
      <Card>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-brand-400" />
            <h3 className="text-lg font-semibold text-white">Profile</h3>
          </div>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white text-2xl font-bold">
              {profile.name.charAt(0)}
            </div>
            <div>
              <p className="text-lg font-semibold text-white">{profile.name}</p>
              <p className="text-sm text-gray-400">{profile.degree} {profile.branch} · {profile.year}</p>
              <div className="flex gap-2 mt-1">
                <Badge color="brand">{profile.goal}</Badge>
              </div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <SettingField label="Full Name" value={profile.name} />
            <SettingField label="College" value={profile.college} />
            <SettingField label="Degree" value={profile.degree} />
            <SettingField label="Branch" value={profile.branch} />
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-accent-400" />
            <h3 className="text-lg font-semibold text-white">Preferences</h3>
          </div>
          <div className="space-y-4">
            <ToggleRow
              icon={Bell}
              label="Push Notifications"
              description="Get notified about challenges and study reminders"
              value={notifications}
              onChange={setNotifications}
            />
            <ToggleRow
              icon={Clock}
              label="Study Reminders"
              description="Daily reminders based on your study time preference"
              value={studyReminder}
              onChange={setStudyReminder}
            />
            <ToggleRow
              icon={Moon}
              label="Dark Mode"
              description="Use dark theme across the app"
              value={darkMode}
              onChange={setDarkMode}
            />
            <div className="flex items-center justify-between p-3 rounded-xl glass">
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-electric-400" />
                <div>
                  <p className="text-sm font-medium text-white">Language</p>
                  <p className="text-xs text-gray-400">Interface language</p>
                </div>
              </div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="glass rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none cursor-pointer"
              >
                <option value="English" className="bg-ink-900">English</option>
                <option value="Telugu" className="bg-ink-900">Telugu</option>
                <option value="Hindi" className="bg-ink-900">Hindi</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Study Goals */}
      <Card>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-electric-400" />
            <h3 className="text-lg font-semibold text-white">Study Goals</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <SettingField label="Daily Study Time" value={profile.studyTime} />
            <SettingField label="Primary Goal" value={profile.goal} />
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button icon={Check} onClick={handleSave} className="flex-1">Save Changes</Button>
        <Button variant="danger" icon={LogOut} onClick={handleSignOut} className="flex-1">Sign Out</Button>
      </div>

      {/* Footer */}
      <div className="text-center pt-4">
        <p className="text-sm text-gray-500">EduPilot AI — Your Personal AI Student Copilot</p>
        <p className="text-xs text-gray-600 mt-1">© 2026 EduPilot AI. All rights reserved.</p>
      </div>
    </div>
  );
}

function SettingField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="block text-xs text-gray-400 mb-1.5">{label}</label>
      <input
        type="text"
        defaultValue={value}
        className="w-full px-3 py-2 rounded-xl glass text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-500/40 transition-all"
      />
    </div>
  );
}

function ToggleRow({
  icon: Icon,
  label,
  description,
  value,
  onChange,
}: {
  icon: typeof Bell;
  label: string;
  description: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl glass">
      <div className="flex items-center gap-3">
        <Icon className="w-4 h-4 text-gray-400" />
        <div>
          <p className="text-sm font-medium text-white">{label}</p>
          <p className="text-xs text-gray-400">{description}</p>
        </div>
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`relative w-11 h-6 rounded-full transition-colors ${value ? 'bg-gradient-to-r from-brand-500 to-accent-500' : 'bg-white/10'}`}
      >
        <motion.div
          animate={{ x: value ? 22 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-lg"
        />
      </button>
    </div>
  );
}
