export interface LocationCategory {
  id: string;
  label: string;
  icon: string;
  color: string;
}

export interface Location {
  id: string;
  name: string;
  category: string;
  buildingId?: string;
  floor: number;
  description?: string;
  latitude: number;
  longitude: number;
  imageUrl?: string;
  isAccessible: boolean;
  isDelivery: boolean;
  tags: string[];
  openingHours?: string;
  createdAt?: string;
}
