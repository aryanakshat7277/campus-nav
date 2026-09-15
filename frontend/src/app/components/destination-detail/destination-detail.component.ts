import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LocationService } from '../../services/location.service';
import { IndoorPositionEngine } from '../../services/indoor-position.engine';
import { MapService } from '../../services/map.service';

export interface DetailedCampusDestination {
  id: string;
  name: string;
  buildingName: string;
  floorNumber: number;
  category: string;
  categoryIcon: string;
  roomNumber?: string;
  wing?: string;
  description: string;
  distance: string;
  time: string;
  accessible: boolean;
  rampAvailable: boolean;
  elevatorAvailable: boolean;
  hours: string;
  contactPerson: string;
  phone: string;
  email: string;
  amenities: string[];
  department: string;
  imageUrl: string;
  capacity?: number;
}

@Component({
  selector: 'app-destination-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
    RouterModule
  ],
  templateUrl: './destination-detail.component.html',
  styleUrls: ['./destination-detail.component.scss']
})
export class DestinationDetailComponent implements OnInit {
  @Input() location: DetailedCampusDestination | null = null;
  copied = false;

  private readonly campusDestinations: Record<string, DetailedCampusDestination> = {
    'c-204': {
      id: 'c-204',
      name: 'Advanced AI & Cloud Computing Lab (C-204)',
      buildingName: 'Aryabhatta Block',
      floorNumber: 2,
      category: 'Laboratory',
      categoryIcon: 'computer',
      roomNumber: 'C-204',
      wing: 'North Wing',
      description: 'Primary computational research facility housing 60 high-performance workstations, dual GPU server racks, and high-speed Wi-Fi 6 for CSE/AI-ML students.',
      distance: '145m',
      time: '2 mins',
      accessible: true,
      rampAvailable: true,
      elevatorAvailable: true,
      hours: '08:00 AM – 08:00 PM (Mon–Sat)',
      contactPerson: 'Dr. Debendra Maharana (Lab In-Charge)',
      phone: '+91 94374 81204',
      email: 'ai-lab@cutm.ac.in',
      amenities: ['Gigabit Wi-Fi 6', 'Central AC', 'Smart 4K Interactive Board', 'UPS Backup', 'Ergonomic Seating'],
      department: 'School of Engineering and Technology (SoET)',
      imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=80',
      capacity: 65
    },
    'central-library': {
      id: 'central-library',
      name: 'Central Library & Learning Resource Centre',
      buildingName: 'Aryabhatta Block (Adjacent Wing)',
      floorNumber: 1,
      category: 'Library',
      categoryIcon: 'local_library',
      roomNumber: 'LRC-101',
      wing: 'East Wing',
      description: 'Extensive multi-level library repository with over 80,000 volumes, IEEE/Elsevier digital research kiosks, quiet reading carrels, and discussion pods.',
      distance: '110m',
      time: '1.5 mins',
      accessible: true,
      rampAvailable: true,
      elevatorAvailable: true,
      hours: '08:00 AM – 10:00 PM (Daily)',
      contactPerson: 'Mr. Prasant Nayak (Chief Librarian)',
      phone: '+91 94370 12345',
      email: 'library.pkd@cutm.ac.in',
      amenities: ['Quiet Study Zones', 'E-Journals Access', 'Book Lending Desks', 'Photocopy / Print Station', 'Braille Section'],
      department: 'Central Academic Facilities',
      imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1000&q=80',
      capacity: 350
    },
    'admin-1': {
      id: 'admin-1',
      name: 'Registrar & Vice Chancellor Secretariat',
      buildingName: 'Administrative Central Block',
      floorNumber: 1,
      category: 'Office',
      categoryIcon: 'account_balance',
      roomNumber: 'ADM-102',
      wing: 'Central Block',
      description: 'Official university governance and administrative affairs headquarters. Handles student verification, academic credentials, and official delegations.',
      distance: '210m',
      time: '3 mins',
      accessible: true,
      rampAvailable: true,
      elevatorAvailable: true,
      hours: '09:00 AM – 05:30 PM (Mon–Fri)',
      contactPerson: 'Office of the Registrar',
      phone: '+91 6815 222999',
      email: 'registrar@cutm.ac.in',
      amenities: ['Visitor Waiting Lounge', 'Conference Room', 'Digital Token Queue', 'Wheelchair Ramped Entrance'],
      department: 'University Administration',
      imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
      capacity: 50
    },
    'auditorium-1': {
      id: 'auditorium-1',
      name: 'Dr. APJ Abdul Kalam Memorial Auditorium',
      buildingName: 'Auditorium Complex',
      floorNumber: 0,
      category: 'Auditorium',
      categoryIcon: 'theater_comedy',
      roomNumber: 'AUD-MAIN',
      wing: 'West Campus',
      description: 'Air-conditioned convention auditorium equipped with acoustic sound baffling, theatrical lighting rigs, and Dolby surround sound for university convocations and symposiums.',
      distance: '320m',
      time: '4 mins',
      accessible: true,
      rampAvailable: true,
      elevatorAvailable: false,
      hours: 'Event Schedule Dependent',
      contactPerson: 'Cultural Affairs Committee',
      phone: '+91 6815 222100',
      email: 'events@cutm.ac.in',
      amenities: ['1,200 Padded Seats', 'Acoustic Soundstage', 'Green Rooms', 'VIP Lounge', 'Press Media Gallery'],
      department: 'University Cultural & Event Centre',
      imageUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1000&q=80',
      capacity: 1200
    },
    'medical-1': {
      id: 'medical-1',
      name: '24x7 Campus Health & First Aid Wellness Centre',
      buildingName: 'Student Welfare Centre',
      floorNumber: 0,
      category: 'Medical',
      categoryIcon: 'local_hospital',
      roomNumber: 'MED-01',
      wing: 'Near Hostels',
      description: 'Full-time campus medical clinic with residential medical officer, on-call nurses, pharmacy, emergency oxygen, and 24-hour campus ambulance transfer facility.',
      distance: '180m',
      time: '2.5 mins',
      accessible: true,
      rampAvailable: true,
      elevatorAvailable: false,
      hours: 'Open 24 Hours / 7 Days',
      contactPerson: 'Dr. K. S. Patnaik (Resident Medical Officer)',
      phone: '+91 6815 222108 / +91 94371 00108',
      email: 'healthcenter@cutm.ac.in',
      amenities: ['Emergency Observation Beds', '24x7 Ambulance on Standby', 'Essential Pharmacy', 'ECG / Oxygen', 'Vaccination Desk'],
      department: 'Student Health & Wellness Directorate',
      imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80',
      capacity: 15
    }
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private locationService: LocationService,
    private positionEngine: IndoorPositionEngine,
    private mapService: MapService
  ) {}

