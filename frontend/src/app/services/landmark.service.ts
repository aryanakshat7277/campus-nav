import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Landmark } from '../models/landmark.model';

@Injectable({
  providedIn: 'root'
})
export class LandmarkService {
  private apiUrl = '/api/landmarks';

  constructor(private http: HttpClient) {}

  getAll(buildingId?: string, floorId?: string): Observable<Landmark[]> {
    let params = new HttpParams();
    if (buildingId) params = params.set('buildingId', buildingId);
    if (floorId) params = params.set('floorId', floorId);
    return this.http.get<Landmark[]>(this.apiUrl, { params });
  }

  create(landmark: Landmark): Observable<Landmark> {
    return this.http.post<Landmark>(this.apiUrl, landmark);
  }

  update(id: string, landmark: Landmark): Observable<Landmark> {
    return this.http.put<Landmark>(`${this.apiUrl}/${id}`, landmark);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
