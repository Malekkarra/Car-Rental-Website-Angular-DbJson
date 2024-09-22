import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reservation } from 'src/Modeles/reservation.model'; // Ensure path and model correctness
import { Router } from '@angular/router';


@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {
  reservations: Reservation[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadUserReservations();
  }
  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  loadUserReservations(): void {
    const storageItem = localStorage.getItem('currentUser'); // Get the storage item as a variable
    if (storageItem) { // Check if the storage item is not null
      const currentUser = JSON.parse(storageItem); // Safely parse it because it's not null
      if (currentUser && currentUser.id) {
        this.http.get<Reservation[]>(`http://localhost:3000/reservations?userId=${currentUser.id}`)
          .subscribe(reservations => {
            this.reservations = reservations;
          }, error => {
            console.error('Error fetching reservations:', error);
          });
      } else {
        console.error('User ID is missing');
      }
    } else {
      console.error('No user logged in or local storage is empty');
    }
  }
  deleteReservation(id: number): void {
    this.http.delete(`http://localhost:3000/reservations/${id}`).subscribe({
      next: () => {
        this.reservations = this.reservations.filter(reservation => reservation.id !== id);
        console.log('Reservation deleted successfully');
      },
      error: (err) => console.error('Error deleting reservation:', err)
    });
  }
}
