import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { KpiCard } from '../common/KpiCard';
import {
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle,
  Activity,
  Heart,
  Smile,
  ShieldCheck,
  Filter,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export const AnalyticsView: React.FC = () => {
  const { currentRole } = useApp();
  const [selectedPeriod, setSelectedPeriod] = useState<'30d' | '90d' | '180d'>('90d');
  const [selectedUnit, setSelectedUnit] = useState<string>('All Units');

  // Multi-month risk trends
  const macroTrendData = [
    { month: 'Apr', Elevated: 110, Moderate: 260, Low: 878, Interventions: 42 },
    { month: 'May', Elevated: 102, Moderate: 254, Low: 892, Interventions: 38 },
    { month: 'Jun', Elevated: 98, Moderate: 250, Low: 900, Interventions: 35 },
    { month: 'Jul', Elevated: 91, Moderate: 248, Low: 909, Interventions: 36 },
    { month: 'Aug', Elevated: 89, Moderate: 245, Low: 914, Interventions: 34 },
    { month: 'Sep', Elevated: 87, Moderate: 247, Low: 914, Interventions: 32 },
  ];

  // Workload vs Stress correlation
  const correlationData = [
    { bracket: '<40h Duty', avgStress: 1.8, sleepAvg: 7.4, personnelCount: 420 },
    { bracket: '40-50h', avgStress: 2.4, sleepAvg: 6.8, personnelCount: 512 },
    { bracket: '50-60h', avgStress: 3.5, sleepAvg: 5.6, personnelCount: 229 },
    { bracket: '>60h Surge', avgStress: 4.3, sleepAvg: 4.5, personnelCount: 87 },
  ];

  // Sleep quality area chart
  const sleepTrendData = [
    { week: 'Wk 1', restful: 68, restless: 24, severe: 8 },
    { week: 'Wk 2', restful: 70, restless: 22, severe: 8 },
    { week: 'Wk 3', restful: 71, restless: 23, severe: 6 },
    { week: 'Wk 4', restful: 74, restless: 21, severe: 5 },
  ];

  // Intervention outcome breakdown
  const outcomeBreakdown = [
    { name: 'Resolved / Improved', value: 72, color: '#10B981' },
    { name: 'In Progress / Monitored', value: 22, color: '#3B82F6' },
    { name: 'Escalated to Medical', value: 6, color: '#F59E0B' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
              Organizational Welfare Intelligence
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold">
              Command Level
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Force-wide longitudinal trends, intervention efficacy, and sleep-to-workload attribution
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs self-start md:self-auto">
          {(['30d', '90d', '180d'] as const).map(p => (
            <button
              key={p}
              onClick={() => setSelectedPeriod(p)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                selectedPeriod === p
                  ? 'bg-navy-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {p === '30d' ? '30 Days' : p === '90d' ? '90 Days' : '6 Months'}
            </button>
          ))}
        </div>
      </div>

      {/* Top 4 Macro KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Intervention Efficacy"
          value="-38%"
          subtitle="Avg risk drop post-rest directive"
          icon={TrendingUp}
          indicatorColor="emerald"
          badge={{ text: 'Positive Impact', variant: 'success' }}
        />
        <KpiCard
          title="Follow-Up Completion"
          value="88.4%"
          subtitle="Officers meeting scheduled reviews"
          icon={CheckCircle}
          indicatorColor="blue"
          badge={{ text: 'Above Target', variant: 'success' }}
        />
        <KpiCard
          title="Avg Officer Response"
          value="4.2h"
          subtitle="From alert trigger to review initiation"
          icon={Clock}
          indicatorColor="emerald"
          badge={{ text: 'Fast Triage', variant: 'neutral' }}
        />
        <KpiCard
          title="Self-Check-In Adoption"
          value="79.2%"
          subtitle="Voluntary portal participation"
          icon={Smile}
          indicatorColor="blue"
          badge={{ text: 'Trust Validated', variant: 'neutral' }}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 6-Month Risk Progression */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Longitudinal Force Welfare Progression
              </h2>
              <p className="text-[11px] text-slate-500">
                Tracking decline in elevated indicators following proactive welfare policy
              </p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold">
              -21% Elevated YTD
            </span>
          </div>

          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={macroTrendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Line
                  type="monotone"
                  dataKey="Elevated"
                  stroke="#EF4444"
                  strokeWidth={2.5}
                  dot={{ r: 4 }}
                  name="Elevated Risk"
                />
                <Line
                  type="monotone"
                  dataKey="Moderate"
                  stroke="#F59E0B"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  name="Moderate Watchlist"
                />
                <Line
                  type="monotone"
                  dataKey="Interventions"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={{ r: 3 }}
                  name="Officer Welfare Actions"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Intervention Outcome Breakdown */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Intervention Outcomes
                </h2>
                <p className="text-[11px] text-slate-500">Post-action measurement</p>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                142 Cases
              </span>
            </div>

            <div className="h-52 relative mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={outcomeBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {outcomeBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: any) => [`${val}%`, 'Outcome']}
                    contentStyle={{ borderRadius: '8px', fontSize: '11px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-extrabold text-slate-900">72%</span>
                <span className="text-[10px] font-semibold text-emerald-600 uppercase">
                  Resolved
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-1.5 pt-3 border-t border-slate-100 text-xs">
            {outcomeBreakdown.map(item => (
              <div key={item.name} className="flex justify-between items-center text-[11px]">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span
                    className="w-2 h-2 rounded-full inline-block"
                    style={{ backgroundColor: item.color }}
                  />
                  {item.name}
                </span>
                <span className="font-mono font-bold text-slate-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Workload vs Stress Correlation & Sleep Quality Progression */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Workload vs Stress Bar Chart */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Workload vs Stress & Sleep Correlation
              </h2>
              <p className="text-[11px] text-slate-500">
                Empirical link between &gt;50h weekly duty and reported sleep deficit
              </p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold">
              r = 0.82 Strong
            </span>
          </div>

          <div className="h-60 mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={correlationData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="bracket" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} domain={[0, 8]} />
                <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="avgStress" fill="#EF4444" name="Avg Stress (1-5)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="sleepAvg" fill="#3B82F6" name="Avg Sleep Hours" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sleep Quality Progression Area Chart */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Rest Quality Progression
              </h2>
              <p className="text-[11px] text-slate-500">
                Weekly proportion of personnel reporting restorative sleep
              </p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold">
              74% Restful
            </span>
          </div>

          <div className="h-60 mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sleepTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="restfulGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="week" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Area
                  type="monotone"
                  dataKey="restful"
                  stroke="#10B981"
                  fill="url(#restfulGradient)"
                  name="Restful Sleep (%)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
