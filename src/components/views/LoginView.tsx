import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { UserRole } from '../../types';
import {
  Shield,
  Lock,
  User,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Zap,
} from 'lucide-react';

export const LoginView: React.FC = () => {
  const { login } = useApp();
  const [selectedRole, setSelectedRole] = useState<UserRole>('officer');
  const [email, setEmail] = useState('officer.alpha@forces.shield.gov');
  const [password, setPassword] = useState('••••••••••••');

  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'officer') {
      setEmail('maj.raman@welfare.forces.gov');
    } else if (role === 'admin') {
      setEmail('col.rao@hq.command.gov');
    } else {
      setEmail('sgt.ps1048@personnel.gov');
    }
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    login(selectedRole);
  };

  const handleDemoMode = () => {
    // Instant demo launch as Welfare Officer
    login('officer');
  };

  return (
    <div className="min-h-screen bg-[#F6F8FB] flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* Top Bar Banner */}
      <div className="w-full bg-navy-950 text-slate-300 border-b border-slate-800 px-6 py-2.5 text-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="font-mono text-slate-200">Defense Enclave v3.2 • Secure Welfare Node</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[11px] text-slate-400">
          <span>Authorized Access Only</span>
          <span>•</span>
          <span>MIL-STD-810H Telemetry Enclave</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          {/* Left Hero Panel */}
          <div className="md:col-span-5 bg-gradient-to-br from-navy-950 via-slate-900 to-blue-950 p-8 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 mb-6">
                <Shield className="w-6 h-6" />
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/20 text-blue-300 text-xs font-semibold mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Gen Welfare Intelligence</span>
              </div>

              <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight leading-tight">
                PersonnelShield <span className="text-blue-400">AI</span>
              </h1>
              <p className="mt-2 text-sm text-slate-300 font-medium italic">
                "Data-driven insights. Human-centered care."
              </p>
              <p className="mt-4 text-xs text-slate-400 leading-relaxed">
                An AI-powered predictive personnel stress and welfare monitoring system engineered specifically for uniformed defense forces.
              </p>
            </div>

            {/* Principles Badges */}
            <div className="mt-8 space-y-3 border-t border-slate-800/80 pt-6">
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Early detection & Explainable AI</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Human-in-the-Loop decision authority</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Welfare support — NOT surveillance</span>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800 text-[11px] text-slate-400 font-medium">
              Stronger Forces • Healthier Minds • Safer Nation
            </div>
          </div>

          {/* Right Login / Demo Form */}
          <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight">System Sign In</h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Select your operational role to access authorized telemetry
                  </p>
                </div>
                <span className="p-2 rounded-xl bg-slate-100 text-slate-600">
                  <Lock className="w-5 h-5" />
                </span>
              </div>

              {/* One-Click Demo Mode Button (Prominent for Judges) */}
              <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold text-blue-950 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-blue-600" />
                    Hackathon Evaluation Quick-Start
                  </p>
                  <p className="text-[11px] text-blue-700/90 mt-0.5">
                    Launch complete interactive dashboard with live mock data instantly.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleDemoMode}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20 shrink-0 flex items-center gap-1.5"
                >
                  <span>Demo Mode</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSignIn} className="mt-6 space-y-4">
                {/* Role Selector Tabs */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                    Operating Role
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(
                      [
                        { id: 'officer', label: 'Welfare Officer' },
                        { id: 'admin', label: 'Administrator' },
                        { id: 'personnel', label: 'Personnel' },
                      ] as const
                    ).map(r => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => handleRoleChange(r.id)}
                        className={`py-2 px-1 text-center rounded-xl border text-xs font-semibold transition-all ${
                          selectedRole === r.id
                            ? 'bg-navy-900 border-navy-900 text-white shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Email / Username */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Service ID or Email
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 font-mono"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Security Passcode
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
                      required
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-xs flex items-center justify-center gap-2 mt-4"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Sign In with Credentials</span>
                </button>
              </form>
            </div>

            {/* Privacy statement footer */}
            <div className="mt-6 pt-4 border-t border-slate-100 text-center">
              <p className="text-[11px] text-slate-500 font-medium">
                Authorized data only • Privacy-first • Human-in-the-loop
              </p>
              <p className="text-[10px] text-slate-400 mt-1">
                AI-assisted welfare indicators are decision-support signals, not medical diagnoses.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-4 text-center text-xs text-slate-400 border-t border-slate-200">
        PersonnelShield AI © 2026 • Proactive • Predictive • Preventive
      </div>
    </div>
  );
};
