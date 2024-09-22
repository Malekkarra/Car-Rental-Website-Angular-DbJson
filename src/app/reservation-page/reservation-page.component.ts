import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Voiture } from 'src/Modeles/voiture.model';

@Component({
  selector: 'app-reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrls: ['./reservation-page.component.css'],
})
export class ReservationPageComponent implements OnInit {
  voitures: Voiture[] = [];
  voit: Voiture | undefined;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  goBack(): void {
    // Utilisez la méthode navigate du Router pour revenir à la page souhaitée
    this.router.navigate(['/nos-vehicules']); // Assurez-vous que le chemin correspond à votre configuration de route
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.voit = JSON.parse(params['voiture']);
    });
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      this.showMessage('Veuillez remplir tous les champs requis.');
      return;
    }

    // Pour cet exemple, nous utilisons la première voiture. Remplacez par la logique de sélection de voiture appropriée.
    const voitureChoisie = this.voit;
    console.log(this.voit);
    const debutReservation = new Date(form.value.pickupDate);
    const finReservation = new Date(form.value.dropoffDate);

    const estDisponible = voitureChoisie!.indisponibilites.every((indispo) => {
      const debutIndispo = new Date(indispo.debut);
      const finIndispo = new Date(indispo.fin);

      // Vérifie si la période de réservation chevauche une période d'indisponibilité
      return finReservation <= debutIndispo || debutReservation >= finIndispo;
    });

    if (estDisponible) {
      this.showMessage('Votre réservation est confirmée.');
      voitureChoisie!.indisponibilites.push({ "debut": debutReservation.toISOString().split('T')[0], "fin": finReservation.toISOString().split('T')[0] });
      const reservation = {
        userId: JSON.parse(localStorage.getItem('currentUser')!).id, // Assuming userId is stored in local storage
        carId: voitureChoisie!.id,
        image: voitureChoisie!.image,
        marque: voitureChoisie!.marque,
        details: voitureChoisie!.details,
        debut:debutReservation.toISOString().split('T')[0],
        fin:finReservation.toISOString().split('T')[0]
      };
      this.http.post('http://localhost:3000/reservations', reservation).subscribe(() => {});
      this.http.put(`http://localhost:3000/cars/${voitureChoisie!.id}`, voitureChoisie).subscribe(() => {});
    } else {
      this.showMessage("Désolé, la voiture n'est pas disponible pour les dates sélectionnées.");
    }
  }

  private showMessage(message: string): void {
    this.snackBar.open(message, 'Fermer', { duration: 3000 });
  }
}
