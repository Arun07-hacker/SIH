import React from 'react';
import type { RiskLevel } from '../../types';
import { ShieldCheck, AlertTriangle, ShieldAlert } from 'lucide-react';

interface RiskBadgeProps {
  level: RiskLevel;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  score?: number;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({
  level,
  size = 'md',
  showIcon = true,
  score,
}) => {
  const getStyles = () => {
    switch (level) {
      case 'Low':
        return {
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
          dot: 'bg-emerald-500',
          icon: ShieldCheck,
          label: 'Low Risk',
        };
      case 'Moderate':
        return {
          bg: 'bg-amber-50 text-amber-700 border-amber-200/80',
          dot: 'bg-amber-500',
          icon: AlertTriangle,
          label: 'Moderate Risk',
        };
      case 'Elevated':
        return {
          bg: 'bg-rose-50 text-rose-700 border-rose-200/80',
          dot: 'bg-rose-500',
          icon: ShieldAlert,
          label: 'Elevated Risk Indicator',
        };
      case 'Critical':
        return {
          bg: 'bg-red-100 text-red-800 border-red-300',
          dot: 'bg-red-600',
          icon: ShieldAlert,
          label: 'Critical Alert',
        };
      default:
        return {
          bg: 'bg-slate-50 text-slate-700 border-slate-200',
          dot: 'bg-slate-400',
          icon: ShieldCheck,
          label: level,
        };
    }
  };

  const config = getStyles();
  const IconComponent = config.icon;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1.5',
    md: 'text-xs font-medium px-2.5 py-1 gap-1.5',
    lg: 'text-sm font-semibold px-3 py-1.5 gap-2',
  }[size];

  return (
    <span
      className={`inline-flex items-center rounded-full border shadow-xs transition-colors ${config.bg} ${sizeClasses}`}
    >
      {showIcon && <IconComponent className={size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'} />}
      {!showIcon && <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />}
      <span>{config.label}</span>
      {score !== undefined && (
        <span className="ml-1 px-1.5 py-0.2 bg-white/70 rounded text-[11px] font-mono font-semibold">
          {score}
        </span>
      )}
    </span>
  );
};
