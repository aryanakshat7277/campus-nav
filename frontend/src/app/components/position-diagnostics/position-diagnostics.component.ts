import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IndoorPositionEngine } from '../../services/indoor-position.engine';
import { WifiSimulationService } from '../../services/wifi-simulation.service';
import { SensorSimulationService } from '../../services/sensor-simulation.service';
import { DemoSimulationService } from '../../services/demo-simulation.service';
import { WifiRssiMeasurement, WifiRttMeasurement, TrilaterationEstimate, PhoneSensorTelemetry, DemoScenario } from '../../models/simulation.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-position-diagnostics',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatChipsModule,
    MatTooltipModule
  ],
  templateUrl: './position-diagnostics.component.html',
  styleUrls: ['./position-diagnostics.component.scss']
})
export class PositionDiagnosticsComponent implements OnInit, OnDestroy {
  // Fusion Engine Values
  confidenceState = 'CONFIRMED';
  confidencePercentage = 88;
  rssiConfidence = 82;
  rttConfidence = 91;
  sensorConfidence = 78;
  currentBuilding = 'Aryabhatta Block';
  currentFloor = 2;
  currentNode = 'ARYA_2F_CORRIDOR (East Corridor)';
  localCoords = 'X: 20.0m, Y: 15.0m';
  compassHeading = 92;
  walkingSpeed = 1.3;
  stepCount = 142;
  nearestAp = 'AP-002';
  rttDistance = 7.8;
  zone = 'East Corridor';
  lastUpdated = new Date().toLocaleTimeString();

  // Streams
  rssiList: WifiRssiMeasurement[] = [];
  rttList: WifiRttMeasurement[] = [];
  trilateration: TrilaterationEstimate | null = null;
  sensorData: PhoneSensorTelemetry | null = null;

  // Simulation Controls
  isSimulating = false;
  simCurrentStep = 0;
  simTotalSteps = 10;
  simInstruction = '';
  simSpeed = 1;
  deviationAlert: string | null = null;
  activeScenarioId = 'normal';
  scenarios: DemoScenario[] = [];

  // RTT Radar Access Point Plotting Matrix
  radarAps = [
    { id: 'AP-002', name: 'CSE GF Foyer', distance: 7.8, angle: 35, x: 62, y: 38, signal: -58 },
    { id: 'AP-004', name: 'Aryabhatta 2F East', distance: 5.4, angle: 290, x: 36, y: 32, signal: -52 },
    { id: 'AP-003', name: 'Aryabhatta 1F West', distance: 14.2, angle: 110, x: 74, y: 64, signal: -68 },
    { id: 'AP-001', name: 'Main Gate Porch', distance: 18.5, angle: 220, x: 28, y: 72, signal: -74 },
    { id: 'AP-005', name: 'Central Library Hub', distance: 24.0, angle: 165, x: 56, y: 88, signal: -79 },
    { id: 'AP-006', name: 'Campus Auditorium', distance: 32.5, angle: 330, x: 20, y: 22, signal: -86 }
  ];

  private subs = new Subscription();

  constructor(
    public positionEngine: IndoorPositionEngine,
    public wifiService: WifiSimulationService,
    public sensorService: SensorSimulationService,
    public demoService: DemoSimulationService
  ) {
    this.scenarios = this.demoService.scenarios;
  }

  getApDistance(apId: string): number {
    const rtt = this.rttList.find(r => r.apId === apId);
    if (rtt) return rtt.measuredDistance;
    const item = this.radarAps.find(a => a.id === apId);
    return item ? item.distance : 15;
  }

  ngOnInit(): void {
    // 1. Position Engine subscriptions
    this.subs.add(
      this.positionEngine.getCurrentPosition().subscribe(pos => {
        if (pos) {
          this.confidenceState = pos.confidenceState;
          this.confidencePercentage = Math.round(pos.confidence * 100);
          if (pos.buildingName) this.currentBuilding = pos.buildingName;
          if (pos.nodeName || pos.nodeId) this.currentNode = pos.nodeName || pos.nodeId!;
          if (pos.localX !== undefined && pos.localY !== undefined) {
            this.localCoords = `X: ${pos.localX.toFixed(1)}m, Y: ${pos.localY.toFixed(1)}m`;
          }
          this.lastUpdated = new Date().toLocaleTimeString();
        }
      })
    );

    this.subs.add(this.positionEngine.rssiConfidence$.subscribe(v => this.rssiConfidence = v));
    this.subs.add(this.positionEngine.rttConfidence$.subscribe(v => this.rttConfidence = v));
    this.subs.add(this.positionEngine.sensorConfidence$.subscribe(v => this.sensorConfidence = v));
    this.subs.add(this.positionEngine.fusedConfidence$.subscribe(v => this.confidencePercentage = v));
    this.subs.add(this.positionEngine.nearestAp$.subscribe(v => this.nearestAp = v));
    this.subs.add(this.positionEngine.rttDistance$.subscribe(v => this.rttDistance = v));
    this.subs.add(this.positionEngine.heading$.subscribe(v => this.compassHeading = v));
    this.subs.add(this.positionEngine.floor$.subscribe(v => this.currentFloor = v));
    this.subs.add(this.positionEngine.zone$.subscribe(v => this.zone = v));
    this.subs.add(this.positionEngine.stepCount$.subscribe(v => this.stepCount = v));

    // 2. Wi-Fi streams
    this.subs.add(this.wifiService.rssiMeasurements$.subscribe(list => this.rssiList = list));
    this.subs.add(this.wifiService.rttMeasurements$.subscribe(list => this.rttList = list));
    this.subs.add(this.wifiService.trilaterationEstimate$.subscribe(tri => this.trilateration = tri));

    // 3. Sensor stream
    this.subs.add(this.sensorService.getTelemetry().subscribe(tel => this.sensorData = tel));

    // 4. Demo Simulation stream
    this.subs.add(this.demoService.isSimulating.subscribe(sim => this.isSimulating = sim));
    this.subs.add(this.demoService.currentStep.subscribe(step => this.simCurrentStep = step));
    this.subs.add(this.demoService.totalSteps.subscribe(tot => this.simTotalSteps = tot));
    this.subs.add(this.demoService.currentInstruction.subscribe(ins => this.simInstruction = ins));
    this.subs.add(this.demoService.deviationAlert$.subscribe(alert => this.deviationAlert = alert));
    this.subs.add(this.demoService.activeScenario$.subscribe(sc => this.activeScenarioId = sc));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  // Simulation Actions
  runScenario(id: string): void {
    this.demoService.startScenario(id);
  }

  toggleSimulation(): void {
    if (this.isSimulating) {
      this.demoService.stopSimulation();
    } else {
      this.demoService.startSimulation();
    }
  }

  setSpeed(speed: number): void {
    this.simSpeed = speed;
    this.demoService.setSpeed(speed);
  }

  // Manual Controls
  moveForward(): void { this.demoService.moveForward(); }
  turnLeft(): void { this.demoService.turnLeft(); }
  turnRight(): void { this.demoService.turnRight(); }
  changeFloor(floor: number): void { this.demoService.changeFloor(floor); }
  triggerQr(): void { this.demoService.triggerQrCheckpoint(); }
  toggleWifi(): void { this.demoService.toggleWifi(); }
  toggleRtt(): void { this.demoService.toggleRttAccuracy(); }
  triggerDeviation(): void { this.demoService.triggerDeviation(); }
}
