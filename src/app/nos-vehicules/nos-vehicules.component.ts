import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Voiture } from 'src/Modeles/voiture.model';

@Component({
  selector: 'app-nos-vehicules',
  templateUrl: './nos-vehicules.component.html',
  styleUrls: ['./nos-vehicules.component.css'],
})
// In your nos-vehicules.component.ts
export class NosVehiculesComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) {}
  cars: Voiture[] = [];

  goToReservationPage(voiture: Voiture): void {
    const serializedVoiture = JSON.stringify(voiture);
    console.log(serializedVoiture);
    this.router.navigate(['/reservation', { ['voiture']: serializedVoiture }]);
  }
  
  ngOnInit(): void {
    this.http.get<Voiture[]>('http://localhost:3000/cars').subscribe((cars) => {
      this.cars = cars;
      console.log(this.cars);
    });
  }
}
