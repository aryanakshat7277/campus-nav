export interface Alert {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'closure';
  locationId?: string;
  isActive: boolean;
  createdAt: string;
}

export interface Report {
  id?: string;
  locationId: string;
  reportType: string;
  description: string;
  status: 'open' | 'resolved';
}
