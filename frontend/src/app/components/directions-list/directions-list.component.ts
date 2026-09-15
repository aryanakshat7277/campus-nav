import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { DirectionStep } from '../../models/route.model';
import { VoiceButtonComponent } from '../voice-button/voice-button.component';

@Component({
  selector: 'app-directions-list',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, VoiceButtonComponent],
  templateUrl: './directions-list.component.html',
  styleUrls: ['./directions-list.component.scss']
})
export class DirectionsListComponent {
  @Input() directions: DirectionStep[] = [];

  getIconForInstruction(instruction: string): string {
    const lower = instruction.toLowerCase();
    if (lower.includes('left')) return 'turn_left';
    if (lower.includes('right')) return 'turn_right';
    if (lower.includes('elevator')) return 'elevator';
    if (lower.includes('stairs')) return 'stairs';
    if (lower.includes('enter')) return 'door_front';
    if (lower.includes('arrive')) return 'place';
    return 'arrow_upward';
  }
}
