import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule, Router } from '@angular/router';
import { MapService } from '../../services/map.service';

export interface VisitorSpot {
  id: string;
  name: string;
  category: string;
  icon: string;
  building: string;
  floor: string;
  description: string;
  distance: number;
  timeEstimate: string;
  tags: string[];
}

export interface TourStop {
  stopNumber: number;
  name: string;
  building: string;
  duration: string;
  description: string;
  highlight: string;
}

@Component({
  selector: 'app-visitor-mode',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatTabsModule,
    RouterModule
  ],
  templateUrl: './visitor-mode.component.html',
  styleUrls: ['./visitor-mode.component.scss']
})
export class VisitorModeComponent {
  destinations: VisitorSpot[] = [
    {
      id: 'ADMIN_BLOCK',
      name: 'Admissions & Registrar Office',
      category: 'Administration',
      icon: 'support_agent',
      building: 'Admin Block',
      floor: 'Ground Floor',
      description: 'Official university administration, student admissions counter, and Vice Chancellor reception.',
      distance: 85,
      timeEstimate: '1 min walk',
      tags: ['Admissions', 'Official', 'Registrar']
    },
    {
      id: 'LIBRARY_GF',
      name: 'Central Library & Archives',
      category: 'Academic & Research',
      icon: 'local_library',
      building: 'Library Block',
      floor: 'Ground & 1st Floor',
      description: 'Dr. M.S. Swaminathan Library with reading halls, digital archives, and reference collections.',
      distance: 140,
      timeEstimate: '2 min walk',
      tags: ['Books', 'WiFi', 'Reading Halls']
    },
    {
      id: 'TEMPLE',
      name: 'Centurion Campus Temple',
      category: 'Spiritual Center',
      icon: 'temple_hindu',
      building: 'Campus Temple Precinct',
      floor: 'Ground Level',
      description: 'Serene spiritual sanctuary with manicured gardens and quiet meditation courtyard.',
      distance: 120,
      timeEstimate: '1.5 min walk',
      tags: ['Spiritual', 'Gardens', 'Peaceful']
    },
    {
      id: 'AUDITORIUM',
      name: 'Central University Auditorium',
      category: 'Events & Culture',
      icon: 'theater_comedy',
      building: 'Auditorium Complex',
      floor: 'Main Hall',
      description: '1,500-seat modern theater for university convocations, national symposiums, and cultural festivals.',
      distance: 160,
      timeEstimate: '2.5 min walk',
      tags: ['Convocations', 'Seminars', 'Events']
    },
    {
      id: 'CENTRAL_GARDEN',
      name: 'Central Botanical Garden',
      category: 'Recreation',
      icon: 'park',
      building: 'Central Lawn',
      floor: 'Open Campus',
      description: 'Lush greenery, floral pavilions, and sitting benches at the center of the university.',
      distance: 70,
      timeEstimate: '1 min walk',
      tags: ['Nature', 'Open Air', 'Benches']
    },
    {
      id: 'GUEST_HOUSE',
      name: 'Executive University Guest House',
      category: 'Hospitality',
      icon: 'hotel',
      building: 'Guest House Block',
      floor: 'Ground Floor',
      description: 'Comfortable air-conditioned lodging for visiting parents, faculty dignitaries, and examiners.',
      distance: 190,
      timeEstimate: '3 min walk',
      tags: ['Lodging', 'VIP', 'Stay']
    },
    {
      id: 'FOOD_COURT',
      name: 'Campus Food Court & Cafeteria',
      category: 'Dining',
      icon: 'restaurant',
      building: 'Dining Hub',
      floor: 'Ground Floor',
      description: 'Hygienic vegetarian and non-vegetarian meals, fresh juices, snacks, and bakery items.',
      distance: 95,
      timeEstimate: '1.5 min walk',
      tags: ['Breakfast', 'Lunch', 'Snacks']
    }
  ];

  walkingTour: TourStop[] = [
    {
      stopNumber: 1,
      name: 'Main Campus Portal',
      building: 'Main Gate',
      duration: '5 min',
      description: 'Welcome point on the foothills of the Eastern Ghats. Information kiosk available.',
      highlight: 'Campus Architecture & University Emblem'
    },
    {
      stopNumber: 2,
      name: 'Administrative Center',
      building: 'Admin Block',
      duration: '8 min',
      description: 'Historical main building housing academic dean offices and university archives.',
      highlight: 'University Heritage Gallery'
    },
    {
      stopNumber: 3,
      name: 'Aryabhatta Engineering Wing',
      building: 'Aryabhatta Block',
      duration: '10 min',
      description: 'Advanced robotics, electronics, and computing laboratories spread over 3 floors.',
      highlight: 'Robotics Center of Excellence'
    },
    {
      stopNumber: 4,
      name: 'Central Library & Reading Gardens',
      building: 'Library Complex',
      duration: '10 min',
      description: 'Digital research hubs and outdoor study pavilions under shady trees.',
      highlight: 'Agricultural Heritage Collections'
    },
    {
      stopNumber: 5,
      name: 'Sports Complex & Pavilion',
      building: 'Athletics Ground',
      duration: '7 min',
      description: 'Olympic-size athletic tracks, indoor badminton arena, and cricket pavilion.',
      highlight: 'Scenic mountain view of Paralakhemundi hills'
    }
  ];

  constructor(private mapService: MapService, private router: Router) {}

  navigateToSpot(spot: VisitorSpot) {
    this.router.navigate(['/navigate']);
  }
}
