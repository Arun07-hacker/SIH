import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Database,
  Heart,
  Activity,
  CheckCircle2,
  Lock,
  FileText,
  Clock,
} from 'lucide-react';

export const DataSourcesModal: React.FC = () => {
  const { isDataSourcesModalOpen, setIsDataSourcesModalOpen, selectedPersonnel } = useApp();

  if (!isDataSourcesModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/70">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-blue-100 text-blue-800">
                <Database className="w-4 h-4" />
              </span>
              <h2 className="text-lg font-bold text-slate-900">
                Authorized Input Data Sources
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Active parameters utilized by AI risk indicator for{' '}
              <span className="font-mono font-bold text-blue-700">{selectedPersonnel.id}</span>
            </p>
          </div>
          <button
            onClick={() => setIsDataSourcesModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Privacy & Legal Consent Seal */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>Consent Verified & Audit-Logged</strong> — Defense Privacy Standards Act §14B compliant.
              </span>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono text-[11px] font-bold">
              VERIFIED
            </span>
          </div>

          {/* Section 1: Authorized Organizational Data */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Database className="w-4 h-4 text-blue-600" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                1. Authorized Organizational Telemetry (Official Roster)
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                <p className="text-[11px] text-slate-500 font-medium">Logged Duty Hours</p>
                <p className="font-bold text-slate-800 text-sm mt-0.5">{selectedPersonnel.dutyHoursPerWeek} hrs / week</p>
                <p className="text-[10px] text-slate-500 mt-1">Source: Unit Duty Roster DB</p>
              </div>
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                <p className="text-[11px] text-slate-500 font-medium">Forward Deployment Length</p>
                <p className="font-bold text-slate-800 text-sm mt-0.5">{selectedPersonnel.consecutiveDeploymentDays} days continuous</p>
                <p className="text-[10px] text-slate-500 mt-1">Source: Garrison Deployment Orders</p>
              </div>
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                <p className="text-[11px] text-slate-500 font-medium">Deferred Annual Leave</p>
                <p className="font-bold text-slate-800 text-sm mt-0.5">{selectedPersonnel.leaveDaysDeferred} days deferred</p>
                <p className="text-[10px] text-slate-500 mt-1">Source: HR Leave Management System</p>
              </div>
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                <p className="text-[11px] text-slate-500 font-medium">Tactical Workload Index</p>
                <p className="font-bold text-slate-800 text-sm mt-0.5">{selectedPersonnel.workloadIndex} / 100</p>
                <p className="text-[10px] text-slate-500 mt-1">Source: Operations Task Dispatch Logs</p>
              </div>
            </div>
          </div>

          {/* Section 2: Voluntary Wellness Data */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-4 h-4 text-emerald-600" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                2. Voluntary Wellness Data (Self-Reported)
              </h3>
            </div>
            <div className="p-3 rounded-lg border border-emerald-100 bg-emerald-50/50 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-700">Self-Reported Sleep Duration:</span>
                <span className="font-bold font-mono text-slate-900">{selectedPersonnel.sleepAvgHours} hrs / night</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-700">Self-Reported Sleep Quality:</span>
                <span className="font-bold font-mono text-slate-900">{selectedPersonnel.sleepQualityRating} / 5 (Restless)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-700">Self-Reported Stress Rating:</span>
                <span className="font-bold font-mono text-slate-900">{selectedPersonnel.stressRating} / 5</span>
              </div>
              <p className="text-[10px] text-slate-500 pt-1 border-t border-emerald-200/60">
                * Submitted voluntarily via Personnel Wellness Portal. Personnel may modify or withdraw consent at any time.
              </p>
            </div>
          </div>

          {/* Section 3: Optional Biometrics */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-amber-600" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                3. Optional Wearable / Biometric Data
              </h3>
            </div>
            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/70 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span>Heart Rate Variability (HRV) / Sleep Latency:</span>
                <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 text-[10px] font-bold">
                  OPTIONAL • RESTRICTED
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                Currently locked. Accessible strictly upon explicit individual biometric opt-in and under supervisory medical authority supervision.
              </p>
            </div>
          </div>

          {/* Trust Statement */}
          <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-[11px] text-slate-600 space-y-1">
            <p className="font-bold text-slate-800 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-blue-600" />
              Zero Surveillance Policy
            </p>
            <p>
              PersonnelShield AI strictly adheres to purpose limitation. Private communications, personal off-duty locations, and non-operational personal device telemetry are never collected or processed.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
          <button
            onClick={() => setIsDataSourcesModalOpen(false)}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-xs"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
