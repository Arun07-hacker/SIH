import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import type { UserRole } from '../../types';
import {
  Menu,
  Search,
  Bell,
  CheckCircle,
  HelpCircle,
  X,
  ExternalLink,
} from 'lucide-react';

interface TopBarProps {
  onToggleSidebar: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onToggleSidebar }) => {
  const {
    currentRole,
    setCurrentRole,
    alerts,
    unreadAlertCount,
    reviewAlert,
    dismissAlert,
    searchQuery,
    setSearchQuery,
    personnelList,
    navigateToPersonnelAnalysis,
    setIsDemoTourOpen,
  } = useApp();

  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const alertRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (alertRef.current && !alertRef.current.contains(e.target as Node)) {
        setIsAlertsOpen(false);
      }
      if (roleRef.current && !roleRef.current.contains(e.target as Node)) {
        setIsRoleMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered personnel matching search query
  const searchResults = searchQuery.trim()
    ? personnelList.filter(
        p =>
          p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.unit.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const rolesList: { id: UserRole; title: string; badge: string; desc: string }[] = [
    {
      id: 'officer',
      title: 'Welfare Officer',
      badge: 'Operational Care',
      desc: 'Access to triage, AI analysis, explainability, recommendations & interventions',
    },
    {
      id: 'admin',
      title: 'Administrator',
      badge: 'Command Oversight',
      desc: 'HQ analytics, unit comparisons, audit logs, and access governance',
    },
    {
      id: 'personnel',
      title: 'Personnel View',
      badge: 'Self-Service',
      desc: 'Voluntary self-assessment, privacy controls, and personal welfare feedback',
    },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 lg:px-8 py-3 flex items-center justify-between">
      {/* Left section: mobile hamburger & search */}
      <div className="flex items-center gap-3 lg:gap-6 flex-1">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Input with quick-results dropdown */}
        <div ref={searchRef} className="relative w-full max-w-xs md:max-w-md">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search personnel ID (e.g. PS-1048), unit, role..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              className="w-full pl-9 pr-8 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs placeholder:text-slate-400 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Autocomplete dropdown */}
          {isSearchFocused && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden divide-y divide-slate-100 max-h-72 overflow-y-auto">
              <div className="px-3 py-2 bg-slate-50 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                Matching Personnel ({searchResults.length})
              </div>
              {searchResults.slice(0, 6).map(p => (
                <button
                  key={p.id}
                  onClick={() => {
                    navigateToPersonnelAnalysis(p.id);
                    setIsSearchFocused(false);
                    setSearchQuery('');
                  }}
                  className="w-full px-3 py-2 text-left hover:bg-blue-50/60 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-bold text-blue-900">{p.id}</span>
                    <span className="text-xs text-slate-700">{p.unit}</span>
                    <span className="text-[11px] text-slate-400">({p.role})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        p.currentRisk === 'Elevated'
                          ? 'bg-rose-100 text-rose-700'
                          : p.currentRisk === 'Moderate'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {p.currentRisk}
                    </span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right section: demo walkthrough, notifications, role switcher */}
      <div className="flex items-center gap-2 lg:gap-3">
        {/* Hackathon Demo Flow Quick Guide */}
        <button
          onClick={() => setIsDemoTourOpen(true)}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-50 text-blue-700 border border-blue-200/80 hover:bg-blue-100 transition-all shadow-2xs"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Demo Guide</span>
        </button>

        {/* Alerts Notification Bell */}
        <div ref={alertRef} className="relative">
          <button
            onClick={() => setIsAlertsOpen(!isAlertsOpen)}
            className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Alerts"
          >
            <Bell className="w-4 h-4" />
            {unreadAlertCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-600 ring-2 ring-white"></span>
            )}
          </button>

          {/* Alerts Dropdown */}
          {isAlertsOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden divide-y divide-slate-100">
              <div className="px-4 py-3 bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-slate-800">Operational Alerts</span>
                  {unreadAlertCount > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold">
                      {unreadAlertCount} new
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-slate-500">Live triage feed</span>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {alerts.filter(a => !a.dismissed).length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-500">
                    <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                    All active alerts reviewed & cleared.
                  </div>
                ) : (
                  alerts
                    .filter(a => !a.dismissed)
                    .map(alert => (
                      <div
                        key={alert.id}
                        className={`p-3 text-xs transition-colors hover:bg-slate-50 ${
                          !alert.reviewed ? 'bg-blue-50/30' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-bold text-slate-900">{alert.title}</span>
                          <span className="text-[10px] text-slate-400 whitespace-nowrap">
                            {alert.timestamp}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">{alert.reason}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                            {alert.personnelId}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => {
                                reviewAlert(alert.id);
                                setIsAlertsOpen(false);
                              }}
                              className="px-2 py-0.5 text-[11px] font-medium rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                            >
                              Review
                            </button>
                            <button
                              onClick={() => dismissAlert(alert.id)}
                              className="px-2 py-0.5 text-[11px] font-medium rounded text-slate-500 hover:bg-slate-100 transition-colors"
                            >
                              Dismiss
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Role Selector Dropdown */}
        <div ref={roleRef} className="relative">
          <button
            onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 bg-slate-100/80 hover:bg-slate-200/70 border border-slate-200/80 rounded-lg transition-colors"
          >
            <div className="w-6 h-6 rounded-md bg-navy-900 text-white font-mono text-[10px] font-bold flex items-center justify-center">
              {currentRole === 'officer' ? 'WO' : currentRole === 'admin' ? 'AD' : 'PE'}
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-bold text-slate-800 leading-tight">
                {currentRole === 'officer'
                  ? 'Welfare Officer'
                  : currentRole === 'admin'
                  ? 'Administrator'
                  : 'Personnel'}
              </p>
              <p className="text-[10px] text-slate-500 font-medium">Switch Role ▼</p>
            </div>
          </button>

          {isRoleMenuOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden divide-y divide-slate-100">
              <div className="p-3 bg-slate-50">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Switch Operational Role
                </p>
                <p className="text-[11px] text-slate-500">
                  Simulates multi-tenant role-based permissions
                </p>
              </div>

              <div className="p-1 space-y-1">
                {rolesList.map(r => (
                  <button
                    key={r.id}
                    onClick={() => {
                      setCurrentRole(r.id);
                      setIsRoleMenuOpen(false);
                    }}
                    className={`w-full p-2.5 rounded-lg text-left transition-colors flex items-start justify-between ${
                      currentRole === r.id ? 'bg-blue-50/80 border border-blue-200' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-900">{r.title}</span>
                        <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                          {r.badge}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">{r.desc}</p>
                    </div>
                    {currentRole === r.id && (
                      <span className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
