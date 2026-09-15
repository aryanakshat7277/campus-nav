import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MapService } from '../../services/map.service';
import { FormsModule } from '@angular/forms';
import { CATEGORIES } from '../../utils/constants';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatListModule, MatIconModule, MatSlideToggleModule, MatDividerModule, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Output() close = new EventEmitter<void>();
  categories = CATEGORIES;
  isAccessible = false;

  constructor(private mapService: MapService) {
    this.mapService.isAccessible.subscribe(val => this.isAccessible = val);
  }

  toggleAccessible() {
    this.mapService.toggleAccessible(this.isAccessible);
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
    this.close.emit();
  }

  setCategory(catId: string) {
    this.mapService.activeCategory.next(catId);
    this.close.emit();
  }
}
