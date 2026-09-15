import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';

export interface CampusFacility {
  id: string;
  name: string;
  category: string;
  icon: string;
  building: string;
  floor: string;
  distanceMeters: number;
  timeEstimate: string;
  isAccessible: boolean;
  status: 'Open' | '24/7' | 'Closed';
  description: string;
}

@Component({
  selector: 'app-nearby-facilities',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    FormsModule
  ],
  templateUrl: './nearby-facilities.component.html',
  styleUrls: ['./nearby-facilities.component.scss']
})
export class NearbyFacilitiesComponent {
  selectedCategory = 'all';
  searchQuery = '';

  categoryChips = [
    { id: 'all', label: 'All Facilities', icon: 'grid_view' },
    { id: 'washroom', label: 'Restrooms', icon: 'wc' },
    { id: 'water', label: 'Water Dispensers', icon: 'local_drink' },
    { id: 'food', label: 'Food & Dining', icon: 'restaurant' },
    { id: 'atm', label: 'ATMs & Bank', icon: 'local_atm' },
    { id: 'medical', label: 'Medical Clinic', icon: 'local_hospital' },
    { id: 'elevator', label: 'Elevators & Lifts', icon: 'elevator' },
    { id: 'library', label: 'Library & Reading', icon: 'local_library' },
    { id: 'parking', label: 'Parking Areas', icon: 'local_parking' }
  ];

  facilities: CampusFacility[] = [
    {
      id: 'FAC_1',
      name: 'Ground Floor Restrooms (Wheelchair Accessible)',
      category: 'washroom',
      icon: 'wc',
      building: 'Aryabhatta Block',
      floor: 'Ground Floor',
      distanceMeters: 15,
      timeEstimate: '30s walk',
      isAccessible: true,
      status: 'Open',
      description: 'Step-free unisex accessible restroom with grab rails and emergency pull cord.'
    },
    {
      id: 'FAC_2',
      name: 'Central RO Drinking Water Dispenser #1',
      category: 'water',
      icon: 'local_drink',
      building: 'Aryabhatta Block',
      floor: 'Ground Floor',
      distanceMeters: 12,
      timeEstimate: '20s walk',
      isAccessible: true,
      status: '24/7',
      description: 'Chilled and ambient purified water dispenser with touchless bottle filler.'
    },
    {
      id: 'FAC_3',
      name: 'Main Glass Elevator Shaft',
      category: 'elevator',
      icon: 'elevator',
      building: 'Aryabhatta Block',
      floor: 'Ground Floor Lobby',
      distanceMeters: 20,
      timeEstimate: '40s walk',
      isAccessible: true,
      status: 'Open',
      description: 'High-speed glass elevator servicing Ground, 1st, and 2nd floors.'
    },
    {
      id: 'FAC_4',
      name: 'Campus Central Mess Dining Hall',
      category: 'food',
      icon: 'restaurant',
      building: 'Central Mess Hub',
      floor: 'Ground Floor',
      distanceMeters: 85,
      timeEstimate: '1 min walk',
      isAccessible: true,
      status: 'Open',
      description: 'Main student dining facility serving fresh breakfast, lunch, and dinner.'
    },
    {
      id: 'FAC_5',
      name: 'Axis Bank 24/7 ATM & Cash Deposit',
      category: 'atm',
      icon: 'local_atm',
      building: 'Market Complex',
      floor: 'Ground Level',
      distanceMeters: 60,
      timeEstimate: '1 min walk',
      isAccessible: true,
      status: '24/7',
      description: 'ATM accepts all major debit/credit cards with UPI cash withdrawal support.'
    },
    {
      id: 'FAC_6',
      name: 'Campus Diagnostics & First Aid Health Post',
      category: 'medical',
      icon: 'local_hospital',
      building: 'Medical Center',
      floor: 'Ground Floor',
      distanceMeters: 140,
      timeEstimate: '2 min walk',
      isAccessible: true,
      status: 'Open',
      description: 'Resident campus doctor, nurse on duty, first-aid, and basic diagnostic equipment.'
    },
    {
      id: 'FAC_7',
      name: 'First Floor North Restrooms',
      category: 'washroom',
      icon: 'wc',
      building: 'Aryabhatta Block',
      floor: 'Floor 1',
      distanceMeters: 45,
      timeEstimate: '1.5 min walk',
      isAccessible: true,
      status: 'Open',
      description: 'Separate gents and ladies restrooms adjacent to classroom A-102.'
    },
    {
      id: 'FAC_8',
      name: 'Second Floor RO Water Station',
      category: 'water',
      icon: 'local_drink',
      building: 'Aryabhatta Block',
      floor: 'Floor 2',
      distanceMeters: 65,
      timeEstimate: '2 min walk',
      isAccessible: true,
      status: '24/7',
      description: 'Located in the computer lab wing corridor between C-202 and C-203.'
    },
    {
      id: 'FAC_9',
      name: 'Centurion Food Court & Coffee Shop',
      category: 'food',
      icon: 'coffee',
      building: 'Food Court Complex',
      floor: 'Ground Floor',
      distanceMeters: 95,
      timeEstimate: '1.5 min walk',
      isAccessible: true,
      status: 'Open',
      description: 'Espresso bar, fresh baked snacks, sandwiches, and fruit juices.'
    },
    {
      id: 'FAC_10',
      name: 'Dr. M.S. Swaminathan Central Library',
      category: 'library',
      icon: 'local_library',
      building: 'Library Block',
      floor: 'Ground & 1st Floor',
      distanceMeters: 130,
      timeEstimate: '2 min walk',
      isAccessible: true,
      status: 'Open',
      description: 'Quiet study carrels, high-speed Wi-Fi, reference section, and lending desk.'
    },
    {
      id: 'FAC_11',
      name: 'Main Gate Two-Wheeler & Car Parking',
      category: 'parking',
      icon: 'local_parking',
      building: 'Main Entrance Precinct',
      floor: 'Outdoor Level',
      distanceMeters: 110,
      timeEstimate: '1.5 min walk',
      isAccessible: true,
      status: '24/7',
      description: 'Security-monitored vehicle parking with EV charging points.'
    }
  ];

  constructor(private router: Router) {}

  get filteredFacilities(): CampusFacility[] {
    return this.facilities.filter(f => {
      const matchesCategory = this.selectedCategory === 'all' || f.category === this.selectedCategory;
      const matchesQuery = !this.searchQuery || 
        f.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        f.building.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        f.description.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }

  setCategory(catId: string) {
    this.selectedCategory = catId;
  }

  navigateTo(facility: CampusFacility) {
    this.router.navigate(['/navigate']);
  }
}
