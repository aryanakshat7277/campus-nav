import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NavigationQr, QrResolveResponse } from '../models/navigation-qr.model';

@Injectable({
  providedIn: 'root'
})
export class QrService {
  private apiUrl = '/api/qr';

  constructor(private http: HttpClient) {}

  getAll(buildingId?: string): Observable<NavigationQr[]> {
    let params = new HttpParams();
    if (buildingId) params = params.set('buildingId', buildingId);
    return this.http.get<NavigationQr[]>(this.apiUrl, { params });
  }

  create(qr: NavigationQr): Observable<NavigationQr> {
    return this.http.post<NavigationQr>(this.apiUrl, qr);
  }

  resolve(qrCode: string): Observable<QrResolveResponse> {
    return this.http.post<QrResolveResponse>(`${this.apiUrl}/resolve`, { qrCode });
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
