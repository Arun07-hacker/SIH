import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bell,
  AlertTriangle,
  ShieldAlert,
  Clock,
  ArrowRight,
  CheckCircle,
  XCircle,
  Filter,
  Check,
} from 'lucide-react';

export const AlertsView: React.FC = () => {
  const { alerts, dismissAlert, reviewAlert } = useApp();
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const categories = [
    'All',
    'Rapid Change',
    'Elevated Risk Indicator',
    'Workload Concern',
    'Follow-up Due',
    'Missed Wellness Check-In',
  ];

  const filteredAlerts = alerts.filter(
    a => categoryFilter === 'All' || a.category === categoryFilter
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
              Operational Welfare Alerts Center
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[11px] font-bold">
              Real-Time Telemetry
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Automated event triggers detecting rapid metric escalations and missed follow-up deadlines
          </p>
        </div>

        <div className="text-xs font-semibold text-slate-500">
          Showing {filteredAlerts.length} operational signals
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-2 overflow-x-auto">
        <span className="text-xs font-bold text-slate-400 flex items-center gap-1 pl-1">
          <Filter className="w-3.5 h-3.5" />
          Category:
        </span>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              categoryFilter === cat
                ? 'bg-navy-900 text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Alerts Feed */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-xs text-slate-500">
            <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            No active alerts matching the selected category.
          </div>
        ) : (
          filteredAlerts.map(alert => {
            const isHigh = alert.severity === 'high';
            const isMed = alert.severity === 'medium';

            return (
              <div
                key={alert.id}
                className={`bg-white rounded-2xl border p-5 shadow-xs transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  alert.dismissed
                    ? 'opacity-60 bg-slate-50/80 border-slate-200'
                    : isHigh
                    ? 'border-rose-200 bg-rose-50/20'
                    : isMed
                    ? 'border-amber-200 bg-amber-50/10'
                    : 'border-slate-200'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`p-3 rounded-xl shrink-0 ${
                      isHigh
                        ? 'bg-rose-100 text-rose-700'
                        : isMed
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {isHigh ? <ShieldAlert className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-extrabold text-blue-900">
                        {alert.personnelId}
                      </span>
                      <span className="text-xs text-slate-500">({alert.unit})</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.2 rounded-full uppercase ${
                          isHigh
                            ? 'bg-rose-100 text-rose-800'
                            : isMed
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {alert.category}
                      </span>
                      <span className="text-[11px] text-slate-400">• {alert.timestamp}</span>
                    </div>

                    <h2 className="text-sm font-bold text-slate-900">{alert.title}</h2>
                    <p className="text-xs text-slate-600">{alert.reason}</p>

                    <div className="mt-2 text-xs text-blue-800 font-medium flex items-center gap-1.5">
                      <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
                      <span>
                        <strong>Recommended Next Step:</strong> {alert.recommendedNextStep}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
                  {!alert.dismissed ? (
                    <>
                      <button
                        onClick={() => reviewAlert(alert.id)}
                        className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                      >
                        <span>Review Deep Dive</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => dismissAlert(alert.id)}
                        className="px-3 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-semibold transition-colors"
                      >
                        Dismiss
                      </button>
                    </>
                  ) : (
                    <span className="text-xs text-slate-400 font-semibold italic flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      Dismissed & Logged
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
