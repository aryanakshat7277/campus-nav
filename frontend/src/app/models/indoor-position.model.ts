export type PositionConfidence = 'CONFIRMED' | 'ESTIMATED' | 'UNCERTAIN';
export type ProviderName = 'ble' | 'qr' | 'sensor' | 'wifi-rssi' | 'wifi-rtt' | 'uwb' | 'vision';

export interface PositionObservation {
  provider: ProviderName;
  buildingId?: string;
  floorId?: string;
  nodeId?: string;
  localX?: number;
  localY?: number;
  latitude?: number;
  longitude?: number;
  confidence: number;
  heading?: number;
  timestamp: number;
}

export interface IndoorPosition {
  buildingId?: string;
  buildingName?: string;
  floorId?: string;
  floorNumber?: number;
  nodeId?: string;
  nodeName?: string;
  localX?: number;
  localY?: number;
  latitude?: number;
  longitude?: number;
  heading?: number;
  confidence: number;
  confidenceState: PositionConfidence;
  lastUpdated: number;
  activeProviders: ProviderName[];
}
