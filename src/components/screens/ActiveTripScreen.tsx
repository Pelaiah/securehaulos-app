import React, { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  Layers,
  Maximize2,
  Navigation,
  Compass,
  Fuel,
  Clock,
  MapPin,
  ChevronRight,
  RotateCcw,
  AlertCircle,
  PauseCircle,
} from 'lucide-react';
import { Platform, TelemetryData } from '../../types';

interface ActiveTripScreenProps {
  telemetry: TelemetryData;
  platform: Platform;
  onViewStops: () => void;
  onPauseTrip: () => void;
  onUpdateSpeed?: (speed: number) => void;
}

export const ActiveTripScreen: React.FC<ActiveTripScreenProps> = ({
  telemetry,
  platform,
  onViewStops,
  onPauseTrip,
  onUpdateSpeed,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(telemetry.currentSpeedKmH || 68);
  const [mapLayer, setMapLayer] = useState<'traffic' | 'satellite' | 'standard'>('traffic');
  const [showSpeedController, setShowSpeedController] = useState(false);

  const speedLimit = 80;
  const isOverSpeed = currentSpeed > speedLimit;

  // Handler for speed adjustments
  const handleSpeedChange = (newSpeed: number) => {
    setCurrentSpeed(newSpeed);
    if (onUpdateSpeed) {
      onUpdateSpeed(newSpeed);
    }
  };

  return (
    <div className="flex-1 w-full h-full flex flex-col bg-[#141618] text-white select-none relative overflow-hidden">
      {/* ================= 1. TOP GREEN BANNER ================= */}
      {/* Glanceability: "DRIVING" with "HOS Remaining 07:28" */}
      <div className="w-full bg-[#1A3828] border-b border-[#34785D] px-4 py-2.5 flex items-center justify-between shrink-0 shadow-md">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] animate-ping" />
          <span className="text-xs font-black tracking-widest text-[#4ADE80] uppercase">
            DRIVING
          </span>
        </div>
        <div className="flex items-center gap-1.5 font-mono">
          <span className="text-[11px] font-semibold text-[#86EFAC] uppercase tracking-wider">
            HOS REMAINING
          </span>
          <span className="text-sm font-black text-white bg-[#0F2218] px-2 py-0.5 rounded-md border border-[#34785D] tabular-nums">
            07:28
          </span>
        </div>
      </div>

      {/* ================= 2. TURN-BY-TURN CARD ================= */}
      {/* "1.2 km, Turn right onto A5" with a mute button */}
      <div className="mx-3 mt-2.5 p-3 rounded-2xl bg-[#1C1E21]/95 backdrop-blur-md border border-[#32363D] shadow-xl flex items-center justify-between z-20 shrink-0">
        <div className="flex items-center gap-3">
          {/* Turn Arrow Glyph */}
          <div className="w-11 h-11 rounded-xl bg-[#34785D] text-white flex items-center justify-center shrink-0 shadow-md border border-[#4ADE80]/30">
            {/* SVG Turn Right icon */}
            <svg
              className="w-6 h-6 stroke-white fill-none stroke-[2.5]"
              viewBox="0 0 24 24"
            >
              <path d="M7 19V11a4 4 0 0 1 4-4h8" />
              <polyline points="15 3 19 7 15 11" />
            </svg>
          </div>

          <div>
            <div className="flex items-baseline gap-1.5 font-mono">
              <span className="text-xl font-black text-white tracking-tight tabular-nums">
                1.2
              </span>
              <span className="text-xs font-bold text-[#86EFAC]">km</span>
            </div>
            <p className="text-xs font-bold text-white tracking-tight mt-0.5 leading-tight">
              Turn right onto A5 (Mazowe-Bindura Rd)
            </p>
          </div>
        </div>

        {/* Audio / Mute Guidance Button */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
            isMuted
              ? 'bg-[#292C32] text-[#9CA3AF] border-[#3E4249]'
              : 'bg-[#1E3A2E] text-[#4ADE80] border-[#34785D]'
          }`}
          aria-label={isMuted ? 'Unmute turn by turn' : 'Mute turn by turn'}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>

      {/* ================= 3. DARK MAP VIEWPORT ================= */}
      <div className="relative flex-1 w-full overflow-hidden bg-[#121417]">
        {/* Vector Stylized Map Background Canvas */}
        <svg
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 400 400"
        >
          <defs>
            {/* Grid Pattern */}
            <pattern
              id="mapGrid"
              width="30"
              height="30"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 30 0 L 0 0 0 30"
                fill="none"
                stroke="#1B1E22"
                strokeWidth="1"
              />
            </pattern>

            {/* Glowing route stroke filter */}
            <filter id="routeGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background fill */}
          <rect width="100%" height="100%" fill="#14171A" />
          <rect width="100%" height="100%" fill="url(#mapGrid)" />

          {/* Secondary road networks */}
          <path
            d="M 20 40 Q 150 120 280 80 T 400 130"
            fill="none"
            stroke="#21252B"
            strokeWidth="3"
          />
          <path
            d="M 380 20 Q 250 180 180 340 T 80 400"
            fill="none"
            stroke="#21252B"
            strokeWidth="3.5"
          />
          <path
            d="M 0 250 C 90 220 180 260 400 240"
            fill="none"
            stroke="#1E2228"
            strokeWidth="2.5"
          />

          {/* Active Navigation Glowing Route Line: Harare -> Bindura A5 Corridor */}
          <path
            d="M 80 380 C 130 330 190 270 210 210 Q 220 170 270 120 T 310 40"
            fill="none"
            stroke="#22C55E"
            strokeWidth="7"
            strokeLinecap="round"
            filter="url(#routeGlow)"
            className="opacity-95"
          />
          {/* Inner core bright line */}
          <path
            d="M 80 380 C 130 330 190 270 210 210 Q 220 170 270 120 T 310 40"
            fill="none"
            stroke="#86EFAC"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Upcoming Turn Marker at (210, 210) */}
          <circle cx="210" cy="210" r="10" fill="#34785D" opacity="0.4" />
          <circle cx="210" cy="210" r="5" fill="#4ADE80" />

          {/* Destination Waypoint at (310, 40) */}
          <circle cx="310" cy="40" r="8" fill="#34785D" />
          <circle cx="310" cy="40" r="4" fill="#FFFFFF" />

          {/* Current Vehicle Position Marker at (175, 248) */}
          <g transform="translate(175, 248) rotate(-42)">
            {/* Pulsing radar ring */}
            <circle cx="0" cy="0" r="22" fill="#22C55E" opacity="0.2">
              <animate
                attributeName="r"
                values="16;28;16"
                dur="2.5s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.35;0.05;0.35"
                dur="2.5s"
                repeatCount="indefinite"
              />
            </circle>

            {/* Truck Chevron Direction Pointer */}
            <circle cx="0" cy="0" r="13" fill="#1C1E21" stroke="#34785D" strokeWidth="2.5" />
            <polygon points="0,-8 6,6 0,3 -6,6" fill="#4ADE80" />
          </g>
        </svg>

        {/* Floating Map Controls (Fullscreen, Sound/Layers, Compass) */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-20">
          <button
            onClick={() =>
              setMapLayer(
                mapLayer === 'traffic'
                  ? 'satellite'
                  : mapLayer === 'satellite'
                  ? 'standard'
                  : 'traffic'
              )
            }
            className="w-10 h-10 rounded-xl bg-[#1C1E21]/90 backdrop-blur-md border border-[#32363D] flex items-center justify-center text-white/90 shadow-lg active:scale-95 cursor-pointer hover:bg-[#25282C]"
            title={`Map layer: ${mapLayer}`}
          >
            <Layers className="w-4 h-4 text-[#4ADE80]" />
          </button>
          <button
            onClick={() => setShowSpeedController(!showSpeedController)}
            className="w-10 h-10 rounded-xl bg-[#1C1E21]/90 backdrop-blur-md border border-[#32363D] flex items-center justify-center text-white/90 shadow-lg active:scale-95 cursor-pointer hover:bg-[#25282C]"
            title="Speed Simulator"
          >
            <Compass className="w-4 h-4 text-[#9CA3AF]" />
          </button>
          <button
            onClick={onPauseTrip}
            className="w-10 h-10 rounded-xl bg-[#1C1E21]/90 backdrop-blur-md border border-[#32363D] flex items-center justify-center text-white/90 shadow-lg active:scale-95 cursor-pointer hover:bg-[#25282C]"
            title="Pause Trip"
          >
            <PauseCircle className="w-4 h-4 text-[#FBBF24]" />
          </button>
        </div>

        {/* ================= 4. LARGE CURRENT SPEED DISPLAY & SPEED LIMIT SIGN ================= */}
        {/* Large current speed "68 km/h" with red speed-limit sign "80" */}
        <div className="absolute bottom-3 left-3 flex items-end gap-3 z-20">
          {/* Giant Speed Block */}
          <div
            onClick={() => setShowSpeedController(!showSpeedController)}
            className="px-4 py-2.5 rounded-2xl bg-[#1C1E21]/95 backdrop-blur-md border border-[#32363D] shadow-2xl flex flex-col cursor-pointer active:scale-95 transition-transform"
          >
            <span className="text-[10px] font-bold tracking-wider text-[#9CA3AF] uppercase">
              SPEED
            </span>
            <div className="flex items-baseline gap-1">
              <span
                className={`text-4xl font-black font-mono tracking-tighter tabular-nums ${
                  isOverSpeed ? 'text-[#DC2626]' : 'text-white'
                }`}
              >
                {currentSpeed}
              </span>
              <span className="text-xs font-extrabold text-[#9CA3AF]">km/h</span>
            </div>
          </div>

          {/* Circular Red Speed Limit Sign "80" */}
          <div
            className={`w-14 h-14 rounded-full bg-white border-[4px] border-[#DC2626] flex flex-col items-center justify-center shadow-xl shrink-0 ${
              isOverSpeed ? 'animate-bounce ring-4 ring-[#DC2626]/50' : ''
            }`}
          >
            <span className="text-lg font-black text-[#1C1E21] font-mono leading-none">
              {speedLimit}
            </span>
            <span className="text-[7px] font-bold text-[#6E737B] leading-none uppercase">
              LIMIT
            </span>
          </div>
        </div>

        {/* Speed Interactive Slider Popover for Demo/Testing */}
        {showSpeedController && (
          <div className="absolute bottom-20 left-3 right-3 p-3 rounded-2xl bg-[#1E2125] border border-[#3A3F47] shadow-2xl z-30 animate-fade-in">
            <div className="flex items-center justify-between text-xs font-semibold mb-2">
              <span className="text-[#9CA3AF]">Speed Simulator</span>
              <span className="font-mono text-white font-bold">{currentSpeed} km/h</span>
            </div>
            <input
              type="range"
              min="40"
              max="105"
              value={currentSpeed}
              onChange={(e) => handleSpeedChange(Number(e.target.value))}
              className="w-full accent-[#34785D] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#6E737B] mt-1 font-mono">
              <span>40 (Eco)</span>
              <span>80 (Limit)</span>
              <span>105 (Over)</span>
            </div>
          </div>
        )}
      </div>

      {/* ================= 5. BOTTOM TRIP BAR ================= */}
      {/* 237 km remaining, 3h 26m ETA 14:35, 78% fuel */}
      <div className="w-full bg-[#1C1E21] border-t border-[#2F333A] p-3.5 z-20 shrink-0 shadow-2xl">
        <div className="grid grid-cols-3 gap-2 pb-2.5 border-b border-[#2C3036] text-center font-mono">
          <div>
            <span className="block text-[9px] font-bold text-[#8E939C] uppercase tracking-wider">
              Remaining
            </span>
            <span className="block text-base font-extrabold text-white tabular-nums mt-0.5">
              237 km
            </span>
          </div>
          <div>
            <span className="block text-[9px] font-bold text-[#8E939C] uppercase tracking-wider">
              Duration
            </span>
            <span className="block text-base font-extrabold text-white tabular-nums mt-0.5">
              3h 26m
            </span>
          </div>
          <div>
            <span className="block text-[9px] font-bold text-[#8E939C] uppercase tracking-wider">
              ETA
            </span>
            <span className="block text-base font-extrabold text-[#4ADE80] tabular-nums mt-0.5">
              14:35
            </span>
          </div>
        </div>

        {/* "Next Stop: Bindura Warehouse, 3h 27m • 237 km" with "View Stops" button */}
        <div className="flex items-center justify-between pt-2.5">
          <div className="min-w-0 pr-2">
            <div className="flex items-center gap-1.5 text-[11px] text-[#9CA3AF]">
              <MapPin className="w-3.5 h-3.5 text-[#4ADE80] shrink-0" />
              <span className="font-semibold text-white truncate">
                Next: Bindura Regional Warehouse
              </span>
            </div>
            <div className="text-[10px] text-[#6E737B] font-mono mt-0.5 pl-5">
              3h 27m • 237 km • Fuel: {telemetry.fuelPercent}%
            </div>
          </div>

          <button
            onClick={onViewStops}
            className="h-9 px-3 rounded-xl bg-[#294B3B] hover:bg-[#34785D] text-[#86EFAC] hover:text-white font-bold text-xs flex items-center gap-1 whitespace-nowrap transition-colors cursor-pointer border border-[#34785D]/40 shrink-0"
          >
            <span>View Stops</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
