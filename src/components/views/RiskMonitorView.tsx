import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RiskBadge } from '../common/RiskBadge';
import { LoopProgress } from '../common/LoopProgress';
import { mockPredictiveTrendPS1048, mockPredictiveTrendPostIntervention } from '../../data/mockData';
import {
  Sparkles,
  HelpCircle,
  TrendingUp,
  Activity,
  ShieldAlert,
  Database,
  Calendar,
  Clock,
  ArrowRight,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  Info,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  ComposedChart,
  ReferenceLine,
} from 'recharts';

export const RiskMonitorView: React.FC = () => {
  const {
    selectedPersonnel,
    setIsDataSourcesModalOpen,
    openOfficerReview,
    setActiveTab,
  } = useApp();

  const [simulationMode, setSimulationMode] = useState<'standard' | 'mitigated'>('standard');

  const p = selectedPersonnel;
  const chartData =
    simulationMode === 'standard'
      ? mockPredictiveTrendPS1048
      : mockPredictiveTrendPostIntervention;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
              AI-Assisted Welfare Risk Analysis
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold">
              Multi-Variate Inference
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Predictive modeling and explainable attribution for proactive force welfare management
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsDataSourcesModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5"
          >
            <Database className="w-3.5 h-3.5 text-blue-600" />
            <span>View Data Sources</span>
          </button>

          {p.recommendations.length > 0 && (
            <button
              onClick={() => openOfficerReview(p.recommendations[0])}
              className="px-4 py-2 rounded-xl bg-navy-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-md shadow-navy-900/20 flex items-center gap-1.5"
            >
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span>Launch Officer Review</span>
            </button>
          )}
        </div>
      </div>

      {/* Welfare Closed-Loop Architecture Header */}
      <LoopProgress currentStage="explain" />

      {/* Important Disclaimer Notice Banner */}
      <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200/80 flex items-start justify-between gap-3 text-xs text-blue-900">
        <div className="flex items-start gap-2.5">
          <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">AI Decision-Support Signal — Requires Human Review</p>
            <p className="text-[11px] text-blue-700 mt-0.5">
              AI-generated indicators are statistical patterns based on authorized workload and voluntary check-in signals. This system does NOT make medical or psychological diagnoses. Human officers retain sole decision authority.
            </p>
          </div>
        </div>
        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-blue-200/80 text-blue-900 font-bold whitespace-nowrap hidden sm:inline-block">
          Confidence: {p.modelConfidence}%
        </span>
      </div>

      {/* Primary KPI & Risk Gauge Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Large Indicator Card */}
        <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Primary Signal Status
              </p>
              <h2 className="text-base font-bold text-slate-900 font-mono mt-0.5">
                {p.id} • {p.unit}
              </h2>
            </div>
            <RiskBadge level={p.currentRisk} size="lg" score={p.riskScore} />
          </div>

          <div className="my-4 grid grid-cols-2 gap-4">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] text-slate-500 font-medium">Previous Indicator:</span>
              <p className="text-sm font-bold text-slate-800 mt-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                {p.previousRisk} ({p.previousScore}/100)
              </p>
              <span className="text-[10px] text-slate-400">Baseline 30 days prior</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] text-slate-500 font-medium">Model Confidence:</span>
              <p className="text-sm font-bold text-blue-700 mt-1 font-mono">
                {p.modelConfidence}% Confidence
              </p>
              <span className="text-[10px] text-slate-400">Multi-variate correlation index</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1 text-rose-600 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              7-Day Trend: +{p.trend7d}%
            </span>
            <span className="flex items-center gap-1 text-rose-600 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              30-Day Trend: +{p.trend30d}%
            </span>
          </div>
        </div>

        {/* Metric Card 2: Duty Workload Burden */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Authorized Operational Load
            </p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 font-mono">
                {p.dutyHoursPerWeek}h
              </span>
              <span className="text-xs font-bold text-rose-600">+45% vs baseline</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Logged duty over trailing 7-day period</p>
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-1.5 text-[11px]">
            <div className="flex justify-between">
              <span className="text-slate-500">Consecutive Deployment:</span>
              <span className="font-bold text-slate-800">{p.consecutiveDeploymentDays} days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Deferred Leave:</span>
              <span className="font-bold text-amber-600">{p.leaveDaysDeferred} days</span>
            </div>
          </div>
        </div>

        {/* Metric Card 3: Voluntary Sleep Telemetry */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Voluntary Sleep Telemetry
            </p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 font-mono">
                {p.sleepAvgHours}h
              </span>
              <span className="text-xs font-bold text-rose-600">Disrupted</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Self-reported sleep quality: 2/5</p>
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-1.5 text-[11px]">
            <div className="flex justify-between">
              <span className="text-slate-500">Self-Reported Stress:</span>
              <span className="font-bold text-rose-600">{p.stressRating} / 5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Voluntary Consent:</span>
              <span className="font-bold text-emerald-600">Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 10: EXPLAINABLE AI (XAI) BREAKDOWN */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              Explainable AI — Why This Indicator Changed
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              The AI identified changes in authorized workload and voluntary wellness data that contributed to the current risk indicator.
            </p>
          </div>

          <button
            onClick={() => setIsDataSourcesModalOpen(true)}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View Data Sources</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Contribution horizontal bars */}
        <div className="space-y-4 pt-1">
          {p.contributingFactors.map(factor => (
            <div key={factor.id} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-medium">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-800">{factor.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {factor.sourceType}
                  </span>
                </div>
                <span className="font-mono font-extrabold text-blue-700 text-sm">
                  +{factor.percentage}%
                </span>
              </div>

              {/* Bar track */}
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2.5 rounded-full transition-all duration-700"
                  style={{ width: `${factor.percentage * 2.5}%` }}
                />
              </div>

              <p className="text-[11px] text-slate-500">{factor.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 11: PREDICTIVE RISK TRENDS */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                Projected Welfare Risk Trend
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                14-Day Forward Forecast
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Past 30 Days historical telemetry + Next 14 Days AI projected trajectory with uncertainty band.
            </p>
          </div>

          {/* Simulation Toggle: With vs Without Intervention */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
            <button
              onClick={() => setSimulationMode('standard')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                simulationMode === 'standard'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Without Intervention (Status Quo)
            </button>
            <button
              onClick={() => setSimulationMode('mitigated')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                simulationMode === 'mitigated'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              With Officer Rest Directive
            </button>
          </div>
        </div>

        {/* Chart Callout */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200">
          <span>
            <strong>AI Projection:</strong> Not a diagnosis or certainty. Intended to support proactive welfare review before cumulative operational fatigue escalates.
          </span>
          <span className="font-mono text-slate-400">Model: ResNet-Enclave v3</span>
        </div>

        {/* Predictive Chart */}
        <div className="h-72 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="uncertaintyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={simulationMode === 'standard' ? '#EF4444' : '#10B981'}
                    stopOpacity={0.2}
                  />
                  <stop
                    offset="95%"
                    stopColor={simulationMode === 'standard' ? '#EF4444' : '#10B981'}
                    stopOpacity={0.02}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis domain={[20, 100]} tick={{ fontSize: 11 }} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-slate-900 text-white p-3 rounded-lg shadow-xl text-xs space-y-1">
                        <p className="font-bold text-slate-300">
                          {data.date} ({data.day})
                        </p>
                        {data.actualRisk !== undefined && (
                          <p className="text-emerald-400 font-mono font-bold">
                            Actual Recorded Risk: {data.actualRisk}
                          </p>
                        )}
                        {data.projectedRisk !== undefined && (
                          <p
                            className={`font-mono font-bold ${
                              simulationMode === 'standard' ? 'text-rose-400' : 'text-emerald-400'
                            }`}
                          >
                            AI Projected Risk: {data.projectedRisk}
                          </p>
                        )}
                        {data.uncertaintyLow !== undefined && (
                          <p className="text-[10px] text-slate-400 font-mono">
                            Confidence Band: {data.uncertaintyLow} - {data.uncertaintyHigh}
                          </p>
                        )}
                        {data.notes && (
                          <p className="text-[10px] text-amber-300 italic pt-1 border-t border-slate-700">
                            • {data.notes}
                          </p>
                        )}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <ReferenceLine
                x="Today"
                stroke="#64748B"
                strokeDasharray="4 4"
                label={{ value: 'Current Day', fill: '#64748B', fontSize: 10, position: 'top' }}
              />

              {/* Uncertainty Area */}
              <Area
                type="monotone"
                dataKey="uncertaintyHigh"
                stroke="none"
                fill="url(#uncertaintyGradient)"
              />

              {/* Historical actual risk line */}
              <Line
                type="monotone"
                dataKey="actualRisk"
                stroke="#2563EB"
                strokeWidth={3}
                dot={{ r: 4, fill: '#1E3A8A' }}
                name="Historical Recorded Indicator"
              />

              {/* Projected risk line */}
              <Line
                type="monotone"
                dataKey="projectedRisk"
                stroke={simulationMode === 'standard' ? '#EF4444' : '#10B981'}
                strokeWidth={2.5}
                strokeDasharray="5 5"
                dot={{ r: 4 }}
                name="Projected Trend"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-wrap items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-blue-600 inline-block"></span>
              Historical Telemetry
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className={`w-3 h-0.5 inline-block ${
                  simulationMode === 'standard' ? 'bg-rose-500' : 'bg-emerald-500'
                }`}
                style={{ borderTop: '2px dashed' }}
              ></span>
              AI Forward Projection
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('priority-reviews')}
              className="text-blue-600 font-bold hover:underline"
            >
              Proceed to Welfare Recommendations →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
