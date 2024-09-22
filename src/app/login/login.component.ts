import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/Services/AuthService';
import { CustomSnackbarService } from 'src/Services/custom-snackbar.service';
import { ApiService } from 'src/Services/api-service.service';
import { Md5 } from 'ts-md5';
import { User } from 'src/Modeles/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isSigningUp: boolean = false;
  username: string = '';
  password: string = '';
  newName: string = '';  // Assuming this is fullname as per your User model
  newUsername: string = '';
  newPassword: string = '';
  errorMessageRegistre: string | null = null;
  errorMessageLogin: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbarService: CustomSnackbarService,
    private apiService: ApiService
  ) {}
//Démarre la connexion Google et redirige vers le tableau de bord en cas d'authentification réussie
  signin(): void {
    this.authService.doGoogleLogin().then(() => {
      this.router.navigate(['/dashboard']);
    });
  }
//Valide le formulaire de connexion, vérifie si l'utilisateur est un administrateur, 
//et sinon, vérifie les informations saisies par l'utilisateur par rapport à la liste des utilisateurs récupérée depuis l'API. 
//Si un utilisateur correspondant est trouvé, l'utilisateur est connecté et redirigé vers le tableau de bord.
  login(): void {
    if (!this.username || !this.password) {
      this.errorMessageLogin = 'Please enter username and password.';
      return;
    } else if (
      this.username.toLowerCase() == 'admin@admin.com' &&
      this.password.toLowerCase() == 'admin123'
    ) {
      this.router.navigate(['/admin']);
    } else {
      this.apiService.getData('users').subscribe((users: User[]) => { // Effectue une requête GET vers l'endpoint 'users' pour récupérer tous les utilisateurs.
        const user = users.find(u => //pour trouver un utilisateur correspondant aux critères de recherche 
          u.Email.toLowerCase() === this.username.toLowerCase() && 
          u.Password === Md5.hashStr(this.password).toString()
        );
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));// Stocke les informations de l'utilisateur authentifié dans le stockage local du navigateur, 
          //ce qui permet de conserver les informations de l'utilisateur entre les sessions.
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessageLogin = 'Email or password is wrong!';
        }
      });
    }
  }
//Valide le formulaire d'inscription, vérifie si l'utilisateur est déjà enregistré, 
//et sinon, crée un nouvel objet utilisateur avec les détails fournis. 
//Le nouvel utilisateur est ensuite sauvegardé dans l'API, 
//et en cas d'inscription réussie, l'utilisateur est connecté et redirigé vers le tableau de bord.
  register(): void {
    this.isSigningUp = true; //processus d'inscription est en cours.
    if (!this.newUsername || !this.newPassword || !this.newName) {
      this.errorMessageRegistre = 'Please enter all required fields.';
      this.isSigningUp = false;//indiquer que l'inscription a échoué, et il retourne pour arrêter le processus.
      return;
    }
    this.apiService.getData('users').subscribe((users: User[]) => {
      if (users.some(user => user.Email.toLowerCase() === this.newUsername.toLowerCase())) {
        this.errorMessageRegistre = 'You are already registered!';
        this.isSigningUp = false;
      } else {
        const newUser: User = {
          id: users.length + 1, // Assigning a new ID based on array length, consider a more robust ID generation strategy
          Email: this.newUsername.toLowerCase(),
          Password: Md5.hashStr(this.newPassword).toString(),
          fullname: this.newName
        };
        this.apiService.postData('users', newUser).subscribe((createdUser) => {
          localStorage.setItem('currentUser', JSON.stringify(createdUser));
          this.router.navigate(['/dashboard']);
        });
      }
    });
  }
}