import { Indisponibilite } from './Indisponibilite.model';


export interface Voiture {
  id: number; // Identifiant unique pour chaque voiture
  image: string; // Chemin ou URL vers l'image de la voiture
  marque: string; // Marque ou modèle de la voiture
  details: string; // Détails ou description de la voiture
  indisponibilites: Indisponibilite[]; // Tableau des périodes d'indisponibilité
}
