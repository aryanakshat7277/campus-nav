import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Subscription } from 'rxjs';

import { MapService } from '../../services/map.service';
import { IndoorPositionEngine } from '../../services/indoor-position.engine';
import { DemoSimulationService } from '../../services/demo-simulation.service';
import { SensorSimulationService } from '../../services/sensor-simulation.service';
import { WifiSimulationService } from '../../services/wifi-simulation.service';
import { IndoorPosition } from '../../models/indoor-position.model';
import { PhoneSensorTelemetry } from '../../models/simulation.model';

export interface DashboardModule {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'navigation' | 'services' | 'hardware';
  categoryLabel: string;
  icon: string;
  iconColor: string;
  accentColor: string;
  badge: string;
  badgeType: 'primary' | 'teal' | 'warn' | 'purple' | 'orange' | 'success';
  route: string;
  stats: string;
  featured?: boolean;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatChipsModule,
    MatProgressBarModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  searchQuery = '';
  selectedCategory: 'all' | 'navigation' | 'services' | 'hardware' = 'all';

  currentPosition: IndoorPosition | null = null;
  isSimulating = false;
  totalLocations = 56;
  totalBuildings = 12;

  // Real-time telemetry metrics for graphical HUD
  liveStepCount = 142;
  liveHeading = 92;
  cardinalDirection = 'East (92°)';
  liveAcceleration = 1.1;
  confidencePct = 94;
  previewFloor = 0;
  simSpeed = 1;
  activeAPCount = 6;
  activeBeaconCount = 6;
  rttDistanceMeters = 14.2;

  private subs = new Subscription();

