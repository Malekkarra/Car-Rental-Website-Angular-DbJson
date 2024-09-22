import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AddCarDialogComponent } from './add-car-dialog/add-car-dialog.component';
import { EditCarDialogComponent } from './edit-car-dialog/edit-car-dialog.component';
import { Voiture } from 'src/Modeles/voiture.model';
import { UserListDialogComponent } from '../user-list-dialog/user-list-dialog.component';
import { Reservation } from 'src/Modeles/reservation.model';
import { ReservationsDialogComponent } from './reservations-dialog/reservations-dialog.component';





@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  cars: Voiture[] = [];

  private baseUrl = 'http://localhost:3000'; // This should match your json-server URL

  constructor(
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog,
    private dialogedit: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars(): void {
    this.http.get<Voiture[]>(`${this.baseUrl}/cars`).subscribe({
      next: (cars) => this.cars = cars,
      error: (error) => console.error('Error fetching cars', error)
    });
  }
  openUserListDialog(): void {
    const dialogRef = this.dialog.open(UserListDialogComponent, {
      width: '250px'
    });
  

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openReservationDialog(): void {
    this.http.get<Reservation[]>(`${this.baseUrl}/reservations`).subscribe({
      next: (reservations) => {
        this.dialog.open(ReservationsDialogComponent, {
          width: '500px',
          data: { reservations }
        });
      },
      error: (error) => console.error('Error fetching reservations', error)
    });
  }
  addCar(): void {
    const dialogRef = this.dialog.open(AddCarDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveCar(result);
      }
    });
  }

  saveCar(carData: Voiture): void {
    
    carData.image='assets/'+carData.image.split('\\')[2];
    console.log(carData.indisponibilites)
    var carDataReady ={
      "id": carData.id,
      "image": carData.image,
      "marque": carData.marque,
      "details": carData.details,
      "indisponibilites": [
        carData.indisponibilites
      ]
    }
    console.log(carDataReady);
    this.http.post<Voiture>(`${this.baseUrl}/cars`, carData).subscribe({
      next: (newCar) => {
        this.cars.push(newCar);
        this.snackBar.open('Car added successfully', 'Close', { duration: 3000 });
      },
      error: () => this.snackBar.open('Failed to add car', 'Close', { duration: 3000 })
    });
  }

  editCar(car: Voiture): void {
    const dialogRef = this.dialogedit.open(EditCarDialogComponent, {
      width: '300px',
      data: car  // Pass the car data for editing
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result)
        this.updateCar(result);
        this.loadCars(); 
      }
    });
  }

updateCar(carData: Voiture): void {
  console.log(carData);
  this.http.put<Voiture>(`${this.baseUrl}/cars/${carData.id}`, carData).subscribe({
    next: (updatedCar) => {
      const index = this.cars.findIndex(c => c.id === updatedCar.id);
      if (index !== -1) {
        this.cars[index].details=updatedCar.details;
        this.cars[index].marque=updatedCar.marque; // Update the local data to reflect changes
      }
      this.snackBar.open('Car updated successfully', 'Close', { duration: 3000 });
    },
    error: () => this.snackBar.open('Failed to update car', 'Close', { duration: 3000 })
  });
}
  

  deleteCar(carId: number): void {
    this.http.delete(`${this.baseUrl}/cars/${carId}`).subscribe({
      next: () => {
        this.cars = this.cars.filter(car => car.id !== carId);
        this.snackBar.open('Car deleted successfully', 'Close', { duration: 3000 });
      },
      error: () => this.snackBar.open('Failed to delete car', 'Close', { duration: 3000 })
    });
  }

  logout(): void {
    this.router.navigate(['/login']);
  }
}
