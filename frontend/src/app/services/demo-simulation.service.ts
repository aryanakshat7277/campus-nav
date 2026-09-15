import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IndoorPositionEngine } from './indoor-position.engine';
import { WifiSimulationService } from './wifi-simulation.service';
import { SensorSimulationService } from './sensor-simulation.service';
import { PositionObservation } from '../models/indoor-position.model';
import { DemoScenario, SimulationState } from '../models/simulation.model';

export interface SimulationWaypoint {
  nodeId: string;
  name: string;
  buildingId: string;
  floor: number;
  localX: number;
  localY: number;
  latitude: number;
  longitude: number;
  heading: number;
  instruction: string;
  isStairOrElevator?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DemoSimulationService {
  // Observables
  public isSimulating = new BehaviorSubject<boolean>(false);
  public currentStep = new BehaviorSubject<number>(0);
  public totalSteps = new BehaviorSubject<number>(0);
  public currentInstruction = new BehaviorSubject<string>('');
  public deviationAlert$ = new BehaviorSubject<string | null>(null);
  public activeScenario$ = new BehaviorSubject<string>('normal');
  public simulationState$ = new BehaviorSubject<SimulationState>({
    currentNodeId: 'MAIN_GATE',
    currentNodeName: 'Main Campus Gate',
    currentFloor: 0,
    currentBuilding: 'Campus Grounds',
    x: 10,
    y: 10,
    heading: 45,
    speed: 1.3,
    isMoving: false,
    routeProgress: 0,
    isWifiAvailable: true,
    isRttAvailable: true,
    isBlockedPathActive: false
  });

  private timer: any;
  private speedMultiplier = 1;
  private stepIndex = 0;

  // Preconfigured Demonstration Scenarios (Section 41)
  public readonly scenarios: DemoScenario[] = [
    {
      id: 'normal',
      title: 'Scenario 1: Normal Navigation',
      description: 'Main Gate → Aryabhatta Block → Floor 2 → AI & Cloud Lab C-204 with smooth multi-sensor positioning',
      icon: 'navigation',
      actionText: 'Run Normal Nav'
    },
    {
      id: 'qr_correction',
      title: 'Scenario 2: QR Recalibration',
      description: 'Simulates signal attenuation & drift (confidence drops to 40%), then snaps to 100% via QR checkpoint scan',
      icon: 'qr_code_scanner',
      actionText: 'Run QR Demo'
    },
    {
      id: 'deviation',
      title: 'Scenario 3: Route Recalculation',
      description: 'Simulates user taking a wrong turn at Floor 2 corridor, triggers real-time deviation alert & A* recalculation',
      icon: 'alt_route',
      actionText: 'Run Deviation Demo'
    },
    {
      id: 'accessible',
      title: 'Scenario 4: Wheelchair Route Comparison',
      description: 'Prioritizes ground ramps and the North Elevator over central staircases to avoid physical barriers',
      icon: 'accessible',
      actionText: 'Run Accessible Demo'
    },
    {
      id: 'rtt_degradation',
      title: 'Scenario 5: Wi-Fi RTT Degradation',
      description: 'Simulates high-precision RTT signal loss, gracefully falling back to RSSI trilateration + smartphone IMU',
      icon: 'wifi_off',
      actionText: 'Run Fallback Demo'
    }
  ];

  // Primary Waypoint Sequence: Main Gate → Aryabhatta Block → Elevator → Floor 2 → Lab C-204
  private readonly normalRoute: SimulationWaypoint[] = [
    {
      nodeId: 'NODE_GATE', name: 'Main Campus Gate', buildingId: 'Campus Grounds',
      floor: 0, localX: 10, localY: 8, latitude: 18.7770, longitude: 84.0930, heading: 45,
      instruction: 'Start at Main Gate. Walk north-east along the palm avenue toward campus core.'
    },
    {
      nodeId: 'NODE_PATH_1', name: 'Academic Avenue Junction', buildingId: 'Campus Grounds',
      floor: 0, localX: 14, localY: 12, latitude: 18.7774, longitude: 84.0934, heading: 45,
      instruction: 'Continue along the paved walkway past the Central Amphitheatre.'
    },
    {
      nodeId: 'NODE_GARDEN', name: 'Central Garden Walkway', buildingId: 'Campus Grounds',
      floor: 0, localX: 18, localY: 16, latitude: 18.7779, longitude: 84.0937, heading: 40,
      instruction: 'Walk straight past the Central Garden on your right.'
    },
    {
      nodeId: 'NODE_ARYA_ENTRANCE', name: 'Aryabhatta Block Porch', buildingId: 'Aryabhatta Block',
      floor: 0, localX: 20, localY: 20, latitude: 18.7785, longitude: 84.0940, heading: 0,
      instruction: 'Enter Aryabhatta Block through the main entrance porch.'
    },
    {
      nodeId: 'NODE_GF_CORRIDOR', name: 'Ground Floor Central Foyer', buildingId: 'Aryabhatta Block',
      floor: 0, localX: 20, localY: 23, latitude: 18.7785, longitude: 84.0940, heading: 90,
      instruction: 'Proceed down the main ground floor corridor toward the elevator bank.'
    },
    {
      nodeId: 'NODE_GF_ELEVATOR', name: 'Ground Floor North Elevator', buildingId: 'Aryabhatta Block',
      floor: 0, localX: 23, localY: 23, latitude: 18.7785, longitude: 84.0941, heading: 0,
      instruction: 'Take the North Elevator to Floor 2.',
      isStairOrElevator: true
    },
    {
      nodeId: 'NODE_2F_ELEVATOR', name: 'Floor 2 Elevator Exit', buildingId: 'Aryabhatta Block',
      floor: 2, localX: 23, localY: 23, latitude: 18.7785, longitude: 84.0941, heading: 270,
      instruction: 'Exit the elevator. Turn left into the academic corridor.',
      isStairOrElevator: true
    },
    {
      nodeId: 'NODE_2F_CORRIDOR', name: 'Floor 2 East Corridor', buildingId: 'Aryabhatta Block',
      floor: 2, localX: 20, localY: 23, latitude: 18.7785, longitude: 84.0942, heading: 90,
      instruction: 'Walk 25 meters down the corridor. Advanced AI Lab C-204 is on your right.'
    },
    {
      nodeId: 'NODE_ROOM_C204', name: 'Advanced AI & Cloud Lab (C-204)', buildingId: 'Aryabhatta Block',
      floor: 2, localX: 26, localY: 23, latitude: 18.7786, longitude: 84.0943, heading: 90,
      instruction: '✓ You have arrived at Advanced AI & Cloud Computing Lab (C-204)!'
    }
  ];

  // Route for Deviation Scenario
  private readonly deviatedRoute: SimulationWaypoint[] = [
    {
      nodeId: 'NODE_2F_CORRIDOR', name: 'Floor 2 East Corridor', buildingId: 'Aryabhatta Block',
      floor: 2, localX: 20, localY: 23, latitude: 18.7785, longitude: 84.0942, heading: 180,
      instruction: '⚠ Route deviation detected! You turned south toward Faculty Offices.'
    },
    {
      nodeId: 'NODE_2F_FACULTY_WING', name: 'South Faculty Wing', buildingId: 'Aryabhatta Block',
      floor: 2, localX: 20, localY: 15, latitude: 18.7784, longitude: 84.0942, heading: 180,
      instruction: 'Recalculating alternative path: Make a U-turn and return to East Corridor.'
    },
    {
      nodeId: 'NODE_2F_CORRIDOR', name: 'Floor 2 East Corridor (Rejoined)', buildingId: 'Aryabhatta Block',
      floor: 2, localX: 20, localY: 23, latitude: 18.7785, longitude: 84.0942, heading: 90,
      instruction: 'Route restored! Walk straight toward Lab C-204.'
    },
    {
      nodeId: 'NODE_ROOM_C204', name: 'Advanced AI & Cloud Lab (C-204)', buildingId: 'Aryabhatta Block',
      floor: 2, localX: 26, localY: 23, latitude: 18.7786, longitude: 84.0943, heading: 90,
      instruction: '✓ Arrived at destination via recalculated path!'
    }
  ];

  constructor(
    private positionEngine: IndoorPositionEngine,
    private wifiService: WifiSimulationService,
    private sensorService: SensorSimulationService
  ) {
    this.totalSteps.next(this.normalRoute.length);
  }

  // --- Scenario Execution ---

  startScenario(scenarioId: string): void {
    this.stopSimulation();
    this.activeScenario$.next(scenarioId);
    this.deviationAlert$.next(null);

    switch (scenarioId) {
      case 'normal':
        this.runNormalScenario();
        break;
      case 'qr_correction':
        this.runQrCorrectionScenario();
        break;
      case 'deviation':
        this.runDeviationScenario();
        break;
      case 'accessible':
        this.runAccessibleScenario();
        break;
      case 'rtt_degradation':
        this.runRttDegradationScenario();
        break;
      default:
        this.runNormalScenario();
    }
  }

  private runNormalScenario(): void {
    this.wifiService.isRttDegraded = false;
    this.wifiService.isRttOffline = false;
    this.wifiService.isWifiAvailable = true;
    this.startRouteExecution(this.normalRoute);
  }

  private runQrCorrectionScenario(): void {
    this.startRouteExecution(this.normalRoute);
    // At step 4, simulate attenuation/drift, then recalibrate via QR at step 5
    const checkInterval = setInterval(() => {
      if (this.stepIndex === 4) {
        this.positionEngine.simulateUncertainty();
        this.currentInstruction.next('⚠ Signal attenuated. Position accuracy reduced. Scan wall QR checkpoint!');
      } else if (this.stepIndex === 5) {
        clearInterval(checkInterval);
        this.triggerQrCheckpoint('QR-004', 'Floor 2 East Corridor');
      }
    }, 1500);
  }

  private runDeviationScenario(): void {
    this.startRouteExecution(this.normalRoute.slice(0, 7), () => {
      this.deviationAlert$.next('Route deviation detected: Off expected path by 12m. Recalculating route...');
      setTimeout(() => {
        this.startRouteExecution(this.deviatedRoute);
      }, 2000);
    });
  }

  private runAccessibleScenario(): void {
    // Normal route already uses elevator node 'NODE_GF_ELEVATOR'
    this.startRouteExecution(this.normalRoute);
  }

  private runRttDegradationScenario(): void {
    this.wifiService.toggleRttDegradation();
    this.startRouteExecution(this.normalRoute);
  }

  // --- Movement Execution Engine ---

  private startRouteExecution(route: SimulationWaypoint[], onComplete?: () => void): void {
    this.isSimulating.next(true);
    this.stepIndex = 0;
    this.totalSteps.next(route.length);
    this.currentStep.next(0);

    const stepInterval = 2200 / this.speedMultiplier;

    this.timer = setInterval(() => {
      if (this.stepIndex >= route.length) {
        this.stopSimulation();
        if (onComplete) onComplete();
        return;
      }

      const wp = route[this.stepIndex];
      this.applyWaypoint(wp, this.stepIndex, route.length);
      this.stepIndex++;
    }, stepInterval);
  }

  private applyWaypoint(wp: SimulationWaypoint, currentIdx: number, total: number): void {
    this.currentStep.next(currentIdx);
    this.currentInstruction.next(wp.instruction);

    const isLast = currentIdx === total - 1;
    const progress = Math.round(((currentIdx + 1) / total) * 100);

    // Update Simulation State
    this.simulationState$.next({
      currentNodeId: wp.nodeId,
      currentNodeName: wp.name,
      currentFloor: wp.floor,
      currentBuilding: wp.buildingId,
      x: wp.localX,
      y: wp.localY,
      heading: wp.heading,
      speed: isLast ? 0 : 1.3,
      isMoving: !isLast,
      routeProgress: progress,
      isWifiAvailable: this.wifiService.isWifiAvailable,
      isRttAvailable: !this.wifiService.isRttOffline,
      isBlockedPathActive: false
    });

    // Feed sensors
    this.sensorService.updateMovement(!isLast, wp.heading, isLast ? 0 : 1.3);

    // Feed Wi-Fi simulation
    this.wifiService.updatePosition(wp.localX, wp.localY, wp.floor, wp.buildingId);

    // Feed Position Engine
    const obs: PositionObservation = {
      provider: wp.isStairOrElevator ? 'sensor' : 'wifi-rtt',
      buildingId: wp.buildingId,
      floorId: `FLOOR_${wp.floor}`,
      nodeId: wp.nodeId,
      localX: wp.localX,
      localY: wp.localY,
      latitude: wp.latitude,
      longitude: wp.longitude,
      confidence: wp.isStairOrElevator ? 0.82 : 0.90,
      heading: wp.heading,
      timestamp: Date.now()
    };
    this.positionEngine.submitObservation(obs);
  }

  // --- Manual Simulation Controller Actions (Section 40) ---

  moveForward(): void {
    const s = this.simulationState$.value;
    const rad = (s.heading * Math.PI) / 180;
    const newX = Math.round((s.x + Math.sin(rad) * 2) * 10) / 10;
    const newY = Math.round((s.y + Math.cos(rad) * 2) * 10) / 10;

    this.simulationState$.next({
      ...s,
      x: newX,
      y: newY,
      isMoving: true
    });
    this.sensorService.updateMovement(true, s.heading, 1.3);
    this.wifiService.updatePosition(newX, newY, s.currentFloor, s.currentBuilding);
  }

  turnLeft(): void {
    const s = this.simulationState$.value;
    const newHeading = (s.heading - 45 + 360) % 360;
    this.simulationState$.next({ ...s, heading: newHeading });
    this.sensorService.updateMovement(false, newHeading, 0);
  }

  turnRight(): void {
    const s = this.simulationState$.value;
    const newHeading = (s.heading + 45) % 360;
    this.simulationState$.next({ ...s, heading: newHeading });
    this.sensorService.updateMovement(false, newHeading, 0);
  }

  changeFloor(targetFloor: number): void {
    const s = this.simulationState$.value;
    this.simulationState$.next({ ...s, currentFloor: targetFloor });
    this.positionEngine.floor$.next(targetFloor);
    this.wifiService.updatePosition(s.x, s.y, targetFloor, s.currentBuilding);
  }

  triggerQrCheckpoint(qrId = 'QR-004', nodeName = 'Floor 2 East Corridor'): void {
    this.positionEngine.recalibrateViaQr(qrId, 'Aryabhatta Block', 2, nodeName, 22.0, 18.0);
    this.deviationAlert$.next(null);
  }

  toggleWifi(): void {
    this.wifiService.toggleWifi();
    const s = this.simulationState$.value;
    this.simulationState$.next({ ...s, isWifiAvailable: this.wifiService.isWifiAvailable });
  }

  toggleRttAccuracy(): void {
    this.wifiService.toggleRttDegradation();
    const s = this.simulationState$.value;
    this.simulationState$.next({ ...s, isRttAvailable: !this.wifiService.isRttDegraded });
  }

  triggerDeviation(): void {
    this.deviationAlert$.next('⚠ Deviation triggered: Walking away from planned route (recalculating...)');
  }

  startSimulation(): void {
    this.startScenario(this.activeScenario$.value);
  }

  stopSimulation(): void {
    this.isSimulating.next(false);
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  setSpeed(multiplier: number): void {
    this.speedMultiplier = Math.max(0.5, Math.min(3, multiplier));
    if (this.isSimulating.value) {
      this.stopSimulation();
      this.startSimulation();
    }
  }
}
