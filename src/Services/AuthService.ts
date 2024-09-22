import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { catchError, map, tap } from 'rxjs/operators';
import * as auth from 'firebase/auth';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/Modeles/User';
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public userClaims: any;
    private usersUrl = 'assets/users.json'; 
    users: User[] = [];
    
  
    constructor(private http: HttpClient, public afAuth: AngularFireAuth) {
      this.initUsers().subscribe(() => {
        //console.log(this.users);
      });
    }
  
    initUsers(): Observable<void> {
      return this.http.get<any>(this.usersUrl).pipe(
        map((response: any) => {
          const users = response.users;
          this.users = users;
          console.log(users);
        })
      );
    }
    
    

    getUserClaims(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.afAuth.onAuthStateChanged(user => {
                if (!!user) {
                    this.setUserClaims(user);
                    resolve(user);
                } else {
                    reject('No user logged in');
                }
            });
        });
    }

    getUserToken(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.afAuth.onAuthStateChanged(user => {
                if (!!user) {
                    user.getIdToken().then(token => resolve(token)).catch(() => reject('No token Available.'));
                } else {
                    reject('No user logged in');
                }
            });
        });
    }

    setUserClaims(user: any): void {
        this.userClaims = user;
    //    this.userClaims$.next(user);
    }


    // doFacebookLogin(): Promise<any> {
    //     return this.afAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    // }
    //
    // doTwitterLogin(): Promise<any> {
    //     return this.afAuth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
    // }

    doGoogleLogin(): Promise<any> {
        return this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
    }

    doLogout(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (!!this.afAuth.currentUser) {
                this.afAuth.signOut().then(() => {
                    this.setUserClaims(null);
                    resolve();
                }, err => reject(err));
            } else {
                reject();
            }
        });
    }

    login(username: string, password: string): Observable<boolean> {
          console.log(this.users)
          const user = this.users.find(
            (u: User) => u.Email.toLowerCase() == username.toLowerCase() && u.Password == password
          );
          if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            return of(true);
          } else {
            return of(false);
          }
    }
    
    
      register(username: string, password: string, fullname: string): Observable<boolean> {
            const existingUser = this.users.find((u:User) => u.Email.toLowerCase() == username.toLowerCase());
            if (existingUser) {
              return of(true);
            } else {
              const newUser = { id: Math.floor(Math.random() * 1000) + 1,Email: username, Password: password,fullname:fullname };
              this.users.push(newUser);
              // Here you might need to send a POST request to update the backend with the new user data
              return of(false);
            }
          }
    
      logout(): void {
        localStorage.removeItem('currentUser');
      }
    
      isLoggedIn(): boolean {
        return localStorage.getItem('currentUser') !== null;
      }
}
 