import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-floor-selector',
  standalone: true,
  imports: [CommonModule, MatButtonToggleModule],
  templateUrl: './floor-selector.component.html',
  styleUrls: ['./floor-selector.component.scss']
})
export class FloorSelectorComponent {
  @Input() floors: string[] = ['B', 'G', '1', '2', '3'];
  @Input() currentFloor: string = 'G';
  @Output() floorChange = new EventEmitter<string>();

  onFloorChange(val: string) {
    this.currentFloor = val;
    this.floorChange.emit(val);
  }
}
