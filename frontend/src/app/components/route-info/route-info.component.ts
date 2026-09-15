import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { RouteResponse } from '../../models/route.model';

@Component({
  selector: 'app-route-info',
  standalone: true,
  imports: [CommonModule, MatChipsModule, MatIconModule],
  templateUrl: './route-info.component.html',
  styleUrls: ['./route-info.component.scss']
})
export class RouteInfoComponent {
  @Input() route!: RouteResponse;
}
