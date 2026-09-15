import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { VoiceService } from '../../services/voice.service';
import { DirectionStep } from '../../models/route.model';

@Component({
  selector: 'app-voice-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './voice-button.component.html',
  styleUrls: ['./voice-button.component.scss']
})
export class VoiceButtonComponent {
  @Input() directions: DirectionStep[] = [];
  isSpeaking = false;

  constructor(private voiceService: VoiceService) {
    this.voiceService.isSpeaking.subscribe(val => this.isSpeaking = val);
  }

  toggleVoice() {
    if (this.isSpeaking) {
      this.voiceService.stop();
    } else {
      this.voiceService.speakDirections(this.directions);
    }
  }
}
