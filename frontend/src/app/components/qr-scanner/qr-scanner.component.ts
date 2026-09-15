import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IndoorPositionEngine } from '../../services/indoor-position.engine';

export interface CheckpointPreset {
  id: string;
  token: string;
  title: string;
  building: string;
  floor: number;
  node: string;
  coords: string;
  description: string;
}

@Component({
  selector: 'app-qr-scanner',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressBarModule,
    MatTooltipModule
  ],
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.scss']
})
export class QrScannerComponent {
  scannedResult: any = null;
  isScanning = true;
  isDetectingAnimation = false;
  detectionProgress = 0;
  decryptStreamText = 'CAMERA HUD READY';
  activeHexToken = '0x7F4A-98C1-004';

  // The 5 Specified QR Checkpoints (Section 11)
  checkpoints: CheckpointPreset[] = [
    {
      id: 'QR-001',
      token: 'QR-001',
      title: 'Main Entrance Foyer',
      building: 'CSE Block (Aryabhatta Block)',
      floor: 0,
      node: 'Main Entrance Checkpoint (NODE_GATE)',
      coords: 'X: 10.0m, Y: 8.0m',
      description: 'Ground Floor main entrance archway and reception rotunda'
    },
    {
      id: 'QR-002',
      token: 'QR-002',
      title: 'CSE Ground Floor Foyer',
      building: 'CSE Block (Aryabhatta Block)',
      floor: 0,
      node: 'Ground Floor Elevator Foyer (NODE_GF_ELEVATOR)',
      coords: 'X: 20.0m, Y: 23.0m',
      description: 'Ground Floor central lift lobby and main stairs plaque'
    },
    {
      id: 'QR-003',
      token: 'QR-003',
      title: 'CSE Staircase Landing',
      building: 'CSE Block (Aryabhatta Block)',
      floor: 1,
      node: 'FF Mid-Landing Staircase (NODE_1F_STAIRS)',
      coords: 'X: 22.0m, Y: 18.0m',
      description: 'First Floor central transition landing between GF & Floor 2'
    },
    {
      id: 'QR-004',
      token: 'QR-004',
      title: 'CSE Floor 2 Corridor',
      building: 'CSE Block (Aryabhatta Block)',
      floor: 2,
      node: 'East Corridor Checkpoint (NODE_2F_CORRIDOR)',
      coords: 'X: 22.0m, Y: 18.0m',
      description: 'Floor 2 East Corridor wall checkpoint outside Faculty Room'
    },
    {
      id: 'QR-005',
      token: 'QR-005',
      title: 'CSE Room C-204',
      building: 'CSE Block (Aryabhatta Block)',
      floor: 2,
      node: 'AI & Cloud Computing Lab Entry (NODE_ROOM_C204)',
      coords: 'X: 26.0m, Y: 23.0m',
      description: 'Lab door entrance plaque outside Room C-204'
    }
  ];

  constructor(
    private positionEngine: IndoorPositionEngine,
    private router: Router
  ) {}

  /**
   * Simulates active camera scanning detection with holographic ticker
   */
  simulateDetection(targetCheckpoint = this.checkpoints[3]): void {
    this.isDetectingAnimation = true;
    this.detectionProgress = 0;
    this.decryptStreamText = 'INITIALIZING OPTICAL SENSOR...';

    const hexList = [
      '0xA14F... ACQUIRING RETICLE LOCK',
      '0x88C2... DECODING 2D DATA MATRIX',
      '0xE490... VALIDATING CAMPUS GRAPH PAYLOAD',
      '0x221F... ZERO-DRIFT ANCHOR VERIFIED'
    ];

    let step = 0;
    const interval = setInterval(() => {
      this.detectionProgress += 25;
      if (hexList[step]) {
        this.decryptStreamText = hexList[step];
        this.activeHexToken = `0x${Math.floor(Math.random()*16777215).toString(16).toUpperCase()}-${targetCheckpoint.id}`;
      }
      step++;

      if (this.detectionProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          this.isDetectingAnimation = false;
          this.selectCheckpoint(targetCheckpoint);
        }, 200);
      }
    }, 250);
  }

  selectCheckpoint(cp: CheckpointPreset): void {
    this.scannedResult = {
      qrId: cp.id,
      buildingName: cp.building,
      floorNumber: cp.floor,
      nodeName: cp.node,
      zoneName: cp.title,
      localCoords: cp.coords,
      timestamp: new Date().toLocaleTimeString()
    };
    
    // Update Position Engine with 100% recalibrated precision (Section 11)
    this.positionEngine.recalibrateViaQr(
      cp.token,
      cp.building,
      cp.floor,
      cp.title,
      parseFloat(cp.coords.split(',')[0].replace(/[^0-9.]/g, '')),
      parseFloat(cp.coords.split(',')[1].replace(/[^0-9.]/g, ''))
    );

    this.isScanning = false;
  }

  scanAnother(): void {
    this.scannedResult = null;
    this.isScanning = true;
  }

  goToNavigation(): void {
    this.router.navigate(['/navigate']);
  }

  close(): void {
    history.back();
  }
}
