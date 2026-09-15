import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-access-toggle',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSlideToggleModule, MatIconModule],
  templateUrl: './access-toggle.component.html',
  styleUrls: ['./access-toggle.component.scss']
})
export class AccessToggleComponent {
  isAccessible = false;

  constructor(private mapService: MapService) {
    this.mapService.isAccessible.subscribe(val => this.isAccessible = val);
  }

  onChange() {
    this.mapService.toggleAccessible(this.isAccessible);
  }
}
