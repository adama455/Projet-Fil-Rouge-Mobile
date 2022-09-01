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
  client:any;
  constructor(private authService: AuthService, private router: Router) {}
  
  complement(e: any) {
    console.log(e);
  }
  isClient=this.authService.roleClient;

  
  clientConnect():any{
    // console.log(this.isClient==="ROLE_CLIENT")
    if (this.isClient=="ROLE_CLIENT") {
      
    }
    // console.log(this.authService.getRole());
  }
  
  
  
  logout() {
    console.log(this.isClient==='ROLE_CLIENT')
    return this.authService.logout();
  }
}
