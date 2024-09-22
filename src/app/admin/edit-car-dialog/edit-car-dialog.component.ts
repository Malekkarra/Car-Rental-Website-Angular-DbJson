import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-car-dialog',
  templateUrl: './edit-car-dialog.component.html',
  styleUrls: ['./edit-car-dialog.component.css']
})
export class EditCarDialogComponent implements OnInit {
  editCarForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditCarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.editCarForm = this.fb.group({
      id:data.id,
      marque: [data.marque, Validators.required],
      details: [data.details, Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.editCarForm.valid) {
      this.dialogRef.close(this.editCarForm.value);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
