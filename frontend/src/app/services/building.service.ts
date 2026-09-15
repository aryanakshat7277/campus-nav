import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Building, Floor, Room } from '../models/building.model';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {
  private apiUrl = '/api/buildings';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Building[]> {
    return this.http.get<Building[]>(this.apiUrl);
  }

  getById(id: string): Observable<Building> {
    return this.http.get<Building>(`${this.apiUrl}/${id}`);
  }

  getFloors(buildingId: string): Observable<Floor[]> {
    return this.http.get<Floor[]>(`${this.apiUrl}/${buildingId}/floors`);
  }

  getRooms(floorId: string): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.apiUrl}/floors/${floorId}/rooms`);
  }

  create(building: Building): Observable<Building> {
    return this.http.post<Building>(this.apiUrl, building);
  }

  update(id: string, building: Building): Observable<Building> {
    return this.http.put<Building>(`${this.apiUrl}/${id}`, building);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
