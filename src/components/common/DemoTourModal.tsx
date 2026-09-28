import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Compass,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

export const DemoTourModal: React.FC = () => {
  const {
    isDemoTourOpen,
    setIsDemoTourOpen,
    setActiveTab,
    setSelectedPersonnelId,
    setCurrentRole,
    openOfficerReview,
    selectedPersonnel,
    setIsDataSourcesModalOpen,
  } = useApp();

  const [currentStep, setCurrentStep] = useState(0);

  const demoSteps = [
    {
      step: 1,
      title: 'Step 1: Role Authentication & Security Clearance',
      description: 'Logged in as Welfare Officer (Maj. S. Raman, Unit Alpha). Notice the operational enclave active indicator.',
      actionLabel: 'Go to Overview',
      onExecute: () => {
        setCurrentRole('officer');
        setActiveTab('dashboard');
      },
    },
    {
      step: 2,
      title: 'Step 2: Main Welfare Dashboard',
      description: 'View the primary operational command center: 1,248 total personnel, risk distribution breakdown, and pending welfare actions.',
      actionLabel: 'Examine Dashboard',
      onExecute: () => {
        setActiveTab('dashboard');
      },
    },
    {
      step: 3,
      title: 'Step 3: Interactive Risk Indicators & Time Horizon',
      description: 'Notice non-diagnostic terminology ("AI Risk Indicator", not medical labels). Toggle 7d / 30d / 90d to see dynamic updates.',
      actionLabel: 'Focus on Indicators',
      onExecute: () => {
        setActiveTab('dashboard');
      },
    },
    {
      step: 4,
      title: 'Step 4: Priority Welfare Reviews Queue',
      description: 'Observe prioritized cases flagged by early detection signals. Personnel PS-1048 is flagged with an Elevated Risk Indicator.',
      actionLabel: 'Inspect Priority Queue',
      onExecute: () => {
        setActiveTab('priority-reviews');
      },
    },
    {
      step: 5,
      title: 'Step 5: Select Showcase Case PS-1048',
      description: 'Open personnel dossier for PS-1048 (Field Operations, Alpha Division, 7 years service).',
      actionLabel: 'Open PS-1048 Profile',
      onExecute: () => {
        setSelectedPersonnelId('PS-1048');
        setActiveTab('profile');
      },
    },
    {
      step: 6,
      title: 'Step 6: AI Risk Analysis Metrics',
      description: 'View Current Indicator (Elevated 78/100) vs Previous (52/100), 7-day (+18%) and 30-day (+34%) trends, with 86% model confidence.',
      actionLabel: 'Open AI Risk Monitor',
      onExecute: () => {
        setSelectedPersonnelId('PS-1048');
        setActiveTab('risk-monitor');
      },
    },
    {
      step: 7,
      title: 'Step 7: Explainable AI (XAI) Breakdown',
      description: 'Inspect "Why this indicator changed". Transparent horizontal contribution bars: Extended Duty Hours (+32%), Sleep Disruption (+24%), Workload (+19%), etc.',
      actionLabel: 'Scroll to Factors',
      onExecute: () => {
        setActiveTab('risk-monitor');
      },
    },
    {
      step: 8,
      title: 'Step 8: Transparent Data Sources Verification',
      description: 'Click "View Data Sources" to show the cryptographic and legal boundary separating Authorized Organizational Data from Voluntary Wellness Data.',
      actionLabel: 'Open Data Sources Modal',
      onExecute: () => {
        setIsDataSourcesModalOpen(true);
      },
    },
    {
      step: 9,
      title: 'Step 9: Predictive Welfare Risk Trajectory',
      description: 'Analyze the 14-day projection line chart with uncertainty bands, labeled clearly: "AI Projection — Not a certainty".',
      actionLabel: 'View Projected Chart',
      onExecute: () => {
        setIsDataSourcesModalOpen(false);
        setActiveTab('risk-monitor');
      },
    },
    {
      step: 10,
      title: 'Step 10: Personalized Welfare Recommendations',
      description: 'The recommendation engine proposes tailored interventions: Welfare Check-In (High), Workload Review (Med), and Recovery Support (Med).',
      actionLabel: 'Inspect Recommendations',
      onExecute: () => {
        setActiveTab('risk-monitor');
      },
    },
    {
      step: 11,
      title: 'Step 11: Human-in-the-Loop Officer Review',
      description: 'The system enforces: "AI supports. Humans decide." Welfare officers have absolute authority to Accept, Modify, or Reject proposals.',
      actionLabel: 'Launch Officer Review',
      onExecute: () => {
        if (selectedPersonnel.recommendations.length > 0) {
          openOfficerReview(selectedPersonnel.recommendations[0]);
        }
      },
    },
    {
      step: 12,
      title: 'Step 12: Decision Execution & Scheduling',
      description: 'Officer reviews clinical notes, adjusts duty rota, and logs a 7-day follow-up. Changes are recorded to the immutable audit ledger.',
      actionLabel: 'View Welfare Actions',
      onExecute: () => {
        setActiveTab('welfare-actions');
      },
    },
    {
      step: 13,
      title: 'Step 13: Closed-Loop Outcome Measurement',
      description: 'Verify the complete welfare loop: DETECT → EXPLAIN → PREDICT → RECOMMEND → INTERVENTION → MEASURE OUTCOME. Observe measured risk drop.',
      actionLabel: 'Open Outcomes View',
      onExecute: () => {
        setActiveTab('outcomes');
      },
    },
    {
      step: 14,
      title: 'Step 14: Privacy & Ethics Center',
      description: 'Examine core privacy architecture: "WELFARE SUPPORT — NOT SURVEILLANCE", minimal data collection, role segregation, and zero location tracking.',
      actionLabel: 'Open Privacy Center',
      onExecute: () => {
        setActiveTab('privacy');
      },
    },
    {
      step: 15,
      title: 'Step 15: Switch to Personnel Role',
      description: 'Switch active view to "Personnel". The interface transforms from an officer command center to a supportive, voluntary self-service portal.',
      actionLabel: 'Switch to Personnel Portal',
      onExecute: () => {
        setCurrentRole('personnel');
        setActiveTab('wellness');
      },
    },
    {
      step: 16,
      title: 'Step 16: Voluntary Daily Self-Assessment',
      description: 'Personnel log voluntary sleep, stress, and mood on supportive 1-5 sliders. Explicit reassurance: 100% voluntary, confidential, zero surveillance.',
      actionLabel: 'Interact with Wellness App',
      onExecute: () => {
        setActiveTab('wellness');
      },
    },
    {
      step: 17,
      title: 'Step 17: Immutable Audit Trail',
      description: 'Switch back to Officer / Admin mode to review the audit log documenting all actions, timestamps, and resource accesses in chronological order.',
      actionLabel: 'View Audit Log',
      onExecute: () => {
        setCurrentRole('officer');
        setActiveTab('audit-log');
      },
    },
  ];

  if (!isDemoTourOpen) return null;

  const currentStepData = demoSteps[currentStep];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-xl w-full overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-navy-950 to-blue-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-blue-600/30 text-blue-400 border border-blue-500/30">
              <Compass className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-sm font-bold tracking-tight">Hackathon Presentation Walkthrough</h2>
              <p className="text-[11px] text-slate-300">
                Step {currentStep + 1} of {demoSteps.length} • PersonnelShield AI Workflow
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsDemoTourOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Content */}
        <div className="p-6 space-y-4">
          {/* Progress bar */}
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-blue-600 h-1.5 transition-all duration-300 rounded-full"
              style={{ width: `${((currentStep + 1) / demoSteps.length) * 100}%` }}
            />
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              Flow Stage 0{currentStep + 1}
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-2">{currentStepData.title}</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">{currentStepData.description}</p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => currentStepData.onExecute()}
              className="w-full py-2.5 px-4 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-2xs"
            >
              <span>{currentStepData.actionLabel}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            disabled={currentStep === 0}
            onClick={() => {
              const nextIdx = currentStep - 1;
              setCurrentStep(nextIdx);
              demoSteps[nextIdx].onExecute();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
              currentStep === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-700 hover:bg-slate-200/70'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex gap-1">
            {demoSteps.map((_, i) => (
              <span
                key={i}
                onClick={() => {
                  setCurrentStep(i);
                  demoSteps[i].onExecute();
                }}
                className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                  i === currentStep ? 'bg-blue-600 w-4' : 'bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => {
              if (currentStep < demoSteps.length - 1) {
                const nextIdx = currentStep + 1;
                setCurrentStep(nextIdx);
                demoSteps[nextIdx].onExecute();
              } else {
                setIsDemoTourOpen(false);
              }
            }}
            className="px-4 py-1.5 rounded-lg text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center gap-1 shadow-xs"
          >
            <span>{currentStep === demoSteps.length - 1 ? 'Finish Tour' : 'Next Step'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