  ngOnInit(): void {
    const routeId = this.route.snapshot.paramMap.get('id');
    if (routeId) {
      this.loadDestination(routeId);
    } else if (!this.location) {
      this.location = this.campusDestinations['c-204'];
    }
  }

  private loadDestination(id: string): void {
    const normalized = id.toLowerCase().trim();
    if (this.campusDestinations[normalized]) {
      this.location = this.campusDestinations[normalized];
      return;
    }

    // Try matching partial keys or fallback to first entry
    const foundKey = Object.keys(this.campusDestinations).find(k => normalized.includes(k) || k.includes(normalized));
    if (foundKey) {
      this.location = this.campusDestinations[foundKey];
      return;
    }

    // Attempt backend query if ID matches backend format
    this.locationService.getById(id).subscribe({
      next: (loc) => {
        this.location = {
          id: loc.id,
          name: loc.name,
          buildingName: loc.buildingId || 'Main Campus',
          floorNumber: loc.floor || 0,
          category: loc.category || 'Facility',
          categoryIcon: 'place',
          description: loc.description || 'CUTM Paralakhemundi academic and student support facility.',
          distance: '160m',
          time: '2 mins',
          accessible: loc.isAccessible ?? true,
          rampAvailable: true,
          elevatorAvailable: true,
          hours: loc.openingHours || '08:00 AM – 06:00 PM',
          contactPerson: 'CUTM Helpdesk',
          phone: '+91 6815 222999',
          email: 'support@cutm.ac.in',
          amenities: ['Wi-Fi 6', 'Accessible Entry', 'Drinking Water', 'Restrooms Nearby'],
          department: 'Academic Campus Unit',
          imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=80'
        };
      },
      error: () => {
        this.location = this.campusDestinations['c-204'];
      }
    });
  }

  startNavigation(): void {
    if (!this.location) return;
    this.router.navigate(['/navigate'], {
      queryParams: {
        destination: this.location.id,
        name: this.location.name,
        building: this.location.buildingName,
        floor: this.location.floorNumber
      }
    });
  }

  shareLocation(): void {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      this.copied = true;
      setTimeout(() => this.copied = false, 2500);
    }
  }
}
