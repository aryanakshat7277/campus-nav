export interface WifiAccessPointSim {
  id: string;
  name: string;
  building: string;
  floor: number;
  x: number;
  y: number;
  latitude: number;
  longitude: number;
  frequency: string; // '2.4 GHz' | '5 GHz'
  baseSignal: number; // referenceSignal at 1m, e.g. -40 dBm
  coverageRadius: number; // meters
}

export interface WifiRssiMeasurement {
  apId: string;
  name: string;
  building: string;
  rssi: number; // in dBm, e.g. -47 dBm
  distance: number; // meters
  signalBars: number; // 1 to 5
  status: 'optimal' | 'good' | 'weak' | 'offline';
}

export interface WifiRttMeasurement {
  apId: string;
  name: string;
  trueDistance: number; // meters
  measuredDistance: number; // meters with simulated noise
  noise: number; // ± meters
  status: 'locked' | 'searching' | 'degraded';
}

export interface PhoneSensorTelemetry {
  accelerometer: {
    acceleration: number; // m/s², e.g. 1.1 m/s²
    isWalking: boolean;
    stepCount: number;
    strideLengthMeters: number;
  };
  gyroscope: {
    angularRate: number; // deg/s
    headingDelta: number; // e.g. +84°
  };
  magnetometer: {
    heading: number; // 0 - 360°
    cardinalDirection: string; // e.g. 'East (92°)'
  };
}

export interface TrilaterationEstimate {
  estimatedX: number;
  estimatedY: number;
  estimatedFloor: number;
  confidence: number; // e.g. 0.91 (91%)
  activeApsCount: number;
}

export interface SimulationState {
  currentNodeId: string;
  currentNodeName: string;
  currentFloor: number;
  currentBuilding: string;
  x: number;
  y: number;
  heading: number;
  speed: number;
  isMoving: boolean;
  routeProgress: number; // 0 - 100%
  isWifiAvailable: boolean;
  isRttAvailable: boolean;
  isBlockedPathActive: boolean;
  activeScenarioId?: string;
}

export interface DemoScenario {
  id: string;
  title: string;
  description: string;
  icon: string;
  actionText: string;
}
