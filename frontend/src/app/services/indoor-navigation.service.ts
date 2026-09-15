import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface NavigationNode {
  id: string;
  buildingId: string;
  floorId: string;
  name?: string;
  type: string;
  localX: number;
  localY: number;
  latitude: number;
  longitude: number;
}

export interface NavigationEdge {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
  distance: number;
  isAccessible: boolean;
  type: string;
}

export interface IndoorRouteRequest {
  startNodeId: string;
  endNodeId: string;
  preferAccessible?: boolean;
  avoidStairs?: boolean;
  preferElevators?: boolean;
}

export interface IndoorDirectionStep {
  instruction: string;
  distance: number;
  duration: number;
  nodeId: string;
  isFloorChange: boolean;
}

export interface IndoorRouteResponse {
  pathNodes: NavigationNode[];
  totalDistance: number;
  estimatedTime: number;
  steps: IndoorDirectionStep[];
}

@Injectable({
  providedIn: 'root'
})
export class IndoorNavigationService {
  private apiUrl = '/api/navigation/indoor';

  constructor(private http: HttpClient) {}

  getNodes(buildingId?: string, floorId?: string): Observable<NavigationNode[]> {
    let params = new HttpParams();
    if (buildingId) params = params.set('buildingId', buildingId);
    if (floorId) params = params.set('floorId', floorId);
    return this.http.get<NavigationNode[]>(`${this.apiUrl}/nodes`, { params });
  }

  getEdges(): Observable<NavigationEdge[]> {
    return this.http.get<NavigationEdge[]>(`${this.apiUrl}/edges`);
  }

  createNode(node: NavigationNode): Observable<NavigationNode> {
    return this.http.post<NavigationNode>(`${this.apiUrl}/nodes`, node);
  }

  createEdge(edge: NavigationEdge): Observable<NavigationEdge> {
    return this.http.post<NavigationEdge>(`${this.apiUrl}/edges`, edge);
  }

  getIndoorRoute(request: IndoorRouteRequest): Observable<IndoorRouteResponse> {
    return this.http.post<IndoorRouteResponse>(`${this.apiUrl}/route`, request);
  }
}
