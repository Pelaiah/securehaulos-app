import React from 'react';
import { HosStatus } from '../../types';

interface StatusChipProps {
  status: HosStatus | string;
  size?: 'sm' | 'md' | 'lg';
  showPulse?: boolean;
  className?: string;
}

export const StatusChip: React.FC<StatusChipProps> = ({
  status,
  size = 'md',
  showPulse = true,
  className = '',
}) => {
  const normalized = status.toUpperCase();

  let bgClass = 'bg-[#25282C] text-[#6E737B] border-[#374151]';
  let dotClass = 'bg-[#6E737B]';
  let label = status;

  if (normalized === 'ON DUTY' || normalized === 'ON_DUTY') {
    bgClass = 'bg-[#1E3A2E] text-[#86EFAC] border-[#34785D]';
    dotClass = 'bg-[#4ADE80]';
    label = 'ON DUTY';
  } else if (normalized === 'DRIVING') {
    bgClass = 'bg-[#163828] text-[#4ADE80] border-[#22C55E]/60 shadow-[0_0_12px_rgba(34,197,94,0.25)]';
    dotClass = 'bg-[#22C55E]';
    label = 'DRIVING';
  } else if (normalized === 'REST' || normalized === 'OFF DUTY' || normalized === 'SLEEPER') {
    bgClass = 'bg-[#26282B] text-[#9CA3AF] border-[#3F4248]';
    dotClass = 'bg-[#9CA3AF]';
    label = normalized === 'REST' ? 'REST' : normalized;
  } else if (normalized === 'VIOLATION' || normalized === 'ALERT') {
    bgClass = 'bg-[#3E1A1A] text-[#FCA5A5] border-[#DC2626] shadow-[0_0_12px_rgba(220,38,38,0.3)]';
    dotClass = 'bg-[#DC2626]';
    label = 'VIOLATION';
  }

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 tracking-wider font-semibold',
    md: 'text-xs px-2.5 py-1 tracking-wider font-bold',
    lg: 'text-sm px-3.5 py-1.5 tracking-wider font-extrabold',
  }[size];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${bgClass} ${sizeClasses} uppercase ${className}`}
    >
      <span className="relative flex h-2 w-2">
        {showPulse && (normalized === 'DRIVING' || normalized === 'VIOLATION') && (
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotClass}`}
          />
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${dotClass}`} />
      </span>
      <span>{label}</span>
    </span>
  );
};
