export interface Beacon {
  id: string;
  beaconUuid: string;
  major: number;
  minor: number;
  buildingId: string;
  floorId: string;
  nodeId: string;
  localX: number;
  localY: number;
  latitude: number;
  longitude: number;
  installationHeight: number;
  signalCalibration: number;
  status: string;
  lastSeen?: string;
}

export interface BeaconSignal {
  beaconId: string;
  uuid: string;
  major: number;
  minor: number;
  rssi: number;
  timestamp: number;
}
