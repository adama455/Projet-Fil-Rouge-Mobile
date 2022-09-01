import { Component, OnInit } from '@angular/core';
import { AuthService } from '../connexion/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  roleClient= this.authService.roleClient;

  constructor(private authService: AuthService,) { }

  ngOnInit() {}

  clientConnect(){
    if (this.roleClient==='ROLE_CLIENT') {
      return true;
      
    }else{
      return false;
    }
  }
  
  
  
  logout() {
    return this.authService.logout();
  }
}
