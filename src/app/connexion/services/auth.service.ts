import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, from, of, Subject } from 'rxjs';
// import { from } from 'rxjs';
import { AlertController, Platform } from '@ionic/angular';
import jwt_decode from 'jwt-decode';
import { ICredential, IToken } from '../model/connexion-model';
import { TokenService } from './token.service';


// import { Storage } from '@capacitor/storage';
// import { map, tap, switchMap } from 'rxjs/operators';

const TOKEN_KEY = 'jwt-token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user: Observable<any>;
  rolesUser: any;
  // private userData = new BehaviorSubject(null);

  url = 'http://127.0.0.1:8000/api/login';
  user_url = 'http://127.0.0.1:8000/api/users';
  livraison_url = 'http://127.0.0.1:8000/api/livraisons/';
  utiliateur: any;

  // Init with null to filter out the first value in a guard!
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    null
  );
  tokenUser: any;
  myToken: any;
  roleClient: any;
  tok: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertCtrl: AlertController,
    private tokenServ : TokenService

  ) {
    // this.loadToken();
    // this.getTok();
  }

  /* function login */
  loginn(credentials:any):Observable<IToken>{
    return this.http.post<any>(this.url, credentials)
    // .pipe(map(user => {
    //   console.log("user "+user.token)
    //   localStorage.setItem('token', JSON.stringify(user));
    //   this.storage.addData(user.token)
    //   console.log("getData "+this.storage.getData())
    //   return user;
    // })); 
  }
  
  getToken(): any {
    return this.getDecodedAccessToken(this.tokenUser);
    // return this.token;
  }
 
  //  clientConnect=this.rolesUser[0] == 'ROLE_CLIENT';


  getLivraisonsObs(): Observable<any> {
    return this.http.get<any>(this.livraison_url);
  }
  getOneLivraisonsObs(id: number): Observable<any> {
    return this.http.get<any>(this.livraison_url + id);
  }

  
  
  login(user: any) {
    return this.http.post<any>(this.url, user).subscribe(async (token) => {
      // console.log(JSON.stringify(token.token));
      this.tokenUser = JSON.stringify(token.token); //recuperation du token de l'utilisateur
      this.rolesUser = this.getDecodedAccessToken(this.tokenUser).roles; //recuperation du role de l'utilisateur
      localStorage.setItem('token', token.token);
      this.roleClient=this.getDecodedAccessToken(this.tokenUser).roles;
      console.log(this.rolesUser[0]);
      // this.roleClient=this.rolesUser[0]
      if (this.rolesUser[0] == 'ROLE_GESTIONNAIRE') {
        //redirection admin
        const alert = await this.alertCtrl.create({
          header: 'vous etes admin',
          message: "vous n'etes pas autoriser à se connecter",
          buttons: ['OK'],
        });
        await alert.present();
      } else if (this.rolesUser[0] == 'ROLE_CLIENT') {
        //redirection client
        this.router.navigateByUrl('commandes');
      } else {
        this.router.navigateByUrl('livraison'); //redirection livreur
      }
    });
  }
  // fonction de decodage token::::::::::::::::::::
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('home');
  }

  // getUser(login: any) {
  //   return this.http.get(this.user_url + '?login=' + login);
  // }
}
