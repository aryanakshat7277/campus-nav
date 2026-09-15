import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { BuildingService } from '../../services/building.service';

export interface CampusBuildingItem {
  id: string;
  name: string;
  code: string;
  category: string;
  floors: number;
  roomsCount: number;
  hasElevator: boolean;
  hasRamp: boolean;
  isAccessible: boolean;
  description: string;
  status: 'active' | 'maintenance';
}

export interface FloorRoomItem {
  number: string;
  name: string;
  category: string;
  floor: number;
  capacity: number;
  accessible: boolean;
}

@Component({
  selector: 'app-building-management',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTabsModule
  ],
  templateUrl: './building-management.component.html',
  styleUrls: ['./building-management.component.scss']
})
export class BuildingManagementComponent implements OnInit {
  displayedColumns = ['code', 'name', 'category', 'floors', 'features', 'status', 'actions'];

  buildings: CampusBuildingItem[] = [
    { id: 'ARYABHATTA_BUILDING', name: 'Aryabhatta Block', code: 'ARY', category: 'Academic & Labs', floors: 3, roomsCount: 24, hasElevator: true, hasRamp: true, isAccessible: true, description: 'Main engineering and technology complex housing robotics and computing labs.', status: 'active' },
    { id: 'LIBRARY_BUILDING', name: 'Central Library Complex', code: 'LIB', category: 'Library & Archives', floors: 2, roomsCount: 12, hasElevator: true, hasRamp: true, isAccessible: true, description: 'Dr. M.S. Swaminathan Library with digital archives and study carrels.', status: 'active' },
    { id: 'AGRI_BUILDING', name: 'School of Agriculture', code: 'AGR', category: 'Academic & Farm', floors: 2, roomsCount: 18, hasElevator: false, hasRamp: true, isAccessible: true, description: 'Agricultural research labs and soil science departments.', status: 'active' },
    { id: 'ADMIN_BUILDING', name: 'Administrative Block', code: 'ADM', category: 'Administration', floors: 2, roomsCount: 16, hasElevator: true, hasRamp: true, isAccessible: true, description: 'Registrar, admissions, student affairs, and Vice Chancellor offices.', status: 'active' },
    { id: 'MANAGEMENT_BUILDING', name: 'School of Management', code: 'SOM', category: 'Academic & MBA', floors: 2, roomsCount: 14, hasElevator: false, hasRamp: true, isAccessible: true, description: 'Management studies, smart seminar halls, and executive development center.', status: 'active' },
    { id: 'AUDITORIUM_COMPLEX', name: 'Central Auditorium', code: 'AUD', category: 'Cultural & Events', floors: 1, roomsCount: 6, hasElevator: false, hasRamp: true, isAccessible: true, description: '1,500-seat theater for national seminars and convocations.', status: 'active' },
    { id: 'HOSTEL_MAHANADI', name: 'Mahanadi Boys Hostel', code: 'H-MB', category: 'Residential', floors: 3, roomsCount: 120, hasElevator: false, hasRamp: true, isAccessible: false, description: 'On-campus residence for undergraduate engineering students.', status: 'active' }
  ];

  aryabhattaRooms: FloorRoomItem[] = [
    { number: 'A-001', name: 'Chemistry & Environmental Lab', category: 'Lab', floor: 0, capacity: 40, accessible: true },
    { number: 'A-002', name: 'Physics & Optics Research Lab', category: 'Lab', floor: 0, capacity: 40, accessible: true },
    { number: 'A-101', name: 'Smart Lecture Theater 1', category: 'Classroom', floor: 1, capacity: 60, accessible: true },
    { number: 'A-102', name: 'Smart Lecture Theater 2', category: 'Classroom', floor: 1, capacity: 60, accessible: true },
    { number: 'A-103', name: 'Faculty Breakout & Seminar Lounge', category: 'Faculty', floor: 1, capacity: 20, accessible: true },
    { number: 'C-201', name: 'High-Performance Computing Lab 1', category: 'Lab', floor: 2, capacity: 50, accessible: true },
    { number: 'C-204', name: 'Computer Science Lab 2 (AI Wing)', category: 'Lab', floor: 2, capacity: 50, accessible: true },
    { number: 'A-203', name: 'Central Campus Data & Server Hub', category: 'Facility', floor: 2, capacity: 5, accessible: true }
  ];

  selectedBuilding: CampusBuildingItem = this.buildings[0];

  constructor(private buildingService: BuildingService) {}

  ngOnInit() {
    this.buildingService.getAll().subscribe({
      next: (data) => {
        // preserve rich mocks or merge
      },
      error: () => {}
    });
  }

  selectBuilding(b: CampusBuildingItem) {
    this.selectedBuilding = b;
  }
}
