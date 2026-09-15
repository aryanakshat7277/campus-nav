import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Beacon } from '../models/beacon.model';

@Injectable({
  providedIn: 'root'
})
export class BeaconService {
  private apiUrl = '/api/beacons';

  constructor(private http: HttpClient) {}

  getAll(buildingId?: string, floorId?: string): Observable<Beacon[]> {
    let params = new HttpParams();
    if (buildingId) params = params.set('buildingId', buildingId);
    if (floorId) params = params.set('floorId', floorId);
    return this.http.get<Beacon[]>(this.apiUrl, { params });
  }

  getById(id: string): Observable<Beacon> {
    return this.http.get<Beacon>(`${this.apiUrl}/${id}`);
  }

  create(beacon: Beacon): Observable<Beacon> {
    return this.http.post<Beacon>(this.apiUrl, beacon);
  }

  update(id: string, beacon: Beacon): Observable<Beacon> {
    return this.http.put<Beacon>(`${this.apiUrl}/${id}`, beacon);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
