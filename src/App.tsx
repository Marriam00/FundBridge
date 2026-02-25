import { useState } from 'react';
import LandingPage from './components/LandingPage';
import BankDashboard from './components/BankDashboard';
import StartupDashboard from './components/StartupDashboard';
import { LanguageProvider } from './i18n';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'bank' | 'startup'>('landing');

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
        {currentView === 'landing' && <LandingPage onNavigate={setCurrentView} />}
        {currentView === 'bank' && <BankDashboard onNavigate={setCurrentView} />}
        {currentView === 'startup' && <StartupDashboard onNavigate={setCurrentView} />}
      </div>
    </LanguageProvider>
  );
}
