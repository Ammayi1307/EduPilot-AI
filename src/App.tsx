import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { type ReactNode } from 'react';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { AppProvider } from '@/context/AppContext';
import { ToastContainer } from '@/components/ui/Toast';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { LandingPage } from '@/pages/LandingPage';
import { AuthPage } from '@/pages/AuthPage';
import { OnboardingPage } from '@/pages/OnboardingPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { AITutorPage } from '@/pages/AITutorPage';
import { NotesPage } from '@/pages/NotesPage';
import { StudyPlannerPage } from '@/pages/StudyPlannerPage';
import { ChallengesPage } from '@/pages/ChallengesPage';
import { LearningResourcesPage } from '@/pages/LearningResourcesPage';
import { CodingLabPage } from '@/pages/CodingLabPage';
import { CareerPage } from '@/pages/CareerPage';
import { InsightsPage } from '@/pages/InsightsPage';
import { SettingsPage } from '@/pages/SettingsPage';

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-ink-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-500/30 border-t-brand-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <DashboardPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/ai-tutor"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <AITutorPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/notes"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <NotesPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/study-planner"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <StudyPlannerPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/challenges"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <ChallengesPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/learning-resources"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <LearningResourcesPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/coding-lab"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <CodingLabPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/career"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <CareerPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/insights"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <InsightsPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <SettingsPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
