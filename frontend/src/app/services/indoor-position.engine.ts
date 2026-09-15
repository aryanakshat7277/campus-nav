import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IndoorPosition, PositionObservation, PositionConfidence } from '../models/indoor-position.model';
import { WifiSimulationService } from './wifi-simulation.service';
import { SensorSimulationService } from './sensor-simulation.service';

@Injectable({
  providedIn: 'root'
})
export class IndoorPositionEngine {
  private currentPosition = new BehaviorSubject<IndoorPosition | null>(null);
  private observationsBuffer: PositionObservation[] = [];
  public shouldScanQr = new BehaviorSubject<boolean>(false);

  // Discrete Signal Confidence Observables for Section 9 & 29 Diagnostics
  public rssiConfidence$ = new BehaviorSubject<number>(72);
  public rttConfidence$ = new BehaviorSubject<number>(91);
  public sensorConfidence$ = new BehaviorSubject<number>(78);
  public fusedConfidence$ = new BehaviorSubject<number>(88);
  public confidenceState$ = new BehaviorSubject<PositionConfidence>('CONFIRMED');

  public nearestAp$ = new BehaviorSubject<string>('AP-002');
  public rttDistance$ = new BehaviorSubject<number>(7.8);
  public heading$ = new BehaviorSubject<number>(92);
  public floor$ = new BehaviorSubject<number>(2);
  public zone$ = new BehaviorSubject<string>('East Corridor');
  public stepCount$ = new BehaviorSubject<number>(142);
  public walkingSpeed$ = new BehaviorSubject<number>(1.3);

  private readonly PROVIDER_WEIGHTS: Record<string, number> = {
    'qr': 1.0,
    'uwb': 0.95,
    'vision': 0.9,
    'wifi-rtt': 0.85,
    'ble': 0.75,
    'wifi-rssi': 0.6,
    'sensor': 0.5
  };

  constructor(
    private wifiService: WifiSimulationService,
    private sensorService: SensorSimulationService
  ) {
    // Listen to Wi-Fi simulation stream
    this.wifiService.rssiMeasurements$.subscribe(rssis => {
      if (rssis.length > 0) {
        const top = rssis[0];
        this.nearestAp$.next(top.apId);
        // RSSI confidence depends on top signal strength
        const conf = top.status === 'optimal' ? 82 : top.status === 'good' ? 68 : 45;
        this.rssiConfidence$.next(conf);
      } else {
        this.rssiConfidence$.next(0);
      }
    });

    this.wifiService.rttMeasurements$.subscribe(rtts => {
      if (rtts.length > 0 && !this.wifiService.isRttOffline) {
        const top = rtts[0];
        this.rttDistance$.next(top.measuredDistance);
        const conf = this.wifiService.isRttDegraded ? 56 : top.status === 'locked' ? 92 : 75;
        this.rttConfidence$.next(conf);
      } else {
        this.rttConfidence$.next(0);
      }
    });

    // Listen to Sensor simulation stream
    this.sensorService.getTelemetry().subscribe(tel => {
      this.heading$.next(tel.magnetometer.heading);
      this.stepCount$.next(tel.accelerometer.stepCount);
      const conf = tel.accelerometer.isWalking ? 78 : 65;
      this.sensorConfidence$.next(conf);
    });

    // Seed initial indoor position
    this.currentPosition.next({
      buildingId: 'ARYABHATTA_BUILDING',
      buildingName: 'Aryabhatta Block',
      floorId: 'ARYABHATTA_FLOOR_2',
      floorNumber: 2,
      nodeId: 'ARYA_2F_CORRIDOR',
      nodeName: 'Floor 2 East Corridor',
      localX: 22.5,
      localY: 16.0,
      latitude: 18.7785,
      longitude: 84.0941,
      heading: 92,
      confidence: 0.88,
      confidenceState: 'CONFIRMED',
      lastUpdated: Date.now(),
      activeProviders: ['wifi-rtt', 'wifi-rssi', 'sensor', 'ble']
    });
  }

  submitObservation(obs: PositionObservation): void {
    const now = Date.now();
    this.observationsBuffer.push({ ...obs, timestamp: now });
    
    // Keep observations from last 5 seconds
    this.observationsBuffer = this.observationsBuffer.filter(o => now - o.timestamp < 5000);
    
    this.fusePositions();
  }

  getCurrentPosition(): Observable<IndoorPosition | null> {
    return this.currentPosition.asObservable();
  }

  getConfidenceState(): PositionConfidence {
    const pos = this.currentPosition.getValue();
    return pos ? pos.confidenceState : 'UNCERTAIN';
  }

  /**
   * QR Checkpoint Recalibration: snaps location and sets confidence to 100%
   */
  recalibrateViaQr(nodeId: string, buildingName: string, floorNumber: number, nodeName: string, localX = 20, localY = 15): void {
    const obs: PositionObservation = {
      provider: 'qr',
      buildingId: buildingName,
      nodeId: nodeId,
      localX,
      localY,
      confidence: 1.0,
      timestamp: Date.now()
    };
    this.submitObservation(obs);

    this.fusedConfidence$.next(100);
    this.confidenceState$.next('CONFIRMED');
    this.shouldScanQr.next(false);
    this.floor$.next(floorNumber);
    this.zone$.next(nodeName);

    const pos = this.currentPosition.value;
    if (pos) {
      this.currentPosition.next({
        ...pos,
        buildingName,
        floorNumber,
        nodeId,
        nodeName,
        localX,
        localY,
        confidence: 1.0,
        confidenceState: 'CONFIRMED',
        lastUpdated: Date.now()
      });
    }
  }

