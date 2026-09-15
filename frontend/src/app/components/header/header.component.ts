import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ThemeSwitcherComponent } from '../theme-switcher/theme-switcher.component';
import { PositionIndicatorComponent } from '../position-indicator/position-indicator.component';
import { MapService } from '../../services/map.service';
import { DemoSimulationService } from '../../services/demo-simulation.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
    ThemeSwitcherComponent,
    PositionIndicatorComponent
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() menuClick = new EventEmitter<void>();
  isAccessible = false;
  isSimulating = false;
  isFullscreen = false;

  private onFullscreenChange = () => {
    this.isFullscreen = !!document.fullscreenElement;
  };

  constructor(
    public mapService: MapService,
    public demoService: DemoSimulationService
  ) {
    this.mapService.isAccessible.subscribe(acc => this.isAccessible = acc);
    this.demoService.isSimulating.subscribe(sim => this.isSimulating = sim);
  }

  ngOnInit() {
    this.isFullscreen = !!document.fullscreenElement;
    document.addEventListener('fullscreenchange', this.onFullscreenChange);
  }

  ngOnDestroy() {
    document.removeEventListener('fullscreenchange', this.onFullscreenChange);
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen().catch(() => {});
      } else if ((elem as any).webkitRequestFullscreen) {
        (elem as any).webkitRequestFullscreen();
      } else if ((elem as any).msRequestFullscreen) {
        (elem as any).msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
    }
  }

  toggleSimulation() {
    if (this.isSimulating) {
      this.demoService.stopSimulation();
    } else {
      this.demoService.startSimulation();
    }
  }
}
