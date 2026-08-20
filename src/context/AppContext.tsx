import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { StudentProfile, ToastMessage, StudyPlan } from '@/types';
import { demoStudent, initialStudyPlan } from '@/data/mockData';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

interface AppContextValue {
  profile: StudentProfile;
  setProfile: (p: StudentProfile) => void;
  studyPlan: StudyPlan;
  setStudyPlan: (p: StudyPlan) => void;
  savedResources: Set<string>;
  toggleSave: (id: string) => void;
  completedResources: Set<string>;
  toggleComplete: (id: string) => void;
  toasts: ToastMessage[];
  showToast: (type: ToastMessage['type'], message: string) => void;
  dismissToast: (id: string) => void;
  isOnboarded: boolean;
  setIsOnboarded: (v: boolean) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [profile, setProfile] = useState<StudentProfile>(demoStudent);
  const [studyPlan, setStudyPlan] = useState<StudyPlan>(initialStudyPlan);
  const [savedResources, setSavedResources] = useState<Set<string>>(new Set());
  const [completedResources, setCompletedResources] = useState<Set<string>>(new Set());
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isOnboarded, setIsOnboarded] = useState(false);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const [{ data: profileData }, { data: savedData }, { data: completedData }] = await Promise.all([
        supabase.from('user_profiles').select('*').eq('id', user.id).maybeSingle(),
        supabase.from('saved_resources').select('resource_id').eq('user_id', user.id),
        supabase.from('completed_resources').select('resource_id').eq('user_id', user.id),
      ]);

      if (profileData) {
        setProfile((p) => ({
          ...p,
          name: profileData.name || p.name,
          college: profileData.college || p.college,
          degree: profileData.degree || p.degree,
          branch: profileData.branch || p.branch,
          year: profileData.year || p.year,
          goal: profileData.goal || p.goal,
          studyTime: profileData.study_time || p.studyTime,
          confidence: profileData.confidence || p.confidence,
        }));
        setIsOnboarded(profileData.is_onboarded ?? false);
      }
      if (savedData) setSavedResources(new Set(savedData.map((r: { resource_id: string }) => r.resource_id)));
      if (completedData) setCompletedResources(new Set(completedData.map((r: { resource_id: string }) => r.resource_id)));
    })();
  }, [user]);

  const showToast = useCallback((type: ToastMessage['type'], message: string) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toggleSave = useCallback(
    (id: string) => {
      setSavedResources((prev) => {
        const next = new Set(prev);
        const isSaved = next.has(id);
        if (isSaved) {
          next.delete(id);
          showToast('info', 'Removed from saved resources');
        } else {
          next.add(id);
          showToast('success', 'Resource saved');
        }
        if (user) {
          if (isSaved) {
            supabase.from('saved_resources').delete().eq('user_id', user.id).eq('resource_id', id);
          } else {
            supabase.from('saved_resources').insert({ user_id: user.id, resource_id: id });
          }
        }
        return next;
      });
    },
    [showToast, user]
  );

  const toggleComplete = useCallback(
    (id: string) => {
      setCompletedResources((prev) => {
        const next = new Set(prev);
        const isCompleted = next.has(id);
        if (isCompleted) {
          next.delete(id);
          showToast('info', 'Marked as not completed');
        } else {
          next.add(id);
          showToast('success', 'Resource marked as completed');
        }
        if (user) {
          if (isCompleted) {
            supabase.from('completed_resources').delete().eq('user_id', user.id).eq('resource_id', id);
          } else {
            supabase.from('completed_resources').insert({ user_id: user.id, resource_id: id });
          }
        }
        return next;
      });
    },
    [showToast, user]
  );

  return (
    <AppContext.Provider
      value={{
        profile,
        setProfile,
        studyPlan,
        setStudyPlan,
        savedResources,
        toggleSave,
        completedResources,
        toggleComplete,
        toasts,
        showToast,
        dismissToast,
        isOnboarded,
        setIsOnboarded,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
