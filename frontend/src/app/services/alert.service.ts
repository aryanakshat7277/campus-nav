import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Alert, Report } from '../models/alert.model';

@Injectable({ providedIn: 'root' })
export class AlertService {
  private apiAlerts = '/api/alerts';

  constructor(private http: HttpClient) {}

  getActiveAlerts(): Observable<Alert[]> {
    return this.http.get<Alert[]>(this.apiAlerts).pipe(
      catchError(() => of([]))
    );
  }

  createAlert(alert: Alert): Observable<Alert> {
    return this.http.post<Alert>(this.apiAlerts, alert);
  }

  submitReport(report: Report): Observable<Report> {
    return this.http.post<Report>(`${this.apiAlerts}/reports`, report);
  }
}
