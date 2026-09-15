import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CampusClosure } from '../models/closure.model';

@Injectable({
  providedIn: 'root'
})
export class ClosureService {
  private apiUrl = '/api/closures';

  constructor(private http: HttpClient) {}

  getActive(): Observable<CampusClosure[]> {
    return this.http.get<CampusClosure[]>(`${this.apiUrl}/active`);
  }

  create(closure: CampusClosure): Observable<CampusClosure> {
    return this.http.post<CampusClosure>(this.apiUrl, closure);
  }

  deactivate(id: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/deactivate`, {});
  }
}
