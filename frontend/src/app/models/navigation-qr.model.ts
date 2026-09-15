export interface NavigationQr {
  id: string;
  qrCode: string;
  buildingId: string;
  floorId: string;
  nodeId: string;
  active: boolean;
  createdAt: string;
}

export interface QrResolveResponse {
  valid: boolean;
  buildingId?: string;
  buildingName?: string;
  floorId?: string;
  floorNumber?: number;
  nodeId?: string;
  nodeName?: string;
  latitude?: number;
  longitude?: number;
}
