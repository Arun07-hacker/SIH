import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Smile,
  Moon,
  Zap,
  Activity,
  Heart,
  ShieldCheck,
  CheckCircle2,
  Lock,
  MessageSquare,
  Sparkles,
  HelpCircle,
} from 'lucide-react';

export const WellnessPortalView: React.FC = () => {
  const { selectedPersonnel, submitWellnessAssessment } = useApp();

  const [mood, setMood] = useState<number>(3);
  const [sleepHours, setSleepHours] = useState<number>(6.5);
  const [sleepQuality, setSleepQuality] = useState<number>(3);
  const [stress, setStress] = useState<number>(3);
  const [energy, setEnergy] = useState<number>(3);
  const [notes, setNotes] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const moodEmojis = [
    { val: 1, label: 'Exhausted / Strained', icon: '😫' },
    { val: 2, label: 'Somewhat Low', icon: '🙁' },
    { val: 3, label: 'Balanced / Steady', icon: '😐' },
    { val: 4, label: 'Good / Alert', icon: '🙂' },
    { val: 5, label: 'Optimal / Ready', icon: '😃' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitWellnessAssessment({
      timestamp: new Date().toISOString(),
      personnelId: selectedPersonnel.id,
      mood,
      sleepQuality,
      sleepHours,
      stress,
      energy,
      notes,
    });
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Supportive Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs font-semibold mb-3">
              <Heart className="w-3.5 h-3.5 text-blue-300" />
              <span>Personal Support Portal</span>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">My Daily Wellness Check-In</h1>
            <p className="text-xs text-blue-200 mt-1 max-w-lg">
              A private, non-diagnostic space to reflect on your physical stamina, sleep, and operational load.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/20 text-center sm:text-right">
            <span className="text-[10px] text-blue-300 uppercase tracking-wider block font-bold">
              Operator Dossier
            </span>
            <span className="font-mono text-sm font-bold text-white">{selectedPersonnel.id}</span>
            <span className="text-[11px] text-blue-200 block">{selectedPersonnel.rank}</span>
          </div>
        </div>

        {/* Privacy Reassurance Banner */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs text-blue-200">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-semibold text-white">Participation is 100% voluntary</span>
          </div>
          <span className="text-[11px] text-blue-300">
            Protected by Defense Personnel Privacy Code §14B
          </span>
        </div>
      </div>

      {submitted ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-xs text-center space-y-4 fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">Thank You for Checking In</h2>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Your voluntary responses have been encrypted and updated. Your proactive insights help ensure safe rotation and timely recovery.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 text-left max-w-md mx-auto space-y-2 text-xs">
            <p className="font-bold text-blue-950 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-600" />
              Immediate Wellness Recommendations for You:
            </p>
            <ul className="space-y-1 text-slate-600 list-disc list-inside text-[11px]">
              <li>Try the 4-7-8 breathing cadence before your next sleep window.</li>
              <li>Hydrate with electrolytes following high-tempo maneuvers.</li>
              <li>Unit Welfare Officer Maj. Raman is available for confidential coffee check-ins.</li>
            </ul>
          </div>

          <button
            onClick={() => setSubmitted(false)}
            className="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
          >
            Submit Another Update
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-8">
          {/* Question 1: Mood */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-900">
              1. How are you feeling today?
            </label>
            <p className="text-xs text-slate-500">
              Select the emotional baseline that best reflects your current mindset:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {moodEmojis.map(m => (
                <button
                  key={m.val}
                  type="button"
                  onClick={() => setMood(m.val)}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                    mood === m.val
                      ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-500/20 shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-2xl">{m.icon}</span>
                  <span className="text-[11px] font-semibold text-slate-700 mt-1">{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Question 2: Sleep Duration & Quality */}
          <div className="space-y-4 pt-6 border-t border-slate-100">
            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Moon className="w-4 h-4 text-indigo-600" />
                  2. How was your sleep during the last rest cycle?
                </label>
                <span className="font-mono text-sm font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {sleepHours} Hours
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">Approximate hours of actual sleep:</p>

              <div className="mt-3">
                <input
                  type="range"
                  min="2"
                  max="10"
                  step="0.5"
                  value={sleepHours}
                  onChange={e => setSleepHours(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                  <span>2 hrs (Severe Deficit)</span>
                  <span>6 hrs</span>
                  <span>10 hrs (Restorative)</span>
                </div>
              </div>
            </div>

            {/* Sleep Quality (1-5) */}
            <div className="pt-2">
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Sleep Restfulness Quality:
              </label>
              <div className="grid grid-cols-5 gap-2 text-center text-xs">
                {[
                  { score: 1, label: 'Fragmented' },
                  { score: 2, label: 'Restless' },
                  { score: 3, label: 'Moderate' },
                  { score: 4, label: 'Restful' },
                  { score: 5, label: 'Deeply Rested' },
                ].map(item => (
                  <button
                    key={item.score}
                    type="button"
                    onClick={() => setSleepQuality(item.score)}
                    className={`py-2 px-1 rounded-xl border text-xs font-semibold transition-all ${
                      sleepQuality === item.score
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-900 ring-2 ring-indigo-500/20 shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="block font-mono font-bold text-sm">{item.score}</span>
                    <span className="text-[10px] text-slate-500 mt-0.5 block">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Question 3: Stress Rating */}
          <div className="space-y-3 pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Activity className="w-4 h-4 text-rose-600" />
                3. How would you rate your current stress level?
              </label>
              <span className="font-mono text-sm font-bold text-slate-800">{stress} / 5</span>
            </div>
            <p className="text-xs text-slate-500">
              Considering current mission tempo, team cohesion, and fatigue:
            </p>

            <div className="grid grid-cols-5 gap-2">
              {[
                { val: 1, label: 'Calm / Relaxed' },
                { val: 2, label: 'Manageable' },
                { val: 3, label: 'Elevated' },
                { val: 4, label: 'High Pressure' },
                { val: 5, label: 'Overwhelmed' },
              ].map(s => (
                <button
                  key={s.val}
                  type="button"
                  onClick={() => setStress(s.val)}
                  className={`py-2.5 px-1 rounded-xl border text-center transition-all ${
                    stress === s.val
                      ? s.val >= 4
                        ? 'border-rose-500 bg-rose-50 text-rose-900 ring-2 ring-rose-500/20'
                        : 'border-blue-500 bg-blue-50 text-blue-900 ring-2 ring-blue-500/20'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="font-mono font-bold text-sm">{s.val}</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">{s.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Question 4: Optional Confidential Reflection Note */}
          <div className="space-y-2 pt-6 border-t border-slate-100">
            <label className="block text-sm font-bold text-slate-900 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-slate-500" />
                4. Private Reflection or Request (Optional)
              </span>
              <span className="text-[11px] text-slate-400 font-normal">Strictly Confidential</span>
            </label>
            <p className="text-xs text-slate-500">
              Anything specific affecting your sleep, family circumstances, or operational readiness?
            </p>
            <textarea
              rows={3}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="e.g., Night convoys causing sleep interruption, or request to discuss leave timing..."
              className="w-full p-3 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 placeholder:text-slate-400"
            />
          </div>

          {/* Privacy statement & submit button */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>Zero Surveillance Guarantee:</strong> Responses are never used punitively.
              </span>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Submit Voluntary Self-Assessment</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
