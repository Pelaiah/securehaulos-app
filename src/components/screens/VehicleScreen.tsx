import React, { useState } from 'react';
import {
  AlertTriangle,
  ChevronRight,
  Fuel,
  Gauge,
  Thermometer,
  Zap,
  Snowflake,
  ShieldCheck,
  CheckCircle2,
  X,
  Info,
} from 'lucide-react';
import { Platform, TelemetryData } from '../../types';
import { TRUCK_HEALTH_ITEMS } from '../../data/mockData';

interface VehicleScreenProps {
  telemetry: TelemetryData;
  platform: Platform;
  onDismissAlert?: () => void;
}

export const VehicleScreen: React.FC<VehicleScreenProps> = ({
  telemetry,
  platform,
  onDismissAlert,
}) => {
  const [alertDismissed, setAlertDismissed] = useState(false);
  const [selectedSystemModal, setSelectedSystemModal] = useState<string | null>(null);

  return (
    <div className="flex-1 w-full overflow-y-auto no-scrollbar pb-6 px-4 pt-2 text-white select-none">
      {/* ================= 1. RED ALERT BANNER ================= */}
      {/* Alert banner: solid red with warning icon and chevron */}
      {!alertDismissed && (
        <div className="mb-3.5 p-3.5 rounded-2xl bg-[#DC2626] text-white shadow-lg shadow-red-900/30 flex items-center justify-between gap-3 border border-red-500/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-black/25 px-1.5 py-0.5 rounded">
                  CRITICAL SENSOR ALERT
                </span>
              </div>
              <h3 className="text-xs font-bold leading-tight mt-0.5">
                Low Tire Pressure, Front Left: {telemetry.tirePressureFrontLeft} PSI (Target: {telemetry.tirePressureTarget} PSI)
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              setAlertDismissed(true);
              if (onDismissAlert) onDismissAlert();
            }}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer shrink-0"
            aria-label="Dismiss alert"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      )}

      {/* ================= 2. HERO IMAGE OF THE TRUCK ================= */}
      <div className="relative rounded-3xl overflow-hidden border border-[#32363D] shadow-2xl bg-[#141618] mb-3.5">
        <img
          src="/src/assets/images/truck_hero_dark_1791313885234.jpg"
          alt="Volvo VNL 860 Heavy Duty Semi Truck"
          referrerPolicy="no-referrer"
          className="w-full h-44 object-cover object-center"
        />
        {/* Scrim overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141618] via-transparent to-black/40 pointer-events-none" />

        {/* Truck Identification Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-2 bg-[#1C1E21]/80 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/10">
          <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" />
          <span className="text-xs font-mono font-bold text-white">#SH-8283</span>
          <span className="text-[10px] text-[#9CA3AF]">TR-001</span>
        </div>

        {/* Vehicle Spec footer */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs">
          <div>
            <span className="text-xs font-bold text-white block">
              Volvo VNL 860 Reefer (6x4)
            </span>
            <span className="text-[10px] text-[#9CA3AF] font-mono">
              Odometer: {telemetry.odometerKm.toLocaleString()} km
            </span>
          </div>
          <span className="text-[10px] font-bold text-[#4ADE80] bg-[#1E3A2E] px-2 py-0.5 rounded-md border border-[#34785D]">
            Connected
          </span>
        </div>
      </div>

      {/* ================= 3. TELEMETRY CARDS WITH PROGRESS BARS ================= */}
      {/* Fuel 78% (~850 km), Tire Pressure 85 PSI (red, Front Left), Engine Temp 92°C Normal, Battery 14.1V Normal */}
      <div className="grid grid-cols-2 gap-2.5 mb-4">
        {/* Fuel Card */}
        <div className="p-3.5 rounded-2xl bg-[#22252A] border border-[#32363D]">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold text-[#8E939C] uppercase tracking-wider">
              Fuel Level
            </span>
            <Fuel className="w-4 h-4 text-[#34785D]" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black font-mono text-white tabular-nums">
              {telemetry.fuelPercent}%
            </span>
            <span className="text-[11px] text-[#9CA3AF] font-mono">~{telemetry.fuelRangeKm} km</span>
          </div>
          {/* Progress bar */}
          <div className="w-full h-1.5 bg-[#181A1D] rounded-full overflow-hidden mt-2">
            <div
              className="h-full bg-[#34785D] rounded-full"
              style={{ width: `${telemetry.fuelPercent}%` }}
            />
          </div>
        </div>

        {/* Tire Pressure Card (Red Alert Front Left) */}
        <div className="p-3.5 rounded-2xl bg-[#2A1E20] border border-[#DC2626]/60 shadow-[0_0_15px_rgba(220,38,38,0.15)]">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold text-[#FCA5A5] uppercase tracking-wider">
              Tire Pressure
            </span>
            <Gauge className="w-4 h-4 text-[#DC2626]" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black font-mono text-[#DC2626] tabular-nums">
              {telemetry.tirePressureFrontLeft}
            </span>
            <span className="text-[11px] text-[#FCA5A5] font-mono">PSI (Front L)</span>
          </div>
          {/* Progress bar with warning indicator */}
          <div className="w-full h-1.5 bg-[#181A1D] rounded-full overflow-hidden mt-2">
            <div
              className="h-full bg-[#DC2626] rounded-full"
              style={{ width: `${(telemetry.tirePressureFrontLeft / telemetry.tirePressureTarget) * 100}%` }}
            />
          </div>
        </div>

        {/* Engine Temperature Card */}
        <div className="p-3.5 rounded-2xl bg-[#22252A] border border-[#32363D]">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold text-[#8E939C] uppercase tracking-wider">
              Engine Temp
            </span>
            <Thermometer className="w-4 h-4 text-[#4ADE80]" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black font-mono text-white tabular-nums">
              {telemetry.engineTempC}°C
            </span>
            <span className="text-[11px] text-[#4ADE80] font-semibold">Normal</span>
          </div>
          {/* Progress bar */}
          <div className="w-full h-1.5 bg-[#181A1D] rounded-full overflow-hidden mt-2">
            <div
              className="h-full bg-[#34785D] rounded-full"
              style={{ width: `${(telemetry.engineTempC / 120) * 100}%` }}
            />
          </div>
        </div>

        {/* Battery Voltage Card */}
        <div className="p-3.5 rounded-2xl bg-[#22252A] border border-[#32363D]">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold text-[#8E939C] uppercase tracking-wider">
              Battery Voltage
            </span>
            <Zap className="w-4 h-4 text-[#4ADE80]" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black font-mono text-white tabular-nums">
              {telemetry.batteryVoltage}V
            </span>
            <span className="text-[11px] text-[#4ADE80] font-semibold">Normal</span>
          </div>
          {/* Progress bar */}
          <div className="w-full h-1.5 bg-[#181A1D] rounded-full overflow-hidden mt-2">
            <div
              className="h-full bg-[#34785D] rounded-full"
              style={{ width: '92%' }}
            />
          </div>
        </div>
      </div>

      {/* ================= 4. REEFER COLD CHAIN STATUS (CONTINUOUS -20°C) ================= */}
      <div className="p-3.5 rounded-2xl bg-[#1B2923] border border-[#34785D]/60 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#275341] flex items-center justify-center text-[#4ADE80]">
            <Snowflake className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-[#86EFAC] uppercase tracking-wider">
                Reefer Cold Chain Monitor
              </span>
              <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" />
            </div>
            <div className="text-xs font-bold text-white mt-0.5">
              -4°F / -20.1°C (Vaccine Integrity Preserved)
            </div>
          </div>
        </div>
        <span className="text-[11px] font-mono text-[#86EFAC] font-bold bg-[#14261E] px-2 py-0.5 rounded-md border border-[#34785D]">
          Good
        </span>
      </div>

      {/* ================= 5. VEHICLE HEALTH LIST ================= */}
      {/* "Vehicle Health" list with "View Details": Engine, Transmission, Brakes, each with a green "Good" status */}
      <div className="p-4 rounded-3xl bg-[#22252A] border border-[#32363D]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#4ADE80]" />
            <h2 className="text-xs font-bold tracking-wider text-white uppercase">
              Vehicle Health Systems
            </h2>
          </div>
          <button
            onClick={() => setSelectedSystemModal('All Systems Diagnostic')}
            className="text-[11px] font-bold text-[#4ADE80] hover:text-[#86EFAC] flex items-center gap-0.5 cursor-pointer"
          >
            <span>View Details</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-2">
          {TRUCK_HEALTH_ITEMS.map((item) => (
            <div
              key={item.system}
              onClick={() => setSelectedSystemModal(item.system)}
              className="p-3 rounded-xl bg-[#181A1D] border border-[#2E3238] flex items-center justify-between cursor-pointer hover:border-[#3E434D] transition-colors"
            >
              <div>
                <span className="text-xs font-bold text-white block">
                  {item.system}
                </span>
                <span className="text-[10px] text-[#8E939C] font-mono">
                  {item.metric} • {item.code}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-[#86EFAC] bg-[#1E3A2E] px-2.5 py-0.5 rounded-full border border-[#34785D]/50">
                  {item.status}
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-[#6E737B]" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Details Modal */}
      {selectedSystemModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm rounded-3xl bg-[#22252A] border border-[#3A3F47] p-5 shadow-2xl text-left">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-white">
                {selectedSystemModal}
              </h3>
              <button
                onClick={() => setSelectedSystemModal(null)}
                className="p-1 rounded-lg text-[#9CA3AF] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-[#9CA3AF] mb-3">
              Telemetry feed synchronized from Volvo J1939 CAN-bus via SecureHaul OS OBD-II Gateway.
            </p>
            <div className="p-3 rounded-xl bg-[#181A1D] border border-[#2E3238] text-[11px] font-mono space-y-1 text-[#D1D5DB]">
              <div>Diagnostic Code: 0x00 DTC CLEAN</div>
              <div>Calibration ID: ECM_VNL_2026_PRO</div>
              <div>Sampling Latency: 42ms (Live CAN Stream)</div>
            </div>
            <button
              onClick={() => setSelectedSystemModal(null)}
              className="w-full mt-4 h-10 rounded-xl bg-[#34785D] text-white font-bold text-xs uppercase"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
