import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MapService } from '../../services/map.service';
import { NavigationService } from '../../services/navigation.service';
import { DirectionsListComponent } from '../directions-list/directions-list.component';
import { RouteInfoComponent } from '../route-info/route-info.component';
import { AccessToggleComponent } from '../access-toggle/access-toggle.component';
import { Location } from '../../models/location.model';
import { RouteResponse } from '../../models/route.model';

@Component({
  selector: 'app-nav-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatButtonModule, MatIconModule, MatInputModule, DirectionsListComponent, RouteInfoComponent, AccessToggleComponent],
  templateUrl: './nav-panel.component.html',
  styleUrls: ['./nav-panel.component.scss']
})
export class NavPanelComponent {
  startLoc: Location | null = null;
  endLoc: Location | null = null;
  route: RouteResponse | null = null;
  isAccessible = false;
  expanded = true;

  constructor(public mapService: MapService, private navService: NavigationService) {
    this.mapService.startLocation.subscribe(loc => this.startLoc = loc);
    this.mapService.endLocation.subscribe(loc => this.endLoc = loc);
    this.mapService.currentRoute.subscribe(rt => this.route = rt);
    this.mapService.isAccessible.subscribe(acc => this.isAccessible = acc);
  }

  swap() {
    const temp = this.startLoc;
    this.mapService.setStart(this.endLoc);
    this.mapService.setEnd(temp);
  }

  getDirections() {
    if (!this.startLoc || !this.endLoc) return;
    this.mapService.isNavigating.next(true);
    this.navService.getRoute(this.startLoc.id, this.endLoc.id, this.isAccessible).subscribe(res => {
      this.mapService.currentRoute.next(res);
      this.expanded = false;
    });
  }

  clear() {
    this.mapService.clearNavigation();
    this.expanded = true;
  }
  
  toggleExpand() {
    this.expanded = !this.expanded;
  }
}