  // 14 Comprehensive Graphical Modules covering all features & screens
  readonly modules: DashboardModule[] = [
    // --- NAVIGATION SUITE ---
    {
      id: 'indoor-nav',
      title: 'GPS-Free Indoor Navigation',
      subtitle: 'Aryabhatta Block • 3 Floors CAD Model',
      description: 'Turn-by-turn indoor directions with live sensor compass flashlight, interactive elevator sequence, and destination arrival celebration.',
      category: 'navigation',
      categoryLabel: 'Live Navigation',
      icon: 'navigation',
      iconColor: '#1565C0',
      accentColor: '#1565C0',
      badge: 'Interactive CAD',
      badgeType: 'primary',
      route: '/navigate',
      stats: '3 Floors • 15 Nodes',
      featured: true
    },
    {
      id: 'campus-map',
      title: 'Campus 2D Interactive Map',
      subtitle: 'OpenStreetMap + Vector Grounds Base',
      description: 'Full CUTM Paralakhemundi campus overview with building footprints, green lawns, arterial roads, category filters, and route planner.',
      category: 'navigation',
      categoryLabel: 'Live Navigation',
      icon: 'map',
      iconColor: '#1976D2',
      accentColor: '#1976D2',
      badge: '56 Locations',
      badgeType: 'primary',
      route: '/',
      stats: '56 Points • 16 Edges',
      featured: true
    },
    {
      id: 'qr-scanner',
      title: 'Optical QR Checkpoint Scanner',
      subtitle: 'Simulated Viewfinder with Reticle Lock',
      description: 'Instant 100% position recalibration using physical wall QR checkpoint tokens and holographic cryptographic token decoding.',
      category: 'navigation',
      categoryLabel: 'Live Navigation',
      icon: 'qr_code_scanner',
      iconColor: '#00897B',
      accentColor: '#00897B',
      badge: '100% Snap',
      badgeType: 'teal',
      route: '/qr-scanner',
      stats: '5 Wall Plaques',
      featured: true
    },
    {
      id: 'route-options',
      title: 'Mobility & Route Preferences',
      subtitle: 'Fastest • Accessible • Avoid Stairs',
      description: 'Customize routing algorithms: prioritize step-free ramps & elevators for wheelchairs, or select the fastest walking routes.',
      category: 'navigation',
      categoryLabel: 'Live Navigation',
      icon: 'tune',
      iconColor: '#5C6BC0',
      accentColor: '#5C6BC0',
      badge: 'Accessibility',
      badgeType: 'purple',
      route: '/route-options',
      stats: '4 Routing Profiles'
    },

    // --- CAMPUS LIFE & VISITOR SERVICES ---
    {
      id: 'emergency',
      title: 'Emergency Evacuation Hub',
      subtitle: '1-Touch Critical Exit & Medical Aid',
      description: 'Instant evacuation guidance to nearest Medical Center, Security Office, Fire Exits, and Safe Assembly Points ignoring obstructions.',
      category: 'services',
      categoryLabel: 'Campus Life & Safety',
      icon: 'crisis_alert',
      iconColor: '#C62828',
      accentColor: '#C62828',
      badge: 'Priority 1',
      badgeType: 'warn',
      route: '/emergency',
      stats: '4 Critical Exits',
      featured: true
    },
    {
      id: 'nearby',
      title: 'Nearby Facilities & Services',
      subtitle: 'Proximity Sorter by Indoor Distance',
      description: 'Find the nearest washrooms, ATMs, food courts, cafeterias, drinking water stations, and health clinics from your exact position.',
      category: 'services',
      categoryLabel: 'Campus Life & Safety',
      icon: 'near_me',
      iconColor: '#EF6C00',
      accentColor: '#EF6C00',
      badge: 'Real-time Distance',
      badgeType: 'orange',
      route: '/nearby',
      stats: '10 Categories'
    },
    {
      id: 'visitor',
      title: 'Guided Campus Visitor Tour',
      subtitle: 'CUTM Highlights & Heritage Points',
      description: 'Curated 35-minute walking itinerary for prospective students, parents, and guests covering the Library, Temple, and Auditoriums.',
      category: 'services',
      categoryLabel: 'Campus Life & Safety',
      icon: 'tour',
      iconColor: '#7B1FA2',
      accentColor: '#7B1FA2',
      badge: 'Curated 35m',
      badgeType: 'purple',
      route: '/visitor',
      stats: '7 Highlights'
    },

    // --- HARDWARE & ADMIN CONTROL PLANE ---
    {
      id: 'diagnostics',
      title: 'Hardware Signal Diagnostics',
      subtitle: '360° RTT Radar & IMU Sensors',
      description: 'Real-time inspection of Wi-Fi RSSI signal propagation, 360° RTT radar PPI scope, 3D gyroscope gimbal, and multi-sensor Kalman fusion weights.',
      category: 'hardware',
      categoryLabel: 'Hardware & Infrastructure',
      icon: 'query_stats',
      iconColor: '#00897B',
      accentColor: '#00897B',
      badge: 'Telemetry HUD',
      badgeType: 'teal',
      route: '/admin/diagnostics',
      stats: '6 APs • 3D Gimbal',
      featured: true
    },
    {
      id: 'beacons',
      title: 'BLE Beacon Transmitters',
      subtitle: 'Bluetooth Low Energy Hardware Array',
      description: 'Monitor signal calibration, Tx power, battery telemetry, and floor-level coverage for the 6 BLE beacons installed across Aryabhatta Block.',
      category: 'hardware',
      categoryLabel: 'Hardware & Infrastructure',
      icon: 'bluetooth',
      iconColor: '#1565C0',
      accentColor: '#1565C0',
      badge: '6 Hardware Units',
      badgeType: 'primary',
      route: '/admin/beacons',
      stats: '6 Beacons Online'
    },
    {
      id: 'qr-admin',
      title: 'QR Checkpoint Token Registry',
      subtitle: 'Cryptographic Ground Truth Plaques',
      description: 'Generate, test, and preview physical campus wall QR plaques with cryptographic token codes and millimeter coordinate bindings.',
      category: 'hardware',
      categoryLabel: 'Hardware & Infrastructure',
      icon: 'qr_code_2',
      iconColor: '#00897B',
      accentColor: '#00897B',
      badge: 'Printable Badges',
      badgeType: 'teal',
      route: '/admin/qr',
      stats: '4 Tokens Configured'
    },
    {
      id: 'buildings',
      title: 'Campus Buildings & CAD Hierarchy',
      subtitle: 'Multi-Floor Structural Registry',
      description: 'Inspect building blueprints, total floor elevations, ramp/elevator accessibility flags, and room allocations across CUTM Paralakhemundi.',
      category: 'hardware',
      categoryLabel: 'Hardware & Infrastructure',
      icon: 'apartment',
      iconColor: '#37474F',
      accentColor: '#37474F',
      badge: 'Spatial Model',
      badgeType: 'primary',
      route: '/admin/buildings',
      stats: '1 Block • 3 Levels'
    },
    {
      id: 'landmarks',
      title: 'Wayfinding Landmarks Directory',
      subtitle: 'Pedestrian Contextual Anchors',
      description: 'Natural language navigational reference points ("Turn right past Central Library foyer") used for intuitive landmark-based directions.',
      category: 'hardware',
      categoryLabel: 'Hardware & Infrastructure',
      icon: 'storefront',
      iconColor: '#F57F17',
      accentColor: '#F57F17',
      badge: 'Context Anchors',
      badgeType: 'orange',
      route: '/admin/landmarks',
      stats: '5 Landmarks'
    },
    {
      id: 'closures',
      title: 'Route Closures & Path Obstacles',
      subtitle: 'Real-Time Maintenance Rerouting',
      description: 'Declare temporary corridor blockages or maintenance closures with instant automatic A* graph detour recalculation.',
      category: 'hardware',
      categoryLabel: 'Hardware & Infrastructure',
      icon: 'block',
      iconColor: '#D32F2F',
      accentColor: '#D32F2F',
      badge: 'A* Enforcement',
      badgeType: 'warn',
      route: '/admin/closures',
      stats: '0 Active Closures'
    },
    {
      id: 'locations-admin',
      title: 'Locations & Bulletin Alerts Registry',
      subtitle: 'Campus Database Administration',
      description: 'Master directory of all 56 campus locations, categories, operating hours, delivery access flags, and active campus bulletin announcements.',
      category: 'hardware',
      categoryLabel: 'Hardware & Infrastructure',
      icon: 'dashboard',
      iconColor: '#1E88E5',
      accentColor: '#1E88E5',
      badge: 'Database Master',
      badgeType: 'primary',
      route: '/admin',
      stats: '56 Locations'
    }
  ];

