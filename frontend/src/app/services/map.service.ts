import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Location } from '../models/location.model';
import { RouteResponse } from '../models/route.model';
import { CampusGraph } from '../models/graph.model';
import { LocationService } from './location.service';
import { NavigationService } from './navigation.service';

@Injectable({ providedIn: 'root' })
export class MapService {
  public locations = new BehaviorSubject<Location[]>([]);
  public graph = new BehaviorSubject<CampusGraph | null>(null);
  
  public selectedLocation = new BehaviorSubject<Location | null>(null);
  public startLocation = new BehaviorSubject<Location | null>(null);
  public endLocation = new BehaviorSubject<Location | null>(null);
  public currentRoute = new BehaviorSubject<RouteResponse | null>(null);
  public isAccessible = new BehaviorSubject<boolean>(false);
  public isNavigating = new BehaviorSubject<boolean>(false);
  public activeCategory = new BehaviorSubject<string | null>(null);

  constructor(
    private locationService: LocationService,
    private navigationService: NavigationService
  ) {
    this.loadInitialData();
  }

  private loadInitialData() {
    this.locationService.getAll().subscribe(locs => {
      this.locations.next(locs);
    });
    this.navigationService.getGraph().subscribe(g => {
      this.graph.next(g);
    });
  }

  selectLocation(location: Location | null) {
    this.selectedLocation.next(location);
  }

  setStart(location: Location | null) {
    this.startLocation.next(location);
  }

  setEnd(location: Location | null) {
    this.endLocation.next(location);
  }

  clearNavigation() {
    this.startLocation.next(null);
    this.endLocation.next(null);
    this.currentRoute.next(null);
    this.isNavigating.next(false);
  }

  toggleAccessible(isAcc: boolean) {
    this.isAccessible.next(isAcc);
  }
}
