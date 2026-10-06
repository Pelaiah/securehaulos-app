export type Platform = 'android' | 'ios';

export type ScreenTab = 'dashboard' | 'map' | 'logs' | 'vehicle' | 'inspection';

export type HosStatus = 'ON DUTY' | 'DRIVING' | 'REST' | 'VIOLATION';

export interface ScheduleStop {
  id: string;
  step: number;
  type: 'pickup' | 'stop' | 'delivery';
  name: string;
  location: string;
  address: string;
  eta: string;
  status: 'On Time' | 'In 2h 34m' | 'Scheduled' | 'Completed';
  statusVariant: 'success' | 'warning' | 'muted';
  distance: string;
  cargoNote?: string;
}

export interface InspectionCheckItem {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  passed: boolean;
  notes?: string;
}

export interface TelemetryData {
  fuelPercent: number;
  fuelRangeKm: number;
  tirePressureFrontLeft: number;
  tirePressureTarget: number;
  engineTempC: number;
  batteryVoltage: number;
  reeferTempF: number;
  reeferTempC: number;
  reeferStatus: 'Normal' | 'Defrost' | 'Warning';
  currentSpeedKmH: number;
  speedLimitKmH: number;
  odometerKm: number;
}

export interface HosTimelineSegment {
  id: string;
  status: 'Off Duty' | 'Sleeper Berth' | 'Driving' | 'On Duty';
  startTime: string;
  endTime: string;
  duration: string;
  hoursDecimal: number;
  color: string;
  location: string;
}

export interface DriverProfile {
  name: string;
  driverId: string;
  truckNumber: string;
  truckModel: string;
  carrier: string;
  avatarUrl: string;
  safetyScore: number;
  tier: string;
  eldLive: boolean;
  online: boolean;
  unreadNotifications: number;
}
