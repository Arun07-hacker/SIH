import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Radar, 
  HelpCircle, 
  TrendingUp, 
  Sparkles, 
  UserCheck, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';

interface LoopProgressProps {
  currentStage?: 'detect' | 'explain' | 'predict' | 'recommend' | 'intervention' | 'measure';
  className?: string;
}

export const LoopProgress: React.FC<LoopProgressProps> = ({ currentStage = 'detect', className = '' }) => {
  const { setActiveTab, navigateToPersonnelAnalysis } = useApp();

  const stages = [
    {
      id: 'detect',
      name: 'DETECT',
      sub: 'Early Signal',
      icon: Radar,
      tab: 'dashboard',
      desc: 'Workload & duty anomaly flags',
    },
    {
      id: 'explain',
      name: 'EXPLAIN',
      sub: 'Factor Breakdown',
      icon: HelpCircle,
      tab: 'risk-monitor',
      desc: 'Transparent contributing drivers',
    },
    {
      id: 'predict',
      name: 'PREDICT',
      sub: '14-Day Trajectory',
      icon: TrendingUp,
      tab: 'risk-monitor',
      desc: 'Burnout & fatigue trajectory',
    },
    {
      id: 'recommend',
      name: 'RECOMMEND',
      sub: 'Action Proposals',
      icon: Sparkles,
      tab: 'priority-reviews',
      desc: 'Tailored welfare options',
    },
    {
      id: 'intervention',
      name: 'HUMAN INTERVENTION',
      sub: 'Officer Decision',
      icon: UserCheck,
      tab: 'welfare-actions',
      desc: 'AI supports, Humans decide',
    },
    {
      id: 'measure',
      name: 'MEASURE OUTCOME',
      sub: 'Impact Review',
      icon: CheckCircle2,
      tab: 'outcomes',
      desc: 'Close the loop & verify recovery',
    },
  ];

  const handleStageClick = (stageId: string, targetTab: string) => {
    if (stageId === 'explain' || stageId === 'predict') {
      navigateToPersonnelAnalysis('PS-1048');
    } else {
      setActiveTab(targetTab);
    }
  };

  return (
    <div className={`bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs ${className}`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
          <span className="text-xs font-bold tracking-wider uppercase text-slate-700">
            PersonnelShield Welfare Loop Architecture
          </span>
        </div>
        <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
          Continuous Closed-Loop Decision Support
        </span>
      </div>

      <div className="mt-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          const isActive = currentStage === stage.id;
          return (
            <button
              key={stage.id}
              onClick={() => handleStageClick(stage.id, stage.tab)}
              className={`relative text-left p-3 rounded-lg border transition-all duration-150 flex flex-col justify-between group ${
                isActive
                  ? 'bg-blue-50/80 border-blue-400 ring-2 ring-blue-500/20 shadow-xs'
                  : 'bg-slate-50/70 border-slate-200/70 hover:bg-slate-100/80 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="text-[10px] font-mono font-bold text-slate-400 group-hover:text-blue-600">
                  0{idx + 1}
                </span>
                <div
                  className={`p-1 rounded ${
                    isActive ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 shadow-2xs group-hover:text-blue-600'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>

              <div>
                <p className={`text-xs font-bold tracking-tight ${isActive ? 'text-blue-900' : 'text-slate-800'}`}>
                  {stage.name}
                </p>
                <p className="text-[10px] font-medium text-slate-500 truncate">{stage.sub}</p>
              </div>

              {idx < stages.length - 1 && (
                <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-slate-300 pointer-events-none">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
