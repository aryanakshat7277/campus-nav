import { LocationCategory } from '../models/location.model';

export const CAMPUS_CENTER: [number, number] = [18.7783, 84.0937];
export const DEFAULT_ZOOM: number = 17;
export const WALKING_SPEED: number = 1.4; // meters per second

export const CATEGORIES: LocationCategory[] = [
  { id: 'entrance', label: 'Entrances', icon: 'door_front', color: '#6D4C41' },
  { id: 'building', label: 'Academic', icon: 'school', color: '#1565C0' },
  { id: 'classroom', label: 'Classrooms', icon: 'class', color: '#1976D2' },
  { id: 'lab', label: 'Labs', icon: 'science', color: '#0D47A1' },
  { id: 'office', label: 'Offices', icon: 'business', color: '#283593' },
  { id: 'hostel', label: 'Hostels', icon: 'hotel', color: '#4527A0' },
  { id: 'canteen', label: 'Food', icon: 'restaurant', color: '#E65100' },
  { id: 'library', label: 'Library', icon: 'local_library', color: '#00695C' },
  { id: 'sports', label: 'Sports', icon: 'sports', color: '#2E7D32' },
  { id: 'medical', label: 'Medical', icon: 'local_hospital', color: '#C62828' },
  { id: 'parking', label: 'Parking', icon: 'local_parking', color: '#37474F' },
  { id: 'garden', label: 'Garden', icon: 'park', color: '#33691E' },
  { id: 'auditorium', label: 'Auditorium', icon: 'theater_comedy', color: '#4A148C' },
  { id: 'indoor', label: 'Indoor', icon: 'meeting_room', color: '#00838F' },
  { id: 'intersection', label: 'Paths', icon: 'fork_right', color: '#78909C' },
  { id: 'computer_center', label: 'Computer', icon: 'computer', color: '#0277BD' },
  { id: 'gate', label: 'Gates', icon: 'door_sliding', color: '#5D4037' },
  { id: 'restroom', label: 'Restrooms', icon: 'wc', color: '#546E7A' },
  { id: 'atm', label: 'ATM', icon: 'atm', color: '#00897B' },
];
