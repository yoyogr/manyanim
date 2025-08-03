

import React, { useState } from 'react';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { ToastProvider } from './hooks/useToast';
import { Role } from './types';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import StudentDashboard from './screens/StudentDashboard';
import MentorDashboard from './screens/MentorDashboard';
import AdminDashboard from './screens/AdminDashboard';
import Header from './components/Header';
import FloatingFeedbackButton from './components/FloatingFeedbackButton';

const MainRouter: React.FC = () => {
  const { user } = useAuth();
  
  switch (user?.role) {
    case Role.Student:
      return <StudentDashboard />;
    case Role.Mentor:
      return <MentorDashboard />;
    case Role.Admin:
      return <AdminDashboard />;
    default:
      // This case should ideally not be reached if MainRouter is rendered only for authenticated users
      return <LoginScreen />;
  }
};

const AppContent = () => {
  const { user, loading, isMentor, isAdmin, isImpersonating } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-600">טוען...</p>
      </div>
    );
  }

  if (!user) {
    if (!showLogin) {
      return <WelcomeScreen onEnter={() => setShowLogin(true)} />;
    }
    return <LoginScreen />;
  }
  
  return (
    <>
      <Header />
      <main className={isImpersonating ? "pt-32" : "pt-20"}> {/* Adjust padding top to prevent content from being hidden by header/banner */}
        <MainRouter />
      </main>
      {(isMentor || isAdmin) && <FloatingFeedbackButton />}
    </>
  );
};

const App = () => {
  return (
    <ToastProvider>
      <AuthProvider>
        <div className="bg-gray-100 min-h-screen font-sans" style={{ fontFamily: "'Heebo', sans-serif" }}>
          <AppContent />
        </div>
      </AuthProvider>
    </ToastProvider>
  );
};

export default App;
