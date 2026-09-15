import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DirectionStep } from '../models/route.model';

@Injectable({ providedIn: 'root' })
export class VoiceService {
  private synth = window.speechSynthesis;
  public isSpeaking = new BehaviorSubject<boolean>(false);

  constructor() {}

  speak(text: string) {
    this.stop();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => this.isSpeaking.next(false);
    this.isSpeaking.next(true);
    this.synth.speak(utterance);
  }

  stop() {
    this.synth.cancel();
    this.isSpeaking.next(false);
  }

  speakDirections(directions: DirectionStep[]) {
    this.stop();
    const fullText = directions.map(d => d.instruction).join('. ');
    this.speak(fullText);
  }
}
