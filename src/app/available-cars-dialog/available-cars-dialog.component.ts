import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Voiture } from 'src/Modeles/voiture.model'; // Make sure the path is correct

@Component({
  selector: 'app-available-cars-dialog',
  templateUrl: './available-cars-dialog.component.html',
  styleUrls: ['./available-cars-dialog.component.css']
})
export class AvailableCarsDialogComponent {
  debutReservation: string;
  finReservation: string;
  cars: Voiture[] | undefined;

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<AvailableCarsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { cars: Voiture[], debutReservation: Date, finReservation: Date, userId: number } // Assuming userId is passed as part of the data
  ) {
    this.cars = data.cars;
    this.debutReservation = data.debutReservation.toISOString().split('T')[0];
    this.finReservation = data.finReservation.toISOString().split('T')[0];
  }

  reserverVoiture(voiture: Voiture): void {
    voiture.indisponibilites.push({ "debut": this.debutReservation, "fin": this.finReservation });
    this.http.put<Voiture[]>(`http://localhost:3000/cars/${voiture.id.toString()}`, voiture).subscribe();
    const reservation = {
      userId: JSON.parse(localStorage.getItem('currentUser')!).id, // Make sure userId is passed correctly
      carId: voiture.id,
      image: voiture.image,
      marque: voiture.marque,
      details: voiture.details,
      debut:this.debutReservation,
      fin:this.finReservation


    };
    this.http.post('http://localhost:3000/reservations', reservation).subscribe({
      next: () => this.dialogRef.close(voiture),
      error: (error) => console.error("Failed to make reservation:", error)
    });
  }
}
