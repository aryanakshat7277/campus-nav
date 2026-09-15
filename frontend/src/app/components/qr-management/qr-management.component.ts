import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { QrService } from '../../services/qr.service';

export interface QrItem {
  id: string;
  qrCode: string;
  title: string;
  buildingId: string;
  floorId: string;
  nodeId: string;
  coords: string;
  description: string;
  isActive: boolean;
}

@Component({
  selector: 'app-qr-management',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule
  ],
  templateUrl: './qr-management.component.html',
  styleUrls: ['./qr-management.component.scss']
})
export class QrManagementComponent implements OnInit {
  displayedColumns = ['id', 'title', 'location', 'node', 'token', 'status', 'actions'];

  qrs: QrItem[] = [
    { id: 'QR_1', qrCode: 'qr_token_entrance', title: 'Main Porch Entrance Wall Plaque', buildingId: 'Aryabhatta Block', floorId: 'Floor 0 (GF)', nodeId: 'NODE_E0', coords: '0.0, 15.0', description: 'Mounted next to the main foyer directory board.', isActive: true },
    { id: 'QR_2', qrCode: 'qr_token_gf_elevator', title: 'Ground Floor Central Lift Lobby', buildingId: 'Aryabhatta Block', floorId: 'Floor 0 (GF)', nodeId: 'NODE_EL0', coords: '30.0, 15.0', description: 'Left of elevator call panel at eye level (1.5m).', isActive: true },
    { id: 'QR_3', qrCode: 'qr_token_ff_stairs', title: 'First Floor North Stair Landing', buildingId: 'Aryabhatta Block', floorId: 'Floor 1', nodeId: 'NODE_S1', coords: '25.0, 15.0', description: 'Installed on the stairwell column before classroom corridor.', isActive: true },
    { id: 'QR_4', qrCode: 'qr_token_sf_elevator', title: 'Second Floor Computer Wing Lobby', buildingId: 'Aryabhatta Block', floorId: 'Floor 2', nodeId: 'NODE_EL2', coords: '30.0, 15.0', description: 'Between elevator exit and CS Lab 204 entrance.', isActive: true },
    { id: 'QR_5', qrCode: 'qr_token_lib_entrance', title: 'Central Library Main Entry Turnstile', buildingId: 'Central Library', floorId: 'Floor 0 (GF)', nodeId: 'INT_12', coords: '18.7778, 84.0938', description: 'Security gate optical anchor at library entrance.', isActive: true }
  ];

  selectedQrForPrint: QrItem | null = null;

  constructor(private qrService: QrService) {}

  ngOnInit() {
    this.qrService.getAll().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          // merge or keep mock
        }
      },
      error: () => {}
    });
  }

  showPrintBadge(qr: QrItem) {
    this.selectedQrForPrint = qr;
  }

  closePrintBadge() {
    this.selectedQrForPrint = null;
  }

  toggleActive(qr: QrItem) {
    qr.isActive = !qr.isActive;
  }
}
