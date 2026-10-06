import React from 'react';
import { ShieldCheck, Truck } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showTagline = true, className = '' }) => {
  const isSm = size === 'sm';
  const isLg = size === 'lg';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Truck mark inside modern hexagonal/shield emblem */}
      <div
        className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-[#34785D] to-[#1E4D3A] text-white shadow-md border border-[#4ADE80]/30 ${
          isSm ? 'w-8 h-8' : isLg ? 'w-12 h-12' : 'w-10 h-10'
        }`}
      >
        <Truck className={isSm ? 'w-4 h-4' : isLg ? 'w-6 h-6' : 'w-5 h-5 text-white'} />
        <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#1C1E21] border border-[#34785D]">
          <ShieldCheck className="w-2.5 h-2.5 text-[#4ADE80]" />
        </span>
      </div>

      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5">
          <span
            className={`font-black tracking-wider text-white font-mono ${
              isSm ? 'text-sm' : isLg ? 'text-xl' : 'text-base'
            }`}
          >
            SECUREHAUL
          </span>
          <span
            className={`font-semibold tracking-widest text-[#4ADE80] uppercase ${
              isSm ? 'text-[9px]' : isLg ? 'text-xs' : 'text-[10px]'
            }`}
          >
            DRIVER
          </span>
        </div>
        {showTagline && (
          <span
            className={`font-medium tracking-tight text-[#9CA3AF] ${
              isSm ? 'text-[9px]' : 'text-[11px]'
            }`}
          >
            Safe. Compliant. Connected.
          </span>
        )}
      </div>
    </div>
  );
};