  /**
   * Simulates position degradation for demo scenario (triggers QR request)
   */
  simulateUncertainty(): void {
    this.rttConfidence$.next(38);
    this.rssiConfidence$.next(42);
    this.sensorConfidence$.next(40);
    this.fusedConfidence$.next(42);
    this.confidenceState$.next('UNCERTAIN');
    this.shouldScanQr.next(true);

    const pos = this.currentPosition.value;
    if (pos) {
      this.currentPosition.next({
        ...pos,
        confidence: 0.42,
        confidenceState: 'UNCERTAIN',
        lastUpdated: Date.now()
      });
    }
  }

  private fusePositions(): void {
    if (this.observationsBuffer.length === 0) return;

    let totalWeight = 0;
    let weightedX = 0, weightedY = 0;
    let weightedLat = 0, weightedLon = 0;
    let maxConfidence = 0;
    
    let bestBuildingId = this.observationsBuffer[this.observationsBuffer.length - 1].buildingId;
    let bestFloorId = this.observationsBuffer[this.observationsBuffer.length - 1].floorId;
    let bestNodeId = this.observationsBuffer[this.observationsBuffer.length - 1].nodeId;
    
    const activeProviders = new Set<string>();
    let heading = this.heading$.value;

    for (const obs of this.observationsBuffer) {
      const providerWeight = this.PROVIDER_WEIGHTS[obs.provider] || 0.5;
      const recencyWeight = 1 - ((Date.now() - obs.timestamp) / 5000);
      const weight = providerWeight * Math.max(0.2, recencyWeight) * obs.confidence;

      if (obs.localX !== undefined && obs.localY !== undefined) {
        weightedX += obs.localX * weight;
        weightedY += obs.localY * weight;
      }
      if (obs.latitude !== undefined && obs.longitude !== undefined) {
        weightedLat += obs.latitude * weight;
        weightedLon += obs.longitude * weight;
      }
      if (obs.heading !== undefined) {
        heading = obs.heading;
      }
      
      if (obs.confidence > maxConfidence) {
        maxConfidence = obs.confidence;
        if (obs.buildingId) bestBuildingId = obs.buildingId;
        if (obs.floorId) bestFloorId = obs.floorId;
        if (obs.nodeId) bestNodeId = obs.nodeId;
      }

      totalWeight += weight;
      activeProviders.add(obs.provider);
    }

    if (totalWeight > 0) {
      // Position Fusion formula combining weighted signals
      const rttC = this.rttConfidence$.value / 100;
      const rssiC = this.rssiConfidence$.value / 100;
      const sensorC = this.sensorConfidence$.value / 100;

      let fusedConf = maxConfidence;
      if (maxConfidence < 1.0) {
        fusedConf = (rttC * 0.45) + (rssiC * 0.30) + (sensorC * 0.25);
        if (this.wifiService.isRttOffline) {
          fusedConf = (rssiC * 0.60) + (sensorC * 0.40);
        }
      }

      fusedConf = Math.min(1.0, Math.max(0.2, fusedConf));
      const fusedPercent = Math.round(fusedConf * 100);
      this.fusedConfidence$.next(fusedPercent);

      let confidenceState: PositionConfidence = 'UNCERTAIN';
      if (fusedPercent >= 85) confidenceState = 'CONFIRMED';
      else if (fusedPercent >= 50) confidenceState = 'ESTIMATED';

      this.confidenceState$.next(confidenceState);
      this.shouldScanQr.next(fusedPercent < 50);

      const targetX = totalWeight > 0 && weightedX > 0 ? weightedX / totalWeight : 20.0;
      const targetY = totalWeight > 0 && weightedY > 0 ? weightedY / totalWeight : 15.0;

      // Update Wi-Fi AP positions
      this.wifiService.updatePosition(targetX, targetY, this.floor$.value, bestBuildingId || 'Aryabhatta Block');

      const newPos: IndoorPosition = {
        buildingId: bestBuildingId,
        buildingName: bestBuildingId?.includes('ARYA') ? 'Aryabhatta Block' : bestBuildingId,
        floorId: bestFloorId,
        floorNumber: this.floor$.value,
        nodeId: bestNodeId,
        localX: Math.round(targetX * 10) / 10,
        localY: Math.round(targetY * 10) / 10,
        latitude: weightedLat > 0 ? weightedLat / totalWeight : 18.7785,
        longitude: weightedLon > 0 ? weightedLon / totalWeight : 84.0941,
        heading: heading,
        confidence: fusedConf,
        confidenceState: confidenceState,
        lastUpdated: Date.now(),
        activeProviders: Array.from(activeProviders) as any[]
      };

      this.currentPosition.next(newPos);
    }
  }
}
