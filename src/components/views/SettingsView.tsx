import React from 'react';
import { useApp } from '../../context/AppContext';
import type { UserRole } from '../../types';
import {
  Settings,
  Shield,
  UserCheck,
  Check,
  X,
  Server,
  Lock,
  Cpu,
  RefreshCw,
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { currentRole, setCurrentRole } = useApp();

  const permissionsMatrix = [
    { feature: 'Command Dashboard & KPIs', officer: true, admin: true, personnel: false },
    { feature: 'Unit Personnel Directory', officer: true, admin: true, personnel: false },
    { feature: 'Individual AI Risk Monitor', officer: true, admin: false, personnel: false },
    { feature: 'Explainable AI Factor Attribution', officer: true, admin: false, personnel: false },
    { feature: '14-Day Predictive Trajectory', officer: true, admin: false, personnel: false },
    { feature: 'Officer Intervention Authority', officer: true, admin: false, personnel: false },
    { feature: 'Voluntary Self-Assessment Portal', officer: false, admin: false, personnel: true },
    { feature: 'Personal Wellness Dossier', officer: false, admin: false, personnel: true },
    { feature: 'Macro Organizational Analytics', officer: true, admin: true, personnel: false },
    { feature: 'Cryptographic Audit Trail', officer: true, admin: true, personnel: false },
    { feature: 'Access Control & System Config', officer: false, admin: true, personnel: false },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
              System Settings & Role-Based Access Control (RBAC)
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold">
              MIL-STD Enclave
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Access segregation boundaries preventing unauthorized exposure of individual wellness telemetry
          </p>
        </div>
      </div>

      {/* Interactive Role Switcher Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
            Active Operating Clearance
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Switch role to test dynamic interface adaptability and permission barriers
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(
            [
              {
                id: 'officer' as UserRole,
                title: 'Welfare Officer',
                holder: 'Maj. S. Raman',
                badge: 'Operational Care',
                desc: 'Full clinical triage, AI risk attribution, and intervention authority.',
              },
              {
                id: 'admin' as UserRole,
                title: 'Administrator',
                holder: 'Col. V. Rao',
                badge: 'Command Oversight',
                desc: 'HQ force-wide analytics, audit logs, and system settings.',
              },
              {
                id: 'personnel' as UserRole,
                title: 'Service Personnel',
                holder: 'Sgt. PS-1048',
                badge: 'Self-Service',
                desc: 'Voluntary daily self-assessment, personal guidance, and privacy controls.',
              },
            ] as const
          ).map(role => (
            <button
              key={role.id}
              onClick={() => setCurrentRole(role.id)}
              className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                currentRole === role.id
                  ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/20 shadow-xs'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{role.title}</span>
                  <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-slate-100 text-slate-600">
                    {role.badge}
                  </span>
                </div>
                <p className="text-[11px] font-mono font-semibold text-blue-700 mt-1">
                  {role.holder}
                </p>
                <p className="text-[11px] text-slate-500 mt-1 leading-snug">{role.desc}</p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                <span className="font-semibold text-slate-600">
                  {currentRole === role.id ? 'Currently Active' : 'Select Clearance'}
                </span>
                {currentRole === role.id && (
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* RBAC Granular Permissions Matrix */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
            Multi-Tenant Permission Boundaries Matrix
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Strict separation prevents HQ administrators from accessing confidential personal self-evaluations
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200/80 bg-slate-50/40 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Feature / Telemetry Stream</th>
                <th className="py-3 px-4 text-center">Welfare Officer</th>
                <th className="py-3 px-4 text-center">Administrator</th>
                <th className="py-3 px-4 text-center">Personnel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {permissionsMatrix.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-800">{row.feature}</td>
                  <td className="py-3 px-4 text-center">
                    {row.officer ? (
                      <span className="inline-flex p-1 rounded-full bg-emerald-100 text-emerald-700">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    ) : (
                      <span className="inline-flex p-1 rounded-full bg-slate-100 text-slate-400">
                        <X className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {row.admin ? (
                      <span className="inline-flex p-1 rounded-full bg-emerald-100 text-emerald-700">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    ) : (
                      <span className="inline-flex p-1 rounded-full bg-slate-100 text-slate-400">
                        <X className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {row.personnel ? (
                      <span className="inline-flex p-1 rounded-full bg-emerald-100 text-emerald-700">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    ) : (
                      <span className="inline-flex p-1 rounded-full bg-slate-100 text-slate-400">
                        <X className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
