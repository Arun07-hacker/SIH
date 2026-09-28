import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { KpiCard } from '../common/KpiCard';
import { RiskBadge } from '../common/RiskBadge';
import { LoopProgress } from '../common/LoopProgress';
import {
  Users,
  ShieldCheck,
  AlertTriangle,
  ShieldAlert,
  Clock,
  TrendingUp,
  ArrowRight,
  ExternalLink,
  Filter,
  CheckCircle,
  HelpCircle,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  Legend,
} from 'recharts';

export const DashboardView: React.FC = () => {
  const {
    timeHorizon,
    setTimeHorizon,
    personnelList,
    navigateToPersonnelAnalysis,
    navigateToProfile,
    setActiveTab,
    openOfficerReview,
  } = useApp();

  const [activeUnitFilter, setActiveUnitFilter] = useState<string>('All');

  // Filtered by unit
  const filteredPersonnel = personnelList.filter(
    p => activeUnitFilter === 'All' || p.unit === activeUnitFilter
  );

  // Dynamic KPI counts based on time horizon
  const kpiData = {
    '7d': { total: 1248, low: 934, mod: 231, elevated: 83, pending: 28 },
    '30d': { total: 1248, low: 914, mod: 247, elevated: 87, pending: 32 },
    '90d': { total: 1248, low: 882, mod: 271, elevated: 95, pending: 41 },
  }[timeHorizon];

  // Donut chart data
  const donutData = [
    { name: 'Low Risk', value: kpiData.low, color: '#10B981' },
    { name: 'Moderate Risk', value: kpiData.mod, color: '#F59E0B' },
    { name: 'Elevated Risk', value: kpiData.elevated, color: '#EF4444' },
  ];

  // Unit breakdown bar chart data (dynamic by timeHorizon)
  const unitBreakdown = [
    {
      unit: 'Alpha Div',
      Low: timeHorizon === '7d' ? 320 : timeHorizon === '30d' ? 310 : 295,
      Moderate: timeHorizon === '7d' ? 70 : timeHorizon === '30d' ? 78 : 86,
      Elevated: timeHorizon === '7d' ? 24 : timeHorizon === '30d' ? 28 : 34,
    },
    {
      unit: 'Bravo Patrol',
      Low: timeHorizon === '7d' ? 260 : timeHorizon === '30d' ? 255 : 248,
      Moderate: timeHorizon === '7d' ? 52 : timeHorizon === '30d' ? 55 : 60,
      Elevated: timeHorizon === '7d' ? 14 : timeHorizon === '30d' ? 16 : 18,
    },
    {
      unit: 'Echo Recon',
      Low: timeHorizon === '7d' ? 140 : timeHorizon === '30d' ? 132 : 124,
      Moderate: timeHorizon === '7d' ? 48 : timeHorizon === '30d' ? 54 : 62,
      Elevated: timeHorizon === '7d' ? 26 : timeHorizon === '30d' ? 28 : 30,
    },
    {
      unit: 'Sierra Air',
      Low: timeHorizon === '7d' ? 124 : timeHorizon === '30d' ? 122 : 120,
      Moderate: timeHorizon === '7d' ? 35 : timeHorizon === '30d' ? 38 : 41,
      Elevated: timeHorizon === '7d' ? 12 : timeHorizon === '30d' ? 15 : 17,
    },
  ];

  // Historical trend data (dynamic based on 7d / 30d / 90d)
  const trendHistory = {
    '7d': [
      { date: 'Day 1', Low: 938, Moderate: 228, Elevated: 82 },
      { date: 'Day 2', Low: 936, Moderate: 230, Elevated: 82 },
      { date: 'Day 3', Low: 935, Moderate: 231, Elevated: 82 },
      { date: 'Day 4', Low: 934, Moderate: 232, Elevated: 82 },
      { date: 'Day 5', Low: 932, Moderate: 233, Elevated: 83 },
      { date: 'Day 6', Low: 933, Moderate: 232, Elevated: 83 },
      { date: 'Today', Low: 934, Moderate: 231, Elevated: 83 },
    ],
    '30d': [
      { date: 'Wk -4', Low: 940, Moderate: 225, Elevated: 83 },
      { date: 'Wk -3', Low: 932, Moderate: 234, Elevated: 82 },
      { date: 'Wk -2', Low: 924, Moderate: 240, Elevated: 84 },
      { date: 'Wk -1', Low: 918, Moderate: 244, Elevated: 86 },
      { date: 'Current', Low: 914, Moderate: 247, Elevated: 87 },
    ],
    '90d': [
      { date: 'M -3', Low: 960, Moderate: 215, Elevated: 73 },
      { date: 'M -2', Low: 942, Moderate: 232, Elevated: 74 },
      { date: 'M -1', Low: 926, Moderate: 242, Elevated: 80 },
      { date: 'Current', Low: 882, Moderate: 271, Elevated: 95 },
    ],
  }[timeHorizon];

  // Priority Cases (Filter those needing review)
  const priorityCases = personnelList.filter(
    p => p.currentRisk === 'Elevated' || p.currentRisk === 'Moderate'
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
              Personnel Welfare Overview
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold">
              Command Center
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            AI-assisted insights for proactive welfare support • Non-diagnostic decision support
          </p>
        </div>

        {/* Time Horizon Filter */}
        <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs self-start md:self-auto">
          <span className="text-[11px] font-semibold text-slate-400 pl-2 pr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            Window:
          </span>
          {(['7d', '30d', '90d'] as const).map(horizon => (
            <button
              key={horizon}
              onClick={() => setTimeHorizon(horizon)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                timeHorizon === horizon
                  ? 'bg-navy-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {horizon === '7d' ? '7 Days' : horizon === '30d' ? '30 Days' : '90 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* Welfare Closed-Loop Architecture Header */}
      <LoopProgress currentStage="detect" />

      {/* Top 5 KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4">
        <KpiCard
          title="Total Personnel"
          value={kpiData.total.toLocaleString()}
          subtitle="All active units tracked"
          icon={Users}
          indicatorColor="blue"
          badge={{ text: '100% Monitored', variant: 'neutral' }}
        />
        <KpiCard
          title="Low Risk"
          value={kpiData.low.toLocaleString()}
          subtitle={`${((kpiData.low / kpiData.total) * 100).toFixed(1)}% of total force`}
          icon={ShieldCheck}
          indicatorColor="emerald"
          badge={{ text: 'Optimal Baseline', variant: 'success' }}
        />
        <KpiCard
          title="Moderate Risk"
          value={kpiData.mod.toLocaleString()}
          subtitle="Watchlist & light load shift"
          icon={AlertTriangle}
          indicatorColor="amber"
          badge={{ text: 'Proactive Alert', variant: 'warning' }}
        />
        <KpiCard
          title="Elevated Risk"
          value={kpiData.elevated.toLocaleString()}
          subtitle="Priority officer triage"
          icon={ShieldAlert}
          indicatorColor="rose"
          badge={{ text: 'Action Required', variant: 'danger' }}
        />
        <KpiCard
          title="Pending Actions"
          value={kpiData.pending}
          subtitle="Awaiting officer decision"
          icon={Clock}
          indicatorColor="blue"
          onClick={() => setActiveTab('priority-reviews')}
          badge={{ text: 'Review Queue', variant: 'warning' }}
        />
      </div>

      {/* Interactive Risk Distribution & Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Donut Chart Distribution */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Force Risk Distribution
                </h2>
                <p className="text-[11px] text-slate-500">Trailing {timeHorizon} aggregate</p>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                Live Data
              </span>
            </div>

            <div className="h-56 mt-2 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={donutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {donutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: any) => [`${val} personnel`, 'Count']}
                    contentStyle={{ borderRadius: '8px', fontSize: '11px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Centered Donut KPI */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-extrabold text-slate-900">{kpiData.total}</span>
                <span className="text-[10px] font-semibold text-slate-400 uppercase">Personnel</span>
              </div>
            </div>
          </div>

          {/* Donut Legend */}
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-center">
            <div className="p-2 rounded-lg bg-emerald-50/60 border border-emerald-100">
              <p className="text-[10px] font-bold text-emerald-800 uppercase">Low</p>
              <p className="text-base font-extrabold text-emerald-700">{kpiData.low}</p>
            </div>
            <div className="p-2 rounded-lg bg-amber-50/60 border border-amber-100">
              <p className="text-[10px] font-bold text-amber-800 uppercase">Moderate</p>
              <p className="text-base font-extrabold text-amber-700">{kpiData.mod}</p>
            </div>
            <div className="p-2 rounded-lg bg-rose-50/60 border border-rose-100">
              <p className="text-[10px] font-bold text-rose-800 uppercase">Elevated</p>
              <p className="text-base font-extrabold text-rose-700">{kpiData.elevated}</p>
            </div>
          </div>
        </div>

        {/* Center: Unit Breakdown Bar Chart */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Unit Welfare Comparison
                </h2>
                <p className="text-[11px] text-slate-500">Risk posture by operational division</p>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold">
                Alpha Leading
              </span>
            </div>

            <div className="h-56 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={unitBreakdown} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="unit" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '11px' }} />
                  <Bar dataKey="Elevated" fill="#EF4444" stackId="a" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="Moderate" fill="#F59E0B" stackId="a" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="Low" fill="#10B981" stackId="a" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <p className="text-[10px] text-slate-400 text-center pt-2 border-t border-slate-100">
            Alpha Division and Echo Recon show higher deployment rotation load.
          </p>
        </div>

        {/* Right: Trend Line Chart */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Macro Risk Trend
                </h2>
                <p className="text-[11px] text-slate-500">Progression across selected {timeHorizon}</p>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold">
                Stabilized
              </span>
            </div>

            <div className="h-56 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                  <YAxis domain={['auto', 'auto']} tick={{ fontSize: 10 }} />
                  <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '11px' }} />
                  <Line type="monotone" dataKey="Elevated" stroke="#EF4444" strokeWidth={2.5} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="Moderate" stroke="#F59E0B" strokeWidth={2} dot={{ r: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
              Elevated: {kpiData.elevated}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
              Moderate: {kpiData.mod}
            </span>
            <button
              onClick={() => setActiveTab('analytics')}
              className="text-blue-600 font-bold hover:underline flex items-center gap-1"
            >
              Full Analytics →
            </button>
          </div>
        </div>
      </div>

      {/* Priority Welfare Reviews Section */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Header & Unit Filter */}
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/60">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                Priority Welfare Reviews
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold">
                Triage Queue
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Personnel exhibiting early elevated or accelerating stress and duty indicators
            </p>
          </div>

          {/* Unit selector buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {['All', 'Alpha Division', 'Echo Recon', 'Sierra Airfield', 'Bravo Patrol'].map(u => (
              <button
                key={u}
                onClick={() => setActiveUnitFilter(u)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                  activeUnitFilter === u
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {u}
              </button>
            ))}
          </div>
        </div>

        {/* Table / List */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200/80 bg-slate-50/40 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Personnel ID</th>
                <th className="py-3 px-4">Unit / Role</th>
                <th className="py-3 px-4">Current Risk Indicator</th>
                <th className="py-3 px-4">Key Contributing Factors</th>
                <th className="py-3 px-4">Recommended Action</th>
                <th className="py-3 px-4">Review Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPersonnel.slice(0, 6).map(person => {
                const isSpotlight = person.id === 'PS-1048';
                return (
                  <tr
                    key={person.id}
                    className={`transition-colors hover:bg-blue-50/40 ${
                      isSpotlight ? 'bg-amber-50/20' : ''
                    }`}
                  >
                    {/* Personnel ID */}
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigateToProfile(person.id)}
                          className="text-blue-700 hover:underline flex items-center gap-1 font-bold"
                        >
                          {person.id}
                        </button>
                        {isSpotlight && (
                          <span className="px-1.5 py-0.2 rounded bg-blue-100 text-blue-800 text-[10px] font-sans font-bold">
                            Showcase
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-sans font-normal text-slate-400 block">
                        {person.rank}
                      </span>
                    </td>

                    {/* Unit & Role */}
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-slate-800">{person.unit}</p>
                      <p className="text-[11px] text-slate-500">{person.role}</p>
                    </td>

                    {/* Risk Indicator */}
                    <td className="py-3.5 px-4">
                      <RiskBadge level={person.currentRisk} score={person.riskScore} />
                      <div className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-rose-500" />
                        <span>Trend: {person.trend} (+{person.trend7d}% 7d)</span>
                      </div>
                    </td>

                    {/* Contributing Factors */}
                    <td className="py-3.5 px-4 max-w-xs">
                      {person.contributingFactors.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {person.contributingFactors.slice(0, 3).map(f => (
                            <span
                              key={f.id}
                              className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium"
                            >
                              • {f.name}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-400 italic">
                          No acute factors identified
                        </span>
                      )}
                    </td>

                    {/* Recommended Action */}
                    <td className="py-3.5 px-4">
                      {person.recommendations.length > 0 ? (
                        <div className="space-y-0.5">
                          <p className="font-semibold text-slate-800">
                            {person.recommendations[0].title}
                          </p>
                          <p className="text-[11px] text-blue-700 line-clamp-1">
                            {person.recommendations[0].suggestedAction}
                          </p>
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-400">Regular rota</span>
                      )}
                    </td>

                    {/* Review Status */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                          person.outcomeStatus === 'Outcome Measured: Improvement Observed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : person.outcomeStatus === 'Follow-up Scheduled'
                            ? 'bg-blue-100 text-blue-800'
                            : person.outcomeStatus === 'Intervention Active'
                            ? 'bg-indigo-100 text-indigo-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        <Clock className="w-3 h-3" />
                        {person.outcomeStatus || 'Awaiting Officer Review'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => navigateToPersonnelAnalysis(person.id)}
                          className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-2xs flex items-center gap-1"
                        >
                          <span>View Analysis</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                        {person.recommendations.length > 0 && (
                          <button
                            onClick={() => openOfficerReview(person.recommendations[0])}
                            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
                            title="Quick Officer Review"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Showing priority flagged cases needing proactive officer evaluation</span>
          <button
            onClick={() => setActiveTab('priority-reviews')}
            className="text-blue-700 font-bold hover:underline flex items-center gap-1"
          >
            <span>View All Priority Reviews ({priorityCases.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
