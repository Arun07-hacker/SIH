import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  UserCheck,
  CheckCircle,
  Edit3,
  XCircle,
  Calendar,
  FileText,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';

export const OfficerReviewModal: React.FC = () => {
  const {
    isOfficerReviewModalOpen,
    setIsOfficerReviewModalOpen,
    activeReviewRec,
    updateRecommendation,
    selectedPersonnel,
  } = useApp();

  const [decision, setDecision] = useState<'Accepted' | 'Modified' | 'Rejected'>('Accepted');
  const [modifiedAction, setModifiedAction] = useState('');
  const [officerNotes, setOfficerNotes] = useState('');
  const [scheduledDate, setScheduledDate] = useState('2026-10-05');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (activeReviewRec) {
      setModifiedAction(activeReviewRec.suggestedAction);
      setOfficerNotes(
        activeReviewRec.officerNotes ||
          'Met with personnel to review operational load. Verified excessive night rota; approved adjusted rest schedule.'
      );
      setDecision('Accepted');
      setIsSuccess(false);
    }
  }, [activeReviewRec]);

  if (!isOfficerReviewModalOpen || !activeReviewRec) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateRecommendation(
      activeReviewRec.personnelId,
      activeReviewRec.id,
      decision,
      officerNotes,
      scheduledDate,
      decision === 'Modified' ? modifiedAction : undefined
    );

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setIsOfficerReviewModalOpen(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-gradient-to-r from-slate-900 to-navy-900 text-white rounded-t-2xl">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-blue-600/30 text-blue-400 border border-blue-500/30">
                <UserCheck className="w-5 h-5" />
              </span>
              <h2 className="text-lg font-bold">Officer Review — Human-in-the-Loop</h2>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Independent military welfare officer evaluation for Case{' '}
              <span className="font-mono font-bold text-blue-300">{activeReviewRec.personnelId}</span>
            </p>
          </div>
          <button
            onClick={() => setIsOfficerReviewModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Core Principle Banner */}
        <div className="bg-amber-50 border-b border-amber-200/80 px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
            <span>AI SUPPORTS. HUMANS DECIDE.</span>
          </div>
          <span className="text-[11px] text-amber-700 font-medium">
            AI recommendations cannot be executed automatically
          </span>
        </div>

        {/* Form Body */}
        {isSuccess ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Officer Decision Recorded</h3>
            <p className="text-xs text-slate-500">
              Intervention workflow updated and permanently logged to audit ledger.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Stage Indicator: AI Rec -> Officer Review -> Final Decision */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                Decision Authority Pipeline
              </p>
              <div className="flex items-center justify-between text-xs font-medium">
                <div className="flex items-center gap-1.5 text-blue-700">
                  <span className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center font-bold text-[10px]">
                    1
                  </span>
                  <span>AI Recommendation</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                <div className="flex items-center gap-1.5 text-amber-800 font-bold">
                  <span className="w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center font-bold text-[10px]">
                    2
                  </span>
                  <span>Officer Review</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                <div className="flex items-center gap-1.5 text-emerald-700">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-[10px]">
                    3
                  </span>
                  <span>Final Decision</span>
                </div>
              </div>
            </div>

            {/* AI Proposal Card */}
            <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-900">{activeReviewRec.title}</span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-blue-200/80 text-blue-800">
                  AI Proposal • {activeReviewRec.priority} Priority
                </span>
              </div>
              <p className="text-xs text-slate-600">
                <strong>Reason:</strong> {activeReviewRec.reason}
              </p>
              <p className="text-xs text-blue-800 font-medium">
                <strong>Suggested Action:</strong> {activeReviewRec.suggestedAction}
              </p>
            </div>

            {/* Officer Decision Buttons */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Officer Evaluation & Action
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setDecision('Accepted')}
                  className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                    decision === 'Accepted'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-500/20 shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <CheckCircle className={`w-4 h-4 ${decision === 'Accepted' ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <span>Accept</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDecision('Modified')}
                  className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                    decision === 'Modified'
                      ? 'border-blue-500 bg-blue-50 text-blue-800 ring-2 ring-blue-500/20 shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <Edit3 className={`w-4 h-4 ${decision === 'Modified' ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span>Modify</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDecision('Rejected')}
                  className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                    decision === 'Rejected'
                      ? 'border-rose-500 bg-rose-50 text-rose-800 ring-2 ring-rose-500/20 shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <XCircle className={`w-4 h-4 ${decision === 'Rejected' ? 'text-rose-600' : 'text-slate-400'}`} />
                  <span>Dismiss</span>
                </button>
              </div>
            </div>

            {/* If Modified: custom action text */}
            {decision === 'Modified' && (
              <div className="fade-in">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Modified Welfare Intervention Directive:
                </label>
                <input
                  type="text"
                  value={modifiedAction}
                  onChange={e => setModifiedAction(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  placeholder="Specify amended operational or recovery directive..."
                  required
                />
              </div>
            )}

            {/* Officer Notes */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center justify-between">
                <span>Officer Clinical & Operational Notes:</span>
                <span className="text-[10px] text-slate-400 font-normal">Confidential Welfare Record</span>
              </label>
              <textarea
                rows={3}
                value={officerNotes}
                onChange={e => setOfficerNotes(e.target.value)}
                className="w-full p-3 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 placeholder:text-slate-400"
                placeholder="Document conversation context, operational considerations, or medical referrals..."
                required
              />
            </div>

            {/* Follow-up Scheduling */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Schedule Follow-Up Check-In:
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={e => setScheduledDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Responsible Welfare Officer:
                </label>
                <input
                  type="text"
                  disabled
                  value="Maj. S. Raman (Alpha Unit Welfare)"
                  className="w-full px-3 py-2 text-xs bg-slate-100 border border-slate-200 rounded-lg text-slate-600 font-medium cursor-not-allowed"
                />
              </div>
            </div>

            {/* Audit Preview */}
            <div className="p-3 rounded-lg bg-slate-100/70 border border-slate-200 text-[11px] text-slate-500 space-y-1 font-mono">
              <div className="flex justify-between">
                <span>Reviewed By: Maj. S. Raman</span>
                <span>Role: Welfare Officer</span>
              </div>
              <div className="flex justify-between">
                <span>Timestamp: Today, Live Demo Session</span>
                <span>Decision Status: {decision}</span>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsOfficerReviewModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-1.5"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Confirm & Log Decision</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
