import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { SearchService } from '../../services/search.service';
import { MapService } from '../../services/map.service';
import { Location } from '../../models/location.model';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subscription, of } from 'rxjs';
import { CATEGORIES } from '../../utils/constants';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatIconModule, MatListModule, MatButtonModule, MatCardModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  searchControl = new FormControl('');
  results: Location[] = [];
  showResults = false;
  private sub!: Subscription;

  constructor(private searchService: SearchService, private mapService: MapService) {}

  ngOnInit() {
    this.sub = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => {
        if (!query || query.trim().length === 0) return of([]);
        return this.searchService.search(query);
      })
    ).subscribe(res => {
      this.results = res;
      this.showResults = res.length > 0;
    });
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  selectResult(loc: Location) {
    this.mapService.selectLocation(loc);
    this.showResults = false;
    this.searchControl.setValue(loc.name, { emitEvent: false });
  }

  clear() {
    this.searchControl.setValue('');
    this.results = [];
    this.showResults = false;
  }
  
  getCategoryIcon(catId: string): string {
    const c = CATEGORIES.find(x => x.id === catId);
    return c ? c.icon : 'place';
  }
  
  getCategoryColor(catId: string): string {
    const c = CATEGORIES.find(x => x.id === catId);
    return c ? c.color : '#000';
  }
}
