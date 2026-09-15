import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  WifiAccessPointSim,
  WifiRssiMeasurement,
  WifiRttMeasurement,
  TrilaterationEstimate
} from '../models/simulation.model';

@Injectable({
  providedIn: 'root'
})
export class WifiSimulationService {
  // 6 Campus Access Points as requested
  public readonly accessPoints: WifiAccessPointSim[] = [
    {
      id: 'AP-001',
      name: 'Main Academic Block (Aryabhatta GF)',
      building: 'Aryabhatta Block',
      floor: 0,
      x: 10,
      y: 10,
      latitude: 18.7785,
      longitude: 84.0940,
      frequency: '5 GHz',
      baseSignal: -42,
      coverageRadius: 45
    },
    {
      id: 'AP-002',
      name: 'CSE Block (Aryabhatta Floor 2)',
      building: 'Aryabhatta Block',
      floor: 2,
      x: 24,
      y: 18,
      latitude: 18.7786,
      longitude: 84.0942,
      frequency: '5 GHz',
      baseSignal: -40,
      coverageRadius: 50
    },
    {
      id: 'AP-003',
      name: 'Central Library Wing',
      building: 'Aryabhatta Block',
      floor: 1,
      x: 18,
      y: 35,
      latitude: 18.7780,
      longitude: 84.0938,
      frequency: '5 GHz',
      baseSignal: -42,
      coverageRadius: 40
    },
    {
      id: 'AP-004',
      name: 'Administration Block',
      building: 'Admin Block',
      floor: 0,
      x: 55,
      y: 5,
      latitude: 18.7773,
      longitude: 84.0933,
      frequency: '2.4 GHz',
      baseSignal: -45,
      coverageRadius: 55
    },
    {
      id: 'AP-005',
      name: 'Hostel Block Quadrangle',
      building: 'Hostel Block',
      floor: 0,
      x: 80,
      y: 60,
      latitude: 18.7765,
      longitude: 84.0925,
      frequency: '2.4 GHz',
      baseSignal: -46,
      coverageRadius: 60
    },
    {
      id: 'AP-006',
      name: 'Science & Research Block',
      building: 'Science Block',
      floor: 1,
      x: 30,
      y: 70,
      latitude: 18.7790,
      longitude: 84.0948,
      frequency: '5 GHz',
      baseSignal: -43,
      coverageRadius: 45
    }
  ];

  // Observables
  public rssiMeasurements$ = new BehaviorSubject<WifiRssiMeasurement[]>([]);
  public rttMeasurements$ = new BehaviorSubject<WifiRttMeasurement[]>([]);
  public trilaterationEstimate$ = new BehaviorSubject<TrilaterationEstimate | null>(null);

  // States & Degradation Controls
  public isWifiAvailable = true;
  public isRttDegraded = false;
  public isRttOffline = false;

  constructor() {
    // Initial sample reading
    this.updatePosition(18, 15, 2, 'Aryabhatta Block');
  }

