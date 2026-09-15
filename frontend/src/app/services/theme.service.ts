import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark' | 'high-contrast';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  // Light mode only — no dark or high-contrast themes
  private currentTheme = new BehaviorSubject<Theme>('light');
  public theme$ = this.currentTheme.asObservable();
  public currentTheme$ = this.currentTheme.asObservable();

  constructor() {
    // Ensure clean state — remove any legacy dark theme classes
    document.body.classList.remove('dark-theme', 'high-contrast-theme');
  }

  getTheme(): Theme {
    return 'light';
  }

  setTheme(_theme: Theme): void {
    // Always light mode — no-op for non-light themes
    this.currentTheme.next('light');
    document.body.classList.remove('dark-theme', 'high-contrast-theme');
  }

  toggleTheme(): void {
    // No toggle — always light
  }
}
