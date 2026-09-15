import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AlertService } from '../../services/alert.service';
import { Alert } from '../../models/alert.model';

@Component({
  selector: 'app-alert-banner',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './alert-banner.component.html',
  styleUrls: ['./alert-banner.component.scss']
})
export class AlertBannerComponent implements OnInit {
  alerts: Alert[] = [];

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.alertService.getActiveAlerts().subscribe(data => {
      this.alerts = data;
    });
  }

  dismiss(alert: Alert) {
    this.alerts = this.alerts.filter(a => a.id !== alert.id);
  }

  getIcon(type: string): string {
    if (type === 'closure') return 'block';
    if (type === 'warning') return 'warning';
    return 'info';
  }
}
