import React from 'react';
import { LayoutDashboard, MapPin, ClipboardList, ShieldAlert, Truck } from 'lucide-react';
import { Platform, ScreenTab } from '../../types';

interface BottomNavigationProps {
  currentTab: ScreenTab;
  onTabChange: (tab: ScreenTab) => void;
  platform: Platform;
  className?: string;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentTab,
  onTabChange,
  platform,
  className = '',
}) => {
  const tabs = [
    {
      id: 'dashboard' as ScreenTab,
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'map' as ScreenTab,
      label: 'Map / Trip',
      icon: MapPin,
      badge: 'LIVE',
    },
    {
      id: 'logs' as ScreenTab,
      label: 'Logs / HOS',
      icon: ClipboardList,
      badge: null,
    },
    {
      id: 'vehicle' as ScreenTab,
      label: 'Vehicle',
      icon: Truck,
      badge: '!',
    },
  ];

  const isAndroid = platform === 'android';

  return (
    <nav
      aria-label="Bottom Navigation"
      className={`w-full z-40 select-none ${
        isAndroid
          ? 'bg-[#181A1D] border-t border-[#2C3036] px-2 py-1 shadow-lg'
          : 'bg-[#1C1E21]/90 backdrop-blur-xl border-t border-white/10 px-3 pt-1.5 pb-2 shadow-2xl'
      } ${className}`}
    >
      <div className="flex items-center justify-around w-full max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          const Icon = tab.icon;

          if (isAndroid) {
            // Material 3 Navigation Bar Pattern:
            // Active state has a pill indicator with icon, and label below
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="relative flex flex-col items-center justify-center flex-1 min-h-[52px] min-w-[48px] py-1 cursor-pointer transition-colors active:scale-95"
              >
                <div
                  className={`relative flex items-center justify-center px-4 py-1 rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-[#275341] text-[#4ADE80] shadow-[0_0_12px_rgba(52,120,93,0.35)]'
                      : 'text-[#9CA3AF] hover:text-white'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-transform duration-200 ${
                      isActive ? 'scale-110 text-[#4ADE80]' : 'text-[#8E939C]'
                    }`}
                  />
                  {tab.badge && (
                    <span
                      className={`absolute -top-1 -right-1 px-1 min-w-[14px] h-[14px] text-[8px] font-bold rounded-full flex items-center justify-center ${
                        tab.badge === '!'
                          ? 'bg-[#DC2626] text-white animate-pulse'
                          : 'bg-[#34785D] text-white'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </div>
                <span
                  className={`text-[11px] mt-1 font-medium tracking-tight transition-colors ${
                    isActive ? 'text-[#4ADE80] font-bold' : 'text-[#8E939C]'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          }

          // iOS HIG Tab Bar Pattern:
          // Active state has tinted green icon, text underneath, active subtle pill highlight option
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative flex flex-col items-center justify-center flex-1 min-h-[50px] min-w-[48px] py-0.5 cursor-pointer transition-transform active:scale-95"
            >
              <div
                className={`relative flex items-center justify-center rounded-xl p-1.5 transition-all ${
                  isActive ? 'bg-[#34785D]/20' : ''
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    isActive ? 'text-[#4ADE80]' : 'text-[#858A93]'
                  }`}
                />
                {tab.badge && (
                  <span
                    className={`absolute -top-0.5 -right-0.5 px-1 min-w-[14px] h-[14px] text-[8px] font-bold rounded-full flex items-center justify-center ${
                      tab.badge === '!' ? 'bg-[#DC2626] text-white' : 'bg-[#34785D] text-white'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] tracking-tight font-medium mt-0.5 ${
                  isActive ? 'text-[#4ADE80] font-bold' : 'text-[#858A93]'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
