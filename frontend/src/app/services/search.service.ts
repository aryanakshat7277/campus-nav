import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Location } from '../models/location.model';
import { map, catchError } from 'rxjs/operators';

import { LocationService } from './location.service';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private apiUrl = '/api/search';

  constructor(
    private http: HttpClient,
    private locationService: LocationService
  ) {}

  search(query: string, category?: string): Observable<Location[]> {
    if (!query.trim()) return of([]);
    let url = `${this.apiUrl}?q=${encodeURIComponent(query)}`;
    if (category) url += `&category=${category}`;
    
    return this.http.get<Location[]>(url).pipe(
      catchError(() => {
        return this.locationService.getAll().pipe(
          map(locs => {
            const q = query.toLowerCase().trim();
            return locs.filter(loc =>
              (!category || loc.category === category) &&
              ((loc.name && loc.name.toLowerCase().includes(q)) ||
               (loc.category && loc.category.toLowerCase().includes(q)) ||
               (loc.description && loc.description.toLowerCase().includes(q)) ||
               (loc.tags && loc.tags.some(t => t.toLowerCase().includes(q))))
            );
          })
        );
      })
    );
  }
}
