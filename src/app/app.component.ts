import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './connexion/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  user = null;
  clientConnect:any;
  roleUser: any;
  constructor(private authService: AuthService,private router: Router) {}
  
  complement(e:any){
    console.log(e);
  }
  
  userConnect(){
    this.roleUser = this.authService.getRoleUserConnect();
    return this.roleUser[0] == 'ROLE_CLIENT'
  }
 
  // async logout() {
  //   await this.authService.logout();
  //   this.router.navigateByUrl('/', { replaceUrl: true });
  // }

}
