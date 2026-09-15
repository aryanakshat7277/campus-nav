import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BeaconService } from '../../services/beacon.service';
import { Beacon } from '../../models/beacon.model';

@Component({
  selector: 'app-beacon-management',
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
  templateUrl: './beacon-management.component.html',
  styleUrls: ['./beacon-management.component.scss']
})
export class BeaconManagementComponent implements OnInit {
  displayedColumns = ['id', 'location', 'identifiers', 'floor', 'calibration', 'status', 'actions'];
  
  beacons: Beacon[] = [
    { id: 'BEACON_1', beaconUuid: 'e2c56db5-dffb-48d2-b060-d0f5a71096e0', major: 1, minor: 1, buildingId: 'ARYABHATTA_BUILDING', floorId: 'ARYABHATTA_FLOOR_0', nodeId: 'NODE_E0', localX: 0.0, localY: 15.0, latitude: 18.77850, longitude: 84.09400, installationHeight: 2.5, signalCalibration: -59, status: 'active', lastSeen: 'Just now' },
    { id: 'BEACON_2', beaconUuid: 'e2c56db5-dffb-48d2-b060-d0f5a71096e0', major: 1, minor: 2, buildingId: 'ARYABHATTA_BUILDING', floorId: 'ARYABHATTA_FLOOR_0', nodeId: 'NODE_EL0', localX: 30.0, localY: 15.0, latitude: 18.77853, longitude: 84.09403, installationHeight: 2.5, signalCalibration: -59, status: 'active', lastSeen: '2 min ago' },
    { id: 'BEACON_3', beaconUuid: 'e2c56db5-dffb-48d2-b060-d0f5a71096e0', major: 2, minor: 1, buildingId: 'ARYABHATTA_BUILDING', floorId: 'ARYABHATTA_FLOOR_1', nodeId: 'NODE_C1_1', localX: 10.0, localY: 15.0, latitude: 18.77851, longitude: 84.09401, installationHeight: 2.5, signalCalibration: -59, status: 'active', lastSeen: '1 min ago' },
    { id: 'BEACON_4', beaconUuid: 'e2c56db5-dffb-48d2-b060-d0f5a71096e0', major: 2, minor: 2, buildingId: 'ARYABHATTA_BUILDING', floorId: 'ARYABHATTA_FLOOR_1', nodeId: 'NODE_EL1', localX: 30.0, localY: 15.0, latitude: 18.77853, longitude: 84.09403, installationHeight: 2.5, signalCalibration: -59, status: 'active', lastSeen: 'Just now' },
    { id: 'BEACON_5', beaconUuid: 'e2c56db5-dffb-48d2-b060-d0f5a71096e0', major: 3, minor: 1, buildingId: 'ARYABHATTA_BUILDING', floorId: 'ARYABHATTA_FLOOR_2', nodeId: 'NODE_C2_1', localX: 10.0, localY: 15.0, latitude: 18.77851, longitude: 84.09401, installationHeight: 2.5, signalCalibration: -59, status: 'active', lastSeen: 'Just now' },
    { id: 'BEACON_6', beaconUuid: 'e2c56db5-dffb-48d2-b060-d0f5a71096e0', major: 3, minor: 2, buildingId: 'ARYABHATTA_BUILDING', floorId: 'ARYABHATTA_FLOOR_2', nodeId: 'NODE_EL2', localX: 30.0, localY: 15.0, latitude: 18.77853, longitude: 84.09403, installationHeight: 2.5, signalCalibration: -59, status: 'active', lastSeen: '4 min ago' }
  ];

  testedBeaconId: string | null = null;

  constructor(private beaconService: BeaconService) {}

  ngOnInit() {
    this.beaconService.getAll().subscribe({
      next: (data) => {
        if (data && data.length > 0) this.beacons = data;
      },
      error: () => {}
    });
  }

  testSignal(beacon: Beacon) {
    this.testedBeaconId = beacon.id;
    setTimeout(() => {
      this.testedBeaconId = null;
    }, 2500);
  }

  toggleStatus(beacon: Beacon) {
    beacon.status = beacon.status === 'active' ? 'maintenance' : 'active';
  }
}
