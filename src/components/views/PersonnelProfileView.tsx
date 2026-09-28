import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RiskBadge } from '../common/RiskBadge';
import {
  Shield,
  CheckCircle2,
  Lock,
  Clock,
  Calendar,
  Activity,
  Heart,
  Database,
  ArrowRight,
  TrendingUp,
  UserCheck,
  FileText,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';

export const PersonnelProfileView: React.FC = () => {
  const {
    selectedPersonnel,
    navigateToPersonnelAnalysis,
    openOfficerReview,
    setIsDataSourcesModalOpen,
  } = useApp();

  const [activeTab, setActiveTabState] = useState<
    'overview' | 'duty' | 'wellness' | 'recommendations' | 'history'
  >('overview');

  const p = selectedPersonnel;

  return (
    <div className="space-y-6">
      {/* Top Banner / Dossier Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-navy-900 to-blue-900 text-white flex items-center justify-center font-mono font-extrabold text-xl shadow-md shadow-blue-900/20">
              {p.id.slice(-4)}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-mono tracking-tight">
                  {p.id}
                </h1>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {p.codeName}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Consent Verified
                </span>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-500">
                <span>
                  <strong>Rank:</strong> {p.rank}
                </span>
                <span>•</span>
                <span>
                  <strong>Unit:</strong> {p.unit}
                </span>
                <span>•</span>
                <span>
                  <strong>Role:</strong> {p.role}
                </span>
                <span>•</span>
                <span>
                  <strong>Station:</strong> {p.location}
                </span>
                <span>•</span>
                <span>
                  <strong>Service:</strong> {p.yearsOfService} Years
                </span>
              </div>
            </div>
          </div>

          {/* Quick status & CTA */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-right">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Current Welfare Signal
              </p>
              <div className="mt-1 flex items-center justify-end gap-2">
                <RiskBadge level={p.currentRisk} score={p.riskScore} />
              </div>
            </div>

            <button
              onClick={() => navigateToPersonnelAnalysis(p.id)}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20 flex items-center gap-1.5"
            >
              <Activity className="w-4 h-4" />
              <span>Deep AI Risk Analysis</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs inside Dossier */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'duty', label: 'Authorized Duty Pattern' },
            { id: 'wellness', label: 'Voluntary Wellness' },
            { id: 'recommendations', label: 'Welfare Recommendations' },
            { id: 'history', label: 'Intervention History' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTabState(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-navy-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* THREE DISTINCT DATA BOUNDARY PANELS (Crucial for Privacy & Compliance) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Boundary 1: Authorized Organizational Data */}
        <div className="bg-white rounded-xl border border-blue-200/80 p-5 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-blue-100">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-blue-600" />
              Authorized Organizational Data
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
              Official
            </span>
          </div>

          <div className="mt-4 space-y-3 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Weekly Duty Hours:</span>
              <span className="font-bold font-mono text-rose-600">{p.dutyHoursPerWeek} hrs</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Consecutive Deployment:</span>
              <span className="font-bold font-mono text-slate-800">
                {p.consecutiveDeploymentDays} days
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Deferred Leave Balance:</span>
              <span className="font-bold font-mono text-amber-600">{p.leaveDaysDeferred} days</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Workload Index:</span>
              <span className="font-bold font-mono text-rose-600">{p.workloadIndex} / 100</span>
            </div>
          </div>
          <p className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-400">
            Telemetry ingested automatically via garrison duty rosters and command dispatches.
          </p>
        </div>

        {/* Boundary 2: Voluntary Wellness Data */}
        <div className="bg-white rounded-xl border border-emerald-200/80 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-emerald-600" />
              Voluntary Wellness Data
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
              Opt-In
            </span>
          </div>

          <div className="mt-4 space-y-3 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Self-Reported Sleep Avg:</span>
              <span className="font-bold font-mono text-rose-600">{p.sleepAvgHours} hrs / night</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Sleep Quality Rating:</span>
              <span className="font-bold font-mono text-amber-600">
                {p.sleepQualityRating} / 5 (Restless)
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Self-Reported Stress:</span>
              <span className="font-bold font-mono text-rose-600">{p.stressRating} / 5 (High)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Self-Reported Mood:</span>
              <span className="font-bold font-mono text-amber-600">{p.moodRating} / 5</span>
            </div>
          </div>
          <p className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-400">
            Voluntarily logged via personnel portal. Individual responses protected under privacy policy.
          </p>
        </div>

        {/* Boundary 3: Optional Biometrics */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs bg-slate-50/40">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-slate-500" />
              Optional Biometric Data
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
              Restricted
            </span>
          </div>

          <div className="mt-4 space-y-3 text-xs text-slate-600">
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Heart Rate Variability (HRV):</span>
              <span className="font-mono text-slate-400 italic">Not enabled</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Continuous Skin Temp:</span>
              <span className="font-mono text-slate-400 italic">Not enabled</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Sleep Architecture (Stages):</span>
              <span className="font-mono text-slate-400 italic">Consent pending</span>
            </div>
          </div>
          <p className="mt-4 pt-3 border-t border-slate-200 text-[10px] text-slate-500 leading-snug">
            Only processed with explicit written consent and authorized medical authority clearance.
          </p>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-6">
        {/* Section 1: AI Risk Contributing Factors Breakdown */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                Key Contributing Risk Factors
              </h2>
              <p className="text-xs text-slate-500">
                Multi-variate attribution calculated across authorized organizational & voluntary parameters
              </p>
            </div>

            <button
              onClick={() => setIsDataSourcesModalOpen(true)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors flex items-center gap-1.5"
            >
              <Database className="w-3.5 h-3.5 text-blue-600" />
              <span>View Data Sources</span>
            </button>
          </div>

          <div className="space-y-3">
            {p.contributingFactors.map(factor => (
              <div
                key={factor.id}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5 hover:bg-white hover:border-slate-300 transition-all"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 font-bold text-slate-800">
                    <span>{factor.name}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.2 rounded-full bg-slate-200/70 text-slate-600">
                      {factor.sourceType}
                    </span>
                  </div>
                  <span className="font-mono font-extrabold text-blue-700">+{factor.percentage}%</span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${factor.percentage * 2}%` }}
                  />
                </div>

                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{factor.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Personalized Welfare Recommendations & Officer Actions */}
        <div className="pt-6 border-t border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-600" />
                Personalized Welfare Recommendations
              </h2>
              <p className="text-xs text-slate-500">
                Action proposals requiring Welfare Officer evaluation and scheduling
              </p>
            </div>
            <span className="text-xs text-slate-500 font-semibold italic">
              AI supports. Humans decide.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {p.recommendations.map(rec => (
              <div
                key={rec.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        rec.priority === 'High'
                          ? 'bg-rose-100 text-rose-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {rec.priority} Priority
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        rec.status === 'Accepted'
                          ? 'bg-emerald-100 text-emerald-700'
                          : rec.status === 'Modified'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {rec.status}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 mt-2">{rec.title}</h3>
                  <p className="text-xs text-slate-600 mt-1">{rec.reason}</p>
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <p className="text-[11px] text-blue-800 font-semibold mb-2">
                    Action: {rec.modifiedAction || rec.suggestedAction}
                  </p>
                  <button
                    onClick={() => openOfficerReview(rec)}
                    className="w-full py-2 px-3 rounded-lg bg-navy-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Launch Officer Review</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
