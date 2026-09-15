import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LocationService } from '../../services/location.service';
import { Location } from '../../models/location.model';
import { LocationFormComponent } from '../location-form/location-form.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  locations: Location[] = [];
  displayedColumns = ['name', 'category', 'floor', 'actions'];

  constructor(private locService: LocationService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadLocations();
  }

  loadLocations() {
    this.locService.getAll().subscribe(data => this.locations = data);
  }

  openForm(loc?: Location) {
    const ref = this.dialog.open(LocationFormComponent, { data: loc, width: '500px' });
    ref.afterClosed().subscribe(res => {
      if (res) {
        if (res.id) {
          this.locService.update(res.id, res).subscribe(() => this.loadLocations());
        } else {
          this.locService.create(res).subscribe(() => this.loadLocations());
        }
      }
    });
  }

  delete(id: string) {
    if(confirm('Are you sure you want to delete this location?')) {
      this.locService.delete(id).subscribe(() => this.loadLocations());
    }
  }
}
