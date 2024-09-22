import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-add-car-dialog',
  templateUrl: './add-car-dialog.component.html',
  styleUrls: ['./add-car-dialog.component.css']
})
export class AddCarDialogComponent {
  carForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddCarDialogComponent>
  ) {
    this.carForm = this.fb.group({
      image: ['', Validators.required],
      marque: ['', Validators.required],
      details: ['', Validators.required],
      indisponibilites: this.fb.array([])  // Start with an empty array
    });
  }

  get indisponibilites(): FormArray {
    return this.carForm.get('indisponibilites') as FormArray;
  }

  addIndisponibilite(): void {
    const indispoGroup = this.fb.group({
      debut: ['', Validators.required],
      fin: ['', Validators.required]
    });
    this.indisponibilites.push(indispoGroup);
  }

  removeIndisponibilite(index: number): void {
    this.indisponibilites.removeAt(index);
  }

  onSubmit(): void {
    if (this.carForm.valid) {
      this.dialogRef.close(this.carForm.value);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
