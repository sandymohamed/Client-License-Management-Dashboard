import React, { useState } from 'react';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import ClientsList from './components/Clients/ClientsList';
import LicensesList from './components/Licenses/LicensesList';
import WorkersList from './components/Workers/WorkersList';
import NotificationsList from './components/Notifications/NotificationsList';
import Reports from './components/Reports/Reports';
import Settings from './components/Settings/Settings';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [language, setLanguage] = useState('en');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard language={language} />;
      case 'clients':
        return <ClientsList language={language} />;
      case 'licenses':
        return <LicensesList language={language} />;
      case 'workers':
        return <WorkersList language={language} />;
      case 'notifications':
        return <NotificationsList language={language} />;
      case 'reports':
        return <Reports language={language} />;
      case 'settings':
        return <Settings language={language} />;
      default:
        return <Dashboard language={language} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
      />
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;