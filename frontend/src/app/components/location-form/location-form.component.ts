import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { Location } from '../../models/location.model';
import { CATEGORIES } from '../../utils/constants';

@Component({
  selector: 'app-location-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatInputModule, MatSelectModule, MatCheckboxModule, MatButtonModule],
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss']
})
export class LocationFormComponent {
  form: FormGroup;
  categories = CATEGORIES;
  isEdit: boolean;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<LocationFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Location | null
  ) {
    this.isEdit = !!data;
    this.form = this.fb.group({
      id: [data?.id || ''],
      name: [data?.name || '', Validators.required],
      category: [data?.category || '', Validators.required],
      buildingId: [data?.buildingId || ''],
      floor: [data?.floor || 'G'],
      description: [data?.description || ''],
      latitude: [data?.latitude || '', Validators.required],
      longitude: [data?.longitude || '', Validators.required],
      isAccessible: [data?.isAccessible || false],
      isDelivery: [data?.isDelivery || false]
    });
  }

  save() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
