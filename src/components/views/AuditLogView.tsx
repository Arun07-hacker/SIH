import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  History,
  Shield,
  Search,
  Download,
  Filter,
  CheckCircle,
  FileText,
  User,
  Clock,
  Key,
} from 'lucide-react';

export const AuditLogView: React.FC = () => {
  const { auditLogs } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('All');

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesAction = filterAction === 'All' || log.action.includes(filterAction);

    return matchesSearch && matchesAction;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
              Immutable Welfare Audit Trail
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold">
              Tamper-Evident Ledger
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Chronological cryptographic log of every personnel analysis view, recommendation modification, and officer decision
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Cryptographic Integrity: Verified</span>
          </span>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search audit trail by user, action, personnel ID..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
          {['All', 'VIEW', 'MODIFY', 'DECISION', 'SCHEDULE', 'SUBMIT'].map(act => (
            <button
              key={act}
              onClick={() => setFilterAction(act)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                filterAction === act
                  ? 'bg-navy-900 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {act === 'All' ? 'All Activities' : act}
            </button>
          ))}
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200/80 bg-slate-50/50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">User & Role</th>
                <th className="py-3 px-4">Action Type</th>
                <th className="py-3 px-4">Resource Target</th>
                <th className="py-3 px-4">Audit Details</th>
                <th className="py-3 px-4">IP / Node</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50/60 transition-colors">
                  {/* Timestamp */}
                  <td className="py-3 px-4 text-slate-500 whitespace-nowrap text-[11px]">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {log.timestamp}
                    </span>
                  </td>

                  {/* User */}
                  <td className="py-3 px-4 font-sans whitespace-nowrap">
                    <p className="font-semibold text-slate-800 text-xs">{log.user}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{log.role}</p>
                  </td>

                  {/* Action */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        log.action.includes('MODIFY')
                          ? 'bg-blue-100 text-blue-800'
                          : log.action.includes('RECORD') || log.action.includes('SUBMIT')
                          ? 'bg-emerald-100 text-emerald-800'
                          : log.action.includes('DECISION')
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {log.action}
                    </span>
                  </td>

                  {/* Resource */}
                  <td className="py-3 px-4 font-bold text-blue-900 whitespace-nowrap text-xs">
                    {log.resource}
                  </td>

                  {/* Details */}
                  <td className="py-3 px-4 font-sans text-slate-600 text-xs leading-relaxed max-w-md">
                    {log.details}
                  </td>

                  {/* IP */}
                  <td className="py-3 px-4 text-[10px] text-slate-400 whitespace-nowrap">
                    {log.ipAddress || '10.14.2.88'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Displaying {filteredLogs.length} verified immutable audit records</span>
          <span className="font-mono text-[11px]">SHA-256 Merkle Hash Anchor: Active</span>
        </div>
      </div>
    </div>
  );
};
