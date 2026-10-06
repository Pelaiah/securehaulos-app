import React from 'react';
import { Wifi, Signal, Battery, ChevronLeft } from 'lucide-react';
import { Platform } from '../../types';

interface DeviceFrameProps {
  platform: Platform;
  children: React.ReactNode;
  title?: string;
  isDrivingMode?: boolean;
  onDynamicIslandClick?: () => void;
  className?: string;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  platform,
  children,
  title,
  isDrivingMode = false,
  onDynamicIslandClick,
  className = '',
}) => {
  const isAndroid = platform === 'android';

  return (
    <div
      className={`relative flex flex-col mx-auto overflow-hidden shadow-2xl transition-all duration-300 ${
        isAndroid
          ? 'w-full max-w-[400px] h-[820px] rounded-[36px] border-[5px] border-[#2E3238] bg-[#141618] ring-1 ring-white/10'
          : 'w-full max-w-[400px] h-[820px] rounded-[48px] border-[6px] border-[#2C2F36] bg-[#141618] ring-1 ring-white/15'
      } ${className}`}
      style={{
        boxShadow:
          '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.08), inset 0 0 2px 1px rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* ================= TOP SYSTEM STATUS BAR ================= */}
      {isAndroid ? (
        // Android Material 3 Status Bar
        <div className="relative z-50 flex items-center justify-between px-6 pt-3 pb-1 select-none text-xs font-mono text-[#D1D5DB] shrink-0 bg-transparent">
          {/* Time & App Indicator */}
          <div className="flex items-center gap-1.5 font-semibold text-[13px] tracking-tight">
            <span>09:41</span>
            <span className="inline-block w-1 h-1 rounded-full bg-[#4ADE80]" />
          </div>

          {/* Android Centered Punch-hole Camera */}
          <div className="absolute left-1/2 -translate-x-1/2 top-2.5 w-3.5 h-3.5 rounded-full bg-black border border-[#2E3238] flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#182332]" />
          </div>

          {/* Status Icons: 5G, Wi-Fi, Battery */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[10px] font-bold text-[#9CA3AF] tracking-tighter">5G</span>
            <Signal className="w-3.5 h-3.5 text-white/90" />
            <Wifi className="w-3.5 h-3.5 text-white/90" />
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-medium text-white/80">92%</span>
              <Battery className="w-4 h-4 text-white/90" />
            </div>
          </div>
        </div>
      ) : (
        // iOS HIG Status Bar + Dynamic Island
        <div className="relative z-50 flex items-center justify-between px-7 pt-3.5 pb-1 select-none text-xs font-sans text-white shrink-0 bg-transparent">
          {/* iOS Clock */}
          <span className="font-semibold text-[14px] tracking-tight">9:41</span>

          {/* iOS Dynamic Island */}
          <div
            onClick={onDynamicIslandClick}
            className={`absolute left-1/2 -translate-x-1/2 top-2.5 h-7 rounded-full bg-black border border-white/10 px-3 flex items-center justify-between gap-2 shadow-md transition-all cursor-pointer ${
              isDrivingMode ? 'w-44' : 'w-28'
            }`}
          >
            {isDrivingMode ? (
              <>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" />
                  <span className="text-[9px] font-semibold text-white tracking-tight">A5 • 1.2km</span>
                </div>
                <span className="text-[9px] font-mono font-bold text-[#4ADE80]">07:28</span>
              </>
            ) : (
              <div className="flex items-center justify-center w-full gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#111] ring-1 ring-zinc-800" />
                <div className="w-2 h-2 rounded-full bg-[#1e293b]" />
              </div>
            )}
          </div>

          {/* iOS Right Icons */}
          <div className="flex items-center gap-2">
            <Signal className="w-3.5 h-3.5 text-white" />
            <Wifi className="w-3.5 h-3.5 text-white" />
            <Battery className="w-4 h-4 text-white" />
          </div>
        </div>
      )}

      {/* ================= SCREEN BODY CONTENT ================= */}
      <div className="relative flex-1 w-full overflow-hidden flex flex-col bg-[#1C1E21]">
        {children}
      </div>

      {/* ================= BOTTOM SYSTEM GESTURE NAVIGATION ================= */}
      <div className="relative z-50 flex items-center justify-center shrink-0 py-2 select-none pointer-events-none">
        {isAndroid ? (
          // Android M3 Gesture Bar (pill width 72px, height 4px, gray-300)
          <div className="w-20 h-1 rounded-full bg-white/40" />
        ) : (
          // iOS Home Indicator (capsule width 134px, height 5px)
          <div className="w-32 h-1 rounded-full bg-white/50" />
        )}
      </div>
    </div>
  );
};