  constructor(
    public mapService: MapService,
    private positionEngine: IndoorPositionEngine,
    public demoService: DemoSimulationService,
    private sensorService: SensorSimulationService,
    private wifiService: WifiSimulationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subs.add(
      this.positionEngine.getCurrentPosition().subscribe(pos => {
        this.currentPosition = pos;
        if (pos) {
          this.confidencePct = Math.round((pos.confidence || 0.94) * 100);
          if (pos.floorNumber !== undefined && pos.floorNumber !== null) {
            this.previewFloor = pos.floorNumber;
          }
        }
      })
    );

    this.subs.add(
      this.demoService.isSimulating.subscribe(isSim => {
        this.isSimulating = isSim;
      })
    );

    this.subs.add(
      this.sensorService.getTelemetry().subscribe(t => {
        if (t) {
          this.liveStepCount = t.accelerometer.stepCount;
          this.liveHeading = t.magnetometer.heading;
          this.cardinalDirection = t.magnetometer.cardinalDirection;
          this.liveAcceleration = t.accelerometer.acceleration;
        }
      })
    );

    this.subs.add(
      this.mapService.locations.subscribe(locs => {
        if (locs && locs.length > 0) {
          this.totalLocations = locs.length;
        }
      })
    );
  }

  setSpeed(speed: number) {
    this.simSpeed = speed;
    this.demoService.setSpeed(speed);
  }

  selectFloorPreview(floor: number) {
    this.previewFloor = floor;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  get filteredModules(): DashboardModule[] {
    let result = this.modules;

    if (this.selectedCategory !== 'all') {
      result = result.filter(m => m.category === this.selectedCategory);
    }

    if (this.searchQuery && this.searchQuery.trim() !== '') {
      const q = this.searchQuery.toLowerCase().trim();
      result = result.filter(m =>
        m.title.toLowerCase().includes(q) ||
        m.subtitle.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.categoryLabel.toLowerCase().includes(q) ||
        m.badge.toLowerCase().includes(q)
      );
    }

    return result;
  }

  filterCategory(cat: 'all' | 'navigation' | 'services' | 'hardware') {
    this.selectedCategory = cat;
  }

  toggleSimulation() {
    if (this.isSimulating) {
      this.demoService.stopSimulation();
    } else {
      this.demoService.startSimulation();
    }
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
