export interface CampusClosure {
  id: string;
  reason: string;
  type: 'edge' | 'node' | 'area';
  targetId: string; 
  startDate: string;
  endDate: string;
  active: boolean;
}
