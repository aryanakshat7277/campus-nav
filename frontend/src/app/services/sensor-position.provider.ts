import { Injectable } from '@angular/core';
import { IndoorPositionEngine } from './indoor-position.engine';

@Injectable({
  providedIn: 'root'
})
export class SensorPositionProvider {
  private listening = false;
  
  constructor(private positionEngine: IndoorPositionEngine) {
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', this.handleOrientation.bind(this));
    }
  }

  private handleOrientation(event: DeviceOrientationEvent): void {
    if (!this.listening) return;
    
    let heading = event.alpha;
    if (heading !== null) {
      this.positionEngine.submitObservation({
        provider: 'sensor',
        confidence: 0.5,
        heading: heading,
        timestamp: Date.now()
      });
    }
  }

  start(): void {
    this.listening = true;
  }

  stop(): void {
    this.listening = false;
  }
}
