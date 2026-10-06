import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  Truck,
  Wrench,
  Gauge,
  Link as LinkIcon,
  Shield,
  LifeBuoy,
  PenTool,
  RotateCcw,
  Check,
  AlertTriangle,
} from 'lucide-react';
import { InspectionCheckItem, Platform } from '../../types';

interface InspectionScreenProps {
  inspections: InspectionCheckItem[];
  platform: Platform;
  onBack: () => void;
  onComplete: () => void;
}

export const InspectionScreen: React.FC<InspectionScreenProps> = ({
  inspections: initialInspections,
  platform,
  onBack,
  onComplete,
}) => {
  const [items, setItems] = useState<InspectionCheckItem[]>(initialInspections);
  const [hasSigned, setHasSigned] = useState(false);
  const [isCompletedModal, setIsCompletedModal] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);

  const passedCount = items.filter((i) => i.passed).length;
  const totalCount = items.length;
  const progressPercent = Math.round((passedCount / totalCount) * 100);

  // Icon mapping for inspection categories
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Walkaround':
        return Truck;
      case 'Powertrain':
        return Wrench;
      case 'Pneumatics':
        return Gauge;
      case 'Trailer':
        return LinkIcon;
      case 'Safety':
        return LifeBuoy;
      case 'Interior':
        return Shield;
      default:
        return CheckCircle2;
    }
  };

  const togglePassed = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, passed: !item.passed } : item
      )
    );
  };

  // Canvas drawing logic for signature pad
  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSigned(false);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    isDrawingRef.current = true;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#1C1E21';
    setHasSigned(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
  };

  const handleFinishInspection = () => {
    setIsCompletedModal(true);
  };

  return (
    // LIGHT MODE SURFACE: #F2F5F3 as mandated by prompt
    <div className="flex-1 w-full overflow-y-auto no-scrollbar pb-6 px-4 pt-2 bg-[#F2F5F3] text-[#1C1E21] select-none">
      {/* ================= TOP HEADER ================= */}
      <div className="flex items-center justify-between py-2 border-b border-[#E1E6E3]">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 p-2 rounded-xl text-[#34785D] hover:bg-[#E5ECE7] transition-colors cursor-pointer"
          aria-label="Back to dashboard"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-xs font-semibold">Back</span>
        </button>

        <h1 className="text-base font-bold text-[#1C1E21] tracking-tight">
          Pre-Trip Inspection
        </h1>

        <span className="text-xs font-mono font-bold text-[#34785D] bg-[#E2EDE7] px-2.5 py-0.5 rounded-full border border-[#34785D]/30">
          DVIR
        </span>
      </div>

      {/* ================= GREEN PROGRESS BAR 12/12 ================= */}
      <div className="my-3 p-3.5 rounded-2xl bg-white border border-[#E1E7E3] shadow-sm">
        <div className="flex items-center justify-between text-xs font-semibold mb-2">
          <span className="text-[#4B5563]">Vehicle Safety Checklist</span>
          <span className="font-mono text-[#34785D] font-bold text-sm">
            {passedCount}/{totalCount} Completed
          </span>
        </div>

        {/* Progress track */}
        <div className="w-full h-2.5 bg-[#E5EAE7] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#34785D] transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* ================= 6 PRIMARY CHECKLIST CARDS ================= */}
      <div className="space-y-2.5 mb-5">
        {items.map((item) => {
          const Icon = getCategoryIcon(item.category);
          return (
            <div
              key={item.id}
              onClick={() => togglePassed(item.id)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                item.passed
                  ? 'bg-white border-[#C8DFD4] shadow-sm hover:border-[#34785D]'
                  : 'bg-[#FFF7F7] border-[#FECACA]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    item.passed ? 'bg-[#EAF3EE] text-[#34785D]' : 'bg-[#FEE2E2] text-[#DC2626]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#1C1E21] leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-[#6E737B] mt-0.5 leading-snug">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              {/* Status Toggle Box */}
              <div className="shrink-0 pl-1">
                {item.passed ? (
                  <div className="w-7 h-7 rounded-full bg-[#34785D] text-white flex items-center justify-center shadow-sm">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                ) : (
                  <div className="w-7 h-7 rounded-full border-2 border-[#DC2626] bg-white text-[#DC2626] flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= DRIVER SIGNATURE PAD ================= */}
      <div className="p-4 rounded-2xl bg-white border border-[#E1E7E3] shadow-sm mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <PenTool className="w-4 h-4 text-[#34785D]" />
            <h3 className="text-xs font-bold text-[#1C1E21] uppercase tracking-wider">
              Driver Signature Pad
            </h3>
          </div>
          <button
            onClick={clearSignature}
            className="flex items-center gap-1 text-[11px] font-semibold text-[#DC2626] hover:text-[#B91C1C] py-1 px-2 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>

        {/* Interactive canvas pad */}
        <div className="relative border-2 border-dashed border-[#CBD5E1] rounded-xl bg-[#F8FAF9] overflow-hidden">
          <canvas
            ref={canvasRef}
            width={340}
            height={110}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="w-full h-[110px] touch-none cursor-crosshair block"
          />
          {!hasSigned && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-[#9CA3AF] text-xs font-medium">
              Draw driver signature with finger or cursor
            </div>
          )}
          {/* Baseline guide line */}
          <div className="absolute bottom-4 left-6 right-6 border-b border-[#CBD5E1] pointer-events-none" />
        </div>

        {/* Mandatory Legal Clause */}
        <p className="text-[11px] text-[#6E737B] mt-2.5 leading-relaxed font-medium">
          “By signing, I confirm the vehicle is safe and roadworthy.”
        </p>
      </div>

      {/* ================= COMPLETE INSPECTION BUTTON ================= */}
      <button
        onClick={handleFinishInspection}
        className="w-full h-13 rounded-2xl bg-[#34785D] hover:bg-[#2C664F] active:scale-[0.98] text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-[#34785D]/25 transition-all cursor-pointer border border-[#4ADE80]/30"
      >
        <CheckCircle2 className="w-5 h-5 text-white" />
        <span>Complete Inspection</span>
      </button>

      {/* Completed Modal Confirmation */}
      {isCompletedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm rounded-3xl bg-white p-5 text-center shadow-2xl border border-[#34785D]">
            <div className="w-14 h-14 rounded-full bg-[#EAF5EF] text-[#34785D] flex items-center justify-center mx-auto mb-3">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="text-base font-bold text-[#1C1E21]">
              DVIR Inspection Certified
            </h3>
            <p className="text-xs text-[#6E737B] mt-1">
              Vehicle #SH-8283 marked safe for transit under DOT & SADC compliance standards.
            </p>
            <div className="mt-3 p-2 bg-[#F2F5F3] rounded-xl text-[11px] font-mono text-[#34785D] font-bold">
              DVIR-RECORD #ZIM-99420-OK
            </div>
            <button
              onClick={() => {
                setIsCompletedModal(false);
                onComplete();
              }}
              className="w-full mt-4 h-11 rounded-xl bg-[#34785D] text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
            >
              Return to Cockpit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
