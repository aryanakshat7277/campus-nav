import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { MapService } from '../../services/map.service';

export interface RouteProfileOption {
  value: string;
  label: string;
  icon: string;
  desc: string;
  distance: string;
  time: string;
  stairs: number;
  elevators: number;
}

@Component({
  selector: 'app-route-options',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatSlideToggleModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './route-options.component.html',
  styleUrls: ['./route-options.component.scss']
})
export class RouteOptionsComponent {
  selectedPreference = 'accessible';

  avoidRamps = false;
  highContrastAudio = true;
  preferIndoorCorridors = true;

  options: RouteProfileOption[] = [
    {
      value: 'accessible',
      label: '♿ Wheelchair Accessible (Recommended)',
      icon: 'accessible',
      desc: '100% step-free route using certified ramps and central glass elevator.',
      distance: '160m',
      time: '3.2 min',
      stairs: 0,
      elevators: 1
    },
    {
      value: 'fastest',
      label: '⚡ Fastest Walking Route',
      icon: 'speed',
      desc: 'Optimized for minimum elapsed time using nearest stairwell.',
      distance: '135m',
      time: '2.1 min',
      stairs: 44,
      elevators: 0
    },
    {
      value: 'shortest',
      label: '📏 Shortest Direct Path',
      icon: 'straighten',
      desc: 'Minimizes physical distance traveled between outdoor and indoor nodes.',
      distance: '130m',
      time: '2.3 min',
      stairs: 44,
      elevators: 0
    },
    {
      value: 'avoid_stairs',
      label: '🚫 Avoid All Staircases',
      icon: 'stairs',
      desc: 'Ground-level walkways and elevator-only vertical transitions.',
      distance: '160m',
      time: '3.2 min',
      stairs: 0,
      elevators: 1
    },
    {
      value: 'elevators',
      label: '🛗 Elevator Priority Mode',
      icon: 'elevator',
      desc: 'Directs all multi-floor transitions exclusively to elevators.',
      distance: '165m',
      time: '3.3 min',
      stairs: 0,
      elevators: 1
    }
  ];

  constructor(private mapService: MapService, private router: Router) {}

  applyPreferences() {
    const isAcc = this.selectedPreference === 'accessible' || this.selectedPreference === 'avoid_stairs';
    this.mapService.toggleAccessible(isAcc);
    this.router.navigate(['/navigate']);
  }
}
