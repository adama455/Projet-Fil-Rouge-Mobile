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

  constructor(private authService: AuthService,private router: Router) {}

  complement(e:any){
    console.log(e);
  }

 
  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

}
