import React, { createContext, useContext, useState, useMemo } from 'react';
import type { UserRole, Personnel, AlertItem, AuditEntry, Recommendation, WellnessSubmission } from '../types';
import { mockPersonnelList, mockAlerts, mockAuditLogs } from '../data/mockData';

interface AppContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  isAuthenticated: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedPersonnelId: string;
  setSelectedPersonnelId: (id: string) => void;
  selectedPersonnel: Personnel;
  personnelList: Personnel[];
  timeHorizon: '7d' | '30d' | '90d';
  setTimeHorizon: (val: '7d' | '30d' | '90d') => void;
  alerts: AlertItem[];
  unreadAlertCount: number;
  dismissAlert: (id: string) => void;
  reviewAlert: (id: string) => void;
  auditLogs: AuditEntry[];
  addAuditLog: (action: string, resource: string, details: string) => void;
  updateRecommendation: (
    personnelId: string,
    recId: string,
    status: 'Accepted' | 'Modified' | 'Rejected' | 'Completed',
    officerNotes?: string,
    scheduledDate?: string,
    modifiedAction?: string
  ) => void;
  submitWellnessAssessment: (data: WellnessSubmission) => void;
  // Modals & Tour
  isDataSourcesModalOpen: boolean;
  setIsDataSourcesModalOpen: (open: boolean) => void;
  isOfficerReviewModalOpen: boolean;
  setIsOfficerReviewModalOpen: (open: boolean) => void;
  activeReviewRec: Recommendation | null;
  openOfficerReview: (rec: Recommendation) => void;
  isDemoTourOpen: boolean;
  setIsDemoTourOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  navigateToPersonnelAnalysis: (id: string) => void;
  navigateToProfile: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRoleState] = useState<UserRole>('officer');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // start in demo mode or login
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedPersonnelId, setSelectedPersonnelId] = useState<string>('PS-1048');
  const [personnelList, setPersonnelList] = useState<Personnel[]>(mockPersonnelList);
  const [timeHorizon, setTimeHorizon] = useState<'7d' | '30d' | '90d'>('30d');
  const [alerts, setAlerts] = useState<AlertItem[]>(mockAlerts);
  const [auditLogs, setAuditLogs] = useState<AuditEntry[]>(mockAuditLogs);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals
  const [isDataSourcesModalOpen, setIsDataSourcesModalOpen] = useState<boolean>(false);
  const [isOfficerReviewModalOpen, setIsOfficerReviewModalOpen] = useState<boolean>(false);
  const [activeReviewRec, setActiveReviewRec] = useState<Recommendation | null>(null);
  const [isDemoTourOpen, setIsDemoTourOpen] = useState<boolean>(false);

  const selectedPersonnel = useMemo(() => {
    return personnelList.find(p => p.id === selectedPersonnelId) || personnelList[0];
  }, [personnelList, selectedPersonnelId]);

  const unreadAlertCount = useMemo(() => {
    return alerts.filter(a => !a.dismissed && !a.reviewed).length;
  }, [alerts]);

  const setCurrentRole = (role: UserRole) => {
    setCurrentRoleState(role);
    if (role === 'personnel') {
      // In personnel view, default to PS-1048's personal self-assessment portal
      setSelectedPersonnelId('PS-1048');
      setActiveTab('wellness');
    } else if (role === 'admin') {
      setActiveTab('analytics');
    } else {
      setActiveTab('dashboard');
    }
    addAuditLog('SWITCH_ROLE', `Role: ${role}`, `Switched active operational role to ${role}`);
  };

  const login = (role: UserRole) => {
    setCurrentRoleState(role);
    setIsAuthenticated(true);
    if (role === 'personnel') {
      setActiveTab('wellness');
    } else if (role === 'admin') {
      setActiveTab('analytics');
    } else {
      setActiveTab('dashboard');
    }
    addAuditLog('USER_AUTHENTICATION', 'PersonnelShield Core Enclave', `Authenticated as ${role}`);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const addAuditLog = (action: string, resource: string, details: string) => {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    const userMap: Record<UserRole, string> = {
      officer: 'Maj. S. Raman (Welfare Officer)',
      admin: 'Col. V. Rao (HQ Welfare Director)',
      personnel: `Operator ${selectedPersonnelId}`,
    };

    const newEntry: AuditEntry = {
      id: `aud-${Date.now()}`,
      timestamp: timeStr,
      user: userMap[currentRole],
      role: currentRole === 'officer' ? 'Welfare Officer' : currentRole === 'admin' ? 'Administrator' : 'Personnel',
      action,
      resource,
      details,
      ipAddress: '10.14.2.88',
    };

    setAuditLogs(prev => [newEntry, ...prev]);
  };

  const dismissAlert = (id: string) => {
    setAlerts(prev => prev.map(a => (a.id === id ? { ...a, dismissed: true } : a)));
    addAuditLog('DISMISS_ALERT', `Alert: ${id}`, 'Officer acknowledged and dismissed alert notification');
  };

  const reviewAlert = (id: string) => {
    const target = alerts.find(a => a.id === id);
    if (target) {
      setAlerts(prev => prev.map(a => (a.id === id ? { ...a, reviewed: true } : a)));
      setSelectedPersonnelId(target.personnelId);
      setActiveTab('risk-monitor');
      addAuditLog('REVIEW_ALERT', `Alert: ${id} (${target.personnelId})`, `Navigated to deep AI analysis for ${target.personnelId}`);
    }
  };

  const openOfficerReview = (rec: Recommendation) => {
    setActiveReviewRec(rec);
    setIsOfficerReviewModalOpen(true);
  };

  const updateRecommendation = (
    personnelId: string,
    recId: string,
    status: 'Accepted' | 'Modified' | 'Rejected' | 'Completed',
    officerNotes?: string,
    scheduledDate?: string,
    modifiedAction?: string
  ) => {
    setPersonnelList(prev =>
      prev.map(p => {
        if (p.id !== personnelId) return p;

        const updatedRecs = p.recommendations.map(r => {
          if (r.id !== recId) return r;
          return {
            ...r,
            status,
            officerNotes: officerNotes || r.officerNotes,
            scheduledDate: scheduledDate || r.scheduledDate,
            modifiedAction: modifiedAction || r.modifiedAction,
            updatedAt: 'Just now',
          };
        });

        // Determine new overall outcome status if intervention accepted/modified
        let newOutcomeStatus = p.outcomeStatus;
        if (status === 'Accepted' || status === 'Modified') {
          newOutcomeStatus = 'Intervention Active';
        } else if (status === 'Completed') {
          newOutcomeStatus = 'Outcome Measured: Improvement Observed';
        }

        return {
          ...p,
          recommendations: updatedRecs,
          outcomeStatus: newOutcomeStatus,
        };
      })
    );

    addAuditLog(
      `OFFICER_${status.toUpperCase()}_RECOMMENDATION`,
      `${personnelId} / ${recId}`,
      `Officer decision: ${status}. Action: ${modifiedAction || 'Standard suggested action'}. Notes: ${officerNotes || 'None'}`
    );
  };

  const submitWellnessAssessment = (data: WellnessSubmission) => {
    // Dynamically adjust personnel voluntary wellness metrics
    setPersonnelList(prev =>
      prev.map(p => {
        if (p.id !== data.personnelId) return p;
        return {
          ...p,
          moodRating: data.mood,
          sleepQualityRating: data.sleepQuality,
          sleepAvgHours: data.sleepHours,
          stressRating: data.stress,
          lastAssessment: 'Just now (Voluntary check-in)',
        };
      })
    );

    addAuditLog(
      'SUBMIT_VOLUNTARY_WELLNESS',
      `${data.personnelId} / Wellness Portal`,
      `Voluntary self-assessment submitted. Mood: ${data.mood}/5, Stress: ${data.stress}/5, Sleep: ${data.sleepHours}h.`
    );
  };

  const navigateToPersonnelAnalysis = (id: string) => {
    setSelectedPersonnelId(id);
    setActiveTab('risk-monitor');
    addAuditLog('NAVIGATE_AI_ANALYSIS', id, `Opened AI risk analysis and explainability suite for ${id}`);
  };

  const navigateToProfile = (id: string) => {
    setSelectedPersonnelId(id);
    setActiveTab('profile');
    addAuditLog('VIEW_PERSONNEL_PROFILE', id, `Opened individual personnel dossier for ${id}`);
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        isAuthenticated,
        login,
        logout,
        activeTab,
        setActiveTab,
        selectedPersonnelId,
        setSelectedPersonnelId,
        selectedPersonnel,
        personnelList,
        timeHorizon,
        setTimeHorizon,
        alerts,
        unreadAlertCount,
        dismissAlert,
        reviewAlert,
        auditLogs,
        addAuditLog,
        updateRecommendation,
        submitWellnessAssessment,
        isDataSourcesModalOpen,
        setIsDataSourcesModalOpen,
        isOfficerReviewModalOpen,
        setIsOfficerReviewModalOpen,
        activeReviewRec,
        openOfficerReview,
        isDemoTourOpen,
        setIsDemoTourOpen,
        searchQuery,
        setSearchQuery,
        navigateToPersonnelAnalysis,
        navigateToProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
