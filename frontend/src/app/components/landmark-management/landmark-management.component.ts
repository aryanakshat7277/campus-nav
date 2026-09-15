import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { LandmarkService } from '../../services/landmark.service';

export interface LandmarkDisplay {
  id: string;
  name: string;
  category: string;
  building: string;
  floor: string;
  node: string;
  description: string;
  isIndoor: boolean;
  visualCue: string;
}

@Component({
  selector: 'app-landmark-management',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
  ],
  templateUrl: './landmark-management.component.html',
  styleUrls: ['./landmark-management.component.scss']
})
export class LandmarkManagementComponent implements OnInit {
  displayedColumns = ['id', 'name', 'category', 'location', 'node', 'visualCue'];

  landmarks: LandmarkDisplay[] = [
    { id: 'LM_1', name: 'Main Campus Portal Signage', category: 'signage', building: 'Aryabhatta Block', floor: 'Ground Floor', node: 'NODE_E0', description: 'Illuminated brass university crest and building directory.', isIndoor: true, visualCue: 'Turn right at the Main Sign' },
    { id: 'LM_2', name: 'Ground Floor Academic Notice Board', category: 'notice_board', building: 'Aryabhatta Block', floor: 'Ground Floor', node: 'NODE_C0_1', description: 'Large 4-panel glass bulletin board opposite Chemistry Lab.', isIndoor: true, visualCue: 'Pass Notice Board on your left' },
    { id: 'LM_3', name: 'First Floor Chilled Water Cooler', category: 'utility', building: 'Aryabhatta Block', floor: 'Floor 1', node: 'NODE_C1_1', description: 'Stainless steel RO drinking fountain near Classroom A-101.', isIndoor: true, visualCue: 'Water cooler is directly ahead' },
    { id: 'LM_4', name: 'Second Floor Computer Wing Notice Board', category: 'notice_board', building: 'Aryabhatta Block', floor: 'Floor 2', node: 'NODE_C2_1', description: 'Department of Computer Science seminar announcement board.', isIndoor: true, visualCue: 'Continue past CS Notice Board' },
    { id: 'LM_5', name: 'Central Glass Elevator Cabin', category: 'elevator', building: 'Aryabhatta Block', floor: 'Ground Floor Lobby', node: 'NODE_EL0', description: 'Panoramic glass lift shaft visible from central corridor.', isIndoor: true, visualCue: 'Elevator is on your right side' }
  ];

  constructor(private landmarkService: LandmarkService) {}

  ngOnInit() {
    this.landmarkService.getAll().subscribe({
      next: (data) => {},
      error: () => {}
    });
  }
}
