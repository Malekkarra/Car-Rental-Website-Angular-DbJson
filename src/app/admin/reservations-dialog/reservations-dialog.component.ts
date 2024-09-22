import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Reservation } from 'src/Modeles/reservation.model'; // Assuming this is the model path

@Component({
  selector: 'app-reservations-dialog',
  templateUrl: './reservations-dialog.component.html',
  styleUrls: ['./reservations-dialog.component.css']
})
export class ReservationsDialogComponent {
  reservations: Reservation[];

  constructor(
    public dialogRef: MatDialogRef<ReservationsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { reservations: Reservation[] }
  ) {
    this.reservations = data.reservations;
  }

  close(): void {
    this.dialogRef.close();
  }
}
