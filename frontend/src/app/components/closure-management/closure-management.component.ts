import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { ClosureService } from '../../services/closure.service';

export interface CampusClosureItem {
  id: string;
  edgeId: string;
  reason: string;
  closureType: 'construction' | 'maintenance' | 'blocked' | 'restricted';
  location: string;
  alternativeRouteNote: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

@Component({
  selector: 'app-closure-management',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatSlideToggleModule,
    FormsModule
  ],
  templateUrl: './closure-management.component.html',
  styleUrls: ['./closure-management.component.scss']
})
export class ClosureManagementComponent implements OnInit {
  displayedColumns = ['id', 'reason', 'type', 'location', 'reroute', 'status', 'toggle'];

  closures: CampusClosureItem[] = [
    { id: 'CLS_1', edgeId: 'EDGE_4', reason: 'Aryabhatta Elevator Periodic Servicing', closureType: 'maintenance', location: 'Aryabhatta Block (GF to 2F Elevator Shaft)', alternativeRouteNote: 'Route automatically diverts to accessible North Staircase ramp.', startDate: 'Today, 08:00 AM', endDate: 'Today, 06:00 PM', isActive: true },
    { id: 'CLS_2', edgeId: 'EDGE_1', reason: 'Main Gate Paver Stone Relay & Repair', closureType: 'construction', location: 'Boulevard between Main Gate & Junction 1', alternativeRouteNote: 'Pedestrians redirected through Western Security Walkway.', startDate: 'Sep 12, 2026', endDate: 'Sep 18, 2026', isActive: true },
    { id: 'CLS_3', edgeId: 'EDGE_11', reason: 'First Floor North Staircase Repainting', closureType: 'blocked', location: 'Aryabhatta Block Floor 1 to Floor 2 Stairs', alternativeRouteNote: 'Use central glass lift for all 2nd floor access.', startDate: 'Sep 15, 2026', endDate: 'Sep 16, 2026', isActive: false },
    { id: 'CLS_4', edgeId: 'EDGE_7', reason: 'Server Room Air Duct Maintenance', closureType: 'restricted', location: 'Second Floor Room 203 Access Hallway', alternativeRouteNote: 'Authorized technical personnel with RFID clearance only.', startDate: 'Sep 14, 2026', endDate: 'Sep 20, 2026', isActive: true }
  ];

  constructor(private closureService: ClosureService) {}

  ngOnInit() {
    this.closureService.getActive().subscribe({
      next: (data) => {},
      error: () => {}
    });
  }

  toggleClosure(cls: CampusClosureItem) {
    cls.isActive = !cls.isActive;
  }
}
