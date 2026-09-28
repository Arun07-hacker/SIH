import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RiskBadge } from '../common/RiskBadge';
import type { RiskLevel } from '../../types';
import {
  Users,
  Search,
  Filter,
  CheckCircle,
  Eye,
  Activity,
  ArrowRight,
  ShieldAlert,
  UserCheck,
} from 'lucide-react';

export const PersonnelDirectoryView: React.FC = () => {
  const {
    personnelList,
    navigateToPersonnelAnalysis,
    navigateToProfile,
    openOfficerReview,
  } = useApp();

  const [search, setSearch] = useState('');
  const [selectedRisk, setSelectedRisk] = useState<string>('All');
  const [selectedUnit, setSelectedUnit] = useState<string>('All');

  const filteredList = personnelList.filter(p => {
    const matchesSearch =
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.unit.toLowerCase().includes(search.toLowerCase()) ||
      p.role.toLowerCase().includes(search.toLowerCase()) ||
      p.rank.toLowerCase().includes(search.toLowerCase());

    const matchesRisk = selectedRisk === 'All' || p.currentRisk === selectedRisk;
    const matchesUnit = selectedUnit === 'All' || p.unit === selectedUnit;

    return matchesSearch && matchesRisk && matchesUnit;
  });

  const units = ['All', 'Alpha Division', 'Bravo Patrol', 'Echo Recon', 'Sierra Airfield', 'Cyber Command'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
              Personnel Welfare Directory
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold">
              {personnelList.length} Active Records
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Uniformed forces authorized roster • Confidential welfare records & consent verification
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search box */}
          <div className="relative w-full md:flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by ID (e.g. PS-1048), rank, division, or assignment..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          {/* Unit dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">Unit:</span>
            <select
              value={selectedUnit}
              onChange={e => setSelectedUnit(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              {units.map(u => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Risk Pills */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100 overflow-x-auto">
          <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            Risk:
          </span>
          {['All', 'Elevated', 'Moderate', 'Low'].map(r => (
            <button
              key={r}
              onClick={() => setSelectedRisk(r)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                selectedRisk === r
                  ? 'bg-navy-900 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Personnel Records Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200/80 bg-slate-50/50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Personnel</th>
                <th className="py-3 px-4">Unit & Location</th>
                <th className="py-3 px-4">Risk Indicator</th>
                <th className="py-3 px-4">Duty Hours / Wk</th>
                <th className="py-3 px-4">Deployment</th>
                <th className="py-3 px-4">Sleep Avg</th>
                <th className="py-3 px-4">Consent Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredList.map(person => (
                <tr
                  key={person.id}
                  className={`hover:bg-blue-50/30 transition-colors ${
                    person.id === 'PS-1048' ? 'bg-amber-50/20' : ''
                  }`}
                >
                  {/* Personnel ID & Rank */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigateToProfile(person.id)}
                        className="font-mono font-bold text-blue-700 hover:underline"
                      >
                        {person.id}
                      </button>
                      {person.id === 'PS-1048' && (
                        <span className="px-1.5 py-0.2 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">
                          Key Case
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-500">
                      {person.rank} • {person.yearsOfService} yrs serv.
                    </span>
                  </td>

                  {/* Unit & Location */}
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-slate-800">{person.unit}</p>
                    <p className="text-[10px] text-slate-400">{person.location}</p>
                  </td>

                  {/* Risk Indicator */}
                  <td className="py-3.5 px-4">
                    <RiskBadge level={person.currentRisk} score={person.riskScore} />
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      Conf: {person.modelConfidence}%
                    </span>
                  </td>

                  {/* Duty Hours */}
                  <td className="py-3.5 px-4 font-mono">
                    <span
                      className={`font-bold ${
                        person.dutyHoursPerWeek > 60
                          ? 'text-rose-600'
                          : person.dutyHoursPerWeek > 50
                          ? 'text-amber-600'
                          : 'text-slate-700'
                      }`}
                    >
                      {person.dutyHoursPerWeek} hrs
                    </span>
                    <span className="text-[10px] text-slate-400 block">/ 7-day cycle</span>
                  </td>

                  {/* Deployment */}
                  <td className="py-3.5 px-4">
                    <span className="font-medium text-slate-700">
                      {person.consecutiveDeploymentDays} days
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      {person.leaveDaysDeferred} leave deferred
                    </span>
                  </td>

                  {/* Sleep Avg */}
                  <td className="py-3.5 px-4">
                    <span
                      className={`font-semibold ${
                        person.sleepAvgHours < 5
                          ? 'text-rose-600'
                          : person.sleepAvgHours < 6
                          ? 'text-amber-600'
                          : 'text-emerald-600'
                      }`}
                    >
                      {person.sleepAvgHours} hrs
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      Rating: {person.sleepQualityRating}/5
                    </span>
                  </td>

                  {/* Consent Badge */}
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                      Consent Verified
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => navigateToProfile(person.id)}
                        className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
                        title="View Dossier"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => navigateToPersonnelAnalysis(person.id)}
                        className="px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors flex items-center gap-1"
                        title="AI Risk Analysis"
                      >
                        <Activity className="w-3.5 h-3.5" />
                        <span>AI Analysis</span>
                      </button>
                      {person.recommendations.length > 0 && (
                        <button
                          onClick={() => openOfficerReview(person.recommendations[0])}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center gap-1"
                          title="Officer Review"
                        >
                          <UserCheck className="w-3.5 h-3.5" />
                          <span>Review</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Showing {filteredList.length} of {personnelList.length} personnel records</span>
          <span className="font-mono text-[11px]">Enclave Privacy Encryption: AES-256-GCM Active</span>
        </div>
      </div>
    </div>
  );
};
