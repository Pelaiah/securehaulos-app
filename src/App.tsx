/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Smartphone,
  Layers,
  Sparkles,
  RotateCcw,
  ShieldCheck,
  Check,
  X,
  MapPin,
  Clock,
  ChevronRight,
  Info,
  FolderArchive,
  Download,
} from 'lucide-react';
import { Logo } from './components/brand/Logo';
import { DeviceFrame } from './components/frame/DeviceFrame';
import { BottomNavigation } from './components/navigation/BottomNavigation';
import { HomeScreen } from './components/screens/HomeScreen';
import { InspectionScreen } from './components/screens/InspectionScreen';
import { ActiveTripScreen } from './components/screens/ActiveTripScreen';
import { LogsScreen } from './components/screens/LogsScreen';
import { VehicleScreen } from './components/screens/VehicleScreen';
import { DesignPresentationBoard } from './components/board/DesignPresentationBoard';
import { AndroidStudioExportModal } from './components/android/AndroidStudioExportModal';
import {
  INITIAL_DRIVER,
  INITIAL_HOS_TIMELINE,
  INITIAL_INSPECTIONS,
  INITIAL_SCHEDULE,
  INITIAL_TELEMETRY,
} from './data/mockData';
import { HosStatus, Platform, ScreenTab } from './types';

