import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Lock,
  Shield,
  ShieldCheck,
  CheckCircle2,
  Database,
  Heart,
  EyeOff,
  FileCheck,
  Server,
  UserCheck,
  FileText,
  Key,
} from 'lucide-react';

export const PrivacyCenterView: React.FC = () => {
  const { currentRole } = useApp();

  const privacyPillars = [
    {
      title: 'Authorized Data Only',
      desc: 'Only telemetry formally sanctioned under operational regulations is ingested. Private communications, personal off-duty locations, and civilian browsing are strictly excluded.',
      icon: Database,
      badge: 'Strict Scope',
    },
    {
      title: 'Consent-Based Wellness',
      desc: 'All psychological and subjective wellness inputs are 100% voluntary. Operators can pause, modify, or permanently revoke voluntary data sharing at any moment.',
      icon: Heart,
      badge: 'Voluntary',
    },
    {
      title: 'Role-Based Access Controls',
      desc: 'Strict multi-tier segregation. Welfare officers only see assigned division triage; HQ administrators view anonymized macro aggregations; individual personnel maintain private access to their own data.',
      icon: UserCheck,
      badge: 'Granular RBAC',
    },
    {
      title: 'Cryptographic Enclave & Encryption',
      desc: 'AES-256-GCM hardware encryption at rest and TLS 1.3 in transit. Processing occurs inside isolated defense cloud secure enclaves.',
      icon: Key,
      badge: 'MIL-STD Enclave',
    },
    {
      title: 'Immutable Audit Ledger',
      desc: 'Every single record query, officer modification, and review note is permanently recorded with microsecond timestamps and operator cryptographic signatures.',
      icon: FileCheck,
      badge: 'Zero Tampering',
    },
    {
      title: 'Data Minimization Principle',
      desc: 'No unnecessary data ingestion. Raw logs are converted to statistical indices, with automatic expiration and purged retention schedules.',
      icon: EyeOff,
      badge: 'Purpose Limited',
    },
  ];

  const dataClassification = [
    {
      category: 'Authorized Organizational Data',
      source: 'Unit Duty Rosters, Deployment Orders, HR Leave Systems',
      status: 'Mandatory Operational Baseline',
      color: 'blue',
      items: ['Duty hours per rotation', 'Deployment duration', 'Deferred leave balances', 'Operational workload index'],
    },
    {
      category: 'Voluntary Wellness Telemetry',
      source: 'Personnel Wellness Portal',
      status: 'Consent-Based Opt-In',
      color: 'emerald',
      items: ['Self-reported sleep quality & hours', 'Self-reported stress rating', 'Daily mood baseline', 'Confidential reflection requests'],
    },
    {
      category: 'Optional Biometric & Wearable Data',
      source: 'Approved Defense Health Wearables',
      status: 'Restricted • Medical Approval Required',
      color: 'amber',
      items: ['Heart Rate Variability (HRV)', 'Resting heart rate trends', 'Sleep latency architecture'],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Principle Banner */}
      <div className="bg-gradient-to-r from-navy-950 via-slate-900 to-blue-950 text-white rounded-3xl p-8 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Privacy by Design & Defense Ethics</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            WELFARE SUPPORT — NOT SURVEILLANCE
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            PersonnelShield AI is built from the ground up around non-punitive, human-centered care. AI indicators are decision-support signals designed to protect service personnel from cumulative fatigue and burnout — never to penalize, rank, or surveil.
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-emerald-400 font-bold font-mono text-sm block">100%</span>
            <span className="text-[10px] text-slate-300">Voluntary Wellness</span>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-blue-400 font-bold font-mono text-sm block">Zero</span>
            <span className="text-[10px] text-slate-300">Location Surveillance</span>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-indigo-400 font-bold font-mono text-sm block">AES-256</span>
            <span className="text-[10px] text-slate-300">Hardware Encryption</span>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-amber-400 font-bold font-mono text-sm block">Immutable</span>
            <span className="text-[10px] text-slate-300">Audit Logging</span>
          </div>
        </div>
      </div>

      {/* 6 Core Pillars of Privacy */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4">
          Six Architecture Pillars of Privacy by Design
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {privacyPillars.map(pillar => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-xl bg-blue-50 text-blue-700">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 mt-3">{pillar.title}</h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{pillar.desc}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[10px] text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Enforced at Enclave Firmware Layer</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Data Classification Matrix */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
            Data Classification & Ingestion Boundaries
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Transparent mapping of operational parameters to legal authorization levels
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {dataClassification.map(c => (
            <div
              key={c.category}
              className={`p-4 rounded-xl border flex flex-col justify-between ${
                c.color === 'blue'
                  ? 'bg-blue-50/40 border-blue-200'
                  : c.color === 'emerald'
                  ? 'bg-emerald-50/40 border-emerald-200'
                  : 'bg-amber-50/40 border-amber-200'
              }`}
            >
              <div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    c.color === 'blue'
                      ? 'bg-blue-100 text-blue-800'
                      : c.color === 'emerald'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {c.status}
                </span>

                <h3 className="text-xs font-bold text-slate-900 mt-2">{c.category}</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">{c.source}</p>

                <ul className="mt-3 space-y-1 text-xs text-slate-700">
                  {c.items.map(item => (
                    <li key={item} className="flex items-center gap-1.5 text-[11px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-[10px] text-slate-400 mt-4 pt-2 border-t border-slate-200">
                {c.color === 'amber'
                  ? 'Currently locked. Requires legal clearance.'
                  : 'Audit-logged in tamper-evident ledger.'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
