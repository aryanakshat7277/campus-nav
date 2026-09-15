import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IndoorPositionEngine } from '../../services/indoor-position.engine';

@Component({
  selector: 'app-position-indicator',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <a routerLink="/admin/diagnostics" class="indicator" [ngClass]="state.toLowerCase()" title="Click to view signal diagnostics">
      <span class="dot">●</span>
      <span class="text">
        {{ state === 'CONFIRMED' ? 'Location confirmed' : state === 'ESTIMATED' ? 'Location estimated' : 'Accuracy reduced' }}
      </span>
    </a>
  `,
  styles: [`
    .indicator {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #ffffff;
      padding: 5px 12px;
      border-radius: 20px;
      border: 1px solid #E0E0E0;
      font-size: 11px;
      font-weight: 700;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      }

      .dot { font-size: 10px; }
      
      &.confirmed {
        color: #2E7D32;
        background: #E8F5E9;
        border-color: #A5D6A7;
        .dot { color: #2E7D32; }
      }
      &.estimated {
        color: #E65100;
        background: #FFF8E1;
        border-color: #FFE082;
        .dot { color: #F57F17; }
      }
      &.uncertain {
        color: #C62828;
        background: #FFEBEE;
        border-color: #FFCDD2;
        .dot { color: #C62828; }
      }
    }
  `]
})
export class PositionIndicatorComponent implements OnInit {
  state = 'CONFIRMED';

  constructor(private positionEngine: IndoorPositionEngine) {}

  ngOnInit(): void {
    this.positionEngine.confidenceState$.subscribe(s => this.state = s);
  }
}