  /**
   * Updates simulated Wi-Fi RSSI and RTT measurements for a given simulated position
   * RSSI formula: RSSI = referenceSignal - pathLoss - wallPenalty + noise
   */
  updatePosition(x: number, y: number, floor: number, building: string): void {
    if (!this.isWifiAvailable) {
      this.rssiMeasurements$.next([]);
      this.rttMeasurements$.next([]);
      this.trilaterationEstimate$.next(null);
      return;
    }

    const rssiResults: WifiRssiMeasurement[] = [];
    const rttResults: WifiRttMeasurement[] = [];

    for (const ap of this.accessPoints) {
      // 3D Euclidean distance in local grid coordinates (approx 1 coordinate unit ≈ 1 meter)
      const dx = x - ap.x;
      const dy = y - ap.y;
      const floorDiff = Math.abs(floor - ap.floor);
      const verticalDist = floorDiff * 3.8; // 3.8m per floor
      const trueDist = Math.sqrt(dx * dx + dy * dy + verticalDist * verticalDist);

      // --- RSSI Calculation ---
      // Log-distance path loss model: PL(d) = 10 * n * log10(d)
      const pathLossExponent = ap.frequency === '5 GHz' ? 2.8 : 2.4;
      const pathLoss = 10 * pathLossExponent * Math.log10(Math.max(1, trueDist));
      const wallPenalty = floorDiff * 12 + (building !== ap.building ? 18 : 0);
      const noise = (Math.random() * 4 - 2); // ± 2 dBm noise
      const calculatedRssi = Math.round(ap.baseSignal - pathLoss - wallPenalty + noise);
      const clampedRssi = Math.max(-95, Math.min(-35, calculatedRssi));

      let signalBars = 1;
      if (clampedRssi >= -55) signalBars = 5;
      else if (clampedRssi >= -65) signalBars = 4;
      else if (clampedRssi >= -75) signalBars = 3;
      else if (clampedRssi >= -85) signalBars = 2;

      let status: 'optimal' | 'good' | 'weak' | 'offline' = 'optimal';
      if (clampedRssi < -80) status = 'weak';
      else if (clampedRssi < -68) status = 'good';

      rssiResults.push({
        apId: ap.id,
        name: ap.name,
        building: ap.building,
        rssi: clampedRssi,
        distance: Math.round(trueDist * 10) / 10,
        signalBars,
        status
      });

      // --- RTT Calculation ---
      if (!this.isRttOffline) {
        let rttNoiseMagnitude = 0.5; // ±0.5m in high-accuracy RTT
        let rttStatus: 'locked' | 'searching' | 'degraded' = 'locked';

        if (this.isRttDegraded) {
          rttNoiseMagnitude = 4.2; // degraded noise
          rttStatus = 'degraded';
        } else if (trueDist > ap.coverageRadius * 0.8) {
          rttNoiseMagnitude = 1.8;
          rttStatus = 'searching';
        }

        const rttNoise = (Math.random() * 2 - 1) * rttNoiseMagnitude;
        const measuredDistance = Math.max(0.8, Math.round((trueDist + rttNoise) * 10) / 10);

        rttResults.push({
          apId: ap.id,
          name: ap.name,
          trueDistance: Math.round(trueDist * 10) / 10,
          measuredDistance,
          noise: Math.round(rttNoise * 10) / 10,
          status: rttStatus
        });
      }
    }

    // Sort RSSI by signal strength (strongest first)
    rssiResults.sort((a, b) => b.rssi - a.rssi);
    // Sort RTT by closest distance
    rttResults.sort((a, b) => a.measuredDistance - b.measuredDistance);

    this.rssiMeasurements$.next(rssiResults);
    this.rttMeasurements$.next(rttResults);

    // Run Trilateration on top 3 RTT measurements
    this.estimatePositionFromRtt(rttResults, floor);
  }

  /**
   * Multilateration/Trilateration algorithm estimating user location from Wi-Fi RTT
   */
  private estimatePositionFromRtt(rttMeasurements: WifiRttMeasurement[], actualFloor: number): void {
    if (rttMeasurements.length < 3 || this.isRttOffline) {
      this.trilaterationEstimate$.next(null);
      return;
    }

    const top3 = rttMeasurements.slice(0, 3);
    const apData = top3.map(r => {
      const ap = this.accessPoints.find(a => a.id === r.apId)!;
      return { x: ap.x, y: ap.y, r: r.measuredDistance };
    });

    // Weighted centroid approximation using inverse distance squared
    let totalWeight = 0;
    let sumX = 0;
    let sumY = 0;

    for (const d of apData) {
      const weight = 1 / Math.max(0.1, d.r * d.r);
      sumX += d.x * weight;
      sumY += d.y * weight;
      totalWeight += weight;
    }

    const estimatedX = Math.round((sumX / totalWeight) * 10) / 10;
    const estimatedY = Math.round((sumY / totalWeight) * 10) / 10;

    // Calculate confidence based on top signal strength and RTT degradation
    let confidence = 0.92;
    if (this.isRttDegraded) {
      confidence = 0.58;
    } else if (top3[0].measuredDistance > 25) {
      confidence = 0.76;
    }

    this.trilaterationEstimate$.next({
      estimatedX,
      estimatedY,
      estimatedFloor: actualFloor,
      confidence: Math.round(confidence * 100) / 100,
      activeApsCount: top3.length
    });
  }

  // Failure controls
  toggleWifi(): void {
    this.isWifiAvailable = !this.isWifiAvailable;
  }

  toggleRttDegradation(): void {
    this.isRttDegraded = !this.isRttDegraded;
  }

  toggleRttOffline(): void {
    this.isRttOffline = !this.isRttOffline;
  }
}
