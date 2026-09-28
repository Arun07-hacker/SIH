import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RiskBadge } from '../common/RiskBadge';
import { LoopProgress } from '../common/LoopProgress';
import {
  HeartHandshake,
  Calendar,
  CheckCircle2,
  Clock,
  UserCheck,
  AlertCircle,
  FileText,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const WelfareActionsView: React.FC = () => {
  const { personnelList, updateRecommendation, addAuditLog, setActiveTab } = useApp();
  const [filter, setFilter] = useState<'All' | 'Active' | 'Completed'>('All');

  // Collect all interventions across personnel
  const allActions = personnelList.flatMap(person =>
    person.recommendations.map(rec => ({
      personnel: person,
      recommendation: rec,
    }))
  );

  const filteredActions = allActions.filter(item => {
    if (filter === 'Active') return item.recommendation.status === 'Accepted' || item.recommendation.status === 'Modified';
    if (filter === 'Completed') return item.recommendation.status === 'Completed';
    return true;
  });

  const handleMarkCompleted = (personnelId: string, recId: string) => {
    updateRecommendation(
      personnelId,
      recId,
      'Completed',
      'Follow-up welfare check-in completed. Operator confirmed rested status and improved sleep.'
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
              Welfare Interventions & Action Management
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
              Operational Oversight
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Tracking officer-approved rest directives, duty rota shifts, and scheduled follow-ups
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs self-start md:self-auto">
          {(['All', 'Active', 'Completed'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                filter === f
                  ? 'bg-navy-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Welfare Closed-Loop Architecture Header */}
      <LoopProgress currentStage="intervention" />

      {/* Interventions Table / Cards */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Active Welfare Directives ({filteredActions.length})
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Decisions executed by Welfare Officers with assigned follow-up dates
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            Audit Ledger Synchronization: Real-time
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredActions.map(({ personnel, recommendation }) => {
            const isCompleted = recommendation.status === 'Completed';
            const isApproved =
              recommendation.status === 'Accepted' || recommendation.status === 'Modified';

            return (
              <div
                key={`${personnel.id}-${recommendation.id}`}
                className="p-5 hover:bg-slate-50/50 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-mono font-bold text-blue-900 text-sm">
                      {personnel.id}
                    </span>
                    <span className="text-xs text-slate-600">({personnel.unit})</span>
                    <RiskBadge level={personnel.currentRisk} score={personnel.riskScore} size="sm" />
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isCompleted
                          ? 'bg-emerald-100 text-emerald-800'
                          : isApproved
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {recommendation.status}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900">
                    {recommendation.title}:{' '}
                    <span className="font-semibold text-blue-800">
                      {recommendation.modifiedAction || recommendation.suggestedAction}
                    </span>
                  </h3>

                  <p className="text-xs text-slate-500">
                    <strong>Reason:</strong> {recommendation.reason}
                  </p>

                  {recommendation.officerNotes && (
                    <div className="p-2 rounded-lg bg-slate-100/70 border border-slate-200/80 text-[11px] text-slate-700 flex items-start gap-1.5 mt-2">
                      <FileText className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Officer Clinical Note:</strong> {recommendation.officerNotes}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:text-right shrink-0">
                  <div className="text-xs">
                    <p className="text-slate-400 font-medium">Follow-Up Date</p>
                    <p className="font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-blue-600" />
                      {recommendation.scheduledDate || 'Scheduled next week'}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Responsible: {recommendation.responsibleRole}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {!isCompleted ? (
                      <button
                        onClick={() => handleMarkCompleted(personnel.id, recommendation.id)}
                        className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Log Follow-Up Complete</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => setActiveTab('outcomes')}
                        className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all flex items-center gap-1.5"
                      >
                        <span>View Measured Outcome</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
