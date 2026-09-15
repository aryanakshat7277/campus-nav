import { Injectable } from '@angular/core';
import { IndoorPositionEngine } from './indoor-position.engine';
import { BeaconSignal } from '../models/beacon.model';

@Injectable({
  providedIn: 'root'
})
export class BlePositionProvider {
  private scanning = false;
  private rssiWindow: Record<string, number[]> = {};

  constructor(private positionEngine: IndoorPositionEngine) {}

  isAvailable(): boolean {
    return true; // Assume true for demo
  }

  startScanning(): void {
    this.scanning = true;
    console.log('BLE scanning started');
  }

  stopScanning(): void {
    this.scanning = false;
    this.rssiWindow = {};
    console.log('BLE scanning stopped');
  }

  processSignal(signal: BeaconSignal): void {
    if (!this.scanning) return;

    if (!this.rssiWindow[signal.beaconId]) {
      this.rssiWindow[signal.beaconId] = [];
    }
    this.rssiWindow[signal.beaconId].push(signal.rssi);
    
    if (this.rssiWindow[signal.beaconId].length > 5) {
      this.rssiWindow[signal.beaconId].shift();
    }

    const avgRssi = this.rssiWindow[signal.beaconId].reduce((a, b) => a + b, 0) / this.rssiWindow[signal.beaconId].length;
    
    // Simulate mapping to node
    this.positionEngine.submitObservation({
      provider: 'ble',
      confidence: 0.75,
      timestamp: Date.now(),
      // In a real app we'd map beaconId to building/floor/node here
    });
  }
}
