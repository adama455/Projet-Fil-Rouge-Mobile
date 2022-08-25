import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { AuthService } from '../connexion/services/auth.service';

export const INTRO_KEY = 'intro-seen';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  // constructor(private auth: AuthService,private router: Router,private alertCtrl: AlertController) {}
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ):
  // Observable<boolean | UrlTree>
  //   | Promise<boolean | UrlTree>
  //   | boolean
  //   | UrlTree {

  //   console.log(route);

  //   let authInfo = {
  //     authenticated: false,
  //   };
  //   if (!authInfo.authenticated) {
  //     this.router.navigate(['login']);
  //     return false;
  //   }

  //   return true;
  // }
  constructor(private router: Router, private auth: AuthService, private alertCtrl: AlertController) { }
 
  // canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
  //   return this.auth.user.pipe(
  //     take(1),
  //     map(user => {
  //       if (!user) {
  //         this.alertCtrl.create({
  //           header: 'Unauthorized',
  //           message: 'You are not allowed to access that page.',
  //           buttons: ['OK']
  //         }).then(alert => alert.present());
 
  //         this.router.navigateByUrl('/');
  //         return false;
  //       } else {
  //         return true;
  //       }
  //     })
  //   )
  // }

  async canLoad(): Promise<boolean> {
    const hasSeenIntro = await localStorage.get({key: INTRO_KEY});      
    if (hasSeenIntro && (hasSeenIntro.value === 'true')) {
      return true;
    } else {
      this.router.navigateByUrl('/intro', { replaceUrl:true });
      return false;
    }
}
}


