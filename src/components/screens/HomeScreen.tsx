import React, { useState } from 'react';
import {
  Bell,
  Play,
  CheckCircle2,
  Clock,
  MapPin,
  ChevronRight,
  ShieldCheck,
  Thermometer,
  Fuel,
  TrendingUp,
  FileCheck2,
  Navigation,
} from 'lucide-react';
import { CircularProgress } from '../common/CircularProgress';
import { StatusChip } from '../common/StatusChip';
import { DriverProfile, Platform, ScheduleStop, TelemetryData } from '../../types';

interface HomeScreenProps {
  driver: DriverProfile;
  telemetry: TelemetryData;
  schedule: ScheduleStop[];
  platform: Platform;
  onStartTrip: () => void;
  onOpenInspection: () => void;
  onViewStops: () => void;
  onOpenAlert: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  driver,
  telemetry,
  schedule,
  platform,
  onStartTrip,
  onOpenInspection,
  onViewStops,
  onOpenAlert,
}) => {
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const isAndroid = platform === 'android';

  return (
    <div className="flex-1 w-full overflow-y-auto no-scrollbar pb-6 px-4 pt-2 text-white">
      {/* ================= 1. DRIVER HEADER ================= */}
      <div className="flex items-center justify-between pb-3 pt-1 border-b border-[#2C3036]">
        <div className="flex items-center gap-3">
          {/* Driver Avatar with Online Indicator */}
          <div className="relative">
            <img
              src={driver.avatarUrl}
              alt={driver.name}
              referrerPolicy="no-referrer"
              className="w-12 h-12 rounded-full object-cover ring-2 ring-[#34785D] shadow-md bg-[#25282C]"
            />
            <span
              className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#22C55E] ring-2 ring-[#1C1E21]"
              title="Online"
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold tracking-wider text-[#9CA3AF] uppercase">
                DRIVER COCKPIT
              </span>
              <span className="text-[#34785D] text-[10px]">•</span>
              <span className="flex items-center gap-1 text-[10px] font-semibold text-[#4ADE80]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
                Live ELD
              </span>
            </div>
            <h1 className="text-lg font-bold tracking-tight text-white leading-tight">
              {driver.name}
            </h1>
            <p className="text-xs text-[#9CA3AF] font-medium">
              Driver • Truck #{driver.truckNumber}
            </p>
          </div>
        </div>

        {/* Right actions: Online Badge + Notification Bell */}
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#34785D]/25 text-[#86EFAC] border border-[#34785D]/50">
            Online
          </span>
          <button
            onClick={onOpenAlert}
            className="relative p-2 rounded-full bg-[#26282C] hover:bg-[#303338] text-white/90 transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4 text-[#D1D5DB]" />
            {driver.unreadNotifications > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#DC2626] text-[9px] font-bold text-white shadow-sm">
                {driver.unreadNotifications}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ================= 2. TRUCK STATUS PILL / TELEMETRY QUICK BAR ================= */}
      <button
        onClick={onOpenAlert}
        className={`w-full mt-3 p-2.5 rounded-2xl bg-[#24272B] border border-[#353940] flex items-center justify-between text-left transition-all hover:bg-[#2B2F34] cursor-pointer ${
          isAndroid ? 'rounded-2xl' : 'rounded-2xl backdrop-blur-md'
        }`}
      >
        <div className="flex items-center gap-2.5 truncate">
          <div className="w-8 h-8 rounded-xl bg-[#1E3A2E] flex items-center justify-center text-[#4ADE80] shrink-0 border border-[#34785D]/50">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="truncate">
            <div className="flex items-center gap-2 text-xs font-semibold text-white">
              <span>TR-001 (Volvo VNL 860)</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-[#9CA3AF] mt-0.5">
              <span>Fuel: {telemetry.fuelPercent}%</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-[#86EFAC]">
                Reefer: {telemetry.reeferTempF}°F Normal
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs font-semibold text-[#4ADE80] shrink-0 pl-2">
          <span>Good</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </button>

      {/* ================= 3. HERO CARD: ELD STATUS "ON DUTY" & PROGRESS RING ================= */}
      <div className="mt-3.5 p-4 rounded-3xl bg-gradient-to-b from-[#22252A] to-[#1A1C1F] border border-[#32363D] shadow-xl relative overflow-hidden">
        {/* Soft radial glow */}
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-48 h-32 bg-[#34785D]/15 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold tracking-wider text-[#9CA3AF] uppercase">
              ELD STATUS
            </span>
          </div>
          <StatusChip status="ON DUTY" size="sm" />
        </div>

        {/* Hero Circular Progress Ring */}
        <div className="flex justify-center my-2">
          <CircularProgress
            value={68}
            size={180}
            strokeWidth={11}
            timeString="07:28"
            labelTop="REMAINING HOS"
            unitBottom="HOURS"
            color="#34785D"
            glowColor="#22C55E"
          />
        </div>

        {/* Three mini stats under the ring */}
        <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-[#2E3238] text-center">
          <div className="bg-[#181A1D]/80 rounded-xl p-2 border border-[#2E3238]">
            <span className="block text-[9px] font-semibold text-[#8E939C] uppercase tracking-wider">
              Drive Limit
            </span>
            <span className="block text-sm font-bold text-white font-mono tabular-nums mt-0.5">
              11:00
            </span>
            <span className="text-[9px] text-[#4ADE80] font-medium">Safe</span>
          </div>
          <div className="bg-[#181A1D]/80 rounded-xl p-2 border border-[#2E3238]">
            <span className="block text-[9px] font-semibold text-[#8E939C] uppercase tracking-wider">
              Duty Limit
            </span>
            <span className="block text-sm font-bold text-white font-mono tabular-nums mt-0.5">
              14:00
            </span>
            <span className="text-[9px] text-[#4ADE80] font-medium">Active</span>
          </div>
          <div className="bg-[#181A1D]/80 rounded-xl p-2 border border-[#2E3238]">
            <span className="block text-[9px] font-semibold text-[#8E939C] uppercase tracking-wider">
              Cycle Limit
            </span>
            <span className="block text-sm font-bold text-white font-mono tabular-nums mt-0.5">
              34:28
            </span>
            <span className="text-[9px] text-[#86EFAC] font-medium">70h/8d</span>
          </div>
        </div>

        {/* Big Green "Start Trip" Button */}
        <button
          onClick={onStartTrip}
          className="w-full mt-4 h-13 rounded-2xl bg-[#34785D] hover:bg-[#2C664F] active:scale-[0.98] text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-[#34785D]/30 transition-all cursor-pointer border border-[#4ADE80]/30"
        >
          <Play className="w-5 h-5 fill-white" />
          <span>Start Trip</span>
        </button>
      </div>

      {/* ================= 4. ACTIVE LOAD DISPATCH CARD ================= */}
      <div className="mt-4 p-4 rounded-3xl bg-[#22252A] border border-[#32363D]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" />
            <span className="text-[11px] font-bold tracking-wider text-[#86EFAC] uppercase">
              ACTIVE DISPATCH
            </span>
          </div>
          <span className="text-[11px] font-mono text-[#9CA3AF] bg-[#181A1D] px-2 py-0.5 rounded-md border border-[#2E3238]">
            #WE6K-78RFE4
          </span>
        </div>

        <h2 className="text-sm font-bold text-white leading-snug">
          Pharmaceuticals / Cold Chain Vaccines
        </h2>
        <p className="text-[11px] text-[#9CA3AF] mt-0.5">
          53ft Reefer (Continuous -20°C) • 34,500 lbs
        </p>

        {/* Fast Action Row: Navigate Trip / Pre-Trip DVIR */}
        <div className="grid grid-cols-2 gap-2 mt-3">
          <button
            onClick={onStartTrip}
            className="h-10 rounded-xl bg-[#294B3B] hover:bg-[#34785D] text-[#86EFAC] hover:text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-[#34785D]/40"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Navigate Trip</span>
          </button>
          <button
            onClick={onOpenInspection}
            className="h-10 rounded-xl bg-[#25282C] hover:bg-[#303338] text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-[#3A3F47]"
          >
            <FileCheck2 className="w-3.5 h-3.5 text-[#4ADE80]" />
            <span>Pre-Trip (DVIR)</span>
          </button>
        </div>
      </div>

      {/* ================= 5. TODAY'S SCHEDULE WITH "VIEW ALL" ================= */}
      <div className="mt-4 p-4 rounded-3xl bg-[#22252A] border border-[#32363D]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#4ADE80]" />
            <h2 className="text-xs font-bold tracking-wider text-white uppercase">
              Today's Schedule
            </h2>
          </div>
          <button
            onClick={onViewStops}
            className="text-[11px] font-bold text-[#4ADE80] hover:text-[#86EFAC] flex items-center gap-0.5 cursor-pointer"
          >
            <span>View All ({schedule.length})</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-3 relative before:absolute before:left-3.5 before:top-4 before:bottom-4 before:w-0.5 before:bg-[#2F343C]">
          {schedule.map((stop) => {
            const isPickup = stop.type === 'pickup';
            const isCompleted = stop.status === 'Completed';

            return (
              <div
                key={stop.id}
                className="relative flex items-start gap-3 pl-1 text-left group"
              >
                {/* Numbered circle marker */}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-extrabold shrink-0 z-10 transition-colors ${
                    isCompleted
                      ? 'bg-[#1E3A2E] text-[#4ADE80] ring-2 ring-[#34785D]'
                      : isPickup
                      ? 'bg-[#34785D] text-white'
                      : 'bg-[#2E3238] text-[#9CA3AF]'
                  }`}
                >
                  {isCompleted ? '✓' : stop.step}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-xs font-bold text-white truncate">
                      {stop.name}
                    </p>
                    {/* ETA / Status Chip */}
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap shrink-0 ${
                        stop.statusVariant === 'success'
                          ? 'bg-[#1E3A2E] text-[#86EFAC] border border-[#34785D]/50'
                          : stop.statusVariant === 'warning'
                          ? 'bg-[#3B291A] text-[#FBBF24] border border-[#D97706]/40'
                          : 'bg-[#26282B] text-[#9CA3AF] border border-[#373A40]'
                      }`}
                    >
                      {stop.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#9CA3AF] truncate mt-0.5">
                    {stop.location}
                  </p>
                  <p className="text-[10px] text-[#6E737B] font-mono mt-0.5">
                    ETA: {stop.eta} • {stop.distance}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= 6. STATS METRICS GRID ================= */}
      <div className="grid grid-cols-2 gap-2.5 mt-4">
        <div className="p-3.5 rounded-2xl bg-[#22252A] border border-[#32363D]">
          <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider block">
            Deliveries
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-xl font-extrabold text-white font-mono">1</span>
            <span className="text-xs text-[#9CA3AF]">/ 3 total</span>
          </div>
          <span className="text-[10px] text-[#4ADE80] font-semibold mt-1 block">
            2 Remaining
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#22252A] border border-[#32363D]">
          <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider block">
            Safety Score
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-xl font-extrabold text-[#4ADE80] font-mono">
              {driver.safetyScore}%
            </span>
          </div>
          <span className="text-[10px] text-[#9CA3AF] font-medium mt-1 block">
            {driver.tier}
          </span>
        </div>
      </div>
    </div>
  );
};
