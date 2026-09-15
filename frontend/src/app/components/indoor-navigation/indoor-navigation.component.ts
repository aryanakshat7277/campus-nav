import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IndoorPositionEngine } from '../../services/indoor-position.engine';
import { DemoSimulationService } from '../../services/demo-simulation.service';
import { VoiceService } from '../../services/voice.service';
import { Subscription } from 'rxjs';

export interface NavStep {
  type: 'straight' | 'turn_left' | 'turn_right' | 'elevator' | 'stairs' | 'arrive' | 'door_front';
  instruction: string;
  subtext: string;
  distance: number;
  timeSeconds: number;
  landmark?: string;
  floor: number;
  actionIcon: string;
}

@Component({
  selector: 'app-indoor-navigation',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressBarModule,
    MatTooltipModule
  ],
  templateUrl: './indoor-navigation.component.html',
  styleUrls: ['./indoor-navigation.component.scss']
})
export class IndoorNavigationComponent implements OnInit, OnDestroy {
  destinationName = 'Advanced AI & Cloud Lab (C-204)';
  buildingName = 'CSE Block (Aryabhatta Block)';
  currentFloor = 0;
  targetFloor = 2;
  totalDistance = 145; // meters
  estimatedMinutes = 3;
  confidenceState: 'CONFIRMED' | 'ESTIMATED' | 'UNCERTAIN' = 'CONFIRMED';
  confidencePercentage = 88;
  isSimulating = false;
  isVoiceActive = true;
  isSpeaking = false;
  currentStepIndex = 0;
  deviationAlert: string | null = null;
  hasArrived = false;
  compassHeading = 92;

  // View Mode: 2D Blueprint vs 2.5D Isometric Model
  viewMode: 'blueprint' | 'isometric' = 'blueprint';

  // Elevator Sequence State Machine
  isElevatorActive = false;
  elevatorFloorDisplay = 'G';
  elevatorStatusText = 'DOORS CLOSING';
  elevatorDoorState: 'open' | 'closed' = 'open';