export default function App() {
  // Global view mode: interactive single-device companion app vs side-by-side design board
  const [viewMode, setViewMode] = useState<'app' | 'board'>('app');

  // Active target platform: Android (Material 3) or iOS (HIG)
  const [platform, setPlatform] = useState<Platform>('android');

  // Navigation tab in single-app mode
  const [currentTab, setCurrentTab] = useState<ScreenTab>('dashboard');

  // Application state
  const [driver, setDriver] = useState(INITIAL_DRIVER);
  const [telemetry, setTelemetry] = useState(INITIAL_TELEMETRY);
  const [schedule, setSchedule] = useState(INITIAL_SCHEDULE);
  const [inspections, setInspections] = useState(INITIAL_INSPECTIONS);
  const [timeline, setTimeline] = useState(INITIAL_HOS_TIMELINE);
  const [hosStatus, setHosStatus] = useState<HosStatus>('ON DUTY');

  // Modals & sheets
  const [showStopsModal, setShowStopsModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  // Trigger brief toast notification
  const triggerToast = (msg: string) => {
    setNotificationToast(msg);
    setTimeout(() => setNotificationToast(null), 3000);
  };

  // Status change handler
  const handleStatusChange = (newStatus: HosStatus) => {
    setHosStatus(newStatus);
    triggerToast(`ELD Status changed to: ${newStatus}`);
  };

  // Reset demo data
  const handleResetData = () => {
    setDriver(INITIAL_DRIVER);
    setTelemetry(INITIAL_TELEMETRY);
    setSchedule(INITIAL_SCHEDULE);
    setInspections(INITIAL_INSPECTIONS);
    setTimeline(INITIAL_HOS_TIMELINE);
    setHosStatus('ON DUTY');
    triggerToast('Companion app state reset');
  };

  return (
    <div className="min-h-screen bg-[#0E1012] text-[#F3F4F6] flex flex-col font-sans selection:bg-[#34785D] selection:text-white">
      {/* ================= GLOBAL COMPANION TOP BAR ================= */}
      <header className="sticky top-0 z-50 bg-[#141618]/95 backdrop-blur-md border-b border-[#262A30] px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* SECUREHAUL Brand Lockup */}
          <div className="flex items-center gap-3">
            <Logo size="sm" showTagline={false} />
            <div className="h-5 w-px bg-[#2F343D] hidden sm:block" />
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-semibold text-white">Driver's Cockpit</span>
              <span className="text-[#6E737B] hidden md:inline">• SecureHaul OS Companion</span>
            </div>
          </div>

          {/* Controls: Mode Switcher + Platform Switcher + Reset */}
          <div className="flex items-center gap-2">
            {/* View Mode Toggle: Interactive Companion App vs Design Presentation Board */}
            <div className="flex items-center p-1 rounded-xl bg-[#1C1E21] border border-[#2D3138]">
              <button
                onClick={() => setViewMode('app')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'app'
                    ? 'bg-[#34785D] text-white shadow-sm'
                    : 'text-[#9CA3AF] hover:text-white'
                }`}
                title="Interactive mobile companion simulator"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Companion App</span>
              </button>

              <button
                onClick={() => setViewMode('board')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'board'
                    ? 'bg-[#34785D] text-white shadow-sm'
                    : 'text-[#9CA3AF] hover:text-white'
                }`}
                title="5-screen side-by-side presentation board"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Design Board (5 Screens)</span>
              </button>
            </div>

            {/* Platform Toggle: Android vs iOS */}
            <div className="flex items-center p-1 rounded-xl bg-[#1C1E21] border border-[#2D3138]">
              <button
                onClick={() => {
                  setPlatform('android');
                  triggerToast('Switched to Android Material 3');
                }}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  platform === 'android'
                    ? 'bg-[#275341] text-[#4ADE80]'
                    : 'text-[#8E939C] hover:text-white'
                }`}
                title="Material 3 edge-to-edge conventions"
              >
                Android
              </button>
              <button
                onClick={() => {
                  setPlatform('ios');
                  triggerToast('Switched to iOS HIG & Dynamic Island');
                }}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  platform === 'ios'
                    ? 'bg-[#275341] text-[#4ADE80]'
                    : 'text-[#8E939C] hover:text-white'
                }`}
                title="Apple Human Interface Guidelines"
              >
                iOS
              </button>
            </div>

            {/* Android Studio Export Button */}
            <button
              onClick={() => setShowExportModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#203D2E] hover:bg-[#28523E] text-[#86EFAC] hover:text-white border border-[#34785D]/60 text-xs font-bold transition-all shadow-sm cursor-pointer"
              title="Download or inspect Android Studio (Kotlin Compose) project"
            >
              <FolderArchive className="w-3.5 h-3.5 text-[#4ADE80]" />
              <span className="hidden sm:inline">Android Studio Project</span>
              <span className="sm:hidden">Android</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
            </button>

            {/* Reset State Button */}
            <button
              onClick={handleResetData}
              className="p-2 rounded-xl bg-[#1C1E21] hover:bg-[#25282C] text-[#9CA3AF] hover:text-white border border-[#2D3138] transition-colors cursor-pointer"
              title="Reset sample data"
              aria-label="Reset sample data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* ================= TOAST NOTIFICATION ================= */}
      {notificationToast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-xl bg-[#1E3A2E] border border-[#34785D] text-[#86EFAC] text-xs font-bold shadow-xl flex items-center gap-2 animate-bounce">
          <ShieldCheck className="w-4 h-4 text-[#4ADE80]" />
          <span>{notificationToast}</span>
        </div>
      )}

      {/* ================= MAIN VIEWPORT CONTENT ================= */}
      <main className="flex-1 flex flex-col items-center justify-center">
        {viewMode === 'board' ? (
          // ================= VIEW A: 5-SCREEN PRESENTATION BOARD =================
          <DesignPresentationBoard
            driver={driver}
            telemetry={telemetry}
            schedule={schedule}
            inspections={inspections}
            timeline={timeline}
            currentHosStatus={hosStatus}
            onSelectScreenForLiveApp={(screenIndex) => {
              const tabMap: ScreenTab[] = ['dashboard', 'inspection', 'map', 'logs', 'vehicle'];
              setCurrentTab(tabMap[screenIndex] || 'dashboard');
              setViewMode('app');
            }}
            onOpenExportModal={() => setShowExportModal(true)}
          />
        ) : (
          // ================= VIEW B: LIVE INTERACTIVE COMPANION APP =================
          <div className="w-full flex-1 flex flex-col items-center justify-center p-3 sm:p-6">
            {/* Screen Helper Subtitle */}
            <div className="text-center mb-3">
              <span className="text-[11px] font-bold text-[#4ADE80] uppercase tracking-wider bg-[#1E3A2E] px-3 py-0.5 rounded-full border border-[#34785D]">
                Interactive Companion Simulator • {platform === 'android' ? 'Android Material 3' : 'iOS HIG'}
              </span>
              <p className="text-xs text-[#9CA3AF] mt-1">
                Tap tabs, inspect DVIR, accelerate speed, or change ELD status in real time.
              </p>
            </div>

            {/* Flagship Device Frame */}
            <DeviceFrame
              platform={platform}
              isDrivingMode={currentTab === 'map'}
              onDynamicIslandClick={() => {
                if (platform === 'ios') {
                  setCurrentTab(currentTab === 'map' ? 'dashboard' : 'map');
                }
              }}
            >
              {/* CURRENT ACTIVE SCREEN COMPONENT */}
              {currentTab === 'dashboard' && (
                <HomeScreen
                  driver={driver}
                  telemetry={telemetry}
                  schedule={schedule}
                  platform={platform}
                  onStartTrip={() => {
                    setCurrentTab('map');
                    setHosStatus('DRIVING');
                    triggerToast('Trip started: Duty switched to DRIVING');
                  }}
                  onOpenInspection={() => setCurrentTab('inspection')}
                  onViewStops={() => setShowStopsModal(true)}
                  onOpenAlert={() => setShowAlertModal(true)}
                />
              )}

              {currentTab === 'inspection' && (
                <InspectionScreen
                  inspections={inspections}
                  platform={platform}
                  onBack={() => setCurrentTab('dashboard')}
                  onComplete={() => {
                    setCurrentTab('dashboard');
                    triggerToast('Pre-Trip Inspection signed and synchronized');
                  }}
                />
              )}

              {currentTab === 'map' && (
                <ActiveTripScreen
                  telemetry={telemetry}
                  platform={platform}
                  onViewStops={() => setShowStopsModal(true)}
                  onPauseTrip={() => {
                    setHosStatus('ON DUTY');
                    triggerToast('Trip paused: Duty status set to ON DUTY');
                  }}
                  onUpdateSpeed={(spd) => {
                    setTelemetry((prev) => ({ ...prev, currentSpeedKmH: spd }));
                  }}
                />
              )}

              {currentTab === 'logs' && (
                <LogsScreen
                  currentStatus={hosStatus}
                  timeline={timeline}
                  platform={platform}
                  onStatusChange={handleStatusChange}
                />
              )}

              {currentTab === 'vehicle' && (
                <VehicleScreen
                  telemetry={telemetry}
                  platform={platform}
                  onDismissAlert={() => triggerToast('Tire pressure sensor alert acknowledged')}
                />
              )}

              {/* BOTTOM NAVIGATION BAR (Hidden in inspection mode per UX specs) */}
              {currentTab !== 'inspection' && (
                <BottomNavigation
                  currentTab={currentTab}
                  onTabChange={(tab) => setCurrentTab(tab)}
                  platform={platform}
                />
              )}
            </DeviceFrame>

            {/* Quick Screen Selector Under Device */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 max-w-md">
              <span className="text-[11px] text-[#6E737B] font-mono">Jump to screen:</span>
              {[
                { id: 'dashboard' as ScreenTab, label: '1. Cockpit' },
                { id: 'inspection' as ScreenTab, label: '2. Pre-Trip (Light)' },
                { id: 'map' as ScreenTab, label: '3. Driving Trip' },
                { id: 'logs' as ScreenTab, label: '4. Logs/HOS' },
                { id: 'vehicle' as ScreenTab, label: '5. Vehicle Status' },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentTab(s.id)}
                  className={`text-xs px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                    currentTab === s.id
                      ? 'bg-[#34785D] text-white border-[#4ADE80]/50'
                      : 'bg-[#1C1E21] text-[#9CA3AF] border-[#2E3238] hover:text-white'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ================= MODAL: TODAY'S SCHEDULE FULL VIEW ================= */}
      {showStopsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-3xl bg-[#1C1E21] border border-[#32363D] p-5 shadow-2xl text-white">
            <div className="flex items-center justify-between pb-3 border-b border-[#2A2E35]">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#4ADE80]" />
                <h3 className="text-sm font-bold tracking-tight">
                  Harare – Bulawayo Corridor Schedule
                </h3>
              </div>
              <button
                onClick={() => setShowStopsModal(false)}
                className="p-1 rounded-lg text-[#9CA3AF] hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3 max-h-[60vh] overflow-y-auto no-scrollbar">
              {schedule.map((stop) => (
                <div
                  key={stop.id}
                  className="p-3 rounded-2xl bg-[#22252A] border border-[#2E3238]"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white">
                      Stop {stop.step}: {stop.name}
                    </span>
                    <span className="text-[10px] font-bold text-[#86EFAC] bg-[#1E3A2E] px-2 py-0.5 rounded-full">
                      {stop.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#9CA3AF]">{stop.address}</p>
                  {stop.cargoNote && (
                    <div className="mt-2 text-[10px] text-[#4ADE80] font-mono bg-[#181A1D] p-2 rounded-lg border border-[#2E3238]">
                      Cargo: {stop.cargoNote}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowStopsModal(false)}
              className="w-full h-11 rounded-xl bg-[#34785D] text-white font-bold text-xs uppercase cursor-pointer"
            >
              Close Schedule
            </button>
          </div>
        </div>
      )}

      {/* ================= MODAL: TELEMETRY ALERTS DRAWER ================= */}
      {showAlertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-3xl bg-[#1C1E21] border border-[#32363D] p-5 shadow-2xl text-white">
            <div className="flex items-center justify-between pb-3 border-b border-[#2A2E35]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#4ADE80]" />
                <h3 className="text-sm font-bold tracking-tight">
                  Sensor Telemetry & Notifications
                </h3>
              </div>
              <button
                onClick={() => setShowAlertModal(false)}
                className="p-1 rounded-lg text-[#9CA3AF] hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3">
              <div className="p-3 rounded-2xl bg-[#331818] border border-[#DC2626]/50">
                <span className="text-[10px] font-bold text-[#FCA5A5] uppercase">Active Warning</span>
                <p className="text-xs font-bold text-white mt-0.5">
                  Low Tire Pressure, Front Left: 85 PSI (Target 100 PSI)
                </p>
                <p className="text-[10px] text-[#FCA5A5] mt-1">
                  Air pump suggested at next fuel station in Mazowe (14 km).
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-[#1C2922] border border-[#34785D]/50">
                <span className="text-[10px] font-bold text-[#86EFAC] uppercase">Cold Chain Verified</span>
                <p className="text-xs font-bold text-white mt-0.5">
                  Reefer Compartment: -4°F / -20.1°C Steady
                </p>
                <p className="text-[10px] text-[#86EFAC] mt-1">
                  Pharmaceutical vaccines remain within cold-chain compliance limits.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setShowAlertModal(false);
                setCurrentTab('vehicle');
              }}
              className="w-full h-11 rounded-xl bg-[#34785D] text-white font-bold text-xs uppercase cursor-pointer"
            >
              Open Full Vehicle Diagnostics
            </button>
          </div>
        </div>
      )}

      {/* ================= MODAL: ANDROID STUDIO EXPORT & CODE INSPECTOR ================= */}
      <AndroidStudioExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
      />
    </div>
  );
}
