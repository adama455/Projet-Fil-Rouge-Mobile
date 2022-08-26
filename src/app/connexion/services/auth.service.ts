import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, from, of, Subject } from 'rxjs';
// import { from } from 'rxjs';
import { AlertController, Platform } from '@ionic/angular';
import jwt_decode from 'jwt-decode';

import { Storage } from '@capacitor/storage';
import { map, tap, switchMap } from 'rxjs/operators';

const TOKEN_KEY = 'jwt-token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user: Observable<any>;
  rolesUser:any
  // private userData = new BehaviorSubject(null);

  url = 'http://127.0.0.1:8000/api/login';
  user_url = 'http://127.0.0.1:8000/api/users';
  utiliateur: any;

  // Init with null to filter out the first value in a guard!
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    null
  );
  token:any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertCtrl: AlertController
  ) {
    this.loadToken();
  }

  async loadToken() {
    const token = await Storage.get({ key: TOKEN_KEY });
    if (token && token.value) {
      console.log('set token: ', token.value);
      this.token = token.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }
  
  login(user: any): Observable<any> {
    return this.http.post<any>(this.url, user).pipe(
      map((data: any) => data.token),
      switchMap((token) => {
        this.rolesUser = this.getDecodedAccessToken(JSON.stringify(token)).roles; //recuperation du role de l'utilisateur
        console.log(this.rolesUser);
        return from(Storage.set({ key: TOKEN_KEY, value: token }));
      }),
      tap(async (_) => {
        if (this.rolesUser[0] == 'ROLE_GESTIONNAIRE') { //redirection admin
          const alert = await this.alertCtrl.create({
            header: 'not connect',
            message: 'un gestionnaire ne doit pas se connecter!.',
            buttons: ['OK'],
          });
          await alert.present();
          // this.isAuthenticated.next(false);
        } else if (this.rolesUser[0] == 'ROLE_CLIENT') { //redirection client
          this.router.navigateByUrl('catalogue', { replaceUrl: true });

          // this.isAuthenticated.next(true);
        } else {
          this.router.navigateByUrl('livraison'); //redirection livreur
          // this.isAuthenticated.next(true);
        }
        // this.router.navigateByUrl('catalogue');
      })
    );
  }

  getToken(){
    return this.getDecodedAccessToken(JSON.stringify(this.token))
    // return this.token;
  }
    getUser(login:any){
      return this.http.get(this.user_url + '?login=' + login);
    }

  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    return Storage.remove({ key: TOKEN_KEY });
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}
//   login(user: any) {
//     return this.http.post<any>(this.url, user).subscribe(async (token) => {
//       console.log(JSON.stringify(token.token));
//       let rolesUser = this.getDecodedAccessToken(JSON.stringify(token)).roles; //recuperation du role de l'utilisateur
//       console.log(rolesUser);
//       if (rolesUser[0] == 'ROLE_GESTIONNAIRE') {
//         //redirection admin
//         const alert = await this.alertCtrl.create({
//           header: 'not connect',
//           message: 'un gestionnaire ne doit pas se connecter!.',
//           buttons: ['OK']
//         });
//         await alert.present();

//       } else if (rolesUser[0] == 'ROLE_CLIENT') {
//         //redirection client
//         this.router.navigateByUrl('catalogue');
//       } else {
//         this.router.navigateByUrl('livraison'); //redirection livreur
//       }
//     });
//   }

//   getDecodedAccessToken(token: string): any {
//     try {
//       return jwt_decode(token);
//     } catch (Error) {
//       return null;
//     }
//   }

//  logout(): Promise<void> {
//    this.isAuthenticated.next(false);
//    return localStorage.remove({key: TOKEN_KEY});
//  }

// constructor(
//   private http: HttpClient,
//   private router: Router,
//   private alertCtrl: AlertController,
// ) {}

// login(user: any) {
//   return this.http.post<any>(this.url, user).subscribe(async (token) => {
//     console.log(JSON.stringify(token.token));
//     let rolesUser = this.getDecodedAccessToken(JSON.stringify(token)).roles; //recuperation du role de l'utilisateur
//     console.log(rolesUser);
//     if (rolesUser[0] == 'ROLE_GESTIONNAIRE') {
//       //redirection admin
//       const alert = await this.alertCtrl.create({
//         header: 'not connect',
//         message: 'un gestionnaire ne doit pas se connecter!.',
//         buttons: ['OK']
//       });
//       await alert.present();

//     } else if (rolesUser[0] == 'ROLE_CLIENT') {
//       //redirection client
//       this.router.navigateByUrl('catalogue');
//     } else {
//       this.router.navigateByUrl('livraison'); //redirection livreur
//     }
//   });
// }

// getDecodedAccessToken(token: string): any {
//   try {
//     return jwt_decode(token);
//   } catch (Error) {
//     return null;
//   }
// }

// getUser() {
//   return this.userData.getValue();
// }

// logout() {
//   localStorage.removeItem(TOKEN_KEY)
//     this.router.navigateByUrl('/');
//     this.userData.next(null);
// };

// }
