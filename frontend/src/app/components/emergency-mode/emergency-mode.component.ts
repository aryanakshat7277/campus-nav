import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { VoiceService } from '../../services/voice.service';

export interface EmergencyOption {
  id: string;
  title: string;
  category: string;
  icon: string;
  destination: string;
  locationDetails: string;
  distanceMeters: number;
  estimatedMinutes: number;
  phone: string;
  steps: string[];
}

@Component({
  selector: 'app-emergency-mode',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
  ],
  templateUrl: './emergency-mode.component.html',
  styleUrls: ['./emergency-mode.component.scss']
})
export class EmergencyModeComponent {
  selectedEmergency: EmergencyOption | null = null;

  emergencies: EmergencyOption[] = [
    {
      id: 'medical',
      title: 'Nearest Medical Center',
      category: 'First Aid & Health',
      icon: 'medical_services',
      destination: 'Campus Diagnostics & Health Center',
      locationDetails: 'Ground Floor, Health Block (near Central Library)',
      distanceMeters: 180,
      estimatedMinutes: 2,
      phone: '+91 6863-252244',
      steps: [
        'Exit current room into main corridor immediately',
        'Take nearest stairs or elevator down to Ground Floor',
        'Exit building through North Entrance toward Central Garden',
        'Walk 80m south-east: Medical Diagnostics Center is straight ahead'
      ]
    },
    {
      id: 'security',
      title: 'Nearest Security Office',
      category: 'Campus Security',
      icon: 'shield',
      destination: 'Main Gate Security Control Station',
      locationDetails: 'Main Entrance Gate Post #1',
      distanceMeters: 120,
      estimatedMinutes: 1.5,
      phone: '+91 6863-252211',
      steps: [
        'Head towards Ground Floor main building exit',
        'Proceed along main paved boulevard south toward Main Gate',
        'Security control room is on the right side of the main gate barrier'
      ]
    },
    {
      id: 'exit',
      title: 'Emergency Fire Exit',
      category: 'Evacuation Route',
      icon: 'door_sliding',
      destination: 'North Wing Emergency Stairwell & Fire Door',
      locationDetails: 'Aryabhatta Block North Corridor End',
      distanceMeters: 25,
      estimatedMinutes: 0.5,
      phone: '101 (Fire Department)',
      steps: [
        'Turn left immediately into north corridor',
        'Follow green illuminated Exit signage',
        'Push emergency panic bar on fire door to exit to open grounds'
      ]
    },
    {
      id: 'assembly',
      title: 'Campus Assembly Area',
      category: 'Safety Zone',
      icon: 'groups',
      destination: 'Central Sports Complex Field',
      locationDetails: 'Open Athletic Grounds (Clear of All Structures)',
      distanceMeters: 240,
      estimatedMinutes: 3,
      phone: 'Campus Safety Coordinator',
      steps: [
        'Evacuate building via nearest ground exit',
        'Do not use elevators during fire alarms',
        'Walk toward northern sports complex: assemble at designated sector A'
      ]
    }
  ];

  campusHelplines = [
    { name: 'Campus Security Control', number: '+91 6863-252211', icon: 'security' },
    { name: 'Campus Medical Diagnostics', number: '+91 6863-252244', icon: 'local_hospital' },
    { name: 'Ambulance Helpline', number: '108', icon: 'emergency' },
    { name: 'Police Control Room', number: '100', icon: 'local_police' },
    { name: 'Fire & Rescue', number: '101', icon: 'fire_extinguisher' }
  ];

  constructor(private voiceService: VoiceService, private router: Router) {}

  selectEmergency(e: EmergencyOption) {
    this.selectedEmergency = e;
    this.voiceService.speak(`Emergency mode activated for ${e.title}. Evacuate toward ${e.destination}. Distance is ${e.distanceMeters} meters.`);
  }

  startEmergencyRoute(e: EmergencyOption) {
    this.voiceService.speak(`Proceeding to ${e.destination}. Follow step one: ${e.steps[0]}`);
    this.router.navigate(['/navigate']);
  }
}
