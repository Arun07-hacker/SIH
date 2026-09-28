import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RiskBadge } from '../common/RiskBadge';
import { LoopProgress } from '../common/LoopProgress';
import {
  ClipboardList,
  Sparkles,
  UserCheck,
  TrendingUp,
  Clock,
  ArrowRight,
  CheckCircle,
  Edit3,
  XCircle,
  AlertTriangle,
  Calendar,
  ShieldAlert,
} from 'lucide-react';

export const PriorityReviewsView: React.FC = () => {
  const {
    personnelList,
    navigateToPersonnelAnalysis,
    navigateToProfile,
    openOfficerReview,
    updateRecommendation,
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'All' | 'Elevated' | 'Moderate'>('All');

  // Filter cases needing attention
  const priorityList = personnelList.filter(
    p =>
      (p.currentRisk === 'Elevated' || p.currentRisk === 'Moderate') &&
      (activeFilter === 'All' || p.currentRisk === activeFilter)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
              Priority Welfare Reviews & Recommendations
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[11px] font-bold">
              Human-in-the-Loop Triage
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Evaluate AI-proposed welfare interventions • Officers hold ultimate authority over all actions
          </p>
        </div>

        {/* Priority Filter */}
        <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs self-start md:self-auto">
          {(['All', 'Elevated', 'Moderate'] as const).map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                activeFilter === f
                  ? 'bg-navy-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {f === 'All' ? 'All Priority Cases' : `${f} Risk`}
            </button>
          ))}
        </div>
      </div>

      {/* Welfare Closed-Loop Architecture Header */}
      <LoopProgress currentStage="recommend" />

      {/* Philosophy Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-100 text-amber-800 shrink-0">
            <ShieldAlert className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-amber-900">
              Human-in-the-Loop Welfare Governance
            </h2>
            <p className="text-xs text-amber-800 mt-0.5">
              The AI never automatically reschedules duty or assigns leaves. Every recommendation must be independently reviewed, accepted, modified, or rejected by an authorized Welfare Officer.
            </p>
          </div>
        </div>
        <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-white/80 border border-amber-300 font-mono text-xs font-bold text-amber-900 whitespace-nowrap shadow-2xs">
          AI SUPPORTS. HUMANS DECIDE.
        </span>
      </div>

      {/* Priority Cards Grid */}
      <div className="space-y-4">
        {priorityList.map(person => {
          const isSpotlight = person.id === 'PS-1048';
          return (
            <div
              key={person.id}
              className={`bg-white rounded-2xl border transition-all p-5 shadow-xs ${
                isSpotlight
                  ? 'border-blue-400 ring-2 ring-blue-500/10'
                  : 'border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 flex items-center justify-center font-mono font-bold text-sm shrink-0">
                    {person.id.slice(-4)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigateToProfile(person.id)}
                        className="font-mono text-base font-extrabold text-blue-700 hover:underline"
                      >
                        {person.id}
                      </button>
                      <span className="text-xs font-semibold text-slate-600">({person.codeName})</span>
                      {isSpotlight && (
                        <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">
                          Primary Case Study
                        </span>
                      )}
                      <RiskBadge level={person.currentRisk} score={person.riskScore} />
                    </div>

                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span>
                        <strong>Unit:</strong> {person.unit}
                      </span>
                      <span>•</span>
                      <span>
                        <strong>Role:</strong> {person.role}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-rose-600 font-medium">
                        <TrendingUp className="w-3 h-3" />
                        Trend: {person.trend} (+{person.trend7d}% 7d)
                      </span>
                      <span>•</span>
                      <span>
                        <strong>Assessment:</strong> {person.lastAssessment}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start lg:self-auto">
                  <button
                    onClick={() => navigateToPersonnelAnalysis(person.id)}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors flex items-center gap-1"
                  >
                    <span>View Analysis</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      person.outcomeStatus === 'Outcome Measured: Improvement Observed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : person.outcomeStatus === 'Intervention Active'
                        ? 'bg-indigo-100 text-indigo-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {person.outcomeStatus || 'Awaiting Officer Review'}
                  </span>
                </div>
              </div>

              {/* Key Contributing Factors & Recommendations */}
              <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* Contributing factors */}
                <div className="lg:col-span-4 p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70 text-xs space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Contributing Factors
                  </p>
                  {person.contributingFactors.length > 0 ? (
                    <div className="space-y-1.5">
                      {person.contributingFactors.slice(0, 3).map(f => (
                        <div key={f.id} className="flex justify-between items-center text-[11px]">
                          <span className="text-slate-700">• {f.name}</span>
                          <span className="font-mono font-bold text-blue-700">+{f.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-400 italic">No acute factor flags</p>
                  )}
                  <p className="text-[10px] text-slate-400 pt-1 border-t border-slate-200">
                    Telemetry: {person.dutyHoursPerWeek}h/wk duty, {person.sleepAvgHours}h sleep avg.
                  </p>
                </div>

                {/* Personalized recommendations & action buttons */}
                <div className="lg:col-span-8 space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Personalized Welfare Recommendations ({person.recommendations.length})
                  </p>

                  <div className="space-y-2">
                    {person.recommendations.map(rec => (
                      <div
                        key={rec.id}
                        className="p-3 rounded-xl border border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-2xs hover:border-blue-300 transition-colors"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.2 rounded-full ${
                                rec.priority === 'High'
                                  ? 'bg-rose-100 text-rose-700'
                                  : 'bg-amber-100 text-amber-700'
                              }`}
                            >
                              {rec.priority}
                            </span>
                            <span className="font-bold text-slate-900">{rec.title}</span>
                            <span
                              className={`text-[10px] font-semibold px-2 py-0.2 rounded ${
                                rec.status === 'Accepted'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : rec.status === 'Modified'
                                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              Status: {rec.status}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500">
                            <strong>Reason:</strong> {rec.reason}
                          </p>
                          <p className="text-[11px] text-blue-800 font-semibold">
                            <strong>Action:</strong> {rec.modifiedAction || rec.suggestedAction}
                          </p>
                        </div>

                        {/* Interactive Officer Actions: Accept / Modify / Dismiss */}
                        <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
                          <button
                            onClick={() => openOfficerReview(rec)}
                            className="px-3 py-1.5 rounded-lg bg-navy-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center gap-1 shadow-xs"
                          >
                            <UserCheck className="w-3.5 h-3.5" />
                            <span>Review Decision</span>
                          </button>

                          <button
                            onClick={() =>
                              updateRecommendation(
                                person.id,
                                rec.id,
                                'Accepted',
                                'Direct officer fast-track approval without modification.'
                              )
                            }
                            title="Direct Accept"
                            className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 border border-slate-200 transition-colors"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => openOfficerReview(rec)}
                            title="Modify Action"
                            className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 border border-slate-200 transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() =>
                              updateRecommendation(
                                person.id,
                                rec.id,
                                'Rejected',
                                'Officer deemed unnecessary due to scheduled tactical leave.'
                              )
                            }
                            title="Dismiss Recommendation"
                            className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 border border-slate-200 transition-colors"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
