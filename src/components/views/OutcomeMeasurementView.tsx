import React from 'react';
import { useApp } from '../../context/AppContext';
import { RiskBadge } from '../common/RiskBadge';
import { LoopProgress } from '../common/LoopProgress';
import {
  CheckCircle2,
  TrendingDown,
  Clock,
  Calendar,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  FileText,
  Activity,
  Award,
} from 'lucide-react';

export const OutcomeMeasurementView: React.FC = () => {
  const { personnelList, navigateToProfile } = useApp();

  // Resolved cases showcasing the closed-loop efficacy
  const measuredCases = [
    {
      id: 'PS-1014',
      unit: 'Alpha Division',
      role: 'Heavy Vehicle Operator',
      beforeScore: 78,
      beforeLevel: 'Elevated' as const,
      afterScore: 34,
      afterLevel: 'Low' as const,
      riskDelta: -44,
      interventionTitle: 'Mandatory 96h Rest & Night Shift Rotation',
      officer: 'Maj. S. Raman',
      completedDate: 'Sep 24, 2026',
      timeline: [
        { title: 'Early Risk Detected', date: 'Sep 08', note: 'Workload surge + sleep latency alert' },
        { title: 'Officer Triage & Review', date: 'Sep 09', note: 'Reviewed by Maj. Raman (Modified duty)' },
        { title: 'Welfare Action Commenced', date: 'Sep 10', note: 'Granted 4-day recovery pass' },
        { title: 'Follow-Up Check-In', date: 'Sep 20', note: 'Reported 7.4 hrs restful sleep' },
        { title: 'Outcome Measured', date: 'Sep 24', note: 'Risk score dropped from 78 to 34 (-56%)' },
      ],
    },
    {
      id: 'PS-1006',
      unit: 'Alpha Division',
      role: 'Field Operations',
      beforeScore: 56,
      beforeLevel: 'Moderate' as const,
      afterScore: 28,
      afterLevel: 'Low' as const,
      riskDelta: -28,
      interventionTitle: 'Tactical De-escalation & Peer Support Check-In',
      officer: 'Lt. Col. P. Sharma',
      completedDate: 'Sep 22, 2026',
      timeline: [
        { title: 'Early Risk Detected', date: 'Sep 02', note: 'Continuous forward exercise fatigue' },
        { title: 'Officer Triage & Review', date: 'Sep 04', note: 'Approved confidential peer session' },
        { title: 'Welfare Action Commenced', date: 'Sep 06', note: 'Reassigned to garrison training role' },
        { title: 'Follow-Up Check-In', date: 'Sep 18', note: 'Physical energy score improved to 4/5' },
        { title: 'Outcome Measured', date: 'Sep 22', note: 'Risk score normalized to 28 (-50%)' },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
              Closed-Loop Welfare Outcome Measurement
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
              Continuous Improvement
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Validating intervention efficacy through quantitative pre- and post-action comparative metrics
          </p>
        </div>
      </div>

      {/* Welfare Closed-Loop Architecture Header */}
      <LoopProgress currentStage="measure" />

      {/* Six-Stage Welfare Architecture Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          Complete Closed-Loop Lifecycle
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 text-center">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-mono text-slate-400 font-bold block">01</span>
            <p className="text-xs font-bold text-slate-800 mt-1">DETECT</p>
            <p className="text-[10px] text-slate-500 mt-0.5">Early Telemetry Flag</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-mono text-slate-400 font-bold block">02</span>
            <p className="text-xs font-bold text-slate-800 mt-1">EXPLAIN</p>
            <p className="text-[10px] text-slate-500 mt-0.5">Attribution Drivers</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-mono text-slate-400 font-bold block">03</span>
            <p className="text-xs font-bold text-slate-800 mt-1">PREDICT</p>
            <p className="text-[10px] text-slate-500 mt-0.5">14-Day Trajectory</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-mono text-slate-400 font-bold block">04</span>
            <p className="text-xs font-bold text-slate-800 mt-1">RECOMMEND</p>
            <p className="text-[10px] text-slate-500 mt-0.5">Action Proposals</p>
          </div>
          <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
            <span className="text-[10px] font-mono text-blue-600 font-bold block">05</span>
            <p className="text-xs font-bold text-blue-900 mt-1">HUMAN INTERVENE</p>
            <p className="text-[10px] text-blue-700 mt-0.5">Officer Decision</p>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
            <span className="text-[10px] font-mono text-emerald-600 font-bold block">06</span>
            <p className="text-xs font-bold text-emerald-900 mt-1">MEASURE OUTCOME</p>
            <p className="text-[10px] text-emerald-700 mt-0.5">Verified Recovery</p>
          </div>
        </div>
      </div>

      {/* Case Studies Demonstrating Verified Outcome Measurement */}
      <div className="space-y-6">
        {measuredCases.map(item => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-6"
          >
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-base font-extrabold text-blue-950">
                      Case {item.id}
                    </span>
                    <span className="text-xs text-slate-500">
                      ({item.unit} • {item.role})
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      Improvement Verified
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 mt-0.5 font-semibold">
                    Directive: {item.interventionTitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigateToProfile(item.id)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors"
                >
                  View Full Dossier
                </button>
              </div>
            </div>

            {/* Before vs After Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Before */}
              <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/30">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 block">
                  Prior to Intervention
                </span>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-rose-700 font-mono">
                    {item.beforeScore} / 100
                  </span>
                  <RiskBadge level={item.beforeLevel} size="sm" />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Elevated duty burden & acute sleep fragmentation
                </p>
              </div>

              {/* After */}
              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
                  Measured Post-Intervention
                </span>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-emerald-700 font-mono">
                    {item.afterScore} / 100
                  </span>
                  <RiskBadge level={item.afterLevel} size="sm" />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Restored baseline sleep (7.4h) & normalized duty rota
                </p>
              </div>

              {/* Net Impact */}
              <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/30 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 block">
                    Net Quantified Improvement
                  </span>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-blue-700 font-mono">
                      {item.riskDelta} Points
                    </span>
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
                      <TrendingDown className="w-4 h-4" />
                      -56% Risk
                    </span>
                  </div>
                </div>
                <span className="text-[10px] text-slate-500">
                  Reviewed by: {item.officer} on {item.completedDate}
                </span>
              </div>
            </div>

            {/* 5-Stage Chronological Timeline */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-3">
                Chronological Case Progression Timeline
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                {item.timeline.map((step, idx) => (
                  <div
                    key={step.title}
                    className="p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs relative"
                  >
                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                      <span>Phase 0{idx + 1}</span>
                      <span>{step.date}</span>
                    </div>
                    <p className="font-bold text-slate-800 mt-1">{step.title}</p>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">{step.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
