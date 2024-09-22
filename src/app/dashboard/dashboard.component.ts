import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AvailableCarsDialogComponent } from '../available-cars-dialog/available-cars-dialog.component';
import { Router } from '@angular/router';



interface Indisponibilite {
  debut: string;
  fin: string;
}

interface Voiture {
  id: number;
  image: string;
  marque: string;
  details: string;
  indisponibilites: Indisponibilite[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  cars: Voiture[] = [];
  voituresDisponibles: Voiture[] = [];
  pickupDate!: string;
  dropoffDate!: string;
  reservationConfirmee: boolean = false;

  constructor(
    private router: Router,
    private http: HttpClient, 
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  logout(): void {
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.loadCars();
    
  }
  

  loadCars(): void {
    this.http.get<{ cars: Voiture[] }>('/assets/_db.json').subscribe(data => {
      this.cars = data.cars;
    });
  }

  trouverVotreVoiture(): void {
    if (!this.pickupDate || !this.dropoffDate) {
      this.snackBar.open('Veuillez sélectionner des dates valides.', 'Fermer', {
        duration: 3000,
      });
      return;
    }
    const debutReservation = new Date(this.pickupDate);
  const finReservation = new Date(this.dropoffDate);
  

  this.voituresDisponibles = this.cars.filter(car => 
    car.indisponibilites && car.indisponibilites.every(indispo => {
      const debutIndispo = new Date(indispo.debut);
      const finIndispo = new Date(indispo.fin);
      return finReservation < debutIndispo || debutReservation > finIndispo;
    })
  );
  const dialogRef = this.dialog.open(AvailableCarsDialogComponent, {
    width: '80%',
    data: { cars: this.voituresDisponibles, debutReservation, finReservation } // Pass dates along with cars
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.snackBar.open(`Réservation confirmée pour ${result.marque}`, 'Fermer', {
        duration: 3000,
      });
      this.reservationConfirmee = true;
    }
  });
}
}
