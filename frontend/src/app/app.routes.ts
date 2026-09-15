import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./components/campus-map/campus-map.component').then(m => m.CampusMapComponent) },
  { path: 'dashboard', loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'navigate', loadComponent: () => import('./components/indoor-navigation/indoor-navigation.component').then(m => m.IndoorNavigationComponent) },
  { path: 'destination/:id', loadComponent: () => import('./components/destination-detail/destination-detail.component').then(m => m.DestinationDetailComponent) },
  { path: 'route-options', loadComponent: () => import('./components/route-options/route-options.component').then(m => m.RouteOptionsComponent) },
  { path: 'qr-scanner', loadComponent: () => import('./components/qr-scanner/qr-scanner.component').then(m => m.QrScannerComponent) },
  { path: 'nearby', loadComponent: () => import('./components/nearby-facilities/nearby-facilities.component').then(m => m.NearbyFacilitiesComponent) },
  { path: 'emergency', loadComponent: () => import('./components/emergency-mode/emergency-mode.component').then(m => m.EmergencyModeComponent) },
  { path: 'visitor', loadComponent: () => import('./components/visitor-mode/visitor-mode.component').then(m => m.VisitorModeComponent) },
  { path: 'admin', loadComponent: () => import('./components/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent) },
  { path: 'admin/buildings', loadComponent: () => import('./components/building-management/building-management.component').then(m => m.BuildingManagementComponent) },
  { path: 'admin/beacons', loadComponent: () => import('./components/beacon-management/beacon-management.component').then(m => m.BeaconManagementComponent) },
  { path: 'admin/qr', loadComponent: () => import('./components/qr-management/qr-management.component').then(m => m.QrManagementComponent) },
  { path: 'admin/landmarks', loadComponent: () => import('./components/landmark-management/landmark-management.component').then(m => m.LandmarkManagementComponent) },
  { path: 'admin/closures', loadComponent: () => import('./components/closure-management/closure-management.component').then(m => m.ClosureManagementComponent) },
  { path: 'admin/diagnostics', loadComponent: () => import('./components/position-diagnostics/position-diagnostics.component').then(m => m.PositionDiagnosticsComponent) },
  { path: '**', redirectTo: '' }
];
