import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CampusGraph } from '../models/graph.model';
import { RouteResponse } from '../models/route.model';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private apiGraph = '/api/navigation/graph';
  private apiRoute = '/api/navigation/route';

  constructor(private http: HttpClient) {}

  getGraph(): Observable<CampusGraph> {
    return this.http.get<CampusGraph>(this.apiGraph).pipe(
      catchError(() => this.http.get<CampusGraph>('/assets/data/campus_graph.json'))
    );
  }

  getRoute(fromNodeId: string, toNodeId: string, accessible: boolean): Observable<RouteResponse> {
    return this.http.post<RouteResponse>(this.apiRoute, {
      fromNodeId,
      toNodeId,
      accessible
    });
  }
}
