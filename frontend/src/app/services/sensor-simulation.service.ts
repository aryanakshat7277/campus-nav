import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PhoneSensorTelemetry } from '../models/simulation.model';

@Injectable({
  providedIn: 'root'
})
export class SensorSimulationService {
  private telemetry$ = new BehaviorSubject<PhoneSensorTelemetry>({
    accelerometer: {
      acceleration: 1.1,
      isWalking: false,
      stepCount: 142,
      strideLengthMeters: 0.75
    },
    gyroscope: {
      angularRate: 0,
      headingDelta: 0
    },
    magnetometer: {
      heading: 92,
      cardinalDirection: 'East (92°)'
    }
  });

  private previousHeading = 92;

  constructor() {}

  getTelemetry(): Observable<PhoneSensorTelemetry> {
    return this.telemetry$.asObservable();
  }

  /**
   * Updates sensor values according to simulated movement state, speed, and turns
   */
  updateMovement(isWalking: boolean, heading: number, speedMetersPerSec = 1.3): void {
    const current = this.telemetry$.value;
    const deltaHeading = Math.round(heading - this.previousHeading);
    this.previousHeading = heading;

    // Cyclic walking jitter when moving (e.g. 1.05 - 1.25 m/s²)
    const acceleration = isWalking ? Math.round((1.05 + Math.random() * 0.2) * 100) / 100 : 0.0;
    const newStepCount = isWalking ? current.accelerometer.stepCount + 1 : current.accelerometer.stepCount;

    // Cardinal direction calculation
    const cardinal = this.getCardinalDirection(heading);

    this.telemetry$.next({
      accelerometer: {
        acceleration,
        isWalking,
        stepCount: newStepCount,
        strideLengthMeters: 0.75
      },
      gyroscope: {
        angularRate: isWalking && Math.abs(deltaHeading) > 10 ? deltaHeading * 1.5 : 0,
        headingDelta: deltaHeading
      },
      magnetometer: {
        heading: Math.round(heading),
        cardinalDirection: `${cardinal} (${Math.round(heading)}°)`
      }
    });
  }

  private getCardinalDirection(angle: number): string {
    const norm = (angle % 360 + 360) % 360;
    const directions = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'];
    const index = Math.round(norm / 45) % 8;
    return directions[index];
  }
}
