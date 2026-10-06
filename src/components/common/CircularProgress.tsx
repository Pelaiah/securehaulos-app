import React from 'react';

interface CircularProgressProps {
  value: number; // 0 to 100
  size?: number; // px, default 200
  strokeWidth?: number; // default 12
  timeString: string; // e.g. "07:28"
  labelTop?: string; // e.g. "REMAINING HOS"
  unitBottom?: string; // e.g. "HOURS"
  color?: string; // default #34785D
  glowColor?: string; // default #22C55E
  isViolation?: boolean;
  className?: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  size = 190,
  strokeWidth = 11,
  timeString,
  labelTop = 'REMAINING HOS',
  unitBottom = 'HOURS',
  color = '#34785D',
  glowColor = '#22C55E',
  isViolation = false,
  className = '',
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  const activeColor = isViolation ? '#DC2626' : color;
  const activeGlow = isViolation ? '#EF4444' : glowColor;

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Background radial glow */}
      <div
        className="absolute inset-0 rounded-full opacity-20 pointer-events-none blur-xl transition-all"
        style={{
          background: `radial-gradient(circle, ${activeGlow} 0%, transparent 70%)`,
        }}
      />

      {/* SVG Ring */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* Track circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#2A2E33"
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={activeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          style={{
            transition: 'stroke-dashoffset 0.8s ease-in-out',
            filter: `drop-shadow(0 0 6px ${activeGlow})`,
          }}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-2">
        {labelTop && (
          <span className="text-[10px] font-semibold tracking-wider text-[#9CA3AF] uppercase">
            {labelTop}
          </span>
        )}
        <span
          className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-mono tabular-nums leading-none my-1"
          style={{
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
          }}
        >
          {timeString}
        </span>
        {unitBottom && (
          <span className="text-[11px] font-bold tracking-widest text-[#34D399] uppercase">
            {unitBottom}
          </span>
        )}
      </div>
    </div>
  );
};
