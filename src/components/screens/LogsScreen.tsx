import React, { useState } from 'react';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Check,
  Clock,
  AlertCircle,
  FileText,
  Truck,
  Fuel,
} from 'lucide-react';
import { CircularProgress } from '../common/CircularProgress';
import { StatusChip } from '../common/StatusChip';
import { HosStatus, HosTimelineSegment, Platform } from '../../types';

interface LogsScreenProps {
  currentStatus: HosStatus;
  timeline: HosTimelineSegment[];
  platform: Platform;
  onStatusChange: (status: HosStatus) => void;
}

export const LogsScreen: React.FC<LogsScreenProps> = ({
  currentStatus,
  timeline,
  platform,
  onStatusChange,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'hos' | 'logs' | 'dvir' | 'fuel'>('hos');
  const [selectedDate, setSelectedDate] = useState('Today, Sep 1, 2026');
  const [showStatusSheet, setShowStatusSheet] = useState(false);

  const statusOptions: HosStatus[] = ['DRIVING', 'ON DUTY', 'REST', 'VIOLATION'];

  return (
    <div className="flex-1 w-full overflow-y-auto no-scrollbar pb-6 px-4 pt-2 text-white select-none">
      {/* ================= 1. SEGMENTED TABS ================= */}
      {/* HOS, Logs, DVIR, Fuel */}
      <div className="p-1 rounded-2xl bg-[#24272B] border border-[#353940] flex items-center justify-between">
        {[
          { id: 'hos', label: 'HOS' },
          { id: 'logs', label: 'Logs' },
          { id: 'dvir', label: 'DVIR' },
          { id: 'fuel', label: 'Fuel' },
        ].map((tab) => {
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#34785D] text-white shadow-md'
                  : 'text-[#9CA3AF] hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ================= 2. DATE SELECTOR ================= */}
      {/* "Today, Sep 1, 2026" with prev/next arrows */}
      <div className="flex items-center justify-between my-3 px-2 py-1.5 rounded-xl bg-[#202327] border border-[#2D3137]">
        <button
          onClick={() => setSelectedDate('Yesterday, Aug 31, 2026')}
          className="p-1.5 rounded-lg text-[#9CA3AF] hover:text-white hover:bg-[#2A2E34] transition-colors cursor-pointer"
          aria-label="Previous Day"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-[#4ADE80]" />
          <span className="text-xs font-bold font-mono text-white tracking-tight">
            {selectedDate}
          </span>
        </div>

        <button
          onClick={() => setSelectedDate('Tomorrow, Sep 2, 2026')}
          className="p-1.5 rounded-lg text-[#9CA3AF] hover:text-white hover:bg-[#2A2E34] transition-colors cursor-pointer"
          aria-label="Next Day"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* ================= 3. CURRENT STATUS BAR WITH "CHANGE" BUTTON ================= */}
      <div className="p-3 rounded-2xl bg-[#22252A] border border-[#32363D] flex items-center justify-between mb-3.5">
        <div>
          <span className="text-[10px] font-bold text-[#8E939C] uppercase tracking-wider block">
            Current Duty Status
          </span>
          <div className="mt-1 flex items-center gap-2">
            <StatusChip status={currentStatus} size="sm" />
            <span className="text-xs font-mono text-[#D1D5DB]">Since 07:28 AM</span>
          </div>
        </div>

        <button
          onClick={() => setShowStatusSheet(true)}
          className="h-9 px-4 rounded-xl bg-[#2F343C] hover:bg-[#34785D] hover:text-white text-[#D1D5DB] text-xs font-bold transition-all cursor-pointer border border-[#3F444D]"
        >
          Change
        </button>
      </div>

      {/* ================= 4. LARGE HERO RING + SIDE CARDS ================= */}
      {/* Large ring "Remaining Drive Time 07:28 HOURS" plus Drive Limit, Duty Limit and Cycle Limit side cards */}
      <div className="p-4 rounded-3xl bg-gradient-to-b from-[#22252A] to-[#1A1C1F] border border-[#32363D] shadow-xl">
        <div className="flex flex-col items-center">
          <CircularProgress
            value={68}
            size={180}
            strokeWidth={11}
            timeString="07:28"
            labelTop="REMAINING DRIVE TIME"
            unitBottom="HOURS"
            color="#34785D"
            glowColor="#22C55E"
          />
        </div>

        {/* Limit Cards */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-[#2E3238] text-center font-mono">
          <div className="p-2.5 rounded-xl bg-[#181A1D] border border-[#2E3238]">
            <span className="text-[9px] font-bold text-[#8E939C] uppercase tracking-wider block">
              Drive Limit
            </span>
            <span className="text-sm font-black text-white tabular-nums block mt-0.5">
              11:00
            </span>
            <span className="text-[9px] text-[#4ADE80] font-semibold">03:32 Left</span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#181A1D] border border-[#2E3238]">
            <span className="text-[9px] font-bold text-[#8E939C] uppercase tracking-wider block">
              Duty Limit
            </span>
            <span className="text-sm font-black text-white tabular-nums block mt-0.5">
              14:00
            </span>
            <span className="text-[9px] text-[#86EFAC] font-semibold">06:32 Left</span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#181A1D] border border-[#2E3238]">
            <span className="text-[9px] font-bold text-[#8E939C] uppercase tracking-wider block">
              Cycle Limit
            </span>
            <span className="text-sm font-black text-white tabular-nums block mt-0.5">
              34:28
            </span>
            <span className="text-[9px] text-[#86EFAC] font-semibold">70h Rule</span>
          </div>
        </div>
      </div>

      {/* ================= 5. HOS TIMELINE (TODAY) 24H VISUAL CHART ================= */}
      <div className="mt-4 p-4 rounded-3xl bg-[#22252A] border border-[#32363D]">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-bold tracking-wider text-white uppercase">
            HOS Timeline (Today)
          </h2>
          <span className="text-[10px] text-[#4ADE80] font-mono font-bold bg-[#1E3A2E] px-2 py-0.5 rounded-md border border-[#34785D]/40">
            DOT Compliant
          </span>
        </div>

        {/* 24h Bar representation */}
        <div className="mt-2 mb-3">
          <div className="h-5 w-full bg-[#181A1D] rounded-lg overflow-hidden flex border border-[#2E3238]">
            <div style={{ width: '25%' }} className="bg-[#6E737B] h-full" title="Off Duty 6h" />
            <div style={{ width: '6.2%' }} className="bg-[#34785D] h-full" title="On Duty 1.5h" />
            <div style={{ width: '19%' }} className="bg-[#22C55E] h-full" title="Driving 4.5h" />
            <div style={{ width: '8.3%' }} className="bg-[#3B82F6] h-full" title="Sleeper Berth 2h" />
            <div style={{ width: '41.5%' }} className="bg-[#26282B] h-full" title="Remaining day" />
          </div>
          <div className="flex justify-between text-[8px] font-mono text-[#6E737B] mt-1 px-1">
            <span>00:00</span>
            <span>06:00</span>
            <span>12:00</span>
            <span>18:00</span>
            <span>24:00</span>
          </div>
        </div>

        {/* Color-coded rows: Off Duty, Sleeper Berth, Driving, On Duty */}
        <div className="space-y-2">
          {timeline.map((seg) => (
            <div
              key={seg.id}
              className="p-2.5 rounded-xl bg-[#181A1D] border border-[#2E3238] flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: seg.color }}
                />
                <div>
                  <span className="text-xs font-bold text-white block">
                    {seg.status}
                  </span>
                  <span className="text-[10px] text-[#8E939C]">
                    {seg.location}
                  </span>
                </div>
              </div>

              <div className="text-right font-mono">
                <span className="text-xs font-bold text-white block tabular-nums">
                  {seg.duration}
                </span>
                <span className="text-[10px] text-[#6E737B] tabular-nums">
                  {seg.startTime} - {seg.endTime}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= 6. CERTIFICATION AUDIT BAR ================= */}
      <div className="mt-3.5 p-3 rounded-2xl bg-[#1C2822] border border-[#34785D]/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#4ADE80]" />
          <div>
            <span className="text-xs font-bold text-white block">
              Certified Daily Log Record
            </span>
            <span className="text-[10px] text-[#86EFAC]">
              FMCSA / SADC Electronic Logging Standard
            </span>
          </div>
        </div>
        <button
          onClick={() => alert('Log record synchronized and certified with dispatch server.')}
          className="text-[11px] font-bold text-white bg-[#34785D] hover:bg-[#2C664F] px-3 py-1.5 rounded-xl cursor-pointer"
        >
          Certify
        </button>
      </div>

      {/* STATUS CHANGE BOTTOM SHEET / MODAL */}
      {showStatusSheet && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm rounded-t-3xl bg-[#22252A] border-t border-[#3A3F47] p-5 shadow-2xl">
            <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-4" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              Change Duty Status
            </h3>
            <div className="space-y-2 mb-4">
              {statusOptions.map((st) => (
                <button
                  key={st}
                  onClick={() => {
                    onStatusChange(st);
                    setShowStatusSheet(false);
                  }}
                  className={`w-full p-3 rounded-xl border flex items-center justify-between text-left transition-colors cursor-pointer ${
                    currentStatus === st
                      ? 'bg-[#1E3A2E] border-[#34785D] text-[#86EFAC]'
                      : 'bg-[#181A1D] border-[#2E3238] text-white hover:bg-[#26282C]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <StatusChip status={st} size="sm" />
                  </div>
                  {currentStatus === st && <Check className="w-4 h-4 text-[#4ADE80]" />}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowStatusSheet(false)}
              className="w-full h-11 rounded-xl bg-[#2F343C] text-white font-bold text-xs uppercase cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
