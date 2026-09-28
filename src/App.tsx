import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/common/Sidebar';
import { TopBar } from './components/common/TopBar';
import { DataSourcesModal } from './components/common/DataSourcesModal';
import { OfficerReviewModal } from './components/common/OfficerReviewModal';
import { DemoTourModal } from './components/common/DemoTourModal';

// Views
import { LoginView } from './components/views/LoginView';
import { DashboardView } from './components/views/DashboardView';
import { PersonnelDirectoryView } from './components/views/PersonnelDirectoryView';
import { PersonnelProfileView } from './components/views/PersonnelProfileView';
import { RiskMonitorView } from './components/views/RiskMonitorView';
import { PriorityReviewsView } from './components/views/PriorityReviewsView';
import { WelfareActionsView } from './components/views/WelfareActionsView';
import { AlertsView } from './components/views/AlertsView';
import { AnalyticsView } from './components/views/AnalyticsView';
import { OutcomeMeasurementView } from './components/views/OutcomeMeasurementView';
import { WellnessPortalView } from './components/views/WellnessPortalView';
import { PrivacyCenterView } from './components/views/PrivacyCenterView';
import { AuditLogView } from './components/views/AuditLogView';
import { SettingsView } from './components/views/SettingsView';

const MainAppContent: React.FC = () => {
  const { isAuthenticated, activeTab } = useApp();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return <LoginView />;
  }

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'personnel':
        return <PersonnelDirectoryView />;
      case 'profile':
        return <PersonnelProfileView />;
      case 'risk-monitor':
        return <RiskMonitorView />;
      case 'priority-reviews':
        return <PriorityReviewsView />;
      case 'welfare-actions':
        return <WelfareActionsView />;
      case 'alerts':
        return <AlertsView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'outcomes':
        return <OutcomeMeasurementView />;
      case 'wellness':
        return <WellnessPortalView />;
      case 'privacy':
        return <PrivacyCenterView />;
      case 'audit-log':
        return <AuditLogView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F8FB] text-slate-800 flex flex-col">
      {/* Persistent Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content Area */}
      <div className="lg:pl-72 flex-1 flex flex-col transition-all duration-200">
        <TopBar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto fade-in">
          {renderActiveView()}
        </main>

        {/* Global Footer */}
        <footer className="py-4 px-6 border-t border-slate-200/80 bg-white text-center text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">PersonnelShield AI</span>
            <span>•</span>
            <span className="italic">Data-driven insights. Human-centered care.</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span>Stronger Forces • Healthier Minds • Safer Nation</span>
            <span>•</span>
            <span className="text-emerald-600 font-semibold">MIL-STD Enclave v3.2</span>
          </div>
        </footer>
      </div>

      {/* Interactive Global Modals */}
      <DataSourcesModal />
      <OfficerReviewModal />
      <DemoTourModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
