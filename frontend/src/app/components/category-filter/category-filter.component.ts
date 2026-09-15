import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MapService } from '../../services/map.service';
import { CATEGORIES } from '../../utils/constants';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [CommonModule, MatChipsModule, MatIconModule],
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss']
})
export class CategoryFilterComponent {
  categories = CATEGORIES;
  activeCategory: string | null = null;

  constructor(private mapService: MapService) {
    this.mapService.activeCategory.subscribe(cat => this.activeCategory = cat);
  }

  toggleCategory(catId: string | null) {
    if (this.activeCategory === catId) {
      this.mapService.activeCategory.next(null);
    } else {
      this.mapService.activeCategory.next(catId);
    }
  }
}
