import { Injectable } from '@angular/core';
import { Voiture } from '../Modeles/voiture.model'; // Importez votre modèle de Voiture



@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private voituresReservees: Voiture[] = [];

  ajouterVoitureReservee(voiture: Voiture) {
    this.voituresReservees.push(voiture);
  }

  obtenirVoituresReservees(): Voiture[] {
    return this.voituresReservees;
  }
}