  // Arrival Celebration Modal State
  showArrivalModal = false;
  confettiPieces = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    left: (i * 2.8) % 100,
    delay: (i * 0.12) % 2.5,
    size: 8 + (i % 8),
    color: ['#1565C0', '#00897B', '#FFB300', '#4CAF50', '#E91E63', '#9C27B0'][i % 6]
  }));

  // Floor List for Level Selector
  availableFloors = [
    { label: 'B', num: -1, name: 'Basement Parking & Robotics' },
    { label: 'G', num: 0, name: 'Ground Floor Foyer & Labs' },
    { label: '1', num: 1, name: 'Floor 1 Faculty & Classrooms' },
    { label: '2', num: 2, name: 'Floor 2 AI & CS Labs' },
    { label: '3', num: 3, name: 'Floor 3 Research Centres' }
  ];

  // Pre-calculated avatar SVG (x, y, heading) for 800x480 architectural canvas
  stepCoordinates = [
    { x: 400, y: 410, heading: 0 },    // Step 0: Main Porch Entrance
    { x: 400, y: 240, heading: 0 },    // Step 1: Central Corridor Ground Floor
    { x: 400, y: 130, heading: 0 },    // Step 2: Elevator Ground Floor
    { x: 400, y: 240, heading: 90 },   // Step 3: Floor 2 North Wing Foyer Turn
    { x: 540, y: 240, heading: 90 },   // Step 4: Floor 2 East Corridor past Water Cooler
    { x: 630, y: 310, heading: 180 }   // Step 5: Arrived at C-204 Lab Entry
  ];

  // Complete CUTM Paralakhemundi Indoor Route
  steps: NavStep[] = [
    {
      type: 'door_front',
      instruction: 'Enter Aryabhatta Block via Main Porch',
      subtext: 'Proceed past the reception foyer on Ground Floor',
      distance: 15,
      timeSeconds: 12,
      landmark: 'Main Porch & Security Desk',
      floor: 0,
      actionIcon: 'door_front'
    },
    {
      type: 'straight',
      instruction: 'Walk along Ground Floor Central Corridor',
      subtext: 'Pass Chemistry Lab (A-001) & Main Notice Board on your left',
      distance: 25,
      timeSeconds: 20,
      landmark: 'Ground Floor Notice Board',
      floor: 0,
      actionIcon: 'straight'
    },
    {
      type: 'elevator',
      instruction: 'Take Central Glass Elevator to Floor 2',
      subtext: 'Select Floor 2 in elevator cabin. Wheelchair accessible route.',
      distance: 10,
      timeSeconds: 35,
      landmark: 'North Glass Elevator',
      floor: 0,
      actionIcon: 'elevator'
    },
    {
      type: 'turn_left',
      instruction: 'Exit elevator and turn left into North Wing',
      subtext: 'Floor 2 - School of Engineering & Technology corridor',
      distance: 20,
      timeSeconds: 15,
      landmark: 'Floor 2 Directory Sign',
      floor: 2,
      actionIcon: 'turn_left'
    },
    {
      type: 'straight',
      instruction: 'Continue straight past Water Cooler & Restrooms',
      subtext: 'Pass Classroom A-201 and Server Room on your right',
      distance: 45,
      timeSeconds: 32,
      landmark: 'Second Floor Water Cooler & Restrooms',
      floor: 2,
      actionIcon: 'straight'
    },
    {
      type: 'arrive',
      instruction: 'Arrive at Destination: Room C-204',
      subtext: 'Advanced AI & Cloud Computing Lab is on your right side',
      distance: 5,
      timeSeconds: 5,
      landmark: 'Room C-204 Entrance Plaque',
      floor: 2,
      actionIcon: 'check_circle'
    }
  ];

  private subs = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private positionEngine: IndoorPositionEngine,
    public demoService: DemoSimulationService,
    private voiceService: VoiceService
  ) {}

  ngOnInit(): void {
    // Check route query params
    this.route.queryParams.subscribe(params => {
      if (params['name']) this.destinationName = params['name'];
      if (params['building']) this.buildingName = params['building'];
      if (params['floor'] !== undefined) this.targetFloor = parseInt(params['floor'], 10);
    });

    this.subs.add(
      this.positionEngine.getCurrentPosition().subscribe(pos => {
        if (pos) {
          this.confidenceState = pos.confidenceState;
          this.confidencePercentage = Math.round(pos.confidence * 100);
          if (pos.floorNumber !== undefined) {
            this.currentFloor = pos.floorNumber;
          }
        }
      })
    );

    this.subs.add(
      this.positionEngine.heading$.subscribe(h => {
        this.compassHeading = h;
      })
    );

    this.subs.add(
      this.voiceService.isSpeaking.subscribe(speaking => {
        this.isSpeaking = speaking;
      })
    );

    this.subs.add(
      this.demoService.isSimulating.subscribe(sim => {
        this.isSimulating = sim;
      })
    );

    this.subs.add(
      this.demoService.currentStep.subscribe(step => {
        const mappedIndex = Math.min(Math.floor((step / 9) * this.steps.length), this.steps.length - 1);
        this.currentStepIndex = mappedIndex;
        this.currentFloor = this.currentStep.floor;
        const reached = mappedIndex === this.steps.length - 1;
        if (reached && !this.hasArrived) {
          this.hasArrived = true;
          this.openArrivalModal();
        } else if (!reached) {
          this.hasArrived = false;
        }

        if (this.isVoiceActive && this.isSimulating) {
          this.speakCurrentStep();
        }
      })
    );

    this.subs.add(
      this.demoService.deviationAlert$.subscribe(alert => {
        this.deviationAlert = alert;
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.voiceService.stop();
  }

  get currentStep(): NavStep {
    return this.steps[this.currentStepIndex];
  }

  getUserAvatarX(): number {
    return this.stepCoordinates[this.currentStepIndex]?.x ?? 400;
  }

  getUserAvatarY(): number {
    return this.stepCoordinates[this.currentStepIndex]?.y ?? 250;
  }

  getUserHeading(): number {
    return this.stepCoordinates[this.currentStepIndex]?.heading ?? this.compassHeading;
  }

  toggleViewMode(mode?: 'blueprint' | 'isometric'): void {
    if (mode) {
      this.viewMode = mode;
    } else {
      this.viewMode = this.viewMode === 'blueprint' ? 'isometric' : 'blueprint';
    }
  }

  startElevatorRide(): void {
    if (this.isElevatorActive) return;
    this.isElevatorActive = true;
    this.elevatorFloorDisplay = 'G';
    this.elevatorStatusText = 'DOORS CLOSING...';
    this.elevatorDoorState = 'closed';

    setTimeout(() => {
      this.elevatorStatusText = 'ASCENDING ▲ LEVEL 1';
      this.elevatorFloorDisplay = '1';
    }, 1300);

    setTimeout(() => {
      this.elevatorStatusText = 'ASCENDING ▲ LEVEL 2 (TARGET)';
      this.elevatorFloorDisplay = '2';
    }, 2600);

    setTimeout(() => {
      this.elevatorStatusText = 'ARRIVED AT FLOOR 2 • OPENING DOORS';
      this.elevatorDoorState = 'open';
    }, 3800);

    setTimeout(() => {
      this.isElevatorActive = false;
      this.currentFloor = 2;
      this.currentStepIndex = 3;
      this.hasArrived = false;
      if (this.isVoiceActive) this.speakCurrentStep();
    }, 4900);
  }

  openArrivalModal(): void {
    this.showArrivalModal = true;
  }

  closeArrivalModal(): void {
    this.showArrivalModal = false;
  }

  nextStep(): void {
    if (this.currentStepIndex < this.steps.length - 1) {
      this.currentStepIndex++;
      this.currentFloor = this.currentStep.floor;
      if (this.currentStepIndex === this.steps.length - 1) {
        this.hasArrived = true;
        this.openArrivalModal();
      } else {
        this.hasArrived = false;
      }
      if (this.isVoiceActive) this.speakCurrentStep();
    }
  }

  prevStep(): void {
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
      this.currentFloor = this.currentStep.floor;
      this.hasArrived = false;
      if (this.isVoiceActive) this.speakCurrentStep();
    }
  }

  switchFloor(floorNum: number): void {
    this.currentFloor = floorNum;
    this.demoService.changeFloor(floorNum);
  }

  toggleSimulation(): void {
    if (this.isSimulating) {
      this.demoService.stopSimulation();
    } else {
      this.demoService.startSimulation();
    }
  }

  toggleVoice(): void {
    this.isVoiceActive = !this.isVoiceActive;
    if (this.isVoiceActive) {
      this.speakCurrentStep();
    } else {
      this.voiceService.stop();
    }
  }

  speakCurrentStep(): void {
    const text = `${this.currentStep.instruction}. ${this.currentStep.subtext}`;
    this.voiceService.speak(text);
  }

  recenter(): void {
    this.currentFloor = this.positionEngine.floor$.value;
  }
}
