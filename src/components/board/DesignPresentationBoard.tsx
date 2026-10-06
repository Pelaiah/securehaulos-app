import React, { useState } from 'react';
import {
  CheckCircle2,
  Eye,
  Moon,
  HandMetal,
  ShieldCheck,
  Compass,
  Copy,
  Check,
  AlertTriangle,
  ChevronRight,
  Sparkles,
  Smartphone,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { Logo } from '../brand/Logo';
import { StatusChip } from '../common/StatusChip';
import { DeviceFrame } from '../frame/DeviceFrame';
import { HomeScreen } from '../screens/HomeScreen';
import { InspectionScreen } from '../screens/InspectionScreen';
import { ActiveTripScreen } from '../screens/ActiveTripScreen';
import { LogsScreen } from '../screens/LogsScreen';
import { VehicleScreen } from '../screens/VehicleScreen';
import { DriverProfile, HosStatus, HosTimelineSegment, InspectionCheckItem, Platform, ScheduleStop, TelemetryData } from '../../types';

interface DesignPresentationBoardProps {
  driver: DriverProfile;
  telemetry: TelemetryData;
  schedule: ScheduleStop[];
  inspections: InspectionCheckItem[];
  timeline: HosTimelineSegment[];
  currentHosStatus: HosStatus;
  onSelectScreenForLiveApp?: (screenIndex: number) => void;
  onOpenExportModal?: () => void;
}

export const DesignPresentationBoard: React.FC<DesignPresentationBoardProps> = ({
  driver,
  telemetry,
  schedule,
  inspections,
  timeline,
  currentHosStatus,
  onSelectScreenForLiveApp,
  onOpenExportModal,
}) => {
  const [boardPlatform, setBoardPlatform] = useState<Platform>('android');
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [activeScreenTab, setActiveScreenTab] = useState<'all' | 'screen1' | 'screen2' | 'screen3' | 'screen4' | 'screen5'>('all');

  const copyToClipboard = (hex: string) => {
    navigator.clipboard?.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const principles = [
    {
      title: 'Glanceability',
      desc: 'Critical info readable in seconds with large font hierarchy',
      icon: Eye,
    },
    {
      title: 'Dark Mode First',
      desc: 'Minimizes night glare & fatigue (Light mode for inspection)',
      icon: Moon,
    },
    {
      title: 'Fat-Finger Friendly',
      desc: 'Hitboxes ≥ 48×48dp/pt for rough driving & glove usage',
      icon: HandMetal,
    },
    {
      title: 'Compliance Driven',
      desc: 'ELD, HOS regulations & DVIR safety in every screen',
      icon: ShieldCheck,
    },
    {
      title: 'Low Distraction',
      desc: 'Minimal chrome, huge numerals, zero unnecessary animations',
      icon: Compass,
    },
  ];

  const colorTokens = [
    { name: 'Primary Green', hex: '#34785D', role: 'Safe state, buttons, branding' },
    { name: 'Active Glow', hex: '#22C55E', role: 'Active driving ring, telemetry' },
    { name: 'Warning Red', hex: '#DC2626', role: 'Violations, tire pressure alerts' },
    { name: 'Dark Background', hex: '#1C1E21', role: 'Stationary cockpit & night drive' },
    { name: 'Light Surface', hex: '#F2F5F3', role: 'Pre-trip DVIR checklist only' },
    { name: 'Muted Text', hex: '#6E737B', role: 'Secondary telemetry & timestamps' },
  ];

  return (
    <div className="w-full min-h-screen bg-[#0E1012] text-[#F3F4F6] p-4 lg:p-8 select-none">
      {/* ================= TOP HEADER BAR ================= */}
      <div className="max-w-[1920px] mx-auto border-b border-[#262A30] pb-6 mb-8">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          {/* SECUREHAUL Logo Lockup (truck mark + wordmark + "DRIVER PORTAL" below) */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <Logo size="lg" showTagline={true} />
            <div className="hidden sm:block h-10 w-px bg-[#262A30]" />
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#4ADE80] bg-[#1E3A2E] px-2.5 py-1 rounded-full border border-[#34785D]">
                SecureHaul OS Companion Mobile Suite
              </span>
              <p className="text-xs text-[#9CA3AF] mt-1">
                Unified Native Design System for Long-Haul Logistics • Zimbabwe Freight Corridor
              </p>
            </div>
          </div>

          {/* Platform Switcher & Board Mode Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#1C1E21] border border-[#2D3138]">
              <button
                onClick={() => setBoardPlatform('android')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  boardPlatform === 'android'
                    ? 'bg-[#34785D] text-white shadow-md'
                    : 'text-[#9CA3AF] hover:text-white'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>Android (Material 3)</span>
              </button>
              <button
                onClick={() => setBoardPlatform('ios')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  boardPlatform === 'ios'
                    ? 'bg-[#34785D] text-white shadow-md'
                    : 'text-[#9CA3AF] hover:text-white'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>iOS (HIG & Dynamic Island)</span>
              </button>
            </div>

            {onSelectScreenForLiveApp && (
              <button
                onClick={() => onSelectScreenForLiveApp(0)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25282C] hover:bg-[#32363D] text-white text-xs font-bold border border-[#3E434D] transition-all cursor-pointer"
              >
                <span>Launch Interactive Cockpit</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#4ADE80]" />
              </button>
            )}

            {onOpenExportModal && (
              <button
                onClick={onOpenExportModal}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#203D2E] hover:bg-[#28523E] text-[#86EFAC] hover:text-white text-xs font-bold border border-[#34785D]/60 transition-all cursor-pointer shadow-sm"
              >
                <Smartphone className="w-3.5 h-3.5 text-[#4ADE80]" />
                <span>Export Android Studio Project (.zip)</span>
              </button>
            )}
          </div>
        </div>

        {/* ================= 5 PRINCIPLE BADGES ROW ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-6">
          {principles.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="p-3.5 rounded-2xl bg-[#16181B] border border-[#262A30] flex items-start gap-3 shadow-md hover:border-[#34785D] transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-[#1E3A2E] text-[#4ADE80] flex items-center justify-center shrink-0 border border-[#34785D]/40">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-bold text-[#6E737B]">0{idx + 1}</span>
                    <h2 className="text-xs font-bold text-white tracking-tight leading-none">
                      {p.title}
                    </h2>
                  </div>
                  <p className="text-[11px] text-[#9CA3AF] mt-1 leading-snug">
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= 5 SCREENS SIDE-BY-SIDE PRESENTATION BOARD ================= */}
      <div className="max-w-[1920px] mx-auto mb-12">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              Production Screens Matrix
            </h2>
            <p className="text-xs text-[#9CA3AF] mt-0.5">
              Rendered in native {boardPlatform === 'android' ? 'Android Material 3 (edge-to-edge gesture nav)' : 'iOS HIG (Dynamic Island & SF layout)'} frames with real telemetry data.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#9CA3AF] font-mono">Platform View:</span>
            <span className="text-xs font-bold text-[#4ADE80] uppercase tracking-wider bg-[#1E3A2E] px-2.5 py-1 rounded-lg border border-[#34785D]">
              {boardPlatform === 'android' ? 'Google Material 3' : 'Apple Human Interface'}
            </span>
          </div>
        </div>

        {/* Scrollable / Multi-column board for all 5 screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-6">
          {/* SCREEN 1: Driver Home Cockpit */}
          <div className="flex flex-col items-center">
            <div className="w-full flex items-center justify-between px-2 mb-2">
              <div>
                <span className="text-[10px] font-bold text-[#4ADE80] uppercase tracking-wider">
                  Screen 01
                </span>
                <h3 className="text-sm font-bold text-white">Driver Home Cockpit</h3>
                <p className="text-[11px] text-[#6E737B]">Stationary View • HOS Ring</p>
              </div>
              <button
                onClick={() => onSelectScreenForLiveApp?.(0)}
                className="text-[11px] font-semibold text-[#86EFAC] hover:underline"
              >
                Interact →
              </button>
            </div>

            <DeviceFrame platform={boardPlatform}>
              <HomeScreen
                driver={driver}
                telemetry={telemetry}
                schedule={schedule}
                platform={boardPlatform}
                onStartTrip={() => onSelectScreenForLiveApp?.(2)}
                onOpenInspection={() => onSelectScreenForLiveApp?.(1)}
                onViewStops={() => {}}
                onOpenAlert={() => onSelectScreenForLiveApp?.(4)}
              />
            </DeviceFrame>
          </div>

          {/* SCREEN 2: Pre-Trip Inspection (Light Mode) */}
          <div className="flex flex-col items-center">
            <div className="w-full flex items-center justify-between px-2 mb-2">
              <div>
                <span className="text-[10px] font-bold text-[#34785D] uppercase tracking-wider">
                  Screen 02
                </span>
                <h3 className="text-sm font-bold text-white">Pre-Trip Inspection</h3>
                <p className="text-[11px] text-[#6E737B]">Light Mode • 12/12 DVIR & Signature</p>
              </div>
              <button
                onClick={() => onSelectScreenForLiveApp?.(1)}
                className="text-[11px] font-semibold text-[#86EFAC] hover:underline"
              >
                Interact →
              </button>
            </div>

            <DeviceFrame platform={boardPlatform}>
              <InspectionScreen
                inspections={inspections}
                platform={boardPlatform}
                onBack={() => onSelectScreenForLiveApp?.(0)}
                onComplete={() => onSelectScreenForLiveApp?.(0)}
              />
            </DeviceFrame>
          </div>

          {/* SCREEN 3: Active Trip Mode (Focused Driving) */}
          <div className="flex flex-col items-center">
            <div className="w-full flex items-center justify-between px-2 mb-2">
              <div>
                <span className="text-[10px] font-bold text-[#22C55E] uppercase tracking-wider">
                  Screen 03
                </span>
                <h3 className="text-sm font-bold text-white">Active Trip Mode</h3>
                <p className="text-[11px] text-[#6E737B]">Turn-by-turn • 68 km/h Speed Limit</p>
              </div>
              <button
                onClick={() => onSelectScreenForLiveApp?.(2)}
                className="text-[11px] font-semibold text-[#86EFAC] hover:underline"
              >
                Interact →
              </button>
            </div>

            <DeviceFrame platform={boardPlatform} isDrivingMode={true}>
              <ActiveTripScreen
                telemetry={telemetry}
                platform={boardPlatform}
                onViewStops={() => onSelectScreenForLiveApp?.(0)}
                onPauseTrip={() => onSelectScreenForLiveApp?.(0)}
              />
            </DeviceFrame>
          </div>

          {/* SCREEN 4: Logs / HOS (Compliance) */}
          <div className="flex flex-col items-center">
            <div className="w-full flex items-center justify-between px-2 mb-2">
              <div>
                <span className="text-[10px] font-bold text-[#4ADE80] uppercase tracking-wider">
                  Screen 04
                </span>
                <h3 className="text-sm font-bold text-white">Logs / HOS Compliance</h3>
                <p className="text-[11px] text-[#6E737B]">24h Timeline • FMCSA & SADC</p>
              </div>
              <button
                onClick={() => onSelectScreenForLiveApp?.(3)}
                className="text-[11px] font-semibold text-[#86EFAC] hover:underline"
              >
                Interact →
              </button>
            </div>

            <DeviceFrame platform={boardPlatform}>
              <LogsScreen
                currentStatus={currentHosStatus}
                timeline={timeline}
                platform={boardPlatform}
                onStatusChange={() => {}}
              />
            </DeviceFrame>
          </div>

          {/* SCREEN 5: Vehicle Status & Alerts */}
          <div className="flex flex-col items-center">
            <div className="w-full flex items-center justify-between px-2 mb-2">
              <div>
                <span className="text-[10px] font-bold text-[#DC2626] uppercase tracking-wider">
                  Screen 05
                </span>
                <h3 className="text-sm font-bold text-white">Vehicle Status & Alerts</h3>
                <p className="text-[11px] text-[#6E737B]">Low Tire Pressure 85 PSI • Telemetry</p>
              </div>
              <button
                onClick={() => onSelectScreenForLiveApp?.(4)}
                className="text-[11px] font-semibold text-[#86EFAC] hover:underline"
              >
                Interact →
              </button>
            </div>

            <DeviceFrame platform={boardPlatform}>
              <VehicleScreen
                telemetry={telemetry}
                platform={boardPlatform}
                onDismissAlert={() => {}}
              />
            </DeviceFrame>
          </div>
        </div>
      </div>

      {/* ================= SPECIFICATIONS & DESIGN SYSTEM FOOTER ================= */}
      <div className="max-w-[1920px] mx-auto border-t border-[#262A30] pt-8 space-y-8">
        <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#4ADE80]" />
          <span>System Specifications & Design Tokens</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* PANEL 1: Color Palette Panel with Hex Codes */}
          <div className="p-5 rounded-3xl bg-[#16181B] border border-[#262A30] shadow-xl">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Color Palette System
            </h3>
            <div className="space-y-3">
              {colorTokens.map((token) => (
                <div
                  key={token.hex}
                  onClick={() => copyToClipboard(token.hex)}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#1C1E21] border border-[#2E3238] hover:border-[#34785D] cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-7 h-7 rounded-lg border border-white/10 shrink-0 shadow-sm"
                      style={{ backgroundColor: token.hex }}
                    />
                    <div>
                      <span className="text-xs font-bold text-white block">
                        {token.name}
                      </span>
                      <span className="text-[10px] text-[#9CA3AF]">
                        {token.role}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 font-mono text-xs text-[#D1D5DB] group-hover:text-[#4ADE80]">
                    <span>{token.hex}</span>
                    {copiedHex === token.hex ? (
                      <Check className="w-3.5 h-3.5 text-[#4ADE80]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-[#6E737B]" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PANEL 2: Key Components / UI Elements Panel */}
          <div className="p-5 rounded-3xl bg-[#16181B] border border-[#262A30] shadow-xl">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Key Components / UI Elements
            </h3>

            {/* Buttons */}
            <div className="space-y-3">
              <div>
                <span className="text-[10px] font-bold text-[#8E939C] uppercase tracking-wider block mb-1.5">
                  Buttons (Primary / Secondary)
                </span>
                <div className="flex flex-col gap-2">
                  <button className="h-11 rounded-xl bg-[#34785D] hover:bg-[#2C664F] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md">
                    <span>Primary Action (Solid Green)</span>
                  </button>
                  <button className="h-10 rounded-xl bg-[#25282C] border border-[#3E434D] hover:bg-[#32363D] text-white font-semibold text-xs flex items-center justify-center gap-2">
                    <span>Secondary Action (Outlined)</span>
                  </button>
                </div>
              </div>

              {/* Status Chips */}
              <div className="pt-2">
                <span className="text-[10px] font-bold text-[#8E939C] uppercase tracking-wider block mb-1.5">
                  Status Chips
                </span>
                <div className="flex flex-wrap gap-2">
                  <StatusChip status="ON DUTY" size="sm" />
                  <StatusChip status="DRIVING" size="sm" />
                  <StatusChip status="REST" size="sm" />
                  <StatusChip status="VIOLATION" size="sm" />
                </div>
              </div>

              {/* Alert Banner Specimen */}
              <div className="pt-2">
                <span className="text-[10px] font-bold text-[#8E939C] uppercase tracking-wider block mb-1.5">
                  Critical Alert Banner
                </span>
                <div className="p-2.5 rounded-xl bg-[#DC2626] text-white flex items-center justify-between gap-2 border border-red-500/50">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-white shrink-0" />
                    <span className="text-xs font-bold leading-tight">
                      Low Tire Pressure 85 PSI
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* PANEL 3: Typography & Bottom Nav States */}
          <div className="p-5 rounded-3xl bg-[#16181B] border border-[#262A30] shadow-xl space-y-4">
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                Typography System
              </h3>
              <div className="p-3 rounded-2xl bg-[#1C1E21] border border-[#2E3238] space-y-2">
                <div className="flex items-baseline justify-between border-b border-[#2C3036] pb-2">
                  <span className="text-[11px] text-[#9CA3AF]">Hero Timers (Tabular)</span>
                  <span className="text-2xl font-black font-mono tabular-nums text-white">
                    07:28
                  </span>
                </div>
                <div className="flex items-baseline justify-between border-b border-[#2C3036] pb-2">
                  <span className="text-[11px] text-[#9CA3AF]">Display Speed (Tabular)</span>
                  <span className="text-xl font-black font-mono text-[#4ADE80]">
                    68 km/h
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-[11px] text-[#9CA3AF]">Font Pairings</span>
                  <span className="text-xs font-bold text-white">
                    Inter Display • Roboto / JetBrains Mono
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                Bottom Navigation States
              </h3>
              <div className="grid grid-cols-4 gap-1 p-2 rounded-2xl bg-[#1C1E21] border border-[#2E3238] text-center">
                <div className="p-1 rounded-lg">
                  <span className="text-[9px] text-[#8E939C] block">Default</span>
                  <span className="text-[10px] text-[#8E939C] font-medium">Logs</span>
                </div>
                <div className="p-1 rounded-lg bg-[#275341] border border-[#34785D]/60">
                  <span className="text-[9px] text-[#4ADE80] block font-bold">Active</span>
                  <span className="text-[10px] text-[#4ADE80] font-bold">Dash</span>
                </div>
                <div className="p-1 rounded-lg bg-[#25282C]">
                  <span className="text-[9px] text-white block">Hover</span>
                  <span className="text-[10px] text-white font-medium">Map</span>
                </div>
                <div className="p-1 rounded-lg bg-[#181A1D] scale-95">
                  <span className="text-[9px] text-[#86EFAC] block">Pressed</span>
                  <span className="text-[10px] text-[#86EFAC]">Truck</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
