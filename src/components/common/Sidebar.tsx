import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Users,
  Activity,
  ClipboardList,
  HeartHandshake,
  Bell,
  BarChart3,
  ShieldCheck,
  Lock,
  History,
  Settings,
  Smile,
  Shield,
  CheckCircle2,
  ChevronRight,
  LogOut,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const {
    activeTab,
    setActiveTab,
    currentRole,
    unreadAlertCount,
    logout,
    setIsDemoTourOpen,
  } = useApp();

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Overview',
      icon: LayoutDashboard,
      roles: ['officer', 'admin'],
      badge: null,
    },
    {
      id: 'personnel',
      label: 'Personnel',
      icon: Users,
      roles: ['officer', 'admin'],
      badge: '14 Active',
    },
    {
      id: 'risk-monitor',
      label: 'Risk Monitor',
      icon: Activity,
      roles: ['officer', 'admin'],
      badge: 'AI Core',
    },
    {
      id: 'priority-reviews',
      label: 'Priority Reviews',
      icon: ClipboardList,
      roles: ['officer'],
      badge: '4 Urgent',
      badgeColor: 'bg-rose-100 text-rose-700',
    },
    {
      id: 'welfare-actions',
      label: 'Welfare Actions',
      icon: HeartHandshake,
      roles: ['officer', 'admin'],
      badge: null,
    },
    {
      id: 'alerts',
      label: 'Alerts',
      icon: Bell,
      roles: ['officer', 'admin'],
      badge: unreadAlertCount > 0 ? `${unreadAlertCount}` : null,
      badgeColor: 'bg-amber-100 text-amber-800',
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      roles: ['officer', 'admin'],
      badge: null,
    },
    {
      id: 'outcomes',
      label: 'Outcomes Loop',
      icon: CheckCircle2,
      roles: ['officer', 'admin'],
      badge: 'Closed-Loop',
      badgeColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      id: 'wellness',
      label: currentRole === 'personnel' ? 'My Wellness Portal' : 'Personnel Wellness App',
      icon: Smile,
      roles: ['officer', 'admin', 'personnel'],
      badge: currentRole === 'personnel' ? 'Voluntary' : 'Preview',
      badgeColor: 'bg-blue-100 text-blue-800',
    },
    {
      id: 'privacy',
      label: 'Privacy & Access',
      icon: Lock,
      roles: ['officer', 'admin', 'personnel'],
      badge: 'Protected',
    },
    {
      id: 'audit-log',
      label: 'Audit Log',
      icon: History,
      roles: ['officer', 'admin'],
      badge: 'Immutable',
    },
    {
      id: 'settings',
      label: 'Settings & RBAC',
      icon: Settings,
      roles: ['officer', 'admin'],
      badge: null,
    },
  ];

  // Filter items visible for active role
  const visibleItems = navigationItems.filter(item => item.roles.includes(currentRole));

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-navy-950 text-slate-300 border-r border-slate-800/80 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-white">PersonnelShield</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  AI
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Uniformed Welfare System</p>
            </div>
          </div>
        </div>

        {/* Operational Security Badge */}
        <div className="px-5 py-3 bg-navy-900/60 border-b border-slate-800/60 flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-mono text-slate-300">Enclave Core v3.2</span>
          </div>
          <span className="text-[10px] uppercase font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
            Active
          </span>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Operations & Triage
          </div>

          {visibleItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all group ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-900/40 font-semibold'
                    : 'text-slate-300 hover:bg-navy-850 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3 truncate">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      item.badgeColor
                        ? item.badgeColor
                        : isActive
                        ? 'bg-blue-700 text-white'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Guided Demo Button for Judges */}
        <div className="p-3 border-t border-slate-800/80 bg-navy-900/40">
          <button
            onClick={() => setIsDemoTourOpen(true)}
            className="w-full flex items-center justify-between p-2.5 rounded-lg bg-gradient-to-r from-blue-950 to-indigo-950 border border-blue-600/30 hover:border-blue-500 text-blue-200 transition-all text-xs font-medium shadow-xs"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Hackathon Flow Guide</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-blue-400" />
          </button>
        </div>

        {/* Trust & Ethics Banner & Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-navy-950 space-y-3">
          <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-[10px] text-slate-400">
            <p className="font-bold text-slate-300 tracking-wide uppercase flex items-center gap-1.5 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Welfare Support — Not Surveillance
            </p>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              AI supports. Humans decide. Authorized telemetry only.
            </p>
          </div>

          <div className="flex items-center justify-between pt-1 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-blue-900/60 border border-blue-700/50 flex items-center justify-center font-bold text-blue-300 text-xs">
                {currentRole === 'officer' ? 'SO' : currentRole === 'admin' ? 'AD' : 'PS'}
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-slate-200 capitalize">{currentRole} Mode</p>
                <p className="text-[10px] text-slate-400">Secured Session</p>
              </div>
            </div>
            <button
              onClick={logout}
              title="Sign Out"
              className="p-1.5 rounded-md text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
