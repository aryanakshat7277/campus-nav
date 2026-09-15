import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DemoSimulationService } from '../../services/demo-simulation.service';

@Component({
  selector: 'app-demo-control',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatTooltipModule
  ],
  templateUrl: './demo-control.component.html',
  styleUrls: ['./demo-control.component.scss']
})
export class DemoControlComponent {
  isExpanded = true;
  currentSpeed = 1;

  constructor(public demoService: DemoSimulationService) {}

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }

  toggleSimulation(): void {
    if (this.demoService.isSimulating.value) {
      this.demoService.stopSimulation();
    } else {
      this.demoService.startSimulation();
    }
  }

  setSpeed(speed: number): void {
    this.currentSpeed = speed;
    this.demoService.setSpeed(speed);
  }

  getProgressPercentage(current: number, total: number): number {
    if (!total || total === 0) return 0;
    return Math.min(100, Math.round(((current + 1) / total) * 100));
  }
}
