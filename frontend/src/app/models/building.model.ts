export interface Room {
  id: string;
  name: string;
  roomNumber: string;
  floorId: string;
  type: string;
  capacity?: number;
  nodeId?: string;
}

export interface Floor {
  id: string;
  name: string;
  floorNumber: number;
  buildingId: string;
  mapImageUrl?: string;
  rooms?: Room[];
}

export interface Building {
  id: string;
  name: string;
  code: string;
  description?: string;
  latitude?: number;
  longitude?: number;
  floors?: Floor[];
}
