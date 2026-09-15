import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Location } from '../models/location.model';

@Injectable({ providedIn: 'root' })
export class LocationService {
  private apiUrl = '/api/locations';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Location[]> {
    return this.http.get<Location[]>(this.apiUrl).pipe(
      catchError(() => this.http.get<Location[]>('assets/data/locations.json'))
    );
  }

  getByCategory(category: string): Observable<Location[]> {
    return this.http.get<Location[]>(`${this.apiUrl}?category=${category}`);
  }

  getById(id: string): Observable<Location> {
    return this.http.get<Location>(`${this.apiUrl}/${id}`);
  }

  create(location: Location): Observable<Location> {
    return this.http.post<Location>(this.apiUrl, location);
  }

  update(id: string, location: Location): Observable<Location> {
    return this.http.put<Location>(`${this.apiUrl}/${id}`, location);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
