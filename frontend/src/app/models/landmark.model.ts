export interface Landmark {
  id: string;
  name: string;
  category: string;
  buildingId: string;
  floorId: string;
  nodeId: string;
  description?: string;
  icon?: string;
  latitude?: number;
  longitude?: number;
}
